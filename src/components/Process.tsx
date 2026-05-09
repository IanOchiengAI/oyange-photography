import { motion } from "framer-motion";
import { MessageCircle, Lightbulb, Camera, ImageIcon } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Consultation",
    description: "We start with a conversation — your vision, your story, your goals. No pressure, just clarity. This shapes everything that follows.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Creative Direction",
    description: "We develop a detailed mood board, location scouting plan, and shot list. You'll know exactly what to expect before we ever pick up a camera.",
  },
  {
    number: "03",
    icon: Camera,
    title: "The Shoot",
    description: "On the day, we handle every detail so you can simply be present. Our direction is relaxed, our eye is always on. This is where the magic happens.",
  },
  {
    number: "04",
    icon: ImageIcon,
    title: "Gallery Delivery",
    description: "Every image is hand-edited to match our signature aesthetic. Your private online gallery is delivered within the agreed timeframe — ready to treasure.",
  },
];

const Process = () => {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center"
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">The Experience</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground">How We Work Together</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
        {/* Connecting line — desktop only */}
        <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative text-center lg:text-left"
            >
              <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6 mx-auto lg:mx-0">
                <div className="absolute inset-0 rounded-full border border-primary/20 bg-primary/5" />
                <Icon className="w-7 h-7 text-primary relative z-10" strokeWidth={1.5} />
                <span className="absolute -top-2 -right-2 font-display text-xs font-black text-primary/40 tracking-tight">
                  {step.number}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Process;
