import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// La configuración identifica el proyecto Firebase; la seguridad real depende
// de Authentication, los dominios autorizados y las reglas de Firestore.
const firebaseConfig = {
  apiKey: "AIzaSyD2g_4xCTWLWZ5_zLD_41SHLyrQ3tGX7ZQ",
  authDomain: "intersemestral-cetis.firebaseapp.com",
  projectId: "intersemestral-cetis",
  storageBucket: "intersemestral-cetis.firebasestorage.app",
  messagingSenderId: "640112848234",
  appId: "1:640112848234:web:db8b467a388f08b8fa8913",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export {
  auth,
  collection,
  db,
  doc,
  getDoc,
  getDocs,
  googleProvider,
  onAuthStateChanged,
  serverTimestamp,
  setDoc,
  signInWithPopup,
  signOut,
};
