'use client';

import { useState, useEffect, useMemo } from 'react';
import api from '@/lib/api-client';

interface FoodItem {
  id: string;
  name: string;
  servingSizeGrams: number;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams?: number;
}

interface MealItem {
  name: string;
  portion: string;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
}

interface NutritionMeal {
  id?: string;
  name: string;
  time: string;
  tag: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  foods: {
    name: string;
    amount: string;
    cals: number;
    p: number;
    c: number;
    f: number;
  }[];
}

interface DietPlan {
  title: string;
  targetCalories: number;
  targetProteinGrams: number;
  targetCarbsGrams: number;
  targetFatGrams: number;
  targetWaterMl: number;
}

export default function NutritionPage() {
  const [currentDateOffset, setCurrentDateOffset] = useState(0);
  const [foodsLibrary, setFoodsLibrary] = useState<FoodItem[]>([]);
  const [dietPlan, setDietPlan] = useState<DietPlan>({
    title: 'High-Performance Body Recomposition',
    targetCalories: 2540,
    targetProteinGrams: 204,
    targetCarbsGrams: 260,
    targetFatGrams: 62,
    targetWaterMl: 4000,
  });
  const [currentWaterMl, setCurrentWaterMl] = useState(2750);
  const [showLogModal, setShowLogModal] = useState(false);
  const [savingMeal, setSavingMeal] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // New Meal Form State
  const [modalMealType, setModalMealType] = useState('pre_workout');
  const [modalMealTitle, setModalMealTitle] = useState('Pre-Workout Fuel');
  const [selectedFoodId, setSelectedFoodId] = useState('');
  const [customFoodName, setCustomFoodName] = useState('');
  const [customPortion, setCustomPortion] = useState('200g');
  const [customCalories, setCustomCalories] = useState('350');
  const [customProtein, setCustomProtein] = useState('45');
  const [customCarbs, setCustomCarbs] = useState('40');
  const [customFat, setCustomFat] = useState('5');

  // Active meals for the day
  const [meals, setMeals] = useState<NutritionMeal[]>([
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
        { name: 'Charred Chicken Breast', amount: '220g', cals: 360, p: 50, c: 0, f: 4 },
        { name: 'Steamed Jasmine Rice', amount: '250g', cals: 325, p: 6, c: 72, f: 1 },
        { name: 'Steamed Broccoli Crowns', amount: '120g', cals: 42, p: 3, c: 8, f: 0 },
        { name: 'Cold-Pressed Olive Oil', amount: '10ml', cals: 88, p: 0, c: 0, f: 10 },
      ],
    },
    {
      name: 'Meal 03: Post-Workout Recovery',
      time: '16:30 PM',
      tag: 'Completed',
      calories: 380,
      protein: 42,
      carbs: 48,
      fats: 2,
      foods: [
        { name: 'Hydrolyzed Whey Protein', amount: '40g', cals: 150, p: 37, c: 1, f: 0 },
        { name: 'Cyclic Dextrin Carbs', amount: '50g', cals: 195, p: 0, c: 47, f: 0 },
        { name: 'Creapure Creatine Monohydrate', amount: '5g', cals: 0, p: 0, c: 0, f: 0 },
      ],
    },
  ]);

  const targetDateStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + currentDateOffset);
    return d.toISOString().split('T')[0];
  }, [currentDateOffset]);

  const displayDateStr = useMemo(() => {
    if (currentDateOffset === 0) return 'TODAY';
    if (currentDateOffset === -1) return 'YESTERDAY';
    if (currentDateOffset === 1) return 'TOMORROW';
    const d = new Date();
    d.setDate(d.getDate() + currentDateOffset);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
  }, [currentDateOffset]);

  // Load backend plan and foods
  useEffect(() => {
    async function loadData() {
      try {
        const [planRes, foodsRes] = await Promise.all([
          api.get<DietPlan>('/nutrition/plan'),
          api.get<FoodItem[]>('/nutrition/foods'),
        ]);

        if (planRes.data) {
          setDietPlan(planRes.data);
        }
        if (foodsRes.data && foodsRes.data.length > 0) {
          setFoodsLibrary(foodsRes.data);
          setSelectedFoodId(foodsRes.data[0].id);
        }
      } catch (err) {
        console.error('Error fetching nutrition plan/foods:', err);
      }
    }
    loadData();
  }, []);

  // Fetch daily logs when date changes
  useEffect(() => {
    async function loadLogs() {
      try {
        const res = await api.get<{ logs: any[]; totals: any }>(`/nutrition/logs?date=${targetDateStr}`);
        if (res.data?.logs && res.data.logs.length > 0) {
          const formatted: NutritionMeal[] = res.data.logs.map((log: any) => ({
            id: log.id,
            name: log.mealTitle,
            time: new Date(log.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            tag: log.status || 'Logged',
            calories: Number(log.calories) || 0,
            protein: Number(log.proteinGrams) || 0,
            carbs: Number(log.carbsGrams) || 0,
            fats: Number(log.fatGrams) || 0,
            foods: (log.itemsData || []).map((item: any) => ({
              name: item.name,
              amount: item.portion,
              cals: item.calories,
              p: item.proteinGrams,
              c: item.carbsGrams,
              f: item.fatGrams,
            })),
          }));
          setMeals(formatted);
        }
      } catch (err) {
        console.error('Error fetching daily logs:', err);
      }
    }
    loadLogs();
  }, [targetDateStr]);

  // Calculated totals
  const totals = useMemo(() => {
    return meals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fats: acc.fats + meal.fats,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  }, [meals]);

  const handleSelectPredefinedFood = (foodId: string) => {
    setSelectedFoodId(foodId);
    const found = foodsLibrary.find((f) => f.id === foodId);
    if (found) {
      setCustomFoodName(found.name);
      setCustomPortion(`${found.servingSizeGrams}g`);
      setCustomCalories(String(found.calories));
      setCustomProtein(String(found.proteinGrams));
      setCustomCarbs(String(found.carbsGrams));
      setCustomFat(String(found.fatGrams));
    }
  };

  const handleSaveMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingMeal(true);

    const foodName = customFoodName || 'Dispensary Fuel Item';
    const cals = parseInt(customCalories, 10) || 350;
    const p = parseFloat(customProtein) || 30;
    const c = parseFloat(customCarbs) || 40;
    const f = parseFloat(customFat) || 10;

    const payload = {
      date: targetDateStr,
      mealType: modalMealType,
      mealTitle: modalMealTitle,
      calories: cals,
      proteinGrams: p,
      carbsGrams: c,
      fatGrams: f,
      itemsData: [
        {
          name: foodName,
          portion: customPortion,
          calories: cals,
          proteinGrams: p,
          carbsGrams: c,
          fatGrams: f,
        },
      ],
      status: 'Logged',
    };

    try {
      await api.post('/nutrition/logs', payload);
      setSuccessToast(`Logged ${modalMealTitle} successfully!`);
      setTimeout(() => setSuccessToast(null), 4000);

      // Append locally
      const newMeal: NutritionMeal = {
        name: modalMealTitle,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tag: 'Logged',
        calories: cals,
        protein: p,
        carbs: c,
        fats: f,
        foods: [
          {
            name: foodName,
            amount: customPortion,
            cals,
            p,
            c,
            f,
          },
        ],
      };
      setMeals((prev) => [...prev, newMeal]);
      setShowLogModal(false);
    } catch (err) {
      console.error('Failed to log meal to backend:', err);
      // Fallback local append
      const newMeal: NutritionMeal = {
        name: modalMealTitle,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tag: 'Logged',
        calories: cals,
        protein: p,
        carbs: c,
        fats: f,
        foods: [{ name: foodName, amount: customPortion, cals, p, c, f }],
      };
      setMeals((prev) => [...prev, newMeal]);
      setShowLogModal(false);
      setSuccessToast(`Logged ${modalMealTitle} in session buffer`);
      setTimeout(() => setSuccessToast(null), 4000);
    } finally {
      setSavingMeal(false);
    }
  };

  const remainingCals = Math.max(0, dietPlan.targetCalories - totals.calories);
  const calPercent = Math.min(100, Math.round((totals.calories / dietPlan.targetCalories) * 100));
  const pPercent = Math.min(100, Math.round((totals.protein / dietPlan.targetProteinGrams) * 100));
  const cPercent = Math.min(100, Math.round((totals.carbs / dietPlan.targetCarbsGrams) * 100));
  const fPercent = Math.min(100, Math.round((totals.fats / dietPlan.targetFatGrams) * 100));
  const waterPercent = Math.min(100, Math.round((currentWaterMl / dietPlan.targetWaterMl) * 100));

  return (
    <div className="flex flex-col w-full bg-[#000000] text-white min-h-screen font-sans">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-white text-black px-4 py-3 rounded-xl shadow-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 animate-in slide-in-from-bottom-3">
          <span className="material-symbols-outlined text-base">check_circle</span>
          {successToast}
        </div>
      )}

      {/* Page Header Bar */}
      <section className="w-full border-b border-[#242424] bg-[#0A0A0A] px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1440px] mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest text-[#777777] font-mono">
                METABOLIC LOGISTICS // PROTOCOL 18.4
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              <span className="text-[11px] uppercase tracking-wider text-white font-semibold">
                Telemetry Live
              </span>
            </div>
            <div className="flex flex-wrap items-baseline gap-4 mt-1">
              <h1 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tight">
                DIET &amp; MACRO
              </h1>

              {/* Date Switcher */}
              <div className="inline-flex items-center gap-1 bg-[#171717] px-2 py-1 rounded border border-[#2B2B2B]">
                <button
                  onClick={() => setCurrentDateOffset((c) => c - 1)}
                  aria-label="Previous day"
                  className="text-[#777777] hover:text-white transition-colors flex items-center p-0.5"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <div className="flex items-center gap-1.5 px-2">
                  <span className="material-symbols-outlined text-xs text-[#777777]">calendar_today</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white font-mono">
                    {displayDateStr} • {targetDateStr}
                  </span>
                </div>
                <button
                  onClick={() => setCurrentDateOffset((c) => c + 1)}
                  aria-label="Next day"
                  className="text-[#777777] hover:text-white transition-colors flex items-center p-0.5"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLogModal(true)}
              className="px-4 py-2 bg-white text-black hover:bg-[#E5E2E1] rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-base">add</span>
              Log Meal / Macro Event
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* Macro Summary Dashboard Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          {/* Caloric Intake Gauge */}
          <div className="xl:col-span-2 bg-[#111111] border border-[#242424] rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#777777]">
                DAILY CALORIC ENERGETICS
              </span>
              <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded bg-[#171717] border border-[#333333]">
                {calPercent}% of Target
              </span>
            </div>

            <div className="flex items-baseline gap-4 my-2">
              <span className="text-4xl sm:text-5xl font-black font-mono text-white">
                {totals.calories.toLocaleString()}
              </span>
              <span className="text-sm font-mono text-[#777777]">/ {dietPlan.targetCalories} kcal</span>
            </div>

            <div className="w-full bg-[#171717] h-2 rounded-full overflow-hidden my-3 border border-[#242424]">
              <div
                className="bg-white h-full transition-all duration-500 rounded-full"
                style={{ width: `${calPercent}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#777777] font-mono mt-1">
              <span>Remaining: {remainingCals} kcal</span>
              <span>Target Surplus: +150 kcal</span>
            </div>
          </div>

          {/* Protein */}
          <div className="bg-[#111111] border border-[#242424] rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[#777777]">PROTEIN (MPS)</span>
              <span className="text-[11px] font-mono text-white font-bold">{pPercent}%</span>
            </div>
            <div className="my-3">
              <span className="text-3xl font-bold font-mono text-white">{Math.round(totals.protein)}g</span>
              <span className="text-xs font-mono text-[#777777] ml-1.5">/ {dietPlan.targetProteinGrams}g</span>
            </div>
            <div className="w-full bg-[#171717] h-1.5 rounded-full overflow-hidden">
              <div className="bg-white h-full rounded-full" style={{ width: `${pPercent}%` }}></div>
            </div>
            <span className="text-[10px] text-[#777777] mt-2 block">2.4g / kg Bodyweight</span>
          </div>

          {/* Carbs */}
          <div className="bg-[#111111] border border-[#242424] rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[#777777]">CARBOHYDRATES</span>
              <span className="text-[11px] font-mono text-white font-bold">{cPercent}%</span>
            </div>
            <div className="my-3">
              <span className="text-3xl font-bold font-mono text-white">{Math.round(totals.carbs)}g</span>
              <span className="text-xs font-mono text-[#777777] ml-1.5">/ {dietPlan.targetCarbsGrams}g</span>
            </div>
            <div className="w-full bg-[#171717] h-1.5 rounded-full overflow-hidden">
              <div className="bg-white h-full rounded-full" style={{ width: `${cPercent}%` }}></div>
            </div>
            <span className="text-[10px] text-[#777777] mt-2 block">Glycogen Replenishment</span>
          </div>

          {/* Fats */}
          <div className="bg-[#111111] border border-[#242424] rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[#777777]">DIETARY FATS</span>
              <span className="text-[11px] font-mono text-white font-bold">{fPercent}%</span>
            </div>
            <div className="my-3">
              <span className="text-3xl font-bold font-mono text-white">{Math.round(totals.fats)}g</span>
              <span className="text-xs font-mono text-[#777777] ml-1.5">/ {dietPlan.targetFatGrams}g</span>
            </div>
            <div className="w-full bg-[#171717] h-1.5 rounded-full overflow-hidden">
              <div className="bg-white h-full rounded-full" style={{ width: `${fPercent}%` }}></div>
            </div>
            <span className="text-[10px] text-[#777777] mt-2 block">Endocrine Stability</span>
          </div>
        </div>

        {/* Workspace: Meals Timeline + Hydration Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Meals Timeline (Cols 1-8) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold uppercase tracking-wider text-white">
                Chronological Fuel Log ({meals.length} Events)
              </h2>
              <button
                onClick={() => setShowLogModal(true)}
                className="text-xs font-mono uppercase text-[#BDBDBD] hover:text-white flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">add_circle</span>
                Add Meal
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {meals.map((meal, idx) => (
                <div
                  key={meal.id || idx}
                  className="bg-[#111111] border border-[#242424] rounded-xl p-5 flex flex-col gap-3 shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1F1F1F] pb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded bg-[#171717] border border-[#333333] text-white font-mono text-xs font-bold flex items-center justify-center">
                        0{idx + 1}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase">{meal.name}</h3>
                        <span className="text-[11px] font-mono text-[#777777]">{meal.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="text-white font-bold">{meal.calories} kcal</span>
                      <span className="text-[#777777]">•</span>
                      <span className="text-[#BDBDBD]">{meal.protein}g P</span>
                      <span className="text-[#777777]">•</span>
                      <span className="text-[#BDBDBD]">{meal.carbs}g C</span>
                      <span className="text-[#777777]">•</span>
                      <span className="text-[#BDBDBD]">{meal.fats}g F</span>
                    </div>
                  </div>

                  {/* Food Items */}
                  <div className="divide-y divide-[#1A1A1A]">
                    {meal.foods.map((food, fIdx) => (
                      <div key={fIdx} className="py-2 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#555555]"></span>
                          <span className="text-[#E0E0E0] font-medium">{food.name}</span>
                          <span className="text-[#777777] font-mono">({food.amount})</span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] font-mono text-[#777777]">
                          <span>{food.cals} kcal</span>
                          <span>{food.p}P</span>
                          <span>{food.c}C</span>
                          <span>{food.f}F</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hydration & Micronutrients (Cols 9-12) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Hydration Tracker */}
            <div className="bg-[#111111] border border-[#242424] rounded-xl p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#242424] pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sky-400 text-lg">water_drop</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Hydration Telemetry</span>
                </div>
                <span className="text-xs font-mono font-bold text-sky-400">{waterPercent}%</span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black font-mono text-white">{(currentWaterMl / 1000).toFixed(2)}L</span>
                <span className="text-xs font-mono text-[#777777]">/ {(dietPlan.targetWaterMl / 1000).toFixed(1)}L Target</span>
              </div>

              <div className="w-full bg-[#171717] h-2 rounded-full overflow-hidden border border-[#242424]">
                <div className="bg-sky-400 h-full rounded-full transition-all duration-300" style={{ width: `${waterPercent}%` }}></div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => setCurrentWaterMl((w) => w + 250)}
                  className="py-2 bg-[#171717] hover:bg-[#222222] border border-[#333333] text-xs font-mono font-bold text-white rounded transition-colors flex items-center justify-center gap-1"
                >
                  +250 ml
                </button>
                <button
                  onClick={() => setCurrentWaterMl((w) => w + 500)}
                  className="py-2 bg-[#171717] hover:bg-[#222222] border border-[#333333] text-xs font-mono font-bold text-white rounded transition-colors flex items-center justify-center gap-1"
                >
                  +500 ml
                </button>
              </div>
            </div>

            {/* Dispensary Nutritionist Recommendations */}
            <div className="bg-[#111111] border border-[#242424] rounded-xl p-5 flex flex-col gap-3">
              <span className="text-[10px] font-mono uppercase text-[#777777] tracking-widest font-bold">
                CLINICAL CSCS RECOMMENDATION
              </span>
              <p className="text-xs text-[#BDBDBD] leading-relaxed">
                Prioritize timing fast-digesting carbohydrates with 30g whey isolate within 45 minutes of training completion to maximize glycogen synthase activity and attenuate cortisol spikes.
              </p>
              <div className="p-3 bg-[#0A0A0A] border border-[#242424] rounded-lg text-xs font-mono text-[#777777]">
                Electrolytes: 1,200mg Sodium / 400mg Magnesium
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Log Meal Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#333333] rounded-2xl max-w-lg w-full p-6 sm:p-8 flex flex-col gap-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#242424] pb-4">
              <div>
                <h3 className="text-lg font-black uppercase text-white tracking-tight">Log Meal / Fuel Event</h3>
                <p className="text-xs text-[#777777]">Enter meal specs to register to live telemetry database</p>
              </div>
              <button
                onClick={() => setShowLogModal(false)}
                className="text-[#777777] hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveMeal} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1">Meal Title</label>
                  <input
                    type="text"
                    required
                    value={modalMealTitle}
                    onChange={(e) => setModalMealTitle(e.target.value)}
                    placeholder="e.g. Afternoon Fuel"
                    className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1">Meal Category</label>
                  <select
                    value={modalMealType}
                    onChange={(e) => setModalMealType(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-mono"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="pre_workout">Pre-Workout</option>
                    <option value="post_workout">Post-Workout</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </select>
                </div>
              </div>

              {/* Predefined Food Selector from Backend */}
              {foodsLibrary.length > 0 && (
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1">
                    Select From Verified Dispensary Database
                  </label>
                  <select
                    value={selectedFoodId}
                    onChange={(e) => handleSelectPredefinedFood(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-mono"
                  >
                    {foodsLibrary.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name} ({f.calories} kcal, {f.proteinGrams}g P, {f.servingSizeGrams}g)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1">Food / Item Name</label>
                  <input
                    type="text"
                    required
                    value={customFoodName}
                    onChange={(e) => setCustomFoodName(e.target.value)}
                    placeholder="e.g. Grass-Fed Steak"
                    className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1">Portion / Serving</label>
                  <input
                    type="text"
                    value={customPortion}
                    onChange={(e) => setCustomPortion(e.target.value)}
                    placeholder="200g"
                    className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 bg-[#0A0A0A] p-3 rounded-xl border border-[#242424]">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#777777] mb-1">Calories</label>
                  <input
                    type="number"
                    value={customCalories}
                    onChange={(e) => setCustomCalories(e.target.value)}
                    className="w-full bg-[#171717] border border-[#333333] rounded px-2 py-1 text-xs text-white font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#777777] mb-1">Protein (g)</label>
                  <input
                    type="number"
                    value={customProtein}
                    onChange={(e) => setCustomProtein(e.target.value)}
                    className="w-full bg-[#171717] border border-[#333333] rounded px-2 py-1 text-xs text-white font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#777777] mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    value={customCarbs}
                    onChange={(e) => setCustomCarbs(e.target.value)}
                    className="w-full bg-[#171717] border border-[#333333] rounded px-2 py-1 text-xs text-white font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#777777] mb-1">Fat (g)</label>
                  <input
                    type="number"
                    value={customFat}
                    onChange={(e) => setCustomFat(e.target.value)}
                    className="w-full bg-[#171717] border border-[#333333] rounded px-2 py-1 text-xs text-white font-mono font-bold"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="flex-1 py-2.5 bg-[#171717] hover:bg-[#222222] border border-[#333333] text-white text-xs font-bold uppercase rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingMeal}
                  className="flex-1 py-2.5 bg-white text-black hover:bg-[#E5E2E1] text-xs font-bold uppercase rounded-lg transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {savingMeal ? 'Recording...' : 'Save to Telemetry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
