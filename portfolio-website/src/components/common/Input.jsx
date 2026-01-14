import React from "react";
import clsx from "clsx";

export const Input = React.forwardRef(({ error, className = "", ...props }, ref) => (
  <div className="space-y-1">
    <input
      ref={ref}
      className={clsx(
        "w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none",
        error && "border-red-500/60 focus:ring-red-500/30",
        className
      )}
      {...props}
    />
    {error && <p className="text-xs text-red-400">{error.message}</p>}
  </div>
));

Input.displayName = "Input";
