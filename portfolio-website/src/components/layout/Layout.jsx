import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useThemeMode } from "../../contexts/ThemeContext";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const { mode } = useThemeMode();
  const textColor = mode === "light" ? "text-slate-900" : "text-white";
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const { hash, pathname } = location;
    if (hash) {
      const targetId = hash.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        return;
      }
    }
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className={`min-h-screen flex flex-col relative overflow-hidden ${textColor}`}>
      <div className="noise" aria-hidden />
      <div className="grid-overlay" aria-hidden />
      <div className="light-bloom" aria-hidden />
      <Navbar />
      <main className="flex-1 pt-24 md:pt-28 lg:pt-32">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
