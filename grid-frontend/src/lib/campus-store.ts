import { useCallback, useSyncExternalStore } from "react";
import { BATCHES, DEPARTMENTS, USERS, yearOfBatch, type ManagedUser } from "./mock-college";

/* ------------------------------------------------------------------ *
 * Tiny localStorage-backed reactive store (mock data layer).
 * Every write is broadcast so all mounted screens stay in sync.
 * ------------------------------------------------------------------ */

const listeners = new Set<() => void>();
const cache = new Map<string, unknown>();

function read<T>(key: string, seed: T): T {
  if (cache.has(key)) return cache.get(key) as T;
  let value = seed;
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(key);
      if (raw) value = JSON.parse(raw) as T;
    } catch {
      /* ignore corrupted entries */
    }
  }
  cache.set(key, value);
  return value;
}

function write<T>(key: string, value: T) {
  cache.set(key, value);
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* quota — keep in-memory copy */
    }
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** Reactive collection hook. Server render always returns the seed. */
function useCollection<T>(key: string, seed: T) {
  const value = useSyncExternalStore(
    subscribe,
    () => read(key, seed),
    () => seed,
  );
  const set = useCallback(
    (updater: T | ((prev: T) => T)) => {
      const prev = read(key, seed);
      write(key, typeof updater === "function" ? (updater as (p: T) => T)(prev) : updater);
    },
    [key, seed],
  );
  return [value, set] as const;
}

export const uid = () => Math.random().toString(36).slice(2, 10);

/* ------------------------------- Users ---------------------------- */

const USERS_KEY = "campusgrid.users";

export function useUsers() {
  return useCollection<ManagedUser[]>(USERS_KEY, USERS);
}

/* ---------------------------- Time-table -------------------------- */

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
export type Day = (typeof DAYS)[number];

/** A period is defined by the HoD as a free "from → to" pair. */
export type TimeSlot = { id: string; from: string; to: string };
/** Slots are stored as their label so a lecture keeps its timing if a slot moves. */
export type Slot = string;

export const slotLabel = (s: TimeSlot) => `${s.from} – ${s.to}`;
export const slotKey = (department: string, batch: number | string) => `${department}|${batch}`;
/** Minutes since midnight — used to keep the grid in chronological order. */
export const slotStart = (s: TimeSlot) => {
  const [h, m] = s.from.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
};

export const DEFAULT_SLOTS: TimeSlot[] = [
  { id: "d1", from: "09:00", to: "10:00" },
  { id: "d2", from: "10:00", to: "11:00" },
  { id: "d3", from: "11:15", to: "12:15" },
  { id: "d4", from: "12:15", to: "13:15" },
  { id: "d5", from: "14:00", to: "15:00" },
  { id: "d6", from: "15:00", to: "16:00" },
];

const DEFAULT_LABELS = DEFAULT_SLOTS.map(slotLabel);

export type Lecture = {
  id: string;
  department: string;
  batch: number;
  day: Day;
  slot: Slot;
  subject: string;
  faculty: string;
  room: string;
};

const TIMETABLE_KEY = "campusgrid.timetable";
const SLOTS_KEY = "campusgrid.slots";

