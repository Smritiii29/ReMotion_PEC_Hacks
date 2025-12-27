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

// Role type
type UserRole = "patient" | "physiotherapist" | null;

// Profile data for physiotherapist
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

// Profile data for patient (minimal for now)
interface PatientProfile extends DocumentData {
  passwordChanged?: boolean;
  selected_avatar_id?: string;
  // Add more patient-specific fields later
}

// Union of possible profile shapes
type UserProfile = PhysioProfile | PatientProfile | null;

// Auth context value type
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

// Create context with proper type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Provider component props
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load role and profile from Firestore
  const loadUserProfile = async (uid: string) => {
    try {
      // Check Physiotherapists collection first
      const physioSnap = await getDoc(doc(db, "Physiotherapists", uid));
      if (physioSnap.exists()) {
        const data = physioSnap.data() as PhysioProfile;
        setUserRole("physiotherapist");
        setUserProfile(data);
        return;
      }

      // Then check Patients (Users collection)
      const patientSnap = await getDoc(doc(db, "Users", uid));
      if (patientSnap.exists()) {
        const data = patientSnap.data() as PatientProfile;
        setUserRole("patient");
        setUserProfile(data);
        return;
      }

      console.warn("No profile found for user:", uid);
      setUserRole(null);
      setUserProfile(null);
    } catch (error: any) {
      console.warn("Profile fetch failed:", error.message);
      setUserRole(null);
      setUserProfile(null);
    }
  };

  // Register function (currently only physiotherapists)
  const register = async (
    email: string,
    password: string,
    role: string = "physiotherapist",
    profileData: Partial<PhysioProfile> = {}
  ): Promise<UserCredential> => {
    if (role !== "physiotherapist") {
      throw new Error("Patient registration is not available at this time.");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create physiotherapist document
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

      // Load fresh profile
      await loadUserProfile(user.uid);

      return userCredential;
    } catch (err) {
      throw err;
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<UserCredential> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await loadUserProfile(userCredential.user.uid);
    return userCredential;
  };

  // Logout function
  const logout = async (): Promise<void> => {
    setUserRole(null);
    setUserProfile(null);
    setCurrentUser(null);
    await signOut(auth);
  };

  // Auth state observer
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
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-800 mx-auto mb-8"></div>
            <p className="text-2xl font-medium text-gray-700">Loading your dashboard...</p>
            <p className="text-gray-500 mt-4">Please wait a moment</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}