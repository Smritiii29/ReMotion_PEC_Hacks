import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [userType, setUserType] = useState<"patient" | "therapist">("patient");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType === "patient") {
      navigate("/patient/home");
    } else {
      navigate("/therapist/patients");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/therapist/patients");
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-white">
      {/* ================= LEFT SIDE: VISUAL ================= */}
      <div className="hidden lg:flex w-1/2 bg-[#1b5550] text-white relative flex-col justify-center items-start p-16 overflow-hidden">
        
        {/* --- Modern Abstract Elements --- */}
        
        {/* Large Decorative Ring 1 */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] border-[60px] border-white/5 rounded-full" />
        
        {/* Large Decorative Ring 2 */}
        <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] border-[1px] border-white/20 rounded-full" />

        {/* Wavy squiggles / Grid (SVG) */}
        <div className="absolute right-10 top-1/4 opacity-20">
          <svg width="100" height="150" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10C30 10 30 30 50 30C70 30 70 10 90 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M10 30C30 30 30 50 50 50C70 50 70 30 90 30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M10 50C30 50 30 70 50 70C70 70 70 50 90 50" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M10 70C30 70 30 90 50 90C70 90 70 70 90 70" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Dot Grid Pattern */}
        <div className="absolute bottom-10 right-10 grid grid-cols-6 gap-4 opacity-20">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
          ))}
        </div>

        {/* Floating Blurred Orbs (Matches your previous colors) */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#f58381] rounded-full mix-blend-screen filter blur-[100px] opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d3514f] rounded-full mix-blend-screen filter blur-[100px] opacity-20 translate-x-1/2 translate-y-1/2"></div>
        
        {/* --- Content --- */}
        <div className="relative z-10">
          <div className="mb-6 flex items-center gap-2">
            <div className="h-10 w-10 bg-[#ffd4d3] rounded-full flex items-center justify-center shadow-lg">
               <div className="h-4 w-4 bg-[#1b5550] rounded-full" />
            </div>
            <span className="text-xl text-[#ffd4d3] font-bold tracking-tight">PhysioConnect</span>
          </div>
          <h1 className="text-7xl font-extrabold text-[#ffd4d3] mb-6 leading-tight">
            Hello, <br /> welcome!
          </h1>
          <p className="text-[#ffd4d3]/80 text-xl max-w-md leading-relaxed font-light">
            Manage your rehabilitation programs, track patient progress, and stay connected effectively.
          </p>
        </div>
      </div>

      {/* ================= RIGHT SIDE: FORMS ================= */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 bg-white relative">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {mode === "register" ? "Physiotherapist Registration" : "Sign In"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {mode === "register" 
                ? "Create your professional account to manage patients"
                : "Welcome back! Please enter your details."}
            </p>
          </div>

          {mode === "login" && (
            <div className="flex p-1 bg-gray-100 rounded-xl">
              <button
                onClick={() => setUserType("patient")}
                className={cn(
                  "flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all",
                  userType === "patient" 
                    ? "bg-white text-[#1b5550] shadow-md" 
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                I'm a Patient
              </button>
              <button
                onClick={() => setUserType("therapist")}
                className={cn(
                  "flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all",
                  userType === "therapist" 
                    ? "bg-white text-[#1b5550] shadow-md" 
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                I'm a Physiotherapist
              </button>
            </div>
          )}

          {mode === "register" ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" className="rounded-xl border-gray-200" placeholder="John Doe" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="profEmail">Professional Email</Label>
                <Input id="profEmail" type="email" className="rounded-xl border-gray-200" placeholder="therapist@clinic.com" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="license">License / Registration Number</Label>
                <Input id="license" className="rounded-xl border-gray-200" placeholder="LIC-123456" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number (optional)</Label>
                <Input id="phone" type="tel" className="rounded-xl border-gray-200" placeholder="+1 234 567 890" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="spec">Specialization</Label>
                <Input id="spec" className="rounded-xl border-gray-200" placeholder="e.g., Orthopedics, Sports Rehab" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="reg-pass">Password</Label>
                  <Input id="reg-pass" type="password" className="rounded-xl border-gray-200" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirm-pass">Confirm</Label>
                  <Input id="confirm-pass" type="password" className="rounded-xl border-gray-200" required />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 rounded-xl bg-[#1b5550] hover:bg-[#154440] text-white font-bold transition-transform active:scale-95">
                Register as Physiotherapist
              </Button>
              <div className="text-center text-sm text-gray-500 pt-2">
                Already have an account?{" "}
                <button type="button" onClick={() => { setMode("login"); setUserType("therapist"); }} className="text-[#1b5550] font-bold hover:underline">
                  Sign in
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className={cn(
                "p-4 rounded-xl text-sm border transition-colors",
                userType === "patient" ? "bg-blue-50 border-blue-100 text-teal-700" : "bg-teal-50 border-teal-100 text-teal-800"
              )}>
                {userType === "patient" 
                  ? "Your physiotherapist sent you login details via email."
                  : "Use your registered professional account."}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" className="h-12 rounded-xl border-gray-200" placeholder="name@mail.com" required />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {userType === "therapist" && (
                     <a href="#" className="text-xs text-[#1b5550] font-semibold hover:underline">Forgot password?</a>
                  )}
                </div>
                <Input id="password" type="password" className="h-12 rounded-xl border-gray-200" required />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="rounded border-gray-300 text-[#1b5550] focus:ring-[#1b5550]" />
                <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
              </div>

              <Button type="submit" className="w-full h-12 rounded-xl bg-[#1b5550] hover:bg-[#154440] text-white font-bold shadow-lg transition-transform active:scale-95">
                Sign In
              </Button>

              <div className="text-center text-sm text-gray-500">
                {userType === "patient" ? (
                  <p>Contact your physiotherapist if you haven't received login details.</p>
                ) : (
                  <p>
                    Don't have an account?{" "}
                    <button type="button" onClick={() => setMode("register")} className="text-[#1b5550] font-bold hover:underline">
                      Register as Physiotherapist
                    </button>
                  </p>
                )}
              </div>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
             <span className="text-xs text-gray-400">FOLLOW US</span>
             <div className="flex gap-4">
                <span className="text-gray-400 hover:text-[#1b5550] cursor-pointer text-sm font-bold">f</span>
                <span className="text-gray-400 hover:text-[#1b5550] cursor-pointer text-sm font-bold">𝕏</span>
                <span className="text-gray-400 hover:text-[#1b5550] cursor-pointer text-sm font-bold">ig</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}