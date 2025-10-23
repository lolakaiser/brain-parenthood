"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🧠</span>
            <span className="font-bold text-xl text-gray-900">Brain Parenthood</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`transition-colors ${
                pathname === "/"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Home
            </Link>
            <Link
              href="/module/1"
              className={`transition-colors ${
                pathname === "/module/1"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Module 1
            </Link>
            <Link
              href="/modules"
              className={`transition-colors ${
                pathname === "/modules"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              All Modules
            </Link>
            <Link
              href="/dashboard"
              className={`transition-colors ${
                pathname === "/dashboard"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-blue-600">
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
