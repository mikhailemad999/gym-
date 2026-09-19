'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { UserRole } from '@/types';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    primaryGoal: 'Hypertrophy & Biomechanical Overload',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      router.push('/app/dashboard');
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Registration failed. Please check your data and try again.';
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col justify-between p-6 sm:p-10 font-sans">
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
          href="/login"
          className="text-xs font-mono uppercase tracking-wider text-[#777777] hover:text-white transition-colors"
        >
          Already registered? Sign In →
        </Link>
      </div>

      <div className="max-w-lg mx-auto w-full my-auto">
        <div className="bg-[#111111] border border-[#242424] rounded-2xl p-8 shadow-2xl flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777]">
                NEW ATHLETE ONBOARDING
              </span>
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-tight text-white">Register Telemetry ID</h1>
            <p className="text-xs text-[#777777] mt-1">
              Initialize your bio-profile to receive customized mesocycles, nutrition fueling, and CSCS coach sync.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-[#171717] border border-[#ffb4ab] text-[#ffb4ab] rounded-lg text-xs font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1.5">First Name</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Mikhail"
                  className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#777777] focus:outline-none focus:border-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1.5">Last Name</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="R."
                  className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#777777] focus:outline-none focus:border-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1.5">Athlete Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="athlete@domain.com"
                className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#777777] focus:outline-none focus:border-white font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1.5">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••••••"
                className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#777777] focus:outline-none focus:border-white font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1.5">Primary Focus</label>
              <select
                value={formData.primaryGoal}
                onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white font-mono"
              >
                <option value="Hypertrophy & Biomechanical Overload">Hypertrophy & Biomechanical Overload</option>
                <option value="Olympic Weightlifting & Power">Olympic Weightlifting & Power</option>
                <option value="Aerobic Capacity & Endurance Taper">Aerobic Capacity & Endurance Taper</option>
                <option value="Body Composition & Contest Peaking">Body Composition & Contest Peaking</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#E5E2E1] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">how_to_reg</span>
              {loading ? 'Registering...' : 'Create Telemetry Account'}
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-[10px] font-mono uppercase text-[#777777] max-w-5xl mx-auto w-full">
        ATHLETECARE PRO TELEMETRY • WADA COMPLIANT BIO-ARCHIVES
      </div>
    </div>
  );
}
