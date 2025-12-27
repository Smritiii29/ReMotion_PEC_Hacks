import { X, TrendingUp, Target, Calendar, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Patient } from "./PatientList";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface PatientAnalyticsModalProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
}

// Mock data for charts
const weeklyData = [
  { day: "Mon", sessions: 2, adherence: 85 },
  { day: "Tue", sessions: 3, adherence: 90 },
  { day: "Wed", sessions: 1, adherence: 70 },
  { day: "Thu", sessions: 2, adherence: 80 },
  { day: "Fri", sessions: 3, adherence: 95 },
  { day: "Sat", sessions: 1, adherence: 60 },
  { day: "Sun", sessions: 2, adherence: 88 },
];

const monthlyTrend = [
  { week: "Week 1", score: 65 },
  { week: "Week 2", score: 72 },
  { week: "Week 3", score: 78 },
  { week: "Week 4", score: 85 },
];

export function PatientAnalyticsModal({ patient, isOpen, onClose }: PatientAnalyticsModalProps) {
  if (!patient) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-3xl sm:max-h-[85vh] bg-card rounded-2xl shadow-elevated z-50 flex flex-col transition-all duration-300 overflow-hidden",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-semibold text-primary">
                {patient.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{patient.name}</h2>
              <p className="text-sm text-muted-foreground">Recovery Analytics</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">Adherence</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{patient.adherenceScore}%</p>
            </div>
            <div className="bg-success/5 rounded-xl p-4 border border-success/10">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-success" />
                <span className="text-xs font-medium text-muted-foreground">Sessions</span>
              </div>
              <p className="text-2xl font-bold text-foreground">24</p>
            </div>
            <div className="bg-info/5 rounded-xl p-4 border border-info/10">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-info" />
                <span className="text-xs font-medium text-muted-foreground">This Week</span>
              </div>
              <p className="text-2xl font-bold text-foreground">5/7</p>
            </div>
            <div className="bg-warning/5 rounded-xl p-4 border border-warning/10">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-warning" />
                <span className="text-xs font-medium text-muted-foreground">Posture Score</span>
              </div>
              <p className="text-2xl font-bold text-foreground">82%</p>
            </div>
          </div>

          {/* Charts */}
          <div className="space-y-6">
            {/* Weekly Sessions */}
            <div className="bg-muted/30 rounded-xl p-5 border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Session Completion</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <defs>
                      <linearGradient id="colorAdherence" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(172, 66%, 40%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(172, 66%, 40%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(180, 20%, 88%)" />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fontSize: 12, fill: 'hsl(180, 10%, 45%)' }}
                      axisLine={{ stroke: 'hsl(180, 20%, 88%)' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: 'hsl(180, 10%, 45%)' }}
                      axisLine={{ stroke: 'hsl(180, 20%, 88%)' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(0, 0%, 100%)',
                        border: '1px solid hsl(180, 20%, 88%)',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px hsl(180, 20%, 50%, 0.1)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="adherence"
                      stroke="hsl(172, 66%, 40%)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorAdherence)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Trend */}
            <div className="bg-muted/30 rounded-xl p-5 border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Progress Trend</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(180, 20%, 88%)" />
                    <XAxis 
                      dataKey="week" 
                      tick={{ fontSize: 12, fill: 'hsl(180, 10%, 45%)' }}
                      axisLine={{ stroke: 'hsl(180, 20%, 88%)' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: 'hsl(180, 10%, 45%)' }}
                      axisLine={{ stroke: 'hsl(180, 20%, 88%)' }}
                      domain={[0, 100]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(0, 0%, 100%)',
                        border: '1px solid hsl(180, 20%, 88%)',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px hsl(180, 20%, 50%, 0.1)'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(160, 60%, 45%)"
                      strokeWidth={3}
                      dot={{ fill: "hsl(160, 60%, 45%)", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/30">
          <div className="flex justify-between items-center">
            <Button variant="outline" className="rounded-xl" disabled>
              Export Report
            </Button>
            <Button onClick={onClose} className="rounded-xl">
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
