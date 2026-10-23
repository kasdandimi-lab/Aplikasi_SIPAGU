import React, { useState } from 'react';
import { UserAccount, UserRole, SubjectCluster } from '../types';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: UserAccount) => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onAddUser,
}) => {
  const [name, setName] = useState('');
  const [nip, setNip] = useState('');
  const [email, setEmail] = useState('');
  const [roleCode, setRoleCode] = useState<UserRole>('guru');
  const [cluster, setCluster] = useState<SubjectCluster>('mipa');
  const [assignment, setAssignment] = useState('');

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setName(val);
    if (!email || email.endsWith('@sman1.sch.id')) {
      const slug = val
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '.')
        .replace(/\.+/g, '.')
        .replace(/^\.|\.$/g, '');
      if (slug) {
        setEmail(`${slug.split('.').slice(0, 2).join('.')}@sman1.sch.id`);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !nip.trim() || !email.trim()) return;

    let role: 'Guru Pengajar' | 'Admin Kurikulum' | 'Kepala Sekolah' = 'Guru Pengajar';
    if (roleCode === 'kurikulum') role = 'Admin Kurikulum';
    if (roleCode === 'kepsek') role = 'Kepala Sekolah';

    const clusterLabels: Record<SubjectCluster, string> = {
      mipa: 'MIPA (Matematika & Sains)',
      bahasa: 'Bahasa & Literasi',
      ips: 'Sosial & Humaniora',
      kejuruan: 'Informatika & TIK',
      manajemen: 'Manajemen & Pimpinan',
    };

    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      name,
      nip,
      email,
      role,
      roleCode,
      assignment: assignment || 'Mata Pelajaran Wajib',
      cluster,
      clusterLabel: clusterLabels[cluster],
      lastActivityTime: 'Baru ditambahkan',
      lastActivityDetail: 'Registrasi Akun Baru SIPAGU',
      status: 'active',
      statusLabel: 'Aktif',
      twoFactorEnabled: false,
      avatarBg: 'bg-[#d4e7dd]',
      avatarText: 'text-[#00513c]',
    };

    onAddUser(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden border border-[#bec9c2]/50">
        {/* Header */}
        <div className="p-5 bg-[#f1f4f2] flex items-start justify-between border-b border-[#bec9c2]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white text-[#00513c] flex items-center justify-center shadow-xs border border-[#bec9c2]/40">
              <span className="material-symbols-outlined text-[22px]">person_add</span>
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="text-[18px] font-bold text-[#181c1b] leading-tight">
                Tambah Akun Pengguna Baru
              </h3>
              <span className="text-[12px] text-[#51625a]">
                Registrasi Kredensial Pendidik Terintegrasi Dapodik
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

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-5 space-y-3.5">
            <div>
              <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                Nama Lengkap &amp; Gelar <span className="text-[#ba1a1a]">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Contoh: Drs. Wahyu Kurniawan, M.Pd"
                className="w-full bg-[#f1f4f2] rounded-lg px-3.5 py-2 text-[13px] text-[#181c1b] placeholder:text-[#6f7974] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00513c] border border-[#bec9c2]/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                  NIP / NUPTK <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  placeholder="198901152014021003"
                  className="w-full bg-[#f1f4f2] rounded-lg px-3.5 py-2 text-[13px] text-[#181c1b] placeholder:text-[#6f7974] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00513c] border border-[#bec9c2]/50 font-mono"
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                  Email Kedinasan <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@sman1.sch.id"
                  className="w-full bg-[#f1f4f2] rounded-lg px-3.5 py-2 text-[13px] text-[#181c1b] placeholder:text-[#6f7974] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00513c] border border-[#bec9c2]/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                  Peran Utama (Role)
                </label>
                <select
                  value={roleCode}
                  onChange={(e) => setRoleCode(e.target.value as UserRole)}
                  className="w-full bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] text-[#181c1b] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00513c] border border-[#bec9c2]/50 cursor-pointer"
                >
                  <option value="guru">Guru Pengajar</option>
                  <option value="kurikulum">Admin Kurikulum &amp; Staf</option>
                  <option value="kepsek">Kepala Sekolah</option>
                </select>
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                  Rumpun Mapel / Bidang
                </label>
                <select
                  value={cluster}
                  onChange={(e) => setCluster(e.target.value as SubjectCluster)}
                  className="w-full bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] text-[#181c1b] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00513c] border border-[#bec9c2]/50 cursor-pointer"
                >
                  <option value="mipa">MIPA (Matematika &amp; Sains)</option>
                  <option value="bahasa">Bahasa &amp; Literasi</option>
                  <option value="ips">Sosial &amp; Humaniora</option>
                  <option value="kejuruan">Informatika &amp; TIK</option>
                  <option value="manajemen">Manajemen &amp; Pimpinan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                Penugasan Spesifik / Mata Pelajaran
              </label>
              <input
                type="text"
                value={assignment}
                onChange={(e) => setAssignment(e.target.value)}
                placeholder="Contoh: Matematika Peminatan Kelas XI &amp; XII"
                className="w-full bg-[#f1f4f2] rounded-lg px-3.5 py-2 text-[13px] text-[#181c1b] placeholder:text-[#6f7974] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00513c] border border-[#bec9c2]/50"
              />
            </div>

            <div className="p-3 rounded-lg bg-[#ebefed] text-[#3f4944] text-[11px] leading-relaxed flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#00513c]">info</span>
              <span>
                Akun baru akan otomatis mendapatkan email instruksi aktivasi dan tautan pembuatan kata sandi pertama.
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-[#f1f4f2] flex items-center justify-end gap-3 border-t border-[#bec9c2]/40">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white hover:bg-[#ebefed] text-[#181c1b] text-[13px] font-medium border border-[#bec9c2]/50 transition-colors"
            >
              Batalkan
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#00513c] hover:bg-[#176b52] text-white text-[13px] font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>Daftarkan Pengguna</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
