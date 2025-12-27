import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Heart, Leaf, Shield, Gem, Star, 
  Sparkles, Activity, Target,
  Zap, Move, Scale, Crown, User,
  ChevronRight, Lock
} from 'lucide-react';
import TransitionProgress from '@/components/transition_progress';
import Sidebar from "@/components/Sidebar";

// ============ TYPES ============
interface BodyPart {
  id: string;
  name: string;
  status: 'needs-attention' | 'improving' | 'untrained';
  message: string;
}

interface StatOrb {
  id: string;
  name: string;
  value: number;
  icon: typeof Activity;
  color: string;
  gradient: string;
  bgColor: string;
}

interface MilestoneItem {
  id: string;
  icon: typeof Gem;
  unlocked: boolean;
  label: string;
  color: string;
}

interface Achievement {
  id: string;
  name: string;
  icon: typeof Crown;
  unlocked: boolean;
  gradient: string;
  iconColor: string;
}

// ============ DATA ============
const bodyParts: BodyPart[] = [
  { id: 'shoulders', name: 'Shoulders', status: 'needs-attention', message: 'Needs attention - focus here next' },
  { id: 'upper-body', name: 'Upper Body', status: 'improving', message: 'Improving steadily - great progress!' },
  { id: 'arms', name: 'Arms', status: 'improving', message: 'Getting stronger every day' },
  { id: 'core', name: 'Core', status: 'untrained', message: 'Not trained yet' },
  { id: 'legs', name: 'Legs', status: 'untrained', message: 'Ready when you are' },
];

const statOrbs: StatOrb[] = [
  { id: 'flexibility', name: 'Flexibility', value: 72, icon: Move, color: 'text-rose-500', gradient: 'from-rose-400 to-pink-500',bgColor: 'bg-rose-100/50' },
  { id: 'strength', name: 'Strength', value: 58, icon: Zap, color: 'text-amber-500', gradient: 'from-amber-400 to-orange-500',bgColor: 'bg-amber-100/50' },
  { id: 'endurance', name: 'Endurance', value: 65, icon: Activity, color: 'text-emerald-500', gradient: 'from-emerald-400 to-teal-500',bgColor: 'bg-emerald-100/50' },
  { id: 'balance', name: 'Balance', value: 80, icon: Scale, color: 'text-violet-500', gradient: 'from-violet-400 to-purple-500',bgColor: 'bg-violet-100/50' },
];

const milestones: MilestoneItem[] = [
  { id: 'start', icon: Leaf, unlocked: true, label: 'Started', color: 'text-emerald-500' },
  { id: 'week1', icon: Flame, unlocked: true, label: 'Week 1', color: 'text-orange-500' },
  { id: 'diamond1', icon: Gem, unlocked: true, label: 'First Gem', color: 'text-blue-500' },
  { id: 'star', icon: Star, unlocked: true, label: 'Rising Star', color: 'text-yellow-500' },
  { id: 'recovery', icon: Heart, unlocked: false, label: 'Recovery Pro', color: 'text-slate-400' },
  { id: 'master', icon: Crown, unlocked: false, label: 'Master', color: 'text-slate-400' },
];

const achievements: Achievement[] = [
  { id: 'consistency', name: 'Consistency Diamond', icon: Gem, unlocked: true, gradient: 'from-cyan-400 to-blue-500', iconColor: 'text-blue-100' },
  { id: 'recovery', name: 'Recovery Star', icon: Star, unlocked: true, gradient: 'from-yellow-400 to-amber-500', iconColor: 'text-yellow-100' },
  { id: 'balance', name: 'Balance Badge', icon: Target, unlocked: true, gradient: 'from-violet-400 to-purple-600', iconColor: 'text-purple-100' },
  { id: 'strength', name: 'Strength Shield', icon: Shield, unlocked: false, gradient: 'from-slate-200 to-slate-300', iconColor: 'text-slate-400' },
];

// ============ COMPONENTS ============

// Header Component
const Header = () => (
  <motion.header 
    className="flex items-center justify-between px-6 py-4"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
  >
    <div className="flex items-center gap-3">
    </div>
    <div className="flex items-center gap-3 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full border border-white/60 shadow-sm">
      <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center shadow-md">
        <User className="w-4 h-4 text-white" />
      </div>
      <span className="text-sm font-bold text-slate-700">Sana</span>
    </div>
  </motion.header>
);

// Page Title Section
const PageTitle = () => (
  <motion.div
    className="text-center mb-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 tracking-tight">
      Your Recovery Journey
    </h2>
    <p className="text-slate-500 font-medium">
      Every step forward is a step towards strength.
    </p>
  </motion.div>
);

