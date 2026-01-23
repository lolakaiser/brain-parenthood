"use client";

import Link from "next/link";

interface ModuleCardProps {
  moduleNumber: number;
  title: string;
  subtitle: string;
  description?: string;
  status: "completed" | "in-progress" | "available" | "locked";
  progress?: number; // 0-100
  href?: string;
  icon?: React.ReactNode;
}

export default function ModuleCard({
  moduleNumber,
  title,
  subtitle,
  description,
  status,
  progress = 0,
  href,
  icon,
}: ModuleCardProps) {
  const isClickable = status !== "locked";

  const statusStyles = {
    completed: {
      card: "bg-white border-success-200 hover:border-success-400 hover:shadow-notion-hover",
      icon: "bg-success-500",
      badge: "bg-success-100 text-success-700",
      progress: "bg-success-500",
    },
    "in-progress": {
      card: "bg-white border-primary-200 hover:border-primary-400 hover:shadow-notion-hover ring-2 ring-primary-100",
      icon: "bg-primary-600",
      badge: "bg-primary-100 text-primary-700",
      progress: "bg-primary-500",
    },
    available: {
      card: "bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-notion-hover",
      icon: "bg-neutral-600",
      badge: "bg-neutral-100 text-neutral-600",
      progress: "bg-neutral-300",
    },
    locked: {
      card: "bg-neutral-50 border-neutral-150 opacity-50 cursor-not-allowed",
      icon: "bg-neutral-300",
      badge: "bg-neutral-100 text-neutral-400",
      progress: "bg-neutral-200",
    },
  };

  const styles = statusStyles[status];

  const CardContent = (
    <div
      className={`
        group relative flex flex-col
        rounded-2xl border-2 p-5
        transition-all duration-200 ease-out
        ${styles.card}
        ${isClickable ? "cursor-pointer hover:-translate-y-0.5" : ""}
      `}
    >
      {/* Header Row: Icon + Status Badge */}
      <div className="flex items-start justify-between mb-4">
        {/* Module Icon */}
        <div
          className={`
            w-12 h-12 rounded-xl flex items-center justify-center
            text-white font-semibold text-lg
            transition-transform duration-200
            ${styles.icon}
            ${isClickable ? "group-hover:scale-105" : ""}
          `}
        >
          {status === "completed" ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : icon ? (
            icon
          ) : (
            moduleNumber
          )}
        </div>

        {/* Status Badge */}
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles.badge}`}>
          {status === "completed"
            ? "Done"
            : status === "in-progress"
            ? "Current"
            : status === "available"
            ? `Week ${moduleNumber}`
            : "Locked"}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 mb-4">
        <h3 className="font-display font-semibold text-base text-neutral-900 mb-1 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-neutral-500 leading-snug">
          {subtitle}
        </p>
        {description && (
          <p className="text-xs text-neutral-400 mt-2 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* Progress Bar - Always Visible */}
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-neutral-400">Progress</span>
          <span className="text-xs font-medium text-neutral-600">{progress}%</span>
        </div>
        <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${styles.progress}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Hover Indicator for Available Cards */}
      {isClickable && status !== "completed" && (
        <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );

  if (isClickable && href) {
    return <Link href={href}>{CardContent}</Link>;
  }

  return CardContent;
}

// Compact version for app-launcher grid
export function ModuleCardCompact({
  moduleNumber,
  title,
  subtitle,
  status,
  progress = 0,
  href,
}: Omit<ModuleCardProps, "description" | "icon">) {
  const isClickable = status !== "locked";

  const statusStyles = {
    completed: {
      card: "bg-white border-success-200 hover:border-success-400",
      icon: "bg-gradient-to-br from-success-400 to-success-600",
      progressBg: "bg-success-100",
      progressBar: "bg-success-500",
    },
    "in-progress": {
      card: "bg-white border-primary-200 hover:border-primary-400 ring-2 ring-primary-50",
      icon: "bg-gradient-to-br from-primary-500 to-primary-700",
      progressBg: "bg-primary-100",
      progressBar: "bg-primary-500",
    },
    available: {
      card: "bg-white border-neutral-200 hover:border-neutral-300",
      icon: "bg-gradient-to-br from-neutral-500 to-neutral-700",
      progressBg: "bg-neutral-100",
      progressBar: "bg-neutral-400",
    },
    locked: {
      card: "bg-neutral-50/80 border-neutral-150",
      icon: "bg-neutral-200",
      progressBg: "bg-neutral-100",
      progressBar: "bg-neutral-200",
    },
  };

  const styles = statusStyles[status];

  const CardContent = (
    <div
      className={`
        group relative flex flex-col items-center text-center
        rounded-2xl border-2 p-5 min-h-[180px]
        transition-all duration-200 ease-out
        ${styles.card}
        ${isClickable ? "cursor-pointer hover:-translate-y-1 hover:shadow-notion-hover" : "opacity-50 cursor-not-allowed"}
      `}
    >
      {/* Icon */}
      <div
        className={`
          w-14 h-14 rounded-2xl flex items-center justify-center
          text-white font-bold text-xl mb-3
          shadow-sm transition-transform duration-200
          ${styles.icon}
          ${isClickable ? "group-hover:scale-110" : ""}
        `}
      >
        {status === "completed" ? (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          moduleNumber
        )}
      </div>

      {/* Title & Subtitle */}
      <h3 className="font-display font-semibold text-sm text-neutral-900 mb-0.5 leading-tight">
        {title}
      </h3>
      <p className="text-xs text-neutral-500 mb-3">
        {subtitle}
      </p>

      {/* Progress Indicator - Circular style */}
      <div className="mt-auto w-full">
        <div className={`h-1 w-full rounded-full overflow-hidden ${styles.progressBg}`}>
          <div
            className={`h-full rounded-full transition-all duration-500 ${styles.progressBar}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[10px] text-neutral-400 mt-1.5">{progress}% complete</p>
      </div>
    </div>
  );

  if (isClickable && href) {
    return <Link href={href}>{CardContent}</Link>;
  }

  return CardContent;
}
