import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword, User } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { auth, db } from "../../config/firebase";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handlePasswordChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const user: User | null = auth.currentUser;

      if (!user) {
        throw new Error("User not authenticated.");
      }

      // 1️⃣ Update Firebase Authentication password
      await updatePassword(user, newPassword);

      // 2️⃣ Update Firestore document to mark password as changed
      await updateDoc(doc(db, "Users", user.uid), {
        passwordChanged: true,
      });

      // 3️⃣ Redirect to patient dashboard (or onboarding if needed)
      navigate("/patient/dashboard");
    } catch (err: any) {
      console.error("Password update failed:", err);
      setError("Failed to update password. Please re-authenticate and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Set a New Password
        </h2>

        <p className="text-sm text-gray-600 text-center mb-6">
          For security reasons, please set a new password before continuing.
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600 text-center bg-red-50 py-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              placeholder="Enter new password"
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-sky-700 text-white rounded-md hover:bg-sky-800 transition disabled:opacity-60 disabled:cursor-not-allowed font-medium"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}