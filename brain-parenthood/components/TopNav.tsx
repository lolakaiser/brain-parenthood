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
      <header style={{
        backgroundColor: 'white',
        borderBottom: '3px solid #4F46E5',
        width: '100%'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px'
        }}>
          {/* Logo */}
          <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: '#4F46E5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>BP</span>
            </div>
            <span style={{ fontWeight: '600', color: '#4F46E5', fontSize: '18px' }}>Brain Parenthood</span>
          </Link>

          {/* Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: '24px 0',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: isActive ? '#4F46E5' : '#6B7280',
                    textDecoration: 'none',
                    position: 'relative'
                  }}
                >
                  {item.label}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      bottom: '-3px',
                      left: 0,
                      right: 0,
                      height: '3px',
                      backgroundColor: '#4F46E5'
                    }} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            {/* Coffee Button */}
            <button
              onClick={() => setShowCoffeeModal(true)}
              style={{
                fontSize: '14px',
                color: '#6B7280',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Buy Me a Coffee
            </button>

            {/* Divider */}
            <div style={{ width: '1px', height: '30px', backgroundColor: '#E5E7EB' }} />

            {/* User Info */}
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827', margin: 0 }}>{user?.name || "User"}</p>
              <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0 }}>Client</p>
            </div>

            {/* Avatar */}
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FB923C, #FBBF24)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '600',
              fontSize: '12px'
            }}>
              {getInitials(user?.name)}
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              style={{
                color: '#EF4444',
                fontSize: '14px',
                fontWeight: '500',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <CoffeeModal isOpen={showCoffeeModal} onClose={() => setShowCoffeeModal(false)} />
    </>
  );
}
