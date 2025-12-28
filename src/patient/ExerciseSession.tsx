// import { useState, useRef, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { Pause, Play, SkipForward, X, Camera, CameraOff, CheckCircle2, RotateCw, AlertTriangle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { AvatarCanvas } from "@/components/ui/AvatarCanvas";
// import PostSessionFeedback from "@/components/PostSessionFeedback";
// import { useAvatar } from "../context/AvatarContext";

// const AVATAR_EXERCISE_MAP: Record<string, string> = {
//   "ninja": "/avatars/ninja_curl.glb",
//   "dionysus": "/avatars/ninja_curl.glb", 
//   "archer": "/avatars/archer_curl.glb",
//   "athena": "/avatars/archer_curl.glb",   
//   "footballer": "/avatars/footballer_curl.glb",
//   "hiphop": "/avatars/hiphop_curl.glb",
//   "granny": "/avatars/granny_curl.glb",
//   "baked": "/avatars/baked.glb",
// };

// const DEFAULT_MODEL = "/avatars/ninja_curl.glb";

// // ⚠️ SIMULATED ML DATA ERRORS
// const POSTURE_ERRORS = [
//   { id: 1, message: "Tuck your elbows in!", part: "upper_arm" },
//   { id: 2, message: "Don't swing your back!", part: "back" },
//   { id: 3, message: "Control the forearm descent", part: "forearm" },
// ];

// const ExerciseSession = () => {
//   const navigate = useNavigate();
//   const { selectedAvatar } = useAvatar();
  
//   const avatarKey = selectedAvatar?.id?.toLowerCase() || selectedAvatar?.name?.toLowerCase() || "";
//   const modelUrl = AVATAR_EXERCISE_MAP[avatarKey] || DEFAULT_MODEL;

//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [cameraActive, setCameraActive] = useState(false);
  
//   // State
//   const [isPaused, setIsPaused] = useState(false);
//   const [avatarView, setAvatarView] = useState<'front' | 'side'>('front');
//   const [currentRep, setCurrentRep] = useState(4);
//   const [currentSet, setCurrentSet] = useState(1);
//   const [showFeedback, setShowFeedback] = useState(false);
//   const [encouragement, setEncouragement] = useState("Nice control — keep breathing");
  
//   // ⚠️ NEW: Posture Correction State
//   const [correctionAlert, setCorrectionAlert] = useState<{ message: string, part: string } | null>(null);

//   const totalReps = 10;
//   const totalSets = 3;

//   // --- 1. SIMULATE ML DATA STREAM ---
//   useEffect(() => {
//     if (isPaused || !cameraActive) return; // Only simulate if running

//     const simulationInterval = setInterval(() => {
//       // 30% chance to trigger an error
//       const triggerError = Math.random() < 0.3; 

//       if (triggerError) {
//         // Pick random error
//         const error = POSTURE_ERRORS[Math.floor(Math.random() * POSTURE_ERRORS.length)];
        
//         // TRIGGER CORRECTION
//         setCorrectionAlert(error);
//         setIsPaused(true); // Auto-pause for correction

//         // Clear error and resume after 3 seconds
//         setTimeout(() => {
//           setCorrectionAlert(null);
//           setIsPaused(false);
//         }, 3500);
//       } else {
//         // Normal encouragement
//         const msgs = ["Good form!", "Keep it steady", "Nice pace"];
//         setEncouragement(msgs[Math.floor(Math.random() * msgs.length)]);
//       }
//     }, 6000); // Check every 6 seconds

//     return () => clearInterval(simulationInterval);
//   }, [isPaused, cameraActive]);


//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         setCameraActive(true);
//       }
//     } catch (err) {
//       console.error("Camera access denied:", err);
//     }
//   };

//   const stopCamera = () => {
//     if (videoRef.current?.srcObject) {
//       const stream = videoRef.current.srcObject as MediaStream;
//       stream.getTracks().forEach(track => track.stop());
//       videoRef.current.srcObject = null;
//       setCameraActive(false);
//     }
//   };

//   const handleSkipRep = () => {
//     if (currentRep < totalReps) {
//       setCurrentRep(prev => prev + 1);
//     } else if (currentSet < totalSets) {
//       setCurrentRep(1);
//       setCurrentSet(prev => prev + 1);
//     } else {
//       setShowFeedback(true);
//     }
//   };

//   const handleEndSession = () => {
//     stopCamera();
//     setShowFeedback(true);
//   };

//   const handleFeedbackComplete = () => {
//     navigate("/patient/home");
//   };

