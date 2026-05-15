import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin, Sparkles, MessageSquare, Send } from "lucide-react";

const ContactCTA = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", phone: "", message: "" });

  const handleStartProject = () => {
    const token = localStorage.getItem("token");
    token ? navigate("/Profile") : navigate("/Auth");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add your submission logic here (e.g., API call)
    alert("Message sent successfully!");
    setFormData({ email: "", phone: "", message: "" });
  };

  const contactInfo = [
    { icon: <Phone size={18} />, value: "+234 906 866 9801" },
    { icon: <Mail size={18} />, value: "ufedenyo1@gmail.com" },
    { icon: <MapPin size={18} />, value: "Abuja, Benue, NG • Ohio, USA" },
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
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* LEFT SIDE: THE PITCH */}
          <div className="lg:w-1/2 sticky top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-2xl mb-8">
                <Sparkles size={16} className="text-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Get Started Today</span>
              </div>

              <h2 className="text-6xl md:text-7xl font-serif font-black text-slate-900 mb-10 leading-[0.9] tracking-tighter">
                Ready to speak <br />
                the <span className="text-blue-600 italic">native</span> tongue?
              </h2>
              
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg mb-12">
                Join dozens of organizations bridging the gap between digital innovation and indigenous culture.
              </p>

              {/* Minimalist Contact Info Row */}
              <div className="space-y-6 mb-12">
                {contactInfo.map((info, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-slate-600">
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm">
                      {info.icon}
                    </div>
                    <span className="font-bold text-sm">{info.value}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={handleStartProject}
                className="bg-slate-900 hover:bg-blue-600 text-white rounded-2xl px-10 h-16 text-sm font-black uppercase tracking-widest transition-all group"
              >
                Portal Access <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </motion.div>
          </div>

          {/* RIGHT SIDE: THE INTERACTIVE FORM */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full"
          >
            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] border border-slate-100 relative">
                <h3 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Send a Message</h3>
                <p className="text-slate-400 text-sm mb-10 font-medium">We usually respond within 2 business hours.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="name@company.com"
                        className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500/20 outline-none font-medium transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="+234..."
                        className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500/20 outline-none font-medium transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Message</label>
                    <textarea 
                      required
                      rows="4"
                      placeholder="Tell us about your project..."
                      className="w-full p-6 rounded-3xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500/20 outline-none font-medium transition-all resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-16 text-sm font-black uppercase tracking-widest shadow-xl shadow-blue-100 transition-all group"
                  >
                    Send Message <Send className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
                  </Button>
                </form>

                <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Operations</p>
                    <div className="flex gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-black text-slate-900 uppercase">Systems Online</span>
                    </div>
                </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactCTA;