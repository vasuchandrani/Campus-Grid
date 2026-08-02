import { Building2, Copy, GraduationCap, IdCard, LayoutGrid, Users } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Panel } from "./Panel";
import { COLLEGE, SUBSCRIPTIONS, type Department } from "@/lib/mock-college";

export function CollegeOverviewCard({ departments }: { departments: Department[] }) {
  const kpis = [
    { icon: Users, label: "Students", value: COLLEGE.students.toLocaleString() },
    { icon: GraduationCap, label: "Professors", value: COLLEGE.professors },
    { icon: Building2, label: "Departments", value: departments.length },
    { icon: LayoutGrid, label: "Linked products", value: SUBSCRIPTIONS.length },
  ];

  const copyId = () => {
    navigator.clipboard?.writeText(COLLEGE.campusGridId);
    toast.success("CampusGrid ID copied", {
      description: "Use it to link CampusConnect or GradeMate.",
    });
  };

  return (
    <Panel>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Institution console
          </p>
          <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">{COLLEGE.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {COLLEGE.code} · {COLLEGE.city}
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <Badge className="bg-accent text-accent-foreground">Verified institution</Badge>
          <button
            onClick={copyId}
            className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-3 py-2 text-sm transition-colors hover:bg-secondary/70"
          >
            <IdCard className="size-4 text-primary" />
            <span className="font-mono font-medium">{COLLEGE.campusGridId}</span>
            <Copy className="size-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-border bg-background p-5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-secondary text-primary">
              <k.icon className="size-4.5" />
            </span>
            <p className="mt-4 text-2xl font-semibold">{k.value}</p>
            <p className="text-xs text-muted-foreground">{k.label}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
