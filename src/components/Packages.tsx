import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { usePackages } from "@/hooks/usePortfolio";

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
    features: ["Full event coverage", "Nicely edited photos", "Online gallery"],
    highlighted: false,
  },
  {
    name: "Hikes & Safaris",
    price_label: "From KShs 12,000",
    features: ["Full-day coverage", "Unlimited photos", "Nicely edited photos", "Cinematic reel", "Online gallery"],
    highlighted: true,
  },
];

const comparisonFeatures = [
  { name: "Session Duration", outdoors: "2 hours", events: "Full event", safaris: "Full day" },
  { name: "Photos Delivered", outdoors: "20", events: "Custom", safaris: "Unlimited" },
  { name: "Edited Photos", outdoors: true, events: true, safaris: true },
  { name: "Online Gallery", outdoors: true, events: true, safaris: true },
  { name: "Cinematic Reel", outdoors: false, events: false, safaris: true },
  { name: "Day Coverage", outdoors: false, events: true, safaris: true },
];

const Packages = () => {
  const { data: dbPackages } = usePackages();
  const packages = dbPackages && dbPackages.length > 0 ? dbPackages : defaultPackages;

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="packages" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">Investment</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground">Our Packages</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`relative rounded-2xl p-8 md:p-10 card-lift transition-all duration-500 ${
              pkg.highlighted
                ? "bg-primary/[0.03] border-[1.5px] border-primary shadow-[0_0_40px_-15px_hsl(var(--primary)/0.3)]"
                : "glass border border-white/5"
            }`}
          >
            {pkg.highlighted && (
              <motion.div 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-0 -top-[1.5px] h-[1.5px] bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            )}
            {pkg.highlighted && (
              <span className="absolute -top-4 left-10 bg-primary text-primary-foreground font-body text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full shadow-lg">
                Most Popular
              </span>
            )}
            <h3 className="font-display text-4xl font-black text-foreground tracking-tighter mb-1 mt-2">{pkg.name}</h3>
            <p className="font-body text-primary text-xl font-bold mb-8">{pkg.price_label}</p>
            <ul className="space-y-4 mb-10">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 font-body text-sm text-foreground/80 leading-snug">
                  <div className="mt-1 bg-primary/20 rounded-full p-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={scrollToContact}
              className={`group w-full flex items-center justify-center gap-3 font-body text-xs font-bold tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-all duration-500 ${
                pkg.highlighted
                  ? "bg-primary text-primary-foreground hover:bg-white hover:text-black shadow-xl"
                  : "border border-white/10 text-foreground hover:bg-white hover:text-black hover:border-white"
              }`}
            >
              Reserve Your Date
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-24"
      >
        <div className="text-center mb-12">
          <h3 className="font-display text-3xl font-bold text-foreground">Compare Packages</h3>
        </div>

        {/* Mobile: stacked feature cards */}
        <div className="md:hidden space-y-3">
          <div className="grid grid-cols-3 gap-2 px-1 mb-4">
            <p className="text-center font-display text-xs font-bold text-foreground/70">Outdoors</p>
            <p className="text-center font-display text-xs font-bold text-primary">Events</p>
            <p className="text-center font-display text-xs font-bold text-foreground/70">Hikes & Safaris</p>
          </div>
          {comparisonFeatures.map((feature, idx) => (
            <div key={idx} className="glass rounded-xl border border-white/5 px-4 py-3">
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground/40 font-bold mb-3">{feature.name}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="flex justify-center">
                  {typeof feature.outdoors === 'boolean'
                    ? (feature.outdoors ? <Check className="w-4 h-4 text-primary" /> : <span className="font-body text-sm text-muted-foreground">—</span>)
                    : <span className="font-body text-xs text-muted-foreground">{feature.outdoors}</span>}
                </div>
                <div className="flex justify-center">
                  {typeof feature.events === 'boolean'
                    ? (feature.events ? <Check className="w-4 h-4 text-primary" /> : <span className="font-body text-sm text-muted-foreground">—</span>)
                    : <span className="font-body text-xs text-foreground">{feature.events}</span>}
                </div>
                <div className="flex justify-center">
                  {typeof feature.safaris === 'boolean'
                    ? (feature.safaris ? <Check className="w-4 h-4 text-primary" /> : <span className="font-body text-sm text-muted-foreground">—</span>)
                    : <span className="font-body text-xs text-muted-foreground">{feature.safaris}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: full table */}
        <div className="hidden md:block overflow-x-auto pb-6">
          <div className="min-w-[800px] glass rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary/5 border-b border-white/10">
                  <th className="p-6 font-display text-lg font-bold text-foreground">Features</th>
                  <th className="p-6 font-display text-lg font-bold text-foreground">Outdoors</th>
                  <th className="p-6 font-display text-lg font-bold text-primary">Events</th>
                  <th className="p-6 font-display text-lg font-bold text-foreground">Hikes & Safaris</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonFeatures.map((feature, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 font-body text-sm font-medium text-foreground/80">{feature.name}</td>
                    <td className="p-6 font-body text-sm text-muted-foreground">
                      {typeof feature.outdoors === 'boolean' ? (feature.outdoors ? <Check className="w-4 h-4 text-primary" /> : "—") : feature.outdoors}
                    </td>
                    <td className="p-6 font-body text-sm text-foreground">
                      {typeof feature.events === 'boolean' ? (feature.events ? <Check className="w-4 h-4 text-primary" /> : "—") : feature.events}
                    </td>
                    <td className="p-6 font-body text-sm text-muted-foreground">
                      {typeof feature.safaris === 'boolean' ? (feature.safaris ? <Check className="w-4 h-4 text-primary" /> : "—") : feature.safaris}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Packages;
