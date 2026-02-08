import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
  isFavorite,
  clearFavorites,
} from "@/lib/favorites";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: vi.fn((i: number) => Object.keys(store)[i] ?? null),
  };
})();

Object.defineProperty(globalThis, "localStorage", { value: localStorageMock });

describe("favorites", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  // --- Ajout ---

  it("ajoute un morceau aux favoris", () => {
    addFavorite("track-1");
    const favs = getFavorites();

    expect(favs).toContain("track-1");
  });

  it("n'ajoute pas de doublon", () => {
    addFavorite("track-1");
    addFavorite("track-1");
    const favs = getFavorites();

    expect(favs.filter((f) => f === "track-1").length).toBe(1);
  });

  it("peut ajouter plusieurs morceaux différents", () => {
    addFavorite("track-1");
    addFavorite("track-2");
    addFavorite("track-3");
    const favs = getFavorites();

    expect(favs).toHaveLength(3);
    expect(favs).toContain("track-1");
    expect(favs).toContain("track-2");
    expect(favs).toContain("track-3");
  });

  // --- Suppression ---

  it("supprime un morceau des favoris", () => {
    addFavorite("track-1");
    addFavorite("track-2");
    removeFavorite("track-1");
    const favs = getFavorites();

    expect(favs).not.toContain("track-1");
    expect(favs).toContain("track-2");
  });

  it("ne crashe pas si on supprime un favori inexistant", () => {
    expect(() => removeFavorite("track-999")).not.toThrow();
  });

  // --- Vérification ---

  it("vérifie qu'un morceau est en favori", () => {
    addFavorite("track-1");

    expect(isFavorite("track-1")).toBe(true);
    expect(isFavorite("track-2")).toBe(false);
  });

  // --- Nettoyage ---

  it("vide tous les favoris", () => {
    addFavorite("track-1");
    addFavorite("track-2");
    clearFavorites();

    expect(getFavorites()).toHaveLength(0);
  });

  // --- Persistance ---

  it("persiste les favoris dans localStorage", () => {
    addFavorite("track-1");

    expect(localStorageMock.setItem).toHaveBeenCalled();
    const storedValue = localStorageMock.getItem("chatounemusic-favorites");
    expect(storedValue).toBeTruthy();

    const parsed = JSON.parse(storedValue!);
    expect(parsed).toContain("track-1");
  });

  it("restaure les favoris depuis localStorage", () => {
    localStorageMock.setItem(
      "chatounemusic-favorites",
      JSON.stringify(["track-5", "track-10"])
    );
    const favs = getFavorites();

    expect(favs).toContain("track-5");
    expect(favs).toContain("track-10");
  });

  // --- Cas limites ---

  it("gère un localStorage corrompu (JSON invalide)", () => {
    localStorageMock.setItem(
      "chatounemusic-favorites",
      "not-valid-json{{{"
    );

    expect(() => getFavorites()).not.toThrow();
    const favs = getFavorites();
    expect(favs).toBeInstanceOf(Array);
    expect(favs).toHaveLength(0);
  });

  it("gère un localStorage avec un type inattendu (objet au lieu de tableau)", () => {
    localStorageMock.setItem(
      "chatounemusic-favorites",
      JSON.stringify({ foo: "bar" })
    );

    expect(() => getFavorites()).not.toThrow();
    const favs = getFavorites();
    expect(favs).toBeInstanceOf(Array);
    expect(favs).toHaveLength(0);
  });

  it("gère localStorage indisponible", () => {
    const originalGetItem = localStorageMock.getItem;
    localStorageMock.getItem = vi.fn(() => {
      throw new Error("localStorage disabled");
    });

    expect(() => getFavorites()).not.toThrow();

    localStorageMock.getItem = originalGetItem;
  });

  it("gère un localStorage plein (QuotaExceededError)", () => {
    const originalSetItem = localStorageMock.setItem;
    localStorageMock.setItem = vi.fn(() => {
      throw new DOMException("QuotaExceededError", "QuotaExceededError");
    });

    expect(() => addFavorite("track-1")).not.toThrow();

    localStorageMock.setItem = originalSetItem;
  });
});
