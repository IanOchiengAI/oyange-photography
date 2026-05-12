import { useRef, useEffect, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { useFeaturedProjects } from "@/hooks/usePortfolio";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import ProgressiveImage from "@/components/ProgressiveImage";

const defaultProjects = [
  { image: portfolio1, title: "Eternal Bonds", category: "Wedding", year: "2024" },
  { image: portfolio4, title: "Golden Horizons", category: "Landscape", year: "2024" },
  { image: portfolio6, title: "Ethereal Grace", category: "Fashion", year: "2023" },
];

const CARD_WIDTH = 380;   // px per card
const CARD_GAP = 24;      // gap between cards
const SPEED = 0.4;        // px per frame (~24px/s at 60fps)

const FeaturedWork = () => {
  const { data: dbProjects } = useFeaturedProjects();
  const projects = dbProjects && dbProjects.length > 0
    ? dbProjects.map((p) => ({ image: p.image_url, title: p.title, category: p.category, year: p.year }))
    : defaultProjects;

  // Duplicate for seamless loop
  const items = [...projects, ...projects, ...projects];
  const singleSetWidth = projects.length * (CARD_WIDTH + CARD_GAP);

  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const [paused, setPaused] = useState(false);

  // Auto-scroll animation
  useAnimationFrame(() => {
    if (paused) return;
    offsetRef.current -= SPEED;
    // Reset seamlessly when one full set has scrolled past
    if (Math.abs(offsetRef.current) >= singleSetWidth) {
      offsetRef.current += singleSetWidth;
    }
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
    }
  });

  // Touch/swipe support
  const touchStartX = useRef(0);
  const touchDeltaRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchDeltaRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientX - touchStartX.current;
    touchDeltaRef.current = delta;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${offsetRef.current + delta}px)`;
    }
  };

  const handleTouchEnd = () => {
    offsetRef.current += touchDeltaRef.current;
    // Normalize offset
    if (Math.abs(offsetRef.current) >= singleSetWidth) {
      offsetRef.current += singleSetWidth;
    }
    if (offsetRef.current > 0) {
      offsetRef.current -= singleSetWidth;
    }
    setPaused(false);
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">
            Featured Work
          </p>
          <div className="h-[1px] w-16 bg-primary/40" />
        </motion.div>
      </div>

      {/* Carousel track */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left fade */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
        {/* Right fade */}
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />

        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ gap: `${CARD_GAP}px` }}
        >
          {items.map((project, i) => (
            <div
              key={i}
              className="group shrink-0 relative"
              style={{ width: `${CARD_WIDTH}px` }}
              data-cursor-view
            >
              <div className="rounded-lg overflow-hidden aspect-[3/4] relative shadow-2xl">
                <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                  <ProgressiveImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl font-black text-white tracking-tight leading-none mb-3">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="h-[1px] w-8 bg-primary" />
                    <p className="font-body text-[10px] tracking-[0.4em] uppercase text-primary/90">
                      {project.category}
                    </p>
                    <span className="font-body text-xs text-white/30 ml-auto italic">
                      {project.year}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
