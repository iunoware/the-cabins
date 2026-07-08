"use client";

import { Activity, Plus, RefreshCw, Star, Edit, UploadCloud } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "create_product" | "update_product" | "create_review" | "update_project" | "upload_brochure" | "other";
  title: string;
  timestamp: string;
}

interface RecentActivitySectionProps {
  activities?: ActivityItem[];
}

export default function RecentActivitySection({ activities }: RecentActivitySectionProps) {
  // Default mock activity feed
  const defaultActivities: ActivityItem[] = [
    {
      id: "act-1",
      type: "create_product",
      title: "New Product Added: Luxury Portable Cabin",
      timestamp: "2 hours ago",
    },
    {
      id: "act-2",
      type: "update_product",
      title: "Product Updated: Executive Office Cabin Price changed",
      timestamp: "4 hours ago",
    },
    {
      id: "act-3",
      type: "create_review",
      title: "New Review Published: 5 Stars from Emaar Site Office",
      timestamp: "Yesterday",
    },
    {
      id: "act-4",
      type: "update_project",
      title: "Project Edited: Abu Dhabi Site Offices gallery updated",
      timestamp: "Yesterday",
    },
    {
      id: "act-5",
      type: "upload_brochure",
      title: "Brochure Uploaded: 2026 Commercial Cabins Catalog",
      timestamp: "2 days ago",
    },
    {
      id: "act-6",
      type: "update_product",
      title: "Product Updated: Guard Room specifications edited",
      timestamp: "3 days ago",
    },
  ];

  const displayActivities = activities || defaultActivities;

  const getIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "create_product":
        return <Plus className="text-emerald-500" size={15} />;
      case "update_product":
        return <RefreshCw className="text-blue-500" size={14} />;
      case "create_review":
        return <Star className="text-amber-500 fill-amber-500" size={14} />;
      case "update_project":
        return <Edit className="text-indigo-500" size={14} />;
      case "upload_brochure":
        return <UploadCloud className="text-[#e31b23]" size={15} />;
      default:
        return <Activity className="text-gray-500" size={14} />;
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900/60 border border-gray-100/60 dark:border-zinc-800/30 rounded-2xl p-6 shadow-xs h-full flex flex-col justify-between">
      {/* Title */}
      <div className="mb-6">
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Activity className="text-[#e31b23]" size={18} />
          Recent Activity
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Realtime logs of the admin portal operations.
        </p>
      </div>

      {/* Timeline items */}
      <div className="relative pl-4 border-l-2 border-gray-100/40 dark:border-zinc-850/30 flex flex-col gap-6.5 py-1.5 flex-1">
        {displayActivities.map((act) => (
          <div key={act.id} className="relative group">
            {/* Timeline node icon */}
            <div className="absolute -left-[24.5px] top-[1.5px] w-5.5 h-5.5 rounded-full bg-white dark:bg-zinc-900 border border-gray-100/80 dark:border-zinc-850/60 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              {getIcon(act.type)}
            </div>

            {/* Description */}
            <div className="pl-1">
              <div className="text-xs font-bold text-gray-800 dark:text-gray-200 hover:text-[#e31b23] transition-colors leading-tight">
                {act.title}
              </div>
              <div className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold mt-1">
                {act.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
