import React, { useState } from 'react';
import { AuditLogItem } from '../types';

interface AuditLogModalProps {
  logs: AuditLogItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const AuditLogModal: React.FC<AuditLogModalProps> = ({
  logs,
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'normal' | 'warning' | 'error'>('all');

  if (!isOpen) return null;

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterSeverity === 'all' || log.severity === filterSeverity;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl overflow-hidden border border-[#bec9c2]/50">
        {/* Modal Header */}
        <div className="p-5 bg-[#f1f4f2] flex items-start justify-between border-b border-[#bec9c2]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white text-[#00513c] flex items-center justify-center shadow-xs border border-[#bec9c2]/40">
              <span className="material-symbols-outlined text-[22px]">security_update_good</span>
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="text-[18px] font-bold text-[#181c1b] leading-tight">
                Log Audit Keamanan Akun
              </h3>
              <span className="text-[12px] text-[#51625a]">
                Rekaman Aktivitas Autentikasi 7 Hari Terakhir
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

        {/* Filter controls */}
        <div className="p-4 bg-white border-b border-[#bec9c2]/30 flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#51625a]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari dalam log audit..."
              className="w-full bg-[#f1f4f2] rounded-lg pl-9 pr-3 py-1.5 text-[13px] text-[#181c1b] placeholder:text-[#6f7974] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00513c] border border-[#bec9c2]/50"
            />
          </div>
          <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setFilterSeverity('all')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold whitespace-nowrap ${
                filterSeverity === 'all'
                  ? 'bg-[#00513c] text-white'
                  : 'bg-[#f1f4f2] text-[#3f4944] hover:bg-[#ebefed]'
              }`}
            >
              Semua ({logs.length})
            </button>
            <button
              onClick={() => setFilterSeverity('warning')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold whitespace-nowrap ${
                filterSeverity === 'warning'
                  ? 'bg-[#74332e] text-white'
                  : 'bg-[#f1f4f2] text-[#74332e] hover:bg-[#ffdad6]'
              }`}
            >
              Peringatan
            </button>
            <button
              onClick={() => setFilterSeverity('error')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold whitespace-nowrap ${
                filterSeverity === 'error'
                  ? 'bg-[#ba1a1a] text-white'
                  : 'bg-[#f1f4f2] text-[#ba1a1a] hover:bg-[#ffdad6]'
              }`}
            >
              Kritikal / Blokir
            </button>
          </div>
        </div>

        {/* Modal List */}
        <div className="p-5 max-h-96 overflow-y-auto divide-y divide-[#ebefed]">
          {filteredLogs.length === 0 ? (
            <div className="py-8 text-center text-[#51625a] text-[13px]">
              Tidak ada catatan audit yang cocok dengan kriteria pencarian.
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div key={log.id} className="py-3 flex items-start justify-between gap-3 hover:bg-[#f7faf8] px-2 rounded transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-lg bg-[#f1f4f2] ${log.iconColor} flex-shrink-0 mt-0.5`}>
                    <span className="material-symbols-outlined text-[18px]">{log.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-[#181c1b]">
                      {log.title}
                    </span>
                    <span className="text-[12px] text-[#51625a] mt-0.5">
                      {log.description}
                    </span>
                    <span className="text-[10px] text-[#6f7974] mt-0.5 font-mono">
                      {log.timestamp}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-[#51625a] font-medium flex-shrink-0">
                  {log.timeAgo}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#f1f4f2] flex items-center justify-between border-t border-[#bec9c2]/40">
          <div className="flex items-center gap-1.5 text-[11px] text-[#51625a]">
            <span className="material-symbols-outlined text-[16px] text-[#00513c]">verified</span>
            <span>Tersimpan dalam enkripsi immutable ledger</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#00513c] text-white text-[13px] font-semibold hover:bg-[#176b52] transition-colors shadow-xs"
          >
            Tutup Riwayat
          </button>
        </div>
      </div>
    </div>
  );
};
