"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function RotatingWord({
  prefix,
  words,
}: {
  prefix: string;
  words: string[];
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <p className="flex flex-wrap items-center gap-x-3 text-xl font-semibold sm:text-3xl">
      <span className="whitespace-nowrap text-muted">{prefix}</span>
      {/* Fixed-height clip box so the line doesn't jump while words swap. */}
      <span className="relative inline-flex h-[1.5em] items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[i]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="whitespace-nowrap text-accent"
          >
            {words[i]}
          </motion.span>
        </AnimatePresence>
      </span>
      {/* Blinking code cursor after the rotating word. */}
      <span
        aria-hidden="true"
        className="-ms-1.5 inline-block h-[1.1em] w-[3px] animate-pulse bg-accent"
      />
    </p>
  );
}
