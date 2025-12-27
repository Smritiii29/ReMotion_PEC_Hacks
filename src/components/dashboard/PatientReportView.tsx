import { 
  ArrowLeft, 
  Download, 
  Calendar, 
  Target, 
  Activity, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap
} from "lucide-react";
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
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

interface PatientReportViewProps {
  patient: Patient;
  onBack: () => void;
}

// Mock detailed data for reports
const weeklyProgress = [
  { week: "Week 1", adherence: 65, sessions: 4, duration: 22 },
  { week: "Week 2", adherence: 72, sessions: 5, duration: 25 },
  { week: "Week 3", adherence: 78, sessions: 5, duration: 28 },
  { week: "Week 4", adherence: 85, sessions: 6, duration: 30 },
];

const dailySessions = [
  { day: "Mon", completed: 2, planned: 2 },
  { day: "Tue", completed: 1, planned: 2 },
  { day: "Wed", completed: 2, planned: 2 },
  { day: "Thu", completed: 2, planned: 2 },
  { day: "Fri", completed: 1, planned: 2 },
  { day: "Sat", completed: 1, planned: 1 },
  { day: "Sun", completed: 0, planned: 1 },
];

const exerciseBreakdown = [
  { name: "Stretching", value: 35 },
  { name: "Strength", value: 25 },
  { name: "Balance", value: 20 },
  { name: "Mobility", value: 15 },
  { name: "Cardio", value: 5 },
];

const performanceMetrics = [
  { metric: "Posture", score: 82 },
  { metric: "Range of Motion", score: 75 },
  { metric: "Strength", score: 68 },
  { metric: "Balance", score: 88 },
  { metric: "Endurance", score: 72 },
  { metric: "Flexibility", score: 79 },
];

const recentSessions = [
  { date: "Dec 26, 2025", type: "Morning Routine", duration: "32 min", accuracy: 88, status: "completed" },
  { date: "Dec 25, 2025", type: "Stretching", duration: "18 min", accuracy: 92, status: "completed" },
  { date: "Dec 24, 2025", type: "Strength Training", duration: "25 min", accuracy: 78, status: "completed" },
  { date: "Dec 23, 2025", type: "Balance Exercises", duration: "0 min", accuracy: 0, status: "missed" },
  { date: "Dec 22, 2025", type: "Morning Routine", duration: "30 min", accuracy: 85, status: "completed" },
];

export function PatientReportView({ patient, onBack }: PatientReportViewProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">
                {patient.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{patient.name}</h1>
              <p className="text-muted-foreground">{patient.email}</p>
            </div>
          </div>
        </div>
        <Button className="rounded-xl gap-2" variant="outline">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Report Period */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="w-4 h-4" />
        <span>Report Period: December 1 - December 26, 2025</span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Target className="w-4 h-4 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{patient.adherenceScore}%</p>
          <p className="text-sm text-muted-foreground">Overall Adherence</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-success" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">24</p>
          <p className="text-sm text-muted-foreground">Sessions Completed</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-info/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-info" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">12.5h</p>
          <p className="text-sm text-muted-foreground">Total Exercise Time</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-warning/10 flex items-center justify-center">
              <Zap className="w-4 h-4 text-warning" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">84%</p>
          <p className="text-sm text-muted-foreground">Avg. Accuracy</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Weekly Progress</h3>
              <p className="text-sm text-muted-foreground">Adherence trend over time</p>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyProgress}>
                <defs>
                  <linearGradient id="colorAdherenceReport" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(172, 66%, 40%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(172, 66%, 40%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(180, 20%, 90%)" />
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
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="adherence"
                  stroke="hsl(172, 66%, 40%)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAdherenceReport)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Sessions */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">This Week's Sessions</h3>
              <p className="text-sm text-muted-foreground">Completed vs planned</p>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySessions}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(180, 20%, 90%)" />
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
                  }}
                />
                <Bar dataKey="planned" fill="hsl(180, 20%, 88%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" fill="hsl(160, 60%, 45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Performance Radar */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <h3 className="font-semibold text-foreground mb-4">Performance Metrics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={performanceMetrics}>
                <PolarGrid stroke="hsl(180, 20%, 88%)" />
                <PolarAngleAxis 
                  dataKey="metric" 
                  tick={{ fontSize: 11, fill: 'hsl(180, 10%, 45%)' }}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={{ fontSize: 10, fill: 'hsl(180, 10%, 45%)' }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="hsl(172, 66%, 40%)"
                  fill="hsl(172, 66%, 40%)"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Exercise Breakdown */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <h3 className="font-semibold text-foreground mb-4">Exercise Breakdown</h3>
          <div className="space-y-4">
            {exerciseBreakdown.map((exercise) => (
              <div key={exercise.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-foreground">{exercise.name}</span>
                  <span className="text-sm font-medium text-muted-foreground">{exercise.value}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${exercise.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <h3 className="font-semibold text-foreground mb-4">Key Insights</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-success/5 border border-success/20 rounded-xl">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Strong Balance</p>
                <p className="text-xs text-muted-foreground">Score improved by 15% this month</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-warning/5 border border-warning/20 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Weekend Consistency</p>
                <p className="text-xs text-muted-foreground">Sessions often missed on weekends</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-info/5 border border-info/20 rounded-xl">
              <TrendingUp className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Steady Progress</p>
                <p className="text-xs text-muted-foreground">Adherence up 20% from start</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Sessions Table */}
      <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-foreground">Recent Sessions</h3>
          <p className="text-sm text-muted-foreground">Last 5 exercise sessions</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Date</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Exercise Type</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Duration</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Accuracy</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentSessions.map((session, index) => (
                <tr key={index} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground">{session.date}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{session.type}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{session.duration}</td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {session.accuracy > 0 ? `${session.accuracy}%` : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium",
                        session.status === "completed"
                          ? "bg-success/10 text-success"
                          : "bg-destructive/10 text-destructive"
                      )}
                    >
                      {session.status === "completed" ? "Completed" : "Missed"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Physiotherapist Notes */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
        <h3 className="font-semibold text-foreground mb-4">Physiotherapist Notes</h3>
        <div className="bg-muted/30 rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground italic">
            "Patient showing consistent improvement in balance and flexibility. Recommend increasing 
            strength training frequency. Monitor weekend engagement - may need adjusted scheduling 
            or reminder system. Overall trajectory is positive."
          </p>
          <p className="text-xs text-muted-foreground mt-3">— Dr. Sarah Mitchell, Dec 24, 2025</p>
        </div>
      </div>
    </div>
  );
}
