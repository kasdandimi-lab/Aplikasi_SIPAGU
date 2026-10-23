export type UserRole = 'guru' | 'kurikulum' | 'kepsek';

export type AccountStatus = 'active' | 'suspended' | 'pending';

export type SubjectCluster = 'mipa' | 'bahasa' | 'ips' | 'kejuruan' | 'manajemen';

export interface UserAccount {
  id: string;
  name: string;
  nip: string;
  email: string;
  role: 'Guru Pengajar' | 'Admin Kurikulum' | 'Kepala Sekolah';
  roleCode: UserRole;
  assignment: string;
  cluster: SubjectCluster;
  clusterLabel: string;
  lastActivityTime: string;
  lastActivityDetail: string;
  isOnline?: boolean;
  status: AccountStatus;
  statusLabel: string;
  twoFactorEnabled?: boolean;
  isCurrentUser?: boolean;
  avatarBg?: string;
  avatarText?: string;
}

export interface AuditLogItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  timestamp: string;
  icon: string;
  iconColor: string;
  severity?: 'normal' | 'warning' | 'error';
}

export interface TeachingJournal {
  id: string;
  teacherId: string;
  teacherName: string;
  classroom: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  studentsPresent: number;
  studentsTotal: number;
  materialTaught: string;
  notes?: string;
  verifiedByKepsek: boolean;
  verifiedAt?: string;
  qrToken?: string;
}

export interface ScheduleSlot {
  id: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';
  period: number; // 1 to 8
  time: string;
  className: string;
  room: string;
  subject: string;
  teacherName: string;
  teacherId: string;
}

export interface LeaveRequest {
  id: string;
  teacherName: string;
  nip: string;
  type: 'Cuti Sakit' | 'Tugas Belajar' | 'Dinas Luar / Seminar' | 'Cuti Melahirkan' | 'Keperluan Penting';
  startDate: string;
  endDate: string;
  durationDays: number;
  reason: string;
  documentRef?: string;
  status: 'Menunggu Persetujuan' | 'Disetujui' | 'Ditolak';
  reviewedBy?: string;
  reviewedAt?: string;
}
