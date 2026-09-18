'use client';

import { useState } from 'react';

const athletes = [
  {
    id: 'ath-1',
    name: 'Mikhail R.',
    tier: 'Tier 1 Pro',
    category: 'Hypertrophy & Strength',
    cycle: 'Hypertrophy Phase 2 (W6/D34)',
    compliance: 96,
    lastActive: 'Today, 08:42 (Chest PR +2.5kg)',
    cnsScore: 'Optimal (1.04)',
    hrv: '68ms',
    strain: '17.8',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    flag: null,
  },
  {
    id: 'ath-2',
    name: 'Sarah Jenkins',
    tier: 'Tier 1 Pro',
    category: 'Marathon Prep // Peak',
    cycle: 'Week 14 / Taper Prep',
    compliance: 91,
    lastActive: 'Today, 06:15 (HRV -14% drop)',
    cnsScore: 'Overloaded (1.42)',
    hrv: '44ms',
    strain: '21.4',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    flag: 'FATIGUE_OVERLOAD',
  },
  {
    id: 'ath-3',
    name: 'David Zhao',
    tier: 'Senior Athlete',
    category: 'Olympic Weightlifting',
    cycle: 'Week 08 / Deload Due',
    compliance: 78,
    lastActive: '2 Days Ago (Missing Check-in)',
    cnsScore: 'CNS Fatigue (1.30)',
    hrv: '51ms',
    strain: '14.2',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    flag: 'CHECKIN_MISSED',
  },
  {
    id: 'ath-4',
    name: 'Elena Rostova',
    tier: 'Tier 1 Pro',
    category: 'Gymnastics Mobility',
    cycle: 'Week 04 / Phase 1',
    compliance: 100,
    lastActive: 'Today, 09:10 (Routine Clean)',
    cnsScore: 'Primed (0.92)',
    hrv: '82ms',
    strain: '12.0',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    flag: null,
  },
  {
    id: 'ath-5',
    name: 'Marcus Thorne',
    tier: 'Tier 1 Pro',
    category: 'Sprint 100m Velocity',
    cycle: 'Week 06 / Micro 3',
    compliance: 98,
    lastActive: 'Yesterday, 19:40 (Speed Traps 11.2 m/s)',
    cnsScore: 'Optimal (1.01)',
    hrv: '74ms',
    strain: '16.5',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    flag: null,
  },
];

export default function CoachRosterPage() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filtered = athletes.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase());
    if (filter === 'NEEDS_REVIEW') return matchesSearch && a.flag !== null;
    if (filter === 'PRO') return matchesSearch && a.tier.includes('Pro');
    return matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#242424] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#777777]">
              COACH ROSTER TELEMETRY // ATHLETIC SURVEILLANCE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            Athletic Roster Telemetry Matrix
          </h1>
          <p className="text-sm text-[#777777] mt-1">
            Real-time biometric surveillance of 28 enrolled competitors under active CSCS supervision.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'PRO', 'NEEDS_REVIEW'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === f
                  ? 'bg-white text-black font-bold'
                  : 'bg-[#111111] border border-[#242424] text-[#777777] hover:text-white'
              }`}
            >
              {f.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Roster Table Card */}
      <div className="bg-[#111111] border border-[#242424] rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-[#242424] flex items-center justify-between bg-[#0A0A0A]">
          <span className="text-xs font-mono uppercase text-white">
            Enrolled Competitors ({filtered.length})
          </span>
          <input
            type="text"
            placeholder="Search competitor by name or sport..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#111111] border border-[#242424] rounded-lg px-3.5 py-1.5 text-xs text-white placeholder-[#777777] focus:outline-none focus:border-white w-72 font-mono"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#242424] text-[10px] font-mono uppercase text-[#777777] bg-[#0E0E0E]">
                <th className="p-4">Athlete / Category</th>
                <th className="p-4">Assigned Mesocycle</th>
                <th className="p-4">Adherence</th>
                <th className="p-4">Latest Bio-Telemetry</th>
                <th className="p-4">HRV / Strain</th>
                <th className="p-4 text-right">Intervention Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171717] text-xs">
              {filtered.map((ath) => (
                <tr key={ath.id} className="hover:bg-[#171717] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={ath.avatar}
                        alt={ath.name}
                        className="w-9 h-9 rounded-full object-cover border border-[#4A4A4A]"
                      />
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-2">
                          {ath.name}
                          {ath.flag && (
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse" title={ath.flag}></span>
                          )}
                        </div>
                        <div className="text-[10px] font-mono uppercase text-[#777777]">{ath.tier} • {ath.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-[#BDBDBD] text-xs font-medium">{ath.cycle}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-[#202020] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full"
                          style={{ width: `${ath.compliance}%` }}
                        ></div>
                      </div>
                      <span className="font-mono text-xs text-white font-bold">{ath.compliance}%</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-[#BDBDBD]">{ath.lastActive}</td>
                  <td className="p-4 font-mono text-[11px] text-white">
                    <div>HRV: {ath.hrv}</div>
                    <div className="text-[#777777] text-[10px]">Strain: {ath.strain}</div>
                  </td>
                  <td className="p-4 text-right">
                    <a
                      href="/coach/interventions"
                      className="px-3 py-1.5 bg-[#0A0A0A] border border-[#4A4A4A] text-white text-[11px] font-mono uppercase tracking-wider rounded hover:bg-white hover:text-black transition-all inline-block"
                    >
                      Calibrate
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
