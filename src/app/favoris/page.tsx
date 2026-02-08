"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getFavorites, removeFavorite } from "@/lib/favorites";
import { TRACK_DATABASE } from "@/lib/track-database";
import { TrackResult } from "@/types";
import NavBar from "@/components/NavBar";
import TrackCard from "@/components/TrackCard";
import Button from "@/components/ui/Button";

function resolveTrack(trackId: string): TrackResult | null {
  const track = TRACK_DATABASE.find((t) => t.id === trackId);
  if (!track) return null;
  return {
    id: track.id,
    title: track.title,
    artist: track.artist,
    album: track.album,
    duration: track.duration,
    coverUrl: track.coverUrl,
    spotifyUrl: track.spotifyUrl,
    spotifyId: track.id,
  };
}

export default function FavorisPage() {
  const router = useRouter();
  const [favoriteTracks, setFavoriteTracks] = useState<TrackResult[]>([]);

  useEffect(() => {
    const ids = getFavorites();
    const tracks = ids
      .map(resolveTrack)
      .filter((t): t is TrackResult => t !== null);
    setFavoriteTracks(tracks);
  }, []);

  const handleRemove = (trackId: string) => {
    removeFavorite(trackId);
    setFavoriteTracks((prev) => prev.filter((t) => t.id !== trackId));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar showBack onBack={() => router.back()} />

      <main
        id="main-content"
        className="flex-1 flex flex-col items-center px-4 md:px-6 max-w-content mx-auto w-full py-12"
      >
        <h1 className="font-heading text-h1-mobile lg:text-h1-desktop text-text-main mb-8 text-center">
          Mes favoris ❤️
        </h1>

        {favoriteTracks.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-card rounded-2xl p-8 shadow-card text-center max-w-narrow w-full">
            <p
              className="text-body text-text-secondary mb-6"
              aria-live="polite"
            >
              Aucun favori pour le moment.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push("/")}
              className="w-full md:w-auto"
            >
              Découvrir des morceaux 🎵
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {favoriteTracks.map((track, index) => (
              <div
                key={track.id}
                className="opacity-0 animate-fade-in-up motion-reduce:opacity-100 motion-reduce:animate-none"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <TrackCard
                  track={track}
                  isFavorite={true}
                  onFavorite={() => handleRemove(track.id)}
                  onSpotify={() =>
                    window.open(track.spotifyUrl, "_blank")
                  }
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="text-center py-6 text-body-sm text-text-secondary">
        Fait avec ❤️ pour Chatoune & son amour · 2026
      </footer>
    </div>
  );
}
