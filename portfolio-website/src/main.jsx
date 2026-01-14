import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import App from "./App";
import "./styles/globals.css";
import { ThemeProvider, useThemeMode } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }) => {
  const { chakraTheme, muiTheme } = useThemeMode();
  return (
    <ChakraProvider theme={chakraTheme}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <HelmetProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{children}</BrowserRouter>
        </HelmetProvider>
      </MuiThemeProvider>
    </ChakraProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <Providers>
            <App />
            <Toaster position="top-right" />
          </Providers>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
