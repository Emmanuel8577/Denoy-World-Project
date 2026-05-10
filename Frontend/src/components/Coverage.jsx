import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Globe, Languages, MapPin, CheckCircle } from "lucide-react";

const languages = [
  "English", "French", "Yoruba", "Hausa", "Igbo", "Fulfulde", "Igala", "Idoma", 
  "Tiv", "Mumuye", "Yala", "Ibibio", "Dera", "Kutep", "Marghi", "Agatu", 
  "Alago", "Koro", "Kurmi", "Jukun", "Tigun", "Urohbo", "Mwahagvul", "Ika", 
  "Batter", "Bisu", "Ubang", "Bille", "Mupun", "Ohafia", "Pidgin"
];

const Coverage = () => {
  // We double the array to create a seamless infinite loop
  const marqueeVariants = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  return (
    <section id="coverage" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-1/4 z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          <div className="lg:w-1/2">
            <Badge className="bg-amber-100 text-amber-700 border-none px-4 py-1.5 mb-6 rounded-lg font-bold">
              Linguistic Footprint
            </Badge>
            <h2 className="text-5xl md:text-7xl font-serif font-black text-slate-900 mb-8 leading-[1.1]">
              Breaking Barriers <br /> 
              Across <span className="text-amber-500 italic">Borders</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
              Our expertise extends to over 30 indigenous dialects and key foreign languages. 
              We don't just translate; we navigate the cultural nuances of every region.
            </p>
            
            <div className="mt-10 space-y-4">
              {["Native fluency in 30+ Dialects", "Localized Cultural Sensitization", "Regional Dialect Adaptation"].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                  <CheckCircle className="text-amber-500" size={20} />
                  {text}
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-10 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group"
            >
              <div className="absolute -right-4 -bottom-4 text-blue-50 opacity-10 group-hover:scale-110 transition-transform">
                <Globe size={120} />
              </div>
              <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <Globe size={32} />
              </div>
              <div className="text-5xl font-black text-slate-900 mb-2">30+</div>
              <div className="text-sm font-black text-slate-400 uppercase tracking-widest">Indigenous Dialects</div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="p-10 bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-blue-900/20 relative overflow-hidden group"
            >
              <div className="absolute -right-4 -bottom-4 text-white opacity-5 group-hover:scale-110 transition-transform">
                <Languages size={120} />
              </div>
              <div className="bg-blue-500/20 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-400 mb-6">
                <Languages size={32} />
              </div>
              <div className="text-5xl font-black text-white mb-2">100%</div>
              <div className="text-sm font-black text-slate-400 uppercase tracking-widest">Cultural Accuracy</div>
            </motion.div>
          </div>
        </div>

        {/* INFINITE SCROLLING TAG CLOUD */}
        <div className="relative mt-20">
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />
          
          <div className="overflow-hidden whitespace-nowrap py-10">
            <motion.div 
              className="flex gap-4 w-max"
              variants={marqueeVariants}
              animate="animate"
            >
              {[...languages, ...languages].map((lang, index) => (
                <div
                  key={index}
                  className="px-8 py-4 bg-white border border-slate-100 rounded-2xl text-slate-700 font-bold shadow-sm flex items-center gap-3 hover:border-amber-500 hover:text-amber-600 transition-all cursor-default"
                >
                  <MapPin size={16} className="text-amber-500" />
                  {lang}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="text-center mt-12">
            <p className="text-slate-400 font-bold italic">...and many more regional variations</p>
        </div>
      </div>
    </section>
  );
};

export default Coverage;