import { Reveal, Section, SectionHeading } from "@/components/site/primitives";
import { STEPS } from "@/lib/campus-data";

export function HowItWorksSection() {
  return (
    <Section id="how" className="bg-surface">
      <SectionHeading
        eyebrow="How it works"
        title="Enter your college data once. Only once."
        body="Six steps, done a single time. Every product you subscribe to afterwards inherits exactly the same data."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06}>
            <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold">{s.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
