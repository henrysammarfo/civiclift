import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ImpactSection from "@/components/ImpactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div
        className="transition-opacity duration-500 ease-out"
        style={{ opacity: isLoading ? 0 : 1 }}
      >
        <Navbar />
        <Hero />
        <HowItWorks />
        <ImpactSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
