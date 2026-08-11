import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Panel } from "@/components/common/panel";
import { useUsers } from "@/lib/campus-store";
import { DEPARTMENTS, isFacultyRole, type Department } from "@/lib/mock-college";

export function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>(DEPARTMENTS);

  return (
    <Panel>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Departments</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Shared by every connected product — edits here propagate automatically.
          </p>
        </div>
        <AddDepartmentDialog
          onAdd={(d) => {
            setDepartments((prev) => [...prev, d]);
            toast.success(`${d.name} created`, {
              description: "Available instantly in all linked products.",
            });
          }}
        />
      </div>
      <div className="mt-5 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Department</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Head of Department</TableHead>
              <TableHead className="text-right">Students</TableHead>
              <TableHead className="text-right">Professors</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((d) => (
              <TableRow key={d.id}>
                <TableCell className="font-medium">{d.name}</TableCell>
                <TableCell className="text-muted-foreground">{d.code}</TableCell>
                <TableCell className="text-muted-foreground">{d.hod}</TableCell>
                <TableCell className="text-right">{d.students.toLocaleString()}</TableCell>
                <TableCell className="text-right">{d.professors}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setDepartments((prev) => prev.filter((x) => x.id !== d.id));
                      toast.success(`${d.name} removed`);
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Panel>
  );
}

function AddDepartmentDialog({ onAdd }: { onAdd: (d: Department) => void }) {
  const [users] = useUsers();
  /** Only registered professors and HoDs of this college can head a department. */
  const faculty = users.filter((u) => isFacultyRole(u.role) && u.status !== "archived");

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [hod, setHod] = useState("");

  const submit = () => {
    if (!name.trim() || !code.trim() || !hod) return;
    onAdd({
      id: `d${Date.now()}`,
      name: name.trim(),
      code: code.trim().toUpperCase(),
      hod,
      students: 0,
      professors: 0,
    });
    setName("");
    setCode("");
    setHod("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="size-4" /> Add department
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a department</DialogTitle>
          <DialogDescription>
            Departments are part of the shared structure every product reads.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="d-name">Department name</Label>
            <Input
              id="d-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Chemical Engineering"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="d-code">Code</Label>
            <Input
              id="d-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="CH"
            />
          </div>
          <div className="grid gap-2">
            <Label>Head of Department</Label>
            <Select value={hod} onValueChange={setHod}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a registered professor or HoD" />
              </SelectTrigger>
              <SelectContent>
                {faculty.map((f) => (
                  <SelectItem key={f.id} value={f.name}>
                    {f.name} · {f.role} · {f.department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Only people already in the user directory appear here. Add the professor first if they
              are missing.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={submit} disabled={!name.trim() || !code.trim() || !hod}>
            Create department
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
