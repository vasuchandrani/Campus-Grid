import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import { Panel } from "./Panel";
import { AddUserDialog, ROLE_OPTIONS } from "./AddUserDialog";
import { type Department, type ManagedUser } from "@/lib/mock-college";

export const USER_STATUS: Record<ManagedUser["status"], "default" | "secondary" | "outline"> = {
  active: "default",
  invited: "secondary",
  archived: "outline",
};

export function UsersTab({
  users,
  setUsers,
  departments,
}: {
  users: ManagedUser[];
  setUsers: React.Dispatch<React.SetStateAction<ManagedUser[]>>;
  departments: Department[];
}) {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const filtered = useMemo(
    () =>
      users.filter(
        (u) =>
          (roleFilter === "all" || u.role === roleFilter) &&
          (u.name.toLowerCase().includes(query.toLowerCase()) ||
            u.email.toLowerCase().includes(query.toLowerCase())),
      ),
    [users, query, roleFilter],
  );

  return (
    <Panel>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">User management</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The single directory for students, faculty and staff.
          </p>
        </div>
        <AddUserDialog
          departments={departments}
          onAdd={(u) => {
            setUsers((prev) => [u, ...prev]);
            toast.success(`${u.name} added`, {
              description: "Synchronizing with CampusConnect and GradeMate…",
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
            placeholder="Search name or email"
            className="pl-9"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            {ROLE_OPTIONS.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell className="text-muted-foreground">{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell className="text-muted-foreground">{u.department}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={USER_STATUS[u.status]} className="capitalize">
                    {u.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                  No users match your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Panel>
  );
}
