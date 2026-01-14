import React from "react";
import { Moon, Sun } from "lucide-react";
import { IconButton } from "@mui/material";
import { useThemeMode } from "../../contexts/ThemeContext";

const ThemeToggle = () => {
  const { mode, toggleTheme } = useThemeMode();
  const isDark = mode === "dark";
  return (
    <IconButton
      size="small"
      onClick={toggleTheme}
      className="border border-white/10 bg-white/5 text-white hover:border-white/30"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </IconButton>
  );
};

export default ThemeToggle;
