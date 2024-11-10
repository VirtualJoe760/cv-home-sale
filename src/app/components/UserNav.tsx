import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { LogoContext } from "@/app/layout";
import { NavItem } from "@/utils/userNav";
import { UserRole } from "@/types/user";
import { usePathname } from "next/navigation";

interface UserNavProps {
  navigationItems: NavItem[];
  userId: string;
  role: UserRole;
}

const UserNav: React.FC<UserNavProps> = ({ navigationItems, userId, role }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const logo = useContext(LogoContext);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <div
      className={`flex flex-col h-full transition-all duration-500 ease-in-out ${
        isMobile ? "w-full fixed z-50" : isCollapsed ? "w-16" : "w-64"
      }`}
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        transitionProperty: "width, opacity, transform",
      }}
    >
      <button
        onClick={isMobile ? () => setShowNav(!showNav) : () => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-center p-4 cursor-pointer"
        aria-label="Toggle sidebar"
      >
        <Image
          src={logo}
          alt="Toggle Icon"
          width={36}
          height={36}
          className={`transition-transform duration-300 ${isCollapsed ? "rotate-0" : "rotate-180"}`}
        />
      </button>

      {(!isMobile || showNav) && (
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigationItems.map((item) => (
            <Link key={item.name} href={item.href(userId, role)}>
              <div
                className={`flex items-center p-2 rounded-md transition-all duration-300 ease-in-out cursor-pointer ${
                  isActive(item.href(userId, role))
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-800 hover:text-white"
                }`}
                style={{
                  color: isActive(item.href(userId, role)) ? "var(--buttonColor)" : "var(--paragraph-color)",
                  backgroundColor: isActive(item.href(userId, role)) ? "var(--paragraph-color)" : "transparent",
                }}
              >
                {/* Icon with fixed size to prevent resizing */}
                <item.icon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                {!isCollapsed && (
                  <span
                    className="ml-3 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{
                      opacity: isCollapsed ? 0 : 1,
                      transform: isCollapsed ? "translateX(-20px)" : "translateX(0)",
                    }}
                  >
                    {item.name}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};

export default UserNav;
