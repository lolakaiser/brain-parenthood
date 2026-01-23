"use client";

import Link from "next/link";

interface ModuleCardProps {
  moduleNumber: number;
  title: string;
  subtitle: string;
  description?: string;
  status: "completed" | "in-progress" | "available" | "locked";
  progress?: number;
  href?: string;
}

export default function ModuleCard({
  moduleNumber,
  title,
  subtitle,
  description,
  status,
  progress = 0,
  href,
}: ModuleCardProps) {
  const isClickable = status !== "locked";

  const statusConfig = {
    completed: {
      card: "bg-white border-neutral-200 hover:border-success-400 hover:shadow-lg",
      badge: "bg-success-50 text-success-700 border border-success-200",
      badgeText: "Completed",
      iconBg: "bg-success-500",
      progressBar: "bg-success-500",
    },
    "in-progress": {
      card: "bg-white border-primary-200 hover:border-primary-400 hover:shadow-lg shadow-sm",
      badge: "bg-primary-50 text-primary-700 border border-primary-200",
      badgeText: "In Progress",
      iconBg: "bg-primary-600",
      progressBar: "bg-primary-500",
    },
    available: {
      card: "bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-lg",
      badge: "bg-neutral-50 text-neutral-600 border border-neutral-200",
      badgeText: "Available",
      iconBg: "bg-neutral-700",
      progressBar: "bg-neutral-300",
    },
    locked: {
      card: "bg-neutral-50 border-neutral-200 opacity-60",
      badge: "bg-neutral-100 text-neutral-400 border border-neutral-200",
      badgeText: "Locked",
      iconBg: "bg-neutral-300",
      progressBar: "bg-neutral-200",
    },
  };

  const config = statusConfig[status];

  const CardContent = (
    <div
      className={`
        relative flex flex-col h-full
        rounded-2xl border p-6
        transition-all duration-200 ease-out
        ${config.card}
        ${isClickable ? "cursor-pointer" : "cursor-not-allowed"}
      `}
    >
      {/* Top Row: Module Number + Status */}
      <div className="flex items-center justify-between mb-5">
        <div
          className={`
            w-11 h-11 rounded-xl flex items-center justify-center
            text-white font-semibold text-base
            ${config.iconBg}
          `}
        >
          {status === "completed" ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            moduleNumber
          )}
        </div>

        <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${config.badge}`}>
          {config.badgeText}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 mb-5">
        <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">
          Week {moduleNumber}
        </p>
        <h3 className="font-display font-semibold text-lg text-neutral-900 mb-2 leading-snug">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
        {!description && subtitle && (
          <p className="text-sm text-neutral-500">
            {subtitle}
          </p>
        )}
      </div>

      {/* Progress Section */}
      <div className="mt-auto pt-4 border-t border-neutral-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-neutral-500">Progress</span>
          <span className="text-xs font-semibold text-neutral-700">{progress}%</span>
        </div>
        <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${config.progressBar}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Hover Arrow Indicator */}
      {isClickable && (
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-5 h-5 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );

  if (isClickable && href) {
    return (
      <Link href={href} className="group block h-full">
        {CardContent}
      </Link>
    );
  }

  return <div className="h-full">{CardContent}</div>;
}
