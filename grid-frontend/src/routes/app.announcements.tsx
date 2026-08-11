import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementsPage } from "@/features/app/pages/AnnouncementsPage";

const title = "Announcements — CampusGrid";
const description =
  "Announcements in the CampusGrid console — powered by your CampusGrid ID across CampusConnect and GradeMate.";

export const Route = createFileRoute("/app/announcements")({
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
  component: AnnouncementsPage,
});
