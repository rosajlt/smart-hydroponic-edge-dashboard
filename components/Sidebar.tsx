"use client";

import React from "react";
import {
  Home,
  Thermometer,
  LineChart,
  Bug,
  History,
  Settings,
  Cpu,
  WifiOff,
  X,
} from "lucide-react";
import { useHydrai } from "@/context/HydraiContext";
import { NavPage } from "@/types/hydrai";

interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen,
  setMobileOpen,
}) => {
  const { currentPage, setCurrentPage } = useHydrai();

  const menuItems: Array<{
    id: NavPage;
    label: string;
    icon: React.ReactNode;
  }> = [
    { id: "beranda", label: "Beranda", icon: <Home className="w-5 h-5" /> },
    {
      id: "sensor",
      label: "Data Sensor",
      icon: <Thermometer className="w-5 h-5" />,
    },
    { id: "grafik", label: "Grafik", icon: <LineChart className="w-5 h-5" /> },
    { id: "hama", label: "Deteksi Hama", icon: <Bug className="w-5 h-5" /> },
    {
      id: "riwayat",
      label: "Riwayat Data",
      icon: <History className="w-5 h-5" />,
    },
    {
      id: "pengaturan",
      label: "Pengaturan",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const handleNavClick = (id: NavPage) => {
    setCurrentPage(id);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setMobileOpen && setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-linear-to-b from-[#0a2f23] via-[#092b20] to-[#051c15] text-white flex flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out border-r border-[#134937]/50 shadow-2xl lg:shadow-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Header & Logo */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center w-full">
              {/* Circular Logo Emblem */}
              <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-tr from-[#063322] via-[#0f4d35] to-[#1cb56c] p-1 shadow-lg ring-2 ring-[#22c55e]/40 shadow-emerald-950/60">
                <div className="w-full h-full rounded-full bg-[#07271c] flex flex-col items-center justify-center p-2 text-center overflow-hidden relative">
                  {/* Plant with Hydroponic Water ripples SVG */}
                  <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-14 h-14"
                  >
                    {/* Water Droplet on top left */}
                    <circle
                      cx="28"
                      cy="28"
                      r="6"
                      fill="#38bdf8"
                      fillOpacity="0.85"
                    />
                    {/* IoT signal waves on top right */}
                    <path
                      d="M68 22 C 73 25, 78 30, 80 36"
                      stroke="#4ade80"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M74 27 C 77 30, 80 34, 82 39"
                      stroke="#4ade80"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeOpacity="0.6"
                    />
                    {/* Hydroponic Plant Leaves */}
                    <path
                      d="M50 65 C 45 42, 30 38, 25 42 C 20 46, 26 58, 48 66"
                      fill="#22c55e"
                    />
                    <path
                      d="M50 65 C 55 40, 70 36, 76 40 C 82 45, 74 58, 52 66"
                      fill="#16a34a"
                    />
                    <path
                      d="M50 65 C 47 48, 44 26, 50 18 C 56 26, 53 48, 50 65 Z"
                      fill="#4ade80"
                    />
                    {/* NFT Channel & Water wave underneath */}
                    <rect
                      x="20"
                      y="68"
                      width="60"
                      height="9"
                      rx="4.5"
                      fill="#e2e8f0"
                    />
                    <rect
                      x="25"
                      y="70"
                      width="50"
                      height="5"
                      rx="2.5"
                      fill="#0284c7"
                    />
                    <circle cx="50" cy="72" r="2.5" fill="#38bdf8" />
                  </svg>
                </div>
              </div>

              {/* Logo Typography */}
              <h1 className="mt-3 text-2xl font-black tracking-widest text-white drop-shadow-md">
                HYDRA<span className="text-[#22c55e]">I</span>
              </h1>
              <p className="text-[11px] font-medium tracking-wide text-emerald-300/80 -mt-0.5">
                Hydroponic Edge AI
              </p>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileOpen && setMobileOpen(false)}
              className="lg:hidden p-1.5 text-gray-400 hover:text-white rounded-lg bg-emerald-950/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-1.5" aria-label="Menu Navigasi Utama">
            {menuItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group text-left ${
                    isActive
                      ? "bg-linear-to-r from-[#176245] to-[#1f7e59] text-white shadow-md shadow-emerald-950/50 border border-emerald-500/30 ring-1 ring-emerald-400/20"
                      : "text-emerald-100/75 hover:bg-emerald-900/40 hover:text-white"
                  }`}
                >
                  <span
                    className={`transition-transform duration-200 group-hover:scale-110 ${
                      isActive
                        ? "text-emerald-300"
                        : "text-emerald-300/70 group-hover:text-emerald-200"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse shadow-xs shadow-emerald-200" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Offline & Edge AI Status Card */}
        <div className="p-4 relative overflow-hidden">
          {/* Subtle leafy background watermark silhouette */}
          <svg
            className="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 text-emerald-300 pointer-events-none"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <path d="M10 80 Q 40 20 90 10 Q 80 60 20 90 Z" />
            <path d="M25 85 Q 50 35 95 30 Q 75 75 35 95 Z" opacity="0.6" />
          </svg>

          <div className="p-3.5 rounded-2xl bg-[#093525]/80 border border-emerald-700/30 backdrop-blur-xs shadow-inner">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div>
                <p className="text-xs font-semibold text-white tracking-wide flex items-center gap-1.5">
                  <WifiOff className="w-3.5 h-3.5 text-emerald-300" />
                  Mode Offline
                </p>
                <p className="text-[11px] text-emerald-300/80">Edge AI aktif</p>
                <p className="text-[10px] text-emerald-400/60 font-mono mt-0.5">
                  (Jaringan Lokal)
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
