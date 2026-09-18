'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function DashboardPage() {
  const [selectedWeek, setSelectedWeek] = useState('Last 6 Weeks');

  return (
    <div className="flex flex-col w-full">
      {/* Operational Sub-Header & Live Status */}
      <section className="w-full border-b border-border-subtle bg-surface-canvas px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-elevated text-text-primary text-[11px] font-semibold uppercase tracking-wider border border-border-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-text-primary animate-pulse"></span>
                Telemetry Synced
              </span>
              <span className="text-text-muted text-[11px]">•</span>
              <span className="text-[11px] text-text-muted uppercase tracking-widest font-mono">
                Client Telemetry Matrix / ID: 884-MKR
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-text-primary uppercase tracking-tight font-extrabold mt-1">
              Good Morning, Mikhail
            </h1>
            <div className="inline-flex items-center gap-2 mt-0.5">
              <span className="text-[11px] uppercase tracking-widest text-text-muted font-medium">Primary Goal:</span>
              <span className="text-[12px] uppercase tracking-wider text-text-primary bg-surface-card px-2 py-0.5 rounded border border-border-subtle font-semibold">
                Hypertrophy &amp; Performance (Phase 2 / Week 6)
              </span>
            </div>
          </div>

          {/* Quick Action Operations */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 md:pt-0">
            <button
              className="px-4 h-10 rounded-[10px] bg-surface-card border border-border-medium hover:border-text-primary text-text-primary text-[13px] font-semibold uppercase tracking-wider flex items-center gap-2 transition-all duration-150 active:scale-[0.98]"
              type="button"
            >
              <span className="material-symbols-outlined text-base text-text-muted">fact_check</span>
              Log Daily Check-in
            </button>
            <Link
              href="/app/nutrition"
              className="px-4 h-10 rounded-[10px] bg-surface-card border border-border-medium hover:border-text-primary text-text-primary text-[13px] font-semibold uppercase tracking-wider flex items-center gap-2 transition-all duration-150 active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-base text-text-muted">add</span>
              Log Meal
            </Link>
            <Link
              href="/app/workout"
              className="px-5 h-10 rounded-[10px] bg-text-primary text-text-inverse text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-150 active:scale-[0.98] shadow-sm hover:opacity-90"
            >
              <span className="material-symbols-outlined text-base">play_arrow</span>
              Start Workout
            </Link>
          </div>
        </div>
      </section>

      {/* Content Container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          {/* Top Metric Grid (4 Compact ProMax Stat Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Metric 1: Weight */}
            <div className="p-5 rounded-[14px] bg-surface-card border border-border-subtle hover:border-border-medium transition-all duration-150 hover:-translate-y-1 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">Current Body Mass</span>
                <span className="material-symbols-outlined text-text-muted text-base">scale</span>
              </div>
              <div className="pt-4 flex items-baseline justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-text-primary tracking-tight">82.4</span>
                  <span className="text-[13px] text-text-muted uppercase font-semibold">kg</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] uppercase text-text-primary font-semibold flex items-center gap-0.5 justify-end">
                    <span className="material-symbols-outlined text-sm">trending_down</span> -0.6 kg
                  </span>
                  <span className="text-[11px] text-text-muted block">This Week</span>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-border-subtle flex items-center justify-between text-text-muted text-[11px]">
                <span>Target: 85.0 kg</span>
                <span className="text-text-primary font-medium">Phase 2 Target (+2.6 kg)</span>
              </div>
            </div>

            {/* Metric 2: Daily Calories */}
            <div className="p-5 rounded-[14px] bg-surface-card border border-border-subtle hover:border-border-medium transition-all duration-150 hover:-translate-y-1 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">Daily Caloric Load</span>
                <span className="material-symbols-outlined text-text-muted text-base">local_fire_department</span>
              </div>
              <div className="pt-4 flex items-baseline justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-text-primary tracking-tight">2,340</span>
                  <span className="text-[13px] text-text-muted uppercase font-semibold">/ 2,850 kcal</span>
                </div>
                <span className="text-[12px] font-bold text-text-primary px-2 py-0.5 rounded bg-surface-elevated border border-border-subtle">
                  82%
                </span>
              </div>
              <div className="mt-3 flex flex-col gap-1.5">
                <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-text-primary rounded-full transition-all duration-300" style={{ width: '82%' }}></div>
                </div>
                <div className="flex justify-between text-[11px] text-text-muted">
                  <span>Remaining: 510 kcal</span>
                  <span className="font-medium text-text-secondary">1 Meal Scheduled</span>
                </div>
              </div>
            </div>

            {/* Metric 3: Protein Target */}
            <div className="p-5 rounded-[14px] bg-surface-card border border-border-subtle hover:border-border-medium transition-all duration-150 hover:-translate-y-1 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">Protein Synthesis</span>
                <span className="material-symbols-outlined text-text-muted text-base">restaurant</span>
              </div>
              <div className="pt-4 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-text-primary tracking-tight">184</span>
                    <span className="text-[13px] text-text-muted uppercase font-semibold">/ 210g</span>
                  </div>
                  <span className="text-[11px] text-text-muted block mt-0.5 font-medium">26g to optimal threshold</span>
                </div>
                {/* Minimal SVG Dial */}
                <div className="relative w-11 h-11 flex items-center justify-center">
                  <svg className="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" fill="none" r="15" stroke="#242424" strokeWidth="3"></circle>
                    <circle
                      cx="18"
                      cy="18"
                      fill="none"
                      r="15"
                      stroke="#FFFFFF"
                      strokeDasharray="94.2"
                      strokeDashoffset="11.3"
                      strokeLinecap="round"
                      strokeWidth="3"
                    ></circle>
                  </svg>
                  <span className="absolute text-[10px] leading-tight text-text-primary font-bold">88%</span>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-border-subtle flex items-center justify-between text-text-muted text-[11px]">
                <span>Macro Split: 35P / 45C / 20F</span>
                <span className="text-text-primary font-medium">On Schedule</span>
              </div>
            </div>

            {/* Metric 4: Adherence & Streak */}
            <div className="p-5 rounded-[14px] bg-surface-card border border-border-subtle hover:border-border-medium transition-all duration-150 hover:-translate-y-1 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">Consistency Metric</span>
                <span className="material-symbols-outlined text-text-muted text-base">verified</span>
              </div>
              <div className="pt-4 flex items-baseline justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-text-primary tracking-tight">14</span>
                  <span className="text-[13px] text-text-muted uppercase font-semibold">Days</span>
                </div>
                <div className="text-right">
                  <span className="text-[12px] font-bold text-text-primary">94%</span>
                  <span className="text-[11px] text-text-muted block">Monthly Adherence</span>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-border-subtle flex items-center justify-between text-text-muted text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-text-primary"></span>
                  Microcycle Clean
                </span>
                <span className="text-text-primary font-medium">Pro Level Rank</span>
              </div>
            </div>
          </div>

          {/* Main Operational Layout (65% / 35% Split) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN (65% -> 8 columns on desktop) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Scheduled Workout Module */}
              <div className="rounded-[14px] bg-surface-card border border-border-subtle overflow-hidden">
                {/* Header Bar */}
                <div className="p-5 border-b border-border-subtle bg-surface-canvas flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-surface-elevated border border-border-subtle text-text-primary">
                        Today&apos;s Scheduled Session
                      </span>
                      <span className="text-[11px] uppercase tracking-widest text-text-muted font-mono">Block 2B</span>
                    </div>
                    <h2 className="text-xl lg:text-2xl font-bold text-text-primary uppercase tracking-tight mt-1">
                      Chest &amp; Triceps Hypertrophy (Day 34)
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-text-muted uppercase tracking-wider font-medium">
                      <span>4 Exercises</span>
                      <span>•</span>
                      <span>16 Sets</span>
                      <span>•</span>
                      <span>Est. 55 Mins</span>
                      <span>•</span>
                      <span className="text-text-primary">Coach Marcus Vance</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="h-9 px-3 rounded bg-surface-elevated border border-border-medium hover:border-text-primary text-text-primary text-[12px] font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-base">videocam</span>
                      Guidance
                    </button>
                    <Link
                      href="/app/workout"
                      className="h-9 px-4 rounded bg-text-primary text-text-inverse text-[12px] font-bold uppercase tracking-wider flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-base">play_arrow</span>
                      Launch Tracker
                    </Link>
                  </div>
                </div>

                {/* Exercise List Table / Rows */}
                <div className="divide-y divide-border-subtle">
                  {/* Item 1 */}
                  <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-elevated transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded bg-surface-canvas border border-border-subtle flex items-center justify-center text-[13px] font-bold text-text-primary shrink-0">
                        01
                      </div>
                      <div>
                        <h3 className="text-[14px] font-semibold text-text-primary uppercase tracking-wide">
                          Barbell Incline Bench Press
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-[13px] text-text-muted">
                          <span>4 sets × 8–10 reps</span>
                          <span>•</span>
                          <span className="text-text-primary font-semibold">85.0 kg</span>
                          <span>•</span>
                          <span className="text-text-muted">RPE 8.5</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-surface-canvas border border-border-subtle text-text-muted font-medium">
                            Tempo 3-0-1-0
                          </span>
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-surface-canvas border border-border-subtle text-text-muted font-medium">
                            Rest: 120s
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-end md:self-center">
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] uppercase text-text-muted block tracking-wider">Previous Best</span>
                        <span className="text-[12px] font-semibold text-text-primary">82.5 kg × 10</span>
                      </div>
                      <button
                        aria-label="Exercise options"
                        className="w-8 h-8 rounded border border-border-subtle hover:border-text-primary flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-base">more_vert</span>
                      </button>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-elevated transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded bg-surface-canvas border border-border-subtle flex items-center justify-center text-[13px] font-bold text-text-primary shrink-0">
                        02
                      </div>
                      <div>
                        <h3 className="text-[14px] font-semibold text-text-primary uppercase tracking-wide">Weighted Dips</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-[13px] text-text-muted">
                          <span>4 sets × 10 reps</span>
                          <span>•</span>
                          <span className="text-text-primary font-semibold">+20.0 kg</span>
                          <span>•</span>
                          <span className="text-text-muted">RPE 9.0</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-surface-canvas border border-border-subtle text-text-muted font-medium">
                            Chain Load
                          </span>
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-surface-canvas border border-border-subtle text-text-muted font-medium">
                            Rest: 90s
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-end md:self-center">
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] uppercase text-text-muted block tracking-wider">Previous Best</span>
                        <span className="text-[12px] font-semibold text-text-primary">+20.0 kg × 8</span>
                      </div>
                      <button
                        aria-label="Exercise options"
                        className="w-8 h-8 rounded border border-border-subtle hover:border-text-primary flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-base">more_vert</span>
                      </button>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-elevated transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded bg-surface-canvas border border-border-subtle flex items-center justify-center text-[13px] font-bold text-text-primary shrink-0">
                        03
                      </div>
                      <div>
                        <h3 className="text-[14px] font-semibold text-text-primary uppercase tracking-wide">
                          Dumbbell Incline Flyes
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-[13px] text-text-muted">
                          <span>4 sets × 12 reps</span>
                          <span>•</span>
                          <span className="text-text-primary font-semibold">24.0 kg each</span>
                          <span>•</span>
                          <span className="text-text-muted">RPE 8.0</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-surface-canvas border border-border-subtle text-text-muted font-medium">
                            Constant Tension
                          </span>
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-surface-canvas border border-border-subtle text-text-muted font-medium">
                            Rest: 60s
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-end md:self-center">
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] uppercase text-text-muted block tracking-wider">Previous Best</span>
                        <span className="text-[12px] font-semibold text-text-primary">22.0 kg × 12</span>
                      </div>
                      <button
                        aria-label="Exercise options"
                        className="w-8 h-8 rounded border border-border-subtle hover:border-text-primary flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-base">more_vert</span>
                      </button>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-elevated transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded bg-surface-canvas border border-border-subtle flex items-center justify-center text-[13px] font-bold text-text-primary shrink-0">
                        04
                      </div>
                      <div>
                        <h3 className="text-[14px] font-semibold text-text-primary uppercase tracking-wide">
                          Rope Triceps Pushdown
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-[13px] text-text-muted">
                          <span>4 sets × 15 reps</span>
                          <span>•</span>
                          <span className="text-text-primary font-semibold">35.0 kg</span>
                          <span>•</span>
                          <span className="text-text-primary font-semibold">Drop Set on Set 4</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-surface-canvas border border-border-subtle text-text-muted font-medium">
                            Peak Contraction
                          </span>
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-surface-canvas border border-border-subtle text-text-muted font-medium">
                            Rest: 60s
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-end md:self-center">
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] uppercase text-text-muted block tracking-wider">Previous Best</span>
                        <span className="text-[12px] font-semibold text-text-primary">35.0 kg × 14</span>
                      </div>
                      <button
                        aria-label="Exercise options"
                        className="w-8 h-8 rounded border border-border-subtle hover:border-text-primary flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-base">more_vert</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Workout Footnote Bar */}
                <div className="p-4 bg-surface-canvas border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between text-text-muted text-[11px] gap-2">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="material-symbols-outlined text-sm text-text-primary">info</span>
                    Warm-up protocol: 10m dynamic thoracic mobility + 2 ramp sets incline press
                  </span>
                  <Link href="/app/workout" className="text-text-primary uppercase font-bold hover:underline">
                    View Load Table →
                  </Link>
                </div>
              </div>

              {/* Performance & Recovery Telemetry Visualizer */}
              <div className="p-5 rounded-[14px] bg-surface-card border border-border-subtle flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border-subtle gap-2">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">Telemetry Analytics</span>
                    <h3 className="text-lg font-bold text-text-primary uppercase tracking-tight">
                      Strength Progression &amp; Biomarkers
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-text-muted uppercase">Scope:</span>
                    <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 bg-surface-elevated rounded border border-border-subtle text-text-primary font-semibold">
                      {selectedWeek}
                    </span>
                  </div>
                </div>

                {/* Micro Vector Line Chart */}
                <div className="w-full bg-surface-canvas rounded-lg border border-border-subtle p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-[11px] text-text-muted">
                    <span className="uppercase tracking-wider font-medium">Compound Volume Trend (Kg Total Displacement)</span>
                    <span className="text-text-primary text-[12px] font-bold">+11.4% Overload Velocity</span>
                  </div>

                  {/* SVG Graph */}
                  <div className="w-full h-32 relative">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 120">
                      {/* Grid Guidelines */}
                      <line stroke="#1f1f1f" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="500" y1="20" y2="20"></line>
                      <line stroke="#1f1f1f" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="500" y1="60" y2="60"></line>
                      <line stroke="#1f1f1f" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="500" y1="100" y2="100"></line>

                      {/* Gradient Volume Fill */}
                      <defs>
                        <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18"></stop>
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0"></stop>
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 100 Q 80 85 140 75 T 260 55 T 380 40 T 500 18 L 500 120 L 0 120 Z"
                        fill="url(#chartGradient)"
                      ></path>
                      <path
                        d="M 0 100 Q 80 85 140 75 T 260 55 T 380 40 T 500 18"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      ></path>

                      {/* Markers */}
                      <circle cx="140" cy="75" fill="#FFFFFF" r="3"></circle>
                      <circle cx="260" cy="55" fill="#FFFFFF" r="3"></circle>
                      <circle cx="380" cy="40" fill="#FFFFFF" r="3"></circle>
                      <circle cx="500" cy="18" fill="#000000" r="4" stroke="#FFFFFF" strokeWidth="2"></circle>
                    </svg>
                  </div>

                  <div className="flex justify-between text-[10px] text-text-muted pt-1 border-t border-border-subtle uppercase tracking-wider font-mono">
                    <span>W1 (14.2k)</span>
                    <span>W2 (14.8k)</span>
                    <span>W3 (15.1k)</span>
                    <span>W4 (15.5k)</span>
                    <span>W5 (16.2k)</span>
                    <span className="text-text-primary font-bold">W6 (16.9k Today)</span>
                  </div>
                </div>

                {/* Recovery & Hydration Quick Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Sleep & Recovery Status */}
                  <div className="p-4 rounded-lg bg-surface-canvas border border-border-subtle flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-surface-elevated border border-border-subtle flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-text-primary">bedtime</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-text-muted block tracking-wider">Sleep Duration</span>
                        <span className="text-[14px] font-bold text-text-primary">7h 45m</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-text-primary px-2 py-0.5 rounded bg-surface-elevated border border-border-subtle">
                        Score: 92%
                      </span>
                      <span className="text-[10px] text-text-muted block mt-1 uppercase font-medium">Optimal CNS</span>
                    </div>
                  </div>

                  {/* Water Intake Status */}
                  <div className="p-4 rounded-lg bg-surface-canvas border border-border-subtle flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-surface-elevated border border-border-subtle flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-text-primary">water_drop</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-text-muted block tracking-wider">Hydration Target</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-[14px] font-bold text-text-primary">3.2L</span>
                          <span className="text-[11px] text-text-muted">/ 4.0L</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-text-primary">80% Met</span>
                      <span className="text-[10px] text-text-muted block mt-1 uppercase font-medium">0.8L Pre-Workout</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (35% -> 4 columns on desktop) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Today's Nutrition Timeline */}
              <div className="p-5 rounded-[14px] bg-surface-card border border-border-subtle flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">Fuel Schedule</span>
                    <h3 className="text-lg font-bold text-text-primary uppercase tracking-tight">Nutrition Timeline</h3>
                  </div>
                  <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-surface-elevated border border-border-subtle text-text-muted font-medium">
                    4 Meals
                  </span>
                </div>

                {/* Vertical Timeline */}
                <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-border-subtle">
                  {/* Meal 1: Breakfast */}
                  <div className="relative">
                    <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-text-primary border-2 border-surface-card"></span>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">08:00 AM • Breakfast</span>
                      <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-surface-elevated text-text-primary border border-border-subtle font-semibold">
                        Logged
                      </span>
                    </div>
                    <p className="text-[13px] font-medium text-text-primary mt-1">Oatmeal with Whey Isolate &amp; Berries</p>
                    <div className="flex items-center gap-2 text-[11px] text-text-muted mt-0.5">
                      <span>620 kcal</span>
                      <span>•</span>
                      <span className="text-text-primary font-semibold">48g Protein</span>
                    </div>
                  </div>

                  {/* Meal 2: Pre-workout */}
                  <div className="relative">
                    <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-text-primary border-2 border-surface-card"></span>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">12:30 PM • Pre-Workout</span>
                      <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-surface-elevated text-text-primary border border-border-subtle font-semibold">
                        Logged
                      </span>
                    </div>
                    <p className="text-[13px] font-medium text-text-primary mt-1">Chicken Breast, Jasmine Rice &amp; Avocado</p>
                    <div className="flex items-center gap-2 text-[11px] text-text-muted mt-0.5">
                      <span>740 kcal</span>
                      <span>•</span>
                      <span className="text-text-primary font-semibold">56g Protein</span>
                    </div>
                  </div>

                  {/* Meal 3: Post-workout */}
                  <div className="relative">
                    <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-surface-base border-2 border-text-primary ring-2 ring-surface-card"></span>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-text-primary font-bold">16:30 PM • Post-Workout</span>
                      <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-surface-canvas text-text-primary border border-border-strong font-semibold">
                        Up Next
                      </span>
                    </div>
                    <p className="text-[13px] font-medium text-text-primary mt-1">Hydrolyzed Whey + Dextrose + Creatine Creapure</p>
                    <div className="flex items-center gap-2 text-[11px] text-text-muted mt-0.5">
                      <span>380 kcal</span>
                      <span>•</span>
                      <span className="text-text-primary font-semibold">42g Protein</span>
                    </div>
                  </div>

                  {/* Meal 4: Dinner */}
                  <div className="relative">
                    <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-surface-card border-2 border-border-medium"></span>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">20:00 PM • Dinner</span>
                      <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-surface-canvas text-text-muted border border-border-subtle font-medium">
                        Pending
                      </span>
                    </div>
                    <p className="text-[13px] font-medium text-text-secondary mt-1">Grass-fed Ribeye &amp; Sweet Potato</p>
                    <div className="flex items-center gap-2 text-[11px] text-text-muted mt-0.5">
                      <span>800 kcal</span>
                      <span>•</span>
                      <span>58g Protein</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AthleteCare AI Coach Insights */}
              <div className="p-5 rounded-[14px] bg-surface-canvas border border-border-strong flex flex-col gap-4 relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-text-primary">psychology</span>
                    <span className="text-[11px] uppercase tracking-widest text-text-primary font-bold">
                      AthleteCare AI • Engine
                    </span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-text-primary animate-pulse"></span>
                </div>
                <p className="text-[13px] text-text-primary leading-relaxed">
                  &ldquo;Your training volume increased by 8% this week with stable sleep quality. Recovery index is optimal (92%) for progressive overload on today&apos;s incline pressing. Target a 2.5 kg bump on your top working set.&rdquo;
                </p>
                <div className="flex flex-col gap-2 pt-1">
                  <span className="text-[10px] uppercase text-text-muted tracking-wider font-semibold">Operational Prompts</span>
                  <Link
                    href="/app/ai-coach?prompt=suggest-recovery-meal"
                    className="w-full text-left p-2 px-3 rounded bg-surface-card border border-border-subtle hover:border-border-medium text-text-secondary hover:text-text-primary text-[11px] uppercase tracking-wider transition-colors flex items-center justify-between font-medium"
                  >
                    <span>Suggest post-workout recovery meal</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </Link>
                  <Link
                    href="/app/ai-coach?prompt=adjust-warmup"
                    className="w-full text-left p-2 px-3 rounded bg-surface-card border border-border-subtle hover:border-border-medium text-text-secondary hover:text-text-primary text-[11px] uppercase tracking-wider transition-colors flex items-center justify-between font-medium"
                  >
                    <span>Adjust today&apos;s warm-up protocol</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </Link>
                </div>
              </div>

              {/* Coach Sync & Appointment */}
              <div className="p-5 rounded-[14px] bg-surface-card border border-border-subtle flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                  <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">Staff Direct Link</span>
                  <span className="text-[11px] uppercase tracking-wider text-text-primary font-semibold">Assigned CSCS</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-surface-elevated border border-border-medium flex items-center justify-center font-bold text-sm text-text-primary shrink-0">
                    MV
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[14px] font-bold text-text-primary truncate">Marcus Vance</span>
                    <span className="text-[11px] uppercase tracking-wider text-text-muted truncate">
                      Certified Strength &amp; Conditioning Spec.
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded bg-surface-canvas border border-border-subtle flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-text-muted">Weekly Sync</span>
                    <span className="text-[11px] uppercase text-text-primary font-bold">Tomorrow • 10:00 AM</span>
                  </div>
                  <span className="text-[12px] text-text-secondary">Video Assessment Session Confirmed (Google Meet)</span>
                </div>
                <Link
                  href="/app/ai-coach"
                  className="w-full h-10 rounded-[10px] bg-surface-card border border-border-medium hover:border-text-primary text-text-primary text-[12px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  Message Coach
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
