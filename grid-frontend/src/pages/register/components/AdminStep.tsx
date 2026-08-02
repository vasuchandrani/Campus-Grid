import { Input } from "@/components/ui/input";
import { Field } from "./Field";

export interface AdminFormState {
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  password: string;
}

export function AdminStep({
  form,
  set,
}: {
  form: AdminFormState;
  set: (k: keyof AdminFormState) => (v: string) => void;
}) {
  return (
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
  );
}
