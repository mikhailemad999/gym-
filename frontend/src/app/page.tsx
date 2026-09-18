import Link from 'next/link';

export default function HomePage() {
  const portals = [
    {
      title: 'Client Telemetry Dashboard',
      href: '/app/dashboard',
      code: 'PORTAL-01 // CLIENT',
      desc: 'Real-time daily load monitoring, macro synthesis, scheduled mesocycle sessions, and assigned CSCS direct link.',
      badge: 'Active Live Feed',
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
      title: 'Performance Dispensary & Store',
      href: '/app/store',
      code: 'PORTAL-06 // STORE',
      desc: 'Third-party batch-tested ergogenic formulations, clinically-dosed micronutrients, and high-performance technical sportswear.',
      badge: 'Batch Verified',
      icon: 'shopping_bag',
    },
    {
      title: 'Coach Command Center',
      href: '/coach',
      code: 'PORTAL-07 // COACH',
      desc: 'Full roster intervention matrix, live HRV triage alerts, mesocycle compliance audits, and bulk plan deployment for certified CSCS staff.',
      badge: 'Staff Access',
      icon: 'sports_gymnastics',
    },
  ];

  return (
    <div className="min-h-screen bg-surface-base text-text-primary flex flex-col justify-between selection:bg-text-primary selection:text-text-inverse">
      {/* Top Header */}
      <header className="border-b border-border-subtle bg-surface-canvas sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-text-primary text-text-inverse flex items-center justify-center font-bold text-xs tracking-tighter">
              AC
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold tracking-tight uppercase text-text-primary">
                AthleteCare
              </span>
              <span className="text-[10px] tracking-widest uppercase text-text-muted">
                Pro Telemetry
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/app/dashboard"
              className="px-4 h-9 rounded-[10px] bg-text-primary text-text-inverse text-[12px] font-bold uppercase tracking-wider flex items-center gap-1.5 hover:opacity-90 transition-opacity"
            >
              Launch Dashboard
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col gap-12 w-full">
        <div className="flex flex-col gap-4 max-w-4xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-text-primary animate-pulse"></span>
            <span className="text-[11px] uppercase tracking-widest font-mono text-text-muted">
              SYSTEM STATUS: FULL OPERATIONAL DEPLOYMENT // PROXY PORT 3305
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[0.95] text-text-primary">
            CLINICAL ATHLETIC TELEMETRY &amp; PERFORMANCE PLATFORM
          </h1>

          <p className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed mt-2">
            Engineered to the strict specifications of <span className="text-text-primary font-semibold">DESIGN.md</span> and the <span className="text-text-primary font-semibold">Stitch Design System</span>. Pure monochrome ProMax aesthetics, zero colorful distractions, and sub-millimeter kinetic telemetry.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <Link
              href="/app/dashboard"
              className="px-6 h-12 rounded-[10px] bg-text-primary text-text-inverse text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-base">dashboard</span>
              Enter Client Dashboard
            </Link>
            <Link
              href="/coach"
              className="px-6 h-12 rounded-[10px] bg-surface-card border border-border-medium hover:border-text-primary text-text-primary text-[13px] font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-base">sports_gymnastics</span>
              Coach Command Center
            </Link>
          </div>
        </div>

        {/* Portals Showcase Grid */}
        <div className="flex flex-col gap-4 pt-6">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <span className="text-[11px] uppercase tracking-wider text-text-muted font-mono">
              SYSTEM PORTALS &amp; APPLICATION MODULES
            </span>
            <span className="text-[11px] uppercase tracking-wider text-text-primary font-semibold">
              7 Active Workspaces
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portals.map((portal) => (
              <Link
                key={portal.href}
                href={portal.href}
                className="p-5 rounded-[14px] bg-surface-card border border-border-subtle hover:border-border-medium transition-all duration-150 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                      {portal.code}
                    </span>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-surface-elevated border border-border-subtle text-text-primary">
                      {portal.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 mt-1">
                    <span className="material-symbols-outlined text-text-primary text-xl">
                      {portal.icon}
                    </span>
                    <h2 className="text-base font-bold text-text-primary uppercase tracking-tight group-hover:underline">
                      {portal.title}
                    </h2>
                  </div>

                  <p className="text-[13px] text-text-secondary leading-relaxed">
                    {portal.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-border-subtle flex items-center justify-between text-[11px] text-text-muted group-hover:text-text-primary transition-colors">
                  <span className="uppercase tracking-wider font-semibold">Launch Module</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle bg-surface-canvas py-6 mt-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-text-muted">
          <div className="flex items-center gap-2 font-mono">
            <span>ATHLETECARE PRO // SYSTEM ARCHITECTURE</span>
            <span>•</span>
            <span>NEXT.JS 16 + NESTJS + MYSQL 3305</span>
          </div>
          <div className="flex items-center gap-4 uppercase tracking-wider">
            <span>Clinical Precision</span>
            <span>Zero Unwanted Accent Color</span>
            <span>14px Signature Radius</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
