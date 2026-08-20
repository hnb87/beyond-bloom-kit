import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSite } from "@/lib/site-store";
import { waLink } from "@/lib/whatsapp";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#programs", label: "Programs" },
  { href: "#methodology", label: "Methodology" },
  { href: "#gallery", label: "Gallery" },
  { href: "#clients", label: "Clients" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const { data } = useSite();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <img
            src={data.brand.logo}
            alt={`${data.brand.company} logo`}
            className="h-10 w-10 shrink-0 rounded-xl bg-white object-contain p-1 sm:h-11 sm:w-11"
          />
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[13px] font-bold sm:text-base">{data.brand.company}</span>
            <span className="block truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-deep sm:text-[11px]">
              {data.brand.person}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="gold" size="sm" className="hidden sm:inline-flex">
            <a
              href={waLink(data.contact.whatsapp, `Hello ${data.brand.person}, I'd like to know more about your training programs.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-4" /> Connect on WhatsApp
            </a>
          </Button>
          <button
            className="rounded-md p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 pb-4 lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border/60 py-3 text-sm font-medium"
            >
              {l.label}
            </a>
          ))}
          <Button asChild variant="gold" className="mt-4 w-full">
            <a href={waLink(data.contact.whatsapp, "Hello, I'd like to know more about your training programs.")} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" /> Connect on WhatsApp
            </a>
          </Button>
        </nav>
      )}
    </header>
  );
}