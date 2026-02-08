"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import ProgressBar from "@/components/ui/ProgressBar";
import EnergySlider from "@/components/ui/EnergySlider";
import MoodSelector from "@/components/MoodCard";
import TrackCard from "@/components/TrackCard";
import TrackCardSkeleton from "@/components/TrackCardSkeleton";
import NavBar from "@/components/NavBar";
import PlayerBar from "@/components/PlayerBar";
import StepCard from "@/components/StepCard";
import MoodRecap from "@/components/MoodRecap";
import FusionLoader from "@/components/FusionLoader";
import { MoodName } from "@/types";

const MOCK_TRACK = {
  id: "1",
  title: "Blinding Lights",
  artist: "The Weeknd",
  duration: "3:20",
  coverUrl: "https://placehold.co/64x64/E91E63/white?text=BL",
  spotifyUrl: "https://open.spotify.com",
  spotifyId: "0VjIjW4GlUZAMYd2vXMi4b",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-heading text-h2 text-text-main border-b border-primary/20 pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [mood, setMood] = useState<MoodName | null>(null);
  const [energy, setEnergy] = useState(50);
  const [playing, setPlaying] = useState(false);
  const [favorite, setFavorite] = useState(false);

  return (
    <>
      <NavBar showBack onBack={() => alert("Retour")} />
      <main className="max-w-content mx-auto px-4 py-8 space-y-12">
        <h1 className="font-heading text-h1-mobile lg:text-h1-desktop text-center">
          Design System
        </h1>

        <Section title="Button">
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary" size="sm">Primary SM</Button>
            <Button variant="primary" size="md">Primary MD</Button>
            <Button variant="primary" size="lg">Primary LG</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Section>

        <Section title="TextInput">
          <div className="max-w-narrow space-y-4">
            <TextInput
              id="name1"
              label="Prénom partenaire 1"
              placeholder="Ex : Robin"
              value={name}
              onChange={(v) => {
                setName(v);
                setNameError(v.length > 0 && v.length < 2 ? "Minimum 2 caractères" : "");
              }}
              error={nameError}
              maxLength={20}
            />
          </div>
        </Section>

        <Section title="ProgressBar">
          <div className="flex flex-col gap-4 items-center">
            <ProgressBar step={1} />
            <ProgressBar step={2} />
            <ProgressBar step={3} />
          </div>
        </Section>

        <Section title="EnergySlider">
          <div className="max-w-narrow">
            <EnergySlider value={energy} onChange={setEnergy} />
            <p className="text-caption text-text-secondary text-center mt-2">
              Valeur : {energy}
            </p>
          </div>
        </Section>

        <Section title="MoodSelector">
          <div className="max-w-narrow mx-auto">
            <MoodSelector selected={mood} onSelect={setMood} />
          </div>
        </Section>

        <Section title="TrackCard">
          <div className="max-w-content space-y-3">
            <TrackCard
              track={MOCK_TRACK}
              isPlaying={playing}
              isFavorite={favorite}
              onPlay={() => setPlaying(!playing)}
              onFavorite={() => setFavorite(!favorite)}
              onSpotify={() => window.open(MOCK_TRACK.spotifyUrl)}
            />
            <TrackCardSkeleton />
          </div>
        </Section>

        <Section title="PlayerBar">
          <PlayerBar
            track={{
              title: "Blinding Lights",
              artist: "The Weeknd",
              coverUrl: "https://placehold.co/48x48/1A1A2E/white?text=BL",
              spotifyId: "0VjIjW4GlUZAMYd2vXMi4b",
            }}
          />
        </Section>

        <Section title="StepCard">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StepCard
              emoji="😊"
              title="Choisissez votre humeur"
              description="Chaque partenaire sélectionne l'humeur qui lui correspond."
            />
            <StepCard
              emoji="⚡"
              title="On fusionne"
              description="Notre algorithme combine vos deux humeurs pour trouver le mix parfait."
            />
            <StepCard
              emoji="🎵"
              title="Découvrez vos morceaux"
              description="Recevez une playlist Spotify personnalisée, prête à écouter."
            />
          </div>
        </Section>

        <Section title="MoodRecap">
          <MoodRecap
            partner1Name="Robin"
            partner2Name="Marie"
            mood1={{ id: "joyeux", emoji: "😊" }}
            mood2={{ id: "romantique", emoji: "💕" }}
          />
        </Section>

        <Section title="FusionLoader">
          <div className="flex justify-center">
            <FusionLoader />
          </div>
        </Section>
      </main>
    </>
  );
}
