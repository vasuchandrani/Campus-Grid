export type SubscriptionStatus = "active" | "trial" | "expired" | "none";

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
  {
    id: "d1",
    name: "Computer Engineering",
    code: "CE",
    hod: "Dr. A. Bhatt",
    students: 1840,
    professors: 62,
  },
  {
    id: "d2",
    name: "Information Technology",
    code: "IT",
    hod: "Dr. S. Pandya",
    students: 1420,
    professors: 48,
  },
  {
    id: "d3",
    name: "Electronics & Communication",
    code: "EC",
    hod: "Dr. R. Shah",
    students: 980,
    professors: 41,
  },
  {
    id: "d4",
    name: "Mechanical Engineering",
    code: "ME",
    hod: "Dr. K. Desai",
    students: 1260,
    professors: 55,
  },
  {
    id: "d5",
    name: "Civil Engineering",
    code: "CI",
    hod: "Dr. N. Trivedi",
    students: 870,
    professors: 39,
  },
  {
    id: "d6",
    name: "Electrical Engineering",
    code: "EE",
    hod: "Dr. P. Joshi",
    students: 760,
    professors: 34,
  },
];

export const DEPARTMENT_NAMES = DEPARTMENTS.map((d) => d.name);

/**
 * CampusGrid has exactly three platform roles.
 * "HoD" is not a fourth role — it is the Professor role extended with
 * department-head permissions, assigned by the College Admin.
 */
export type Role = "College Admin" | "HoD" | "Professor" | "Student";

export const PLATFORM_ROLES: Role[] = ["College Admin", "HoD", "Professor", "Student"];

export const isFacultyRole = (r: Role) => r === "Professor" || r === "HoD";

export const ROLES: { role: Role; scope: string; count: number; description: string }[] = [
  {
    role: "College Admin",
    scope: "Institution",
    count: 3,
    description: "Full control of the directory, role assignment, announcements and subscriptions.",
  },
  {
    role: "HoD",
    scope: "Department",
    count: 9,
    description:
      "Professor extended with department-head rights — time-table, academic calendar and department announcements.",
  },
  {
    role: "Professor",
    scope: "Department",
    count: 386,
    description:
      "Teaches, creates announcement groups, publishes announcements and reads the time-table.",
  },
  {
    role: "Student",
    scope: "Batch / Section",
    count: 8412,
    description:
      "Reads announcements, time-table and academic calendar; maintains their own profile.",
  },
];

/**
 * Extra responsibilities a student can carry on top of the Student role.
 * "Club Admin" is granted inside CampusConnect when a club is created, so it
 * appears in the directory filters but is not assignable from CampusGrid.
 */
export const STUDENT_TAGS = [
  "Journalist",
  "Class Representative",
  "Placement Coordinator",
  "Club Admin",
] as const;
export type StudentTag = (typeof STUDENT_TAGS)[number];

/** Responsibilities the College Admin can grant to a student. */
export const ASSIGNABLE_STUDENT_TAGS: StudentTag[] = [
  "Journalist",
  "Class Representative",
  "Placement Coordinator",
];

/** Platform roles the College Admin can assign to a faculty member. */
export const ASSIGNABLE_FACULTY_ROLES: Role[] = ["Professor", "HoD", "College Admin"];

export type Qualification = "10th + 12th Science" | "10th + Diploma";

export type StudentProfile = {
  enrollmentNo: string;
  batch: number; // admission year
  year: 1 | 2 | 3 | 4;
  semester: number;
  division: string;
  qualification: Qualification;
  tenthBoard: string;
  tenthYear: number;
  tenthPercent: number;
  twelfthOrDiplomaBoard: string;
  twelfthOrDiplomaYear: number;
  twelfthOrDiplomaPercent: number;
  stream: string;
  admissionType: "Merit" | "Management" | "Lateral Entry";
  cgpa: number;
  attendance: number;
  guardian: string;
  phone: string;
  bloodGroup: string;
  address: string;
  tags: StudentTag[];
};

export type FacultyProfile = {
  employeeNo: string;
  designation: string;
  qualification: string;
  specialisation: string;
  experienceYears: number;
  joinedOn: string;
  subjects: string[];
  phone: string;
  cabin: string;
};

export type ManagedUser = {
  id: string;
  gridId: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  status: "active" | "invited" | "pending" | "archived";
  /** true when the person self-registered and is waiting for a role decision */
  selfRegistered?: boolean;
  student?: StudentProfile;
  faculty?: FacultyProfile;
};

/** Current academic reference year — batch 2023 is the final year. */
export const CURRENT_ACADEMIC_YEAR = 2026;
export const BATCHES = [2023, 2024, 2025, 2026];
export const yearOfBatch = (batch: number) =>
  Math.min(4, Math.max(1, CURRENT_ACADEMIC_YEAR - batch + 1)) as 1 | 2 | 3 | 4;
export const yearLabel = (y: number) =>
  ({ 1: "1st year", 2: "2nd year", 3: "3rd year", 4: "Final year" })[y] ?? `${y} year`;

