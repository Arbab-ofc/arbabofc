import React from "react";
import clsx from "clsx";

export const Button = ({ children, as: Component = "button", variant = "primary", className = "", ...props }) => {
  const base =
    "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 gap-2 relative overflow-hidden isolate";
  const variants = {
    primary:
      "px-5 py-3 text-slate-950 dark:text-white bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 shadow-[0_14px_36px_rgba(0,0,0,0.24)] border border-amber-300/70 dark:border-amber-300/40 hover:translate-y-[-2px] active:scale-[0.98] focus-visible:outline-amber-400 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.22),transparent_42%)] after:-z-10 after:opacity-90",
    ghost:
      "px-4 py-2 text-slate-900 dark:text-white bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-amber-400/60 hover:text-amber-700 dark:hover:text-amber-200 focus-visible:outline-amber-500",
    outline:
      "px-5 py-3 text-slate-900 dark:text-white border border-black/15 dark:border-white/20 hover:border-amber-400 hover:bg-amber-50/50 dark:hover:bg-white/5 focus-visible:outline-amber-500",
  };
  return (
    <Component className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </Component>
  );
};
