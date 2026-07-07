"use client";

import { useState } from "react";
import { TrendingUp, Calendar, ChevronDown } from "lucide-react";

type FilterType = "7 Days" | "30 Days" | "12 Months";

interface ChartData {
  label: string;
  value: number;
}

export default function AnalyticsSection() {
  const [filter, setFilter] = useState<FilterType>("7 Days");
  const [activePoint, setActivePoint] = useState<{ index: number; x: number; y: number; value: number; label: string } | null>(null);

  // Mock data for different views
  const dataMap: Record<FilterType, ChartData[]> = {
    "7 Days": [
      { label: "Mon", value: 120 },
      { label: "Tue", value: 150 },
      { label: "Wed", value: 240 },
      { label: "Thu", value: 180 },
      { label: "Fri", value: 220 },
      { label: "Sat", value: 310 },
      { label: "Sun", value: 280 },
    ],
    "30 Days": [
      { label: "Week 1", value: 850 },
      { label: "Week 2", value: 1250 },
      { label: "Week 3", value: 1100 },
      { label: "Week 4", value: 1450 },
    ],
    "12 Months": [
      { label: "Jan", value: 2800 },
      { label: "Feb", value: 3100 },
      { label: "Mar", value: 2900 },
      { label: "Apr", value: 3600 },
      { label: "May", value: 4200 },
      { label: "Jun", value: 3900 },
      { label: "Jul", value: 4500 },
      { label: "Aug", value: 4800 },
      { label: "Sep", value: 4400 },
      { label: "Oct", value: 5100 },
      { label: "Nov", value: 4900 },
      { label: "Dec", value: 5600 },
    ],
  };

  const chartData = dataMap[filter];
  const maxVal = Math.max(...chartData.map((d) => d.value)) * 1.1; // 10% padding on top
  const minVal = Math.min(...chartData.map((d) => d.value)) * 0.9; // 10% padding on bottom

  // SVG dimensions
  const width = 600;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;

  // Calculate coordinates
  const points = chartData.map((d, i) => {
    const x = paddingX + (i * (width - 2 * paddingX)) / (chartData.length - 1);
    const y = height - paddingY - ((d.value - minVal) * (height - 2 * paddingY)) / (maxVal - minVal);
    return { x, y, value: d.value, label: d.label };
  });

  // Generate cubic bezier curve path
  let pathD = "";
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cp1x = p0.x + (p1.x - p0.x) / 3;
      const cp1y = p0.y;
      const cp2x = p0.x + (2 * (p1.x - p0.x)) / 3;
      const cp2y = p1.y;
      pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
    }
  }

  // Path for gradient fill under the line
  const fillD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
    : "";

  return (
    <section className="bg-white dark:bg-zinc-900/60 border border-gray-100/60 dark:border-zinc-800/30 rounded-2xl p-6 shadow-xs mb-8">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <TrendingUp className="text-[#e31b23]" size={18} />
            Website Visitors
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            Analysing unique incoming traffic sessions.
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="relative inline-flex bg-gray-50 dark:bg-zinc-800/40 p-1 border border-gray-100 dark:border-zinc-850 rounded-xl">
          {(["7 Days", "30 Days", "12 Months"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setActivePoint(null);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all select-none ${
                filter === f
                  ? "bg-white dark:bg-zinc-800 text-[#e31b23] shadow-xs"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative w-full h-[240px]">
        {/* Render SVG Chart */}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e31b23" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#e31b23" stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {[0, 1, 2, 3].map((tick) => {
            const y = paddingY + (tick * (height - 2 * paddingY)) / 3;
            const gridVal = Math.round(maxVal - (tick * (maxVal - minVal)) / 3);
            return (
              <g key={tick} className="opacity-40 dark:opacity-20">
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth={1}
                  className="text-gray-100 dark:text-zinc-800"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="text-[9px] font-semibold fill-gray-400 dark:fill-zinc-500 font-sans"
                >
                  {gridVal}
                </text>
              </g>
            );
          })}

          {/* Area under curve */}
          {fillD && (
            <path
              d={fillD}
              fill="url(#chartGradient)"
              className="transition-all duration-500"
            />
          )}

          {/* Smooth Curve Line */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="#e31b23"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-500"
            />
          )}

          {/* Interactive hover lines and anchor points */}
          {points.map((p, idx) => (
            <g key={idx}>
              {/* Invisible interactive hover zone */}
              <circle
                cx={p.x}
                cy={p.y}
                r={20}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setActivePoint({ index: idx, x: p.x, y: p.y, value: p.value, label: p.label })}
                onMouseLeave={() => setActivePoint(null)}
              />

              {/* Visual Anchor point */}
              <circle
                cx={p.x}
                cy={p.y}
                r={activePoint?.index === idx ? 5 : 3.5}
                fill={activePoint?.index === idx ? "#e31b23" : "#white"}
                stroke="#e31b23"
                strokeWidth={2}
                className="transition-all pointer-events-none"
              />
            </g>
          ))}

          {/* X Axis labels */}
          {points.map((p, idx) => (
            <text
              key={idx}
              x={p.x}
              y={height - paddingY + 16}
              textAnchor="middle"
              className="text-[9px] font-bold fill-gray-400 dark:fill-zinc-500 font-sans"
            >
              {p.label}
            </text>
          ))}
        </svg>

        {/* Live Hover Tooltip box */}
        {activePoint && (
          <div
            className="absolute bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-3 py-1.5 rounded-lg shadow-md text-xs font-semibold font-sans pointer-events-none transition-all duration-100 -translate-x-1/2 -translate-y-12"
            style={{
              left: `${(activePoint.x / width) * 100}%`,
              top: `${(activePoint.y / height) * 100}%`,
            }}
          >
            <div className="text-[9px] text-gray-400 dark:text-gray-500 leading-none mb-0.5">
              {activePoint.label}
            </div>
            <div className="font-extrabold text-[#ff2d35] dark:text-[#e31b23]">
              {activePoint.value.toLocaleString()} Visitors
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
