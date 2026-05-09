import { useState, useMemo, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioItems } from "@/hooks/usePortfolio";
import ImageLightbox from "@/components/ImageLightbox";
import ProgressiveImage from "@/components/ProgressiveImage";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const defaultItems = [
  { image: portfolio1, title: "Sunset Vows", category: "Wedding", span: "md:col-span-2 md:row-span-2" },
  { image: portfolio2, title: "The Executive", category: "Portrait", span: "" },
  { image: portfolio3, title: "Saveur", category: "Commercial", span: "" },
  { image: portfolio4, title: "Masai Mara", category: "Landscape", span: "md:col-span-2" },
  { image: portfolio5, title: "Gala Night", category: "Commercial", span: "" },
  { image: portfolio6, title: "Silk & Shadow", category: "Fashion", span: "md:row-span-2" },
];

const PortfolioGrid = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { data: dbItems } = usePortfolioItems();
  const items = dbItems && dbItems.length > 0
    ? dbItems.map((i) => ({ image: i.image_url, title: i.title, category: i.category, span: i.span_class }))
    : defaultItems;

  const categories = useMemo(() => {
    const cats = Array.from(new Set(items.map((i) => i.category)));
    return ["All", ...cats];
  }, [items]);

  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? items : items.filter((i) => i.category === activeFilter);

  useEffect(() => {
    setLightboxIndex(0);
  }, [activeFilter]);

  return (
    <section id="portfolio" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">Portfolio</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground">Selected Works</h2>
      </motion.div>

      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`font-body text-xs tracking-widest uppercase px-5 py-2 rounded-full border transition-all duration-300 ${
              activeFilter === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div
              key={item.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`relative rounded-lg overflow-hidden group cursor-pointer ${item.span}`}
              data-cursor-view
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title} — ${item.category}`}
              onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLightboxIndex(i); setLightboxOpen(true); } }}
              onContextMenu={(e) => e.preventDefault()}
            >
              <ProgressiveImage
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110 protected-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="font-body text-xs tracking-widest uppercase text-primary">{item.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {lightboxOpen && filtered[lightboxIndex] && (
        <Helmet>
          <title>{`${filtered[lightboxIndex].title} | Portfolio | Oyange Photography`}</title>
          <meta property="og:title" content={`${filtered[lightboxIndex].title} | Portfolio | Oyange Photography`} />
          <meta property="og:image" content={filtered[lightboxIndex].image} />
        </Helmet>
      )}

      <ImageLightbox
        images={filtered.map((item) => ({ src: item.image, title: item.title, category: item.category }))}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
};

export default PortfolioGrid;
