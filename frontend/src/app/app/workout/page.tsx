'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function WorkoutPage() {
  const [restSeconds, setRestSeconds] = useState(102); // 01:42
  const [isPaused, setIsPaused] = useState(false);
  const [sets, setSets] = useState([
    { id: 1, prev: '80.0 kg × 10', target: '82.5 kg × 10', actualKg: '82.5', reps: '10', rpe: '8.0', completed: true },
    { id: 2, prev: '82.5 kg × 10', target: '85.0 kg × 8–10', actualKg: '85.0', reps: '9', rpe: '8.5', completed: true },
    { id: 3, prev: '82.5 kg × 8', target: '85.0 kg × 8–10', actualKg: '85.0', reps: '8', rpe: '9.0', completed: true },
    { id: 4, prev: '80.0 kg × 8', target: '85.0 kg × 8–10', actualKg: '85.0', reps: '8', rpe: '9.0', completed: false },
  ]);

  const toggleSet = (id: number) => {
    setSets((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  const formatRest = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col w-full bg-surface-base min-h-screen">
      {/* Active Workout HUD Bar */}
      <div className="w-full bg-surface-canvas border-b border-border-subtle px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Session Name & Telemetry Chips */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 bg-surface-elevated rounded text-[10px] font-semibold tracking-widest text-text-primary uppercase border border-border-subtle">
                HYPERTROPHY CYCLE 4
              </span>
              <span className="px-2 py-0.5 bg-surface-card rounded text-[10px] font-semibold tracking-widest text-text-muted uppercase border border-border-subtle font-mono">
                BLOCK 02 • WEEK 3
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-text-primary animate-pulse"></span>
                <span className="text-[10px] font-bold text-text-primary uppercase tracking-wider">
                  LIVE TELEMETRY
                </span>
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight uppercase m-0">
              CHEST &amp; TRICEPS HYPERTROPHY
            </h1>
          </div>

          {/* Quick Session Stats & Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-4 bg-surface-elevated px-4 py-2 rounded-lg border border-border-subtle">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-text-muted font-medium">SESSION TIME</span>
                <span className="text-[13px] font-bold text-text-primary font-mono tracking-tight">00:24:15</span>
              </div>
              <div className="w-px h-6 bg-border-subtle"></div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-text-muted font-medium">ENERGY</span>
                <span className="text-[13px] font-bold text-text-primary tracking-tight">248 kcal</span>
              </div>
              <div className="w-px h-6 bg-border-subtle"></div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-text-muted font-medium">PROGRESS</span>
                <span className="text-[13px] font-bold text-text-primary tracking-tight">
                  Set 7/16 <span className="text-text-muted font-normal">(44%)</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-4 py-2 bg-surface-card hover:bg-surface-elevated text-text-primary rounded-lg text-[12px] font-semibold uppercase tracking-wider transition-all border border-border-subtle flex items-center gap-1.5"
                type="button"
              >
                <span className="material-symbols-outlined text-base">
                  {isPaused ? 'play_arrow' : 'pause'}
                </span>
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </button>
              <Link
                href="/app/dashboard"
                className="px-4 py-2 bg-text-primary text-text-inverse hover:opacity-90 rounded-lg text-[12px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-base">task_alt</span>
                <span>Finish &amp; Log</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Micro Linear Progress Bar */}
        <div className="max-w-[1400px] mx-auto w-full bg-surface-container h-1.5 rounded-full mt-3 overflow-hidden">
          <div className="bg-text-primary h-full transition-all duration-300 rounded-full" style={{ width: '44%' }}></div>
        </div>
      </div>

      {/* Primary Workspace: Split Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Center Workstation: Current Exercise Focus Card (Cols 1-8) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Active Exercise Container */}
            <div className="bg-surface-card rounded-[14px] p-5 sm:p-6 flex flex-col gap-6 border border-border-subtle shadow-md relative overflow-hidden">
              {/* Tactical Top Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-surface-container rounded text-[10px] font-mono uppercase tracking-wider text-text-muted">
                      EXERCISE 01 OF 04
                    </span>
                    <span className="px-2 py-0.5 bg-surface-elevated rounded text-[10px] font-semibold uppercase tracking-widest text-text-primary border border-border-subtle">
                      COMPOUND • PRIMARY
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-text-primary uppercase tracking-tight m-0">
                    BARBELL INCLINE BENCH PRESS
                  </h2>
                  <p className="text-[13px] text-text-muted m-0">
                    Primary: <span className="text-text-primary font-semibold">Chest (Upper Clavicular Pectoralis)</span> • Secondary: <span className="text-text-secondary">Anterior Deltoid, Triceps Brachii</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1.5 rounded-lg bg-surface-elevated border border-border-subtle hover:border-text-primary text-text-primary text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-base">calculate</span>
                    Plate Calc (85 kg)
                  </button>
                </div>
              </div>

              {/* Set Tracker Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border-subtle text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                      <th className="py-2.5 px-3">SET</th>
                      <th className="py-2.5 px-3">PREVIOUS</th>
                      <th className="py-2.5 px-3">TARGET</th>
                      <th className="py-2.5 px-3">ACTUAL KG</th>
                      <th className="py-2.5 px-3">REPS</th>
                      <th className="py-2.5 px-3">RPE</th>
                      <th className="py-2.5 px-3 text-right">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle text-[13px]">
                    {sets.map((set, idx) => (
                      <tr
                        key={set.id}
                        className={`transition-colors ${
                          set.completed
                            ? 'bg-surface-canvas/50 text-text-muted'
                            : 'bg-surface-elevated/40 text-text-primary font-medium'
                        }`}
                      >
                        <td className="py-3 px-3 font-mono font-bold">{String(idx + 1).padStart(2, '0')}</td>
                        <td className="py-3 px-3 font-mono text-[12px] text-text-muted">{set.prev}</td>
                        <td className="py-3 px-3 font-mono text-[12px] text-text-secondary">{set.target}</td>
                        <td className="py-3 px-3 font-mono font-bold text-text-primary">{set.actualKg} kg</td>
                        <td className="py-3 px-3 font-mono font-bold text-text-primary">{set.reps}</td>
                        <td className="py-3 px-3 font-mono text-text-secondary">{set.rpe}</td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => toggleSet(set.id)}
                            className={`w-8 h-8 rounded-lg border transition-all inline-flex items-center justify-center ${
                              set.completed
                                ? 'bg-text-primary text-text-inverse border-text-primary shadow-sm'
                                : 'bg-surface-card text-text-muted border-border-medium hover:border-text-primary hover:text-text-primary'
                            }`}
                            type="button"
                            aria-label={`Toggle set ${set.id}`}
                          >
                            <span className="material-symbols-outlined text-base">check</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Rest Interval Timer Box */}
              <div className="p-5 rounded-[14px] bg-surface-canvas border border-border-strong flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted">
                    INTER-SET BIO-REST INTERVAL
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-4xl font-extrabold font-mono text-text-primary tracking-tight">
                      {formatRest(restSeconds)}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-text-muted">
                      Target: 120s
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRestSeconds((s) => Math.max(0, s - 30))}
                    className="px-3 py-1.5 rounded bg-surface-card border border-border-subtle hover:border-border-medium text-text-secondary text-[11px] font-mono font-semibold"
                    type="button"
                  >
                    -30s
                  </button>
                  <button
                    onClick={() => setRestSeconds((s) => s + 30)}
                    className="px-3 py-1.5 rounded bg-surface-card border border-border-subtle hover:border-border-medium text-text-secondary text-[11px] font-mono font-semibold"
                    type="button"
                  >
                    +30s
                  </button>
                  <button
                    onClick={() => setRestSeconds(0)}
                    className="px-4 py-1.5 rounded bg-text-primary text-text-inverse text-[11px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                    type="button"
                  >
                    Skip Rest
                  </button>
                </div>
              </div>

              {/* Technical Execution Cues */}
              <div className="p-4 rounded-lg bg-surface-elevated border border-border-subtle flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">
                  BIOMECHANICAL EXECUTION CUES // CSCS PROTOCOL
                </span>
                <p className="text-[12px] text-text-secondary leading-relaxed m-0">
                  Retract scapulae fully before unrack. Maintain moderate arch with driving leg drive through heels. Lower barbell to upper clavicular region at 3-second eccentric tempo. Do not bounce off sternum. Drive up aggressively on 1-second cadence.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Next Exercises Queue & Biomarkers (Cols 9-12) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Session Exercise Queue */}
            <div className="p-5 rounded-[14px] bg-surface-card border border-border-subtle flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">
                  Session Queue
                </span>
                <span className="text-[11px] uppercase tracking-wider text-text-primary font-bold">
                  4 Exercises Total
                </span>
              </div>

              <div className="divide-y divide-border-subtle">
                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-text-primary text-text-inverse text-[11px] font-mono font-bold flex items-center justify-center">
                      01
                    </span>
                    <div>
                      <p className="text-[13px] font-bold text-text-primary leading-tight">Incline Bench Press</p>
                      <span className="text-[10px] text-text-muted">4 sets × 8–10 reps • Active</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-surface-canvas text-text-primary border border-border-strong">
                    In Progress
                  </span>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-surface-canvas text-text-muted text-[11px] font-mono font-bold flex items-center justify-center border border-border-subtle">
                      02
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-text-primary leading-tight">Weighted Dips</p>
                      <span className="text-[10px] text-text-muted">4 sets × 10 reps • Chain Load</span>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-surface-elevated text-text-muted border border-border-subtle">
                    Up Next
                  </span>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-surface-canvas text-text-muted text-[11px] font-mono font-bold flex items-center justify-center border border-border-subtle">
                      03
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-text-secondary leading-tight">Dumbbell Incline Flyes</p>
                      <span className="text-[10px] text-text-muted">4 sets × 12 reps • Constant Tension</span>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-surface-canvas text-text-muted">
                    Queued
                  </span>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-surface-canvas text-text-muted text-[11px] font-mono font-bold flex items-center justify-center border border-border-subtle">
                      04
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-text-secondary leading-tight">Rope Triceps Pushdown</p>
                      <span className="text-[10px] text-text-muted">4 sets × 15 reps • Drop Set Set 4</span>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-surface-canvas text-text-muted">
                    Queued
                  </span>
                </div>
              </div>
            </div>

            {/* Real-time Session Vitals */}
            <div className="p-5 rounded-[14px] bg-surface-card border border-border-subtle flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">
                  Live Vitals Feedback
                </span>
                <span className="material-symbols-outlined text-base text-text-primary animate-pulse">
                  favorite
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded bg-surface-canvas border border-border-subtle">
                  <span className="text-[10px] uppercase text-text-muted block">Heart Rate</span>
                  <span className="text-lg font-bold text-text-primary font-mono">138 BPM</span>
                  <span className="text-[10px] text-text-muted block mt-0.5">Peak: 162 BPM</span>
                </div>
                <div className="p-3 rounded bg-surface-canvas border border-border-subtle">
                  <span className="text-[10px] uppercase text-text-muted block">Total Load</span>
                  <span className="text-lg font-bold text-text-primary font-mono">2,380 KG</span>
                  <span className="text-[10px] text-text-muted block mt-0.5">Est. 4,820 KG Total</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
