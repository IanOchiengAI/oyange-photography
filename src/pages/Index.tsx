import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import useSmoothScroll from "@/hooks/useSmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageLoader from "@/components/PageLoader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import VideoReel from "@/components/VideoReel";
import PortfolioGrid from "@/components/PortfolioGrid";
import About from "@/components/About";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Packages from "@/components/Packages";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import InstagramCTA from "@/components/InstagramCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileBookCTA from "@/components/MobileBookCTA";

const Index = () => {
  useSmoothScroll();
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Helmet>
        <title>Oyange Photography | Premium Motion & Stills</title>
        <meta name="description" content="Professional photography and videography portfolio showcasing premium weddings, commercial work, and portraits." />
        <meta property="og:title" content="Oyange Photography | Premium Motion & Stills" />
        <meta property="og:description" content="Professional photography and videography portfolio showcasing premium weddings, commercial work, and portraits." />
        <meta property="og:type" content="website" />
      </Helmet>
      <PageLoader onComplete={handleLoaded} />
      
      <div 
        className={`transition-opacity duration-500 ease-in-out ${
          loaded ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
        }`}
        aria-hidden={!loaded}
      >
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <FeaturedWork />
          <VideoReel />
          <PortfolioGrid />
          <About />
          <Process />
          <Services />
          <Packages />
          <FAQ />
          <Testimonials />
          <InstagramCTA />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
        <MobileBookCTA />
      </div>
    </>
  );
};

export default Index;
