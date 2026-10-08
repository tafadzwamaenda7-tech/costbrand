import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import {
  SiteHeader,
  SiteFooter,
  ContactBlock,
  FloatingWhatsApp,
  BackToTop,
  NotFoundPage,
} from "@/components/site-shell";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return <NotFoundPage />;
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Costbrand Private Limited" },
      {
        name: "description",
        content:
          "Costbrand Private Limited is a Zimbabwean agricultural company working across agriculture, horticulture, machinery and international sourcing.",
      },
      { name: "author", content: "Costbrand Private Limited" },
      { property: "og:title", content: "Costbrand Private Limited" },
      {
        property: "og:description",
        content:
          "Costbrand Private Limited is a Zimbabwean agricultural company working across agriculture, horticulture, machinery and international sourcing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/genesis-logo.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body data-scroll>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets: HTMLElement[] = [];
    let observer: IntersectionObserver | undefined;
    let frame: number | undefined;
    let scheduleVisibilityCheck: (() => void) | undefined;
    const timer = window.setTimeout(() => {
      const main = document.querySelector<HTMLElement>(".site-content main");
      if (!main) return;

      targets.push(
        ...main.querySelectorAll<HTMLElement>(
          [
            ".home-hero-content",
            ".page-intro-copy",
            ".page-intro-image",
            ".display-heading",
            ".section-eyebrow",
            ".section-lead",
            ".pillar-card",
            ".about-why-card",
            ".focus-area-card",
            ".connection-card",
            ".home-crop-tile",
            ".agriculture-focus-row",
            ".service-item",
            ".machinery-product-list > li",
            ".horticulture-market-cards > article",
            ".market-list > article",
            ".sourcing-stepper > li",
            ".process-list > li",
            ".journey-list > li",
            ".plot68-gallery > figure",
            ".plot68-stats > div",
            ".horticulture-intro > p",
            ".agriculture-intro > h2",
            ".machinery-intro > h2",
            ".about-vision h2",
            ".about-mission h2",
            ".sourcing-trust > *",
            ".policy-page > h1",
            ".policy-page > h2",
            ".contact-brand",
            ".contact-form-content",
            ".not-found-inner",
          ].join(","),
        ),
      );
      if (!targets.length) return;

      const reveal = (target: Element) => {
        target.classList.add("in-view");
        observer?.unobserve(target);
      };
      if (typeof window.IntersectionObserver === "function") {
        observer = new window.IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) reveal(entry.target);
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
        );
      }

      targets.forEach((target) => {
        const siblings = target.parentElement ? Array.from(target.parentElement.children) : [];
        const siblingIndex = Math.max(0, siblings.indexOf(target));
        target.style.setProperty("--reveal-delay", `${Math.min(siblingIndex, 4) * 55}ms`);
        target.classList.add("reveal");
        observer?.observe(target);
      });

      const revealVisibleTargets = () => {
        frame = undefined;
        const threshold = window.innerHeight * 0.96;
        targets.forEach((target) => {
          if (target.classList.contains("in-view")) return;
          const rect = target.getBoundingClientRect();
          if (rect.top < threshold && rect.bottom > 0) reveal(target);
        });
      };
      scheduleVisibilityCheck = () => {
        if (frame !== undefined) return;
        frame = window.requestAnimationFrame(revealVisibleTargets);
      };
      window.addEventListener("scroll", scheduleVisibilityCheck, { passive: true });
      window.addEventListener("resize", scheduleVisibilityCheck);
      scheduleVisibilityCheck();
    }, 500);

    return () => {
      window.clearTimeout(timer);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      if (scheduleVisibilityCheck) {
        window.removeEventListener("scroll", scheduleVisibilityCheck);
        window.removeEventListener("resize", scheduleVisibilityCheck);
      }
      observer?.disconnect();
      targets.forEach((target) => {
        target.classList.remove("reveal", "in-view");
        target.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <div className="site-content">
        <Outlet />
      </div>
      {pathname !== "/contact-us" && <ContactBlock />}
      <SiteFooter />
      <FloatingWhatsApp />
      <BackToTop />
    </QueryClientProvider>
  );
}
