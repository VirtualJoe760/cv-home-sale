import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

// Interface for Navigation Items
export interface NavItem {
  name: string;
  href?: string;
  current: boolean;
  action?: (userName: string, router: ReturnType<typeof useRouter>) => Promise<void>;
}

// Static Navigation (e.g., Title and Logo)
export const staticNav = {
  title: "Coachella Valley Home Sale",
  logo: "/sun.svg",
};

// Navigation for Non-Authenticated Users
export const guestNavigation: NavItem[] = [
  { name: "Home", href: "/", current: false },
  { name: "News", href: "/news", current: false },
  { name: "Listings", href: "/listings", current: false },
  { name: "Communities", href: "/communities", current: false },
];

// Navigation for Authenticated Users
export const userNavigation: NavItem[] = [
  { name: "Home", href: "/", current: false },
  { name: "News", href: "/news", current: false },
  { name: "Listings", href: "/listings", current: false },
  { name: "Communities", href: "/communities", current: false },
];

// Generate Dashboard URL for Authenticated Users
export const getDashboardUrl = (userId: string, role: string, path: string = ""): string => {
  return `/${userId}/${role}/dashboard${path ? `/${path}` : ""}`;
};

// Dropdown Links for Authenticated Users (Profile Section)
export const userDropdown: (userId: string, role: string) => NavItem[] = (userId, role) => [
  { name: "Dashboard", href: getDashboardUrl(userId, role), current: false },
  { name: "Profile", href: getDashboardUrl(userId, role, "profile"), current: false },
  { name: "Settings", href: getDashboardUrl(userId, role, "settings"), current: false },
  {
    name: "Logout",
    current: false,
    action: async (userName: string, router: ReturnType<typeof useRouter>) => {
      await signOut({ redirect: false });
      toast.info(`${userName} Logged Out`, { position: "top-right" });
      router.push("/");
    },
  },
];
