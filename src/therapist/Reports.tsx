import { useState } from "react";
import { FileText, Search, ChevronRight } from "lucide-react";

import { PatientReportView } from "@/components/dashboard/PatientReportView";
import { Patient } from "@/components/dashboard/PatientList";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/* ================= MOCK DATA ================= */

const patients: Patient[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    status: "active",
    lastActivity: "Today, 10:30 AM",
    adherenceScore: 85,
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    status: "active",
    lastActivity: "Today, 8:15 AM",
    adherenceScore: 92,
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@email.com",
    status: "active",
    lastActivity: "Today, 9:45 AM",
    adherenceScore: 78,
  },
  {
    id: "6",
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    status: "inactive",
    lastActivity: "1 week ago",
    adherenceScore: 45,
  },
  {
    id: "7",
    name: "Robert Martinez",
    email: "robert.martinez@email.com",
    status: "active",
    lastActivity: "Today, 7:00 AM",
    adherenceScore: 95,
  },
  {
    id: "8",
    name: "Jennifer Taylor",
    email: "jennifer.taylor@email.com",
    status: "active",
    lastActivity: "Yesterday",
    adherenceScore: 72,
  },
];

/* ================= PAGE ================= */

export default function Reports() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ================= SINGLE REPORT VIEW ================= */
  if (selectedPatient) {
    return (
      <PatientReportView
        patient={selectedPatient}
        onBack={() => setSelectedPatient(null)}
      />
    );
  }

  /* ================= LIST VIEW ================= */
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          Patient Reports
        </h1>
        <p className="text-muted-foreground mt-1">
          View detailed individual reports for each patient&apos;s recovery journey.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-11 rounded-xl"
        />
      </div>

      {/* Patient Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.map((patient, index) => (
          <button
            key={patient.id}
            onClick={() => setSelectedPatient(patient)}
            className="bg-card border border-border rounded-2xl p-5 text-left hover:shadow-card hover:border-primary/20 transition-all duration-200 animate-slide-up group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {patient.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {patient.email}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground">
                  Adherence Score
                </p>
                <p className="text-lg font-bold text-foreground">
                  {patient.adherenceScore}%
                </p>
              </div>

              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  View Report
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
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
          </button>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="font-medium">No patients found</p>
          <p className="text-sm">Try adjusting your search</p>
        </div>
      )}
    </div>
  );
}
