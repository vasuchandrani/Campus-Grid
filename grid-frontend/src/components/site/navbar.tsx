import { Link } from "@tanstack/react-router";
import { Grid2x2Check, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "How it works", href: "/#how" },
  { label: "CampusGrid ID", href: "/#campusgrid-id" },
  { label: "Products", href: "/#products" },
  { label: "Platform", href: "/#why" },
  { label: "Security", href: "/#security" },
  { label: "FAQ", href: "/#faq" },
];

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)}>
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
        <Grid2x2Check className="size-5" />
      </span>
      <span className="text-lg font-semibold tracking-tight">CampusGrid</span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all",
        scrolled ? "glass-panel border-b border-border/70" : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5">
        <Logo />
        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild size="sm" className="hidden shadow-soft sm:inline-flex">
            <Link to="/register">Get Started</Link>
          </Button>
          <button
            className="flex size-9 items-center justify-center rounded-lg border border-border lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-border bg-card px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3 flex gap-2">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
