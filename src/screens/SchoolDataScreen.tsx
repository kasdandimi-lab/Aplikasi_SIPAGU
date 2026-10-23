import React, { useState } from 'react';

export const SchoolDataScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profil' | 'rombel' | 'ruang'>('profil');
  const [rooms, setRooms] = useState([
    { id: '1', code: 'R.302', name: 'Laboratorium Kimia', capacity: 36, status: 'Aktif (Kondusif)', type: 'Laboratorium' },
    { id: '2', code: 'R.301', name: 'Ruang Kelas X MIPA 1', capacity: 36, status: 'Aktif', type: 'Kelas Teori' },
    { id: '3', code: 'Lab-Kom-2', name: 'Laboratorium Komputer 2', capacity: 40, status: 'Aktif (Workstation Prima)', type: 'Laboratorium TIK' },
    { id: '4', code: 'R.304', name: 'Ruang Kelas XI MIPA 1', capacity: 36, status: 'Aktif', type: 'Kelas Teori' },
    { id: '5', code: 'Lab-Bhs-1', name: 'Laboratorium Bahasa 1', capacity: 36, status: 'Aktif (Audio Center)', type: 'Laboratorium' },
    { id: '6', code: 'R.204', name: 'Ruang Kelas XI IPS 3', capacity: 36, status: 'Aktif', type: 'Kelas Teori' },
  ]);

  const [newRoomCode, setNewRoomCode] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomCode || !newRoomName) return;
    setRooms((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        code: newRoomCode,
        name: newRoomName,
        capacity: 36,
        status: 'Aktif',
        type: 'Kelas Teori',
      },
    ]);
    setNewRoomCode('');
    setNewRoomName('');
    setIsAddRoomOpen(false);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Header */}
      <div>
        <nav className="flex items-center gap-2 text-[12px] text-[#51625a] mb-1">
          <span className="hover:text-[#00513c] transition-colors cursor-pointer">Pengaturan &amp; Data</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#00513c] font-semibold">Data Master Sekolah</span>
        </nav>
        <h1 className="text-[26px] lg:text-[30px] leading-[36px] text-[#181c1b] tracking-tight font-bold">
          Data Master Sekolah &amp; Sarana KBM
        </h1>
        <p className="text-[14px] text-[#3f4944] max-w-4xl mt-0.5">
          Struktur data kelembagaan resmi satuan pendidikan SMAN 1 Jakarta terintegrasi Dapodik Kemendikbudristek, rombongan belajar, dan pemetaan sarana ruang kelas.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#bec9c2]/40 pb-2">
        <button
          onClick={() => setActiveTab('profil')}
          className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all ${
            activeTab === 'profil'
              ? 'bg-[#00513c] text-white shadow-xs'
              : 'bg-white text-[#3f4944] hover:bg-[#f1f4f2] border border-[#bec9c2]/40'
          }`}
        >
          Profil Lembaga &amp; Dapodik
        </button>
        <button
          onClick={() => setActiveTab('rombel')}
          className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all ${
            activeTab === 'rombel'
              ? 'bg-[#00513c] text-white shadow-xs'
              : 'bg-white text-[#3f4944] hover:bg-[#f1f4f2] border border-[#bec9c2]/40'
          }`}
        >
          Rombongan Belajar (Rombel)
        </button>
        <button
          onClick={() => setActiveTab('ruang')}
          className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all ${
            activeTab === 'ruang'
              ? 'bg-[#00513c] text-white shadow-xs'
              : 'bg-white text-[#3f4944] hover:bg-[#f1f4f2] border border-[#bec9c2]/40'
          }`}
        >
          Ruang Kelas &amp; Lab ({rooms.length})
        </button>
      </div>

      {activeTab === 'profil' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-xs border border-[#bec9c2]/40 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#bec9c2]/30">
              <span className="font-bold text-[15px] text-[#181c1b]">Identitas Satuan Pendidikan</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#d4e7dd] text-[#00513c] text-[11px] font-bold">
                Akreditasi A
              </span>
            </div>
            <div className="space-y-3 text-[13px]">
              <div className="flex justify-between py-1 border-b border-[#f1f4f2]">
                <span className="text-[#51625a]">Nama Sekolah:</span>
                <span className="font-bold text-[#181c1b]">SMAN 1 Jakarta</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#f1f4f2]">
                <span className="text-[#51625a]">NPSN Resmi:</span>
                <span className="font-mono font-bold text-[#00513c]">20101582</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#f1f4f2]">
                <span className="text-[#51625a]">Bentuk Pendidikan:</span>
                <span className="font-medium text-[#181c1b]">Sekolah Menengah Atas (SMA)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#f1f4f2]">
                <span className="text-[#51625a]">Kepala Sekolah:</span>
                <span className="font-bold text-[#181c1b]">Drs. H. Mulyadi, M.Pd</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#f1f4f2]">
                <span className="text-[#51625a]">Kurikulum Implementasi:</span>
                <span className="font-medium text-[#181c1b]">Kurikulum Merdeka (KBM Digital)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xs border border-[#bec9c2]/40 p-5 space-y-4">
            <span className="font-bold text-[15px] text-[#181c1b]">Status Sinkronisasi Dapodik</span>
            <div className="p-4 bg-[#f1f4f2] rounded-xl space-y-2 text-[12px]">
              <div className="flex items-center gap-2 text-[#00513c] font-bold">
                <span className="material-symbols-outlined text-[18px]">cloud_done</span>
                <span>Terhubung ke Dapodik Kemendikbudristek V.2024.c</span>
              </div>
              <p className="text-[#3f4944] leading-relaxed">
                Database SIPAGU tersinkronisasi otomatis dengan server pusat kementerian setiap 24 jam untuk pembagian rombel, NUPTK guru aktif, dan penugasan kurikulum.
              </p>
              <div className="pt-1 text-[#51625a] font-mono text-[11px]">
                Sinkronisasi Terakhir: Hari ini, pukul 03.54 WIB
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rombel' && (
        <div className="bg-white rounded-xl shadow-xs border border-[#bec9c2]/40 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#bec9c2]/30">
            <span className="font-bold text-[15px] text-[#181c1b]">Daftar Rombongan Belajar (Rombel) Aktif</span>
            <span className="text-[12px] text-[#51625a]">Total 18 Kelas</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[13px]">
            <div className="p-3 rounded-lg bg-[#f1f4f2] border border-[#bec9c2]/30">
              <span className="font-bold text-[#00513c]">Kelas X (Fase E)</span>
              <p className="text-[12px] text-[#51625a] mt-1">X-1 s.d. X-6 (216 Siswa)</p>
            </div>
            <div className="p-3 rounded-lg bg-[#f1f4f2] border border-[#bec9c2]/30">
              <span className="font-bold text-[#00513c]">Kelas XI (Fase F)</span>
              <p className="text-[12px] text-[#51625a] mt-1">XI MIPA 1-3, XI IPS 1-2, XI Bahasa (214 Siswa)</p>
            </div>
            <div className="p-3 rounded-lg bg-[#f1f4f2] border border-[#bec9c2]/30">
              <span className="font-bold text-[#00513c]">Kelas XII (Fase F Lanjutan)</span>
              <p className="text-[12px] text-[#51625a] mt-1">XII MIPA 1-3, XII IPS 1-2, XII Bahasa (210 Siswa)</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ruang' && (
        <div className="bg-white rounded-xl shadow-xs border border-[#bec9c2]/40 overflow-hidden space-y-3 p-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#bec9c2]/30">
            <span className="font-bold text-[15px] text-[#181c1b]">Daftar Sarana Ruang Kelas &amp; Lab</span>
            <button
              onClick={() => setIsAddRoomOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-[#00513c] text-white text-[12px] font-semibold flex items-center gap-1 shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Tambah Ruangan</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="bg-[#f1f4f2] text-[#51625a] text-[11px] uppercase tracking-wider font-semibold border-b border-[#bec9c2]/40">
                  <th className="py-2.5 px-3">Kode Ruang</th>
                  <th className="py-2.5 px-3">Nama Ruangan</th>
                  <th className="py-2.5 px-3">Jenis Fasilitas</th>
                  <th className="py-2.5 px-3 text-center">Kapasitas</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ebefed]">
                {rooms.map((r) => (
                  <tr key={r.id} className="hover:bg-[#f7faf8]">
                    <td className="py-3 px-3 font-mono font-bold text-[#00513c]">{r.code}</td>
                    <td className="py-3 px-3 font-semibold text-[#181c1b]">{r.name}</td>
                    <td className="py-3 px-3 text-[#51625a]">{r.type}</td>
                    <td className="py-3 px-3 text-center font-bold text-[#181c1b]">{r.capacity} Kursi</td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#d4e7dd] text-[#00513c] text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00513c]"></span>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isAddRoomOpen && (
            <div className="p-4 bg-[#f1f4f2] rounded-xl border border-[#bec9c2]/40 mt-3 space-y-3">
              <span className="font-bold text-[13px] text-[#181c1b]">Tambah Ruangan Baru</span>
              <form onSubmit={handleAddRoom} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Kode (contoh: R.305)"
                  value={newRoomCode}
                  onChange={(e) => setNewRoomCode(e.target.value)}
                  className="bg-white rounded-lg px-3 py-1.5 text-[13px] border border-[#bec9c2]/50"
                />
                <input
                  type="text"
                  required
                  placeholder="Nama Ruangan (contoh: Lab Biologi)"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  className="bg-white rounded-lg px-3 py-1.5 text-[13px] border border-[#bec9c2]/50"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#00513c] text-white rounded-lg text-[12px] font-semibold"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddRoomOpen(false)}
                    className="px-3 py-1.5 bg-white border border-[#bec9c2]/50 rounded-lg text-[12px]"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
