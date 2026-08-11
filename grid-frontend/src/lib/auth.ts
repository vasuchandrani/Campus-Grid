import { useEffect, useState } from "react";
import { COLLEGE, USERS, type Role } from "./mock-college";

export type Session = {
  gridId: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  /** admission batch — students only */
  batch?: number;
};

export type DemoAccount = Session & { password: string; blurb: string };

const CREDENTIALS: { gridId: string; password: string; blurb: string }[] = [
  {
    gridId: `${COLLEGE.campusGridId}-A001`,
    password: "admin@123",
    blurb: "Full institution console — users, roles, departments, announcements, subscriptions.",
  },
  {
    gridId: `${COLLEGE.campusGridId}-H001`,
    password: "hod@123",
    blurb: "Professor extended with department-head rights — time-table and academic calendar.",
  },
  {
    gridId: `${COLLEGE.campusGridId}-P001`,
    password: "prof@123",
    blurb: "Teaching workspace — announcement groups, time-table and profile.",
  },
  {
    gridId: `${COLLEGE.campusGridId}-S001`,
    password: "student@123",
    blurb: "Student view — profile, announcements, time-table and academic calendar.",
  },
];

/** Demo credentials — every person signs in with their CampusGrid ID. */
export const DEMO_ACCOUNTS: DemoAccount[] = CREDENTIALS.flatMap((c) => {
  const user = USERS.find((u) => u.gridId === c.gridId);
  if (!user) return [];
  return [
    {
      gridId: user.gridId,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      ...(user.student ? { batch: user.student.batch } : {}),
      password: c.password,
      blurb: c.blurb,
    },
  ];
});

const KEY = "campusgrid.session";

export function signIn(gridId: string, password: string): Session | null {
  const account = DEMO_ACCOUNTS.find(
    (a) => a.gridId.toLowerCase() === gridId.trim().toLowerCase() && a.password === password,
  );
  if (!account) return null;
  const { password: _pw, blurb: _b, ...session } = account;
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function signOut() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}

/** Client-side session hook. `loading` is true until hydration completes. */
export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSession(getSession());
    setLoading(false);
  }, []);

  return { session, loading, setSession };
}

export const isAdmin = (s: Session | null) => s?.role === "College Admin";
export const isHod = (s: Session | null) => s?.role === "HoD";
export const isFaculty = (s: Session | null) => s?.role === "Professor" || s?.role === "HoD";
export const isStudent = (s: Session | null) => s?.role === "Student";
