import { Checkbox } from "@/components/ui/checkbox";
import { PRODUCTS } from "@/lib/campus-data";

export function ProductsStep({
  selected,
  setSelected,
}: {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Pick the products to activate now. You can add or remove them later from your
        subscription dashboard. Use your CampusGrid ID to link CampusConnect and GradeMate.
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
                <span className="text-xs font-medium text-muted-foreground">{p.price}</span>
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">{p.tagline}</span>
            </span>
          </label>
        );
      })}
    </div>
  );
}
