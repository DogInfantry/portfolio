"use client";

import { useEffect, useRef, useState } from "react";

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

function Counter({ stat, active }: { stat: Stat; active: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    const dur = 1400;
    const start = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(stat.value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, stat.value]);

  return (
    <div className="flex flex-col gap-1">
      <span className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
        {stat.prefix}
        {n.toLocaleString("en-IN")}
        {stat.suffix}
      </span>
      <span className="text-sm text-muted">{stat.label}</span>
    </div>
  );
}

export default function StatBand({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-line py-10 md:grid-cols-4"
    >
      {stats.map((s) => (
        <Counter key={s.label} stat={s} active={active} />
      ))}
    </div>
  );
}
