import { Activity, CheckCircle, AlertTriangle, UserPlus, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "session-complete" | "missed-session" | "new-patient" | "milestone";
  message: string;
  time: string;
  patientName?: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "session-complete",
    message: "Completed morning exercise routine",
    time: "10 min ago",
    patientName: "John Smith",
  },
  {
    id: "2",
    type: "new-patient",
    message: "New patient onboarded",
    time: "1 hour ago",
    patientName: "Emma Wilson",
  },
  {
    id: "3",
    type: "milestone",
    message: "Reached 80% weekly adherence",
    time: "2 hours ago",
    patientName: "Michael Chen",
  },
  {
    id: "4",
    type: "missed-session",
    message: "Missed scheduled session",
    time: "4 hours ago",
    patientName: "Sarah Johnson",
  },
  {
    id: "5",
    type: "session-complete",
    message: "Completed stretching exercises",
    time: "5 hours ago",
    patientName: "David Brown",
  },
];

const activityConfig = {
  "session-complete": {
    icon: CheckCircle,
    className: "bg-success/10 text-success",
  },
  "missed-session": {
    icon: AlertTriangle,
    className: "bg-destructive/10 text-destructive",
  },
  "new-patient": {
    icon: UserPlus,
    className: "bg-primary/10 text-primary",
  },
  milestone: {
    icon: Activity,
    className: "bg-info/10 text-info",
  },
};

export function RecentActivityCard() {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Recent Activity</h3>
            <p className="text-sm text-muted-foreground">Latest patient updates</p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {mockActivities.map((activity, index) => {
          const config = activityConfig[activity.type];
          const Icon = config.icon;

          return (
            <div
              key={activity.id}
              className="p-4 hover:bg-muted/30 transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0", config.className)}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.patientName}</p>
                  <p className="text-sm text-muted-foreground truncate">{activity.message}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-muted/30">
        <button className="w-full text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  );
}
