"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  NavPage,
  SensorData,
  ActuatorState,
  SystemSettings,
  HistoryRecord,
  PestAnalysisResult,
  AiRecommendation,
} from "@/types/hydrai";

interface HydraiContextType {
  currentPage: NavPage;
  setCurrentPage: (page: NavPage) => void;
  sensorData: SensorData;
  historyRecords: HistoryRecord[];
  chartData: Array<{
    time: string;
    ph: number;
    ec: number;
    suhu: number;
    kelembapan: number;
    levelAir: number;
  }>;
  chartTimeRange: "1 Jam" | "6 Jam" | "1 Hari" | "7 Hari" | "1 Minggu";
  setChartTimeRange: (
    range: "1 Jam" | "6 Jam" | "1 Hari" | "7 Hari" | "1 Minggu",
  ) => void;
  actuators: ActuatorState;
  toggleActuator: (name: keyof ActuatorState) => void;
  pesticideModalOpen: boolean;
  setPesticideModalOpen: (open: boolean) => void;
  confirmPesticideSprayer: () => void;
  pestAnalysis: PestAnalysisResult;
  isScanningPest: boolean;
  runPestScan: (forcedScenario?: "sehat" | "kutu" | "penyakit") => void;
  selectedThumbnailIndex: number;
  setSelectedThumbnailIndex: (idx: number) => void;
  cameraAngles: Array<{ id: number; name: string; url: string }>;
  settings: SystemSettings;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  resetSettings: () => void;
  recommendations: AiRecommendation[];
  exportCsv: () => void;
  notification: string | null;
  setNotification: (msg: string | null) => void;
  currentTimeStr: string;
  currentDateStr: string;
  isEdgeAiActive: boolean;
  isLocalNetwork: boolean;
}

const defaultSettings: SystemSettings = {
  targetPhMin: 5.8,
  targetPhMax: 6.5,
  targetEcMin: 0.8,
  targetEcMax: 1.8,
  minWaterLevel: 10.0,
  sensorInterval: 5,
  simulationSpeed: "normal",
  esp32Ip: "192.168.4.1",
  esp32Port: 8080,
  offlineEdgeOnly: true,
};

const initialSensorData: SensorData = {
  ph: 5.8,
  ec: 1.2,
  waterTemp: 22.4,
  humidity: 58,
  waterLevel: 12.5,
  waterFlow: 2.1,
  lastUpdated: "14:32:05",
};

const initialChartData = [
  {
    time: "13:30",
    ph: 5.8,
    ec: 1.1,
    suhu: 22.0,
    kelembapan: 56,
    levelAir: 12.3,
  },
  {
    time: "13:45",
    ph: 5.9,
    ec: 1.2,
    suhu: 22.2,
    kelembapan: 57,
    levelAir: 12.4,
  },
  {
    time: "14:00",
    ph: 5.8,
    ec: 1.2,
    suhu: 22.4,
    kelembapan: 58,
    levelAir: 12.5,
  },
  {
    time: "14:15",
    ph: 5.8,
    ec: 1.2,
    suhu: 22.3,
    kelembapan: 59,
    levelAir: 12.5,
  },
  {
    time: "14:30",
    ph: 5.8,
    ec: 1.2,
    suhu: 22.4,
    kelembapan: 58,
    levelAir: 12.5,
  },
];

const initialHistory: HistoryRecord[] = [
  {
    id: "1",
    time: "14:00",
    date: "24 Sep 2025",
    ph: 5.8,
    ec: 1.2,
    waterTemp: 22.4,
    humidity: 58,
    waterLevel: 12.5,
    plantStatus: "Sehat",
  },
  {
    id: "2",
    time: "13:00",
    date: "24 Sep 2025",
    ph: 5.9,
    ec: 1.1,
    waterTemp: 22.1,
    humidity: 57,
    waterLevel: 12.4,
    plantStatus: "Sehat",
  },
  {
    id: "3",
    time: "12:00",
    date: "24 Sep 2025",
    ph: 5.9,
    ec: 1.2,
    waterTemp: 21.8,
    humidity: 56,
    waterLevel: 12.6,
    plantStatus: "Sehat",
  },
  {
    id: "4",
    time: "11:00",
    date: "24 Sep 2025",
    ph: 6.0,
    ec: 1.1,
    waterTemp: 21.6,
    humidity: 54,
    waterLevel: 12.7,
    plantStatus: "Sehat",
  },
  {
    id: "5",
    time: "10:00",
    date: "24 Sep 2025",
    ph: 5.9,
    ec: 1.2,
    waterTemp: 21.3,
    humidity: 53,
    waterLevel: 12.8,
    plantStatus: "Sehat",
  },
  {
    id: "6",
    time: "09:00",
    date: "24 Sep 2025",
    ph: 6.1,
    ec: 1.3,
    waterTemp: 21.0,
    humidity: 52,
    waterLevel: 12.9,
    plantStatus: "Sehat",
  },
  {
    id: "7",
    time: "08:00",
    date: "24 Sep 2025",
    ph: 6.0,
    ec: 1.2,
    waterTemp: 20.8,
    humidity: 55,
    waterLevel: 13.0,
    plantStatus: "Sehat",
  },
];

