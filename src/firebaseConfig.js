// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1k-QrF1F_piFffcf3jp9tGfNrkeSmrt0",
  authDomain: "sendero-pampa.firebaseapp.com",
  projectId: "sendero-pampa",
  storageBucket: "sendero-pampa.firebasestorage.app",
  messagingSenderId: "334953327482",
  appId: "1:334953327482:web:a23ed752958413053e84c3",
  measurementId: "G-3BNLSHVYVB"
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializar Firestore
const db = getFirestore(app);

export { app, analytics, db };






