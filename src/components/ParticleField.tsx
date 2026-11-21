"use client";

import { useEffect, useRef } from "react";

// Brand mint, as r,g,b for canvas alpha blending.
const MINT = "56, 254, 191";

// A drifting network of dots joined by thin lines, sized to its own box.
// Three depth layers react to the mouse at different strengths (parallax).
// Pauses when off-screen and draws a single still frame for reduced motion.
export function ParticleField({
  className,
  density = 16000,
  link = 150,
  intensity = 1,
}: {
  className?: string;
  /** Pixels of area per particle: lower means more dots. */
  density?: number;
  /** Max distance in px at which two dots are joined by a line. */
  link?: number;
  /** Multiplier for dot and line opacity. */
  intensity?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    type P = { x: number; y: number; vx: number; vy: number; layer: number };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let onScreen = true;
    let ps: P[] = [];

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      for (const p of ps) {
        p.x += p.vx * p.layer * 0.6;
        p.y += p.vy * p.layer * 0.6;
        if (p.x < 0 || p.x > w) p.vx = -p.vx;
        if (p.y < 0 || p.y > h) p.vy = -p.vy;
      }

      const pos = ps.map((p) => ({
        x: p.x - mouse.x * p.layer * 22,
        y: p.y - mouse.y * p.layer * 22,
        layer: p.layer,
      }));

      ctx.lineWidth = 1;
      for (let i = 0; i < pos.length; i++) {
        for (let j = i + 1; j < pos.length; j++) {
          const d = Math.hypot(pos[i].x - pos[j].x, pos[i].y - pos[j].y);
          if (d < link) {
            ctx.strokeStyle = `rgba(${MINT}, ${(1 - d / link) * 0.22 * intensity})`;
            ctx.beginPath();
            ctx.moveTo(pos[i].x, pos[i].y);
            ctx.lineTo(pos[j].x, pos[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of pos) {
        ctx.fillStyle = `rgba(${MINT}, ${(0.3 + p.layer * 0.2) * intensity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.layer * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce || !onScreen) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return;
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(110, Math.round((w * h) / density));
      ps = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        layer: Math.ceil(Math.random() * 3),
      }));
      if (reduce) draw();
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width - 0.5;
      mouse.ty = (e.clientY - r.top) / r.height - 0.5;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(canvas);

    resize();
    start();
    window.addEventListener("mousemove", onMove);
    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, [density, link, intensity]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none ${className ?? ""}`}
    />
  );
}
