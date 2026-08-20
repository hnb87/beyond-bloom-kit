import { useState } from "react";
import { Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSite } from "@/lib/site-store";
import { waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const tabs = ["All Programs", "Running Now", "Upcoming", "Signature Workshops"] as const;
type Tab = (typeof tabs)[number];

export function Programs() {
  const { data } = useSite();
  const [tab, setTab] = useState<Tab>("All Programs");

  const courses = data.courses.filter((c) => {
    if (tab === "Running Now") return c.status === "Running";
    if (tab === "Upcoming") return c.status === "Upcoming";
    if (tab === "Signature Workshops") return c.signature;
    return true;
  });

  return (
    <section id="programs" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-deep">Programs &amp; Courses</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Behavioural programs designed around your business outcomes
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                tab === t
                  ? "border-transparent surface-navy"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <article
            key={c.id}
            className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-gold/60"
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide",
                  c.status === "Running"
                    ? "bg-[image:var(--gradient-gold)] text-navy-deep"
                    : c.status === "Upcoming"
                      ? "surface-navy"
                      : "bg-secondary text-secondary-foreground",
                )}
              >
                {c.status}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3.5" /> {c.duration}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold">{c.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
            <Button asChild variant="navy" className="mt-5 w-full">
              <a
                href={waLink(
                  data.contact.whatsapp,
                  `Hello ${data.brand.person}, I'm interested in the "${c.title}" program (${c.duration}). Please share details.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" /> Inquire via WhatsApp
              </a>
            </Button>
          </article>
        ))}
      </div>
      {courses.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">No programs in this category right now.</p>
      )}
    </section>
  );
}