import { Badge } from "@/components/ui/badge";
import { Panel } from "./Panel";
import { ROLES } from "@/lib/mock-college";

export function RolesTab() {
  return (
    <Panel>
      <h2 className="text-lg font-semibold">Roles & permissions</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Roles are defined once here and honoured by every connected product.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ROLES.map((r) => (
          <div key={r.role} className="rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{r.role}</p>
              <Badge variant="secondary">{r.count.toLocaleString()}</Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Scope: {r.scope}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {r.description}
            </p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
