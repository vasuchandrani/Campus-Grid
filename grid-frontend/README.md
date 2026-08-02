# CampusGrid

**One platform. Every campus product.**

CampusGrid is the central place where a college enters and manages its data — students, professors, staff, departments, roles and permissions. Once that data lives here, the college never has to enter it again in any of our products.

---

## The idea

We first built **CampusConnect** (campus communication, clubs, events, newspaper, research publishing) and then **GradeMate** (digital exams, evaluation and campus recruitment). A college using both had to create the same students, professors and departments twice.

CampusGrid removes that duplication. It is the single, verified source of truth for the institution. Every connected product reads from it.

---

## The CampusGrid ID

When a college registers on CampusGrid and is verified, it receives a unique **CampusGrid ID** — for example `CG-SIT-AHM-4821`.

That ID is the only thing the college ever needs when subscribing to another product:

1. Register your college on CampusGrid (once).
2. Build your directory — departments, students, faculty, roles.
3. Subscribe to CampusConnect or GradeMate.
4. Enter your CampusGrid ID during that product's setup.
5. The product loads your institution, departments, users and roles instantly.
6. Any later change made in CampusGrid appears in every linked product automatically.

No re-entry. No import files. No mismatched records.

---

## What a college manages in CampusGrid

- **Institution profile** — name, code, city, verification status, admins.
- **Departments** — departments, branches, batches and sections.
- **Users** — students, professors, HoDs, club admins, journalists, placement officers, staff.
- **Roles and permissions** — defined once, honoured by every connected product.
- **Authentication** — one login identity per person across all products.
- **Subscriptions** — which products are active, seats used, renewal dates.
- **Audit and sync activity** — a record of every administrative change and every product sync.

### The college admin console

After registration the college admin dashboard opens with:

- **Overview** — headline numbers, active subscriptions, live sync activity.
- **Users** — search, filter by role, add a user, invite, archive.
- **Departments** — create and maintain the academic structure.
- **Roles** — see every role, its scope and how many people hold it.
- **Products** — subscription status and what data each product receives.

---

## Connected products

### CampusConnect — campus communication

Clubs, verified club admins, college announcements with priority levels, dynamic event registration with tiered pricing and Excel export, a university digital newspaper written by student journalists, and a monthly research paper submission and professor review cycle.

**Inherits from CampusGrid:** students and faculty, departments and batches, roles and permissions, login identity.

### GradeMate — examinations and recruitment

Digital pen-and-paper exams with a drawing board, autosave with a single irreversible submission, live exam monitoring, line-highlight evaluation with feedback, HoD oversight across every professor and exam, recruitment drives with custom round pipelines, and AI resume screening.

**Inherits from CampusGrid:** students and faculty, departments, branches and sections, HoD and professor roles, login identity.

---

## How synchronization works (in plain terms)

Connected products do not keep their own copy of the college's people. When a product needs to know who a student is, which department they belong to or what they are allowed to do, it asks CampusGrid using the college's CampusGrid ID. Whenever a record changes in CampusGrid, the products are notified immediately.

So:

- Add a student in CampusGrid → they can sit an exam in GradeMate and join a club in CampusConnect.
- Promote a professor to HoD → the new authority applies in both products at once.
- Archive a graduating batch → their access is withdrawn everywhere.

---

## CollegeBook — a separate product

**CollegeBook is not part of CampusGrid and shares no data with it.** It needs no college subscription; students sign up themselves.

It is a campus-only student network: a feed without follower counts, a Collab Hub for hackathon teams and projects, verified skill badges, a profile built on contributions rather than popularity, accounts that are time-bound to the course duration, and a personal Memory Book archived at graduation.

We list it here because it is our product — not because it is connected to your institution's data.

---

## Coming next in CampusGrid

Attendance · Timetable and exam scheduling · Library · Results and academic records · Hostel · Transport · Fees gateway · Learning management · AI campus assistant · Institution analytics

These will be features of CampusGrid itself, built on the directory the college has already configured — with no new onboarding.

---

## Security

Role based access control, encrypted authentication and session management, immutable audit logs of administrative actions, fine-grained permission management, signed and rate-limited product APIs, and strict data isolation between colleges.
