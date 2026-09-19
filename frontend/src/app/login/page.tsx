'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { UserRole } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      router.push('/app/dashboard');
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Invalid telemetry credentials. Please check your email and password.';
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setEmail('mikhail@athletecare.pro');
    setPassword('ProAthlete2026!');
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col justify-between p-6 sm:p-10 font-sans">
      {/* Top Bar */}
      <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-black border border-[#4A4A4A] flex items-center justify-center font-black text-white text-xs tracking-tighter">
            AC
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight uppercase text-white">AthleteCare</span>
            <span className="text-[10px] tracking-widest uppercase text-[#777777]">Pro Telemetry</span>
          </div>
        </Link>

        <Link
          href="/admin/login"
          className="text-xs font-mono uppercase tracking-wider text-[#777777] hover:text-white transition-colors flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-sm">shield</span>
          Staff & Admin Clearance →
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md mx-auto w-full my-auto">
        <div className="bg-[#111111] border border-[#242424] rounded-2xl p-8 shadow-2xl flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777]">
                ATHLETE PORTAL ACCESS
              </span>
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-tight text-white">Sign In to Telemetry</h1>
            <p className="text-xs text-[#777777] mt-1">
              Enter your credentials to synchronize with your biometrics matrix and coach protocol.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-[#171717] border border-[#ffb4ab] text-[#ffb4ab] rounded-lg text-xs font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1.5">
                Athlete Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mikhail@athletecare.pro"
                className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#777777] focus:outline-none focus:border-white font-mono"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-mono uppercase text-[#BDBDBD]">Password</label>
                <span className="text-[10px] font-mono text-[#777777] hover:text-white cursor-pointer">
                  Forgot Code?
                </span>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#777777] focus:outline-none focus:border-white font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#E5E2E1] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">login</span>
              {loading ? 'Authenticating...' : 'Sign In & Launch HUD'}
            </button>
          </form>

          {/* Demo Quick Fill */}
          <div className="pt-4 border-t border-[#242424] flex flex-col gap-2">
            <button
              type="button"
              onClick={handleQuickFill}
              className="w-full py-2 bg-[#171717] border border-[#4A4A4A] text-[#BDBDBD] hover:text-white hover:border-white text-[11px] font-mono uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-xs">bolt</span>
              Demo Quick-Fill: Mikhail R. (Pro Athlete)
            </button>

            <div className="text-center text-xs text-[#777777] mt-2">
              New athlete?{' '}
              <Link href="/register" className="text-white font-bold hover:underline">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[10px] font-mono uppercase text-[#777777] max-w-5xl mx-auto w-full">
        ATHLETECARE PRO TELEMETRY • ENCRYPTED BIO-DATA REPOSITORY • 256-BIT TLS
      </div>
    </div>
  );
}
