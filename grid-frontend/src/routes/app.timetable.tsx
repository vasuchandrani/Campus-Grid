import { createFileRoute } from "@tanstack/react-router";
import { TimetablePage } from "@/features/app/pages/TimetablePage";

const title = "Time-table — CampusGrid";
const description =
  "Time-table in the CampusGrid console — powered by your CampusGrid ID across CampusConnect and GradeMate.";

export const Route = createFileRoute("/app/timetable")({
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
  component: TimetablePage,
});
