import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { extendTheme } from "@chakra-ui/react";
import { createTheme } from "@mui/material/styles";
import { darkTheme, lightTheme } from "../styles/themes";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => (typeof window !== "undefined" && localStorage.getItem("theme-mode")) || "dark");

  useEffect(() => {
    const body = document.body;
    const root = document.documentElement;
    if (mode === "dark") {
      body.classList.add("dark");
      body.classList.remove("light");
      root.classList.add("dark");
      root.classList.remove("light");
      root.style.colorScheme = "dark";
    } else {
      body.classList.add("light");
      body.classList.remove("dark");
      root.classList.add("light");
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  const toggleTheme = () => setMode((prev) => (prev === "dark" ? "light" : "dark"));

  const chakraTheme = useMemo(
    () =>
      extendTheme({
        config: { initialColorMode: mode, useSystemColorMode: false },
        styles: {
          global: {
            body: {
              bg: mode === "dark" ? darkTheme.bg.primary : lightTheme.bg.primary,
              color: mode === "dark" ? darkTheme.text.primary : lightTheme.text.primary,
            },
          },
        },
        fonts: {
          heading: "Inter, system-ui, sans-serif",
          body: "Inter, system-ui, sans-serif",
        },
      }),
    [mode]
  );

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: mode === "dark" ? "#3B82F6" : "#2563EB" },
          secondary: { main: "#D4AF37" },
          background: {
            default: mode === "dark" ? darkTheme.bg.primary : lightTheme.bg.primary,
            paper: mode === "dark" ? darkTheme.bg.card : lightTheme.bg.card,
          },
        },
        typography: {
          fontFamily: "Inter, system-ui, sans-serif",
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, chakraTheme, muiTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeContext);
