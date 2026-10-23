import React, { useState } from 'react';
import { TeachingJournal, UserRole } from '../types';

interface AuditScreenProps {
  journals: TeachingJournal[];
  activeRole: UserRole;
  onVerifyJournal: (journalId: string) => void;
  onVerifyAll: () => void;
}

export const AuditScreen: React.FC<AuditScreenProps> = ({
  journals,
  activeRole,
  onVerifyJournal,
  onVerifyAll,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'verified' | 'unverified'>('all');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = journals.filter((j) => {
    if (filterStatus === 'verified') return j.verifiedByKepsek;
    if (filterStatus === 'unverified') return !j.verifiedByKepsek;
    return true;
  });

  const unverifiedCount = journals.filter((j) => !j.verifiedByKepsek).length;

  return (
    <div className="flex flex-col w-full space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#00513c] text-white px-4 py-3 rounded-lg shadow-xl text-[13px] font-medium flex items-center gap-2 border border-[#89d6b7]/30">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[12px] text-[#51625a] mb-1">
            <span className="hover:text-[#00513c] transition-colors cursor-pointer">Beranda</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#00513c] font-semibold">Pemeriksaan &amp; Audit Pembelajaran</span>
          </nav>
          <h1 className="text-[26px] lg:text-[30px] leading-[36px] text-[#181c1b] tracking-tight font-bold">
            Pemeriksaan &amp; Audit Pembelajaran
          </h1>
          <p className="text-[14px] text-[#3f4944] max-w-4xl mt-0.5">
            Verifikasi dan pengawasan jurnal mengajar harian pendidik oleh Kepala Sekolah sesuai regulasi standar mutu pembelajaran Kemendikbudristek.
          </p>
        </div>

        {activeRole === 'kepsek' && unverifiedCount > 0 && (
          <button
            onClick={() => {
              onVerifyAll();
              showToast('Semua jurnal mengajar hari ini telah disetujui & diverifikasi!');
            }}
            className="px-4 py-2.5 rounded-lg bg-[#00513c] hover:bg-[#176b52] text-white text-[13px] font-semibold flex items-center gap-2 shadow-xs transition-colors flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Verifikasi Semua ({unverifiedCount} Jurnal)</span>
          </button>
        )}
      </div>

      {/* Status Filter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setFilterStatus('all')}
          className={`p-4 rounded-xl text-left border transition-all ${
            filterStatus === 'all'
              ? 'bg-[#d4e7dd]/50 border-[#00513c] shadow-xs'
              : 'bg-white border-[#bec9c2]/40 hover:bg-[#f1f4f2]'
          }`}
        >
          <span className="text-[11px] text-[#51625a] uppercase font-semibold">Total Sesi Diperiksa</span>
          <div className="text-[26px] font-bold text-[#181c1b] mt-1 tabular-nums">{journals.length}</div>
        </button>

        <button
          onClick={() => setFilterStatus('unverified')}
          className={`p-4 rounded-xl text-left border transition-all ${
            filterStatus === 'unverified'
              ? 'bg-[#ffdad6]/60 border-[#ba1a1a] shadow-xs'
              : 'bg-white border-[#bec9c2]/40 hover:bg-[#f1f4f2]'
          }`}
        >
          <span className="text-[11px] text-[#74332e] uppercase font-semibold">Menunggu Verifikasi Kepsek</span>
          <div className="text-[26px] font-bold text-[#74332e] mt-1 tabular-nums">{unverifiedCount}</div>
        </button>

        <button
          onClick={() => setFilterStatus('verified')}
          className={`p-4 rounded-xl text-left border transition-all ${
            filterStatus === 'verified'
              ? 'bg-[#d4e7dd]/60 border-[#00513c] shadow-xs'
              : 'bg-white border-[#bec9c2]/40 hover:bg-[#f1f4f2]'
          }`}
        >
          <span className="text-[11px] text-[#00513c] uppercase font-semibold">Telah Tervalidasi</span>
          <div className="text-[26px] font-bold text-[#00513c] mt-1 tabular-nums">
            {journals.length - unverifiedCount}
          </div>
        </button>
      </div>

      {/* Journal Table / List */}
      <div className="bg-white rounded-xl shadow-xs border border-[#bec9c2]/40 overflow-hidden">
        <div className="p-4 bg-[#f1f4f2] border-b border-[#bec9c2]/40 flex items-center justify-between">
          <span className="text-[13px] font-bold text-[#181c1b]">
            Daftar Jurnal Pembelajaran Hari Ini
          </span>
          <span className="text-[12px] text-[#51625a]">
            {filtered.length} catatan ditampilkan
          </span>
        </div>

        <div className="divide-y divide-[#ebefed]">
          {filtered.map((j) => (
            <div key={j.id} className="p-5 hover:bg-[#f7faf8] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-[14px] text-[#181c1b]">{j.teacherName}</span>
                  <span className="text-[12px] text-[#51625a] font-mono">({j.classroom})</span>
                  {j.verifiedByKepsek ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#d4e7dd] text-[#00513c] text-[11px] font-semibold">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                      Tervalidasi Kepsek
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#74332e] text-[11px] font-semibold">
                      <span className="material-symbols-outlined text-[14px]">pending</span>
                      Menunggu Validasi
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-[#3f4944] font-medium">
                  {j.subject} • Pukul {j.startTime} - {j.endTime} WIB
                </p>
                <p className="text-[12px] text-[#181c1b] bg-[#f1f4f2] p-2 rounded-lg border border-[#bec9c2]/30">
                  <strong>Materi:</strong> {j.materialTaught}
                </p>
                {j.notes && (
                  <p className="text-[11px] text-[#51625a]">
                    <strong>Catatan:</strong> {j.notes}
                  </p>
                )}
              </div>

              <div className="flex flex-col md:items-end gap-2 flex-shrink-0">
                <div className="text-[12px] text-[#51625a]">
                  Kehadiran Siswa: <strong className="text-[#00513c]">{j.studentsPresent}</strong>/{j.studentsTotal}
                </div>
                {!j.verifiedByKepsek ? (
                  <button
                    onClick={() => {
                      onVerifyJournal(j.id);
                      showToast(`Jurnal ${j.teacherName} berhasil disetujui.`);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#00513c] hover:bg-[#176b52] text-white text-[12px] font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">check</span>
                    <span>Validasi Jurnal Ini</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-[#00513c] font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">done_all</span>
                    <span>{j.verifiedAt || 'Telah Diverifikasi'}</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
