import { motion } from "framer-motion";
import { ShieldCheck, Zap, Users2, Target } from "lucide-react";

const values = [
  { icon: <ShieldCheck size={24} />, title: "Integrity", desc: "Honest, transparent localization." },
  { icon: <Zap size={24} />, title: "Agility", desc: "Rapid deployment across languages." },
  { icon: <Users2 size={24} />, title: "Empathy", desc: "Respecting cultural nuances." },
  { icon: <Target size={24} />, title: "Precision", desc: "Flawless technical execution." },
];

const AboutContent = () => {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* WHY CHOOSE US (The Dark Card) */}
          <div className="lg:w-1/3">
            <div className="bg-slate-900 p-12 rounded-[3rem] h-full flex flex-col justify-between shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-[4rem]" />
               <div>
                 <h2 className="text-white text-4xl font-serif font-black mb-8 leading-tight">
                   Why <br /><span className="text-blue-500 italic">Choose Us?</span>
                 </h2>
                 <p className="text-slate-400 font-medium mb-8">
                   We don't just translate words; we translate intent. Our team is embedded within the communities we serve.
                 </p>
               </div>
               <div className="space-y-4">
                 {["Native Linguists", "Cultural Context", "End-to-end Support"].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 text-white font-bold text-sm">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {item}
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* CORE VALUES (The Bento Grid) */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
               {values.map((val, i) => (
                 <motion.div 
                   key={i}
                   whileHover={{ y: -10 }}
                   className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all"
                 >
                   <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                     {val.icon}
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 mb-4">{val.title}</h3>
                   <p className="text-slate-500 font-medium">{val.desc}</p>
                 </motion.div>
               ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutContent;