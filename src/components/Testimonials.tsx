import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTestimonials } from "@/hooks/usePortfolio";

const defaultTestimonials = [
  { client_name: "Sarah & James", client_title: "Wedding Clients", quote: "Absolutely breathtaking work. Every photo tells the story of our special day perfectly." },
  { client_name: "Elena Rodriguez", client_title: "Fashion Designer", quote: "The editorial shots exceeded all expectations. True artistry behind the lens." },
  { client_name: "Marcus Chen", client_title: "CEO, Luxe Brands", quote: "Professional, creative, and incredibly easy to work with. Our brand imagery has never looked better." },
];

const getInitials = (name: string) => {
  if (!name) return "";
  return name
    .split(/[\s&]+/)
    .map((n) => n[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const Testimonials = () => {
  const { data: dbTestimonials } = useTestimonials();
  const testimonials = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : defaultTestimonials;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  useEffect(() => {
    if (!isPaused) startInterval();
    else if (intervalRef.current) clearInterval(intervalRef.current);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [testimonials.length, isPaused]);

  const handleDotClick = (i: number) => {
    setActiveIndex(i);
    startInterval();
  };

  const current = testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none">
        <span className="font-display text-[400px] leading-none text-primary">"</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center relative z-10"
      >
        <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4 font-bold">What They Say</p>
        <h2 className="font-display text-5xl md:text-7xl font-black text-foreground tracking-tighter">Kind Words</h2>
      </motion.div>

      <div
        className="relative min-h-[400px] flex items-center justify-center z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          <p className="font-display text-2xl md:text-5xl font-medium text-foreground/90 leading-[1.2] tracking-tight mb-12">
            "{current.quote}"
          </p>
          <div className="flex flex-col items-center">
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-[1px] w-12 bg-primary mb-6"
            />
            <motion.div
              key={`avatar-${activeIndex}`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-14 h-14 rounded-full border-2 border-primary/30 bg-primary/10 overflow-hidden flex items-center justify-center font-display text-sm text-primary font-bold mb-4"
            >
              {current.avatar_url ? (
                <img src={current.avatar_url} alt={current.client_name} className="w-full h-full object-cover" />
              ) : (
                getInitials(current.client_name)
              )}
            </motion.div>
            <h4 className="font-display text-xl font-bold text-foreground tracking-tight">{current.client_name}</h4>
            {current.client_title && (
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mt-2 font-medium">{current.client_title}</p>
            )}
          </div>
        </motion.div>
      </div>

      <div className="flex justify-center gap-3 mt-12 relative z-10">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className="group p-2"
            aria-label={`Go to testimonial ${i + 1}`}
          >
            <div className={`h-1 rounded-full transition-all duration-500 ${
              i === activeIndex ? "bg-primary w-12" : "bg-white/10 w-4 group-hover:bg-white/30"
            }`} />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
