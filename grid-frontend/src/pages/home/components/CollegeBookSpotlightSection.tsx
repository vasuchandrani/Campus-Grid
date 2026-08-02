import { Check } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/site/primitives";
import { COLLEGEBOOK } from "@/lib/campus-data";

export function CollegeBookSpotlightSection() {
  const Icon = COLLEGEBOOK.icon;
  return (
    <Section id="collegebook" className="bg-surface">
      <SectionHeading
        eyebrow="Also from us"
        title="CollegeBook — Build your College Story"
        body="An independent social-media platform for students where students can collaborate and build the ideas."
      />
      <Reveal className="mt-14">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <div className="grid lg:grid-cols-[1fr_1.1fr]">
            <div
              className="relative flex flex-col justify-between p-8 text-primary-foreground sm:p-10"
              style={{ background: "var(--gradient-hero)" }}
            >
              <div className="grid-bg absolute inset-0 opacity-15" />
              <div className="relative">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 text-2xl font-semibold">{COLLEGEBOOK.name}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{COLLEGEBOOK.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed opacity-90">{COLLEGEBOOK.description}</p>
              </div>
              <ul className="relative mt-8 space-y-2.5">
                {COLLEGEBOOK.helps.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm opacity-95">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 sm:p-10">
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                Main features
              </p>
              <ul className="mt-4 grid gap-2.5">
                {COLLEGEBOOK.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                How it differs
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {COLLEGEBOOK.differs.map((d) => (
                  <div key={d.title} className="rounded-2xl border border-border bg-surface p-4">
                    <p className="text-sm font-semibold">{d.title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{d.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
