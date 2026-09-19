'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api-client';

const appointmentTypes = [
  {
    id: 'biomechanical_review',
    title: 'Biomechanical Video Review',
    duration: '45 mins',
    desc: 'Frame-by-frame barbell bar-path velocity, joint angles, and kinetic chain breakdown.',
    icon: 'videocam',
  },
  {
    id: 'macro_calibration',
    title: 'Macro & Fueling Telemetry Audit',
    duration: '30 mins',
    desc: 'Metabolic load adjustment, carbohydrate timing, and intra-workout electrolyte targets.',
    icon: 'restaurant',
  },
  {
    id: 'telemetry_assessment',
    title: 'CNS & Biomarker Fatigue Diagnostics',
    duration: '40 mins',
    desc: 'HRV suppression analysis, sleep architecture, and autonomic recovery calibration.',
    icon: 'monitoring',
  },
  {
    id: 'competition_peaking',
    title: 'Competition Peaking & Taper Protocol',
    duration: '60 mins',
    desc: 'Final microcycle volume drop, glycogen loading, and attempt selection strategy.',
    icon: 'trophy',
  },
];

const coaches = [
  {
    id: 'coach-1',
    name: 'Marcus Vance, CSCS',
    role: 'Head Strength & Biomechanics Specialist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'Available Tomorrow',
  },
  {
    id: 'coach-2',
    name: 'Sarah Jenkins, MSc',
    role: 'Aerobic Capacity & Metabolic Specialist',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    status: 'Available Thursday',
  },
];

const timeSlots = ['09:00 AM EST', '10:30 AM EST', '01:00 PM EST', '03:30 PM EST', '05:00 PM EST'];

