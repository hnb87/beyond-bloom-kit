import { Quote } from "lucide-react";
import { useSite } from "@/lib/site-store";

export function Testimonials() {
  const { data } = useSite();
  const items = data.testimonials ?? [];
  if (items.length === 0) return null;

  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-deep">Testimonials</p>
      <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">What participants and partners say</h2>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <figure
            key={t.id}
            className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-card transition-colors hover:border-gold/60"
          >
            <Quote className="size-7 text-gold" />
            <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground/90">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
              {t.photo ? (
                <img
                  src={t.photo}
                  alt={t.name}
                  loading="lazy"
                  className="size-11 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-gold-deep">
                  {t.name.slice(0, 1)}
                </span>
              )}
              <span className="min-w-0">
                <span className="block truncate font-bold">{t.name}</span>
                <span className="block truncate text-sm text-muted-foreground">
                  {[t.role, t.company].filter(Boolean).join(", ")}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}