import React from "react";
import clsx from "clsx";

export const Card = ({ children, className = "", interactive = true }) => (
  <div
    className={clsx(
      "card-surface rounded-2xl p-6 relative overflow-hidden",
      interactive && "transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10",
      className
    )}
  >
    {children}
  </div>
);
