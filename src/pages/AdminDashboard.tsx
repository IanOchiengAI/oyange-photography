import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Type, Image, Star, Briefcase, Phone, Layout, Mail, DollarSign, FileText, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import AdminHeroEditor from "@/components/admin/AdminHeroEditor";
import AdminPortfolioEditor from "@/components/admin/AdminPortfolioEditor";
import AdminFeaturedEditor from "@/components/admin/AdminFeaturedEditor";
import AdminAboutEditor from "@/components/admin/AdminAboutEditor";
import AdminServicesEditor from "@/components/admin/AdminServicesEditor";
import AdminContactEditor from "@/components/admin/AdminContactEditor";
import AdminMessagesViewer from "@/components/admin/AdminMessagesViewer";
import AdminPackagesEditor from "@/components/admin/AdminPackagesEditor";
import AdminTestimonialsEditor from "@/components/admin/AdminTestimonialsEditor";
import MediaLibrary from "@/components/admin/MediaLibrary";

const tabs = [
  { id: "hero", label: "Hero & Reel", icon: Layout },
  { id: "media", label: "Media", icon: Image },
  { id: "portfolio", label: "Portfolio", icon: Image },
  { id: "featured", label: "Featured", icon: Star },
  { id: "about", label: "About", icon: Type },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "packages", label: "Packages", icon: DollarSign },
  { id: "testimonials", label: "Testimonials", icon: FileText },
  { id: "contact", label: "Contact", icon: Phone },
  { id: "messages", label: "Messages", icon: Mail },
];

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("hero");
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("admin-page");
    return () => document.body.classList.remove("admin-page");
  }, []);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Loading...</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return (
    <div className="min-h-screen bg-background flex items-center justify-center text-foreground">
      <div className="text-center space-y-4">
        <p className="text-muted-foreground">You don't have admin access.</p>
        <Button variant="outline" onClick={signOut}>Sign Out</Button>
      </div>
    </div>
  );

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-bold text-foreground">OYANGE</h1>
          <p className="font-body text-xs text-muted-foreground mt-1">Admin Panel</p>
        </div>
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </Button>
        )}
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (isMobile) setIsMenuOpen(false);
              }}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-body transition-colors ${
                activeTab === tab.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              {tab.label}
              {tab.id === "messages" && unreadCount > 0 && (
                <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">{unreadCount}</span>
              )}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={signOut} 
          className="w-full justify-start text-muted-foreground"
          aria-label="Sign out"
        >
          <LogOut className="w-4 h-4 mr-2" aria-hidden="true" />
          Sign Out
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row" style={{ cursor: "auto" }}>
      {/* Mobile Header */}
      {isMobile && (
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 z-20">
          <h1 className="font-display text-lg font-bold text-foreground">OYANGE ADMIN</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </Button>
        </header>
      )}

      {/* Sidebar - Desktop */}
      {!isMobile && (
        <aside className="w-64 border-r border-border bg-card flex flex-col shrink-0 h-screen sticky top-0">
          <SidebarContent />
        </aside>
      )}

      {/* Sidebar - Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-md" 
              onClick={() => setIsMenuOpen(false)} 
              aria-hidden="true" 
            />
            <motion.aside 
              role="dialog"
              aria-modal="true"
              aria-label="Admin navigation drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-4/5 max-w-xs bg-card h-full flex flex-col border-r border-border shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <main className={`flex-1 overflow-auto ${isMobile ? 'pt-6 px-4 pb-20' : 'p-8'} ${activeTab === "media" ? "h-full" : ""}`} style={{ cursor: "auto" }}>
        <div className={`max-w-4xl mx-auto ${activeTab === "media" ? "max-w-6xl h-[85vh]" : ""}`}>
          <div className="md:hidden mb-6 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold capitalize">{activeTab}</h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Oyange Admin</p>
          </div>
          {activeTab === "media" && <MediaLibrary />}
          {activeTab === "hero" && <AdminHeroEditor />}
          {activeTab === "portfolio" && <AdminPortfolioEditor />}
          {activeTab === "featured" && <AdminFeaturedEditor />}
          {activeTab === "about" && <AdminAboutEditor />}
          {activeTab === "services" && <AdminServicesEditor />}
          {activeTab === "packages" && <AdminPackagesEditor />}
          {activeTab === "testimonials" && <AdminTestimonialsEditor />}
          {activeTab === "contact" && <AdminContactEditor />}
          {activeTab === "messages" && <AdminMessagesViewer onUnreadCountChange={setUnreadCount} />}
        </div>
      </main>
    </div>
  );
};


export default AdminDashboard;
