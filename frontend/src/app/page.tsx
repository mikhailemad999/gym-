'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goal: 'Hypertrophy & Strength',
    message: '',
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col font-sans selection:bg-white selection:text-black scroll-smooth">
      {/* =========================================================================
          CLEAN, FOCUSED NAVIGATION BAR
          Only what is needed: Home, About, What We Do, Plans, Contact + Login
          ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#242424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black text-sm tracking-tighter shadow-lg group-hover:scale-105 transition-transform">
              AC
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight uppercase text-white leading-tight">
                AthleteCare
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#777777] leading-tight">
                Performance Lab
              </span>
            </div>
          </Link>

          {/* Clean Desktop Navigation — Only Essential Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#hero"
              className="text-sm font-semibold text-[#BDBDBD] hover:text-white transition-colors uppercase tracking-wider text-xs"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-sm font-semibold text-[#BDBDBD] hover:text-white transition-colors uppercase tracking-wider text-xs"
            >
              About
            </a>
            <a
              href="#what-we-do"
              className="text-sm font-semibold text-[#BDBDBD] hover:text-white transition-colors uppercase tracking-wider text-xs"
            >
              What We Do
            </a>
            <a
              href="#plans"
              className="text-sm font-semibold text-[#BDBDBD] hover:text-white transition-colors uppercase tracking-wider text-xs"
            >
              Plans
            </a>
            <a
              href="#contact"
              className="text-sm font-semibold text-[#BDBDBD] hover:text-white transition-colors uppercase tracking-wider text-xs"
            >
              Contact
            </a>
          </nav>

          {/* Call To Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#BDBDBD] hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <a
              href="#plans"
              className="px-5 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#E5E2E1] transition-all shadow-md hover:shadow-white/10"
            >
              Join Now
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#BDBDBD] hover:text-white"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0A0A0A] border-b border-[#242424] px-6 py-5 flex flex-col gap-4">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-[#BDBDBD] hover:text-white uppercase tracking-wider py-1"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-[#BDBDBD] hover:text-white uppercase tracking-wider py-1"
            >
              About
            </a>
            <a
              href="#what-we-do"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-[#BDBDBD] hover:text-white uppercase tracking-wider py-1"
            >
              What We Do
            </a>
            <a
              href="#plans"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-[#BDBDBD] hover:text-white uppercase tracking-wider py-1"
            >
              Plans
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-[#BDBDBD] hover:text-white uppercase tracking-wider py-1"
            >
              Contact
            </a>
            <div className="pt-3 border-t border-[#242424] flex flex-col gap-2">
              <Link
                href="/login"
                className="w-full text-center py-2.5 text-xs font-bold uppercase tracking-wider bg-[#171717] rounded-lg"
              >
                Sign In
              </Link>
              <a
                href="#plans"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs font-bold uppercase tracking-wider bg-white text-black rounded-lg"
              >
                Join Now
              </a>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section id="hero" className="pt-36 pb-20 md:pt-44 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        {/* Elite Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-[#242424] mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#BDBDBD]">
            SCIENTIFIC TRAINING & ELITE COACHING ECOSYSTEM
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[1.05] max-w-5xl text-white">
          Peak Performance Built On <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-600">Science & Precision</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-[#BDBDBD] max-w-3xl leading-relaxed">
          Stop guessing in the gym and kitchen. AthleteCare Pro gives you periodized hypertrophy protocols, clinical nutrition logistics, and 1-on-1 certified coaching to elevate your physical potential.
        </p>

        {/* Hero CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#plans"
            className="w-full sm:w-auto px-8 py-4 bg-white text-black text-sm font-extrabold uppercase tracking-wider rounded-xl hover:bg-[#E5E2E1] transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-white/20"
          >
            <span>Start Your Program</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </a>

          <a
            href="#what-we-do"
            className="w-full sm:w-auto px-8 py-4 bg-[#111111] border border-[#333333] text-white text-sm font-extrabold uppercase tracking-wider rounded-xl hover:bg-[#171717] hover:border-[#666666] transition-all flex items-center justify-center gap-2"
          >
            <span>Explore What We Do</span>
          </a>
        </div>

        {/* Stats Strip */}
        <div className="mt-20 w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-y border-[#242424] py-8">
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-black text-white font-mono">1,400+</span>
            <span className="text-xs uppercase tracking-widest text-[#777777] mt-1">Active Athletes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-black text-white font-mono">98.4%</span>
            <span className="text-xs uppercase tracking-widest text-[#777777] mt-1">Goal Adherence</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-black text-white font-mono">1-on-1</span>
            <span className="text-xs uppercase tracking-widest text-[#777777] mt-1">CSCS Certified Coaches</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-black text-white font-mono">100%</span>
            <span className="text-xs uppercase tracking-widest text-[#777777] mt-1">Evidence-Based</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ABOUT SECTION
          ========================================================================= */}
      <section id="about" className="py-24 bg-[#0A0A0A] border-t border-[#242424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center justify-between">
            {/* Left Content */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  // ABOUT US
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                Built For Real Athletes Who Refuse To Settle For Average
              </h2>
              <p className="text-sm sm:text-base text-[#BDBDBD] leading-relaxed">
                Most fitness programs fail because they are built on generic templates, unsustainable fad diets, and zero physiological tracking. AthleteCare Pro was engineered to bring Olympic and collegiate-level performance science to everyday dedicated lifters.
              </p>
              <p className="text-sm sm:text-base text-[#BDBDBD] leading-relaxed">
                Our philosophy connects every variable of human performance into a single unified telemetry system: your training volume, heart rate variability, progressive overload velocity, and metabolic energy intake work together under the supervision of certified specialists.
              </p>

              {/* Pillars list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-[#111111] border border-[#242424]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-white text-xl">fitness_center</span>
                    <h3 className="font-bold text-sm uppercase text-white">Periodized Training</h3>
                  </div>
                  <p className="text-xs text-[#777777] leading-relaxed">
                    Targeted mesocycles engineered to build dense mechanical tension without central nervous system burnout.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#111111] border border-[#242424]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-white text-xl">restaurant</span>
                    <h3 className="font-bold text-sm uppercase text-white">Metabolic Calibration</h3>
                  </div>
                  <p className="text-xs text-[#777777] leading-relaxed">
                    Custom macronutrient timing and clinical hydration matrices that fuel intense training sessions.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#111111] border border-[#242424]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-white text-xl">psychology</span>
                    <h3 className="font-bold text-sm uppercase text-white">AI Neural Feedback</h3>
                  </div>
                  <p className="text-xs text-[#777777] leading-relaxed">
                    Adaptive feedback loops assessing sleep quality, RPE exertion, and recovery scores in real-time.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#111111] border border-[#242424]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-white text-xl">support_agent</span>
                    <h3 className="font-bold text-sm uppercase text-white">Human Accountability</h3>
                  </div>
                  <p className="text-xs text-[#777777] leading-relaxed">
                    Direct video consultations and constant form review with assigned CSCS certified staff.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Card / Visual Showcase */}
            <div className="w-full md:w-[480px] p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[#242424] flex flex-col gap-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-center justify-between border-b border-[#242424] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#BDBDBD]">
                    SYSTEM TELEMETRY ENGINE
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#171717] text-white">
                  v2.4 ACTIVE
                </span>
              </div>

              {/* Data simulation */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#777777] uppercase font-mono">CNS READINESS RATIO</span>
                  <span className="text-white font-mono font-bold">1.04 // OPTIMAL</span>
                </div>
                <div className="w-full bg-[#171717] h-2 rounded-full overflow-hidden">
                  <div className="bg-white h-full w-[94%]"></div>
                </div>

                <div className="flex justify-between items-center text-xs pt-2">
                  <span className="text-[#777777] uppercase font-mono">MESOCYCLE ADHERENCE</span>
                  <span className="text-emerald-400 font-mono font-bold">98.2%</span>
                </div>
                <div className="w-full bg-[#171717] h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[98%]"></div>
                </div>

                <div className="flex justify-between items-center text-xs pt-2">
                  <span className="text-[#777777] uppercase font-mono">DAILY PROTEIN TIMELINE</span>
                  <span className="text-white font-mono font-bold">190g / 190g</span>
                </div>
                <div className="w-full bg-[#171717] h-2 rounded-full overflow-hidden">
                  <div className="bg-zinc-400 h-full w-[100%]"></div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#171717] border border-[#2A2A2A] text-xs text-[#BDBDBD] flex flex-col gap-2">
                <span className="text-white font-bold uppercase tracking-wider">Coach Diagnosis:</span>
                <p className="text-[#777777] leading-relaxed">
                  "Progressive overload velocity on Incline Barbell Press is +8% this microcycle. Recovery indicators support moving to the planned hypertrophy peaking block."
                </p>
                <span className="text-[11px] font-mono text-zinc-400">— Marcus Vance, Head CSCS Coach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WHAT WE DO SECTION
          ========================================================================= */}
      <section id="what-we-do" className="py-24 bg-[#000000] border-t border-[#242424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-4 mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              // WHAT WE DO
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Complete Athletic Evolution Under One Roof
            </h2>
            <p className="text-sm sm:text-base text-[#BDBDBD] max-w-2xl">
              We integrate training, nutrition, biometrics, and coaching into a single, high-performance ecosystem designed for maximum output.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-[#242424] hover:border-[#4A4A4A] transition-all flex flex-col justify-between gap-6 group hover:-translate-y-1">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#171717] border border-[#333333] flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-2xl">fitness_center</span>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  Custom Strength & Conditioning
                </h3>
                <p className="text-sm text-[#777777] leading-relaxed">
                  Periodized training blocks customized to your biomechanics. Set-by-set target velocity tracking, RPE logging, and exercise video guidance.
                </p>
              </div>
              <ul className="text-xs font-mono text-[#BDBDBD] flex flex-col gap-2 pt-4 border-t border-[#171717]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
                  12-Week Periodized Mesocycles
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
                  Bar Velocity & RPE Autoregulation
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
                  Movement & Form Critique
                </li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-[#242424] hover:border-[#4A4A4A] transition-all flex flex-col justify-between gap-6 group hover:-translate-y-1">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#171717] border border-[#333333] flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-2xl">restaurant</span>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  Precision Macro Nutrition
                </h3>
                <p className="text-sm text-[#777777] leading-relaxed">
                  Calorie and macronutrient synthesis tailored to your daily metabolic load. Meal timelines, electrolyte balance, and hydration tracking.
                </p>
              </div>
              <ul className="text-xs font-mono text-[#BDBDBD] flex flex-col gap-2 pt-4 border-t border-[#171717]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
                  Target Protein/Carb/Fat Calibration
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
                  Multi-Meal Pre/Post Workout Timing
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
                  Clinical Electrolyte Osmolarity
                </li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-[#242424] hover:border-[#4A4A4A] transition-all flex flex-col justify-between gap-6 group hover:-translate-y-1">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#171717] border border-[#333333] flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-2xl">person_pin</span>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  1-on-1 Certified Coaching
                </h3>
                <p className="text-sm text-[#777777] leading-relaxed">
                  Direct connection with certified CSCS and sports nutritionists. Regular strategy calls, weekly audits, and instant telemetry messaging.
                </p>
              </div>
              <ul className="text-xs font-mono text-[#BDBDBD] flex flex-col gap-2 pt-4 border-t border-[#171717]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
                  Live Biomechanical Video Calls
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
                  Direct Telemetry Messaging
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
                  Dedicated Coach Roster Match
                </li>
              </ul>
            </div>

            {/* Service 4 */}
            <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-[#242424] hover:border-[#4A4A4A] transition-all flex flex-col justify-between gap-6 group hover:-translate-y-1">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#171717] border border-[#333333] flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-2xl">monitoring</span>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  Biomarker & Recovery Tracking
                </h3>
                <p className="text-sm text-[#777777] leading-relaxed">
                  Longitudinal body composition monitoring, DEXA metrics, resting heart rate, HRV, and sleep score diagnostics across mesocycles.
                </p>
              </div>
              <ul className="text-xs font-mono text-[#BDBDBD] flex flex-col gap-2 pt-4 border-t border-[#171717]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
                  DEXA Body Fat & Muscle Mass
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
                  HRV & Central Nervous System Readiness
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
                  Sleep Architecture & Delta Waves
                </li>
              </ul>
            </div>

            {/* Service 5 */}
            <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-[#242424] hover:border-[#4A4A4A] transition-all flex flex-col justify-between gap-6 group hover:-translate-y-1">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#171717] border border-[#333333] flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-2xl">psychology</span>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  AI Performance Engine
                </h3>
                <p className="text-sm text-[#777777] leading-relaxed">
                  Real-time neural intelligence that factors in soreness, stress, and past volume to dynamically adjust today's weights and sets.
                </p>
              </div>
              <ul className="text-xs font-mono text-[#BDBDBD] flex flex-col gap-2 pt-4 border-t border-[#171717]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
                  Real-Time Load Adjustments
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
                  Fatigue Warning Signals
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
                  Deload Week Recommendations
                </li>
              </ul>
            </div>

            {/* Service 6 */}
            <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-[#242424] hover:border-[#4A4A4A] transition-all flex flex-col justify-between gap-6 group hover:-translate-y-1">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#171717] border border-[#333333] flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-2xl">science</span>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  Clean Ergogenics & Dispensary
                </h3>
                <p className="text-sm text-[#777777] leading-relaxed">
                  Third-party batch-tested formulations: hydrolyzed native whey isolate, Creapure® creatine, magnesium bisglycinate, and IFOS omega-3s.
                </p>
              </div>
              <ul className="text-xs font-mono text-[#BDBDBD] flex flex-col gap-2 pt-4 border-t border-[#171717]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
                  WADA & Informed-Sport Certified
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
                  Direct Dispensary Delivery
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check</span>
                  Clinical Dosages Only (0% Fillers)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MEMBERSHIP PLANS SECTION
          ========================================================================= */}
      <section id="plans" className="py-24 bg-[#0A0A0A] border-t border-[#242424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-4 mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              // MEMBERSHIP TIERS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Choose Your Level of Dedication
            </h2>
            <p className="text-sm sm:text-base text-[#BDBDBD] max-w-2xl">
              Transparent plans with no hidden fees. Upgrade or cancel anytime directly from your dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Plan 1: Starter */}
            <div className="p-8 rounded-2xl bg-[#111111] border border-[#242424] flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#777777]">
                  TIER 01 // FOUNDATION
                </span>
                <h3 className="text-2xl font-bold uppercase text-white">Starter Protocol</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-extrabold text-white font-mono">$49</span>
                  <span className="text-xs text-[#777777] uppercase font-mono">/ month</span>
                </div>
                <p className="text-xs text-[#777777] leading-relaxed">
                  Ideal for self-motivated lifters seeking structured evidence-based tracking and macro logistics.
                </p>

                <ul className="flex flex-col gap-3 pt-6 border-t border-[#1F1F1F] text-xs text-[#BDBDBD]">
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-base text-white">check_circle</span>
                    Full Workout Logging & Rest Timer
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-base text-white">check_circle</span>
                    Macronutrient & Calorie Planner
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-base text-white">check_circle</span>
                    Exercise Library & Form Guides
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-base text-white">check_circle</span>
                    Body Weight & Measurement Logs
                  </li>
                </ul>
              </div>

              <Link
                href="/register"
                className="w-full py-3 text-center rounded-xl bg-[#171717] border border-[#333333] hover:border-white text-xs font-extrabold uppercase tracking-wider text-white transition-all"
              >
                Choose Starter
              </Link>
            </div>

            {/* Plan 2: Pro Athlete (Featured) */}
            <div className="p-8 rounded-2xl bg-[#141414] border-2 border-white flex flex-col justify-between gap-8 relative shadow-2xl scale-100 lg:scale-105">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest">
                RECOMMENDED // MOST POPULAR
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                  TIER 02 // PERFORMANCE
                </span>
                <h3 className="text-2xl font-bold uppercase text-white">Pro Athlete</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-extrabold text-white font-mono">$99</span>
                  <span className="text-xs text-[#777777] uppercase font-mono">/ month</span>
                </div>
                <p className="text-xs text-[#BDBDBD] leading-relaxed">
                  Complete athletic telemetry with AI neural adaptation and bi-weekly certified coaching feedback.
                </p>

                <ul className="flex flex-col gap-3 pt-6 border-t border-[#242424] text-xs text-white">
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-base text-emerald-400">check_circle</span>
                    Everything in Starter Protocol
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-base text-emerald-400">check_circle</span>
                    AI Performance Coach (Load & Volume)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-base text-emerald-400">check_circle</span>
                    Longitudinal DEXA & Biomarker Trends
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-base text-emerald-400">check_circle</span>
                    HRV & Sleep Delta Wave Analysis
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-base text-emerald-400">check_circle</span>
                    Bi-Weekly Form Critique & Messaging
                  </li>
                </ul>
              </div>

              <Link
                href="/register"
                className="w-full py-3.5 text-center rounded-xl bg-white text-black text-xs font-black uppercase tracking-wider hover:bg-[#E5E2E1] transition-all shadow-lg hover:shadow-white/20"
              >
                Join Pro Athlete
              </Link>
            </div>

            {/* Plan 3: Elite Olympian */}
            <div className="p-8 rounded-2xl bg-[#111111] border border-[#242424] flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#777777]">
                  TIER 03 // CHAMPIONSHIP
                </span>
                <h3 className="text-2xl font-bold uppercase text-white">Elite Olympian</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-extrabold text-white font-mono">$199</span>
                  <span className="text-xs text-[#777777] uppercase font-mono">/ month</span>
                </div>
                <p className="text-xs text-[#777777] leading-relaxed">
                  Dedicated 1-on-1 CSCS staff, blood chemistry integration, and concierge training adaptation.
                </p>

                <ul className="flex flex-col gap-3 pt-6 border-t border-[#1F1F1F] text-xs text-[#BDBDBD]">
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-base text-white">check_circle</span>
                    Everything in Pro Athlete
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-base text-white">check_circle</span>
                    Dedicated CSCS Coach Assigned 1-on-1
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-base text-white">check_circle</span>
                    Weekly Live Video Biomechanics Review
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-base text-white">check_circle</span>
                    Blood Chemistry & Hormone Calibration
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-base text-white">check_circle</span>
                    VIP Priority Telemetry Dispatch
                  </li>
                </ul>
              </div>

              <Link
                href="/register"
                className="w-full py-3 text-center rounded-xl bg-[#171717] border border-[#333333] hover:border-white text-xs font-extrabold uppercase tracking-wider text-white transition-all"
              >
                Apply For Elite
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ATHLETE REVIEWS SECTION
          ========================================================================= */}
      <section className="py-24 bg-[#000000] border-t border-[#242424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-4 mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              // TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Proven By Results On The Platform
            </h2>
            <p className="text-sm sm:text-base text-[#BDBDBD] max-w-2xl">
              Hear from competitive athletes and dedicated lifters who restructured their training with AthleteCare Pro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-[#242424] flex flex-col justify-between gap-6">
              <p className="text-sm text-[#BDBDBD] italic leading-relaxed">
                "The progressive overload tracking and fatigue warnings saved my shoulders. In 12 weeks, my compound total jumped by 32.5kg while dropping body fat from 15% to 11%."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#171717]">
                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-[#333333] flex items-center justify-center font-bold text-xs text-white">
                  MR
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white uppercase">Mikhail R.</span>
                  <span className="text-[10px] text-[#777777] font-mono">Competitive Powerlifter</span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-[#242424] flex flex-col justify-between gap-6">
              <p className="text-sm text-[#BDBDBD] italic leading-relaxed">
                "Having my macros, water intake, and training split in one single dashboard eliminates every second of mental fatigue. My coach reviews my telemetry every Sunday."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#171717]">
                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-[#333333] flex items-center justify-center font-bold text-xs text-white">
                  SK
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white uppercase">Sarah K.</span>
                  <span className="text-[10px] text-[#777777] font-mono">CrossFit Athlete</span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-[#242424] flex flex-col justify-between gap-6">
              <p className="text-sm text-[#BDBDBD] italic leading-relaxed">
                "AthleteCare Pro operates like an F1 pit crew for your body. The biometric recovery scores tell me exactly when to push for a new PR and when to take a back-off set."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#171717]">
                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-[#333333] flex items-center justify-center font-bold text-xs text-white">
                  DV
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white uppercase">David V.</span>
                  <span className="text-[10px] text-[#777777] font-mono">Hybrid Endurance Lifter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONTACT SECTION
          ========================================================================= */}
      <section id="contact" className="py-24 bg-[#0A0A0A] border-t border-[#242424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 justify-between">
            {/* Left Contact Info */}
            <div className="flex-1 flex flex-col gap-6">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                // CONTACT & CONSULTATION
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                Ready To Transform Your Training?
              </h2>
              <p className="text-sm sm:text-base text-[#BDBDBD] leading-relaxed">
                Whether you have questions about our coaching tiers, bespoke athletic programming, or want a facility tour, our team is ready to assist you.
              </p>

              <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#111111] border border-[#242424]">
                  <span className="material-symbols-outlined text-2xl text-white">location_on</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase text-white">Facility Headquarters</span>
                    <span className="text-xs text-[#777777] mt-0.5">Olympic Boulevard, Suite 400, Performance District</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#111111] border border-[#242424]">
                  <span className="material-symbols-outlined text-2xl text-white">schedule</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase text-white">Operating Hours</span>
                    <span className="text-xs text-[#777777] mt-0.5">Monday – Saturday: 06:00 – 22:00 // Sunday: 08:00 – 18:00</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#111111] border border-[#242424]">
                  <span className="material-symbols-outlined text-2xl text-white">mail</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase text-white">Direct Dispatch</span>
                    <span className="text-xs text-[#777777] mt-0.5">coaching@athletecare.pro // +1 (800) 488-ATHL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="w-full lg:w-[500px] p-8 rounded-2xl bg-[#111111] border border-[#242424]">
              <h3 className="text-xl font-bold uppercase text-white mb-2">Request Free Consultation</h3>
              <p className="text-xs text-[#777777] mb-6">
                Tell us about your sport and athletic ambition. A CSCS staff coach will reply within 24 hours.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-[#171717] border border-emerald-500/50 flex flex-col items-center text-center gap-3">
                  <span className="material-symbols-outlined text-4xl text-emerald-400">check_circle</span>
                  <h4 className="text-base font-bold text-white uppercase">Request Dispatched!</h4>
                  <p className="text-xs text-[#BDBDBD]">
                    Thank you, {formData.name || 'Athlete'}. Our head performance coach will review your goals and reach out shortly.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-2 text-xs font-mono text-zinc-400 hover:text-white underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#BDBDBD]">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-4 py-3 rounded-lg bg-[#0A0A0A] border border-[#242424] text-white text-xs focus:border-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#BDBDBD]">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@athletecare.pro"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="px-4 py-3 rounded-lg bg-[#0A0A0A] border border-[#242424] text-white text-xs focus:border-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#BDBDBD]">Primary Athletic Focus</label>
                    <select
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="px-4 py-3 rounded-lg bg-[#0A0A0A] border border-[#242424] text-white text-xs focus:border-white focus:outline-none transition-colors"
                    >
                      <option value="Hypertrophy & Strength">Hypertrophy & Absolute Strength</option>
                      <option value="Body Recomposition">Body Recomposition & DEXA Fat Loss</option>
                      <option value="Sport-Specific Peaking">Sport-Specific Peaking & Power</option>
                      <option value="General Health & Longevity">General Health, Biometrics & Longevity</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#BDBDBD]">Your Message</label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your current routine or injury history..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="px-4 py-3 rounded-lg bg-[#0A0A0A] border border-[#242424] text-white text-xs focus:border-white focus:outline-none transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 bg-white text-black text-xs font-black uppercase tracking-wider rounded-xl hover:bg-[#E5E2E1] transition-all shadow-md"
                  >
                    Submit Consultation Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CLEAN FOOTER
          ========================================================================= */}
      <footer className="border-t border-[#242424] bg-[#000000] py-12 text-xs text-[#777777]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-xs">
              AC
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold uppercase tracking-wider">AthleteCare Pro</span>
              <span className="text-[10px] font-mono">Performance & Coaching Platform</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs">
            <a href="#hero" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#what-we-do" className="hover:text-white transition-colors">What We Do</a>
            <a href="#plans" className="hover:text-white transition-colors">Plans</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <Link href="/login" className="hover:text-white text-zinc-400 font-bold transition-colors">Athlete Login</Link>
          </div>

          <div className="font-mono text-[11px] text-[#555555]">
            © {new Date().getFullYear()} AthleteCare Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
