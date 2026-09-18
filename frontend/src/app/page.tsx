import Link from 'next/link';

export default function HomePage() {
  const portals = [
    {
      title: 'Client Telemetry Dashboard',
      href: '/app/dashboard',
      code: 'PORTAL-01 // CLIENT',
      desc: 'Real-time daily load monitoring, macro synthesis, scheduled mesocycle sessions, and assigned CSCS direct link.',
      badge: 'Active Feed',
      icon: 'dashboard',
    },
    {
      title: 'Active Workout Tracker',
      href: '/app/workout',
      code: 'PORTAL-02 // WORKOUT',
      desc: 'Tactical exercise workstation with set-by-set target/actual tracking, RPE logging, rest countdown timer, and load calculators.',
      badge: 'Live HUD Ready',
      icon: 'fitness_center',
    },
    {
      title: 'Diet & Metabolic Logistics',
      href: '/app/nutrition',
      code: 'PORTAL-03 // NUTRITION',
      desc: 'Clinical macro breakdown (P/C/F/Water), multi-meal timeline, electrolyte tracking, and supplement timing matrices.',
      badge: 'Protocol 18.4',
      icon: 'restaurant',
    },
    {
      title: 'Progress & Biomarkers',
      href: '/app/progress',
      code: 'PORTAL-04 // BIOMARKERS',
      desc: 'Longitudinal DEXA body composition, compound overload velocity curves, and clinical measurement logs across 12-week mesocycles.',
      badge: '12W Analysis',
      icon: 'monitoring',
    },
    {
      title: 'AI Performance Coach',
      href: '/app/ai-coach',
      code: 'PORTAL-05 // AI ENGINE',
      desc: 'Adaptive neural intelligence integrating recovery scores, training compliance, and real-time progressive overload recommendations.',
      badge: 'v4.8-Telemetry',
      icon: 'psychology',
    },
    {
      title: 'Appointments & Video Sync',
      href: '/app/appointments',
      code: 'PORTAL-06 // APPOINTMENTS',
      desc: 'Book frame-by-frame biomechanical reviews, metabolic calibrations, and video consultations with CSCS staff.',
      badge: 'WebRTC Room',
      icon: 'calendar_add_on',
    },
    {
      title: 'Encrypted Telemetry Messages',
      href: '/app/messages',
      code: 'PORTAL-07 // MESSAGES',
      desc: 'Direct dispatch channel with assigned CSCS coach Marcus Vance with live PR & HRV recovery snippet attachments.',
      badge: 'Encrypted Rail',
      icon: 'forum',
    },
    {
      title: 'Dispensary & Formulations',
      href: '/app/store',
      code: 'PORTAL-08 // STORE',
      desc: 'Third-party batch-tested ergogenic formulations, clinically-dosed micronutrients, and dedicated checkout flow.',
      badge: 'WADA Certified',
      icon: 'shopping_bag',
    },
    {
      title: 'Membership & Protocol Tiers',
      href: '/app/subscriptions',
      code: 'PORTAL-09 // PLANS',
      desc: 'Tier 1 Pro, Tier 2 Elite Olympian, and on-demand specialist movement audit packages.',
      badge: 'Pro Tier Access',
      icon: 'card_membership',
    },
    {
      title: 'Coach Command Center',
      href: '/coach',
      code: 'PORTAL-10 // COACH CONSOLE',
      desc: 'Full roster intervention matrix, live HRV triage alerts, mesocycle compliance audits, and bulk plan deployment for certified CSCS staff.',
      badge: 'CSCS Verified',
      icon: 'sports_gymnastics',
    },
    {
      title: 'Root System Administration',
      href: '/admin',
      code: 'PORTAL-11 // ADMIN ROOT',
      desc: 'Enterprise console for user directories, RBAC role calibration, formulation catalog, and SHA-256 audit trails.',
      badge: 'Level 4 Security',
      icon: 'admin_panel_settings',
    },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col justify-between selection:bg-white selection:text-black">
      {/* Top Header */}
      <header className="border-b border-[#242424] bg-[#0A0A0A] sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-black border border-[#4A4A4A] text-white flex items-center justify-center font-bold text-xs tracking-tighter">
              AC
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold tracking-tight uppercase text-white">
                AthleteCare
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#777777]">
                Pro Telemetry
              </span>
            </div>
          </div>

          {/* Dedicated Login Gateways */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 h-9 rounded-lg bg-[#111111] border border-[#4A4A4A] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#171717] hover:border-white transition-all"
            >
              <span className="material-symbols-outlined text-sm">login</span>
              Athlete Sign In
            </Link>

            <Link
              href="/admin/login"
              className="px-4 h-9 rounded-lg bg-white text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#E5E2E1] transition-all"
            >
              <span className="material-symbols-outlined text-sm">shield</span>
              Staff & Admin Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex flex-col gap-12 w-full">
        <div className="flex flex-col gap-4 max-w-4xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-[11px] uppercase tracking-widest font-mono text-[#777777]">
              SYSTEM STATUS: FULL ENTERPRISE DEPLOYMENT // MODULAR ROUTING ACTIVE
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase leading-[1.05] text-white">
            High-Performance Sports Telemetry & Coaching SaaS
          </h1>
          <p className="text-sm sm:text-base text-[#BDBDBD] max-w-2xl font-normal leading-relaxed">
            Engineered in strict accordance with the Stitch Design System. Complete bio-tracking, progressive overload calculators, precision nutrition scheduling, and dedicated coach operations.
          </p>

          {/* Quick Gateways Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/login"
              className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#E5E2E1] transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">person</span>
              Enter as Athlete (Mikhail R.)
            </Link>

            <Link
              href="/admin/login"
              className="px-6 py-3 bg-[#111111] border border-white text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#171717] transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">verified_user</span>
              Enter as Staff / SuperAdmin
            </Link>

            <Link
              href="/app/dashboard"
              className="px-5 py-3 bg-[#0A0A0A] border border-[#242424] text-[#BDBDBD] hover:text-white text-xs font-mono uppercase tracking-wider rounded-lg hover:border-[#4A4A4A] transition-all flex items-center gap-1.5"
            >
              Explore Live HUD →
            </Link>
          </div>
        </div>

        {/* Modular Systems Grid */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-[#242424] pb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#777777] font-mono">
              DECOUPLED APPLICATION PORTALS (11 ACTIVE MODULES)
            </h2>
            <span className="text-xs font-mono text-white">STITCH MONOCHROME 100%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {portals.map((portal) => (
              <Link
                key={portal.href}
                href={portal.href}
                className="p-5 rounded-xl bg-[#111111] border border-[#242424] flex flex-col justify-between gap-4 hover:border-[#4A4A4A] hover:-translate-y-1 transition-all group"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-[#777777] tracking-wider">
                      {portal.code}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0A0A0A] text-[#BDBDBD] border border-[#242424]">
                      {portal.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="material-symbols-outlined text-lg text-white">{portal.icon}</span>
                    <h3 className="text-sm font-bold uppercase tracking-tight text-white group-hover:text-white transition-colors">
                      {portal.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#777777] leading-relaxed line-clamp-3">
                    {portal.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#171717] flex items-center justify-between text-xs font-mono text-[#777777] group-hover:text-white transition-colors">
                  <span>Direct Route</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#242424] bg-[#0A0A0A] py-8 text-xs font-mono text-[#777777]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">ATHLETECARE PRO</span>
            <span>•</span>
            <span>NEXT.JS 16 TURBOPACK + NESTJS 11 + MYSQL 3305</span>
          </div>
          <div>STITCH ATHLETECARE PRO DESIGN SYSTEM • 100% PURE MONOCHROME</div>
        </div>
      </footer>
    </div>
  );
}
