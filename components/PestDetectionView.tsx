"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Camera,
  Bug,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Cpu,
  Layers,
  History,
  Info,
  ShieldCheck,
  Eye,
  Sliders,
  HardDrive,
} from "lucide-react";
import { useHydrai } from "@/context/HydraiContext";

export const PestDetectionView: React.FC = () => {
  const {
    pestAnalysis,
    isScanningPest,
    runPestScan,
    cameraAngles,
    selectedThumbnailIndex,
    setSelectedThumbnailIndex,
    setNotification,
    toggleActuator,
    actuators,
  } = useHydrai();

  const [espCamUrl, setEspCamUrl] = useState("http://192.168.4.1/capture");
  const [detectionLogs, setDetectionLogs] = useState([
    {
      id: "1",
      time: "14:30:12",
      status: "sehat",
      target: "Tanaman Sehat",
      confidence: 98.7,
      camera: "Kanal Utama NFT",
      action: "Optimal - Tanpa Pestisida",
    },
    {
      id: "2",
      time: "13:15:00",
      status: "sehat",
      target: "Tanaman Sehat",
      confidence: 97.9,
      camera: "Makro Tajuk Daun",
      action: "Optimal - Tanpa Pestisida",
    },
    {
      id: "3",
      time: "11:00:24",
      status: "sehat",
      target: "Tanaman Sehat",
      confidence: 99.1,
      camera: "Kanal Utama NFT",
      action: "Optimal - Tanpa Pestisida",
    },
  ]);

  const handleSimulate = (scenario: "sehat" | "kutu" | "penyakit") => {
    runPestScan(scenario);
    // Add to detection log
    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const labels = {
        sehat: {
          target: "Tanaman Sehat",
          conf: 98.7,
          act: "Optimal - Tanpa Tindakan",
        },
        kutu: {
          target: "Kutu Daun (Aphids)",
          conf: 93.4,
          act: "Saran: Bio-pestisida Neem Oil",
        },
        penyakit: {
          target: "Bercak Daun Bakteri",
          conf: 89.2,
          act: "Saran: Pemangkasan Daun",
        },
      };
      setDetectionLogs((prev) => [
        {
          id: String(Date.now()),
          time: timeStr,
          status: scenario,
          target: labels[scenario].target,
          confidence: labels[scenario].conf,
          camera: cameraAngles[selectedThumbnailIndex].name,
          action: labels[scenario].act,
        },
        ...prev.slice(0, 7),
      ]);
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-linear-to-r from-emerald-950 via-[#0b3826] to-[#0c402d] rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-300">
              Edge Computer Vision Lab (Offline)
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            Deteksi Hama & Penyakit Daun
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-xl">
            Model inferensi berjalan secara offline pada hardware lokal
            (ESP32-CAM / Mini PC Edge) tanpa koneksi internet.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => handleSimulate("sehat")}
            disabled={isScanningPest}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Uji Sehat
          </button>
          <button
            onClick={() => handleSimulate("kutu")}
            disabled={isScanningPest}
            className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Bug className="w-3.5 h-3.5" />
            Uji Kutu Daun
          </button>
          <button
            onClick={() => handleSimulate("penyakit")}
            disabled={isScanningPest}
            className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Uji Daun Rusak
          </button>
        </div>
      </div>

      {/* Main Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Camera Feed & Bounding Box Viewer */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-gray-800" />
                <h3 className="font-bold text-gray-900 text-base">
                  Frame Kamera Aktif:{" "}
                  {cameraAngles[selectedThumbnailIndex].name}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>30 FPS Offline</span>
              </div>
            </div>

            {/* Canvas Viewport */}
            <div className="relative rounded-2xl overflow-hidden aspect-16/10 bg-gray-950 border border-gray-200 shadow-inner group">
              <Image
                src={
                  cameraAngles[selectedThumbnailIndex]?.url ||
                  "/images/hydroponic_lettuce.jpg"
                }
                alt="Deteksi Hama Hidroponik AI"
                fill
                className={`object-cover transition-all duration-300 ${isScanningPest ? "filter brightness-75" : ""}`}
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />

              {/* Laser Scan line effect */}
              {isScanningPest && (
                <div className="absolute inset-0 bg-emerald-500/15 flex flex-col justify-between pointer-events-none">
                  <div className="w-full h-1 bg-emerald-400 shadow-lg shadow-emerald-400 animate-pulse" />
                  <div className="bg-black/80 py-2.5 px-4 text-center text-xs font-mono font-bold text-emerald-300">
                    [EDGE AI NPU INFERENCE RUNNING - INT8 QUANTIZED MODEL]
                  </div>
                </div>
              )}

              {/* Bounding box display */}
              {pestAnalysis.box && !isScanningPest && (
                <div
                  className="absolute border-2 border-red-500 bg-red-500/25 rounded-md shadow-lg pointer-events-none animate-pulse"
                  style={{
                    left: `${pestAnalysis.box.x}%`,
                    top: `${pestAnalysis.box.y}%`,
                    width: `${pestAnalysis.box.width}%`,
                    height: `${pestAnalysis.box.height}%`,
                  }}
                >
                  <span className="absolute -top-7 left-0 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
                    {pestAnalysis.box.label}
                  </span>
                </div>
              )}

              {/* Live Overlay Badge on Bottom Left */}
              <div className="absolute bottom-3 left-3 z-10">
                <span
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-md ${
                    pestAnalysis.status === "sehat"
                      ? "bg-emerald-600/90 text-white border border-emerald-400/40"
                      : "bg-red-600/90 text-white border border-red-400/40"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  {pestAnalysis.status === "sehat"
                    ? "Kondisi Sehat - Tanpa Hama"
                    : `${pestAnalysis.label} Terdeteksi`}
                </span>
              </div>
            </div>

            {/* Angle Selector Thumbnails */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">
                Pilih Sudut Kamera:
              </span>
              <div className="flex gap-2">
                {cameraAngles.map((cam, idx) => (
                  <button
                    key={cam.id}
                    onClick={() => setSelectedThumbnailIndex(idx)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                      selectedThumbnailIndex === idx
                        ? "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold shadow-2xs"
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span>{cam.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Trigger Scan Button */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              Analisis Terakhir: {pestAnalysis.detectedAt}
            </span>
            <button
              onClick={() => handleSimulate("sehat")}
              disabled={isScanningPest}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${isScanningPest ? "animate-spin" : ""}`}
              />
              {isScanningPest
                ? "Memindai Frame..."
                : "Jalankan Deteksi Ulang AI"}
            </button>
          </div>
        </div>

        {/* Right: AI Model Stats & Results */}
        <div className="lg:col-span-5 space-y-5">
          {/* AI Result Card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-gray-900 text-base">
                  Hasil Diagnosis Model
                </h3>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  pestAnalysis.status === "sehat"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {pestAnalysis.label}
              </span>
            </div>

            {/* Confidence Progress Bar */}
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between text-xs text-gray-600 font-medium">
                <span>Tingkat Keyakinan (Confidence)</span>
                <span className="font-mono font-bold text-gray-900">
                  {pestAnalysis.confidence}%
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    pestAnalysis.status === "sehat"
                      ? "bg-emerald-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${pestAnalysis.confidence}%` }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-xs text-gray-700 leading-relaxed mb-4">
              <strong>Detail Analisis:</strong> {pestAnalysis.details}
            </div>

            {/* Quick Action if pest detected */}
            {pestAnalysis.status !== "sehat" && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-2">
                <p className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Rekomendasi Tindakan Cepat:
                </p>
                <p>
                  Semprotkan bio-pestisida (Neem Oil 2ml/L) secara terarah untuk
                  mengisolasi penyebaran hama.
                </p>
                <button
                  onClick={() => toggleActuator("pesticideSprayer")}
                  className="w-full mt-2 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-colors shadow-2xs"
                >
                  {actuators.pesticideSprayer
                    ? "Matikan Sprayer Hama"
                    : "Buka Kontrol Sprayer Hama"}
                </button>
              </div>
            )}
          </div>

          {/* Model Edge Specs */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
            <h4 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-gray-600" />
              Spesifikasi Model Edge AI Offline
            </h4>

            <div className="space-y-2.5 text-xs text-gray-600">
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span>Arsitektur Model:</span>
                <span className="font-mono font-semibold text-gray-800">
                  MobileNetV4-YOLO-Lite
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span>Kuantisasi:</span>
                <span className="font-mono font-semibold text-gray-800">
                  INT8 Quantized (Edge NPU)
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span>Latensi Inferensi:</span>
                <span className="font-mono font-semibold text-emerald-600 font-bold">
                  42 ms
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span>Mode Jaringan:</span>
                <span className="font-semibold text-emerald-700">
                  100% Offline (Local Bus)
                </span>
              </div>
            </div>
          </div>

          {/* Hardware ESP32-CAM Endpoint Config */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
            <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-600" />
              Integrasi ESP32-CAM Fisik
            </h4>
            <p className="text-xs text-gray-500 mb-3">
              Masukkan alamat IP streaming ESP32-CAM lokal untuk menghubungkan
              modul optik fisik:
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={espCamUrl}
                onChange={(e) => setEspCamUrl(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono"
                placeholder="http://192.168.4.1/capture"
              />
              <button
                onClick={() => {
                  setNotification(
                    `Endpoint ESP32-CAM diperbarui ke: ${espCamUrl}`,
                  );
                  setTimeout(() => setNotification(null), 3000);
                }}
                className="px-3.5 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detection History Log */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-gray-800" />
          <h3 className="font-bold text-gray-900 text-base">
            Riwayat Hasil Deteksi Visual
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                <th className="pb-3">Waktu</th>
                <th className="pb-3">Kamera</th>
                <th className="pb-3">Hasil Diagnosis</th>
                <th className="pb-3 text-center">Confidence</th>
                <th className="pb-3 text-right">Tindakan Sistem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {detectionLogs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-3 font-medium text-gray-800">{log.time}</td>
                  <td className="py-3 text-gray-600">{log.camera}</td>
                  <td className="py-3 font-bold">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] ${
                        log.status === "sehat"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {log.target}
                    </span>
                  </td>
                  <td className="py-3 text-center font-mono font-bold text-gray-700">
                    {log.confidence}%
                  </td>
                  <td className="py-3 text-right text-gray-600 font-medium">
                    {log.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
