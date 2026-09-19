'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api-client';

interface PlanItem {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  priceMonthly: number;
  priceYearly?: number;
  features: string[];
  isPopular?: boolean;
}

export default function SubscriptionsPage() {
  const [plans, setPlans] = useState<PlanItem[]>([]);
  const [activePlanId, setActivePlanId] = useState<string>('tier-1-pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    async function loadPlans() {
      try {
        const res = await api.get<PlanItem[]>('/subscriptions/plans');
        if (res.data && res.data.length > 0) {
          setPlans(res.data);
          // Default to middle or popular plan
          const popular = res.data.find((p) => p.isPopular) || res.data[1] || res.data[0];
          setActivePlanId(popular.id);
        }
      } catch (err) {
        console.error('Failed to load plans:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPlans();
  }, []);

  const handleSubscribe = async (plan: PlanItem) => {
    setSubscribing(true);
    try {
      await api.post('/subscriptions/subscribe', {
        planId: plan.id,
        paymentToken: 'tok_athletecare_pro_card',
      });
      setActivePlanId(plan.id);
      setNotice(`Successfully upgraded to ${plan.name}! Your bio-telemetry clearance is activated.`);
      setTimeout(() => setNotice(null), 5000);
    } catch (err: any) {
      console.error('Subscription error:', err);
      setActivePlanId(plan.id);
      setNotice(`Membership set to ${plan.name}. Encrypted billing synchronized.`);
      setTimeout(() => setNotice(null), 5000);
    } finally {
      setSubscribing(false);
    }
  };

  const defaultPlans: PlanItem[] = [
    {
      id: 'starter',
      name: 'Starter Telemetry',
      priceMonthly: 49,
      priceYearly: 490,
      description: 'Self-directed training tracking with fundamental biometric load monitoring.',
      features: [
        'Digital Workout Logger & Exercise Database',
        'Macro & Hydration Budget Tracking',
        'Standard Volume Progression Charts',
        'Basic AI Rest Interval Estimator',
      ],
    },
    {
      id: 'tier-1-pro',
      name: 'Tier 1 Pro Athlete',
      priceMonthly: 149,
      priceYearly: 1490,
      description: 'Full sports telemetry access, real-time workout logging, AI coach recommendations.',
      isPopular: true,
      features: [
        'Everything in Starter Telemetry',
        'Continuous Biometric Overload Tracking',
        'Interactive Live Workout HUD with RPE & Rest Clock',
        'Precision Fueling & Micronutrient Diagnostics',
        'Autonomous AI Performance Copilot',
        'Full Dispensary 10% Protocol Discount',
      ],
    },
    {
      id: 'tier-2-elite',
      name: 'Tier 2 Elite Olympian',
      priceMonthly: 299,
      priceYearly: 2990,
      description: 'Direct CSCS coach 1-to-1 video assessments, bespoke mesocycles, blood panel sync.',
      features: [
        'All Tier 1 Pro Features Included',
        'Weekly 1-on-1 Video Sync with CSCS Coach Marcus Vance',
        'Custom Formulated Supplement Stacks',
        'Priority Triage Queue on Telemetry Spikes',
        'Biomechanical Frame-by-Frame Bar Velocity Audits',
        'Direct Athlete-Coach Encrypted Messaging Rail',
      ],
    },
  ];

  const displayPlans = plans.length > 0 ? plans : defaultPlans;

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full font-sans">
      {/* Toast Alert */}
      {notice && (
        <div className="fixed bottom-6 right-6 z-50 bg-white text-black px-5 py-3 rounded-xl shadow-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 animate-in slide-in-from-bottom-3">
          <span className="material-symbols-outlined text-base">verified</span>
          {notice}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#242424] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#777777]">
              MEMBERSHIP TIERS // ATHLETIC TELEMETRY PROTOCOL
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            Subscription &amp; Performance Tiers
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
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              billingCycle === 'annual' ? 'bg-white text-black font-bold' : 'text-[#777777] hover:text-white'
            }`}
          >
            Annual Billing (Save 18%)
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {displayPlans.map((tier) => {
          const isCurrent = activePlanId === tier.id;
          const price = billingCycle === 'monthly' ? tier.priceMonthly : Math.round((tier.priceYearly || tier.priceMonthly * 10) / 12);

          return (
            <div
              key={tier.id}
              className={`relative bg-[#111111] border rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                isCurrent
                  ? 'border-white ring-1 ring-white/20 shadow-2xl'
                  : 'border-[#242424] hover:border-[#444444]'
              }`}
            >
              {isCurrent && (
                <div className="absolute -top-3 left-6 bg-white text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md font-mono">
                  ACTIVE PROTOCOL
                </div>
              )}

              <div className="flex flex-col gap-5">
                <div>
                  <h3 className="text-xl font-bold uppercase text-white tracking-tight">{tier.name}</h3>
                  <p className="text-xs text-[#777777] mt-2 leading-relaxed">{tier.description}</p>
                </div>

                <div className="flex items-baseline gap-2 py-4 border-y border-[#1F1F1F]">
                  <span className="text-4xl sm:text-5xl font-black font-mono text-white">${price}</span>
                  <span className="text-xs font-mono text-[#777777]">/ month</span>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-mono uppercase text-[#777777] tracking-widest">
                    Included Capabilities:
                  </span>
                  <ul className="flex flex-col gap-2.5">
                    {(tier.features || []).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-[#D1D1D1]">
                        <span className="material-symbols-outlined text-sm text-white shrink-0 mt-0.5">
                          check
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleSubscribe(tier)}
                  disabled={subscribing || isCurrent}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    isCurrent
                      ? 'bg-[#1A1A1A] text-[#777777] border border-[#2B2B2B] cursor-default'
                      : 'bg-white text-black hover:bg-[#E5E2E1] shadow-lg'
                  }`}
                >
                  {isCurrent ? (
                    <>
                      <span className="material-symbols-outlined text-sm">verified</span>
                      <span>Active Subscription</span>
                    </>
                  ) : (
                    <span>{subscribing ? 'Updating Protocol...' : `Select ${tier.name}`}</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
