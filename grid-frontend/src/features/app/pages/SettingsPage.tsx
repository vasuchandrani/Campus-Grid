import { ExternalLink, CreditCard, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/common/panel";
import { useSession } from "@/lib/auth";
import { COLLEGE, ROLES, SUBSCRIPTIONS } from "@/lib/mock-college";

export function SettingsPage() {
  const { session } = useSession();

  return (
    <div className="space-y-6">
      <Panel>
        <h1 className="text-xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Platform preferences, your identity and the products connected to this institution.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Institution" value={COLLEGE.name} />
          <Field label="CampusGrid ID" value={COLLEGE.campusGridId} mono />
          <Field label="Signed in as" value={session ? `${session.name} · ${session.role}` : "—"} />
          <Field label="Your CampusGrid ID" value={session?.gridId ?? "—"} mono />
        </div>
      </Panel>

      <Panel>
        <h2 className="text-lg font-semibold">Connected products</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to each product with the same CampusGrid ID — no data is entered twice.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {SUBSCRIPTIONS.map((s) => (
            <div key={s.id} className="rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-base font-semibold">{s.product}</p>
                <Badge variant={s.status === "active" ? "default" : "secondary"}>
                  {s.status === "none" ? "Not subscribed" : s.status}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                {s.plan} plan · {s.amount}
                {s.status !== "none" && ` · renews ${s.renews}`}
              </p>
              <div className="mt-5">
                {s.status === "none" ? (
                  <Button
                    className="w-full"
                    onClick={() =>
                      toast.info("Opening secure checkout", {
                        description: `${s.product} — ${s.amount}. Starts with a 30-day free trial, no advance payment.`,
                      })
                    }
                  >
                    <CreditCard className="size-4" /> Buy subscription
                  </Button>
                ) : (
                  <Button asChild className="w-full">
                    <a href={s.url} target="_blank" rel="noreferrer">
                      Open {s.product} <ExternalLink className="size-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Panel>

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
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.description}</p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel>
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <ShieldCheck className="size-4.5 text-accent" /> Platform preferences
        </h2>
        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
          <li>Single sign-on with the CampusGrid ID is enforced across all products.</li>
          <li>Sync mode: real-time push with hourly reconciliation.</li>
          <li>Deactivating a user here ends their sessions everywhere.</li>
          <li>Audit log retention: 24 months, append-only.</li>
        </ul>
      </Panel>
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`mt-1 text-sm font-medium ${mono ? "font-mono" : ""}`}>{value}</p>
    </div>
  );
}
