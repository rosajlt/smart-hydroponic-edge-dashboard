"use client";

import React, { useState } from "react";
import {
  Settings,
  Save,
  RotateCcw,
  Sliders,
  Radio,
  Clock,
  Shield,
  Wifi,
  HardDrive,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { useHydrai } from "@/context/HydraiContext";
import { SystemSettings } from "@/types/hydrai";

export const SettingsView: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useHydrai();

  const [form, setForm] = useState<SystemSettings>(settings);

  const handleChange = (field: keyof SystemSettings, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
  };

  const handleReset = () => {
    resetSettings();
    setForm(settings);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <Settings className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Konfigurasi Sistem Lokal
            </span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Pengaturan & Parameter Target
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Konfigurasi ambang batas nutrisi hidroponik, interval pembacaan, dan
            jaringan ESP32 lokal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Setel Ulang Default
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-500/20 transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            Simpan Pengaturan
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Card 1: Target Sensor Thresholds */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
            <Sliders className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-gray-900 text-base">
              Ambang Batas Sensor Nutrisi & Air
            </h3>
          </div>

          {/* pH Range */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Rentang Target pH Air (Ideal: 5.8 - 6.5)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-gray-400">
                  Batas Minimum (pH Min)
                </span>
                <input
                  type="number"
                  step="0.1"
                  min="4.0"
                  max="8.0"
                  value={form.targetPhMin}
                  onChange={(e) =>
                    handleChange("targetPhMin", parseFloat(e.target.value))
                  }
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
                />
              </div>
              <div>
                <span className="text-[11px] text-gray-400">
                  Batas Maksimum (pH Max)
                </span>
                <input
                  type="number"
                  step="0.1"
                  min="5.0"
                  max="9.0"
                  value={form.targetPhMax}
                  onChange={(e) =>
                    handleChange("targetPhMax", parseFloat(e.target.value))
                  }
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
                />
              </div>
            </div>
          </div>

          {/* EC Range */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Rentang Target Nutrisi EC/TDS (Ideal: 0.8 - 1.8 mS/cm)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-gray-400">
                  EC Minimum (mS/cm)
                </span>
                <input
                  type="number"
                  step="0.1"
                  min="0.4"
                  max="3.0"
                  value={form.targetEcMin}
                  onChange={(e) =>
                    handleChange("targetEcMin", parseFloat(e.target.value))
                  }
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
                />
              </div>
              <div>
                <span className="text-[11px] text-gray-400">
                  EC Maksimum (mS/cm)
                </span>
                <input
                  type="number"
                  step="0.1"
                  min="1.0"
                  max="4.0"
                  value={form.targetEcMax}
                  onChange={(e) =>
                    handleChange("targetEcMax", parseFloat(e.target.value))
                  }
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
                />
              </div>
            </div>
          </div>

          {/* Water Level Min */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Batas Minimum Ketinggian Air Tandon (cm)
            </label>
            <p className="text-[11px] text-gray-400 mb-1.5">
              Peringatan akan muncul jika level air reservoir berada di bawah
              nilai ini.
            </p>
            <input
              type="number"
              step="0.5"
              min="5.0"
              max="25.0"
              value={form.minWaterLevel}
              onChange={(e) =>
                handleChange("minWaterLevel", parseFloat(e.target.value))
              }
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
            />
          </div>
        </div>

        {/* Card 2: Simulation & Hardware Gateway */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
            <Radio className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-gray-900 text-base">
              Mode Simulasi & Perangkat Lokal ESP32
            </h3>
          </div>

          {/* Sensor Reading Interval */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Interval Pembacaan Sensor (Detik)
            </label>
            <p className="text-[11px] text-gray-400 mb-1.5">
              Frekuensi pembaruan telemetri lokal dari bus sensor.
            </p>
            <select
              value={form.sensorInterval}
              onChange={(e) =>
                handleChange("sensorInterval", parseInt(e.target.value))
              }
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="2">2 Detik (Super Cepat)</option>
              <option value="5">5 Detik (Normal Real-time)</option>
              <option value="10">10 Detik (Hemat Daya)</option>
              <option value="30">30 Detik</option>
            </select>
          </div>

          {/* Simulation Speed Mode */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Mode Simulasi Data
            </label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              <button
                type="button"
                onClick={() => handleChange("simulationSpeed", "normal")}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                  form.simulationSpeed === "normal"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                    : "bg-gray-50 border-gray-200 text-gray-600"
                }`}
              >
                Normal
              </button>
              <button
                type="button"
                onClick={() => handleChange("simulationSpeed", "fast")}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                  form.simulationSpeed === "fast"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                    : "bg-gray-50 border-gray-200 text-gray-600"
                }`}
              >
                Cepat
              </button>
              <button
                type="button"
                onClick={() => handleChange("simulationSpeed", "paused")}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                  form.simulationSpeed === "paused"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                    : "bg-gray-50 border-gray-200 text-gray-600"
                }`}
              >
                Statis / Jeda
              </button>
            </div>
          </div>

          {/* ESP32 Hardware IP */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              IP Address ESP32 Gateway (Jaringan Lokal)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <input
                  type="text"
                  value={form.esp32Ip}
                  onChange={(e) => handleChange("esp32Ip", e.target.value)}
                  placeholder="192.168.4.1"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={form.esp32Port}
                  onChange={(e) =>
                    handleChange("esp32Port", parseInt(e.target.value))
                  }
                  placeholder="8080"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Offline Edge Status */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Keamanan Penyimpanan Lokal</p>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                Semua preferensi disimpan di HTML5 LocalStorage browser Anda.
                Tidak ada data yang dikirim ke server cloud berbayar.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