//   if (showFeedback) {
//     return <PostSessionFeedback onComplete={handleFeedbackComplete} />;
//   }

//   return (
//     <div className="min-h-screen bg-[#e0f2f0]  flex flex-col text-white font-sans overflow-hidden">
      
     

//       <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 h-full pb-4 min-h-0">
        
//         {/* === LEFT: CAMERA === */}
//         <div className="lg:col-span-3 flex flex-col gap-4 h-full min-h-0">
//           <div className={`flex-1 rounded-3xl overflow-hidden relative border shadow-2xl min-h-0 transition-colors duration-500 ${correctionAlert ? 'border-red-500 shadow-red-900/50' : 'border-white/10 bg-black/40'}`}>
             
//              <video
//               ref={videoRef}
//               autoPlay
//               playsInline
//               muted
//               className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${cameraActive ? 'opacity-100' : 'opacity-0'}`}
//             />
            
//             {!cameraActive && (
//               <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0f172a] z-10">
//                 <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
//                    <Camera className="w-8 h-8 text-teal-400" />
//                 </div>
//                 <p className="text-slate-400 mb-6 font-medium">Camera feed needed for AI analysis</p>
//                 <Button onClick={startCamera} className="bg-teal-500 hover:bg-teal-400 text-black font-bold uppercase tracking-widest px-8 py-6 rounded-xl">
//                   Enable Camera
//                 </Button>
//               </div>
//             )}

//             {/* OVERLAYS */}
//             {cameraActive && (
//               <div className="absolute inset-0 z-20 pointer-events-none">
//                 <div className="absolute top-6 right-6 pointer-events-auto">
//                   <button onClick={stopCamera} className="p-3 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-red-500/20 hover:text-red-500 transition-colors">
//                     <CameraOff className="w-5 h-5" />
//                   </button>
//                 </div>
                
//                 {/* ⚠️ FEEDBACK ALERT BOX */}
//                 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center w-full px-6">
//                     {correctionAlert ? (
//                         // ERROR STATE
//                         <div className="bg-red-500/90 backdrop-blur-xl border border-red-400 rounded-2xl px-8 py-4 flex items-center gap-4 animate-in slide-in-from-bottom-5">
//                             <div className="bg-white rounded-full p-2">
//                                 <AlertTriangle className="text-red-500 w-6 h-6" />
//                             </div>
//                             <div>
//                                 <h4 className="font-black text-white uppercase tracking-wider text-sm">Correction Needed</h4>
//                                 <p className="text-lg font-bold text-white">{correctionAlert.message}</p>
//                             </div>
//                         </div>
//                     ) : (
//                         // NORMAL STATE
//                         <div className="bg-black/60 backdrop-blur-xl border border-teal-500/30 rounded-full px-6 py-3 flex items-center gap-3">
//                             <CheckCircle2 className="text-teal-400 w-5 h-5" />
//                             <p className="text-sm font-bold text-white tracking-wide">{encouragement}</p>
//                         </div>
//                     )}
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="h-[14%] shrink-0 bg-[#faf6f6] rounded-3xl p-3 border border-white/5 flex flex-row items-center justify-between gap-8">
//              <div className="flex-1 flex justify-around items-center h-full pr-2 border-r border-white/10">
           
//       <div className="flex justify-between items-center mb-3 shrink-0">
//         <div>
//           <h1 className="text-3xl font-black text-black uppercase tracking-wide">Bicep Curls</h1>
//           <p className="text-lg text-black font-medium tracking-wider">Sets: {currentSet}/{totalSets} • Reps: {currentRep}/{totalReps}</p>
//         </div>
//       </div>
//              </div>

//              <div className="flex items-center gap-4">
//   {/* Pause / Resume */}
//   <Button
//     variant="outline"
//     onClick={() => setIsPaused(!isPaused)}
//     className="
//       h-14 px-8 rounded-2xl
//       border-white/10
//       bg-[#c5cbce]
//       text-black
//       hover:bg-black
//       hover:text-white
//       font-bold uppercase
//     "
//   >
//     {isPaused ? (
//       <Play className="w-5 h-5 mr-2" />
//     ) : (
//       <Pause className="w-5 h-5 mr-2" />
//     )}
//     {isPaused ? "Resume" : "Pause"}
//   </Button>

//   {/* Skip */}
//   <Button
//     variant="outline"
//     onClick={handleSkipRep}
//     className="
//       h-14 px-8 rounded-2xl
//       border-green-800
//       bg-[#a6d1cd]
//       text-green-800
//       hover:bg-[#1b5550]
//       hover:text-white
//       font-bold uppercase
//     "
//   >
//     <SkipForward className="w-5 h-5 mr-2" />
//     Skip
//   </Button>

