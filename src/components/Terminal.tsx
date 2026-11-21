"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Line =
  | { k: "cmd"; text: string; typing: boolean }
  | { k: "step"; label: string; status: "spin" | "done"; time: string }
  | { k: "bar"; pct: number }
  | { k: "ready"; text: string }
  | { k: "url"; label: string }
  | { k: "prompt" };

const COMMAND = "npx puretik create your-idea";
const URL_TEXT = "https://your-idea.com";
const TIMES = ["0.6s", "1.1s", "2.3s", "0.8s"];
const SPIN = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
const BAR_WIDTH = 20;
const MONO =
  'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace';

export type TerminalText = {
  steps: string[];
  ready: string;
  live: string;
};

function Prompt() {
  return (
    <span className="select-none whitespace-pre">
      <span className="hidden sm:inline">
        <span className="text-accent">dev@puretik</span>{" "}
        <span className="text-[#7aa2f7]">~/projects</span>{" "}
      </span>
      <span className="text-[#7aa2f7] sm:hidden">~ </span>
      <span className="text-fg/70">%</span>{" "}
    </span>
  );
}

function Cursor() {
  return (
    <span className="inline-block h-[1.15em] w-[0.6em] translate-y-[3px] animate-pulse bg-fg/80" />
  );
}

function finalLines(t: TerminalText): Line[] {
  return [
    { k: "cmd", text: COMMAND, typing: false },
    ...t.steps.flatMap((label, i): Line[] => {
      const step: Line = { k: "step", label, status: "done", time: TIMES[i] };
      if (i === 3) return [step, { k: "bar", pct: 100 }];
      return [step];
    }),
    { k: "ready", text: t.ready },
    { k: "url", label: t.live },
    { k: "prompt" },
  ];
}

