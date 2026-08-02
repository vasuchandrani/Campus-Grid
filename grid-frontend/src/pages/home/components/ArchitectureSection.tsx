import { motion } from "motion/react";
import { Reveal, Section, SectionHeading } from "@/components/site/primitives";

export function ArchitectureSection() {
  const core = ["Authentication", "Users", "Departments", "Roles", "Permissions", "Subscriptions"];
  const leaves = ["CampusConnect", "GradeMate", "Future CampusGrid modules"];
  return (
    <Section id="architecture">
      <SectionHeading
        eyebrow="Architecture"
        title="One core, many products"
        body="Connected products never own identity. They read it with your CampusGrid ID — and receive updates whenever anything changes."
      />
      <Reveal className="mx-auto mt-14 max-w-4xl">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">
          <Tier label="College" items={["Institution profile, verification, admins"]} tone="muted" />
          <Arrow />
          <div className="rounded-2xl p-6 text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
            <p className="text-center text-sm font-semibold tracking-wide uppercase">CampusGrid Core</p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {core.map((c) => (
                <span
                  key={c}
                  className="rounded-lg bg-white/12 px-3 py-2 text-center text-xs font-medium backdrop-blur"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          <BranchingConnector3 />
          <div className="grid gap-3 sm:grid-cols-3">
            {leaves.map((l) => (
              <div
                key={l}
                className="rounded-xl border border-border bg-secondary px-4 py-3 text-center text-sm font-medium"
              >
                {l}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function BranchingConnector3() {
  return (
    <div className="relative w-full">
      {/* Top stem from CampusGrid Core */}
      <div className="mx-auto h-4 w-px bg-border" />
      {/* Horizontal connector line linking 3 columns */}
      <div className="relative w-full">
        <div className="absolute top-0 left-[calc(16.666%-0.25rem)] right-[calc(16.666%-0.25rem)] hidden h-px bg-border sm:block" />
        <div className="grid w-full gap-3 sm:grid-cols-3">
          <div className="flex justify-center">
            <Arrow />
          </div>
          <div className="flex justify-center">
            <Arrow />
          </div>
          <div className="flex justify-center">
            <Arrow />
          </div>
        </div>
      </div>
    </div>
  );
}

function Tier({ label, items, tone }: { label: string; items: string[]; tone?: "muted" }) {
  return (
    <div
      className={`rounded-2xl border border-border px-5 py-4 text-center ${tone === "muted" ? "bg-secondary" : "bg-card"}`}
    >
      <p className="text-sm font-semibold">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground">{items.join(" · ")}</p>
    </div>
  );
}

function Arrow() {
  return (
    <div className="relative mx-auto h-10 w-px bg-border">
      <motion.span
        className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-accent"
        animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}
