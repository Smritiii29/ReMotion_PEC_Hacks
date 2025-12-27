import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AvatarCanvas } from '../components/ui/AvatarCanvas';
import { useAvatar } from "@/context/AvatarContext";
import grid from "@/assets/grid.png";

interface Exercise {
  id: number;
  name: string;
  description: string;
  sets: string;
  reps: string;
  duration: string;
}

const exerciseThemes = [
  { bg: "bg-mint", accent: "bg-dark-teal" },
  { bg: "bg-peach-stat", accent: "bg-dark-teal" },
  { bg: "bg-pink-stat", accent: "bg-dark-teal" },
];

const exercises: Exercise[] = [
  {
    id: 1,
    name: "Bicep Curls",
    description: "Power your everyday actions. The strength you are building here translates directly into real-world functional benefits.",
    sets: "3",
    reps: "10",
    duration: "~15 mins",
  },
  {
    id: 2,
    name: "Shoulder Press",
    description: "Push the boundaries of your recovery, not your pain. Stay in a comfortable range and focus on perfect form.",
    sets: "4",
    reps: "8",
    duration: "~12 mins",
  },
  {
    id: 3,
    name: "Leg Extensions",
    description: "Prioritize form over heavy weight. A slow, controlled tempo with a squeeze at the top builds quality strength.",
    sets: "3",
    reps: "12",
    duration: "~18 mins",
  },
];

const ExerciseCarousel = () => {
  const { selectedAvatar } = useAvatar();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);

  const theme = exerciseThemes[currentIndex % exerciseThemes.length];
  const currentExercise = exercises[currentIndex];
  const navigate = useNavigate();

  const handleStartSession = () => {
    navigate("/patient/exercise");
  };

  const goToNext = useCallback(() => {
    setSlideDirection("left");
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % exercises.length);
      setSlideDirection(null);
    }, 300);
  }, []);

  const goToPrev = useCallback(() => {
    setSlideDirection("right");
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + exercises.length) % exercises.length);
      setSlideDirection(null);
    }, 300);
  }, []);

  return (
    <div className="relative bg-[#e0f2f0] w-full min-h-[600px] flex items-center justify-center p-8 overflow-hidden">
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-25"
        style={{ background: "radial-gradient(circle at 50% 50%, #99f6e4 0%, transparent 70%)" }}
      />

      {/* Main Content Container: Side-by-Side Layout */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-7xl">
        
        {/* --- LEFT COLUMN: EXERCISE CARD --- */}
        <div className="flex-1 flex items-center justify-center min-w-[400px]">
          {/* Navigation Arrow Left */}
          <button 
            onClick={goToPrev} 
            className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-white/50 hover:bg-white text-teal-800 transition-all shadow-sm mr-4"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Card */}
          <div className="relative w-[400px] h-[480px]">
             {/* Decor Cards (Background Stack) */}
            <div className={`absolute right-0 top-3 w-[calc(100%-20px)] h-full ${theme.bg}/40 rounded-3xl translate-x-2`} />
            <div className={`absolute right-0 top-6 w-[calc(100%-40px)] h-full ${theme.bg}/20 rounded-3xl translate-x-4`} />

            {/* Main Active Card */}
            <div 
              className={`relative ${theme.bg} rounded-3xl p-8 h-full flex flex-col shadow-xl border border-white/40 transition-all duration-500 ease-out z-10
              ${slideDirection === "left" ? "opacity-0 -translate-x-10 scale-95" : 
                slideDirection === "right" ? "opacity-0 translate-x-10 scale-95" : "opacity-100 translate-x-0 scale-100"}`}
            >
              <div className="flex-1">
                <h2 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">{currentExercise.name}</h2>
                <p className="text-lg leading-relaxed text-slate-700/90 font-medium">
                  {currentExercise.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-black/5">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="bg-white/80 px-4 py-2 rounded-xl text-lg font-bold text-slate-800 shadow-sm">
                    {currentExercise.sets} Sets
                  </span>
                  <span className="text-slate-400 font-bold">×</span>
                  <span className="bg-white/80 px-4 py-2 rounded-xl text-lg font-bold text-slate-800 shadow-sm">
                    {currentExercise.reps} Reps
                  </span>
                  <span className="ml-auto text-sm font-semibold text-slate-500 bg-black/5 px-3 py-1 rounded-full">
                    {currentExercise.duration}
                  </span>
                </div>
                
                <button 
                  onClick={handleStartSession} 
                  className={`w-full ${theme.accent} hover:brightness-110 text-white text-lg font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95`}
                >
                  Start Session
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Arrow Right */}
          <button 
             onClick={goToNext} 
             className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-white/50 hover:bg-white text-teal-800 transition-all shadow-sm ml-4"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* --- RIGHT COLUMN: AVATAR VIEWER --- */}
        <div className="flex-1 w-full max-w-[500px]">
            <div
              className="relative w-full h-[500px] rounded-[2.5rem] bg-white/40 backdrop-blur-md border border-white/50 shadow-2xl overflow-hidden"
              // Adjust background position to center the grid floor
              style={{ 
                backgroundImage: `url(${grid})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 80%' 
              }}
            >
              <div className="absolute inset-0">
                <AvatarCanvas
                  modelUrl={selectedAvatar.introModel}
                  isSelected
                  accentColor="#2dd4bf"
                  variant="exercise"
                />
              </div>

              {/* Optional: Label Overlay */}
              <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                 <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest opacity-60">Interactive Preview</p>
              </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ExerciseCarousel;