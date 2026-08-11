import { createFileRoute } from "@tanstack/react-router";
import { JoinPage } from "@/features/auth/JoinPage";

const title = "Create your student or faculty profile — CampusGrid";
const description =
  "Students and professors create their CampusGrid profile once. The college admin approves it, issues the CampusGrid ID and assigns the role.";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: JoinPage,
});
