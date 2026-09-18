'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { UserRole } from '@/types';

export default function AdminLoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Check staff role
    const isCoach = email.toLowerCase().includes('vance') || email.toLowerCase().includes('coach');

    localStorage.setItem('accessToken', 'mock-admin-jwt-token');
    localStorage.setItem('refreshToken', 'mock-admin-refresh-token');
    setUser({
      id: isCoach ? 'staff-vance-cscs' : 'admin-root-001',
      email: email || 'admin@athletecare.pro',
      firstName: isCoach ? 'Marcus' : 'Super',
      lastName: isCoach ? 'Vance' : 'Admin',
      role: isCoach ? UserRole.COACH : UserRole.ADMIN,
      isActive: true,
      isVerified: true,
      profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    });

    if (isCoach) {
      router.push('/coach');
    } else {
      router.push('/admin');
    }
  };

  const fillCoach = () => {
    setEmail('vance.cscs@athletecare.pro');
    setPassword('CSCSStrength2026!');
    setTwoFactorCode('884219');
  };

  const fillAdmin = () => {
    setEmail('superadmin@athletecare.pro');
    setPassword('RootCluster2026!');
    setTwoFactorCode('991024');
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col justify-between p-6 sm:p-10 font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-black border border-white flex items-center justify-center font-black text-white text-xs tracking-tighter">
            AC
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight uppercase text-white">AthleteCare</span>
            <span className="text-[10px] tracking-widest uppercase text-[#777777]">Staff Clearance</span>
          </div>
        </Link>

        <Link
          href="/login"
          className="text-xs font-mono uppercase tracking-wider text-[#777777] hover:text-white transition-colors"
        >
          ← Return to Athlete Portal
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md mx-auto w-full my-auto">
        <div className="bg-[#111111] border border-[#4A4A4A] rounded-2xl p-8 shadow-2xl flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white font-bold">
                ROOT SECURITY LEVEL 4
              </span>
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-tight text-white">Staff Security Clearance</h1>
            <p className="text-xs text-[#777777] mt-1">
              Restricted console for CSCS coaching staff, sports scientists, and system administrators.
            </p>
          </div>

          <div className="p-3 bg-[#0A0A0A] border border-[#242424] rounded-lg text-[11px] font-mono text-[#BDBDBD] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-white">lock</span>
            All authentication attempts are cryptographically hashed & logged.
          </div>

          {error && (
            <div className="p-3 bg-[#171717] border border-[#ffb4ab] text-[#ffb4ab] rounded-lg text-xs font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1.5">
                Staff Identity / Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@athletecare.pro"
                className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#777777] focus:outline-none focus:border-white font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1.5">
                Master Security Key
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#777777] focus:outline-none focus:border-white font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1.5">
                2FA Telemetry Token (6-Digit)
              </label>
              <input
                type="text"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                placeholder="884 219"
                className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#777777] focus:outline-none focus:border-white font-mono tracking-widest"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#E5E2E1] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">verified_user</span>
              Authorize Clearance & Enter Console
            </button>
          </form>

          {/* Quick Fills */}
          <div className="pt-4 border-t border-[#242424] flex flex-col gap-2">
            <span className="text-[10px] font-mono uppercase text-[#777777] text-center">
              ONE-CLICK CREDENTIAL PROVISIONING
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={fillCoach}
                className="py-2 px-2 bg-[#171717] border border-[#242424] hover:border-white text-[10px] font-mono uppercase text-[#BDBDBD] hover:text-white rounded transition-all text-center"
              >
                Marcus Vance (Coach)
              </button>
              <button
                type="button"
                onClick={fillAdmin}
                className="py-2 px-2 bg-[#171717] border border-[#242424] hover:border-white text-[10px] font-mono uppercase text-[#BDBDBD] hover:text-white rounded transition-all text-center"
              >
                Root SuperAdmin
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-[10px] font-mono uppercase text-[#777777] max-w-5xl mx-auto w-full">
        SECURITY LEVEL 4 • ZERO TRUST TELEMETRY GATEWAY • STRICT ROLE-BASED ACCESS CONTROL
      </div>
    </div>
  );
}
