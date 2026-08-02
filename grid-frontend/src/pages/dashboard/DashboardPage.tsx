import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "./components/DashboardHeader";
import { CollegeOverviewCard } from "./components/CollegeOverviewCard";
import { OverviewTab } from "./components/OverviewTab";
import { UsersTab } from "./components/UsersTab";
import { DepartmentsTab } from "./components/DepartmentsTab";
import { RolesTab } from "./components/RolesTab";
import { SubscriptionsTab } from "./components/SubscriptionsTab";
import { DEPARTMENTS, USERS, type Department, type ManagedUser } from "@/lib/mock-college";

export function DashboardPage() {
  const [users, setUsers] = useState<ManagedUser[]>(USERS);
  const [departments, setDepartments] = useState<Department[]>(DEPARTMENTS);

  return (
    <div className="min-h-screen bg-surface">
      <DashboardHeader />

      <main className="mx-auto max-w-7xl space-y-6 px-5 py-10">
        <CollegeOverviewCard departments={departments} />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="h-auto flex-wrap">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="users">
            <UsersTab users={users} setUsers={setUsers} departments={departments} />
          </TabsContent>

          <TabsContent value="departments">
            <DepartmentsTab departments={departments} setDepartments={setDepartments} />
          </TabsContent>

          <TabsContent value="roles">
            <RolesTab />
          </TabsContent>

          <TabsContent value="products">
            <SubscriptionsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
