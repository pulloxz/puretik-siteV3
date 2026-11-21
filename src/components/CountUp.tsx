"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { formatCount } from "@/lib/count";

export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      // Reduced motion: jump straight to the final value.
      duration: reduce ? 0 : 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setDisplay,
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} dir="ltr" className="tabular-nums">
      {formatCount(display)}
    </span>
  );
}
