import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useFeaturedProjects } from "@/hooks/usePortfolio";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import ProgressiveImage from "@/components/ProgressiveImage";

const defaultProjects = [
  { image: portfolio1, title: "Eternal Bonds", category: "Wedding", year: "2024" },
  { image: portfolio4, title: "Golden Horizons", category: "Landscape", year: "2024" },
  { image: portfolio6, title: "Ethereal Grace", category: "Fashion", year: "2023" },
];

const ProjectItem = ({ project, index, total, scrollYProgress }: { project: any, index: number, total: number, scrollYProgress: any }) => {
  const xOffset = useTransform(
    scrollYProgress,
    [index / total, (index + 1) / total],
    ["-10%", "10%"]
  );

  return (
    <div className="w-screen h-screen flex items-center justify-center px-6 md:px-20 shrink-0">
      <div className="relative max-w-5xl w-full" data-cursor-view>
        <div className="rounded-lg overflow-hidden aspect-[16/10] relative group cursor-pointer shadow-2xl">
          <motion.div
            style={{ x: xOffset, scale: 1.1 }}
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="w-full h-full"
          >
            <ProgressiveImage 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" 
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] group-hover:backdrop-blur-0" />
        </div>
        <div className="mt-8 flex items-end justify-between">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="font-display text-4xl md:text-7xl font-black text-foreground tracking-tighter leading-none">{project.title}</h3>
            <div className="flex items-center gap-4 mt-4">
              <span className="h-[1px] w-12 bg-primary"></span>
              <p className="font-body text-xs tracking-[0.4em] uppercase text-primary/80">{project.category}</p>
            </div>
          </motion.div>
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-display text-xl font-light text-muted-foreground/30 hidden md:block italic"
          >
            {project.year}
          </motion.span>
        </div>
      </div>
    </div>
  );
};

const FeaturedWork = () => {
  const { data: dbProjects } = useFeaturedProjects();
  const projects = dbProjects && dbProjects.length > 0
    ? dbProjects.map((p) => ({ image: p.image_url, title: p.title, category: p.category, year: p.year }))
    : defaultProjects;

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(projects.length - 1) * 100}vw`]);

  return (
    <section ref={containerRef} className="relative" style={{ height: `${projects.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="absolute top-10 left-6 md:left-12 z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-body text-xs tracking-[0.3em] uppercase text-primary"
          >
            Featured Work
          </motion.p>
        </div>

        <motion.div className="flex" style={{ x }}>
          {projects.map((project, i) => (
            <ProjectItem 
              key={i} 
              project={project} 
              index={i} 
              total={projects.length} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWork;
