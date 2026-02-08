// ─── Types morceaux (base locale) ───

export interface CuratedTrack {
  /** ID Spotify du morceau (ex: "6DCZcSspjsKoFjzjrWoCdn") */
  id: string;
  /** Titre du morceau */
  title: string;
  /** Nom de l'artiste (ou artistes séparés par ", ") */
  artist: string;
  /** Nom de l'album */
  album: string;
  /** Durée formatée (ex: "3:29") */
  duration: string;
  /** URL de la pochette (utiliser l'URL Spotify i.scdn.co) — "" pour placeholder */
  coverUrl: string;
  /** Lien direct vers le morceau sur Spotify */
  spotifyUrl: string;
  /** Humeurs associées — un morceau peut appartenir à plusieurs humeurs */
  moods: MoodName[];
  /** Score d'énergie (0-100) — pour l'affinage par le slider */
  energy: number;
  /** Note personnelle (optionnelle) */
  note?: string;
}

// ─── Type résultat normalisé pour le frontend ───

export interface TrackResult {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  spotifyUrl: string;
  spotifyId: string;
}

// ─── Types applicatifs ───

export interface MoodParams {
  valence: number;
  energy: number;
  danceability: number;
  tempo: number;
  acousticness: number;
}

export type MoodName =
  | "joyeux"
  | "romantique"
  | "chill"
  | "melancolique"
  | "energique"
  | "fetard";

export interface Mood {
  name: MoodName;
  label: string;
  emoji: string;
  params: MoodParams;
}
