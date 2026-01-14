import { initializeApp, getApps } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDhob9TUfgn1hB_p-LU1lFn9ogImKDpAPA",
  authDomain: "arbabofc-prvt.firebaseapp.com",
  projectId: "arbabofc-prvt",
  storageBucket: "arbabofc-prvt.firebasestorage.app",
  messagingSenderId: "759103946754",
  appId: "1:759103946754:web:8cfb09d09bd73a4aa1a71b",
  databaseURL: "https://arbabofc-prvt-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const firebaseApp = app;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const rtdb = getDatabase(app);

// Ensure session persists across reloads/navigation.
setPersistence(auth, browserLocalPersistence).catch(() => {});

export const analyticsPromise = isSupported().then((yes) => (yes ? getAnalytics(app) : null));
