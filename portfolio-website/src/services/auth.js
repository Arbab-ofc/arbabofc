import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseApp } from "./firebase";

const auth = getAuth(firebaseApp);

export const loginAdmin = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
