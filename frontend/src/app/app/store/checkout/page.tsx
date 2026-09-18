'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function StoreCheckoutPage() {
  const [isOrdered, setIsOrdered] = useState(false);
  const [address, setAddress] = useState('742 Evergreen Bio-Facility, Suite 4B');
  const [city, setCity] = useState('Boston, MA 02115');

  const items = [
    { name: 'Hydrolyzed Whey Isolate 95%', qty: 1, price: 68.0, batch: 'BATCH-2026-X4' },
    { name: 'Creapure Micronized Creatine', qty: 1, price: 34.0, batch: 'BATCH-2026-C9' },
    { name: 'Intra-Workout High-Electrolyte Matrix', qty: 1, price: 42.0, batch: 'BATCH-2026-E1' },
  ];

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = subtotal * 0.1; // 10% Pro athlete discount
  const total = subtotal - discount;

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#242424] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#777777]">
              DISPENSARY CHECKOUT // PROTOCOL SETTLEMENT
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            Order Review & Fulfillment
          </h1>
          <p className="text-sm text-[#777777] mt-1">
            Clinical formulation dispatch with verifiable chain-of-custody laboratory certificates.
          </p>
        </div>

        <Link
          href="/app/store"
          className="text-xs font-mono uppercase text-[#777777] hover:text-white flex items-center gap-1"
        >
          ← Return to Dispensary
        </Link>
      </div>

      {isOrdered ? (
        <div className="bg-[#111111] border border-white rounded-2xl p-8 sm:p-12 flex flex-col items-center text-center gap-4 max-w-xl mx-auto w-full animate-fade-in my-10">
          <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl font-bold">check</span>
          </div>
          <h2 className="text-2xl font-bold uppercase tracking-tight text-white">Order Dispatched</h2>
          <p className="text-xs font-mono text-[#BDBDBD]">
            ORDER ID: ACP-2026-884-MKR • DISPATCHED VIA COLD-CHAIN EXPRESS
          </p>
          <p className="text-xs text-[#777777] leading-relaxed max-w-md">
            Your pharmaceutical-grade supplements have been logged to your athlete fueling calendar. Batch test certificates have been saved to your biometric dossier.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <Link
              href="/app/dashboard"
              className="px-5 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#E5E2E1] transition-all"
            >
              Return to Dashboard
            </Link>
            <Link
              href="/app/nutrition"
              className="px-5 py-2.5 bg-[#171717] border border-[#4A4A4A] text-white text-xs font-mono uppercase tracking-wider rounded-lg hover:border-white transition-all"
            >
              View Nutrition Matrix
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Logistics Form (7 cols) */}
          <form onSubmit={handleOrder} className="lg:col-span-7 flex flex-col gap-6">
            {/* 1. Address */}
            <div className="bg-[#111111] border border-[#242424] rounded-xl p-6 flex flex-col gap-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-base">local_shipping</span>
                1. Athlete Delivery Logistics
              </h2>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#777777] mb-1">
                    Facility / Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#777777] mb-1">
                    City, State & Postal Zip
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method */}
            <div className="bg-[#111111] border border-[#242424] rounded-xl p-6 flex flex-col gap-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-base">credit_card</span>
                2. Settle Protocol Payment
              </h2>

              <div className="p-4 bg-[#0A0A0A] border border-[#242424] rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-black border border-[#4A4A4A] flex items-center justify-center font-mono font-bold text-xs text-white">
                    VISA
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white font-mono">•••• •••• •••• 8841</span>
                    <span className="text-[10px] text-[#777777]">Exp 12/28 • Pro Athlete Account</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-white bg-[#171717] px-2 py-1 rounded">DEFAULT</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#E5E2E1] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">lock</span>
              Authorize Clinical Dispatch (${total.toFixed(2)} USD)
            </button>
          </form>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-[#111111] border border-[#242424] rounded-xl p-6 flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#242424] pb-3 flex items-center justify-between">
                <span>Dispensary Cart ({items.length} Items)</span>
                <span className="text-[10px] font-mono text-white">10% TIER DISCOUNT</span>
              </h3>

              <div className="flex flex-col divide-y divide-[#171717]">
                {items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white">{item.name}</span>
                      <span className="text-[10px] font-mono text-[#777777]">{item.batch} • Qty: {item.qty}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-white">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#242424] flex flex-col gap-2 text-xs font-mono">
                <div className="flex justify-between text-[#777777]">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#BDBDBD]">
                  <span>Tier 1 Pro Protocol Discount (-10%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#777777]">
                  <span>Cold-Chain Express Shipping</span>
                  <span className="text-white">FREE</span>
                </div>
                <div className="pt-3 border-t border-[#242424] flex justify-between text-sm font-bold text-white">
                  <span>Total Amount</span>
                  <span>${total.toFixed(2)} USD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
