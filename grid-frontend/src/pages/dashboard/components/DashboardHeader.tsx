import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/navbar";
import { COLLEGE } from "@/lib/mock-college";

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Logo />
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium">{COLLEGE.admin}</p>
            <p className="text-xs text-muted-foreground">{COLLEGE.adminEmail}</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/">Sign out</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
