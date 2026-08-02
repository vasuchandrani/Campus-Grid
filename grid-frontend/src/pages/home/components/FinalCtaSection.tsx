import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Reveal, Section } from "@/components/site/primitives";

export function FinalCtaSection() {
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
