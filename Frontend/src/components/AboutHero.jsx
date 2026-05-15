import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Globe2 } from "lucide-react";

const AboutHero = () => {
  const coreExpertise = [
    "Indigenous Language Tech",
    "Cultural Strategy",
    "Hyper-Local Marketing",
    "Community Engagement"
  ];

  return (
    <section className="relative pt-40 pb-32 bg-white overflow-hidden">
      {/* SIGNATURE IMPACT GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* LEFT CONTENT: BOLD HEADLINE & NATIVE INTELLIGENCE */}
          <div className="lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-8">
                <Globe2 size={14} className="text-blue-600 animate-spin-slow" />
                <span className="text-blue-600 font-black uppercase tracking-widest text-[10px]">Our Story & Mission</span>
              </div>

              {/* Bold "About Us" Anchor */}
              <h1 className="text-6xl md:text-[120px] font-serif font-black text-slate-900 leading-[0.8] mb-6 tracking-tighter">
                About <br /> 
                <span className="text-slate-200">Us.</span>
              </h1>

              {/* "Native Intelligence" Sub-Heading */}
              <h2 className="text-3xl md:text-5xl font-medium text-slate-500 tracking-tight mb-10 leading-tight">
                Driven by <span className="text-blue-600 italic font-serif">Native Intelligence.</span>
              </h2>

              <p className="text-xl text-slate-400 font-medium max-w-xl mb-12 leading-relaxed">
                DenyoWorld bridges global innovation with indigenous culture. We help ideas find their local voice across Nigeria’s diverse landscape.
              </p>

              <div className="flex gap-12 border-t border-slate-100 pt-10">
                <div>
                  <h4 className="text-3xl font-black text-slate-900">30+</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Dialects</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-slate-900">100%</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Accuracy</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT CONTENT: CORE EXPERTISE CARD */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-2/5 w-full"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-600/5 blur-2xl rounded-[4rem]" />
              
              <div className="relative bg-slate-900 p-10 md:p-12 rounded-[3.5rem] shadow-2xl overflow-hidden group">
                <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-10 opacity-50">
                  Our Capabilities
                </h3>

                <div className="space-y-6">
                  {coreExpertise.map((service, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (index * 0.1) }}
                      className="flex items-center gap-4 group/item"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover/item:bg-blue-500 group-hover/item:text-white transition-all duration-300">
                        <CheckCircle2 size={18} />
                      </div>
                      <span className="text-slate-300 font-bold text-lg tracking-tight group-hover/item:text-white transition-colors">
                        {service}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Bridging the Divide</span>
                  <ArrowRight className="text-blue-500 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutHero;