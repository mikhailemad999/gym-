'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { cn } from '@/lib/utils';

const adminNavLinks = [
  { label: 'Cluster Overview', href: '/admin', icon: 'speed' },
  { label: 'User Directory & Roles', href: '/admin/users', icon: 'group' },
  { label: 'Dispensary Formulations', href: '/admin/products', icon: 'inventory_2' },
  { label: 'Cryptographic Audit', href: '/admin/audit', icon: 'security' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If on login page, don't show admin shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] antialiased">
      {/* Top Header */}
      <Topbar />

      {/* Aside Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="lg:pl-64">
        <main className="w-full pt-16 bg-[#000000] min-h-screen">
          {/* Admin Dedicated Sub-Navigation Rail */}
          <div className="bg-[#0A0A0A] border-b border-[#242424] px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between overflow-x-auto gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777] hidden md:block mr-2">
                ADMIN CONSOLE:
              </span>
              {adminNavLinks.map((link) => {
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
              <Link
                href="/admin/login"
                className="px-2.5 py-1 bg-[#171717] border border-[#4A4A4A] text-[10px] font-mono uppercase text-[#BDBDBD] hover:text-white rounded hover:border-white transition-all whitespace-nowrap"
              >
                Clearance Lock
              </Link>
            </div>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