//   {/* End */}
//   <Button
//     onClick={handleEndSession}
//     className="
//       h-14 px-8 rounded-2xl
//       bg-[#f0b0b8]
//       text-red-500
//       border border-red-500
//       hover:bg-[#7a1e23]
//       hover:text-white
//       font-bold uppercase
//     "
//   >
//     <X className="w-5 h-5 mr-2" />
//     End
//   </Button>
// </div>

//           </div>
//         </div>

//         {/* === RIGHT: AVATAR === */}
//         <div className={`lg:col-span-1 relative rounded-3xl border overflow-hidden flex flex-col justify-end transition-colors duration-500 ${correctionAlert ? 'border-red-500/50 bg-red-900/10' : 'border-white/5 bg-gradient-to-b from-[#112240] to-[#0a192f]'}`}>
            
//             <div className="absolute top-4 right-4 z-20 flex bg-black/40 backdrop-blur-md rounded-lg p-1 border border-white/10">
//                 <button onClick={() => setAvatarView('front')} className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase transition-all ${avatarView === 'front' ? 'bg-teal-500 text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}>
//                   Front
//                 </button>
//                 <button onClick={() => setAvatarView('side')} className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase transition-all ${avatarView === 'side' ? 'bg-teal-500 text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}>
//                   Side
//                 </button>
//             </div>

//             <div className="absolute inset-0 w-full h-full">
//                 <AvatarCanvas 
//                     modelUrl={modelUrl}
//                     isSelected={true}
//                     accentColor="#2dd4bf"
//                     variant="exercise"
//                     isThumbnail={false}
//                     view={avatarView}
//                     highlightPart={correctionAlert?.part || null} // ✅ Pass error part to Avatar
//                 />
//             </div>

//             <div className="relative z-10 p-2 bg-gradient-to-t from-[#006465] via-[#02514d]/80 to-transparent">
//                 <div className={`backdrop-blur-md border rounded-xl p-4 transition-colors ${correctionAlert ? 'bg-red-500/20 border-red-500/50' : 'bg-teal-500/10 border-teal-500/20'}`}>
//                     <h3 className={`font-bold uppercase tracking-wider text-base mb-1 ${correctionAlert ? 'text-red-700' : 'text-teal-500'}`}>
//                         {correctionAlert ? "Incorrect Form" : (selectedAvatar?.name || "AI Trainer")}
//                     </h3>
//                     <p className="text-slate-300 text-base leading-relaxed">
//                         {correctionAlert ? correctionAlert.message : "Match my pace. Keep your elbows locked at your sides."}
//                     </p>
//                 </div>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExerciseSession;

// src/components/ExerciseSession.tsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pause, Play, SkipForward, X, Camera, CameraOff, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AvatarCanvas } from "@/components/ui/AvatarCanvas";
import PostSessionFeedback from "@/components/PostSessionFeedback";
import { useAvatar } from "../context/AvatarContext";
import io from "socket.io-client"; // npm install socket.io-client

import { useAuth } from "../contexts/AuthContext";


const AVATAR_EXERCISE_MAP: Record<string, string> = {
  "ninja": "/avatars/ninja_curl.glb",
  "dionysus": "/avatars/ninja_curl.glb",
  "archer": "/avatars/archer_curl.glb",
  "athena": "/avatars/archer_curl.glb",
  "footballer": "/avatars/footballer_curl.glb",
  "hiphop": "/avatars/hiphop_curl.glb",
  "granny": "/avatars/granny_curl.glb",
  "baked": "/avatars/baked.glb",
};

const DEFAULT_MODEL = "/avatars/ninja_curl.glb";

const POSTURE_ERRORS = [
  { id: 1, message: "Tuck your elbows in!", part: "upper_arm" },
  { id: 2, message: "Don't swing your back!", part: "back" },
  { id: 3, message: "Control the forearm descent", part: "forearm" },
];

