import { Reveal, Section, SectionHeading } from "@/components/site/primitives";
import { CAPABILITIES } from "@/lib/campus-data";

export function CapabilitiesSection() {
  return (
    <Section id="why" className="bg-surface">
      <SectionHeading
        eyebrow="Why CampusGrid"
        title="The data layer your campus software is missing"
        body="Identity, structure, permissions and synchronization — solved once, for every product."
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((c, i) => (
          <Reveal key={c.title} delay={(i % 3) * 0.05}>
            <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
              <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <c.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
