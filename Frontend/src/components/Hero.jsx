import { Button } from "@/components/ui/button";
import { MoveRight, Globe, Languages, Sparkles, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white pt-20">
      {/* BACKGROUND ELEMENTS - Added Animated Blobs */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/40 blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] rounded-full bg-emerald-100/40 blur-[100px]" 
        />
      </div>

      {/* CONTENT LAYER */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container relative z-10 px-6 mx-auto flex flex-col items-center text-center"
      >
        {/* Badge */}
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold mb-8 border border-slate-800 shadow-xl shadow-blue-100/50"
        >
          <Sparkles size={14} className="text-blue-400" />
          <span className="uppercase tracking-widest">New: Audio dubbing in 30+ Languages</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-8xl font-serif font-black tracking-tight text-slate-900 max-w-5xl leading-[1.05]"
        >
          Bridging <span className="text-blue-600 italic">Cultures</span> Through <span className="relative">
            Precision
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="8" /></svg>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="mt-8 text-xl text-slate-500 max-w-2xl leading-relaxed font-medium"
        >
          Empower your brand with culturally resonant translations. We transform 
          your media into local dialects that feel native, not just translated.
        </motion.p>

        {/* BUTTON GROUP */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 flex flex-col sm:flex-row items-center gap-5"
        >
          {/* Main Action: Start Project */}
          <Button 
            onClick={() => navigate('/Auth')}
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-10 h-16 text-lg font-bold gap-3 shadow-2xl shadow-blue-200 transition-all hover:scale-105 active:scale-95"
          >
            <PlusCircle size={22} /> Start a Project
          </Button>

          {/* Secondary Action: Order */}
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-white border-2 border-slate-100 rounded-2xl px-10 h-16 text-lg font-bold gap-3 hover:bg-slate-50 transition-all"
          >
            Order Translation <MoveRight size={20} className="text-blue-600" />
          </Button>
          
          {/* Tertiary Action: Globe */}
          <Button 
            variant="ghost" 
            size="lg" 
            className="text-slate-400 font-bold gap-2 hover:text-blue-600"
          >
            <Globe size={20} /> Showcase
          </Button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-slate-100 w-full max-w-3xl flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all"
        >
          <div className="flex items-center gap-2 font-black text-slate-900 tracking-tighter">
            <Languages className="text-blue-600" /> HAUSA
          </div>
          <div className="flex items-center gap-2 font-black text-slate-900 tracking-tighter">
            <Languages className="text-blue-600" /> IGBO
          </div>
          <div className="flex items-center gap-2 font-black text-slate-900 tracking-tighter">
            <Languages className="text-blue-600" /> YORUBA
          </div>
          <div className="flex items-center gap-2 font-black text-slate-900 tracking-tighter">
            <Languages className="text-blue-600" /> PIDGIN
          </div>
        </motion.div>
      </motion.div>

      {/* THE SWEEPING WAVES */}
      <div className="absolute bottom-0 left-0 w-full leading-[0] z-0 pointer-events-none">
        <svg 
          className="relative block w-full h-[150px] md:h-[300px]" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
        >
          <path 
            fill="#3b82f6" 
            fillOpacity="0.05" 
            d="M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,202.7C672,192,768,128,864,122.7C960,117,1056,171,1152,181.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path 
            fill="#3b82f6" 
            fillOpacity="0.1" 
            d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;