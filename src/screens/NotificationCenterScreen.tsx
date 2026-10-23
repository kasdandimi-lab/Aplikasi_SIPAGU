import React, { useState } from 'react';

export const NotificationCenterScreen: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'kbm' | 'izin' | 'keamanan'>('all');
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'kbm',
      title: 'Presensi QR R.302 Berhasil Divalidasi',
      description: 'Dra. Hj. Nurul Hidayah telah memindai presensi di Lab Kimia (34/36 siswa hadir).',
      time: '10 menit lalu',
      isUnread: true,
      icon: 'verified_user',
      color: 'text-[#00513c] bg-[#d4e7dd]',
    },
    {
      id: '2',
      type: 'izin',
      title: 'Pengajuan Dispensasi Baru Memerlukan Persetujuan',
      description: 'Ahmad Riyadi, M.Kom mengajukan permohonan dinas luar narasumber bimtek kementerian 25-26 Oktober.',
      time: '35 menit lalu',
      isUnread: true,
      icon: 'assignment',
      color: 'text-[#74332e] bg-[#ffdad6]',
    },
    {
      id: '3',
      type: 'kbm',
      title: 'Jurnal Mengajar Selesai Dicatat',
      description: 'Siti Rahmawati, S.Pd mengunggah jurnal Fisika Gelombang Kelas XI MIPA 1.',
      time: '1 jam lalu',
      isUnread: false,
      icon: 'check_circle',
      color: 'text-[#00513c] bg-[#d4e7dd]',
    },
    {
      id: '4',
      type: 'keamanan',
      title: 'Sinkronisasi Gateway Dapodik Sukses',
      description: '48 NUPTK guru aktif dan 12 data rombel terverifikasi Kemendikbudristek.',
      time: '2 jam lalu',
      isUnread: false,
      icon: 'cloud_done',
      color: 'text-[#00513c] bg-[#d4e7dd]',
    },
    {
      id: '5',
      type: 'keamanan',
      title: 'Percobaan Login Gagal Dipantau',
      description: 'Terdeteksi 1x salah sandi dari IP 192.168.1.42 (aman, tidak melanggar batas lockout 5x).',
      time: 'Kemarin',
      isUnread: false,
      icon: 'security',
      color: 'text-[#51625a] bg-[#f1f4f2]',
    },
  ]);

  const filtered = notifications.filter((n) => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[12px] text-[#51625a] mb-1">
            <span className="hover:text-[#00513c] transition-colors cursor-pointer">Pengaturan &amp; Data</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#00513c] font-semibold">Pusat Notifikasi</span>
          </nav>
          <h1 className="text-[26px] lg:text-[30px] leading-[36px] text-[#181c1b] tracking-tight font-bold">
            Pusat Notifikasi &amp; Peringatan Sistem
          </h1>
          <p className="text-[14px] text-[#3f4944] max-w-4xl mt-0.5">
            Pemberitahuan waktu nyata seputar presensi kelas, pengajuan cuti pendidik, sinkronisasi Dapodik, dan keamanan sistem SIPAGU.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={markAllRead}
            className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#f1f4f2] text-[#00513c] text-[13px] font-semibold border border-[#bec9c2]/50 transition-colors shadow-xs"
          >
            Tandai Semua Dibaca
          </button>
          <button
            onClick={clearNotifications}
            className="px-3.5 py-2 rounded-lg bg-[#f1f4f2] hover:bg-[#ffdad6] text-[#ba1a1a] text-[13px] font-semibold border border-[#bec9c2]/50 transition-colors"
          >
            Bersihkan Riwayat
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-[#bec9c2]/40 pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all ${
            filter === 'all'
              ? 'bg-[#00513c] text-white shadow-xs'
              : 'bg-white text-[#3f4944] hover:bg-[#f1f4f2] border border-[#bec9c2]/40'
          }`}
        >
          Semua ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('kbm')}
          className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all ${
            filter === 'kbm'
              ? 'bg-[#00513c] text-white shadow-xs'
              : 'bg-white text-[#3f4944] hover:bg-[#f1f4f2] border border-[#bec9c2]/40'
          }`}
        >
          Presensi &amp; KBM
        </button>
        <button
          onClick={() => setFilter('izin')}
          className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all ${
            filter === 'izin'
              ? 'bg-[#00513c] text-white shadow-xs'
              : 'bg-white text-[#3f4944] hover:bg-[#f1f4f2] border border-[#bec9c2]/40'
          }`}
        >
          Pengajuan Izin
        </button>
        <button
          onClick={() => setFilter('keamanan')}
          className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all ${
            filter === 'keamanan'
              ? 'bg-[#00513c] text-white shadow-xs'
              : 'bg-white text-[#3f4944] hover:bg-[#f1f4f2] border border-[#bec9c2]/40'
          }`}
        >
          Keamanan &amp; Dapodik
        </button>
      </div>

      {/* Notification List */}
      <div className="bg-white rounded-xl shadow-xs border border-[#bec9c2]/40 divide-y divide-[#ebefed] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-[#51625a]">
            <span className="material-symbols-outlined text-[36px] text-[#bec9c2] mb-1">
              notifications_off
            </span>
            <p className="font-semibold text-[14px]">Tidak ada pemberitahuan baru</p>
            <p className="text-[12px] text-[#6f7974] mt-0.5">Semua peringatan dan notifikasi telah ditandai dibaca.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`p-4 flex items-start justify-between gap-3 transition-colors ${
                item.isUnread ? 'bg-[#f7faf8]' : 'hover:bg-[#f7faf8]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[14px] text-[#181c1b]">{item.title}</span>
                    {item.isUnread && (
                      <span className="px-1.5 py-0.2 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold">
                        Baru
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-[#3f4944] mt-0.5 leading-relaxed">{item.description}</p>
                </div>
              </div>
              <span className="text-[11px] text-[#51625a] font-medium flex-shrink-0">{item.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
