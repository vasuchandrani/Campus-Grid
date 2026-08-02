import { ArrowRight, Check, IdCard, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Reveal, Section, SectionHeading } from "@/components/site/primitives";
import { PRODUCTS } from "@/lib/campus-data";

export function ProductsSection() {
  return (
    <Section id="products">
      <SectionHeading
        eyebrow="Connected products"
        title="Our products. One directory. Zero re-entry."
        body="Colleges subscribe to CampusConnect and GradeMate. By just providing CampusGrid ID."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
              <div className="relative h-36 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
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
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <ul className="mt-5 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                {/* <div className="mt-5 rounded-xl border border-border bg-secondary/60 p-4">
                  <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
                    <IdCard className="size-3.5 text-primary" /> Inherited from CampusGrid
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {p.inherits.join(" · ")}
                  </p>
                </div> */}
                <Button asChild variant="ghost" className="mt-6 justify-start px-0 hover:bg-transparent">
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
