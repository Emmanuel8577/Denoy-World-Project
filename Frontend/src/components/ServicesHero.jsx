import { motion } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";

const ServicesHero = () => {
  const otherServices = [
    "Brand Strategy",
    "Brand Marketing",
    "Website Branding",
    "Video Content Production"
  ];

  return (
    <section className="relative pt-40 pb-32 bg-white overflow-hidden">
      {/* IMPACT GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* LEFT CONTENT */}
          <div className="lg:w-3/5 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-8">
                <Sparkles size={14} className="text-blue-600 animate-pulse" />
                <span className="text-blue-600 font-black uppercase tracking-widest text-[10px]">Our Capabilities</span>
              </div>

              <h1 className="text-6xl md:text-[100px] font-serif font-black text-slate-900 leading-[0.9] mb-10 tracking-tighter">
                Core <span className="text-blue-600 underline decoration-slate-200 underline-offset-8">Services.</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mb-12 leading-relaxed">
                We blend technical precision with cultural resonance to build digital products that don't just function—they belong.
              </p>
            </motion.div>
          </div>

          {/* RIGHT CONTENT: OTHER SERVICES BOX */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-2/5 w-full"
          >
            <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              {/* Decorative Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 blur-[80px] rounded-full group-hover:bg-blue-500/30 transition-colors" />
              
              <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-8 opacity-50">
                Specialized Solutions
              </h3>

              <div className="space-y-5">
                {otherServices.map((service, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    className="flex items-center gap-4 group/item"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover/item:bg-blue-500 group-hover/item:text-white transition-all">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-slate-300 font-bold tracking-tight group-hover/item:text-white transition-colors">
                      {service}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/5">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Ready to amplify your brand?
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ServicesHero;