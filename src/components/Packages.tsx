import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { usePackages } from "@/hooks/usePortfolio";

const defaultPackages = [
  {
    name: "Essential",
    price_label: "From KSh 15,000",
    features: ["2-hour session", "30 edited photos", "Online gallery", "1 outfit change"],
    highlighted: false,
  },
  {
    name: "Premium",
    price_label: "From KSh 35,000",
    features: ["4-hour session", "80 edited photos", "Online gallery", "3 outfit changes", "2 locations", "Behind-the-scenes reel"],
    highlighted: true,
  },
  {
    name: "Signature",
    price_label: "From KSh 65,000",
    features: ["Full-day coverage", "200+ edited photos", "Online gallery", "Unlimited outfits", "Multiple locations", "Short film", "Fine art prints"],
    highlighted: false,
  },
  {
    name: "Corporate",
    price_label: "Custom Quote",
    features: ["Custom coverage duration", "Unlimited edited photos", "Online gallery", "Multiple locations", "Custom video content", "Fine art prints", "Dedicated account manager"],
    highlighted: false,
  },
];

const comparisonFeatures = [
  { name: "Session Duration", essential: "2 hours", premium: "4 hours", signature: "Full-day", corporate: "Custom" },
  { name: "Edited Photos", essential: "30", premium: "80", signature: "200+", corporate: "Custom" },
  { name: "Online Gallery", essential: true, premium: true, signature: true, corporate: true },
  { name: "Outfit Changes", essential: "1", premium: "3", signature: "Unlimited", corporate: "Custom" },
  { name: "Locations", essential: "1", premium: "2", signature: "Multiple", corporate: "Multiple" },
  { name: "Video Content", essential: false, premium: "BTS Reel", signature: "Short Film", corporate: "Custom" },
  { name: "Fine Art Prints", essential: false, premium: false, signature: true, corporate: "Custom" },
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

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
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
        
        <div className="overflow-x-auto pb-6">
          <div className="min-w-[800px] glass rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary/5 border-b border-white/10">
                  <th className="p-6 font-display text-lg font-bold text-foreground">Features</th>
                  <th className="p-6 font-display text-lg font-bold text-foreground">Essential</th>
                  <th className="p-6 font-display text-lg font-bold text-foreground text-primary">Premium</th>
                  <th className="p-6 font-display text-lg font-bold text-foreground">Signature</th>
                  <th className="p-6 font-display text-lg font-bold text-foreground">Corporate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonFeatures.map((feature, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 font-body text-sm font-medium text-foreground/80">{feature.name}</td>
                    <td className="p-6 font-body text-sm text-muted-foreground">
                      {typeof feature.essential === 'boolean' ? (feature.essential ? <Check className="w-4 h-4 text-primary" /> : "—") : feature.essential}
                    </td>
                    <td className="p-6 font-body text-sm text-foreground">
                      {typeof feature.premium === 'boolean' ? (feature.premium ? <Check className="w-4 h-4 text-primary" /> : "—") : feature.premium}
                    </td>
                    <td className="p-6 font-body text-sm text-muted-foreground">
                      {typeof feature.signature === 'boolean' ? (feature.signature ? <Check className="w-4 h-4 text-primary" /> : "—") : feature.signature}
                    </td>
                    <td className="p-6 font-body text-sm text-muted-foreground">
                      {typeof feature.corporate === 'boolean' ? (feature.corporate ? <Check className="w-4 h-4 text-primary" /> : "—") : feature.corporate}
                    </td>
                  </tr>
                ))}
                <tr className="bg-white/[0.02]">
                  <td className="p-6"></td>
                  <td className="p-6"></td>
                  <td className="p-6"></td>
                  <td className="p-6"></td>
                  <td className="p-6">
                    <button onClick={scrollToContact} className="font-body text-xs font-bold tracking-[0.2em] uppercase px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-white hover:text-black transition-colors w-full text-center">
                      Let's Talk
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Packages;
