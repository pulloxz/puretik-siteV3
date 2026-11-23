"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// "We build" + a word that types itself out, deletes, and types the next one.
// The cursor always sits right after the text, so it moves in small steps
// with each letter instead of jumping when the word changes.
export function RotatingWord({
  prefix,
  words,
}: {
  prefix: string;
  words: string[];
}) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(words[0]);
  // The words array is a new object on every parent render; key on content.
  const wordsKey = JSON.stringify(words);

  useEffect(() => {
    const list: string[] = JSON.parse(wordsKey);
    let cancelled = false;
    const sleep = async (ms: number) => {
      await new Promise((r) => setTimeout(r, ms));
      return cancelled;
    };

    (async () => {
      let i = 0;
      while (!cancelled) {
        // Hold the current word, then move on.
        if (await sleep(1900)) return;

        if (reduce) {
          i = (i + 1) % list.length;
          setShown(list[i]);
          continue;
        }

        // Delete the current word letter by letter...
        const current = Array.from(list[i]);
        for (let c = current.length - 1; c >= 0; c--) {
          setShown(current.slice(0, c).join(""));
          if (await sleep(32)) return;
        }
        if (await sleep(220)) return;

        // ...then type the next one.
        i = (i + 1) % list.length;
        const next = Array.from(list[i]);
        for (let c = 1; c <= next.length; c++) {
          setShown(next.slice(0, c).join(""));
          if (await sleep(75)) return;
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [wordsKey, reduce]);

  return (
    <p className="flex flex-wrap items-center gap-x-3 text-xl font-semibold sm:text-3xl">
      <span className="whitespace-nowrap text-muted">{prefix}</span>
      {/* Fixed-height line so the layout never shifts while typing. */}
      <span
        aria-hidden="true"
        className="inline-flex h-[1.5em] items-center whitespace-nowrap"
      >
        <span className="text-accent">{shown}</span>
        <span className="ms-0.5 inline-block h-[1.1em] w-[3px] animate-pulse bg-accent" />
      </span>
      <span className="sr-only">{words.join(" / ")}</span>
    </p>
  );
}
