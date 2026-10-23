import React, { useState } from 'react';
import { UserAccount } from '../types';

interface ResetPasswordModalProps {
  user: UserAccount | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  user,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [method, setMethod] = useState<'email' | 'temp'>('email');
  const [generatedPass, setGeneratedPass] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isOpen || !user) return null;

  const initials = user.name
    .split(' ')
    .filter((n) => !n.includes('.'))
    .map((n) => n[0])
    .slice(0, 2)
    .join('') || 'PG';

  const handleExecuteReset = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (method === 'temp') {
        const randomTemp = `Spg#${Math.random().toString(36).substring(2, 8).toUpperCase()}!9`;
        setGeneratedPass(randomTemp);
      } else {
        onSuccess(
          `Tautan rahasia pemulihan kata sandi telah dikirim ke ${user.email}. Berlaku selama 24 jam.`
        );
        onClose();
      }
    }, 600);
  };

  const copyToClipboard = () => {
    if (generatedPass) {
      navigator.clipboard.writeText(generatedPass);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFinish = () => {
    onSuccess(`Sandi sementara untuk ${user.name} berhasil diterbitkan.`);
    setGeneratedPass('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden border border-[#bec9c2]/50">
        {/* Header */}
        <div className="p-5 bg-[#f1f4f2] flex items-start justify-between border-b border-[#bec9c2]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white text-[#00513c] flex items-center justify-center shadow-xs border border-[#bec9c2]/40">
              <span className="material-symbols-outlined text-[22px]">lock_reset</span>
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="text-[18px] font-bold text-[#181c1b] leading-tight">
                Protokol Reset Kata Sandi
              </h3>
              <span className="text-[12px] text-[#51625a]">
                Otentikasi Kredensial Pendidik Terverifikasi
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

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Target User Badge */}
          <div className="p-3 rounded-lg bg-[#ebefed] flex items-center gap-3 border border-[#bec9c2]/40">
            <div className="w-9 h-9 rounded-full bg-[#00513c] text-white flex items-center justify-center font-bold text-[13px] flex-shrink-0">
              {initials}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] font-semibold text-[#181c1b] truncate">
                {user.name}
              </span>
              <span className="text-[12px] text-[#51625a] truncate">
                {user.email} • NIP. {user.nip}
              </span>
            </div>
          </div>

          {!generatedPass ? (
            <div className="space-y-3">
              <label className="text-[13px] font-semibold text-[#181c1b] block">
                Pilih Metode Reset Sandi
              </label>

              {/* Method 1: Email Magic Link */}
              <label
                onClick={() => setMethod('email')}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  method === 'email'
                    ? 'bg-[#d4e7dd]/50 border-[#00513c]'
                    : 'bg-[#f1f4f2] border-[#bec9c2]/40 hover:bg-[#ebefed]'
                }`}
              >
                <input
                  type="radio"
                  name="reset-method"
                  checked={method === 'email'}
                  onChange={() => setMethod('email')}
                  className="mt-1 w-4 h-4 text-[#00513c] accent-[#00513c]"
                />
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold text-[#181c1b]">
                    Kirim Tautan Rahasia ke Email Resmi
                  </span>
                  <span className="text-[12px] text-[#51625a] mt-0.5 leading-relaxed">
                    Tautan token acak sekali pakai yang berlaku selama 24 jam. Pengguna mengatur
                    kata sandi secara mandiri melalui portal resmi SMAN 1.
                  </span>
                </div>
              </label>

              {/* Method 2: Temporary Password */}
              <label
                onClick={() => setMethod('temp')}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  method === 'temp'
                    ? 'bg-[#d4e7dd]/50 border-[#00513c]'
                    : 'bg-[#f1f4f2] border-[#bec9c2]/40 hover:bg-[#ebefed]'
                }`}
              >
                <input
                  type="radio"
                  name="reset-method"
                  checked={method === 'temp'}
                  onChange={() => setMethod('temp')}
                  className="mt-1 w-4 h-4 text-[#00513c] accent-[#00513c]"
                />
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold text-[#181c1b]">
                    Terbitkan Sandi Sementara Acak
                  </span>
                  <span className="text-[12px] text-[#51625a] mt-0.5 leading-relaxed">
                    Sistem menghasilkan string sandi acak (12 karakter). Pengguna diwajibkan
                    mengganti kata sandi pada proses login pertama kali.
                  </span>
                </div>
              </label>
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-[#d4e7dd]/60 border border-[#00513c]/30 space-y-3">
              <div className="flex items-center gap-2 text-[#00513c]">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span className="text-[13px] font-bold">Sandi Sementara Berhasil Diterbitkan</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#bec9c2]/60">
                <code className="text-[15px] font-mono font-bold text-[#181c1b] tracking-wider select-all">
                  {generatedPass}
                </code>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="px-2.5 py-1.5 rounded bg-[#f1f4f2] hover:bg-[#e0e3e1] text-[#00513c] text-[12px] font-semibold flex items-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copied ? 'done' : 'content_copy'}
                  </span>
                  <span>{copied ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>
              <p className="text-[11px] text-[#51625a] leading-tight">
                Harap segera bagikan kata sandi sementara ini kepada pendidik bersangkutan melalui saluran komunikasi kedinasan yang aman.
              </p>
            </div>
          )}

          {/* Security Notice */}
          <div className="p-3 rounded-lg bg-[#d4e7dd]/60 text-[#0f1f19] flex items-start gap-2.5 text-[12px] border border-[#bec9c2]/30">
            <span className="material-symbols-outlined text-[18px] text-[#00513c] flex-shrink-0 mt-0.5">
              verified_user
            </span>
            <span className="leading-snug">
              Sesuai standar zero-trust BSSN, sesi aktif pengguna di perangkat lain akan diputus otomatis setelah reset berhasil diproses.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f1f4f2] flex items-center justify-end gap-3 border-t border-[#bec9c2]/40">
          {!generatedPass ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-white hover:bg-[#ebefed] text-[#181c1b] text-[13px] font-medium border border-[#bec9c2]/50 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleExecuteReset}
                className="px-4 py-2 rounded-lg bg-[#00513c] hover:bg-[#176b52] text-white text-[13px] font-semibold transition-colors flex items-center gap-2 shadow-xs disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>Proses Reset Sekarang</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-4 py-2 rounded-lg bg-[#00513c] hover:bg-[#176b52] text-white text-[13px] font-semibold transition-colors shadow-xs"
            >
              Selesai &amp; Tutup
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
