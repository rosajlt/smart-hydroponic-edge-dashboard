"use client";

import React, { useState } from "react";
import {
  LineChart as LineChartIcon,
  TrendingUp,
  Download,
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Info,
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
  AreaChart,
  Area,
} from "recharts";
import { useHydrai } from "@/context/HydraiContext";

export const GraphView: React.FC = () => {
  const { chartData, chartTimeRange, setChartTimeRange, exportCsv } =
    useHydrai();

  const [selectedMetric, setSelectedMetric] = useState<
    "all" | "ph" | "ec" | "suhu" | "kelembapan" | "levelAir"
  >("all");

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <LineChartIcon className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Analisis Data Deret Waktu
            </span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Grafik Telemetri Real-time
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Visualisasi tren korelasi antara parameter air, nutrisi, dan iklim
            mikro greenhouse.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Time range selector */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-medium">
            {(["1 Jam", "6 Jam", "1 Hari", "7 Hari", "1 Minggu"] as const).map(
              (range) => (
                <button
                  key={range}
                  onClick={() => setChartTimeRange(range)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    chartTimeRange === range
                      ? "bg-emerald-800 text-white font-semibold shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {range}
                </button>
              ),
            )}
          </div>

          {/* Export CSV button */}
          <button
            onClick={exportCsv}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            Ekspor Data
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Mini-Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs">
          <p className="text-xs text-gray-400 font-medium">Rata-rata pH Air</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-blue-600 font-mono">
              5.85
            </span>
            <span className="text-xs text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +0.2%
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Stabilitas optimal</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs">
          <p className="text-xs text-gray-400 font-medium">
            Rata-rata EC Nutrisi
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-purple-600 font-mono">
              1.18
            </span>
            <span className="text-xs text-emerald-600 flex items-center">
              <ArrowDownRight className="w-3.5 h-3.5" /> -0.1%
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            Rentang AB Mix normal
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs">
          <p className="text-xs text-gray-400 font-medium">
            Fluktuasi Suhu Air
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-amber-600 font-mono">
              22.2 °C
            </span>
            <span className="text-xs text-gray-500">±0.4 °C</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Zona akar sejuk</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs">
          <p className="text-xs text-gray-400 font-medium">
            Ketinggian Reservoir
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-cyan-600 font-mono">
              12.5 cm
            </span>
            <span className="text-xs text-emerald-600">Aman</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Daya tampung 85%</p>
        </div>
      </div>

      {/* Main Interactive Chart */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-gray-700" />
            <h3 className="font-bold text-gray-900 text-sm sm:text-base">
              Grafik Multi-Parameter
            </h3>
          </div>

          {/* Metric Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-gray-50 p-1 rounded-xl text-xs">
            <button
              onClick={() => setSelectedMetric("all")}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                selectedMetric === "all"
                  ? "bg-white text-gray-900 font-bold shadow-2xs"
                  : "text-gray-500"
              }`}
            >
              Semua Sensor
            </button>
            <button
              onClick={() => setSelectedMetric("ph")}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                selectedMetric === "ph"
                  ? "bg-blue-600 text-white font-bold"
                  : "text-gray-500"
              }`}
            >
              pH Air
            </button>
            <button
              onClick={() => setSelectedMetric("ec")}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                selectedMetric === "ec"
                  ? "bg-purple-600 text-white font-bold"
                  : "text-gray-500"
              }`}
            >
              EC/TDS
            </button>
            <button
              onClick={() => setSelectedMetric("suhu")}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                selectedMetric === "suhu"
                  ? "bg-amber-600 text-white font-bold"
                  : "text-gray-500"
              }`}
            >
              Suhu
            </button>
            <button
              onClick={() => setSelectedMetric("kelembapan")}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                selectedMetric === "kelembapan"
                  ? "bg-emerald-600 text-white font-bold"
                  : "text-gray-500"
              }`}
            >
              Kelembapan
            </button>
          </div>
        </div>

        {/* Big Chart Display */}
        <div className="w-full h-80 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="time"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                domain={[0, 70]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  fontSize: "12px",
                }}
              />
              <Legend verticalAlign="top" height={36} />

              {(selectedMetric === "all" || selectedMetric === "ph") && (
                <Line
                  type="monotone"
                  dataKey="ph"
                  name="pH Air"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#2563eb" }}
                  activeDot={{ r: 6 }}
                />
              )}
              {(selectedMetric === "all" || selectedMetric === "ec") && (
                <Line
                  type="monotone"
                  dataKey="ec"
                  name="EC/TDS (mS/cm)"
                  stroke="#9333ea"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#9333ea" }}
                  activeDot={{ r: 6 }}
                />
              )}
              {(selectedMetric === "all" || selectedMetric === "suhu") && (
                <Line
                  type="monotone"
                  dataKey="suhu"
                  name="Suhu Air (°C)"
                  stroke="#ea580c"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#ea580c" }}
                  activeDot={{ r: 6 }}
                />
              )}
              {(selectedMetric === "all" ||
                selectedMetric === "kelembapan") && (
                <Line
                  type="monotone"
                  dataKey="kelembapan"
                  name="Kelembapan (%)"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#16a34a" }}
                  activeDot={{ r: 6 }}
                />
              )}
              {(selectedMetric === "all" || selectedMetric === "levelAir") && (
                <Line
                  type="monotone"
                  dataKey="levelAir"
                  name="Level Air (cm)"
                  stroke="#0891b2"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#0891b2" }}
                  activeDot={{ r: 6 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Insight note box */}
        <div className="mt-6 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
          <Info className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-900 leading-relaxed">
            <strong>Analisis Korelasi Edge AI:</strong> Pada rentang pengamatan
            terakhir, kestabilan pH di level 5.8 berbanding lurus dengan
            kelarutan hara fosfat dan kalsium. Tidak ditemukan lonjakan anomali
            mendadak yang mengindikasikan pengendapan garam pupuk.
          </div>
        </div>
      </div>
    </div>
  );
};
