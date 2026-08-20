import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, LogOut, Plus, RotateCcw, Save, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSite } from "@/lib/site-store";
import type { Course, CourseStatus, GalleryCategory, GalleryItem, SiteData } from "@/data/siteContent";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel | Best and Beyond Knowledge Solutions" },
      { name: "description", content: "Private content manager for the Best and Beyond website." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Panel | Best and Beyond Knowledge Solutions" },
      { property: "og:description", content: "Private content manager for the Best and Beyond website." },
    ],
  }),
  component: AdminPage,
});

const statuses: CourseStatus[] = ["Running", "Upcoming", "On Demand"];
const categories: GalleryCategory[] = ["Corporate", "Campus / University", "Leadership Workshops"];

function AdminPage() {
  const { data, setData, reset } = useSite();
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [draft, setDraft] = useState<SiteData | null>(null);
  const [usePhpApi, setUsePhpApi] = useState(false);

  const current = draft ?? data;
  const patch = (next: Partial<SiteData>) => setDraft({ ...current, ...next });

  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/60 px-4">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-elegant">
          <h1 className="text-xl font-bold">Admin Access</h1>
          <p className="mt-1 text-sm text-muted-foreground">Enter the site PIN to manage content.</p>
          <Input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN"
            className="mt-5"
            onKeyDown={(e) => {
              if (e.key === "Enter") unlock();
            }}
          />
          <Button variant="gold" className="mt-4 w-full" onClick={unlock}>
            Unlock
          </Button>
          <Link to="/" className="mt-4 block text-center text-xs text-muted-foreground hover:text-foreground">
            Back to website
          </Link>
        </div>
      </div>
    );
  }

  function unlock() {
    if (pin === data.adminPin) {
      setUnlocked(true);
      setDraft(data);
    } else {
      toast.error("Incorrect PIN");
    }
  }

  const save = async () => {
    setData(current);
    toast.success("Changes saved to this browser and applied live.");
    if (usePhpApi) {
      try {
        const res = await fetch("/api/save.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(current),
        });
        toast[res.ok ? "success" : "error"](
          res.ok ? "Synced to server siteData.json" : "PHP sync failed — download the JSON instead.",
        );
      } catch {
        toast.error("PHP endpoint unavailable — download the JSON instead.");
      }
    }
  };

  const download = () => {
    const blob = new Blob([JSON.stringify(current, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "siteData.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const updateCourse = (id: string, next: Partial<Course>) =>
    patch({ courses: current.courses.map((c) => (c.id === id ? { ...c, ...next } : c)) });
  const updateGallery = (id: string, next: Partial<GalleryItem>) =>
    patch({ gallery: current.gallery.map((g) => (g.id === id ? { ...g, ...next } : g)) });

  return (
    <div className="min-h-screen bg-secondary/50">
      <header className="surface-navy">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6">
          <div>
            <h1 className="text-lg font-bold">Content Admin</h1>
            <p className="text-xs text-primary-foreground/70">{current.brand.company}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="gold" size="sm" onClick={save}>
              <Save className="size-4" /> Save &amp; Apply
            </Button>
            <Button variant="outlineLight" size="sm" onClick={download}>
              <Download className="size-4" /> Download siteData.json
            </Button>
            <Button variant="outlineLight" size="sm" asChild>
              <Link to="/">Live Preview</Link>
            </Button>
            <Button variant="outlineLight" size="sm" onClick={() => setUnlocked(false)}>
              <LogOut className="size-4" /> Lock
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Tabs defaultValue="general">
          <TabsList className="flex h-auto flex-wrap">
            <TabsTrigger value="general">General &amp; Contact</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="export">Export &amp; Sync</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6 space-y-6">
            <Card title="Contact details">
              <Field label="Primary WhatsApp (country code, digits only)" value={current.contact.whatsapp} onChange={(v) => patch({ contact: { ...current.contact, whatsapp: v } })} />
              <Field label="Secondary phone" value={current.contact.secondaryPhone} onChange={(v) => patch({ contact: { ...current.contact, secondaryPhone: v } })} />
              <Field label="Email" value={current.contact.email} onChange={(v) => patch({ contact: { ...current.contact, email: v } })} />
              <Field label="LinkedIn URL" value={current.contact.linkedin} onChange={(v) => patch({ contact: { ...current.contact, linkedin: v } })} />
              <Field label="Facebook URL" value={current.contact.facebook} onChange={(v) => patch({ contact: { ...current.contact, facebook: v } })} />
              <Field label="Instagram URL" value={current.contact.instagram} onChange={(v) => patch({ contact: { ...current.contact, instagram: v } })} />
              <Field label="YouTube URL" value={current.contact.youtube} onChange={(v) => patch({ contact: { ...current.contact, youtube: v } })} />
            </Card>

            <Card title="Hero banner">
              <div className="sm:col-span-2 space-y-2">
                <Label>Headline</Label>
                <Textarea rows={2} value={current.hero.headline} onChange={(e) => patch({ hero: { ...current.hero, headline: e.target.value } })} />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label>Subtext</Label>
                <Textarea rows={3} value={current.hero.subtext} onChange={(e) => patch({ hero: { ...current.hero, subtext: e.target.value } })} />
              </div>
              <Field label="Background image path / URL" value={current.hero.backgroundImage} onChange={(v) => patch({ hero: { ...current.hero, backgroundImage: v } })} />
              <Field label="Portrait image path / URL" value={current.hero.portraitImage} onChange={(v) => patch({ hero: { ...current.hero, portraitImage: v } })} />
              <Field label="Admin PIN" value={current.adminPin} onChange={(v) => patch({ adminPin: v })} />
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="mt-6 space-y-4">
            <Button
              variant="navy"
              onClick={() =>
                patch({
                  courses: [
                    ...current.courses,
                    { id: `c${Date.now()}`, title: "New Program", description: "", duration: "1 Day", status: "Upcoming", signature: false },
                  ],
                })
              }
            >
              <Plus className="size-4" /> Add course
            </Button>
            {current.courses.map((c) => (
              <div key={c.id} className="grid gap-4 rounded-2xl border border-border bg-card p-5 shadow-card sm:grid-cols-2">
                <Field label="Title" value={c.title} onChange={(v) => updateCourse(c.id, { title: v })} />
                <Field label="Duration" value={c.duration} onChange={(v) => updateCourse(c.id, { duration: v })} />
                <div className="space-y-2 sm:col-span-2">
                  <Label>Description</Label>
                  <Textarea rows={2} value={c.description} onChange={(e) => updateCourse(c.id, { description: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <select
                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                    value={c.status}
                    onChange={(e) => updateCourse(c.id, { status: e.target.value as CourseStatus })}
                  >
                    {statuses.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={c.signature} onChange={(e) => updateCourse(c.id, { signature: e.target.checked })} />
                    Signature workshop
                  </label>
                  <Button variant="destructive" size="sm" onClick={() => patch({ courses: current.courses.filter((x) => x.id !== c.id) })}>
                    <Trash2 className="size-4" /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="gallery" className="mt-6 space-y-4">
            <Button
              variant="navy"
              onClick={() =>
                patch({
                  gallery: [
                    ...current.gallery,
                    { id: `g${Date.now()}`, src: "/images/gallery/photo1.jpg", caption: "New photo", category: "Corporate" },
                  ],
                })
              }
            >
              <Plus className="size-4" /> Add image
            </Button>
            {current.gallery.map((g) => (
              <div key={g.id} className="grid gap-4 rounded-2xl border border-border bg-card p-5 shadow-card sm:grid-cols-[120px_1fr_1fr_auto] sm:items-end">
                <img src={g.src} alt={g.caption} loading="lazy" className="h-20 w-full rounded-lg object-cover" />
                <Field label="Image path / URL" value={g.src} onChange={(v) => updateGallery(g.id, { src: v })} />
                <Field label="Caption" value={g.caption} onChange={(v) => updateGallery(g.id, { caption: v })} />
                <div className="space-y-2">
                  <Label>Category</Label>
                  <select
                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                    value={g.category}
                    onChange={(e) => updateGallery(g.id, { category: e.target.value as GalleryCategory })}
                  >
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <Button variant="destructive" size="sm" className="w-full" onClick={() => patch({ gallery: current.gallery.filter((x) => x.id !== g.id) })}>
                    <Trash2 className="size-4" /> Remove
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="export" className="mt-6 space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="font-bold">Export &amp; sync</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Save applies changes instantly in this browser. Download <code>siteData.json</code> and upload it to
                <code> /public/data/siteData.json</code> on your Hostinger account to make changes permanent for all visitors.
              </p>
              <label className="mt-4 flex items-center gap-2 text-sm">
                <input type="checkbox" checked={usePhpApi} onChange={(e) => setUsePhpApi(e.target.checked)} />
                Also POST to <code>/api/save.php</code> on save (PHP-enabled hosting)
              </label>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button variant="gold" onClick={save}>
                  <UploadCloud className="size-4" /> Save &amp; Sync
                </Button>
                <Button variant="navy" onClick={download}>
                  <Download className="size-4" /> Download siteData.json
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    reset();
                    setDraft(null);
                    toast.success("Restored default content");
                  }}
                >
                  <RotateCcw className="size-4" /> Reset to defaults
                </Button>
              </div>
            </div>
            <pre className="max-h-96 overflow-auto rounded-2xl border border-border bg-card p-4 text-xs">
              {JSON.stringify(current, null, 2)}
            </pre>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <h2 className="font-bold">{title}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}