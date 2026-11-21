"use client";

import { usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import type { Locale } from "@/i18n/config";

export function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const other: Locale = locale === "ar" ? "en" : "ar";
  const target = pathname.replace(/^\/(ar|en)/, `/${other}`);

  return (
    <a
      href={target}
      lang={other}
      onClick={(e) => {
        e.preventDefault();
        // The new locale remounts the layout; tell the intro not to replay.
        try {
          sessionStorage.setItem("pt-skip-intro", "1");
        } catch {}
        // Keep the visitor on the same section after switching language.
        router.push(`${target}${window.location.hash}`);
      }}
      className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-sm text-fg transition hover:border-accent/60 hover:text-accent"
    >
      <Languages className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}
