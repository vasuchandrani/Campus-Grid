import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/features/landing/HomePage";

const title = "CampusGrid — One Platform. Every Campus Product.";
const description =
  "CampusGrid is the central data platform for colleges: register once, get a CampusGrid ID, manage students, faculty, departments and roles, and keep CampusConnect and GradeMate in sync. 30-day free trial, no advance payment.";

export const Route = createFileRoute("/")({
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
  component: HomePage,
});
