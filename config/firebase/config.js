import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDJY0aI-Uz83sajmczsVqNrUhcRsAtnF4Y",
  authDomain: "indrive-app-790b8.firebaseapp.com",
  projectId: "indrive-app-790b8",
  storageBucket: "indrive-app-790b8.firebasestorage.app",
  messagingSenderId: "742862640651",
  appId: "1:742862640651:web:c448b4b0f9b34ea271990e"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);