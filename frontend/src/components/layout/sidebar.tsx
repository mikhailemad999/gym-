'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth-store';

const operationsLinks = [
  { label: 'Overview', href: '/app/dashboard', icon: 'dashboard' },
  { label: 'Workout', href: '/app/workout', icon: 'fitness_center' },
  { label: 'Nutrition', href: '/app/nutrition', icon: 'restaurant' },
  { label: 'Progress', href: '/app/progress', icon: 'monitoring' },
  { label: 'AI Coach', href: '/app/ai-coach', icon: 'psychology' },
];

const channelsLinks = [
  { label: 'Store', href: '/app/store', icon: 'shopping_bag' },
  { label: 'Coach Console', href: '/coach', icon: 'sports_gymnastics' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-[#111111] bg-surface-card border-r border-[#242424] border-border-subtle z-40 hidden lg:flex flex-col justify-between py-6 px-4">
      <div className="flex flex-col gap-6">
        {/* Operations Section */}
        <div className="px-1">
          <span className="font-caption text-caption tracking-widest uppercase text-[#777777] text-text-muted block mb-2">
            Operations
          </span>
          <nav className="flex flex-col gap-1">
            {operationsLinks.map((link) => {
              const isActive =
                pathname === link.href || (link.href !== '/app/dashboard' && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-colors',
                    isActive
                      ? 'bg-[#171717] bg-surface-elevated text-white text-text-primary border-l-2 border-white font-semibold'
                      : 'text-[#777777] text-text-muted hover:bg-[#171717] hover:text-white',
                  )}
                >
                  <span className="material-symbols-outlined text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Channels Section */}
        <div className="px-1">
          <span className="font-caption text-caption tracking-widest uppercase text-[#777777] text-text-muted block mb-2">
            Channels
          </span>
          <nav className="flex flex-col gap-1">
            {channelsLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-colors',
                    isActive
                      ? 'bg-[#171717] bg-surface-elevated text-white text-text-primary border-l-2 border-white font-semibold'
                      : 'text-[#777777] text-text-muted hover:bg-[#171717] hover:text-white',
                  )}
                >
                  <span className="material-symbols-outlined text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Vitals Telemetry Widget at Bottom of Sidebar */}
      <div className="flex flex-col gap-3">
        <div className="p-3 bg-[#0A0A0A] bg-surface-canvas border border-[#242424] border-border-subtle rounded-lg flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-caption text-caption uppercase text-[#777777] text-text-muted">Vitals Telemetry</span>
            <span className="font-label-sm text-label-sm text-white text-text-primary">Live Feed 99.8%</span>
          </div>
          <span className="material-symbols-outlined text-white text-text-primary text-base animate-pulse">sensors</span>
        </div>

        {user && (
          <div className="pt-2 border-t border-[#242424] border-border-subtle flex items-center justify-between text-[11px] text-[#777777] text-text-muted">
            <span className="truncate max-w-[140px]">{user.email}</span>
            <button
              onClick={logout}
              className="text-white hover:underline text-[10px] uppercase font-bold"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
