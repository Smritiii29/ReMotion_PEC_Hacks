// import { useState } from "react";
// import { UserPlus } from "lucide-react";

// import { PatientList, Patient } from "@/components/dashboard/PatientList";
// import { AddPatientDrawer } from "@/components/dashboard/AddPatientDrawer";
// import { Button } from "@/components/ui/button";
// import { toast } from "@/hooks/use-toast";

// /* ================= MOCK DATA ================= */

// const initialPatients: Patient[] = [
//   {
//     id: "1",
//     name: "John Smith",
//     email: "john.smith@email.com",
//     status: "active",
//     lastActivity: "Today, 10:30 AM",
//     adherenceScore: 85,
//   },
//   {
//     id: "2",
//     name: "Emma Wilson",
//     email: "emma.wilson@email.com",
//     status: "needs-avatar",
//     lastActivity: "Yesterday",
//     adherenceScore: 0,
//   },
//   {
//     id: "3",
//     name: "Michael Chen",
//     email: "michael.chen@email.com",
//     status: "active",
//     lastActivity: "Today, 8:15 AM",
//     adherenceScore: 92,
//   },
//   {
//     id: "4",
//     name: "Sarah Johnson",
//     email: "sarah.johnson@email.com",
//     status: "needs-password",
//     lastActivity: "2 days ago",
//     adherenceScore: 0,
//   },
//   {
//     id: "5",
//     name: "David Brown",
//     email: "david.brown@email.com",
//     status: "active",
//     lastActivity: "Today, 9:45 AM",
//     adherenceScore: 78,
//   },
//   {
//     id: "6",
//     name: "Lisa Anderson",
//     email: "lisa.anderson@email.com",
//     status: "inactive",
//     lastActivity: "1 week ago",
//     adherenceScore: 45,
//   },
//   {
//     id: "7",
//     name: "Robert Martinez",
//     email: "robert.martinez@email.com",
//     status: "active",
//     lastActivity: "Today, 7:00 AM",
//     adherenceScore: 95,
//   },
//   {
//     id: "8",
//     name: "Jennifer Taylor",
//     email: "jennifer.taylor@email.com",
//     status: "active",
//     lastActivity: "Yesterday",
//     adherenceScore: 72,
//   },
// ];

// /* ================= PAGE ================= */

// export default function Patients() {
//   const [patients, setPatients] = useState<Patient[]>(initialPatients);
//   const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);

//   const handleAddPatient = (patientData: {
//     name: string;
//     email: string;
//     phone?: string;
//   }) => {
//     const newPatient: Patient = {
//       id: Date.now().toString(),
//       name: patientData.name,
//       email: patientData.email,
//       status: "needs-password",
//       lastActivity: "Just now",
//       adherenceScore: 0,
//     };

//     setPatients((prev) => [newPatient, ...prev]);

//     toast({
//       title: "Patient Added",
//       description: `${patientData.name} has been added successfully.`,
//     });
//   };

//   const handleResendCredentials = (patient: Patient) => {
//     toast({
//       title: "Credentials Resent",
//       description: `Login credentials have been resent to ${patient.email}`,
//     });
//   };

//   const handleRemovePatient = (patient: Patient) => {
//     setPatients((prev) => prev.filter((p) => p.id !== patient.id));

//     toast({
//       title: "Patient Removed",
//       description: `${patient.name} has been removed from your patient list.`,
//     });
//   };

//   return (
//     <div className="space-y-6 lg:space-y-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
//             Patients
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             Manage your patients and track their recovery journey.
//           </p>
//         </div>

//         <Button
//           onClick={() => setIsAddDrawerOpen(true)}
//           className="h-12 px-6 rounded-xl shadow-glow hover:shadow-elevated transition-all duration-300"
//         >
//           <UserPlus className="w-5 h-5 mr-2" />
//           Add New Patient
//         </Button>
//       </div>

//       {/* Patient List */}
//       <PatientList
//         patients={patients}
//         onResendCredentials={handleResendCredentials}
//         onRemovePatient={handleRemovePatient}
//       />