const FIRST = [
  "Aarav",
  "Isha",
  "Rohan",
  "Diya",
  "Kavya",
  "Meet",
  "Riya",
  "Yash",
  "Neha",
  "Parth",
  "Anaya",
  "Dhruv",
  "Sneha",
  "Harsh",
  "Tanvi",
  "Jay",
  "Krisha",
  "Vivek",
  "Pooja",
  "Manav",
  "Nidhi",
  "Arjun",
  "Zeel",
  "Rutvik",
];
const LAST = [
  "Shah",
  "Patel",
  "Desai",
  "Trivedi",
  "Mehta",
  "Joshi",
  "Bhatt",
  "Pandya",
  "Iyer",
  "Chauhan",
];

const BOARDS = ["GSEB", "CBSE", "ICSE", "GSEB"];
const DIPLOMA_BOARDS = ["GTU Diploma", "GTU Diploma", "State Board of Technical Education"];

function slug(name: string) {
  return name.toLowerCase().replace(/[^a-z]+/g, ".");
}

function makeStudents(): ManagedUser[] {
  const out: ManagedUser[] = [];
  let n = 0;
  DEPARTMENTS.forEach((dept, di) => {
    BATCHES.forEach((batch, bi) => {
      for (let k = 0; k < 3; k++) {
        n += 1;
        const first = FIRST[(di * 4 + bi * 3 + k) % FIRST.length]!;
        const last = LAST[(di * 3 + bi + k) % LAST.length]!;
        const name = `${first} ${last}`;
        const year = yearOfBatch(batch);
        const diploma = (di + k) % 4 === 3;
        const tags: StudentTag[] =
          k === 0 && bi % 2 === 0 ? [STUDENT_TAGS[(di + bi) % STUDENT_TAGS.length]!] : [];
        out.push({
          id: `s${n}`,
          gridId: `${COLLEGE.campusGridId}-S${String(n).padStart(3, "0")}`,
          name,
          email: `${slug(name)}.${batch}@sit.edu.in`,
          role: "Student",
          department: dept.name,
          status: n % 17 === 0 ? "invited" : "active",
          student: {
            enrollmentNo: `${batch}${dept.code}${String(100 + n)}`,
            batch,
            year,
            semester: year * 2 - (n % 2),
            division: ["A", "B", "C"][k % 3]!,
            qualification: diploma ? "10th + Diploma" : "10th + 12th Science",
            tenthBoard: BOARDS[(di + k) % BOARDS.length]!,
            tenthYear: batch - (diploma ? 4 : 2),
            tenthPercent: 72 + ((n * 7) % 26),
            twelfthOrDiplomaBoard: diploma
              ? DIPLOMA_BOARDS[(di + k) % DIPLOMA_BOARDS.length]!
              : BOARDS[(di + bi) % BOARDS.length]!,
            twelfthOrDiplomaYear: batch,
            twelfthOrDiplomaPercent: 65 + ((n * 11) % 32),
            stream: diploma ? `Diploma — ${dept.name}` : "Science (PCM / Group A)",
            admissionType: diploma ? "Lateral Entry" : n % 5 === 0 ? "Management" : "Merit",
            cgpa: Number((6.6 + ((n * 13) % 30) / 10).toFixed(2)),
            attendance: 70 + ((n * 3) % 28),
            guardian: `${["Mr.", "Mrs."][n % 2]} ${last}`,
            phone: `+91 9${String(800000000 + n * 137).slice(0, 9)}`,
            bloodGroup: ["A+", "B+", "O+", "AB+", "O-"][n % 5]!,
            address: `${10 + n}, ${["Satellite", "Bopal", "Maninagar", "Naranpura"][n % 4]}, Ahmedabad`,
            tags,
          },
        });
      }
    });
  });
  return out;
}

