"use client";

import React, { useState } from "react";
import { HydraiProvider, useHydrai } from "@/context/HydraiContext";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { DashboardHome } from "@/components/DashboardHome";
import { SensorView } from "@/components/SensorView";
import { GraphView } from "@/components/GraphView";
import { PestDetectionView } from "@/components/PestDetectionView";
import { HistoryView } from "@/components/HistoryView";
import { SettingsView } from "@/components/SettingsView";
import { ModalPesticideConfirm } from "@/components/ModalPesticideConfirm";
import { CheckCircle2, AlertCircle } from "lucide-react";

const MainContent: React.FC = () => {
  const { currentPage, notification } = useHydrai();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8faf9] flex text-gray-800 antialiased font-sans selection:bg-emerald-500 selection:text-white">
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Header */}
        <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentPage === "beranda" && <DashboardHome />}
          {currentPage === "sensor" && <SensorView />}
          {currentPage === "grafik" && <GraphView />}
          {currentPage === "hama" && <PestDetectionView />}
          {currentPage === "riwayat" && <HistoryView />}
          {currentPage === "pengaturan" && <SettingsView />}
        </main>

        {/* Modal Safety Confirmation */}
        <ModalPesticideConfirm />

        {/* Floating Toast Notification */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="bg-gray-900/95 backdrop-blur-md text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{notification}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <HydraiProvider>
      <MainContent />
    </HydraiProvider>
  );
}
