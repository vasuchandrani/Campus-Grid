import { createFileRoute } from "@tanstack/react-router";
import { CalendarPage } from "@/features/app/pages/CalendarPage";

const title = "Academic calendar — CampusGrid";
const description =
  "Academic calendar in the CampusGrid console — powered by your CampusGrid ID across CampusConnect and GradeMate.";

export const Route = createFileRoute("/app/calendar")({
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
  component: CalendarPage,
});
