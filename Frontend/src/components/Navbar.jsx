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

  // SMOOTH SCROLL LOGIC
  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false); // Close mobile menu if open

    if (location.pathname !== "/") {
      // If not on home page, navigate home then wait to scroll
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // If already on home, just scroll
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Showcase", id: "showcase" },
    { name: "Coverage", id: "coverage" },
    { name: "Impact", id: "impact" },
    { name: "Contact", id: "contact" },
  ];

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
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
            className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors"
          >
            Home
          </button>
          
          {navLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => scrollToSection(link.id)} 
              className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors"
            >
              {link.name}
            </button>
          ))}

          {token && (
            <Link to="/profile" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors">
              My Projects
            </Link>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl">
            <ShoppingCart size={20} />
          </Button>
          <Button 
            onClick={() => navigate(token ? "/profile" : "/Auth")}
            className="bg-slate-900 hover:bg-blue-600 text-white rounded-2xl px-8 h-12 text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-slate-200"
          >
            {token ? "Dashboard" : "Get Started"} <ArrowRight className="ml-2" size={14} />
          </Button>
        </div>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden p-2 text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => scrollToSection(link.id)} 
                  className="text-left text-sm font-black uppercase tracking-[0.2em] text-slate-900 hover:text-blue-600"
                >
                  {link.name}
                </button>
              ))}
              
              {token ? (
                <Link to="/profile" className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">My Projects</Link>
              ) : (
                <Link to="/Auth" className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">Sign In</Link>
              )}
              
              <hr className="border-slate-100" />
              
              <Button 
                onClick={() => navigate(token ? "/profile" : "/Auth")}
                className="w-full bg-blue-600 h-14 rounded-2xl font-black uppercase tracking-widest text-xs"
              >
                {token ? "Dashboard" : "Get Started"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;