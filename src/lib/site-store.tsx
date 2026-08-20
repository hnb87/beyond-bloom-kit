import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultSiteData, type SiteData } from "@/data/siteContent";
import type { ClientItem } from "@/data/siteContent";

const STORAGE_KEY = "bbks-site-data-v1";

interface SiteContextValue {
  data: SiteData;
  setData: (next: SiteData) => void;
  reset: () => void;
  hydrated: boolean;
}

const SiteContext = createContext<SiteContextValue | null>(null);

function merge(base: SiteData, patch: Partial<SiteData>): SiteData {
  // Bundled asset URLs change on every build — never let a stale cached copy win.
  const isBundled = (v?: string) => !!v && /\/(src\/)?assets\//.test(v);
  const hero = { ...base.hero, ...(patch.hero ?? {}) };
  if (isBundled(patch.hero?.portraitImage)) hero.portraitImage = base.hero.portraitImage;
  if (isBundled(patch.hero?.backgroundImage)) hero.backgroundImage = base.hero.backgroundImage;
  // Older saved data stored clients as plain strings.
  const rawClients = patch.clients as unknown;
  const clients: ClientItem[] | undefined = Array.isArray(rawClients)
    ? (rawClients as unknown[]).map((c, i) =>
        typeof c === "string" ? { id: `cl${i + 1}`, name: c, logo: "" } : (c as ClientItem),
      )
    : undefined;
  return {
    ...base,
    ...patch,
    ...(clients ? { clients } : {}),
    brand: { ...base.brand, ...(patch.brand ?? {}) },
    contact: { ...base.contact, ...(patch.contact ?? {}) },
    hero,
    about: { ...base.about, ...(patch.about ?? {}) },
  };
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<SiteData>(defaultSiteData);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          if (!cancelled) setDataState(merge(defaultSiteData, JSON.parse(stored) as Partial<SiteData>));
        } catch {
          /* ignore malformed cache */
        }
      } else {
        try {
          const res = await fetch("/data/siteData.json", { cache: "no-store" });
          if (res.ok) {
            const json = (await res.json()) as Partial<SiteData>;
            if (!cancelled) setDataState(merge(defaultSiteData, json));
          }
        } catch {
          /* no remote config present — defaults are fine */
        }
      }
      if (!cancelled) setHydrated(true);
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const setData = useCallback((next: SiteData) => {
    setDataState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }, []);

  const reset = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setDataState(defaultSiteData);
  }, []);

  const value = useMemo(() => ({ data, setData, reset, hydrated }), [data, setData, reset, hydrated]);
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}