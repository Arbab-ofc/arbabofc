import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseApp } from "../services/firebase";
import { ADMIN_EMAIL } from "../utils/constants";

const AuthContext = createContext();
const auth = getAuth(firebaseApp);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (current) => {
      setUser(current);
      setInitialized(true);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fallback to anonymous only after initial state is known and no user exists
  useEffect(() => {
    const ensureAnon = async () => {
      if (!initialized || user) return;
      setLoading(true);
      try {
        await signInAnonymously(auth);
      } catch (err) {
        console.warn("Anonymous sign-in failed", err);
      } finally {
        setLoading(false);
      }
    };
    ensureAnon();
  }, [initialized, user]);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  const adminEmailNormalized = (ADMIN_EMAIL || "").toLowerCase();
  const userEmailNormalized = (user?.email || "").toLowerCase();

  const value = useMemo(
    () => ({
      user,
      loading,
      isAdmin: !!user && userEmailNormalized === adminEmailNormalized,
      login,
      logout,
    }),
    [user, loading, userEmailNormalized, adminEmailNormalized]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
