import { MoodName, MoodParams, TrackResult } from "@/types";
import { selectTracks } from "@/lib/track-engine";

/**
 * Fusionne les humeurs et retourne les morceaux correspondants.
 * C'est la fonction principale appelée par la page fusion.
 */
export function getRecommendations(
  mood1: MoodName,
  mood2: MoodName,
  energy1: number = 50,
  energy2: number = 50,
  count: number = 10
): TrackResult[] {
  return selectTracks(mood1, mood2, energy1, energy2, count);
}

/**
 * Conservé pour référence — calcule les paramètres Spotify fusionnés.
 * Pourra servir si l'API Spotify redevient accessible.
 */
export function fuseMoods(
  mood1: MoodParams,
  mood2: MoodParams,
  energy1: number = 50,
  energy2: number = 50
): MoodParams {
  const energyFactor1 = energy1 / 100;
  const energyFactor2 = energy2 / 100;

  return {
    valence: (mood1.valence + mood2.valence) / 2,
    energy: (mood1.energy * energyFactor1 + mood2.energy * energyFactor2) / 2,
    danceability: (mood1.danceability + mood2.danceability) / 2,
    tempo: Math.round((mood1.tempo + mood2.tempo) / 2),
    acousticness: (mood1.acousticness + mood2.acousticness) / 2,
  };
}
