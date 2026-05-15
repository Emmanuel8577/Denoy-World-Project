import { motion } from "framer-motion";

const ImpactHero = () => {
  return (
    <section className="relative pt-40 pb-32 bg-white">
      {/* Modern Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            <span className="text-blue-600 font-black uppercase tracking-widest text-[10px]">Driving Real Change</span>
          </div>

          <h1 className="text-6xl md:text-[100px] font-serif font-black text-slate-900 leading-[0.9] mb-10 tracking-tighter">
            Our <span className="text-blue-600 underline decoration-slate-200 underline-offset-8">Impact.</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Beyond lines of code, we measure our success by the communities empowered and the communication barriers we've dismantled across West Africa.
          </p>

          <div className="mt-16 flex flex-wrap justify-center gap-4">
             <div className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs">View Case Studies</div>
             <div className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs">Sustainability Report</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactHero;