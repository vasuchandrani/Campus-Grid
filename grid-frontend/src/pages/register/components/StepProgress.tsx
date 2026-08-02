import { Check } from "lucide-react";

export const STEP_LABELS = ["Institution", "Administrator", "Products"];

export function StepProgress({ step }: { step: number }) {
  return (
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
  );
}
