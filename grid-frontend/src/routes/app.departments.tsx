import { createFileRoute } from "@tanstack/react-router";
import { DepartmentsPage } from "@/features/app/pages/DepartmentsPage";

const title = "Manage departments — CampusGrid";
const description =
  "Create and maintain the department structure shared by CampusConnect and GradeMate.";

export const Route = createFileRoute("/app/departments")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DepartmentsPage,
});
