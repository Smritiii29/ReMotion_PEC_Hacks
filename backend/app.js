// import express from 'express';
// import { PORT } from './env.js';
// import cors from 'cors';

// import patientRouter from './routes/patients.js';

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/v1/patients', patientRouter);

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// export default app;

// import "./loadEnv.js"; // MUST be first – loads .env before anything else

// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import admin from "firebase-admin";

// import patientRouter from "./routes/patients.js";
// import physioRouter from "./routes/physio.js";
// import programRouter from "./routes/program.js";

// /* -------------------- Firebase Admin Init -------------------- */
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//     }),
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//   });
// }

// /* -------------------- Express App -------------------- */
// const app = express();

// /* -------------------- Middleware -------------------- */
// app.use(
//   cors({
//     origin: "http://localhost:5173", // frontend URL
//     credentials: true,               // REQUIRED for cookies
//   })
// );

// app.use(express.json());
// app.use(cookieParser());

// /* -------------------- Auth Routes -------------------- */

// // LOGIN – sets HttpOnly cookie
// app.post("/login", async (req, res) => {
//   const { idToken } = req.body;

//   if (!idToken) {
//     return res.status(400).json({ error: "ID token required" });
//   }

//   try {
//     await admin.auth().verifyIdToken(idToken);

//     res.cookie("authToken", idToken, {
//       // path: "/",                     // IMPORTANT
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 60 * 60 * 1000,         // 1 hour
//     });

//     res.status(200).json({ message: "Logged in successfully" });
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     res.status(401).json({ error: "Invalid token" });
//   }
// });

// // LOGOUT – clears HttpOnly cookie
// app.post("/logout", (req, res) => {
//   res.clearCookie("authToken", {
//     path: "/",                       // MUST MATCH
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//   });

//   res.status(200).json({ message: "Logged out successfully" });
// });

// /* -------------------- API Routes -------------------- */
// app.use("/api/v1/patients", patientRouter);
// app.use("/api/v1/physio", physioRouter);
// app.use("/api/v1/programs", programRouter);

// /* -------------------- Health Check -------------------- */
// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// /* -------------------- Server -------------------- */
// const PORT = process.env.PORT;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// export default app;

// backend/app.js
// import "./loadEnv.js"; // Load .env first

// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import admin from "firebase-admin";
// import patientRouter from "./routes/patients.js";
// import physioRouter from "./routes/physio.js";
// import programRouter from "./routes/program.js";
// import authMiddleware from "./middleware/authmiddleware.js";

// // Firebase Admin Init
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//     }),
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//   });
// }

// const app = express();

// /* -------------------- CORS FIX -------------------- */
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

// app.use(express.json());
// app.use(cookieParser());

// /* -------------------- Auth Routes -------------------- */

// // LOGIN – sets HttpOnly cookie
// app.post("/login", async (req, res) => {
//   const { idToken } = req.body;

//   if (!idToken) {
//     return res.status(400).json({ error: "ID token required" });
//   }

//   try {
//     await admin.auth().verifyIdToken(idToken);

//     res.cookie("authToken", idToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 60 * 60 * 1000,
//       path: "/", // Explicitly set to root
//     });

//     res.status(200).json({ message: "Logged in successfully" });
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     res.status(401).json({ error: "Invalid token" });
//   }
// });

// // LOGOUT – clears cookie
// app.post("/logout", (req, res) => {
//   res.clearCookie("authToken", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     path: "/",
//   });

//   res.status(200).json({ message: "Logged out successfully" });
// });

// /* -------------------- API Routes -------------------- */
// app.use("/api/v1/patients", patientRouter);
// app.use("/api/v1/physio", physioRouter);
// app.use("/api/v1/programs", programRouter);

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// // In your Express app (e.g. app.js or a logs router)
// app.post("/api/v1/log-session", authMiddleware, async (req, res) => {
//   const { user_id, program_id, exercise, deviations, total_errors, session_end_time } = req.body;

//   try {
//     await db.collection("users").doc(user_id).collection("logs").add({
//       program_id,
//       exercise,
//       deviations,
//       total_errors,
//       session_end_time: admin.firestore.FieldValue.serverTimestamp(),
//       created_by: req.user.uid, // physio
//     });

//     res.status(200).json({ message: "Session logged successfully" });
//   } catch (error) {
//     console.error("Failed to log session:", error);
//     res.status(500).json({ error: "Failed to save session log" });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// export default app;

// backend/app.js
import "./loadEnv.js"; // Load .env first

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import admin from "firebase-admin";
import patientRouter from "./routes/patients.js";
import physioRouter from "./routes/physio.js";
import programRouter from "./routes/program.js";
import authMiddleware from "./middleware/authmiddleware.js";

// Firebase Admin Init
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

// ← ADD THIS LINE
const db = admin.firestore();

const app = express();

/* -------------------- CORS -------------------- */
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(cookieParser());

/* -------------------- Auth Routes -------------------- */
app.post("/login", async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: "ID token required" });
  }

  try {
    await admin.auth().verifyIdToken(idToken);

    res.cookie("authToken", idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ error: "Invalid token" });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

/* -------------------- API Routes -------------------- */
app.use("/api/v1/patients", patientRouter);
app.use("/api/v1/physio", physioRouter);
app.use("/api/v1/programs", programRouter);

/* -------------------- Log Session from Flask -------------------- */
app.post("/api/v1/log-session", authMiddleware, async (req, res) => {
  const { user_id, program_id, exercise, deviations, total_errors, session_end_time } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "user_id is required" });
  }

  try {
    await db.collection("users").doc(user_id).collection("logs").add({
      program_id: program_id || "bicep_curl",
      exercise: exercise || "bicep_curl",
      deviations: deviations || {},
      total_errors: total_errors || 0,
      session_end_time: admin.firestore.FieldValue.serverTimestamp(),
      created_by: req.user.uid, // physio who assigned
    });

    res.status(200).json({ message: "Session logged successfully" });
  } catch (error) {
    console.error("Failed to log session:", error);
    res.status(500).json({ error: "Failed to save session log" });
  }
});

/* -------------------- Health Check -------------------- */
app.get("/", (req, res) => {
  res.send("ReMotion Backend API — Running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;