'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth-store';

const navLinks = [
  { label: 'Overview', href: '/app/dashboard' },
  { label: 'Workout', href: '/app/workout' },
  { label: 'Nutrition', href: '/app/nutrition' },
  { label: 'Progress', href: '/app/progress' },
  { label: 'AI Coach', href: '/app/ai-coach' },
  { label: 'Store', href: '/app/store' },
  { label: 'Coach Console', href: '/coach' },
];

export function Topbar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#111111] bg-surface-card border-b border-[#242424] border-border-subtle">
      <div className="h-16 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <Link href="/app/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-black border border-[#4A4A4A] flex items-center justify-center font-black text-white text-xs tracking-tighter shadow-sm flex-shrink-0">
              AC
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md tracking-tight uppercase text-text-primary text-white font-bold">
                AthleteCare
              </span>
              <span className="font-caption text-[10px] tracking-widest uppercase text-text-muted text-[#777777]">
                Pro Telemetry
              </span>
            </div>
          </Link>

          {/* Desktop Horizontal Navigation */}
          <nav className="hidden xl:flex items-center gap-6 ml-4">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || (link.href !== '/app/dashboard' && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-[12px] font-semibold uppercase tracking-wider transition-colors py-2',
                    isActive
                      ? 'text-white text-text-primary border-b-2 border-white font-bold'
                      : 'text-[#777777] text-text-muted hover:text-white',
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Side Telemetry Badges & Profile */}
        <div className="flex items-center gap-4">
          {/* Streak Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#171717] bg-surface-elevated border border-[#242424] border-border-subtle rounded-lg">
            <span className="material-symbols-outlined text-white text-base">bolt</span>
            <div className="flex items-baseline gap-1">
              <span className="text-[12px] font-bold text-white">18</span>
              <span className="text-[10px] uppercase text-[#777777] tracking-wider">Day Streak</span>
            </div>
          </div>

          {/* Notification Trigger */}
          <button
            aria-label="Notifications"
            className="relative p-2 text-[#777777] hover:text-white transition-colors rounded-lg"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full ring-2 ring-[#111111]"></span>
          </button>

          <div className="h-6 w-px bg-[#242424] hidden sm:block"></div>

          {/* User Profile Capsule */}
          <div className="flex items-center gap-2.5 pl-1">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-[#4A4A4A]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD_GiDZtEzAJxK_LW74UFTNjSXu5x_d1-0Nd89VonEHECAmC4ep8qfG8l08Yis6ivMVy3dozSZlhtRDFXE0BJhCp6kbqXpDIP4lV0B4C44T_KpZSzMj8dLNzbsM5OBK3lDssL9RCgXdWuD4_mTI4jS0ygQT2Ptf0e-ZnCTngO-qQNRTFu_9sVrwBu-xPXr5olVHhQ8M9JulC7V65MWTpe7_EAs_FYSb60RhxnFduuF7AjNreKcHbeh"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-[12px] font-semibold text-white leading-tight">
                {user ? `${user.firstName} ${user.lastName?.[0]}.` : 'Mikhail R.'}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#777777] leading-tight">
                {user?.role?.toUpperCase().replace('_', ' ') || 'Pro Athlete'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
