import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const phone = "254717393576";
  const message = encodeURIComponent("Hello Oyange Photography! I'm interested in your photography services.");
  const url = `https://wa.me/${phone}?text=${message}`;

  useEffect(() => {
    const showTimer = setTimeout(() => setShowTooltip(true), 15000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 20000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 md:w-14 md:h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-[#25D366]/50 -z-10"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0] }}
        transition={{ duration: 8, repeat: Infinity, times: [0, 0.2, 1] }}
      />
      <MessageCircle className="w-7 h-7 md:w-6 md:h-6 text-white" fill="white" />
      <motion.span
        className={`absolute right-full mr-3 whitespace-nowrap glass px-3 py-1.5 rounded-full font-body text-xs text-foreground pointer-events-none transition-opacity ${showTooltip ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
      >
        {showTooltip ? "📸 Need a quote?" : "Chat with us"}
      </motion.span>
    </motion.a>
  );
};

export default WhatsAppButton;
