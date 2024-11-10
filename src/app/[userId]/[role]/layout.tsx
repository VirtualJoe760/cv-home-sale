'use client';

import React, { useEffect, useState } from "react";
import UserNav from "@/app/components/UserNav";
import { identifyUser } from "@/utils/identifyUser";
import { NavItem } from "@/utils/userNav";
import { UserRole } from "@/types/user";

export default function DashboardLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ userId: string; role: string }>;
}) {
  const [navigationItems, setNavigationItems] = useState<NavItem[]>([]);
  const [params, setParams] = useState<{ userId: string; role: UserRole } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function resolveParams() {
      try {
        const resolvedParams = await paramsPromise;
        setParams({
          userId: resolvedParams.userId,
          role: resolvedParams.role as UserRole,
        });
      } catch (error) {
        console.error("Failed to resolve params:", error);
      }
    }
    resolveParams();
  }, [paramsPromise]);

  useEffect(() => {
    async function fetchNavigationItems() {
      if (params?.userId) {
        try {
          const { userRole, navigationItems } = await identifyUser(params.userId);
          setNavigationItems(navigationItems);
        } catch (error) {
          console.error("Failed to fetch navigation items:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    if (params) fetchNavigationItems();
  }, [params]);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      {params && navigationItems.length > 0 && (
        <UserNav
          navigationItems={navigationItems}
          userId={params.userId}
          role={params.role}
        />
      )}
      <div className="flex-1 p-6 overflow-auto" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
        {children}
      </div>
    </div>
  );
}
