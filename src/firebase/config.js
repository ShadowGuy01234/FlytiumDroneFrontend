import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
 apiKey: "AIzaSyBr0zU6Qwjz8HbL5jQLt3y4g35z2SDpoNM",
  authDomain: "flytiumdrone-5d4e0.firebaseapp.com",
  projectId: "flytiumdrone-5d4e0",
  storageBucket: "flytiumdrone-5d4e0.firebasestorage.app",
  messagingSenderId: "338102964159",
  appId: "1:338102964159:web:f4787c2a46f817c7fddb0a",
  measurementId: "G-V07WWCDY6Z"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); 