// Gamified Progress Rail
const ProgressRail = ({ items }: { items: MilestoneItem[] }) => (
  <motion.div 
    className="relative px-6 py-6 bg-[#ffe5e5] backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-xl shadow-slate-200/50 mb-8 overflow-visible"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
  >
    <div className="relative flex items-center justify-between z-10">
      <div className="absolute top-1/2 left-4 right-4 h-2 bg-slate-100 rounded-full -translate-y-1/2 -z-10" />
      <motion.div 
        className="absolute top-1/2 left-4 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full -translate-y-1/2 -z-10"
        initial={{ width: 0 }}
        animate={{ width: '65%' }}
        transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
      />

      {items.map((item, index) => (
        <div key={item.id} className="relative flex flex-col items-center group">
          <motion.div
            className="relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
          >
            {item.unlocked && (
                <div className="absolute -inset-2 bg-white rounded-full opacity-60 blur-sm" />
            )}
            
            <motion.div
              className={`relative w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-md transition-all duration-300 ${
                item.unlocked 
                  ? 'bg-white border-2 border-emerald-100 transform group-hover:-translate-y-1' 
                  : 'bg-slate-100 border-2 border-slate-100 grayscale'
              }`}
            >
               {item.unlocked && (
                 <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/10 rounded-xl" />
               )}
               
               {item.unlocked ? (
                 <item.icon className={`w-6 h-6 ${item.color} drop-shadow-sm`} strokeWidth={2.5} />
               ) : (
                 <Lock className="w-5 h-5 text-slate-300" />
               )}
            </motion.div>

            {index === 3 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 border-2 border-white"></span>
                </span>
            )}
          </motion.div>
          
          <span className={`text-[11px] md:text-xs mt-3 font-bold uppercase tracking-wide transition-colors ${
            item.unlocked ? 'text-slate-700' : 'text-slate-300'
          }`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  </motion.div>
);

const StreakBadge = ({ count }: { count: number }) => (
  <motion.div 
    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-lg shadow-orange-500/20 text-white"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.35 }}
    whileHover={{ scale: 1.05 }}
  >
    <Flame className="w-5 h-5 fill-white" />
    <span className="text-base font-bold">{count} Day Streak</span>
  </motion.div>
);

// Recovery Level Badge with Bar Chart
const RecoveryLevelBadge = ({ level, progress }: { level: number; progress: number }) => {
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (progress / 100) * circumference;
  
  const metrics = [
    { label: 'Sleep Quality', val: 85, color: 'bg-indigo-400' },
    { label: 'Hydration', val: 60, color: 'bg-blue-400' },
    { label: 'Mobility', val: 72, color: 'bg-emerald-400' }
  ];

  return (
    <motion.div 
      className="relative flex flex-col items-center p-6 bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white/60 h-full"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="w-full flex justify-between items-center mb-4">
         <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Recovery Level</h3>
      </div>
      
      <div className="relative w-40 h-40 mb-4">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="80" cy="80" r="52" stroke="#f1f5f9" strokeWidth="12" fill="none" />
          <motion.circle
            cx="80" cy="80" r="52"
            stroke="url(#levelGradient)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
          />
          <defs>
            <linearGradient id="levelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className="text-5xl font-black text-slate-800"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
            {level}
          </motion.span>
        </div>
      </div>

      {/* NEW: Gamified XP Stat Section */}
      <motion.div 
        className="w-full bg-orange-100 rounded-2xl p-5 mt-14 mb-6 border border-white/50"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        
        <div className="flex justify-between items-center mb-1.5">
          <div className="flex items-center gap-1.5">
            
            <span className="text-[18px] font-black text-slate-600 uppercase tracking-tight">XP</span>
          </div>
          <span className="text-[18px] font-bold text-amber-600">200 / 1,000XP</span>
        </div>
        <div className="h-3 bg-white rounded-full overflow-hidden p-0.5 border border-slate-200">
          <motion.div 
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '20%' }}
            transition={{ duration: 1.5, delay: 1.3, ease: "circOut" }}
          />
        </div>
      </motion.div>
      
      {/* Metrics Bar Chart */}
      <div className="w-full mt-20 space-y-3">
         {metrics.map((m, i) => (
             <div key={m.label}>
                 <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400 mb-1">
                    <span>{m.label}</span>
                    <span>{m.val}%</span>
                 </div>
                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                        className={`h-full ${m.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${m.val}%` }}
                        transition={{ duration: 1, delay: 1.2 + (i * 0.1) }}
                    />
                 </div>
             </div>
         ))}
      </div>
    </motion.div>
  );
};

