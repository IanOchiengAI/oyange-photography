import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useServices } from "@/hooks/usePortfolio";
import ProgressiveImage from "@/components/ProgressiveImage";

// One photo per service, from Aquila's own library, and the portfolio album it opens.
// Services added in the admin pick these up by title; unknown titles render as text-only rows.
const serviceMedia: Record<string, { image: string; album: string }> = {
  portraits: { image: "/portfolio/portraits/004.jpg", album: "Portraits" },
  graduation: { image: "/portfolio/graduation/004.jpg", album: "Graduation" },
  couples: { image: "/portfolio/couples/003.jpg", album: "Couples" },
  events: { image: "/portfolio/events/003.jpg", album: "Events" },
  "hikes & safaris": { image: "/portfolio/adventure/014.jpg", album: "Adventure" },
};

const defaultServices = [
  { title: "Portraits", description: "Studio and outdoor portraits, from professional headshots to creative personal sessions." },
  { title: "Graduation", description: "Your big day on campus, in cap and gown, with the people who got you there." },
  { title: "Couples", description: "Relaxed sessions for two, by the water, in the garden or wherever feels like you." },
  { title: "Events", description: "Launches, conferences, performances and celebrations, covered as they happen." },
  { title: "Hikes & Safaris", description: "A full day on the trail with your group, from the briefing at the gate to the summit sign." },
];

const openAlbum = (album: string) => {
  window.dispatchEvent(new CustomEvent("portfolio:filter", { detail: album }));
  const el = document.querySelector("#portfolio");
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
};

const Services = () => {
  const { data: dbServices } = useServices();
  const services = dbServices && dbServices.length > 0 ? dbServices : defaultServices;
  // Product shoots are offered but the library has no product photos yet, so they get a sentence, not a row.
  const rows = services.filter((s) => s.title.toLowerCase() !== "product");
  const offersProduct = services.length !== rows.length || services === defaultServices;

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 md:mb-24 max-w-2xl"
      >
        <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-5">What I shoot</h2>
        <p className="font-body text-lg text-muted-foreground leading-relaxed">
          Five kinds of work, all shot and edited by me. Pick one to see more of it.
        </p>
      </motion.div>

      <div className="space-y-10 md:space-y-20">
        {rows.map((s, i) => {
          const media = serviceMedia[s.title.toLowerCase()];
          const flip = i % 2 === 1;
          return (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`grid ${media ? "grid-cols-[minmax(0,2fr)_minmax(0,3fr)]" : "grid-cols-1"} md:grid-cols-12 gap-5 md:gap-12 items-center`}
            >
              {media && (
                <button
                  onClick={() => openAlbum(media.album)}
                  aria-label={`See ${s.title.toLowerCase()} work`}
                  className={`group md:col-span-4 overflow-hidden ${flip ? "md:order-2 md:col-start-9" : ""}`}
                  data-cursor-view
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <ProgressiveImage
                      src={media.image}
                      alt={`${s.title} by Aquila Oyange`}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                </button>
              )}
              <div className={!media ? "md:col-span-12 max-w-2xl" : flip ? "md:col-span-7 md:order-1 md:col-start-1" : "md:col-span-7 md:col-start-6"}>
                <h3 className="font-display text-2xl md:text-5xl font-bold text-foreground leading-[1.05] mb-2 md:mb-5">{s.title}</h3>
                <p className="font-body text-sm md:text-lg text-muted-foreground leading-relaxed max-w-md mb-3 md:mb-8">{s.description}</p>
                {media && (
                  <button
                    onClick={() => openAlbum(media.album)}
                    className="group inline-flex items-center gap-2 md:gap-3 font-body text-sm text-foreground border-b border-primary/60 pb-1 hover:border-primary hover:text-primary transition-colors"
                  >
                    See the work
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>

      {offersProduct && (
        <p className="mt-20 md:mt-28 font-body text-lg text-muted-foreground max-w-2xl">
          I also photograph products for shops, menus and social pages.{" "}
          <a href="#contact" className="text-foreground border-b border-primary/60 hover:text-primary transition-colors">
            Tell me what you sell.
          </a>
        </p>
      )}
    </section>
  );
};

export default Services;
