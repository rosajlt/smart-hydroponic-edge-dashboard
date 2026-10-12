"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Leaf,
  Droplets,
  FlaskConical,
  Bug,
  ChevronRight,
  Activity,
  Camera,
  Settings as SettingsIcon,
  Lightbulb,
  LineChart as LineChartIcon,
  Clock,
  Zap,
  CheckCircle,
  Thermometer,
  Waves,
  Wind,
  Fan,
  Sparkles,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { useHydrai } from "@/context/HydraiContext";

export const DashboardHome: React.FC = () => {
  const {
    sensorData,
    historyRecords,
    chartData,
    chartTimeRange,
    setChartTimeRange,
    actuators,
    toggleActuator,
    pestAnalysis,
    isScanningPest,
    runPestScan,
    cameraAngles,
    selectedThumbnailIndex,
    setSelectedThumbnailIndex,
    recommendations,
    setCurrentPage,
  } = useHydrai();

  // Metrics toggles for line chart
  const [activeMetrics, setActiveMetrics] = useState({
    ph: true,
    ec: true,
    suhu: true,
    kelembapan: true,
    levelAir: true,
  });

  const toggleMetric = (metric: keyof typeof activeMetrics) => {
    setActiveMetrics((prev) => ({ ...prev, [metric]: !prev[metric] }));
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. TOP 4 STATUS SUMMARY CARDS */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        aria-label="Ringkasan Status Hidroponik"
      >
        {/* Card 1: Kondisi Tanaman */}
        <div
          onClick={() => setCurrentPage("hama")}
          className="group cursor-pointer bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all duration-200 flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6 fill-emerald-500/20" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400">
                Kondisi Tanaman
              </p>
              <h2 className="text-xl font-bold text-emerald-600 tracking-tight">
                {pestAnalysis.status === "sehat" ? "Sehat" : "Perlu Cek"}
              </h2>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {pestAnalysis.status === "sehat"
                  ? "Tanaman tumbuh dengan baik"
                  : pestAnalysis.label}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
        </div>

        {/* Card 2: Kualitas Air (pH) */}
        <div
          onClick={() => setCurrentPage("sensor")}
          className="group cursor-pointer bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs hover:shadow-md hover:border-blue-200 transition-all duration-200 flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Droplets className="w-6 h-6 fill-blue-500/20" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400">
                Kualitas Air (pH)
              </p>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                {sensorData.ph.toFixed(1)}
              </h2>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Normal (6.0 - 6.5)
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
        </div>

        {/* Card 3: Nutrisi (EC/TDS) */}
        <div
          onClick={() => setCurrentPage("sensor")}
          className="group cursor-pointer bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs hover:shadow-md hover:border-purple-200 transition-all duration-200 flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FlaskConical className="w-6 h-6 fill-purple-500/20" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400">
                Nutrisi (EC/TDS)
              </p>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                {sensorData.ec.toFixed(1)}{" "}
                <span className="text-xs font-normal text-gray-500">mS/cm</span>
              </h2>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Normal (0.8 - 1.8)
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all" />
        </div>

        {/* Card 4: Hama */}
        <div
          onClick={() => setCurrentPage("hama")}
          className="group cursor-pointer bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs hover:shadow-md hover:border-rose-200 transition-all duration-200 flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${
                pestAnalysis.status === "sehat"
                  ? "bg-rose-50 text-rose-600"
                  : "bg-red-100 text-red-600 animate-pulse"
              }`}
            >
              <Bug className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400">Hama</p>
              <h2
                className={`text-xl font-bold tracking-tight ${
                  pestAnalysis.status === "sehat"
                    ? "text-gray-900"
                    : "text-red-600"
                }`}
              >
                {pestAnalysis.label}
              </h2>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {pestAnalysis.status === "sehat"
                  ? "AI tidak menemukan hama"
                  : "Perlu tindakan segera"}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-rose-500 group-hover:translate-x-0.5 transition-all" />
        </div>
      </section>

      {/* 2. MIDDLE SECTION GRID: Data Sensor (left) + Deteksi Hama (center) + Status & Rekomendasi (right) */}
      <section
        className="grid grid-cols-1 lg:grid-cols-12 gap-5"
        aria-label="Panel Pengawasan Inti"
      >
        {/* Left Column: Data Sensor (6 items) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-gray-700" />
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                  Data Sensor
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Realtime
              </div>
            </div>

            {/* 6 Sensor Cards in 2 columns */}
            <div className="grid grid-cols-2 gap-3">
              {/* 1. pH Air */}
              <div className="p-3 rounded-xl bg-gray-50/70 hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <Droplets className="w-4 h-4" />
                  <span className="text-[11px] font-medium text-gray-500">
                    pH Air
                  </span>
                </div>
                <div className="text-xl font-bold text-gray-900 font-mono">
                  {sensorData.ph.toFixed(1)}
                </div>
                <div className="mt-1">
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50/80 px-2 py-0.5 rounded-md">
                    Normal
                  </span>
                </div>
              </div>

              {/* 2. EC/TDS */}
              <div className="p-3 rounded-xl bg-gray-50/70 hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="flex items-center gap-2 text-purple-600 mb-1">
                  <FlaskConical className="w-4 h-4" />
                  <span className="text-[11px] font-medium text-gray-500">
                    EC/TDS
                  </span>
                </div>
                <div className="text-xl font-bold text-gray-900 font-mono">
                  {sensorData.ec.toFixed(1)}{" "}
                  <span className="text-[11px] font-normal text-gray-500">
                    mS/cm
                  </span>
                </div>
                <div className="mt-1">
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50/80 px-2 py-0.5 rounded-md">
                    Normal
                  </span>
                </div>
              </div>

              {/* 3. Suhu Air */}
              <div className="p-3 rounded-xl bg-gray-50/70 hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                  <Thermometer className="w-4 h-4" />
                  <span className="text-[11px] font-medium text-gray-500">
                    Suhu Air
                  </span>
                </div>
                <div className="text-xl font-bold text-gray-900 font-mono">
                  {sensorData.waterTemp.toFixed(1)}{" "}
                  <span className="text-[11px] font-normal text-gray-500">
                    °C
                  </span>
                </div>
                <div className="mt-1">
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50/80 px-2 py-0.5 rounded-md">
                    Normal
                  </span>
                </div>
              </div>

              {/* 4. Kelembapan Udara */}
              <div className="p-3 rounded-xl bg-gray-50/70 hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="flex items-center gap-2 text-sky-600 mb-1">
                  <Wind className="w-4 h-4" />
                  <span className="text-[11px] font-medium text-gray-500">
                    Kelembapan Udara
                  </span>
                </div>
                <div className="text-xl font-bold text-gray-900 font-mono">
                  {sensorData.humidity}{" "}
                  <span className="text-[11px] font-normal text-gray-500">
                    %
                  </span>
                </div>
                <div className="mt-1">
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50/80 px-2 py-0.5 rounded-md">
                    Normal
                  </span>
                </div>
              </div>

              {/* 5. Ketinggian Air */}
              <div className="p-3 rounded-xl bg-gray-50/70 hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="flex items-center gap-2 text-teal-600 mb-1">
                  <Waves className="w-4 h-4" />
                  <span className="text-[11px] font-medium text-gray-500">
                    Ketinggian Air
                  </span>
                </div>
                <div className="text-xl font-bold text-gray-900 font-mono">
                  {sensorData.waterLevel.toFixed(1)}{" "}
                  <span className="text-[11px] font-normal text-gray-500">
                    cm
                  </span>
                </div>
                <div className="mt-1">
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50/80 px-2 py-0.5 rounded-md">
                    Normal
                  </span>
                </div>
              </div>

              {/* 6. Debit Air */}
              <div className="p-3 rounded-xl bg-gray-50/70 hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                  <Activity className="w-4 h-4" />
                  <span className="text-[11px] font-medium text-gray-500">
                    Debit Air
                  </span>
                </div>
                <div className="text-xl font-bold text-gray-900 font-mono">
                  {sensorData.waterFlow.toFixed(1)}{" "}
                  <span className="text-[11px] font-normal text-gray-500">
                    L/menit
                  </span>
                </div>
                <div className="mt-1">
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50/80 px-2 py-0.5 rounded-md">
                    Normal
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
            <span>ESP32 Telemetri: Aktif</span>
            <span>Update: {sensorData.lastUpdated}</span>
          </div>
        </div>

        {/* Center Column: Deteksi Hama (AI) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-gray-700" />
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                  Deteksi Hama (AI)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => runPestScan()}
                  disabled={isScanningPest}
                  className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors flex items-center gap-1 border border-emerald-200"
                >
                  <RefreshCw
                    className={`w-3 h-3 ${isScanningPest ? "animate-spin" : ""}`}
                  />
                  AI Aktif
                </button>
              </div>
            </div>

            {/* Main Camera Live Feed Image */}
            <div className="relative rounded-xl overflow-hidden aspect-16/9 bg-gray-900 shadow-inner group">
              <Image
                src={
                  cameraAngles[selectedThumbnailIndex]?.url ||
                  "/images/hydroponic_lettuce.jpg"
                }
                alt="Monitoring Hidroponik Kamera AI"
                fill
                className={`object-cover transition-transform duration-500 ${isScanningPest ? "scale-105 filter blur-xs" : ""}`}
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />

              {/* AI Scan line animation when scanning */}
              {isScanningPest && (
                <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none flex flex-col justify-between">
                  <div className="w-full h-1 bg-emerald-400 shadow-md shadow-emerald-400 animate-pulse" />
                  <div className="text-center py-2 bg-black/60 text-emerald-300 text-xs font-mono font-bold">
                    [MEMPROSES MODEL INT8 EDGE AI...]
                  </div>
                </div>
              )}

              {/* Bounding box if detected */}
              {pestAnalysis.box && !isScanningPest && (
                <div
                  className="absolute border-2 border-red-500 bg-red-500/20 rounded-md pointer-events-none animate-pulse"
                  style={{
                    left: `${pestAnalysis.box.x}%`,
                    top: `${pestAnalysis.box.y}%`,
                    width: `${pestAnalysis.box.width}%`,
                    height: `${pestAnalysis.box.height}%`,
                  }}
                >
                  <span className="absolute -top-6 left-0 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
                    {pestAnalysis.box.label}
                  </span>
                </div>
              )}

              {/* Bottom pill tag matching screenshot */}
              <div className="absolute bottom-2.5 left-2.5 z-10">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-md backdrop-blur-md ${
                    pestAnalysis.status === "sehat"
                      ? "bg-emerald-600/90 text-white border border-emerald-400/40"
                      : "bg-red-600/90 text-white border border-red-400/40"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  {pestAnalysis.status === "sehat"
                    ? "Tidak ada hama terdeteksi"
                    : `${pestAnalysis.label} Terdeteksi`}
                </span>
              </div>
            </div>

            {/* Thumbnails + Analysis Result */}
            <div className="mt-3.5 flex items-center gap-3">
              {/* 3 Thumbnails */}
              <div className="flex gap-1.5 shrink-0">
                {cameraAngles.map((cam, idx) => (
                  <button
                    key={cam.id}
                    onClick={() => setSelectedThumbnailIndex(idx)}
                    title={cam.name}
                    className={`relative w-11 h-11 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedThumbnailIndex === idx
                        ? "border-emerald-500 ring-2 ring-emerald-400/30"
                        : "border-gray-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={cam.url}
                      alt={cam.name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </button>
                ))}
              </div>

              {/* Hasil Analisis Card */}
              <div className="flex-1 p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2.5">
                <div className="p-1 rounded-full bg-emerald-100 text-emerald-600 shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="text-left leading-tight">
                  <h4 className="text-xs font-bold text-gray-900">
                    Hasil Analisis
                  </h4>
                  <p className="text-[11px] text-gray-600 mt-0.5">
                    {pestAnalysis.details}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Status Pompa & Aktuator + Rekomendasi AI */}
        <div className="lg:col-span-3 space-y-4 flex flex-col justify-between">
          {/* Status Pompa & Aktuator Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <SettingsIcon className="w-4 h-4 text-gray-700" />
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                Status Pompa & Aktuator
              </h3>
            </div>

            <div className="space-y-3">
              {/* 1. Pompa Air */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-800">
                    Pompa Air
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleActuator("waterPump")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shadow-2xs ${
                    actuators.waterPump
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border border-emerald-200"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  {actuators.waterPump ? "Aktif" : "Tidak Aktif"}
                </button>
              </div>

              {/* 2. Pompa Nutrisi */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-800">
                    Pompa Nutrisi
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleActuator("nutrientPump")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shadow-2xs ${
                    actuators.nutrientPump
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border border-emerald-200"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  {actuators.nutrientPump ? "Aktif" : "Tidak Aktif"}
                </button>
              </div>

              {/* 3. Sprayer Hama */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-800">
                    Sprayer Hama
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleActuator("pesticideSprayer")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shadow-2xs ${
                    actuators.pesticideSprayer
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border border-emerald-200"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  {actuators.pesticideSprayer ? "Aktif" : "Tidak Aktif"}
                </button>
              </div>

              {/* 4. Sirkulasi Udara */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                    <Fan className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-800">
                    Sirkulasi Udara
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleActuator("airCirculation")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shadow-2xs ${
                    actuators.airCirculation
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border border-emerald-200"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  {actuators.airCirculation ? "Aktif" : "Tidak Aktif"}
                </button>
              </div>
            </div>
          </div>

          {/* Rekomendasi AI Card */}
          <div
            onClick={() => setCurrentPage("hama")}
            className="group cursor-pointer bg-white rounded-2xl p-4 sm:p-5 border border-emerald-100 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-emerald-600" />
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm">
                  Rekomendasi AI
                </h4>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              {recommendations[0]?.description ||
                "Kondisi tanaman optimal. Lanjutkan penggunaan saat ini."}
            </p>
          </div>
        </div>
      </section>

      {/* 3. ROW BELOW: Grafik Real-time (wide left) + Riwayat Data Mini (right) */}
      <section
        className="grid grid-cols-1 lg:grid-cols-12 gap-5"
        aria-label="Visualisasi Grafik dan Riwayat"
      >
        {/* Left: Grafik Real-time */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <LineChartIcon className="w-4 h-4 text-gray-700" />
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                Grafik Real-time
              </h3>
            </div>

            {/* Time range tabs */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-medium">
              {(
                ["1 Jam", "6 Jam", "1 Hari", "7 Hari", "1 Minggu"] as const
              ).map((range) => (
                <button
                  key={range}
                  onClick={() => setChartTimeRange(range)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    chartTimeRange === range
                      ? "bg-emerald-900 text-white font-semibold shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Metric Selector Toggles */}
          <div className="flex flex-wrap items-center gap-3 mb-3 text-xs">
            <button
              onClick={() => toggleMetric("ph")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all ${
                activeMetrics.ph
                  ? "bg-blue-50 border-blue-300 text-blue-700"
                  : "bg-gray-50 border-gray-200 text-gray-400"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#2563eb]" />
              pH
            </button>
            <button
              onClick={() => toggleMetric("ec")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all ${
                activeMetrics.ec
                  ? "bg-purple-50 border-purple-300 text-purple-700"
                  : "bg-gray-50 border-gray-200 text-gray-400"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#9333ea]" />
              EC/TDS
            </button>
            <button
              onClick={() => toggleMetric("suhu")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all ${
                activeMetrics.suhu
                  ? "bg-amber-50 border-amber-300 text-amber-700"
                  : "bg-gray-50 border-gray-200 text-gray-400"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
              Suhu
            </button>
            <button
              onClick={() => toggleMetric("kelembapan")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all ${
                activeMetrics.kelembapan
                  ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                  : "bg-gray-50 border-gray-200 text-gray-400"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
              Kelembapan
            </button>
            <button
              onClick={() => toggleMetric("levelAir")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all ${
                activeMetrics.levelAir
                  ? "bg-cyan-50 border-cyan-300 text-cyan-700"
                  : "bg-gray-50 border-gray-200 text-gray-400"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#0891b2]" />
              Level Air
            </button>
          </div>

          {/* Line Chart */}
          <div className="w-full h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="time"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  domain={[0, 70]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    fontSize: "12px",
                  }}
                />
                {activeMetrics.ph && (
                  <Line
                    type="monotone"
                    dataKey="ph"
                    name="pH Air"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "#2563eb" }}
                  />
                )}
                {activeMetrics.ec && (
                  <Line
                    type="monotone"
                    dataKey="ec"
                    name="EC/TDS"
                    stroke="#9333ea"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "#9333ea" }}
                  />
                )}
                {activeMetrics.suhu && (
                  <Line
                    type="monotone"
                    dataKey="suhu"
                    name="Suhu (°C)"
                    stroke="#ea580c"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "#ea580c" }}
                  />
                )}
                {activeMetrics.kelembapan && (
                  <Line
                    type="monotone"
                    dataKey="kelembapan"
                    name="Kelembapan (%)"
                    stroke="#16a34a"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "#16a34a" }}
                  />
                )}
                {activeMetrics.levelAir && (
                  <Line
                    type="monotone"
                    dataKey="levelAir"
                    name="Level Air (cm)"
                    stroke="#0891b2"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "#0891b2" }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Riwayat Data Mini Table */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-700" />
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                  Riwayat Data
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCurrentPage("riwayat")}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
              >
                Lihat Semua
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-medium">
                    <th className="pb-2">Waktu</th>
                    <th className="pb-2 text-center">pH</th>
                    <th className="pb-2 text-center">EC/TDS</th>
                    <th className="pb-2 text-center">Suhu</th>
                    <th className="pb-2 text-right">Kelembapan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {historyRecords.slice(0, 5).map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-2.5 font-medium text-gray-800">
                        {row.time}
                      </td>
                      <td className="py-2.5 text-center font-mono text-gray-600">
                        {row.ph.toFixed(1)}
                      </td>
                      <td className="py-2.5 text-center font-mono text-gray-600">
                        {row.ec.toFixed(1)}
                      </td>
                      <td className="py-2.5 text-center font-mono text-gray-600">
                        {row.waterTemp.toFixed(1)}
                      </td>
                      <td className="py-2.5 text-right font-mono text-gray-600">
                        {row.humidity}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 text-center">
            <button
              onClick={() => setCurrentPage("riwayat")}
              className="w-full py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-xs font-semibold text-gray-700 transition-colors"
            >
              Buka Riwayat Lengkap & Ekspor CSV
            </button>
          </div>
        </div>
      </section>

      {/* 4. BOTTOM ROW: AKSES CEPAT (4 Cards) */}
      <section
        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs"
        aria-label="Akses Cepat Fitur"
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-gray-800" />
          <h3 className="font-bold text-gray-900 text-sm sm:text-base">
            Akses Cepat
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* 1. Data Sensor */}
          <div
            onClick={() => setCurrentPage("sensor")}
            className="group cursor-pointer p-3.5 rounded-xl bg-gray-50/70 hover:bg-blue-50/40 border border-gray-100 hover:border-blue-200 transition-all flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-xs shadow-blue-500/20">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                Data Sensor
              </h4>
              <p className="text-[11px] text-gray-500">
                Lihat semua data sensor
              </p>
            </div>
          </div>

          {/* 2. Grafik */}
          <div
            onClick={() => setCurrentPage("grafik")}
            className="group cursor-pointer p-3.5 rounded-xl bg-gray-50/70 hover:bg-purple-50/40 border border-gray-100 hover:border-purple-200 transition-all flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-xs shadow-purple-500/20">
              <LineChartIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                Grafik
              </h4>
              <p className="text-[11px] text-gray-500">Pantau tren data</p>
            </div>
          </div>

          {/* 3. Deteksi Hama */}
          <div
            onClick={() => setCurrentPage("hama")}
            className="group cursor-pointer p-3.5 rounded-xl bg-gray-50/70 hover:bg-rose-50/40 border border-gray-100 hover:border-rose-200 transition-all flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-xs shadow-rose-500/20">
              <Bug className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 group-hover:text-rose-700 transition-colors">
                Deteksi Hama
              </h4>
              <p className="text-[11px] text-gray-500">Cek hasil analisis AI</p>
            </div>
          </div>

          {/* 4. Riwayat Data */}
          <div
            onClick={() => setCurrentPage("riwayat")}
            className="group cursor-pointer p-3.5 rounded-xl bg-gray-50/70 hover:bg-emerald-50/40 border border-gray-100 hover:border-emerald-200 transition-all flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-xs shadow-emerald-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                Riwayat Data
              </h4>
              <p className="text-[11px] text-gray-500">Lihat data historis</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
