import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import {
  Architecture,
  BusinessValue,
  CampusGridId,
  Capabilities,
  CollegeBookSpotlight,
  Faq,
  FinalCta,
  HowItWorks,
  Products,
  Roadmap,
  Security,
  Stats,
} from "./components/sections";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <CampusGridId />
        <Capabilities />
        <Products />
        <Stats />
        <BusinessValue />
        <Architecture />
        <Roadmap />
        <CollegeBookSpotlight />
        <Security />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
