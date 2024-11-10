"use client";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import React, { useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create a LogoContext for logo sharing
export const LogoContext = React.createContext<string>("/sun.svg");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ThemeProvider>
            <LogoProvider>
              <Navbar />
              <ToastContainer />
              {children}
              <Footer />
            </LogoProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

// Custom provider for logo based on theme
function LogoProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [logo, setLogo] = useState("/sun.svg");

  useEffect(() => {
    if (theme) {
      setLogo(theme === "dark" ? "/sun-dark.svg" : "/sun.svg");
    }
  }, [theme]);

  return <LogoContext.Provider value={logo}>{children}</LogoContext.Provider>;
}

