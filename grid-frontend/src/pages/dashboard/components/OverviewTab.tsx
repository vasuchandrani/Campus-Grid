import { Activity as ActivityIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Panel } from "./Panel";
import { ACTIVITY, SUBSCRIPTIONS } from "@/lib/mock-college";

export const STATUS_VARIANT = {
  active: "default",
  trial: "secondary",
  expired: "destructive",
} as const;

export function OverviewTab() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <Panel>
        <h2 className="text-lg font-semibold">Product subscriptions</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Linked with your CampusGrid ID — no data was re-entered in either product.
        </p>
        <div className="mt-5 space-y-4">
          {SUBSCRIPTIONS.map((s) => (
            <div key={s.product} className="rounded-2xl border border-border p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold">{s.product}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.plan} plan · renews {s.renews}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{s.amount}</span>
                  <Badge variant={STATUS_VARIANT[s.status]} className="capitalize">
                    {s.status}
                  </Badge>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Seats used</span>
                  <span>
                    {s.used.toLocaleString()} / {s.seats.toLocaleString()}
                  </span>
                </div>
                <Progress value={(s.used / s.seats) * 100} className="mt-2 h-1.5" />
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel>
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <ActivityIcon className="size-4.5 text-accent" /> Sync activity
        </h2>
        <ul className="mt-5 space-y-4">
          {ACTIVITY.map((a) => (
            <li key={a.text} className="border-l-2 border-border pl-4">
              <p className="text-sm leading-relaxed">{a.text}</p>
              <p className="mt-1 text-xs text-muted-foreground">{a.when}</p>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
