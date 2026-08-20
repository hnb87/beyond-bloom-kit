import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSite } from "@/lib/site-store";
import { waLink } from "@/lib/whatsapp";

export function Hero() {
  const { data } = useSite();

  return (
    <section id="home" className="relative overflow-hidden surface-navy">
      <img
        src={data.hero.backgroundImage}
        alt="Nikhil B. Mehta facilitating a corporate leadership workshop"
        width={1920}
        height={1080}
        className="absolute inset-0 size-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-[image:var(--gradient-navy)] opacity-80" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
        <div>
          <span className="inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {data.brand.role}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
            {data.hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
            {data.hero.subtext}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="xl">
              <a href="#programs">
                Explore Programs <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <a
                href={waLink(
                  data.contact.whatsapp,
                  `Hello ${data.brand.person}, I would like to book a workshop for my team. Please share availability and details.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" /> Book a Workshop
              </a>
            </Button>
          </div>

          <dl className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {data.stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-4">
                <dt className="text-3xl font-extrabold text-gradient-gold">{s.value}</dt>
                <dd className="mt-1 text-xs font-medium uppercase tracking-wide text-primary-foreground/70">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-3 rounded-3xl bg-[image:var(--gradient-gold)] opacity-30 blur-2xl" />
          <img
            src={data.hero.portraitImage}
            alt={`${data.brand.person}, ${data.brand.role}`}
            width={900}
            height={1100}
            className="relative w-full rounded-3xl border border-primary-foreground/15 object-cover shadow-elegant"
          />
          <div className="relative -mt-8 mx-4 rounded-xl bg-background p-4 text-center shadow-elegant">
            <p className="text-sm font-bold text-foreground">{data.brand.person}</p>
            <p className="text-xs text-muted-foreground">{data.brand.company}</p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-primary-foreground/10 bg-navy-deep/60 py-4 text-center text-sm font-medium text-primary-foreground/80">
        {data.brand.valueProposition}
      </div>
    </section>
  );
}