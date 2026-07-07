"use client";

import { useEffect, useState } from "react";
import { Plus, Boxes, FolderKanban, Star, LayoutDashboard } from "lucide-react";

interface DashboardHeaderProps {
  onTriggerAction: (type: "product" | "category" | "project" | "review") => void;
}

export default function DashboardHeader({ onTriggerAction }: DashboardHeaderProps) {
  const [greeting, setGreeting] = useState("Welcome back");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting("Good morning");
    } else if (hours < 17) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setDateStr(new Date().toLocaleDateString("en-US", options));
  }, []);

  const actions = [
    {
      label: "New Product",
      type: "product" as const,
      icon: <Boxes size={15} />,
    },
    {
      label: "New Category",
      type: "category" as const,
      icon: <LayoutDashboard size={15} />,
    },
    {
      label: "New Project",
      type: "project" as const,
      icon: <FolderKanban size={15} />,
    },
    {
      label: "Add Review",
      type: "review" as const,
      icon: <Star size={15} />,
    },
  ];

  return (
    <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
          {greeting}, Admin
        </h1>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 font-medium">
          Here is what is happening with The Cabins portal today. • {dateStr}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {actions.map((act) => (
          <button
            key={act.label}
            onClick={() => onTriggerAction(act.type)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-white bg-white dark:bg-zinc-900 hover:bg-[#e31b23] dark:hover:bg-[#e31b23] border border-gray-100 dark:border-zinc-850 hover:border-[#e31b23] dark:hover:border-[#e31b23] rounded-xl transition-all shadow-xs cursor-pointer select-none"
          >
            <Plus size={14} className="stroke-[2.5]" />
            <span>{act.label}</span>
          </button>
        ))}
      </div>
    </header>
  );
}
