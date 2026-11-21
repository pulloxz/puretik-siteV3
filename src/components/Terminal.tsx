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

  // Spinner frame clock.
  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setTick((v) => v + 1), 80);
    return () => clearInterval(id);
  }, [inView, reduce]);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    (async () => {
      if (reduce) {
        setLines(finalLines(text));
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

      await sleep(350);
      const cmd = push({ k: "cmd", text: "", typing: true });
      for (let c = 1; c <= COMMAND.length; c++) {
        if (cancelled) return;
        patch(cmd, { text: COMMAND.slice(0, c) });
        await sleep(32 + Math.random() * 40);
      }
      await sleep(450);
      patch(cmd, { typing: false });

      for (let i = 0; i < text.steps.length; i++) {
        if (cancelled) return;
        const step = push({
          k: "step",
          label: text.steps[i],
          status: "spin",
          time: TIMES[i],
        });
        if (i === 3) {
          const bar = push({ k: "bar", pct: 0 });
          for (let p = 0; p <= 100; p += 5) {
            if (cancelled) return;
            patch(bar, { pct: p });
            await sleep(55);
          }
        } else {
          await sleep(650 + i * 150);
        }
        if (cancelled) return;
        patch(step, { status: "done" });
      }

      await sleep(300);
      push({ k: "ready", text: text.ready });
      await sleep(200);
      push({ k: "url", label: text.live });
      await sleep(400);
      push({ k: "prompt" });
    })();

    return () => {
      cancelled = true;
    };
  }, [inView, reduce, text]);

  return (
    <div ref={ref} className="relative">
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl bg-gradient-to-br from-accent to-lime rtl:-translate-x-3"
      />
      <div
        dir="ltr"
        className="relative overflow-hidden rounded-xl border border-black bg-[#0c0e0f] shadow-2xl shadow-black/60"
      >
        {/* macOS-style title bar */}
        <div className="relative flex items-center border-b border-black bg-gradient-to-b from-[#34373a] to-[#26282b] px-4 py-2.5">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57] ring-1 ring-black/30" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e] ring-1 ring-black/30" />
            <span className="h-3 w-3 rounded-full bg-[#28c840] ring-1 ring-black/30" />
          </div>
          <span
            className="absolute inset-x-0 text-center text-[13px] text-white/60"
            style={{ fontFamily: MONO }}
          >
            dev — zsh — 80×24
          </span>
        </div>

        <div
          className="min-h-[18rem] px-4 sm:min-h-[22rem] sm:px-5 py-4 text-[13px] leading-[1.7] text-[#d8dee0] sm:text-sm"
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
