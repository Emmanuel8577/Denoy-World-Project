import { motion } from "framer-motion";
import { Handshake, HeartPulse, GraduationCap, Users, ArrowRight } from "lucide-react";

const impactAreas = [
  {
    title: "Public Health",
    description: "Delivering vital health information in native dialects to ensure no community is left behind in national wellness campaigns.",
    icon: <HeartPulse className="text-rose-500" size={28} />,
    accent: "bg-rose-500",
    lightBg: "bg-rose-50/50",
  },
  {
    title: "Social Education",
    description: "Developing multilingual tools that educate students and young people on social issues and sustainable living.",
    icon: <GraduationCap className="text-blue-500" size={28} />,
    accent: "bg-blue-500",
    lightBg: "bg-blue-50/50",
  },
  {
    title: "Community Growth",
    description: "Empowering local businesses by bridging communication gaps with investors and government agencies.",
    icon: <Users className="text-emerald-500" size={28} />,
    accent: "bg-emerald-500",
    lightBg: "bg-emerald-50/50",
  },
  {
    title: "Strategic Partnerships",
    description: "Collaborating with NGOs and corporate bodies to localize their impact across Nigeria's diverse landscape.",
    icon: <Handshake className="text-amber-500" size={28} />,
    accent: "bg-amber-500",
    lightBg: "bg-amber-50/50",
  },
];

const Impact = () => {
  return (
    <section id="impact" className="relative py-24 md:py-32 bg-white overflow-hidden">
      
      {/* BACKGROUND DECORATION: Subtle Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-serif font-black text-slate-900 mb-8 leading-[1.1]">
              Social Impact <br />
              Through <span className="text-blue-600 italic">Linguistics.</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              Language is the most powerful tool for systemic change. We leverage our native 
              proficiency to foster national unity and improve community well-being.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactAreas.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative h-full"
            >
              <div className={`p-10 rounded-[3rem] bg-white border border-slate-100 h-full flex flex-col shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-slate-200/50`}>
                
                {/* ICON BOX */}
                <div className={`mb-8 p-4 w-fit rounded-2xl ${item.lightBg} group-hover:scale-110 transition-transform duration-500`}>
                  {item.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                  {item.title}
                </h3>
                
                <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow">
                  {item.description}
                </p>

                {/* BOTTOM BAR DECORATION */}
                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Core Area</span>
                    <div className={`w-8 h-1 rounded-full ${item.accent} opacity-40 group-hover:opacity-100 group-hover:w-12 transition-all duration-500`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM CALLOUT */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 p-1 bg-slate-50 rounded-[2.5rem] inline-block mx-auto"
        >
            <div className="flex flex-col md:flex-row items-center gap-6 px-10 py-6">
                <p className="text-slate-600 font-bold italic">Ready to localize your impact?</p>
                <button className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-xs hover:gap-4 transition-all">
                    Partner With Us <ArrowRight size={16} />
                </button>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Impact;