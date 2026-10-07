import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { assets } from '@/lib/site-assets';
import { siteMeta } from '@/lib/site-meta';
import { AboutSection, FeaturesSection, ProductsSection, SourcingSection, MarketsSection, FutureBanner } from '@/components/site-sections';
export const Route = createFileRoute('/')({head:()=>siteMeta('Fresh Produce. Global Reach. Sustainable Future.','Genesis Exotics connects Africa, Europe, South America and the United Kingdom with premium-quality fresh fruits and vegetables.'),component:Index});
function Index() {return <main><section className="home-hero"><div className="hero-copy"><h1><span>Fresh Produce.</span><span>Global Reach.</span><span className="green-line">Sustainable Future.</span></h1><p>Genesis Exotics connects Africa, Europe, South America<br/>and the United Kingdom to the world with premium-quality fruits<br/>and vegetables, grown with care and delivered with integrity.</p><Button asChild className="produce-button"><Link to="/contact-us">Contact Us</Link></Button></div><img className="hero-photo" src={assets.hero} alt="Fresh sugar snap peas growing alongside blue flowers" fetchPriority="high"/></section><AboutSection/><FeaturesSection/><ProductsSection/><SourcingSection/><MarketsSection/><FutureBanner/></main>;}
