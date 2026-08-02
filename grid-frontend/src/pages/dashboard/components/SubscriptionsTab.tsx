import { Badge } from "@/components/ui/badge";
import { Panel } from "./Panel";
import { STATUS_VARIANT } from "./OverviewTab";
import { COLLEGE, SUBSCRIPTIONS } from "@/lib/mock-college";

export function SubscriptionsTab() {
  return (
    <Panel>
      <h2 className="text-lg font-semibold">Linked products</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Share your CampusGrid ID <span className="font-mono">{COLLEGE.campusGridId}</span>{" "}
        during product registration — no data entry needed there.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {SUBSCRIPTIONS.map((s) => (
          <div key={s.product} className="rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold">{s.product}</p>
              <Badge variant={STATUS_VARIANT[s.status]} className="capitalize">
                {s.status}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {s.plan} plan · {s.amount} · renews {s.renews}
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Receives: users, departments, roles, permissions and login identity.
            </p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
