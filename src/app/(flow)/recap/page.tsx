"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMoodContext } from "@/lib/MoodContext";
import { getMoodEmoji } from "@/lib/moods";
import NavBar from "@/components/NavBar";
import MoodRecap from "@/components/MoodRecap";
import TrackCard from "@/components/TrackCard";
import Button from "@/components/ui/Button";

export default function RecapPage() {
  const { partner1, partner2, tracks, favorites, reset } = useMoodContext();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!partner1.mood || !partner2.mood) {
      router.replace("/mood");
    }
  }, [partner1.mood, partner2.mood, router]);

  const favoriteTracks = tracks.filter((t) => favorites.has(t.id));

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "ChatouneMusic — Notre session",
        text: `${partner1.name} (${partner1.mood}) + ${partner2.name} (${partner2.mood}) = une super playlist !`,
        url: window.location.origin,
      });
    } else {
      await navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRestart = () => {
    reset();
    router.push("/mood");
  };

  if (!partner1.mood || !partner2.mood) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar showBack onBack={() => router.back()} />

      <main id="main-content" className="flex-1 flex flex-col items-center px-4 md:px-6 max-w-hero mx-auto w-full py-12 text-center">
        <h1 className="font-heading text-h1-mobile lg:text-h1-desktop text-text-main mb-4">
          Votre session 🎵
        </h1>

        <div className="bg-white/80 backdrop-blur-card rounded-2xl p-6 mb-8 shadow-card w-full max-w-narrow">
          <MoodRecap
            partner1Name={partner1.name}
            partner2Name={partner2.name}
            mood1={{ id: partner1.mood, emoji: getMoodEmoji(partner1.mood) }}
            mood2={{ id: partner2.mood, emoji: getMoodEmoji(partner2.mood) }}
          />
        </div>

        {favoriteTracks.length > 0 && (
          <section className="w-full max-w-content mb-8">
            <h2 className="font-heading text-h2 text-text-main mb-4">
              Vos coups de cœur ❤️
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favoriteTracks.map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  isFavorite={true}
                  onSpotify={() =>
                    window.open(track.spotifyUrl, "_blank")
                  }
                />
              ))}
            </div>
          </section>
        )}

        <div className="bg-white rounded-2xl p-6 shadow-card mb-8 max-w-narrow w-full">
          <p className="text-body text-text-main leading-relaxed">
            Merci d&apos;avoir utilisé ChatouneMusic ! 💕
            <br />
            La musique, c&apos;est encore mieux à deux.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <Button variant="primary" size="lg" onClick={handleShare}>
            {copied ? "Lien copié !" : "Partager 📤"}
          </Button>
          <Button variant="secondary" size="md" onClick={handleRestart}>
            Nouvelle session 🎵
          </Button>
        </div>
      </main>

      <footer className="text-center py-6 text-body-sm text-text-secondary">
        Fait avec ❤️ pour Chatoune & son amour · 2026
      </footer>
    </div>
  );
}