const ExerciseSession = () => {
  const navigate = useNavigate();
  const { selectedAvatar } = useAvatar();

  const avatarKey = selectedAvatar?.id?.toLowerCase() || selectedAvatar?.name?.toLowerCase() || "";
  const modelUrl = AVATAR_EXERCISE_MAP[avatarKey] || DEFAULT_MODEL;

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const annotatedImgRef = useRef<HTMLImageElement>(null);
  const { currentUser } = useAuth();

  const [cameraActive, setCameraActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [avatarView, setAvatarView] = useState<'front' | 'side'>('front');
  const [currentRep, setCurrentRep] = useState(4);
  const [currentSet, setCurrentSet] = useState(1);
  const [showFeedback, setShowFeedback] = useState(false);
  const [encouragement, setEncouragement] = useState("Nice control — keep breathing");
  const [correctionAlert, setCorrectionAlert] = useState<{ message: string, part: string } | null>(null);

  const totalReps = 10;
  const totalSets = 3;

  // Socket.IO connection to Flask backend (port 5000)
  const socket = useRef<any>(null);

  useEffect(() => {
    socket.current = io("http://localhost:5000");

    socket.current.on("connect", () => {
      console.log("Connected to Flask real-time server");
    });

    socket.current.on("annotated_frame", (base64Data: string) => {
      if (annotatedImgRef.current) {
        annotatedImgRef.current.src = `data:image/jpeg;base64,${base64Data}`;
      }
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  // Send camera frames to Flask (10 FPS)
  useEffect(() => {
    if (!cameraActive || isPaused) return;

    const sendFrame = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas && video.videoWidth > 0) {
        const ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (blob) {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64data = reader.result?.toString().split(",")[1];
              if (base64data) {
                socket.current?.emit("frame", base64data);
              }
            };
            reader.readAsDataURL(blob);
          }
        }, "image/jpeg", 0.7);
      }
    };

    const interval = setInterval(sendFrame, 100);

    return () => clearInterval(interval);
  }, [cameraActive, isPaused]);

  // Simulated encouragement (replace with backend feedback if needed)
  useEffect(() => {
    if (isPaused || !cameraActive) return;

    const simulationInterval = setInterval(() => {
      const triggerError = Math.random() < 0.3;
      if (triggerError) {
        const error = POSTURE_ERRORS[Math.floor(Math.random() * POSTURE_ERRORS.length)];
        setCorrectionAlert(error);
        setIsPaused(true);
        setTimeout(() => {
          setCorrectionAlert(null);
          setIsPaused(false);
        }, 3500);
      } else {
        const msgs = ["Good form!", "Keep it steady", "Nice pace"];
        setEncouragement(msgs[Math.floor(Math.random() * msgs.length)]);
      }
    }, 6000);

    return () => clearInterval(simulationInterval);
  }, [isPaused, cameraActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const handleSkipRep = () => {
    if (currentRep < totalReps) {
      setCurrentRep(prev => prev + 1);
    } else if (currentSet < totalSets) {
      setCurrentRep(1);
      setCurrentSet(prev => prev + 1);
    } else {
      setShowFeedback(true);
    }
  };

  const handleEndSession = () => {
  socket.current?.emit("end_session", {
    user_id: currentUser.uid, // from your auth context
    program_id: "bicep_curl_program_001" // or dynamic
  });

  stopCamera();
  setShowFeedback(true);
};

  const handleFeedbackComplete = () => {
    navigate("/patient/home");
  };

  if (showFeedback) {
    return <PostSessionFeedback onComplete={handleFeedbackComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#e0f2f0] flex flex-col text-white font-sans overflow-hidden">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 h-full pb-4 min-h-0">
        {/* LEFT: CAMERA + REAL-TIME ANNOTATED FEED FROM FLASK */}
        <div className="lg:col-span-3 flex flex-col gap-4 h-full min-h-0">
          <div className={`flex-1 rounded-3xl overflow-hidden relative border shadow-2xl min-h-0 transition-colors duration-500 ${correctionAlert ? 'border-red-500 shadow-red-900/50' : 'border-white/10 bg-black/40'}`}>
            {/* Camera Feed */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${cameraActive ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Annotated Feed from Flask (skeleton + red/green joints) */}
            {cameraActive && (
              <img
                ref={annotatedImgRef}
                alt="Real-time form analysis"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            )}

            {/* Hidden canvas for capturing frames */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Camera Not Active */}
            {!cameraActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0f172a] z-10">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Camera className="w-8 h-8 text-teal-400" />
                </div>
                <p className="text-slate-400 mb-6 font-medium">Camera feed needed for AI analysis</p>
                <Button onClick={startCamera} className="bg-teal-500 hover:bg-teal-400 text-black font-bold uppercase tracking-widest px-8 py-6 rounded-xl">
                  Enable Camera
                </Button>
              </div>
            )}

            {/* Overlays */}
            {cameraActive && (
              <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute top-6 right-6 pointer-events-auto">
                  <button onClick={stopCamera} className="p-3 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-red-500/20 hover:text-red-500 transition-colors">
                    <CameraOff className="w-5 h-5" />
                  </button>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center w-full px-6">
                  {correctionAlert ? (
                    <div className="bg-red-500/90 backdrop-blur-xl border border-red-400 rounded-2xl px-8 py-4 flex items-center gap-4 animate-in slide-in-from-bottom-5">
                      <div className="bg-white rounded-full p-2">
                        <AlertTriangle className="text-red-500 w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-white uppercase tracking-wider text-sm">Correction Needed</h4>
                        <p className="text-lg font-bold text-white">{correctionAlert.message}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-black/60 backdrop-blur-xl border border-teal-500/30 rounded-full px-6 py-3 flex items-center gap-3">
                      <CheckCircle2 className="text-teal-400 w-5 h-5" />
                      <p className="text-sm font-bold text-white tracking-wide">{encouragement}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Controls */}
          <div className="h-[14%] shrink-0 bg-[#faf6f6] rounded-3xl p-3 border border-white/5 flex flex-row items-center justify-between gap-8">
            <div className="flex-1 flex justify-around items-center h-full pr-2 border-r border-white/10">
              <div className="flex justify-between items-center mb-3 shrink-0">
                <div>
                  <h1 className="text-3xl font-black text-black uppercase tracking-wide">Bicep Curls</h1>
                  <p className="text-lg text-black font-medium tracking-wider">Sets: {currentSet}/{totalSets} • Reps: {currentRep}/{totalReps}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setIsPaused(!isPaused)}
                className="h-14 px-8 rounded-2xl border-white/10 bg-[#c5cbce] text-black hover:bg-black hover:text-white font-bold uppercase"
              >
                {isPaused ? <Play className="w-5 h-5 mr-2" /> : <Pause className="w-5 h-5 mr-2" />}
                {isPaused ? "Resume" : "Pause"}
              </Button>

              <Button
                variant="outline"
                onClick={handleSkipRep}
                className="h-14 px-8 rounded-2xl border-green-800 bg-[#a6d1cd] text-green-800 hover:bg-[#1b5550] hover:text-white font-bold uppercase"
              >
                <SkipForward className="w-5 h-5 mr-2" />
                Skip
              </Button>

              <Button
                onClick={handleEndSession}
                className="h-14 px-8 rounded-2xl bg-[#f0b0b8] text-red-500 border border-red-500 hover:bg-[#7a1e23] hover:text-white font-bold uppercase"
              >
                <X className="w-5 h-5 mr-2" />
                End
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT: AVATAR */}
        <div className={`lg:col-span-1 relative rounded-3xl border overflow-hidden flex flex-col justify-end transition-colors duration-500 ${correctionAlert ? 'border-red-500/50 bg-red-900/10' : 'border-white/5 bg-gradient-to-b from-[#112240] to-[#0a192f]'}`}>
          <div className="absolute top-4 right-4 z-20 flex bg-black/40 backdrop-blur-md rounded-lg p-1 border border-white/10">
            <button onClick={() => setAvatarView('front')} className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase transition-all ${avatarView === 'front' ? 'bg-teal-500 text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}>
              Front
            </button>
            <button onClick={() => setAvatarView('side')} className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase transition-all ${avatarView === 'side' ? 'bg-teal-500 text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}>
              Side
            </button>
          </div>

          <div className="absolute inset-0 w-full h-full">
            <AvatarCanvas
              modelUrl={modelUrl}
              isSelected={true}
              accentColor="#2dd4bf"
              variant="exercise"
              isThumbnail={false}
              view={avatarView}
              highlightPart={correctionAlert?.part || null}
            />
          </div>

          <div className="relative z-10 p-2 bg-gradient-to-t from-[#006465] via-[#02514d]/80 to-transparent">
            <div className={`backdrop-blur-md border rounded-xl p-4 transition-colors ${correctionAlert ? 'bg-red-500/20 border-red-500/50' : 'bg-teal-500/10 border-teal-500/20'}`}>
              <h3 className={`font-bold uppercase tracking-wider text-base mb-1 ${correctionAlert ? 'text-red-700' : 'text-teal-500'}`}>
                {correctionAlert ? "Incorrect Form" : (selectedAvatar?.name || "AI Trainer")}
              </h3>
              <p className="text-slate-300 text-base leading-relaxed">
                {correctionAlert ? correctionAlert.message : "Match my pace. Keep your elbows locked at your sides."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseSession;