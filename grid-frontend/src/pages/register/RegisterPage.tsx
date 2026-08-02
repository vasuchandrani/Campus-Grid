import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/navbar";
import { StepProgress } from "./components/StepProgress";
import { InstitutionStep } from "./components/InstitutionStep";
import { AdminStep } from "./components/AdminStep";
import { ProductsStep } from "./components/ProductsStep";
import { RegisterSidebar } from "./components/RegisterSidebar";

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

          <StepProgress step={step} />

          <div className="mt-9 space-y-5">
            {step === 0 && <InstitutionStep form={form} set={set} />}
            {step === 1 && <AdminStep form={form} set={set} />}
            {step === 2 && <ProductsStep selected={selected} setSelected={setSelected} />}
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

        <RegisterSidebar />
      </main>
    </div>
  );
}
