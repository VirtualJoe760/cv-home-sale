import { HomeIcon, UsersIcon, FolderIcon, CalendarIcon, DocumentDuplicateIcon, ChartPieIcon, Cog8ToothIcon, HomeModernIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { UserRole } from '@/types/user';

export interface NavItem {
  name: string;
  href: (userId: string, role: UserRole) => string;
  icon: React.ComponentType<{ className?: string }>;
  count?: string;
  roles: UserRole[];
}

// Helper function to create dynamic URLs
const createHref = (path: string) => (userId: string, role: UserRole) => `/${userId}/${role}${path}`;

// Base navigation items available to all authenticated users
const baseNavigation: NavItem[] = [
  { name: 'Dashboard', href: createHref('/dashboard'), icon: HomeIcon, roles: ['buyer', 'seller', 'agent', 'admin'] },
  { name: 'Profile', href: createHref('/dashboard/profile'), icon: UsersIcon, roles: ['buyer', 'seller', 'agent', 'admin'] },
  { name: 'Settings', href: createHref('/dashboard/settings'), icon: Cog8ToothIcon, roles: ['buyer', 'seller', 'agent', 'admin'] },
];

// Buyer-specific navigation
const buyerNavigation: NavItem[] = [
  { name: 'My Neighborhoods', href: createHref('/dashboard/my-neighborhoods'), icon: HomeModernIcon, roles: ['buyer'] },
  { name: 'Saved Listings', href: createHref('/dashboard/saved-listings'), icon: BookmarkIcon, roles: ['buyer'] },
  { name: 'Loan Pre-Approval', href: createHref('/dashboard/loan-pre-approval'), icon: DocumentDuplicateIcon, roles: ['buyer'] },
];

// Seller-specific navigation
const sellerNavigation: NavItem[] = [
  { name: 'My Listings', href: createHref('/dashboard/my-listings'), icon: FolderIcon, roles: ['seller'] },
  { name: 'Market Data', href: createHref('/dashboard/market-data'), icon: ChartPieIcon, roles: ['seller'] },
  { name: 'Offers Received', href: createHref('/dashboard/offers-received'), icon: CalendarIcon, roles: ['seller'] },
];

// Agent-specific navigation
const agentNavigation: NavItem[] = [
  { name: 'My Clients', href: createHref('/dashboard/my-clients'), icon: UsersIcon, roles: ['agent'] },
  { name: 'Transactions', href: createHref('/dashboard/transactions'), icon: FolderIcon, roles: ['agent'] },
  { name: 'Commission Reports', href: createHref('/dashboard/commission-reports'), icon: DocumentDuplicateIcon, roles: ['agent'] },
];

// Admin-specific navigation
const adminNavigation: NavItem[] = [
  { name: 'User Management', href: createHref('/dashboard/user-management'), icon: UsersIcon, roles: ['admin'] },
  { name: 'Reports', href: createHref('/dashboard/reports'), icon: ChartPieIcon, roles: ['admin'] },
  { name: 'Settings', href: createHref('/dashboard/settings'), icon: CalendarIcon, roles: ['admin'] },
];

// Guest-specific navigation (limited items)
const guestNavigation: NavItem[] = [
  { name: 'Home', href: createHref('/'), icon: HomeIcon, roles: ['guest'] },
  { name: 'Sign Up', href: createHref('/signup'), icon: UsersIcon, roles: ['guest'] },
  { name: 'Log In', href: createHref('/login'), icon: FolderIcon, roles: ['guest'] },
];

// Role-based navigation mapping
const roleBasedNavigation: Record<UserRole, NavItem[]> = {
  buyer: buyerNavigation,
  seller: sellerNavigation,
  agent: agentNavigation,
  admin: adminNavigation,
  guest: guestNavigation,
};

export const getNavigationForRoles = (userId: string, roles: UserRole[]): NavItem[] => {
  console.log("getNavigationForRoles - Roles provided:", roles); // Log provided roles

  // Retrieve role-based navigation items based on each role in the roles array
  const roleNavigations = roles.flatMap(role => roleBasedNavigation[role] || []);

  // Combine base navigation with role-based navigation
  const combinedNavigation = [...baseNavigation, ...roleNavigations];

  // Deduplicate navigation items by `name` and `href` using each item’s specific role
  const uniqueNavigation = Array.from(
    new Map(
      combinedNavigation.map(item => [
        `${item.name}-${item.href(userId, item.roles[0])}`, // Use item’s own roles[0] to create unique key
        item
      ])
    ).values()
  );

  console.log("Final unique navigation items:", uniqueNavigation); // Log the final unique navigation
  return uniqueNavigation;
};
