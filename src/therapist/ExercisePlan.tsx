// src/therapist/ExercisePlans.tsx

import { useState } from "react";
import { format, addDays } from "date-fns";
import { 
  Plus, 
  Search, 
  Dumbbell, 
  CheckCircle2, 
  User, 
  Calendar,
  Target,
  FileText,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const EXERCISES = [
  { id: "e1", name: "Wall Slides", type: "Mobility", duration: "10 reps" },
  { id: "e2", name: "Pendulum Swing", type: "Recovery", duration: "2 mins" },
  { id: "e3", name: "External Rotation", type: "Strength", duration: "15 reps" },
  { id: "e4", name: "Bicep Curls", type: "Strength", duration: "12 reps" },
  { id: "e5", name: "Shoulder Press", type: "Strength", duration: "10 reps" },
  { id: "e6", name: "Wrist Flexion", type: "Mobility", duration: "20 reps" },
];

const MOCK_PATIENTS = [
  { id: "p1", name: "Aarav Patel", condition: "Distal Bicep Repair" },
  { id: "p2", name: "Diya Sharma", condition: "Rotator Cuff Tear" },
  { id: "p3", name: "Rohan Gupta", condition: "ACL Reconstruction" },
  { id: "p4", name: "Sanya Malhotra", condition: "Frozen Shoulder" },
];

export default function ExercisePlans() {
  const [activePlans, setActivePlans] = useState<any[]>([]);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isAssignModalOpen, setAssignModalOpen] = useState(false);

  // Program Form State
  const [programName, setProgramName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [totalDays, setTotalDays] = useState("42");
  const [defaultMax, setDefaultMax] = useState("145");
  const [defaultMin, setDefaultMin] = useState("0");
  const [customMax, setCustomMax] = useState("");
  const [accuracyThreshold, setAccuracyThreshold] = useState("85");
  const [notes, setNotes] = useState("");

  // Selection State
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const endDate = addDays(new Date(startDate), parseInt(totalDays) || 0);

  const toggleExercise = (id: string) => {
    setSelectedExercises(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const togglePatient = (id: string) => {
    setSelectedPatients(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleCreateProgram = () => {
    if (!programName.trim()) {
      alert("Program name is required");
      return;
    }

    const newProgram = {
      id: Date.now().toString(),
      name: programName.trim(),
      description: description.trim(),
      start_date: new Date(startDate),
      end_date: endDate,
      total_days: parseInt(totalDays),
      default_rom_targets: {
        elbow_flexion: { min: parseInt(defaultMin), max: parseInt(defaultMax), unit: "degrees" }
      },
      custom_rom_targets: customMax ? {
        elbow_flexion: { min: parseInt(defaultMin), max: parseInt(customMax), unit: "degrees" }
      } : null,
      default_accuracyThreshold: parseInt(accuracyThreshold),
      notes: notes.trim(),
      exercises: EXERCISES.filter(ex => selectedExercises.includes(ex.id)),
      created_at: new Date(),
    };

    setCreateModalOpen(false);
    setAssignModalOpen(true);
    (window as any).tempProgram = newProgram;
  };

  const handleAssign = () => {
    const program = (window as any).tempProgram;
    if (!program || selectedPatients.length === 0) return;

    const assignedTo = MOCK_PATIENTS.filter(p => selectedPatients.includes(p.id));

    const assignedProgram = {
      ...program,
      assignedTo: assignedTo.map(p => ({ id: p.id, name: p.name })),
      status: "active",
    };

    setActivePlans(prev => [assignedProgram, ...prev]);

    delete (window as any).tempProgram;
    setAssignModalOpen(false);
    setSelectedPatients([]);
    resetForm();

    alert(`Program "${program.name}" assigned to ${assignedTo.length} patient(s)!`);
  };

  const handleDeletePlan = (planId: string) => {
    if (confirm("Are you sure you want to delete this program?")) {
      setActivePlans(prev => prev.filter(p => p.id !== planId));
    }
  };

  const resetForm = () => {
    setProgramName("");
    setDescription("");
    setStartDate(format(new Date(), "yyyy-MM-dd"));
    setTotalDays("42");
    setDefaultMax("145");
    setDefaultMin("0");
    setCustomMax("");
    setAccuracyThreshold("85");
    setNotes("");
    setSelectedExercises([]);
  };

  const filteredExercises = EXERCISES.filter(ex =>
    ex.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Exercise Plans
          </h1>
          <p className="text-muted-foreground mt-1">
            Create and assign personalized rehabilitation programs.
          </p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Create New Program
        </Button>
      </div>

      {/* Active Plans */}
      {activePlans.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Active Programs ({activePlans.length})</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activePlans.map(plan => (
              <div key={plan.id} className="rounded-xl border bg-card p-6 shadow-sm relative">
                <button
                  onClick={() => handleDeletePlan(plan.id)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
                  aria-label="Delete program"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <h3 className="font-bold text-lg pr-8">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary"><Calendar className="w-3 h-3 mr-1" />{plan.total_days} days</Badge>
                  <Badge variant="secondary">
                    <Target className="w-3 h-3 mr-1" />
                    ROM: 0–{plan.custom_rom_targets?.elbow_flexion.max ?? plan.default_rom_targets.elbow_flexion.max}°
                  </Badge>
                  <Badge variant="secondary">≥{plan.default_accuracyThreshold}% accuracy</Badge>
                </div>

                <div className="mt-4 text-xs text-muted-foreground">
                  <p>Start: {format(plan.start_date, "dd MMM yyyy")}</p>
                  <p>End: {format(plan.end_date, "dd MMM yyyy")}</p>
                </div>

                <p className="text-xs text-muted-foreground mt-3">
                  Assigned to: {plan.assignedTo.map((p: any) => p.name).join(", ")}
                </p>

                {plan.notes && (
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm">
                    <FileText className="w-4 h-4 inline mr-1" />
                    <span className="font-medium">Notes:</span> {plan.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
            <Dumbbell className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">No Active Plans</h3>
          <p className="text-muted-foreground max-w-sm mx-auto mt-2">
            Click "Create New Program" to build and assign rehabilitation plans.
          </p>
        </div>
      )}

      {/* ================= CREATE PROGRAM MODAL ================= */}
      <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Rehabilitation Program</DialogTitle>
            <DialogDescription>
              Define protocol details and select exercises.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Name & Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Program Name <span className="text-red-500">*</span></Label>
                <Input
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                  placeholder="e.g., Bicep Tendon Recovery – Phase 1"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Safe strengthening after distal bicep repair"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div>
                <Label>Total Days</Label>
                <Input type="number" value={totalDays} onChange={(e) => setTotalDays(e.target.value)} min="1" />
              </div>
              <div>
                <Label>End Date (Auto)</Label>
                <Input value={format(endDate, "dd MMM yyyy")} disabled className="bg-muted" />
              </div>
            </div>

            {/* ROM Targets */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4" /> Elbow Flexion ROM Targets (degrees)
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Default Safe Range</Label>
                  <div className="flex gap-2 mt-1">
                    <Input type="number" value={defaultMin} onChange={(e) => setDefaultMin(e.target.value)} placeholder="Min" />
                    <Input type="number" value={defaultMax} onChange={(e) => setDefaultMax(e.target.value)} placeholder="Max" />
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Custom Limit (Optional)</Label>
                  <Input
                    type="number"
                    value={customMax}
                    onChange={(e) => setCustomMax(e.target.value)}
                    placeholder="e.g., 135 (for pain restriction)"
                  />
                </div>
              </div>
            </div>

            {/* Accuracy & Notes */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Minimum Accuracy Threshold (%)</Label>
                <Input type="number" value={accuracyThreshold} onChange={(e) => setAccuracyThreshold(e.target.value)} min="50" max="100" />
              </div>
              <div>
                <Label>Clinical Notes</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Patient reports pain at 140°. Keep under 135°."
                  rows={3}
                />
              </div>
            </div>

            {/* Exercises */}
            <div>
              <Label className="mb-3 block">
                <Dumbbell className="w-4 h-4 inline mr-1" /> Select Exercises
              </Label>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search exercises..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <ScrollArea className="h-64 rounded-md border p-4">
                <div className="space-y-3">
                  {filteredExercises.map(ex => {
                    const isSelected = selectedExercises.includes(ex.id);

                    return (
                      <div
                        key={ex.id}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          isSelected ? "border-primary bg-primary/5" : "border-border"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Dumbbell className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">{ex.name}</h4>
                            <p className="text-xs text-muted-foreground">{ex.type} • {ex.duration}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={isSelected ? "default" : "outline"}
                          onClick={() => toggleExercise(ex.id)}
                        >
                          {isSelected ? "Added" : "Add"}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateProgram} disabled={!programName.trim()}>
              Proceed to Assign Patients
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================= ASSIGN PATIENTS MODAL ================= */}
      <Dialog open={isAssignModalOpen} onOpenChange={setAssignModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Program to Patients</DialogTitle>
            <DialogDescription>
              Select one or more patients for this plan.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-96 pr-4">
            <div className="space-y-3">
              {MOCK_PATIENTS.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-muted/30 transition"
                >
                  <Checkbox
                    id={patient.id}
                    checked={selectedPatients.includes(patient.id)}
                    onCheckedChange={() => togglePatient(patient.id)}
                  />
                  <label htmlFor={patient.id} className="flex-1 cursor-pointer">
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-sm text-muted-foreground">{patient.condition}</div>
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setAssignModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAssign}
              disabled={selectedPatients.length === 0}
            >
              Assign to {selectedPatients.length} Patient{selectedPatients.length !== 1 ? "s" : ""}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}