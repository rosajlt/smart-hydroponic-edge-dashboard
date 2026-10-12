# HYDRAI — Hydroponic Edge AI Dashboard

Sistem hidroponik otonom cerdas berbasis **Edge AI** untuk optimasi air, nutrisi, dan pengendalian hama secara offline tanpa ketergantungan pada backend berbayar atau koneksi internet cloud.

![HYDRAI Dashboard](/public/images/hydroponic_lettuce.jpg)

---

## 🌟 Fitur Utama

1. **Dashboard Beranda (Sesuai Referensi UI/UX)**
   - **Kartu Status Utama**: Kondisi Tanaman, Kualitas Air (pH), Nutrisi (EC/TDS), dan Deteksi Hama.
   - **6 Parameter Sensor Real-time**: pH Air, EC/TDS, Suhu Air, Kelembapan Udara, Ketinggian Air Reservoir, dan Debit Aliran Air.
   - **Panel Deteksi Hama (AI)**: Pratinjau foto kamera hidroponik aktual, indikator status model Edge AI, hasil diagnosis otomatis, dan pemilih sudut kamera.
   - **Kontrol Aktuator & Pompa**: Status Pompa Air, Pompa Nutrisi, Pompa pH, Sirkulasi Udara, serta **Sprayer Hama** dengan modal konfirmasi keselamatan.
   - **Grafik Interaktif Real-time**: Visualisasi garis multi-parameter dengan pilihan rentang waktu (1 Jam, 6 Jam, 1 Hari, 7 Hari, 1 Minggu).
   - **Tabel Riwayat Cepat**: Ringkasan log sensor terbaru beserta navigasi langsung ke halaman riwayat lengkap.
   - **Akses Cepat (Quick Access)**: Tombol pintas ke seluruh fitur utama.

2. **Panel Data Sensor & Kalibrasi**
   - Rincian spesifikasi sensor fisik (probe Modbus RS485, DS18B20, SHT31, Ultrasonik JSN-SR04T, Hall Effect Flowmeter).
   - Indikator koneksi gateway ESP32, latensi subnet lokal (~11ms), dan tombol simulasi kalibrasi probe mandiri.

3. **Grafik Telemetri & Analisis Deret Waktu**
   - Filter parameter individual (pH, EC, Suhu, Kelembapan, Level Air).
   - Kartu statistik (Rata-rata, Fluktuasi, Deviasi Standar).
   - Rekomendasi korelasi parameter berbasis aturan agrikultur cerdas.

4. **Laboratorium Deteksi Hama Edge AI**
   - Simulasi model Computer Vision (_MobileNetV4 INT8 Quantized / YOLO-Lite_).
   - Pengujian skenario: _Tanaman Sehat_, _Infestasi Kutu Daun (Aphids)_ dengan bounding box visual dan tingkat keyakinan (confidence score), serta _Gejala Penyakit Daun_.
   - Konfigurasi endpoint kamera lokal (ESP32-CAM stream URL).

5. **Riwayat Data & Ekspor CSV**
   - Penyimpanan data lokal browser (_HTML5 LocalStorage / Cache_).
   - Pencarian cerdas, filter status tanaman, dan pengurutan multi-kolom (_Sortable_).
   - Tombol **Ekspor ke CSV** yang langsung mengunduh file spreadsheet `.csv` ke komputer pengguna.

6. **Pengaturan & Parameter Target**
   - Penyesuaian rentang target pH (Min - Max).
   - Penyesuaian rentang target nutrisi EC/TDS (Min - Max).
   - Batas minimum ketinggian reservoir air.
   - Pilihan interval pembacaan sensor (2s, 5s, 10s, 30s).
   - Pilihan kecepatan simulasi data (Normal, Cepat, Jeda/Statis).
   - Konfigurasi IP Gateway ESP32 dan Port lokal.

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Library UI**: React 19, TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Visualisasi Grafik**: [Recharts](https://recharts.org/)
- **Ikon**: [Lucide React](https://lucide.dev/)
- **Penyimpanan Lokal**: HTML5 LocalStorage (100% Offline, tanpa cloud berbayar)

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

### Prasyarat

- [Node.js](https://nodejs.org/) (versi 18 ke atas)
- [pnpm](https://pnpm.io/) (atau npm/yarn)

### 1. Masuk ke Direktori Proyek

```bash
cd hydrai
```

### 2. Instal Dependensi

```bash
pnpm install
```

### 3. Jalankan Server Pengembangan (Dev Server)

```bash
pnpm run dev
```

Buka peramban (browser) Anda di:
👉 **[http://localhost:3000](http://localhost:3000)**

### 4. Build untuk Lingkungan Produksi (Opsional)

```bash
pnpm run build
pnpm run start
```

---

## 🔌 Rencana Integrasi Hardware Fisik (ESP32 & ESP32-CAM)

Dashboard HYDRAI dirancang modular sehingga antarmuka UI terpisah dari lapisan komunikasi hardware:

- **Sensor Bus**: Node ESP32 membaca sensor analog/I2C/RS485 dan mengirimkan payload JSON via WebSocket lokal (`ws://192.168.4.1:8080`) atau REST API lokal (`http://192.168.4.1/api/telemetry`).
- **Aktuator**: Perintah aktivasi pompa dan relai dikirimkan melalui HTTP POST lokal terenkripsi ke mikrokontroler.
- **Kamera Visual**: Modul ESP32-CAM menyediakan snapshot MJPEG/JPEG pada endpoint `http://192.168.4.1/capture` yang langsung dianalisis oleh modul inferensi Edge AI.
