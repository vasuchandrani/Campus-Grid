import {
  Copy,
  Activity as ActivityIcon,
  Building2,
  GraduationCap,
  LayoutGrid,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/common/panel";
import { useSession } from "@/lib/auth";
import { ACTIVITY, COLLEGE, DEPARTMENTS, SUBSCRIPTIONS } from "@/lib/mock-college";

export function DashboardPage() {
  const { session } = useSession();
  if (!session) return null;

  const copyId = () => {
    navigator.clipboard?.writeText(COLLEGE.campusGridId);
    toast.success("CampusGrid ID copied");
  };

  return (
    <div className="space-y-6">
      <Panel>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {session.role} workspace
            </p>
            <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">Welcome, {session.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {COLLEGE.name} · {session.department}
            </p>
          </div>
          <button
            onClick={copyId}
            className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-3 py-2 text-sm transition-colors hover:bg-secondary/70"
          >
            <span className="font-mono font-medium">{session.gridId}</span>
            <Copy className="size-3.5 text-muted-foreground" />
          </button>
        </div>
      </Panel>

      {session.role === "College Admin" && <AdminHome />}
      {session.role === "HoD" && <HodHome department={session.department} />}
      {session.role === "Professor" && <ProfessorHome />}
      {session.role === "Student" && <StudentHome />}
    </div>
  );
}

function Kpis({
  items,
}: {
  items: { label: string; value: string | number; icon: typeof Users }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((k) => (
        <div key={k.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <span className="flex size-9 items-center justify-center rounded-xl bg-secondary text-primary">
            <k.icon className="size-4.5" />
          </span>
          <p className="mt-4 text-2xl font-semibold">{k.value}</p>
          <p className="text-xs text-muted-foreground">{k.label}</p>
        </div>
      ))}
    </div>
  );
}

function AdminHome() {
  return (
    <>
      <Kpis
        items={[
          { label: "Students", value: COLLEGE.students.toLocaleString(), icon: Users },
          { label: "Professors", value: COLLEGE.professors, icon: GraduationCap },
          { label: "Departments", value: DEPARTMENTS.length, icon: Building2 },
          {
            label: "Linked products",
            value: SUBSCRIPTIONS.filter((s) => s.status !== "none").length,
            icon: LayoutGrid,
          },
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Panel>
          <h2 className="text-lg font-semibold">Product subscriptions</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Linked with your CampusGrid ID — nothing is re-entered in either product.
          </p>
          <div className="mt-5 space-y-4">
            {SUBSCRIPTIONS.map((s) => (
              <div key={s.id} className="rounded-2xl border border-border p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold">{s.product}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.status === "none"
                        ? "Not subscribed"
                        : `${s.plan} plan · renews ${s.renews}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{s.amount}</span>
                    <Badge
                      variant={s.status === "active" ? "default" : "secondary"}
                      className="capitalize"
                    >
                      {s.status === "none" ? "inactive" : s.status}
                    </Badge>
                  </div>
                </div>
                {s.status !== "none" && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Seats used</span>
                      <span>
                        {s.used.toLocaleString()} / {s.seats.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(s.used / s.seats) * 100} className="mt-2 h-1.5" />
                  </div>
                )}
                <div className="mt-4">
                  {s.status === "none" ? (
                    <Button asChild size="sm" variant="outline">
                      <a href="/app/settings">Buy subscription</a>
                    </Button>
                  ) : (
                    <Button asChild size="sm">
                      <a href={s.url} target="_blank" rel="noreferrer">
                        Open {s.product}
                      </a>
                    </Button>
                  )}
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
    </>
  );
}

function HodHome({ department }: { department: string }) {
  const dept = DEPARTMENTS.find((d) => d.name === department) ?? DEPARTMENTS[0]!;
  return (
    <>
      <Kpis
        items={[
          { label: "Students in department", value: dept.students.toLocaleString(), icon: Users },
          { label: "Professors", value: dept.professors, icon: GraduationCap },
          { label: "Sections", value: 12, icon: Building2 },
          { label: "Active courses", value: 34, icon: LayoutGrid },
        ]}
      />
      <Panel>
        <h2 className="text-lg font-semibold">Department overview</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {dept.name} ({dept.code}) — you oversee faculty, students, courses and exams for this
          department across CampusGrid, CampusConnect and GradeMate.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            "Approve exam schedules created by professors",
            "Monitor evaluation progress in GradeMate",
            "Review club and event activity in CampusConnect",
            "Track student performance batch by batch",
          ].map((t) => (
            <li
              key={t}
              className="rounded-2xl border border-border p-4 text-sm text-muted-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}

function ProfessorHome() {
  return (
    <>
      <Kpis
        items={[
          { label: "Courses teaching", value: 4, icon: LayoutGrid },
          { label: "Students", value: 214, icon: Users },
          { label: "Exams scheduled", value: 3, icon: GraduationCap },
          { label: "Sheets to evaluate", value: 86, icon: Building2 },
        ]}
      />
      <Panel>
        <h2 className="text-lg font-semibold">Your teaching workspace</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Courses, attendance and marks live in CampusGrid. Exams and evaluation happen in GradeMate
          using this same CampusGrid ID.
        </p>
      </Panel>
    </>
  );
}

function StudentHome() {
  return (
    <>
      <Kpis
        items={[
          { label: "Current semester", value: 5, icon: GraduationCap },
          { label: "Attendance", value: "91%", icon: Users },
          { label: "CGPA", value: "8.42", icon: LayoutGrid },
          { label: "Fees due", value: "₹0", icon: Building2 },
        ]}
      />
      <Panel>
        <h2 className="text-lg font-semibold">Your student record</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          From admission to graduation — marks, exams, fees, courses and club activity are all tied
          to your CampusGrid ID, so CampusConnect and GradeMate recognise you instantly.
        </p>
      </Panel>
    </>
  );
}
