import type { Dictionary } from "@/i18n/get-dictionary";

// Two crossing ribbons of service names. dir="ltr" keeps the scroll math
// simple in both languages; each phrase still renders with correct Arabic.
// The back ribbon shows the other language's names, as a bilingual touch.
function Row({
  words,
  id,
  separator,
  itemClass,
  separatorClass,
}: {
  words: string[];
  id: string;
  separator: string;
  itemClass: string;
  separatorClass: string;
}) {
  return (
    <>
      {words.map((w, i) => (
        <span key={`${id}${i}`} className="flex items-center gap-8 px-4">
          <span className={itemClass}>{w}</span>
          <span aria-hidden="true" className={separatorClass}>
            {separator}
          </span>
        </span>
      ))}
    </>
  );
}

// One half of the looping track: the words twice, so it is wider than any
// screen. The track holds two identical halves and slides by exactly one.
function Half(props: Omit<Parameters<typeof Row>[0], "id"> & { id: string }) {
  return (
    <div className="flex shrink-0 items-center">
      <Row {...props} id={`${props.id}a`} />
      <Row {...props} id={`${props.id}b`} />
    </div>
  );
}

export function Marquee({
  dict,
  altDict,
}: {
  dict: Dictionary;
  altDict: Dictionary;
}) {
  const front = dict.services.items.map((s) => s.title);
  const back = altDict.services.items.map((s) => s.title);

  return (
    <div
      aria-hidden="true"
      className="relative z-10 -mt-20 h-40 sm:-mt-[6.5rem] sm:h-52 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]"
    >
      {/* Back ribbon: dark, outlined text, runs the opposite way, slower. */}
      <div
        dir="ltr"
        className="absolute inset-x-[-6%] top-1/2 -translate-y-1/2 rotate-[6deg] sm:rotate-[3.5deg] border-y border-border bg-[#0a1113] py-3"
      >
        <div className="marquee-track marquee-track-reverse">
          {[0, 1].map((n) => (
            <Half
              key={n}
              id={`b${n}`}
              words={back}
              separator="/"
              itemClass="text-base font-bold uppercase tracking-[0.2em] sm:text-lg text-transparent [-webkit-text-stroke:1px_rgba(56,254,191,0.65)]"
              separatorClass="font-mono text-lg text-accent/60"
            />
          ))}
        </div>
      </div>

      {/* Front ribbon: bright brand gradient with code-style separators. */}
      <div
        dir="ltr"
        className="absolute inset-x-[-6%] top-1/2 z-10 -translate-y-1/2 -rotate-[5deg] sm:-rotate-[3deg] bg-gradient-to-r from-accent to-lime py-4 shadow-2xl shadow-black/50"
      >
        <div className="marquee-track">
          {[0, 1].map((n) => (
            <Half
              key={n}
              id={`f${n}`}
              words={front}
              separator="</>"
              itemClass="text-xl font-extrabold text-black sm:text-2xl"
              separatorClass="font-mono text-lg font-bold text-black/60"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
