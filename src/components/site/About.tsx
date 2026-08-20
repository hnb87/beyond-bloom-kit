import { Award, Compass, Repeat, Sparkles, Target } from "lucide-react";
import { useSite } from "@/lib/site-store";

const pillarIcons = [Sparkles, Compass, Target, Repeat];

export function About() {
  const { data } = useSite();

  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-deep">About Nikhil</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            People development with a business owner&apos;s lens
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            {data.about.narrative.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {data.about.pillars.map((pillar, i) => {
            const Icon = pillarIcons[i % pillarIcons.length];
            return (
              <div
                key={pillar.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-card transition-transform hover:-translate-y-1"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-[image:var(--gradient-gold)] text-navy-deep">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold">
                  <span className="text-muted-foreground/60">0{i + 1}. </span>
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-16 rounded-3xl surface-navy p-8 sm:p-10">
        <h3 className="flex items-center gap-2 text-lg font-bold">
          <Award className="size-5 text-gold" /> Certifications &amp; Accreditations
        </h3>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.certifications.map((c) => (
            <li
              key={c}
              className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-3 text-sm text-primary-foreground/85"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}