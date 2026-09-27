import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useContentValue } from "@/hooks/useSiteContent";
import aboutImgDefault from "@/assets/about.jpg";
import portfolio2Default from "@/assets/portfolio-2.jpg";
import ProgressiveImage from "@/components/ProgressiveImage";

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const portraitY  = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const accentY    = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const textY      = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  const headingLine1 = useContentValue("about", "heading_line1", "This is");
  const headingLine2 = useContentValue("about", "heading_line2", "my Story");
  const paragraph1   = useContentValue("about", "paragraph1", "My name is Aquila Oyange. I'm a photographer and photo editor based in Nairobi, Kenya, and I shoot portraits, events and travel.");
  const paragraph2   = useContentValue("about", "paragraph2", "I'm driven by impact storytelling. Whether it's a graduate on the campus lawn, a policy launch in a packed hall or a hiking group at Elephant Hill summit, every shoot is a chance to document a story worth keeping.");
  const stat1Num     = useContentValue("about", "stat1_num", "");
  const stat1Label   = useContentValue("about", "stat1_label", "");
  const stat2Num     = useContentValue("about", "stat2_num", "");
  const stat2Label   = useContentValue("about", "stat2_label", "");
  const stat3Num     = useContentValue("about", "stat3_num", "");
  const stat3Label   = useContentValue("about", "stat3_label", "");
  const aboutImg1    = useContentValue("about", "about_img1", "");
  const aboutImg2    = useContentValue("about", "about_img2", "");

  // Stats only show once real numbers are entered in the admin; no invented defaults.
  const stats = [
    { num: stat1Num, label: stat1Label },
    { num: stat2Num, label: stat2Label },
    { num: stat3Num, label: stat3Label },
  ].filter((s) => s.num && s.label);

  return (
    <section id="about" ref={ref} className="py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* ── Left: text ── */}
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            className="h-[1px] w-20 bg-primary mb-8 origin-left"
          />
          <h2 className="font-display text-5xl md:text-7xl font-black text-foreground mb-8 leading-[1.1] tracking-tighter">
            {headingLine1}
            <br />
            <span className="text-primary/80 italic font-light">{headingLine2}</span>
          </h2>

          <div className="space-y-6 font-body text-foreground/70 text-lg leading-relaxed max-w-xl">
            <p>{paragraph1}</p>
            <p className="text-foreground/50">{paragraph2}</p>
          </div>

          {/* Stats — horizontal strip */}
          {stats.length > 0 && (
          <div className="mt-14 flex items-center gap-10 border-t border-border pt-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-4xl font-black text-primary tracking-tighter">{stat.num}</div>
                <div className="font-body text-[10px] tracking-[0.3em] uppercase text-foreground/40 mt-1 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          )}
        </motion.div>

        {/* ── Right: portrait-dominant image composition ── */}
        <div className="relative h-[620px] md:h-[720px]">

          {/* Decorative gold offset frame — sits behind the portrait */}
          <div
            className="absolute top-6 right-0 w-[78%] h-full rounded-2xl border border-primary/25 translate-x-3"
            aria-hidden="true"
          />

          {/* Portrait — dominant, tall, right-anchored */}
          <motion.div
            className="absolute top-0 right-0 w-[78%] h-full rounded-2xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]"
            style={{ y: portraitY }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProgressiveImage
              src={aboutImg2 || portfolio2Default}
              alt="Aquila Oyange, photographer"
              className="w-full h-full object-cover object-top"
            />
            {/* Subtle gradient at base so it bleeds into the background */}
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background/70 to-transparent" />
          </motion.div>

          {/* Accent landscape — small card, bottom-left, overlapping */}
          <motion.div
            className="absolute bottom-10 left-0 w-[46%] h-[210px] rounded-xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/8 z-10"
            style={{ y: accentY }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProgressiveImage
              src={aboutImg1 || aboutImgDefault}
              alt="From Aquila Oyange's hiking work"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Gold dot accent — top-left corner decoration */}
          <motion.div
            className="absolute top-4 left-6 z-20"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.6)]" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;
