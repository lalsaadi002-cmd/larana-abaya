import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { adminAuth } from './services/authService';
import { AuthSession } from './types';

interface AdminLoginProps {
  onLoginSuccess: (session: AuthSession) => void;
  onPreviewDashboard: () => void;
  onExitAdmin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onPreviewDashboard, onExitAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Forgot Password modal state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState<string | null>(null);
  const [forgotError, setForgotError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await adminAuth.login(email, password);
      if (result.success && result.session) {
        onLoginSuccess(result.session);
      } else {
        setError(result.error || 'بيانات الدخول غير صحيحة، يرجى المحاولة مرة أخرى.');
      }
    } catch {
      setError('تعذر الاتصال بالخادم، يرجى المحاولة بعد قليل.');
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewDashboard = () => {
    const previewSession: AuthSession = {
      token: `dev_preview_${Date.now()}`,
      user: {
        id: 'adm_preview',
        email: 'admin@laranastore.om',
        name: 'إدارة لارانا ستور',
        role: 'super_admin',
        lastLogin: new Date().toISOString(),
      },
      expiresAt: Date.now() + 8 * 60 * 60 * 1000,
    };
    onLoginSuccess(previewSession);
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError(null);
    setForgotSuccess(null);
    setForgotLoading(true);

    try {
      const res = await adminAuth.requestPasswordReset(forgotEmail);
      if (res.success) {
        setForgotSuccess(res.message);
      } else {
        setForgotError(res.message);
      }
    } catch {
      setForgotError('تعذر إرسال طلب الاستعادة حالياً، يرجى المحاولة لاحقاً.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full bg-[#08142D] text-[#0B1B3D] flex flex-col justify-between selection:bg-[#0B1B3D] selection:text-[#F8F5EE] font-arabic relative"
    >
      {/* Subtle Warm Scrim over Sophisticated Deep Navy Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08142D] via-[#0B1B3D] to-[#08142D] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,20,45,0.7)_100%)] pointer-events-none" />

      {/* Minimal Top Bar */}
      <header className="relative z-10 w-full px-6 py-5 flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="font-serif text-sm tracking-[0.25em] text-[#C6A972] uppercase font-light">
            LARANA STORE
          </span>
        </div>

        <button
          onClick={onExitAdmin}
          className="text-xs text-[#F8F5EE]/75 hover:text-[#C6A972] transition-colors flex items-center gap-1.5 cursor-pointer py-1 px-2.5 border border-[#C6A972]/20 hover:border-[#C6A972]/50 bg-[#0B1B3D]/60 rounded-xs"
        >
          <span>العودة إلى المتجر</span>
          <ArrowLeft size={13} className="text-[#C6A972]" />
        </button>
      </header>

      {/* Centered Luxury Login Card with Warm Ivory Background */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[420px] bg-[#F8F5EE] border border-[#C6A972]/35 shadow-[0_20px_50px_rgba(8,20,45,0.45)] rounded-xs p-7 sm:p-9 relative">
          {/* Subtle Golden Top Accent Border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C6A972] to-transparent rounded-t-xs" />

          {/* Top Brand & Title Lockup */}
          <div className="text-center mb-6">
            <span className="font-serif text-xl sm:text-2xl tracking-[0.28em] text-[#0B1B3D] font-light uppercase block">
              LARANA
            </span>
            <span className="text-xs font-arabic text-[#C6A972] tracking-wider block mt-1 font-normal">
              لوحة إدارة المتجر
            </span>

            <div className="h-[1px] w-10 bg-[#C6A972]/60 mx-auto my-3" />

            <h1 className="font-arabic text-lg sm:text-xl font-normal text-[#0B1B3D] mt-2">
              مرحباً بعودتك
            </h1>
            <p className="text-xs text-[#5A534B] font-light mt-1">
              سجّلي الدخول لإدارة المتجر والمنتجات
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2 rounded-xs animate-in fade-in duration-200">
              <AlertCircle size={15} className="text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5 text-right">
              <label
                htmlFor="admin-email"
                className="block text-xs font-arabic text-[#0B1B3D] font-medium"
              >
                البريد الإلكتروني
              </label>
              <div className="relative flex items-center">
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@laranastore.om"
                  required
                  dir="ltr"
                  autoComplete="username"
                  className="w-full bg-[#FAF7F2] border border-[#C6A972]/30 px-3.5 py-2.5 text-xs sm:text-sm text-[#0B1B3D] placeholder-[#5A534B]/40 focus:outline-none focus:border-[#C6A972] focus:ring-1 focus:ring-[#C6A972]/40 rounded-xs transition-colors"
                />
                <Mail size={15} className="absolute left-3 text-[#C6A972]/70 pointer-events-none" />
              </div>
            </div>

            {/* Password Field with Show/Hide toggle */}
            <div className="space-y-1.5 text-right">
              <label
                htmlFor="admin-password"
                className="block text-xs font-arabic text-[#0B1B3D] font-medium"
              >
                كلمة المرور
              </label>
              <div className="relative flex items-center">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  dir="ltr"
                  autoComplete="current-password"
                  className="w-full bg-[#FAF7F2] border border-[#C6A972]/30 px-3.5 py-2.5 text-xs sm:text-sm text-[#0B1B3D] placeholder-[#5A534B]/40 focus:outline-none focus:border-[#C6A972] focus:ring-1 focus:ring-[#C6A972]/40 rounded-xs transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 text-[#5A534B] hover:text-[#0B1B3D] transition-colors p-1 cursor-pointer"
                  aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                  title={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Primary Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#0B1B3D] text-[#F8F5EE] border border-[#C6A972]/40 text-xs sm:text-sm font-arabic font-normal tracking-wide hover:bg-[#0E224D] hover:border-[#C6A972] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm rounded-xs disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={15} className="animate-spin text-[#C6A972]" />
                    <span>جارٍ التحقق...</span>
                  </>
                ) : (
                  <span>تسجيل الدخول</span>
                )}
              </button>
            </div>

            {/* Clear, Visible Preview Button Underneath the Normal Login Button */}
            <div className="pt-1.5">
              <button
                type="button"
                onClick={onPreviewDashboard}
                className="w-full py-2.5 px-4 bg-[#EFE8DE] hover:bg-[#E5DDCF] text-[#0B1B3D] border border-[#C6A972] font-arabic font-medium text-xs sm:text-sm tracking-wide rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Eye size={15} className="text-[#C6A972]" />
                <span>معاينة لوحة التحكم</span>
              </button>
            </div>

            {/* Forgot Password Link - Below the button */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setForgotModalOpen(true);
                  setForgotEmail(email);
                  setForgotSuccess(null);
                  setForgotError(null);
                }}
                className="text-xs text-[#5A534B] hover:text-[#0B1B3D] hover:underline cursor-pointer transition-colors"
              >
                نسيت كلمة المرور؟
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full px-6 py-4 text-center text-[11px] text-[#F8F5EE]/40 border-t border-[#C6A972]/15 max-w-5xl mx-auto">
        <span>© ٢٠٢٦ LARANA STORE · دار أزياء عُمانية</span>
      </footer>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08142D]/80 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setForgotModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#F8F5EE] border border-[#C6A972]/40 shadow-2xl p-6 sm:p-7 space-y-4 rounded-xs text-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1">
              <h3 className="font-arabic text-base sm:text-lg text-[#0B1B3D] font-normal">
                استعادة كلمة المرور
              </h3>
              <p className="text-xs text-[#5A534B] font-light">
                أدخلي بريدكِ الإلكتروني المسجل لتلقي رابط إعادة ضبط كلمة المرور.
              </p>
            </div>

            {forgotSuccess ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 rounded-xs">
                <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
                <span>{forgotSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-3 pt-1">
                {forgotError && (
                  <div className="p-2.5 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xs">
                    {forgotError}
                  </div>
                )}
                <div className="space-y-1 text-right">
                  <label htmlFor="forgot-email" className="block text-xs text-[#0B1B3D] font-medium">
                    البريد الإلكتروني
                  </label>
                  <input
                    id="forgot-email"
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    dir="ltr"
                    placeholder="admin@laranastore.om"
                    className="w-full bg-[#FAF7F2] border border-[#C6A972]/30 px-3 py-2 text-xs text-[#0B1B3D] focus:outline-none focus:border-[#C6A972] rounded-xs"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="flex-1 py-2.5 bg-[#0B1B3D] text-[#F8F5EE] border border-[#C6A972]/40 font-arabic text-xs hover:bg-[#0E224D] transition-colors cursor-pointer rounded-xs disabled:opacity-60"
                  >
                    {forgotLoading ? 'جارٍ الإرسال...' : 'إرسال الرابط'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="px-4 py-2.5 bg-[#FAF7F2] border border-[#C6A972]/30 text-xs text-[#0B1B3D] hover:bg-[#EFE8DE] cursor-pointer rounded-xs"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            )}

            {forgotSuccess && (
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(false)}
                  className="px-6 py-2 bg-[#0B1B3D] text-[#F8F5EE] border border-[#C6A972]/40 text-xs font-arabic rounded-xs cursor-pointer"
                >
                  إغلاق
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
