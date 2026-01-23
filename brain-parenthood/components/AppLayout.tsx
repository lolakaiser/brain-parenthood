"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TopNav from "./TopNav";

interface AppLayoutProps {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
}

export default function AppLayout({ children, rightPanel }: AppLayoutProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f4f8] via-[#f0f9fc] to-[#e8f6f8]">
      {/* Top Navigation */}
      <TopNav />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className={`flex gap-8 ${rightPanel ? '' : ''}`}>
          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>

          {/* Right Panel (optional) */}
          {rightPanel && (
            <aside className="w-80 flex-shrink-0 hidden lg:block">
              {rightPanel}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
