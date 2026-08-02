import { Check } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/site/primitives";
import { SECURITY } from "@/lib/campus-data";

export function SecuritySection() {
  return (
    <Section id="security">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <SectionHeading
          align="left"
          eyebrow="Security"
          title="Enterprise security, by default"
          body="Institutional data deserves institutional guarantees. Every connected product inherits the same controls."
        />
        <Reveal delay={0.08}>
          <div className="grid gap-3 sm:grid-cols-2">
            {SECURITY.map((s) => (
              <div key={s} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <Check className="size-4 text-accent" />
                <p className="mt-3 text-sm leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
