import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useSite } from "@/lib/site-store";

export function Footer() {
  const { data } = useSite();
  const socials = [
    { url: data.contact.linkedin, Icon: Linkedin, label: "LinkedIn" },
    { url: data.contact.facebook, Icon: Facebook, label: "Facebook" },
    { url: data.contact.instagram, Icon: Instagram, label: "Instagram" },
    { url: data.contact.youtube, Icon: Youtube, label: "YouTube" },
  ].filter((s) => s.url);

  return (
    <footer className="surface-navy">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <img
            src={data.brand.logo}
            alt={data.brand.company}
            className="size-12 shrink-0 rounded-xl bg-white object-contain p-1"
          />
          <div>
            <p className="text-lg font-bold">{data.brand.company}</p>
            <p className="mt-1 text-sm text-primary-foreground/70">{data.brand.tagline}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {socials.map(({ url, Icon, label }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-full border border-primary-foreground/20 p-2 hover:bg-primary-foreground/10"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-4 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} {data.brand.company}. All rights reserved. ·{" "}
        <Link to="/admin" className="hover:text-gold">
          Admin
        </Link>
      </div>
    </footer>
  );
}