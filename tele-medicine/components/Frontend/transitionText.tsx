"use client";

import React, { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";

export default function TransitionText({
  TEXTS,
  className = "",
}: {
  TEXTS: string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false); // Prevents SSR mismatch

  // Ensure component renders only on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return; // Avoid running before mount

    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % TEXTS.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [isMounted, TEXTS.length]);

  // Don't render anything until hydration is complete
  if (!isMounted) return null;

  return (
    <span className={className}>
      <TextTransition springConfig={presets.wobbly}>
        {TEXTS[index]}
      </TextTransition>
    </span>
  );
}
