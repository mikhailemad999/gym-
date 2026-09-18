'use client';

import { useState } from 'react';

export default function ProgressPage() {
  const [timeframe, setTimeframe] = useState('12W');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const timeframes = ['4W', '12W', '6M', '1Y', 'ALL'];

  const logs = [
    { date: 'Oct 24, 2026', mass: '82.4 kg', delta: '-0.6 kg', bf: '11.8%', lbm: '72.6 kg', chest: '112 cm', arms: '42.5 cm', waist: '81 cm' },
    { date: 'Oct 17, 2026', mass: '83.0 kg', delta: '+0.2 kg', bf: '12.0%', lbm: '73.0 kg', chest: '111.5 cm', arms: '42.2 cm', waist: '81.5 cm' },
    { date: 'Oct 10, 2026', mass: '82.8 kg', delta: '-0.4 kg', bf: '12.2%', lbm: '72.7 kg', chest: '111 cm', arms: '42.0 cm', waist: '81.5 cm' },
    { date: 'Oct 03, 2026', mass: '83.2 kg', delta: '-0.5 kg', bf: '12.5%', lbm: '72.8 kg', chest: '110.5 cm', arms: '41.8 cm', waist: '82 cm' },
    { date: 'Sep 26, 2026', mass: '83.7 kg', delta: '-0.3 kg', bf: '12.9%', lbm: '72.9 kg', chest: '110 cm', arms: '41.5 cm', waist: '82.5 cm' },
  ];

  const triggerExport = () => {
    setToastMessage('Biometric dossier exported to encrypted repository.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="flex flex-col w-full bg-surface-base min-h-screen">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-surface-elevated text-text-primary px-4 py-3 rounded-lg border border-border-strong shadow-2xl animate-fade-in">
          <span className="material-symbols-outlined text-text-primary text-base">check_circle</span>
          <span className="text-[12px] font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <section className="w-full border-b border-border-subtle bg-surface-canvas px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1440px] mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 bg-surface-elevated text-text-primary text-[10px] font-mono uppercase tracking-widest rounded border border-border-subtle">
                LONGITUDINAL TELEMETRY // 12-WEEK MESOCYCLE
              </span>
              <span className="text-[10px] text-text-muted uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-text-primary inline-block animate-pulse"></span>
                NODE: ATH-SYN-092
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl uppercase text-text-primary tracking-tight font-extrabold font-display mt-1">
              Progress &amp; Biomarkers
            </h1>
            <p className="text-[13px] text-text-muted max-w-2xl">
              Clinical-grade athletic progress telemetry, DEXA correlation logs, compound strength velocity, and biomechanical mesocycle tracking.
            </p>
          </div>

          {/* Controls & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Timeframe Selectors */}
            <div className="bg-surface-elevated p-1 rounded-lg flex items-center gap-1 border border-border-subtle">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded transition-all ${
                    timeframe === tf
                      ? 'bg-text-primary text-text-inverse shadow-sm'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                  type="button"
                >
                  {tf}
                </button>
              ))}
            </div>

            <button
              onClick={triggerExport}
              className="flex items-center gap-2 bg-surface-card hover:bg-surface-elevated text-text-primary px-4 h-10 rounded-[10px] border border-border-subtle text-[12px] font-semibold tracking-wider uppercase transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>Export Dossier</span>
            </button>

            <button
              className="flex items-center gap-2 bg-text-primary hover:opacity-90 text-text-inverse px-4 h-10 rounded-[10px] text-[12px] font-bold uppercase tracking-wider transition-all shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>Log New Measurements</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Workspace */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          {/* Top 4 KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* KPI 1 */}
            <div className="bg-surface-card p-5 rounded-[14px] border border-border-subtle flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase text-text-muted tracking-widest font-mono">Gross Body Mass</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-text-primary font-mono">82.4</span>
                    <span className="text-[12px] text-text-muted uppercase font-semibold">kg</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-text-muted text-base">monitor_weight</span>
              </div>
              <div className="mt-3 pt-2 border-t border-border-subtle flex items-center justify-between text-[11px] text-text-muted">
                <span>Delta: -0.6 kg this week</span>
                <span className="text-text-primary font-semibold">Phase 2 Target: 85.0 kg</span>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="bg-surface-card p-5 rounded-[14px] border border-border-subtle flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase text-text-muted tracking-widest font-mono">Lean Mass Index</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-text-primary font-mono">72.6</span>
                    <span className="text-[12px] text-text-muted uppercase font-semibold">kg LBM</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-text-muted text-base">accessibility_new</span>
              </div>
              <div className="mt-3 pt-2 border-t border-border-subtle flex items-center justify-between text-[11px] text-text-muted">
                <span>Body Fat: 11.8% DEXA</span>
                <span className="text-text-primary font-semibold">+1.8 kg Tissue Accretion</span>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="bg-surface-card p-5 rounded-[14px] border border-border-subtle flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase text-text-muted tracking-widest font-mono">Strength Velocity</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-text-primary font-mono">+11.4%</span>
                    <span className="text-[12px] text-text-muted uppercase font-semibold">Overload</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-text-muted text-base">trending_up</span>
              </div>
              <div className="mt-3 pt-2 border-t border-border-subtle flex items-center justify-between text-[11px] text-text-muted">
                <span>Incline Press: 85.0 kg × 10</span>
                <span className="text-text-primary font-semibold">PR Pace</span>
              </div>
            </div>

            {/* KPI 4 */}
            <div className="bg-surface-card p-5 rounded-[14px] border border-border-subtle flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase text-text-muted tracking-widest font-mono">HRV &amp; Vitals</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-text-primary font-mono">78 ms</span>
                    <span className="text-[12px] text-text-muted uppercase font-semibold">RMSSD</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-text-muted text-base">ecg_heart</span>
              </div>
              <div className="mt-3 pt-2 border-t border-border-subtle flex items-center justify-between text-[11px] text-text-muted">
                <span>Resting HR: 48 BPM</span>
                <span className="text-text-primary font-semibold">Readiness: 94% Optimal</span>
              </div>
            </div>
          </div>

          {/* Dual Interactive Telemetry Visualizers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: DEXA Body Composition */}
            <div className="p-5 rounded-[14px] bg-surface-card border border-border-subtle flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono">Telemetry Track A</span>
                  <h3 className="text-base font-bold text-text-primary uppercase tracking-tight">
                    Longitudinal DEXA Body Composition
                  </h3>
                </div>
                <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-surface-elevated text-text-primary border border-border-subtle font-semibold">
                  12-Week Delta
                </span>
              </div>

              <div className="w-full h-44 relative bg-surface-canvas rounded-lg p-3 border border-border-subtle">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 140">
                  <line stroke="#242424" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="500" y1="30" y2="30"></line>
                  <line stroke="#242424" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="500" y1="70" y2="70"></line>
                  <line stroke="#242424" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="500" y1="110" y2="110"></line>

                  {/* Lean mass curve (growing) */}
                  <path
                    d="M 0 110 Q 120 95 250 75 T 500 35"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                  ></path>
                  {/* Fat mass curve (declining) */}
                  <path
                    d="M 0 50 Q 120 65 250 85 T 500 115"
                    fill="none"
                    stroke="#777777"
                    strokeDasharray="4 4"
                    strokeWidth="2"
                  ></path>
                  <circle cx="500" cy="35" fill="#000000" r="5" stroke="#FFFFFF" strokeWidth="2.5"></circle>
                  <circle cx="500" cy="115" fill="#000000" r="4" stroke="#777777" strokeWidth="2"></circle>
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] text-text-muted font-mono">
                <span className="flex items-center gap-1.5 text-text-primary font-semibold">
                  <span className="w-2.5 h-0.5 bg-text-primary inline-block"></span>
                  Lean Body Mass (+1.8 kg)
                </span>
                <span className="flex items-center gap-1.5 text-text-secondary">
                  <span className="w-2.5 h-0.5 bg-text-muted inline-block"></span>
                  Fat Mass (-2.2 kg)
                </span>
              </div>
            </div>

            {/* Chart 2: Compound Strength Velocity */}
            <div className="p-5 rounded-[14px] bg-surface-card border border-border-subtle flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono">Telemetry Track B</span>
                  <h3 className="text-base font-bold text-text-primary uppercase tracking-tight">
                    Compound Overload Trajectory
                  </h3>
                </div>
                <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-surface-elevated text-text-primary border border-border-subtle font-semibold">
                  Top Working Sets
                </span>
              </div>

              <div className="w-full h-44 relative bg-surface-canvas rounded-lg p-3 border border-border-subtle">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 140">
                  <line stroke="#242424" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="500" y1="30" y2="30"></line>
                  <line stroke="#242424" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="500" y1="70" y2="70"></line>
                  <line stroke="#242424" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="500" y1="110" y2="110"></line>

                  {/* Progressive curve */}
                  <path
                    d="M 0 125 Q 120 100 240 70 T 500 20"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                  ></path>
                  <circle cx="240" cy="70" fill="#FFFFFF" r="3.5"></circle>
                  <circle cx="500" cy="20" fill="#000000" r="5" stroke="#FFFFFF" strokeWidth="2.5"></circle>
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] text-text-muted font-mono">
                <span className="text-text-primary font-bold">Week 01: 75.0 kg</span>
                <span className="text-text-primary font-bold">Week 06: 85.0 kg (Active)</span>
                <span className="text-text-secondary">Week 12 Target: 92.5 kg</span>
              </div>
            </div>
          </div>

          {/* Biomarkers Check-in Table */}
          <div className="p-5 rounded-[14px] bg-surface-card border border-border-subtle flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <span className="text-[11px] uppercase tracking-widest text-text-muted font-mono">
                LONGITUDINAL MEASUREMENT LOGS
              </span>
              <span className="text-[11px] uppercase tracking-wider text-text-primary font-bold">
                5 Entries Logged
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-[12px]">
                <thead>
                  <tr className="border-b border-border-subtle text-[11px] font-sans font-semibold uppercase tracking-wider text-text-muted">
                    <th className="py-2.5 px-3">DATE</th>
                    <th className="py-2.5 px-3">BODY MASS</th>
                    <th className="py-2.5 px-3">DELTA</th>
                    <th className="py-2.5 px-3">BODY FAT</th>
                    <th className="py-2.5 px-3">LEAN MASS</th>
                    <th className="py-2.5 px-3">CHEST</th>
                    <th className="py-2.5 px-3">ARMS</th>
                    <th className="py-2.5 px-3">WAIST</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {logs.map((row) => (
                    <tr key={row.date} className="hover:bg-surface-elevated transition-colors">
                      <td className="py-3 px-3 font-sans font-medium text-text-primary">{row.date}</td>
                      <td className="py-3 px-3 font-bold text-text-primary">{row.mass}</td>
                      <td className="py-3 px-3 text-text-secondary">{row.delta}</td>
                      <td className="py-3 px-3 text-text-primary">{row.bf}</td>
                      <td className="py-3 px-3 text-text-secondary">{row.lbm}</td>
                      <td className="py-3 px-3 text-text-muted">{row.chest}</td>
                      <td className="py-3 px-3 text-text-muted">{row.arms}</td>
                      <td className="py-3 px-3 text-text-muted">{row.waist}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
