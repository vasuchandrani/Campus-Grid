import { Check, Minus } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/site/primitives";

const WITHOUT = [
  "The same students are entered in every platform",
  "Faculty and departments maintained twice over",
  "A role change has to be repeated product by product",
  "Authentication duplicated everywhere",
  "Data drifts and becomes inconsistent",
];

const WITH = [
  "Everything is entered once, in CampusGrid",
  "A CampusGrid ID links each product instantly",
  "Connected products stay synchronized automatically",
  "Consistent roles and permissions everywhere",
  "Lower admin workload, better security",
];

export function BusinessValueSection() {
  return (
    <Section className="bg-surface">
      <SectionHeading
        eyebrow="Business value"
        title="The difference a central data layer makes"
        body="Same college, same products — with and without a single source of truth."
      />
      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-3xl border border-border bg-card p-8">
            <h3 className="text-lg font-semibold text-muted-foreground">Without CampusGrid</h3>
            <ul className="mt-6 space-y-3.5">
              {WITHOUT.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Minus className="mt-0.5 size-4 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div
            className="h-full rounded-3xl p-8 text-primary-foreground shadow-lift"
            style={{ background: "var(--gradient-hero)" }}
          >
            <h3 className="text-lg font-semibold">With CampusGrid</h3>
            <ul className="mt-6 space-y-3.5">
              {WITH.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm opacity-95">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
