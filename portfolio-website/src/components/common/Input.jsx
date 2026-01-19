import React, { useState } from "react";
import clsx from "clsx";

export const Input = React.forwardRef(({ error, className = "", type, ...props }, ref) => {
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="space-y-1">
      <div className="relative">
        <input
          ref={ref}
          type={resolvedType}
          className={clsx(
            "w-full h-12 rounded-xl bg-white/5 dark:bg-slate-900/60 border border-white/10 px-4 text-sm text-black dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none",
            isPassword && "pr-10",
            error && "border-red-500/60 focus:ring-red-500/30",
            className
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black/70 hover:text-black dark:text-white/80 dark:hover:text-white"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M3 4.5l18 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M10.6 10.75a2.2 2.2 0 013.05 3.05"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M6.7 6.8C4.6 8.2 3.1 10.1 2 12c1.9 3.3 5.6 6 10 6 1.7 0 3.3-.4 4.7-1"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M9.3 5.5A9.7 9.7 0 0112 5c4.4 0 8.1 2.7 10 7-1 1.7-2.4 3.2-4 4.3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-400">{error.message}</p>}
    </div>
  );
});

Input.displayName = "Input";
