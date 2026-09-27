import { useState, useMemo, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioItems } from "@/hooks/usePortfolio";
import ImageLightbox from "@/components/ImageLightbox";
import ProgressiveImage from "@/components/ProgressiveImage";
import { portfolioPhotos } from "@/data/portfolio";

const PAGE_SIZE = 12;

const PortfolioGrid = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { data: dbItems } = usePortfolioItems();
  const items = dbItems && dbItems.length > 0
    ? dbItems.map((i) => ({ image: i.image_url, title: i.title, category: i.category, span: i.span_class }))
    : portfolioPhotos;

  const categories = useMemo(() => {
    const cats = Array.from(new Set(items.map((i) => i.category)));
    return ["All", ...cats];
  }, [items]);

  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const filtered = activeFilter === "All" ? items : items.filter((i) => i.category === activeFilter);
  const visible = filtered.slice(0, visibleCount);

  useEffect(() => {
    setLightboxIndex(0);
    setVisibleCount(PAGE_SIZE);
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

      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[280px] grid-flow-row-dense">
        <AnimatePresence mode="popLayout">
          {visible.map((item, i) => (
            <motion.div
              key={item.image}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: (i % PAGE_SIZE) * 0.05 }}
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
                  <h3 className="font-display text-base md:text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="font-body text-xs tracking-widest uppercase text-primary">{item.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visibleCount < filtered.length && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
            className="font-body text-xs tracking-widest uppercase px-8 py-3 rounded-full border border-primary/40 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
          >
            Show more ({filtered.length - visibleCount})
          </button>
        </div>
      )}

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
