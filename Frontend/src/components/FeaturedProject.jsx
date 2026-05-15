import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, Globe2, ChevronLeft, ChevronRight, 
  MessageSquare, Zap, Play, Pause, Volume2, VolumeX 
} from "lucide-react";
import { motion } from "framer-motion";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// LIVE CLOUDINARY LINKS
const CLOUDINARY_VIDEOS = {
  english: "https://res.cloudinary.com/dg4vwrzho/video/upload/v1778450891/english_nragme.mp4",
  hausa: "https://res.cloudinary.com/dg4vwrzho/video/upload/v1778450884/hausa_c9e2jm.mp4"
};

const FeaturedProject = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  
  const videoRefs = useRef([]);

  const videoSlides = [
    { lang: "English", src: CLOUDINARY_VIDEOS.english },
    { lang: "Hausa", src: CLOUDINARY_VIDEOS.hausa },
    { lang: "French", src: null },
  ];

  const features = [
    { icon: <Globe2 size={22} />, title: "Indigenous Expertise", desc: "Immersion in native dialects including Hausa and Idoma." },
    { icon: <CheckCircle2 size={22} />, title: "Cultural Fidelity", desc: "Our process adapts idioms to make messages feel local." },
    { icon: <Zap size={22} />, title: "Rapid Deployment", desc: "Agile workflows for digital sensitized apps." },
    { icon: <MessageSquare size={22} />, title: "Audience Resonance", desc: "Ensuring messages trigger the intended response." }
  ];

  // Logic to handle Play/Pause and Mute specifically for the visible slide
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        video.muted = isMuted;
        if (isPlaying) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // If browser blocks autoplay, sync state
              setIsPlaying(false);
            });
          }
        } else {
          video.pause();
        }
      } else {
        // Stop and mute all background videos
        video.pause();
        video.muted = true;
      }
    });
  }, [activeIndex, isPlaying, isMuted]);

  const togglePlay = () => setIsPlaying((prev) => !prev);
  const toggleMute = () => setIsMuted((prev) => !prev);

  return (
    <section id="showcase" className="relative py-24 md:py-40 bg-slate-50 overflow-hidden">
      <div className="absolute top-10 left-10 text-[15rem] font-black text-slate-200/20 select-none pointer-events-none uppercase tracking-tighter">
        Native
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          
          {/* LEFT SIDE: CONTENT */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 lg:max-w-[50%]"
          >
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm mb-8 border border-slate-100">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Case Study: Denyo Connect</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-serif font-black text-slate-900 mb-8 leading-[1.1]">
              Impactful <span className="text-blue-600 italic">Visual</span> Storytelling.
            </h2>
            
            <p className="text-xl text-slate-500 mb-12 leading-relaxed font-medium">
              We don't just translate words; we translate experiences. Our deployment across Nigeria's landscape ensures precision and deep cultural resonance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
              {features.map((item, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 shadow-lg shadow-blue-100/50 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500 font-medium leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE: PHONE SLIDER */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full lg:max-w-[45%] flex flex-col items-center"
          >
            <div className="relative w-full max-w-[400px]">
                
                {/* MEDIA CONTROLS */}
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
                    <button 
                        onClick={togglePlay}
                        className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-slate-900 hover:bg-blue-600 hover:text-white transition-all active:scale-90"
                    >
                        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                    </button>
                    <button 
                        onClick={toggleMute}
                        className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-slate-900 hover:bg-blue-600 hover:text-white transition-all active:scale-90"
                    >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                </div>

                <div className="relative z-20 rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] bg-slate-900 border-[12px] border-slate-900 aspect-[9/18]">
                    <Swiper
                        modules={[Navigation, Pagination, EffectFade]}
                        effect="fade"
                        navigation={{
                            nextEl: ".btn-next",
                            prevEl: ".btn-prev",
                        }}
                        onSlideChange={(swiper) => {
                          setActiveIndex(swiper.activeIndex);
                        }}
                        pagination={{ clickable: true }}
                        className="w-full h-full"
                    >
                        {videoSlides.map((video, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative h-full w-full bg-slate-800">
                                {video.src ? (
                                    <video 
                                        ref={el => videoRefs.current[index] = el}
                                        loop 
                                        playsInline
                                        className="w-full h-full object-cover opacity-80"
                                    >
                                        <source src={video.src} type="video/mp4" />
                                    </video>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-white/20 italic text-center px-10">
                                        {video.lang} Version Coming Soon
                                    </div>
                                )}
                                
                                {/* Overlay to catch clicks for play/pause toggle */}
                                <div 
                                    onClick={togglePlay}
                                    className="absolute inset-0 z-30 cursor-pointer" 
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                                
                                <div className="absolute bottom-12 left-8 right-8 z-20 pointer-events-none">
                                    <Badge className="bg-blue-600 text-white border-none px-4 py-1.5 shadow-xl font-bold uppercase tracking-widest text-[10px] mb-3">
                                        Current Language: {video.lang}
                                    </Badge>
                                    <h3 className="text-white text-2xl font-bold italic tracking-tight">Culturally Adapted</h3>
                                </div>
                            </div>
                        </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="flex justify-center gap-6 mt-12">
                    <button className="btn-prev w-16 h-16 rounded-2xl border border-slate-200 flex items-center justify-center hover:bg-white hover:shadow-xl transition-all text-slate-900 bg-transparent active:scale-95">
                        <ChevronLeft size={32} />
                    </button>
                    <button className="btn-next w-16 h-16 rounded-2xl border border-slate-200 flex items-center justify-center hover:bg-white hover:shadow-xl transition-all text-slate-900 bg-transparent active:scale-95">
                        <ChevronRight size={32} />
                    </button>
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;