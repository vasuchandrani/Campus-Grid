import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field } from "./Field";

export interface InstitutionFormState {
  college: string;
  code: string;
  type: string;
  city: string;
  website: string;
  students: string;
  address: string;
}

export function InstitutionStep({
  form,
  set,
}: {
  form: InstitutionFormState;
  set: (k: keyof InstitutionFormState) => (v: string) => void;
}) {
  return (
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
  );
}
