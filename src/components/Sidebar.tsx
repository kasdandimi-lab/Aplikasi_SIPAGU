import React from 'react';
import { UserRole } from '../types';

export type ScreenId =
  | 'dasbor-utama'
  | 'presensi-qr-kelas'
  | 'pemeriksaan-dan-audit'
  | 'manajemen-jadwal'
  | 'log-sesi-kbm'
  | 'pengajuan-izin'
  | 'laporan-dan-rekapitulasi'
  | 'data-master-sekolah'
  | 'manajemen-akun'
  | 'pusat-notifikasi';

interface SidebarProps {
  activeScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  activeRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeScreen,
  onSelectScreen,
  activeRole,
  onChangeRole,
  isOpenMobile,
  onCloseMobile,
  onLogout,
}) => {
  const primaryNavItems = [
    { id: 'dasbor-utama' as ScreenId, label: 'Dasbor Utama', icon: 'grid_view' },
    { id: 'presensi-qr-kelas' as ScreenId, label: 'Presensi QR Kelas', icon: 'qr_code_scanner' },
    { id: 'pemeriksaan-dan-audit' as ScreenId, label: 'Pemeriksaan & Audit', icon: 'fact_check' },
    { id: 'manajemen-jadwal' as ScreenId, label: 'Manajemen Jadwal', icon: 'calendar_month' },
    { id: 'log-sesi-kbm' as ScreenId, label: 'Log Sesi KBM', icon: 'history_edu' },
    { id: 'pengajuan-izin' as ScreenId, label: 'Pengajuan Izin', icon: 'event_busy' },
    { id: 'laporan-dan-rekapitulasi' as ScreenId, label: 'Laporan & Rekapitulasi', icon: 'bar_chart' },
  ];

  const settingsNavItems = [
    { id: 'data-master-sekolah' as ScreenId, label: 'Data Master Sekolah', icon: 'account_balance' },
    { id: 'manajemen-akun' as ScreenId, label: 'Manajemen Akun', icon: 'manage_accounts' },
    { id: 'pusat-notifikasi' as ScreenId, label: 'Pusat Notifikasi', icon: 'notifications' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white z-50 flex flex-col shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-[#bec9c2]/40 transition-transform duration-200 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header matching image_836dd8b2.png */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#bec9c2]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#176b52] flex items-center justify-center text-white shadow-xs flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[18px] leading-[22px] text-[#00513c] font-bold tracking-tight truncate">
                SIPAGU
              </span>
              <span className="text-[12px] leading-[16px] text-[#51625a] font-medium truncate">
                Sistem Pantau KBM
              </span>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="lg:hidden text-[#51625a] hover:text-[#181c1b] p-1 rounded"
            aria-label="Tutup Menu"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Role Switcher */}
        <div className="px-4 py-2.5">
          <div className="bg-[#f1f4f2] rounded-lg p-2 border border-[#bec9c2]/40">
            <label
              className="text-[10px] leading-[12px] text-[#3f4944] block px-1 mb-1 font-bold uppercase tracking-wider"
              htmlFor="role-switcher"
            >
              Peran Aktif
            </label>
            <select
              id="role-switcher"
              value={activeRole}
              onChange={(e) => onChangeRole(e.target.value as UserRole)}
              className="w-full bg-white text-[#181c1b] text-[12px] font-semibold rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#00513c] cursor-pointer border border-[#bec9c2]/50"
            >
              <option value="kepsek">Kepala Sekolah</option>
              <option value="kurikulum">Admin Kurikulum</option>
              <option value="guru">Guru Pengajar</option>
            </select>
          </div>
        </div>

        {/* Navigation items matching image_836dd8b2.png */}
        <nav className="flex-1 px-3 py-1 space-y-1 overflow-y-auto">
          {/* Main Items */}
          {primaryNavItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectScreen(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all text-[14px] cursor-pointer ${
                  isActive
                    ? 'bg-[#176b52] text-white font-bold shadow-xs'
                    : 'text-[#3f4944] hover:bg-[#d4e7dd]/60 hover:text-[#0f1f19] font-medium'
                }`}
              >
                <span className="material-symbols-outlined text-[22px] flex-shrink-0">
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}

          {/* Section Divider: PENGATURAN & DATA */}
          <div className="pt-4 pb-1.5 px-3">
            <span className="text-[11px] font-bold text-[#51625a] tracking-wider uppercase">
              PENGATURAN &amp; DATA
            </span>
          </div>

          {/* Settings Items */}
          {settingsNavItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectScreen(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all text-[14px] cursor-pointer ${
                  isActive
                    ? 'bg-[#176b52] text-white font-bold shadow-xs'
                    : 'text-[#3f4944] hover:bg-[#d4e7dd]/60 hover:text-[#0f1f19] font-medium'
                }`}
              >
                <span className="material-symbols-outlined text-[22px] flex-shrink-0">
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer: Logout & Sync */}
        <div className="p-3 bg-[#f1f4f2] border-t border-[#bec9c2]/30 space-y-2">
          {onLogout && (
            <button
              onClick={() => {
                onLogout();
                onCloseMobile();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors text-[12px] font-bold text-[#ba1a1a] hover:bg-[#ffdad6] bg-white border border-[#bec9c2]/40 shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span>Keluar (Logout)</span>
            </button>
          )}

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#bec9c2]/40 text-[11px] text-[#51625a]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#176b52] animate-pulse"></span>
            <span className="truncate">SIPAGU Engine v2.4 Online</span>
          </div>
        </div>
      </aside>
    </>
  );
};
