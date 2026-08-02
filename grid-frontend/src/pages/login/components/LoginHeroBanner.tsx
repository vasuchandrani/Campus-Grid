import { ShieldCheck } from "lucide-react";

export function LoginHeroBanner() {
  return (
    <div
      className="relative hidden overflow-hidden p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-center"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="grid-bg absolute inset-0 opacity-15" />
      <div className="relative max-w-md">
        <ShieldCheck className="size-9 text-accent" />
        <h2 className="mt-6 text-3xl font-semibold leading-tight">
          One console for every campus product.
        </h2>
        <p className="mt-4 text-sm leading-relaxed opacity-90">
          Manage students, faculty, departments, roles and product subscriptions from a single
          source of truth. Changes propagate to CampusConnect and GradeMate
          automatically.
        </p>
        <div className="mt-10 grid grid-cols-3 gap-4">
          {[
            ["8,412", "Students"],
            ["386", "Faculty"],
            ["3", "Products"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <p className="text-xl font-semibold">{v}</p>
              <p className="text-xs opacity-80">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
