import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/features/app/pages/ProfilePage";

const title = "Your profile — CampusGrid";
const description =
  "Your profile in the CampusGrid console — powered by your CampusGrid ID across CampusConnect and GradeMate.";

export const Route = createFileRoute("/app/profile")({
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
  component: ProfilePage,
});
