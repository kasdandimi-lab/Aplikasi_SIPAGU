import React, { useState, useMemo } from 'react';
import { UserAccount, UserRole, SubjectCluster } from '../types';

interface AccountManagementScreenProps {
  users: UserAccount[];
  onOpenAuditLog: () => void;
  onOpenDapodikSync: () => void;
  onOpenAddUser: () => void;
  onOpenResetPassword: (user: UserAccount) => void;
  onOpenEditRole: (user: UserAccount) => void;
  onToggleUserStatus: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
}

export const AccountManagementScreen: React.FC<AccountManagementScreenProps> = ({
  users,
  onOpenAuditLog,
  onOpenDapodikSync,
  onOpenAddUser,
  onOpenResetPassword,
  onOpenEditRole,
  onToggleUserStatus,
  onDeleteUser,
}) => {
  const [selectedRoleTab, setSelectedRoleTab] = useState<'all' | UserRole>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended' | 'pending'>('all');
  const [clusterFilter, setClusterFilter] = useState<'all' | SubjectCluster>('all');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeMenuUserId, setActiveMenuUserId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // KPI Calculations
  const totalCount = users.length;
  const guruCount = users.filter((u) => u.roleCode === 'guru').length;
  const adminCount = users.filter((u) => u.roleCode === 'kurikulum').length;
  const kepsekCount = users.filter((u) => u.roleCode === 'kepsek').length;
  const activeCount = users.filter((u) => u.status === 'active').length;
  const suspendedCount = users.filter((u) => u.status === 'suspended').length;
  const pendingCount = users.filter((u) => u.status === 'pending').length;
  const needReviewCount = suspendedCount + pendingCount;
  const activePercent = totalCount > 0 ? ((activeCount / totalCount) * 100).toFixed(1) : '0';

  // Filter logic
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      // Role Tab
      if (selectedRoleTab !== 'all' && u.roleCode !== selectedRoleTab) return false;
      // Status Filter
      if (statusFilter !== 'all' && u.status !== statusFilter) return false;
      // Cluster Filter
      if (clusterFilter !== 'all' && u.cluster !== clusterFilter) return false;
      // Search Term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchName = u.name.toLowerCase().includes(query);
        const matchNip = u.nip.toLowerCase().includes(query);
        const matchEmail = u.email.toLowerCase().includes(query);
        const matchAssignment = u.assignment.toLowerCase().includes(query);
        if (!matchName && !matchNip && !matchEmail && !matchAssignment) return false;
      }
      return true;
    });
  }, [users, selectedRoleTab, statusFilter, clusterFilter, searchTerm]);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUserIds(filteredUsers.map((u) => u.id));
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleToggleSelectUser = (id: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setSelectedRoleTab('all');
    setSearchTerm('');
    setStatusFilter('all');
    setClusterFilter('all');
    setCurrentPage(1);
    showToast('Semua parameter pencarian dan filter telah direset.');
  };

  // Export CSV functionality
  const handleExportCSV = () => {
    const headers = ['ID', 'Nama Lengkap', 'NIP/NUPTK', 'Email', 'Peran', 'Rumpun Mapel', 'Penugasan', 'Status', '2FA'];
    const rows = filteredUsers.map((u) => [
      `"${u.id}"`,
      `"${u.name}"`,
      `"${u.nip}"`,
      `"${u.email}"`,
      `"${u.role}"`,
      `"${u.clusterLabel}"`,
      `"${u.assignment}"`,
      `"${u.statusLabel}"`,
      `"${u.twoFactorEnabled ? 'Aktif' : 'Nonaktif'}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SIPAGU_Data_Akun_Pengguna_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Ekspor CSV berhasil diunduh.');
  };

  const handleBatchInvite = () => {
    showToast(`Tautan aktivasi baru berhasil dikirimkan massal ke ${selectedUserIds.length > 0 ? selectedUserIds.length : 'semua'} akun pendidik.`);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#00513c] text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 text-[13px] font-medium border border-[#89d6b7]/30 animate-in fade-in slide-in-from-bottom duration-200">
          <span className="material-symbols-outlined text-[18px]">info</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation & Context Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col min-w-0">
          <nav className="flex items-center gap-2 text-[12px] text-[#51625a] mb-1">
            <span className="hover:text-[#00513c] transition-colors cursor-pointer">Beranda</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="hover:text-[#00513c] transition-colors cursor-pointer">Pengaturan Sistem</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#00513c] font-semibold">Manajemen Akun &amp; Pengguna</span>
          </nav>
          <h1 className="text-[26px] lg:text-[30px] leading-[36px] text-[#181c1b] tracking-tight font-bold">
            Manajemen Akun &amp; Hak Akses Pengguna
          </h1>
          <p className="text-[14px] text-[#3f4944] max-w-4xl mt-0.5 leading-relaxed">
            Kelola kredensial, peran pengguna (Guru, Admin Kurikulum, Kepala Sekolah), status akun aktif/nonaktif, serta protokol otentikasi terverifikasi standar Kemendikbudristek &amp; BSSN.
          </p>
        </div>

        {/* Action Buttons Area */}
        <div className="flex items-center flex-wrap gap-2.5 flex-shrink-0">
          <button
            onClick={onOpenAuditLog}
            type="button"
            className="px-4 py-2.5 rounded-lg bg-[#f1f4f2] hover:bg-[#e0e3e1] text-[#181c1b] text-[13px] font-semibold flex items-center gap-2 shadow-xs border border-[#bec9c2]/40 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-[#51625a]">history</span>
            <span>Log Audit</span>
          </button>
          <button
            onClick={onOpenDapodikSync}
            type="button"
            className="px-4 py-2.5 rounded-lg bg-white text-[#00513c] hover:bg-[#d4e7dd]/40 text-[13px] font-semibold flex items-center gap-2 shadow-xs border border-[#bec9c2]/50 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">cloud_sync</span>
            <span>Sinkronisasi Dapodik</span>
          </button>
          <button
            onClick={onOpenAddUser}
            type="button"
            className="px-4 py-2.5 rounded-lg bg-[#00513c] hover:bg-[#176b52] text-white text-[13px] font-semibold flex items-center gap-2 shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>Tambah Pengguna</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Accounts */}
        <div className="bg-white p-4 lg:p-5 rounded-xl shadow-xs border border-[#bec9c2]/40 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#51625a] uppercase tracking-wider font-semibold">
                Total Terdaftar
              </span>
              <span className="text-[32px] text-[#181c1b] font-bold mt-1 tabular-nums">
                {totalCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#d4e7dd] flex items-center justify-center text-[#0f1f19]">
              <span className="material-symbols-outlined text-[22px]">badge</span>
            </div>
          </div>
          <div className="mt-4 pt-1 flex items-center justify-between text-[#51625a] text-[11px] font-medium border-t border-[#f1f4f2]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00513c]"></span> {guruCount} Guru
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#51625a]"></span> {adminCount} Admin
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#74332e]"></span> {kepsekCount} Kepsek
            </span>
          </div>
        </div>

        {/* Card 2: Active Accounts */}
        <div className="bg-white p-4 lg:p-5 rounded-xl shadow-xs border border-[#bec9c2]/40 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#51625a] uppercase tracking-wider font-semibold">
                Akun Aktif
              </span>
              <span className="text-[32px] text-[#00513c] font-bold mt-1 tabular-nums">
                {activeCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#d4e7dd] flex items-center justify-center text-[#00513c]">
              <span className="material-symbols-outlined text-[22px]">verified_user</span>
            </div>
          </div>
          <div className="mt-4 pt-1 flex items-center gap-1.5 text-[#00513c] text-[11px] font-semibold border-t border-[#f1f4f2]">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>{activePercent}% Kredensial aktif tervalidasi</span>
          </div>
        </div>

        {/* Card 3: Inactive / Review */}
        <div className="bg-white p-4 lg:p-5 rounded-xl shadow-xs border border-[#bec9c2]/40 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#51625a] uppercase tracking-wider font-semibold">
                Perlu Review
              </span>
              <span className="text-[32px] text-[#74332e] font-bold mt-1 tabular-nums">
                {needReviewCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#3b0807]">
              <span className="material-symbols-outlined text-[22px]">pending_actions</span>
            </div>
          </div>
          <div className="mt-4 pt-1 flex items-center gap-1.5 text-[#74332e] text-[11px] font-semibold border-t border-[#f1f4f2]">
            <span className="material-symbols-outlined text-[16px]">info</span>
            <span>{suspendedCount} Nonaktif cuti, {pendingCount} menunggu aktivasi</span>
          </div>
        </div>

        {/* Card 4: Security Policy */}
        <div className="bg-white p-4 lg:p-5 rounded-xl shadow-xs border border-[#bec9c2]/40 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#51625a] uppercase tracking-wider font-semibold">
                Protokol 2FA &amp; Sandi
              </span>
              <span className="text-[17px] text-[#181c1b] font-bold mt-1.5 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00513c] animate-pulse"></span>
                Terenkripsi BSSN
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#f1f4f2] flex items-center justify-center text-[#00513c]">
              <span className="material-symbols-outlined text-[22px]">lock_clock</span>
            </div>
          </div>
          <div className="mt-4 pt-1 flex items-center justify-between text-[#51625a] text-[11px] border-t border-[#f1f4f2]">
            <span>Rotasi 90 Hari</span>
            <span className="font-semibold text-[#00513c]">Bcrypt Salting</span>
          </div>
        </div>
      </div>

      {/* Role Quick Tabs & Search Filters Bar */}
      <div className="bg-white rounded-xl p-4 lg:p-5 shadow-xs border border-[#bec9c2]/40 space-y-4">
        {/* Segmented Navigation for Roles & Batch Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="inline-flex p-1 bg-[#f1f4f2] rounded-lg gap-1 overflow-x-auto max-w-full border border-[#bec9c2]/30">
            <button
              onClick={() => {
                setSelectedRoleTab('all');
                setCurrentPage(1);
              }}
              type="button"
              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all whitespace-nowrap ${
                selectedRoleTab === 'all'
                  ? 'bg-[#00513c] text-white shadow-xs'
                  : 'text-[#3f4944] hover:text-[#181c1b] hover:bg-[#e0e3e1]'
              }`}
            >
              Semua Pengguna ({totalCount})
            </button>
            <button
              onClick={() => {
                setSelectedRoleTab('guru');
                setCurrentPage(1);
              }}
              type="button"
              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all whitespace-nowrap ${
                selectedRoleTab === 'guru'
                  ? 'bg-[#00513c] text-white shadow-xs'
                  : 'text-[#3f4944] hover:text-[#181c1b] hover:bg-[#e0e3e1]'
              }`}
            >
              Guru Pengajar ({guruCount})
            </button>
            <button
              onClick={() => {
                setSelectedRoleTab('kurikulum');
                setCurrentPage(1);
              }}
              type="button"
              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all whitespace-nowrap ${
                selectedRoleTab === 'kurikulum'
                  ? 'bg-[#00513c] text-white shadow-xs'
                  : 'text-[#3f4944] hover:text-[#181c1b] hover:bg-[#e0e3e1]'
              }`}
            >
              Admin Kurikulum &amp; Staf ({adminCount})
            </button>
            <button
              onClick={() => {
                setSelectedRoleTab('kepsek');
                setCurrentPage(1);
              }}
              type="button"
              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all whitespace-nowrap ${
                selectedRoleTab === 'kepsek'
                  ? 'bg-[#00513c] text-white shadow-xs'
                  : 'text-[#3f4944] hover:text-[#181c1b] hover:bg-[#e0e3e1]'
              }`}
            >
              Kepala Sekolah ({kepsekCount})
            </button>
          </div>

          {/* Batch Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleBatchInvite}
              type="button"
              className="px-3.5 py-2 rounded-lg bg-[#f1f4f2] hover:bg-[#e0e3e1] text-[#181c1b] text-[13px] font-medium flex items-center gap-1.5 transition-colors border border-[#bec9c2]/40"
            >
              <span className="material-symbols-outlined text-[18px] text-[#51625a]">mark_email_read</span>
              <span>Undang Ulang Massal</span>
            </button>
            <button
              onClick={handleExportCSV}
              type="button"
              className="px-3.5 py-2 rounded-lg bg-[#f1f4f2] hover:bg-[#e0e3e1] text-[#181c1b] text-[13px] font-medium flex items-center gap-1.5 transition-colors border border-[#bec9c2]/40"
            >
              <span className="material-symbols-outlined text-[18px] text-[#51625a]">download</span>
              <span>Ekspor CSV</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
          <div className="md:col-span-5 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-[#51625a]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Cari nama, NIP/NUPTK, atau email instansi..."
              className="w-full bg-[#f1f4f2] rounded-lg pl-10 pr-4 py-2.5 text-[14px] text-[#181c1b] placeholder:text-[#6f7974] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00513c]/20 border border-[#bec9c2]/50 transition-all"
            />
          </div>

          <div className="md:col-span-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#51625a]">
                tune
              </span>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#f1f4f2] rounded-lg pl-9 pr-8 py-2.5 text-[13px] font-medium text-[#181c1b] focus:outline-none focus:bg-white border border-[#bec9c2]/50 cursor-pointer appearance-none"
              >
                <option value="all">Semua Status Akun</option>
                <option value="active">Aktif ({activeCount})</option>
                <option value="suspended">Nonaktif / Cuti ({suspendedCount})</option>
                <option value="pending">Menunggu Aktivasi ({pendingCount})</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-[#51625a] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#51625a]">
                school
              </span>
              <select
                value={clusterFilter}
                onChange={(e) => {
                  setClusterFilter(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#f1f4f2] rounded-lg pl-9 pr-8 py-2.5 text-[13px] font-medium text-[#181c1b] focus:outline-none focus:bg-white border border-[#bec9c2]/50 cursor-pointer appearance-none"
              >
                <option value="all">Semua Rumpun Mapel / Unit</option>
                <option value="mipa">MIPA (Matematika &amp; Sains)</option>
                <option value="bahasa">Bahasa &amp; Literasi</option>
                <option value="ips">Sosial &amp; Humaniora</option>
                <option value="kejuruan">Informatika &amp; TIK</option>
                <option value="manajemen">Manajemen &amp; Pimpinan</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-[#51625a] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          <div className="md:col-span-1 flex">
            <button
              onClick={handleResetFilters}
              type="button"
              title="Reset Semua Filter"
              className="w-full h-full min-h-[42px] bg-[#f1f4f2] hover:bg-[#e0e3e1] rounded-lg flex items-center justify-center text-[#51625a] hover:text-[#181c1b] border border-[#bec9c2]/50 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">restart_alt</span>
            </button>
          </div>
        </div>
      </div>

      {/* Master Data Table Section */}
      <div className="bg-white rounded-xl shadow-xs border border-[#bec9c2]/40 overflow-hidden flex flex-col">
        {/* Table Header Info Bar */}
        <div className="px-5 py-3 bg-[#f1f4f2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#bec9c2]/40">
          <div className="flex items-center gap-2.5">
            <input
              id="select-all"
              type="checkbox"
              checked={
                filteredUsers.length > 0 &&
                filteredUsers.every((u) => selectedUserIds.includes(u.id))
              }
              onChange={handleSelectAll}
              className="w-4 h-4 rounded text-[#00513c] focus:ring-0 cursor-pointer accent-[#00513c]"
            />
            <label
              htmlFor="select-all"
              className="text-[13px] font-semibold text-[#3f4944] cursor-pointer"
            >
              Pilih Semua (
              {selectedUserIds.length > 0
                ? `${selectedUserIds.length} Akun Terpilih`
                : `${filteredUsers.length} Akun`}
              )
            </label>
          </div>

          <div className="flex items-center gap-4 text-[#51625a] text-[12px]">
            <span>
              Menampilkan {filteredUsers.length === 0 ? 0 : startIndex + 1}-
              {Math.min(startIndex + itemsPerPage, filteredUsers.length)} dari {filteredUsers.length} akun
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={validCurrentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                type="button"
                className="w-7 h-7 rounded bg-white border border-[#bec9c2]/50 flex items-center justify-center text-[#51625a] disabled:opacity-40 hover:text-[#181c1b]"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              <button
                disabled={validCurrentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                type="button"
                className="w-7 h-7 rounded bg-white border border-[#bec9c2]/50 flex items-center justify-center text-[#51625a] disabled:opacity-40 hover:text-[#181c1b]"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-[14px] border-collapse">
            <thead>
              <tr className="bg-white text-[#51625a] text-[12px] font-semibold uppercase tracking-wider border-b border-[#bec9c2]/40">
                <th className="py-3.5 px-4 w-12 text-center">#</th>
                <th className="py-3.5 px-4">Pengguna &amp; Identitas</th>
                <th className="py-3.5 px-4">Peran &amp; Penugasan</th>
                <th className="py-3.5 px-4">Aktivitas Terakhir</th>
                <th className="py-3.5 px-4">Status Akun</th>
                <th className="py-3.5 px-4 text-right">Tindakan Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ebefed]">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#51625a]">
                    <div className="flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-[36px] text-[#bec9c2]">
                        person_search
                      </span>
                      <p className="font-semibold text-[15px]">Tidak ada data pengguna yang sesuai</p>
                      <p className="text-[13px] text-[#6f7974]">
                        Coba ubah kata kunci pencarian atau bersihkan filter status / rumpun mapel.
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className="mt-2 px-3 py-1.5 rounded-lg bg-[#00513c] text-white text-[12px] font-semibold"
                      >
                        Reset Filter
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => {
                  const isSelected = selectedUserIds.includes(user.id);
                  const isMenuOpen = activeMenuUserId === user.id;

                  // Render avatar letters
                  const initials = user.name
                    .split(' ')
                    .filter((n) => !n.includes('.'))
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('') || 'PG';

                  return (
                    <tr
                      key={user.id}
                      className={`hover:bg-[#f7faf8] transition-colors ${
                        user.isCurrentUser ? 'bg-[#f7faf8]/70' : ''
                      } ${user.status === 'suspended' ? 'bg-[#f1f4f2]/40' : ''}`}
                    >
                      {/* Checkbox */}
                      <td className="py-4 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectUser(user.id)}
                          className="w-4 h-4 rounded text-[#00513c] focus:ring-0 cursor-pointer accent-[#00513c]"
                        />
                      </td>

                      {/* User & Identity */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full ${user.avatarBg || 'bg-[#d4e7dd]'} ${
                              user.avatarText || 'text-[#0f1f19]'
                            } flex items-center justify-center font-bold text-[14px] flex-shrink-0 shadow-xs`}
                          >
                            {initials}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[14px] text-[#181c1b] font-semibold truncate">
                                {user.name}
                              </span>
                              {user.isCurrentUser && (
                                <span className="px-1.5 py-0.5 rounded bg-[#e6e9e7] text-[#3f4944] text-[10px] font-bold">
                                  SESI ANDA
                                </span>
                              )}
                            </div>
                            <span className="text-[12px] text-[#51625a] truncate font-mono">
                              NIP. {user.nip}
                            </span>
                            <span className="text-[12px] text-[#00513c] truncate font-medium">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Role & Assignment */}
                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-1 items-start">
                          {user.roleCode === 'kepsek' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#d4e7dd] text-[#0f1f19] text-[11px] font-semibold">
                              <span className="material-symbols-outlined text-[14px] text-[#74332e]">
                                workspace_premium
                              </span>
                              {user.role}
                            </span>
                          ) : user.roleCode === 'kurikulum' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e0e3e1] text-[#181c1b] text-[11px] font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#51625a]"></span>
                              {user.role}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#d4e7dd] text-[#0f1f19] text-[11px] font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00513c]"></span>
                              {user.role}
                            </span>
                          )}
                          <span className="text-[12px] text-[#3f4944] line-clamp-1">
                            {user.assignment}
                          </span>
                        </div>
                      </td>

                      {/* Last Activity */}
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          {user.isOnline ? (
                            <span className="text-[12px] text-[#00513c] font-semibold flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-[#00513c] animate-pulse"></span>
                              Sedang Aktif
                            </span>
                          ) : (
                            <span className="text-[12px] text-[#181c1b] font-medium">
                              {user.lastActivityTime}
                            </span>
                          )}
                          <span className="text-[12px] text-[#51625a] line-clamp-1">
                            {user.lastActivityDetail}
                          </span>
                        </div>
                      </td>

                      {/* Account Status */}
                      <td className="py-4 px-4">
                        {user.status === 'active' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#d4e7dd] text-[#0f1f19] text-[11px] font-semibold">
                            <span className="w-2 h-2 rounded-full bg-[#00513c]"></span>
                            {user.twoFactorEnabled ? 'Aktif (2FA On)' : 'Aktif'}
                          </span>
                        ) : user.status === 'suspended' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ffdad6] text-[#93000a] text-[11px] font-semibold">
                            <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
                            Ditangguhkan
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e0e3e1] text-[#51625a] text-[11px] font-semibold">
                            <span className="w-2 h-2 rounded-full bg-[#51625a]"></span>
                            Menunggu Aktivasi
                          </span>
                        )}
                      </td>

                      {/* Admin Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="inline-flex items-center gap-1 relative">
                          {user.status === 'suspended' && (
                            <button
                              type="button"
                              onClick={() => {
                                onToggleUserStatus(user.id);
                                showToast(`Akun ${user.name} berhasil diaktifkan kembali.`);
                              }}
                              className="px-2.5 py-1 rounded bg-[#d4e7dd] hover:bg-[#bec9c2] text-[#0f1f19] text-[11px] font-semibold flex items-center gap-1 transition-colors mr-1"
                              title="Aktifkan Kembali Akun"
                            >
                              <span className="material-symbols-outlined text-[16px]">lock_open</span>
                              <span>Aktifkan</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => onOpenResetPassword(user)}
                            className="p-1.5 rounded-lg text-[#51625a] hover:text-[#00513c] hover:bg-[#f1f4f2] transition-colors"
                            title="Protokol Reset Kata Sandi"
                          >
                            <span className="material-symbols-outlined text-[20px]">key</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => onOpenEditRole(user)}
                            className="p-1.5 rounded-lg text-[#51625a] hover:text-[#00513c] hover:bg-[#f1f4f2] transition-colors"
                            title="Ubah Hak Akses &amp; Peran"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              {user.isCurrentUser ? 'manage_accounts' : 'edit'}
                            </span>
                          </button>

                          <div className="relative">
                            <button
                              type="button"
                              onClick={() =>
                                setActiveMenuUserId(isMenuOpen ? null : user.id)
                              }
                              className="p-1.5 rounded-lg text-[#51625a] hover:text-[#181c1b] hover:bg-[#f1f4f2] transition-colors"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                more_vert
                              </span>
                            </button>

                            {/* Options Dropdown Menu */}
                            {isMenuOpen && (
                              <div
                                onMouseLeave={() => setActiveMenuUserId(null)}
                                className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl border border-[#bec9c2]/50 py-1 z-30 text-left animate-in fade-in zoom-in-95 duration-100"
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveMenuUserId(null);
                                    showToast(`Rincian kredensial ${user.name} terbuka.`);
                                  }}
                                  className="w-full px-3 py-1.5 text-[12px] text-[#181c1b] hover:bg-[#f1f4f2] flex items-center gap-2"
                                >
                                  <span className="material-symbols-outlined text-[16px] text-[#51625a]">
                                    account_box
                                  </span>
                                  <span>Lihat Detail Profil</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveMenuUserId(null);
                                    onToggleUserStatus(user.id);
                                    showToast(
                                      user.status === 'active'
                                        ? `Akun ${user.name} ditangguhkan.`
                                        : `Akun ${user.name} diaktifkan kembali.`
                                    );
                                  }}
                                  className="w-full px-3 py-1.5 text-[12px] text-[#181c1b] hover:bg-[#f1f4f2] flex items-center gap-2"
                                >
                                  <span className="material-symbols-outlined text-[16px] text-[#51625a]">
                                    {user.status === 'active' ? 'lock' : 'lock_open'}
                                  </span>
                                  <span>
                                    {user.status === 'active' ? 'Tangguhkan Akun' : 'Aktifkan Akun'}
                                  </span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveMenuUserId(null);
                                    onDeleteUser(user.id);
                                    showToast(`Kredensial ${user.name} telah dihapus.`);
                                  }}
                                  className="w-full px-3 py-1.5 text-[12px] text-[#ba1a1a] hover:bg-[#ffdad6] flex items-center gap-2"
                                >
                                  <span className="material-symbols-outlined text-[16px]">
                                    delete
                                  </span>
                                  <span>Hapus Kredensial</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="p-4 bg-[#f1f4f2] flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#bec9c2]/40">
          <div className="flex items-center gap-2 text-[#51625a] text-[13px]">
            <span>Tampilkan</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white rounded px-2.5 py-1 text-[13px] text-[#181c1b] border border-[#bec9c2]/50 focus:outline-none"
            >
              <option value={10}>10 data per halaman</option>
              <option value={25}>25 data per halaman</option>
              <option value={50}>50 data per halaman</option>
            </select>
            <span>dari {filteredUsers.length} total pengguna</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={validCurrentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg bg-white text-[#181c1b] text-[12px] font-medium shadow-xs border border-[#bec9c2]/40 hover:bg-[#ebefed] disabled:opacity-40"
            >
              Sebelumnya
            </button>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const pageNum = i + 1;
              const isCurrent = pageNum === validCurrentPage;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-lg text-[13px] font-bold shadow-xs transition-colors ${
                    isCurrent
                      ? 'bg-[#00513c] text-white'
                      : 'bg-white text-[#181c1b] border border-[#bec9c2]/40 hover:bg-[#ebefed]'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 5 && (
              <>
                <span className="px-1 text-[#51625a]">...</span>
                <button
                  type="button"
                  onClick={() => setCurrentPage(totalPages)}
                  className={`w-8 h-8 rounded-lg text-[13px] font-bold shadow-xs transition-colors ${
                    validCurrentPage === totalPages
                      ? 'bg-[#00513c] text-white'
                      : 'bg-white text-[#181c1b] border border-[#bec9c2]/40 hover:bg-[#ebefed]'
                  }`}
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              type="button"
              disabled={validCurrentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-lg bg-white text-[#181c1b] text-[12px] font-medium shadow-xs border border-[#bec9c2]/40 hover:bg-[#ebefed] disabled:opacity-40"
            >
              Berikutnya
            </button>
          </div>
        </div>
      </div>

      {/* Security Compliance & Technical Audit Info Banner */}
      <div className="bg-[#f1f4f2] p-4 lg:p-5 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-[#bec9c2]/40">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-[24px] text-[#00513c] flex-shrink-0 mt-0.5">
            verified
          </span>
          <div className="flex flex-col">
            <span className="text-[14px] text-[#181c1b] font-bold">
              Kepatuhan Standar Keamanan Data Pendidikan
            </span>
            <p className="text-[12px] text-[#3f4944] max-w-3xl mt-0.5 leading-relaxed">
              Seluruh kredensial akun dilindungi hashing algoritma SHA-256 / Bcrypt dengan salting unik. Sesuai regulasi BSSN dan Permendikbudristek No. 48/2023, Admin tidak memiliki akses melihat kata sandi pengguna dalam bentuk teks biasa (plain text).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#51625a] text-[11px] font-semibold border border-[#bec9c2]/40 shadow-xs">
            <span className="material-symbols-outlined text-[16px] text-[#00513c]">security</span>
            Lockout 5x Gagal
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#51625a] text-[11px] font-semibold border border-[#bec9c2]/40 shadow-xs">
            <span className="material-symbols-outlined text-[16px] text-[#00513c]">vpn_key</span>
            SSL TLS 1.3
          </span>
        </div>
      </div>
    </div>
  );
};
