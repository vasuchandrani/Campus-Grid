import { createFileRoute } from "@tanstack/react-router";
import { UsersPage } from "@/features/app/pages/UsersPage";

const title = "Manage users — CampusGrid";
const description =
  "Add, search and remove students, faculty and staff. Every user is issued a CampusGrid ID used across all products.";

export const Route = createFileRoute("/app/users")({
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
  component: UsersPage,
});
