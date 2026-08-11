import { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  GraduationCap,
  IdCard,
  Presentation,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Logo } from "@/features/landing/components/navbar";
import { uid, useUsers } from "@/lib/campus-store";
import {
  BATCHES,
  COLLEGE,
  DEPARTMENTS,
  yearLabel,
  yearOfBatch,
  type ManagedUser,
  type Qualification,
} from "@/lib/mock-college";

type Applicant = "Student" | "Professor";

const STEPS = ["Who you are", "Basic details", "Education & work", "Review"];

const BLANK = {
  name: "",
  email: "",
  phone: "",
  department: DEPARTMENTS[0]!.name,
  // student
  batch: String(BATCHES[0]),
  enrollmentNo: "",
  qualification: "10th + 12th Science" as Qualification,
  tenthBoard: "",
  tenthYear: "",
  tenthPercent: "",
  nextBoard: "",
  nextYear: "",
  nextPercent: "",
  stream: "",
  guardian: "",
  bloodGroup: "",
  address: "",
  // faculty
  employeeNo: "",
  designation: "Assistant Professor",
  qualificationFaculty: "M.Tech.",
  specialisation: "",
  experienceYears: "",
  subjects: "",
};

export function JoinPage() {
  const navigate = useNavigate();
  const [, setUsers] = useUsers();
  const [step, setStep] = useState(0);
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [f, setF] = useState(BLANK);
  const [submitted, setSubmitted] = useState<string | null>(null);

  const set = <K extends keyof typeof BLANK>(k: K, v: (typeof BLANK)[K]) =>
    setF((prev) => ({ ...prev, [k]: v }));

  const isStudent = applicant === "Student";
  const diploma = f.qualification === "10th + Diploma";

  const canContinue = useMemo(() => {
    if (step === 0) return applicant !== null;
    if (step === 1) return f.name.trim() && f.email.trim() && f.phone.trim();
    if (step === 2)
      return isStudent
        ? f.tenthBoard.trim() && f.tenthPercent.trim() && f.nextBoard.trim() && f.nextPercent.trim()
        : f.specialisation.trim() && f.subjects.trim();
    return true;
  }, [step, applicant, f, isStudent]);

  const submit = () => {
    const b = Number(f.batch);
    const user: ManagedUser = {
      id: uid(),
      gridId: "Pending approval",
      name: f.name.trim(),
      email: f.email.trim(),
      role: isStudent ? "Student" : "Professor",
      department: f.department,
      status: "pending",
      selfRegistered: true,
      ...(isStudent
        ? {
            student: {
              enrollmentNo: f.enrollmentNo.trim() || "—",
              batch: b,
              year: yearOfBatch(b),
              semester: yearOfBatch(b) * 2 - 1,
              division: "—",
              qualification: f.qualification,
              tenthBoard: f.tenthBoard.trim(),
              tenthYear: Number(f.tenthYear) || b - (diploma ? 4 : 2),
              tenthPercent: Number(f.tenthPercent) || 0,
              twelfthOrDiplomaBoard: f.nextBoard.trim(),
              twelfthOrDiplomaYear: Number(f.nextYear) || b,
              twelfthOrDiplomaPercent: Number(f.nextPercent) || 0,
              stream: f.stream.trim() || (diploma ? "Diploma" : "Science (PCM)"),
              admissionType: diploma ? ("Lateral Entry" as const) : ("Merit" as const),
              cgpa: 0,
              attendance: 0,
              guardian: f.guardian.trim() || "—",
              phone: f.phone.trim(),
              bloodGroup: f.bloodGroup.trim() || "—",
              address: f.address.trim() || "—",
              tags: [],
            },
          }
        : {
            faculty: {
              employeeNo: f.employeeNo.trim() || "—",
              designation: f.designation,
              qualification: f.qualificationFaculty,
              specialisation: f.specialisation.trim(),
              experienceYears: Number(f.experienceYears) || 0,
              joinedOn: new Date().toISOString().slice(0, 10),
              subjects: f.subjects
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
              phone: f.phone.trim(),
              cabin: "—",
            },
          }),
    };
    setUsers((prev) => [user, ...prev]);
    setSubmitted(user.name);
    toast.success("Profile submitted for approval");
  };

  if (submitted) {
    return (
      <Shell>
        <div className="mx-auto max-w-lg py-20 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <BadgeCheck className="size-7" />
          </span>
          <h1 className="mt-6 text-2xl font-semibold">Profile submitted</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Thanks {submitted}. Your profile is now in the College Admin's approval queue at{" "}
            {COLLEGE.name}. Once approved you receive your CampusGrid ID by email — that single ID
            signs you in to CampusGrid, CampusConnect and GradeMate.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button onClick={() => navigate({ to: "/login" })}>Go to sign in</Button>
            <Button variant="outline" asChild>
              <Link to="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="mx-auto max-w-2xl py-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Student & faculty profile
        </p>
        <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">Create your CampusGrid profile</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Fill this once. Your College Admin approves the profile and assigns your role — you never
          re-enter these details on CampusConnect or GradeMate.
        </p>

        <ol className="mt-8 flex flex-wrap gap-2">
          {STEPS.map((s, i) => (
            <li
              key={s}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                i === step
                  ? "border-primary bg-primary text-primary-foreground"
                  : i < step
                    ? "border-border bg-secondary text-foreground"
                    : "border-border text-muted-foreground"
              }`}
            >
              {i < step ? (
                <Check className="size-3.5" />
              ) : (
                <span className="font-mono">{i + 1}</span>
              )}
              {s}
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
          {step === 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {(
                [
                  ["Student", GraduationCap, "Currently studying or joining a programme."],
                  [
                    "Professor",
                    Presentation,
                    "Teaching faculty. HoD rights are granted by the admin.",
                  ],
                ] as const
              ).map(([role, Icon, blurb]) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setApplicant(role)}
                  className={`rounded-2xl border p-5 text-left transition-colors ${
                    applicant === role
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  <Icon className="size-5 text-accent" />
                  <p className="mt-3 font-medium">{role}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{blurb}</p>
                </button>
              ))}
              <p className="sm:col-span-2 text-xs text-muted-foreground">
                Registering a college instead?{" "}
                <Link to="/register" className="font-medium text-foreground hover:underline">
                  Start the 30-day free trial
                </Link>
                .
              </p>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" id="j-name">
                <Input
                  id="j-name"
                  value={f.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Aarav Shah"
                />
              </Field>
              <Field label="Email" id="j-email">
                <Input
                  id="j-email"
                  type="email"
                  value={f.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="aarav@sit.edu.in"
                />
              </Field>
              <Field label="Phone" id="j-phone">
                <Input
                  id="j-phone"
                  value={f.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="+91 98250 00000"
                />
              </Field>
              <Field label="Department / branch">
                <Select value={f.department} onValueChange={(v) => set("department", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((d) => (
                      <SelectItem key={d.id} value={d.name}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              {isStudent ? (
                <>
                  <Field label="Admission batch">
                    <Select value={f.batch} onValueChange={(v) => set("batch", v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {BATCHES.map((b) => (
                          <SelectItem key={b} value={String(b)}>
                            Batch {b} · {yearLabel(yearOfBatch(b))}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Enrollment number (if issued)" id="j-enr">
                    <Input
                      id="j-enr"
                      value={f.enrollmentNo}
                      onChange={(e) => set("enrollmentNo", e.target.value)}
                      placeholder="2023CE101"
                    />
                  </Field>
                  <Field label="Guardian name" id="j-guard">
                    <Input
                      id="j-guard"
                      value={f.guardian}
                      onChange={(e) => set("guardian", e.target.value)}
                      placeholder="Mr. Shah"
                    />
                  </Field>
                  <Field label="Blood group" id="j-bg">
                    <Input
                      id="j-bg"
                      value={f.bloodGroup}
                      onChange={(e) => set("bloodGroup", e.target.value)}
                      placeholder="B+"
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Residential address" id="j-addr">
                      <Textarea
                        id="j-addr"
                        value={f.address}
                        onChange={(e) => set("address", e.target.value)}
                        placeholder="12, Satellite, Ahmedabad"
                      />
                    </Field>
                  </div>
                </>
              ) : (
                <>
                  <Field label="Employee number (if issued)" id="j-emp">
                    <Input
                      id="j-emp"
                      value={f.employeeNo}
                      onChange={(e) => set("employeeNo", e.target.value)}
                      placeholder="EMP-2024"
                    />
                  </Field>
                  <Field label="Designation">
                    <Select value={f.designation} onValueChange={(v) => set("designation", v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Assistant Professor",
                          "Associate Professor",
                          "Professor",
                          "Visiting Faculty",
                        ].map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </>
              )}
            </div>
          )}

          {step === 2 && isStudent && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Qualification path">
                  <Select
                    value={f.qualification}
                    onValueChange={(v) => set("qualification", v as Qualification)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10th + 12th Science">10th + 12th (Science)</SelectItem>
                      <SelectItem value="10th + Diploma">10th + Diploma (lateral entry)</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field label="Class 10 board" id="j-10b">
                <Input
                  id="j-10b"
                  value={f.tenthBoard}
                  onChange={(e) => set("tenthBoard", e.target.value)}
                  placeholder="GSEB / CBSE / ICSE"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Year" id="j-10y">
                  <Input
                    id="j-10y"
                    inputMode="numeric"
                    value={f.tenthYear}
                    onChange={(e) => set("tenthYear", e.target.value)}
                    placeholder="2021"
                  />
                </Field>
                <Field label="Result %" id="j-10p">
                  <Input
                    id="j-10p"
                    inputMode="numeric"
                    value={f.tenthPercent}
                    onChange={(e) => set("tenthPercent", e.target.value)}
                    placeholder="88"
                  />
                </Field>
              </div>
              <Field label={diploma ? "Diploma board / institute" : "Class 12 board"} id="j-12b">
                <Input
                  id="j-12b"
                  value={f.nextBoard}
                  onChange={(e) => set("nextBoard", e.target.value)}
                  placeholder={diploma ? "GTU Diploma" : "GSEB"}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Year" id="j-12y">
                  <Input
                    id="j-12y"
                    inputMode="numeric"
                    value={f.nextYear}
                    onChange={(e) => set("nextYear", e.target.value)}
                    placeholder="2023"
                  />
                </Field>
                <Field label="Result %" id="j-12p">
                  <Input
                    id="j-12p"
                    inputMode="numeric"
                    value={f.nextPercent}
                    onChange={(e) => set("nextPercent", e.target.value)}
                    placeholder="76"
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label={diploma ? "Diploma field" : "Stream / group"} id="j-stream">
                  <Input
                    id="j-stream"
                    value={f.stream}
                    onChange={(e) => set("stream", e.target.value)}
                    placeholder={
                      diploma ? "Diploma — Computer Engineering" : "Science (PCM / Group A)"
                    }
                  />
                </Field>
              </div>
            </div>
          )}

          {step === 2 && !isStudent && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Highest qualification">
                <Select
                  value={f.qualificationFaculty}
                  onValueChange={(v) => set("qualificationFaculty", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["M.Tech.", "M.E.", "Ph.D.", "Ph.D. (pursuing)", "M.Sc."].map((q) => (
                      <SelectItem key={q} value={q}>
                        {q}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Experience (years)" id="j-exp">
                <Input
                  id="j-exp"
                  inputMode="numeric"
                  value={f.experienceYears}
                  onChange={(e) => set("experienceYears", e.target.value)}
                  placeholder="6"
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Specialisation" id="j-spec">
                  <Input
                    id="j-spec"
                    value={f.specialisation}
                    onChange={(e) => set("specialisation", e.target.value)}
                    placeholder="Machine Learning"
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Subjects you teach (comma separated)" id="j-subj">
                  <Textarea
                    id="j-subj"
                    value={f.subjects}
                    onChange={(e) => set("subjects", e.target.value)}
                    placeholder="Data Structures, AI & ML"
                  />
                </Field>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-border p-5">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <IdCard className="size-4 text-accent" /> {f.name || "—"} · {applicant}
                </p>
                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <Review label="Email" value={f.email} />
                  <Review label="Phone" value={f.phone} />
                  <Review label="Department" value={f.department} />
                  {isStudent ? (
                    <>
                      <Review
                        label="Batch"
                        value={`${f.batch} · ${yearLabel(yearOfBatch(Number(f.batch)))}`}
                      />
                      <Review label="Qualification" value={f.qualification} />
                      <Review label="Class 10" value={`${f.tenthBoard} · ${f.tenthPercent}%`} />
                      <Review
                        label={diploma ? "Diploma" : "Class 12"}
                        value={`${f.nextBoard} · ${f.nextPercent}%`}
                      />
                    </>
                  ) : (
                    <>
                      <Review label="Designation" value={f.designation} />
                      <Review label="Qualification" value={f.qualificationFaculty} />
                      <Review label="Specialisation" value={f.specialisation} />
                      <Review label="Subjects" value={f.subjects} />
                    </>
                  )}
                </dl>
              </div>
              <p className="text-xs text-muted-foreground">
                Your CampusGrid ID is issued by the College Admin after approval. Role assignment —
                HoD rights for faculty, responsibilities for students — always stays with the admin.
              </p>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <ArrowLeft className="size-4" /> Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button onClick={() => setStep((s) => s + 1)} disabled={!canContinue}>
                Continue <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button onClick={submit}>Submit for approval</Button>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <header className="flex h-16 items-center justify-between border-b border-border bg-background px-5 sm:px-10">
        <Logo />
        <Button asChild variant="ghost" size="sm">
          <Link to="/">
            <ArrowLeft className="size-4" /> Home
          </Link>
        </Button>
      </header>
      <main className="px-5 sm:px-10">{children}</main>
    </div>
  );
}

function Field({ label, id, children }: { label: string; id?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}

function Review({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs tracking-wide text-muted-foreground uppercase">{label}</dt>
      <dd className="mt-0.5">{value || "—"}</dd>
    </div>
  );
}
