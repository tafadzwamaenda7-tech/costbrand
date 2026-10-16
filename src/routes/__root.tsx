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
      { title: "Costbrand Enterprises (Private) Limited" },
      {
        name: "description",
        content:
          "From Farm to Market. From Zimbabwe to the World. Costbrand is a Zimbabwean agricultural company bringing together agriculture, horticulture, machinery and international sourcing.",
      },
      { name: "author", content: "Costbrand Enterprises (Private) Limited" },
      { property: "og:title", content: "Costbrand Enterprises (Private) Limited" },
      {
        property: "og:description",
        content:
          "From Farm to Market. From Zimbabwe to the World. Costbrand is a Zimbabwean agricultural company bringing together agriculture, horticulture, machinery and international sourcing.",
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

const REVEAL_VARIANTS: ReadonlyArray<readonly [string, string]> = [
  [".page-intro-copy", "drop"],
  [".page-intro-image", "zoom"],
  [".display-heading", "drop"],
  [".section-eyebrow", "fade"],
  [".pillar-card", "scale"],
  [".about-why-card", "scale"],
  [".focus-area-card", "scale"],
  [".connection-card", "scale"],
  [".home-crop-tile", "scale"],
  [".machinery-product-list > li", "scale"],
  [".horticulture-market-cards > article", "scale"],
  [".market-list > article", "scale"],
  [".agriculture-focus-row", "scale"],
  [".sourcing-stepper > li", "scale"],
  [".process-list > li", "scale"],
  [".plot68-gallery > figure", "zoom"],
  [".plot68-stats > div", "pop"],
  [".service-item", "rise"],
  [".journey-list > li", "rise"],
  [".sourcing-trust > *", "rise"],
  [".horticulture-intro > p", "drop"],
  [".agriculture-intro > h2", "drop"],
  [".machinery-intro > h2", "drop"],
  [".about-vision h2", "drop"],
  [".about-mission h2", "drop"],
  [".policy-page > h1", "drop"],
  [".policy-page > h2", "fade"],
  [".contact-brand", "scale"],
  [".contact-form-content", "rise"],
  [".not-found-inner", "pop"],
  [".home-closing-band p", "pop"],
  [".statement-text", "pop"],
  [".about-brand-statement p", "pop"],
  [".plot68-band > div", "drop"],
  [".section-heading-row > *", "rise"],
  [".produce-intro > *", "rise"],
  [".journey-heading > *", "rise"],
  [".sourcing-hero h1", "drop"],
  [".machinery-intro h2", "drop"],
  [".about-story-layout > *", "rise"],
  [".horticulture-closing-inner > *", "drop"],
  [".cross-link-inner > *", "drop"],
  ["section h1", "drop"],
  ["section h2", "drop"],
  ["section h3", "rise"],
  ["section figure", "zoom"],
  ["section img", "zoom"],
];

function variantFor(target: HTMLElement) {
  for (const [selector, variant] of REVEAL_VARIANTS) {
    if (target.matches(selector)) return variant;
  }
  return "rise";
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets: HTMLElement[] = [];
    let observer: IntersectionObserver | undefined;
    const timer = window.setTimeout(() => {
      const main = document.querySelector<HTMLElement>(".site-content main");
      if (!main) return;

      const elements = main.querySelectorAll<HTMLElement>(
        [
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
          ".section-heading-row > *",
          ".produce-intro > *",
          ".journey-heading > *",
          ".sourcing-hero h1",
          ".sourcing-what-layout > *",
          ".horticulture-closing-inner > *",
          ".cross-link-inner > *",
          ".home-horticulture-statement > *",
          ".about-story-layout > *",
          ".home-closing-band p",
          ".statement-text",
          ".about-brand-statement p",
          ".plot68-band > div",
          ".produce-name-list > li",
          "[data-reveal]",
          "[data-stagger] > *",
        ].join(","),
      );

      const mark = (target: HTMLElement) => {
        const siblings = target.parentElement ? Array.from(target.parentElement.children) : [];
        const siblingIndex = Math.max(0, siblings.indexOf(target));
        target.style.setProperty("--reveal-delay", `${Math.min(siblingIndex, 6) * 65}ms`);
        if (!target.dataset["reveal"]) {
          target.dataset["reveal"] = variantFor(target);
        }
        target.classList.add("reveal");
        targets.push(target);
      };

      elements.forEach((target) => {
        if (target.classList.contains("reveal")) return;
        mark(target);
      });

      const catchAll = main.querySelectorAll<HTMLElement>(
        [
          "section > .content-width > *",
          "section > *:not(.content-width)",
          "section h1",
          "section h2",
          "section h3",
          "section figure",
          "section img",
          "section article",
        ].join(","),
      );

      catchAll.forEach((target) => {
        if (target.classList.contains("reveal")) return;
        if (target.closest(".reveal")) return;
        if (target.closest(".home-hero")) return;
        if (target.querySelector(".reveal")) return;
        mark(target);
      });

      if (typeof window.IntersectionObserver === "function" && targets.length > 0) {
        observer = new window.IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer?.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
        );
        targets.forEach((target) => observer?.observe(target));
      } else {
        targets.forEach((target) => target.classList.add("in-view"));
      }
    }, 300);

    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <ParallaxImages pathname={pathname} />
      <SiteHeader />
      <div className="site-content" key={pathname}>
        <Outlet />
      </div>
      {pathname !== "/contact-us" && <ContactBlock />}
      <SiteFooter />
      <FloatingWhatsApp />
    </QueryClientProvider>
  );
}

function ParallaxImages({ pathname }: { pathname: string }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 700px)").matches) return;

    const targets: HTMLElement[] = [];
    let frame: number | undefined;

    const collect = () => {
      const main = document.querySelector<HTMLElement>(".site-content main");
      if (!main) return;
      main
        .querySelectorAll<HTMLElement>(
          ".plot68-gallery > figure img, .page-intro-image img, .connection-card > img",
        )
        .forEach((img) => {
          if (img.hasAttribute("data-parallax")) return;
          img.setAttribute("data-parallax", "");
          targets.push(img);
        });
    };

    const update = () => {
      frame = undefined;
      const viewport = window.innerHeight;
      targets.forEach((img) => {
        const rect = img.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewport) return;
        const center = rect.top + rect.height / 2;
        const offset = (center - viewport / 2) / viewport;
        img.style.setProperty("--parallax-y", `${(-offset * 26).toFixed(2)}px`);
      });
    };

    const schedule = () => {
      if (frame !== undefined) return;
      frame = window.requestAnimationFrame(update);
    };

    const timer = window.setTimeout(() => {
      collect();
      schedule();
    }, 400);

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.clearTimeout(timer);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      targets.forEach((img) => {
        img.removeAttribute("data-parallax");
        img.style.removeProperty("--parallax-y");
      });
    };
  }, [pathname]);

  return null;
}
