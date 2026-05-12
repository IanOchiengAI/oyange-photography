import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";


const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Investment", href: "#packages" },
  { label: "Clients", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      if (!isHome) {
        window.location.href = "/" + href;
        return;
      }
      const el = document.querySelector(href);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 300); // Wait for menu close animation
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.05, staggerDirection: -1 }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: scrolled ? 16 : 0 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        role="navigation"
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 mx-auto ${
          scrolled 
            ? "max-w-7xl left-6 right-6 top-0 rounded-2xl glass-strong shadow-2xl transition-all" 
            : "top-0 left-0 right-0 glass"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          {isHome ? (
            <button
              onClick={() => scrollTo("#hero")}
              aria-label="Oyange Photography - Scroll to top"
              className="font-display text-xl font-black tracking-wider text-foreground uppercase"
            >
              OYANGE
            </button>
          ) : (
            <Link
              to="/"
              aria-label="Oyange Photography - Go to home page"
              className="font-display text-xl font-black tracking-wider text-foreground uppercase"
            >
              OYANGE
            </Link>
          )}

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="gold-underline font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 relative z-[60]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} className="block w-6 h-[1.5px] bg-foreground transition-colors" />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-6 h-[1.5px] bg-foreground" />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} className="block w-6 h-[1.5px] bg-foreground transition-colors" />
          </button>
        </div>
      </motion.nav>

      {/* Premium Fullscreen Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[45] bg-background/95 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden"
          >
            <div className="flex flex-col gap-8 mt-12">
              {navLinks.map((link) => (
                <motion.button
                  key={link.href}
                  variants={linkVariants}
                  onClick={() => scrollTo(link.href)}
                  className="text-left font-display text-4xl font-light tracking-tight text-foreground/90 hover:text-primary transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
            
            <motion.div 
              variants={linkVariants}
              className="mt-20 pt-10 border-t border-border/40 flex flex-col gap-4"
            >
              <p className="font-body text-xs tracking-[0.3em] uppercase text-primary">Get in Touch</p>
              <a href="mailto:martinaquila5@gmail.com" className="font-body text-sm text-muted-foreground">martinaquila5@gmail.com</a>
              <div className="flex gap-6 mt-2">
                <a href="#" className="font-body text-xs tracking-widest uppercase text-foreground hover:text-primary transition-colors">Instagram</a>
                <a href="#" className="font-body text-xs tracking-widest uppercase text-foreground hover:text-primary transition-colors">Twitter</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
