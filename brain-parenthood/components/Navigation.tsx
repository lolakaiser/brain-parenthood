"use client";

// Navigation is now handled by TopNav inside AppLayout
// This component is kept for backwards compatibility but renders nothing
// The actual navigation is in TopNav.tsx

export default function Navigation() {
  // Navigation is handled by TopNav inside AppLayout for authenticated routes
  // Login/Signup pages don't show navigation
  return null;
}
