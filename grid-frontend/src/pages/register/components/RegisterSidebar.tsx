import { Building2, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function RegisterSidebar() {
  return (
    <aside className="space-y-4">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
          <Building2 className="size-5" />
        </span>
        <h2 className="mt-4 text-base font-semibold">What happens after registration</h2>
        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
          {[
            "Your institution gets an isolated tenant",
            "Import departments, students and faculty",
            "Assign admins, HoDs and professors",
            "Activate products without re-entering data",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-accent" />
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-3xl border border-dashed border-border p-6">
        <p className="text-sm font-semibold">Already registered?</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to the college admin console.
        </p>
        <Button asChild variant="outline" className="mt-4 w-full">
          <Link to="/login">College admin login</Link>
        </Button>
      </div>
    </aside>
  );
}
