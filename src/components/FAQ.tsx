import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How far in advance should I book?",
    a: "For weddings, we recommend 6–12 months in advance, especially for peak season (December–January and July–August). For portraits and commercial shoots, 4–6 weeks is usually enough. That said, reach out regardless — we'll always do our best to accommodate you.",
  },
  {
    q: "Do you travel outside Nairobi?",
    a: "Absolutely. We regularly shoot across Kenya — Mombasa, Kisumu, the Rift Valley, Masai Mara, and beyond. International travel is available for destination weddings and editorial campaigns. Travel logistics are discussed during consultation.",
  },
  {
    q: "How long until we receive our photos?",
    a: "Portrait sessions are typically delivered within 7–10 working days. Weddings and full-day events take 3–5 weeks. We hand-edit every image to our signature standard — we don't rush quality. Rush delivery may be arranged for an additional fee.",
  },
  {
    q: "What happens if you're sick on our wedding day?",
    a: "In the unlikely event of an emergency, we have a trusted network of professional photographers we partner with. You will always have coverage. We've never missed a wedding in over a decade, and we intend to keep it that way.",
  },
  {
    q: "Do you shoot in RAW? Can I have the RAW files?",
    a: "Yes, we shoot entirely in RAW format for maximum quality and editing latitude. The delivered gallery contains fully edited JPEGs. RAW files are not included as standard — they represent incomplete work — but can be licensed separately if needed.",
  },
  {
    q: "What is your payment and deposit structure?",
    a: "We require a 30% non-refundable deposit to secure your date, with the balance due 7 days before the shoot. We accept M-Pesa, bank transfer, and major cards. All bookings are confirmed with a signed contract.",
  },
  {
    q: "Can we order prints through you?",
    a: "Yes. We partner with premium fine art print labs for canvas, acrylic, and archival paper prints. Print packages can be added to any booking, or ordered separately after delivery. We handle everything — framing options are available too.",
  },
  {
    q: "Do you offer videography as well?",
    a: "Yes. We offer cinematic highlight films, full ceremony edits, and short-form social content. Video can be booked as a standalone service or bundled with photography for a cohesive visual story of your event.",
  },
];

const FAQItem = ({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) => (
  <div className="border-b border-border">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-6 text-left group"
      aria-expanded={isOpen}
    >
      <span className="font-display text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 pr-6">
        {q}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="shrink-0 w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center"
        aria-hidden="true"
      >
        <Plus className="w-4 h-4 text-primary" />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <p className="font-body text-muted-foreground leading-relaxed pb-6 max-w-3xl">
            {a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:sticky lg:top-32 lg:self-start"
        >
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            className="h-[1px] w-20 bg-primary mb-8 origin-left"
          />
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">Before You Book</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-foreground leading-[1.05] tracking-tighter mb-6">
            Questions<br />
            <span className="text-primary italic font-light">Answered</span>
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed">
            Everything you need to know before we work together. Don't see your question?{" "}
            <a href="#contact" className="text-primary hover:underline transition-colors">
              Just ask.
            </a>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-2"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