// Body Silhouette with Heading
const BodySilhouette = ({ parts, onPartHover }: { 
  parts: BodyPart[]; 
  onPartHover: (part: BodyPart | null) => void;
}) => {
  const getPartStyles = (status: string) => {
    switch (status) {
      case 'needs-attention': 
        return { fill: '#fb7185', hover: '#f43f5e' }; 
      case 'improving': 
        return { fill: '#34d399', hover: '#10b981' }; 
      default: 
        // Changed to darker gray for better visibility
        return { fill: '#94a3b8', hover: '#cbd5e1' }; // Slate-400
    }
  };

  const PartPath = ({ d, partId }: { d: string; partId: string }) => {
    const part = parts.find(p => p.id === partId);
    const styles = getPartStyles(part?.status || 'untrained');
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <motion.path
        d={d}
        fill={isHovered ? styles.hover : styles.fill}
        className="cursor-pointer transition-all duration-300"
        onMouseEnter={() => {
          setIsHovered(true);
          onPartHover(part || null);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          onPartHover(null);
        }}
        filter={isHovered ? "url(#glow)" : ""}
      />
    );
  };

  return (
    <motion.div 
      className="relative w-full h-full flex flex-col justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
        {/* Added Heading for Context */}
       <div className="absolute top-0 left-0">
         <h3 className="text-xl font-bold text-slate-700">Recovery Body Map</h3>
         <p className="text-base text-slate-400 font-medium">Your Status</p>
       </div>

      <div className="w-full max-w-[200px] mx-auto mt-8">
        <motion.svg
            viewBox="0 0 200 400"
            className="w-full h-auto drop-shadow-xl"
        >
            <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            
            <ellipse cx="100" cy="42" rx="28" ry="30" fill="#94a3b8" />
            <rect x="88" y="70" width="24" height="18" rx="6" fill="#94a3b8" />
            
            <PartPath d="M48 92 Q58 82 100 85 Q142 82 152 92 L148 108 Q100 102 52 108 Z" partId="shoulders" />
            <PartPath d="M52 108 Q48 130 52 180 Q58 230 68 250 L132 250 Q142 230 148 180 Q152 130 148 108 Q100 102 52 108 Z" partId="upper-body" />
            <PartPath d="M48 92 Q32 98 22 130 Q18 170 22 200 Q28 212 34 206 Q44 175 48 138 Q52 118 52 108 Z" partId="arms" />
            <PartPath d="M152 92 Q168 98 178 130 Q182 170 178 200 Q172 212 166 206 Q156 175 152 138 Q148 118 148 108 Z" partId="arms" />
            <PartPath d="M68 250 Q64 290 58 332 Q56 365 64 388 Q74 394 80 388 Q86 350 90 298 Q92 272 94 250 Z" partId="legs" />
            <PartPath d="M132 250 Q136 290 142 332 Q144 365 136 388 Q126 394 120 388 Q114 350 110 298 Q108 272 106 250 Z" partId="legs" />
        </motion.svg>
        
        <div className="flex justify-center gap-4 mt-6 text-[10px] font-bold uppercase tracking-wider">
            <div className="flex items-center gap-2 text-rose-500">
            <div className="w-3 h-3 rounded-full bg-rose-400" /> Focus
            </div>
            <div className="flex items-center gap-2 text-emerald-600">
            <div className="w-3 h-3 rounded-full bg-emerald-400" /> Good
            </div>
            <div className="flex items-center gap-2 text-slate-400">
            <div className="w-3 h-3 rounded-full bg-slate-400" /> Rest
            </div>
        </div>
      </div>
    </motion.div>
  );
};

// Stat Orb Component - Increased Size
const StatOrb = ({ stat, delay }: { stat: StatOrb; delay: number }) => {
  const circumference = 2 * Math.PI * 28;
  const offset = circumference - (stat.value / 100) * circumference;
  
  return (
    <motion.div
      // CHANGED: Removed 'bg-white/50', added `${stat.bgColor} backdrop-blur-sm`
      className={`relative flex flex-col items-center p-3 ${stat.bgColor} backdrop-blur-sm rounded-2xl border border-white/60 transition-colors hover:bg-white`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, y: -2 }}
    >
      {/* ... rest of the SVG and content remains exactly the same ... */}
      <div className="relative w-20 h-20 mb-2">
        <svg className="w-full h-full -rotate-90 relative z-10" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" stroke="#f1f5f9" strokeWidth="5" fill="none" />
          <motion.circle
            cx="32" cy="32" r="28"
            className="stroke-current"
            style={{ stroke: `url(#${stat.id}Gradient)` }}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut", delay: delay + 0.2 }}
          />
          <defs>
            <linearGradient id={`${stat.id}Gradient`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" className={stat.color.replace('text', 'text-opacity-50')} />
              <stop offset="100%" stopColor="currentColor" className={stat.color} />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <stat.icon className={`w-8 h-8 ${stat.color}`} />
        </div>
      </div>
      
      <span className="text-lg font-black text-slate-700">{stat.value}%</span>
      <span className="text-[10px] font-bold text-slate-400 uppercase">{stat.name}</span>
    </motion.div>
  );
};

