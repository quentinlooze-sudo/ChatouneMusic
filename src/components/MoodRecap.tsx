import { MoodName } from "@/types";

interface MoodRecapProps {
  partner1Name: string;
  partner2Name: string;
  mood1: { id: MoodName; emoji: string };
  mood2: { id: MoodName; emoji: string };
}

const MOOD_BG: Record<MoodName, string> = {
  joyeux: "bg-mood-joyeux/20",
  romantique: "bg-mood-romantique/20",
  chill: "bg-mood-chill/20",
  melancolique: "bg-mood-melancolique/20",
  energique: "bg-mood-energique/20",
  fetard: "bg-mood-fetard/20",
};

export default function MoodRecap({
  partner1Name,
  partner2Name,
  mood1,
  mood2,
}: MoodRecapProps) {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      <span
        className={`${MOOD_BG[mood1.id]} rounded-full px-3 py-1 text-caption font-bold`}
      >
        {mood1.emoji} {partner1Name}
      </span>
      <span className="text-primary font-bold">+</span>
      <span
        className={`${MOOD_BG[mood2.id]} rounded-full px-3 py-1 text-caption font-bold`}
      >
        {mood2.emoji} {partner2Name}
      </span>
      <span className="text-primary font-bold">=</span>
      <span className="font-bold text-text-main">✨ Votre mix</span>
    </div>
  );
}
