"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gray-100 overflow-hidden">
      {/* 🔹 TOP NAVBAR */}
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />

      {/* 🔹 FLOATING SIDEBAR */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* 🔹 MAIN CONTENT (HYDRATION SAFE) */}
      <main className="pt-2 px-1  sm:px-3 transition-all md:pl-28 pb-28 md:pb-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
