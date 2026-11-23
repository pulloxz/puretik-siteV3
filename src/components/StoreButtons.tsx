// "Get it on App Store / Google Play" buttons. Plain buttons with the store
// logos; the small line above each store name is translated.
export function AppleLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 shrink-0"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

export function PlayLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden="true">
      <path
        fill="#00d7fe"
        d="M1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087z"
      />
      <path
        fill="#00f076"
        d="m13.544 10.989 3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179z"
      />
      <path
        fill="#ff3a44"
        d="m13.544 13.056-11 10.933c.298.036.612-.016.906-.183l13.324-7.54z"
      />
      <path
        fill="#ffd500"
        d="m22.018 13.298-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594z"
      />
    </svg>
  );
}

const BUTTON =
  "group inline-flex items-center gap-3 rounded-xl border border-white/15 bg-black px-4 py-2.5 text-white transition hover:border-accent hover:-translate-y-0.5";

export function StoreButtons({
  apple,
  google,
  label,
  compact = false,
}: {
  apple?: string;
  google?: string;
  /** Small line above each store name, e.g. "Download on". */
  label: string;
  /** Tighter spacing, for use inside small cards. */
  compact?: boolean;
}) {
  return (
    <div className={`flex flex-wrap gap-3 ${compact ? "mt-5" : "mt-6"}`}>
      {apple && (
        <a
          href={apple}
          target="_blank"
          rel="noopener noreferrer"
          dir="ltr"
          className={BUTTON}
        >
          <AppleLogo />
          <span className="leading-tight">
            <span dir="auto" className="block text-[10px] text-white/70">
              {label}
            </span>
            <span className="block text-base font-semibold">App Store</span>
          </span>
        </a>
      )}
      {google && (
        <a
          href={google}
          target="_blank"
          rel="noopener noreferrer"
          dir="ltr"
          className={BUTTON}
        >
          <PlayLogo />
          <span className="leading-tight">
            <span dir="auto" className="block text-[10px] text-white/70">
              {label}
            </span>
            <span className="block text-base font-semibold">Google Play</span>
          </span>
        </a>
      )}
    </div>
  );
}
