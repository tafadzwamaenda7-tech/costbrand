import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/policy-page";
import { siteMeta } from "@/lib/site-meta";
export const Route = createFileRoute("/cookie-policy")({
  head: () =>
    siteMeta(
      "Cookie Policy",
      "Information about cookies, website functionality and your privacy choices at Costbrand Private Limited.",
    ),
  component: () => <PolicyPage slug="cookie-policy" />,
});
