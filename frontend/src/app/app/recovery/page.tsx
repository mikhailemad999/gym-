'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api-client';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';

interface RecoveryData {
  id?: string;
  logDate: string;
  sleepHours: number;
  sleepQuality: number;
  restingHeartRate: number;
  hrvRmssd: number;
  sorenessScore: number;
  stressScore: number;
  energyScore: number;
  readinessScore: number;
  readinessState: 'OPTIMAL' | 'GOOD' | 'STRAINED' | 'CRITICAL';
  soreMuscles: string[];
  aiInsight?: string;
  notes?: string;
}

interface HydrationData {
  id?: string;
  logDate: string;
  totalIntakeMl: number;
  targetMl: number;
  percentage: number;
  remainingMl: number;
  entries: {
    id: string;
    timestamp: string;
    amountMl: number;
    beverage: string;
  }[];
}

interface TrendItem {
  date: string;
  readiness: number;
  hrv: number;
  sleep: number;
  quality: number;
  rhr: number;
}

const MUSCLE_GROUPS = [
  'Chest',
  'Anterior Deltoids',
  'Lats',
  'Upper Back',
  'Quadriceps',
  'Hamstrings',
  'Glutes',
  'Core / Abdominals',
  'Calves',
];

export default function RecoveryPage() {
  const [loading, setLoading] = useState(true);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isHydrationModalOpen, setIsHydrationModalOpen] = useState(false);
  const [customHydrationAmount, setCustomHydrationAmount] = useState('350');
  const [customBeverage, setCustomBeverage] = useState('Electrolyte Hydration');

  // Form state for logging metrics
  const [formSleepHours, setFormSleepHours] = useState(7.8);
  const [formSleepQuality, setFormSleepQuality] = useState(88);
  const [formRhr, setFormRhr] = useState(52);
  const [formHrv, setFormHrv] = useState(68);
  const [formSoreness, setFormSoreness] = useState(3);
  const [formStress, setFormStress] = useState(2);
  const [formEnergy, setFormEnergy] = useState(8);
  const [formSoreMuscles, setFormSoreMuscles] = useState<string[]>(['Chest', 'Anterior Deltoids']);
  const [formNotes, setFormNotes] = useState('');

  // Main state
  const [recovery, setRecovery] = useState<RecoveryData>({
    logDate: new Date().toISOString().split('T')[0],
    sleepHours: 7.8,
    sleepQuality: 88,
    restingHeartRate: 52,
    hrvRmssd: 68,
    sorenessScore: 3,
    stressScore: 2,
    energyScore: 8,
    readinessScore: 88,
    readinessState: 'OPTIMAL',
    soreMuscles: ['Chest', 'Anterior Deltoids'],
    aiInsight:
      'Autonomic nervous system is primed with robust parasympathetic tone. Heart rate variability is in peak tier. Fully cleared for maximum progressive overload and high neuromuscular volume.',
    notes: 'Restful 7.8h sleep cycle. Supplemented with Magnesium L-Threonate & Glycine.',
  });

  const [hydration, setHydration] = useState<HydrationData>({
    logDate: new Date().toISOString().split('T')[0],
    totalIntakeMl: 2500,
    targetMl: 3500,
    percentage: 71,
    remainingMl: 1000,
    entries: [
      { id: '1', timestamp: '07:30', amountMl: 500, beverage: 'Morning Lemon Water + Electrolytes' },
      { id: '2', timestamp: '11:00', amountMl: 750, beverage: 'Filtered Mineral Water' },
      { id: '3', timestamp: '14:30', amountMl: 750, beverage: 'Intra-workout EAA Solution' },
      { id: '4', timestamp: '18:15', amountMl: 500, beverage: 'Coconut Water & Pink Salt' },
    ],
  });

  const [trends, setTrends] = useState<TrendItem[]>([
    { date: '09/21', readiness: 82, hrv: 62, sleep: 7.2, quality: 80, rhr: 56 },
    { date: '09/22', readiness: 78, hrv: 59, sleep: 6.9, quality: 75, rhr: 57 },
    { date: '09/23', readiness: 85, hrv: 65, sleep: 7.8, quality: 86, rhr: 54 },
    { date: '09/24', readiness: 91, hrv: 72, sleep: 8.2, quality: 92, rhr: 51 },
    { date: '09/25', readiness: 84, hrv: 66, sleep: 7.5, quality: 84, rhr: 53 },
    { date: '09/26', readiness: 79, hrv: 60, sleep: 7.1, quality: 79, rhr: 55 },
    { date: '09/27', readiness: 88, hrv: 68, sleep: 7.8, quality: 88, rhr: 52 },
  ]);

  const [trendAverages, setTrendAverages] = useState({
    avgHrv: 65,
    avgSleep: 7.5,
    avgReadiness: 84,
    cnsStatus: 'SUPERCOMPENSATED',
  });

  // Fetch data
  const fetchData = async () => {
    try {
      const [recRes, hydRes, trendsRes] = await Promise.allSettled([
        api.get<any>('/recovery/daily'),
        api.get<any>('/recovery/hydration'),
        api.get<any>('/recovery/trends?days=7'),
      ]);

      if (recRes.status === 'fulfilled' && (recRes.value as any)?.data) {
        const val = (recRes.value as any).data;
        const d = val?.data || val;
        if (d && d.logDate) {
          setRecovery({
            ...d,
            sleepHours: Number(d.sleepHours),
            soreMuscles: Array.isArray(d.soreMuscles) ? d.soreMuscles : [],
          });
          setFormSleepHours(Number(d.sleepHours));
          setFormSleepQuality(d.sleepQuality);
          setFormRhr(d.restingHeartRate);
          setFormHrv(d.hrvRmssd);
          setFormSoreness(d.sorenessScore);
          setFormStress(d.stressScore);
          setFormEnergy(d.energyScore);
          setFormSoreMuscles(Array.isArray(d.soreMuscles) ? d.soreMuscles : []);
          setFormNotes(d.notes || '');
        }
      }

      if (hydRes.status === 'fulfilled' && (hydRes.value as any)?.data) {
        const val = (hydRes.value as any).data;
        const d = val?.data || val;
        if (d && d.totalIntakeMl !== undefined) {
          setHydration(d);
        }
      }

      if (trendsRes.status === 'fulfilled' && (trendsRes.value as any)?.data) {
        const val = (trendsRes.value as any).data;
        const tData = val?.data || val;
        if (tData?.trends) setTrends(tData.trends);
        if (tData?.averages) setTrendAverages(tData.averages);
      }
    } catch (e) {
      console.error('Error fetching recovery telemetry:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Quick hydration log
  const handleQuickHydration = async (amount: number, beverage = 'Purified Water') => {
    try {
      const res = await api.post<any>('/recovery/hydration', {
        amountMl: amount,
        beverage,
      });

      const resData = (res as any)?.data?.data || (res as any)?.data;
      if (resData) {
        const newTotal = (hydration.totalIntakeMl || 0) + amount;
        const target = hydration.targetMl || 3500;
        const newEntry = {
          id: String(Date.now()),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          amountMl: amount,
          beverage,
        };

        setHydration({
          ...hydration,
          totalIntakeMl: newTotal,
          percentage: Math.min(100, Math.round((newTotal / target) * 100)),
          remainingMl: Math.max(0, target - newTotal),
          entries: [...(hydration.entries || []), newEntry],
        });
      }
    } catch {
      // Fallback local update
      const newTotal = hydration.totalIntakeMl + amount;
      const target = hydration.targetMl;
      setHydration({
        ...hydration,
        totalIntakeMl: newTotal,
        percentage: Math.min(100, Math.round((newTotal / target) * 100)),
        remainingMl: Math.max(0, target - newTotal),
        entries: [
          ...(hydration.entries || []),
          {
            id: String(Date.now()),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            amountMl: amount,
            beverage,
          },
        ],
      });
    }
  };

  // Submit recovery metrics form
  const handleLogRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        sleepHours: Number(formSleepHours),
        sleepQuality: Number(formSleepQuality),
        restingHeartRate: Number(formRhr),
        hrvRmssd: Number(formHrv),
        sorenessScore: Number(formSoreness),
        stressScore: Number(formStress),
        energyScore: Number(formEnergy),
        soreMuscles: formSoreMuscles,
        notes: formNotes,
      };

      const res = await api.post<any>('/recovery/daily', payload);
      const resData = (res as any)?.data?.data || (res as any)?.data;
      if (resData) {
        const d = resData;
        setRecovery({
          ...d,
          sleepHours: Number(d.sleepHours),
          soreMuscles: Array.isArray(d.soreMuscles) ? d.soreMuscles : [],
        });
      }
      setIsLogModalOpen(false);
      fetchData();
    } catch (err) {
      console.error('Failed to log recovery:', err);
      // Simulate state update for responsiveness
      const simulatedScore = Math.min(
        99,
        Math.max(20, Math.round(75 + (formSleepHours - 7.5) * 4 + ((formHrv - 55) / 35) * 18 - (formSoreness - 1) * 2.5)),
      );
      setRecovery({
        ...recovery,
        sleepHours: formSleepHours,
        sleepQuality: formSleepQuality,
        restingHeartRate: formRhr,
        hrvRmssd: formHrv,
        sorenessScore: formSoreness,
        stressScore: formStress,
        energyScore: formEnergy,
        readinessScore: simulatedScore,
        readinessState: simulatedScore >= 85 ? 'OPTIMAL' : simulatedScore >= 70 ? 'GOOD' : 'STRAINED',
        soreMuscles: formSoreMuscles,
        notes: formNotes,
      });
      setIsLogModalOpen(false);
    }
  };

  const toggleMuscleSoreness = (muscle: string) => {
    if (formSoreMuscles.includes(muscle)) {
      setFormSoreMuscles(formSoreMuscles.filter((m) => m !== muscle));
    } else {
      setFormSoreMuscles([...formSoreMuscles, muscle]);
    }
  };

  const getStateColor = (state: string) => {
    switch (state) {
      case 'OPTIMAL':
        return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
      case 'GOOD':
        return 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10';
      case 'STRAINED':
        return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
      case 'CRITICAL':
        return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
      default:
        return 'text-text-primary border-border-medium bg-surface-card';
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface-canvas pb-16">
      {/* Sub-Header & Live Status Banner */}
      <section className="w-full border-b border-border-subtle bg-surface-canvas px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-elevated text-emerald-400 text-[11px] font-semibold uppercase tracking-wider border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Autonomic Telemetry Active
              </span>
              <span className="text-text-muted text-[11px]">•</span>
              <span className="text-[11px] text-text-muted uppercase tracking-widest font-mono">
                Recovery Protocol / RMSSD Engine v2.4
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-text-primary uppercase tracking-tight font-extrabold mt-1">
              Physiological Recovery &amp; Readiness
            </h1>
            <div className="inline-flex items-center gap-2 mt-0.5">
              <span className="text-[11px] uppercase tracking-widest text-text-muted font-medium">Readiness Index:</span>
              <span
                className={`text-[12px] uppercase tracking-wider px-2 py-0.5 rounded border font-bold ${getStateColor(
                  recovery.readinessState,
                )}`}
              >
                {recovery.readinessScore}/100 • {recovery.readinessState}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 md:pt-0">
            <button
              onClick={() => setIsHydrationModalOpen(true)}
              className="px-4 h-10 rounded-[10px] bg-surface-card border border-border-medium hover:border-text-primary text-text-primary text-[13px] font-semibold uppercase tracking-wider flex items-center gap-2 transition-all duration-150 active:scale-[0.98]"
              type="button"
            >
              <span className="material-symbols-outlined text-base text-cyan-400">water_drop</span>
              Custom Hydration
            </button>

            <button
              onClick={() => setIsLogModalOpen(true)}
              className="px-5 h-10 rounded-[10px] bg-text-primary text-text-inverse text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-150 active:scale-[0.98] shadow-sm hover:opacity-90"
              type="button"
            >
              <span className="material-symbols-outlined text-base">tune</span>
              Log Today&apos;s Biometrics
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          {/* Top Hero: Autonomic Readiness Gauge & Realtime Physiological Prescription */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Readiness Gauge Card */}
            <div className="p-6 rounded-[14px] bg-surface-card border border-border-subtle flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                <span className="text-[11px] uppercase tracking-wider text-text-muted font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-emerald-400">vital_signs</span>
                  Daily Neuromuscular Readiness
                </span>
                <span className="text-[11px] text-text-muted uppercase font-mono">{recovery.logDate}</span>
              </div>

              <div className="py-6 flex flex-col items-center justify-center">
                {/* Circular Score Visual */}
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    <circle
                      cx="80"
                      cy="80"
                      r="65"
                      stroke="currentColor"
                      strokeWidth="12"
                      className="text-surface-elevated"
                      fill="transparent"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="65"
                      stroke="currentColor"
                      strokeWidth="12"
                      strokeDasharray={408.4}
                      strokeDashoffset={408.4 - (408.4 * recovery.readinessScore) / 100}
                      strokeLinecap="round"
                      className={
                        recovery.readinessScore >= 85
                          ? 'text-emerald-400'
                          : recovery.readinessScore >= 70
                          ? 'text-cyan-400'
                          : 'text-amber-400'
                      }
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-extrabold text-text-primary tracking-tight">
                      {recovery.readinessScore}
                    </span>
                    <span className="text-[11px] text-text-muted uppercase tracking-widest font-semibold">
                      Out of 100
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider border ${getStateColor(
                      recovery.readinessState,
                    )}`}
                  >
                    State: {recovery.readinessState}
                  </span>
                </div>
              </div>

              {/* Autonomic Breakdown Metrics */}
              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-border-subtle text-[12px]">
                <div className="p-2.5 rounded-lg bg-surface-elevated flex flex-col">
                  <span className="text-text-muted text-[10px] uppercase font-medium">HRV RMSSD</span>
                  <span className="text-base font-bold text-text-primary">{recovery.hrvRmssd} ms</span>
                  <span className="text-[10px] text-emerald-400 font-semibold mt-0.5">+8ms vs baseline</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-elevated flex flex-col">
                  <span className="text-text-muted text-[10px] uppercase font-medium">Resting HR</span>
                  <span className="text-base font-bold text-text-primary">{recovery.restingHeartRate} bpm</span>
                  <span className="text-[10px] text-text-muted mt-0.5">Optimal zone</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-elevated flex flex-col">
                  <span className="text-text-muted text-[10px] uppercase font-medium">Sleep Quality</span>
                  <span className="text-base font-bold text-text-primary">{recovery.sleepQuality}%</span>
                  <span className="text-[10px] text-text-muted mt-0.5">{recovery.sleepHours} hrs duration</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-elevated flex flex-col">
                  <span className="text-text-muted text-[10px] uppercase font-medium">Muscle Soreness</span>
                  <span className="text-base font-bold text-text-primary">{recovery.sorenessScore}/10</span>
                  <span className="text-[10px] text-emerald-400 mt-0.5">Mild DOMS</span>
                </div>
              </div>
            </div>

            {/* AI Physiological Prescription & Insight */}
            <div className="lg:col-span-2 p-6 rounded-[14px] bg-surface-card border border-border-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                  <span className="text-[11px] uppercase tracking-wider text-text-muted font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-cyan-400">psychology</span>
                    AI Physiological Briefing &amp; Training Capacity
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-elevated text-text-primary text-[10px] font-mono uppercase">
                    Model: Biometric GPT-4
                  </span>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-surface-elevated border border-border-subtle">
                  <h3 className="text-base font-bold text-text-primary uppercase tracking-wide flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-400 text-lg">check_circle</span>
                    Recommended Training Capacity: High Progressive Overload
                  </h3>
                  <p className="mt-2 text-text-secondary text-[13px] leading-relaxed">
                    {recovery.aiInsight ||
                      'Your autonomic parasympathetic nervous system demonstrates excellent recovery. HRV RMSSD is elevated above your 7-day rolling average. You are fully primed to attack heavy compound movements with target RPE 8-9.'}
                  </p>
                </div>

                {/* Training Prescriptions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                  <div className="p-3 rounded-lg bg-surface-elevated border border-border-subtle flex flex-col">
                    <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">
                      Intensity Ceiling
                    </span>
                    <span className="text-lg font-bold text-text-primary mt-1">RPE 8.5 - 9.0</span>
                    <span className="text-[11px] text-emerald-400 mt-0.5">Green light for top sets</span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface-elevated border border-border-subtle flex flex-col">
                    <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">
                      Volume Capacity
                    </span>
                    <span className="text-lg font-bold text-text-primary mt-1">100% Prescribed</span>
                    <span className="text-[11px] text-text-muted mt-0.5">No deload required</span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface-elevated border border-border-subtle flex flex-col">
                    <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">
                      Injury Risk Flag
                    </span>
                    <span className="text-lg font-bold text-emerald-400 mt-1">Low (1.2%)</span>
                    <span className="text-[11px] text-text-muted mt-0.5">Muscles balanced</span>
                  </div>
                </div>

                {/* Soreness Callouts */}
                <div className="mt-4 pt-3 border-t border-border-subtle">
                  <span className="text-[11px] uppercase tracking-wider text-text-muted font-semibold block mb-2">
                    Reported Muscle Fatigue / DOMS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {recovery.soreMuscles && recovery.soreMuscles.length > 0 ? (
                      recovery.soreMuscles.map((muscle) => (
                        <span
                          key={muscle}
                          className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-surface-elevated border border-amber-500/30 text-amber-300 flex items-center gap-1"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          {muscle}
                        </span>
                      ))
                    ) : (
                      <span className="text-[12px] text-text-muted italic">No localized soreness reported today.</span>
                    )}
                  </div>
                </div>
              </div>

              {recovery.notes && (
                <div className="mt-4 pt-3 border-t border-border-subtle flex items-start gap-2 text-text-muted text-[12px]">
                  <span className="material-symbols-outlined text-sm text-text-muted mt-0.5">notes</span>
                  <span>Athlete Log Notes: {recovery.notes}</span>
                </div>
              )}
            </div>
          </div>

          {/* Middle Row: Hydration & Electrolyte Hub + Body Soreness Map */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hydration Command Hub */}
            <div className="p-6 rounded-[14px] bg-surface-card border border-border-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                  <span className="text-[11px] uppercase tracking-wider text-text-muted font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-cyan-400">water_drop</span>
                    Hydration &amp; Fluid Balance
                  </span>
                  <span className="text-[11px] text-cyan-400 font-bold font-mono">
                    {hydration.percentage}% of Target
                  </span>
                </div>

                <div className="mt-5 flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-extrabold text-text-primary tracking-tight">
                      {(hydration.totalIntakeMl / 1000).toFixed(2)}
                    </span>
                    <span className="text-text-muted text-[13px] font-semibold ml-1">/ {(hydration.targetMl / 1000).toFixed(1)} L</span>
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">
                    {hydration.remainingMl > 0 ? `${hydration.remainingMl} ml remaining` : 'Target Exceeded!'}
                  </span>
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full bg-surface-elevated rounded-full h-3 mt-3 overflow-hidden border border-border-subtle">
                  <div
                    className="bg-cyan-400 h-full rounded-full transition-all duration-500 ease-out shadow-sm"
                    style={{ width: `${Math.min(100, hydration.percentage)}%` }}
                  ></div>
                </div>

                {/* Quick Add Fluid Buttons */}
                <div className="mt-5">
                  <span className="text-[11px] uppercase tracking-wider text-text-muted font-semibold block mb-2">
                    Quick Log Hydration:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleQuickHydration(250, 'Mineral Water')}
                      className="py-2.5 px-2 rounded-lg bg-surface-elevated hover:bg-surface-elevated/80 border border-border-subtle hover:border-cyan-400/50 text-[12px] font-bold text-text-primary flex flex-col items-center gap-1 transition-all active:scale-[0.98]"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-base text-cyan-400">local_cafe</span>
                      +250 ml
                    </button>
                    <button
                      onClick={() => handleQuickHydration(500, 'Electrolyte Shaker')}
                      className="py-2.5 px-2 rounded-lg bg-surface-elevated hover:bg-surface-elevated/80 border border-border-subtle hover:border-cyan-400/50 text-[12px] font-bold text-text-primary flex flex-col items-center gap-1 transition-all active:scale-[0.98]"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-base text-cyan-400">sports_bar</span>
                      +500 ml
                    </button>
                    <button
                      onClick={() => handleQuickHydration(750, 'Insulated Flask')}
                      className="py-2.5 px-2 rounded-lg bg-surface-elevated hover:bg-surface-elevated/80 border border-border-subtle hover:border-cyan-400/50 text-[12px] font-bold text-text-primary flex flex-col items-center gap-1 transition-all active:scale-[0.98]"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-base text-cyan-400">water_full</span>
                      +750 ml
                    </button>
                  </div>
                </div>

                {/* Intake Log Timeline */}
                <div className="mt-5 pt-3 border-t border-border-subtle">
                  <span className="text-[11px] uppercase tracking-wider text-text-muted font-semibold block mb-2">
                    Today&apos;s Fluid Timeline:
                  </span>
                  <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-1">
                    {hydration.entries && hydration.entries.length > 0 ? (
                      hydration.entries.map((entry) => (
                        <div
                          key={entry.id}
                          className="flex items-center justify-between text-[11px] py-1 px-2 rounded bg-surface-elevated/50 border border-border-subtle"
                        >
                          <span className="font-mono text-text-muted">{entry.timestamp}</span>
                          <span className="text-text-primary font-medium truncate max-w-[140px]">{entry.beverage}</span>
                          <span className="font-bold text-cyan-400">+{entry.amountMl} ml</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-[11px] text-text-muted italic">No fluid entries logged yet.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Musculoskeletal Soreness & Recovery Matrix */}
            <div className="lg:col-span-2 p-6 rounded-[14px] bg-surface-card border border-border-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                  <span className="text-[11px] uppercase tracking-wider text-text-muted font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-text-muted">accessibility_new</span>
                    Musculoskeletal Soreness &amp; Recovery Matrix
                  </span>
                  <span className="text-[11px] text-text-muted uppercase">Interactive Body Map</span>
                </div>

                <p className="mt-3 text-text-secondary text-[13px]">
                  Click to flag muscle groups with active Delayed Onset Muscle Soreness (DOMS) or strain. The AI Recovery Engine adapts your workout intensity dynamically.
                </p>

                {/* Muscle Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-4">
                  {MUSCLE_GROUPS.map((muscle) => {
                    const isSore = formSoreMuscles.includes(muscle);
                    return (
                      <button
                        key={muscle}
                        onClick={() => toggleMuscleSoreness(muscle)}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all duration-150 ${
                          isSore
                            ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                            : 'bg-surface-elevated border-border-subtle hover:border-border-medium text-text-primary'
                        }`}
                        type="button"
                      >
                        <div className="flex flex-col">
                          <span className="text-[12px] font-bold">{muscle}</span>
                          <span className="text-[10px] text-text-muted mt-0.5">
                            {isSore ? 'Active Soreness' : 'Full Recovery'}
                          </span>
                        </div>
                        <span
                          className={`material-symbols-outlined text-base ${
                            isSore ? 'text-amber-400' : 'text-text-muted opacity-40'
                          }`}
                        >
                          {isSore ? 'error' : 'check_circle'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Recovery Modalities Prescribed */}
                <div className="mt-5 pt-4 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-surface-elevated border border-border-subtle flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">ac_unit</span> Cold Contrast
                    </span>
                    <span className="text-[12px] text-text-primary font-semibold mt-1">3 mins at 10°C</span>
                    <span className="text-[10px] text-text-muted mt-0.5">Reduces inflammatory markers</span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface-elevated border border-border-subtle flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">fireplace</span> Infrared Sauna
                    </span>
                    <span className="text-[12px] text-text-primary font-semibold mt-1">20 mins at 75°C</span>
                    <span className="text-[10px] text-text-muted mt-0.5">Heat shock protein induction</span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface-elevated border border-border-subtle flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">bedtime</span> Sleep Hygiene
                    </span>
                    <span className="text-[12px] text-text-primary font-semibold mt-1">8.0 hrs Target</span>
                    <span className="text-[10px] text-text-muted mt-0.5">Magnesium L-Threonate 400mg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: 7-Day Autonomic Trends Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Daily Readiness & HRV Trend */}
            <div className="p-6 rounded-[14px] bg-surface-card border border-border-subtle">
              <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-text-muted font-semibold">
                    7-Day Autonomic Tone &amp; HRV (ms)
                  </span>
                  <span className="text-base font-bold text-text-primary mt-0.5">
                    Rolling Average: {trendAverages.avgHrv} ms RMSSD
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase">
                  {trendAverages.cnsStatus}
                </span>
              </div>

              <div className="h-64 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#242424" />
                    <XAxis dataKey="date" stroke="#777777" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#777777" tick={{ fontSize: 11 }} domain={[40, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#171717',
                        borderColor: '#333333',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="readiness"
                      name="Readiness Score"
                      stroke="#34d399"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#34d399' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="hrv"
                      name="HRV RMSSD (ms)"
                      stroke="#22d3ee"
                      strokeWidth={2}
                      dot={{ r: 3, fill: '#22d3ee' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Sleep Duration & Quality Trend */}
            <div className="p-6 rounded-[14px] bg-surface-card border border-border-subtle">
              <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-text-muted font-semibold">
                    Sleep Duration &amp; Recovery Efficiency
                  </span>
                  <span className="text-base font-bold text-text-primary mt-0.5">
                    7-Day Avg Duration: {trendAverages.avgSleep} hrs
                  </span>
                </div>
                <span className="text-text-muted text-[11px] uppercase font-mono">Target: 8.0 hrs</span>
              </div>

              <div className="h-64 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#242424" />
                    <XAxis dataKey="date" stroke="#777777" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#777777" tick={{ fontSize: 11 }} domain={[0, 10]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#171717',
                        borderColor: '#333333',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                    />
                    <Bar dataKey="sleep" name="Sleep (Hours)" fill="#818cf8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Log Today's Biometrics */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-surface-card border border-border-medium p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-text-primary uppercase tracking-wide">
                  Log Physiological Biometrics
                </h3>
                <span className="text-[11px] text-text-muted">Calculates Autonomic Readiness &amp; CNS Strain</span>
              </div>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="text-text-muted hover:text-text-primary p-1 rounded-lg"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleLogRecovery} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-text-muted uppercase">Sleep Duration (Hours)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="24"
                    value={formSleepHours}
                    onChange={(e) => setFormSleepHours(parseFloat(e.target.value) || 0)}
                    className="h-10 px-3 rounded-lg bg-surface-elevated border border-border-subtle text-text-primary text-sm focus:outline-none focus:border-text-primary"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-text-muted uppercase">Sleep Quality (1-100)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formSleepQuality}
                    onChange={(e) => setFormSleepQuality(parseInt(e.target.value, 10) || 0)}
                    className="h-10 px-3 rounded-lg bg-surface-elevated border border-border-subtle text-text-primary text-sm focus:outline-none focus:border-text-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-text-muted uppercase">Resting HR (bpm)</label>
                  <input
                    type="number"
                    min="30"
                    max="200"
                    value={formRhr}
                    onChange={(e) => setFormRhr(parseInt(e.target.value, 10) || 0)}
                    className="h-10 px-3 rounded-lg bg-surface-elevated border border-border-subtle text-text-primary text-sm focus:outline-none focus:border-text-primary"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-text-muted uppercase">HRV RMSSD (ms)</label>
                  <input
                    type="number"
                    min="5"
                    max="250"
                    value={formHrv}
                    onChange={(e) => setFormHrv(parseInt(e.target.value, 10) || 0)}
                    className="h-10 px-3 rounded-lg bg-surface-elevated border border-border-subtle text-text-primary text-sm focus:outline-none focus:border-text-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-text-muted uppercase">Soreness (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formSoreness}
                    onChange={(e) => setFormSoreness(parseInt(e.target.value, 10) || 1)}
                    className="h-10 px-3 rounded-lg bg-surface-elevated border border-border-subtle text-text-primary text-sm focus:outline-none focus:border-text-primary"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-text-muted uppercase">Stress (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formStress}
                    onChange={(e) => setFormStress(parseInt(e.target.value, 10) || 1)}
                    className="h-10 px-3 rounded-lg bg-surface-elevated border border-border-subtle text-text-primary text-sm focus:outline-none focus:border-text-primary"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-text-muted uppercase">Energy (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formEnergy}
                    onChange={(e) => setFormEnergy(parseInt(e.target.value, 10) || 1)}
                    className="h-10 px-3 rounded-lg bg-surface-elevated border border-border-subtle text-text-primary text-sm focus:outline-none focus:border-text-primary"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-text-muted uppercase">
                  Flag Sore Muscle Groups:
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {MUSCLE_GROUPS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => toggleMuscleSoreness(m)}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold border ${
                        formSoreMuscles.includes(m)
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-surface-elevated border-border-subtle text-text-muted'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-text-muted uppercase">Athlete Notes</label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="e.g., Felt deep REM sleep, minor tightness in chest from heavy bench..."
                  className="px-3 py-2 rounded-lg bg-surface-elevated border border-border-subtle text-text-primary text-sm focus:outline-none focus:border-text-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-4 h-10 rounded-lg text-text-muted hover:text-text-primary text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 h-10 rounded-lg bg-text-primary text-text-inverse font-bold text-sm uppercase tracking-wide hover:opacity-90"
                >
                  Save &amp; Compute Readiness
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Custom Hydration Log */}
      {isHydrationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-surface-card border border-border-medium p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <h3 className="text-base font-bold text-text-primary uppercase tracking-wide">
                Log Custom Fluid Intake
              </h3>
              <button
                onClick={() => setIsHydrationModalOpen(false)}
                className="text-text-muted hover:text-text-primary p-1 rounded-lg"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-text-muted uppercase">Volume (ml)</label>
                <input
                  type="number"
                  min="50"
                  max="3000"
                  step="50"
                  value={customHydrationAmount}
                  onChange={(e) => setCustomHydrationAmount(e.target.value)}
                  className="h-10 px-3 rounded-lg bg-surface-elevated border border-border-subtle text-text-primary text-sm focus:outline-none focus:border-text-primary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-text-muted uppercase">Beverage Description</label>
                <input
                  type="text"
                  value={customBeverage}
                  onChange={(e) => setCustomBeverage(e.target.value)}
                  placeholder="e.g., Cold Brew Coffee, Electrolyte Hydration"
                  className="h-10 px-3 rounded-lg bg-surface-elevated border border-border-subtle text-text-primary text-sm focus:outline-none focus:border-text-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={() => setIsHydrationModalOpen(false)}
                  className="px-4 h-10 rounded-lg text-text-muted hover:text-text-primary text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleQuickHydration(parseInt(customHydrationAmount, 10) || 250, customBeverage);
                    setIsHydrationModalOpen(false);
                  }}
                  className="px-5 h-10 rounded-lg bg-cyan-400 text-black font-bold text-sm uppercase tracking-wide hover:opacity-90"
                >
                  Add Intake
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
