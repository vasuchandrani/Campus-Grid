import { Grid2x2Check } from "lucide-react";

export function PageLoader({ label = "Loading CampusGrid" }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative flex flex-col items-center gap-6">
        <span className="relative flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lift">
          <Grid2x2Check className="size-8" />
          <span className="absolute inset-0 animate-ping rounded-2xl bg-primary/25" />
        </span>
        <div className="w-56 space-y-3 text-center">
          <p className="text-sm font-medium">{label}</p>
          <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
            <div className="loader-bar h-full w-1/3 rounded-full bg-primary" />
          </div>
          <p className="text-xs text-muted-foreground">Preparing your workspace…</p>
        </div>
      </div>
    </div>
  );
}

export function SkeletonPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-4 px-5 py-16">
      <div className="h-10 w-2/3 animate-pulse rounded-xl bg-secondary" />
      <div className="h-4 w-1/2 animate-pulse rounded-lg bg-secondary" />
      <div className="grid gap-4 pt-6 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-36 animate-pulse rounded-2xl bg-secondary" />
        ))}
      </div>
    </div>
  );
}
