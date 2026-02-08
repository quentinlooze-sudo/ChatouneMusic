import { describe, it, expect } from "vitest";
import { getRecommendations, fuseMoods } from "@/lib/fusion";
import { MoodName, MoodParams } from "@/types";

const ALL_MOODS: MoodName[] = [
  "joyeux",
  "romantique",
  "chill",
  "melancolique",
  "energique",
  "fetard",
];

describe("getRecommendations", () => {
  // --- Cas nominaux ---

  it("retourne des morceaux pour deux humeurs différentes", () => {
    const results = getRecommendations("joyeux", "melancolique", 50, 50, 10);

    expect(results).toBeInstanceOf(Array);
    expect(results.length).toBeGreaterThan(0);
  });

  it("retourne des morceaux avec les champs obligatoires", () => {
    const results = getRecommendations("romantique", "chill", 50, 50, 10);

    results.forEach((track) => {
      expect(track).toHaveProperty("id");
      expect(track).toHaveProperty("title");
      expect(track).toHaveProperty("artist");
      expect(track).toHaveProperty("album");
      expect(track).toHaveProperty("duration");
      expect(track).toHaveProperty("coverUrl");
      expect(track).toHaveProperty("spotifyUrl");
      expect(track).toHaveProperty("spotifyId");
      expect(track.title).toBeTruthy();
      expect(track.artist).toBeTruthy();
    });
  });

  it("retourne au maximum `count` morceaux", () => {
    const results = getRecommendations("joyeux", "fetard", 80, 80, 5);

    expect(results.length).toBeLessThanOrEqual(5);
  });

  it("fusionne deux humeurs identiques sans erreur", () => {
    const results = getRecommendations("energique", "energique", 90, 70, 10);

    expect(results).toBeInstanceOf(Array);
    expect(results.length).toBeGreaterThan(0);
  });

  it("ne retourne pas de doublons (IDs uniques)", () => {
    const results = getRecommendations("joyeux", "fetard", 60, 60, 10);
    const ids = results.map((t) => t.id);
    const uniqueIds = new Set(ids);

    expect(ids.length).toBe(uniqueIds.size);
  });

  it("ne retourne jamais un tableau vide pour toute combinaison d'humeurs", () => {
    for (const m1 of ALL_MOODS) {
      for (const m2 of ALL_MOODS) {
        const results = getRecommendations(m1, m2, 50, 50, 10);
        expect(
          results.length,
          `Fusion ${m1} + ${m2} retourne un tableau vide`
        ).toBeGreaterThan(0);
      }
    }
  });

  // --- Cas limites ---

  it("gère des énergies à 0", () => {
    const results = getRecommendations("chill", "romantique", 0, 0, 10);

    expect(results).toBeInstanceOf(Array);
    expect(results.length).toBeGreaterThan(0);
  });

  it("gère des énergies au maximum (100)", () => {
    const results = getRecommendations("energique", "fetard", 100, 100, 10);

    expect(results).toBeInstanceOf(Array);
    expect(results.length).toBeGreaterThan(0);
  });

  it("gère un count de 1", () => {
    const results = getRecommendations("joyeux", "chill", 50, 50, 1);

    expect(results.length).toBeLessThanOrEqual(1);
  });
});

describe("fuseMoods", () => {
  const moodA: MoodParams = {
    valence: 0.8,
    energy: 0.7,
    danceability: 0.6,
    tempo: 120,
    acousticness: 0.2,
  };

  const moodB: MoodParams = {
    valence: 0.2,
    energy: 0.3,
    danceability: 0.3,
    tempo: 80,
    acousticness: 0.6,
  };

  it("retourne un profil fusionné valide", () => {
    const result = fuseMoods(moodA, moodB, 50, 50);

    expect(result).toHaveProperty("valence");
    expect(result).toHaveProperty("energy");
    expect(result).toHaveProperty("danceability");
    expect(result).toHaveProperty("tempo");
    expect(result).toHaveProperty("acousticness");
  });

  it("calcule la moyenne des valences", () => {
    const result = fuseMoods(moodA, moodB, 50, 50);

    expect(result.valence).toBeCloseTo((0.8 + 0.2) / 2);
  });

  it("calcule la moyenne des danceability", () => {
    const result = fuseMoods(moodA, moodB, 50, 50);

    expect(result.danceability).toBeCloseTo((0.6 + 0.3) / 2);
  });

  it("calcule le tempo moyen arrondi", () => {
    const result = fuseMoods(moodA, moodB, 50, 50);

    expect(result.tempo).toBe(Math.round((120 + 80) / 2));
  });

  it("applique les facteurs d'énergie", () => {
    const result = fuseMoods(moodA, moodB, 100, 0);

    // energy = (0.7 * 1.0 + 0.3 * 0.0) / 2 = 0.35
    expect(result.energy).toBeCloseTo(0.35);
  });

  it("est symétrique pour valence, danceability, acousticness et tempo", () => {
    const resultAB = fuseMoods(moodA, moodB, 50, 50);
    const resultBA = fuseMoods(moodB, moodA, 50, 50);

    expect(resultAB.valence).toBeCloseTo(resultBA.valence);
    expect(resultAB.danceability).toBeCloseTo(resultBA.danceability);
    expect(resultAB.tempo).toBe(resultBA.tempo);
    expect(resultAB.acousticness).toBeCloseTo(resultBA.acousticness);
  });
});