const MovementQualitySection = ({ stats }: { stats: StatOrb[] }) => (
  <motion.div
    className="p-6 bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white/60 h-full flex flex-col justify-between"
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.6 }}
  >
    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
      <Activity className="w-4 h-4 text-emerald-500" />
      Movement Quality
    </h3>
    
    <div className="grid grid-cols-2 gap-4 flex-grow place-items-center">
      {stats.map((stat, index) => (
        <StatOrb key={stat.id} stat={stat} delay={0.7 + index * 0.1} />
      ))}
    </div>
  </motion.div>
);

// Achievements Section - Fixed Clipping
const AchievementsSection = ({ items }: { items: Achievement[] }) => (
  <motion.div
    className="mt-6 p-6 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 rounded-[2rem] shadow-2xl text-white relative"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.9 }}
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />

    <div className="flex items-center justify-between mb-4 relative z-10">
      <h3 className="text-sm font-bold text-indigo-200 flex items-center gap-2 uppercase tracking-wider">
        <Crown className="w-4 h-4" />
        Achievements
      </h3>
      <ChevronRight className="w-4 h-4 text-indigo-300" />
    </div>
    
    {/* Added negative margin and padding to the scroll container to prevent shadow clipping */}
    <div className="flex items-center gap-4 overflow-x-auto pb-4 pt-2 -mx-2 px-2 relative z-10 no-scrollbar">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className={`relative flex-shrink-0 flex flex-col items-center p-3 rounded-2xl border transition-all ${
            item.unlocked 
              ? 'bg-white/10 border-white/20' 
              : 'bg-white/5 border-transparent opacity-50'
          }`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + index * 0.1, type: "spring" }}
          whileHover={item.unlocked ? { scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' } : {}}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 bg-gradient-to-br ${item.gradient} shadow-lg`}>
            {item.unlocked ? (
              <item.icon className={`w-5 h-5 ${item.iconColor}`} />
            ) : (
              <Lock className="w-4 h-4 text-slate-400" />
            )}
          </div>
          <span className="text-[10px] font-medium text-center text-indigo-100 max-w-[60px] leading-tight">
            {item.name}
          </span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// ============ MAIN PAGE COMPONENT ============
const Progress1 = () => {
  const [showTransition, setShowTransition] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [hoveredPart, setHoveredPart] = useState<BodyPart | null>(null);

  const handleTransitionComplete = () => {
    setShowTransition(false);
    setShowContent(true);
  };

  return (
    /* Wrap in flex to ensure sidebar and content sit side-by-side */
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar activeItem="progress" /> 
      
      <div className="flex-1 relative">
        <TransitionProgress
          isVisible={showTransition}
          onComplete={handleTransitionComplete}
          streakCount={5}
          levelUp={{ from: 4, to: 5 }}
        />

        <AnimatePresence>
          {showContent && (
            <motion.div
              className="min-h-screen relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Background Gradients */}
              <div className="fixed inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-emerald-50/80 to-transparent" />
                  <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-teal-200/20 blur-[100px] rounded-full mix-blend-multiply" />
                  <div className="absolute bottom-[0%] right-[10%] w-[600px] h-[600px] bg-orange-100/40 blur-[120px] rounded-full mix-blend-multiply" />
              </div>

              <Header />

              <main className="relative z-10 container max-w-6xl mx-auto px-4 py-6">
                <PageTitle />
                
                <ProgressRail items={milestones} />

                <div className="flex justify-center mb-10">
                  <StreakBadge count={5} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                  {/* Left Column - Stats with XP */}
                  <div className="lg:col-span-3 h-full">
                    <RecoveryLevelBadge level={4} progress={68} />
                  </div>

                  {/* Center Column - Body */}
                  <div className="lg:col-span-5">
                    <motion.div 
                      className="relative p-8 bg-white/40 backdrop-blur-md rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white/50 min-h-[500px] flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <AnimatePresence>
                        {hoveredPart && (
                          <motion.div
                            className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-800 text-white text-xs font-medium rounded-full shadow-lg z-20"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                          >
                            {hoveredPart.message}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <BodySilhouette parts={bodyParts} onPartHover={setHoveredPart} />
                    </motion.div>
                  </div>

                  {/* Right Column - Quality & Achievements */}
                  <div className="lg:col-span-4 flex flex-col gap-6">
                    <MovementQualitySection stats={statOrbs} />
                    <AchievementsSection items={achievements} />
                  </div>
                </div>
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Progress1;