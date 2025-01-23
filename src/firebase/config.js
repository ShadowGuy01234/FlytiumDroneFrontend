import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBw4ft3TMgCN9Jeez8oH52RmJ_9aVbOR7E",
    authDomain: "flytiumdrone.firebaseapp.com",
    projectId: "flytiumdrone",
    storageBucket: "flytiumdrone.firebasestorage.app",
    messagingSenderId: "707648745393",
    appId: "1:707648745393:web:6195ba432f1a52a0b71790",
    measurementId: "G-W4WFG3WVNS"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); 