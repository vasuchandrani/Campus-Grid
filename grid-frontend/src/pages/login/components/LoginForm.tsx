import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/site/navbar";
import { DEMO_CREDENTIALS } from "@/lib/mock-college";

export function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (
        email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
        password === DEMO_CREDENTIALS.password
      ) {
        toast.success("Welcome back");
        navigate({ to: "/dashboard" });
      } else {
        toast.error("Invalid credentials", {
          description: "Use the demo account shown below to explore the console.",
        });
      }
    }, 700);
  };

  return (
    <div className="flex flex-col px-5 py-8 sm:px-10">
      <div className="flex items-center justify-between">
        <Logo />
        <Button asChild variant="ghost" size="sm">
          <Link to="/">
            <ArrowLeft className="size-4" /> Home
          </Link>
        </Button>
      </div>

      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-14">
        <h1 className="text-2xl font-semibold sm:text-3xl">College admin login</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Access your institution console, directory and subscriptions.
        </p>

        <form onSubmit={signIn} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Official email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@sit.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

        <div className="mt-6 rounded-xl border border-dashed border-border p-4 text-sm">
          <p className="flex items-center gap-2 font-medium">
            <Lock className="size-3.5 text-accent" /> Demo account
          </p>
          <p className="mt-1.5 text-muted-foreground">
            {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
          </p>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Not registered yet?{" "}
          <Link to="/register" className="font-medium text-foreground hover:underline">
            Register your college
          </Link>
        </p>
      </div>
    </div>
  );
}
