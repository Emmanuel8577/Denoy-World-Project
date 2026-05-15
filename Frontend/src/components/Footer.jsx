import React from "react";
import * as LucideIcons from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Helper to safely render icons even if the library is acting up
  const Icon = ({ name, size = 18 }) => {
    const LucideIcon = LucideIcons[name];
    if (!LucideIcon) return null;
    return <LucideIcon size={size} />;
  };
  
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-100 relative">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fcfcfc_1px,transparent_1px),linear-gradient(to_bottom,#fcfcfc_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* BRAND */}
          <div className="lg:col-span-4">
            <h3 className="text-3xl font-serif font-black text-slate-900 mb-6 tracking-tighter uppercase">
              Denyo <span className="text-blue-600">World.</span>
            </h3>
            <p className="text-slate-500 text-base font-medium leading-relaxed mb-8 max-w-xs">
              Bridging the gap between digital innovation and indigenous culture.
            </p>
            <div className="flex gap-4">
              {["Twitter", "Linkedin", "Instagram"].map((social) => (
                <div key={social} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all cursor-pointer">
                  <Icon name={social} />
                </div>
              ))}
            </div>
          </div>
          
          {/* LINKS */}
          <div className="lg:col-span-4 grid grid-cols-2">
            <div>
              <h4 className="font-black text-slate-900 mb-8 uppercase tracking-[0.2em] text-[10px]">Expertise</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-400">
                <li>Translation</li>
                <li>Transcreation</li>
                <li>Voice-Over</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-slate-900 mb-8 uppercase tracking-[0.2em] text-[10px]">Company</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-400">
                <li>About Us</li>
                <li>Our Impact</li>
              </ul>
            </div>
          </div>

          {/* LOCATIONS */}
          <div className="lg:col-span-4">
            <h4 className="font-black text-slate-900 mb-8 uppercase tracking-[0.2em] text-[10px]">Global Presence</h4>
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-2 text-blue-600">
                  <Icon name="MapPin" size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Nigeria Hub</span>
                </div>
                <p className="text-sm font-bold text-slate-900">Abuja, FCT — <span className="text-slate-400 font-medium">Nigeria</span></p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2 text-rose-500">
                  <Icon name="Globe" size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">North America</span>
                </div>
                <p className="text-sm font-bold text-slate-900">Ohio, USA — <span className="text-slate-400 font-medium">Strategic Ops</span></p>
              </div>
            </div>
          </div>
        </div>
        
        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            © {currentYear} Denyo World Limited
          </p>
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Global Hubs Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;