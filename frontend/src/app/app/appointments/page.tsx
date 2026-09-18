'use client';

import { useState } from 'react';

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

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const typeObj = appointmentTypes.find((t) => t.id === selectedType);
    const coachObj = coaches.find((c) => c.id === selectedCoach);

    const newApt = {
      id: `apt-${Date.now()}`,
      title: typeObj?.title || 'Telemetry Session',
      coach: coachObj?.name || 'Staff Coach',
      date: `${selectedDate} • ${selectedSlot}`,
      status: 'CONFIRMED',
      meetUrl: `https://meet.athletecare.pro/session-${Math.random().toString(36).substring(2, 7)}`,
      notes: notes || 'General performance & telemetry calibration review.',
    };

    setAppointments([newApt, ...appointments]);
    setIsBooked(true);
    setNotes('');
    setTimeout(() => setIsBooked(false), 4000);
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#242424] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#777777]">
              TELEMETRY VIDEO APPOINTMENTS // CSCS COACH SYNC
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            Clinical Coaching Sessions
          </h1>
          <p className="text-sm text-[#777777] mt-1">
            Book live biomechanical video audits, metabolic load calibration, and competition peaking protocols.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 bg-[#171717] border border-[#242424] rounded-lg text-xs text-[#BDBDBD] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-white">verified</span>
            Tier 1 Pro Athlete Access Confirmed
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111111] border border-[#242424] rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[11px] uppercase tracking-wider text-[#777777]">Upcoming Sessions</span>
          <span className="text-2xl font-bold text-white mt-2">01</span>
          <span className="text-[11px] text-[#BDBDBD] mt-1">Tomorrow • 10:00 AM EST</span>
        </div>
        <div className="bg-[#111111] border border-[#242424] rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[11px] uppercase tracking-wider text-[#777777]">Completed Audits</span>
          <span className="text-2xl font-bold text-white mt-2">12</span>
          <span className="text-[11px] text-[#BDBDBD] mt-1">100% Attendance Rate</span>
        </div>
        <div className="bg-[#111111] border border-[#242424] rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[11px] uppercase tracking-wider text-[#777777]">Assigned CSCS Lead</span>
          <span className="text-sm font-bold text-white mt-2 truncate">Marcus Vance, CSCS</span>
          <span className="text-[11px] text-[#777777] mt-1">Strength & Biomechanics</span>
        </div>
        <div className="bg-[#111111] border border-[#242424] rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[11px] uppercase tracking-wider text-[#777777]">Telemetry Sync Rate</span>
          <span className="text-2xl font-bold text-white mt-2">99.8%</span>
          <span className="text-[11px] text-white mt-1 font-semibold">Active Biometrics Feed</span>
        </div>
      </div>

      {/* Main Grid: Scheduler (Left) & Schedule (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scheduler Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#111111] border border-[#242424] rounded-xl p-5 sm:p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-[#242424] pb-4">
            <h2 className="text-base font-bold uppercase tracking-wide text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">calendar_add_on</span>
              Schedule Assessment Session
            </h2>
            <span className="text-[11px] font-mono text-[#777777]">ENCRYPTED WEB RTC</span>
          </div>

          {isBooked && (
            <div className="p-3.5 bg-[#171717] border border-white rounded-lg flex items-center justify-between animate-fade-in">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Session confirmed! Room telemetry URL generated.
              </div>
            </div>
          )}

          <form onSubmit={handleBooking} className="flex flex-col gap-5">
            {/* 1. Category */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDBDBD] mb-2.5">
                1. Select Assessment Protocol
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {appointmentTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`p-3.5 rounded-lg border text-left transition-all ${
                      selectedType === type.id
                        ? 'bg-[#171717] border-white text-white shadow-sm'
                        : 'bg-[#0A0A0A] border-[#242424] text-[#777777] hover:border-[#4A4A4A]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="material-symbols-outlined text-base text-white">{type.icon}</span>
                      <span className="text-[10px] font-mono uppercase text-[#BDBDBD]">{type.duration}</span>
                    </div>
                    <div className="text-xs font-bold uppercase text-white">{type.title}</div>
                    <div className="text-[11px] text-[#777777] mt-1 leading-snug">{type.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Coach */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDBDBD] mb-2.5">
                2. Direct CSCS Specialist
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {coaches.map((coach) => (
                  <button
                    key={coach.id}
                    type="button"
                    onClick={() => setSelectedCoach(coach.id)}
                    className={`p-3 rounded-lg border flex items-center gap-3 transition-all text-left ${
                      selectedCoach === coach.id
                        ? 'bg-[#171717] border-white text-white'
                        : 'bg-[#0A0A0A] border-[#242424] text-[#777777] hover:border-[#4A4A4A]'
                    }`}
                  >
                    <img
                      src={coach.avatar}
                      alt={coach.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#4A4A4A]"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white">{coach.name}</span>
                      <span className="text-[10px] text-[#777777]">{coach.role}</span>
                      <span className="text-[10px] text-white font-mono mt-0.5">{coach.status}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDBDBD] mb-2">
                  3. Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDBDBD] mb-2">
                  4. Available Time Slot
                </label>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-2.5 py-1.5 rounded text-[11px] font-mono transition-all ${
                        selectedSlot === slot
                          ? 'bg-white text-black font-bold'
                          : 'bg-[#0A0A0A] border border-[#242424] text-[#BDBDBD] hover:border-[#4A4A4A]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Notes */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDBDBD] mb-2">
                5. Diagnostic Objectives & PR Focus
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Incline Bench set 3 bar speed, recovery HRV drop after leg session..."
                className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg p-3 text-xs text-white placeholder-[#777777] focus:outline-none focus:border-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#E5E2E1] transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span className="material-symbols-outlined text-base">video_call</span>
              Confirm Appointment & Generate Telemetry Room
            </button>
          </form>
        </div>

        {/* Schedule & History List (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-[#111111] border border-[#242424] rounded-xl p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#242424] pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-base">schedule</span>
                Roster Telemetry Sessions
              </h3>
              <span className="text-[11px] font-mono text-[#777777]">{appointments.length} Recorded</span>
            </div>

            <div className="flex flex-col gap-3">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-[#0A0A0A] border border-[#242424] rounded-lg p-4 flex flex-col gap-2.5 transition-all hover:border-[#4A4A4A]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase">{apt.title}</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        apt.status === 'CONFIRMED'
                          ? 'bg-white text-black'
                          : 'bg-[#171717] border border-[#4A4A4A] text-[#777777]'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-[#BDBDBD] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-xs text-[#777777]">event</span>
                    {apt.date}
                  </div>

                  <div className="text-[11px] text-[#777777]">
                    <span className="text-[#BDBDBD]">Specialist:</span> {apt.coach}
                  </div>

                  {apt.notes && (
                    <div className="text-[11px] text-[#777777] bg-[#111111] p-2 rounded border border-[#242424] italic">
                      "{apt.notes}"
                    </div>
                  )}

                  {apt.status === 'CONFIRMED' && (
                    <div className="pt-2 border-t border-[#242424] flex items-center justify-between">
                      <a
                        href={apt.meetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-white text-black text-[11px] font-bold uppercase tracking-wider rounded hover:bg-[#E5E2E1] transition-all flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-sm">videocam</span>
                        Join Session
                      </a>
                      <span className="text-[10px] font-mono text-[#777777]">ID: {apt.id}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