// A fake terminal that "runs" a project launch once it scrolls into view:
// types a command, shows spinners that resolve into timed checkmarks,
// a progress bar, and the live URL.
export function Terminal({ text }: { text: TerminalText }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [lines, setLines] = useState<Line[]>([]);
  const [tick, setTick] = useState(0);
  const [finished, setFinished] = useState(false);

  // `text` arrives as a fresh object on every parent render, so the animation
  // is keyed on its content instead of its identity.
  const textKey = JSON.stringify(text);

  // Spinner frame clock: only runs while the animation is in progress.
  useEffect(() => {
    if (!inView || reduce || finished) return;
    const id = setInterval(() => setTick((v) => v + 1), 80);
    return () => clearInterval(id);
  }, [inView, reduce, finished]);

  useEffect(() => {
    if (!inView) return;
    const t: TerminalText = JSON.parse(textKey);
    let cancelled = false;
    // Waits, then reports whether this run was superseded in the meantime
    // (React runs effects twice in development, and hot reload re-runs them).
    const superseded = async (ms: number) => {
      await new Promise((r) => setTimeout(r, ms));
      return cancelled;
    };

    (async () => {
      // Always start from a clean screen so a re-run can never stack on top
      // of an earlier run's output.
      setFinished(false);
      setLines([]);

      if (reduce) {
        setLines(finalLines(t));
        setFinished(true);
        return;
      }

      let n = 0;
      const push = (l: Line) => {
        setLines((prev) => [...prev, l]);
        return n++;
      };
      const patch = (i: number, p: Partial<Line>) =>
        setLines((prev) =>
          prev.map((l, idx) => (idx === i ? ({ ...l, ...p } as Line) : l)),
        );

      if (await superseded(350)) return;
      const cmd = push({ k: "cmd", text: "", typing: true });
      for (let c = 1; c <= COMMAND.length; c++) {
        patch(cmd, { text: COMMAND.slice(0, c) });
        if (await superseded(32 + Math.random() * 40)) return;
      }
      if (await superseded(450)) return;
      patch(cmd, { typing: false });

      for (let i = 0; i < t.steps.length; i++) {
        const step = push({
          k: "step",
          label: t.steps[i],
          status: "spin",
          time: TIMES[i],
        });
        if (i === 3) {
          const bar = push({ k: "bar", pct: 0 });
          for (let p = 0; p <= 100; p += 5) {
            patch(bar, { pct: p });
            if (await superseded(55)) return;
          }
        } else if (await superseded(650 + i * 150)) {
          return;
        }
        patch(step, { status: "done" });
      }

      if (await superseded(300)) return;
      push({ k: "ready", text: t.ready });
      if (await superseded(200)) return;
      push({ k: "url", label: t.live });
      if (await superseded(400)) return;
      push({ k: "prompt" });
      setFinished(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [inView, reduce, textKey]);

  return (
    <div ref={ref} className="relative">
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-x-2 translate-y-2 rounded-xl bg-gradient-to-br from-accent to-lime sm:translate-x-3 sm:translate-y-3 rtl:-translate-x-2 sm:rtl:-translate-x-3"
      />
      <div
        dir="ltr"
        className="relative overflow-hidden rounded-xl border border-black bg-[#0c0e0f] shadow-2xl shadow-black/60"
      >
        {/* macOS-style title bar */}
        <div className="relative flex items-center border-b border-black bg-gradient-to-b from-[#34373a] to-[#26282b] px-3 py-2 sm:px-4 sm:py-2.5">
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] ring-1 ring-black/30 sm:h-3 sm:w-3" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] ring-1 ring-black/30 sm:h-3 sm:w-3" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] ring-1 ring-black/30 sm:h-3 sm:w-3" />
          </div>
          <span
            className="absolute inset-x-0 text-center text-[11px] text-white/60 sm:text-[13px]"
            style={{ fontFamily: MONO }}
          >
            dev — zsh — 80×24
          </span>
        </div>

        <div
          className="min-h-[13.5rem] px-3 py-3 text-[11px] leading-[1.6] text-[#d8dee0] sm:min-h-[22rem] sm:px-5 sm:py-4 sm:text-sm sm:leading-[1.7]"
          style={{ fontFamily: MONO }}
          aria-label="Terminal animation"
        >
          {lines.map((line, i) => {
            switch (line.k) {
              case "cmd":
                return (
                  <p key={i}>
                    <Prompt />
                    <span className="text-white">{line.text}</span>
                    {line.typing && <Cursor />}
                  </p>
                );
              case "step":
                return (
                  <p key={i} className="flex items-baseline gap-2">
                    <span className="w-4 shrink-0 text-accent">
                      {line.status === "done" ? "✔" : SPIN[tick % SPIN.length]}
                    </span>
                    <span
                      dir="auto"
                      className="flex-1"
                      style={{ textAlign: "left" }}
                    >
                      {line.label}
                    </span>
                    {line.status === "done" && (
                      <span className="text-white/35">{line.time}</span>
                    )}
                  </p>
                );
              case "bar": {
                const filled = Math.round((line.pct / 100) * BAR_WIDTH);
                return (
                  <p key={i} className="ps-6 whitespace-pre">
                    <span className="text-accent">{"█".repeat(filled)}</span>
                    <span className="text-white/15">
                      {"░".repeat(BAR_WIDTH - filled)}
                    </span>
                    <span className="text-white/60"> {line.pct}%</span>
                  </p>
                );
              }
              case "ready":
                return (
                  <p
                    key={i}
                    dir="auto"
                    className="mt-3 text-white/70"
                    style={{ textAlign: "left" }}
                  >
                    {line.text}
                  </p>
                );
              case "url":
                return (
                  <p key={i} className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-accent">➜</span>
                    <span className="text-white/70">
                      <span dir="auto">{line.label}</span>:
                    </span>
                    <span className="font-bold text-accent underline decoration-accent/40 underline-offset-4">
                      {URL_TEXT}
                    </span>
                  </p>
                );
              case "prompt":
                return (
                  <p key={i} className="mt-3">
                    <Prompt />
                    <Cursor />
                  </p>
                );
            }
          })}
        </div>
      </div>
    </div>
  );
}
