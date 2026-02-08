"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMoodContext } from "@/lib/MoodContext";
import { getRecommendations } from "@/lib/fusion";
import { getMoodEmoji } from "@/lib/moods";
import MoodRecap from "@/components/MoodRecap";
import TrackCard from "@/components/TrackCard";
import TrackCardSkeleton from "@/components/TrackCardSkeleton";
import PlayerBar from "@/components/PlayerBar";
import Button from "@/components/ui/Button";

export default function ResultsPage() {
  const {
    partner1,
    partner2,
    tracks,
    setTracks,
    favorites,
    toggleFavorite,
    reset,
  } = useMoodContext();
  const router = useRouter();
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!partner1.mood || !partner2.mood) {
      router.replace("/mood");
    }
  }, [partner1.mood, partner2.mood, router]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPlayingTrackId(null);

    // Petit délai pour montrer le skeleton
    setTimeout(() => {
      const newResults = getRecommendations(
        partner1.mood!,
        partner2.mood!,
        partner1.energy,
        partner2.energy,
        10
      );
      setTracks(newResults);
      setIsRefreshing(false);
    }, 600);
  };

  const handleRestart = () => {
    reset();
    router.push("/mood");
  };

  const playingTrack = tracks.find((t) => t.id === playingTrackId);

  if (!partner1.mood || !partner2.mood) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav aria-label="Navigation principale" className="flex items-center justify-between px-6 py-4 max-w-page mx-auto w-full">
        <button
          onClick={() => router.back()}
          className="text-sm text-text-secondary hover:text-primary transition-colors
                     focus-visible:ring-4 focus-visible:ring-primary-30 focus:outline-none rounded-full px-2 py-1"
        >
          ← Retour
        </button>
        <a href="/" className="flex items-center gap-1 text-lg font-bold">
          <span aria-hidden="true">🎵</span>
          <span className="text-text-main">Chatoune</span>
          <span className="text-primary">Music</span>
        </a>
        <span className="text-sm text-text-secondary">
          ❤️ {favorites.size}
        </span>
      </nav>

      <main id="main-content" className="flex-1 px-4 md:px-6 max-w-content mx-auto w-full pb-12">
        <div className="bg-white/80 backdrop-blur-card rounded-2xl p-5 mb-8 text-center shadow-card">
          <p className="text-body-sm text-text-secondary mb-2">
            Vos humeurs fusionnées
          </p>
          <MoodRecap
            partner1Name={partner1.name}
            partner2Name={partner2.name}
            mood1={{ id: partner1.mood, emoji: getMoodEmoji(partner1.mood) }}
            mood2={{ id: partner2.mood, emoji: getMoodEmoji(partner2.mood) }}
          />
        </div>

        <h1 className="font-heading text-h2 text-text-main mb-6 text-center">
          Vos morceaux 🎧
        </h1>

        {isRefreshing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <TrackCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className="opacity-0 animate-fade-in-up motion-reduce:opacity-100 motion-reduce:animate-none"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <TrackCard
                  track={track}
                  isPlaying={playingTrackId === track.id}
                  isFavorite={favorites.has(track.id)}
                  onPlay={() =>
                    setPlayingTrackId(
                      playingTrackId === track.id ? null : track.id
                    )
                  }
                  onFavorite={() => toggleFavorite(track.id)}
                  onSpotify={() =>
                    window.open(track.spotifyUrl, "_blank")
                  }
                />
              </div>
            ))}
          </div>
        )}

        {playingTrack && (
          <div className="mb-8">
            <PlayerBar
              track={{
                title: playingTrack.title,
                artist: playingTrack.artist,
                coverUrl: playingTrack.coverUrl,
                spotifyId: playingTrack.spotifyId,
              }}
            />
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-full md:w-auto"
          >
            {isRefreshing ? "Chargement..." : "Refresh 🔄"}
          </Button>
          <Button variant="secondary" size="md" onClick={handleRestart} className="w-full md:w-auto">
            On recommence ?
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => router.push("/recap")}
            className="w-full md:w-auto"
          >
            Voir le récap ✨
          </Button>
        </div>
      </main>
    </div>
  );
}
