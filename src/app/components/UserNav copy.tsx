"use client";

import React, { useState, useEffect, useContext } from "react";
import { getNavigationForRoles } from "@/utils/userNav";
import { UserRole } from "@/types/user";
import Link from "next/link";
import Image from "next/image";
import { LogoContext } from "@/app/layout"; // Import LogoContext

interface UserNavProps {
  roles: UserRole[];
}

const UserNav: React.FC<UserNavProps> = ({ roles }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showNav, setShowNav] = useState(true); // Show nav or content on mobile
  const navigationItems = getNavigationForRoles(roles);

  // Access the current theme-based logo from LogoContext
  const logo = useContext(LogoContext);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);
  const toggleView = () => setShowNav((prev) => !prev);

  // Adjust for mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`flex flex-col transition-width duration-300 h-full ${
        isMobile
          ? "w-full fixed z-50" // Full screen on mobile
          : isCollapsed
          ? "w-16"
          : "w-64"
      }`}
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Collapsible Button with Rotating Theme-Based Icon */}
      <button
        onClick={isMobile ? toggleView : toggleCollapse}
        className="flex items-center justify-center p-4"
        aria-label="Toggle sidebar"
      >
        <Image
          src={logo} // Use theme-based logo from context
          alt="Toggle Icon"
          width={36}
          height={36}
          className="animate-spin-slow" // Add rotation animation
        />
      </button>

      {/* Navigation Links */}
      {(!isMobile || showNav) && (
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                className={`flex items-center p-2 rounded-md transition-all ${
                  window.location.pathname === item.href
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                } ${isCollapsed ? "" : "ml-3"}`}
              >
                <item.icon className="h-6 w-6" aria-hidden="true" />
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </span>
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};

export default UserNav;
