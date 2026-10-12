export type NavPage =
  "beranda" | "sensor" | "grafik" | "hama" | "riwayat" | "pengaturan";

export interface SensorData {
  ph: number;
  ec: number;
  waterTemp: number;
  humidity: number;
  waterLevel: number;
  waterFlow: number;
  lastUpdated: string;
}

export type PlantStatusType = "Sehat" | "Perhatian" | "Kritis";
export type PestDetectionStatus =
  "Tidak Terdeteksi" | "Kutu Daun" | "Ulat Grayak" | "Jamur Daun";

export interface ActuatorState {
  waterPump: boolean;
  nutrientPump: boolean;
  phPump: boolean;
  pesticideSprayer: boolean;
  airCirculation: boolean;
}

export interface SystemSettings {
  targetPhMin: number;
  targetPhMax: number;
  targetEcMin: number;
  targetEcMax: number;
  minWaterLevel: number;
  sensorInterval: number; // in seconds
  simulationSpeed: "normal" | "fast" | "paused";
  esp32Ip: string;
  esp32Port: number;
  offlineEdgeOnly: boolean;
}

export interface HistoryRecord {
  id: string;
  time: string;
  date: string;
  ph: number;
  ec: number;
  waterTemp: number;
  humidity: number;
  waterLevel: number;
  plantStatus: string;
}

export interface PestAnalysisResult {
  status: "sehat" | "hama" | "penyakit" | "belum_analisis";
  label: string;
  confidence: number;
  details: string;
  detectedAt: string;
  imageUrl: string;
  box?: {
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
  };
}

export interface AiRecommendation {
  id: string;
  type: "info" | "warning" | "alert" | "success";
  title: string;
  description: string;
  actionLabel?: string;
  targetNav?: NavPage;
}
