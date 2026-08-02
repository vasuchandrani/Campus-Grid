# CampusGrid — System Design

How CampusGrid, CampusConnect and GradeMate work together.

## 1. Roles of each system

| System | Owns | Reads from CampusGrid |
| --- | --- | --- |
| **CampusGrid** | Institutions, CampusGrid IDs, users, departments, roles, permissions, credentials, subscriptions, audit log | — |
| **CampusConnect** | Clubs, announcements, events, registrations, newspaper, research submissions | Users, departments/batches, roles, identity |
| **GradeMate** | Exams, answer sheets, evaluations, recruitment drives, applications | Users, departments/branches/sections, HoD & professor roles, identity |
| **CollegeBook** | Everything (independent student product) | Nothing — deliberately unconnected |

CampusGrid is the system of record for **identity and structure**. Products are systems of record for **their own domain data only**, referencing Grid users by ID.

## 2. Registration and linking

```text
College registers on CampusGrid
        │
        ▼
Verification → CampusGrid ID issued (CG-<COLLEGE>-<CITY>-<N>)
        │
        ▼
Admin builds directory: departments → users → roles
        │
        ├── subscribes to CampusConnect ──► enters CampusGrid ID
        └── subscribes to GradeMate     ──► enters CampusGrid ID
                                              │
                                              ▼
                                  Product provisions itself from the Grid
```

Linking handshake:

1. Product sends `{ campusGridId, productKey }` to the Grid.
2. Grid verifies the ID, checks an active subscription for that product, and returns a scoped access token plus a webhook secret.
3. Product performs an initial pull of institution, departments, users and roles.
4. Product stores only `grid_user_id` references — never a duplicate directory.

## 3. Ongoing synchronization

Two complementary channels:

- **Pull (read APIs)** — products query the Grid for institution, department, user and role data using their scoped token. Responses are subscription-scoped: a product only ever sees the fields it needs.
- **Push (webhooks)** — the Grid emits signed events on every change:
  `user.created`, `user.updated`, `user.archived`, `role.assigned`, `role.revoked`, `department.created`, `department.updated`, `subscription.changed`.

Guarantees:

- Every event carries the `campusGridId`, an incrementing `sequence` and a timestamp, so products can detect gaps and re-pull.
- Webhooks are signed with the product's secret and are idempotent by event ID.
- If a product misses events, a periodic reconciliation pull restores consistency.

## 4. Identity and single sign-on

- Credentials live only in CampusGrid.
- A user signs in once; the Grid issues a short-lived token containing their user ID, institution, department and roles.
- Products verify the token and authorize purely from the roles it carries — they never define their own role model.
- Deactivating a user in the Grid invalidates their sessions everywhere.

## 5. Authorization model

Roles are institution-scoped and defined once: College Admin, HoD, Professor, Student, Club Admin, Journalist, Placement Officer.

Each product maps roles to its own capabilities:

- GradeMate: HoD → oversight of every professor and exam in a department; Professor → set and evaluate exams; Student → attempt exams.
- CampusConnect: Club Admin → publish events; Journalist → publish newspaper articles; Professor → review research submissions.

Because the mapping is one-way (Grid role → product capability), a role change in the Grid immediately changes what a person can do in every product.

## 6. Multi-tenancy and isolation

Every record in the Grid is keyed by institution. Product tokens are bound to a single CampusGrid ID, so no product request can ever cross a college boundary. Audit entries record actor, institution, action and timestamp and are append-only.

## 7. Lifecycle events

- **Bulk import** — a college can import students and faculty from CSV/Excel; imports emit normal `user.created` events so products stay in step.
- **Batch promotion** — advancing a batch updates section and semester data once, everywhere.
- **Graduation** — archiving a batch de-provisions their access across all linked products in one action.
- **Subscription lapse** — when a subscription expires, the product's token stops resolving and its access to the directory ends; institution data remains intact in the Grid.

## 8. Why CollegeBook stays out

CollegeBook is a student-owned social product with a different trust model: students join directly, colleges do not administer them, and the account is tied to the student rather than the institution. Wiring institution-controlled identity into it would break that model, so it shares no data with the Grid and appears in CampusGrid only as a product we also build.

## 9. Future modules

Attendance, timetable, library, results, hostel, transport, fees, learning management, AI assistant and analytics are planned as **CampusGrid modules**, not new products. They reuse the existing directory, roles and permissions, so enabling them requires no additional onboarding.
