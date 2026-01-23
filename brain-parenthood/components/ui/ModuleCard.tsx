"use client";

import Link from "next/link";

// Color palette for modules - matching the modern UI example
const moduleColors = [
  { bg: "bg-gradient-to-br from-teal-500 to-teal-600", light: "bg-teal-50", text: "text-teal-600", border: "border-teal-200" },
  { bg: "bg-gradient-to-br from-blue-500 to-blue-600", light: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  { bg: "bg-gradient-to-br from-pink-400 to-pink-500", light: "bg-pink-50", text: "text-pink-600", border: "border-pink-200" },
  { bg: "bg-gradient-to-br from-indigo-500 to-indigo-600", light: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200" },
  { bg: "bg-gradient-to-br from-emerald-500 to-emerald-600", light: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
  { bg: "bg-gradient-to-br from-violet-500 to-violet-600", light: "bg-violet-50", text: "text-violet-600", border: "border-violet-200" },
  { bg: "bg-gradient-to-br from-amber-500 to-amber-600", light: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
  { bg: "bg-gradient-to-br from-cyan-500 to-cyan-600", light: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200" },
  { bg: "bg-gradient-to-br from-rose-500 to-rose-600", light: "bg-rose-50", text: "text-rose-600", border: "border-rose-200" },
  { bg: "bg-gradient-to-br from-sky-500 to-sky-600", light: "bg-sky-50", text: "text-sky-600", border: "border-sky-200" },
  { bg: "bg-gradient-to-br from-fuchsia-500 to-fuchsia-600", light: "bg-fuchsia-50", text: "text-fuchsia-600", border: "border-fuchsia-200" },
  { bg: "bg-gradient-to-br from-lime-500 to-lime-600", light: "bg-lime-50", text: "text-lime-600", border: "border-lime-200" },
];

interface ModuleCardProps {
  moduleNumber: number;
  title: string;
  subtitle: string;
  status: "completed" | "in-progress" | "available" | "locked";
  progress?: number;
  href?: string;
}

// Colorful category-style card (like the Categories section in the example)
export function ModuleCardColorful({
  moduleNumber,
  title,
  subtitle,
  status,
  href,
}: ModuleCardProps) {
  const isClickable = status !== "locked";
  const colorIndex = (moduleNumber - 1) % moduleColors.length;
  const colors = moduleColors[colorIndex];

  const CardContent = (
    <div
      className={`
        relative rounded-2xl p-5 min-h-[140px]
        transition-all duration-200 ease-out
        ${status === "locked"
          ? "bg-gray-300 opacity-50 cursor-not-allowed"
          : `${colors.bg} cursor-pointer hover:scale-[1.02] hover:shadow-lg`
        }
      `}
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
        {status === "completed" ? (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <span className="text-white font-bold">{moduleNumber}</span>
        )}
      </div>

      {/* Content */}
      <h3 className="text-white font-semibold text-base mb-1">{title}</h3>
      <p className="text-white/70 text-sm">{subtitle}</p>

      {/* Status indicator */}
      {status === "in-progress" && (
        <div className="absolute top-4 right-4">
          <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
        </div>
      )}
      {status === "completed" && (
        <div className="absolute top-4 right-4">
          <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      )}
    </div>
  );

  if (isClickable && href) {
    return <Link href={href} className="block">{CardContent}</Link>;
  }

  return CardContent;
}

// White card with colored icon and progress bar (like the Files section)
export default function ModuleCard({
  moduleNumber,
  title,
  subtitle,
  status,
  progress = 0,
  href,
}: ModuleCardProps) {
  const isClickable = status !== "locked";
  const colorIndex = (moduleNumber - 1) % moduleColors.length;
  const colors = moduleColors[colorIndex];

  const CardContent = (
    <div
      className={`
        relative bg-white rounded-2xl p-5 border
        transition-all duration-200 ease-out
        ${status === "locked"
          ? "opacity-50 cursor-not-allowed border-gray-200"
          : `cursor-pointer hover:shadow-md border-gray-100 hover:border-gray-200`
        }
      `}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Colored Icon */}
        <div className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
          {status === "completed" ? (
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span className="text-white font-bold text-sm">{moduleNumber}</span>
          )}
        </div>

        {/* Title & Subtitle */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-base mb-0.5">{title}</h3>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-auto">
        <div className={`h-1.5 rounded-full overflow-hidden ${colors.light}`}>
          <div
            className={`h-full rounded-full transition-all duration-500 ${colors.bg}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );

  if (isClickable && href) {
    return <Link href={href} className="block">{CardContent}</Link>;
  }

  return CardContent;
}

// Compact list item style (like Recent files section)
export function ModuleListItem({
  moduleNumber,
  title,
  subtitle,
  status,
  progress = 0,
  href,
}: ModuleCardProps) {
  const isClickable = status !== "locked";
  const colorIndex = (moduleNumber - 1) % moduleColors.length;
  const colors = moduleColors[colorIndex];

  const statusText = {
    completed: "Completed",
    "in-progress": "In Progress",
    available: "Available",
    locked: "Locked",
  };

  const CardContent = (
    <div
      className={`
        flex items-center gap-4 bg-white rounded-xl px-5 py-4 border border-gray-100
        transition-all duration-200 ease-out
        ${status === "locked"
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer hover:shadow-sm hover:border-gray-200"
        }
      `}
    >
      {/* Colored Circle Icon */}
      <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
        {status === "completed" ? (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <span className="text-white font-bold text-sm">{moduleNumber}</span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 text-sm">{title}</h3>
        <p className="text-gray-400 text-xs">{subtitle}</p>
      </div>

      {/* Status */}
      <div className="text-right flex-shrink-0">
        <span className={`text-xs font-medium ${colors.text}`}>{statusText[status]}</span>
        <p className="text-gray-400 text-xs">{progress}%</p>
      </div>

      {/* Actions */}
      {isClickable && (
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );

  if (isClickable && href) {
    return <Link href={href} className="block">{CardContent}</Link>;
  }

  return CardContent;
}
