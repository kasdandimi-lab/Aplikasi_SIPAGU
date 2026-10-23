import React, { useState } from 'react';
import { UserAccount } from '../types';

interface ReportScreenProps {
  users: UserAccount[];
}

export const ReportScreen: React.FC<ReportScreenProps> = ({ users }) => {
  const [selectedMonth, setSelectedMonth] = useState('Oktober 2024');
  const [clusterFilter, setClusterFilter] = useState('all');

  const teachers = users.filter((u) => u.roleCode === 'guru');

  const filteredTeachers = teachers.filter((t) => {
    if (clusterFilter !== 'all' && t.cluster !== clusterFilter) return false;
    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ['Nama Guru', 'NIP', 'Mata Pelajaran', 'Kehadiran (%)', 'Jam Mengajar (JP)', 'Status Sertifikasi'];
    const rows = filteredTeachers.map((t) => [
      `"${t.name}"`,
      `"${t.nip}"`,
      `"${t.assignment}"`,
      `"${t.status === 'suspended' ? '0%' : '98.5%'}"`,
      `"${t.status === 'suspended' ? 0 : 28}"`,
      `"${t.status === 'suspended' ? 'Ditangguhkan Cuti' : 'Memenuhi Beban Kerja (≥24 JP)'}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SIPAGU_Laporan_Kinerja_Pendidik_${selectedMonth.replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[12px] text-[#51625a] mb-1">
            <span className="hover:text-[#00513c] transition-colors cursor-pointer">Beranda</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#00513c] font-semibold">Laporan &amp; Rekapitulasi Kinerja</span>
          </nav>
          <h1 className="text-[26px] lg:text-[30px] leading-[36px] text-[#181c1b] tracking-tight font-bold">
            Rekapitulasi Kinerja &amp; Kehadiran Pendidik
          </h1>
          <p className="text-[14px] text-[#3f4944] max-w-4xl mt-0.5">
            Laporan bulanan pemenuhan jam mengajar tatap muka minimal 24 JP per minggu sesuai ketentuan Sertifikasi Guru dan Tunjangan Profesi Pendidik (TPG).
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-lg bg-[#f1f4f2] hover:bg-[#e0e3e1] text-[#181c1b] text-[13px] font-semibold flex items-center gap-1.5 border border-[#bec9c2]/50 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-[#51625a]">download</span>
            <span>Ekspor CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-[#00513c] hover:bg-[#176b52] text-white text-[13px] font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Cetak Berkas Resmi</span>
          </button>
        </div>
      </div>

      {/* Quick Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-xs border border-[#bec9c2]/40">
          <span className="text-[11px] text-[#51625a] uppercase font-semibold">Rata-rata Kehadiran Bulanan</span>
          <div className="text-[30px] font-bold text-[#00513c] mt-1 tabular-nums">96.8%</div>
          <span className="text-[12px] text-[#51625a]">Berdasarkan 48 pendidik aktif</span>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-xs border border-[#bec9c2]/40">
          <span className="text-[11px] text-[#51625a] uppercase font-semibold">Pemenuhan Beban Kerja (≥24 JP)</span>
          <div className="text-[30px] font-bold text-[#181c1b] mt-1 tabular-nums">46 / 48</div>
          <span className="text-[12px] text-[#00513c] font-semibold">95.8% Memenuhi Syarat TPG</span>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-xs border border-[#bec9c2]/40">
          <span className="text-[11px] text-[#51625a] uppercase font-semibold">Total Jam Tatap Muka Terlaksana</span>
          <div className="text-[30px] font-bold text-[#181c1b] mt-1 tabular-nums">1.344 JP</div>
          <span className="text-[12px] text-[#51625a]">Periode {selectedMonth}</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-white rounded-xl shadow-xs border border-[#bec9c2]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-[12px] font-semibold text-[#51625a]">Bulan:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-[#f1f4f2] rounded-lg px-3 py-1.5 text-[13px] text-[#181c1b] font-medium border border-[#bec9c2]/50"
          >
            <option value="Oktober 2024">Oktober 2024</option>
            <option value="September 2024">September 2024</option>
            <option value="Agustus 2024">Agustus 2024</option>
          </select>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-[12px] font-semibold text-[#51625a]">Rumpun:</label>
          <select
            value={clusterFilter}
            onChange={(e) => setClusterFilter(e.target.value)}
            className="bg-[#f1f4f2] rounded-lg px-3 py-1.5 text-[13px] text-[#181c1b] font-medium border border-[#bec9c2]/50"
          >
            <option value="all">Semua Rumpun Mapel</option>
            <option value="mipa">MIPA</option>
            <option value="bahasa">Bahasa</option>
            <option value="ips">IPS</option>
            <option value="kejuruan">Informatika &amp; TIK</option>
          </select>
        </div>
      </div>

      {/* Performance Table */}
      <div className="bg-white rounded-xl shadow-xs border border-[#bec9c2]/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-[#f1f4f2] text-[#51625a] font-semibold text-[11px] uppercase tracking-wider border-b border-[#bec9c2]/40">
                <th className="py-3 px-4">Nama Pendidik &amp; NIP</th>
                <th className="py-3 px-4">Mata Pelajaran</th>
                <th className="py-3 px-4 text-center">Tingkat Kehadiran</th>
                <th className="py-3 px-4 text-center">Realisasi JP</th>
                <th className="py-3 px-4">Status Beban Kerja</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ebefed]">
              {filteredTeachers.map((t, idx) => {
                const isSuspended = t.status === 'suspended';
                const attendance = isSuspended ? '0%' : (96 + (idx % 4)).toFixed(1) + '%';
                const jp = isSuspended ? 0 : 26 + (idx % 4);
                return (
                  <tr key={t.id} className="hover:bg-[#f7faf8] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#181c1b]">{t.name}</div>
                      <div className="text-[11px] text-[#51625a] font-mono">NIP. {t.nip}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#3f4944]">
                      {t.assignment}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-[#00513c]">
                      {attendance}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-[#181c1b]">
                      {jp} JP / minggu
                    </td>
                    <td className="py-3.5 px-4">
                      {isSuspended ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[11px] font-semibold">
                          Nonaktif Cuti
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#d4e7dd] text-[#00513c] text-[11px] font-semibold">
                          <span className="material-symbols-outlined text-[14px]">check</span>
                          Memenuhi (TPG Valid)
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
