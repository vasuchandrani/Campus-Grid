import { motion } from "motion/react";
import { BranchConnector } from "./branch-connector";
import { ArrowRight, Check, IdCard, Minus, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, Section, SectionHeading } from "./primitives";
import {
  CAPABILITIES,
  COLLEGEBOOK,
  FAQS,
  ID_FLOW,
  PRODUCTS,
  ROADMAP,
  SECURITY,
  STATS,
  STEPS,
} from "@/lib/campus-data";

export function HowItWorks() {
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

export function CampusGridId() {
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

export function Capabilities() {
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

export function Products() {
  return (
    <Section id="products">
      <SectionHeading
        eyebrow="Connected products"
        title="Two products. One directory. Zero re-entry."
        body="Colleges subscribe to CampusConnect and GradeMate. Both read their institution, department, user and role data straight from CampusGrid."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
              <div
                className="relative h-36 overflow-hidden"
                style={{ background: "var(--gradient-hero)" }}
              >
                <div className="grid-bg absolute inset-0 opacity-20" />
                <div className="absolute inset-0 flex items-center justify-between px-6">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-white/15 text-primary-foreground backdrop-blur">
                    <p.icon className="size-6" />
                  </span>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur">
                    {p.price}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{p.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant="ghost"
                  className="mt-6 justify-start px-0 hover:bg-transparent"
                >
                  <Link to="/register">
                    Register to activate <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function CollegeBookSpotlight() {
  const Icon = COLLEGEBOOK.icon;
  return (
    <Section id="collegebook" className="bg-surface">
      <SectionHeading
        eyebrow="Also from us"
        title="CollegeBook — a different kind of campus product"
        body="An independent student platform. It does not connect to CampusGrid and needs no college subscription — students join it themselves."
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

export function Stats() {
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

export function BusinessValue() {
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

export function Architecture() {
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
          <Tier
            label="College"
            items={["Institution profile, verification, admins"]}
            tone="muted"
          />
          <Arrow />
          <div
            className="rounded-2xl p-6 text-primary-foreground"
            style={{ background: "var(--gradient-hero)" }}
          >
            <p className="text-center text-sm font-semibold tracking-wide uppercase">
              CampusGrid Core
            </p>
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
          <BranchConnector count={3} height={64} />
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
          <p className="mt-6 text-center text-xs text-muted-foreground">
            CollegeBook is a separate student product and is intentionally outside this data flow.
          </p>
        </div>
      </Reveal>
    </Section>
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

export function Roadmap() {
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

export function Security() {
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

export function Faq() {
  return (
    <Section id="faq" className="bg-surface">
      <SectionHeading eyebrow="FAQ" title="Questions colleges ask us" />
      <Reveal className="mx-auto mt-12 max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}

export function FinalCta() {
  return (
    <Section>
      <Reveal>
        <div
          className="relative overflow-hidden rounded-3xl px-6 py-16 text-center text-primary-foreground shadow-lift sm:px-16"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="grid-bg absolute inset-0 opacity-15" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-balance sm:text-4xl">
              Register once. Run every campus product from one place.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm opacity-90 sm:text-base">
              Get your CampusGrid ID, build your directory, and activate CampusConnect or GradeMate
              whenever you are ready.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/register">
                  Register your college <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
              >
                <Link to="/login">College admin login</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
