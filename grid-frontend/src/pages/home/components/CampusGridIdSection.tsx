import { IdCard } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/site/primitives";
import { ID_FLOW } from "@/lib/campus-data";

export function CampusGridIdSection() {
  return (
    <Section id="campusgrid-id">
      <SectionHeading
        eyebrow="CampusGrid ID"
        title="One ID connects your college to every product"
        body="Registering on CampusGrid issues your institution a unique CampusGrid ID. That ID is the only thing you ever hand to CampusConnect or GradeMate."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <div
            className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-8 text-primary-foreground shadow-lift"
            style={{ background: "var(--gradient-hero)" }}
          >
            <div className="grid-bg absolute inset-0 opacity-15" />
            <div className="relative">
              <IdCard className="size-8 text-accent" />
              <p className="mt-6 text-xs font-medium tracking-widest uppercase opacity-75">
                Institution identity
              </p>
              <p className="mt-3 font-mono text-2xl font-semibold tracking-wider sm:text-3xl">
                CG-SIT-AHM-4821
              </p>
              <p className="mt-4 text-sm leading-relaxed opacity-90">
                Issued the moment your college is verified. Enter it on any connected product and
                your entire directory is already waiting there.
              </p>
            </div>
            <div className="relative mt-10 grid grid-cols-2 gap-3">
              {["CampusConnect", "GradeMate"].map((p) => (
                <div key={p} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm font-semibold">{p}</p>
                  <p className="mt-1 text-xs opacity-80">Linked with this ID</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {ID_FLOW.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.07}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
                <span className="text-xs font-semibold tracking-widest text-accent-foreground/70 uppercase">
                  Step {i + 1}
                </span>
                <h3 className="mt-3 text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
