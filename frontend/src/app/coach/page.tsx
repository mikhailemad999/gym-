'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Athlete {
  id: string;
  name: string;
  avatar: string;
  tier: string;
  discipline: string;
  phase: string;
  microcycle: string;
  adherence: number;
  lastTelemetryTime: string;
  lastTelemetryDetail: string;
  cnsStatus: string;
  cnsRatio?: number;
  needsReview?: boolean;
  category: 'tier1' | 'hypertrophy' | 'endurance';
}

const initialAthletes: Athlete[] = [
  {
    id: '1',
    name: 'Mikhail R.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZtGJiiqobiwUxnOvl_x71hRaQgrg29WD7aRq7vf2OnS2uJfcEfF7iV6_90uwHVVUl9nGym1Tkn3fbZaEr__qfEE66WyDxqb6d1uOoKHM0VA_tGQ7pThBe3yU3dYOYPFYMVFGXzAq8TpL7Iv3EvCFIsiMOdsOe9d5hKKzXWzpDXRjYOO1A88pnoJ8uW4FBoGjBwhY8UjFEMDx5yw8nuanzYF_nG9Y-F4LLu0vgjY0Kw9w5CvhXPYi8',
    tier: 'Tier 1 Pro',
    discipline: 'Strength',
    phase: 'Hypertrophy II',
    microcycle: 'Week 09 / Day 03',
    adherence: 96,
    lastTelemetryTime: 'Today, 08:42',
    lastTelemetryDetail: 'Push Session B (RPE 9.0)',
    cnsStatus: 'OPTIMAL (1.04)',
    cnsRatio: 1.04,
    needsReview: true,
    category: 'tier1',
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_5-v6GLLbGTriYATFYuuwd0PelYRXCUG_Pn5a6gy2yeyNsy5jJ9jjyx59LSOdkHbXMkIvSsgbDoJaPciAhPgX1qOnXbhx132Oj0sfKYDqbqwlvhpyBfH4RnKB1HJF64z-dSRtGihiK4PZUqhD7rYSaDas1IaL0tyt9y6F4otVZVjm2Zmtxgf791UH8sJ1C54uUCBJIQq46ZZwE3K1neMLqUreizqCuRa2HWam_xTmajDnPJSJVzsi',
    tier: 'Tier 1 Pro',
    discipline: 'Endurance',
    phase: 'Marathon Peak',
    microcycle: 'Week 14 / Taper Prep',
    adherence: 91,
    lastTelemetryTime: 'Today, 06:15',
    lastTelemetryDetail: 'Biometrics • HRV Down',
    cnsStatus: 'OVERLOADED (1.42)',
    cnsRatio: 1.42,
    needsReview: true,
    category: 'endurance',
  },
  {
    id: '3',
    name: 'David Zhao',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvfXwRwV9SR5STMqRd4YvjfmAIc2j4mYvE9ZRtQBoBcsYebr-U6oY4Zp--ZZwP80985peZtVLJzabAWVM0H6bSZlwtiE8B9CkhzCcTaqF4P_H62uHQ-58VDqz2jFUUsaO6cgzZRyxpHLuzjo7csaCBctOzCRmtC0gF21N6jNYo5Dsa5i6V6QK5T9Y4zBcXSGNlK6kG1N54zJn1RsIlm0Tft3yuilXp8zCqVK-lCzfFlcb9zNQJRQIK',
    tier: 'Senior Athlete',
    discipline: 'Olympic Lifting',
    phase: 'Clean & Jerk Peaking',
    microcycle: 'Week 08 / Deload Due',
    adherence: 78,
    lastTelemetryTime: '2 Days Ago',
    lastTelemetryDetail: 'Missing Check-in',
    cnsStatus: 'CNS FATIGUE',
    needsReview: true,
    category: 'hypertrophy',
  },
  {
    id: '4',
    name: 'Elena Rostova',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfq3o3nWkLt5rimE67Or6GomlWIcyXy1bG_oGZLFFHEsjZ6aeeFD39ITe4SzZKOOrvmKgU6TVbX6yR2N4AhldElvCxPj_WkC5QX0qYyncVnmMKna9XfydozKy-kvBmThHV-DOkA4v59VdWa9oPeAH_qd0PbAKTS04ocnVvA7cLPyTO8OUd31BX2Z_chhFOaUF_a4PQ4cw0ugx6iMP5Pju6WsG1R1imhVwww_feqdFi-PS0-Ao_N-nQ',
    tier: 'Tier 1 Pro',
    discipline: 'Gymnastics',
    phase: 'Mobility & Power',
    microcycle: 'Week 04 / Phase 1',
    adherence: 100,
    lastTelemetryTime: 'Today, 09:10',
    lastTelemetryDetail: 'Routine Perfect 10/10',
    cnsStatus: 'PRIMED (0.92)',
    cnsRatio: 0.92,
    needsReview: false,
    category: 'tier1',
  },
  {
    id: '5',
    name: 'Marcus Thorne',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHOluzmKMQzaAp68B3ewehWU7v_UB5HBUWYCp0gBGMeTDWGeBQH608S9w6Q9AT5WrmLiKLN-TeeVF3jgBnfSPD_Zy2oC7s8fTBEFoJE9cypTpY8sYZCcAKlYMklfg_suAkNje6OyvPcQLv4bXwyhkLHMoTUfZFbICFkW8vDM2Z51tCIjVBRdGbjSHD-EyjgkezAwj_hwTPtb3Ec6onXwkq7D_0DAJ-7admLCW7ZkPmFchDmWVoIxlD',
    tier: 'Tier 1 Pro',
    discipline: 'Sprint 100m',
    phase: 'Max Velocity Block',
    microcycle: 'Week 06 / Micro 3',
    adherence: 98,
    lastTelemetryTime: 'Yesterday, 19:40',
    lastTelemetryDetail: 'Speed Traps: 11.2 m/s',
    cnsStatus: 'OPTIMAL (1.01)',
    cnsRatio: 1.01,
    needsReview: false,
    category: 'tier1',
  },
];

