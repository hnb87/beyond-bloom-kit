export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section id="faq" className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-deep">FAQ</p>
        <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Frequently asked questions</h2>
        <div className="mt-8 space-y-4">
          {items.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-border bg-card p-5 shadow-card"
            >
              <summary className="cursor-pointer list-none text-base font-bold marker:hidden">
                {f.q}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
