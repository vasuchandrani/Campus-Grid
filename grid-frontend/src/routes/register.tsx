import { createFileRoute } from "@tanstack/react-router";
import { RegisterPage } from "@/features/auth/RegisterPage";

const title = "Register your college — CampusGrid";
const description =
  "Create your institution account on CampusGrid and start a 30-day free trial with no advance payment. Add college details, admin credentials and activate products.";

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
