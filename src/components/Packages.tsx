import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProgressiveImage from "@/components/ProgressiveImage";
import { usePackages } from "@/hooks/usePortfolio";

// From Aquila's own price list (his previous Pixieset site).
const defaultPackages = [
  {
    name: "Outdoors",
    price_label: "From KShs 5,000",
    features: ["2-hour session", "20 edited photos", "Online gallery"],
    highlighted: false,
  },
  {
    name: "Events",
    price_label: "From KShs 6,000",
    features: ["Coverage of your event", "Online gallery"],
    highlighted: false,
  },
  {
    name: "Hikes & Safaris",
    price_label: "From KShs 12,000",
    features: ["One full day", "Unlimited photos", "Edited photos", "Short reel", "Online gallery"],
    highlighted: true,
  },
];

// Same photos Aquila used for each package on his previous site, where they exist.
const packageImages: Record<string, string> = {
  outdoors: "/portfolio/portraits/020.jpg",
  events: "/portfolio/events/006.jpg",
  "hikes & safaris": "/portfolio/adventure/007.jpg",
};

const Packages = () => {
  const { data: dbPackages } = usePackages();
  const packages = dbPackages && dbPackages.length > 0 ? dbPackages : defaultPackages;

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="packages" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14 md:mb-20 max-w-2xl"
      >
        <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-5">Packages</h2>
        <p className="font-body text-lg text-muted-foreground leading-relaxed">
          Starting prices. Tell me about your shoot and I'll quote you exactly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-border border-t border-border">
        {packages.map((pkg, i) => {
          const image = packageImages[pkg.name.toLowerCase()];
          return (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col pt-8 pb-12 md:px-8 border-b md:border-b-0 border-border"
            >
              {image && (
                <div className="aspect-[4/3] overflow-hidden mb-8">
                  <ProgressiveImage src={image} alt={`${pkg.name} shoot by Aquila Oyange`} className="w-full h-full object-cover" />
                </div>
              )}
              <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{pkg.name}</h3>
              <p className={`font-body text-xl mb-8 ${pkg.highlighted ? "text-primary" : "text-foreground/80"}`}>{pkg.price_label}</p>
              <ul className="divide-y divide-border border-y border-border mb-10 flex-1">
                {pkg.features.map((feature) => (
                  <li key={feature} className="py-3 font-body text-foreground/80">
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToContact}
                className={`group self-start inline-flex items-center gap-3 font-body text-sm px-7 py-3.5 rounded-full transition-colors duration-300 ${
                  pkg.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-foreground hover:text-background"
                    : "border border-border text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                Book this
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Packages;
