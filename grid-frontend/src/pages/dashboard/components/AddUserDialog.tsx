import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { type Department, type ManagedUser, type Role } from "@/lib/mock-college";

export const ROLE_OPTIONS: Role[] = [
  "College Admin",
  "HoD",
  "Professor",
  "Student",
  "Club Admin",
  "Journalist",
  "Placement Officer",
];

export function AddUserDialog({
  departments,
  onAdd,
}: {
  departments: Department[];
  onAdd: (u: ManagedUser) => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("Student");
  const [department, setDepartment] = useState(departments[0]?.name ?? "Administration");

  const submit = () => {
    if (!name.trim() || !email.trim()) return;
    onAdd({
      id: `u${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      role,
      department,
      status: "invited",
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
            Added once here — the user appears in every linked product automatically.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="u-name">Full name</Label>
            <Input id="u-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Aarav Shah" />
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Role</Label>
              <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROLE_OPTIONS.map((r) => (
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
                  {departments.map((d) => (
                    <SelectItem key={d.id} value={d.name}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={submit}>Add & sync</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