const SEED_TIMETABLE: Lecture[] = [
  {
    id: "t1",
    department: "Computer Engineering",
    batch: 2023,
    day: "Monday",
    slot: DEFAULT_LABELS[0]!,
    subject: "Cloud Computing",
    faculty: "Dr. A. Bhatt",
    room: "A-301",
  },
  {
    id: "t2",
    department: "Computer Engineering",
    batch: 2023,
    day: "Monday",
    slot: DEFAULT_LABELS[1]!,
    subject: "AI & ML",
    faculty: "Prof. R. Iyer",
    room: "A-302",
  },
  {
    id: "t3",
    department: "Computer Engineering",
    batch: 2023,
    day: "Tuesday",
    slot: DEFAULT_LABELS[2]!,
    subject: "Compiler Design",
    faculty: "Prof. D. Chauhan",
    room: "Lab-2",
  },
  {
    id: "t4",
    department: "Computer Engineering",
    batch: 2024,
    day: "Monday",
    slot: DEFAULT_LABELS[0]!,
    subject: "Data Structures",
    faculty: "Prof. R. Iyer",
    room: "B-101",
  },
  {
    id: "t5",
    department: "Information Technology",
    batch: 2023,
    day: "Wednesday",
    slot: DEFAULT_LABELS[1]!,
    subject: "Network Security",
    faculty: "Dr. S. Pandya",
    room: "C-204",
  },
  {
    id: "t6",
    department: "Information Technology",
    batch: 2023,
    day: "Thursday",
    slot: DEFAULT_LABELS[3]!,
    subject: "Web Development",
    faculty: "Prof. K. Mehta",
    room: "Lab-5",
  },
  {
    id: "t7",
    department: "Information Technology",
    batch: 2025,
    day: "Friday",
    slot: DEFAULT_LABELS[0]!,
    subject: "DBMS",
    faculty: "Prof. K. Mehta",
    room: "C-110",
  },
];

export function useTimetable() {
  return useCollection<Lecture[]>(TIMETABLE_KEY, SEED_TIMETABLE);
}

/** Slot definitions per department + batch, editable by the HoD. */
export function useSlotSets() {
  return useCollection<Record<string, TimeSlot[]>>(SLOTS_KEY, {});
}

/* --------------------------- Announcements ------------------------ */

export type Audience =
  | { scope: "college" }
  | { scope: "department"; department: string }
  | { scope: "group"; groupId: string };

export type AnnouncementGroup = {
  id: string;
  name: string;
  department: string;
  batch: number;
  description: string;
  createdBy: string;
};

export type Announcement = {
  id: string;
  title: string;
  body: string;
  images: string[];
  audience: Audience;
  author: string;
  authorRole: string;
  createdAt: string;
};

const GROUPS_KEY = "campusgrid.groups";
const ANNOUNCEMENTS_KEY = "campusgrid.announcements";

const SEED_GROUPS: AnnouncementGroup[] = [
  {
    id: "g1",
    name: "IT · Batch 2023 (Final year)",
    department: "Information Technology",
    batch: 2023,
    description: "Placement and final-year project updates.",
    createdBy: "Prof. K. Mehta",
  },
  {
    id: "g2",
    name: "CE · Batch 2023 (Final year)",
    department: "Computer Engineering",
    batch: 2023,
    description: "Capstone reviews, internships and placements.",
    createdBy: "Dr. A. Bhatt",
  },
  {
    id: "g3",
    name: "CE · Batch 2025 (2nd year)",
    department: "Computer Engineering",
    batch: 2025,
    description: "Lab batches, mid-sem practice and mentoring.",
    createdBy: "Prof. R. Iyer",
  },
  {
    id: "g4",
    name: "IT · Batch 2026 (1st year)",
    department: "Information Technology",
    batch: 2026,
    description: "Orientation, induction and first-semester notices.",
    createdBy: "Dr. S. Pandya",
  },
];

const iso = (daysAgo: number) => new Date(Date.now() - daysAgo * 86400000).toISOString();

const SEED_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "an1",
    title: "TCS Digital drive — register before Friday",
    body: "Final-year IT students eligible for the TCS Digital drive must upload their resume on the placement portal before Friday 5 PM. Shortlisting is based on CGPA ≥ 7.0 with no active backlogs.",
    images: [],
    audience: { scope: "group", groupId: "g1" },
    author: "Prof. K. Mehta",
    authorRole: "Professor",
    createdAt: iso(0),
  },
  {
    id: "an2",
    title: "Capstone review 2 — schedule published",
    body: "Review 2 for all capstone groups will run next Tuesday and Wednesday in A-Block. Bring a printed progress report signed by your guide.",
    images: [],
    audience: { scope: "group", groupId: "g2" },
    author: "Dr. A. Bhatt",
    authorRole: "HoD",
    createdAt: iso(1),
  },
  {
    id: "an3",
    title: "Mid-semester examinations begin 8 September",
    body: "Mid-semester examinations for all departments begin on 8 September. Hall tickets will be available on your CampusGrid profile 48 hours before the first paper.",
    images: [],
    audience: { scope: "college" },
    author: "Dr. Meera Raval",
    authorRole: "College Admin",
    createdAt: iso(2),
  },
  {
    id: "an4",
    title: "Department seminar — Industry 4.0",
    body: "All Computer Engineering students are invited to the department seminar on Industry 4.0 this Saturday at 11 AM in the seminar hall.",
    images: [],
    audience: { scope: "department", department: "Computer Engineering" },
    author: "Dr. A. Bhatt",
    authorRole: "HoD",
    createdAt: iso(3),
  },
];

