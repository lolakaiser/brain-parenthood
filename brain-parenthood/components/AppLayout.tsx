"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./Sidebar";

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
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="ml-64 min-h-screen">
        <div className={`flex ${rightPanel ? 'pr-80' : ''}`}>
          {/* Main Content */}
          <main className="flex-1 p-8">
            {children}
          </main>

          {/* Right Panel (optional) */}
          {rightPanel && (
            <aside className="fixed right-0 top-0 h-screen w-80 bg-white/80 backdrop-blur-sm border-l border-white/50 p-6 overflow-y-auto">
              {rightPanel}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
