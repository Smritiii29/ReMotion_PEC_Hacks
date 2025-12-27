import { useState } from "react";
import { 
  Search, 
  MoreVertical, 
  Eye, 
  Mail, 
  Trash2,
  Filter,
  UserCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { PatientAnalyticsModal } from "./PatientAnalyticsModal";

export interface Patient {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: "needs-password" | "needs-avatar" | "active" | "inactive";
  lastActivity: string;
  adherenceScore: number;
}

interface PatientListProps {
  patients: Patient[];
  onResendCredentials: (patient: Patient) => void;
  onRemovePatient: (patient: Patient) => void;
}

const statusConfig = {
  "needs-password": {
    label: "Needs Password Change",
    className: "bg-warning/10 text-warning border-warning/20",
  },
  "needs-avatar": {
    label: "Needs Avatar Selection",
    className: "bg-info/10 text-info border-info/20",
  },
  active: {
    label: "Fully Active",
    className: "bg-success/10 text-success border-success/20",
  },
  inactive: {
    label: "Inactive",
    className: "bg-muted text-muted-foreground border-border",
  },
};

export function PatientList({ patients, onResendCredentials, onRemovePatient }: PatientListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="space-y-4">
        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search patients by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11 rounded-xl gap-2">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter by Status</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                All Patients
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                Fully Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("needs-password")}>
                Needs Password Change
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("needs-avatar")}>
                Needs Avatar Selection
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                Inactive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Patient Cards */}
        <div className="grid gap-3">
          {filteredPatients.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <UserCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No patients found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredPatients.map((patient, index) => (
              <div
                key={patient.id}
                className="bg-card border border-border rounded-2xl p-4 sm:p-5 hover:shadow-card transition-all duration-200 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {patient.avatar ? (
                      <img
                        src={patient.avatar}
                        alt={patient.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-semibold text-primary">
                        {patient.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-foreground truncate">
                          {patient.name}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {patient.email}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="flex-shrink-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => setSelectedPatient(patient)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Analytics
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onResendCredentials(patient)}>
                            <Mail className="w-4 h-4 mr-2" />
                            Resend Credentials
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onRemovePatient(patient)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove Patient
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Status and Activity */}
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-medium border",
                          statusConfig[patient.status].className
                        )}
                      >
                        {statusConfig[patient.status].label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Last active: {patient.lastActivity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Adherence Progress */}
                {patient.status === "active" && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Adherence Score</span>
                      <span className="text-sm font-semibold text-foreground">
                        {patient.adherenceScore}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          patient.adherenceScore >= 80
                            ? "bg-success"
                            : patient.adherenceScore >= 50
                            ? "bg-warning"
                            : "bg-destructive"
                        )}
                        style={{ width: `${patient.adherenceScore}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Analytics Modal */}
      <PatientAnalyticsModal
        patient={selectedPatient}
        isOpen={!!selectedPatient}
        onClose={() => setSelectedPatient(null)}
      />
    </>
  );
}
