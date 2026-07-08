"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "./(components)/DashboardHeader";
import KpiSection from "./(components)/KpiSection";
import AnalyticsSection from "./(components)/AnalyticsSection";
import TopProductsSection from "./(components)/TopProductsSection";
import RecentActivitySection from "./(components)/RecentActivitySection";
import QuickActionModal from "./(components)/QuickActionModal";
import { Info, HelpCircle } from "lucide-react";

export default function AdminDashboard() {
  // Global view control states (for loading skeleton and empty state previews)
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  // Quick Action Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<
    "product" | "category" | "project" | "review" | null
  >(null);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleTriggerAction = (
    type: "product" | "category" | "project" | "review",
  ) => {
    setActiveAction(type);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    console.log("Quick Action Form submitted with data:", data);
    // Here we can easily hook up the API endpoint in the future
    alert(`Success: ${activeAction?.toUpperCase()} added successfully!`);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* 1. Dashboard Header */}
      {isLoading ? (
        <div className="animate-pulse flex flex-col gap-3.5 mb-8">
          <div className="h-8 bg-gray-250 dark:bg-zinc-800 rounded-lg w-64" />
          <div className="h-4 bg-gray-200 dark:bg-zinc-850 rounded-lg w-96" />
        </div>
      ) : (
        <DashboardHeader onTriggerAction={handleTriggerAction} />
      )}

      {/* 2. KPI Section */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 rounded-2xl p-6 h-36"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="h-3.5 bg-gray-200 dark:bg-zinc-800 rounded-md w-28" />
                <div className="h-9 w-9 bg-gray-200 dark:bg-zinc-800 rounded-xl" />
              </div>
              <div className="h-8 bg-gray-250 dark:bg-zinc-800 rounded-md w-20 mb-3" />
              <div className="h-3 bg-gray-150 dark:bg-zinc-850 rounded-md w-24" />
            </div>
          ))}
        </div>
      ) : isEmpty ? (
        <KpiSection
          data={[
            {
              title: "Total Products",
              value: 0,
              change: "No products added",
              isPositive: false,
              icon: null,
            },
            {
              title: "Total Categories",
              value: 0,
              change: "No categories added",
              isPositive: false,
              icon: null,
            },
            {
              title: "Total Projects",
              value: 0,
              change: "No projects added",
              isPositive: false,
              icon: null,
            },
            {
              title: "Customer Reviews",
              value: 0,
              change: "No reviews published",
              isPositive: false,
              icon: null,
            },
            {
              title: "Website Visitors",
              value: 0,
              change: "No traffic logs",
              isPositive: false,
              icon: null,
            },
            {
              title: "WhatsApp Enquiries",
              value: 0,
              change: "No enquiries received",
              isPositive: false,
              icon: null,
            },
          ]}
        />
      ) : (
        <KpiSection />
      )}

      {/* 3. Analytics Chart */}
      {isLoading ? (
        <div className="animate-pulse bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 rounded-2xl p-6 h-85 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col gap-2">
              <div className="h-4 bg-gray-250 dark:bg-zinc-800 rounded-md w-36" />
              <div className="h-3 bg-gray-200 dark:bg-zinc-850 rounded-md w-56" />
            </div>
            <div className="h-9 bg-gray-200 dark:bg-zinc-800 rounded-xl w-44" />
          </div>
          <div className="w-full h-50 border-b border-l border-gray-150 dark:border-zinc-800 flex items-end p-2">
            <div className="w-full h-1/2 bg-gray-100 dark:bg-zinc-850/60 rounded-t-lg animate-pulse" />
          </div>
        </div>
      ) : isEmpty ? (
        <div className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800/80 rounded-2xl p-8 shadow-xs mb-8 text-center flex flex-col items-center justify-center min-h-75">
          <HelpCircle
            className="text-gray-300 dark:text-zinc-700 mb-3"
            size={32}
          />
          <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">
            No Visitor Data Logged
          </h4>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 max-w-sm">
            Traffic logs will populate automatically once real visitors visit
            the customer website interface.
          </p>
        </div>
      ) : (
        <AnalyticsSection />
      )}

      {/* 4. Split Grid for Top Products and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Top Performing Products */}
        {isLoading ? (
          <div className="animate-pulse bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 rounded-2xl p-6 h-95">
            <div className="h-4 bg-gray-250 dark:bg-zinc-800 rounded-md w-44 mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-zinc-850 rounded-md w-60 mb-6" />
            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg" />
                    <div className="flex flex-col gap-1.5">
                      <div className="h-3.5 bg-gray-200 dark:bg-zinc-800 rounded-md w-36" />
                      <div className="h-2.5 bg-gray-150 dark:bg-zinc-850 rounded-md w-20" />
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded-md w-10" />
                </div>
              ))}
            </div>
          </div>
        ) : isEmpty ? (
          <div className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800/80 rounded-2xl p-8 shadow-xs text-center flex flex-col items-center justify-center min-h-87.5">
            <HelpCircle
              className="text-gray-300 dark:text-zinc-700 mb-3"
              size={32}
            />
            <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">
              No Top Performing Products
            </h4>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 max-w-sm">
              We compile views and clicks analysis automatically based on active
              inquiries.
            </p>
          </div>
        ) : (
          <TopProductsSection />
        )}

        {/* Recent Activity Logs */}
        {isLoading ? (
          <div className="animate-pulse bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 rounded-2xl p-6 h-95">
            <div className="h-4 bg-gray-250 dark:bg-zinc-800 rounded-md w-40 mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-zinc-850 rounded-md w-56 mb-8" />
            <div className="flex flex-col gap-6.5 pl-4 border-l border-gray-100 dark:border-zinc-800">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-col gap-1.5 relative">
                  <div className="absolute -left-6 w-4.5 h-4.5 rounded-full bg-gray-200 dark:bg-zinc-850 border-4 border-white dark:border-zinc-900" />
                  <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded-md w-60" />
                  <div className="h-2.5 bg-gray-150 dark:bg-zinc-850 rounded-md w-16" />
                </div>
              ))}
            </div>
          </div>
        ) : isEmpty ? (
          <div className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800/80 rounded-2xl p-8 shadow-xs text-center flex flex-col items-center justify-center min-h-87.5">
            <HelpCircle
              className="text-gray-300 dark:text-zinc-700 mb-3"
              size={32}
            />
            <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">
              No Recent Activities Logged
            </h4>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 max-w-sm">
              Any actions you make (adding/editing products and reviews) will be
              listed here.
            </p>
          </div>
        ) : (
          <RecentActivitySection />
        )}
      </div>

      {/* 5. Developer Preview Bar (Sticky bottom) */}
      <div className="mt-8 border-t border-gray-200 dark:border-zinc-850 pt-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
          <Info size={15} className="text-[#e31b23]" />
          <span>
            <strong>Developer Tooling:</strong> Use these toggles to review the
            pre-configured layout modes.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLoading(!isLoading)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all border select-none ${
              isLoading
                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 border-transparent shadow-xs"
                : "bg-white dark:bg-zinc-900 text-gray-600 dark:text-gray-400 border-gray-250 dark:border-zinc-800 hover:bg-gray-50"
            }`}
          >
            Toggle Skeleton loading
          </button>
          <button
            onClick={() => setIsEmpty(!isEmpty)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all border select-none ${
              isEmpty
                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 border-transparent shadow-xs"
                : "bg-white dark:bg-zinc-900 text-gray-600 dark:text-gray-400 border-gray-250 dark:border-zinc-800 hover:bg-gray-50"
            }`}
          >
            Toggle Empty States
          </button>
        </div>
      </div>

      {/* 6. Quick Action Dialog Modal */}
      <QuickActionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setActiveAction(null);
        }}
        actionType={activeAction}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
