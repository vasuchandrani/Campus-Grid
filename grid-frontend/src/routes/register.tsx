import { createFileRoute } from "@tanstack/react-router";
import { RegisterPage } from "@/pages/register/RegisterPage";

const title = "Register your college — CampusGrid";
const description =
  "Create your institution account on CampusGrid: add college details, departments, admin credentials and pick the products you want to activate.";

export const Route = createFileRoute("/register")({
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
  component: RegisterPage,
});
