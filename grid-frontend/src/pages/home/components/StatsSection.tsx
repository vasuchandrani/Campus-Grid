import { Reveal, Section, SectionHeading } from "@/components/site/primitives";
import { STATS } from "@/lib/campus-data";

export function StatsSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Why colleges love it"
        title="Less administration. More consistency."
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div className="h-full rounded-2xl border border-border bg-card p-7 shadow-soft">
              <p className="text-4xl font-semibold text-gradient">{s.value}</p>
              <p className="mt-3 text-sm font-semibold">{s.label}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
