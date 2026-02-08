"use client";

import { MoodName } from "@/types";

interface MoodOption {
  id: MoodName;
  emoji: string;
  label: string;
}

interface MoodSelectorProps {
  selected: MoodName | null;
  onSelect: (mood: MoodName) => void;
}

const MOODS: MoodOption[] = [
  { id: "joyeux", emoji: "😊", label: "Joyeux" },
  { id: "romantique", emoji: "💕", label: "Romantique" },
  { id: "chill", emoji: "😌", label: "Chill" },
  { id: "melancolique", emoji: "🥺", label: "Mélancolique" },
  { id: "energique", emoji: "⚡", label: "Énergique" },
  { id: "fetard", emoji: "🎉", label: "Fêtard" },
];

const MOOD_SHADOW: Record<MoodName, string> = {
  joyeux: "shadow-mood-joyeux",
  romantique: "shadow-mood-romantique",
  chill: "shadow-mood-chill",
  melancolique: "shadow-mood-melancolique",
  energique: "shadow-mood-energique",
  fetard: "shadow-mood-fetard",
};

export function MoodCard({
  mood,
  isSelected,
  onSelect,
}: {
  mood: MoodOption;
  isSelected: boolean;
  onSelect: (mood: MoodName) => void;
}) {
  return (
    <button
      role="radio"
      aria-checked={isSelected}
      aria-label={mood.label}
      onClick={() => onSelect(mood.id)}
      className={`
        flex flex-col items-center justify-center gap-1
        p-4 rounded-2xl border-2 backdrop-blur-card
        transition-all duration-300 cursor-pointer
        focus-visible:ring-4 focus-visible:ring-primary-30 focus:outline-none
        ${
          isSelected
            ? `border-primary bg-primary-10 scale-105 ${MOOD_SHADOW[mood.id]}`
            : "border-transparent bg-white/80 hover:bg-white hover:shadow-card hover:scale-[1.02]"
        }
      `}
    >
      <span className="text-[32px]" aria-hidden="true">
        {mood.emoji}
      </span>
      <span className="text-caption font-bold text-text-main">
        {mood.label}
      </span>
    </button>
  );
}

export default function MoodSelector({ selected, onSelect }: MoodSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Sélection d'humeur"
      className="grid grid-cols-2 min-[375px]:grid-cols-3 gap-3"
    >
      {MOODS.map((mood) => (
        <MoodCard
          key={mood.id}
          mood={mood}
          isSelected={selected === mood.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
