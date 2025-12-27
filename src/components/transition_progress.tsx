import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Leaf, Flame, Shield, Gem } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TransitionProgressProps {
  isVisible: boolean;
  onComplete: () => void;
  streakCount?: number;
  levelUp?: { from: number; to: number } | null;
  achievement?: string | null;
}

const TransitionProgress = ({
  isVisible,
  onComplete,
  streakCount = 5,
  levelUp = { from: 4, to: 5 },
  achievement = "Consistency Champion"
}: TransitionProgressProps) => {
  const [showContent, setShowContent] = useState(false);
  // Phases allow us to sequence: Background In -> Content In -> Content Out -> Background Out
  const [phase, setPhase] = useState<'entering' | 'showing' | 'exiting'>('entering');

  useEffect(() => {
    if (isVisible) {
      setPhase('entering');
      setShowContent(true);

      // Sequence timeline
      const showTimer = setTimeout(() => setPhase('showing'), 500);
      const exitTimer = setTimeout(() => setPhase('exiting'), 4500);
      const completeTimer = setTimeout(() => {
        setShowContent(false);
        onComplete();
      }, 3200);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(exitTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isVisible, onComplete]);

  // Floating background icons configuration
  const floatingIcons = [
    { Icon: Gem, delay: 0.1, x: -100, y: -90, scale: 1.1 },
    { Icon: Leaf, delay: 0.2, x: 120, y: -50, scale: 1.9 },
    { Icon: Flame, delay: 0.15, x: -90, y: 90, scale: 0.9 },
    { Icon: Heart, delay: 0.25, x: 100, y: 80, scale: 3 },
    { Icon: Shield, delay: 0.3, x: 0, y: -130, scale: 1.3 },
  ];

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* --- Background Gradient Slide --- */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #34d399 0%, #2dd4bf 50%, #67e8f9 100%)'
            }}
            initial={{ x: '100%' }}
            animate={{
              x: phase === 'exiting' ? '-100%' : '0%'
            }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1]
            }}
          />

          {/* --- Ambient Glow Blobs --- */}
          <motion.div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'showing' ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-white/20 blur-3xl mix-blend-overlay" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-teal-100/20 blur-3xl mix-blend-overlay" />
          </motion.div>

          {/* --- Main Content Container --- */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: phase === 'showing' ? 1 : 0,
              scale: phase === 'showing' ? 1 : 0.9
            }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            
            {/* 1. Floating Background Icons */}
            <div className="absolute inset-0 pointer-events-none">
              {floatingIcons.map(({ Icon, delay, x, y, scale }, index) => (
                <motion.div
                  key={index}
                  className="absolute left-1/2 top-1/2 text-white/40"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: phase === 'showing' ? [0, 1, 1] : 0,
                    scale: phase === 'showing' ? [0, scale * 1.2, scale] : 0,
                    x: x,
                    y: y
                  }}
                  transition={{
                    duration: 0.6,
                    delay: delay,
                    ease: "easeOut"
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 3 + index * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Icon strokeWidth={2} className="w-8 h-8 drop-shadow-sm" />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* 2. Central Red Gem Graphic */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0, rotate: -45 }}
              animate={{
                scale: phase === 'showing' ? 1 : 0,
                rotate: phase === 'showing' ? 0 : -45
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], y: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-40 h-40 flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-red-600/30 rounded-full blur-2xl transform scale-75" />
                
                {/* 3D Faceted Gem SVG */}
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                  {/* Top Left Facet (Lightest) */}
                  <polygon points="50,5 5,50 50,50" className="fill-red-400" />
                  {/* Top Right Facet */}
                  <polygon points="50,5 95,50 50,50" className="fill-red-500" />
                  {/* Bottom Left Facet */}
                  <polygon points="5,50 50,95 50,50" className="fill-red-600" />
                  {/* Bottom Right Facet (Darkest) */}
                  <polygon points="95,50 50,95 50,50" className="fill-red-700" />
                  
                  {/* Highlight */}
                  <polygon points="20,35 35,35 30,50 15,50" className="fill-white/20 blur-[1px]" />
                </svg>
              </motion.div>
            </motion.div>

            {/* 3. Level Up Indicator */}
            {levelUp && (
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: phase === 'showing' ? 1 : 0,
                  y: phase === 'showing' ? 0 : 20
                }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-center gap-3 mb-1">
                  
                  <span className="text-5xl font-bold text-[#075c56] drop-shadow-md">Level {levelUp.to}</span>
                </div>
                <p className="text-base text-white/90 font-medium uppercase tracking-wide">
                  Recovery Level Up!
                </p>
              </motion.div>
            )}

            {/* 4. Streak Pill */}
            <motion.div
              className="mb-8 flex items-center gap-2 bg-white backdrop-blur-md px-6 py-2 rounded-full border border-white/30 shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: phase === 'showing' ? 1 : 0.8,
                opacity: phase === 'showing' ? 1 : 0
              }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <Flame className="w-5 h-5 text-orange-600 fill-red-500" />
              <span className="text-yellow-500 font-bold text-lg tracking-tight">
                {streakCount} Day Streak
              </span>
            </motion.div>

            {/* 5. Main Heading */}
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white leading-tight mx-auto"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: phase === 'showing' ? 1 : 0,
                y: phase === 'showing' ? 0 : 15
              }}
              transition={{ delay: 0.6 }}
            >
              Your body remembers progress
            </motion.h2>

            {/* 6. Achievement Footer */}
            {achievement && (
              <motion.div
                className="mt-8 flex items-center gap-2 text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'showing' ? 1 : 0 }}
                transition={{ delay: 0.7 }}
              >
                <Shield className="w-4 h-4" />
                <span className="text-base font-semibold uppercase tracking-wider">
                  {achievement} Unlocked
                </span>
              </motion.div>
            )}
          </motion.div>

          {/* --- Floating Particles --- */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'showing' ? 1 : 0 }}
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -40],
                  opacity: [0, 0.5, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransitionProgress;