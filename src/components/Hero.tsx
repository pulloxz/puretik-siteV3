"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { INTRO_HERO_DELAY } from "@/lib/intro";
import { ParticleField } from "./ParticleField";
import { RotatingWord } from "./RotatingWord";

// Entrance delays start after the intro screen has begun to fade.
const d = (seconds: number) => seconds + INTRO_HERO_DELAY;

export function Hero({ dict }: { dict: Dictionary }) {
  const { hero } = dict;

  // Mouse position over the hero, -0.5..0.5, smoothed. Drives the logo parallax.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18 });
  const markX = useTransform(mx, [-0.5, 0.5], [-26, 26]);
  const markY = useTransform(my, [-0.5, 0.5], [-26, 26]);

  return (
    <section
      id="top"
      className="relative flex min-h-[84vh] items-center overflow-hidden pb-24 pt-28"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        rawX.set((e.clientX - r.left) / r.width - 0.5);
        rawY.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
    >
      {/* Background: a soft diagonal tint plus the drifting dot network from the intro. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #04080a 25%, #06221f 100%)",
        }}
      />
      <ParticleField
        className="absolute inset-0 h-full w-full"
        intensity={0.75}
        density={14000}
      />

      {/* The PureTik mark, large and tilted, drifting slightly with the mouse. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] top-[8%] end-[7%] hidden w-[18%] lg:block"
      >
        <motion.div
          style={{ x: markX, y: markY }}
          initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
          animate={{ opacity: 1, scale: 1, rotate: -7 }}
          transition={{ duration: 1.2, delay: d(0), ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="/brand/logo-mark.png"
            alt=""
            fill
            sizes="50vw"
            priority
            className="object-contain object-center"
          />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: d(0.1), ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl font-extrabold leading-[1.08] tracking-tight min-[420px]:text-6xl sm:text-7xl lg:text-[6.25rem]"
          >
            {hero.titleLead}
            <span className="block bg-gradient-to-r from-accent to-lime bg-clip-text text-transparent rtl:bg-gradient-to-l">
              {hero.titleAccent}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: d(0.35) }}
            className="mt-9"
          >
            <RotatingWord
              prefix={hero.rotatingPrefix}
              words={hero.rotatingWords}
            />
            <p className="mt-3 max-w-md text-muted">{hero.subtitle}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: d(0.5) }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <a
              href="#contact"
              className="rounded-full bg-gradient-to-r from-accent to-lime px-8 py-4 font-semibold text-black transition hover:scale-[1.03] rtl:bg-gradient-to-l"
            >
              {hero.ctaPrimary}
            </a>
            <a
              href="#projects"
              className="group inline-flex items-center gap-1.5 border-b border-fg/30 pb-1 font-medium transition hover:border-accent hover:text-accent"
            >
              {hero.ctaSecondary}
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 rtl:-scale-x-100" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
