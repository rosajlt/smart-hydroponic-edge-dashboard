"use client";

import React, { useState } from "react";
import {
  Activity,
  Droplets,
  FlaskConical,
  Thermometer,
  Wind,
  Waves,
  RefreshCw,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Radio,
} from "lucide-react";
import { useHydrai } from "@/context/HydraiContext";

export const SensorView: React.FC = () => {
  const { sensorData, settings, setNotification } = useHydrai();
  const [isCalibrating, setIsCalibrating] = useState<string | null>(null);

  const handleCalibrate = (sensorName: string) => {
    setIsCalibrating(sensorName);
    setNotification(
      `Memulai kalibrasi probe ${sensorName} pada buffer lokal...`,
    );

    setTimeout(() => {
      setIsCalibrating(null);
      setNotification(
        `Kalibrasi ${sensorName} selesai! Offset tersimpan di memori EEPROM offline ESP32.`,
      );
    }, 2000);
  };

  const sensors = [
    {
      id: "ph",
      name: "pH Air (Derajat Keasaman)",
      value: sensorData.ph.toFixed(1),
      unit: "",
      minTarget: settings.targetPhMin,
      maxTarget: settings.targetPhMax,
      currentMin: 5.6,
      currentMax: 6.2,
      isNormal:
        sensorData.ph >= settings.targetPhMin &&
        sensorData.ph <= settings.targetPhMax,
      icon: <Droplets className="w-5 h-5 text-blue-600" />,
      color: "blue",
      probeModel: "E-201-C BNC Glass Electrode (Modbus RS485)",
      description:
        "Menjaga ketersediaan ion hara makro (N, P, K) agar terserap optimal oleh akar selada.",
    },
    {
      id: "ec",
      name: "EC/TDS (Konduktivitas Nutrisi)",
      value: sensorData.ec.toFixed(1),
      unit: "mS/cm",
      minTarget: settings.targetEcMin,
      maxTarget: settings.targetEcMax,
      currentMin: 1.0,
      currentMax: 1.4,
      isNormal:
        sensorData.ec >= settings.targetEcMin &&
        sensorData.ec <= settings.targetEcMax,
      icon: <FlaskConical className="w-5 h-5 text-purple-600" />,
      color: "purple",
      probeModel: "DFRobot Waterproof EC Probe K=1.0",
      description:
        "Mengukur kepekatan larutan garam pupuk hidroponik AB Mix dalam tandon.",
    },
    {
      id: "temp",
      name: "Suhu Larutan Nutrisi",
      value: sensorData.waterTemp.toFixed(1),
      unit: "°C",
      minTarget: 20.0,
      maxTarget: 25.0,
      currentMin: 21.0,
      currentMax: 23.5,
      isNormal: sensorData.waterTemp >= 19.0 && sensorData.waterTemp <= 25.0,
      icon: <Thermometer className="w-5 h-5 text-emerald-600" />,
      color: "emerald",
      probeModel: "DS18B20 Waterproof Stainless Steel (Dallas 1-Wire)",
      description:
        "Suhu air sejuk memastikan dissolved oxygen (oksigen terlarut) tetap tinggi mencegah busuk akar.",
    },
    {
      id: "humidity",
      name: "Kelembapan Udara Greenhouse",
      value: String(sensorData.humidity),
      unit: "%",
      minTarget: 50,
      maxTarget: 70,
      currentMin: 52,
      currentMax: 65,
      isNormal: sensorData.humidity >= 50 && sensorData.humidity <= 75,
      icon: <Wind className="w-5 h-5 text-sky-600" />,
      color: "sky",
      probeModel: "SHT31 I2C High Precision Industrial Sensor",
      description:
        "Transpirasi daun optimal terjadi pada kelembapan relatif 55-65%.",
    },
    {
      id: "level",
      name: "Ketinggian Air Reservoir",
      value: sensorData.waterLevel.toFixed(1),
      unit: "cm",
      minTarget: settings.minWaterLevel,
      maxTarget: 18.0,
      currentMin: 11.5,
      currentMax: 14.0,
      isNormal: sensorData.waterLevel >= settings.minWaterLevel,
      icon: <Waves className="w-5 h-5 text-teal-600" />,
      color: "teal",
      probeModel: "JSN-SR04T Waterproof Ultrasonic Distance Sensor",
      description:
        "Memantau volume stok air tandon utama agar pompa submersible tidak kekeringan.",
    },
    {
      id: "flow",
      name: "Debit Aliran Sirkulasi",
      value: sensorData.waterFlow.toFixed(1),
      unit: "L/menit",
      minTarget: 1.5,
      maxTarget: 3.0,
      currentMin: 1.9,
      currentMax: 2.3,
      isNormal: sensorData.waterFlow >= 1.5,
      icon: <Activity className="w-5 h-5 text-emerald-600" />,
      color: "emerald",
      probeModel: "YF-S201 Hall Effect Water Flow Pulse Counter",
      description:
        "Memastikan aliran nutrisi di gutter pipa NFT mengalir konstan ke seluruh meja tanam.",
    },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Banner / Hardware Link Header */}
      <div className="bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Radio className="w-4 h-4 text-emerald-300 animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-300">
              ESP32 Telemetri Sensor Gateway
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            Panel Pengawasan Sensor Fisik
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-xl">
            Seluruh data sensor diproses secara mandiri pada mikrokontroler
            ESP32 lokal tanpa ketergantungan cloud.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs">
            <p className="text-emerald-300 font-medium text-[11px]">
              Subnet Node
            </p>
            <p className="font-mono font-bold">
              {settings.esp32Ip}:{settings.esp32Port}
            </p>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-emerald-500/30 backdrop-blur-md border border-emerald-400/40 text-xs flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-white">Latensi: 11ms</span>
          </div>
        </div>
      </div>

      {/* Grid of 6 Detailed Sensor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sensors.map((sensor) => (
          <div
            key={sensor.id}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                    {sensor.icon}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-800 leading-snug">
                      {sensor.name}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-mono">
                      {sensor.probeModel}
                    </p>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                    sensor.isNormal
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {sensor.isNormal ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <AlertCircle className="w-3 h-3" />
                  )}
                  {sensor.isNormal ? "Normal" : "Perhatian"}
                </span>
              </div>

              {/* Big Value Display */}
              <div className="my-4 flex items-baseline gap-2">
                <span className="text-3xl font-black text-gray-900 font-mono tracking-tight">
                  {sensor.value}
                </span>
                {sensor.unit && (
                  <span className="text-sm font-semibold text-gray-500">
                    {sensor.unit}
                  </span>
                )}
              </div>

              {/* Range Gauge Bar */}
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-[11px] text-gray-500">
                  <span>
                    Target Min: {sensor.minTarget} {sensor.unit}
                  </span>
                  <span>
                    Target Max: {sensor.maxTarget} {sensor.unit}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden relative">
                  <div
                    className="h-full bg-linear-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, Math.max(15, (Number(sensor.value) / sensor.maxTarget) * 75))}%`,
                    }}
                  />
                </div>
              </div>

              {/* Sensor Description */}
              <p className="text-xs text-gray-600 leading-relaxed bg-gray-50/60 p-2.5 rounded-xl border border-gray-100">
                {sensor.description}
              </p>
            </div>

            {/* Calibration & Status Footer */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-400">
                Pembaruan: {sensorData.lastUpdated}
              </span>
              <button
                type="button"
                onClick={() => handleCalibrate(sensor.name)}
                disabled={isCalibrating === sensor.name}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-3 h-3 ${isCalibrating === sensor.name ? "animate-spin" : ""}`}
                />
                {isCalibrating === sensor.name
                  ? "Mengkalibrasi..."
                  : "Kalibrasi Probe"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
