// src/utils/navigation.ts

export interface NavItem {
    name: string;
    href: string;
    current: boolean;
  }
  
  // STATIC NAVIGATION
  
  export const staticNav = {
    title: "Coachella Valley Home Sale",
    logo: "/sun.svg", // Logo path
  };
  
  // NAVIGATION LINKS
  
  export const navigation: NavItem[] = [
    { name: "Home", href: "/", current: false },
    { name: "News", href: "/news", current: false },
    { name: "Listings", href: "/listings", current: false },
    { name: "Communities", href: "/communities", current: false },
    { name: "Sign-up", href: "/sign-up", current: false },
  ];
  
  