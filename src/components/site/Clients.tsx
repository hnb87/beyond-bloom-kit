import { Quote } from "lucide-react";
import { useSite } from "@/lib/site-store";

export function Clients() {
  const { data } = useSite();

  return (
    <section id="clients" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-deep">Trusted By</p>
      <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Corporates, campuses and communities</h2>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {data.clients.map((c) => (
          <div
            key={c}
            className="flex min-h-20 items-center justify-center rounded-xl border border-border bg-card px-4 py-3 text-center text-xs font-semibold text-muted-foreground shadow-card transition-colors hover:border-gold/60 hover:text-foreground"
          >
            {c}
          </div>
        ))}
      </div>

      <figure className="mt-12 rounded-3xl surface-navy p-10 text-center">
        <Quote className="mx-auto size-8 text-gold" />
        <blockquote className="mt-4 text-2xl font-bold sm:text-3xl">
          &ldquo;{data.featuredQuote}&rdquo;
        </blockquote>
        <figcaption className="mt-3 text-sm text-primary-foreground/70">
          {data.brand.person}, {data.brand.company}
        </figcaption>
      </figure>
    </section>
  );
}