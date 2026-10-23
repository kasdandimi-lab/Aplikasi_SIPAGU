import React from 'react';
import { UserRole } from '../types';

export type ScreenId =
  | 'dasbor-utama'
  | 'presensi-qr-kelas'
  | 'pemeriksaan-dan-audit'
  | 'manajemen-jadwal'
  | 'pengajuan-izin'
  | 'laporan-dan-riwayat'
  | 'data-master-dan-akun';

interface SidebarProps {
  activeScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  activeRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeScreen,
  onSelectScreen,
  activeRole,
  onChangeRole,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'dasbor-utama' as ScreenId, label: 'Dasbor Utama', icon: 'grid_view' },
    { id: 'presensi-qr-kelas' as ScreenId, label: 'Presensi QR Kelas', icon: 'qr_code_scanner' },
    { id: 'pemeriksaan-dan-audit' as ScreenId, label: 'Pemeriksaan & Audit', icon: 'fact_check' },
    { id: 'manajemen-jadwal' as ScreenId, label: 'Manajemen Jadwal', icon: 'calendar_month' },
    { id: 'pengajuan-izin' as ScreenId, label: 'Pengajuan Izin', icon: 'assignment_late' },
    { id: 'laporan-dan-riwayat' as ScreenId, label: 'Laporan & Riwayat', icon: 'summarize' },
    { id: 'data-master-dan-akun' as ScreenId, label: 'Data Master & Akun', icon: 'settings_suggest' },
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
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between bg-[#f1f4f2] border-b border-[#bec9c2]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#176b52] flex items-center justify-center text-white shadow-xs">
              <span className="material-symbols-outlined text-[24px]">auto_stories</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[18px] leading-[22px] text-[#00513c] font-bold tracking-tight truncate">
                SIPAGU
              </span>
              <span className="text-[11px] leading-[14px] text-[#51625a] font-medium truncate">
                Monitoring Guru
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
        <div className="px-4 py-3">
          <div className="bg-[#f1f4f2] rounded-lg p-2 border border-[#bec9c2]/40">
            <label
              className="text-[11px] leading-[14px] text-[#3f4944] block px-1 mb-1 font-semibold uppercase tracking-wider"
              htmlFor="role-switcher"
            >
              Peran Aktif
            </label>
            <select
              id="role-switcher"
              value={activeRole}
              onChange={(e) => onChangeRole(e.target.value as UserRole)}
              className="w-full bg-white text-[#181c1b] text-[12px] font-semibold rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#00513c] cursor-pointer border border-[#bec9c2]/50"
            >
              <option value="kepsek">Kepala Sekolah</option>
              <option value="kurikulum">Admin Kurikulum</option>
              <option value="guru">Guru Pengajar</option>
            </select>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectScreen(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left transition-colors text-[14px] font-medium ${
                  isActive
                    ? 'bg-[#176b52] text-white font-semibold shadow-xs'
                    : 'text-[#3f4944] hover:bg-[#d4e7dd]/60 hover:text-[#0f1f19]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sync Status Footer */}
        <div className="p-4 bg-[#f1f4f2] border-t border-[#bec9c2]/30">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white border border-[#bec9c2]/40 shadow-xs">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#176b52] animate-pulse"></span>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] leading-[14px] text-[#00513c] font-semibold truncate">
                Online Sync Aktif
              </span>
              <span className="text-[12px] leading-[16px] text-[#51625a] truncate">
                Engine v2.4
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
