"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { LogoContext } from "@/app/layout";
import FacebookIcon from "@/assets/socials/facebook.svg";
import InstagramIcon from "@/assets/socials/instagram.svg";
import { useSession } from "next-auth/react";

const navigation = {
  navigate: [
    { name: "Listings", href: "/listings" },
    { name: "Buy", href: "/buy" },
    { name: "Sell", href: "/sell" },
    { name: "Rent", href: "/rent" },
  ],
  buyers: [
    { name: "Get Pre-Approved", href: "/get-pre-approved" },
    { name: "Cash Offer", href: "/cash-offer" },
    { name: "Market Data", href: "/market-data" },
    { name: "Investors", href: "/investors" },
  ],
  read: [
    { name: "Education", href: "/education" },
    { name: "News", href: "/news" },
  ],
  clients: [
    { name: "Login", href: "/auth/sign-in" },
    { name: "Sign Up", href: "/auth/sign-up" },
  ],
  user: [
    { name: "Profile", href: "/profile" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Settings", href: "/settings" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: FacebookIcon,
    },
    {
      name: "Instagram",
      href: "#",
      icon: InstagramIcon,
    },
  ],
};

export default function Footer() {
  const logo = useContext(LogoContext);
  const { data: session } = useSession();

  return (
    <footer>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-10">
        <div className="border-t border-gray-200 dark:border-white/10 pt-8 mt-10"></div>
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center justify-center md:justify-start">
              <Image
                alt="Coachella Valley Home Sale"
                src={logo}
                className="h-8 w-auto mt-3 mr-3"
                width={36}
                height={36}
              />
              <h1 className="text-2xl">Coachella Valley Home Sale</h1>
            </div>
            <p className="text-md">
              Dedicated to providing quality real estate services in the Coachella Valley.
            </p>
            <div className="flex gap-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="transition-colors duration-200 ease-in-out link">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            {/* Navigation Links */}
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold">Navigate</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.navigate.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm transition-colors duration-200 ease-in-out link">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold">Buyers</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.buyers.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm transition-colors duration-200 ease-in-out link">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Conditional Navigation based on Authentication */}
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold">Read</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.read.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm transition-colors duration-200 ease-in-out link">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold">Clients</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {(session ? navigation.user : navigation.clients).map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm transition-colors duration-200 ease-in-out link">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 dark:border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-sm">
            &copy; 2024 Coachella Valley Home Sale, All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
