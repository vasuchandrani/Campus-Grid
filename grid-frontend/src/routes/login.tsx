import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/pages/login/LoginPage";

const title = "College admin login — CampusGrid";
const description =
  "Sign in to the CampusGrid college admin console to manage departments, users, roles and product subscriptions.";

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
