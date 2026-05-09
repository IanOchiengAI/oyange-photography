import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Heart, Building2, Sparkles, Image, Film, Globe, Users, Star } from "lucide-react";
import { useServices } from "@/hooks/usePortfolio";

const iconMap: Record<string, React.ComponentType<any>> = {
  Heart, Camera, Building2, Sparkles, Image, Film, Globe, Users, Star,
};

const defaultServices = [
  { icon_name: "Heart", title: "Weddings", description: "Timeless imagery for your most cherished day" },
  { icon_name: "Camera", title: "Portraits", description: "Editorial and personal portraits that reveal character" },
  { icon_name: "Building2", title: "Commercial", description: "Elevate your brand with cinematic visual content" },
  { icon_name: "Sparkles", title: "Fashion", description: "High-end editorial and lookbook photography" },
  { icon_name: "Image", title: "Product", description: "Stunning product imagery that drives conversion" },
  { icon_name: "Film", title: "Film & Video", description: "Motion content that captivates and inspires" },
];

const TiltCard = ({ service }: { service: { icon_name: string; title: string; description: string } }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Rotation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);

    // Glare
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15
    });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg)");
    setGlarePosition(prev => ({ ...prev, opacity: 0 }));
  };

  const Icon = iconMap[service.icon_name] || Camera;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass relative rounded-xl p-8 card-lift group"
      style={{ transform, transition: "transform 0.15s ease-out" }}
    >
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-xl"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.4) 0%, transparent 80%)`,
          opacity: glarePosition.opacity
        }}
      />
      <Icon className="w-8 h-8 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
      <h3 className="font-display text-xl font-bold text-foreground mb-3">{service.title}</h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">{service.description}</p>
    </motion.div>
  );
};

const Services = () => {
  const { data: dbServices } = useServices();
  const services = dbServices && dbServices.length > 0 ? dbServices : defaultServices;

  return (
    <section id="services" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">What We Do</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground">Our Services</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <TiltCard key={s.title} service={s} />
        ))}
      </div>
    </section>
  );
};

export default Services;
