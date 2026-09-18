'use client';

import { useState } from 'react';

const tiers = [
  {
    id: 'starter',
    name: 'Starter Telemetry',
    priceMonthly: 49,
    priceAnnual: 490,
    desc: 'Self-directed training tracking with fundamental biometric load monitoring.',
    features: [
      'Digital Workout Logger & Exercise Database',
      'Macro & Hydration Budget Tracking',
      'Standard Volume Progression Charts',
      'Basic AI Rest Interval Estimator',
    ],
    isCurrent: false,
    cta: 'Downgrade to Starter',
  },
  {
    id: 'tier-1-pro',
    name: 'Tier 1 Pro Athlete',
    priceMonthly: 149,
    priceAnnual: 1490,
    desc: 'Full sports telemetry access, real-time workout logging, AI coach recommendations.',
    features: [
      'Everything in Starter Telemetry',
      'Continuous Biometric Overload Tracking',
      'Interactive Live Workout HUD with RPE & Rest Clock',
      'Precision Fueling & Micronutrient Diagnostics',
      'Autonomous AI Performance Copilot',
      'Full Dispensary 10% Protocol Discount',
    ],
    isCurrent: true,
    badge: 'ACTIVE SUBSCRIPTION',
    cta: 'Manage Billing',
  },
  {
    id: 'tier-2-elite',
    name: 'Tier 2 Elite Olympian',
    priceMonthly: 299,
    priceAnnual: 2990,
    desc: 'Direct CSCS coach 1-to-1 video assessments, bespoke mesocycles, blood panel sync.',
    features: [
      'All Tier 1 Pro Features Included',
      'Weekly 1-on-1 Video Sync with CSCS Coach Marcus Vance',
      'Custom Formulated Supplement Stacks',
      'Priority Triage Queue on Telemetry Spikes',
      'Biomechanical Frame-by-Frame Bar Velocity Audits',
      'Direct Athlete-Coach Encrypted Messaging Rail',
    ],
    isCurrent: false,
    badge: 'OLYMPIC & PRO ATHLETE',
    cta: 'Upgrade to Elite Olympian',
  },
];

export default function SubscriptionsPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleAction = (tierName: string) => {
    setSelectedTier(tierName);
    setSuccessNotice(`Protocol updated to ${tierName}. Billing synchronization active.`);
    setTimeout(() => setSuccessNotice(null), 4000);
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#242424] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#777777]">
              MEMBERSHIP TIERS // ATHLETIC TELEMETRY PROTOCOL
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            Subscription & Performance Tiers
          </h1>
          <p className="text-sm text-[#777777] mt-1">
            Enterprise sports science telemetry, AI copilot access, and dedicated CSCS coach programming.
          </p>
        </div>

        {/* Billing Switcher */}
        <div className="flex items-center gap-3 bg-[#111111] border border-[#242424] p-1 rounded-xl">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              billingCycle === 'monthly' ? 'bg-white text-black font-bold' : 'text-[#777777] hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              billingCycle === 'annual' ? 'bg-white text-black font-bold' : 'text-[#777777] hover:text-white'
            }`}
          >
            Annual Protocol
            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#242424] text-white rounded">SAVE 18%</span>
          </button>
        </div>
      </div>

      {successNotice && (
        <div className="p-4 bg-[#171717] border border-white rounded-xl flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-white">
            <span className="material-symbols-outlined text-base">verified</span>
            {successNotice}
          </div>
        </div>
      )}

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => {
          const price = billingCycle === 'monthly' ? tier.priceMonthly : Math.round(tier.priceAnnual / 12);

          return (
            <div
              key={tier.id}
              className={`bg-[#111111] border rounded-xl p-6 flex flex-col justify-between transition-all ${
                tier.isCurrent
                  ? 'border-white ring-1 ring-white/20'
                  : 'border-[#242424] hover:border-[#4A4A4A]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#777777]">{tier.name}</span>
                  {tier.badge && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-black">
                      {tier.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-4xl font-extrabold text-white">${price}</span>
                  <span className="text-xs text-[#777777] font-mono">/ month</span>
                </div>

                <p className="text-xs text-[#BDBDBD] leading-relaxed mb-6">{tier.desc}</p>

                <div className="border-t border-[#242424] pt-5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#777777] mb-3">
                    INCLUDED TELEMETRY CAPABILITIES
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#BDBDBD]">
                        <span className="material-symbols-outlined text-sm text-white flex-shrink-0 mt-0.5">
                          check
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-[#242424]">
                <button
                  type="button"
                  onClick={() => handleAction(tier.name)}
                  className={`w-full py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                    tier.isCurrent
                      ? 'bg-[#171717] border border-[#4A4A4A] text-white hover:bg-[#202020]'
                      : 'bg-white text-black hover:bg-[#E5E2E1]'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Specialist Add-on Packs */}
      <div className="bg-[#111111] border border-[#242424] rounded-xl p-6 flex flex-col gap-4 mt-2">
        <div className="flex items-center justify-between border-b border-[#242424] pb-4">
          <div>
            <h3 className="text-base font-bold uppercase tracking-wide text-white">
              Specialist Diagnostic Add-On Packs
            </h3>
            <p className="text-xs text-[#777777] mt-0.5">
              Targeted single-session interventions without altering your base subscription tier.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#777777]">ON-DEMAND DISPATCH</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#0A0A0A] border border-[#242424] rounded-lg flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white uppercase">Single Biomechanical Movement Audit</span>
              <span className="text-[11px] text-[#777777] mt-0.5">
                45-min video review with CSCS Coach Marcus Vance + barbell velocity breakdown.
              </span>
              <span className="text-sm font-extrabold text-white font-mono mt-2">$79.00 USD</span>
            </div>
            <a
              href="/app/appointments"
              className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded hover:bg-[#E5E2E1] transition-all flex-shrink-0"
            >
              Book Audit
            </a>
          </div>

          <div className="p-4 bg-[#0A0A0A] border border-[#242424] rounded-lg flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white uppercase">Metabolic Blood Panel Telemetry Calibration</span>
              <span className="text-[11px] text-[#777777] mt-0.5">
                Comprehensive lipid, hormonal, and electrolyte review with nutritionist Sarah Jenkins.
              </span>
              <span className="text-sm font-extrabold text-white font-mono mt-2">$129.00 USD</span>
            </div>
            <a
              href="/app/appointments"
              className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded hover:bg-[#E5E2E1] transition-all flex-shrink-0"
            >
              Book Audit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
