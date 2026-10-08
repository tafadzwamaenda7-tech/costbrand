import { createFileRoute } from "@tanstack/react-router";
import { NotFoundPage } from "@/components/site-shell";

export const Route = createFileRoute("/404")({
  component: NotFoundPage,
});
