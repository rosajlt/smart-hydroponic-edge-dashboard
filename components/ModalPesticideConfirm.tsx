"use client";

import React from "react";
import { AlertTriangle, ShieldCheck, X } from "lucide-react";
import { useHydrai } from "@/context/HydraiContext";

export const ModalPesticideConfirm: React.FC = () => {
  const { pesticideModalOpen, setPesticideModalOpen, confirmPesticideSprayer } =
    useHydrai();

  if (!pesticideModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 transform transition-all">
        {/* Close Button */}
        <button
          onClick={() => setPesticideModalOpen(false)}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon */}
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mb-4">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 tracking-tight">
          Konfirmasi Pengaktifan Sprayer Pestisida
        </h3>

        <div className="mt-3 text-sm text-gray-600 space-y-2">
          <p>
            Anda akan mengaktifkan{" "}
            <strong>Sprayer Pestisida / Bio-fungisida</strong> pada jalur pipa
            hidroponik.
          </p>
          <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-800 leading-relaxed">
            <strong>Catatan Keamanan Simulasi:</strong> Pada lingkungan produksi
            nyata, pastikan tidak ada personil berada di dekat nozzle semprotan
            dan larutan sesuai dosis bio-pestisida terdaftar.
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setPesticideModalOpen(false)}
            className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={confirmPesticideSprayer}
            className="px-5 py-2.5 rounded-xl bg-linear-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-sm font-semibold shadow-md shadow-red-500/20 flex items-center gap-2 transition-all active:scale-95"
          >
            <ShieldCheck className="w-4 h-4" />
            Ya, Aktifkan Sprayer
          </button>
        </div>
      </div>
    </div>
  );
};
