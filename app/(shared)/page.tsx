import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import DiscoverSection from "@/components/landing/DiscoverSection";
import CTASection from "@/components/landing/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <DiscoverSection />
      <CTASection />
    </div>
  );
}
