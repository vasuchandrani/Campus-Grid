import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { CampusGridIdSection } from "./components/CampusGridIdSection";
import { CapabilitiesSection } from "./components/CapabilitiesSection";
import { ProductsSection } from "./components/ProductsSection";
import { StatsSection } from "./components/StatsSection";
import { BusinessValueSection } from "./components/BusinessValueSection";
import { ArchitectureSection } from "./components/ArchitectureSection";
import { RoadmapSection } from "./components/RoadmapSection";
import { CollegeBookSpotlightSection } from "./components/CollegeBookSpotlightSection";
import { SecuritySection } from "./components/SecuritySection";
import { FaqSection } from "./components/FaqSection";
import { FinalCtaSection } from "./components/FinalCtaSection";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <HowItWorksSection />
        <CampusGridIdSection />
        <CapabilitiesSection />
        <ProductsSection />
        <StatsSection />
        <BusinessValueSection />
        <ArchitectureSection />
        <RoadmapSection />
        <CollegeBookSpotlightSection />
        <SecuritySection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}