export default function AppointmentsPage() {
  const [selectedType, setSelectedType] = useState('biomechanical_review');
  const [selectedCoach, setSelectedCoach] = useState('coach-1');
  const [selectedDate, setSelectedDate] = useState('2026-10-25');
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM EST');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [appointments, setAppointments] = useState([
    {
      id: 'apt-101',
      title: 'Biomechanical Video Review',
      coach: 'Marcus Vance, CSCS',
      date: 'Tomorrow, Oct 25 • 10:00 AM EST',
      status: 'CONFIRMED',
      meetUrl: 'https://meet.athletecare.pro/vance-telemetry-884',
      notes: 'Focus on Barbell Incline Press bar velocity on set 3 (+2.5kg PR check).',
    },
    {
      id: 'apt-100',
      title: 'Macro Telemetry Calibration',
      coach: 'Marcus Vance, CSCS',
      date: 'Oct 18, 2026 • 11:30 AM EST',
      status: 'COMPLETED',
      meetUrl: 'https://meet.athletecare.pro/vance-archive',
      notes: 'Carb load increased +45g on heavy training days.',
    },
  ]);

  useEffect(() => {
    async function loadAppointments() {
      try {
        const res = await api.get<any[]>('/appointments/my');
        if (res.data && res.data.length > 0) {
          const formatted = res.data.map((item) => ({
            id: item.id,
            title: item.type ? item.type.replace('_', ' ').toUpperCase() : 'COACHING SYNC',
            coach: item.coach ? `${item.coach.firstName} ${item.coach.lastName}` : 'Marcus Vance, CSCS',
            date: new Date(item.scheduledAt).toLocaleString(),
            status: item.status?.toUpperCase() || 'CONFIRMED',
            meetUrl: item.meetUrl || 'https://meet.athletecare.pro/active-sync',
            notes: item.notes || 'Coaching telemetry review',
          }));
          setAppointments(formatted);
        }
      } catch (err) {
        console.error('Failed to load appointments from server:', err);
      }
    }
    loadAppointments();
  }, []);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const typeObj = appointmentTypes.find((t) => t.id === selectedType);
    const coachObj = coaches.find((c) => c.id === selectedCoach);

    const scheduledDateObj = new Date(selectedDate);
    const payload = {
      coachId: selectedCoach === 'coach-1' ? '00000000-0000-0000-0000-000000000002' : '00000000-0000-0000-0000-000000000003',
      type: selectedType,
      scheduledAt: scheduledDateObj.toISOString(),
      durationMinutes: 45,
      notes: notes || 'Coaching & biometric sync session',
    };

    try {
      await api.post('/appointments', payload);
    } catch (err) {
      console.error('Failed to book via backend:', err);
    }

    const newApt = {
      id: `apt-${Date.now()}`,
      title: typeObj?.title || 'Telemetry Session',
      coach: coachObj?.name || 'Marcus Vance, CSCS',
      date: `${selectedDate} • ${selectedSlot}`,
      status: 'CONFIRMED',
      meetUrl: `https://meet.athletecare.pro/session-${Math.random().toString(36).substring(2, 7)}`,
      notes: notes || 'General performance & telemetry calibration review.',
    };

    setAppointments([newApt, ...appointments]);
    setIsBooked(true);
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full font-sans text-white">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#242424] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#777777]">
              SPORTS SCIENCE CONSULTATION // DIRECT CSCS LINK
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            Schedule Coaching Sync
          </h1>
          <p className="text-sm text-[#777777] mt-1">
            Book 1-on-1 encrypted video sessions with Marcus Vance and the AthleteCare clinical staff.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Schedule Form (Cols 1-7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <form
            onSubmit={handleBooking}
            className="bg-[#111111] border border-[#242424] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-xl"
          >
            {/* Step 1: Select Protocol Type */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold uppercase tracking-wider text-white flex items-center justify-between">
                <span>1. Select Consultation Protocol</span>
                <span className="text-[10px] font-mono text-[#777777]">CSCS ACCREDITED</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {appointmentTypes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedType(t.id)}
                    className={`p-4 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all ${
                      selectedType === t.id
                        ? 'bg-[#1A1A1A] border-white text-white shadow-md'
                        : 'bg-[#0A0A0A] border-[#242424] text-[#BDBDBD] hover:border-[#444444]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="material-symbols-outlined text-lg text-white">{t.icon}</span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#111111] border border-[#2B2B2B] text-[#777777]">
                        {t.duration}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wide text-white">{t.title}</h4>
                      <p className="text-[11px] text-[#777777] mt-1 leading-snug">{t.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Specialist */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold uppercase tracking-wider text-white">
                2. Assigned Clinical Coach
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {coaches.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCoach(c.id)}
                    className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                      selectedCoach === c.id
                        ? 'bg-[#1A1A1A] border-white text-white'
                        : 'bg-[#0A0A0A] border-[#242424] text-[#BDBDBD] hover:border-[#444444]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#202020] border border-[#333333] flex items-center justify-center font-bold text-xs">
                      {c.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{c.name}</h4>
                      <p className="text-[10px] text-[#777777]">{c.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Date & Slot Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-white">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-[#0A0A0A] border border-[#242424] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-white font-mono"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-white">Available Slot</label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="bg-[#0A0A0A] border border-[#242424] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-white font-mono"
                >
                  {timeSlots.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 4: Notes */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-white">
                Session Objectives &amp; Questions
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specify kinetic cues or lifting videos you want reviewed during this session..."
                className="bg-[#0A0A0A] border border-[#242424] rounded-lg p-3 text-xs text-white placeholder-[#777777] focus:outline-none focus:border-white resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-white text-black hover:bg-[#E5E2E1] rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">event_available</span>
              <span>{submitting ? 'Confirming with Telemetry...' : 'Confirm Video Consultation'}</span>
            </button>
          </form>
        </div>

        {/* Right: Existing Sessions (Cols 8-12) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Scheduled Telemetry Sessions ({appointments.length})
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-[#111111] border border-[#242424] rounded-xl p-5 flex flex-col gap-3 shadow-md"
              >
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase">{apt.title}</h4>
                    <span className="text-xs text-[#777777]">{apt.coach}</span>
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded border font-bold ${
                      apt.status === 'CONFIRMED'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-[#171717] text-[#777777] border-[#2B2B2B]'
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-white">
                  <span className="material-symbols-outlined text-sm text-[#777777]">schedule</span>
                  <span>{apt.date}</span>
                </div>

                {apt.notes && (
                  <p className="text-xs text-[#BDBDBD] leading-relaxed bg-[#0A0A0A] p-2.5 rounded border border-[#1E1E1E]">
                    {apt.notes}
                  </p>
                )}

                {apt.status === 'CONFIRMED' && (
                  <div className="pt-2 flex gap-2">
                    <a
                      href={apt.meetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 bg-white text-black hover:bg-[#E5E2E1] rounded-lg text-xs font-bold uppercase text-center transition-colors font-mono"
                    >
                      Join Encrypted Stream →
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
