import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/features/app/pages/DashboardPage";

const title = "Your CampusGrid workspace";
const description =
  "Role-aware CampusGrid workspace for college admins, HoDs, professors and students.";

export const Route = createFileRoute("/app/")({
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
  component: DashboardPage,
});
