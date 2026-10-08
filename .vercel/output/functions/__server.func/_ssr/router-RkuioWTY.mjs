import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { _ as lazyRouteComponent, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useLocation, v as createFileRoute, x as useRouter, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SiteFooter, i as NotFoundPage, n as ContactBlock, o as SiteHeader, r as FloatingWhatsApp, t as BackToTop } from "./site-shell-CHEmpMYt.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-RkuioWTY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BZUbbaE4.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message: describeThrown(error),
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var MAX_SERIALIZED_LENGTH = 2e3;
function describeThrown(error) {
	if (error instanceof Response) return `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
	if (error instanceof Error) return error.message;
	if (typeof error === "string") return error;
	const { message } = error ?? {};
	if (typeof message === "string" && message.length > 0) return message;
	try {
		return JSON.stringify(error)?.slice(0, MAX_SERIALIZED_LENGTH) ?? String(error);
	} catch {
		return String(error);
	}
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFoundPage, {});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$18 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Costbrand Private Limited" },
			{
				name: "description",
				content: "Costbrand Private Limited is a Zimbabwean agricultural company working across agriculture, horticulture, machinery and international sourcing."
			},
			{
				name: "author",
				content: "Costbrand Private Limited"
			},
			{
				property: "og:title",
				content: "Costbrand Private Limited"
			},
			{
				property: "og:description",
				content: "Costbrand Private Limited is a Zimbabwean agricultural company working across agriculture, horticulture, machinery and international sourcing."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/genesis-logo.png",
			type: "image/png"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			"data-scroll": true,
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})]
		})]
	});
}
function RootComponent() {
	const { queryClient } = Route$18.useRouteContext();
	const { pathname } = useLocation();
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const targets = [];
		let observer;
		let frame;
		let scheduleVisibilityCheck;
		const timer = window.setTimeout(() => {
			const main = document.querySelector(".site-content main");
			if (!main) return;
			targets.push(...main.querySelectorAll([
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
				".not-found-inner"
			].join(",")));
			if (!targets.length) return;
			const reveal = (target) => {
				target.classList.add("in-view");
				observer?.unobserve(target);
			};
			if (typeof window.IntersectionObserver === "function") observer = new window.IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) reveal(entry.target);
				});
			}, {
				threshold: .12,
				rootMargin: "0px 0px -4% 0px"
			});
			targets.forEach((target) => {
				const siblings = target.parentElement ? Array.from(target.parentElement.children) : [];
				const siblingIndex = Math.max(0, siblings.indexOf(target));
				target.style.setProperty("--reveal-delay", `${Math.min(siblingIndex, 4) * 55}ms`);
				target.classList.add("reveal");
				observer?.observe(target);
			});
			const revealVisibleTargets = () => {
				frame = void 0;
				const threshold = window.innerHeight * .96;
				targets.forEach((target) => {
					if (target.classList.contains("in-view")) return;
					const rect = target.getBoundingClientRect();
					if (rect.top < threshold && rect.bottom > 0) reveal(target);
				});
			};
			scheduleVisibilityCheck = () => {
				if (frame !== void 0) return;
				frame = window.requestAnimationFrame(revealVisibleTargets);
			};
			window.addEventListener("scroll", scheduleVisibilityCheck, { passive: true });
			window.addEventListener("resize", scheduleVisibilityCheck);
			scheduleVisibilityCheck();
		}, 500);
		return () => {
			window.clearTimeout(timer);
			if (frame !== void 0) window.cancelAnimationFrame(frame);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "site-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			pathname !== "/contact-us" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactBlock, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingWhatsApp, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackToTop, {})
		]
	});
}
function siteMeta(title, description) {
	return { meta: [
		{ title: `${title} — Costbrand Private Limited` },
		{
			name: "description",
			content: description
		},
		{
			property: "og:title",
			content: `${title} — Costbrand Private Limited`
		},
		{
			property: "og:description",
			content: description
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] };
}
var $$splitComponentImporter$17 = () => import("./routes-C94RUet4.mjs");
var Route$17 = createFileRoute("/")({
	head: () => siteMeta("From Farm to Market. From Zimbabwe to the World.", "Costbrand is a Zimbabwean agricultural company bringing together agriculture, horticulture, machinery and international sourcing."),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./404-CCP0dX1P.mjs");
var Route$16 = createFileRoute("/404")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./about-DHgrVHMf.mjs");
var Route$15 = createFileRoute("/about")({
	head: () => siteMeta("About Us", "Learn about Costbrand Enterprises (Private) Limited, a Zimbabwean agricultural enterprise and international supply-chain company."),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./about-us-BoLmKDF7.mjs");
var Route$14 = createFileRoute("/about-us")({
	head: () => siteMeta("About Us", "Learn about Costbrand Private Limited, a Zimbabwean company building resilient global produce partnerships."),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./agriculture-BUA3ASLz.mjs");
var Route$13 = createFileRoute("/agriculture")({
	head: () => siteMeta("Agriculture", "Explore Costbrand's agricultural work across production, crop and grain growing, commercial farming, irrigation and farm development."),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./contact-us-BBd0Vis6.mjs");
var Route$12 = createFileRoute("/contact-us")({
	head: () => siteMeta("Contact Us", "Contact Costbrand Private Limited, a Zimbabwean company, for premium vegetables, fresh fruit and global produce sourcing enquiries."),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./cookie-policy-DpvjJf8Z.mjs");
var Route$11 = createFileRoute("/cookie-policy")({
	head: () => siteMeta("Cookie Policy", "Information about cookies, website functionality and your privacy choices at Costbrand Private Limited."),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./global-market-reach-RiSbiOD3.mjs");
var Route$10 = createFileRoute("/global-market-reach")({
	head: () => siteMeta("Markets", "Costbrand connects Zimbabwean agricultural work with regional and international market conversations."),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./horticulture-CewUVGJk.mjs");
var Route$9 = createFileRoute("/horticulture")({
	head: () => siteMeta("Horticulture", "Growing quality horticultural products for Zimbabwean and international markets."),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./international-sourcing-E27fkkCt.mjs");
var Route$8 = createFileRoute("/international-sourcing")({
	head: () => siteMeta("International Sourcing", "International sourcing support connecting requirements with verified suppliers."),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./machinery-DdcAKSjB.mjs");
var Route$7 = createFileRoute("/machinery")({
	head: () => siteMeta("Machinery", "Discuss agricultural machinery and equipment enquiries with Costbrand, including farm equipment, irrigation, pumps and processing."),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./our-products-D5H6mXct.mjs");
var Route$6 = createFileRoute("/our-products")({
	head: () => siteMeta("Horticulture", "Explore Costbrand's horticulture and fresh produce work, from growing and sourcing to market enquiries."),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./privacy-6XQOuPci.mjs");
var Route$5 = createFileRoute("/privacy")({
	head: () => siteMeta("Privacy Policy", "How Costbrand Private Limited collects, uses and protects personal information."),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./privacy-policy-D4WcSB1F.mjs");
var Route$4 = createFileRoute("/privacy-policy")({
	head: () => siteMeta("Privacy Policy", "How Costbrand Private Limited collects, uses and protects your personal information."),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./production-and-global-sourcing-Dymxbjqq.mjs");
var Route$3 = createFileRoute("/production-and-global-sourcing")({
	head: () => siteMeta("International Sourcing", "A considered sourcing process that connects requirements with supplier conversations and the next steps toward Zimbabwe."),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./projects-CzkJXufv.mjs");
var Route$2 = createFileRoute("/projects")({
	head: () => siteMeta("Projects", "Explore agricultural project and partnership conversations with Costbrand, a Zimbabwean company."),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./terms-BEQFVqOu.mjs");
var Route$1 = createFileRoute("/terms")({
	head: () => siteMeta("Terms of Use", "Terms for using the Costbrand Private Limited website."),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./terms-and-conditions-UjKKToVc.mjs");
var Route = createFileRoute("/terms-and-conditions")({
	head: () => siteMeta("Terms and Conditions", "Terms for the supply, orders, payment and delivery of Costbrand Private Limited fresh produce."),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$17.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$18
	}),
	R404Route: Route$16.update({
		id: "/404",
		path: "/404",
		getParentRoute: () => Route$18
	}),
	AboutRoute: Route$15.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$18
	}),
	AboutUsRoute: Route$14.update({
		id: "/about-us",
		path: "/about-us",
		getParentRoute: () => Route$18
	}),
	AgricultureRoute: Route$13.update({
		id: "/agriculture",
		path: "/agriculture",
		getParentRoute: () => Route$18
	}),
	ContactUsRoute: Route$12.update({
		id: "/contact-us",
		path: "/contact-us",
		getParentRoute: () => Route$18
	}),
	CookiePolicyRoute: Route$11.update({
		id: "/cookie-policy",
		path: "/cookie-policy",
		getParentRoute: () => Route$18
	}),
	GlobalMarketReachRoute: Route$10.update({
		id: "/global-market-reach",
		path: "/global-market-reach",
		getParentRoute: () => Route$18
	}),
	HorticultureRoute: Route$9.update({
		id: "/horticulture",
		path: "/horticulture",
		getParentRoute: () => Route$18
	}),
	InternationalSourcingRoute: Route$8.update({
		id: "/international-sourcing",
		path: "/international-sourcing",
		getParentRoute: () => Route$18
	}),
	MachineryRoute: Route$7.update({
		id: "/machinery",
		path: "/machinery",
		getParentRoute: () => Route$18
	}),
	OurProductsRoute: Route$6.update({
		id: "/our-products",
		path: "/our-products",
		getParentRoute: () => Route$18
	}),
	PrivacyRoute: Route$5.update({
		id: "/privacy",
		path: "/privacy",
		getParentRoute: () => Route$18
	}),
	PrivacyPolicyRoute: Route$4.update({
		id: "/privacy-policy",
		path: "/privacy-policy",
		getParentRoute: () => Route$18
	}),
	ProductionAndGlobalSourcingRoute: Route$3.update({
		id: "/production-and-global-sourcing",
		path: "/production-and-global-sourcing",
		getParentRoute: () => Route$18
	}),
	ProjectsRoute: Route$2.update({
		id: "/projects",
		path: "/projects",
		getParentRoute: () => Route$18
	}),
	TermsRoute: Route$1.update({
		id: "/terms",
		path: "/terms",
		getParentRoute: () => Route$18
	}),
	TermsAndConditionsRoute: Route.update({
		id: "/terms-and-conditions",
		path: "/terms-and-conditions",
		getParentRoute: () => Route$18
	})
};
var routeTree = Route$18._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
