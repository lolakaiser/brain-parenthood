"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import CoffeeModal from "./CoffeeModal";

export default function TopNav() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [showCoffeeModal, setShowCoffeeModal] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Modules", href: "/modules" },
    { label: "About", href: "/about" },
  ];

  // Get user initials for avatar
  const getInitials = (name: string | undefined) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <>
      <header className="bg-white border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo [LOGO-BP] */}
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">BP</span>
              </div>
              <span className="font-semibold text-purple-600 text-lg">Brain Parenthood</span>
            </Link>

            {/* Navigation Tabs */}
            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium transition-all relative ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 -mb-[1.125rem]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side - User Info & Actions */}
            <div className="flex items-center gap-4">
              {/* Buy Me a Coffee Button */}
              <button
                onClick={() => setShowCoffeeModal(true)}
                className="px-3 py-1.5 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
              >
                Support Us
              </button>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name || "User"}</p>
                  <p className="text-xs text-gray-500">Client</p>
                </div>

                {/* Avatar with initials */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                  {getInitials(user?.name)}
                </div>

                {/* Logout */}
                <button
                  onClick={logout}
                  className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Coffee Modal */}
      <CoffeeModal
        isOpen={showCoffeeModal}
        onClose={() => setShowCoffeeModal(false)}
      />
    </>
  );
}
