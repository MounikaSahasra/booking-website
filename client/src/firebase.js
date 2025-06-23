import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDPqxNyLKy4gSaAC-wi7H6yvOhZl-H0ZOU",
  authDomain: "appointment-booking-syst-ad120.firebaseapp.com",
  projectId: "appointment-booking-syst-ad120",
  storageBucket: "appointment-booking-syst-ad120.firebasestorage.app",
  messagingSenderId: "89772978105",
  appId: "1:89772978105:web:183849d08fd3be85f05068"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 

