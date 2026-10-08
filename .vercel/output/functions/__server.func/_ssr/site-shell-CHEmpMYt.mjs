import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as assets, t as Button } from "./site-assets-C9zmdWbE.mjs";
import { b as Link, p as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as MessageCircle, c as Mail, d as ChevronDown, o as Menu, p as ArrowUp, r as Search, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-shell-CHEmpMYt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var primaryLinks = [
	["About Us", "/about"],
	["Agriculture", "/agriculture"],
	["Horticulture", "/horticulture"],
	["Machinery", "/machinery"],
	["International Sourcing", "/international-sourcing"]
];
var mobileLinks = primaryLinks;
var pillarMenus = [
	{
		label: "Agriculture",
		to: "/agriculture",
		image: assets.farm,
		imageAlt: "Rows of crops growing on a Zimbabwean farm",
		links: [{
			label: "Focus Areas",
			href: "/agriculture#agriculture-focus"
		}, {
			label: "Projects",
			href: "/agriculture#agriculture-projects"
		}]
	},
	{
		label: "Horticulture",
		to: "/horticulture",
		image: assets.snapPeas,
		imageAlt: "Freshly harvested sugar snap peas",
		links: [
			{
				label: "Our Produce",
				href: "/horticulture#produce"
			},
			{
				label: "Focus Areas",
				href: "/horticulture#focus-areas-title"
			},
			{
				label: "Farm to Market",
				href: "/horticulture#farm-to-market"
			},
			{
				label: "Markets",
				href: "/horticulture#horticulture-markets"
			}
		]
	},
	{
		label: "Machinery",
		to: "/machinery",
		image: assets.machineField,
		imageAlt: "Agricultural machinery supporting local production",
		links: [
			{
				label: "Land Preparation",
				href: "/machinery#machinery-land-preparation"
			},
			{
				label: "Planting and Harvesting",
				href: "/machinery#machinery-planting-and-harvesting"
			},
			{
				label: "Water and Irrigation",
				href: "/machinery#machinery-water-and-irrigation"
			},
			{
				label: "Processing and Feed",
				href: "/machinery#machinery-processing-and-feed"
			},
			{
				label: "Request a Quote",
				href: "/machinery#machinery-request"
			}
		]
	},
	{
		label: "International Sourcing",
		to: "/international-sourcing",
		image: assets.globalSourcing,
		imageAlt: "Costbrand growing fields representing its sourcing network",
		links: [
			{
				label: "What We Do",
				href: "/international-sourcing#sourcing-what-we-do"
			},
			{
				label: "Our Process",
				href: "/international-sourcing#sourcing-process"
			},
			{
				label: "Request a Quote",
				href: "/international-sourcing#sourcing-request"
			}
		]
	}
];
var searchEntries = [
	{
		title: "Machinery",
		detail: "Equipment for every stage of production",
		href: "/machinery#machinery-land-preparation",
		terms: [
			"machinery",
			"machine",
			"tractor",
			"tractors"
		]
	},
	{
		title: "Avocados",
		detail: "Produce grown for local and export markets",
		href: "/horticulture#produce",
		terms: [
			"avocado",
			"avocados",
			"produce",
			"horticulture"
		]
	},
	{
		title: "Irrigation",
		detail: "Water systems and agricultural pumps",
		href: "/machinery#machinery-water-and-irrigation",
		terms: [
			"irrigation",
			"pump",
			"pumps",
			"water"
		]
	},
	{
		title: "Peas",
		detail: "Fresh produce from farm to market",
		href: "/horticulture#produce",
		terms: ["pea", "peas"]
	},
	{
		title: "Export markets",
		detail: "Connecting Zimbabwean produce with global buyers",
		href: "/horticulture#horticulture-markets",
		terms: [
			"export",
			"exports",
			"markets",
			"global"
		]
	}
];
var searchSuggestions = [
	"Machinery",
	"Avocados",
	"Irrigation"
];
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [activeMenu, setActiveMenu] = (0, import_react.useState)(null);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [mobileViewport, setMobileViewport] = (0, import_react.useState)(false);
	const [expandedMobilePillar, setExpandedMobilePillar] = (0, import_react.useState)(null);
	const menuTriggerRef = (0, import_react.useRef)(null);
	const menuRef = (0, import_react.useRef)(null);
	const searchTriggerRef = (0, import_react.useRef)(null);
	const searchPanelRef = (0, import_react.useRef)(null);
	const searchInputRef = (0, import_react.useRef)(null);
	const restoreSearchFocusRef = (0, import_react.useRef)(false);
	const mobileSearchInputRef = (0, import_react.useRef)(null);
	const menuTimerRef = (0, import_react.useRef)(void 0);
	const suppressMenuFocusRef = (0, import_react.useRef)(null);
	const wasOpenRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const viewport = window.matchMedia?.("(max-width: 930px)");
		const updateViewport = () => {
			const isMobile = viewport?.matches ?? false;
			setMobileViewport(isMobile);
			if (!isMobile) {
				setOpen(false);
				setExpandedMobilePillar(null);
			}
			setActiveMenu(null);
			setSearchOpen(false);
		};
		updateViewport();
		viewport?.addEventListener("change", updateViewport);
		return () => viewport?.removeEventListener("change", updateViewport);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) {
			if (wasOpenRef.current) {
				wasOpenRef.current = false;
				menuTriggerRef.current?.focus();
			}
			return;
		}
		wasOpenRef.current = true;
		const getFocusableElements = () => menuRef.current?.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex=\"-1\"])");
		mobileSearchInputRef.current?.focus();
		const close = (event) => {
			if (event.key !== "Escape") return;
			event.preventDefault();
			event.stopPropagation();
			setOpen(false);
		};
		const trapFocus = (event) => {
			if (event.key !== "Tab" || !menuRef.current) return;
			const focusable = getFocusableElements();
			if (!focusable?.length) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (!menuRef.current.contains(document.activeElement)) {
				event.preventDefault();
				first.focus();
			} else if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};
		document.addEventListener("keydown", close, true);
		document.addEventListener("keydown", trapFocus);
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", close, true);
			document.removeEventListener("keydown", trapFocus);
			document.body.style.overflow = previousOverflow;
		};
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (!searchOpen) return;
		const panel = searchPanelRef.current;
		searchInputRef.current?.focus();
		const previousOverflow = document.body.style.overflow;
		if (mobileViewport) document.body.style.overflow = "hidden";
		const closeOnEscape = (event) => {
			if (event.key !== "Escape") return;
			event.preventDefault();
			event.stopPropagation();
			closeSearch(true);
		};
		const closeOnOutsidePointer = (event) => {
			const target = event.target;
			if (!(target instanceof Node)) return;
			const panelContent = panel?.querySelector(".site-search-panel-inner");
			if (panelContent?.contains(target) && target !== panelContent || searchTriggerRef.current?.contains(target)) return;
			setSearchOpen(false);
		};
		const trapModalFocus = (event) => {
			if (!mobileViewport || event.key !== "Tab" || !panel) return;
			const focusable = panel.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex=\"-1\"])");
			if (!focusable.length) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (!panel.contains(document.activeElement)) {
				event.preventDefault();
				first.focus();
			} else if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};
		document.addEventListener("keydown", closeOnEscape, true);
		document.addEventListener("keydown", trapModalFocus);
		document.addEventListener("pointerdown", closeOnOutsidePointer);
		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", closeOnEscape, true);
			document.removeEventListener("keydown", trapModalFocus);
			document.removeEventListener("pointerdown", closeOnOutsidePointer);
		};
	}, [mobileViewport, searchOpen]);
	(0, import_react.useEffect)(() => {
		if (searchOpen || !restoreSearchFocusRef.current) return;
		restoreSearchFocusRef.current = false;
		searchTriggerRef.current?.focus();
	}, [searchOpen]);
	(0, import_react.useEffect)(() => {
		if (!activeMenu) return;
		const closeOnEscape = (event) => {
			if (event.key !== "Escape") return;
			event.preventDefault();
			if (menuTimerRef.current !== void 0) window.clearTimeout(menuTimerRef.current);
			menuTimerRef.current = void 0;
			const label = activeMenu;
			const menu = pillarMenus.find((item) => item.label === label);
			setActiveMenu(null);
			suppressMenuFocusRef.current = label;
			document.getElementById(`desktop-link-${menu?.to.slice(1)}`)?.focus();
			if (suppressMenuFocusRef.current === label) suppressMenuFocusRef.current = null;
		};
		document.addEventListener("keydown", closeOnEscape);
		return () => document.removeEventListener("keydown", closeOnEscape);
	}, [activeMenu]);
	const closeMenu = () => setOpen(false);
	const clearMenuTimer = () => {
		if (menuTimerRef.current !== void 0) window.clearTimeout(menuTimerRef.current);
		menuTimerRef.current = void 0;
	};
	const scheduleMenuOpen = (label) => {
		clearMenuTimer();
		menuTimerRef.current = window.setTimeout(() => setActiveMenu(label), 150);
	};
	const scheduleMenuClose = () => {
		clearMenuTimer();
		menuTimerRef.current = window.setTimeout(() => setActiveMenu(null), 150);
	};
	const closeSearch = (restoreFocus = false) => {
		restoreSearchFocusRef.current = restoreFocus;
		setSearchOpen(false);
	};
	const matchingEntries = searchQuery.trim() ? searchEntries.filter(({ title, terms }) => {
		const query = searchQuery.trim().toLowerCase();
		return title.toLowerCase().includes(query) || terms.some((term) => term.includes(query));
	}) : [];
	const selectSearchResult = () => {
		if (matchingEntries[0]) window.location.assign(matchingEntries[0].href);
	};
	const renderSearchContents = (inputRef, onEscape) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "site-search-form",
		role: "search",
		onSubmit: (event) => {
			event.preventDefault();
			selectSearchResult();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
			size: 19,
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: inputRef,
			type: "search",
			"aria-label": "Search Costbrand",
			placeholder: "Search Costbrand...",
			value: searchQuery,
			onChange: (event) => setSearchQuery(event.target.value),
			onKeyDown: (event) => {
				if (event.key !== "Escape" || !onEscape) return;
				event.preventDefault();
				event.stopPropagation();
				onEscape();
			}
		})]
	}), !searchQuery.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "site-search-suggestions",
		"aria-label": "Suggested searches",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Suggestions" }), searchSuggestions.map((suggestion) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setSearchQuery(suggestion),
			children: suggestion
		}, suggestion))]
	}) : matchingEntries.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "site-search-results",
		"aria-label": "Search results",
		"aria-live": "polite",
		children: matchingEntries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: entry.href,
			onClick: () => closeSearch(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: entry.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: entry.detail })]
		}) }, entry.title))
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "site-search-empty",
		"aria-live": "polite",
		children: [
			"Nothing found. Try 'machinery' or 'avocados'. Or",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `https://wa.me/?text=${encodeURIComponent("Hi Costbrand, I couldn't find what I was looking for.")}`,
				target: "_blank",
				rel: "noreferrer",
				children: "WhatsApp us →"
			})
		]
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "site-header",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "brand-lockup",
				"aria-label": "Costbrand home",
				onClick: closeMenu,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "site-logo",
					src: assets.logo,
					alt: "Costbrand"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "desktop-navigation",
				onPointerLeave: scheduleMenuClose,
				onFocusCapture: (event) => {
					const focusedTrigger = event.target.closest(".desktop-nav-item > a[aria-haspopup]");
					if (!focusedTrigger) {
						if (activeMenu && event.target.closest(".desktop-mega-menu")) clearMenuTimer();
						else if (activeMenu) scheduleMenuClose();
						else clearMenuTimer();
						return;
					}
					const label = focusedTrigger.textContent?.trim();
					if (!label) return;
					if (suppressMenuFocusRef.current === label) {
						suppressMenuFocusRef.current = null;
						clearMenuTimer();
						return;
					}
					scheduleMenuOpen(label);
				},
				onBlurCapture: (event) => {
					if (!event.currentTarget.contains(event.relatedTarget)) scheduleMenuClose();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "desktop-nav",
					"aria-label": "Main navigation",
					children: primaryLinks.map(([label, to]) => {
						const menu = pillarMenus.find((item) => item.label === label);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "desktop-nav-item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								id: menu ? `desktop-link-${menu.to.slice(1)}` : void 0,
								to,
								"aria-haspopup": menu ? "true" : void 0,
								"aria-expanded": menu ? activeMenu === label : void 0,
								"aria-controls": menu ? `mega-menu-${to.slice(1)}` : void 0,
								onBlur: () => menu && scheduleMenuClose(),
								onPointerEnter: () => menu && scheduleMenuOpen(label),
								children: label
							}), menu && activeMenu === label && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "desktop-mega-menu",
								id: `mega-menu-${menu.to.slice(1)}`,
								"aria-label": `${menu.label} sections`,
								onPointerEnter: clearMenuTimer,
								onBlurCapture: (event) => {
									const relatedTarget = event.relatedTarget;
									if (relatedTarget !== document.getElementById(`desktop-link-${menu.to.slice(1)}`) && !event.currentTarget.contains(relatedTarget)) scheduleMenuClose();
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: menu.image,
									alt: menu.imageAlt
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "desktop-mega-content",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "desktop-mega-eyebrow",
											children: ["Explore ", menu.label]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											className: "desktop-mega-title",
											href: menu.to,
											children: menu.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: menu.links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: link.href,
											children: [link.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"aria-hidden": "true",
												children: "↗"
											})]
										}) }, link.href)) })
									]
								})]
							})]
						}, label);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "site-header-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					ref: searchTriggerRef,
					variant: "ghost",
					size: "icon",
					className: "search-trigger",
					"aria-label": searchOpen ? "Close search" : "Search",
					"aria-expanded": searchOpen,
					"aria-controls": "site-search-panel",
					onClick: () => {
						if (searchOpen) {
							closeSearch();
							return;
						}
						setActiveMenu(null);
						setOpen(false);
						setSearchOpen(true);
					},
					children: searchOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { "aria-hidden": "true" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { "aria-hidden": "true" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "nav-cta",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact-us",
						children: "Get a Quote"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				ref: menuTriggerRef,
				variant: "ghost",
				size: "icon",
				className: "menu-trigger",
				"aria-label": open ? "Close navigation menu" : "Open navigation menu",
				"aria-expanded": open,
				"aria-controls": "mobile-navigation",
				onClick: () => setOpen((visible) => !visible),
				children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { "aria-hidden": "true" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { "aria-hidden": "true" })
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				ref: menuRef,
				className: "mobile-nav",
				id: "mobile-navigation",
				"aria-label": "Mobile navigation",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mobile-nav-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Explore Costbrand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "menu-close",
							"aria-label": "Close menu",
							onClick: closeMenu,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { "aria-hidden": "true" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mobile-menu-search",
						children: renderSearchContents(mobileSearchInputRef, closeMenu)
					}),
					mobileLinks.map(([label, to], index) => {
						const menu = pillarMenus.find((item) => item.label === label);
						if (!menu) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							className: "mobile-nav-link",
							to,
							onClick: closeMenu,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["0", index + 1] }), label]
						}, label);
						const expanded = expandedMobilePillar === label;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mobile-pillar",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mobile-pillar-heading",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to,
									onClick: closeMenu,
									"aria-label": `Go to ${label} page`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["0", index + 1] }), label]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": `${expanded ? "Hide" : "Show"} ${label} sections`,
									"aria-expanded": expanded,
									"aria-controls": `mobile-sections-${menu.to.slice(1)}`,
									onClick: () => setExpandedMobilePillar(expanded ? null : label),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { "aria-hidden": "true" })
								})]
							}), expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								id: `mobile-sections-${menu.to.slice(1)}`,
								className: "mobile-pillar-links",
								children: menu.links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: link.href,
									onClick: closeMenu,
									children: link.label
								}) }, link.href))
							})]
						}, label);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "nav-cta mobile-nav-cta",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact-us",
							onClick: closeMenu,
							children: "Get a Quote"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "From Zimbabwe to the world." })
				]
			}),
			searchOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: searchPanelRef,
				className: `site-search-overlay${mobileViewport ? " is-mobile" : ""}`,
				id: "site-search-panel",
				role: "dialog",
				"aria-label": "Search Costbrand",
				"aria-modal": mobileViewport || void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "site-search-panel-inner",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "site-search-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Search Costbrand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "site-search-close",
							"aria-label": "Close search",
							onClick: () => closeSearch(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { "aria-hidden": "true" })
						})]
					}), renderSearchContents(searchInputRef, () => closeSearch(true))]
				})
			})
		]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "site-footer",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "content-width footer-layout",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "footer-brand-block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "brand-lockup brand-lockup-inverse",
							"aria-label": "Costbrand home",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								className: "footer-logo",
								src: assets.footerLogo,
								alt: "Costbrand",
								loading: "lazy"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A Zimbabwean company working across agriculture, horticulture, machinery and international sourcing." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact-us",
							className: "footer-contact-link",
							children: ["Start a conversation ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "↗"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "footer-links",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Explore" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							children: "About Us"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/agriculture",
							children: "Agriculture"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/horticulture",
							children: "Horticulture"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/machinery",
							children: "Machinery"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/international-sourcing",
							children: "International sourcing"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "footer-links footer-legal",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Information" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact-us",
							children: "Contact"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/privacy",
							children: "Privacy policy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/terms",
							children: "Terms and conditions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/cookie-policy",
							children: "Cookie policy"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "content-width footer-bottom",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" Costbrand Private Limited"
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Growing Zimbabwe. Connecting global markets." })]
		})]
	});
}
function ContactBlock() {
	const pathname = useLocation().pathname;
	const message = encodeURIComponent(whatsappMessage(pathname));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "site-contact-block",
		"aria-labelledby": "contact-block-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "content-width",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "contact-block-title",
				children: "Tell us what you need."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "site-contact-actions",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "contact-block-primary",
						to: "/contact-us",
						children: "Send us a message"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "contact-block-secondary",
						href: `https://wa.me/?text=${message}`,
						target: "_blank",
						rel: "noreferrer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
							size: 18,
							"aria-hidden": "true"
						}), " WhatsApp"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "contact-block-secondary",
						href: "mailto:info@costbrand.co.zw",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
							size: 18,
							"aria-hidden": "true"
						}), " Email"]
					})
				]
			})]
		})
	});
}
function FloatingWhatsApp() {
	const pathname = useLocation().pathname;
	const message = encodeURIComponent(whatsappMessage(pathname));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		className: "floating-whatsapp",
		href: `https://wa.me/?text=${message}`,
		target: "_blank",
		rel: "noreferrer",
		"aria-label": "Chat with Costbrand on WhatsApp",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
			size: 19,
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "WhatsApp" })]
	});
}
function NotFoundPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "not-found-page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "content-width not-found-inner",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "not-found-code",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "That page has moved or never existed." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "not-found-actions",
					"aria-label": "Suggested pages",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							className: "not-found-link",
							to: "/",
							children: "Home"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							className: "not-found-link",
							to: "/horticulture",
							children: "Horticulture"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							className: "not-found-link",
							to: "/contact-us",
							children: "Contact"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "not-found-link",
							href: `https://wa.me/?text=${encodeURIComponent("Hi Costbrand, I couldn't find what I was looking for.")}`,
							target: "_blank",
							rel: "noreferrer",
							children: "WhatsApp"
						})
					]
				})
			]
		})
	});
}
function whatsappMessage(pathname) {
	return {
		"/": "Hi Costbrand, I'd like to know more.",
		"/about": "Hi Costbrand, I'd like to know more about the company.",
		"/about-us": "Hi Costbrand, I'd like to know more about the company.",
		"/agriculture": "Hi Costbrand, I'm interested in agriculture.",
		"/horticulture": "Hi Costbrand, I'm interested in your produce.",
		"/our-products": "Hi Costbrand, I'm interested in your produce.",
		"/machinery": "Hi Costbrand, I'm interested in machinery.",
		"/international-sourcing": "Hi Costbrand, I need help sourcing a product.",
		"/production-and-global-sourcing": "Hi Costbrand, I need help sourcing a product.",
		"/404": "Hi Costbrand, I couldn't find what I was looking for."
	}[pathname] ?? "Hi Costbrand, I'd like to know more.";
}
function BackToTop() {
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const update = () => setVisible(window.scrollY > 400);
		update();
		window.addEventListener("scroll", update, { passive: true });
		return () => window.removeEventListener("scroll", update);
	}, []);
	return visible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "icon",
		className: "back-top",
		"aria-label": "Back to top",
		title: "Back to top",
		onClick: () => window.scrollTo({
			top: 0,
			behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { "aria-hidden": "true" })
	}) : null;
}
//#endregion
export { SiteFooter as a, NotFoundPage as i, ContactBlock as n, SiteHeader as o, FloatingWhatsApp as r, BackToTop as t };
