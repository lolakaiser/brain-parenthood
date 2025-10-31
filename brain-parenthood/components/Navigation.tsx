"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#2D3E50]/95 shadow-lg backdrop-blur-md border-b border-white/10">
      <div className="mx-auto" style={{ paddingLeft: '8vw', paddingRight: '8vw', maxWidth: '1600px' }}>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group focus:outline-none">
            <span className="font-bold text-2xl text-white">
              Brain Parenthood
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                pathname === "/"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              href="/module/1"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                pathname === "/module/1"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              Module 1
            </Link>
            <Link
              href="/modules"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                pathname === "/modules"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              All Modules
            </Link>
            <Link
              href="/dashboard"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                pathname === "/dashboard"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white transition-colors">
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
