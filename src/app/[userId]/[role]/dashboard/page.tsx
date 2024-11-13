// src/app/[userId]/[role]/dashboard/page.tsx
import { BarChartMultiple } from "@/app/components/charts/BarChartMultiple";
import React from "react";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
      <p className="mt-2 text-lg">Here’s an overview of your recent activity.</p>
      {/* Additional content based on role, stats, or other dashboard highlights */}
      <BarChartMultiple />
    </div>
  );
}
