import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import portfolioImg from "@/assets/portfolio-6.jpg";

const NotFound = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col font-sans overflow-x-hidden selection:bg-primary/20 selection:text-primary relative">
      <CustomCursor />
      <Navbar />
      
      <main className="flex-1 relative flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={portfolioImg} 
            alt="Portfolio Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>
        </div>

        <motion.div 
          className="text-center max-w-2xl mx-auto relative z-10 flex flex-col items-center justify-center h-full"
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <h1 className="font-display text-8xl md:text-[12rem] font-bold tracking-tighter text-white/5 select-none leading-none">
              404
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 text-foreground tracking-tight">
              This frame doesn't exist
            </h2>
            
            <p className="font-display italic text-muted-foreground text-2xl md:text-3xl font-light mb-12">
              — but these do
            </p>
            
            <Link to="/">
              <button 
                className="group flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-body font-bold text-sm tracking-[0.1em] uppercase hover:bg-white hover:text-black transition-all duration-500 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)] mx-auto"
                data-cursor-hover
              >
                Back to Gallery
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default NotFound;
