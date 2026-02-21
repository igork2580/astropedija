"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { GeoLocation } from "@/types";

interface LocationAutocompleteProps {
  value: string;
  onChange: (location: GeoLocation) => void;
  label?: string;
  error?: string;
}

export function LocationAutocomplete({
  value,
  onChange,
  label = "Mesto rođenja",
  error,
}: LocationAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setQuery(val);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (val.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/geo/search?q=${encodeURIComponent(val)}&maxRows=5`);
        if (res.ok) {
          const data: GeoLocation[] = await res.json();
          setResults(data);
          setIsOpen(data.length > 0);
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    }, 300);
  }

  function handleSelect(location: GeoLocation) {
    setQuery(`${location.name}, ${location.countryName}`);
    setIsOpen(false);
    onChange(location);
  }

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Počnite da kucate mesto..."
        className={cn(
          "w-full rounded-xl border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
          "transition-colors duration-200",
          error ? "border-secondary" : "border-border",
        )}
      />
      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
      {isOpen && results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full rounded-xl border border-border bg-bg-end/95 backdrop-blur-xl shadow-xl py-1">
          {results.map((loc, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => handleSelect(loc)}
                className="w-full px-4 py-2.5 text-left text-sm text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
              >
                {loc.name}, {loc.countryName}
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-1 text-xs text-secondary">{error}</p>}
    </div>
  );
}
