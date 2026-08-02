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
import { type Department } from "@/lib/mock-college";

export function AddDepartmentDialog({ onAdd }: { onAdd: (d: Department) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [hod, setHod] = useState("");

  const submit = () => {
    if (!name.trim() || !code.trim()) return;
    onAdd({
      id: `d${Date.now()}`,
      name: name.trim(),
      code: code.trim().toUpperCase(),
      hod: hod.trim() || "Unassigned",
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
            Departments defined here are the structure every product uses.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="d-name">Department name</Label>
            <Input id="d-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Chemical Engineering" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="d-code">Code</Label>
              <Input id="d-code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="CH" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="d-hod">Head of Department</Label>
              <Input id="d-hod" value={hod} onChange={(e) => setHod(e.target.value)} placeholder="Dr. S. Rao" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={submit}>Create department</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
