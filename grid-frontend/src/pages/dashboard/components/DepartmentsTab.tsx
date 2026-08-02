import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Panel } from "./Panel";
import { AddDepartmentDialog } from "./AddDepartmentDialog";
import { type Department } from "@/lib/mock-college";

export function DepartmentsTab({
  departments,
  setDepartments,
}: {
  departments: Department[];
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
}) {
  return (
    <Panel>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Departments</h2>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Panel>
  );
}
