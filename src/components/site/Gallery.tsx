import { useState } from "react";
import { X } from "lucide-react";
import { useSite } from "@/lib/site-store";
import { cn } from "@/lib/utils";

const filters = ["All", "Corporate", "Campus / University", "Leadership Workshops"] as const;

export function Gallery() {
  const { data } = useSite();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const items = data.gallery.filter((g) => filter === "All" || g.category === filter);

  return (
    <section id="gallery" className="bg-secondary/60 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-deep">Gallery</p>
        <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Moments from the training room</h2>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                filter === f
                  ? "border-transparent surface-navy"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {items.map((g) => (
            <button
              key={g.id}
              onClick={() => setLightbox(g.src)}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card shadow-card"
            >
              <img
                src={g.src}
                alt={g.caption}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-[image:var(--gradient-navy)]/90 p-3 text-left text-xs font-medium text-primary-foreground">
                {g.caption}
              </span>
            </button>
          ))}
        </div>
        {items.length === 0 && <p className="mt-8 text-muted-foreground">No photos in this category yet.</p>}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-navy-deep/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute right-5 top-5 rounded-full bg-background/10 p-2 text-primary-foreground" aria-label="Close">
            <X className="size-6" />
          </button>
          <img src={lightbox} alt="Workshop photo" className="max-h-[85vh] max-w-full rounded-xl object-contain" />
        </div>
      )}
    </section>
  );
}