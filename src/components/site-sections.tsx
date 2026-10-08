import { Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  ChartNoAxesCombined,
  Globe,
  Handshake,
  MapPin,
  Route,
  Tractor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { assets } from "@/lib/site-assets";
import { RequestForm } from "@/components/request-form";

type SitePath =
  | "/"
  | "/agriculture"
  | "/our-products"
  | "/horticulture"
  | "/machinery"
  | "/production-and-global-sourcing"
  | "/international-sourcing"
  | "/projects"
  | "/global-market-reach"
  | "/about-us"
  | "/about"
  | "/contact-us";

type PageIntroProps = {
  title: string;
  copy: string;
  image: string;
  imageAlt: string;
  action: string;
  to: SitePath;
  tone?: "default" | "forest";
};

const pillars = [
  {
    name: "Agriculture",
    copy: "Developing productive and commercially viable agricultural enterprises.",
    to: "/agriculture" as const,
    image: assets.farm,
    alt: "Rows of pea plants growing in a field",
  },
  {
    name: "Horticulture",
    copy: "Growing quality horticultural products for Zimbabwean and international markets.",
    to: "/horticulture" as const,
    image: assets.snapPeas,
    alt: "Freshly picked sugar snap peas",
  },
  {
    name: "Agricultural Machinery",
    copy: "Providing farmers with access to modern agricultural machinery and equipment.",
    to: "/machinery" as const,
    image: assets.downloadNine,
    alt: "Machinery and produce handling for a Zimbabwean agricultural operation.",
  },
  {
    name: "International Sourcing",
    copy: "We find it. We verify it. We source it. We bring it to you.",
    to: "/international-sourcing" as const,
    image: assets.globalSourcing,
    alt: "A Costbrand pea field representing its international supply chain",
  },
];

export function PageIntro({
  title,
  copy,
  image,
  imageAlt,
  action,
  to,
  tone = "default",
}: PageIntroProps) {
  return (
    <section className={`page-intro${tone === "forest" ? " page-intro-forest" : ""}`}>
      <div className="page-intro-copy">
        <h1>{title}</h1>
        <p className="page-intro-description">{copy}</p>
        <Button asChild className="button-primary">
          <Link to={to}>
            {action}
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </Button>
      </div>
      <figure className="page-intro-image">
        <img src={image} alt={imageAlt} loading="eager" />
        <figcaption>From Zimbabwe, with purpose.</figcaption>
      </figure>
    </section>
  );
}

export function PillarsSection() {
  return (
    <section className="pillars-section section-pad" id="business">
      <div className="content-width">
        <div className="section-heading-row">
          <div>
            <h2 className="display-heading">One connected view of agriculture.</h2>
          </div>
          <p className="section-lead">
            Costbrand brings together four related areas of work, from production and equipment to
            market connections.
          </p>
        </div>
        <div className="pillar-grid">
          {pillars.map(({ name, copy, to, image, alt }) => (
            <Link className="pillar-card" to={to} key={name} aria-label={`Explore ${name}`}>
              <div className="pillar-image">
                <img src={image} alt={alt} loading="lazy" />
              </div>
              <div className="pillar-copy">
                <h3>{name}</h3>
                <p>{copy}</p>
                <span>
                  Explore <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ZimbabweStatement() {
  return (
    <section className="zimbabwe-statement">
      <div className="content-width statement-inner">
        <p className="statement-text" data-reveal="pop">
          Grow with the land.
          <br />
          <em>Connect with the world.</em>
        </p>
        <span className="statement-rule" />
        <p className="statement-note">
          A Zimbabwean company working across agriculture, horticulture, machinery and international
          sourcing.
        </p>
      </div>
    </section>
  );
}

const produce = [
  "Avocados",
  "Tomatoes",
  "Onions",
  "Watermelons",
  "Peas",
  "Chillies",
  "Broccoli",
  "Carrots",
  "Peppers",
];

export function ProductsSection() {
  return (
    <section className="produce-section section-pad" id="produce">
      <div className="content-width">
        <div className="produce-layout">
          <div className="produce-intro">
            <h2 className="display-heading">Good food begins with good growing.</h2>
            <p className="section-lead">
              Explore the produce categories we work with. Specific availability is discussed around
              each enquiry and season.
            </p>
            <Link className="text-link" to="/horticulture">
              Explore horticulture <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="produce-image-stack">
            <img
              className="produce-image-main"
              src={assets.hero}
              alt="Fresh sugar snap peas with a blue flower"
              loading="lazy"
            />
            <img
              className="produce-image-detail"
              src={assets.passionFruit}
              alt="Passion fruit"
              loading="lazy"
            />
            <span className="image-note">Fresh produce · Zimbabwe</span>
          </div>
        </div>
        <ul className="produce-name-list" aria-label="Produce categories">
          {produce.map((item, index) => (
            <li key={item}>
              <span className="produce-index">0{index + 1}</span>
              <span>{item}</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const plot68Photos = [
  { src: assets.fieldSunset, alt: "Pea field at Plot 68, Zimbabwe.", caption: "Grown at Plot 68" },
  {
    src: assets.plotPackedLabelled,
    alt: "Produce packed and labelled for export at Plot 68.",
    caption: "Packed and labelled",
  },
  {
    src: assets.plotPreparedExport,
    alt: "Produce prepared for export from Plot 68.",
    caption: "Prepared for export",
  },
];

export function Plot68CaseStudy({
  context = "horticulture",
}: {
  context?: "horticulture" | "agriculture";
}) {
  const isAgriculture = context === "agriculture";
  const photos = isAgriculture
    ? plot68Photos.map((photo, index) => ({
        ...photo,
        caption: ["Grown at Plot 68", "Packed for export", "Prepared to buyer specification"][
          index
        ],
      }))
    : plot68Photos;

  return (
    <section
      className={`plot68-section${isAgriculture ? " plot68-agriculture" : ""}`}
      aria-labelledby="plot68-title"
    >
      <div className="plot68-band">
        <div data-reveal="drop">
          {isAgriculture ? (
            <>
              <p>Agricultural Projects</p>
              <h2 id="plot68-title">
                From planning to production — how we develop farms and enterprises.
              </h2>
            </>
          ) : (
            <>
              <p>Case study</p>
              <h2 id="plot68-title">
                Plot 68 <span aria-hidden="true">→</span> England &amp; the Netherlands
              </h2>
            </>
          )}
        </div>
      </div>
      <div className="content-width plot68-gallery">
        {photos.map((photo) => (
          <figure key={photo.caption}>
            <img src={photo.src} alt={photo.alt} loading="lazy" />
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className="plot68-story" data-stagger>
        {isAgriculture && (
          <h3 className="plot68-agriculture-title">Plot 68 · Peas · Production to Export</h3>
        )}
        <p>
          {isAgriculture
            ? "In 2025, Costbrand produced and prepared peas at Plot 68 for export to England and the Netherlands. The crop moved from field to cold chain to international market."
            : "In 2025, Costbrand exported peas from Zimbabwe to England and the Netherlands — from our fields, through our packing process, to European buyers."}
        </p>
        <dl className={`plot68-stats${isAgriculture ? " plot68-stats-four" : ""}`}>
          <div>
            <dt>2025</dt>
            <dd>Exported</dd>
          </div>
          {isAgriculture ? (
            <>
              <div>
                <dt>1 shipment</dt>
                <dd>From Plot 68</dd>
              </div>
              <div>
                <dt>2 destinations</dt>
                <dd>England &amp; the Netherlands</dd>
              </div>
              <div>
                <dt>England &amp; Netherlands</dt>
                <dd>European markets</dd>
              </div>
            </>
          ) : (
            <>
              <div>
                <dt>2 markets</dt>
                <dd>England &amp; the Netherlands</dd>
              </div>
              <div>
                <dt>1 shipment</dt>
                <dd>Track record</dd>
              </div>
            </>
          )}
        </dl>
      </div>
    </section>
  );
}

const focusAreas = [
  ["Vegetables", assets.fieldRows],
  ["Fruits", assets.fieldSunset],
  ["Export crops", assets.machineField],
  ["Greenhouse production", assets.fieldRows],
  ["Irrigation", assets.machineField],
  ["Packhouses", assets.machineField],
  ["Cold-chain solutions", assets.machineField],
  ["Produce marketing", assets.peaHarvest],
  ["Export development", assets.fieldWide],
] as const;

export function HorticultureFocusAreas() {
  return (
    <section className="focus-areas-section section-pad" aria-labelledby="focus-areas-title">
      <div className="content-width">
        <h2 id="focus-areas-title" className="display-heading">
          Focus Areas
        </h2>
        <div className="focus-areas-grid">
          {focusAreas.map(([name, image]) => (
            <article className="focus-area-card" key={name}>
              <img src={image} alt={`${name} in Costbrand horticulture.`} loading="lazy" />
              <h3>{name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const homeCrops = [
  ["Avocados", assets.avocado, "Fresh avocados from the farm."],
  ["Tomatoes", assets.tomato, "Tomatoes grown for fresh local and export markets."],
  ["Watermelons", assets.watermelon, "Watermelons grown in the field."],
  ["Chillies", assets.chilli, "Chillies grown and ready for market."],
  ["Broccoli", assets.broccoli, "Broccoli cultivated in Zimbabwe."],
  ["Carrots", assets.carrot, "Carrots ready for market."],
  ["Peppers", assets.pepper, "Peppers grown for fresh produce markets."],
] as const;

export function HomeHorticultureSpotlight() {
  return (
    <section className="home-horticulture section-pad">
      <div className="content-width">
        <h2 className="display-heading">From Zimbabwe to the World</h2>
        <div className="home-crop-mosaic">
          {homeCrops.map(([name, image, alt]) => (
            <Link
              key={name}
              className={`home-crop-tile crop-${name.toLowerCase()}`}
              to="/horticulture"
              aria-label={`Explore Horticulture — ${name}`}
            >
              <img src={image} alt={alt} loading="lazy" />
              <span>{name}</span>
            </Link>
          ))}
        </div>
        <div className="home-horticulture-statement" data-stagger>
          <p>Zimbabwe has the land, the climate, the farmers.</p>
          <p>
            <strong>Costbrand builds the connection.</strong>
          </p>
          <Link className="button-primary" to="/horticulture">
            Explore Horticulture <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HomeClosingStatement() {
  return (
    <section className="home-closing-band">
      <img src={assets.fieldWide} alt="The Zimbabwean landscape at dawn." loading="lazy" />
      <div className="home-closing-shade" />
      <p data-reveal="pop">
        From Farm to Market.
        <br />
        From Zimbabwe to the World.
      </p>
    </section>
  );
}

const farmJourney = [
  "Production",
  "Harvesting",
  "Packing",
  "Quality control",
  "Cold chain",
  "Export",
  "Global market",
];

export function FarmJourney() {
  return (
    <section className="journey-section section-pad" id="farm-to-market">
      <div className="content-width journey-layout">
        <div className="journey-heading">
          <h2 className="display-heading">Each step connects to the next.</h2>
          <p className="section-lead">
            A clear view of the stages that can take a crop from production through to a buyer.
          </p>
          <Link className="text-link" to="/international-sourcing">
            How sourcing works <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ol className="journey-list">
          {farmJourney.map((step, index) => (
            <li key={step}>
              <span className="journey-number">0{index + 1}</span>
              <span>{step}</span>
              {index < farmJourney.length - 1 && <ArrowDown size={15} aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function AgricultureSection() {
  const focusAreas = [
    {
      marker: "Production",
      title: "Production",
      items: ["Crop production", "Grain production", "Commercial farming"],
      image: assets.farm,
      alt: "A commercial crop field in Zimbabwe.",
    },
    {
      marker: "Infrastructure",
      title: "Infrastructure",
      items: ["Irrigation", "Farm development"],
      image: assets.machineField,
      alt: "Agricultural produce prepared for onward handling.",
    },
    {
      marker: "Inputs and Projects",
      title: "Inputs and Projects",
      items: ["Agricultural inputs", "Agricultural projects"],
      image: assets.packing,
      alt: "Produce packed for agricultural supply.",
    },
  ] as const;

  return (
    <>
      <PageIntro
        title="Developing productive and commercially viable agricultural enterprises."
        copy="Costbrand develops agricultural enterprises that are productive, commercially viable, and built to last."
        image={assets.farm}
        imageAlt="A commercial crop field in Zimbabwe."
        action="Discuss an agriculture enquiry"
        to="/contact-us"
      />
      <nav className="page-section-subnav" aria-label="Agriculture page sections">
        <a href="#agriculture-focus">Focus Areas</a>
        <a href="#agriculture-projects">Projects</a>
      </nav>
      <section className="agriculture-intro">
        <h2>
          We develop agricultural enterprises that are productive, commercially viable, and built to
          last.
        </h2>
      </section>
      <section className="agriculture-focus section-pad" id="agriculture-focus">
        <div className="content-width">
          <h2 className="display-heading">Focus Areas</h2>
          <div className="agriculture-focus-list">
            {focusAreas.map((area, index) => (
              <article
                className={`agriculture-focus-row${index % 2 ? " is-reversed" : ""}`}
                key={area.title}
              >
                <div className="agriculture-focus-copy">
                  <p className="agriculture-focus-marker">{area.marker}</p>
                  <h3>{area.title}</h3>
                  <ul>
                    {area.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <img src={area.image} alt={area.alt} loading="lazy" />
              </article>
            ))}
          </div>
        </div>
      </section>
      <div id="agriculture-projects">
        <Plot68CaseStudy context="agriculture" />
      </div>
      <CrossLinkBand
        title="Equipment for every stage of production."
        to="/machinery"
        label="Explore machinery"
      />
    </>
  );
}

export function HorticulturePage() {
  return (
    <>
      <PageIntro
        title="Horticulture"
        copy="Growing quality horticultural products for Zimbabwean and international markets."
        image={assets.horticultureHero}
        imageAlt="Peas growing in the field on a Costbrand horticulture site."
        action="Make a produce enquiry"
        to="/contact-us"
      />
      <nav className="horticulture-subnav" aria-label="Horticulture page sections">
        <a href="#produce">Our Produce</a>
        <a href="#focus-areas-title">Focus Areas</a>
        <a href="#farm-to-market">Farm to Market</a>
        <a href="#horticulture-markets">Markets</a>
      </nav>
      <section className="horticulture-intro">
        <p>Growing quality horticultural products for Zimbabwean and international markets.</p>
        <p>
          Costbrand will seek to develop commercially viable horticultural production for both
          domestic consumption and export markets.
        </p>
      </section>
      <Plot68CaseStudy />
      <ProductsSection />
      <HorticultureFocusAreas />
      <FarmJourney />
      <section className="horticulture-markets section-pad" id="horticulture-markets">
        <div className="content-width">
          <h2 className="display-heading">Markets</h2>
          <div className="horticulture-market-cards">
            <article>
              <span aria-hidden="true">01</span>
              <h3>England</h3>
              <p>Fresh produce</p>
            </article>
            <article>
              <span aria-hidden="true">02</span>
              <h3>The Netherlands</h3>
              <p>Fresh produce</p>
            </article>
          </div>
          <p className="horticulture-market-proof">
            In 2025, Costbrand exported peas from Zimbabwe to England and the Netherlands.
          </p>
        </div>
      </section>
      <section className="horticulture-closing-band">
        <div className="content-width horticulture-closing-inner">
          <p className="section-eyebrow">Horticulture</p>
          <h2 data-reveal="drop">
            Our goal is to grow quality horticultural products for Zimbabwean and international
            markets.
          </h2>
          <p>Talk to us about your produce requirements.</p>
          <div className="horticulture-closing-actions">
            <Link to="/contact-us" className="button-primary">
              Make a produce enquiry <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link to="/contact-us" className="text-link">
              Contact our team <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export function SourcingSection() {
  const stages = [
    ["Requirement", "You tell us what you need."],
    ["Supplier Search", "We identify credible international suppliers."],
    ["Verification", "We check the supplier and the product."],
    ["Negotiation", "We negotiate price, terms and lead time."],
    ["Quality Control", "We inspect before it ships."],
    ["Shipping", "We handle freight and documentation."],
    ["Zimbabwe", "Delivered to you."],
  ];
  return (
    <>
      <section className="sourcing-hero">
        <h1 data-reveal="drop">
          We find it. We verify it.
          <br />
          We source it. We bring it to you.
        </h1>
        <img
          src={assets.internationalSourcing}
          alt="Fresh produce in a sourcing and logistics context."
          loading="eager"
          data-reveal="zoom"
        />
      </section>
      <section className="sourcing-what-we-do section-pad" id="sourcing-what-we-do">
        <div className="content-width sourcing-what-layout">
          <div>
            <h2>
              Costbrand assists customers in sourcing agricultural machinery, equipment and products
              from international markets.
            </h2>
          </div>
          <img
            src={assets.globalSourcing}
            alt="Agricultural fields illustrating Costbrand's supply-chain work."
            loading="lazy"
          />
        </div>
      </section>
      <section
        className="sourcing-process section-pad"
        id="sourcing-process"
        aria-labelledby="sourcing-process-title"
      >
        <div className="content-width">
          <h2 id="sourcing-process-title" className="display-heading">
            Our Process
          </h2>
          <ol className="sourcing-stepper" data-stagger>
            {stages.map(([name, description], index) => (
              <li className={index === 2 || index === 4 ? "is-trust-step" : ""} key={name}>
                <span className="sourcing-step-number" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <h3>{name}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="sourcing-trust">
        <div className="content-width">
          <h2>Why We Verify</h2>
          <p>
            Sourcing internationally carries risk — wrong specification, poor quality, unreliable
            suppliers. Our process is built to remove that risk before money changes hands.
          </p>
        </div>
      </section>
      <section className="sourcing-request section-pad" id="sourcing-request">
        <div className="content-width">
          <h2 className="display-heading">Tell us what you need.</h2>
          <RequestForm kind="sourcing" />
        </div>
      </section>
      <CrossLinkBand
        title="See the equipment we source."
        to="/machinery"
        label="Explore machinery"
      />
    </>
  );
}

export function MachinerySection() {
  const groups = [
    {
      title: "Land Preparation",
      image: assets.fieldWide,
      alt: "Agricultural land in Zimbabwe.",
      products: ["Tractors", "Implements", "Disc harrows", "Cultivators"],
    },
    {
      title: "Planting and Harvesting",
      image: assets.fieldRows,
      alt: "Rows of crops growing in an agricultural field.",
      products: ["Planters", "Harvesting machinery"],
    },
    {
      title: "Water and Irrigation",
      image: assets.machineField,
      alt: "Agricultural produce prepared for onward handling.",
      products: ["Irrigation equipment", "Pumps", "Solar irrigation systems"],
    },
    {
      title: "Processing and Feed",
      image: assets.packing,
      alt: "Produce packed for agricultural supply.",
      products: ["Processing machinery", "Animal-feed equipment"],
    },
  ];

  return (
    <>
      <PageIntro
        title="Machinery"
        copy="Providing farmers with access to modern agricultural machinery and equipment."
        image={assets.machineryHero}
        imageAlt="Agricultural machinery and produce handling for a Zimbabwean farm operation."
        action="Request a quote"
        to="/contact-us"
        tone="forest"
      />
      <section className="machinery-intro">
        <h2>
          We supply machinery and equipment for every stage of the farming cycle — from land
          preparation to processing.
        </h2>
      </section>
      <section className="machinery-groups section-pad">
        <div className="content-width">
          {groups.map((group) => (
            <section
              className="machinery-group"
              key={group.title}
              id={`machinery-${group.title.toLowerCase().replaceAll(" ", "-")}`}
            >
              <h2>{group.title}</h2>
              <img
                className="machinery-group-image"
                src={group.image}
                alt={group.alt}
                loading="lazy"
              />
              <ul className="machinery-product-list">
                {group.products.map((product) => (
                  <li key={product}>
                    <span>{product}</span>
                    <Link to="/contact-us" aria-label={`Request a quote for ${product}`}>
                      Enquire <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
      <section className="machinery-sourcing-link">
        <div className="content-width">
          <h2>Sourced internationally. Verified. Delivered to Zimbabwe.</h2>
          <Link to="/international-sourcing">
            See how our sourcing process works <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="machinery-request section-pad" id="machinery-request">
        <div className="content-width">
          <h2 className="display-heading">Tell us what your operation needs.</h2>
          <p className="section-lead">
            Equipment options, models and specifications are confirmed in response to each enquiry.
          </p>
          <RequestForm kind="machinery" />
        </div>
      </section>
      <CrossLinkBand
        title="How we source and verify equipment."
        to="/international-sourcing"
        label="Explore international sourcing"
      />
    </>
  );
}

export function ProjectsSection() {
  const projectAreas = [
    [
      "Farm development",
      "Discuss the goals, site context and practical requirements behind a development opportunity.",
    ],
    [
      "Production partnerships",
      "Bring together growers, buyers and collaborators around a shared agricultural objective.",
    ],
    [
      "Equipment and infrastructure",
      "Explore how machinery, irrigation or processing requirements fit within a wider project.",
    ],
  ];
  return (
    <>
      <PageIntro
        title="Good projects start with a good conversation."
        copy="Costbrand welcomes enquiries from growers, agricultural businesses and potential project partners. Tell us what you are working toward and where you need support."
        image={assets.fieldWide}
        imageAlt="A field of growing crops beneath an open sky"
        action="Talk about a project"
        to="/contact-us"
      />
      <section className="service-section section-pad">
        <div className="content-width">
          <div className="section-heading-row">
            <div>
              <h2 className="display-heading">A framework for what comes next.</h2>
            </div>
            <p className="section-lead">
              Project fit, scope and partners are established through discussion. No case studies
              are presented until details are confirmed.
            </p>
          </div>
          <div className="service-list">
            {projectAreas.map(([title, copy], index) => (
              <article className="service-item" key={title}>
                <span className="service-index">0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
                <ArrowUpRight size={18} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>
      <CrossLinkBand
        title="Let’s shape the next step together."
        to="/contact-us"
        label="Start a conversation"
      />
    </>
  );
}

export function MarketsSection() {
  return (
    <>
      <PageIntro
        title="Local roots. Wider market connections."
        copy="We work from Zimbabwe and engage with partners across regional and international supply chains. Every opportunity begins with understanding the buyer and the requirement."
        image={assets.fieldSunset}
        imageAlt="Produce growing in an agricultural field"
        action="Discuss a market enquiry"
        to="/contact-us"
      />
      <section className="markets-section section-pad">
        <div className="content-width">
          <div className="section-heading-row">
            <div>
              <h2 className="display-heading">Connections shaped around the buyer.</h2>
            </div>
            <p className="section-lead">
              Market availability, logistics and fulfilment are discussed for each enquiry. We do
              not assume a country or route before details are agreed.
            </p>
          </div>
          <div className="market-list">
            <article>
              <span>01</span>
              <h3>Zimbabwe</h3>
              <p>Our home base for agricultural work and local partnerships.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Regional Africa</h3>
              <p>Regional opportunities approached through relevant partners and requirements.</p>
            </article>
            <article>
              <span>03</span>
              <h3>International</h3>
              <p>Buyer and supplier conversations that can connect Zimbabwe to wider markets.</p>
            </article>
          </div>
        </div>
      </section>
      <CrossLinkBand
        title="Sourcing, production and markets work best together."
        to="/international-sourcing"
        label="Explore sourcing"
      />
    </>
  );
}

const whyCostbrand = [
  {
    icon: MapPin,
    title: "Zimbabwean Understanding",
    copy: "We understand the opportunities and challenges of the Zimbabwean agricultural environment.",
  },
  {
    icon: Globe,
    title: "Global Connections",
    copy: "We connect customers with international suppliers and markets.",
  },
  {
    icon: Tractor,
    title: "Modern Mechanisation",
    copy: "We promote access to efficient agricultural machinery and technology.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Commercial Agriculture",
    copy: "We focus on agriculture as a business — not simply subsistence production.",
  },
  {
    icon: Route,
    title: "Market Access",
    copy: "We seek to connect quality Zimbabwean agricultural products with appropriate markets.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnerships",
    copy: "We aim to build sustainable relationships with farmers, suppliers, buyers and investors.",
  },
];

export function AboutSection() {
  return (
    <>
      <PageIntro
        title="A Zimbabwean company with a connected view of agriculture."
        copy="Costbrand brings agriculture, horticulture, machinery and international sourcing together. Our aim is to connect practical needs with thoughtful partnerships and opportunities."
        image={assets.aboutUs}
        imageAlt="Costbrand team and agricultural operations in Zimbabwe."
        action="Get in touch"
        to="/contact-us"
      />
      <section className="about-story section-pad">
        <div className="content-width about-story-layout">
          <div>
            <h2 className="display-heading">Who We Are</h2>
          </div>
          <div>
            <p className="section-lead">
              COSTBRAND ENTERPRISES (PRIVATE) LIMITED is a Zimbabwean agricultural and international
              sourcing company focused on developing productive agricultural and horticultural
              enterprises, supplying modern machinery and connecting Zimbabwean businesses with
              global markets and reliable international suppliers.
            </p>
          </div>
        </div>
      </section>
      <section className="about-vision">
        <div>
          <h2>Our Vision</h2>
          <p>
            To become a leading Zimbabwean agricultural enterprise connecting local production,
            modern technology and global markets.
          </p>
        </div>
      </section>
      <section className="about-mission">
        <div>
          <h2>Our Mission</h2>
          <p>
            To develop sustainable agricultural opportunities, improve access to modern machinery
            and technology, and create reliable pathways for Zimbabwean agricultural products to
            reach local and international markets.
          </p>
        </div>
      </section>
      <section className="about-why section-pad">
        <div className="content-width">
          <h2 className="display-heading">Why Costbrand?</h2>
          <div className="about-why-grid">
            {whyCostbrand.map(({ icon: Icon, title, copy }) => (
              <article className="about-why-card" key={title}>
                <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="about-brand-statement">
        <p data-reveal="pop">
          Costbrand is an agricultural enterprise and international supply-chain company — not
          simply an exporter or importer.
        </p>
      </section>
      <CrossLinkBand
        title="Bring us your question, requirement or opportunity."
        to="/contact-us"
        label="Contact Costbrand"
      />
    </>
  );
}

export function CrossLinkBand({
  title,
  to,
  label,
}: {
  title: string;
  to: SitePath;
  label: string;
}) {
  return (
    <section className="cross-link-band">
      <div className="content-width cross-link-inner">
        <h2 data-reveal="drop">{title}</h2>
        <Link to={to} className="text-link text-link-light">
          {label}
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function FutureBanner() {
  return (
    <CrossLinkBand
      title="Grow with the land. Connect with the world."
      to="/contact-us"
      label="Start a conversation"
    />
  );
}
