"use client";

import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Button from "@/components/ui/Button";
import StepCard from "@/components/StepCard";

const FADE_CLASSES = [
  "animate-fade-in-up-1",
  "animate-fade-in-up-2",
  "animate-fade-in-up-3",
];

const STEPS = [
  {
    emoji: "🎭",
    title: "1. Choisis ton humeur",
    description:
      "Chaque partenaire sélectionne son mood du moment parmi 6 ambiances.",
  },
  {
    emoji: "🔀",
    title: "2. On mixe tout",
    description:
      "L'app fusionne vos deux humeurs en un cocktail musical unique.",
  },
  {
    emoji: "🎧",
    title: "3. Écoutez ensemble",
    description: "Découvrez des morceaux Spotify faits pour vous deux.",
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main id="main-content" className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 text-center max-w-hero mx-auto">
        <div className="text-6xl mb-6 animate-bounce-slow motion-reduce:animate-none" aria-hidden="true">
          🎶💑🎶
        </div>

        <h1 className="font-heading text-h1-mobile lg:text-h1-desktop text-text-main mb-4 leading-tight">
          Trouvez <span className="text-primary">votre son</span> à deux
        </h1>

        <p className="font-body text-body text-text-secondary mb-8 max-w-md leading-relaxed">
          Chacun choisit son humeur, on trouve les morceaux Spotify qui matchent
          votre vibe de couple.
        </p>

        <Button
          variant="primary"
          size="lg"
          onClick={() => router.push("/mood")}
          className="w-full md:w-auto"
        >
          C&apos;est parti ! 🎵
        </Button>

        <section
          className="mt-16 w-full max-w-content"
          aria-labelledby="how-it-works"
        >
          <h2 id="how-it-works" className="sr-only">
            Comment ça marche
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <div key={step.title} className={`opacity-0 motion-reduce:opacity-100 motion-reduce:animate-none ${FADE_CLASSES[i]}`}>
                <StepCard
                  emoji={step.emoji}
                  title={step.title}
                  description={step.description}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="text-center py-6 text-body-sm text-text-secondary">
        Fait avec ❤️ pour Chatoune & son amour · 2026
      </footer>
    </div>
  );
}
