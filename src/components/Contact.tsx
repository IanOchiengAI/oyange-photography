import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useContentValue } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Contact = () => {
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const headingLine1 = useContentValue("contact", "heading_line1", "Tell me about");
  const headingLine2 = useContentValue("contact", "heading_line2", "your shoot");
  const address = useContentValue("contact", "address", "Nairobi, Kenya");
  const email = useContentValue("contact", "email", "martinaquila5@gmail.com");
  const phone = useContentValue("contact", "phone", "+254 717 393 576");

  const [formData, setFormData] = useState({ name: "", email: "", project_type: "", message: "", website: "" });
  const [submitting, setSubmitting] = useState(false);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check (SEC-003)
    if (formData.website) {
      console.warn("Spam detected.");
      return;
    }

    // Input validation & length limits (SEC-004)
    if (formData.name.length > 100 || formData.email.length > 255 || 
        formData.project_type.length > 100 || formData.message.length > 2000) {
      toast.error("Input exceeds maximum allowed length.");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: formData.name.trim(),
      email: formData.email.trim(),
      project_type: formData.project_type.trim() || null,
      message: formData.message.trim() || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Failed to send message. Please try again.");
      return;
    }
    setSubmitted(true);
    setFormData({ name: "", email: "", project_type: "", message: "", website: "" });
    resetTimeoutRef.current = setTimeout(() => setSubmitted(false), 3000);
  };

  const inputClass = (name: string) =>
    `w-full bg-transparent border-b font-body text-foreground placeholder:text-muted-foreground py-3 outline-none transition-colors duration-300 ${
      focused === name ? "border-primary" : "border-border"
    }`;

  return (
    <section id="contact" className="py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-[1.05]">
            {headingLine1}
            <br />
            <span className="text-primary">{headingLine2}</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-md mb-12">
            WhatsApp is the quickest way to reach me. The form works too.
          </p>

          <dl className="divide-y divide-border border-y border-border max-w-md">
            <div className="py-4 flex justify-between gap-6">
              <dt className="font-body text-muted-foreground">WhatsApp / phone</dt>
              <dd><a href={`tel:${phone.replace(/\s/g, "")}`} className="font-body text-foreground hover:text-primary transition-colors">{phone}</a></dd>
            </div>
            <div className="py-4 flex justify-between gap-6">
              <dt className="font-body text-muted-foreground">Email</dt>
              <dd><a href={`mailto:${email}`} className="font-body text-foreground hover:text-primary transition-colors break-all">{email}</a></dd>
            </div>
            <div className="py-4 flex justify-between gap-6">
              <dt className="font-body text-muted-foreground">Based in</dt>
              <dd className="font-body text-foreground">{address}</dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="h-full min-h-[400px] flex items-center justify-center border-y border-border"
            >
              <div className="text-center p-12">
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-8"
                >
                  <span className="text-black text-4xl">✓</span>
                </motion.div>
                <h3 className="font-display text-4xl font-black text-foreground tracking-tighter">Inquiry Received</h3>
                <p className="font-body text-foreground/50 mt-4 leading-relaxed">
                  Thank you for reaching out. I'll read your message and get back to you as soon as I can.
                </p>
                <div className="h-[1px] w-16 bg-primary/30 mx-auto my-6" />
                <p className="text-sm text-foreground/60 mb-6 font-body">Want a faster response?</p>
                <motion.a
                  href={`https://wa.me/254717393576?text=${encodeURIComponent(
                    `Hi Aquila! I just sent an inquiry through your website for a ${formData.project_type || "photography"} project and wanted to follow up.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-body text-sm font-medium hover:bg-[#20bd5a] transition-colors shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="w-5 h-5" fill="white" />
                  Chat on WhatsApp
                </motion.a>
              </div>
            </motion.div>
          ) : (
            <div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                {/* Honeypot field - visually hidden */}
                <div className="absolute opacity-0 -z-10 w-0 h-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={(e) => setFormData(p => ({ ...p, website: e.target.value }))} />
                </div>
                <div className="col-span-1">
                  <label htmlFor="contact-name" className="font-body text-sm text-muted-foreground mb-2 block">Your name</label>
                  <input type="text" id="contact-name" required maxLength={100} value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} className={inputClass("name")} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
                </div>
                <div className="col-span-1">
                  <label htmlFor="contact-email" className="font-body text-sm text-muted-foreground mb-2 block">Email</label>
                  <input type="email" id="contact-email" required maxLength={255} value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} className={inputClass("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="contact-project" className="font-body text-sm text-muted-foreground mb-2 block">What kind of shoot?</label>
                  <select
                    id="contact-project"
                    value={formData.project_type}
                    onChange={(e) => setFormData(p => ({ ...p, project_type: e.target.value }))}
                    onFocus={() => setFocused("project")}
                    onBlur={() => setFocused(null)}
                    className={`${inputClass("project")} bg-transparent appearance-none`}
                  >
                    <option value="" disabled className="bg-background text-muted-foreground">Select a service...</option>
                    <option value="Portraits" className="bg-background">Portraits</option>
                    <option value="Couples" className="bg-background">Couples</option>
                    <option value="Graduation" className="bg-background">Graduation</option>
                    <option value="Events" className="bg-background">Events</option>
                    <option value="Hikes & Safaris" className="bg-background">Hikes & Safaris</option>
                    <option value="Product" className="bg-background">Product</option>
                    <option value="Other" className="bg-background">Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="contact-message" className="font-body text-sm text-muted-foreground mb-2 block">Anything else? Date, place, ideas</label>
                  <textarea id="contact-message" rows={4} maxLength={2000} value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} className={`${inputClass("message")} resize-none`} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} />
                </div>
                <div className="md:col-span-2">
                  <button 
                    type="submit" 
                    disabled={submitting} 
                    className="group w-full flex items-center justify-center gap-4 font-body text-sm font-semibold bg-primary text-black px-10 py-5 rounded-full hover:bg-white transition-colors duration-300 disabled:opacity-50 mt-4"
                  >
                    {submitting ? "Sending..." : "Send Message"}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
