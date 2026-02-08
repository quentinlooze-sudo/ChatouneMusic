const STORAGE_KEY = "chatounemusic-favorites";

export function getFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function addFavorite(trackId: string): void {
  try {
    const favs = getFavorites();
    if (favs.includes(trackId)) return;
    favs.push(trackId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
  } catch {
    // localStorage full or unavailable — fail silently
  }
}

export function removeFavorite(trackId: string): void {
  try {
    const favs = getFavorites().filter((id) => id !== trackId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
  } catch {
    // localStorage unavailable — fail silently
  }
}

export function isFavorite(trackId: string): boolean {
  return getFavorites().includes(trackId);
}

export function clearFavorites(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage unavailable — fail silently
  }
}
