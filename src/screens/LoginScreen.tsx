import React, { useState } from 'react';
import { UserRole } from '../types';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
  onForgotPassword: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onForgotPassword,
}) => {
  const [activeTab, setActiveTab] = useState<'guru' | 'pimpinan'>('guru');
  const [identifier, setIdentifier] = useState('198109152006041008');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showHelpdesk, setShowHelpdesk] = useState(false);

  const handleTabChange = (tab: 'guru' | 'pimpinan') => {
    setActiveTab(tab);
    if (tab === 'pimpinan') {
      setIdentifier('196805121994031004'); // NIP Drs. H. Mulyadi (Kepsek)
    } else {
      setIdentifier('198109152006041008'); // NIP H. Rahmat Hidayat (Kurikulum/Guru)
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (activeTab === 'pimpinan') {
        onLogin('kepsek');
      } else {
        // If identifier matches kurikulum or guru
        if (identifier.includes('kurikulum') || identifier === '198109152006041008') {
          onLogin('kurikulum');
        } else {
          onLogin('guru');
        }
      }
    }, 600);
  };

  const handleBiometricLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(activeTab === 'pimpinan' ? 'kepsek' : 'kurikulum');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#f7faf8] flex flex-col items-center justify-center p-4 sm:p-6 text-[#181c1b]">
      <div className="w-full max-w-[440px] flex flex-col items-center space-y-4 sm:space-y-5">
        {/* Top Logo Card */}
        <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-[#bec9c2]/40 flex flex-col items-center justify-center p-2">
          <div className="w-10 h-10 flex items-center justify-center text-[#00513c]">
            <svg
              className="w-9 h-9"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00513c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
              <path d="m9 16 2 2 4-4" />
            </svg>
          </div>
          <span className="text-[11px] font-bold text-[#00513c] tracking-wider mt-0.5">SIPAGU</span>
        </div>

        {/* Brand Title & Tagline */}
        <div className="text-center space-y-1">
          <h1 className="text-[26px] sm:text-[28px] font-bold tracking-tight text-[#00513c]">
            SIPAGU
          </h1>
          <p className="text-[13px] sm:text-[14px] text-[#3f4944] font-medium">
            Sistem Informasi Pemantauan Aktivitas Guru
          </p>
          <div className="pt-0.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4e7dd] text-[#00513c] text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00513c]"></span>
              Sistem Presensi &amp; Jurnal Kelas Terpadu
            </span>
          </div>
        </div>

        {/* Segmented Role Tabs */}
        <div className="w-full grid grid-cols-2 p-1 bg-[#e0e3e1]/80 rounded-xl gap-1">
          <button
            type="button"
            onClick={() => handleTabChange('guru')}
            className={`py-2.5 px-3 rounded-lg text-[13px] font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'guru'
                ? 'bg-white text-[#00513c] shadow-xs'
                : 'text-[#3f4944] hover:text-[#181c1b]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">school</span>
            <span>Guru &amp; Staf</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('pimpinan')}
            className={`py-2.5 px-3 rounded-lg text-[13px] font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'pimpinan'
                ? 'bg-white text-[#00513c] shadow-xs'
                : 'text-[#3f4944] hover:text-[#181c1b]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>Pimpinan</span>
          </button>
        </div>

        {/* Login Card */}
        <div className="w-full bg-white rounded-2xl shadow-sm border border-[#bec9c2]/40 p-5 sm:p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[20px] font-bold text-[#181c1b]">
                Selamat Datang
              </h2>
              <p className="text-[12px] sm:text-[13px] text-[#51625a] mt-0.5 leading-snug">
                Silakan masuk ke portal pendidik untuk mengelola jurnal &amp; presensi.
              </p>
            </div>
            <div className="text-[#00513c] pt-1">
              <span className="material-symbols-outlined text-[22px]">lock_open</span>
            </div>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            {/* Input 1: NIP / Email */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[12px] font-semibold text-[#181c1b]">
                  NIP / Surel / ID Pendidik
                </label>
                <span className="text-[11px] text-[#6f7974]">Wajib</span>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-[#51625a]">
                  badge
                </span>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="19820315... atau nama@sekolah.sch.id"
                  className="w-full bg-[#f1f4f2] rounded-lg pl-10 pr-3.5 py-2.5 text-[13px] text-[#181c1b] placeholder:text-[#6f7974] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00513c]/20 border border-[#bec9c2]/50 font-mono transition-all"
                />
              </div>
            </div>

            {/* Input 2: Kata Sandi */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[12px] font-semibold text-[#181c1b]">
                  Kata Sandi
                </label>
                <span className="text-[11px] text-[#6f7974]">Terenkripsi</span>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-[#51625a]">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi..."
                  className="w-full bg-[#f1f4f2] rounded-lg pl-10 pr-10 py-2.5 text-[13px] text-[#181c1b] placeholder:text-[#6f7974] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00513c]/20 border border-[#bec9c2]/50 font-mono transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#51625a] hover:text-[#181c1b]"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-[12px] pt-0.5">
              <label className="flex items-center gap-2 text-[#3f4944] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#00513c] accent-[#00513c] cursor-pointer"
                />
                <span>Ingat saya</span>
              </label>

              <button
                type="button"
                onClick={onForgotPassword}
                className="text-[#00513c] font-semibold hover:underline"
              >
                Lupa Kata Sandi?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#00513c] hover:bg-[#176b52] text-white text-[14px] font-semibold flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50 mt-1 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Memverifikasi Kredensial...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke SIPAGU</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Access Divider */}
          <div className="relative flex items-center justify-center pt-2">
            <div className="border-t border-[#bec9c2]/40 w-full"></div>
            <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-[#6f7974] font-semibold absolute">
              ATAU AKSES CEPAT
            </span>
          </div>

          {/* Biometric Button */}
          <button
            type="button"
            onClick={handleBiometricLogin}
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-[#f1f4f2] hover:bg-[#e0e3e1] text-[#181c1b] text-[13px] font-semibold flex items-center justify-center gap-2 border border-[#bec9c2]/50 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] text-[#00513c]">
              fingerprint
            </span>
            <span>Masuk Cepat via Sidik Jari / FaceID</span>
          </button>
        </div>

        {/* Support Helpdesk Card */}
        <div className="w-full p-4 rounded-xl bg-[#d4e7dd]/60 border border-[#00513c]/20 flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#00513c] shadow-xs flex-shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[20px]">support_agent</span>
          </div>
          <div className="text-[12px] leading-relaxed">
            <span className="font-bold text-[#181c1b] block">Kendala NIP / Pemulihan Akun?</span>
            <span className="text-[#3f4944]">
              Hubungi Operator Simpatika / IT Sekolah via{' '}
              <button
                type="button"
                onClick={() => setShowHelpdesk(true)}
                className="text-[#00513c] font-semibold underline cursor-pointer"
              >
                Helpdesk Cabdin
              </button>
            </span>
          </div>
        </div>

        {/* Security & Regulatory Footer */}
        <div className="text-center space-y-1.5 pt-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e0e3e1] text-[#3f4944] text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[14px] text-[#00513c]">verified</span>
            v2.4.0 • Enkripsi TLS 1.3 Terverifikasi
          </span>
          <p className="text-[11px] text-[#51625a]">
            Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI
          </p>
        </div>
      </div>

      {/* Helpdesk Modal */}
      {showHelpdesk && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-sm rounded-xl shadow-xl overflow-hidden border border-[#bec9c2]/50 p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#bec9c2]/30">
              <div className="flex items-center gap-2 text-[#00513c]">
                <span className="material-symbols-outlined text-[20px]">headset_mic</span>
                <h3 className="font-bold text-[15px]">Helpdesk Cabdin SMAN 1</h3>
              </div>
              <button
                onClick={() => setShowHelpdesk(false)}
                className="w-7 h-7 rounded flex items-center justify-center text-[#51625a] hover:bg-[#f1f4f2]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="text-[12px] text-[#3f4944] space-y-2">
              <p>Untuk kendala lupa NIP, NUPTK tidak terdaftar di Dapodik, atau reset sandi darurat:</p>
              <div className="p-3 bg-[#f1f4f2] rounded-lg space-y-1 text-[11px] font-mono">
                <div><strong>WhatsApp IT:</strong> +62 812-9842-1090</div>
                <div><strong>Email:</strong> operator.it@sman1.sch.id</div>
                <div><strong>Ruang IT:</strong> Gedung B Lantai 2</div>
              </div>
            </div>
            <button
              onClick={() => setShowHelpdesk(false)}
              className="w-full py-2 bg-[#00513c] text-white text-[12px] font-semibold rounded-lg"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
