import React, { useState, useEffect } from 'react';

interface DapodikSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncComplete: () => void;
}

export const DapodikSyncModal: React.FC<DapodikSyncModalProps> = ({
  isOpen,
  onClose,
  onSyncComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProgress(15);
      setStep(1);
      setIsCompleted(false);

      const timer1 = setTimeout(() => {
        setProgress(45);
        setStep(2);
      }, 700);

      const timer2 = setTimeout(() => {
        setProgress(85);
        setStep(3);
      }, 1500);

      const timer3 = setTimeout(() => {
        setProgress(100);
        setStep(4);
        setIsCompleted(true);
        onSyncComplete();
      }, 2200);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden border border-[#bec9c2]/50">
        {/* Header */}
        <div className="p-5 bg-[#f1f4f2] flex items-start justify-between border-b border-[#bec9c2]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white text-[#00513c] flex items-center justify-center shadow-xs border border-[#bec9c2]/40">
              <span className="material-symbols-outlined text-[22px]">cloud_sync</span>
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="text-[18px] font-bold text-[#181c1b] leading-tight">
                Sinkronisasi Dapodik Kemendikbudristek
              </h3>
              <span className="text-[12px] text-[#51625a]">
                Web Services Gateway V.2024.c • NPSN 20101582
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#51625a] hover:text-[#181c1b] hover:bg-[#e0e3e1] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="p-3 rounded-lg bg-[#ebefed] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#00513c]">school</span>
              <span className="text-[13px] font-semibold text-[#181c1b]">SMAN 1 Jakarta</span>
            </div>
            <span className="text-[11px] font-mono bg-[#d4e7dd] text-[#0f1f19] px-2 py-0.5 rounded font-semibold">
              Status Terhubung
            </span>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[12px]">
              <span className="font-semibold text-[#181c1b]">
                {step === 1 && '1/4 Melakukan TLS Handshake ke Pusat Data Dapodik...'}
                {step === 2 && '2/4 Memvalidasi 48 NUPTK & Penugasan Rombel...'}
                {step === 3 && '3/4 Menyelaraskan Status Kepegawaian BKN...'}
                {step === 4 && '4/4 Sinkronisasi Database SIPAGU Selesai!'}
              </span>
              <span className="font-mono text-[#00513c] font-bold">{progress}%</span>
            </div>
            <div className="w-full h-2.5 bg-[#ebefed] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00513c] transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Verification Checklist */}
          <div className="space-y-2 pt-2 border-t border-[#bec9c2]/30 text-[12px]">
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined text-[18px] ${progress >= 25 ? 'text-[#00513c]' : 'text-[#bec9c2]'}`}>
                {progress >= 25 ? 'check_circle' : 'radio_button_unchecked'}
              </span>
              <span className={progress >= 25 ? 'text-[#181c1b] font-medium' : 'text-[#51625a]'}>
                Otentikasi Token Web Service Sekolah Penggerak
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined text-[18px] ${progress >= 50 ? 'text-[#00513c]' : 'text-[#bec9c2]'}`}>
                {progress >= 50 ? 'check_circle' : 'radio_button_unchecked'}
              </span>
              <span className={progress >= 50 ? 'text-[#181c1b] font-medium' : 'text-[#51625a]'}>
                48 Kredensial Guru Pengajar Terverifikasi Sesuai SK Pembagian Tugas
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined text-[18px] ${progress >= 85 ? 'text-[#00513c]' : 'text-[#bec9c2]'}`}>
                {progress >= 85 ? 'check_circle' : 'radio_button_unchecked'}
              </span>
              <span className={progress >= 85 ? 'text-[#181c1b] font-medium' : 'text-[#51625a]'}>
                Pembaruan Rekam Cuti &amp; Tugas Belajar Resmi (2 Akun Ditangguhkan)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined text-[18px] ${progress >= 100 ? 'text-[#00513c]' : 'text-[#bec9c2]'}`}>
                {progress >= 100 ? 'check_circle' : 'radio_button_unchecked'}
              </span>
              <span className={progress >= 100 ? 'text-[#00513c] font-bold' : 'text-[#51625a]'}>
                Data Master Akun SIPAGU Berhasil Disinkronkan
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f1f4f2] flex items-center justify-end gap-3 border-t border-[#bec9c2]/40">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#00513c] hover:bg-[#176b52] text-white text-[13px] font-semibold transition-colors shadow-xs"
          >
            {isCompleted ? 'Selesai & Tutup' : 'Batal'}
          </button>
        </div>
      </div>
    </div>
  );
};
