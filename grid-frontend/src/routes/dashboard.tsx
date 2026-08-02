import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";

const title = "Institution console — CampusGrid";
const description =
  "CampusGrid college admin console: manage departments, users, roles, product subscriptions and synchronization activity from one place.";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});
