import React, { useState } from 'react';
import { LeaveRequest, UserRole } from '../types';

interface LeaveScreenProps {
  requests: LeaveRequest[];
  activeRole: UserRole;
  onApproveLeave: (id: string) => void;
  onRejectLeave: (id: string) => void;
  onSubmitLeave: (request: LeaveRequest) => void;
}

export const LeaveScreen: React.FC<LeaveScreenProps> = ({
  requests,
  activeRole,
  onApproveLeave,
  onRejectLeave,
  onSubmitLeave,
}) => {
  const [filter, setFilter] = useState<'all' | 'Menunggu Persetujuan' | 'Disetujui' | 'Ditolak'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New leave form state
  const [teacherName, setTeacherName] = useState('Ahmad Riyadi, M.Kom');
  const [nip, setNip] = useState('198509142010011012');
  const [type, setType] = useState<LeaveRequest['type']>('Dinas Luar / Seminar');
  const [startDate, setStartDate] = useState('28 Okt 2024');
  const [endDate, setEndDate] = useState('29 Okt 2024');
  const [durationDays, setDurationDays] = useState(2);
  const [reason, setReason] = useState('Pelatihan Implementasi Kurikulum Merdeka');
  const [documentRef, setDocumentRef] = useState('Surat_Tugas_Dinas.pdf');

  const filtered = requests.filter((r) => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: LeaveRequest = {
      id: `lv-${Date.now()}`,
      teacherName,
      nip,
      type,
      startDate,
      endDate,
      durationDays,
      reason,
      documentRef,
      status: 'Menunggu Persetujuan',
    };
    onSubmitLeave(newReq);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[12px] text-[#51625a] mb-1">
            <span className="hover:text-[#00513c] transition-colors cursor-pointer">Beranda</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#00513c] font-semibold">Pengajuan Izin &amp; Dispensasi Pendidik</span>
          </nav>
          <h1 className="text-[26px] lg:text-[30px] leading-[36px] text-[#181c1b] tracking-tight font-bold">
            Pengajuan Izin &amp; Surat Tugas
          </h1>
          <p className="text-[14px] text-[#3f4944] max-w-4xl mt-0.5">
            Layanan administrasi perizinan dinas luar, cuti sakit, dan penugasan belajar guru dengan validasi digital Kepala Sekolah.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-lg bg-[#00513c] hover:bg-[#176b52] text-white text-[13px] font-semibold flex items-center gap-2 shadow-xs transition-colors flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add_task</span>
          <span>Ajukan Izin / Surat Tugas</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-[#bec9c2]/40 pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all ${
            filter === 'all'
              ? 'bg-[#00513c] text-white shadow-xs'
              : 'bg-white text-[#3f4944] hover:bg-[#f1f4f2] border border-[#bec9c2]/40'
          }`}
        >
          Semua Pengajuan ({requests.length})
        </button>
        <button
          onClick={() => setFilter('Menunggu Persetujuan')}
          className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all ${
            filter === 'Menunggu Persetujuan'
              ? 'bg-[#74332e] text-white shadow-xs'
              : 'bg-white text-[#74332e] hover:bg-[#ffdad6] border border-[#bec9c2]/40'
          }`}
        >
          Menunggu Validasi ({requests.filter((r) => r.status === 'Menunggu Persetujuan').length})
        </button>
        <button
          onClick={() => setFilter('Disetujui')}
          className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all ${
            filter === 'Disetujui'
              ? 'bg-[#00513c] text-white shadow-xs'
              : 'bg-white text-[#00513c] hover:bg-[#d4e7dd] border border-[#bec9c2]/40'
          }`}
        >
          Disetujui ({requests.filter((r) => r.status === 'Disetujui').length})
        </button>
      </div>

      {/* Leave List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-xl shadow-xs border border-[#bec9c2]/40 p-5 space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold text-[#51625a] uppercase tracking-wider">
                    {req.type}
                  </span>
                  <h3 className="text-[16px] font-bold text-[#181c1b] mt-0.5">
                    {req.teacherName}
                  </h3>
                  <span className="text-[12px] text-[#51625a] font-mono">
                    NIP. {req.nip}
                  </span>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                    req.status === 'Disetujui'
                      ? 'bg-[#d4e7dd] text-[#00513c]'
                      : req.status === 'Ditolak'
                      ? 'bg-[#ffdad6] text-[#ba1a1a]'
                      : 'bg-[#ffdad6] text-[#74332e]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {req.status === 'Disetujui' ? 'check' : 'pending'}
                  </span>
                  {req.status}
                </span>
              </div>

              <div className="mt-3 p-3 bg-[#f1f4f2] rounded-lg text-[12px] text-[#3f4944] space-y-1">
                <div>
                  <strong>Periode:</strong> {req.startDate} s.d. {req.endDate} ({req.durationDays} hari)
                </div>
                <div>
                  <strong>Alasan:</strong> {req.reason}
                </div>
                {req.documentRef && (
                  <div className="flex items-center gap-1.5 text-[#00513c] font-semibold pt-1">
                    <span className="material-symbols-outlined text-[16px]">attach_file</span>
                    <span>Lampiran: {req.documentRef}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions for Kepsek */}
            {req.status === 'Menunggu Persetujuan' && activeRole === 'kepsek' && (
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#ebefed]">
                <button
                  type="button"
                  onClick={() => onRejectLeave(req.id)}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#ffdad6] text-[#ba1a1a] text-[12px] font-semibold border border-[#bec9c2]/50 transition-colors"
                >
                  Tolak
                </button>
                <button
                  type="button"
                  onClick={() => onApproveLeave(req.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#00513c] hover:bg-[#176b52] text-white text-[12px] font-semibold flex items-center gap-1 shadow-xs transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Setujui Permohonan</span>
                </button>
              </div>
            )}
            {req.reviewedBy && (
              <div className="text-[11px] text-[#51625a] italic text-right">
                Ditinjau oleh {req.reviewedBy} pada {req.reviewedAt}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden border border-[#bec9c2]/50">
            <div className="p-4 bg-[#f1f4f2] border-b border-[#bec9c2]/40 flex items-center justify-between">
              <h3 className="font-bold text-[16px] text-[#181c1b]">
                Formulir Pengajuan Izin / Dispensasi
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#51625a] hover:bg-[#e0e3e1]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                    Nama Pendidik
                  </label>
                  <input
                    type="text"
                    required
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="w-full bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] border border-[#bec9c2]/50"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                    NIP / NUPTK
                  </label>
                  <input
                    type="text"
                    required
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                    className="w-full bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] border border-[#bec9c2]/50 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                  Jenis Dispensasi / Cuti
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] border border-[#bec9c2]/50"
                >
                  <option value="Dinas Luar / Seminar">Dinas Luar / Seminar</option>
                  <option value="Cuti Sakit">Cuti Sakit</option>
                  <option value="Tugas Belajar">Tugas Belajar</option>
                  <option value="Cuti Melahirkan">Cuti Melahirkan</option>
                  <option value="Keperluan Penting">Keperluan Penting</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                    Mulai
                  </label>
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] border border-[#bec9c2]/50"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                    Selesai
                  </label>
                  <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] border border-[#bec9c2]/50"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                    Durasi (Hari)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] border border-[#bec9c2]/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                  Alasan / Keterangan Penugasan
                </label>
                <textarea
                  required
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] border border-[#bec9c2]/50"
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                  Nama Berkas Lampiran (SK / Surat Dokter)
                </label>
                <input
                  type="text"
                  value={documentRef}
                  onChange={(e) => setDocumentRef(e.target.value)}
                  className="w-full bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] border border-[#bec9c2]/50"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white border border-[#bec9c2]/50 text-[13px]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#00513c] text-white text-[13px] font-semibold"
                >
                  Kirim Pengajuan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
