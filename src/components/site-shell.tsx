import { Link, useLocation } from "@tanstack/react-router";
import { type RefObject, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Mail, MessageCircle, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { assets } from "@/lib/site-assets";

const primaryLinks = [
  ["About Us", "/about"],
  ["Agriculture", "/agriculture"],
  ["Horticulture", "/horticulture"],
  ["Machinery", "/machinery"],
  ["International Sourcing", "/international-sourcing"],
] as const;

const mobileLinks = primaryLinks;

const pillarMenus = [
  {
    label: "Agriculture",
    to: "/agriculture",
    image: assets.farm,
    imageAlt: "Rows of crops growing on a Zimbabwean farm",
    links: [
      { label: "Focus Areas", href: "/agriculture#agriculture-focus" },
      { label: "Projects", href: "/agriculture#agriculture-projects" },
    ],
  },
  {
    label: "Horticulture",
    to: "/horticulture",
    image: assets.snapPeas,
    imageAlt: "Freshly harvested sugar snap peas",
    links: [
      { label: "Our Produce", href: "/horticulture#produce" },
      { label: "Focus Areas", href: "/horticulture#focus-areas-title" },
      { label: "Farm to Market", href: "/horticulture#farm-to-market" },
      { label: "Markets", href: "/horticulture#horticulture-markets" },
    ],
  },
  {
    label: "Machinery",
    to: "/machinery",
    image: assets.machineField,
    imageAlt: "Agricultural machinery supporting local production",
    links: [
      { label: "Land Preparation", href: "/machinery#machinery-land-preparation" },
      { label: "Planting and Harvesting", href: "/machinery#machinery-planting-and-harvesting" },
      { label: "Water and Irrigation", href: "/machinery#machinery-water-and-irrigation" },
      { label: "Processing and Feed", href: "/machinery#machinery-processing-and-feed" },
      { label: "Request a Quote", href: "/machinery#machinery-request" },
    ],
  },
  {
    label: "International Sourcing",
    to: "/international-sourcing",
    image: assets.globalSourcing,
    imageAlt: "Costbrand growing fields representing its sourcing network",
    links: [
      { label: "What We Do", href: "/international-sourcing#sourcing-what-we-do" },
      { label: "Our Process", href: "/international-sourcing#sourcing-process" },
      { label: "Request a Quote", href: "/international-sourcing#sourcing-request" },
    ],
  },
] as const;

const searchEntries = [
  {
    title: "Machinery",
    detail: "Equipment for every stage of production",
    href: "/machinery#machinery-land-preparation",
    terms: ["machinery", "machine", "tractor", "tractors"],
  },
  {
    title: "Avocados",
    detail: "Produce grown for local and export markets",
    href: "/horticulture#produce",
    terms: ["avocado", "avocados", "produce", "horticulture"],
  },
  {
    title: "Irrigation",
    detail: "Water systems and agricultural pumps",
    href: "/machinery#machinery-water-and-irrigation",
    terms: ["irrigation", "pump", "pumps", "water"],
  },
  {
    title: "Peas",
    detail: "Fresh produce from farm to market",
    href: "/horticulture#produce",
    terms: ["pea", "peas"],
  },
  {
    title: "Export markets",
    detail: "Connecting Zimbabwean produce with global buyers",
    href: "/horticulture#horticulture-markets",
    terms: ["export", "exports", "markets", "global"],
  },
] as const;

const searchSuggestions = ["Machinery", "Avocados", "Irrigation"] as const;

export function SiteHeader() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileViewport, setMobileViewport] = useState(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [expandedMobilePillar, setExpandedMobilePillar] = useState<string | null>(null);
  const [leaving, setLeaving] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLElement | null>(null);
  const searchTriggerRef = useRef<HTMLButtonElement | null>(null);
  const searchPanelRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const restoreSearchFocusRef = useRef(false);
  const mobileSearchInputRef = useRef<HTMLInputElement | null>(null);
  const menuTimerRef = useRef<number | undefined>(undefined);
  const suppressMenuFocusRef = useRef<string | null>(null);
  const wasOpenRef = useRef(false);
  const leavingRef = useRef(false);
  const leaveTimerRef = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      if (leaveTimerRef.current !== undefined) window.clearTimeout(leaveTimerRef.current);
    },
    [],
  );

  useEffect(() => {
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

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 8);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    if (!open) {
      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        menuTriggerRef.current?.focus();
      }
      return;
    }

    wasOpenRef.current = true;

    if (leaveTimerRef.current !== undefined) {
      window.clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = undefined;
    }
    leavingRef.current = false;
    setLeaving(false);

    const getFocusableElements = () =>
      menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

    mobileSearchInputRef.current?.focus();

    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      requestCloseMenu();
    };

    const trapFocus = (event: KeyboardEvent) => {
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

  useEffect(() => {
    if (!searchOpen) return;

    const panel = searchPanelRef.current;
    const input = searchInputRef.current;
    input?.focus();
    const previousOverflow = document.body.style.overflow;
    if (mobileViewport) document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      closeSearch(true);
    };
    const closeOnOutsidePointer = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      const panelContent = panel?.querySelector(".site-search-panel-inner");
      if (
        (panelContent?.contains(target) && target !== panelContent) ||
        searchTriggerRef.current?.contains(target)
      )
        return;
      setSearchOpen(false);
    };
    const trapModalFocus = (event: KeyboardEvent) => {
      if (!mobileViewport || event.key !== "Tab" || !panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
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

  useEffect(() => {
    if (searchOpen || !restoreSearchFocusRef.current) return;
    restoreSearchFocusRef.current = false;
    searchTriggerRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (!activeMenu) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      if (menuTimerRef.current !== undefined) window.clearTimeout(menuTimerRef.current);
      menuTimerRef.current = undefined;
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
  const requestCloseMenu = () => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
    leaveTimerRef.current = window.setTimeout(() => {
      leavingRef.current = false;
      setLeaving(false);
      setOpen(false);
    }, 260);
  };
  const clearMenuTimer = () => {
    if (menuTimerRef.current !== undefined) window.clearTimeout(menuTimerRef.current);
    menuTimerRef.current = undefined;
  };
  const scheduleMenuOpen = (label: string) => {
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
  const matchingEntries = searchQuery.trim()
    ? searchEntries.filter(({ title, terms }) => {
        const query = searchQuery.trim().toLowerCase();
        return title.toLowerCase().includes(query) || terms.some((term) => term.includes(query));
      })
    : [];
  const selectSearchResult = () => {
    if (matchingEntries[0]) window.location.assign(matchingEntries[0].href);
  };

  const renderSearchContents = (
    inputRef: RefObject<HTMLInputElement | null>,
    onEscape?: () => void,
  ) => (
    <>
      <form
        className="site-search-form"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          selectSearchResult();
        }}
      >
        <Search size={19} aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          aria-label="Search Costbrand"
          placeholder="Search Costbrand..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Escape" || !onEscape) return;
            event.preventDefault();
            event.stopPropagation();
            onEscape();
          }}
        />
      </form>
      {!searchQuery.trim() ? (
        <div className="site-search-suggestions" aria-label="Suggested searches">
          <span>Suggestions</span>
          {searchSuggestions.map((suggestion) => (
            <button type="button" key={suggestion} onClick={() => setSearchQuery(suggestion)}>
              {suggestion}
            </button>
          ))}
        </div>
      ) : matchingEntries.length ? (
        <ul className="site-search-results" aria-label="Search results" aria-live="polite">
          {matchingEntries.map((entry) => (
            <li key={entry.title}>
              <a href={entry.href} onClick={() => closeSearch()}>
                <strong>{entry.title}</strong>
                <span>{entry.detail}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="site-search-empty" aria-live="polite">
          Nothing found. Try 'machinery' or 'avocados'. Or{" "}
          <a
            href={`https://wa.me/?text=${encodeURIComponent("Hi Costbrand, I couldn't find what I was looking for.")}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp us →
          </a>
        </p>
      )}
    </>
  );

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <Link to="/" className="brand-lockup" aria-label="Costbrand home" onClick={closeMenu}>
        <img className="site-logo" src={assets.logo} alt="Costbrand" />
      </Link>

      <div
        className="desktop-navigation"
        onPointerLeave={scheduleMenuClose}
        onFocusCapture={(event) => {
          const focusedTrigger = (event.target as HTMLElement).closest<HTMLAnchorElement>(
            ".desktop-nav-item > a[aria-haspopup]",
          );
          if (!focusedTrigger) {
            if (activeMenu && (event.target as HTMLElement).closest(".desktop-mega-menu")) {
              clearMenuTimer();
            } else if (activeMenu) {
              scheduleMenuClose();
            } else {
              clearMenuTimer();
            }
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
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null))
            scheduleMenuClose();
        }}
      >
        <nav className="desktop-nav" aria-label="Main navigation">
          {primaryLinks.map(([label, to]) => {
            const menu = pillarMenus.find((item) => item.label === label);
            return (
              <div className="desktop-nav-item" key={label}>
                <Link
                  id={menu ? `desktop-link-${menu.to.slice(1)}` : undefined}
                  to={to}
                  aria-haspopup={menu ? "true" : undefined}
                  aria-expanded={menu ? activeMenu === label : undefined}
                  aria-controls={menu ? `mega-menu-${to.slice(1)}` : undefined}
                  onBlur={() => menu && scheduleMenuClose()}
                  onPointerEnter={() => menu && scheduleMenuOpen(label)}
                >
                  {label}
                </Link>
                {menu && activeMenu === label && (
                  <section
                    className="desktop-mega-menu"
                    id={`mega-menu-${menu.to.slice(1)}`}
                    aria-label={`${menu.label} sections`}
                    onPointerEnter={clearMenuTimer}
                    onBlurCapture={(event) => {
                      const relatedTarget = event.relatedTarget;
                      const trigger = document.getElementById(`desktop-link-${menu.to.slice(1)}`);
                      if (
                        relatedTarget !== trigger &&
                        !event.currentTarget.contains(relatedTarget as Node | null)
                      ) {
                        scheduleMenuClose();
                      }
                    }}
                  >
                    <a
                      className="desktop-mega-image"
                      href={menu.to}
                      aria-label={`Explore ${menu.label}`}
                    >
                      <img src={menu.image} alt={menu.imageAlt} />
                    </a>
                    <div className="desktop-mega-content">
                      <a className="desktop-mega-eyebrow" href={menu.to}>
                        Explore {menu.label}
                      </a>
                      <a className="desktop-mega-title" href={menu.to}>
                        {menu.label}
                      </a>
                      <ul>
                        {menu.links.map((link) => (
                          <li key={link.href}>
                            <a href={link.href}>
                              {link.label}
                              <span aria-hidden="true">↗</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="site-header-actions">
        <Button
          ref={searchTriggerRef}
          variant="ghost"
          size="icon"
          className="search-trigger"
          aria-label={searchOpen ? "Close search" : "Search"}
          aria-expanded={searchOpen}
          aria-controls="site-search-panel"
          onClick={() => {
            if (searchOpen) {
              closeSearch();
              return;
            }
            setActiveMenu(null);
            setOpen(false);
            setSearchOpen(true);
          }}
        >
          {searchOpen ? <X aria-hidden="true" /> : <Search aria-hidden="true" />}
        </Button>
        <Button asChild className="nav-cta">
          <Link to="/contact-us">Get a Quote</Link>
        </Button>
      </div>
      <Button
        ref={menuTriggerRef}
        variant="ghost"
        size="icon"
        className="menu-trigger"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((visible) => !visible)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </Button>

      {open && (
        <>
          <div className="mobile-nav-backdrop" onClick={requestCloseMenu} aria-hidden="true" />
          <nav
            ref={menuRef}
            className={`mobile-nav${leaving ? " is-closing" : ""}`}
            id="mobile-navigation"
            aria-label="Mobile navigation"
          >
            <div className="mobile-nav-head">
              <Link to="/" aria-label="Costbrand home" onClick={closeMenu}>
                <img className="site-logo mobile-nav-logo" src={assets.logo} alt="Costbrand" />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="menu-close"
                aria-label="Close menu"
                onClick={requestCloseMenu}
              >
                <X aria-hidden="true" />
              </Button>
            </div>

            <div className="mobile-nav-body">
              <div className="mobile-menu-search">
                {renderSearchContents(mobileSearchInputRef, closeMenu)}
              </div>

              <div className="mobile-nav-list">
                {mobileLinks.map(([label, to], index) => {
                  const menu = pillarMenus.find((item) => item.label === label);
                  const isActive = pathname === to;
                  if (!menu) {
                    return (
                      <Link
                        className={`mobile-nav-link${isActive ? " is-active" : ""}`}
                        key={label}
                        to={to}
                        onClick={closeMenu}
                      >
                        <span>0{index + 1}</span>
                        <span className="mobile-nav-label">{label}</span>
                        <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
                      </Link>
                    );
                  }
                  const expanded = expandedMobilePillar === label;
                  return (
                    <section className={`mobile-pillar${isActive ? " is-active" : ""}`} key={label}>
                      <div className="mobile-pillar-heading">
                        <Link to={to} onClick={closeMenu} aria-label={`Go to ${label} page`}>
                          <span>0{index + 1}</span>
                          <span className="mobile-nav-label">{label}</span>
                          <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
                        </Link>
                        <button
                          type="button"
                          aria-label={`${expanded ? "Hide" : "Show"} ${label} sections`}
                          aria-expanded={expanded}
                          aria-controls={`mobile-sections-${menu.to.slice(1)}`}
                          onClick={() => setExpandedMobilePillar(expanded ? null : label)}
                        >
                          <ChevronDown aria-hidden="true" />
                        </button>
                      </div>
                      {expanded && (
                        <ul
                          id={`mobile-sections-${menu.to.slice(1)}`}
                          className="mobile-pillar-links"
                        >
                          {menu.links.map((link) => (
                            <li key={link.href}>
                              <a href={link.href} onClick={closeMenu}>
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  );
                })}
              </div>

              <div className="mobile-nav-foot">
                <Button asChild className="nav-cta mobile-nav-cta">
                  <Link to="/contact-us" onClick={closeMenu}>
                    Get a Quote
                    <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
                  </Link>
                </Button>
                <div className="mobile-nav-contact">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(whatsappMessage(pathname))}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle size={16} aria-hidden="true" />
                    WhatsApp
                  </a>
                  <a href="mailto:info@costbrand.co.zw">
                    <Mail size={16} aria-hidden="true" />
                    info@costbrand.co.zw
                  </a>
                </div>
                <p>From Zimbabwe to the world.</p>
              </div>
            </div>
          </nav>
        </>
      )}
      {searchOpen && (
        <div
          ref={searchPanelRef}
          className={`site-search-overlay${mobileViewport ? " is-mobile" : ""}`}
          id="site-search-panel"
          role="dialog"
          aria-label="Search Costbrand"
          aria-modal={mobileViewport || undefined}
        >
          <div className="site-search-panel-inner">
            <div className="site-search-heading">
              <p>Search Costbrand</p>
              <Button
                variant="ghost"
                size="icon"
                className="site-search-close"
                aria-label="Close search"
                onClick={() => closeSearch(true)}
              >
                <X aria-hidden="true" />
              </Button>
            </div>
            {renderSearchContents(searchInputRef, () => closeSearch(true))}
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="content-width footer-layout">
        <div className="footer-brand-block">
          <Link to="/" className="brand-lockup brand-lockup-inverse" aria-label="Costbrand home">
            <img className="footer-logo" src={assets.footerLogo} alt="Costbrand" loading="lazy" />
          </Link>
          <p>
            A Zimbabwean company working across agriculture, horticulture, machinery and
            international sourcing.
          </p>
          <Link to="/contact-us" className="footer-contact-link">
            Start a conversation <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="footer-links">
          <h2>Explore</h2>
          <Link to="/about">About Us</Link>
          <Link to="/agriculture">Agriculture</Link>
          <Link to="/horticulture">Horticulture</Link>
          <Link to="/machinery">Machinery</Link>
          <Link to="/international-sourcing">International sourcing</Link>
        </div>
        <div className="footer-links footer-legal">
          <h2>Information</h2>
          <Link to="/contact-us">Contact</Link>
          <Link to="/privacy">Privacy policy</Link>
          <Link to="/terms">Terms and conditions</Link>
          <Link to="/cookie-policy">Cookie policy</Link>
        </div>
      </div>
      <div className="content-width footer-bottom">
        <span>© {new Date().getFullYear()} Costbrand Private Limited</span>
        <span>Growing Zimbabwe. Connecting global markets.</span>
      </div>
    </footer>
  );
}

export function ContactBlock() {
  const pathname = useLocation().pathname;
  const message = encodeURIComponent(whatsappMessage(pathname));
  return (
    <section className="site-contact-block" aria-labelledby="contact-block-title">
      <div className="content-width">
        <h2 id="contact-block-title">Tell us what you need.</h2>
        <div className="site-contact-actions">
          <Link className="contact-block-primary" to="/contact-us">
            Send us a message
          </Link>
          <a
            className="contact-block-secondary"
            href={`https://wa.me/?text=${message}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} aria-hidden="true" /> WhatsApp
          </a>
          <a className="contact-block-secondary" href="mailto:info@costbrand.co.zw">
            <Mail size={18} aria-hidden="true" /> Email
          </a>
        </div>
      </div>
    </section>
  );
}

export function FloatingWhatsApp() {
  const pathname = useLocation().pathname;
  const message = encodeURIComponent(whatsappMessage(pathname));
  return (
    <a
      className="floating-whatsapp"
      href={`https://wa.me/?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Costbrand on WhatsApp"
    >
      <MessageCircle size={19} aria-hidden="true" />
      <span>WhatsApp</span>
    </a>
  );
}

export function NotFoundPage() {
  const message = encodeURIComponent("Hi Costbrand, I couldn't find what I was looking for.");
  return (
    <main className="not-found-page">
      <div className="content-width not-found-inner">
        <p className="not-found-code">404</p>
        <h1>That page has moved or never existed.</h1>
        <nav className="not-found-actions" aria-label="Suggested pages">
          <Link className="not-found-link" to="/">
            Home
          </Link>
          <Link className="not-found-link" to="/horticulture">
            Horticulture
          </Link>
          <Link className="not-found-link" to="/contact-us">
            Contact
          </Link>
          <a
            className="not-found-link"
            href={`https://wa.me/?text=${message}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </main>
  );
}

function whatsappMessage(pathname: string) {
  const messages: Record<string, string> = {
    "/": "Hi Costbrand, I'd like to know more.",
    "/about": "Hi Costbrand, I'd like to know more about the company.",
    "/about-us": "Hi Costbrand, I'd like to know more about the company.",
    "/agriculture": "Hi Costbrand, I'm interested in agriculture.",
    "/horticulture": "Hi Costbrand, I'm interested in your produce.",
    "/our-products": "Hi Costbrand, I'm interested in your produce.",
    "/machinery": "Hi Costbrand, I'm interested in machinery.",
    "/international-sourcing": "Hi Costbrand, I need help sourcing a product.",
    "/production-and-global-sourcing": "Hi Costbrand, I need help sourcing a product.",
    "/404": "Hi Costbrand, I couldn't find what I was looking for.",
  };
  return messages[pathname] ?? "Hi Costbrand, I'd like to know more.";
}
