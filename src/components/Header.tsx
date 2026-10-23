import React, { useState } from 'react';
import { UserRole } from '../types';

interface HeaderProps {
  activeRole: UserRole;
  onOpenMobileMenu: () => void;
  onOpenAuditLog: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeRole,
  onOpenMobileMenu,
  onOpenAuditLog,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Profile info based on role
  const profile = {
    kepsek: {
      name: 'Drs. H. Mulyadi, M.Pd',
      nip: 'NIP 196805121994031004',
      roleTitle: 'Kepala Sekolah',
      initials: 'DM',
      bg: 'bg-[#ffdad6] text-[#3b0807]',
    },
    kurikulum: {
      name: 'H. Rahmat Hidayat, M.Pd',
      nip: 'NIP 198109152006041008',
      roleTitle: 'Admin Kurikulum',
      initials: 'RH',
      bg: 'bg-[#00513c] text-white',
    },
    guru: {
      name: 'Dra. Hj. Nurul Hidayah, M.Pd',
      nip: 'NIP 197805122003122002',
      roleTitle: 'Guru Pengajar',
      initials: 'NH',
      bg: 'bg-[#d4e7dd] text-[#0f1f19]',
    },
  }[activeRole];

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#bec9c2]/30 z-40">
      <div className="h-16 w-full px-4 lg:px-6 flex items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-lg text-[#3f4944] hover:bg-[#f1f4f2] transition-colors"
            aria-label="Buka Menu Navigasi"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          <div className="flex flex-col min-w-0">
            <span className="text-[17px] lg:text-[18px] text-[#181c1b] font-bold truncate leading-tight">
              SIPAGU - Pemantauan Aktivitas Guru
            </span>
            <span className="text-[11px] lg:text-[12px] text-[#51625a] truncate leading-tight">
              Sistem Informasi Akademik &amp; Kinerja Pendidik Terintegrasi
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4e7dd] text-[#0f1f19] text-[12px] font-medium ml-2">
            <span className="w-2 h-2 rounded-full bg-[#176b52] animate-pulse"></span>
            <span>Semua Layanan Normal • Sync Aktif</span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 lg:gap-4 flex-shrink-0 relative">
          {/* Notifications button */}
          <div className="relative">
            <button
              aria-label="Notifikasi Aktivitas"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-[#3f4944] hover:bg-[#f1f4f2] hover:text-[#181c1b] transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#ba1a1a] text-white text-[10px] flex items-center justify-center font-bold">
                3
              </span>
            </button>

            {/* Notification drop-down */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-[#bec9c2]/50 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#bec9c2]/30 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[14px] font-bold text-[#181c1b]">Pemberitahuan Sistem</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold">3 Baru</span>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-[11px] text-[#00513c] font-semibold hover:underline"
                  >
                    Tandai Dibaca
                  </button>
                </div>
                <div className="space-y-2 text-[13px]">
                  <div className="p-2 rounded-lg bg-[#f1f4f2] hover:bg-[#e6e9e7] transition-colors flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-[#00513c] mt-0.5">verified_user</span>
                    <div>
                      <p className="font-semibold text-[#181c1b] text-[12px]">Presensi QR R.302 Berhasil</p>
                      <p className="text-[#51625a] text-[11px]">Dra. Hj. Nurul Hidayah memulai praktikum Kimia (34/36 siswa).</p>
                      <span className="text-[10px] text-[#6f7974]">10 menit lalu</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#f1f4f2] hover:bg-[#e6e9e7] transition-colors flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-[#74332e] mt-0.5">assignment</span>
                    <div>
                      <p className="font-semibold text-[#181c1b] text-[12px]">Pengajuan Cuti Menunggu Validasi</p>
                      <p className="text-[#51625a] text-[11px]">Ahmad Riyadi, M.Kom mengajukan izin Dinas Luar Narasumber 25-26 Okt.</p>
                      <span className="text-[10px] text-[#6f7974]">35 menit lalu</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#f1f4f2] hover:bg-[#e6e9e7] transition-colors flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-[#00513c] mt-0.5">cloud_done</span>
                    <div>
                      <p className="font-semibold text-[#181c1b] text-[12px]">Sinkronisasi Dapodik V.2024 Sukses</p>
                      <p className="text-[#51625a] text-[11px]">48 NUPTK aktif dan 12 data rombel terverifikasi Kemendikbudristek.</p>
                      <span className="text-[10px] text-[#6f7974]">2 jam lalu</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#bec9c2]/30 mt-2 text-center">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      onOpenAuditLog();
                    }}
                    className="text-[12px] text-[#00513c] font-semibold hover:underline"
                  >
                    Buka Riwayat Audit Lengkap →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User profile capsule */}
          <div className="flex items-center gap-2.5 pl-1 border-l border-[#bec9c2]/40">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-[14px] leading-tight text-[#181c1b] font-semibold truncate max-w-[200px]">
                {profile.name}
              </span>
              <span className="text-[11px] leading-tight text-[#51625a] truncate">
                {profile.nip}
              </span>
            </div>
            <div
              className={`w-9 h-9 rounded-full ${profile.bg} flex items-center justify-center flex-shrink-0 font-bold text-[13px] shadow-xs`}
              title={`${profile.name} (${profile.roleTitle})`}
            >
              {profile.initials}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
