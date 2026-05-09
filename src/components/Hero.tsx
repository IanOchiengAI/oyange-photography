import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useContentValue } from "@/hooks/useSiteContent";
import heroBgDefault from "@/assets/hero-bg.jpg";
import heroMidDefault from "@/assets/hero-mid.jpg";
import ProgressiveImage from "@/components/ProgressiveImage";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const headlineRaw = useContentValue("hero", "headline", "Capturing Light, Crafting Legacy");
  const headlineWords = headlineRaw.split(",").map((w) => w.trim()).filter(Boolean);
  const displayWords = headlineWords.map((w, i) => i < headlineWords.length - 1 ? w + "," : w);

  const location = useContentValue("hero", "location", "Nairobi, Kenya");
  const subtitle = useContentValue("hero", "subtitle", "Premium photography for those who demand excellence");
  const heroBg = useContentValue("hero", "hero_bg", "");
  const heroMid = useContentValue("hero", "hero_mid", "");
  const trustText = useContentValue("hero", "trust_text", "Trusted by 200+ clients across East Africa");

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center">
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-background/40 z-10" />
        <ProgressiveImage src={heroMid || heroMidDefault} alt="" className="w-full h-[120%] object-cover" loading="eager" />
      </motion.div>

      <motion.div className="absolute inset-0 z-[1]" style={{ y: midY }}>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent z-10" />
        <ProgressiveImage src={heroBg || heroBgDefault} alt="" className="w-full h-[115%] object-cover opacity-30" loading="eager" />
      </motion.div>

      <motion.div className="relative z-10 text-center px-6" style={{ y: textY, opacity }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-6"
        >
          {location}
        </motion.p>

        <h1 className="font-display text-5xl md:text-7xl lg:text-9xl font-extrabold leading-[1.05] tracking-tight mb-8">
          {displayWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-4 align-bottom">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ 
                  delay: 0.5 + i * 0.1, 
                  duration: 1, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className={`inline-block ${i >= displayWords.length - 2 ? "text-gradient italic" : "text-foreground"}`}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="font-body text-muted-foreground text-lg md:text-xl max-w-lg mx-auto mb-6"
        >
          {subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground/60 mb-10"
        >
          {trustText}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          onClick={scrollToContact}
          className="group inline-flex items-center gap-3 font-body text-sm tracking-widest uppercase bg-primary text-primary-foreground px-8 py-4 rounded-full hover:bg-foreground transition-colors duration-300"
        >
          Book a Session
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">Scroll</span>
        <motion.div
          className="w-[1px] h-10 bg-primary"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
