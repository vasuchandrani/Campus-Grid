import { useMemo, useState } from "react";
import { Plus, Search, ShieldCheck, Trash2, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Panel } from "@/components/common/panel";
import { useUsers } from "@/lib/campus-store";
import {
  ASSIGNABLE_FACULTY_ROLES,
  ASSIGNABLE_STUDENT_TAGS,
  BATCHES,
  COLLEGE,
  DEPARTMENTS,
  PLATFORM_ROLES,
  STUDENT_TAGS,
  yearLabel,
  yearOfBatch,
  type ManagedUser,
  type Role,
  type StudentTag,
} from "@/lib/mock-college";

const USER_STATUS: Record<ManagedUser["status"], "default" | "secondary" | "outline"> = {
  active: "default",
  invited: "secondary",
  pending: "secondary",
  archived: "outline",
};

const PREFIX: Record<Role, string> = {
  "College Admin": "A",
  HoD: "H",
  Professor: "P",
  Student: "S",
};

export function UsersPage() {
  const [users, setUsers] = useUsers();
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [batchFilter, setBatchFilter] = useState("all");

  const pending = users.filter((u) => u.status === "pending");

  const filtered = useMemo(
    () =>
      users.filter((u) => {
        const q = query.toLowerCase();
        const matchesRole =
          roleFilter === "all" ||
          (roleFilter.startsWith("tag:")
            ? (u.student?.tags ?? []).includes(roleFilter.slice(4) as StudentTag)
            : u.role === roleFilter);
        return (
          matchesRole &&
          (deptFilter === "all" || u.department === deptFilter) &&
          (batchFilter === "all" || String(u.student?.batch ?? "") === batchFilter) &&
          (u.name.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q) ||
            u.gridId.toLowerCase().includes(q))
        );
      }),
    [users, query, roleFilter, deptFilter, batchFilter],
  );

  const update = (id: string, patch: Partial<ManagedUser>) =>
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));

  const remove = (u: ManagedUser) => {
    setUsers((prev) => prev.filter((x) => x.id !== u.id));
    toast.success(`${u.name} removed`, {
      description: "De-provisioned from CampusConnect and GradeMate.",
    });
  };

  return (
    <div className="space-y-6">
      {pending.length > 0 && (
        <Panel>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <UserCheck className="size-4.5 text-accent" /> Self-registered profiles (
            {pending.length})
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Students and professors who created their own profile. Approve them to issue their
            CampusGrid ID — role assignment stays with you.
          </p>
          <div className="mt-5 grid gap-3">
            {pending.map((u) => (
              <div
                key={u.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border p-4"
              >
                <div>
                  <p className="text-sm font-medium">
                    {u.name}{" "}
                    <span className="text-muted-foreground">
                      · {u.role} · {u.department}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {u.email}
                    {u.student ? ` · Batch ${u.student.batch} · ${yearLabel(u.student.year)}` : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      update(u.id, { status: "active" });
                      toast.success(`${u.name} approved`);
                    }}
                  >
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => remove(u)}>
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      )}

      <Panel>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">User management</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              One directory for students and faculty. CampusGrid has three roles — College Admin,
              Professor and Student — and HoD is the Professor role extended with department-head
              rights.
            </p>
          </div>
          <AddUserDialog
            onAdd={(u) => {
              setUsers((prev) => [u, ...prev]);
              toast.success(`${u.name} added`, {
                description: `CampusGrid ID ${u.gridId} · syncing to linked products…`,
              });
            }}
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <div className="relative min-w-56 flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email or CampusGrid ID"
              className="pl-9"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              {PLATFORM_ROLES.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
              {STUDENT_TAGS.map((t) => (
                <SelectItem key={t} value={`tag:${t}`}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={deptFilter} onValueChange={setDeptFilter}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All branches</SelectItem>
              {DEPARTMENTS.map((d) => (
                <SelectItem key={d.id} value={d.name}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={batchFilter} onValueChange={setBatchFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All years</SelectItem>
              {BATCHES.map((b) => (
                <SelectItem key={b} value={String(b)}>
                  {yearLabel(yearOfBatch(b))} · Batch {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Showing {filtered.length} of {users.length} people
        </p>

        <div className="mt-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>CampusGrid ID</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Year / Batch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.slice(0, 60).map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <p className="font-medium">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                    {u.student?.tags.length ? (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {u.student.tags.map((t) => (
                          <Badge key={t} variant="outline" className="text-[10px]">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{u.gridId}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell className="text-muted-foreground">{u.department}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {u.student ? `${yearLabel(u.student.year)} · ${u.student.batch}` : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={USER_STATUS[u.status]} className="capitalize">
                      {u.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {u.role !== "College Admin" && (
                        <AssignRoleDialog
                          user={u}
                          onSave={(patch) => {
                            update(u.id, patch);
                            toast.success(`Role updated for ${u.name}`);
                          }}
                        />
                      )}

                      <Button variant="ghost" size="sm" onClick={() => remove(u)}>
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-10 text-center text-sm text-muted-foreground"
                  >
                    No users match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {filtered.length > 60 && (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Showing the first 60 results — refine the filters to narrow down.
            </p>
          )}
        </div>
      </Panel>
    </div>
  );
}

/**
 * Role assignment applies to students, professors and HoDs only.
 * - Student → extra responsibilities (Journalist, Class Representative, Placement Coordinator)
 * - Professor / HoD → platform role (Professor, HoD, College Admin)
 */
function AssignRoleDialog({
  user,
  onSave,
}: {
  user: ManagedUser;
  onSave: (patch: Partial<ManagedUser>) => void;
}) {
  const isStudent = user.role === "Student";
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<Role>(user.role);
  const [tags, setTags] = useState<StudentTag[]>(user.student?.tags ?? []);

  const toggle = (t: StudentTag) =>
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const save = () => {
    const patch: Partial<ManagedUser> = isStudent ? {} : { role };
    if (isStudent && user.student) patch.student = { ...user.student, tags };
    onSave(patch);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" title="Assign role">
          <ShieldCheck className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign role — {user.name}</DialogTitle>
          <DialogDescription>
            {isStudent
              ? "Grant this student a responsibility. It travels with their CampusGrid ID into CampusConnect and GradeMate."
              : "Set the platform role for this faculty member. HoD is the Professor role extended with department-head rights."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          {isStudent ? (
            <div className="grid gap-2">
              <Label>Student responsibilities</Label>
              <div className="flex flex-wrap gap-2">
                {ASSIGNABLE_STUDENT_TAGS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggle(t)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                      tags.includes(t)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Club Admin is granted inside CampusConnect when a club is created.
              </p>
            </div>
          ) : (
            <div className="grid gap-2">
              <Label>Platform role</Label>
              <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ASSIGNABLE_FACULTY_ROLES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r === "HoD" ? "HoD (Professor + department head)" : r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={save}>Save role</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddUserDialog({ onAdd }: { onAdd: (u: ManagedUser) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("Student");
  const [department, setDepartment] = useState(DEPARTMENTS[0]!.name);
  const [batch, setBatch] = useState(String(BATCHES[0]));

  const submit = () => {
    if (!name.trim() || !email.trim()) return;
    const serial = String(Math.floor(Math.random() * 900) + 100);
    const b = Number(batch);
    onAdd({
      id: `u${Date.now()}`,
      gridId: `${COLLEGE.campusGridId}-${PREFIX[role]}${serial}`,
      name: name.trim(),
      email: email.trim(),
      role,
      department,
      status: "invited",
      ...(role === "Student"
        ? {
            student: {
              enrollmentNo: `${b}${serial}`,
              batch: b,
              year: yearOfBatch(b),
              semester: yearOfBatch(b) * 2 - 1,
              division: "A",
              qualification: "10th + 12th Science" as const,
              tenthBoard: "—",
              tenthYear: b - 2,
              tenthPercent: 0,
              twelfthOrDiplomaBoard: "—",
              twelfthOrDiplomaYear: b,
              twelfthOrDiplomaPercent: 0,
              stream: "—",
              admissionType: "Merit" as const,
              cgpa: 0,
              attendance: 0,
              guardian: "—",
              phone: "—",
              bloodGroup: "—",
              address: "—",
              tags: [],
            },
          }
        : {}),
    });
    setName("");
    setEmail("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="size-4" /> Add user
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a user</DialogTitle>
          <DialogDescription>
            Added once here — issued a CampusGrid ID and available in every linked product.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="u-name">Full name</Label>
            <Input
              id="u-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aarav Shah"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="u-email">Institution email</Label>
            <Input
              id="u-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="aarav.shah@sit.edu.in"
            />
          </div>
          <div className="grid gap-2">
            <Label>Role</Label>
            <Select value={role} onValueChange={(v) => setRole(v as Role)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PLATFORM_ROLES.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Department</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Administration">Administration</SelectItem>
                {DEPARTMENTS.map((d) => (
                  <SelectItem key={d.id} value={d.name}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {role === "Student" && (
            <div className="grid gap-2">
              <Label>Batch</Label>
              <Select value={batch} onValueChange={setBatch}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BATCHES.map((b) => (
                    <SelectItem key={b} value={String(b)}>
                      Batch {b} · {yearLabel(yearOfBatch(b))}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={submit}>Add user</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
