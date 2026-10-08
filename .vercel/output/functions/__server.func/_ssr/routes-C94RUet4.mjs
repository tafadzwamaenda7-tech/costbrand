import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as assets, t as Button } from "./site-assets-C9zmdWbE.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ArrowDown, m as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { a as HomeHorticultureSpotlight, i as HomeClosingStatement, l as PillarsSection, u as Plot68CaseStudy } from "./site-sections-U8XQ4Njw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C94RUet4.js
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
		alt: "Crates of harvested peas loaded for transport from a Zimbabwean farm."
	},
	{
		src: assets.downloadNine,
		alt: "Agricultural machinery and produce handling for Zimbabwean operations."
	},
	{
		src: assets.fieldSunset,
		alt: "Rows of peas flowering at golden hour on a Costbrand farm."
	}
];
var HERO_AUTOPLAY_DELAY = 7e3;
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "content-width home-hero-content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
						"Growing Zimbabwe.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Connecting Global Markets." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "home-hero-supporting",
						children: "From Farm to Market. From Zimbabwe to the World."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "home-hero-description",
						children: "We produce agricultural and horticultural products, provide modern machinery and connect farmers and businesses with reliable international suppliers and markets."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "home-hero-pillars",
						children: [
							"Agriculture ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
							" Horticulture ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
							" Machinery ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
							" ",
							"International Sourcing"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "home-hero-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "button-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/contact-us",
								children: ["Start a conversation ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
									size: 17,
									"aria-hidden": "true"
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "hero-scroll-link",
							href: "#business",
							children: ["Explore our work ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, {
								size: 15,
								"aria-hidden": "true"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "home-hero-dots",
				role: "group",
				"aria-label": "Choose hero image",
				children: heroSlides.map((slide, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: activeSlide === index ? "is-active" : "",
					"aria-label": `Show slide ${index + 1}`,
					"aria-pressed": activeSlide === index,
					onClick: () => goToSlide(index)
				}, slide.src))
			})
		]
	});
}
//#endregion
export { Index as component };
