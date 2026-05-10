const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-serif font-bold text-denyo-blue mb-6">Denyo World</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Leading the way in multilingual sensitization, translation, and digital 
              delivery across Nigeria and beyond.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Services</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="hover:text-denyo-blue cursor-pointer">Linguistic Consulting</li>
              <li className="hover:text-denyo-blue cursor-pointer">Native Transcreation</li>
              <li className="hover:text-denyo-blue cursor-pointer">Audio/Video Localization</li>
              <li className="hover:text-denyo-blue cursor-pointer">Digital Sensitization</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Company</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="hover:text-denyo-blue cursor-pointer">About Us</li>
              <li className="hover:text-denyo-blue cursor-pointer">Our Impact</li>
              <li className="hover:text-denyo-blue cursor-pointer">Coverage Map</li>
              <li className="hover:text-denyo-blue cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Locations</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>Abuja, FCT</li>
              <li>Benue State, Nigeria</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {currentYear} Denyo World Limited. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="hover:text-denyo-blue cursor-pointer">Twitter</span>
            <span className="hover:text-denyo-blue cursor-pointer">LinkedIn</span>
            <span className="hover:text-denyo-blue cursor-pointer">Instagram</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;