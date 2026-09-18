'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { cn } from '@/lib/utils';

const coachNavLinks = [
  { label: 'Command Center', href: '/coach', icon: 'dashboard' },
  { label: 'Athletic Roster Grid', href: '/coach/roster', icon: 'groups' },
  { label: 'Bio-Interventions Queue', href: '/coach/interventions', icon: 'emergency' },
  { label: 'Athlete Dispatch', href: '/app/messages', icon: 'forum' },
];

export default function CoachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#000000] text-white antialiased">
      {/* Fixed Top Header */}
      <Topbar />

      {/* Aside Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="lg:pl-64">
        <main className="w-full pt-16 bg-[#000000] min-h-screen">
          {/* Coach Dedicated Sub-Navigation Rail */}
          <div className="bg-[#0A0A0A] border-b border-[#242424] px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between overflow-x-auto gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777] hidden md:block mr-2">
                COACH CONSOLE:
              </span>
              {coachNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap',
                      isActive
                        ? 'bg-white text-black font-bold'
                        : 'text-[#777777] hover:text-white hover:bg-[#171717]',
                    )}
                  >
                    <span className="material-symbols-outlined text-sm">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-[#171717] border border-[#242424] text-[10px] font-mono uppercase text-white rounded whitespace-nowrap flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                LIVE TELEMETRY FEED (99.8%)
              </span>
            </div>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
