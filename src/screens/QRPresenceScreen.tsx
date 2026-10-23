import React, { useState, useEffect } from 'react';
import { TeachingJournal } from '../types';

interface QRPresenceScreenProps {
  onJournalSubmit: (journal: TeachingJournal) => void;
}

export const QRPresenceScreen: React.FC<QRPresenceScreenProps> = ({
  onJournalSubmit,
}) => {
  const [selectedRoom, setSelectedRoom] = useState('R.302 - Laboratorium Kimia');
  const [selectedClass, setSelectedClass] = useState('XI-MIPA 2');
  const [selectedSubject, setSelectedSubject] = useState('Kimia Dasar & Praktikum');
  const [timeLeft, setTimeLeft] = useState(30);
  const [qrToken, setQrToken] = useState('SIPAGU-TOTP-82914-R302');
  const [scanSuccess, setScanSuccess] = useState(false);
  const [scannedTeacherName, setScannedTeacherName] = useState('Dra. Hj. Nurul Hidayah, M.Pd');

  // Journal form state
  const [materialTaught, setMaterialTaught] = useState('Reaksi Asam Basa dan Indikator Fenolftalein (PP)');
  const [studentsPresent, setStudentsPresent] = useState(34);
  const [studentsTotal, setStudentsTotal] = useState(36);
  const [notes, setNotes] = useState('2 siswa izin sakit (surat resmi terlampir ke wali kelas)');
  const [journalSaved, setJournalSaved] = useState(false);

  // Rotating QR code effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const newToken = `SIPAGU-TOTP-${Math.floor(10000 + Math.random() * 90000)}-${selectedRoom.split(' ')[0]}`;
          setQrToken(newToken);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedRoom]);

  const handleSimulateScan = () => {
    setScanSuccess(true);
    setJournalSaved(false);
  };

  const handleSaveJournal = (e: React.FormEvent) => {
    e.preventDefault();
    const newJournal: TeachingJournal = {
      id: `jrn-${Date.now()}`,
      teacherId: 'usr-1',
      teacherName: scannedTeacherName,
      classroom: selectedRoom,
      subject: selectedSubject,
      date: 'Hari ini',
      startTime: '08.00',
      endTime: '09.30',
      studentsPresent,
      studentsTotal,
      materialTaught,
      notes,
      verifiedByKepsek: false,
      qrToken,
    };
    onJournalSubmit(newJournal);
    setJournalSaved(true);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Title */}
      <div>
        <nav className="flex items-center gap-2 text-[12px] text-[#51625a] mb-1">
          <span className="hover:text-[#00513c] transition-colors cursor-pointer">Beranda</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#00513c] font-semibold">Presensi QR Kelas &amp; Jurnal Mengajar</span>
        </nav>
        <h1 className="text-[26px] lg:text-[30px] leading-[36px] text-[#181c1b] tracking-tight font-bold">
          Presensi QR Kelas &amp; Jurnal Digital
        </h1>
        <p className="text-[14px] text-[#3f4944] max-w-4xl mt-0.5">
          Pendidik memindai QR dinamis terenkripsi di pintu ruang kelas untuk memvalidasi kehadiran fisik dan mengisi jurnal mengajar harian secara langsung.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: QR Code Display Generator */}
        <div className="lg:col-span-5 bg-white rounded-xl shadow-xs border border-[#bec9c2]/40 p-5 flex flex-col items-center text-center space-y-4">
          <div className="w-full text-left pb-3 border-b border-[#bec9c2]/30 flex items-center justify-between">
            <span className="text-[14px] font-bold text-[#181c1b]">Kode QR Ruang Kelas</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#d4e7dd] text-[#00513c] text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00513c] animate-pulse"></span>
              Anti-Titip Absen
            </span>
          </div>

          {/* Room Selector */}
          <div className="w-full space-y-2 text-left">
            <label className="text-[12px] font-semibold text-[#181c1b]">
              Pilih Ruang / Laboratorium
            </label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="w-full bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] text-[#181c1b] border border-[#bec9c2]/50 font-medium focus:outline-none focus:ring-1 focus:ring-[#00513c]"
            >
              <option value="R.302 - Laboratorium Kimia">R.302 - Laboratorium Kimia</option>
              <option value="R.301 - Ruang Kelas X MIPA 1">R.301 - Ruang Kelas X MIPA 1</option>
              <option value="Lab Komputer 2">Lab Komputer 2</option>
              <option value="R.304 - Ruang Kelas XI MIPA 1">R.304 - Ruang Kelas XI MIPA 1</option>
              <option value="Lab Bahasa 1">Lab Bahasa 1</option>
            </select>
          </div>

          {/* Interactive QR SVG */}
          <div className="p-4 bg-white rounded-2xl shadow-md border-2 border-[#00513c]/20 relative">
            <svg
              className="w-56 h-56 mx-auto"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Corner markers */}
              <rect x="10" y="10" width="50" height="50" fill="#00513c" rx="8" />
              <rect x="18" y="18" width="34" height="34" fill="#ffffff" rx="4" />
              <rect x="24" y="24" width="22" height="22" fill="#00513c" rx="2" />

              <rect x="140" y="10" width="50" height="50" fill="#00513c" rx="8" />
              <rect x="148" y="18" width="34" height="34" fill="#ffffff" rx="4" />
              <rect x="154" y="24" width="22" height="22" fill="#00513c" rx="2" />

              <rect x="10" y="140" width="50" height="50" fill="#00513c" rx="8" />
              <rect x="18" y="148" width="34" height="34" fill="#ffffff" rx="4" />
              <rect x="24" y="154" width="22" height="22" fill="#00513c" rx="2" />

              {/* Data matrix pattern */}
              <rect x="70" y="20" width="16" height="16" fill="#176b52" />
              <rect x="94" y="20" width="16" height="16" fill="#00513c" />
              <rect x="118" y="20" width="14" height="14" fill="#176b52" />
              <rect x="70" y="44" width="20" height="20" fill="#00513c" />
              <rect x="100" y="44" width="14" height="14" fill="#176b52" />

              <rect x="20" y="70" width="20" height="20" fill="#00513c" />
              <rect x="48" y="70" width="14" height="14" fill="#176b52" />
              <rect x="70" y="70" width="24" height="24" fill="#00513c" />
              <rect x="102" y="70" width="18" height="18" fill="#176b52" />
              <rect x="130" y="70" width="20" height="20" fill="#00513c" />
              <rect x="160" y="70" width="24" height="24" fill="#176b52" />

              <rect x="20" y="98" width="16" height="16" fill="#176b52" />
              <rect x="44" y="98" width="20" height="20" fill="#00513c" />
              <rect x="72" y="100" width="20" height="20" fill="#176b52" />
              <rect x="100" y="98" width="28" height="28" fill="#00513c" />
              <rect x="136" y="98" width="16" height="16" fill="#176b52" />
              <rect x="160" y="98" width="20" height="20" fill="#00513c" />

              <rect x="20" y="122" width="22" height="22" fill="#00513c" />
              <rect x="70" y="128" width="20" height="20" fill="#176b52" />
              <rect x="98" y="134" width="18" height="18" fill="#00513c" />
              <rect x="124" y="126" width="22" height="22" fill="#176b52" />
              <rect x="154" y="126" width="24" height="24" fill="#00513c" />

              <rect x="70" y="156" width="18" height="18" fill="#00513c" />
              <rect x="96" y="160" width="24" height="24" fill="#176b52" />
              <rect x="130" y="156" width="20" height="20" fill="#00513c" />
              <rect x="160" y="160" width="18" height="18" fill="#176b52" />

              {/* Center icon badge */}
              <circle cx="100" cy="100" r="16" fill="#ffffff" />
              <circle cx="100" cy="100" r="13" fill="#00513c" />
              <text
                x="100"
                y="104"
                fontSize="11"
                fontWeight="bold"
                fill="#ffffff"
                textAnchor="middle"
              >
                SPG
              </text>
            </svg>
          </div>

          {/* Countdown & Rotating Hash */}
          <div className="w-full space-y-1.5">
            <div className="flex justify-between text-[11px] text-[#51625a]">
              <span>Hash Otentikasi Dinamis:</span>
              <span className="font-mono font-bold text-[#00513c]">{timeLeft} detik tersisa</span>
            </div>
            <div className="w-full h-1.5 bg-[#f1f4f2] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00513c] transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              ></div>
            </div>
            <div className="text-[11px] font-mono text-[#51625a] bg-[#f1f4f2] py-1 px-2 rounded truncate">
              Token: {qrToken}
            </div>
          </div>

          {/* Simulator Button */}
          <button
            onClick={handleSimulateScan}
            type="button"
            className="w-full py-2.5 rounded-lg bg-[#00513c] hover:bg-[#176b52] text-white text-[13px] font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">cell_tower</span>
            <span>Simulasi Pindai QR di Ruang Kelas</span>
          </button>
        </div>

        {/* Right Column: Scan Result & Journal Form */}
        <div className="lg:col-span-7 bg-white rounded-xl shadow-xs border border-[#bec9c2]/40 p-5 space-y-4">
          <div className="pb-3 border-b border-[#bec9c2]/30 flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#181c1b]">
              Log Presensi &amp; Jurnal Mengajar Digital
            </h2>
            <span className="text-[12px] text-[#51625a]">Format Standar Permendikbud</span>
          </div>

          {scanSuccess ? (
            <div className="p-3.5 rounded-lg bg-[#d4e7dd]/60 border border-[#00513c]/30 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#00513c] text-white flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">check</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-bold text-[#00513c]">
                  Presensi Berhasil Divalidasi!
                </span>
                <span className="text-[12px] text-[#0f1f19]">
                  {scannedTeacherName} • {selectedRoom} • Pukul 07.02 WIB (Tepat Waktu)
                </span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-[#f1f4f2] text-center border border-[#bec9c2]/30 text-[#51625a] text-[13px]">
              <span className="material-symbols-outlined text-[28px] text-[#51625a] mb-1">
                qr_code_scanner
              </span>
              <p>Klik tombol <strong>"Simulasi Pindai QR di Ruang Kelas"</strong> di sebelah kiri untuk mencoba alur presensi guru.</p>
            </div>
          )}

          {/* Journal Form */}
          <form onSubmit={handleSaveJournal} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                  Kelas Rombel
                </label>
                <input
                  type="text"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] text-[#181c1b] border border-[#bec9c2]/50 font-medium"
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                  Mata Pelajaran
                </label>
                <input
                  type="text"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] text-[#181c1b] border border-[#bec9c2]/50 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                  Jumlah Siswa Hadir di Kelas
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={studentsPresent}
                    onChange={(e) => setStudentsPresent(Number(e.target.value))}
                    className="w-full bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] text-[#181c1b] border border-[#bec9c2]/50 font-medium"
                  />
                  <span className="text-[13px] text-[#51625a]">dari {studentsTotal} siswa</span>
                </div>
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                  Nama Pendidik
                </label>
                <input
                  type="text"
                  value={scannedTeacherName}
                  onChange={(e) => setScannedTeacherName(e.target.value)}
                  className="w-full bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] text-[#181c1b] border border-[#bec9c2]/50 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                Materi Pokok Bahasan yang Diajarkan <span className="text-[#ba1a1a]">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={materialTaught}
                onChange={(e) => setMaterialTaught(e.target.value)}
                className="w-full bg-[#f1f4f2] rounded-lg px-3.5 py-2 text-[13px] text-[#181c1b] border border-[#bec9c2]/50 focus:outline-none focus:bg-white"
                placeholder="Rangkuman materi atau topik praktikum hari ini..."
              />
            </div>

            <div>
              <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                Catatan Kejadian Khusus / Kendala
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#f1f4f2] rounded-lg px-3.5 py-2 text-[13px] text-[#181c1b] border border-[#bec9c2]/50"
                placeholder="Contoh: Proyektor bermasalah, siswa izin rapat OSIS..."
              />
            </div>

            {journalSaved && (
              <div className="p-3 rounded-lg bg-[#d4e7dd] text-[#00513c] text-[12px] font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Jurnal mengajar berhasil disimpan dan dialirkan ke antrean audit Kepala Sekolah!</span>
              </div>
            )}

            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg bg-[#00513c] hover:bg-[#176b52] text-white text-[13px] font-semibold flex items-center gap-2 shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">save_as</span>
              <span>Kirim Jurnal Mengajar</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
