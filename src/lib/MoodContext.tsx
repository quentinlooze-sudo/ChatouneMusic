"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { MoodName, TrackResult } from "@/types";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  clearFavorites,
} from "@/lib/favorites";

interface PartnerData {
  name: string;
  mood: MoodName | null;
  energy: number;
}

interface MoodContextType {
  partner1: PartnerData;
  partner2: PartnerData;
  setPartner1: (data: PartnerData) => void;
  setPartner2: (data: PartnerData) => void;
  step: 1 | 2 | 3;
  setStep: (step: 1 | 2 | 3) => void;
  tracks: TrackResult[];
  setTracks: (tracks: TrackResult[]) => void;
  favorites: Set<string>;
  toggleFavorite: (trackId: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  reset: () => void;
}

const defaultPartner: PartnerData = { name: "", mood: null, energy: 50 };

const MoodContext = createContext<MoodContextType | null>(null);

export function MoodProvider({ children }: { children: ReactNode }) {
  const [partner1, setPartner1] = useState<PartnerData>(defaultPartner);
  const [partner2, setPartner2] = useState<PartnerData>(defaultPartner);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [tracks, setTracks] = useState<TrackResult[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hydrate favorites from localStorage on mount
  useEffect(() => {
    setFavorites(new Set(getFavorites()));
  }, []);

  const toggleFavorite = (trackId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(trackId)) {
        next.delete(trackId);
        removeFavorite(trackId);
      } else {
        next.add(trackId);
        addFavorite(trackId);
      }
      return next;
    });
  };

  const reset = () => {
    setPartner1(defaultPartner);
    setPartner2(defaultPartner);
    setStep(1);
    setTracks([]);
    setFavorites(new Set());
    clearFavorites();
    setIsLoading(false);
    setError(null);
  };

  return (
    <MoodContext.Provider
      value={{
        partner1,
        partner2,
        setPartner1,
        setPartner2,
        step,
        setStep,
        tracks,
        setTracks,
        favorites,
        toggleFavorite,
        isLoading,
        setIsLoading,
        error,
        setError,
        reset,
      }}
    >
      {children}
    </MoodContext.Provider>
  );
}

export function useMoodContext() {
  const context = useContext(MoodContext);
  if (!context)
    throw new Error("useMoodContext must be used within MoodProvider");
  return context;
}
