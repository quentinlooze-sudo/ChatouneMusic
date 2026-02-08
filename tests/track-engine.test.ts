import { describe, it, expect } from "vitest";
import { selectTracks } from "@/lib/track-engine";
import { TRACK_DATABASE } from "@/lib/track-database";
import { MoodName } from "@/types";

const ALL_MOODS: MoodName[] = [
  "joyeux",
  "romantique",
  "chill",
  "melancolique",
  "energique",
  "fetard",
];

describe("selectTracks", () => {
  // --- Cas nominaux ---

  it("retourne des morceaux correspondant aux humeurs", () => {
    const results = selectTracks("joyeux", "chill", 50, 50, 10);

    expect(results).toBeInstanceOf(Array);
    expect(results.length).toBeGreaterThan(0);
  });

  it("retourne des morceaux avec les champs obligatoires", () => {
    const results = selectTracks("romantique", "melancolique", 50, 50, 10);

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

  it("ne retourne pas de doublons (IDs uniques)", () => {
    const results = selectTracks("energique", "fetard", 80, 80, 10);
    const ids = results.map((t) => t.id);
    const uniqueIds = new Set(ids);

    expect(ids.length).toBe(uniqueIds.size);
  });

  it("respecte la limite count", () => {
    const results = selectTracks("joyeux", "fetard", 50, 50, 3);

    expect(results.length).toBeLessThanOrEqual(3);
  });

  it("retourne des résultats pour toutes les combinaisons d'humeurs", () => {
    for (const m1 of ALL_MOODS) {
      for (const m2 of ALL_MOODS) {
        const results = selectTracks(m1, m2, 50, 50, 10);
        expect(
          results.length,
          `selectTracks(${m1}, ${m2}) retourne un tableau vide`
        ).toBeGreaterThan(0);
      }
    }
  });

  // --- Cas limites ---

  it("gère une énergie à 0", () => {
    expect(() => selectTracks("chill", "melancolique", 0, 0, 10)).not.toThrow();
  });

  it("gère une énergie à 100", () => {
    expect(() =>
      selectTracks("energique", "fetard", 100, 100, 10)
    ).not.toThrow();
  });

  it("gère un count de 1", () => {
    const results = selectTracks("joyeux", "romantique", 50, 50, 1);

    expect(results.length).toBeLessThanOrEqual(1);
  });

  it("gère un count très grand (supérieur à la base)", () => {
    const results = selectTracks("joyeux", "fetard", 50, 50, 1000);

    expect(results).toBeInstanceOf(Array);
    // Should not crash, just return what's available
    expect(results.length).toBeLessThanOrEqual(TRACK_DATABASE.length);
  });
});

// --- Intégrité de la base de données ---

describe("TRACK_DATABASE — intégrité", () => {
  it("contient au moins 100 morceaux", () => {
    expect(TRACK_DATABASE.length).toBeGreaterThanOrEqual(100);
  });

  it("chaque morceau a un ID unique", () => {
    const ids = TRACK_DATABASE.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("chaque morceau a des tags d'humeur", () => {
    TRACK_DATABASE.forEach((track) => {
      expect(
        track.moods.length,
        `"${track.title}" par ${track.artist} n'a pas de tags d'humeur`
      ).toBeGreaterThan(0);
    });
  });

  it("les tags d'humeur utilisent uniquement le vocabulaire défini", () => {
    TRACK_DATABASE.forEach((track) => {
      track.moods.forEach((mood) => {
        expect(
          ALL_MOODS,
          `"${track.title}" a un tag inconnu "${mood}"`
        ).toContain(mood);
      });
    });
  });

  it("chaque morceau a tous les champs obligatoires remplis", () => {
    TRACK_DATABASE.forEach((track) => {
      expect(track.id, `Un morceau a un ID vide`).toBeTruthy();
      expect(
        track.title,
        `Le morceau ${track.id} a un titre vide`
      ).toBeTruthy();
      expect(
        track.artist,
        `Le morceau "${track.title}" a un artiste vide`
      ).toBeTruthy();
      expect(
        track.album,
        `"${track.title}" par ${track.artist} a un album vide`
      ).toBeTruthy();
      expect(
        track.duration,
        `"${track.title}" par ${track.artist} a une durée vide`
      ).toBeTruthy();
      expect(
        track.spotifyUrl,
        `"${track.title}" par ${track.artist} a une URL Spotify vide`
      ).toBeTruthy();
    });
  });

  it("chaque morceau a une énergie entre 0 et 100", () => {
    TRACK_DATABASE.forEach((track) => {
      expect(
        track.energy,
        `"${track.title}" a une énergie de ${track.energy}`
      ).toBeGreaterThanOrEqual(0);
      expect(
        track.energy,
        `"${track.title}" a une énergie de ${track.energy}`
      ).toBeLessThanOrEqual(100);
    });
  });

  it("aucun doublon titre + artiste", () => {
    const seen = new Set<string>();
    TRACK_DATABASE.forEach((track) => {
      const key = `${track.title.toLowerCase()}|${track.artist.toLowerCase()}`;
      expect(
        seen.has(key),
        `Doublon détecté : "${track.title}" par ${track.artist}`
      ).toBe(false);
      seen.add(key);
    });
  });
});
