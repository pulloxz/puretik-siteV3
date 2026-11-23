import type { Dictionary } from "@/i18n/get-dictionary";
import { appMeta } from "@/data/apps";
import { projectMeta } from "@/data/projects";
import { COMPANY } from "@/lib/company";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

// The numbers come from the real data, so they stay correct when an app or
// project is added: the dictionary only supplies a key and the label.
const VALUES: Record<string, number> = {
  apps: Object.keys(appMeta).length,
  platforms: Object.keys(projectMeta).length,
  since: COMPANY.founded,
};

// Big outlined numerals on a plain rule, with no box around them.
export function Stats({ dict }: { dict: Dictionary }) {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">
      <Reveal className="grid grid-cols-3 border-y border-border py-8 sm:py-14">
        {dict.stats.items.map((s, i) => (
          <div
            key={s.key}
            className={`px-2 sm:px-4 ${i > 0 ? "border-s border-border" : ""}`}
          >
            <div className="text-4xl font-extrabold text-transparent [-webkit-text-stroke:1.5px_var(--accent)] sm:text-7xl">
              <CountUp value={VALUES[s.key] ?? 0} />
            </div>
            <p className="mt-3 max-w-[14rem] text-xs leading-relaxed text-muted sm:text-sm">
              {s.label}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
