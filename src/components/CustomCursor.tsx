import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useSpring(0, { stiffness: 500, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 30 });
  const trailX = useSpring(0, { stiffness: 200, damping: 25 });
  const trailY = useSpring(0, { stiffness: 200, damping: 25 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleEnterImage = () => setIsHoveringImage(true);
    const handleLeaveImage = () => setIsHoveringImage(false);
    
    const handleEnterLink = () => setIsHoveringLink(true);
    const handleLeaveLink = () => setIsHoveringLink(false);

    window.addEventListener("mousemove", handleMove);

    const bindEvents = () => {
      document.querySelectorAll("[data-cursor-view]").forEach((el) => {
        el.addEventListener("mouseenter", handleEnterImage);
        el.addEventListener("mouseleave", handleLeaveImage);
      });
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", handleEnterLink);
        el.addEventListener("mouseleave", handleLeaveLink);
      });
    };

    const observer = new MutationObserver(bindEvents);
    observer.observe(document.body, { childList: true, subtree: true });
    
    bindEvents();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      observer.disconnect();
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHoveringImage ? 0 : isHoveringLink ? 8 : 10,
          height: isHoveringImage ? 0 : isHoveringLink ? 8 : 10,
          borderRadius: "50%",
          backgroundColor: "hsl(var(--foreground))",
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ width: { duration: 0.2 }, height: { duration: 0.2 } }}
      />
      {/* Trail circle / VIEW text */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center transition-all duration-300 ease-out"
        style={{
          x: trailX,
          y: trailY,
          width: isHoveringImage ? 90 : isHoveringLink ? 60 : 40,
          height: isHoveringImage ? 90 : isHoveringLink ? 60 : 40,
          borderRadius: "50%",
          border: isHoveringImage ? "none" : isHoveringLink ? "1.5px solid hsl(var(--primary) / 0.5)" : "1px solid hsl(var(--primary) / 0.3)",
          backgroundColor: isHoveringImage ? "hsl(var(--primary))" : isHoveringLink ? "hsl(var(--primary) / 0.1)" : "transparent",
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
        }}
      >
        {isHoveringImage && (
          <motion.span 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-xs font-body font-bold tracking-[0.2em]" 
            style={{ color: "hsl(var(--primary-foreground))" }}
          >
            VIEW
          </motion.span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
