import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ErrorMessage from "../layouts/ErrorMessage";

// Define the shape of additional profile data passed during registration
interface PhysioProfile {
  name: string;
  licenseNumber: string;
  phoneNumber: string;
  specialization: string;
}

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [licenseNumber, setLicenseNumber] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [specialization, setSpecialization] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Basic client-side validation
    if (!name.trim()) return setError("Full name is required");
    if (!licenseNumber.trim()) return setError("License number is required");
    if (password !== confirmPassword) return setError("Passwords do not match");
    if (password.length < 6) return setError("Password must be at least 6 characters");

    setLoading(true);

    try {
      const profileData: PhysioProfile = {
        name: name.trim(),
        licenseNumber: licenseNumber.trim(),
        phoneNumber: phoneNumber.trim(),
        specialization: specialization.trim(),
      };

      // Assuming your register function accepts: email, password, role, profile
      await register(email.trim(), password, "physiotherapist", profileData);

      // Success: redirect to physiotherapist dashboard
      navigate("/physio/dashboard", { replace: true });
    } catch (err: any) {
      console.error("Registration error:", err);

      // Handle common Firebase errors
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else {
        setError("Failed to create account. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Physiotherapist Registration
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Create your professional account to manage patients and programs
          </p>
        </div>

        {error && <ErrorMessage message={error} />}

        <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="Dr. John Smith"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Professional Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="john@example.com"
            />
          </div>

          {/* License Number */}
          <div>
            <label htmlFor="license" className="block text-sm font-medium text-gray-700">
              License / Registration Number
            </label>
            <input
              id="license"
              type="text"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="PT-123456"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number (optional)
            </label>
            <input
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              autoComplete="tel"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Specialization */}
          <div>
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
              Specialization (e.g., Orthopedics, Sports Rehab)
            </label>
            <input
              id="specialization"
              type="text"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="Sports Rehabilitation"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              minLength={6}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              minLength={6}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-sky-800 text-white rounded-md hover:bg-sky-900 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
          >
            {loading ? "Creating Account..." : "Register as Physiotherapist"}
          </button>

          <div className="text-center text-sm">
            <Link to="/login" className="text-sky-600 hover:underline font-medium">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}