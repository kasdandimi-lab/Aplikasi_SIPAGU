import React from 'react';
import { UserRole } from '../types';

interface DashboardScreenProps {
  activeRole: UserRole;
  onNavigateTo: (screen: any) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  activeRole,
  onNavigateTo,
}) => {
  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[12px] text-[#51625a] mb-1">
            <span className="text-[#00513c] font-semibold">Beranda</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#51625a]">Dasbor Utama &amp; Pemantauan Kinerja</span>
          </nav>
          <h1 className="text-[26px] lg:text-[30px] leading-[36px] text-[#181c1b] tracking-tight font-bold">
            Dasbor Utama Pemantauan Aktivitas Guru
          </h1>
          <p className="text-[14px] text-[#3f4944] max-w-4xl mt-0.5">
            Sistem pemantauan presensi waktu nyata, rekapitulasi jam pelajaran (JP), dan kepatuhan jurnal mengajar harian pendidik SMAN 1 Jakarta.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          <button
            onClick={() => onNavigateTo('presensi-qr-kelas')}
            className="px-4 py-2.5 rounded-lg bg-[#00513c] hover:bg-[#176b52] text-white text-[13px] font-semibold flex items-center gap-2 shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
            <span>Buka QR Presensi Kelas</span>
          </button>
        </div>
      </div>

      {/* Real-time KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-xs border border-[#bec9c2]/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#51625a] uppercase font-semibold">Guru Hadir Mengajar</span>
            <span className="p-2 rounded-lg bg-[#d4e7dd] text-[#00513c]">
              <span className="material-symbols-outlined text-[20px]">person_check</span>
            </span>
          </div>
          <div className="mt-2">
            <span className="text-[32px] text-[#181c1b] font-bold tabular-nums">44</span>
            <span className="text-[14px] text-[#51625a] ml-1">/ 48 Guru</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#00513c] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#00513c] animate-pulse"></span>
            <span>91.6% Berada di ruang kelas</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-xs border border-[#bec9c2]/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#51625a] uppercase font-semibold">Jam Pelajaran (JP) Hari Ini</span>
            <span className="p-2 rounded-lg bg-[#d4e7dd] text-[#00513c]">
              <span className="material-symbols-outlined text-[20px]">schedule</span>
            </span>
          </div>
          <div className="mt-2">
            <span className="text-[32px] text-[#00513c] font-bold tabular-nums">186</span>
            <span className="text-[14px] text-[#51625a] ml-1">JP Berjalan</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#51625a]">
            <span>Sesi ke-4 dari total 8 sesi harian</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-xs border border-[#bec9c2]/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#51625a] uppercase font-semibold">Izin / Tugas Belajar</span>
            <span className="p-2 rounded-lg bg-[#ffdad6] text-[#74332e]">
              <span className="material-symbols-outlined text-[20px]">event_busy</span>
            </span>
          </div>
          <div className="mt-2">
            <span className="text-[32px] text-[#74332e] font-bold tabular-nums">3</span>
            <span className="text-[14px] text-[#51625a] ml-1">Pendidik</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#74332e] font-medium">
            <span>2 Disetujui, 1 Menunggu validasi</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-xs border border-[#bec9c2]/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#51625a] uppercase font-semibold">Jurnal Mengajar Terisi</span>
            <span className="p-2 rounded-lg bg-[#d4e7dd] text-[#00513c]">
              <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
            </span>
          </div>
          <div className="mt-2">
            <span className="text-[32px] text-[#181c1b] font-bold tabular-nums">42</span>
            <span className="text-[14px] text-[#51625a] ml-1">Log Sesi</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#00513c] font-semibold">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>95.4% Dilengkapi materi ajar</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Activity Feed & Class Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Classroom Timeline */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-xs border border-[#bec9c2]/40 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#bec9c2]/30">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00513c] animate-pulse"></span>
              <h2 className="text-[16px] font-bold text-[#181c1b]">
                Aktivitas Presensi Kelas Waktu Nyata
              </h2>
            </div>
            <span className="text-[12px] text-[#51625a]">
              Diperbarui otomatis tiap 30 detik
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-lg bg-[#f1f4f2] hover:bg-[#e6e9e7] transition-colors border border-[#bec9c2]/30 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#d4e7dd] text-[#0f1f19] flex items-center justify-center font-bold text-[13px] flex-shrink-0">
                  NH
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#181c1b] text-[14px]">Dra. Hj. Nurul Hidayah, M.Pd</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#d4e7dd] text-[#00513c] text-[10px] font-bold">Hadir Tepat Waktu</span>
                  </div>
                  <p className="text-[12px] text-[#3f4944] mt-0.5">
                    Ruang R.302 (Lab Kimia) • Kimia Dasar &amp; Praktikum Reaksi Asam Basa
                  </p>
                  <p className="text-[11px] text-[#51625a] mt-0.5">
                    Siswa: 34 hadir / 36 siswa • Scan QR terverifikasi IP 182.1.20.44
                  </p>
                </div>
              </div>
              <span className="text-[11px] text-[#00513c] font-semibold flex-shrink-0">10 mnt lalu</span>
            </div>

            <div className="p-3.5 rounded-lg bg-[#f1f4f2] hover:bg-[#e6e9e7] transition-colors border border-[#bec9c2]/30 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#d4e7dd] text-[#00513c] flex items-center justify-center font-bold text-[13px] flex-shrink-0">
                  SR
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#181c1b] text-[14px]">Siti Rahmawati, S.Pd</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#d4e7dd] text-[#00513c] text-[10px] font-bold">Hadir Tepat Waktu</span>
                  </div>
                  <p className="text-[12px] text-[#3f4944] mt-0.5">
                    Ruang R.304 (Kelas XI MIPA 1) • Fisika Gelombang &amp; Termodinamika
                  </p>
                  <p className="text-[11px] text-[#51625a] mt-0.5">
                    Siswa: 36 hadir / 36 siswa • Log Jurnal Mengajar Terisi
                  </p>
                </div>
              </div>
              <span className="text-[11px] text-[#00513c] font-semibold flex-shrink-0">09.20 WIB</span>
            </div>

            <div className="p-3.5 rounded-lg bg-[#f1f4f2] hover:bg-[#e6e9e7] transition-colors border border-[#bec9c2]/30 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#e6e9e7] text-[#181c1b] flex items-center justify-center font-bold text-[13px] flex-shrink-0">
                  AR
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#181c1b] text-[14px]">Ahmad Riyadi, M.Kom</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#d4e7dd] text-[#00513c] text-[10px] font-bold">Hadir Tepat Waktu</span>
                  </div>
                  <p className="text-[12px] text-[#3f4944] mt-0.5">
                    Lab Komputer 2 • Pemrograman Web &amp; Python Algoritma
                  </p>
                  <p className="text-[11px] text-[#51625a] mt-0.5">
                    Siswa: 35 hadir / 35 siswa • Scan QR Lab Komputer 2
                  </p>
                </div>
              </div>
              <span className="text-[11px] text-[#00513c] font-semibold flex-shrink-0">07.15 WIB</span>
            </div>
          </div>

          <div className="pt-2 text-right">
            <button
              onClick={() => onNavigateTo('pemeriksaan-dan-audit')}
              className="text-[13px] text-[#00513c] font-semibold hover:underline flex items-center gap-1 justify-end ml-auto"
            >
              <span>Periksa Jurnal &amp; Presensi Lengkap</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Right Column: Attendance by Cluster & Quick Actions */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl shadow-xs border border-[#bec9c2]/40 p-5 space-y-4">
            <h2 className="text-[15px] font-bold text-[#181c1b]">
              Tingkat Kehadiran per Rumpun
            </h2>
            <div className="space-y-3 text-[12px]">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-[#181c1b]">MIPA (Matematika &amp; Sains)</span>
                  <span className="text-[#00513c] font-bold">98.2%</span>
                </div>
                <div className="w-full h-2 bg-[#f1f4f2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00513c] rounded-full" style={{ width: '98.2%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-[#181c1b]">Bahasa &amp; Literasi</span>
                  <span className="text-[#00513c] font-bold">95.0%</span>
                </div>
                <div className="w-full h-2 bg-[#f1f4f2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00513c] rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-[#181c1b]">Sosial &amp; Humaniora (IPS)</span>
                  <span className="text-[#00513c] font-bold">91.4%</span>
                </div>
                <div className="w-full h-2 bg-[#f1f4f2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00513c] rounded-full" style={{ width: '91.4%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-[#181c1b]">Informatika &amp; TIK</span>
                  <span className="text-[#00513c] font-bold">100.0%</span>
                </div>
                <div className="w-full h-2 bg-[#f1f4f2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00513c] rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#f1f4f2] rounded-xl p-5 border border-[#bec9c2]/40 space-y-3">
            <div className="flex items-center gap-2 text-[#00513c]">
              <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
              <h3 className="font-bold text-[14px]">Peran Anda Saat Ini</h3>
            </div>
            <p className="text-[12px] text-[#3f4944] leading-relaxed">
              Anda sedang masuk dengan hak akses wewenang{' '}
              <strong className="text-[#181c1b]">
                {activeRole === 'kepsek'
                  ? 'Kepala Sekolah (Validasi & Evaluasi)'
                  : activeRole === 'kurikulum'
                  ? 'Admin Kurikulum (Jadwal & Presensi)'
                  : 'Guru Pengajar (Presensi QR & Jurnal)'}
              </strong>
              . Anda dapat berpindah peran kapan saja melalui menu di bilah navigasi kiri.
            </p>
            <button
              onClick={() => onNavigateTo('manajemen-akun')}
              className="w-full py-2 rounded-lg bg-white hover:bg-[#e0e3e1] text-[#00513c] text-[12px] font-semibold border border-[#bec9c2]/50 transition-colors"
            >
              Buka Manajemen Akun &amp; Kredensial →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
