import { Clock, Zap, Activity, ChevronLeft, ChevronRight } from "lucide-react";

const StatsSection = () => {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dates = [15, 16, 17, 18, 19, 20, 21];
  const activeDay = 4; // Friday (19)

  const barData = [0.6, 0.8, 0.95, 0.7, 0.85, 0.5, 0.75];
  const consistencyBars = [0.3, 0.5, 0.85, 0.6, 0.95];

  return (
    <div className="bg-[#1b5550] rounded-3xl p-4">
     
    <div className="grid grid-cols-12 gap-4">

      {/* Recovery Progress - LaRrge Card */}
      <div className="col-span-5 bg-dark-teal rounded-3xl p-6 text-dark-teal-foreground flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold">Recovery Progress</h3>
<p className="text-xs opacity-70">Today, Thursday, 22 Sep</p>

          </div>
          <div className="flex gap-1">
            <button className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10">
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10">
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Week Days */}
        <div className="flex justify-between mb-3">
          {weekDays.map((day, i) => (
            <div key={day} className="text-center">
              <p className="text-[9px] opacity-60 mb-1">{day}</p>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                  i === activeDay ? "bg-white text-dark-teal" : "opacity-70"
                }`}
              >
                {dates[i]}
              </div>
            </div>
          ))}
        </div>

        {/* Mini Chart */}
        <div className="flex-1 flex items-center overflow-visible">

          <svg className="w-full h-16" viewBox="0 0 200 40" preserveAspectRatio="none">
            <path
              d="M0 30 Q25 25, 50 28 T100 18 T150 22 T175 12 T200 18"
              fill="none"
              stroke="white"
              strokeWidth="2"
              opacity="0.8"
            />
            <circle cx="175" cy="12" r="4" fill="white" />
          </svg>
        </div>

        {/* Stats */}
        <div className="flex justify-between mt-2">
          <div>
            <p className="text-xl font-bold">-5.6</p>
            <p className="text-[9px] opacity-60">Done</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">4.4</p>
            <p className="text-[9px] opacity-60">Left</p>
          </div>
        </div>
      </div>

      {/* Active Exercise Time */}
      <div className="col-span-3 bg-teal-stat rounded-2xl p-4 text-teal-stat-foreground flex flex-col">
        <div className="flex items-center gap-1 mb-1">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-[10px]">Active Exercise Time</span>
        </div>
        <p className="text-2xl font-bold mb-3">2h 25m</p>
        
        {/* Bar Chart */}
        <div className="flex-1 flex items-end gap-1.5">
          {barData.map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-dark-teal/80 rounded-t-md transition-all"

              style={{ height: `${height * 100}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {weekDays.map((day) => (
            <span key={day} className="text-[7px] opacity-60">{day}</span>
          ))}
        </div>
      </div>

      {/* Sessions Done */}
      <div className="col-span-2 bg-pink-stat rounded-2xl p-4 text-pink-stat-foreground flex flex-col">
        <div className="flex items-center gap-1 mb-1">
          <Zap className="w-3.5 h-3.5" />
          <span className="text-[10px]">Sessions Done</span>
        </div>
        <p className="text-2xl font-bold mb-2">5</p>
        
        {/* Circular Progress */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 60 60">
              <circle
                cx="30"
                cy="30"
                r="24"
                fill="none"
                stroke="hsl(var(--dark-teal) / 0.2)"
                strokeWidth="5"
              />
              <circle
                cx="30"
                cy="30"
                r="24"
                fill="none"
                stroke="hsl(var(--dark-teal))"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${(5 / 10) * 150.8} 150.8`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold">5/ 10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Movement Consistency */}
      <div className="col-span-2 bg-peach-stat rounded-2xl p-4 text-peach-stat-foreground flex flex-col">
        <div className="flex items-center gap-1 mb-1">
          <Activity className="w-3.5 h-3.5" />
          <span className="text-[10px]">Movement Consistency</span>
        </div>
        <p className="text-lg font-bold mb-3">Stable</p>
        
        {/* Mini Bars */}
        <div className="flex-1 flex items-end gap-2">
          {consistencyBars.map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-muted-foreground/50 rounded-sm"
              style={{ height: `${height * 100}%` }}
            />
          ))}
        </div>
      </div>
    </div>
   </div>
  );
};

export default StatsSection;
