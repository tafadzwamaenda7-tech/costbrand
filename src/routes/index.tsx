import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  HomeClosingStatement,
  HomeHorticultureSpotlight,
  PillarsSection,
  Plot68CaseStudy,
} from "@/components/site-sections";
import { assets } from "@/lib/site-assets";
import { siteMeta } from "@/lib/site-meta";

export const Route = createFileRoute("/")({
  head: () =>
    siteMeta(
      "From Farm to Market. From Zimbabwe to the World.",
      "Costbrand is a Zimbabwean agricultural company bringing together agriculture, horticulture, machinery and international sourcing.",
    ),
  component: Index,
});

function Index() {
  return (
    <main className="home-page">
      <HomeHero />
      <PillarsSection />
      <Plot68CaseStudy />
      <HomeHorticultureSpotlight />
      <HomeClosingStatement />
    </main>
  );
}

type HeroLinkItem = { label: string; href: string };

const heroSlides: {
  src: string;
  alt: string;
  caption: string;
  title: string;
  accent: string;
  subtitle: string;
  primary: HeroLinkItem;
  secondary: HeroLinkItem;
}[] = [
  {
    src: assets.machineField,
    alt: "Crates of harvested peas loaded for transport from a Zimbabwean farm.",
    caption: "Pea harvest · Zimbabwe",
    title: "Growing Zimbabwe.",
    accent: "Connecting Global Markets.",
    subtitle:
      "From farm to market, and from Zimbabwe to the world — we produce, source and move agricultural goods that global buyers can rely on.",
    primary: { label: "Start a conversation", href: "/contact-us" },
    secondary: { label: "Explore our work", href: "#business" },
  },
  {
    src: assets.downloadNine,
    alt: "Agricultural machinery and produce handling for Zimbabwean operations.",
    caption: "Field machinery",
    title: "Machinery built for",
    accent: "modern farming.",
    subtitle:
      "Sales, hire and workshop support for tractors, harvesters and implements that keep Zimbabwean farms running through every season.",
    primary: { label: "Explore machinery", href: "/machinery" },
    secondary: { label: "International sourcing", href: "/international-sourcing" },
  },
  {
    src: assets.fieldSunset,
    alt: "Rows of peas flowering at golden hour on a Costbrand farm.",
    caption: "Pea crop at golden hour",
    title: "Horticulture grown",
    accent: "for global tables.",
    subtitle:
      "Peas, beans and leafy crops cultivated to export standards — traceable from plot to port, harvest after harvest.",
    primary: { label: "Explore horticulture", href: "/horticulture" },
    secondary: { label: "See our projects", href: "/projects" },
  },
];

const HERO_AUTOPLAY_DELAY = 4500;

function HomeHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplayAllowed, setAutoplayAllowed] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
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

  useEffect(() => {
    if (paused || !autoplayAllowed) return;
    const timer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, HERO_AUTOPLAY_DELAY);
    return () => window.clearTimeout(timer);
  }, [activeSlide, autoplayAllowed, paused]);

  const goToSlide = (index: number) => {
    setActiveSlide(((index % heroSlides.length) + heroSlides.length) % heroSlides.length);
  };

  const activeSlideData = heroSlides[activeSlide] ?? heroSlides[0]!;

  return (
    <section
      className="home-hero"
      id="top"
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const endX = event.changedTouches[0]?.clientX;
        if (touchStartX.current === null || endX === undefined) return;
        const delta = endX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(delta) > 45) {
          goToSlide(activeSlide + (delta < 0 ? 1 : -1));
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goToSlide(activeSlide + 1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          goToSlide(activeSlide - 1);
        }
      }}
    >
      {heroSlides.map((slide, index) => (
        <img
          key={slide.src}
          className={`home-hero-image home-hero-slide${activeSlide === index ? " is-active" : ""}`}
          src={slide.src}
          alt={slide.alt}
          aria-hidden={activeSlide !== index}
          fetchPriority={index === 0 ? "high" : "auto"}
        />
      ))}
      <div className="home-hero-shade" />
      <div className="content-width home-hero-content">
        <div className="home-hero-copy" key={activeSlide}>
          <h1>
            {activeSlideData.title}
            <em>{activeSlideData.accent}</em>
          </h1>
          <p className="home-hero-lead">{activeSlideData.subtitle}</p>
          <div className="home-hero-actions">
            <HeroLink item={activeSlideData.primary} kind="primary" />
            <HeroLink item={activeSlideData.secondary} kind="ghost" />
          </div>
        </div>
      </div>
      <div className="content-width home-hero-rail">
        <p className="home-hero-caption" aria-hidden="true">
          {activeSlideData.caption}
        </p>
      </div>
    </section>
  );
}

function HeroLink({ item, kind }: { item: HeroLinkItem; kind: "primary" | "ghost" }) {
  const label = (
    <>
      {item.label}
      <ArrowUpRight size={17} aria-hidden="true" />
    </>
  );

  if (item.href.startsWith("#")) {
    return (
      <a className={kind === "primary" ? "button-primary" : "button-ghost"} href={item.href}>
        {label}
      </a>
    );
  }

  return (
    <Button
      asChild
      variant="ghost"
      className={kind === "primary" ? "button-primary" : "button-ghost"}
    >
      <Link to={item.href as "/contact-us"}>{label}</Link>
    </Button>
  );
}
