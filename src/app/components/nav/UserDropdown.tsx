import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { userDropdown } from "@/utils/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User } from "@/types/user";

const UserDropdown: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Ref to the dropdown container
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const user = session?.user as User | undefined;
  const userName = user?.name || ""; // Empty if userName is not available
  const userRole = user?.role ?? "guest";
  const userId = user?.id ?? "";

  const userInitials = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "";

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {session ? (
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-400 focus:outline-none dark:bg-gray-900"
        >
          {user?.image ? (
            <Image src={user.image} alt="User Profile" className="rounded-full" width={40} height={40} />
          ) : (
            <span>{userInitials}</span>
          )}
        </button>
      ) : (
        <Link href="/auth/sign-in">
          <button className="text-sm font-medium button">Sign In</button>
        </Link>
      )}

      {dropdownOpen && session && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md shadow-lg bg-myBackground">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {userDropdown(userId, userRole).map((item) => (
              item.action ? (
                <button
                  key={item.name}
                  onClick={() => {
                    item.action?.(userName, router);
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-500 dark:hover:bg-gray-500"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href || "#"}
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-500 dark:hover:bg-gray-500"
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
