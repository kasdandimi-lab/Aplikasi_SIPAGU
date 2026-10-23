import { useState } from 'react';
import { UserAccount, UserRole, AuditLogItem, TeachingJournal, ScheduleSlot, LeaveRequest } from './types';
import {
  INITIAL_USERS,
  INITIAL_AUDIT_LOGS,
  INITIAL_JOURNALS,
  INITIAL_SCHEDULE,
  INITIAL_LEAVE_REQUESTS,
} from './data/initialData';
import { Sidebar, ScreenId } from './components/Sidebar';
import { Header } from './components/Header';
import { AccountManagementScreen } from './screens/AccountManagementScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { QRPresenceScreen } from './screens/QRPresenceScreen';
import { AuditScreen } from './screens/AuditScreen';
import { ScheduleScreen } from './screens/ScheduleScreen';
import { LeaveScreen } from './screens/LeaveScreen';
import { ReportScreen } from './screens/ReportScreen';
import { SessionLogScreen } from './screens/SessionLogScreen';
import { SchoolDataScreen } from './screens/SchoolDataScreen';
import { NotificationCenterScreen } from './screens/NotificationCenterScreen';
import { LoginScreen } from './screens/LoginScreen';
import { ResetPasswordModal } from './components/ResetPasswordModal';
import { EditRoleDrawer } from './components/EditRoleDrawer';
import { AuditLogModal } from './components/AuditLogModal';
import { DapodikSyncModal } from './components/DapodikSyncModal';
import { AddUserModal } from './components/AddUserModal';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeScreen, setActiveScreen] = useState<ScreenId>('pemeriksaan-dan-audit');
  const [activeRole, setActiveRole] = useState<UserRole>('kurikulum');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // App data state
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [journals, setJournals] = useState<TeachingJournal[]>(INITIAL_JOURNALS);
  const [schedule, setSchedule] = useState<ScheduleSlot[]>(INITIAL_SCHEDULE);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(INITIAL_LEAVE_REQUESTS);

  // Modals & Drawers state
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isDapodikSyncOpen, setIsDapodikSyncOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [resetPasswordTargetUser, setResetPasswordTargetUser] = useState<UserAccount | null>(null);
  const [editRoleTargetUser, setEditRoleTargetUser] = useState<UserAccount | null>(null);

  // Global toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showGlobalToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle user active / suspended status
  const handleToggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === 'active' ? 'suspended' : 'active';
          const newLabel = newStatus === 'active' ? 'Aktif' : 'Ditangguhkan';
          return {
            ...u,
            status: newStatus,
            statusLabel: newLabel,
          };
        }
        return u;
      })
    );
  };

  // Delete user
  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  // Update user role from drawer
  const handleSaveRole = (
    userId: string,
    newRole: 'Guru Pengajar' | 'Admin Kurikulum' | 'Kepala Sekolah',
    newRoleCode: UserRole
  ) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            role: newRole,
            roleCode: newRoleCode,
          };
        }
        return u;
      })
    );

    const target = users.find((u) => u.id === userId);
    if (target) {
      const newAuditItem: AuditLogItem = {
        id: `log-${Date.now()}`,
        title: 'Perubahan Peran & Wewenang (Role Elevation)',
        description: `Wewenang akun ${target.name} dimutakhirkan menjadi ${newRole}`,
        timeAgo: 'Baru saja',
        timestamp: new Date().toLocaleTimeString('id-ID') + ' WIB',
        icon: 'admin_panel_settings',
        iconColor: 'text-[#00513c]',
        severity: 'normal',
      };
      setAuditLogs((prev) => [newAuditItem, ...prev]);
      showGlobalToast(`Peran ${target.name} berhasil diubah menjadi ${newRole}.`);
    }
  };

  // Add new user
  const handleAddUser = (newUser: UserAccount) => {
    setUsers((prev) => [newUser, ...prev]);
    const newAuditItem: AuditLogItem = {
      id: `log-${Date.now()}`,
      title: 'Registrasi Akun Baru',
      description: `Kredensial untuk ${newUser.name} (${newUser.role}) berhasil ditambahkan ke basis data SIPAGU`,
      timeAgo: 'Baru saja',
      timestamp: new Date().toLocaleTimeString('id-ID') + ' WIB',
      icon: 'person_add',
      iconColor: 'text-[#00513c]',
      severity: 'normal',
    };
    setAuditLogs((prev) => [newAuditItem, ...prev]);
    showGlobalToast(`Pendidik baru ${newUser.name} berhasil didaftarkan.`);
  };

  // Dapodik sync completion
  const handleDapodikSyncComplete = () => {
    const newAuditItem: AuditLogItem = {
      id: `log-${Date.now()}`,
      title: 'Sinkronisasi Gateway Dapodik Sukses',
      description: 'Verifikasi 48 NUPTK aktif & pembaruan otomatis rombel dari Kemendikbudristek',
      timeAgo: 'Baru saja',
      timestamp: new Date().toLocaleTimeString('id-ID') + ' WIB',
      icon: 'cloud_sync',
      iconColor: 'text-[#00513c]',
      severity: 'normal',
    };
    setAuditLogs((prev) => [newAuditItem, ...prev]);
    showGlobalToast('Sinkronisasi Dapodik V.2024.c selesai dengan status normal.');
  };

  // Journal handlers
  const handleJournalSubmit = (newJournal: TeachingJournal) => {
    setJournals((prev) => [newJournal, ...prev]);
    showGlobalToast('Jurnal mengajar digital berhasil dicatat!');
  };

  const handleVerifyJournal = (journalId: string) => {
    setJournals((prev) =>
      prev.map((j) =>
        j.id === journalId
          ? {
              ...j,
              verifiedByKepsek: true,
              verifiedAt: 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
            }
          : j
      )
    );
  };

  const handleVerifyAllJournals = () => {
    setJournals((prev) =>
      prev.map((j) => ({
        ...j,
        verifiedByKepsek: true,
        verifiedAt: 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      }))
    );
  };

  // Schedule handler
  const handleAddScheduleSlot = (slot: ScheduleSlot) => {
    setSchedule((prev) => [...prev, slot]);
    showGlobalToast(`Slot jadwal ${slot.subject} berhasil ditambahkan!`);
  };

  // Leave handlers
  const handleApproveLeave = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'Disetujui',
              reviewedBy: 'Drs. H. Mulyadi, M.Pd',
              reviewedAt: 'Hari ini',
            }
          : r
      )
    );
    showGlobalToast('Permohonan izin disetujui secara digital.');
  };

  const handleRejectLeave = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'Ditolak',
              reviewedBy: 'Drs. H. Mulyadi, M.Pd',
              reviewedAt: 'Hari ini',
            }
          : r
      )
    );
    showGlobalToast('Permohonan izin ditolak.');
  };

  const handleSubmitLeave = (req: LeaveRequest) => {
    setLeaveRequests((prev) => [req, ...prev]);
    showGlobalToast('Permohonan izin berhasil diajukan.');
  };

  const handleLogin = (role: UserRole) => {
    setActiveRole(role);
    setIsAuthenticated(true);
    showGlobalToast(
      `Selamat datang di SIPAGU! Anda masuk sebagai ${
        role === 'kepsek'
          ? 'Kepala Sekolah'
          : role === 'kurikulum'
          ? 'Admin Kurikulum'
          : 'Guru Pengajar'
      }.`
    );
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    showGlobalToast('Anda telah berhasil keluar dari sistem SIPAGU.');
  };

  // If user is not yet logged in, show Login Screen matching image_d0813efd.png
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f7faf8]">
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#00513c] text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2.5 text-[13px] font-medium border border-[#89d6b7]/30 animate-in fade-in slide-in-from-bottom duration-200">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>{toastMessage}</span>
          </div>
        )}

        <LoginScreen
          onLogin={handleLogin}
          onForgotPassword={() => setResetPasswordTargetUser(users[0])}
        />

        <ResetPasswordModal
          user={resetPasswordTargetUser}
          isOpen={Boolean(resetPasswordTargetUser)}
          onClose={() => setResetPasswordTargetUser(null)}
          onSuccess={showGlobalToast}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7faf8] text-[#181c1b] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#00513c] text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2.5 text-[13px] font-medium border border-[#89d6b7]/30 animate-in fade-in slide-in-from-bottom duration-200">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Fixed Sidebar */}
      <Sidebar
        activeScreen={activeScreen}
        onSelectScreen={setActiveScreen}
        activeRole={activeRole}
        onChangeRole={setActiveRole}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Header */}
        <Header
          activeRole={activeRole}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenAuditLog={() => setIsAuditModalOpen(true)}
          onLogout={handleLogout}
          onNavigateToScreen={(screen) => setActiveScreen(screen)}
        />

        {/* Viewport Content */}
        <main className="w-full pt-20 flex-1 px-4 sm:px-6 lg:px-8 py-6">
          {activeScreen === 'dasbor-utama' && (
            <DashboardScreen
              activeRole={activeRole}
              onNavigateTo={(screen) => setActiveScreen(screen)}
            />
          )}

          {activeScreen === 'presensi-qr-kelas' && (
            <QRPresenceScreen onJournalSubmit={handleJournalSubmit} />
          )}

          {activeScreen === 'pemeriksaan-dan-audit' && (
            <AuditScreen
              journals={journals}
              activeRole={activeRole}
              onVerifyJournal={handleVerifyJournal}
              onVerifyAll={handleVerifyAllJournals}
            />
          )}

          {activeScreen === 'manajemen-jadwal' && (
            <ScheduleScreen
              schedule={schedule}
              onAddScheduleSlot={handleAddScheduleSlot}
            />
          )}

          {activeScreen === 'log-sesi-kbm' && (
            <SessionLogScreen
              journals={journals}
              onOpenQR={() => setActiveScreen('presensi-qr-kelas')}
            />
          )}

          {activeScreen === 'pengajuan-izin' && (
            <LeaveScreen
              requests={leaveRequests}
              activeRole={activeRole}
              onApproveLeave={handleApproveLeave}
              onRejectLeave={handleRejectLeave}
              onSubmitLeave={handleSubmitLeave}
            />
          )}

          {activeScreen === 'laporan-dan-rekapitulasi' && (
            <ReportScreen users={users} />
          )}

          {activeScreen === 'data-master-sekolah' && (
            <SchoolDataScreen />
          )}

          {(activeScreen === 'manajemen-akun' || (activeScreen as string) === 'data-master-dan-akun') && (
            <AccountManagementScreen
              users={users}
              onOpenAuditLog={() => setIsAuditModalOpen(true)}
              onOpenDapodikSync={() => setIsDapodikSyncOpen(true)}
              onOpenAddUser={() => setIsAddUserOpen(true)}
              onOpenResetPassword={(u) => setResetPasswordTargetUser(u)}
              onOpenEditRole={(u) => setEditRoleTargetUser(u)}
              onToggleUserStatus={handleToggleUserStatus}
              onDeleteUser={handleDeleteUser}
            />
          )}

          {activeScreen === 'pusat-notifikasi' && (
            <NotificationCenterScreen />
          )}
        </main>

        {/* Footer */}
        <footer className="w-full bg-[#f1f4f2] shadow-[0_1px_8px_rgba(0,0,0,0.04)] py-4 mt-auto border-t border-[#bec9c2]/30">
          <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-[#51625a] text-[12px] font-medium">
            <div className="flex items-center gap-2">
              <span>© 2024 Kemendikbudristek RI. Hak Cipta Dilindungi.</span>
            </div>
            <div className="flex items-center gap-4 text-[12px]">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#00513c]">cloud_sync</span>
                Offline-First Engine v2.4
              </span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Terverifikasi SIPAGU Core</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Global Modals & Drawers */}
      <ResetPasswordModal
        user={resetPasswordTargetUser}
        isOpen={Boolean(resetPasswordTargetUser)}
        onClose={() => setResetPasswordTargetUser(null)}
        onSuccess={showGlobalToast}
      />

      <EditRoleDrawer
        user={editRoleTargetUser}
        isOpen={Boolean(editRoleTargetUser)}
        onClose={() => setEditRoleTargetUser(null)}
        onSave={handleSaveRole}
      />

      <AuditLogModal
        logs={auditLogs}
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />

      <DapodikSyncModal
        isOpen={isDapodikSyncOpen}
        onClose={() => setIsDapodikSyncOpen(false)}
        onSyncComplete={handleDapodikSyncComplete}
      />

      <AddUserModal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onAddUser={handleAddUser}
      />
    </div>
  );
}
