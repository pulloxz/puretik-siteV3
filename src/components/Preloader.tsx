"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { INTRO_MS } from "@/lib/intro";
import { ParticleField } from "./ParticleField";

const SKIP_KEY = "pt-skip-intro";

// Full-screen intro shown on every full page load (not on language switches).
export function Preloader() {
  // Client-side navigations (language switch) set the skip flag; a real page
  // load never has it, so server and client agree on `true` there.
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return sessionStorage.getItem(SKIP_KEY) !== "1";
    } catch {
      return true;
    }
  });
  const startedVisible = useRef(visible);

  useEffect(() => {
    try {
      sessionStorage.removeItem(SKIP_KEY);
    } catch {}
    if (!startedVisible.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let hideTimer: ReturnType<typeof setTimeout>;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      const wait = reduce ? 0 : Math.max(0, INTRO_MS - (performance.now() - start));
      hideTimer = setTimeout(() => setVisible(false), wait);
    };

    if (!reduce) document.body.style.overflow = "hidden";
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const cap = setTimeout(finish, 4000); // never wait on a slow asset forever

    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(cap);
      clearTimeout(hideTimer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Loading"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="preloader-root fixed inset-0 z-[100] overflow-hidden"
          style={{
            background: "linear-gradient(45deg, #070b0c 2%, #00262b 100%)",
          }}
        >
          <ParticleField className="absolute inset-0 h-full w-full" />
          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2">
            <div
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)" }}
            />
            <div
              className="loader-arc absolute inset-0 animate-spin rounded-full"
              style={{ animationDuration: "1.2s" }}
            />
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={374}
              height={640}
              priority
              className="absolute left-1/2 top-1/2 h-14 w-auto -translate-x-1/2 -translate-y-1/2 animate-pulse"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
