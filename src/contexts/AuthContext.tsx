// import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
//   User,
//   UserCredential,
// } from "firebase/auth";
// import {
//   doc,
//   getDoc,
//   setDoc,
//   serverTimestamp,
//   DocumentData,
//   Timestamp,
// } from "firebase/firestore";

// import { auth, db } from "../config/firebase";

// // === Types & Interfaces ===
// type UserRole = "patient" | "physiotherapist" | null;

// interface PhysioProfile extends DocumentData {
//   email: string;
//   role: "physiotherapist";
//   name: string;
//   licenseNumber: string;
//   phoneNumber: string;
//   specialization: string;
//   createdAt: Timestamp | null;
//   updatedAt: Timestamp | null;
// }

// interface PatientProfile extends DocumentData {
//   passwordChanged?: boolean;
//   selected_avatar_id?: string;
//   // Add more patient fields as needed
// }

// type UserProfile = PhysioProfile | PatientProfile | null;

// interface AuthContextType {
//   currentUser: User | null;
//   userRole: UserRole;
//   userProfile: UserProfile;
//   loading: boolean;
//   register: (
//     email: string,
//     password: string,
//     role?: string,
//     profileData?: Partial<PhysioProfile>
//   ) => Promise<UserCredential>;
//   login: (email: string, password: string) => Promise<UserCredential>;
//   logout: () => Promise<void>;
// }

// // Create context
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Custom hook
// export function useAuth(): AuthContextType {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export function AuthProvider({ children }: AuthProviderProps) {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [userRole, setUserRole] = useState<UserRole>(null);
//   const [userProfile, setUserProfile] = useState<UserProfile>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   const loadUserProfile = async (uid: string) => {
//     try {
//       // Check Physiotherapists collection first
//       const physioSnap = await getDoc(doc(db, "Physiotherapists", uid));
//       if (physioSnap.exists()) {
//         const data = physioSnap.data() as PhysioProfile;
//         setUserRole("physiotherapist");
//         setUserProfile(data);
//         return;
//       }

//       // Then check Patients (in Users collection)
//       const patientSnap = await getDoc(doc(db, "Users", uid));
//       if (patientSnap.exists()) {
//         const data = patientSnap.data() as PatientProfile;
//         setUserRole("patient");
//         setUserProfile(data);
//         return;
//       }

//       // No profile found
//       console.warn("No profile document found for user:", uid);
//       setUserRole(null);
//       setUserProfile(null);
//     } catch (error: any) {
//       console.error("Error loading user profile:", error);
//       setUserRole(null);
//       setUserProfile(null);
//     }
//   };

//   // Register (only physiotherapists for now)
//   const register = async (
//     email: string,
//     password: string,
//     role: string = "physiotherapist",
//     profileData: Partial<PhysioProfile> = {}
//   ): Promise<UserCredential> => {
//     if (role !== "physiotherapist") {
//       throw new Error("Patient registration is handled separately.");
//     }

//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     await setDoc(doc(db, "Physiotherapists", user.uid), {
//       email: user.email,
//       role: "physiotherapist",
//       name: profileData.name || "",
//       licenseNumber: profileData.licenseNumber || "",
//       phoneNumber: profileData.phoneNumber || "",
//       specialization: profileData.specialization || "",
//       createdAt: serverTimestamp(),
//       updatedAt: serverTimestamp(),
//     });

//     await loadUserProfile(user.uid);
//     return userCredential;
//   };

//   const login = async (email: string, password: string): Promise<UserCredential> => {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     await loadUserProfile(userCredential.user.uid);
//     return userCredential;
//   };

//   const logout = async (): Promise<void> => {
//     await signOut(auth);
//     setCurrentUser(null);
//     setUserRole(null);
//     setUserProfile(null);
//   };

//   // Listen to auth state changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       setCurrentUser(user);
//       setLoading(true);

//       if (user) {
//         await loadUserProfile(user.uid);
//       } else {
//         setUserRole(null);
//         setUserProfile(null);
//       }

//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const value: AuthContextType = {
//     currentUser,
//     userRole,
//     userProfile,
//     loading,
//     register,
//     login,
//     logout,
//   };

//   // Always render children — routing and UI should handle loading states
//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// src/contexts/AuthContext.tsx

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  DocumentData,
  Timestamp,
} from "firebase/firestore";

import { auth, db } from "../config/firebase";

// === Types & Interfaces ===
type UserRole = "patient" | "physiotherapist" | null;

// Physiotherapist profile
interface PhysioProfile extends DocumentData {
  email: string;
  role: "physiotherapist";
  name: string;
  licenseNumber: string;
  phoneNumber: string;
  specialization: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

// Patient profile — key fields for onboarding
interface PatientProfile extends DocumentData {
  email?: string;
  name?: string;
  phoneNum?: string;
  assignedTherapist?: string;
  passwordChanged?: boolean;
  selected_avatar_id?: string;     // ← Critical for avatar persistence
  role?: "patient";
  createdAt?: Timestamp;
}

type UserProfile = PhysioProfile | PatientProfile | null;

interface AuthContextType {
  currentUser: User | null;
  userRole: UserRole;
  userProfile: UserProfile;
  loading: boolean;
  register: (
    email: string,
    password: string,
    role?: string,
    profileData?: Partial<PhysioProfile>
  ) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadUserProfile = async (uid: string) => {
    try {
      // 1. Check if physiotherapist
      const physioSnap = await getDoc(doc(db, "Physiotherapists", uid));
      if (physioSnap.exists()) {
        const data = physioSnap.data() as PhysioProfile;
        setUserRole("physiotherapist");
        setUserProfile(data);
        return;
      }

      // 2. Check if patient (in Users collection)
      const patientSnap = await getDoc(doc(db, "Users", uid));
      if (patientSnap.exists()) {
        const data = patientSnap.data() as PatientProfile;
        setUserRole("patient");
        setUserProfile(data);
        return;
      }

      // No profile found
      console.warn("No profile document found for user:", uid);
      setUserRole(null);
      setUserProfile(null);
    } catch (error: any) {
      console.error("Error loading user profile:", error);
      setUserRole(null);
      setUserProfile(null);
    }
  };

  // Register physiotherapist only
  const register = async (
    email: string,
    password: string,
    role: string = "physiotherapist",
    profileData: Partial<PhysioProfile> = {}
  ): Promise<UserCredential> => {
    if (role !== "physiotherapist") {
      throw new Error("Patient registration is handled separately.");
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "Physiotherapists", user.uid), {
      email: user.email,
      role: "physiotherapist",
      name: profileData.name || "",
      licenseNumber: profileData.licenseNumber || "",
      phoneNumber: profileData.phoneNumber || "",
      specialization: profileData.specialization || "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    await loadUserProfile(user.uid);
    return userCredential;
  };

  const login = async (email: string, password: string): Promise<UserCredential> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await loadUserProfile(userCredential.user.uid);
    return userCredential;
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
    setCurrentUser(null);
    setUserRole(null);
    setUserProfile(null);
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(true);

      if (user) {
        await loadUserProfile(user.uid);
      } else {
        setUserRole(null);
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    currentUser,
    userRole,
    userProfile,
    loading,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}