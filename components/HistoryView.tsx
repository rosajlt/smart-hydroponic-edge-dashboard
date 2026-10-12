"use client";

import React, { useState, useMemo } from "react";
import {
  History,
  Search,
  Download,
  Calendar,
  ArrowUpDown,
  Filter,
  CheckCircle2,
  Trash2,
  FileSpreadsheet,
} from "lucide-react";
import { useHydrai } from "@/context/HydraiContext";
import { HistoryRecord } from "@/types/hydrai";

export const HistoryView: React.FC = () => {
  const { historyRecords, exportCsv, setNotification } = useHydrai();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof HistoryRecord>("time");
  const [sortAsc, setSortAsc] = useState(false);

  // Filter & Sort
  const filteredRecords = useMemo(() => {
    return historyRecords
      .filter((record) => {
        const matchesSearch =
          record.time.includes(searchQuery) ||
          record.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.plantStatus
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          String(record.ph).includes(searchQuery) ||
          String(record.ec).includes(searchQuery);

        const matchesStatus =
          selectedStatus === "all" ||
          record.plantStatus.toLowerCase() === selectedStatus.toLowerCase();

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (typeof valA === "string") {
          return sortAsc
            ? (valA as string).localeCompare(valB as string)
            : (valB as string).localeCompare(valA as string);
        }
        return sortAsc
          ? (valA as number) - (valB as number)
          : (valB as number) - (valA as number);
      });
  }, [historyRecords, searchQuery, selectedStatus, sortField, sortAsc]);

  const handleSort = (field: keyof HistoryRecord) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <History className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Penyimpanan Offline Lokal
            </span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Riwayat Log Sensor
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Daftar catatan kondisi nutrisi dan iklim yang tersimpan secara lokal
            di browser dan memori perangkat.
          </p>
        </div>

        <button
          onClick={exportCsv}
          className="px-5 py-2.5 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-500/20 transition-all active:scale-95 shrink-0"
        >
          <Download className="w-4 h-4" />
          Ekspor Semua ke CSV
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari waktu, pH, status tanaman..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-gray-700"
          >
            <option value="all">Semua Status</option>
            <option value="sehat">Status: Sehat</option>
            <option value="perhatian">Status: Perhatian</option>
          </select>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/70 border-b border-gray-100 text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th
                  onClick={() => handleSort("time")}
                  className="py-3.5 px-4 cursor-pointer hover:text-emerald-700 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Waktu</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("ph")}
                  className="py-3.5 px-4 text-center cursor-pointer hover:text-emerald-700 transition-colors"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>pH Air</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("ec")}
                  className="py-3.5 px-4 text-center cursor-pointer hover:text-emerald-700 transition-colors"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>EC/TDS</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("waterTemp")}
                  className="py-3.5 px-4 text-center cursor-pointer hover:text-emerald-700 transition-colors"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>Suhu Air</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("humidity")}
                  className="py-3.5 px-4 text-center cursor-pointer hover:text-emerald-700 transition-colors"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>Kelembapan</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("waterLevel")}
                  className="py-3.5 px-4 text-center cursor-pointer hover:text-emerald-700 transition-colors"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>Ketinggian Air</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-right">Status Tanaman</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-emerald-50/20 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-semibold text-gray-900">
                      <div>{row.time}</div>
                      <span className="text-[10px] text-gray-400 font-normal">
                        {row.date}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-blue-600">
                      {row.ph.toFixed(1)}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-purple-600">
                      {row.ec.toFixed(1)}{" "}
                      <span className="text-[10px] font-normal text-gray-500">
                        mS
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-gray-700">
                      {row.waterTemp.toFixed(1)} °C
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-gray-700">
                      {row.humidity} %
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-gray-700">
                      {row.waterLevel.toFixed(1)} cm
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        {row.plantStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 text-center text-gray-400 text-xs"
                  >
                    Tidak ada data yang sesuai dengan pencarian Anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>
            Menampilkan {filteredRecords.length} dari {historyRecords.length}{" "}
            total baris
          </span>
          <span className="font-mono text-[11px]">
            Format: Offline SQLite / LocalStorage Cache
          </span>
        </div>
      </div>
    </div>
  );
};
