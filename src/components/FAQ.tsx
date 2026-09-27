import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

// Only answers the site can stand behind. Add more (delivery times, deposits, payment) once Aquila confirms them.
const faqs = [
  {
    q: "How do I book a session?",
    a: "Send me a message on WhatsApp or fill in the form at the bottom of this page with the kind of shoot and the date you have in mind. I'll confirm availability and the details from there.",
  },
  {
    q: "How much does a shoot cost?",
    a: "Outdoor sessions start from KShs 5,000, events from KShs 6,000, and a full day of hikes and safaris from KShs 12,000. The exact price depends on what you need, so tell me about your shoot and I'll quote you.",
  },
  {
    q: "Do you travel outside Nairobi?",
    a: "Yes. Hikes and safaris are a big part of my work, and I'm happy to travel for other shoots too. Travel costs are agreed before the day.",
  },
  {
    q: "How will I get my photos?",
    a: "Every package includes an online gallery where you can view, download and share your edited photos.",
  },
  {
    q: "Can you photograph our organisation's event?",
    a: "Yes. I cover launches, conferences, panels and performances, from speakers at the podium to the conversations in between.",
  },
  {
    q: "Do you shoot graduations?",
    a: "Yes, graduations are one of my favourite shoots. We can do portraits of you in your gown around campus and photos with your family and friends.",
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
            The things people usually ask first. Don't see your question?{" "}
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
