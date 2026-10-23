import React, { useState } from 'react';
import { UserAccount, UserRole } from '../types';

interface EditRoleDrawerProps {
  user: UserAccount | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (userId: string, newRole: 'Guru Pengajar' | 'Admin Kurikulum' | 'Kepala Sekolah', newRoleCode: UserRole) => void;
}

export const EditRoleDrawer: React.FC<EditRoleDrawerProps> = ({
  user,
  isOpen,
  onClose,
  onSave,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('guru');
  const [adminPassword, setAdminPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync role when user changes
  React.useEffect(() => {
    if (user) {
      setSelectedRole(user.roleCode);
      setAdminPassword('');
      setErrorMsg('');
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSave = () => {
    if (!adminPassword.trim()) {
      setErrorMsg('Masukkan kata sandi otorisasi Admin Anda untuk melanjutkan');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      let roleName: 'Guru Pengajar' | 'Admin Kurikulum' | 'Kepala Sekolah' = 'Guru Pengajar';
      if (selectedRole === 'kurikulum') roleName = 'Admin Kurikulum';
      if (selectedRole === 'kepsek') roleName = 'Kepala Sekolah';

      onSave(user.id, roleName, selectedRole);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-150">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#bec9c2]/50 animate-in slide-in-from-right duration-200">
          {/* Drawer Header */}
          <div className="p-5 bg-[#f1f4f2] flex items-start justify-between border-b border-[#bec9c2]/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white text-[#00513c] flex items-center justify-center shadow-xs border border-[#bec9c2]/40">
                <span className="material-symbols-outlined text-[22px]">admin_panel_settings</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="text-[18px] font-bold text-[#181c1b] leading-tight">
                  Ubah Peran &amp; Hak Akses
                </h3>
                <span className="text-[12px] text-[#51625a]">
                  Modifikasi Wewenang Sistem SIPAGU
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

          {/* Drawer Body */}
          <div className="p-5 space-y-4 flex-1 overflow-y-auto">
            {/* User Summary Card */}
            <div className="p-3.5 rounded-lg bg-[#f1f4f2] flex flex-col gap-1 border border-[#bec9c2]/40">
              <span className="text-[11px] text-[#51625a] uppercase font-semibold tracking-wider">
                Subjek Pengguna
              </span>
              <span className="text-[16px] text-[#181c1b] font-bold">
                {user.name}
              </span>
              <span className="text-[12px] text-[#00513c] font-semibold">
                Peran Sekarang: {user.role} ({user.assignment})
              </span>
            </div>

            {/* Role Selector */}
            <div className="space-y-2">
              <label className="text-[13px] text-[#181c1b] font-semibold block">
                Tingkatan Hak Akses (Role)
              </label>
              <div className="space-y-2.5">
                {/* Role Option: Guru */}
                <label
                  onClick={() => setSelectedRole('guru')}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedRole === 'guru'
                      ? 'bg-[#d4e7dd]/50 border-[#00513c]'
                      : 'bg-[#f1f4f2] border-[#bec9c2]/40 hover:bg-[#ebefed]'
                  }`}
                >
                  <input
                    type="radio"
                    name="system-role"
                    checked={selectedRole === 'guru'}
                    onChange={() => setSelectedRole('guru')}
                    className="mt-1 w-4 h-4 text-[#00513c] accent-[#00513c]"
                  />
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-[#181c1b]">
                      Guru Pengajar
                    </span>
                    <span className="text-[12px] text-[#51625a] mt-0.5 leading-relaxed">
                      Hak akses memindai QR kelas, membuat jurnal mengajar harian, serta melihat riwayat kehadiran pribadi.
                    </span>
                  </div>
                </label>

                {/* Role Option: Admin Kurikulum */}
                <label
                  onClick={() => setSelectedRole('kurikulum')}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedRole === 'kurikulum'
                      ? 'bg-[#d4e7dd]/50 border-[#00513c]'
                      : 'bg-[#f1f4f2] border-[#bec9c2]/40 hover:bg-[#ebefed]'
                  }`}
                >
                  <input
                    type="radio"
                    name="system-role"
                    checked={selectedRole === 'kurikulum'}
                    onChange={() => setSelectedRole('kurikulum')}
                    className="mt-1 w-4 h-4 text-[#00513c] accent-[#00513c]"
                  />
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-[#181c1b]">
                      Admin Kurikulum &amp; Staf
                    </span>
                    <span className="text-[12px] text-[#51625a] mt-0.5 leading-relaxed">
                      Dapat mengelola jadwal mengajar, audit log presensi harian seluruh guru, dan mengatur pembagian rombel.
                    </span>
                  </div>
                </label>

                {/* Role Option: Kepala Sekolah */}
                <label
                  onClick={() => setSelectedRole('kepsek')}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedRole === 'kepsek'
                      ? 'bg-[#d4e7dd]/50 border-[#00513c]'
                      : 'bg-[#f1f4f2] border-[#bec9c2]/40 hover:bg-[#ebefed]'
                  }`}
                >
                  <input
                    type="radio"
                    name="system-role"
                    checked={selectedRole === 'kepsek'}
                    onChange={() => setSelectedRole('kepsek')}
                    className="mt-1 w-4 h-4 text-[#00513c] accent-[#00513c]"
                  />
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-[#181c1b]">
                      Kepala Sekolah / Pengawas
                    </span>
                    <span className="text-[12px] text-[#51625a] mt-0.5 leading-relaxed">
                      Akses eksekutif persetujuan izin/cuti, rekap laporan kinerja guru bulanan, dan ekspor data resmi ke dinas.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Elevated Permission Warning */}
            {selectedRole !== 'guru' && (
              <div className="p-3 rounded-lg bg-[#ffdad6] text-[#3b0807] flex items-start gap-2.5 border border-[#ba1a1a]/20">
                <span className="material-symbols-outlined text-[20px] text-[#ba1a1a] flex-shrink-0 mt-0.5">
                  warning
                </span>
                <div className="flex flex-col text-[12px] leading-relaxed">
                  <span className="font-bold">Peringatan Peningkatan Wewenang (Role Elevation)</span>
                  <span>
                    Mengubah peran menjadi Admin Kurikulum atau Kepala Sekolah membuka akses terhadap data sensitif sekolah dan log aktivitas seluruh pendidik.
                  </span>
                </div>
              </div>
            )}

            {/* Admin Authorization Password Check */}
            <div className="space-y-1 pt-1">
              <label className="text-[13px] text-[#181c1b] font-semibold block">
                Konfirmasi Kata Sandi Anda (Otorisasi Admin)
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full bg-[#f1f4f2] rounded-lg px-3.5 py-2 text-[14px] text-[#181c1b] placeholder:text-[#6f7974] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00513c]/20 border border-[#bec9c2]/50"
                placeholder="Ketik kata sandi Anda untuk konfirmasi..."
              />
              {errorMsg ? (
                <span className="text-[11px] text-[#ba1a1a] block font-medium">
                  {errorMsg}
                </span>
              ) : (
                <span className="text-[11px] text-[#51625a] block">
                  Dibutuhkan untuk mencegah perubahan peran tanpa izin. (Gunakan kata sandi apapun untuk demo)
                </span>
              )}
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-[#f1f4f2] flex items-center justify-end gap-3 border-t border-[#bec9c2]/40">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white hover:bg-[#ebefed] text-[#181c1b] text-[13px] font-medium border border-[#bec9c2]/50 transition-colors"
            >
              Batalkan
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-[#00513c] hover:bg-[#176b52] text-white text-[13px] font-semibold transition-colors flex items-center gap-1.5 shadow-xs disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">check</span>
                  <span>Simpan Perubahan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
