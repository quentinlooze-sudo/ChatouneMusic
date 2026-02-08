"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMoodContext } from "@/lib/MoodContext";
import { getRecommendations } from "@/lib/fusion";
import { getMoodData } from "@/lib/moods";
import NavBar from "@/components/NavBar";
import ProgressBar from "@/components/ui/ProgressBar";
import FusionLoader from "@/components/FusionLoader";
import Button from "@/components/ui/Button";

export default function FusionPage() {
  const { partner1, partner2, setTracks } = useMoodContext();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!partner1.mood || !partner2.mood || !partner1.name || !partner2.name) {
      router.replace("/mood");
      return;
    }

    // La sélection est instantanée (pas d'API), mais on simule un délai
    // pour que l'animation de fusion soit visible
    const timer = setTimeout(() => {
      const results = getRecommendations(
        partner1.mood!,
        partner2.mood!,
        partner1.energy,
        partner2.energy,
        10
      );
      setTracks(results);
      setIsReady(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const mood1Data = partner1.mood ? getMoodData(partner1.mood) : null;
  const mood2Data = partner2.mood ? getMoodData(partner2.mood) : null;

  if (!mood1Data || !mood2Data) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <div className="mt-2 mb-6">
        <ProgressBar step={3} />
      </div>

      <main id="main-content" className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 text-center">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-card opacity-0 animate-fade-in-up motion-reduce:opacity-100 motion-reduce:animate-none">
            <div className="text-[32px] mb-1" aria-hidden="true">
              {mood1Data.emoji}
            </div>
            <div className="text-sm font-bold text-text-main">
              {partner1.name}
            </div>
            <div className="text-xs text-text-secondary">
              {mood1Data.label}
            </div>
          </div>

          <div className="text-3xl animate-pulse" aria-hidden="true">
            ✨
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-card opacity-0 animate-fade-in-up-2 motion-reduce:opacity-100 motion-reduce:animate-none">
            <div className="text-[32px] mb-1" aria-hidden="true">
              {mood2Data.emoji}
            </div>
            <div className="text-sm font-bold text-text-main">
              {partner2.name}
            </div>
            <div className="text-xs text-text-secondary">
              {mood2Data.label}
            </div>
          </div>
        </div>

        <h1 className="font-heading text-h2 text-text-main mb-2">
          {partner1.name} + {partner2.name}
        </h1>
        <p className="font-body text-body text-text-secondary mb-6">
          On fusionne vos vibes...
        </p>

        {!isReady && <FusionLoader />}

        {isReady && (
          <div className="animate-scale-in">
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push("/results")}
            >
              Voir nos morceaux 🎧
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