//       {/* Add Patient Drawer */}
//       <AddPatientDrawer
//         isOpen={isAddDrawerOpen}
//         onClose={() => setIsAddDrawerOpen(false)}
//         onPatientAdded={handleAddPatient}
//       />
//     </div>
//   );
// }
// src/therapist/Patients.tsx

// src/therapist/Patients.tsx

import { useState } from "react";
import { UserPlus } from "lucide-react";

import { PatientList, Patient } from "@/components/dashboard/PatientList";
import { AddPatientDrawer } from "@/components/dashboard/AddPatientDrawer";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

import { useAuth } from "@/contexts/AuthContext";
import { auth, db } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

/* ================= MOCK DATA (kept for existing patients display) ================= */

const initialPatients: Patient[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    status: "active",
    lastActivity: "Today, 10:30 AM",
    adherenceScore: 85,
  },
  {
    id: "2",
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    status: "needs-avatar",
    lastActivity: "Yesterday",
    adherenceScore: 0,
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
    id: "4",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    status: "needs-password",
    lastActivity: "2 days ago",
    adherenceScore: 0,
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

export default function Patients() {
  const { currentUser } = useAuth(); // Current logged-in therapist
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);

  // Generate a strong temporary password
  const generateTempPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleAddPatient = async (patientData: {
    name: string;
    email: string;
    phone?: string;
  }) => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "You must be logged in to add patients.",
        variant: "destructive",
      });
      return;
    }

    const tempPassword = generateTempPassword();

    try {
      // 1️⃣ Create Firebase Auth account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        patientData.email.trim(),
        tempPassword
      );

      const patientUid = userCredential.user.uid;

      // 2️⃣ Create patient document in Firestore
      await setDoc(doc(db, "Users", patientUid), {
        name: patientData.name.trim(),
        email: patientData.email.trim(),
        phone: patientData.phone?.trim() || "",
        assignedTherapist: currentUser.uid,
        assignedTherapistEmail: currentUser.email,
        passwordChanged: false,           // Force password change on first login
        selected_avatar_id: "",           // Force avatar selection
        createdAt: new Date(),
        createdBy: currentUser.uid,
        status: "needs-password",         // For UI consistency
      });

      // 3️⃣ Add to local patient list (for immediate UI feedback)
      const newPatient: Patient = {
        id: patientUid,
        name: patientData.name,
        email: patientData.email,
        status: "needs-password",
        lastActivity: "Just now",
        adherenceScore: 0,
      };

      setPatients((prev) => [newPatient, ...prev]);

      // 4️⃣ Success feedback
      toast({
        title: "Patient Added Successfully!",
        description: `${patientData.name} has been added. Temporary password: ${tempPassword}`,
      });

      // In production: send email with tempPassword via backend (Firebase Functions + Nodemailer)
      console.log(`Temporary password for ${patientData.email}: ${tempPassword}`);

      setIsAddDrawerOpen(false);
    } catch (error: any) {
      console.error("Failed to add patient:", error);

      let message = "Failed to add patient.";
      if (error.code === "auth/email-already-in-use") {
        message = "This email is already registered.";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email address.";
      } else if (error.code === "auth/weak-password") {
        message = "Password is too weak.";
      }

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleResendCredentials = (patient: Patient) => {
    toast({
      title: "Credentials Resent",
      description: `Login credentials have been resent to ${patient.email}`,
    });
  };

  const handleRemovePatient = (patient: Patient) => {
    setPatients((prev) => prev.filter((p) => p.id !== patient.id));

    toast({
      title: "Patient Removed",
      description: `${patient.name} has been removed from your patient list.`,
    });
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Patients
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your patients and track their recovery journey.
          </p>
        </div>

        <Button
          onClick={() => setIsAddDrawerOpen(true)}
          className="h-12 px-6 rounded-xl shadow-glow hover:shadow-elevated transition-all duration-300"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Add New Patient
        </Button>
      </div>

      {/* Patient List */}
      <PatientList
        patients={patients}
        onResendCredentials={handleResendCredentials}
        onRemovePatient={handleRemovePatient}
      />

      {/* Add Patient Drawer */}
      <AddPatientDrawer
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        onPatientAdded={handleAddPatient}
      />
    </div>
  );
}