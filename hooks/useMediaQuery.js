"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(null); // Use `null` as the initial state to avoid premature rendering.

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure it only runs on the client.

    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
