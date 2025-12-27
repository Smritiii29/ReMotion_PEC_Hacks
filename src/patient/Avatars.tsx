import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAvatar } from '../context/AvatarContext';
import { AVATARS } from '../lib/avatarData';
import { AvatarCanvas } from '../components/ui/AvatarCanvas';
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Zap,
  Trophy
} from 'lucide-react';

export default function AvatarsPage() {
  const { selectedAvatar, setSelectedAvatar } = useAvatar();
  const navigate = useNavigate();

  // ✅ Safe fallback
  const activeAvatar = selectedAvatar ?? AVATARS[0];

  const handleNext = () => {
    const currentIndex = AVATARS.findIndex((a) => a.id === activeAvatar.id);
    setSelectedAvatar(AVATARS[(currentIndex + 1) % AVATARS.length]);
  };

  const handlePrev = () => {
    const currentIndex = AVATARS.findIndex((a) => a.id === activeAvatar.id);
    setSelectedAvatar(AVATARS[(currentIndex - 1 + AVATARS.length) % AVATARS.length]);
  };

  const handleConfirm = () => {
    navigate('/patient/home');
  };

  // 🎨 THEME: Deep Teal/Green "ReMotion" Aesthetic
  const theme = {
    bgGradient: 'radial-gradient(circle at 50% 10%, #112d32 0%, #061214 100%)',
    accentTeal: '#2dd4bf', 
    accentNeon: '#00ffcc',
  };

  return (
    // Removed "flex" wrapper that held the sidebar
    <div 
      className="relative w-full h-screen overflow-hidden text-white font-sans"
      style={{ background: theme.bgGradient }}
    >
        {/* ✨ Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-teal-900/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[100px]" />
        </div>

        {/* 🟢 Header */}
        <header className="relative z-20 px-10 py-8 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-teal-200 drop-shadow-sm">
              Choose <span className="text-teal-400">Companion</span>
            </h1>
            <p className="text-teal-200/60 text-sm font-medium tracking-widest uppercase mt-2">
              Select your training partner
            </p>
          </div>

          {/* Mobile Nav Controls */}
          <div className="flex lg:hidden gap-4">
            <button onClick={handlePrev} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10">
              <ChevronLeft className="text-teal-400" />
            </button>
            <button onClick={handleNext} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10">
              <ChevronRight className="text-teal-400" />
            </button>
          </div>
        </header>

        {/* 🎮 Main Grid Layout - Spans Full Width */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 px-10 pb-8 h-full overflow-hidden">
          
          {/* LEFT: Avatar Grid List */}
          <div className="hidden lg:block lg:col-span-3 h-[85vh] overflow-y-auto pr-4 custom-scrollbar">
            <div className="grid grid-cols-2 gap-3 auto-rows-[9rem]">
              {AVATARS.map((avatar, index) => {
                const isActive = avatar.id === activeAvatar.id;

                return (
                  <motion.div
                    key={avatar.id}
                    onClick={() => setSelectedAvatar(avatar)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`
                      relative group cursor-pointer rounded-xl overflow-hidden
                      transition-all duration-300 ease-out
                      ${isActive 
                        ? 'ring-2 ring-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.3)] bg-teal-900/30' 
                        : 'border border-white/5 hover:border-teal-500/30 bg-white/5 hover:bg-white/10'
                      }
                    `}
                  >
                    {isActive && (
                      <div className="absolute top-2 right-2 z-20 bg-teal-500 rounded-full p-0.5">
                         <CheckCircle2 className="w-3 h-3 text-black" />
                      </div>
                    )}
                    
                    {/* Thumbnail Canvas */}
                    <div className="w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-500">
                      <AvatarCanvas
                        modelUrl={avatar.introModel}
                        isThumbnail
                        isSelected={isActive}
                        accentColor={theme.accentTeal}
                      />
                    </div>

                    {/* Hover Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-center">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-teal-300' : 'text-gray-400'}`}>
                            {avatar.name}
                        </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CENTER: Spotlight Stage */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-end h-[90%]">
             {/* Spotlight Cone */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-full bg-gradient-to-b from-teal-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />

             <AnimatePresence mode="wait">
              <motion.div
                key={activeAvatar.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="w-full h-full relative z-20 flex items-end justify-center"
              >
                <div className="w-full h-full absolute inset-0">
                   <AvatarCanvas
                    modelUrl={activeAvatar.introModel}
                    isSelected={true}
                    isThumbnail={false}
                    accentColor={theme.accentNeon}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

             {/* Floor Disc */}
             <div className="absolute bottom-[5%] w-[500px] h-[70px] bg-teal-500/20 blur-[50px] rounded-[100%] z-0" />
             <div className="absolute bottom-[5%] w-[250px] h-[25px] bg-teal-400/30 blur-[25px] rounded-[100%] z-10" />
          </div>

          {/* RIGHT: Gamified Info Panel */}
          <div className="lg:col-span-3 flex items-center justify-center h-[85vh]">
            <motion.div
              key={activeAvatar.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="
                relative w-full
                bg-[#0f1921]/80 backdrop-blur-xl 
                border border-teal-500/20 
                rounded-3xl p-8 
                shadow-2xl
                flex flex-col gap-6
              "
            >
                <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />

                <div className="space-y-1">
                    <h2 className="text-4xl font-black uppercase italic tracking-wider text-white drop-shadow-md">
                        {activeAvatar.name}
                    </h2>
                    <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-widest border border-teal-500/30 rounded-full px-3 py-1 w-fit bg-teal-900/20">
                        <Sparkles size={12} />
                        {activeAvatar.trait}
                    </div>
                </div>

                <div className="bg-black/30 rounded-xl p-4 border border-white/5 space-y-3">
                     <p className="text-slate-300 text-sm leading-relaxed">
                        {activeAvatar.description}
                     </p>
                     
                     <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Zap size={14} className="text-yellow-400" /> Energy
                        </div>
                        <div className="h-1.5 w-full bg-gray-700 rounded-full mt-1">
                             <div className="h-full bg-yellow-400 rounded-full w-[80%]" />
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Trophy size={14} className="text-purple-400" /> Wisdom
                        </div>
                         <div className="h-1.5 w-full bg-gray-700 rounded-full mt-1">
                             <div className="h-full bg-purple-400 rounded-full w-[90%]" />
                        </div>
                     </div>
                </div>

                <button
                    onClick={handleConfirm}
                    className="
                        group relative w-full mt-2
                        bg-gradient-to-r from-teal-500 to-emerald-500
                        hover:from-teal-400 hover:to-emerald-400
                        text-black font-black uppercase tracking-widest
                        py-4 rounded-xl
                        flex items-center justify-center gap-3
                        transition-all duration-200
                        shadow-[0_0_20px_rgba(45,212,191,0.3)]
                        hover:shadow-[0_0_30px_rgba(45,212,191,0.5)]
                        transform active:scale-[0.98]
                    "
                >
                    Select Agent
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </motion.div>
          </div>
        </div>
    </div>
  );
}