// // src/routes/patientRouter.js
// import { Router } from "express";
// import { db } from "../config/firebaseAdmin.js"; // Now imports correctly

// const patientRouter = Router();

// patientRouter.get("/", async (req, res) => {
//   try {
//     const usersSnapshot = await db.collection("Users").get();

//     if (usersSnapshot.empty) {
//       return res.status(200).json({ message: "No patients found", patients: [] });
//     }

//     const patients = [];
//     usersSnapshot.forEach((doc) => {
//       patients.push({
//         id: doc.id,
//         ...doc.data(),
//       });
//     });

//     res.status(200).json({
//       message: "Patients fetched successfully",
//       count: patients.length,
//       patients,
//     });
//   } catch (error) {
//     console.error("Error fetching patients:", error);
//     res.status(500).json({ error: "Failed to fetch patients", details: error.message });
//   }
// });

// export default patientRouter;

// import { Router } from "express";
// import { db } from "../config/firebaseAdmin.js";
// import authMiddleware from "../middleware/authmiddleware.js";

// const patientRouter = Router();

// patientRouter.get("/", authMiddleware, async (req, res) => {
//   try {
//     const usersSnapshot = await db.collection("Users").get();

//     const patients = usersSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     res.status(200).json({
//       message: "Patients fetched successfully",
//       count: patients.length,
//       patients,
//       requestedBy: req.user.uid, // 👈 proves middleware works
//     });
//   } catch (error) {
//     console.error("Error fetching patients:", error);
//     res.status(500).json({ error: "Failed to fetch patients" });
//   }
// });

// export default patientRouter;


// backend/routes/patients.js
import { Router } from "express";
import { db } from "../config/firebaseAdmin.js";
import admin from "firebase-admin";
import authMiddleware from "../middleware/authMiddleware.js";

const patientRouter = Router();

// All routes are protected by authMiddleware
patientRouter.get("/", authMiddleware, async (req, res) => {
  try {
    const physioId = req.user.uid; // From middleware

    const snapshot = await db
      .collection("Users")
      .where("physiotherapist_assigned", "==", physioId)
      .get();

    if (snapshot.empty) {
      return res.status(200).json({ patients: [] });
    }

    const patients = [];
    for (const doc of snapshot.docs) {
      const data = doc.data();

      const lastLogSnap = await db
        .collection("users")
        .doc(doc.id)
        .collection("logs")
        .orderBy("created_at", "desc")
        .limit(1)
        .get();

      const lastSessionDate = lastLogSnap.docs[0]?.data().created_at?.toDate() || null;

      const summariesSnap = await db
        .collection("users")
        .doc(doc.id)
        .collection("program_summaries")
        .get();

      const progress = summariesSnap.docs.reduce((sum, s) => sum + (s.data().adherence_percentage || 0), 0) / summariesSnap.size || 0;

      patients.push({
        id: doc.id,
        ...data,
        status: data.status || "active",
        lastSessionDate,
        progress: progress.toFixed(1),
      });
    }

    res.status(200).json({ patients });
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: "Failed to fetch patients", details: error.message });
  }
});

// Get single patient
patientRouter.get("/:patientId", authMiddleware, async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const patientDoc = await db.collection("Users").doc(patientId).get();

    if (!patientDoc.exists) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const patientData = patientDoc.data();

    if (patientData.physiotherapist_assigned !== req.user.uid) {
      return res.status(403).json({ error: "Not authorized to access this patient" });
    }

    res.status(200).json({ patient: { id: patientId, ...patientData } });
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ error: "Failed to fetch patient" });
  }
});

// Add new patient
patientRouter.post("/", authMiddleware, async (req, res) => {
  const { email, name, phoneNum } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Email and name required" });
  }

  const tempPassword = Math.random().toString(36).slice(-10) + "A1!";

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password: tempPassword,
      emailVerified: false,
    });

    await db.collection("Users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      email,
      name,
      phoneNum: phoneNum || "",
      physiotherapist_assigned: req.user.uid,
      passwordChanged: false,
      role: "patient",
      selected_avatar_id: "",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    await db.collection("Physiotherapists").doc(req.user.uid).update({
      patients_assigned: admin.firestore.FieldValue.arrayUnion(userRecord.uid),
    });

    res.status(201).json({
      message: "Patient added successfully",
      patientId: userRecord.uid,
    });
  } catch (error) {
    console.error("Error adding patient:", error);
    if (error.code === "auth/email-already-exists") {
      return res.status(400).json({ error: "Email already in use" });
    }
    res.status(500).json({ error: "Failed to add patient", details: error.message });
  }
});

// Delete patient
patientRouter.delete("/:patientId", authMiddleware, async (req, res) => {
  try {
    const patientId = req.params.patientId;

    const patientDoc = await db.collection("Users").doc(patientId).get();
    if (!patientDoc.exists || patientDoc.data().physiotherapist_assigned !== req.user.uid) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await admin.auth().deleteUser(patientId);
    await db.collection("Users").doc(patientId).delete();

    await db.collection("Physiotherapists").doc(req.user.uid).update({
      patients_assigned: admin.firestore.FieldValue.arrayRemove(patientId),
    });

    res.status(200).json({ message: "Patient deleted" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ error: "Failed to delete patient" });
  }
});

export default patientRouter;