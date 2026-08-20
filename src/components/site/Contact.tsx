import { useState, type FormEvent } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSite } from "@/lib/site-store";
import { waLink } from "@/lib/whatsapp";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  company: z.string().trim().min(2, "Please enter company / designation").max(120),
  phone: z.string().trim().min(7, "Please enter a valid contact number").max(20),
  program: z.string().trim().min(1, "Please select a program"),
  message: z.string().trim().max(1000).optional(),
});

export function Contact() {
  const { data } = useSite();
  const [form, setForm] = useState({ name: "", company: "", phone: "", program: "", message: "" });

  const update = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    const v = parsed.data;
    const text = [
      `New training inquiry for ${data.brand.company}`,
      `Name: ${v.name}`,
      `Company / Designation: ${v.company}`,
      `Contact: ${v.phone}`,
      `Program of interest: ${v.program}`,
      v.message ? `Message: ${v.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    navigator.clipboard?.writeText(text).catch(() => undefined);
    window.open(waLink(data.contact.whatsapp, text), "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp — details copied to your clipboard.");
  };

  return (
    <section id="contact" className="bg-secondary/60 py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-deep">Contact</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Let&apos;s design your next program</h2>
          <p className="mt-4 text-muted-foreground">
            Share a few details and the inquiry opens directly in WhatsApp — no forms lost in an inbox.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href={waLink(data.contact.whatsapp, "Hello, I'd like to discuss a training program.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-card"
            >
              <MessageCircle className="size-5 text-gold-deep" />
              <span className="text-sm font-semibold">+{data.contact.whatsapp} (WhatsApp / Call)</span>
            </a>
            <a
              href={`tel:+${data.contact.secondaryPhone}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-card"
            >
              <Phone className="size-5 text-gold-deep" />
              <span className="text-sm font-semibold">+{data.contact.secondaryPhone}</span>
            </a>
            <a
              href={`mailto:${data.contact.email}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-card"
            >
              <Mail className="size-5 text-gold-deep" />
              <span className="text-sm font-semibold">{data.contact.email}</span>
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-elegant sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" maxLength={100} value={form.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company / Designation</Label>
              <Input id="company" maxLength={120} value={form.company} onChange={(e) => update("company", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Contact Number</Label>
              <Input id="phone" maxLength={20} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="program">Program of Interest</Label>
              <select
                id="program"
                value={form.program}
                onChange={(e) => update("program", e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm"
              >
                <option value="">Select a program</option>
                {data.courses.map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title}
                  </option>
                ))}
                <option value="Custom / Not sure yet">Custom / Not sure yet</option>
              </select>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              rows={4}
              maxLength={1000}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Team size, preferred dates, key challenges…"
            />
          </div>
          <Button type="submit" variant="gold" size="xl" className="mt-6 w-full">
            <MessageCircle className="size-4" /> Send Inquiry on WhatsApp
          </Button>
        </form>
      </div>
    </section>
  );
}