"use client";

import { useEffect } from "react";
import Sidebar from "./(components)/Sidebar";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Explicitly remove "dark" class to force light mode in system dark mode
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark");
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f9fafb] text-gray-900">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
