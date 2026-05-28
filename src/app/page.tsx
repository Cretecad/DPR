import EditorialNav from "@/components/navigation/EditorialNav";
import AtlasHero from "@/components/hero/AtlasHero";

import TrustStrip from "@/components/sections/TrustStrip";
import MarketTicker from "@/components/sections/MarketTicker";
import IdentitySection from "@/components/sections/IdentitySection";
import OpportunityAtlas from "@/components/sections/OpportunityAtlas";
import PropertyShowcase from "@/components/sections/PropertyShowcase";
import VerificationSection from "@/components/sections/VerificationSection";
import ConsultationSection from "@/components/sections/ConsultationSection";
import LegacySection from "@/components/sections/LegacySection";

import Footer from "@/components/layout/Footer";

import { getPublishedProperties } from "@/lib/properties";

import "./home.css";

export default async function HomePage() {
  const properties = await getPublishedProperties();

  return (
    <main className="dpr-home">
      <EditorialNav />

      <AtlasHero />

      <TrustStrip />

      <MarketTicker />

      <IdentitySection />

      <OpportunityAtlas />

      <PropertyShowcase properties={properties} />

      <VerificationSection />

      <ConsultationSection />

      <LegacySection />

      <Footer />
    </main>
  );
}