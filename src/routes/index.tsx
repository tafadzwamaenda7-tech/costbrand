import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
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

const heroSlides = [
  {
    src: assets.machineField,
    alt: "Crates of harvested peas loaded for transport from a Zimbabwean farm.",
  },
  {
    src: assets.downloadNine,
    alt: "Agricultural machinery and produce handling for Zimbabwean operations.",
  },
  { src: assets.fieldSunset, alt: "Rows of peas flowering at golden hour on a Costbrand farm." },
];

const HERO_AUTOPLAY_DELAY = 7000;

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
        <h1>
          Growing Zimbabwe.
          <br />
          <em>Connecting Global Markets.</em>
        </h1>
        <p className="home-hero-supporting">From Farm to Market. From Zimbabwe to the World.</p>
        <p className="home-hero-description">
          We produce agricultural and horticultural products, provide modern machinery and connect
          farmers and businesses with reliable international suppliers and markets.
        </p>
        <p className="home-hero-pillars">
          Agriculture <span>•</span> Horticulture <span>•</span> Machinery <span>•</span>{" "}
          International Sourcing
        </p>
        <div className="home-hero-actions">
          <Button asChild className="button-primary">
            <Link to="/contact-us">
              Start a conversation <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </Button>
          <a className="hero-scroll-link" href="#business">
            Explore our work <ArrowDown size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="home-hero-dots" role="group" aria-label="Choose hero image">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className={activeSlide === index ? "is-active" : ""}
            aria-label={`Show slide ${index + 1}`}
            aria-pressed={activeSlide === index}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
