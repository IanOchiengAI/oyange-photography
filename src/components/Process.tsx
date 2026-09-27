import { motion } from "framer-motion";
import { MessageCircle, Lightbulb, Camera, ImageIcon } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Say Hello",
    description: "Send me a message on WhatsApp or through the form below. Tell me what you have in mind and the date you're thinking of.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Plan the Shoot",
    description: "We agree on the package, the location and the time, whether that's a studio, your campus, your event venue or a trail.",
  },
  {
    number: "03",
    icon: Camera,
    title: "The Shoot",
    description: "I guide you through it so you can relax and be yourself. Real moments make the best pictures.",
  },
  {
    number: "04",
    icon: ImageIcon,
    title: "Your Gallery",
    description: "I edit the photos myself and deliver them in an online gallery you can download and share.",
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
        <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">How It Works</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground">From Hello to Gallery</h2>
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
