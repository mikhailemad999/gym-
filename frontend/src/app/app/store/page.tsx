'use client';

import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  batch: string;
  serving: string;
  spec: string;
  price: number;
  rating: number;
  badge: string;
}

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState('All Formulations');
  const [currency, setCurrency] = useState('USD');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<{ [id: string]: number }>({
    '1': 1,
    '2': 1,
    '3': 1,
  });

  const categories = [
    'All Formulations',
    'Protein & Peptides',
    'Creatine & ATP',
    'Intra-Workout & Electrolytes',
    'Nootropics & Focus',
    'Technical Apparel',
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'Hydrolyzed Whey Peptide Matrix',
      category: 'Protein & Peptides',
      batch: 'LOT #HYD-9921 • Informed-Sport Verified',
      serving: '2,000g / 66 Servings',
      spec: '30g Pure Hydrolyzed Whey • 6.8g Leucine-Heavy BCAAs • 0g Sugar',
      price: 64.0,
      rating: 4.9,
      badge: 'Gold Standard',
    },
    {
      id: '2',
      name: 'Micronized Creapure® Monohydrate',
      category: 'Creatine & ATP',
      batch: 'LOT #CRP-4081 • 99.9% HPLC Tested',
      serving: '500g / 100 Servings',
      spec: '5g Clinical Dose • German Synthesized • Unflavored Ultrafine Mesh',
      price: 38.0,
      rating: 5.0,
      badge: 'Cellular ATP',
    },
    {
      id: '3',
      name: 'Intra-Load Osmolyte & Electrolyte Matrix',
      category: 'Intra-Workout & Electrolytes',
      batch: 'LOT #INT-8830 • Batch Certified',
      serving: '840g / 30 Servings',
      spec: '30g Cluster Dextrin® • 1,000mg Sodium • 300mg Magnesium Malate',
      price: 46.0,
      rating: 4.8,
      badge: 'Hydration Fuel',
    },
    {
      id: '4',
      name: 'Clinical Nootropic & Dopaminergic Focus',
      category: 'Nootropics & Focus',
      batch: 'LOT #NTP-1102 • Third-Party Pure',
      serving: '60 Capsules / 30 Servings',
      spec: '600mg Alpha-GPC • 2,000mg L-Tyrosine • 200mg Caffeine Anhydrous',
      price: 42.0,
      rating: 4.9,
      badge: 'Cognitive Engine',
    },
    {
      id: '5',
      name: 'AthleteCare Pro Compression Rashguard',
      category: 'Technical Apparel',
      batch: 'SKU #AC-RSH-BLK • Matte Stealth',
      serving: 'Sizes S, M, L, XL, XXL',
      spec: '4-Way Elastic Micro-Poly • Bonded Anti-Chafe Seams • Thermal Venting',
      price: 58.0,
      rating: 4.8,
      badge: 'Pro Technical',
    },
    {
      id: '6',
      name: 'Reinforced Dual-Weave Lifting Straps',
      category: 'Technical Apparel',
      batch: 'SKU #AC-STP-HD • 1,000kg Rating',
      serving: 'One Pair • 60cm Length',
      spec: 'Industrial Grade Heavy Canvas • Neoprene Padded Wrist Support',
      price: 24.0,
      rating: 4.9,
      badge: 'Max Load',
    },
  ];

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find((x) => x.id === id);
    return sum + (p ? p.price * qty : 0);
  }, 0);

  const filtered =
    activeCategory === 'All Formulations'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col w-full bg-surface-base min-h-screen relative">
      {/* Header & Utility Bar */}
      <header className="border-b border-border-subtle bg-surface-canvas px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-2 text-[11px] text-text-muted uppercase font-mono">
            <span>AthleteCare Pro Store // Clinical Performance Dispensary &amp; Apparel</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-text-primary"></span>
                Telemetry Synced: W08 Hypertrophy Cycle
              </span>
              <span>•</span>
              <span>User ID: AP-8842-MK</span>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
            <div className="flex flex-col gap-1 max-w-2xl">
              <h1 className="text-3xl lg:text-4xl uppercase font-extrabold tracking-tight text-text-primary font-display">
                Performance Store &amp; Dispensary
              </h1>
              <p className="text-[13px] text-text-secondary">
                Third-party batch-tested ergogenic aids, clinically-dosed micronutrient matrices, and high-performance technical sportswear.
              </p>
            </div>

            {/* Quick Utility Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex items-center min-w-[240px]">
                <span className="material-symbols-outlined absolute left-3 text-text-muted text-base">search</span>
                <input
                  type="text"
                  placeholder="Search formulations..."
                  className="w-full h-10 pl-9 pr-12 bg-surface-card border border-border-subtle rounded-lg text-[12px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-text-primary"
                />
                <kbd className="absolute right-3 px-1.5 py-0.5 bg-surface-elevated border border-border-subtle rounded text-[10px] font-mono text-text-muted uppercase">
                  ⌘K
                </kbd>
              </div>

              <div className="flex items-center bg-surface-card border border-border-subtle rounded-lg p-0.5 text-[11px] font-bold">
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1 rounded ${currency === 'USD' ? 'bg-surface-elevated text-text-primary' : 'text-text-muted'}`}
                  type="button"
                >
                  USD ($)
                </button>
                <button
                  onClick={() => setCurrency('EUR')}
                  className={`px-3 py-1 rounded ${currency === 'EUR' ? 'bg-surface-elevated text-text-primary' : 'text-text-muted'}`}
                  type="button"
                >
                  EUR (€)
                </button>
              </div>

              <button
                onClick={() => setCartOpen(true)}
                className="h-10 px-4 bg-text-primary text-text-inverse rounded-lg text-[12px] font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-90 transition-all shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-base">shopping_cart</span>
                <span>{totalItems} Items // ${subtotal.toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Horizontal Category Filter Rail */}
      <div className="border-b border-border-subtle bg-surface-base px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider whitespace-nowrap font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-text-primary text-text-inverse shadow-sm'
                  : 'bg-surface-card border border-border-subtle text-text-muted hover:text-text-primary hover:border-border-medium'
              }`}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((prod) => (
            <div
              key={prod.id}
              className="p-5 rounded-[14px] bg-surface-card border border-border-subtle hover:border-border-medium transition-all duration-150 hover:-translate-y-1 flex flex-col justify-between gap-4 group"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-text-muted tracking-wider">
                    {prod.serving}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-surface-elevated text-text-primary border border-border-subtle">
                    {prod.badge}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <h2 className="text-base font-bold text-text-primary uppercase tracking-tight group-hover:underline">
                    {prod.name}
                  </h2>
                  <span className="text-[11px] font-mono text-text-muted">{prod.batch}</span>
                </div>

                <p className="text-[12px] text-text-secondary leading-relaxed bg-surface-canvas p-3 rounded-lg border border-border-subtle">
                  {prod.spec}
                </p>
              </div>

              <div className="pt-3 border-t border-border-subtle flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold text-text-primary font-mono">
                    ${prod.price.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-text-muted uppercase">Rating: {prod.rating} ★★★★★</span>
                </div>

                <button
                  onClick={() => addToCart(prod.id)}
                  className="px-3.5 h-9 rounded-[10px] bg-text-primary text-text-inverse hover:opacity-90 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                  <span>Add to Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Slide-over Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-surface-card border-l border-border-subtle p-6 flex flex-col justify-between h-full shadow-2xl animate-fade-in">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg text-text-primary">shopping_bag</span>
                  <h2 className="text-base font-bold text-text-primary uppercase tracking-tight">
                    Dispensary Order ({totalItems})
                  </h2>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-8 h-8 rounded-lg border border-border-subtle flex items-center justify-center text-text-muted hover:text-text-primary"
                  type="button"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-border-subtle overflow-y-auto max-h-[60vh]">
                {Object.entries(cart).map(([id, qty]) => {
                  const p = products.find((x) => x.id === id);
                  if (!p) return null;

                  return (
                    <div key={id} className="py-3 flex items-center justify-between">
                      <div>
                        <p className="text-[13px] font-semibold text-text-primary">{p.name}</p>
                        <span className="text-[11px] font-mono text-text-muted">
                          ${p.price.toFixed(2)} × {qty}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[13px] font-bold font-mono text-text-primary">
                          ${(p.price * qty).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(id)}
                          className="text-text-muted hover:text-text-primary p-1"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Checkout CTA */}
            <div className="pt-4 border-t border-border-subtle flex flex-col gap-3">
              <div className="flex items-center justify-between text-base font-bold text-text-primary font-mono">
                <span>Total Due:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={() => {
                  alert('Proceeding to clinical batch-tested checkout...');
                  setCartOpen(false);
                }}
                className="w-full h-12 rounded-[10px] bg-text-primary text-text-inverse font-bold text-[13px] uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md"
                type="button"
              >
                <span>Proceed to Clinical Checkout</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
