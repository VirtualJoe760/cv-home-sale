export interface NavItem {
  name: string;
  href: string;
  current: boolean;
}

// STATIC NAVIGATION
export const staticNav = {
  title: "Coachella Valley Home Sale",
  logo: "/sun.svg",
};

// NAVIGATION LINKS for non-authenticated users
export const guestNavigation: NavItem[] = [
  { name: "News", href: "/news", current: false },
  { name: "Listings", href: "/listings", current: false },
  { name: "Communities", href: "/communities", current: false },
];

// NAVIGATION LINKS for authenticated users
export const userNavigation: NavItem[] = [
  { name: "News", href: "/news", current: false },
  { name: "Listings", href: "/listings", current: false },
  { name: "Communities", href: "/communities", current: false },
];

// DROPDOWN LINKS for authenticated users (Profile)
export const userDropdown: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", current: false },
  { name: "Profile", href: "/profile", current: false },
  { name: "Settings", href: "/settings", current: false },
];
