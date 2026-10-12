"use client";

import React from "react";
import { WifiOff, Cpu, User, Menu } from "lucide-react";
import { useHydrai } from "@/context/HydraiContext";

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const { currentDateStr, currentTimeStr, isEdgeAiActive } = useHydrai();

  return (
    <header className="w-full pt-6 pb-4 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 bg-white/70 backdrop-blur-md sticky top-0 z-30">
      {/* Left: Greeting */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          aria-label="Buka Menu"
          className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            Halo!{" "}
            <span className="inline-block animate-bounce text-2xl sm:text-3xl">
              👋
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            Berikut adalah kondisi hidroponik Anda saat ini.
          </p>
        </div>
      </div>

      {/* Right: Offline Status, Time, Edge AI, Profile */}
      <div className="flex items-center flex-wrap gap-2.5 sm:gap-4 text-xs sm:text-sm">
        {/* Offline & Local Network Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200/80 text-gray-700 shadow-2xs">
          <div className="p-1.5 rounded-lg bg-gray-200/60 text-gray-700">
            <WifiOff className="w-4 h-4" />
          </div>
          <div className="text-left leading-tight">
            <span className="block font-semibold text-gray-800 text-[11px] sm:text-xs">
              Mode Offline
            </span>
            <span className="block text-[10px] sm:text-[11px] text-gray-500 font-medium">
              Jaringan Lokal
            </span>
          </div>
        </div>

        {/* Date & Time */}
        <div className="px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200/80 text-right leading-tight shadow-2xs">
          <span className="block text-[10px] sm:text-[11px] text-gray-500 font-medium">
            {currentDateStr}
          </span>
          <span className="block font-bold text-gray-800 text-xs sm:text-sm font-mono">
            {currentTimeStr}
          </span>
        </div>

        {/* Edge AI Badge */}
        <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-800 font-semibold text-xs shadow-2xs">
          <div className="relative flex items-center justify-center">
            <Cpu className="w-4 h-4 text-emerald-600" />
            {isEdgeAiActive && (
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            )}
          </div>
          <span>Edge AI Aktif</span>
        </div>

        {/* User Profile Avatar */}
        <div
          role="button"
          tabIndex={0}
          title="Profil Pengguna HYDRAI"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 flex items-center justify-center text-gray-600 transition-colors shadow-2xs cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
        >
          <User className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
};
