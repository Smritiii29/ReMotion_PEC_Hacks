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

import "./loadEnv.js"; // MUST be first – loads .env before anything else

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import admin from "firebase-admin";

import patientRouter from "./routes/patients.js";
import physioRouter from "./routes/physio.js";
import programRouter from "./routes/program.js";

/* -------------------- Firebase Admin Init -------------------- */
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

/* -------------------- Express App -------------------- */
const app = express();

/* -------------------- Middleware -------------------- */
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,               // REQUIRED for cookies
  })
);

app.use(express.json());
app.use(cookieParser());

/* -------------------- Auth Routes -------------------- */

// LOGIN – sets HttpOnly cookie
app.post("/login", async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: "ID token required" });
  }

  try {
    await admin.auth().verifyIdToken(idToken);

    res.cookie("authToken", idToken, {
      path: "/",                     // IMPORTANT
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,         // 1 hour
    });

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ error: "Invalid token" });
  }
});

// LOGOUT – clears HttpOnly cookie
app.post("/logout", (req, res) => {
  res.clearCookie("authToken", {
    path: "/",                       // MUST MATCH
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

/* -------------------- API Routes -------------------- */
app.use("/api/v1/patients", patientRouter);
app.use("/api/v1/physio", physioRouter);
app.use("/api/v1/programs", programRouter);

/* -------------------- Health Check -------------------- */
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

/* -------------------- Server -------------------- */
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;