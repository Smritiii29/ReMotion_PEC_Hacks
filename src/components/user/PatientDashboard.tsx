import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { doc, getDoc, updateDoc, DocumentData } from "firebase/firestore";
import { db } from "../../config/firebase";
import { updatePassword, User } from "firebase/auth";

import Logout from "../accounts/Logout";
import Avatar3DViewer from "./Avatar3DViewer";
import { localAvatars } from "../../data/avatars";

// Define expected shape of patient data from Firestore
interface PatientData extends DocumentData {
  passwordChanged?: boolean;
  selected_avatar_id?: string;
  // Add other fields if needed (e.g., name, progress, etc.)
}

const PatientDashboard: React.FC = () => {
  const { currentUser, logout } = useAuth(); // logout may be unused now, but kept for consistency

  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [showAvatarModal, setShowAvatarModal] = useState<boolean>(false);
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<PatientData | null>(null);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, "Users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data() as PatientData;
          setUserData(data);

          // Onboarding flow: password → avatar
          if (!data.passwordChanged) {
            setShowPasswordModal(true);
          } else if (!data.selected_avatar_id) {
            setShowAvatarModal(true);
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  // Handle password update
  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!currentUser) {
      setError("User not authenticated");
      return;
    }

    try {
      await updatePassword(currentUser as User, newPassword);
      await updateDoc(doc(db, "Users", currentUser.uid), {
        passwordChanged: true,
      });

      setShowPasswordModal(false);
      setShowAvatarModal(true); // Proceed to avatar selection
      setError("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error("Password update failed:", err);
      if (err.code === "auth/requires-recent-login") {
        setError("Please log out and log in again to change your password.");
      } else {
        setError("Failed to update password. Try again.");
      }
    }
  };

  // Handle avatar selection
  const handleAvatarSelect = async () => {
    if (!selectedAvatarId) {
      setError("Please select an avatar");
      return;
    }

    if (!currentUser) return;

    try {
      await updateDoc(doc(db, "Users", currentUser.uid), {
        selected_avatar_id: selectedAvatarId,
      });

      setShowAvatarModal(false);
      setError("");
      // Refresh to reflect changes (or update userData state directly)
      window.location.reload();
    } catch (err) {
      console.error("Avatar save failed:", err);
      setError("Failed to save avatar selection");
    }
  };

  // Find currently selected avatar
  const selectedAvatar = localAvatars.find(
    (avatar) => avatar.id === userData?.selected_avatar_id
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header with 3D Avatar */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
          <div className="w-48 h-64 sm:w-64 sm:h-80 bg-white rounded-2xl overflow-hidden shadow-xl border-4 border-sky-700">
            {selectedAvatar?.model_path ? (
              <Avatar3DViewer
                modelUrl={selectedAvatar.model_path}
                className="w-full h-full"
                scale={1.4}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm font-medium">
                No avatar selected
              </div>
            )}
          </div>

          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-800">Patient Dashboard</h1>
            <p className="text-lg text-gray-600 mt-1">
              Welcome, {currentUser?.email || "Patient"}
            </p>
            {selectedAvatar && (
              <p className="mt-2 text-base font-medium text-sky-700">
                Avatar: {selectedAvatar.name}
              </p>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium"
        >
          Logout
        </button>

        {/* Modals */}
        <Logout modal={showLogoutModal} setModal={setShowLogoutModal} />

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-lg max-w-md w-full shadow-2xl">
              <h2 className="text-2xl font-bold mb-4">Set Your Password</h2>
              <p className="mb-6 text-gray-600">
                For security, please set a new password before continuing.
              </p>

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-sky-500 outline-none"
                minLength={6}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-sky-500 outline-none"
              />

              {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

              <button
                onClick={handlePasswordChange}
                className="w-full py-3 bg-sky-800 text-white rounded font-medium hover:bg-sky-900 transition"
              >
                Update Password
              </button>
            </div>
          </div>
        )}

        {/* Avatar Selection Modal */}
        {showAvatarModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Avatar</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {localAvatars.map((avatar) => (
                  <div
                    key={avatar.id}
                    onClick={() => setSelectedAvatarId(avatar.id)}
                    className={`cursor-pointer rounded-lg overflow-hidden border-4 transition-all ${
                      selectedAvatarId === avatar.id
                        ? "border-sky-700 shadow-lg scale-105"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="w-full h-48 bg-gray-50">
                      <Avatar3DViewer modelUrl={avatar.model_path} scale={1.0} />
                    </div>
                    <p className="text-center py-3 font-medium text-gray-800 bg-white">
                      {avatar.name}
                    </p>
                  </div>
                ))}
              </div>

              {error && <p className="text-red-600 mt-6 text-center font-medium">{error}</p>}

              <button
                onClick={handleAvatarSelect}
                disabled={!selectedAvatarId}
                className="w-full mt-8 py-3 bg-sky-800 text-white rounded font-medium hover:bg-sky-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Confirm Selection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;