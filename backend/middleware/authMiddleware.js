// import admin from "../config/firebaseAdmin.js";

// const authMiddleware = async (req, res, next) => {
//   let idToken;

//   // Option 1: Authorization header
//   const authHeader = req.headers.authorization;
//   if (authHeader && authHeader.startsWith("Bearer ")) {
//     idToken = authHeader.split("Bearer ")[1];
//   }

//   // Option 2: Cookie fallback (optional)
//   if (!idToken && req.cookies?.authToken) {
//     idToken = req.cookies.authToken;
//   }

//   if (!idToken) {
//     return res.status(401).json({ error: "Unauthorized: No token provided" });
//   }

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     console.error("Auth middleware error:", error.message);
//     return res.status(401).json({ error: "Invalid or expired token" });
//   }
// };

// export default authMiddleware;

// backend/middleware/authMiddleware.js
// import admin from "firebase-admin";

// const authMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   let idToken;

//   // Option 1: Bearer Token from header (preferred)
//   if (authHeader && authHeader.startsWith("Bearer ")) {
//     idToken = authHeader.split("Bearer ")[1];
//   } else {
//     // Option 2: HttpOnly Cookie fallback
//     idToken = req.cookies?.authToken;
//   }

//   if (!idToken) {
//     return res.status(401).json({ error: "Unauthorized - No token provided" });
//   }

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     req.user = decodedToken; // Attach user info (uid, email, role, etc.)
//     next();
//   } catch (error) {
//     console.error("Token verification failed:", error.message);
//     return res.status(401).json({ error: "Invalid or expired token" });
//   }
// };

// export default authMiddleware;

// backend/middleware/authMiddleware.js
import admin from "firebase-admin";

const authMiddleware = async (req, res, next) => {
  let idToken;

  // Option 1: Bearer Token from header (still supported)
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    idToken = authHeader.split("Bearer ")[1];
  } 
  // Option 2: HttpOnly cookie (preferred)
  else if (req.cookies?.authToken) {
    idToken = req.cookies.authToken;
  }

  if (!idToken) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default authMiddleware;