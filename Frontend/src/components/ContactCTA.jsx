import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin, Sparkles, MessageSquare } from "lucide-react";

const ContactCTA = () => {
  const navigate = useNavigate();

  const handleStartProject = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/Profile");
    } else {
      navigate("/Auth"); 
    }
  };

  const contactInfo = [
    { icon: <Phone size={20} />, label: "Call Us", value: "+234 906 866 9801", color: "text-blue-600" },
    { icon: <Mail size={20} />, label: "Email Us", value: "ufedenyo1@gmail.com", color: "text-amber-600" },
    { icon: <MapPin size={20} />, label: "Visit Us", value: "Abuja, Nigeria", color: "text-rose-600" },
  ];

  return (
    <section id="contact" className="relative py-32 md:py-48 bg-slate-50 overflow-hidden">
      
      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -right-24 -bottom-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center">
          
          {/* LEFT SIDE: THE PITCH */}
          <div className="lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-2xl mb-8">
                <Sparkles size={16} className="text-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Get Started Today</span>
              </div>

              <h2 className="text-6xl md:text-8xl font-serif font-black text-slate-900 mb-10 leading-[0.9] tracking-tighter">
                Ready to speak <br />
                the <span className="text-blue-600 italic">native</span> tongue?
              </h2>
              
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl mb-12">
                Join dozens of organizations bridging the gap between digital innovation and indigenous culture. Your project deserves to be heard in every language.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  size="lg" 
                  onClick={handleStartProject}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-[1.5rem] px-12 h-20 text-xl font-bold shadow-2xl shadow-blue-200 transition-all hover:scale-105 group"
                >
                  Start Your Project 
                  <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white border-slate-200 text-slate-600 rounded-[1.5rem] px-12 h-20 text-xl font-bold hover:bg-slate-50 shadow-sm"
                >
                  Speak with an Expert
                </Button>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: THE CONTACT CARD */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/5 w-full"
          >
            <div className="bg-white p-10 md:p-14 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 relative overflow-hidden">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[4rem]" />
                <MessageSquare className="absolute top-10 right-10 text-blue-100" size={40} />

                <h3 className="text-3xl font-bold text-slate-900 mb-10 tracking-tight">Direct Channels</h3>
                
                <div className="space-y-10">
                    {contactInfo.map((info, idx) => (
                        <div key={idx} className="flex items-start gap-6 group cursor-default">
                            <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center ${info.color} group-hover:bg-slate-900 group-hover:text-white transition-all duration-300`}>
                                {info.icon}
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{info.label}</p>
                                <p className="text-lg font-bold text-slate-900">{info.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-14 pt-10 border-t border-slate-50 flex items-center gap-4">
                    <div className="flex -space-x-3">
                        {[1,2,3].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                                <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Expert" />
                            </div>
                        ))}
                    </div>
                    <p className="text-xs font-bold text-slate-500">Experts online now</p>
                </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactCTA;