'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth-store';

// Core essential daily links for desktop topbar
const coreNavLinks = [
  { label: 'Website', href: '/' },
  { label: 'Overview', href: '/app/dashboard' },
  { label: 'Workout', href: '/app/workout' },
  { label: 'Nutrition', href: '/app/nutrition' },
  { label: 'Progress', href: '/app/progress' },
  { label: 'Plans', href: '/app/subscriptions' },
];

const secondaryNavLinks = [
  { label: 'AI Performance Coach', href: '/app/ai-coach', icon: 'psychology' },
  { label: 'Appointments & Reviews', href: '/app/appointments', icon: 'calendar_add_on' },
  { label: 'Coach Messages', href: '/app/messages', icon: 'forum' },
  { label: 'Supplements Store', href: '/app/store', icon: 'shopping_bag' },
  { label: 'Coach Console', href: '/coach', icon: 'sports_gymnastics' },
  { label: 'Administration', href: '/admin', icon: 'admin_panel_settings' },
];

const mobileOperationsLinks = [
  { label: 'Overview HUD', href: '/app/dashboard', icon: 'dashboard' },
  { label: 'Live Workout', href: '/app/workout', icon: 'fitness_center' },
  { label: 'Diet & Macros', href: '/app/nutrition', icon: 'restaurant' },
  { label: 'Progress & Bio', href: '/app/progress', icon: 'monitoring' },
  { label: 'Recovery & Vitals', href: '/app/recovery', icon: 'vital_signs' },
  { label: 'AI Coach Hub', href: '/app/ai-coach', icon: 'psychology' },
  { label: 'Appointments', href: '/app/appointments', icon: 'calendar_add_on' },
];

const mobileChannelsLinks = [
  { label: 'Coach Dispatch', href: '/app/messages', icon: 'forum' },
  { label: 'Dispensary Store', href: '/app/store', icon: 'shopping_bag' },
  { label: 'Plans & Memberships', href: '/app/subscriptions', icon: 'card_membership' },
  { label: 'Coach Console', href: '/coach', icon: 'sports_gymnastics' },
  { label: 'System Admin', href: '/admin', icon: 'admin_panel_settings' },
];

const mobileBottomLinks = [
  { label: 'Overview', href: '/app/dashboard', icon: 'dashboard' },
  { label: 'Workout', href: '/app/workout', icon: 'fitness_center' },
  { label: 'Nutrition', href: '/app/nutrition', icon: 'restaurant' },
  { label: 'Recovery', href: '/app/recovery', icon: 'vital_signs' },
];

export function Topbar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreMenuOpen(false);
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileDrawerOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#242424]">
        <div className="h-16 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand / Logo + Mobile Menu Toggle */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="lg:hidden p-2 rounded-lg text-[#BDBDBD] hover:text-white hover:bg-[#1A1A1A] transition-colors focus:outline-none"
              aria-label="Toggle Navigation Drawer"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileDrawerOpen ? 'close' : 'menu'}
              </span>
            </button>

            <Link href="/app/dashboard" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-black border border-[#4A4A4A] flex items-center justify-center font-black text-white text-xs tracking-tighter shadow-sm flex-shrink-0 group-hover:border-white transition-colors">
                AC
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black tracking-tight uppercase text-white leading-tight">
                  AthleteCare
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#777777] leading-tight">
                  Pro Telemetry
                </span>
              </div>
            </Link>

            {/* Clean Desktop Navigation — Only Essential Daily Links */}
            <nav className="hidden lg:flex items-center gap-5 ml-2">
              {coreNavLinks.map((link) => {
                const isHome = link.href === '/';
                const isActive = isHome
                  ? pathname === '/'
                  : pathname === link.href || (link.href !== '/app/dashboard' && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-[12px] font-semibold uppercase tracking-wider transition-colors py-2',
                      isActive
                        ? 'text-white border-b-2 border-white font-bold'
                        : 'text-[#888888] hover:text-white',
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Clean "More" Dropdown for Secondary Portals */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                  className={cn(
                    'flex items-center gap-1 text-[12px] font-semibold uppercase tracking-wider py-2 transition-colors',
                    moreMenuOpen ? 'text-white' : 'text-[#888888] hover:text-white',
                  )}
                >
                  <span>More</span>
                  <span className="material-symbols-outlined text-sm">
                    {moreMenuOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {moreMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-60 rounded-xl bg-[#111111] border border-[#2A2A2A] shadow-2xl p-2 flex flex-col gap-1 z-50">
                    {secondaryNavLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMoreMenuOpen(false)}
                        className={cn(
                          'flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors',
                          pathname.startsWith(item.href)
                            ? 'bg-[#1F1F1F] text-white font-bold'
                            : 'text-[#999999] hover:bg-[#1A1A1A] hover:text-white',
                        )}
                      >
                        <span className="material-symbols-outlined text-base">{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right Side Telemetry Badges & Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Streak Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#141414] border border-[#242424] rounded-lg">
              <span className="material-symbols-outlined text-white text-base">bolt</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[12px] font-bold text-white">18</span>
                <span className="text-[10px] uppercase text-[#777777] tracking-wider">Day Streak</span>
              </div>
            </div>

            <div className="h-6 w-px bg-[#242424] hidden sm:block"></div>

            {/* User Profile Capsule */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 sm:gap-2.5 p-1 rounded-lg hover:bg-[#171717] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-[#4A4A4A] flex items-center justify-center font-bold text-xs text-white">
                  {user?.firstName?.[0] || 'M'}
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-[12px] font-semibold text-white leading-tight">
                    {user ? `${user.firstName} ${user.lastName?.[0] || ''}.` : 'Mikhail R.'}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#777777] leading-tight">
                    {user?.role?.toUpperCase().replace('_', ' ') || 'Pro Athlete'}
                  </span>
                </div>
                <span className="material-symbols-outlined text-sm text-[#777777]">
                  {userMenuOpen ? 'arrow_drop_up' : 'arrow_drop_down'}
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-xl bg-[#111111] border border-[#2A2A2A] shadow-2xl p-2 flex flex-col gap-1 z-50">
                  <Link
                    href="/"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#BDBDBD] hover:bg-[#1A1A1A] hover:text-white"
                  >
                    <span className="material-symbols-outlined text-base">home</span>
                    <span>Main Website</span>
                  </Link>
                  <Link
                    href="/app/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#BDBDBD] hover:bg-[#1A1A1A] hover:text-white"
                  >
                    <span className="material-symbols-outlined text-base">dashboard</span>
                    <span>Athlete Dashboard</span>
                  </Link>
                  <div className="my-1 border-t border-[#222222]"></div>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      logout();
                      window.location.href = '/login';
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-base">logout</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MOBILE SLIDE-OVER NAVIGATION DRAWER (Full Phone & Tablet Navigation)
          ========================================================================= */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer Container */}
          <div className="relative w-80 max-w-[85vw] bg-[#0E0E0E] border-r border-[#262626] h-full flex flex-col justify-between p-5 z-10 shadow-2xl overflow-y-auto">
            <div className="flex flex-col gap-5">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#222222]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black border border-[#4A4A4A] flex items-center justify-center font-black text-white text-xs tracking-tighter">
                    AC
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black tracking-tight uppercase text-white leading-tight">
                      AthleteCare Pro
                    </span>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#777777] leading-tight">
                      Mobile HUD
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 text-[#888888] hover:text-white rounded-lg hover:bg-[#1A1A1A] transition-colors"
                  aria-label="Close Drawer"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              {/* Operations Section */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777] px-2 mb-1">
                  Athlete Operations
                </span>
                {mobileOperationsLinks.map((item) => {
                  const isActive =
                    pathname === item.href || (item.href !== '/app/dashboard' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors',
                        isActive
                          ? 'bg-[#1C1C1C] text-white border-l-2 border-white'
                          : 'text-[#888888] hover:text-white hover:bg-[#171717]',
                      )}
                    >
                      <span className="material-symbols-outlined text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Channels & Consoles Section */}
              <div className="flex flex-col gap-1 pt-2 border-t border-[#222222]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777] px-2 mb-1">
                  Consoles &amp; Store
                </span>
                {mobileChannelsLinks.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors',
                        isActive
                          ? 'bg-[#1C1C1C] text-white border-l-2 border-white'
                          : 'text-[#888888] hover:text-white hover:bg-[#171717]',
                      )}
                    >
                      <span className="material-symbols-outlined text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Website Link */}
              <div className="pt-2 border-t border-[#222222]">
                <Link
                  href="/"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#888888] hover:text-white hover:bg-[#171717] transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">home</span>
                  <span>Landing Website</span>
                </Link>
              </div>
            </div>

            {/* Bottom Telemetry Status & Logout */}
            <div className="flex flex-col gap-3 pt-4 border-t border-[#222222]">
              <div className="p-3 bg-[#121212] border border-[#242424] rounded-lg flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-mono text-[#777777]">Telemetry Status</span>
                  <span className="text-xs font-bold text-white">Live Stream 99.8%</span>
                </div>
                <span className="material-symbols-outlined text-emerald-400 text-base animate-pulse">
                  sensors
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-[#888888] px-1">
                <span className="truncate max-w-[150px]">{user?.email || 'mikhail@athletecare.pro'}</span>
                <button
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    logout();
                    window.location.href = '/login';
                  }}
                  className="text-white hover:underline text-[11px] uppercase font-bold tracking-wider"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MOBILE BOTTOM NAVIGATION BAR (Thumb Reachable Quick Access on Phones)
          ========================================================================= */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-[#242424] px-2 py-1.5 flex items-center justify-around shadow-2xl safe-area-inset-bottom">
        {mobileBottomLinks.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== '/app/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-colors',
                isActive ? 'text-white' : 'text-[#777777] hover:text-[#BDBDBD]',
              )}
            >
              <span
                className={cn(
                  'material-symbols-outlined text-xl mb-0.5',
                  isActive ? 'text-white font-bold' : 'text-[#777777]',
                )}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Menu Drawer Opener */}
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className={cn(
            'flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-semibold uppercase tracking-wider text-[#777777] hover:text-white transition-colors',
            mobileDrawerOpen && 'text-white',
          )}
          aria-label="Open Full App Menu"
        >
          <span className="material-symbols-outlined text-xl mb-0.5">menu</span>
          <span>More</span>
        </button>
      </nav>
    </>
  );
}

