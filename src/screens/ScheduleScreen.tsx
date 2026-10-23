import React, { useState } from 'react';
import { ScheduleSlot } from '../types';

interface ScheduleScreenProps {
  schedule: ScheduleSlot[];
  onAddScheduleSlot: (slot: ScheduleSlot) => void;
}

export const ScheduleScreen: React.FC<ScheduleScreenProps> = ({
  schedule,
  onAddScheduleSlot,
}) => {
  const [selectedDay, setSelectedDay] = useState<'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat'>('Senin');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New slot form state
  const [period, setPeriod] = useState(1);
  const [time, setTime] = useState('07.00 - 07.45');
  const [className, setClassName] = useState('X-MIPA 1');
  const [room, setRoom] = useState('R.301');
  const [subject, setSubject] = useState('Biologi Sel');
  const [teacherName, setTeacherName] = useState('Fitri Handayani, S.Pd');

  const days: Array<'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat'> = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
  ];

  const currentSlots = schedule.filter((s) => s.day === selectedDay);

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlot: ScheduleSlot = {
      id: `sch-${Date.now()}`,
      day: selectedDay,
      period,
      time,
      className,
      room,
      subject,
      teacherName,
      teacherId: 'usr-new',
    };
    onAddScheduleSlot(newSlot);
    setIsAddModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[12px] text-[#51625a] mb-1">
            <span className="hover:text-[#00513c] transition-colors cursor-pointer">Beranda</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#00513c] font-semibold">Manajemen Jadwal Pembelajaran</span>
          </nav>
          <h1 className="text-[26px] lg:text-[30px] leading-[36px] text-[#181c1b] tracking-tight font-bold">
            Manajemen Jadwal Pembelajaran
          </h1>
          <p className="text-[14px] text-[#3f4944] max-w-4xl mt-0.5">
            Pengaturan alokasi jam pelajaran (JP), pembagian ruang kelas, serta penugasan rombel pendidik SMAN 1 Jakarta Semester Gasal.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-lg bg-[#00513c] hover:bg-[#176b52] text-white text-[13px] font-semibold flex items-center gap-2 shadow-xs transition-colors flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Tambah Jadwal Sesi</span>
        </button>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-[#bec9c2]/40 pb-2 overflow-x-auto">
        {days.map((day) => {
          const isSelected = selectedDay === day;
          const count = schedule.filter((s) => s.day === day).length;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                isSelected
                  ? 'bg-[#00513c] text-white shadow-xs'
                  : 'bg-white text-[#3f4944] hover:bg-[#f1f4f2] border border-[#bec9c2]/40'
              }`}
            >
              <span>{day}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isSelected ? 'bg-white/20 text-white' : 'bg-[#ebefed] text-[#51625a]'}`}>
                {count} sesi
              </span>
            </button>
          );
        })}
      </div>

      {/* Schedule Grid */}
      <div className="bg-white rounded-xl shadow-xs border border-[#bec9c2]/40 overflow-hidden">
        <div className="p-4 bg-[#f1f4f2] border-b border-[#bec9c2]/40 flex items-center justify-between">
          <span className="text-[13px] font-bold text-[#181c1b]">
            Jadwal Mengajar Hari {selectedDay}
          </span>
          <span className="text-[12px] text-[#51625a]">
            {currentSlots.length} sesi terdaftar
          </span>
        </div>

        {currentSlots.length === 0 ? (
          <div className="p-12 text-center text-[#51625a]">
            <span className="material-symbols-outlined text-[36px] text-[#bec9c2] mb-2">
              event_busy
            </span>
            <p className="font-semibold text-[14px]">Belum ada jadwal sesi untuk hari {selectedDay}</p>
            <p className="text-[12px] mt-1">Klik "Tambah Jadwal Sesi" di atas untuk menambahkan slot pelajaran baru.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="bg-white text-[#51625a] uppercase font-semibold text-[11px] tracking-wider border-b border-[#bec9c2]/40">
                  <th className="py-3 px-4 w-16 text-center">Jam Ke</th>
                  <th className="py-3 px-4">Waktu</th>
                  <th className="py-3 px-4">Kelas &amp; Ruangan</th>
                  <th className="py-3 px-4">Mata Pelajaran</th>
                  <th className="py-3 px-4">Pendidik / Guru Pengampu</th>
                  <th className="py-3 px-4 text-center">Status Presensi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ebefed]">
                {currentSlots.map((slot) => (
                  <tr key={slot.id} className="hover:bg-[#f7faf8] transition-colors">
                    <td className="py-3 px-4 text-center font-bold text-[#00513c]">
                      {slot.period}
                    </td>
                    <td className="py-3 px-4 font-mono text-[#51625a]">
                      {slot.time}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#181c1b]">{slot.className}</div>
                      <div className="text-[11px] text-[#51625a]">{slot.room}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-[#181c1b]">
                      {slot.subject}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#00513c]">{slot.teacherName}</div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#d4e7dd] text-[#00513c] text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00513c]"></span>
                        Terjadwal
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Add Slot */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden border border-[#bec9c2]/50">
            <div className="p-4 bg-[#f1f4f2] border-b border-[#bec9c2]/40 flex items-center justify-between">
              <h3 className="font-bold text-[16px] text-[#181c1b]">Tambah Slot Jadwal Baru</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#51625a] hover:bg-[#e0e3e1]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddSlot} className="p-5 space-y-3">
              <div>
                <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                  Hari
                </label>
                <div className="p-2 bg-[#f1f4f2] rounded-lg text-[13px] font-bold text-[#00513c]">
                  {selectedDay}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                    Jam Ke (Period)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={period}
                    onChange={(e) => setPeriod(Number(e.target.value))}
                    className="w-full bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] border border-[#bec9c2]/50"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                    Rentang Waktu
                  </label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] border border-[#bec9c2]/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                    Kelas Rombel
                  </label>
                  <input
                    type="text"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="w-full bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] border border-[#bec9c2]/50"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                    Ruangan
                  </label>
                  <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="w-full bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] border border-[#bec9c2]/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                  Mata Pelajaran
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] border border-[#bec9c2]/50"
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold text-[#181c1b] block mb-1">
                  Pendidik / Guru Pengampu
                </label>
                <input
                  type="text"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="w-full bg-[#f1f4f2] rounded-lg px-3 py-2 text-[13px] border border-[#bec9c2]/50"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white border border-[#bec9c2]/50 text-[13px] text-[#181c1b]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#00513c] text-white text-[13px] font-semibold"
                >
                  Simpan Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