const HydraiContext = createContext<HydraiContextType | undefined>(undefined);

export const HydraiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState<NavPage>("beranda");
  const [sensorData, setSensorData] = useState<SensorData>(initialSensorData);
  const [chartData, setChartData] = useState(initialChartData);
  const [chartTimeRange, setChartTimeRange] = useState<
    "1 Jam" | "6 Jam" | "1 Hari" | "7 Hari" | "1 Minggu"
  >("1 Jam");
  const [historyRecords, setHistoryRecords] =
    useState<HistoryRecord[]>(initialHistory);
  const [notification, setNotification] = useState<string | null>(null);

  const [actuators, setActuators] = useState<ActuatorState>({
    waterPump: true,
    nutrientPump: true,
    phPump: false,
    pesticideSprayer: false,
    airCirculation: true,
  });

  const [pesticideModalOpen, setPesticideModalOpen] = useState(false);

  const [settings, setSettings] = useState<SystemSettings>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("hydrai_settings");
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultSettings;
  });

  // Camera angles
  const cameraAngles = useMemo(
    () => [
      { id: 0, name: "Kanal Utama NFT", url: "/images/hydroponic_lettuce.jpg" },
      { id: 1, name: "Makro Tajuk Daun", url: "/images/lettuce_closeup.jpg" },
      {
        id: 2,
        name: "Inspeksi Batang & Akar",
        url: "/images/hydroponic_lettuce.jpg",
      },
    ],
    [],
  );

  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(0);
  const [isScanningPest, setIsScanningPest] = useState(false);

  const [pestAnalysis, setPestAnalysis] = useState<PestAnalysisResult>({
    status: "sehat",
    label: "Tidak Terdeteksi",
    confidence: 98.4,
    details:
      "Tanaman dalam kondisi sehat. Tidak ditemukan tanda hama atau penyakit.",
    detectedAt: "14:30:12",
    imageUrl: "/images/hydroponic_lettuce.jpg",
  });

  // Time display
  const [currentTimeStr, setCurrentTimeStr] = useState("14:32");
  const [currentDateStr, setCurrentDateStr] = useState("24 Sep 2025");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTimeStr(`${hours}:${minutes}`);

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agt",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ];
      setCurrentDateStr(
        `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`,
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  // Sync settings with localStorage
  const updateSettings = useCallback((newSettings: Partial<SystemSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      if (typeof window !== "undefined") {
        localStorage.setItem("hydrai_settings", JSON.stringify(updated));
      }
      return updated;
    });
    setNotification("Pengaturan berhasil disimpan secara lokal.");
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
    if (typeof window !== "undefined") {
      localStorage.setItem("hydrai_settings", JSON.stringify(defaultSettings));
    }
    setNotification("Pengaturan dikembalikan ke setelan awal.");
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Actuator toggle
  const toggleActuator = useCallback(
    (name: keyof ActuatorState) => {
      if (name === "pesticideSprayer" && !actuators.pesticideSprayer) {
        setPesticideModalOpen(true);
        return;
      }
      setActuators((prev) => {
        const nextVal = !prev[name];
        const labels: Record<keyof ActuatorState, string> = {
          waterPump: "Pompa Air",
          nutrientPump: "Pompa Nutrisi",
          phPump: "Pompa Pengatur pH",
          pesticideSprayer: "Sprayer Hama",
          airCirculation: "Sirkulasi Udara",
        };
        setNotification(
          `${labels[name]} ${nextVal ? "diaktifkan" : "dimatikan"}`,
        );
        setTimeout(() => setNotification(null), 3000);
        return { ...prev, [name]: nextVal };
      });
    },
    [actuators.pesticideSprayer],
  );

  const confirmPesticideSprayer = useCallback(() => {
    setActuators((prev) => ({ ...prev, pesticideSprayer: true }));
    setPesticideModalOpen(false);
    setNotification(
      "Sprayer Hama diaktifkan untuk siklus sterilisasi tanaman.",
    );
    setTimeout(() => setNotification(null), 3500);
  }, []);

  // Pest AI Scan Simulation
  const runPestScan = useCallback(
    (forcedScenario?: "sehat" | "kutu" | "penyakit") => {
      setIsScanningPest(true);
      setNotification(
        "Edge AI sedang melakukan inferensi Computer Vision offline...",
      );

      setTimeout(() => {
        setIsScanningPest(false);
        const scenario = forcedScenario || "sehat";

        if (scenario === "sehat") {
          setPestAnalysis({
            status: "sehat",
            label: "Tidak Terdeteksi",
            confidence: 98.7,
            details:
              "Tanaman dalam kondisi sehat. Tidak ditemukan tanda hama atau penyakit.",
            detectedAt: new Date().toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            imageUrl: cameraAngles[selectedThumbnailIndex].url,
          });
          setNotification("Scan Selesai: Tanaman Sehat, Tidak Ada Hama.");
        } else if (scenario === "kutu") {
          setPestAnalysis({
            status: "hama",
            label: "Kutu Daun (Aphids)",
            confidence: 93.4,
            details:
              "Terdeteksi koloni kutu daun pada sisi bawah permukaan daun sektor B2.",
            detectedAt: new Date().toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            imageUrl: cameraAngles[selectedThumbnailIndex].url,
            box: { x: 38, y: 32, width: 28, height: 26, label: "Aphids 93.4%" },
          });
          setNotification("Peringatan: Kutu Daun terdeteksi oleh Edge AI!");
        } else {
          setPestAnalysis({
            status: "penyakit",
            label: "Bercak Daun Bakteri",
            confidence: 89.2,
            details:
              "Gejala nekrosis tepi daun terlihat mengindikasikan defisiensi nutrisi mikro / bakteri.",
            detectedAt: new Date().toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            imageUrl: cameraAngles[selectedThumbnailIndex].url,
            box: {
              x: 45,
              y: 40,
              width: 30,
              height: 30,
              label: "Bercak Daun 89.2%",
            },
          });
          setNotification("Peringatan: Gejala penyakit daun terdeteksi!");
        }
        setTimeout(() => setNotification(null), 4000);
      }, 1800);
    },
    [cameraAngles, selectedThumbnailIndex],
  );

  // Periodic sensor simulation
  useEffect(() => {
    if (settings.simulationSpeed === "paused") return;

    const intervalMs =
      settings.simulationSpeed === "fast"
        ? 2000
        : settings.sensorInterval * 1000;

    const interval = setInterval(() => {
      setSensorData((prev) => {
        // Natural micro-fluctuation around setpoints
        const phDelta = (Math.random() - 0.49) * 0.04;
        const ecDelta = (Math.random() - 0.49) * 0.02;
        const tempDelta = (Math.random() - 0.5) * 0.08;
        const humDelta = (Math.random() - 0.5) * 0.4;
        const lvlDelta = (Math.random() - 0.5) * 0.04;
        const flowDelta = (Math.random() - 0.5) * 0.05;

        const newPh = Number(
          Math.max(5.4, Math.min(6.8, prev.ph + phDelta)).toFixed(1),
        );
        const newEc = Number(
          Math.max(0.9, Math.min(1.8, prev.ec + ecDelta)).toFixed(1),
        );
        const newTemp = Number(
          Math.max(20.0, Math.min(25.0, prev.waterTemp + tempDelta)).toFixed(1),
        );
        const newHum = Math.round(
          Math.max(50, Math.min(75, prev.humidity + humDelta)),
        );
        const newLvl = Number(
          Math.max(10.0, Math.min(14.0, prev.waterLevel + lvlDelta)).toFixed(1),
        );
        const newFlow = Number(
          Math.max(1.8, Math.min(2.5, prev.waterFlow + flowDelta)).toFixed(1),
        );

        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

        // Also append or update chart data
        setChartData((prevChart) => {
          const updated = [...prevChart.slice(-7)];
          updated.push({
            time: timeStr,
            ph: newPh,
            ec: newEc,
            suhu: newTemp,
            kelembapan: newHum,
            levelAir: newLvl,
          });
          return updated;
        });

        return {
          ph: newPh,
          ec: newEc,
          waterTemp: newTemp,
          humidity: newHum,
          waterLevel: newLvl,
          waterFlow: newFlow,
          lastUpdated: `${timeStr}:${String(now.getSeconds()).padStart(2, "0")}`,
        };
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [settings.sensorInterval, settings.simulationSpeed]);

  // Derived recommendations based on logic
  const recommendations = useMemo(() => {
    const list: AiRecommendation[] = [];

    if (sensorData.ph < settings.targetPhMin) {
      list.push({
        id: "ph-low",
        type: "warning",
        title: "pH Air Terlalu Asam",
        description: `Nilai pH ${sensorData.ph} berada di bawah batas minimum (${settings.targetPhMin}). Tambahkan larutan pH Up untuk menjaga penyerapan nutrisi optimal.`,
        actionLabel: "Atur Sensor",
        targetNav: "sensor",
      });
    } else if (sensorData.ph > settings.targetPhMax) {
      list.push({
        id: "ph-high",
        type: "warning",
        title: "pH Air Terlalu Basa",
        description: `Nilai pH ${sensorData.ph} melebihi batas optimal (${settings.targetPhMax}). Sirkulasikan larutan pH Down secara bertahap.`,
        actionLabel: "Atur Sensor",
        targetNav: "sensor",
      });
    }

    if (sensorData.ec < settings.targetEcMin) {
      list.push({
        id: "ec-low",
        type: "warning",
        title: "Konsentrasi Nutrisi Rendah",
        description: `EC/TDS ${sensorData.ec} mS/cm rendah. Aktifkan Pompa Nutrisi AB Mix untuk meningkatkan kepekatan larutan.`,
        actionLabel: "Aktuator",
        targetNav: "beranda",
      });
    }

    if (sensorData.waterLevel < settings.minWaterLevel) {
      list.push({
        id: "lvl-low",
        type: "alert",
        title: "Volume Tandon Air Rendah",
        description: `Ketinggian air ${sensorData.waterLevel} cm mendekati batas aman reservoir. Pengisian air tandon disarankan segera.`,
        actionLabel: "Periksa Level",
        targetNav: "sensor",
      });
    }

    if (pestAnalysis.status === "hama") {
      list.push({
        id: "pest-detected",
        type: "alert",
        title: "Hama Terdeteksi oleh Kamera Edge AI",
        description: `${pestAnalysis.label} terdeteksi. Segera periksa daun fisik atau aktifkan Sprayer Hama ramah lingkungan.`,
        actionLabel: "Buka Deteksi Hama",
        targetNav: "hama",
      });
    }

    if (list.length === 0) {
      list.push({
        id: "optimal",
        type: "success",
        title: "Kondisi Tanaman Optimal",
        description: "Kondisi tanaman optimal. Lanjutkan penggunaan saat ini.",
        targetNav: "beranda",
      });
    }

    return list;
  }, [sensorData, settings, pestAnalysis]);

  // Export to CSV
  const exportCsv = useCallback(() => {
    const headers = [
      "Waktu",
      "Tanggal",
      "pH Air",
      "EC/TDS (mS/cm)",
      "Suhu Air (°C)",
      "Kelembapan (%)",
      "Level Air (cm)",
      "Status Tanaman",
    ];
    const rows = historyRecords.map((r) => [
      r.time,
      r.date,
      r.ph,
      r.ec,
      r.waterTemp,
      r.humidity,
      r.waterLevel,
      r.plantStatus,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((e) => e.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `HYDRAI_Riwayat_Sensor_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setNotification("Data riwayat sensor berhasil diekspor ke file CSV.");
    setTimeout(() => setNotification(null), 3500);
  }, [historyRecords]);

  return (
    <HydraiContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        sensorData,
        historyRecords,
        chartData,
        chartTimeRange,
        setChartTimeRange,
        actuators,
        toggleActuator,
        pesticideModalOpen,
        setPesticideModalOpen,
        confirmPesticideSprayer,
        pestAnalysis,
        isScanningPest,
        runPestScan,
        selectedThumbnailIndex,
        setSelectedThumbnailIndex,
        cameraAngles,
        settings,
        updateSettings,
        resetSettings,
        recommendations,
        exportCsv,
        notification,
        setNotification,
        currentTimeStr,
        currentDateStr,
        isEdgeAiActive: true,
        isLocalNetwork: true,
      }}
    >
      {children}
    </HydraiContext.Provider>
  );
};

export const useHydrai = () => {
  const context = useContext(HydraiContext);
  if (!context) {
    throw new Error("useHydrai must be used within a HydraiProvider");
  }
  return context;
};
