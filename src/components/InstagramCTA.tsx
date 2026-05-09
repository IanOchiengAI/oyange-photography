import { motion } from "framer-motion";
import { Instagram, ArrowRight } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const previewImages = [portfolio1, portfolio2, portfolio3, portfolio4, portfolio5, portfolio6];

const INSTAGRAM_URL = "https://www.instagram.com/oyange_/";
const INSTAGRAM_HANDLE = "@oyange_";

const InstagramCTA = () => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="glass rounded-3xl p-10 md:p-16 border border-white/5 relative overflow-hidden">
        {/* Background image mosaic — decorative */}
        <div className="absolute inset-0 grid grid-cols-6 opacity-[0.06] pointer-events-none" aria-hidden="true">
          {previewImages.map((img, i) => (
            <img key={i} src={img} alt="" className="w-full h-full object-cover" />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60" aria-hidden="true" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center md:text-left"
          >
            <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center shrink-0">
                <Instagram className="w-5 h-5 text-white" />
              </div>
              <span className="font-body text-xs tracking-[0.3em] uppercase text-primary font-bold">Follow Along</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-[1.05] mb-4">
              Behind the Lens,<br />
              <span className="text-primary italic font-light">Every Day</span>
            </h2>
            <p className="font-body text-muted-foreground max-w-md leading-relaxed">
              New shoots, behind-the-scenes moments, and work fresh from the edit — follow us on Instagram to stay connected.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-5 shrink-0"
          >
            <p className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              {INSTAGRAM_HANDLE}
            </p>
            <motion.a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 font-body text-sm tracking-widest uppercase bg-primary text-primary-foreground px-8 py-4 rounded-full hover:bg-foreground transition-colors duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Follow on Instagram
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InstagramCTA;
