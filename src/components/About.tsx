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

  const imgY1 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const headingLine1 = useContentValue("about", "heading_line1", "Every Frame");
  const headingLine2 = useContentValue("about", "heading_line2", "Tells a Story");
  const paragraph1 = useContentValue("about", "paragraph1", "Based in the heart of Nairobi, Oyange Photography has been crafting visual narratives for over a decade. We believe that every moment holds extraordinary beauty — it just needs the right eye to capture it.");
  const paragraph2 = useContentValue("about", "paragraph2", "From intimate weddings in the Rift Valley to high-end commercial campaigns, we bring cinematic vision and technical mastery to every project.");
  const stat1Num = useContentValue("about", "stat1_num", "200+");
  const stat1Label = useContentValue("about", "stat1_label", "Projects");
  const stat2Num = useContentValue("about", "stat2_num", "12");
  const stat2Label = useContentValue("about", "stat2_label", "Years");
  const stat3Num = useContentValue("about", "stat3_num", "50+");
  const stat3Label = useContentValue("about", "stat3_label", "Awards");
  const aboutImg1 = useContentValue("about", "about_img1", "");
  const aboutImg2 = useContentValue("about", "about_img2", "");

  const stats = [
    { num: stat1Num, label: stat1Label },
    { num: stat2Num, label: stat2Label },
    { num: stat3Num, label: stat3Label },
  ];

  return (
    <section id="about" ref={ref} className="py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
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
            <span className="text-secondary opacity-50 italic font-light">{headingLine2}</span>
          </h2>
          <div className="space-y-6 font-body text-foreground/70 text-lg leading-relaxed max-w-xl">
            <p>{paragraph1}</p>
            <p className="text-foreground/50">{paragraph2}</p>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (i * 0.1) }}
              >
                <div className="font-display text-4xl font-black text-primary tracking-tighter">{stat.num}</div>
                <div className="font-body text-[10px] tracking-[0.3em] uppercase text-foreground/40 mt-2 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="relative h-[600px] md:h-[700px] flex items-center justify-center">
          <motion.div 
            className="absolute top-0 right-0 w-4/5 rounded-2xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] z-0" 
            style={{ y: imgY1, scale: imgScale }}
          >
            <ProgressiveImage src={aboutImg1 || aboutImgDefault} alt="About Oyange" className="w-full h-[450px] object-cover" />
          </motion.div>
          <motion.div 
            className="absolute bottom-0 left-0 w-3/5 rounded-2xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] z-10 border border-white/5" 
            style={{ y: imgY2 }}
          >
            <ProgressiveImage src={aboutImg2 || portfolio2Default} alt="Oyange work" className="w-full h-[350px] object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