export default function CoachCommandCenterPage() {
  const [filterTab, setFilterTab] = useState<'all' | 'tier1' | 'hypertrophy' | 'review'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [syncCountdown, setSyncCountdown] = useState(14);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);

  // Live countdown timer for telemetry sync
  useEffect(() => {
    const timer = setInterval(() => {
      setSyncCountdown((prev) => (prev <= 1 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4000);
  };

  // Filter athletes
  const filteredAthletes = initialAthletes.filter((ath) => {
    if (filterTab === 'tier1' && ath.category !== 'tier1') return false;
    if (filterTab === 'hypertrophy' && ath.category !== 'hypertrophy') return false;
    if (filterTab === 'review' && !ath.needsReview) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        ath.name.toLowerCase().includes(q) ||
        ath.tier.toLowerCase().includes(q) ||
        ath.phase.toLowerCase().includes(q) ||
        ath.discipline.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Toast Notification */}
      {actionNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-text-primary text-text-inverse px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3 border border-border-strong animate-in fade-in slide-in-from-bottom-3 duration-300">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span className="text-xs font-bold uppercase tracking-wider">{actionNotice}</span>
        </div>
      )}

      {/* Command Header & Breadcrumb Strip */}
      <div className="w-full bg-surface-canvas px-4 sm:px-6 lg:px-8 py-4 border-b border-border-subtle">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-text-muted">
                ATHLETECARE PRO
              </span>
              <span className="text-text-muted text-[11px]">/</span>
              <span className="text-[11px] font-semibold tracking-widest uppercase text-text-primary">
                COACH CONSOLE // BIO-TELEMETRY MATRIX
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase text-text-primary">
              COACH COMMAND CENTER{' '}
              <span className="text-text-muted font-light">// ATHLETIC ROSTER & INTERVENTION MATRIX</span>
            </h1>
            <p className="text-sm text-text-secondary mt-1 max-w-3xl">
              Real-time telemetry triage, mesocycle compliance monitoring, and bio-programming intervention for Marcus Vance, CSCS.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setSyncCountdown(30);
                triggerNotice('Live telemetry feed refreshed');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-surface-card hover:bg-surface-elevated text-text-primary rounded-lg transition-all border border-border-subtle shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-base animate-spin">sync</span>
              <span className="text-xs font-semibold uppercase tracking-wider">
                Live Sync (00:{syncCountdown.toString().padStart(2, '0')})
              </span>
            </button>
            <button
              onClick={() => triggerNotice('Telemetry Dossier exported (PDF/CSV)')}
              className="flex items-center gap-2 px-4 py-2 bg-surface-card hover:bg-surface-elevated text-text-primary rounded-lg transition-all border border-border-subtle shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-base">ios_share</span>
              <span className="text-xs font-semibold uppercase tracking-wider">Export Report</span>
            </button>
            <button
              onClick={() => triggerNotice('Bulk mesocycle push initiated for 28 athletes')}
              className="flex items-center gap-2 px-4 py-2 bg-surface-card hover:bg-surface-elevated text-text-primary rounded-lg transition-all border border-border-subtle shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-base">dynamic_feed</span>
              <span className="text-xs font-semibold uppercase tracking-wider">Bulk Plan Push</span>
            </button>
            <button
              onClick={() => triggerNotice('Athlete onboarding link copied to clipboard')}
              className="flex items-center gap-2 px-4 py-2 bg-text-primary text-text-inverse hover:bg-surface-tint rounded-lg transition-transform active:scale-95 shadow-md"
            >
              <span className="material-symbols-outlined text-base font-bold">add</span>
              <span className="text-xs font-bold uppercase tracking-wider">Invite Athlete</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Workspace */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* KPI Matrix Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* KPI 1 */}
          <div className="bg-surface-card p-4 rounded-[14px] border border-border-subtle flex flex-col justify-between shadow-sm hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-text-muted">
                ACTIVE ATHLETES
              </span>
              <span className="material-symbols-outlined text-base text-text-muted">sports_gymnastics</span>
            </div>
            <div className="my-3">
              <div className="text-3xl font-bold text-text-primary leading-none">
                28 <span className="text-xl text-text-muted font-normal">/ 30</span>
              </div>
              <div className="text-[11px] text-text-secondary uppercase mt-1">93% Capacity Threshold</div>
            </div>
            <div className="w-full bg-surface-elevated h-1 rounded-full overflow-hidden">
              <div className="bg-text-primary h-full rounded-full" style={{ width: '93%' }}></div>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="bg-surface-card p-4 rounded-[14px] border border-border-subtle flex flex-col justify-between shadow-sm hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-widest uppercase text-text-primary">
                CRITICAL TRIAGE
              </span>
              <span className="w-2 h-2 rounded-full bg-text-primary animate-pulse"></span>
            </div>
            <div className="my-3">
              <div className="text-3xl font-bold text-text-primary leading-none">
                03{' '}
                <span className="text-xs uppercase text-text-muted font-normal tracking-wide">Athletes</span>
              </div>
              <div className="text-[11px] text-text-secondary uppercase mt-1">
                HRV Spike / Missed Check-in
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-medium text-text-muted">
              <span>HIGH ATTENTION</span>
              <span className="text-text-primary font-bold">ACTION REQ</span>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="bg-surface-card p-4 rounded-[14px] border border-border-subtle flex flex-col justify-between shadow-sm hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-text-muted">
                AVG ROSTER ADHERENCE
              </span>
              <span className="material-symbols-outlined text-base text-text-muted">trending_up</span>
            </div>
            <div className="my-3">
              <div className="text-3xl font-bold text-text-primary leading-none">94.2%</div>
              <div className="text-[11px] text-text-secondary uppercase mt-1">
                +1.8% vs Prev Microcycle
              </div>
            </div>
            <div className="w-full bg-surface-elevated h-1 rounded-full overflow-hidden">
              <div className="bg-text-secondary h-full rounded-full" style={{ width: '94.2%' }}></div>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="bg-surface-card p-4 rounded-[14px] border border-border-subtle flex flex-col justify-between shadow-sm hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-text-muted">
                SESSIONS TODAY
              </span>
              <span className="material-symbols-outlined text-base text-text-muted">videocam</span>
            </div>
            <div className="my-3">
              <div className="text-3xl font-bold text-text-primary leading-none">05</div>
              <div className="text-[11px] text-text-secondary uppercase mt-1">Next: Mikhail R. (24m)</div>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-medium text-text-muted">
              <span className="material-symbols-outlined text-xs">schedule</span>
              <span>11:30 AM DEBRIEF</span>
            </div>
          </div>

          {/* KPI 5 */}
          <div className="bg-surface-card p-4 rounded-[14px] border border-border-subtle flex flex-col justify-between shadow-sm hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-text-muted">
                UNREAD TELEMETRY
              </span>
              <span className="material-symbols-outlined text-base text-text-muted">mark_email_unread</span>
            </div>
            <div className="my-3">
              <div className="text-3xl font-bold text-text-primary leading-none">
                04 <span className="text-xs uppercase text-text-muted font-normal tracking-wide">Logs</span>
              </div>
              <div className="text-[11px] text-text-secondary uppercase mt-1">
                2 Biomech / 2 Blood Biomarkers
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-medium text-text-muted">
              <span>PENDING REVIEW</span>
              <span className="text-text-primary cursor-pointer hover:underline">INBOX &gt;</span>
            </div>
          </div>
        </div>

        {/* Main Dual Layout: Triage + Roster (Left 8 Cols) & Side Rail (Right 4 Cols) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* LEFT REGION (8 Cols) */}
          <div className="xl:col-span-8 flex flex-col gap-6 min-w-0">
            {/* PRIORITY TRIAGE & BIO-INTERVENTION QUEUE */}
            <div className="bg-surface-card rounded-[14px] border border-border-subtle p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-border-subtle">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-text-primary text-2xl">crisis_alert</span>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">
                      PRIORITY TRIAGE & BIO-INTERVENTION QUEUE
                    </h2>
                    <p className="text-[11px] text-text-muted uppercase">
                      3 Athletes Exceeding Fatigue & Adherence Risk Boundaries
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-semibold uppercase px-2.5 py-1 bg-surface-elevated text-text-primary border border-border-subtle rounded-md">
                    Live Telemetry Active
                  </span>
                </div>
              </div>

              {/* Alert 1: Mikhail R. */}
              <div className="bg-surface-canvas rounded-lg border border-border-subtle p-4 mb-3 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-border-medium transition-all">
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <img
                      className="w-12 h-12 rounded-full object-cover border border-border-medium"
                      alt="Mikhail R."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuZ2Tt2F8j1W4VSXXnS4LmgZK53SVFF-QP1yvmYunGdDdrz620AwFGmWiFBHkjix5NExlWjWdp5nQz7a0YaygoqqN5-rWVBel8NlUlPmnJ3kiQsF8NfTs_WXVpXgrY7j02POSJ7sQIkqOVcdR29b9s6cPDDmDYDX2eHh82an5DnEN45_853WRP5C1mwLxYsoqUW_tvKc6ZtPiCrIfqqaVISYgmxUHQOrTkoRUfEXHT0umj115GTe2c"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-text-primary rounded-full ring-2 ring-surface-canvas"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-text-primary">Mikhail R.</span>
                      <span className="px-2 py-0.5 rounded bg-surface-card text-text-primary text-[10px] font-bold tracking-wider uppercase border border-border-subtle">
                        Tier 1 Pro
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-card text-text-muted text-[10px] font-bold tracking-wider uppercase border border-border-subtle">
                        Hypertrophy Phase 2
                      </span>
                    </div>
                    <p className="text-xs text-text-primary mt-1.5 leading-relaxed">
                      <strong className="font-bold">RPE 9.0 logged on Incline Press (+2.5kg PR achieved).</strong> Needs Microcycle 9 systemic volume calibration before tomorrow's heavy push.
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-text-muted text-[11px] uppercase font-medium">
                      <span>Logged: 42m ago</span>
                      <span>Strain: 17.8</span>
                      <span>HRV: 68ms (Stable)</span>
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-col items-end gap-2 self-end sm:self-center shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => triggerNotice('Review & Calibration console opened for Mikhail R.')}
                    className="w-full sm:w-44 px-4 py-2 bg-text-primary text-text-inverse hover:bg-surface-tint rounded-lg text-xs uppercase font-bold tracking-wider transition-all"
                  >
                    Review & Calibrate
                  </button>
                  <button
                    onClick={() => triggerNotice('Direct dispatch audio-note recorded for Mikhail R.')}
                    className="w-full sm:w-44 px-4 py-2 bg-surface-elevated border border-border-subtle text-text-primary hover:bg-surface-container-high rounded-lg text-xs uppercase tracking-wider transition-all font-semibold"
                  >
                    Direct Dispatch
                  </button>
                </div>
              </div>

              {/* Alert 2: Sarah Jenkins */}
              <div className="bg-surface-canvas rounded-lg border border-border-subtle p-4 mb-3 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-border-medium transition-all">
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <img
                      className="w-12 h-12 rounded-full object-cover border border-border-medium"
                      alt="Sarah Jenkins"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-DBzjsToco767KkxqE5QNH75oTQV29dFwAvoXortnArWBujdnDiqTzco0PSuPiB36SEUeQdUX65XOznGdJLSGCPeYLMPJKzO-PI-t0CiKoxW_Iy11gMHQ9VdW5gq3mSfXjAGTCVtpJwwjY7ulRlN2IkSPoEbkp7HcxSByDYYxY_lVu_Qgd412kesp9hSR2MQbZC7w3K05wibOV2w2B6d7NICOGQCP6Sdt2qnoDTk_Y-mUttcyMeVz"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-text-primary rounded-full ring-2 ring-surface-canvas"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-text-primary">Sarah Jenkins</span>
                      <span className="px-2 py-0.5 rounded bg-surface-card text-text-primary text-[10px] font-bold tracking-wider uppercase border border-border-subtle">
                        Tier 1 Pro
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-card text-text-muted text-[10px] font-bold tracking-wider uppercase border border-border-subtle">
                        Marathon Prep // Peak
                      </span>
                    </div>
                    <p className="text-xs text-text-primary mt-1.5 leading-relaxed">
                      <strong className="font-bold">HRV Suppressed -14% for 48 consecutive hours.</strong> Sleep efficiency collapsed to 72%. Elevated autonomic stress pattern.
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-text-muted text-[11px] uppercase font-medium">
                      <span>Logged: 2h ago via Oura API</span>
                      <span>Resting HR: +6bpm</span>
                      <span>Fatigue Index: High</span>
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-col items-end gap-2 self-end sm:self-center shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => triggerNotice('Active recovery protocol dispatched to Sarah Jenkins')}
                    className="w-full sm:w-44 px-4 py-2 bg-text-primary text-text-inverse hover:bg-surface-tint rounded-lg text-xs uppercase font-bold tracking-wider transition-all"
                  >
                    Inject Recovery Protocol
                  </button>
                  <button
                    onClick={() => triggerNotice('Zone 2 target decreased to 135 bpm max')}
                    className="w-full sm:w-44 px-4 py-2 bg-surface-elevated border border-border-subtle text-text-primary hover:bg-surface-container-high rounded-lg text-xs uppercase tracking-wider transition-all font-semibold"
                  >
                    Adjust Zone 2 Cap
                  </button>
                </div>
              </div>

              {/* Alert 3: David Zhao */}
              <div className="bg-surface-canvas rounded-lg border border-border-subtle p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-border-medium transition-all">
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <img
                      className="w-12 h-12 rounded-full object-cover border border-border-medium"
                      alt="David Zhao"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt6KS0xi--ZB5QzyIyxBa2TqBd7-IBKohrRTazcjqk2G3vCEHgRver05G6Lu0Jaryeh9_KJFVYVr4Chh2D56wL3xZaVwy1tWPlhBhi6LkxTT2xC066fPY3Hnw8DmmCQcB0wLDY6VtrT3zBBO_tVygNmbPSpBO6oB8Hm65VKB_f-cqGftcfz1a5vswfZz8dVogcvtaIw6hVaBj0zgqUCv7-R1a9BeVGfx7onpdsHMt9p_unhD04TMYA"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-surface-variant rounded-full ring-2 ring-surface-canvas"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-text-primary">David Zhao</span>
                      <span className="px-2 py-0.5 rounded bg-surface-card text-text-muted text-[10px] font-bold tracking-wider uppercase border border-border-subtle">
                        Senior Athlete
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-card text-text-muted text-[10px] font-bold tracking-wider uppercase border border-border-subtle">
                        Olympic Weightlifting
                      </span>
                    </div>
                    <p className="text-xs text-text-primary mt-1.5 leading-relaxed">
                      <strong className="font-bold">Missed Week 08 Check-in Dossier & Biomechanical Bar Path Upload.</strong> Last logged activity 36 hours overdue.
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-text-muted text-[11px] uppercase font-medium">
                      <span>Last Seen: 2d ago</span>
                      <span>Compliance: Warning (78%)</span>
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-col items-end gap-2 self-end sm:self-center shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => triggerNotice('Priority check-in SMS and Push dispatched to David Zhao')}
                    className="w-full sm:w-44 px-4 py-2 bg-text-primary text-text-inverse hover:bg-surface-tint rounded-lg text-xs uppercase font-bold tracking-wider transition-all"
                  >
                    Send Priority Nudge
                  </button>
                  <button
                    onClick={() => triggerNotice('Next microcycle locked pending check-in confirmation')}
                    className="w-full sm:w-44 px-4 py-2 bg-surface-elevated border border-border-subtle text-text-primary hover:bg-surface-container-high rounded-lg text-xs uppercase tracking-wider transition-all font-semibold"
                  >
                    Lock Next Microcycle
                  </button>
                </div>
              </div>
            </div>

            {/* COMPREHENSIVE ATHLETE ROSTER & ADHERENCE TABLE */}
            <div className="bg-surface-card rounded-[14px] border border-border-subtle p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">
                    ATHLETIC ROSTER TELEMETRY GRID
                  </h2>
                  <p className="text-[11px] text-text-muted uppercase">
                    28 Registered Competitors Under Active Sports Science Supervision
                  </p>
                </div>
                {/* Search & Filters */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-text-muted text-base">
                      search
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter athlete, tier, or phase..."
                      className="pl-8 pr-3 py-1.5 bg-surface-canvas border border-border-subtle text-text-primary text-xs rounded-lg w-56 focus:outline-none focus:border-border-strong"
                    />
                  </div>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-2 bg-surface-canvas border border-border-subtle text-text-muted hover:text-text-primary rounded-lg"
                    title="Clear filter"
                  >
                    <span className="material-symbols-outlined text-base">filter_list</span>
                  </button>
                </div>
              </div>

              {/* Roster Navigation Tabs */}
              <div className="flex items-center gap-2 my-4 overflow-x-auto pb-1">
                <button
                  onClick={() => setFilterTab('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs uppercase font-bold tracking-wider transition-colors ${
                    filterTab === 'all'
                      ? 'bg-text-primary text-text-inverse'
                      : 'bg-surface-canvas text-text-muted hover:text-text-primary border border-border-subtle'
                  }`}
                >
                  All Athletes (28)
                </button>
                <button
                  onClick={() => setFilterTab('tier1')}
                  className={`px-3 py-1.5 rounded-lg text-xs uppercase font-semibold tracking-wider transition-colors ${
                    filterTab === 'tier1'
                      ? 'bg-text-primary text-text-inverse'
                      : 'bg-surface-canvas text-text-muted hover:text-text-primary border border-border-subtle'
                  }`}
                >
                  Tier 1 Elite (12)
                </button>
                <button
                  onClick={() => setFilterTab('hypertrophy')}
                  className={`px-3 py-1.5 rounded-lg text-xs uppercase font-semibold tracking-wider transition-colors ${
                    filterTab === 'hypertrophy'
                      ? 'bg-text-primary text-text-inverse'
                      : 'bg-surface-canvas text-text-muted hover:text-text-primary border border-border-subtle'
                  }`}
                >
                  Hypertrophy & Strength (16)
                </button>
                <button
                  onClick={() => setFilterTab('review')}
                  className={`px-3 py-1.5 rounded-lg text-xs uppercase font-semibold tracking-wider transition-colors flex items-center gap-1.5 ${
                    filterTab === 'review'
                      ? 'bg-text-primary text-text-inverse'
                      : 'bg-surface-canvas text-text-primary border border-border-subtle'
                  }`}
                >
                  Needs Review <span className="w-1.5 h-1.5 rounded-full bg-text-primary"></span>
                </button>
              </div>

              {/* High-Density Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-text-primary">
                  <thead>
                    <tr className="bg-surface-canvas border-y border-border-subtle text-text-muted uppercase text-[10px] tracking-wider font-semibold">
                      <th className="py-2.5 px-3">Athlete / Tier</th>
                      <th className="py-2.5 px-3">Phase / Meso</th>
                      <th className="py-2.5 px-3">7-Day Adherence</th>
                      <th className="py-2.5 px-3">Last Telemetry</th>
                      <th className="py-2.5 px-3">CNS / Bio-Load</th>
                      <th className="py-2.5 px-3 text-right">Intervention</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {filteredAthletes.map((ath) => (
                      <tr
                        key={ath.id}
                        className="hover:bg-surface-elevated transition-colors cursor-pointer"
                        onClick={() => setSelectedAthlete(ath)}
                      >
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              className="w-8 h-8 rounded-full object-cover border border-border-medium shrink-0"
                              alt={ath.name}
                              src={ath.avatar}
                            />
                            <div>
                              <div className="font-bold text-text-primary text-xs">{ath.name}</div>
                              <div className="text-[10px] text-text-muted uppercase">
                                {ath.tier} • {ath.discipline}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="text-text-primary font-medium">{ath.phase}</div>
                          <div className="text-[10px] text-text-muted uppercase">{ath.microcycle}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-surface-canvas h-1.5 rounded-full overflow-hidden border border-border-subtle">
                              <div
                                className="bg-text-primary h-full rounded-full"
                                style={{ width: `${ath.adherence}%` }}
                              ></div>
                            </div>
                            <span className="font-bold text-text-primary">{ath.adherence}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="text-text-primary font-medium">{ath.lastTelemetryTime}</div>
                          <div className="text-[10px] text-text-muted uppercase">
                            {ath.lastTelemetryDetail}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${
                              ath.cnsStatus.includes('OVERLOADED') || ath.cnsStatus.includes('FATIGUE')
                                ? 'bg-surface-elevated text-text-primary border-border-strong'
                                : 'bg-surface-canvas text-text-secondary border-border-subtle'
                            }`}
                          >
                            {ath.cnsStatus}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedAthlete(ath);
                            }}
                            className="p-1.5 bg-surface-canvas hover:bg-text-primary hover:text-text-inverse text-text-primary rounded border border-border-subtle transition-colors"
                            title={`Manage ${ath.name}`}
                          >
                            <span className="material-symbols-outlined text-sm">tune</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border-subtle text-[11px] text-text-muted uppercase font-medium">
                <span>Showing {filteredAthletes.length} of 28 Enrolled Athletes</span>
                <div className="flex items-center gap-1">
                  <button className="px-2.5 py-1 bg-surface-canvas border border-border-subtle text-text-primary rounded hover:bg-surface-elevated transition-colors">
                    Prev
                  </button>
                  <button className="px-2.5 py-1 bg-text-primary text-text-inverse font-bold rounded">
                    1
                  </button>
                  <button className="px-2.5 py-1 bg-surface-canvas border border-border-subtle text-text-primary rounded hover:bg-surface-elevated transition-colors">
                    2
                  </button>
                  <button className="px-2.5 py-1 bg-surface-canvas border border-border-subtle text-text-primary rounded hover:bg-surface-elevated transition-colors">
                    3
                  </button>
                  <button className="px-2.5 py-1 bg-surface-canvas border border-border-subtle text-text-primary rounded hover:bg-surface-elevated transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* TELEMETRY & ADHERENCE VISUALIZATION BLOCK */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mini Chart 1: Roster Fatigue vs Strain Spectrum */}
              <div className="bg-surface-card p-5 rounded-[14px] border border-border-subtle shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-text-muted">
                      AGGREGATE ROSTER LOAD DISTRIBUTION
                    </span>
                    <div className="text-sm font-bold text-text-primary uppercase mt-1">
                      Weekly Strain Spectrum
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-surface-canvas border border-border-subtle text-text-primary rounded">
                    ACWR 1.08
                  </span>
                </div>
                {/* Inline SVG Histogram Spectrum */}
                <div className="w-full h-32 flex items-end justify-between gap-1.5 pt-2 pb-1">
                  <div className="flex-1 bg-surface-elevated rounded-t flex flex-col justify-end" style={{ height: '40%' }}>
                    <div className="bg-surface-variant w-full rounded-t" style={{ height: '100%' }}></div>
                  </div>
                  <div className="flex-1 bg-surface-elevated rounded-t flex flex-col justify-end" style={{ height: '65%' }}>
                    <div className="bg-surface-variant w-full rounded-t" style={{ height: '100%' }}></div>
                  </div>
                  <div className="flex-1 bg-surface-elevated rounded-t flex flex-col justify-end" style={{ height: '85%' }}>
                    <div className="bg-text-secondary w-full rounded-t" style={{ height: '100%' }}></div>
                  </div>
                  <div className="flex-1 bg-surface-elevated rounded-t flex flex-col justify-end" style={{ height: '98%' }}>
                    <div className="bg-text-primary w-full rounded-t" style={{ height: '100%' }}></div>
                  </div>
                  <div className="flex-1 bg-surface-elevated rounded-t flex flex-col justify-end" style={{ height: '75%' }}>
                    <div className="bg-text-secondary w-full rounded-t" style={{ height: '100%' }}></div>
                  </div>
                  <div className="flex-1 bg-surface-elevated rounded-t flex flex-col justify-end" style={{ height: '45%' }}>
                    <div className="bg-surface-variant w-full rounded-t" style={{ height: '100%' }}></div>
                  </div>
                  <div className="flex-1 bg-surface-elevated rounded-t flex flex-col justify-end" style={{ height: '20%' }}>
                    <div className="bg-surface-container-high w-full rounded-t" style={{ height: '100%' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-text-muted pt-2 border-t border-border-subtle uppercase font-medium">
                  <span>Underloaded (&lt;0.8)</span>
                  <span>Optimal Zone (0.9 - 1.2)</span>
                  <span>High Risk (&gt;1.5)</span>
                </div>
              </div>

              {/* Mini Chart 2: Microcycle Protocol Compliance by Tier */}
              <div className="bg-surface-card p-5 rounded-[14px] border border-border-subtle shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-text-muted">
                      MESOCYCLE COMPLETION RATES
                    </span>
                    <div className="text-sm font-bold text-text-primary uppercase mt-1">
                      Cohort Adherence Breakdown
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-surface-canvas border border-border-subtle text-text-primary rounded">
                    94.2% Mean
                  </span>
                </div>
                <div className="space-y-3 py-1">
                  <div>
                    <div className="flex justify-between text-[11px] uppercase mb-1">
                      <span className="text-text-primary">Tier 1 Olympic & Pro (12 Athletes)</span>
                      <span className="text-text-primary font-bold">98.4%</span>
                    </div>
                    <div className="w-full bg-surface-canvas border border-border-subtle h-2 rounded-full overflow-hidden">
                      <div className="bg-text-primary h-full rounded-full" style={{ width: '98.4%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] uppercase mb-1">
                      <span className="text-text-secondary">Strength & Hypertrophy (10 Athletes)</span>
                      <span className="text-text-primary font-bold">92.0%</span>
                    </div>
                    <div className="w-full bg-surface-canvas border border-border-subtle h-2 rounded-full overflow-hidden">
                      <div className="bg-text-secondary h-full rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] uppercase mb-1">
                      <span className="text-text-muted">Endurance Cohort (6 Athletes)</span>
                      <span className="text-text-primary font-bold">89.6%</span>
                    </div>
                    <div className="w-full bg-surface-canvas border border-border-subtle h-2 rounded-full overflow-hidden">
                      <div className="bg-border-strong h-full rounded-full" style={{ width: '89.6%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-text-muted pt-2 border-t border-border-subtle uppercase flex justify-between font-medium">
                  <span>Goal Target: 90.0%</span>
                  <span className="text-text-primary font-semibold">+4.2% Above Baseline</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT REGION (4 Cols): Side Rail Operations */}
          <div className="xl:col-span-4 flex flex-col gap-6 min-w-0">
            {/* TODAY'S SCHEDULE & CONSULTATIONS */}
            <div className="bg-surface-card rounded-[14px] border border-border-subtle p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-text-primary text-xl">calendar_today</span>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">
                    TODAY'S SCHEDULE
                  </h2>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-surface-canvas border border-border-subtle text-text-primary rounded">
                  5 SESSIONS
                </span>
              </div>
              <div className="space-y-3">
                {/* Session 1: Imminent */}
                <div className="bg-surface-canvas rounded-lg border border-border-subtle p-3.5 hover:border-border-medium transition-all">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 bg-text-primary text-text-inverse rounded font-bold">
                      IN 24 MINS
                    </span>
                    <span className="text-[11px] text-text-muted uppercase font-medium">11:30 AM EST</span>
                  </div>
                  <div className="text-sm font-bold text-text-primary">Mikhail R.</div>
                  <div className="text-xs text-text-secondary uppercase mt-0.5">
                    Biomechanical Review & Bar Velocity Analysis
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => triggerNotice('Connecting to encrypted HD telemetry stream...')}
                      className="flex-1 py-1.5 bg-text-primary text-text-inverse rounded-lg text-xs uppercase font-bold flex items-center justify-center gap-1 shadow-sm active:scale-95"
                    >
                      <span className="material-symbols-outlined text-sm">video_call</span> Join Meet
                    </button>
                    <button
                      onClick={() => triggerNotice('Loading full kinetic dossier for Mikhail R.')}
                      className="px-3 py-1.5 bg-surface-elevated border border-border-subtle text-text-primary rounded-lg text-xs uppercase hover:bg-surface-container-high font-semibold"
                    >
                      Dossier
                    </button>
                  </div>
                </div>

                {/* Session 2 */}
                <div className="bg-surface-canvas rounded-lg border border-border-subtle p-3.5 hover:border-border-medium transition-all">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] text-text-muted uppercase font-medium">02:00 PM EST</span>
                    <span className="text-[11px] text-text-muted uppercase">45 Mins</span>
                  </div>
                  <div className="text-sm font-bold text-text-primary">Sarah Jenkins</div>
                  <div className="text-xs text-text-secondary uppercase mt-0.5">
                    HRV Autonomic Suppression & Nutrition Audit
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => triggerNotice('Video room prepared for Sarah Jenkins')}
                      className="flex-1 py-1 bg-surface-elevated border border-border-subtle hover:bg-surface-container-high text-text-primary rounded-lg text-xs uppercase font-semibold flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">video_call</span> Launch Link
                    </button>
                  </div>
                </div>

                {/* Session 3 */}
                <div className="bg-surface-canvas rounded-lg border border-border-subtle p-3.5 hover:border-border-medium transition-all">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] text-text-muted uppercase font-medium">04:15 PM EST</span>
                    <span className="text-[11px] text-text-muted uppercase">30 Mins</span>
                  </div>
                  <div className="text-sm font-bold text-text-primary">Elena Rostova</div>
                  <div className="text-xs text-text-secondary uppercase mt-0.5">
                    Kinematic Floor Routine Review (High-Speed Frame)
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => triggerNotice('Video room prepared for Elena Rostova')}
                      className="flex-1 py-1 bg-surface-elevated border border-border-subtle hover:bg-surface-container-high text-text-primary rounded-lg text-xs uppercase font-semibold flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">video_call</span> Launch Link
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* AI COACH INTERVENTION PROPOSALS */}
            <div className="bg-surface-card rounded-[14px] border border-border-subtle p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-text-primary text-xl">psychology</span>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">
                    AI INTERVENTION PROPOSALS
                  </h2>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-surface-canvas border border-border-subtle text-text-muted rounded">
                  GEN-3 ENGINE
                </span>
              </div>
              <div className="space-y-3">
                {/* Proposal 1 */}
                <div className="bg-surface-canvas rounded-lg border border-border-subtle p-3.5">
                  <div className="flex items-center justify-between text-[10px] uppercase text-text-muted mb-1.5 font-semibold">
                    <span>ATHLETE: DAVID ZHAO</span>
                    <span className="text-text-primary font-bold">CNS FATIGUE</span>
                  </div>
                  <p className="text-xs text-text-primary leading-relaxed">
                    Trigger an automated 48-hour deload block. Bar velocity data indicates 12% deceleration on standard pulls over the last 3 microcycles.
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => triggerNotice('Deload protocol approved and deployed to David Zhao')}
                      className="flex-1 py-1.5 bg-text-primary text-text-inverse rounded-lg text-xs uppercase font-bold tracking-wider hover:bg-surface-tint shadow-sm"
                    >
                      Approve Deload
                    </button>
                    <button
                      onClick={() => triggerNotice('Proposal dismissed')}
                      className="px-3 py-1.5 bg-surface-elevated border border-border-subtle text-text-muted hover:text-text-primary rounded-lg text-xs uppercase font-semibold"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>

                {/* Proposal 2 */}
                <div className="bg-surface-canvas rounded-lg border border-border-subtle p-3.5">
                  <div className="flex items-center justify-between text-[10px] uppercase text-text-muted mb-1.5 font-semibold">
                    <span>ATHLETE: SARAH JENKINS</span>
                    <span className="text-text-primary font-bold">RECOVERY DEFICIT</span>
                  </div>
                  <p className="text-xs text-text-primary leading-relaxed">
                    Reduce Sunday Long Run mileage by 15% and increase daily carbohydrate allocation by +45g to mitigate glycogen depletion.
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => triggerNotice('Nutrition shift + mileage cap applied to Sarah Jenkins')}
                      className="flex-1 py-1.5 bg-text-primary text-text-inverse rounded-lg text-xs uppercase font-bold tracking-wider hover:bg-surface-tint shadow-sm"
                    >
                      Apply Nutrition Shift
                    </button>
                    <button
                      onClick={() => triggerNotice('Intervention parameter editor opened')}
                      className="px-3 py-1.5 bg-surface-elevated border border-border-subtle text-text-muted hover:text-text-primary rounded-lg text-xs uppercase font-semibold"
                    >
                      Modify
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK PROTOCOL BUILDER SHORTCUTS */}
            <div className="bg-surface-card rounded-[14px] border border-border-subtle p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
                <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">
                  PROGRAMMING SUITE
                </h2>
                <span className="material-symbols-outlined text-text-muted text-base">construction</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Link
                  href="/app/workout"
                  className="p-3 bg-surface-canvas border border-border-subtle hover:bg-surface-elevated rounded-lg flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-text-muted group-hover:text-text-primary">
                      fitness_center
                    </span>
                    <div>
                      <div className="text-xs font-bold text-text-primary">Exercise & Movement Library</div>
                      <div className="text-[10px] text-text-muted uppercase">640 Indexed Biomechanical Drills</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-text-muted group-hover:text-text-primary text-sm">
                    arrow_forward
                  </span>
                </Link>

                <Link
                  href="/app/nutrition"
                  className="p-3 bg-surface-canvas border border-border-subtle hover:bg-surface-elevated rounded-lg flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-text-muted group-hover:text-text-primary">
                      restaurant
                    </span>
                    <div>
                      <div className="text-xs font-bold text-text-primary">Macro & Nutrition Formulations</div>
                      <div className="text-[10px] text-text-muted uppercase">Cohort Targets & Nutrient Timing</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-text-muted group-hover:text-text-primary text-sm">
                    arrow_forward
                  </span>
                </Link>

                <Link
                  href="/app/store"
                  className="p-3 bg-surface-canvas border border-border-subtle hover:bg-surface-elevated rounded-lg flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-text-muted group-hover:text-text-primary">
                      medication
                    </span>
                    <div>
                      <div className="text-xs font-bold text-text-primary">Supplement & Peptides Protocol</div>
                      <div className="text-[10px] text-text-muted uppercase">WADA-Compliant Ergogenic Stacks</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-text-muted group-hover:text-text-primary text-sm">
                    arrow_forward
                  </span>
                </Link>

                <Link
                  href="/app/progress"
                  className="p-3 bg-surface-canvas border border-border-subtle hover:bg-surface-elevated rounded-lg flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-text-muted group-hover:text-text-primary">
                      analytics
                    </span>
                    <div>
                      <div className="text-xs font-bold text-text-primary">Biomechanics Video Analyzer</div>
                      <div className="text-[10px] text-text-muted uppercase">Frame-by-Frame Velocity Tracking</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-text-muted group-hover:text-text-primary text-sm">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Athlete Quick Dossier Drawer / Modal */}
      {selectedAthlete && (
        <div className="fixed inset-0 z-50 bg-surface-base/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-card border border-border-strong rounded-[14px] max-w-lg w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
              <div className="flex items-center gap-3">
                <img
                  src={selectedAthlete.avatar}
                  alt={selectedAthlete.name}
                  className="w-10 h-10 rounded-full object-cover border border-border-medium"
                />
                <div>
                  <h3 className="text-base font-bold text-text-primary">{selectedAthlete.name}</h3>
                  <div className="text-[11px] text-text-muted uppercase">
                    {selectedAthlete.tier} • {selectedAthlete.discipline}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedAthlete(null)}
                className="p-1 text-text-muted hover:text-text-primary rounded-lg"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-surface-canvas p-3 rounded-lg border border-border-subtle">
                <div>
                  <span className="text-[10px] uppercase text-text-muted block">Current Mesocycle</span>
                  <span className="font-bold text-text-primary">{selectedAthlete.phase}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-text-muted block">Microcycle Stage</span>
                  <span className="font-bold text-text-primary">{selectedAthlete.microcycle}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-text-muted block">Adherence</span>
                  <span className="font-bold text-text-primary">{selectedAthlete.adherence}%</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-text-muted block">CNS Telemetry</span>
                  <span className="font-bold text-text-primary">{selectedAthlete.cnsStatus}</span>
                </div>
              </div>

              <div className="p-3 bg-surface-canvas rounded-lg border border-border-subtle">
                <span className="text-[10px] uppercase text-text-muted block mb-1">Latest Log Event</span>
                <p className="text-text-primary">
                  {selectedAthlete.lastTelemetryTime} — {selectedAthlete.lastTelemetryDetail}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedAthlete(null)}
                className="px-4 py-2 bg-surface-elevated border border-border-subtle text-text-muted hover:text-text-primary rounded-lg text-xs uppercase font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedAthlete(null);
                  triggerNotice(`Calibration mode active for ${selectedAthlete.name}`);
                }}
                className="px-4 py-2 bg-text-primary text-text-inverse hover:bg-surface-tint rounded-lg text-xs uppercase font-bold tracking-wider"
              >
                Launch Telemetry Editor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
