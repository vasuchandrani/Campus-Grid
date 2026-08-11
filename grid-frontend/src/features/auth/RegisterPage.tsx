import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Logo } from "@/features/landing/components/navbar";
import { PRODUCTS } from "@/lib/campus-data";

const STEP_LABELS = ["Institution", "Administrator", "Products"];

export function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [selected, setSelected] = useState<string[]>(["campusconnect"]);
  const [form, setForm] = useState({
    college: "",
    code: "",
    type: "",
    city: "",
    website: "",
    students: "",
    address: "",
    adminName: "",
    adminEmail: "",
    adminPhone: "",
    password: "",
  });

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const stepValid =
    step === 0
      ? form.college && form.code && form.city
      : step === 1
        ? form.adminName && form.adminEmail && form.password.length >= 6
        : true;

  const submit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("College registered", {
        description: `${form.college} is now on CampusGrid. Sign in to configure departments.`,
      });
      navigate({ to: "/login" });
    }, 1100);
  };

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="size-4" /> Back to site
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-9">
          <h1 className="text-2xl font-semibold sm:text-3xl">Register your college</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your institution once. Every CampusGrid product you subscribe to will use this
            data.
          </p>

          <ol className="mt-8 flex items-center gap-3">
            {STEP_LABELS.map((label, i) => (
              <li key={label} className="flex flex-1 items-center gap-3">
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    i <= step
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="size-4" /> : i + 1}
                </span>
                <span
                  className={`hidden text-sm sm:block ${i === step ? "font-medium" : "text-muted-foreground"}`}
                >
                  {label}
                </span>
                {i < STEP_LABELS.length - 1 && <span className="h-px flex-1 bg-border" />}
              </li>
            ))}
          </ol>

          <div className="mt-9 space-y-5">
            {step === 0 && (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="College name" required>
                    <Input
                      placeholder="Sardar Institute of Technology"
                      value={form.college}
                      onChange={(e) => set("college")(e.target.value)}
                    />
                  </Field>
                  <Field label="Institution code" required>
                    <Input
                      placeholder="SIT-AHM-2011"
                      value={form.code}
                      onChange={(e) => set("code")(e.target.value)}
                    />
                  </Field>
                  <Field label="Institution type">
                    <Select value={form.type} onValueChange={set("type")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering College</SelectItem>
                        <SelectItem value="university">University</SelectItem>
                        <SelectItem value="autonomous">Autonomous Institute</SelectItem>
                        <SelectItem value="degree">Degree College</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="City & state" required>
                    <Input
                      placeholder="Ahmedabad, Gujarat"
                      value={form.city}
                      onChange={(e) => set("city")(e.target.value)}
                    />
                  </Field>
                  <Field label="Website">
                    <Input
                      placeholder="https://sit.edu.in"
                      value={form.website}
                      onChange={(e) => set("website")(e.target.value)}
                    />
                  </Field>
                  <Field label="Approx. student count">
                    <Input
                      placeholder="8000"
                      inputMode="numeric"
                      value={form.students}
                      onChange={(e) => set("students")(e.target.value)}
                    />
                  </Field>
                </div>
                <Field label="Campus address">
                  <Textarea
                    rows={3}
                    placeholder="Full postal address of the main campus"
                    value={form.address}
                    onChange={(e) => set("address")(e.target.value)}
                  />
                </Field>
              </>
            )}

            {step === 1 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Administrator name" required>
                  <Input
                    placeholder="Dr. Meera Raval"
                    value={form.adminName}
                    onChange={(e) => set("adminName")(e.target.value)}
                  />
                </Field>
                <Field label="Official email" required>
                  <Input
                    type="email"
                    placeholder="admin@sit.edu.in"
                    value={form.adminEmail}
                    onChange={(e) => set("adminEmail")(e.target.value)}
                  />
                </Field>
                <Field label="Phone">
                  <Input
                    placeholder="+91 98250 00000"
                    value={form.adminPhone}
                    onChange={(e) => set("adminPhone")(e.target.value)}
                  />
                </Field>
                <Field label="Password" required hint="Minimum 6 characters">
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => set("password")(e.target.value)}
                  />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Pick the products to activate now. You can add or remove them later from your
                  subscription dashboard. Use your CampusGrid ID to link CampusConnect and
                  GradeMate.
                </p>
                {PRODUCTS.filter((p) => p.subscription).map((p) => {
                  const on = selected.includes(p.id);
                  return (
                    <label
                      key={p.id}
                      className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition-colors ${
                        on ? "border-primary bg-secondary/60" : "border-border bg-card"
                      }`}
                    >
                      <Checkbox
                        checked={on}
                        onCheckedChange={() =>
                          setSelected((s) =>
                            s.includes(p.id) ? s.filter((x) => x !== p.id) : [...s, p.id],
                          )
                        }
                        className="mt-1"
                      />
                      <span className="flex-1">
                        <span className="flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold">{p.name}</span>
                          <span className="text-xs font-medium text-muted-foreground">
                            {p.price}
                          </span>
                        </span>
                        <span className="mt-1 block text-sm text-muted-foreground">
                          {p.tagline}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-9 flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <ArrowLeft className="size-4" /> Back
            </Button>
            {step < 2 ? (
              <Button onClick={() => setStep((s) => s + 1)} disabled={!stepValid}>
                Continue <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button onClick={submit} disabled={submitting}>
                {submitting && <Loader2 className="size-4 animate-spin" />}
                Create institution account
              </Button>
            )}
          </div>
        </div>

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
      </main>
    </div>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
