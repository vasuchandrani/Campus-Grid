import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2,
  CalendarClock,
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  Settings,
  User,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/features/landing/components/navbar";
import { PageLoader } from "@/components/common/page-loader";
import { cn } from "@/lib/utils";
import { isAdmin, signOut, useSession, type Session } from "@/lib/auth";
import { COLLEGE } from "@/lib/mock-college";

type NavChild = { label: string; to: string };

function useNav(session: Session | null) {
  const manage: NavChild[] = [
    { label: "Users", to: "/app/users" },
    { label: "Departments", to: "/app/departments" },
  ];
  return { manage: isAdmin(session) ? manage : [] };
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { session, loading } = useSession();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState(true);
  const { manage } = useNav(session);

  if (loading) return <PageLoader />;

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface px-5 text-center">
        <h1 className="text-xl font-semibold">Please sign in to continue</h1>
        <p className="text-sm text-muted-foreground">
          Your CampusGrid ID unlocks the console for your role.
        </p>
        <Button onClick={() => navigate({ to: "/login" })}>Go to login</Button>
      </div>
    );
  }

  const logout = () => {
    signOut();
    navigate({ to: "/login" });
  };

  const isActive = (to: string) => pathname === to;

  const sidebar = (
    <div className="flex h-full flex-col border-r border-border bg-card">
      <div className="flex h-16 shrink-0 items-center justify-between px-5">
        <Logo />
        <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
          <X className="size-4" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <SideLink
          to="/app"
          icon={LayoutDashboard}
          label="Home"
          active={isActive("/app")}
          onClick={() => setOpen(false)}
        />
        <SideLink
          to="/app/announcements"
          icon={Megaphone}
          label="Announcements"
          active={isActive("/app/announcements")}
          onClick={() => setOpen(false)}
        />
        <SideLink
          to="/app/timetable"
          icon={CalendarClock}
          label="Time-table"
          active={isActive("/app/timetable")}
          onClick={() => setOpen(false)}
        />
        <SideLink
          to="/app/calendar"
          icon={CalendarDays}
          label="Academic calendar"
          active={isActive("/app/calendar")}
          onClick={() => setOpen(false)}
        />
        <SideLink
          to="/app/profile"
          icon={User}
          label="My profile"
          active={isActive("/app/profile")}
          onClick={() => setOpen(false)}
        />

        {manage.length > 0 && (
          <div>
            <button
              onClick={() => setManageOpen((o) => !o)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Users className="size-4.5" />
              <span className="flex-1 text-left">Manage</span>
              <ChevronDown
                className={cn("size-4 transition-transform", manageOpen && "rotate-180")}
              />
            </button>
            {manageOpen && (
              <div className="mt-1 ml-4 space-y-1 border-l border-border pl-3">
                {manage.map((m) => (
                  <Link
                    key={m.to}
                    to={m.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive(m.to)
                        ? "bg-secondary font-medium text-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    )}
                  >
                    {m.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>

      <div className="shrink-0 space-y-1 border-t border-border p-3">
        {isAdmin(session) && (
          <SideLink
            to="/app/settings"
            icon={Settings}
            label="Settings"
            active={isActive("/app/settings")}
            onClick={() => setOpen(false)}
          />
        )}
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <LogOut className="size-4.5" /> Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface">
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden w-[var(--app-sidebar-w)] lg:block"
        style={{ "--app-sidebar-w": "16rem" } as React.CSSProperties}
      >
        {sidebar}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/30" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72">{sidebar}</div>
        </div>
      )}

      <div className="lg:ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-background px-5">
          <div className="flex items-center gap-3">
            <button
              className="flex size-9 items-center justify-center rounded-lg border border-border lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </button>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold">{COLLEGE.name}</p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Building2 className="size-3" /> {COLLEGE.campusGridId}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">{session.name}</p>
              <p className="text-xs text-muted-foreground">
                {session.role} · <span className="font-mono">{session.gridId}</span>
              </p>
            </div>
            <Link
              to="/app/profile"
              aria-label="Open your profile"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {session.name
                .replace(/^(Dr|Prof|Mr|Ms|Mrs)\.?\s*/i, "")
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")}
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
      </div>
    </div>
  );
}

function SideLink({
  to,
  icon: Icon,
  label,
  active,
  onClick,
}: {
  to: string;
  icon: typeof Users;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground shadow-soft"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
    >
      <Icon className="size-4.5" /> {label}
    </Link>
  );
}
