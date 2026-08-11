import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/features/auth/LoginPage";

const title = "Sign in with your CampusGrid ID — CampusGrid";
const description =
  "Students, professors, HoDs and college admins sign in to CampusGrid with a single CampusGrid ID that also works on CampusConnect and GradeMate.";

export const Route = createFileRoute("/login")({
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
  component: LoginPage,
});
