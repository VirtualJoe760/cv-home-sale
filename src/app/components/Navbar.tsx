"use client";

import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { LogoContext } from "@/app/layout";
import { guestNavigation, userNavigation, staticNav } from "@/utils/navigation";
import { signOut, useSession } from "next-auth/react";

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

const Navbar: React.FC = () => {
  const logo = useContext(LogoContext);
  const { data: session } = useSession(); // Remove `status`
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Choose navigation links based on authentication state
  const navigationLinks = session ? userNavigation : guestNavigation;

  return (
    <Disclosure as="nav">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Left side of the navbar: logo and title */}
          <div className="flex flex-1 items-center justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Image src={logo} alt={`${staticNav.title} logo`} width={24} height={24} />
              <span className="sm:block ml-2 lg:text-2xl font-bold text-lg">{staticNav.title}</span>
            </div>
          </div>

          {/* Right side of the navbar */}
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex items-center space-x-4">
              {navigationLinks.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span className={classNames(
                      item.current ? "border-b-2" : "border-b-2 border-transparent",
                      "rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out hover:border-opacity-75 link"
                    )}>
                    {item.name}
                  </span>
                </Link>
              ))}

              {!session ? (
                <Link
                  href="/auth/sign-up"
                  className="button rounded-md px-3 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 transition"
                >
                  Sign Up
                </Link>
              ) : (
                <div className="relative inline-block text-left">
                  <button onClick={toggleDropdown} className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-900 text-white focus:outline-none">
                    {session.user?.name ? session.user.name.split(" ").map(n => n[0]).join("") : "P"}
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md shadow-lg" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-900">
                          Dashboard
                        </Link>
                        <Link href="/settings" className="block px-4 py-2 text-sm hover:bg-gray-900">
                          Settings
                        </Link>
                        <button onClick={() => { signOut(); setDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-900">
                          Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default Navbar;
