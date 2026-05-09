import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContentValue } from "@/hooks/useSiteContent";
import portfolioImg from "@/assets/portfolio-1.jpg";

const getEmbedUrl = (url: string): string | null => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
      const id = u.hostname.includes("youtu.be")
        ? u.pathname.slice(1)
        : u.searchParams.get("v") || u.pathname.split("/").pop();
      return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1` : null;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0` : null;
    }
  } catch {
    return null;
  }
  return null;
};

const VideoReel = () => {
  const videoUrl = useContentValue("video", "reel_url", "");
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null;

  if (!videoUrl) return null;

  return (
    <section className="relative w-full py-32 overflow-hidden flex items-center justify-center min-h-[70vh]">
      <div className="absolute inset-0 z-0">
        <img src={portfolioImg} alt="" aria-hidden="true" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-md" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      <div className="relative z-10 text-center flex flex-col items-center px-6 w-full max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-6 font-bold"
        >
          Motion Work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-7xl font-black text-foreground tracking-tighter mb-16"
        >
          Where Stills Meet Cinema
        </motion.h2>

        <AnimatePresence mode="wait">
          {isPlaying && embedUrl ? (
            <motion.div
              key="player"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <iframe
                src={embedUrl}
                title="Oyange Photography Showreel"
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          ) : (
            <motion.div
              key="trigger"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <button
                onClick={() => setIsPlaying(true)}
                className="w-20 h-20 bg-primary rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-500 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.5)] mb-6 group"
                aria-label="Play showreel"
              >
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-primary-foreground border-b-[10px] border-b-transparent ml-1 group-hover:scale-110 transition-transform duration-300" />
              </button>
              <p className="font-body text-muted-foreground text-xs tracking-widest uppercase font-medium">
                Watch the Reel
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default VideoReel;
