import { Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Panel } from "@/components/common/panel";
import { useSession } from "@/lib/auth";
import { useUsers } from "@/lib/campus-store";
import { COLLEGE, DEPARTMENTS, yearLabel } from "@/lib/mock-college";

/* ------------------------------ Shared ---------------------------- */

const initialsOf = (name: string) =>
  name
    .replace(/^(Dr|Prof|Mr|Ms|Mrs)\.?\s*/i, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

function Stat({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <span className="flex size-9 items-center justify-center rounded-xl bg-secondary text-primary">
        <Icon className="size-4.5" />
      </span>
      <p className="mt-4 text-lg font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-xl bg-surface px-4 py-3">
      <dt className="text-[11px] tracking-wide text-muted-foreground uppercase">{label}</dt>
      <dd className={`mt-1 text-sm ${mono ? "font-mono" : ""}`}>{value}</dd>
    </div>
  );
}

function ResultRow({
  title,
  board,
  year,
  percent,
}: {
  title: string;
  board: string;
  year: number;
  percent: number;
}) {
  return (
    <div className="rounded-2xl border border-border p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">
            {board} · {year}
          </p>
        </div>
        <span className="text-sm font-semibold">{percent}%</span>
      </div>
      <Progress value={percent} className="mt-3 h-1.5" />
    </div>
  );
}

/* ------------------------------- Page ----------------------------- */

export function ProfilePage() {
  const { session } = useSession();
  const [users] = useUsers();
  if (!session) return null;

  const me = users.find((u) => u.gridId === session.gridId);

  return (
    <div className="space-y-6">
      <ProfileHeader
        name={session.name}
        role={session.role}
        department={session.department}
        gridId={session.gridId}
        email={session.email}
        phone={me?.student?.phone ?? me?.faculty?.phone}
        tags={me?.student?.tags ?? []}
        subtitle={
          me?.student
            ? `${yearLabel(me.student.year)} · Batch ${me.student.batch} · Division ${me.student.division}`
            : me?.faculty
              ? me.faculty.designation
              : "Institution administrator"
        }
      />

      {me?.student && <StudentProfile me={me} />}
      {me?.faculty && <FacultyProfile me={me} isHod={session.role === "HoD"} />}
      {!me?.student && !me?.faculty && <AdminProfile email={session.email} />}
    </div>
  );
}

function ProfileHeader({
  name,
  role,
  department,
  gridId,
  email,
  phone,
  subtitle,
  tags,
}: {
  name: string;
  role: string;
  department: string;
  gridId: string;
  email: string;
  phone: string | undefined;
  subtitle: string;
  tags: string[];
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <div className="h-24 sm:h-28" style={{ background: "var(--gradient-hero)" }}>
        <div className="grid-bg h-full w-full opacity-15" />
      </div>
      <div className="-mt-10 flex flex-wrap items-end gap-5 px-6 pb-6 sm:px-8">
        <div className="flex size-20 items-center justify-center rounded-3xl border-4 border-card bg-primary text-2xl font-semibold text-primary-foreground">
          {initialsOf(name)}
        </div>
        <div className="min-w-56 flex-1 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold">{name}</h1>
            <Badge>{role}</Badge>
            {role === "HoD" && <Badge variant="secondary">Professor · extended</Badge>}
            {tags.map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {subtitle} · {department} · {COLLEGE.name}
          </p>
        </div>
      </div>
      <div className="grid gap-px border-t border-border bg-border sm:grid-cols-3">
        <ContactCell icon={ShieldCheck} label="CampusGrid ID" value={gridId} mono />
        <ContactCell icon={Mail} label="Email" value={email} />
        <ContactCell icon={Phone} label="Phone" value={phone ?? "—"} />
      </div>
    </div>
  );
}

function ContactCell({
  icon: Icon,
  label,
  value,
  mono,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 bg-card px-6 py-4">
      <Icon className="size-4 shrink-0 text-accent" />
      <div className="min-w-0">
        <p className="text-[11px] tracking-wide text-muted-foreground uppercase">{label}</p>
        <p className={`truncate text-sm ${mono ? "font-mono" : ""}`}>{value}</p>
      </div>
    </div>
  );
}

/* ----------------------------- Student ---------------------------- */

function StudentProfile({ me }: { me: NonNullable<ReturnType<typeof useUsers>[0][number]> }) {
  const s = me.student!;
  const diploma = s.qualification === "10th + Diploma";
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Current year" value={yearLabel(s.year)} icon={GraduationCap} />
        <Stat label="Semester" value={String(s.semester)} icon={BookOpen} />
        <Stat label="CGPA" value={s.cgpa.toFixed(2)} icon={Sparkles} />
        <Stat label="Attendance" value={`${s.attendance}%`} icon={CalendarDays} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="text-lg font-semibold">Academic record</h2>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            <Field label="Enrollment number" value={s.enrollmentNo} mono />
            <Field label="Branch" value={me.department} />
            <Field label="Batch" value={`${s.batch} · ${yearLabel(s.year)}`} />
            <Field label="Division" value={s.division} />
            <Field label="Admission type" value={s.admissionType} />
            <Field label="Qualification path" value={s.qualification} />
          </dl>
          <div className="mt-6">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Attendance this semester</span>
              <span>{s.attendance}%</span>
            </div>
            <Progress value={s.attendance} className="mt-2 h-1.5" />
          </div>
          <Button asChild variant="outline" size="sm" className="mt-6">
            <Link to="/app/timetable">Open my time-table</Link>
          </Button>
        </Panel>

        <Panel>
          <h2 className="text-lg font-semibold">Prior education</h2>
          <div className="mt-5 space-y-3">
            <ResultRow
              title="Class 10 (SSC)"
              board={s.tenthBoard}
              year={s.tenthYear}
              percent={s.tenthPercent}
            />
            <ResultRow
              title={diploma ? "Diploma" : "Class 12 (HSC)"}
              board={s.twelfthOrDiplomaBoard}
              year={s.twelfthOrDiplomaYear}
              percent={s.twelfthOrDiplomaPercent}
            />
          </div>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            <Field label={diploma ? "Diploma field" : "Stream"} value={s.stream} />
            <Field label="Blood group" value={s.bloodGroup} />
            <Field label="Guardian" value={s.guardian} />
            <Field label="Address" value={s.address} />
          </dl>
        </Panel>
      </div>

      <Panel>
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <MapPin className="size-4.5 text-accent" /> Where this profile travels
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          These details are stored once in CampusGrid. CampusConnect and GradeMate read them with
          your CampusGrid ID — you never fill them again.
        </p>
      </Panel>
    </>
  );
}

/* --------------------------- Professor / HoD ---------------------- */

function FacultyProfile({
  me,
  isHod,
}: {
  me: NonNullable<ReturnType<typeof useUsers>[0][number]>;
  isHod: boolean;
}) {
  const f = me.faculty!;
  const dept = DEPARTMENTS.find((d) => d.name === me.department);
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Designation" value={f.designation} icon={Briefcase} />
        <Stat label="Experience" value={`${f.experienceYears} years`} icon={Award} />
        <Stat label="Subjects" value={String(f.subjects.length)} icon={BookOpen} />
        <Stat
          label={isHod ? "Department students" : "Department"}
          value={isHod ? (dept?.students.toLocaleString() ?? "—") : (dept?.code ?? "—")}
          icon={Users}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="text-lg font-semibold">Service record</h2>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            <Field label="Employee number" value={f.employeeNo} mono />
            <Field label="Department" value={me.department} />
            <Field label="Qualification" value={f.qualification} />
            <Field label="Specialisation" value={f.specialisation} />
            <Field label="Joined on" value={f.joinedOn} />
            <Field label="Cabin" value={f.cabin} />
          </dl>
          <div className="mt-5 rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
            {isHod
              ? "Department head — publishes the time-table and academic calendar, and announces to any batch of the department."
              : "Professor — creates announcement groups for their batches and reads the department time-table."}
          </div>
        </Panel>

        <Panel>
          <h2 className="text-lg font-semibold">Subjects taught</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {f.subjects.map((s) => (
              <li key={s} className="rounded-2xl border border-border p-4 text-sm">
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/app/timetable">Time-table</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/app/announcements">Announcements</Link>
            </Button>
          </div>
        </Panel>
      </div>
    </>
  );
}

/* ------------------------------ Admin ----------------------------- */

function AdminProfile({ email }: { email: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Panel>
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Building2 className="size-4.5 text-accent" /> Institution
        </h2>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          <Field label="Institution" value={COLLEGE.name} />
          <Field label="Institution CampusGrid ID" value={COLLEGE.campusGridId} mono />
          <Field label="City" value={COLLEGE.city} />
          <Field label="Departments" value={String(DEPARTMENTS.length)} />
          <Field label="Students" value={COLLEGE.students.toLocaleString()} />
          <Field label="Faculty" value={String(COLLEGE.professors)} />
        </dl>
      </Panel>
      <Panel>
        <h2 className="text-lg font-semibold">Administrator</h2>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          <Field label="Email" value={email} />
          <Field label="Scope" value="Institution-wide" />
        </dl>
        <p className="mt-5 text-sm text-muted-foreground">
          You own the directory: adding and removing people, approving self-registered profiles,
          assigning roles and heading departments — every change reaches CampusConnect and
          GradeMate.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/app/users">Manage users</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/app/settings">Settings & products</Link>
          </Button>
        </div>
      </Panel>
    </div>
  );
}
