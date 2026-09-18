'use client';

import { useState } from 'react';

const triageQueue = [
  {
    id: 't-1',
    athlete: 'Sarah Jenkins',
    tier: 'Tier 1 Pro',
    issue: 'HRV Suppressed -14% for 48 consecutive hours',
    trigger: 'Sleep efficiency collapsed to 72%. Elevated autonomic stress pattern detected via wearable feed.',
    actionName: 'INJECT 48-HR DELOAD PROTOCOL',
    secondaryAction: 'CAP AEROBIC WORK TO ZONE 2',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    severity: 'HIGH_ATTENTION',
  },
  {
    id: 't-2',
    athlete: 'David Zhao',
    tier: 'Senior Athlete',
    issue: 'Missed Week 08 Check-in & Biomechanical Bar Path Upload',
    trigger: 'Last logged activity 36 hours overdue. Meso-compliance warning threshold triggered (78%).',
    actionName: 'SEND EMERGENCY SMS NUDGE',
    secondaryAction: 'LOCK NEXT MICROCYCLE BLOCK',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    severity: 'ACTION_REQUIRED',
  },
  {
    id: 't-3',
    athlete: 'Mikhail R.',
    tier: 'Tier 1 Pro',
    issue: 'RPE 9.0 logged on Incline Press (+2.5kg PR achieved)',
    trigger: 'Needs Microcycle 9 systemic volume calibration before tomorrow’s heavy leg push.',
    actionName: 'CONFIRM VOLUME CALIBRATION',
    secondaryAction: 'DISPATCH BIO-AFFIRMATION',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    severity: 'OPTIMAL_CALIBRATE',
  },
];

export default function CoachInterventionsPage() {
  const [queue, setQueue] = useState(triageQueue);
  const [injectedNotice, setInjectedNotice] = useState<string | null>(null);

  const handleAction = (id: string, actionText: string, athleteName: string) => {
    setQueue(queue.filter((q) => q.id !== id));
    setInjectedNotice(`Successfully executed "${actionText}" for ${athleteName}. Bio-prescription synced.`);
    setTimeout(() => setInjectedNotice(null), 4000);
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#242424] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#777777]">
              PRIORITY TRIAGE // BIO-PROGRAMMING INTERVENTION QUEUE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            Acute Fatigue & Risk Triage
          </h1>
          <p className="text-sm text-[#777777] mt-1">
            Athletes exceeding physiological fatigue thresholds, exhibiting HRV suppression, or missing microcycle checkpoints.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 bg-[#171717] border border-white text-white text-xs font-mono font-bold rounded-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            {queue.length} Critical Items in Queue
          </span>
        </div>
      </div>

      {injectedNotice && (
        <div className="p-4 bg-[#171717] border border-white rounded-xl flex items-center gap-2 text-xs font-semibold text-white animate-fade-in font-mono">
          <span className="material-symbols-outlined text-base">verified</span>
          {injectedNotice}
        </div>
      )}

      {/* Triage Cards List */}
      <div className="flex flex-col gap-4">
        {queue.map((item) => (
          <div
            key={item.id}
            className="bg-[#111111] border border-[#242424] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:border-[#4A4A4A]"
          >
            <div className="flex items-start gap-4">
              <img
                src={item.avatar}
                alt={item.athlete}
                className="w-12 h-12 rounded-full object-cover border border-[#4A4A4A] flex-shrink-0"
              />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-bold text-white uppercase">{item.athlete}</span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#0A0A0A] border border-[#242424] text-[#BDBDBD]">
                    {item.tier}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      item.severity === 'HIGH_ATTENTION'
                        ? 'bg-white text-black'
                        : 'bg-[#171717] border border-[#4A4A4A] text-white'
                    }`}
                  >
                    {item.severity.replace('_', ' ')}
                  </span>
                </div>

                <div className="text-xs font-bold text-white mt-1">{item.issue}</div>
                <div className="text-[11px] text-[#777777] leading-relaxed max-w-2xl">{item.trigger}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-shrink-0">
              <button
                type="button"
                onClick={() => handleAction(item.id, item.actionName, item.athlete)}
                className="px-4 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#E5E2E1] transition-all whitespace-nowrap"
              >
                {item.actionName}
              </button>
              <button
                type="button"
                onClick={() => handleAction(item.id, item.secondaryAction, item.athlete)}
                className="px-3.5 py-2.5 bg-[#0A0A0A] border border-[#4A4A4A] text-white text-xs font-mono uppercase tracking-wider rounded-lg hover:bg-[#171717] transition-all whitespace-nowrap"
              >
                {item.secondaryAction}
              </button>
            </div>
          </div>
        ))}

        {queue.length === 0 && (
          <div className="p-12 text-center bg-[#111111] border border-[#242424] rounded-xl flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-white">task_alt</span>
            <div className="text-sm font-bold uppercase tracking-wide text-white">All Athletes Normalized</div>
            <p className="text-xs text-[#777777]">
              Zero physiological fatigue violations detected in the active telemetry buffer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
