import { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

const MobileBookCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    // Check sessionStorage
    const dismissed = sessionStorage.getItem("mobile-cta-dismissed");
    if (dismissed === "true") {
      setIsDismissed(true);
    }
  }, []);

  useEffect(() => {
    if (isDismissed) return;

    return scrollY.on("change", (latest) => {
      const vh = window.innerHeight;
      if (latest > vh * 0.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, [scrollY, isDismissed]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    setIsVisible(false);
    sessionStorage.setItem("mobile-cta-dismissed", "true");
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-primary text-primary-foreground shadow-[0_-10px_40px_rgba(0,0,0,0.3)] pb-safe"
        >
          <div className="relative flex items-center justify-between px-6 py-4 cursor-pointer" onClick={scrollToContact}>
            <span className="font-body text-xs font-bold tracking-[0.2em] uppercase text-black">
              Book Your Session
            </span>
            <div className="flex items-center gap-4">
              <ArrowRight className="w-5 h-5 text-black" />
              <div className="w-[1px] h-6 bg-black/20" />
              <button 
                onClick={handleDismiss}
                className="p-1 -mr-2"
                aria-label="Dismiss"
              >
                <X className="w-5 h-5 text-black/60 hover:text-black transition-colors" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileBookCTA;
