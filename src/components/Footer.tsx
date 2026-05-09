import { motion } from "framer-motion";
import { Instagram, ExternalLink, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Work", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/oyange_/" },
  { icon: ExternalLink, label: "Linktree", href: "https://linktr.ee/0yange" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">OYANGE</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
              Premium photography studio based in Nairobi, Kenya. Capturing light, crafting legacy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="gold-underline font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-6">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <social.icon className="w-4 h-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
            <div className="mt-8 space-y-1">
              <p className="font-body text-sm text-muted-foreground">Nairobi, Kenya</p>
              <a href="mailto:hello@oyangephotography.co.ke" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">hello@oyangephotography.co.ke</a>
              <a href="tel:+254717393576" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <Phone className="w-3 h-3" /> +254 717 393 576
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} Oyange Photography. All rights reserved.
          </span>
          <span className="font-body text-xs text-muted-foreground">
            Crafted with passion in Nairobi 🇰🇪
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
