import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your specific Firebase Config keys here!


// 1. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. Initialize Authentication
export const auth = getAuth(app);

// 3. Initialize Google Provider (THIS IS WHAT YOUR APP IS LOOKING FOR!)
export const googleProvider = new GoogleAuthProvider(); 

// 4. Initialize Database
export const db = getFirestore(app); 

export default app;
