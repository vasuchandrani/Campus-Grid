import {
  Activity,
  BookOpen,
  Boxes,
  Building2,
  CalendarDays,
  Fingerprint,
  GraduationCap,
  IdCard,
  KeyRound,
  Layers,
  Newspaper,
  ScrollText,
  Users,
  Wallet,
  Webhook,
  Bus,
  BedDouble,
  Library,
  Sparkles,
  BarChart3,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

/**
 * Products that are CONNECTED to CampusGrid.
 * A college enters data once in CampusGrid and links these with its CampusGrid ID.
 */
export const PRODUCTS = [
  {
    id: "campusconnect",
    name: "CampusConnect",
    tagline: "Campus communication, clubs & research publishing",
    icon: Newspaper,
    price: "₹49,000 / year",
    subscription: true,
    description:
      "CampusConnect centralizes communication across the college — clubs, announcements, events, a university digital newspaper and a monthly research paper publishing cycle.",
    inherits: [
      "Students & faculty",
      "Departments & batches",
      "Roles & permissions",
      "Login identity",
    ],
    features: [
      "Club management & verified club admins",
      "University digital newspaper by student journalists",
      "Monthly research paper submission & professor review",
      "College announcements with priority levels",
      "Dynamic event registration with tiered pricing",
      "Excel export of event registrations",
      "Role based access for every user type",
    ],
    future: [
      "Online club meetings",
      "Cross-college research & newspapers",
      "Club broadcast channels",
      "Native mobile app",
    ],
  },
  {
    id: "grademate",
    name: "GradeMate",
    tagline: "Digital exams, evaluation & campus recruitment",
    icon: GraduationCap,
    price: "₹79,000 / year",
    subscription: true,
    description:
      "GradeMate digitizes the complete pen-and-paper examination workflow — long-form answers with a drawing board, line-level evaluation, and a full campus recruitment pipeline.",
    inherits: [
      "Students & faculty",
      "Departments, branches & sections",
      "HoD / professor roles",
      "Login identity",
    ],
    features: [
      "Digital pen-and-paper exams with drawing board",
      "Autosave and single irreversible submission",
      "Live exam monitoring per student",
      "Line-highlight evaluation with feedback",
      "HoD oversight across every professor & exam",
      "Recruitment drives with custom round pipelines",
      "AI resume screening against drive requirements",
    ],
    future: ["AI interview round", "Proctoring insights", "Placement analytics"],
  },
] as const;

/**
 * CollegeBook is a separate product. It does NOT share data with CampusGrid
 * and needs no college subscription — it is listed here for awareness only.
 */
export const COLLEGEBOOK = {
  name: "CollegeBook",
  icon: BookOpen,
  tagline: "A campus-only student network with a Memory Book",
  description:
    "CollegeBook is our independent student product. It is not part of the CampusGrid data layer — students join it themselves. A purpose-built campus network where students connect, collaborate and build, time-bound to their course and archived into a personal Memory Book at graduation.",
  features: [
    "Campus feed with no follower counts or vanity metrics",
    "Explore posts and ideas from other colleges",
    "Collab Hub to form hackathon teams and project squads",
    "myCon verified skill badges earned through contribution",
    "A profile built on what you build, not what you post",
    "Graduation archive — your entire college life as a Memory Book",
  ],
  differs: [
    {
      title: "Built for students, not institutions",
      body: "No college onboarding, no admin approval, no subscription — a student joins directly with their campus identity.",
    },
    {
      title: "Time-bound by design",
      body: "An account lives for the duration of the course, then converts into a permanent Memory Book instead of an endless feed.",
    },
    {
      title: "Contribution over popularity",
      body: "Visibility comes from projects, collaborations and verified skills — not from follower counts.",
    },
    {
      title: "Independent of CampusGrid",
      body: "CollegeBook keeps its own student-owned space. No college data flows in from CampusGrid, and none flows out.",
    },
  ],
  helps: [
    "Students find teammates for hackathons and side projects",
    "Juniors learn from what seniors actually built",
    "Skills get verified proof instead of self-claimed lists",
    "Every college memory stays in one place after graduation",
  ],
} as const;

export const CAPABILITIES = [
  {
    icon: IdCard,
    title: "One CampusGrid ID",
    body: "Every registered college receives a unique CampusGrid ID used to link every product.",
  },
  {
    icon: Users,
    title: "Central User Management",
    body: "Students, professors and staff live in one verified directory maintained only here.",
  },
  {
    icon: ShieldCheck,
    title: "Role Based Access",
    body: "Granular roles and permissions defined here and honoured by every connected product.",
  },
  {
    icon: KeyRound,
    title: "Single Sign-On",
    body: "One identity for every connected product. Students and faculty log in once.",
  },
  {
    icon: Fingerprint,
    title: "Secure Authentication",
    body: "Encrypted credentials, session control and institution-verified access.",
  },
  {
    icon: Layers,
    title: "Multi-College Architecture",
    body: "Every institution is isolated with its own tenant and data boundary.",
  },
  {
    icon: Activity,
    title: "Automatic Sync",
    body: "Add, update or remove a user once — every connected product reflects it instantly.",
  },
  {
    icon: Webhook,
    title: "API Driven",
    body: "Clean, signed APIs and webhooks power every connected product.",
  },
  {
    icon: ScrollText,
    title: "Audit Logs",
    body: "Every administrative action is recorded and reviewable.",
  },
];

export const STEPS = [
  {
    title: "Register your college",
    body: "Institution details, verification and the college-admin account in one form.",
  },
  {
    title: "Receive your CampusGrid ID",
    body: "A unique institution ID is issued instantly — this is the key to every product.",
  },
  {
    title: "Configure departments",
    body: "Create departments, branches, batches and your academic structure.",
  },
  {
    title: "Add students & faculty",
    body: "Bulk import or add manually — CampusGrid is the single source of truth.",
  },
  {
    title: "Assign roles",
    body: "Admins, HoDs, professors, club admins, journalists and students.",
  },
  {
    title: "Link a product with your ID",
    body: "On CampusConnect or GradeMate, enter your CampusGrid ID — no data re-entry.",
  },
];

export const ID_FLOW = [
  {
    title: "Register once on CampusGrid",
    body: "Your institution profile, departments, students, faculty and roles are entered here and nowhere else.",
  },
  {
    title: "Get your CampusGrid ID",
    body: "For example CG-SIT-AHM-4821. It identifies your institution across the whole ecosystem.",
  },
  {
    title: "Buy CampusConnect or GradeMate",
    body: "At signup the product asks for only one thing — your CampusGrid ID and admin verification.",
  },
  {
    title: "Data appears automatically",
    body: "Departments, students, professors and roles are already there. Nothing is typed twice, ever.",
  },
];

export const STATS = [
  {
    value: "25,000+",
    label: "Students manageable per institution",
    sub: "Bulk import, batch promotion and graduation handling",
  },
  {
    value: "1",
    label: "CampusGrid ID for every product",
    sub: "Register once, link CampusConnect and GradeMate with the same ID",
  },
  {
    value: "100%",
    label: "Centralized data",
    sub: "No duplicate directories, no drift between products",
  },
  {
    value: "0",
    label: "Times you re-enter your data",
    sub: "Data lives in CampusGrid and flows outward",
  },
];

/** Future features OF CampusGrid itself — not separate products. */
export const ROADMAP = [
  { icon: CalendarDays, title: "Attendance", when: "Q1" },
  { icon: ClipboardList, title: "Timetable & Exam Schedule", when: "Q1" },
  { icon: Library, title: "Library", when: "Q1" },
  { icon: ScrollText, title: "Results & Academic Records", when: "Q2" },
  { icon: BedDouble, title: "Hostel", when: "Q2" },
  { icon: Bus, title: "Transport", when: "Q2" },
  { icon: Wallet, title: "Fees Gateway", when: "Q2" },
  { icon: Boxes, title: "Learning Management", when: "Q3" },
  { icon: Sparkles, title: "AI Campus Assistant", when: "Q3" },
  { icon: BarChart3, title: "Institution Analytics", when: "Q4" },
];

export const FAQS = [
  {
    q: "What exactly is CampusGrid?",
    a: "CampusGrid is the central data and identity platform for your college. You register your institution once, enter departments, students, faculty, roles and permissions here — and every connected product reads from that single source of truth.",
  },
  {
    q: "What is a CampusGrid ID?",
    a: "When your college registers, it receives a unique CampusGrid ID. To start using CampusConnect or GradeMate, your admin simply enters that ID during product signup. No institution details, no department lists, no user uploads — everything required is already available.",
  },
  {
    q: "Do we still enter data inside CampusConnect or GradeMate?",
    a: "No. Those products never own your directory. Institution, department, student, faculty and role data is entered only in CampusGrid and reflected in each product you subscribe to.",
  },
  {
    q: "What happens when we update or remove a user?",
    a: "The change is made once in CampusGrid. Every linked product receives it — a promoted professor, a transferred student or a de-provisioned account is consistent everywhere within moments.",
  },
  {
    q: "Is CollegeBook part of this?",
    a: "No. CollegeBook is our student product and is intentionally independent — it shares no data with CampusGrid and needs no college subscription. Students join it on their own. We list it here so colleges and students know it exists.",
  },
  {
    q: "What is coming next in CampusGrid?",
    a: "Attendance, timetables, results, library, hostel, transport, a fees gateway and learning management will all be built into CampusGrid itself, using the same directory you have already configured.",
  },
  {
    q: "Can an existing college migrate its data?",
    a: "Yes. You can bulk-import students, faculty and department structure from CSV or Excel. If you already use one of our products, its directory is mapped into CampusGrid during onboarding.",
  },
];

export const SECURITY = [
  "Role based access control applied across connected products",
  "Encrypted authentication and session management",
  "Immutable audit logs of administrative actions",
  "Fine-grained permission management",
  "Signed, rate-limited product APIs bound to your CampusGrid ID",
  "Strict data isolation between colleges",
];
