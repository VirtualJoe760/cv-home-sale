// RootLayout.tsx
"use client";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import React from "react";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

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
        <ThemeProvider>
          <LogoProvider>{/* Wrap content in LogoProvider */}
            <Navbar />
            {children}
            <Footer />
          </LogoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

// Custom provider for logo based on theme
function LogoProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/sun-dark.svg" : "/sun.svg";

  return <LogoContext.Provider value={logo}>{children}</LogoContext.Provider>;
}
