import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, IdCard, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/features/landing/components/navbar";
import { DEMO_ACCOUNTS, signIn } from "@/lib/auth";

export function LoginPage() {
  const navigate = useNavigate();
  const [gridId, setGridId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const session = signIn(gridId, password);
      setLoading(false);
      if (session) {
        toast.success(`Welcome back, ${session.name}`);
        navigate({ to: "/app" });
      } else {
        toast.error("Invalid CampusGrid ID or password", {
          description: "Use one of the demo accounts listed below.",
        });
      }
    }, 600);
  };

  const applyAccount = (id: string, pw: string) => {
    setGridId(id);
    setPassword(pw);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-5 py-8 sm:px-10">
        <div className="flex items-center justify-between">
          <Logo />
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="size-4" /> Home
            </Link>
          </Button>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-14">
          <h1 className="text-2xl font-semibold sm:text-3xl">Sign in with your CampusGrid ID</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Students, professors, HoDs and college admins all sign in here — the same ID works on
            CampusConnect and GradeMate.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gridId">CampusGrid ID</Label>
              <Input
                id="gridId"
                placeholder="CG-SIT-AHM-4821-A001"
                value={gridId}
                onChange={(e) => setGridId(e.target.value)}
                className="font-mono"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="size-4 animate-spin" />}
              Sign in
            </Button>
          </form>

          <div className="mt-7 rounded-2xl border border-dashed border-border p-4">
            <p className="flex items-center gap-2 text-sm font-medium">
              <IdCard className="size-3.5 text-accent" /> Demo accounts
            </p>
            <div className="mt-3 space-y-2">
              {DEMO_ACCOUNTS.map((a) => (
                <button
                  key={a.gridId}
                  type="button"
                  onClick={() => applyAccount(a.gridId, a.password)}
                  className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-left transition-colors hover:bg-secondary"
                >
                  <span className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-medium">{a.role}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {a.gridId} / {a.password}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{a.blurb}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Student or professor without an ID?{" "}
            <Link to="/join" className="font-medium text-foreground hover:underline">
              Create your profile
            </Link>{" "}
            — your college admin approves it and issues your CampusGrid ID.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            College not registered yet?{" "}
            <Link to="/register" className="font-medium text-foreground hover:underline">
              Register and start a 30-day free trial
            </Link>
          </p>
        </div>
      </div>

      <div
        className="relative hidden overflow-hidden p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-center"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="grid-bg absolute inset-0 opacity-15" />
        <div className="relative max-w-md">
          <ShieldCheck className="size-9 text-accent" />
          <h2 className="mt-6 text-3xl font-semibold leading-tight">
            One ID for every campus product.
          </h2>
          <p className="mt-4 text-sm leading-relaxed opacity-90">
            Every student, professor and administrator is issued a CampusGrid ID. It is their login
            for CampusGrid, CampusConnect and GradeMate — and the reason no college ever enters the
            same data twice.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              ["8,412", "Students"],
              ["386", "Faculty"],
              ["3", "Products"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="text-xl font-semibold">{v}</p>
                <p className="text-xs opacity-80">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
