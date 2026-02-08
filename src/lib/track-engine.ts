import { CuratedTrack, MoodName, TrackResult } from "@/types";
import { TRACK_DATABASE } from "@/lib/track-database";

/**
 * Sélectionne des morceaux correspondant à la fusion de 2 humeurs.
 *
 * Stratégie de scoring :
 * - Un morceau tagué avec LES DEUX humeurs (pont) = score 3
 * - Un morceau tagué avec une des deux humeurs = score 1
 * - Bonus/malus basé sur la proximité d'énergie avec le slider
 *
 * Retourne `count` morceaux triés par score puis mélangés.
 */
export function selectTracks(
  mood1: MoodName,
  mood2: MoodName,
  energy1: number = 50,
  energy2: number = 50,
  count: number = 10
): TrackResult[] {
  const targetEnergy = (energy1 + energy2) / 2;

  const scored = TRACK_DATABASE.map((track) => {
    let score = 0;

    const hasMood1 = track.moods.includes(mood1);
    const hasMood2 = track.moods.includes(mood2);

    if (hasMood1 && hasMood2) {
      score += 3;
    } else if (hasMood1 || hasMood2) {
      score += 1;
    } else {
      return { track, score: -1 };
    }

    const energyDiff = Math.abs(track.energy - targetEnergy);
    const energyBonus = 1 - energyDiff / 100;
    score += energyBonus;

    score += Math.random() * 0.5;

    return { track, score };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const topTracks = scored.slice(0, Math.min(count * 2, scored.length));
  const shuffled = shuffleArray(topTracks).slice(0, count);

  // Deduplicate by track ID (some tracks may appear in multiple mood sections)
  const seen = new Set<string>();
  const unique = shuffled.filter((item) => {
    if (seen.has(item.track.id)) return false;
    seen.add(item.track.id);
    return true;
  });

  return unique.map((item) => normalizeTrack(item.track));
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function normalizeTrack(track: CuratedTrack): TrackResult {
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
