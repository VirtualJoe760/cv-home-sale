// components/nav/Mobile.tsx

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { guestNavigation } from "@/utils/navigation";
import Brand from "./Brand";
import Image from "next/image";

const Mobile: React.FC = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const userName = user?.name ?? "Guest";
  const userEmail = user?.email ?? "guest@example.com";
  const userImage = user?.image;
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Disclosure as="header" className="bg-background">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="relative flex h-16 justify-between items-center">
          <Brand />
          <div className="ml-auto flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 link">
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden text-center">
        <div className="space-y-1 pb-3 pt-2">
          {/* Guest Navigation Links */}
          {guestNavigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              href={item.href || "#"}
              className="block border-r-4 border-transparent py-2 pr-3 text-base font-medium link text-center"
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
        <hr className="bg-gray-600" />
        {/* User Section for Authenticated Users */}
        {session && (
          <Link href={`/${user?.id}/${user?.role}/dashboard`}>
            <button className="pb-3 mt-4 text-right w-full">
              <div className="flex items-center justify-center px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition">
                <div className="mr-3 text-right">
                  <div className="text-base font-medium">{userName}</div>
                  <div className="text-sm text-gray-400">{userEmail}</div>
                </div>
                {/* User avatar or initials */}
                {userImage ? (
                  <Image
                    src={userImage}
                    width={40}
                    height={40}
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-500 text-white text-lg font-semibold">
                    {userInitials}
                  </div>
                )}
              </div>
            </button>
          </Link>
        )}
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Mobile;
