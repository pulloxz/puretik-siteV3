"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the drawer is open: Escape closes it and the page behind can't scroll.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const links = [
    { href: "#services", label: dict.nav.services },
    { href: "#process", label: dict.nav.process },
    { href: "#projects", label: dict.nav.projects },
    { href: "#contact", label: dict.nav.contact },
  ];

  // The drawer slides in from the side where the menu button sits.
  const offscreen = locale === "ar" ? "-100%" : "100%";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-bg/75 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300 sm:px-6 ${
            scrolled ? "h-16" : "h-24 pt-6"
          }`}
        >
          <a href={`/${locale}`} aria-label="PureTik">
            <Logo />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-muted transition hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* On phones the language switch lives in the drawer. */}
            <div className="hidden sm:block">
              <LanguageSwitcher locale={locale} label={dict.nav.langLabel} />
            </div>
            <a
              href="#contact"
              className="hidden rounded-full bg-accent px-5 py-2 text-sm font-semibold text-black transition hover:bg-accent-strong sm:inline-block"
            >
              {dict.nav.cta}
            </a>
            <button
              type="button"
              aria-label={dict.nav.menu}
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="rounded-lg border border-border p-2 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Drawer lives outside the header: the header's backdrop blur would
          otherwise trap fixed children inside it. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
        {open && (
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label={dict.nav.menu}
            initial={{ x: offscreen }}
            animate={{ x: 0 }}
            exit={{ x: offscreen }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 end-0 z-[70] flex w-[84%] max-w-sm flex-col border-s border-border bg-bg-elevated px-6 py-5 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <Logo className="h-9 w-auto" />
              <button
                type="button"
                aria-label={dict.nav.menu}
                onClick={() => setOpen(false)}
                className="rounded-lg border border-border p-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-10 flex-1">
              <ul>
                {links.map((l, i) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-border py-5 text-2xl font-bold transition hover:text-accent"
                    >
                      {l.label}
                      <span className="font-mono text-sm font-normal text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-4 pt-6">
              <LanguageSwitcher locale={locale} label={dict.nav.langLabel} />
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-gradient-to-r from-accent to-lime px-6 py-3.5 text-center font-semibold text-black rtl:bg-gradient-to-l"
              >
                {dict.nav.cta}
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
