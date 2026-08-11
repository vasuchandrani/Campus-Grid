import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/features/app/pages/SettingsPage";

const title = "Settings — CampusGrid";
const description =
  "Platform preferences, roles and connected products: open CampusConnect and GradeMate or buy a subscription.";

export const Route = createFileRoute("/app/settings")({
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
  component: SettingsPage,
});
