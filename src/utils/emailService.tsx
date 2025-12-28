// import emailjs from "@emailjs/browser";

// export const sendPatientCredentials = async ({
//   patientName,
//   patientEmail,
//   tempPassword,
// }) => {
//   return emailjs.send(
//     import.meta.env.VITE_EMAILJS_SERVICE_ID,
//     import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
//     {
//       patient_name: patientName,
//       patient_email: patientEmail,
//       temp_password: tempPassword,
//       login_link: "http://localhost:5173/login",
//     },
//     import.meta.env.VITE_EMAILJS_PUBLIC_KEY
//   );
// };


// import emailjs from "@emailjs/browser";

// // Define the shape of the parameters
// interface PatientCredentialsParams {
//   patientName: string;
//   patientEmail: string;
//   tempPassword: string;
// }

// export const sendPatientCredentials = async ({
//   patientName,
//   patientEmail,
//   tempPassword,
// }: PatientCredentialsParams) => {
//   return emailjs.send(
//     import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
//     import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
//     {
//       patient_name: patientName,
//       patient_email: patientEmail,
//       temp_password: tempPassword,
//       login_link: "http://localhost:5173/login",
//     },
//     import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string
//   );
// };

import emailjs from "@emailjs/browser";

interface PatientCredentialsParams {
  patientName: string;
  patientEmail: string;
  tempPassword: string;
}

export const sendPatientCredentials = async ({
  patientName,
  patientEmail,
  tempPassword,
}: PatientCredentialsParams) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Optional: Add debugging (remove in production)
  console.log("EmailJS Config:", { serviceId, templateId, publicKey });

  return emailjs.send(
    serviceId as string,
    templateId as string,
    {
      patient_name: patientName,
      patient_email: patientEmail,
      temp_password: tempPassword
    },
    publicKey as string
  );
};