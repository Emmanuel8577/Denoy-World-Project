import { motion } from "framer-motion";
import { MapPin, Globe, Navigation, ShieldCheck } from "lucide-react";

const MapSection = () => {
  return (
    <section id="location" className="relative w-full min-h-[800px] bg-white overflow-hidden py-32">
      
      {/* THE DYNAMIC BACKGROUND WAVES - Refined Opacity */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.svg
          viewBox="0 0 1440 600"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-full h-[70%] fill-blue-50/50"
        >
          <path d="M0,600 C400,500 800,700 1440,500 L1440,600 L0,600 Z" />
        </motion.svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* TEXT CONTENT */}
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 text-white mb-8 shadow-xl shadow-slate-200"
            >
              <Globe size={16} className="text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">National Operations</span>
            </motion.div>
            
            <h2 className="text-6xl md:text-8xl font-serif font-black text-slate-900 mb-8 leading-[0.9] tracking-tighter">
              Localized <br />
              <span className="text-blue-600">Precision.</span>
            </h2>
            
            <p className="text-xl text-slate-500 mb-12 leading-relaxed font-medium max-w-lg">
              Strategically headquartered in <span className="text-slate-900 font-bold">Abuja</span> with our cultural hub in <span className="text-slate-900 font-bold">Benue</span>, we deploy native expertise to every state in Nigeria.
            </p>

            {/* Strategic Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 bg-white p-6 rounded-[2rem] shadow-2xl shadow-slate-100 border border-slate-50"
              >
                <div className="h-14 w-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <Navigation size={24} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">Abuja HQ</p>
                  <p className="text-xs text-slate-400 font-bold">Central Operations</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 bg-white p-6 rounded-[2rem] shadow-2xl shadow-slate-100 border border-slate-50"
              >
                <div className="h-14 w-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-200">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">Benue Hub</p>
                  <p className="text-xs text-slate-400 font-bold">Linguistic Center</p>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-8 flex items-center gap-3 text-slate-400 font-bold px-6">
                <ShieldCheck size={18} className="text-emerald-500" />
                <span className="text-xs uppercase tracking-widest">Fully verified 36-state deployment network</span>
            </div>
          </div>

          {/* THE MAP SIDE */}
          <div className="lg:w-1/2 relative flex justify-center w-full">
            <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               className="relative w-full max-w-[600px] bg-white p-8 md:p-12 rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.08)] border border-slate-100"
            >
              <svg viewBox="0 0 800 600" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Simplified Professional Nigeria Path Groups */}
                <g fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" strokeLinejoin="round">
                  <path d="M100,100 L250,50 L350,120 L300,250 L120,220 Z" /> {/* NW */}
                  <path d="M300,250 L350,120 L550,150 L600,300 L450,350 L300,300 Z" /> {/* NC */}
                  <path d="M550,150 L750,100 L780,300 L600,300 Z" /> {/* NE */}
                  <path d="M120,220 L300,300 L250,500 L80,450 Z" /> {/* SW */}
                  <path d="M300,300 L450,350 L550,550 L350,580 L250,500 Z" /> {/* SS/Benue */}
                  <path d="M450,350 L600,300 L720,500 L550,550 Z" /> {/* SE */}
                </g>

                {/* Connection Lines - Styled to look like a data network */}
                <motion.path 
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    d="M410,280 L520,400 M410,280 L200,450 M410,280 L400,120" 
                    stroke="#3b82f6" 
                    strokeWidth="1" 
                    strokeDasharray="4 4"
                    fill="none"
                />
              </svg>
              
              {/* Abuja HQ Marker */}
              <div className="absolute top-[45%] left-[51%] group z-20">
                <div className="relative">
                    <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping"></div>
                    <div className="h-6 w-6 bg-blue-600 rounded-full border-4 border-white shadow-2xl cursor-pointer"></div>
                </div>
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all font-black whitespace-nowrap shadow-2xl">
                  STRATEGIC HQ: ABUJA
                </div>
              </div>
              
              {/* Benue Hub Marker */}
              <div className="absolute top-[65%] left-[62%] group z-20">
                 <div className="relative">
                    <div className="absolute -inset-4 bg-amber-500/20 rounded-full animate-ping"></div>
                    <div className="h-6 w-6 bg-amber-500 rounded-full border-4 border-white shadow-2xl cursor-pointer"></div>
                </div>
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all font-black whitespace-nowrap shadow-2xl">
                  LINGUISTIC HUB: BENUE
                </div>
              </div>

              {/* Network Nodes */}
              {[
                  { top: '75%', left: '25%' }, // Lagos
                  { top: '25%', left: '45%' }, // Kano
                  { top: '35%', left: '75%' }, // Maiduguri
                  { top: '80%', left: '70%' }, // Port Harcourt
              ].map((pos, i) => (
                <div key={i} style={{ top: pos.top, left: pos.left }} className="absolute h-2 w-2 bg-slate-200 rounded-full border border-white"></div>
              ))}

              {/* Floating Legend Badge */}
              <div className="absolute bottom-8 left-8 right-8 bg-slate-50 border border-slate-100 p-4 rounded-2xl flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Network Status</span>
                  <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Live Nationwide</span>
                  </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MapSection;