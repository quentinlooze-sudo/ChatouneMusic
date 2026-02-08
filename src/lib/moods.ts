import { MoodName, MoodParams } from "@/types";

export interface MoodData {
  id: MoodName;
  emoji: string;
  label: string;
  params: MoodParams;
}

export const MOODS_DATA: MoodData[] = [
  {
    id: "joyeux",
    emoji: "😊",
    label: "Joyeux",
    params: {
      valence: 0.8,
      energy: 0.7,
      danceability: 0.6,
      tempo: 120,
      acousticness: 0.2,
    },
  },
  {
    id: "romantique",
    emoji: "💕",
    label: "Romantique",
    params: {
      valence: 0.6,
      energy: 0.3,
      danceability: 0.4,
      tempo: 90,
      acousticness: 0.7,
    },
  },
  {
    id: "chill",
    emoji: "😌",
    label: "Chill",
    params: {
      valence: 0.5,
      energy: 0.3,
      danceability: 0.4,
      tempo: 85,
      acousticness: 0.5,
    },
  },
  {
    id: "melancolique",
    emoji: "🥺",
    label: "Mélancolique",
    params: {
      valence: 0.2,
      energy: 0.3,
      danceability: 0.3,
      tempo: 75,
      acousticness: 0.6,
    },
  },
  {
    id: "energique",
    emoji: "⚡",
    label: "Énergique",
    params: {
      valence: 0.7,
      energy: 0.9,
      danceability: 0.8,
      tempo: 140,
      acousticness: 0.1,
    },
  },
  {
    id: "fetard",
    emoji: "🎉",
    label: "Fêtard",
    params: {
      valence: 0.9,
      energy: 0.9,
      danceability: 0.9,
      tempo: 128,
      acousticness: 0.1,
    },
  },
];

export function getMoodData(id: MoodName): MoodData | undefined {
  return MOODS_DATA.find((m) => m.id === id);
}

export function getMoodEmoji(id: MoodName): string {
  return MOODS_DATA.find((m) => m.id === id)?.emoji || "🎵";
}
