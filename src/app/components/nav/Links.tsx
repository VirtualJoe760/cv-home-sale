import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { guestNavigation, userNavigation } from "@/utils/navigation";
import classNames from "@/utils/className";

const Links: React.FC = () => {
  const { data: session } = useSession();

  // Select navigation links based on authentication status
  const navigationLinks = session ? userNavigation : guestNavigation;

  return (
    <div className="hidden sm:ml-6 sm:block">
      <div className="flex items-center space-x-4">
        {navigationLinks.map((item) => (
          <Link key={item.name} href={item.href || "#"}> {/* Fallback to "#" if href is undefined */}
            <span
              className={classNames(
                item.current ? "border-b-2" : "border-b-2 border-transparent",
                "rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out hover:border-opacity-75 link"
              )}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Links;
