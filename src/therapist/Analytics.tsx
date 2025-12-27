import {
  BarChart3,
  TrendingUp,
  Users,
  Activity,
  Calendar,
  Target,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ================= MOCK DATA ================= */

const weeklyOverview = [
  { day: "Mon", sessions: 45 },
  { day: "Tue", sessions: 52 },
  { day: "Wed", sessions: 38 },
  { day: "Thu", sessions: 48 },
  { day: "Fri", sessions: 55 },
  { day: "Sat", sessions: 32 },
  { day: "Sun", sessions: 28 },
];

const monthlyTrend = [
  { month: "Oct", patients: 12 },
  { month: "Nov", patients: 18 },
  { month: "Dec", patients: 24 },
];

const statusDistribution = [
  { name: "Active", value: 65, color: "hsl(160, 60%, 45%)" },
  { name: "Onboarding", value: 20, color: "hsl(35, 90%, 55%)" },
  { name: "Inactive", value: 15, color: "hsl(180, 10%, 45%)" },
];

/* ================= PAGE ================= */

export default function Analytics() {
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          Analytics
        </h1>
        <p className="text-muted-foreground mt-1">
          Track overall performance and patient engagement insights.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Sessions"
          value="298"
          icon={Activity}
          variant="primary"
        />
        <StatCard
          title="Avg. Adherence"
          value="82%"
          icon={Target}
          variant="success"
        />
        <StatCard
          title="Active Patients"
          value="18"
          icon={Users}
        />
        <StatCard
          title="Completion Rate"
          value="78%"
          icon={TrendingUp}
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Sessions */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Weekly Overview</h3>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyOverview}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sessions" fill="hsl(172, 66%, 40%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Growth */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-5 h-5 text-success" />
            <h3 className="font-semibold text-foreground">Monthly Growth</h3>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient id="patientsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(172, 66%, 40%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(172, 66%, 40%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="patients"
                  stroke="hsl(172, 66%, 40%)"
                  fill="url(#patientsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Status Pie */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-5 h-5 text-info" />
            <h3 className="font-semibold text-foreground">Patient Status</h3>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={80}
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-5 h-5 text-warning" />
            <h3 className="font-semibold text-foreground">Quick Insights</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-muted/30 rounded-xl p-4">
              <p className="text-sm text-muted-foreground">Most Active Day</p>
              <p className="text-lg font-semibold">Friday</p>
            </div>
            <div className="bg-muted/30 rounded-xl p-4">
              <p className="text-sm text-muted-foreground">Avg Session Time</p>
              <p className="text-lg font-semibold">28 mins</p>
            </div>
            <div className="bg-muted/30 rounded-xl p-4">
              <p className="text-sm text-muted-foreground">Top Performer</p>
              <p className="text-lg font-semibold">Robert Martinez</p>
            </div>
            <div className="bg-muted/30 rounded-xl p-4">
              <p className="text-sm text-muted-foreground">Needs Attention</p>
              <p className="text-lg font-semibold text-destructive">3 Patients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
