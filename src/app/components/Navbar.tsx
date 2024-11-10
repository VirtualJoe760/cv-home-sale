"use client";

import { Disclosure } from "@headlessui/react";
import Brand from "@/components/nav/Brand";
import Links from "@/components/nav/Links";
import Mobile from "@/components/nav/Mobile";
import UserDropdown from "@/components/nav/UserDropdown";
import { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check screen size and set `isMobile` state
    const checkScreenSize = () => setIsMobile(window.innerWidth < 640);
    
    // Initial check
    checkScreenSize();

    // Add event listener for screen resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);


  return (
    <Disclosure as="nav">
      {isMobile ? (
        <Mobile />
      ) : (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-start">
          {/* Left side: Brand (Logo and Title) */}
          <Brand />

          {/* Centered Links and User Dropdown */}
          <div className="flex items-center space-x-4 ml-auto">
            <Links />
            <div className="hidden sm:block">
              <UserDropdown />
            </div>
          </div>

          {/* Mobile (Hamburger and mobile navigation) */}
          
        </div>
      </div>
      )}
    </Disclosure>
  );
};

export default Navbar;
