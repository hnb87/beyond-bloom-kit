import { useState } from "react";
import { useSite } from "@/lib/site-store";
import { cn } from "@/lib/utils";

export function Methodology() {
  const { data } = useSite();
  const [active, setActive] = useState(0);
  const current = data.methodology[active] ?? data.methodology[0];

  return (
    <section id="methodology" className="bg-secondary/60 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-deep">Signature Methodology</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
          A 5-step system that moves learning from the room to the workplace
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-5">
          {data.methodology.map((m, i) => (
            <button
              key={m.step}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={cn(
                "rounded-2xl border p-5 text-left transition-all",
                i === active
                  ? "border-transparent surface-navy shadow-elegant"
                  : "border-border bg-card hover:border-gold/60",
              )}
            >
              <span
                className={cn(
                  "text-2xl font-extrabold",
                  i === active ? "text-gradient-gold" : "text-muted-foreground/50",
                )}
              >
                {m.step}
              </span>
              <p className="mt-2 font-bold">{m.title}</p>
            </button>
          ))}
        </div>

        {current && (
          <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card">
            <p className="text-sm font-bold uppercase tracking-wide text-gold-deep">
              Step {current.step} — {current.title}
            </p>
            <p className="mt-2 text-muted-foreground">{current.description}</p>
          </div>
        )}
      </div>
    </section>
  );
}