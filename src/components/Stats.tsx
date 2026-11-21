import type { Dictionary } from "@/i18n/get-dictionary";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

// Big outlined numerals on a plain rule, with no box around them.
export function Stats({ dict }: { dict: Dictionary }) {
  return (
    <section className="px-4 sm:px-6">
      <Reveal className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 border-y border-border py-14 md:grid-cols-4">
        {dict.stats.items.map((s, i) => (
          <div
            key={s.label}
            className={`px-4 ${i > 0 ? "md:border-s md:border-border" : ""}`}
          >
            <div className="text-6xl font-extrabold text-transparent [-webkit-text-stroke:1.5px_var(--accent)] sm:text-7xl">
              <CountUp value={s.value} />
            </div>
            <p className="mt-3 max-w-[12rem] text-sm leading-relaxed text-muted">
              {s.label}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
