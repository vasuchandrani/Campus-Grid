import { Link } from "@tanstack/react-router";
import { Logo } from "./navbar";

const COLS = [
  {
    title: "Products",
    links: ["CampusGrid", "CampusConnect", "GradeMate", "CollegeBook", "Future Products"],
  },
  { title: "Company", links: ["About", "Contact", "Documentation", "Privacy Policy", "Terms"] },
  { title: "Institutions", links: ["Register college", "Pricing", "Onboarding", "Migration", "Support"] },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            One platform. Every campus product. The single source of truth for identity, departments
            and subscriptions across your institution.
          </p>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="/#products" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} CampusGrid. Built by{" "}
            <a
              href="https://vatsal-chandrani.me"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground transition-colors hover:underline"
            >
              Vatsal Chandrani
            </a>
            .
          </p>
          <p className="text-xs">Turning ideas into digital systems.</p>
          <Link to="/register" className="text-sm font-medium text-foreground hover:underline">
            Register your college
          </Link>
        </div>
      </div>
    </footer>
  );
}
