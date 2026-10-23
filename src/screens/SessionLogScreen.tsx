import React, { useState } from 'react';
import { TeachingJournal } from '../types';

interface SessionLogScreenProps {
  journals: TeachingJournal[];
  onOpenQR: () => void;
}

export const SessionLogScreen: React.FC<SessionLogScreenProps> = ({
  journals,
  onOpenQR,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  const filtered = journals.filter((j) => {
    const matchesSearch =
      j.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.classroom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.materialTaught.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || j.classroom.includes(selectedClass);
    return matchesSearch && matchesClass;
  });

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[12px] text-[#51625a] mb-1">
            <span className="hover:text-[#00513c] transition-colors cursor-pointer">Beranda</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#00513c] font-semibold">Log Sesi Kegiatan Belajar Mengajar (KBM)</span>
          </nav>
          <h1 className="text-[26px] lg:text-[30px] leading-[36px] text-[#181c1b] tracking-tight font-bold">
            Log Sesi Kegiatan Belajar Mengajar (KBM)
          </h1>
          <p className="text-[14px] text-[#3f4944] max-w-4xl mt-0.5">
            Rekam jejak digital pelaksanaan jam mengajar di setiap ruang kelas, kehadiran siswa, materi ajar yang disampaikan, dan waktu kehadiran guru.
          </p>
        </div>

        <button
          onClick={onOpenQR}
          className="px-4 py-2.5 rounded-lg bg-[#00513c] hover:bg-[#176b52] text-white text-[13px] font-semibold flex items-center gap-2 shadow-xs transition-colors flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add_task</span>
          <span>Catat Sesi KBM Baru (QR)</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-xs border border-[#bec9c2]/40">
          <span className="text-[11px] text-[#51625a] uppercase font-semibold">Total Sesi Tercatat Hari Ini</span>
          <div className="text-[32px] text-[#00513c] font-bold mt-1 tabular-nums">{journals.length} Sesi</div>
          <span className="text-[12px] text-[#51625a]">Dari 48 rombel aktif</span>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-xs border border-[#bec9c2]/40">
          <span className="text-[11px] text-[#51625a] uppercase font-semibold">Rata-Rata Kehadiran Siswa</span>
          <div className="text-[32px] text-[#181c1b] font-bold mt-1 tabular-nums">96.4%</div>
          <span className="text-[12px] text-[#00513c] font-semibold">Kondusif &amp; Terpantau</span>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-xs border border-[#bec9c2]/40">
          <span className="text-[11px] text-[#51625a] uppercase font-semibold">Status Validasi Sesi</span>
          <div className="text-[32px] text-[#181c1b] font-bold mt-1 tabular-nums">
            {journals.filter((j) => j.verifiedByKepsek).length} / {journals.length}
          </div>
          <span className="text-[12px] text-[#51625a]">Tervalidasi oleh Kepala Sekolah</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#bec9c2]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#51625a]">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari guru, mata pelajaran, materi..."
            className="w-full bg-[#f1f4f2] rounded-lg pl-9 pr-3 py-2 text-[13px] border border-[#bec9c2]/50 focus:outline-none focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-[12px] font-semibold text-[#51625a]">Ruang/Kelas:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] border border-[#bec9c2]/50"
          >
            <option value="all">Semua Ruang</option>
            <option value="R.302">R.302 (Lab Kimia)</option>
            <option value="Lab Komputer">Lab Komputer</option>
            <option value="R.304">R.304 (XI MIPA 1)</option>
          </select>
        </div>
      </div>

      {/* Table Log */}
      <div className="bg-white rounded-xl shadow-xs border border-[#bec9c2]/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-[#f1f4f2] text-[#51625a] font-semibold text-[11px] uppercase tracking-wider border-b border-[#bec9c2]/40">
                <th className="py-3 px-4">Waktu &amp; Tanggal</th>
                <th className="py-3 px-4">Pendidik</th>
                <th className="py-3 px-4">Ruang / Kelas</th>
                <th className="py-3 px-4">Mata Pelajaran &amp; Materi</th>
                <th className="py-3 px-4 text-center">Kehadiran Siswa</th>
                <th className="py-3 px-4 text-center">Status Validasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ebefed]">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-[#f7faf8] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#181c1b]">{log.date}</div>
                    <div className="text-[11px] text-[#51625a] font-mono">{log.startTime} - {log.endTime} WIB</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#00513c]">{log.teacherName}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-[#181c1b]">{log.classroom}</span>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-semibold text-[#181c1b]">{log.subject}</div>
                    <div className="text-[12px] text-[#51625a] line-clamp-2">{log.materialTaught}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-bold text-[#00513c]">{log.studentsPresent}</span>
                    <span className="text-[#51625a] text-[11px]"> / {log.studentsTotal}</span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {log.verifiedByKepsek ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#d4e7dd] text-[#00513c] text-[11px] font-semibold">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        Tervalidasi
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#74332e] text-[11px] font-semibold">
                        <span className="material-symbols-outlined text-[14px]">hourglass_top</span>
                        Menunggu Validasi
                      </span>
                    )}
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
