import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Languages, Mic, Globe, PenTool, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Multilingual Translation",
    description: "Accurate translation across 30+ Nigerian languages, ensuring your message is understood in Tiv, Idoma, Hausa, Kanuri, and more.",
    icon: <Languages className="text-blue-600" size={32} />,
    color: "group-hover:bg-blue-500",
    lightBg: "bg-blue-50/50"
  },
  {
    title: "Transcreation",
    description: "Going beyond literal translation to creatively adapt your brand message while maintaining emotional intent and cultural relevance.",
    icon: <PenTool className="text-emerald-600" size={32} />,
    color: "group-hover:bg-emerald-500",
    lightBg: "bg-emerald-50/50"
  },
  {
    title: "Cultural Sensitization",
    description: "Developing specialized content for health and social awareness, tailored for diverse ethnic groups and local sensibilities.",
    icon: <Globe className="text-amber-600" size={32} />,
    color: "group-hover:bg-amber-500",
    lightBg: "bg-amber-50/50"
  },
  {
    title: "Native Voice-Over",
    description: "High-quality audio production and dubbing featuring native speakers to bring an authentic voice to your digital content.",
    icon: <Mic className="text-rose-600" size={32} />,
    color: "group-hover:bg-rose-500",
    lightBg: "bg-rose-50/50"
  },
];

const Services = () => {
  return (
    // ID ADDED FOR SCROLLING
    <section id="services" className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-serif font-black text-slate-900 mb-6 leading-tight">
              Bridging the <span className="text-blue-600 italic">Linguistic</span> Divide
            </h2>
            <p className="text-slate-500 text-xl font-medium leading-relaxed">
              Denyo World Limited specializes in connecting organizations with Nigeria's 
              diverse linguistic landscape through cultural precision.
            </p>
          </div>
          <div className="hidden md:block pb-2">
            <div className="h-1 w-32 bg-blue-600 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="group relative p-8 rounded-[2.5rem] border border-slate-100 bg-white hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 h-full flex flex-col overflow-hidden">
                {/* Decorative background circle on hover */}
                <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-all duration-500 ${service.color}`} />
                
                <div className={`w-16 h-16 ${service.lightBg} rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  {service.icon}
                </div>
                
                <CardTitle className="text-2xl font-bold text-slate-900 mb-4 flex items-center justify-between">
                  {service.title}
                  <ArrowUpRight className="opacity-0 group-hover:opacity-100 text-slate-300 transition-all" size={20} />
                </CardTitle>
                
                <CardContent className="p-0 text-slate-500 font-medium leading-relaxed">
                  {service.description}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;