export function useGroups() {
  return useCollection<AnnouncementGroup[]>(GROUPS_KEY, SEED_GROUPS);
}

export function useAnnouncements() {
  return useCollection<Announcement[]>(ANNOUNCEMENTS_KEY, SEED_ANNOUNCEMENTS);
}

/** Can this viewer read the announcement? */
export function canRead(
  a: Announcement,
  viewer: { role: string; department: string; batch?: number },
  groups: AnnouncementGroup[],
) {
  if (a.audience.scope === "college") return true;
  if (a.audience.scope === "department") return a.audience.department === viewer.department;
  const group = groups.find((g) => g.id === (a.audience as { groupId: string }).groupId);
  if (!group) return false;
  if (viewer.role === "College Admin") return true;
  if (viewer.role === "Student")
    return group.department === viewer.department && group.batch === viewer.batch;
  return group.department === viewer.department;
}

/* ------------------------- Academic calendar ---------------------- */

export const EVENT_TYPES = ["Examination", "Holiday", "Event", "Deadline", "Result"] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export type CalendarEvent = {
  id: string;
  title: string;
  date: string; // yyyy-mm-dd
  endDate?: string;
  type: EventType;
  department: string; // "All departments" or a department name
  description: string;
  createdBy: string;
};

const CALENDAR_KEY = "campusgrid.calendar";

const SEED_CALENDAR: CalendarEvent[] = [
  {
    id: "c1",
    title: "Odd semester begins",
    date: "2026-07-15",
    type: "Event",
    department: "All departments",
    description: "Regular lectures resume for all batches.",
    createdBy: "Dr. Meera Raval",
  },
  {
    id: "c2",
    title: "Mid-semester examinations",
    date: "2026-09-08",
    endDate: "2026-09-16",
    type: "Examination",
    department: "All departments",
    description: "Conducted department-wise as per the published time-table.",
    createdBy: "Dr. Meera Raval",
  },
  {
    id: "c3",
    title: "Tech-fest — GridSpark",
    date: "2026-10-02",
    endDate: "2026-10-04",
    type: "Event",
    department: "All departments",
    description: "Annual technical festival across all departments.",
    createdBy: "Dr. Meera Raval",
  },
  {
    id: "c4",
    title: "Capstone review 2",
    date: "2026-10-20",
    type: "Deadline",
    department: "Computer Engineering",
    description: "Final-year project second review.",
    createdBy: "Dr. A. Bhatt",
  },
  {
    id: "c5",
    title: "Diwali vacation",
    date: "2026-11-05",
    endDate: "2026-11-15",
    type: "Holiday",
    department: "All departments",
    description: "College remains closed.",
    createdBy: "Dr. Meera Raval",
  },
  {
    id: "c6",
    title: "End-semester results",
    date: "2026-12-28",
    type: "Result",
    department: "All departments",
    description: "Results published on GradeMate and mirrored to CampusGrid profiles.",
    createdBy: "Dr. Meera Raval",
  },
];

export function useCalendar() {
  return useCollection<CalendarEvent[]>(CALENDAR_KEY, SEED_CALENDAR);
}

/* ------------------------------ Helpers --------------------------- */

export const batchOptions = BATCHES.map((b) => ({
  value: b,
  label: `Batch ${b} · ${["1st year", "2nd year", "3rd year", "Final year"][yearOfBatch(b) - 1]}`,
}));

export const departmentOptions = DEPARTMENTS.map((d) => d.name);
