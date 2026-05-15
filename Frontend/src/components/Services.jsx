import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Languages, Mic, Globe, PenTool, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Multilingual Translation",
    description: "Accurate translation across 30+ Nigerian languages, including Tiv, Idoma, Hausa, and Kanuri.",
    icon: <Languages size={24} />,
    color: "text-blue-600",
    number: "01"
  },
  {
    title: "Transcreation",
    description: "Adapting your brand message while maintaining emotional intent and cultural relevance.",
    icon: <PenTool size={24} />,
    color: "text-emerald-600",
    number: "02"
  },
  {
    title: "Cultural Sensitization",
    description: "Tailored content for health and social awareness for diverse ethnic groups.",
    icon: <Globe size={24} />,
    color: "text-amber-600",
    number: "03"
  },
  {
    title: "Native Voice-Over",
    description: "High-quality audio production featuring native speakers for authentic digital content.",
    icon: <Mic size={24} />,
    color: "text-rose-600",
    number: "04"
  },
];

const Services = () => {
  return (
    <section id="services" className="py-32 bg-white relative">
      {/* MATCHING IMPACT GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="w-12 h-[2px] bg-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Expertise</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-serif font-black text-slate-900 leading-tight tracking-tighter">
              Bridging the <br />
              <span className="text-blue-600 italic">Linguistic</span> Divide
            </h2>
          </div>
          
          <p className="text-slate-500 text-lg font-medium max-w-sm leading-relaxed border-l-2 border-slate-100 pl-8">
            Specializing in Nigeria's 250+ ethnic groups through deep cultural precision and technical excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group relative p-10 rounded-[3rem] border border-slate-100 bg-white/50 backdrop-blur-sm hover:bg-slate-900 transition-all duration-500 h-[420px] flex flex-col justify-between overflow-hidden cursor-pointer">
                {/* Background Numbering */}
                <span className="absolute -right-4 top-0 text-[120px] font-black text-slate-50 group-hover:text-white/5 transition-colors duration-500 select-none">
                  {service.number}
                </span>

                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-white shadow-xl shadow-slate-200/50 flex items-center justify-center ${service.color} mb-8 group-hover:scale-110 transition-transform duration-500`}>
                    {service.icon}
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-white transition-colors duration-500">
                    {service.title}
                  </CardTitle>
                  
                  <CardContent className="p-0 text-slate-500 font-medium leading-relaxed group-hover:text-slate-400 transition-colors duration-500">
                    {service.description}
                  </CardContent>
                </div>

                <div className="relative z-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  Learn More <ArrowUpRight size={14} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;