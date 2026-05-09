import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageLoader = ({ onComplete }: { onComplete: () => void }) => {
  const alreadySeen = sessionStorage.getItem("oyange_loaded");
  const [phase, setPhase] = useState<"logo" | "wipe" | "done">(alreadySeen ? "done" : "logo");

  useEffect(() => {
    if (alreadySeen) { onComplete(); return; }
    const t1 = setTimeout(() => setPhase("wipe"), 1000);
    const t2 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("oyange_loaded", "1");
      onComplete();
    }, 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Logo reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative z-10 text-center"
          >
            <motion.h1
              className="font-display text-5xl md:text-7xl font-bold text-foreground tracking-wider"
              animate={phase === "wipe" ? { opacity: 0, y: -30 } : {}}
              transition={{ duration: 0.4 }}
            >
              OYANGE
            </motion.h1>
            <motion.div
              className="h-[2px] bg-primary mx-auto mt-4"
              initial={{ width: 0 }}
              animate={{ width: phase === "wipe" ? 0 : 120 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <motion.p
              className="font-body text-xs tracking-[0.4em] uppercase text-muted-foreground mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "wipe" ? 0 : 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Photography
            </motion.p>
          </motion.div>

          {/* Curtain wipe */}
          {phase === "wipe" && (
            <>
              <motion.div
                className="absolute inset-0 bg-background z-20"
                initial={{ y: 0 }}
                animate={{ y: "-100%" }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                style={{ originY: 0 }}
              />
              <motion.div
                className="absolute inset-0 bg-primary/10 z-[19]"
                initial={{ y: 0 }}
                animate={{ y: "-100%" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
