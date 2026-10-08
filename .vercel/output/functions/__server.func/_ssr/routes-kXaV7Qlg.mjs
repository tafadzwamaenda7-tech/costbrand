import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as assets, t as Button } from "./site-assets-C9zmdWbE.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { a as HomeHorticultureSpotlight, i as HomeClosingStatement, l as PillarsSection, u as Plot68CaseStudy } from "./site-sections-U8XQ4Njw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-kXaV7Qlg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "home-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeHero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillarsSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plot68CaseStudy, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeHorticultureSpotlight, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeClosingStatement, {})
		]
	});
}
var heroSlides = [
	{
		src: assets.machineField,
		alt: "Crates of harvested peas loaded for transport from a Zimbabwean farm.",
		caption: "Pea harvest · Zimbabwe",
		title: "Growing Zimbabwe.",
		accent: "Connecting Global Markets.",
		subtitle: "From farm to market, and from Zimbabwe to the world — we produce, source and move agricultural goods that global buyers can rely on.",
		primary: {
			label: "Start a conversation",
			href: "/contact-us"
		},
		secondary: {
			label: "Explore our work",
			href: "#business"
		}
	},
	{
		src: assets.downloadNine,
		alt: "Agricultural machinery and produce handling for Zimbabwean operations.",
		caption: "Field machinery",
		title: "Machinery built for",
		accent: "modern farming.",
		subtitle: "Sales, hire and workshop support for tractors, harvesters and implements that keep Zimbabwean farms running through every season.",
		primary: {
			label: "Explore machinery",
			href: "/machinery"
		},
		secondary: {
			label: "International sourcing",
			href: "/international-sourcing"
		}
	},
	{
		src: assets.fieldSunset,
		alt: "Rows of peas flowering at golden hour on a Costbrand farm.",
		caption: "Pea crop at golden hour",
		title: "Horticulture grown",
		accent: "for global tables.",
		subtitle: "Peas, beans and leafy crops cultivated to export standards — traceable from plot to port, harvest after harvest.",
		primary: {
			label: "Explore horticulture",
			href: "/horticulture"
		},
		secondary: {
			label: "See our projects",
			href: "/projects"
		}
	}
];
var HERO_AUTOPLAY_DELAY = 4500;
function HomeHero() {
	const [activeSlide, setActiveSlide] = (0, import_react.useState)(0);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const [autoplayAllowed, setAutoplayAllowed] = (0, import_react.useState)(false);
	const touchStartX = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
		const updateAutoplay = () => {
			setAutoplayAllowed(!motionPreference.matches && document.visibilityState === "visible");
		};
		updateAutoplay();
		motionPreference.addEventListener("change", updateAutoplay);
		document.addEventListener("visibilitychange", updateAutoplay);
		return () => {
			motionPreference.removeEventListener("change", updateAutoplay);
			document.removeEventListener("visibilitychange", updateAutoplay);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (paused || !autoplayAllowed) return;
		const timer = window.setTimeout(() => {
			setActiveSlide((current) => (current + 1) % heroSlides.length);
		}, HERO_AUTOPLAY_DELAY);
		return () => window.clearTimeout(timer);
	}, [
		activeSlide,
		autoplayAllowed,
		paused
	]);
	const goToSlide = (index) => {
		setActiveSlide((index % heroSlides.length + heroSlides.length) % heroSlides.length);
	};
	const activeSlideData = heroSlides[activeSlide] ?? heroSlides[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "home-hero",
		id: "top",
		onFocus: () => setPaused(true),
		onBlur: (event) => {
			if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
		},
		onTouchStart: (event) => {
			touchStartX.current = event.touches[0]?.clientX ?? null;
		},
		onTouchEnd: (event) => {
			const endX = event.changedTouches[0]?.clientX;
			if (touchStartX.current === null || endX === void 0) return;
			const delta = endX - touchStartX.current;
			touchStartX.current = null;
			if (Math.abs(delta) > 45) goToSlide(activeSlide + (delta < 0 ? 1 : -1));
		},
		onKeyDown: (event) => {
			if (event.key === "ArrowRight") {
				event.preventDefault();
				goToSlide(activeSlide + 1);
			} else if (event.key === "ArrowLeft") {
				event.preventDefault();
				goToSlide(activeSlide - 1);
			}
		},
		children: [
			heroSlides.map((slide, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				className: `home-hero-image home-hero-slide${activeSlide === index ? " is-active" : ""}`,
				src: slide.src,
				alt: slide.alt,
				"aria-hidden": activeSlide !== index,
				fetchPriority: index === 0 ? "high" : "auto"
			}, slide.src)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "home-hero-shade" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "content-width home-hero-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "home-hero-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [activeSlideData.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: activeSlideData.accent })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "home-hero-lead",
							children: activeSlideData.subtitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "home-hero-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroLink, {
								item: activeSlideData.primary,
								kind: "primary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroLink, {
								item: activeSlideData.secondary,
								kind: "ghost"
							})]
						})
					]
				}, activeSlide)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "content-width home-hero-rail",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "home-hero-caption",
					"aria-hidden": "true",
					children: activeSlideData.caption
				})
			})
		]
	});
}
function HeroLink({ item, kind }) {
	const label = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
		size: 17,
		"aria-hidden": "true"
	})] });
	if (item.href.startsWith("#")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		className: kind === "primary" ? "button-primary" : "button-ghost",
		href: item.href,
		children: label
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		variant: "ghost",
		className: kind === "primary" ? "button-primary" : "button-ghost",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: item.href,
			children: label
		})
	});
}
//#endregion
export { Index as component };
