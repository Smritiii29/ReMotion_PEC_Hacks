// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../../contexts/AuthContext";

// // export default function Logout({ modal, setModal }) {
// //   const navigate = useNavigate();
// //   const { logout } = useAuth();

// //   async function handleLogout() {
// //     try {
// //       await logout();
// //       setModal(false);
// //       navigate("/login", { replace: true });
// //     } catch (err) {
// //       console.error("Failed to log out", err);
// //     }
// //   }

// //   if (!modal) return null;

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
// //       <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm shadow-lg">
// //         <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
// //           Log out
// //         </h2>

// //         <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
// //           Are you sure you want to log out?
// //         </p>

// //         <div className="mt-6 flex justify-end gap-3">
// //           <button
// //             onClick={() => setModal(false)}
// //             className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
// //           >
// //             Cancel
// //           </button>

// //           <button
// //             onClick={handleLogout}
// //             className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
// //           >
// //             Logout
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // src/components/accounts/Logout.jsx
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";

// export default function Logout({ modal, setModal }) {
//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   async function handleLogout() {
//     try {
//       // 1. Call Firebase logout
//       await logout();

//       // 2. Clear the stored Firebase ID token (required for backend API protection)
//       localStorage.removeItem("authToken");

//       // 3. Close modal
//       setModal(false);

//       // 4. Redirect to login page and replace history (prevents back navigation)
//       navigate("/login", { replace: true });
//     } catch (err) {
//       console.error("Failed to log out:", err);
//       // Optional: Show user-friendly error (you can add a toast/notification here)
//     }
//   }

//   if (!modal) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm shadow-lg">
//         <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//           Log out
//         </h2>

//         <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//           Are you sure you want to log out?
//         </p>

//         <div className="mt-6 flex justify-end gap-3">
//           <button
//             onClick={() => setModal(false)}
//             className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/components/accounts/Logout.jsx
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";

// export default function Logout({ modal, setModal }) {
//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   async function handleLogout() {
//     try {
//       // 1. Call Firebase Auth logout
//       await logout();

//       // 2. Remove the stored Firebase ID token from localStorage
//       // This is critical for security - prevents access to protected APIs
//       localStorage.removeItem("authToken");

//       // 3. Close the modal
//       setModal(false);

//       // 4. Redirect to login page and replace history (prevents back button issues)
//       navigate("/login", { replace: true });
//     } catch (err) {
//       console.error("Failed to log out:", err);
//       // Optional: Show a toast or alert to the user
//       alert("Logout failed. Please try again.");
//     }
//   }

//   if (!modal) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm shadow-lg">
//         <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//           Log out
//         </h2>

//         <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//           Are you sure you want to log out?
//         </p>

//         <div className="mt-6 flex justify-end gap-3">
//           <button
//             onClick={() => setModal(false)}
//             className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/components/accounts/Logout.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Logout({ modal, setModal }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  async function handleLogout() {
    try {
      // 1. Firebase Auth logout
      await logout();

      // 2. Remove the stored authToken from localStorage
      // This prevents any further API calls with the old token
      localStorage.removeItem("authToken");

      // Optional: Clear all localStorage if needed (for extra security)
      // localStorage.clear();

      // 3. Close the modal
      setModal(false);

      // 4. Redirect to login page (replace history to prevent back navigation)
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Failed to log out:", err);
      // Optional: Show error to user
      alert("Logout failed. Please try again.");
    }
  }

  if (!modal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Log out
        </h2>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Are you sure you want to log out?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setModal(false)}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}