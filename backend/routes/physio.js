// src/routes/physioRouter.js
import { Router } from "express";
import { db } from "../config/firebaseAdmin.js";

const physioRouter = Router();

// Middleware: Ensure physio is authenticated
const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  // TODO: Verify Firebase ID token
  next();
};

// 1. Get current physio profile
physioRouter.get("/profile", authMiddleware, async (req, res) => {
  try {
    const physioDoc = await db.collection("Physiotherapists").doc(req.user?.uid).get();

    if (!physioDoc.exists) {
      return res.status(404).json({ error: "Physio profile not found" });
    }

    res.status(200).json({ physio: { id: physioDoc.id, ...physioDoc.data() } });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// 2. Update physio profile (bio, clinic info, etc.)
physioRouter.put("/profile", authMiddleware, async (req, res) => {
  try {
    const updates = req.body; // { bio, clinicInfo, ... }
    await db.collection("Physiotherapists").doc(req.user?.uid).update({
      ...updates,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(200).json({ message: "Profile updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// 3. Get overall adherence rate for all patients
physioRouter.get("/adherence", authMiddleware, async (req, res) => {
  try {
    const physioId = req.user?.uid;
    const patientsSnap = await db
      .collection("Users")
      .where("physiotherapist_assigned", "==", physioId)
      .get();

    if (patientsSnap.empty) {
      return res.status(200).json({ averageAdherence: 0 });
    }

    let totalAdherence = 0;
    let count = 0;

    for (const patientDoc of patientsSnap.docs) {
      const summariesSnap = await db
        .collection("users")
        .doc(patientDoc.id)
        .collection("program_summaries")
        .get();

      summariesSnap.forEach((summary) => {
        totalAdherence += summary.data().adherence_percentage || 0;
        count++;
      });
    }

    const average = count > 0 ? totalAdherence / count : 0;
    res.status(200).json({ averageAdherence: average });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch adherence" });
  }
});

export default physioRouter;