"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useContext } from "react";
import { LogoContext } from "@/app/layout";
import { navigation, staticNav } from "@/utils/navigation";

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

const Navbar: React.FC = () => {
  const logo = useContext(LogoContext); // Access the logo based on the current theme

  return (
    <Disclosure as="nav">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-inset">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>

          {/* Left side of the navbar: logo and title */}
          <div className="flex flex-1 items-center justify-start">
            <div className="flex flex-shrink-0 items-center">
              {/* Use the dynamic logo */}
              <Image src={logo} alt={`${staticNav.title} logo`} width={24} height={24} />
              <span className="sm:block ml-2 lg:text-2xl font-bold text-lg">{staticNav.title}</span>
            </div>
          </div>

          {/* Right side of the navbar: navigation links */}
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current ? "border-b-2" : "border-b-2 border-transparent",
                    "rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out hover:border-opacity-75 link"
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu for smaller screens */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current ? "bg-opacity-10" : "hover:bg-opacity-10",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
