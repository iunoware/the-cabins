"use client";

import { Boxes, Building2, Star, Eye, MessageSquare, Layers } from "lucide-react";

interface KpiData {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

interface KpiSectionProps {
  onCardClick?: (title: string) => void;
  data?: KpiData[];
}

export default function KpiSection({ onCardClick, data }: KpiSectionProps) {
  // Default fallback mock data
  const defaultData: KpiData[] = [
    {
      title: "Total Products",
      value: "42",
      change: "+3 this week",
      isPositive: true,
      icon: <Boxes className="text-[#e31b23]" size={20} />,
    },
    {
      title: "Total Categories",
      value: "8",
      change: "Flat this month",
      isPositive: true,
      icon: <Layers className="text-gray-500" size={20} />,
    },
    {
      title: "Total Projects",
      value: "19",
      change: "+2 new completed",
      isPositive: true,
      icon: <Building2 className="text-[#e31b23]" size={20} />,
    },
    {
      title: "Customer Reviews",
      value: "148",
      change: "+12 from last month",
      isPositive: true,
      icon: <Star className="text-amber-500 fill-amber-500" size={20} />,
    },
    {
      title: "Website Visitors",
      value: "3,842",
      change: "+18% from last month",
      isPositive: true,
      icon: <Eye className="text-blue-500" size={20} />,
    },
    {
      title: "WhatsApp Enquiries",
      value: "94",
      change: "+8 this week",
      isPositive: true,
      icon: <MessageSquare className="text-emerald-500" size={20} />,
    },
  ];

  const displayData = data || defaultData;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {displayData.map((kpi, index) => (
        <div
          key={index}
          onClick={() => onCardClick?.(kpi.title)}
          className="group relative bg-white dark:bg-zinc-900/60 border border-gray-100/60 dark:border-zinc-800/30 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 ease-out cursor-pointer hover:-translate-y-0.5 select-none"
        >
          {/* Card Header / Icon Bubble */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {kpi.title}
            </span>
            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/40 group-hover:bg-red-50 dark:group-hover:bg-[#e31b23]/10 transition-colors">
              {kpi.icon}
            </div>
          </div>

          {/* Metric Value */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              {kpi.value}
            </span>
          </div>

          {/* Comparison / Change */}
          <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500 font-medium">
            <span className={kpi.isPositive ? "text-emerald-600 dark:text-emerald-500" : "text-red-600 dark:text-red-500"}>
              {kpi.change}
            </span>
          </p>
        </div>
      ))}
    </section>
  );
}
