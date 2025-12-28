// // src/routes/programRouter.js
// import { Router } from "express";
// import { db } from "../config/firebaseAdmin.js";

// const programRouter = Router();

// // Middleware: Ensure physio is authenticated
// const authMiddleware = (req, res, next) => {
//   if (!req.headers.authorization) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }
//   // TODO: Verify Firebase ID token
//   next();
// };

// // 1. Create a new program template
// programRouter.post("/", authMiddleware, async (req, res) => {
//   const { name, description, total_days, default_accuracyThreshold } = req.body;

//   try {
//     const programRef = await db.collection("programs").add({
//       created_by: req.user?.uid,
//       name,
//       description,
//       total_days,
//       default_accuracyThreshold,
//       created_at: admin.firestore.FieldValue.serverTimestamp(),
//       updated_at: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     res.status(201).json({ programId: programRef.id });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create program" });
//   }
// });

// // 2. Add exercise to a program
// programRouter.post("/:programId/exercises", authMiddleware, async (req, res) => {
//   const { programId } = req.params;
//   const exerciseData = req.body;

//   try {
//     const exerciseRef = await db
//       .collection("programs")
//       .doc(programId)
//       .collection("exercises")
//       .add({
//         ...exerciseData,
//         created_at: admin.firestore.FieldValue.serverTimestamp(),
//       });

//     res.status(201).json({ exerciseId: exerciseRef.id });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add exercise" });
//   }
// });

// // 3. Assign program to a patient (creates user-specific instance)
// programRouter.post("/assign", authMiddleware, async (req, res) => {
//   const { patientId, programId } = req.body;

//   try {
//     const masterProgram = await db.collection("programs").doc(programId).get();
//     if (!masterProgram.exists) {
//       return res.status(404).json({ error: "Program not found" });
//     }

//     // Copy master to user subcollection
//     await db
//       .collection("users")
//       .doc(patientId)
//       .collection("programs")
//       .doc(programId)
//       .set({
//         ...masterProgram.data(),
//         physiotherapist_id: req.user?.uid,
//         status: "active",
//         start_date: admin.firestore.FieldValue.serverTimestamp(),
//         end_date: admin.firestore.Timestamp.fromMillis(
//           Date.now() + masterProgram.data().total_days * 24 * 60 * 60 * 1000
//         ),
//         created_at: admin.firestore.FieldValue.serverTimestamp(),
//       });

//     res.status(200).json({ message: "Program assigned" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to assign program" });
//   }
// });

// export default programRouter;

// backend/routes/programRouter.js
import { Router } from "express";
import { db } from "../config/firebaseAdmin.js";
import authMiddleware from "../middleware/authmiddleware.js"; // ← Import the real middleware!

const programRouter = Router();

// 1. Create a new program template
programRouter.post("/", authMiddleware, async (req, res) => {
  const { name, description, total_days, default_accuracyThreshold } = req.body;

  try {
    const programRef = await db.collection("programs").add({
      created_by: req.user.uid, // From middleware
      name,
      description,
      total_days,
      default_accuracyThreshold,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ programId: programRef.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create program" });
  }
});

// 2. Add exercise to a program
programRouter.post("/:programId/exercises", authMiddleware, async (req, res) => {
  const { programId } = req.params;
  const exerciseData = req.body;

  try {
    const exerciseRef = await db
      .collection("programs")
      .doc(programId)
      .collection("exercises")
      .add({
        ...exerciseData,
        created_at: admin.firestore.FieldValue.serverTimestamp(),
      });

    res.status(201).json({ exerciseId: exerciseRef.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to add exercise" });
  }
});

// 3. Assign program to a patient
programRouter.post("/assign", authMiddleware, async (req, res) => {
  const { patientId, programId } = req.body;

  try {
    const masterProgram = await db.collection("programs").doc(programId).get();
    if (!masterProgram.exists) {
      return res.status(404).json({ error: "Program not found" });
    }

    await db
      .collection("users")
      .doc(patientId)
      .collection("programs")
      .doc(programId)
      .set({
        ...masterProgram.data(),
        physiotherapist_id: req.user.uid, // From middleware
        status: "active",
        start_date: admin.firestore.FieldValue.serverTimestamp(),
        end_date: admin.firestore.Timestamp.fromMillis(
          Date.now() + masterProgram.data().total_days * 86400000
        ),
        created_at: admin.firestore.FieldValue.serverTimestamp(),
      });

    res.status(200).json({ message: "Program assigned" });
  } catch (error) {
    res.status(500).json({ error: "Failed to assign program" });
  }
});

programRouter.get("/", authMiddleware, async (req, res) => {
  try {
    const snapshot = await db.collection("Programs").get();

    if (snapshot.empty) {
      return res.status(200).json({ programs: [] });
    }

    const programs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      message: "Programs fetched successfully",
      count: programs.length,
      programs,
    });
  } catch (error) {
    console.error("Error fetching programs:", error);
    res.status(500).json({ error: "Failed to fetch programs", details: error.message });
  }
});

export default programRouter;