'use client';

import { useState } from 'react';

export default function NutritionPage() {
  const [selectedDate, setSelectedDate] = useState('TODAY, OCT 24');

  const meals = [
    {
      name: 'Meal 01: Breakfast',
      time: '08:00 AM',
      tag: 'Completed',
      calories: 620,
      protein: 48,
      carbs: 72,
      fats: 16,
      foods: [
        { name: 'Organic Rolled Oats', amount: '100g', cals: 380, p: 13, c: 68, f: 7 },
        { name: 'Cold-Filtered Whey Isolate', amount: '35g', cals: 130, p: 30, c: 1, f: 0 },
        { name: 'Wild Blueberries', amount: '80g', cals: 45, p: 1, c: 11, f: 0 },
        { name: 'Organic Almond Butter', amount: '15g', cals: 95, p: 4, c: 3, f: 8 },
      ],
    },
    {
      name: 'Meal 02: Pre-Workout',
      time: '12:30 PM',
      tag: 'Completed',
      calories: 740,
      protein: 56,
      carbs: 95,
      fats: 14,
      foods: [
        { name: 'Skinless Chicken Breast', amount: '220g', cals: 360, p: 50, c: 0, f: 4 },
        { name: 'Organic Jasmine Rice (Cooked)', amount: '250g', cals: 325, p: 6, c: 72, f: 1 },
        { name: 'Steamed Broccoli Crowns', amount: '120g', cals: 42, p: 3, c: 8, f: 0 },
        { name: 'Extra Virgin Olive Oil', amount: '10ml', cals: 88, p: 0, c: 0, f: 10 },
      ],
    },
    {
      name: 'Meal 03: Post-Workout Recovery',
      time: '16:30 PM',
      tag: 'Up Next',
      calories: 380,
      protein: 42,
      carbs: 48,
      fats: 2,
      foods: [
        { name: 'Hydrolyzed Whey Protein', amount: '40g', cals: 150, p: 37, c: 1, f: 0 },
        { name: 'Highly Branched Cyclic Dextrin', amount: '50g', cals: 195, p: 0, c: 47, f: 0 },
        { name: 'Creapure Creatine Monohydrate', amount: '5g', cals: 0, p: 0, c: 0, f: 0 },
        { name: 'Himalayan Pink Salt (Electrolytes)', amount: '1g', cals: 0, p: 0, c: 0, f: 0 },
      ],
    },
    {
      name: 'Meal 04: Dinner & Recovery',
      time: '20:00 PM',
      tag: 'Scheduled',
      calories: 800,
      protein: 58,
      carbs: 45,
      fats: 30,
      foods: [
        { name: 'Grass-Fed Angus Ribeye', amount: '250g', cals: 580, p: 52, c: 0, f: 28 },
        { name: 'Roasted Japanese Sweet Potato', amount: '200g', cals: 180, p: 4, c: 42, f: 0 },
        { name: 'Mixed Organic Greens & Balsamic', amount: '100g', cals: 40, p: 2, c: 3, f: 2 },
      ],
    },
  ];

  return (
    <div className="flex flex-col w-full bg-surface-base min-h-screen">
      {/* Page Header Bar */}
      <section className="w-full border-b border-border-subtle bg-surface-canvas px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1440px] mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest text-text-muted font-mono">
                METABOLIC LOGISTICS // PROTOCOL 18.4
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-text-primary animate-pulse"></span>
              <span className="text-[11px] uppercase tracking-wider text-text-primary font-semibold">
                Telemetry Live
              </span>
            </div>
            <div className="flex flex-wrap items-baseline gap-4 mt-1">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-text-primary uppercase tracking-tight font-display">
                DIET &amp; MACRO
              </h1>
              {/* Date Switcher */}
              <div className="inline-flex items-center gap-1 bg-surface-elevated px-2 py-1 rounded border border-border-subtle">
                <button
                  aria-label="Previous day"
                  className="text-text-muted hover:text-text-primary transition-colors flex items-center p-0.5"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <div className="flex items-center gap-1.5 px-2">
                  <span className="material-symbols-outlined text-xs text-text-muted">calendar_today</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-text-primary">
                    {selectedDate}
                  </span>
                </div>
                <button
                  aria-label="Next day"
                  className="text-text-muted hover:text-text-primary transition-colors flex items-center p-0.5"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              className="bg-text-primary hover:opacity-90 text-text-inverse text-[12px] font-bold uppercase tracking-wider px-4 h-10 rounded-[10px] transition-all active:scale-[0.98] flex items-center gap-1.5 shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>Log Custom Food</span>
            </button>
            <button
              className="bg-surface-card hover:bg-surface-elevated text-text-primary border border-border-medium text-[12px] font-semibold uppercase tracking-wider px-4 h-10 rounded-[10px] transition-colors flex items-center gap-1.5"
              type="button"
            >
              <span className="material-symbols-outlined text-base">psychology</span>
              <span>AI Suggestions</span>
            </button>
            <button
              className="bg-surface-card hover:bg-surface-elevated text-text-secondary hover:text-text-primary border border-border-subtle text-[12px] font-semibold uppercase tracking-wider px-4 h-10 rounded-[10px] transition-colors flex items-center gap-1.5"
              type="button"
            >
              <span className="material-symbols-outlined text-base">receipt_long</span>
              <span>Grocery List</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Workspace */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          {/* Top Macro Matrix Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {/* Gross Calories Card */}
            <div className="xl:col-span-2 bg-surface-card border border-border-subtle p-5 rounded-[14px] flex flex-col justify-between hover:border-border-medium transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase text-text-muted tracking-widest font-medium">
                    Gross Energetics
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-extrabold text-text-primary font-mono leading-none">2,340</span>
                    <span className="text-[13px] text-text-muted uppercase font-semibold">/ 2,850 kcal</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-surface-canvas border border-border-subtle rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-text-primary text-xl">local_fire_department</span>
                </div>
              </div>
              <div className="my-4">
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-text-primary rounded-full transition-all duration-300" style={{ width: '82%' }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-text-muted">
                <span>Remaining: 510 kcal</span>
                <span className="text-text-primary font-semibold">82% Target Met</span>
              </div>
            </div>

            {/* Protein Synthesis Card */}
            <div className="bg-surface-card border border-border-subtle p-5 rounded-[14px] flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                <span className="text-[11px] uppercase text-text-muted tracking-wider font-medium">Protein</span>
                <span className="text-[10px] uppercase font-bold text-text-primary">Target: 210g</span>
              </div>
              <div className="py-3 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-text-primary font-mono">184</span>
                <span className="text-[12px] text-text-muted uppercase font-semibold">g (88%)</span>
              </div>
              <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                <div className="bg-text-primary h-full rounded-full" style={{ width: '88%' }}></div>
              </div>
              <div className="mt-2 text-[10px] text-text-muted">Optimal: 2.2g / kg bodyweight</div>
            </div>

            {/* Carbohydrates Card */}
            <div className="bg-surface-card border border-border-subtle p-5 rounded-[14px] flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                <span className="text-[11px] uppercase text-text-muted tracking-wider font-medium">Carbohydrates</span>
                <span className="text-[10px] uppercase font-bold text-text-primary">Target: 320g</span>
              </div>
              <div className="py-3 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-text-primary font-mono">260</span>
                <span className="text-[12px] text-text-muted uppercase font-semibold">g (81%)</span>
              </div>
              <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                <div className="bg-text-primary h-full rounded-full" style={{ width: '81%' }}></div>
              </div>
              <div className="mt-2 text-[10px] text-text-muted">Glycogen Replenishment Phase</div>
            </div>

            {/* Fats & Hydration Card */}
            <div className="bg-surface-card border border-border-subtle p-5 rounded-[14px] flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                <span className="text-[11px] uppercase text-text-muted tracking-wider font-medium">Fats &amp; Fluids</span>
                <span className="text-[10px] uppercase font-bold text-text-primary">Hydration: 80%</span>
              </div>
              <div className="py-3 flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-bold text-text-primary font-mono">62</span>
                  <span className="text-[11px] text-text-muted uppercase">/ 75g Fat</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-text-primary font-mono">3.2</span>
                  <span className="text-[11px] text-text-muted uppercase">/ 4.0L Water</span>
                </div>
              </div>
              <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                <div className="bg-text-primary h-full rounded-full" style={{ width: '83%' }}></div>
              </div>
              <div className="mt-2 text-[10px] text-text-muted">Hormonal Axis Stabilization</div>
            </div>
          </div>

          {/* Meals Schedule Cards */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
              <span className="text-[11px] uppercase tracking-widest text-text-muted font-mono">
                SCHEDULED MEAL PROTOCOL // DAILY LOGS
              </span>
              <span className="text-[11px] uppercase tracking-wider text-text-primary font-semibold">
                4 Meals • All Weighed &amp; Tracked
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {meals.map((meal) => (
                <div
                  key={meal.name}
                  className="p-5 rounded-[14px] bg-surface-card border border-border-subtle flex flex-col justify-between gap-4 hover:border-border-medium transition-colors"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono">
                            {meal.time}
                          </span>
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-surface-elevated border border-border-subtle text-text-primary">
                            {meal.tag}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-text-primary uppercase tracking-tight mt-1">
                          {meal.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-extrabold text-text-primary font-mono">
                          {meal.calories} kcal
                        </span>
                        <span className="text-[11px] text-text-muted block font-mono">
                          {meal.protein}P / {meal.carbs}C / {meal.fats}F
                        </span>
                      </div>
                    </div>

                    {/* Food Items List */}
                    <div className="divide-y divide-border-subtle/50 text-[12px]">
                      {meal.foods.map((food) => (
                        <div key={food.name} className="py-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-text-muted"></span>
                            <span className="text-text-primary font-medium">{food.name}</span>
                            <span className="text-text-muted text-[11px]">({food.amount})</span>
                          </div>
                          <div className="flex items-center gap-3 font-mono text-[11px] text-text-secondary">
                            <span>{food.cals} kcal</span>
                            <span className="text-text-primary font-semibold">{food.p}g P</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-[11px]">
                    <button
                      className="text-text-muted hover:text-text-primary uppercase tracking-wider font-semibold transition-colors flex items-center gap-1"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                      Adjust Portions
                    </button>
                    <button
                      className="text-text-muted hover:text-text-primary uppercase tracking-wider font-semibold transition-colors flex items-center gap-1"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                      Add Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
