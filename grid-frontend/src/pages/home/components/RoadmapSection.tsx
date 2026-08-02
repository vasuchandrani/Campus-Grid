import { Reveal, Section, SectionHeading } from "@/components/site/primitives";
import { ROADMAP } from "@/lib/campus-data";

export function RoadmapSection() {
  return (
    <Section className="bg-surface">
      <SectionHeading
        eyebrow="Coming to CampusGrid"
        title="The grid keeps growing"
        body="These are future features of CampusGrid itself — built on the directory you have already configured, with no new onboarding."
      />
      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {ROADMAP.map((r, i) => (
          <Reveal key={r.title} delay={(i % 5) * 0.05}>
            <div className="h-full rounded-2xl border border-border bg-card p-5 shadow-soft transition-transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center rounded-xl bg-secondary text-primary">
                  <r.icon className="size-4.5" />
                </span>
                <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-semibold text-accent-foreground">
                  {r.when}
                </span>
              </div>
              <p className="mt-4 text-sm font-semibold">{r.title}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
