import { motion } from "framer-motion";
import ProgressiveImage from "@/components/ProgressiveImage";

const steps = [
  { title: "Say hello.", text: "Message me on WhatsApp or use the form below. Tell me what you have in mind and the date." },
  { title: "We plan it.", text: "Package, place and time: a studio, your campus, your venue or a trail." },
  { title: "We shoot.", text: "I guide you through it so you can relax. Real moments make the best pictures." },
  { title: "You get your gallery.", text: "I edit every photo myself and send an online gallery you can download and share." },
];

const Process = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 aspect-[3/2] overflow-hidden"
        >
          <ProgressiveImage
            src="/portfolio/adventure/009.jpg"
            alt="A hiking group gathered for the briefing before the climb"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-10">From hello to gallery</h2>
          <dl className="divide-y divide-border border-y border-border">
            {steps.map((step) => (
              <div key={step.title} className="py-5 md:grid md:grid-cols-[11rem_1fr] md:gap-6">
                <dt className="font-display text-lg font-bold text-foreground mb-1 md:mb-0">{step.title}</dt>
                <dd className="font-body text-muted-foreground leading-relaxed">{step.text}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