const FACULTY_SEED: {
  name: string;
  dept: string;
  role: Role;
  desig: string;
  spec: string;
  subj: string[];
}[] = [
  {
    name: "Dr. A. Bhatt",
    dept: "Computer Engineering",
    role: "HoD",
    desig: "Professor & Head",
    spec: "Distributed Systems",
    subj: ["Operating Systems", "Cloud Computing"],
  },
  {
    name: "Dr. S. Pandya",
    dept: "Information Technology",
    role: "HoD",
    desig: "Professor & Head",
    spec: "Information Security",
    subj: ["Cryptography", "Network Security"],
  },
  {
    name: "Dr. R. Shah",
    dept: "Electronics & Communication",
    role: "HoD",
    desig: "Professor & Head",
    spec: "VLSI Design",
    subj: ["Digital Electronics"],
  },
  {
    name: "Dr. K. Desai",
    dept: "Mechanical Engineering",
    role: "HoD",
    desig: "Professor & Head",
    spec: "Thermal Engineering",
    subj: ["Thermodynamics"],
  },
  {
    name: "Prof. K. Mehta",
    dept: "Information Technology",
    role: "Professor",
    desig: "Assistant Professor",
    spec: "Web Technologies",
    subj: ["Web Development", "DBMS"],
  },
  {
    name: "Prof. R. Iyer",
    dept: "Computer Engineering",
    role: "Professor",
    desig: "Associate Professor",
    spec: "Machine Learning",
    subj: ["AI & ML", "Data Structures"],
  },
  {
    name: "Prof. D. Chauhan",
    dept: "Computer Engineering",
    role: "Professor",
    desig: "Assistant Professor",
    spec: "Compilers",
    subj: ["Compiler Design"],
  },
  {
    name: "Prof. M. Solanki",
    dept: "Civil Engineering",
    role: "Professor",
    desig: "Assistant Professor",
    spec: "Structures",
    subj: ["Structural Analysis"],
  },
  {
    name: "Prof. T. Vyas",
    dept: "Electrical Engineering",
    role: "Professor",
    desig: "Assistant Professor",
    spec: "Power Systems",
    subj: ["Power Electronics"],
  },
  {
    name: "Prof. H. Rana",
    dept: "Electronics & Communication",
    role: "Professor",
    desig: "Assistant Professor",
    spec: "Embedded Systems",
    subj: ["Microcontrollers"],
  },
  {
    name: "Prof. S. Nair",
    dept: "Mechanical Engineering",
    role: "Professor",
    desig: "Assistant Professor",
    spec: "Manufacturing",
    subj: ["CAD / CAM"],
  },
];

function makeFaculty(): ManagedUser[] {
  let hodCount = 0;
  let profCount = 0;
  return FACULTY_SEED.map((f, i) => ({
    id: `f${i + 1}`,
    gridId: `${COLLEGE.campusGridId}-${f.role === "HoD" ? `H${String(++hodCount).padStart(3, "0")}` : `P${String(++profCount).padStart(3, "0")}`}`,
    name: f.name,
    email: `${slug(f.name.replace(/^(Dr|Prof)\.\s*/, ""))}@sit.edu.in`,
    role: f.role,
    department: f.dept,
    status: "active" as const,
    faculty: {
      employeeNo: `EMP-${2010 + i}`,
      designation: f.desig,
      qualification: f.role === "HoD" ? "Ph.D." : i % 2 ? "M.Tech." : "Ph.D. (pursuing)",
      specialisation: f.spec,
      experienceYears: 4 + ((i * 3) % 18),
      joinedOn: `${2008 + (i % 15)}-07-01`,
      subjects: f.subj,
      phone: `+91 98${String(250000000 + i * 971).slice(0, 8)}`,
      cabin: `Block ${["A", "B", "C"][i % 3]} · Cabin ${101 + i}`,
    },
  }));
}

export const USERS: ManagedUser[] = [
  {
    id: "a1",
    gridId: `${COLLEGE.campusGridId}-A001`,
    name: "Dr. Meera Raval",
    email: "admin@sit.edu.in",
    role: "College Admin",
    department: "Administration",
    status: "active",
  },
  {
    id: "a2",
    gridId: `${COLLEGE.campusGridId}-A002`,
    name: "Ms. N. Kapadia",
    email: "placements@sit.edu.in",
    role: "College Admin",
    department: "Administration",
    status: "active",
  },
  ...makeFaculty(),
  ...makeStudents(),
];

/** Demo IDs referenced by the login screen keep working. */
export const DEMO_HOD_ID = `${COLLEGE.campusGridId}-H001`;
export const DEMO_PROF_ID = `${COLLEGE.campusGridId}-P001`;

export type ProductSubscription = {
  id: "campusconnect" | "grademate";
  product: string;
  description: string;
  url: string;
  plan: string;
  status: SubscriptionStatus;
  seats: number;
  used: number;
  renews: string;
  amount: string;
};

export const SUBSCRIPTIONS: ProductSubscription[] = [
  {
    id: "campusconnect",
    product: "CampusConnect",
    description: "Clubs, events, announcements, digital newspaper and research submissions.",
    url: "https://www.campus-conect.xyz/",
    plan: "Institution",
    status: "active",
    seats: 9000,
    used: 8412,
    renews: "12 Mar 2027",
    amount: "₹49,000 / year",
  },
  {
    id: "grademate",
    product: "GradeMate",
    description: "Exams, answer sheets, evaluation workflow and recruitment drives.",
    url: "https://grademate.campusgrid.io/",
    plan: "Institution",
    status: "none",
    seats: 9000,
    used: 0,
    renews: "—",
    amount: "₹79,000 / year",
  },
];

export const ACTIVITY = [
  { when: "12 min ago", text: "142 first-year students imported into Computer Engineering" },
  { when: "48 min ago", text: "CampusConnect pulled the updated department structure" },
  { when: "1 hour ago", text: "GradeMate synced 386 professor records" },
  { when: "3 hours ago", text: "Role updated — Prof. K. Mehta assigned HoD (IT)" },
  { when: "1 day ago", text: "CampusGrid ID verified for a new GradeMate admin session" },
  { when: "2 days ago", text: "38 graduating students archived and de-provisioned" },
];
