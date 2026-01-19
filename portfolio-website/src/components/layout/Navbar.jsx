import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../common/Button";
import ThemeToggle from "./ThemeToggle";
import { useThemeMode } from "../../contexts/ThemeContext";
import { X, LineChart } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

const Navbar = () => {
  const { mode } = useThemeMode();
  const { isAdmin, logout, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(min-width: 1024px)");
    const handle = (e) => setIsDesktop(e.matches);
    setIsDesktop(mql.matches);
    mql.addEventListener ? mql.addEventListener("change", handle) : mql.addListener(handle);
    return () => {
      mql.removeEventListener ? mql.removeEventListener("change", handle) : mql.removeListener(handle);
    };
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="container px-3 lg:px-0 py-2">
        <div className="pointer-events-auto relative overflow-hidden flex items-center gap-3 justify-between rounded-2xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-[#0b0f1c]/85 backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.22)] px-4 lg:px-6 py-3">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(0deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:140px_140px] opacity-60 pointer-events-none dark:bg-[linear-gradient(120deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
          <div className="flex items-center gap-3">
            <Link to="/" className="relative flex items-center gap-3">
              <div className="flex flex-col leading-tight">
                <span className="text-base font-semibold text-slate-900 dark:text-white">Arbab Arshad</span>
                <span className="text-xs text-gray-600 dark:text-gray-300">Full-Stack MERN · Data Analyst</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <ThemeToggle />
            <button
              aria-label="Toggle menu"
              className="relative h-11 rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-slate-100 via-white to-slate-50 dark:from-white/10 dark:via-white/5 dark:to-white/5 shadow-lg shadow-black/10 dark:shadow-black/30 overflow-hidden px-4 flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white"
              type="button"
              onClick={() => setOpen((p) => !p)}
            >
              <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(99,102,241,0.35),rgba(16,185,129,0.4),rgba(59,130,246,0.4),rgba(99,102,241,0.35))] opacity-40 blur-sm" />
              <div className="relative flex items-center gap-2">
                {open ? (
                  <X size={20} strokeWidth={2.2} />
                ) : (
                  <LineChart size={20} strokeWidth={2.2} className="rotate-90" />
                )}
                <span className="hidden sm:inline">Menu</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && isDesktop && (
          <>
            <motion.div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 flex items-end justify-center pb-6 px-4 pointer-events-auto"
              role="dialog"
              aria-modal="true"
              onClick={closeMenu}
            >
              <div
                className="w-full max-w-5xl rounded-[32px] border border-black/5 dark:border-white/12 bg-white/94 dark:bg-[#0b1022]/94 backdrop-blur-xl shadow-[0_32px_90px_rgba(0,0,0,0.35)] p-5 sm:p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between gap-4 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 rounded-full border border-black/10 dark:border-white/15 bg-white/90 dark:bg-white/10 shadow-[0_10px_28px_rgba(0,0,0,0.2)] overflow-hidden">
                      <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(59,130,246,0.3),rgba(16,185,129,0.3),rgba(109,40,217,0.32),rgba(59,130,246,0.3))] opacity-60 blur-[2px]" />
                      <div className="relative h-full w-full grid place-items-center text-sm font-semibold text-slate-900 dark:text-white">AA</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-slate-900 dark:text-white">Arbab Arshad</div>
                      <div className="text-sm text-slate-900 dark:text-slate-300">Full-Stack MERN · Data Analyst</div>
                    </div>
                  </div>
                  <button
                    aria-label="Close menu"
                    className="h-10 w-10 rounded-xl border border-black/10 dark:border-white/15 bg-white/90 dark:bg-white/10 grid place-items-center text-slate-900 dark:text-white shrink-0"
                    type="button"
                    onClick={closeMenu}
                  >
                    <X size={18} strokeWidth={2.2} />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3 pb-2">
                <div className="flex items-center gap-2 text-sm text-slate-800 dark:text-slate-100">
                  <span className="inline-flex items-center gap-1 rounded-full border border-black/10 dark:border-white/18 bg-white dark:bg-white/10 px-3 py-1 text-[11px] font-semibold text-slate-800 dark:text-white">
                    ✦ Available for new projects
                  </span>
                  <span className="hidden sm:inline text-slate-700 dark:text-slate-200">Let’s build something bold together.</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="inline-flex items-center justify-center rounded-xl text-sm font-semibold px-4 py-2 border border-amber-200 bg-gradient-to-r from-amber-100 via-amber-50 to-white text-amber-900 shadow-[0_12px_30px_rgba(0,0,0,0.18)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)] dark:border-amber-400/60 dark:from-amber-400/20 dark:via-amber-300/10 dark:to-transparent dark:text-amber-100 dark:shadow-[0_12px_30px_rgba(0,0,0,0.4)]"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  {user && !user.isAnonymous && (
                    <Button variant="ghost" className="!px-3 !py-2 text-sm" onClick={logout}>
                      Logout
                    </Button>
                  )}
                    </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-3 justify-center">
                  {links.map((link, idx) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: idx * 0.05, type: "spring", stiffness: 320, damping: 24 }}
                      className="group relative isolate flex items-center gap-3 rounded-[18px] border border-black/12 dark:border-white/15 bg-white/98 dark:bg-white/10 px-4 py-3 shadow-[0_12px_36px_rgba(0,0,0,0.14)] hover:border-amber-400/80 hover:shadow-[0_18px_50px_rgba(0,0,0,0.2)] transition-all"
                      onClick={closeMenu}
                    >
                      <div className="absolute inset-0 rounded-[18px] bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.18),transparent_36%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.2),transparent_40%)] opacity-90 pointer-events-none" />
                      <div className="relative">
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">{link.label}</div>
                        <div className="text-xs text-slate-700 dark:text-slate-300">Jump in →</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && !isDesktop && (
          <>
            <motion.div
              className="fixed inset-0 bg-slate-900/25 backdrop-blur-[2px] z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            />
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto bg-gradient-to-b from-white via-white to-slate-50/90 dark:from-[#0b1022] dark:via-[#0b1022] dark:to-[#0a0f1f] border-t border-black/10 dark:border-white/10 px-3 pb-3 shadow-[0_24px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl overflow-hidden lg:hidden relative z-50"
            >
              <div className="flex flex-col gap-2 text-sm pt-2">
                <div className="grid grid-cols-2 gap-2">
                  {links.map((link, idx) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className="py-2.5 rounded-xl px-3 border border-black/5 dark:border-white/5 hover:border-amber-400/50 bg-white/80 dark:bg-white/5 shadow-sm text-slate-800 dark:text-white"
                      onClick={closeMenu}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 gap-2 relative overflow-hidden isolate px-4 py-2 text-slate-950 dark:text-white bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 shadow-[0_14px_36px_rgba(0,0,0,0.24)] border border-amber-300/70 dark:border-amber-300/40 hover:translate-y-[-2px] active:scale-[0.98] focus-visible:outline-amber-400 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.22),transparent_42%)] after:-z-10 after:opacity-90 w-full sm:w-auto"
                      onClick={closeMenu}
                    >
                      Admin Portal
                    </Link>
                  )}
                  {user && !user.isAnonymous && (
                    <Button variant="ghost" className="!px-3 !py-2 text-sm w-full sm:w-auto" onClick={logout}>
                      Logout
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
