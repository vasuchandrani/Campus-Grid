export type SubscriptionStatus = "active" | "trial" | "expired";

export const COLLEGE = {
  name: "Sardar Institute of Technology",
  campusGridId: "CG-SIT-AHM-4821",
  code: "SIT-AHM-2011",
  city: "Ahmedabad, Gujarat",
  admin: "Dr. Meera Raval",
  adminEmail: "admin@sit.edu.in",
  students: 8412,
  professors: 386,
  departments: 9,
  clubs: 27,
};

export type Department = {
  id: string;
  name: string;
  code: string;
  hod: string;
  students: number;
  professors: number;
};

export const DEPARTMENTS: Department[] = [
  { id: "d1", name: "Computer Engineering", code: "CE", hod: "Dr. A. Bhatt", students: 1840, professors: 62 },
  { id: "d2", name: "Information Technology", code: "IT", hod: "Dr. S. Pandya", students: 1420, professors: 48 },
  { id: "d3", name: "Electronics & Communication", code: "EC", hod: "Dr. R. Shah", students: 980, professors: 41 },
  { id: "d4", name: "Mechanical Engineering", code: "ME", hod: "Dr. K. Desai", students: 1260, professors: 55 },
  { id: "d5", name: "Civil Engineering", code: "CI", hod: "Dr. N. Trivedi", students: 870, professors: 39 },
  { id: "d6", name: "Electrical Engineering", code: "EE", hod: "Dr. P. Joshi", students: 760, professors: 34 },
];

export type Role =
  | "College Admin"
  | "HoD"
  | "Professor"
  | "Student"
  | "Club Admin"
  | "Journalist"
  | "Placement Officer";

export const ROLES: { role: Role; scope: string; count: number; description: string }[] = [
  { role: "College Admin", scope: "Institution", count: 3, description: "Full control of directory, roles and product subscriptions." },
  { role: "HoD", scope: "Department", count: 9, description: "Oversees professors, exams and students of one department." },
  { role: "Professor", scope: "Department", count: 386, description: "Teaches, sets and evaluates exams, reviews research papers." },
  { role: "Student", scope: "Batch / Section", count: 8412, description: "Attends exams, joins clubs and events, submits research." },
  { role: "Club Admin", scope: "Club", count: 27, description: "Runs a club, publishes events and manages registrations." },
  { role: "Journalist", scope: "Institution", count: 14, description: "Writes and publishes the university digital newspaper." },
  { role: "Placement Officer", scope: "Institution", count: 4, description: "Creates recruitment drives and manages hiring rounds." },
];

export type ManagedUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  status: "active" | "invited" | "archived";
};

export const USERS: ManagedUser[] = [
  { id: "u1", name: "Dr. Meera Raval", email: "admin@sit.edu.in", role: "College Admin", department: "Administration", status: "active" },
  { id: "u2", name: "Dr. A. Bhatt", email: "a.bhatt@sit.edu.in", role: "HoD", department: "Computer Engineering", status: "active" },
  { id: "u3", name: "Prof. K. Mehta", email: "k.mehta@sit.edu.in", role: "Professor", department: "Information Technology", status: "active" },
  { id: "u4", name: "Prof. R. Iyer", email: "r.iyer@sit.edu.in", role: "Professor", department: "Computer Engineering", status: "active" },
  { id: "u5", name: "Aarav Shah", email: "aarav.shah@sit.edu.in", role: "Student", department: "Computer Engineering", status: "active" },
  { id: "u6", name: "Isha Patel", email: "isha.patel@sit.edu.in", role: "Club Admin", department: "Information Technology", status: "active" },
  { id: "u7", name: "Rohan Desai", email: "rohan.desai@sit.edu.in", role: "Journalist", department: "Civil Engineering", status: "invited" },
  { id: "u8", name: "Ms. N. Kapadia", email: "placements@sit.edu.in", role: "Placement Officer", department: "Administration", status: "active" },
  { id: "u9", name: "Diya Trivedi", email: "diya.trivedi@sit.edu.in", role: "Student", department: "Electronics & Communication", status: "archived" },
];

export const SUBSCRIPTIONS: {
  product: string;
  plan: string;
  status: SubscriptionStatus;
  seats: number;
  used: number;
  renews: string;
  amount: string;
  linked: boolean;
}[] = [
  { product: "CampusConnect", plan: "Institution", status: "active", seats: 9000, used: 8412, renews: "12 Mar 2027", amount: "₹49,000", linked: true },
  { product: "GradeMate", plan: "Institution", status: "active", seats: 9000, used: 7930, renews: "01 Jun 2027", amount: "₹79,000", linked: true },
];

export const ACTIVITY = [
  { when: "12 min ago", text: "142 first-year students imported into Computer Engineering" },
  { when: "48 min ago", text: "CampusConnect pulled the updated department structure" },
  { when: "1 hour ago", text: "GradeMate synced 386 professor records" },
  { when: "3 hours ago", text: "Role updated — Prof. K. Mehta assigned HoD (IT)" },
  { when: "1 day ago", text: "CampusGrid ID verified for a new GradeMate admin session" },
  { when: "2 days ago", text: "38 graduating students archived and de-provisioned" },
];

export const DEMO_CREDENTIALS = { email: "admin@sit.edu.in", password: "campusgrid" };
