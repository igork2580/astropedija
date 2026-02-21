"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "astroput-onboarding";

interface OnboardingState {
  completed: boolean;
  selectedSign: string | null;
}

const DEFAULT_STATE: OnboardingState = {
  completed: false,
  selectedSign: null,
};

export function useOnboarding() {
  const [state, setState] = useState<OnboardingState>(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setState(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  const complete = useCallback((sign: string) => {
    const next: OnboardingState = { completed: true, selectedSign: sign };
    setState(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULT_STATE);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return {
    loaded,
    completed: state.completed,
    selectedSign: state.selectedSign,
    complete,
    reset,
  };
}
