import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import denyologo from "@/assets/denyologo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sections on the Home Page
  const homeLinks = [
    { name: "Showcase", id: "showcase" },
    { name: "Coverage", id: "coverage" },
  ];

  // Dedicated Pages
  const pageLinks = [
    { name: "About Us", path: "/about" },
    { name: "Core Services", path: "/services" },
    { name: "Impact", path: "/impact" },
    { name: "Contact Us", path: "/contact" },
  ];

  const handleNavClick = (link) => {
    setIsMobileMenuOpen(false);
    
    if (link.id) {
      // Logic for scrolling on home page
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Logic for navigating to a new page
      navigate(link.path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
      isScrolled ? "bg-white/70 backdrop-blur-xl border-b border-slate-100 py-3 shadow-sm" : "bg-transparent py-6"
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={denyologo} alt="Logo" className="h-10 md:h-12 w-auto transition-transform group-hover:scale-105" />
          <span className="text-xl md:text-2xl font-serif font-black text-slate-900 tracking-tighter">
            Denyo<span className="text-blue-600">World</span>
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-6">
          <button onClick={() => navigate("/")} className="text-[10px] font-black tracking-widest text-slate-500 hover:text-blue-600">Home</button>
          
          {homeLinks.map((link) => (
            <button key={link.id} onClick={() => handleNavClick(link)} className="text-[10px] font-black tracking-widest text-slate-500 hover:text-blue-600">
              {link.name}
            </button>
          ))}

          {pageLinks.map((link) => (
            <button key={link.path} onClick={() => handleNavClick(link)} className="text-[10px] font-black tracking-widest text-slate-500 hover:text-blue-600">
              {link.name}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button 
            onClick={() => navigate(token ? "/profile" : "/Auth")}
            className="bg-slate-900 hover:bg-blue-600 text-white rounded-2xl px-8 h-12 text-xs font-black uppercase tracking-widest transition-all"
          >
            {token ? "Dashboard" : "Get Started"} <ArrowRight className="ml-2" size={14} />
          </Button>
        </div>

        {/* MOBILE TOGGLE */}
        <button className="lg:hidden p-2 text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl md:hidden"
          >
            <div className="flex flex-col p-8 gap-5">
              <button onClick={() => {navigate("/"); setIsMobileMenuOpen(false)}} className="text-left text-xs font-black tracking-widest">Home</button>
              {[...homeLinks, ...pageLinks].map((link) => (
                <button 
                  key={link.id || link.path} 
                  onClick={() => handleNavClick(link)} 
                  className="text-left text-xs font-black tracking-widest text-slate-900 hover:text-blue-600"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;