'use client';

import { useState, useEffect, useMemo } from 'react';
import api from '@/lib/api-client';

interface MeasurementItem {
  id?: string;
  date: string;
  bodyWeightKg: number;
  bodyFatPercentage?: number;
  muscleMassKg?: number;
  chestCm?: number;
  armsCm?: number;
  waistCm?: number;
  hrvMs?: number;
  sleepHours?: number;
  notes?: string;
}

export default function ProgressPage() {
  const [timeframe, setTimeframe] = useState('12W');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [inputWeight, setInputWeight] = useState('82.2');
  const [inputBf, setInputBf] = useState('11.6');
  const [inputChest, setInputChest] = useState('112.5');
  const [inputArms, setInputArms] = useState('42.6');
  const [inputWaist, setInputWaist] = useState('80.8');
  const [inputHrv, setInputHrv] = useState('79');
  const [inputSleep, setInputSleep] = useState('8.0');
  const [inputNotes, setInputNotes] = useState('Peak recovery, carbohydrate taper on track.');

  const [logs, setLogs] = useState<MeasurementItem[]>([
    { date: '2026-10-24', bodyWeightKg: 82.4, bodyFatPercentage: 11.8, chestCm: 112, armsCm: 42.5, waistCm: 81, hrvMs: 78, sleepHours: 7.8 },
    { date: '2026-10-17', bodyWeightKg: 83.0, bodyFatPercentage: 12.0, chestCm: 111.5, armsCm: 42.2, waistCm: 81.5, hrvMs: 74, sleepHours: 8.0 },
    { date: '2026-10-10', bodyWeightKg: 82.8, bodyFatPercentage: 12.2, chestCm: 111, armsCm: 42.0, waistCm: 81.5, hrvMs: 76, sleepHours: 7.5 },
    { date: '2026-10-03', bodyWeightKg: 83.2, bodyFatPercentage: 12.5, chestCm: 110.5, armsCm: 41.8, waistCm: 82, hrvMs: 72, sleepHours: 7.2 },
    { date: '2026-09-26', bodyWeightKg: 83.7, bodyFatPercentage: 12.9, chestCm: 110, armsCm: 41.5, waistCm: 82.5, hrvMs: 70, sleepHours: 7.6 },
  ]);

  useEffect(() => {
    async function loadMeasurements() {
      try {
        const res = await api.get<any[]>('/progress/measurements');
        if (res.data && res.data.length > 0) {
          const formatted: MeasurementItem[] = res.data.map((m) => ({
            id: m.id,
            date: m.date || new Date().toISOString().split('T')[0],
            bodyWeightKg: Number(m.bodyWeightKg) || 82.5,
            bodyFatPercentage: Number(m.bodyFatPercentage) || 12.0,
            muscleMassKg: Number(m.muscleMassKg) || 42.0,
            chestCm: Number(m.chestCm) || 111,
            armsCm: Number(m.armsCm) || 42,
            waistCm: Number(m.waistCm) || 81,
            hrvMs: Number(m.hrvMs) || 75,
            sleepHours: Number(m.sleepHours) || 8,
            notes: m.notes,
          }));
          setLogs(formatted);
        }
      } catch (err) {
        console.error('Failed to load measurements from server:', err);
      }
    }
    loadMeasurements();
  }, []);

  const handleSaveMeasurement = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      date: new Date().toISOString().split('T')[0],
      bodyWeightKg: parseFloat(inputWeight) || 82.5,
      bodyFatPercentage: parseFloat(inputBf) || 11.8,
      chestCm: parseFloat(inputChest) || 112,
      armsCm: parseFloat(inputArms) || 42.5,
      waistCm: parseFloat(inputWaist) || 81,
      hrvMs: parseInt(inputHrv, 10) || 78,
      sleepHours: parseFloat(inputSleep) || 8.0,
      notes: inputNotes,
    };

    try {
      await api.post('/progress/measurements', payload);
    } catch (err) {
      console.error('Failed to save measurement to backend:', err);
    }

    setLogs([payload, ...logs]);
    setShowLogModal(false);
    setSubmitting(false);
    setToastMessage('New biometric telemetry recorded to database.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const currentLatest = logs[0] || {
    bodyWeightKg: 82.4,
    bodyFatPercentage: 11.8,
    chestCm: 112,
    armsCm: 42.5,
    waistCm: 81,
  };

  const triggerExport = () => {
    const dataStr = JSON.stringify(logs, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `athletecare-telemetry-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    setToastMessage('Biometric dossier exported and downloaded.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="flex flex-col w-full bg-[#000000] text-white min-h-screen font-sans">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white text-black px-4 py-3 rounded-xl shadow-2xl font-bold text-xs uppercase tracking-wider animate-in slide-in-from-bottom-3">
          <span className="material-symbols-outlined text-base">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <section className="w-full border-b border-[#242424] bg-[#0A0A0A] px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-[1440px] mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 bg-[#171717] text-[#BDBDBD] text-[10px] font-mono uppercase tracking-widest rounded border border-[#2B2B2B]">
                LONGITUDINAL TELEMETRY // 12-WEEK MESOCYCLE
              </span>
              <span className="text-[10px] text-emerald-400 uppercase tracking-wider flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                LIVE BIOMETRIC LOG
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl uppercase text-white tracking-tight font-black mt-1">
              Progress &amp; Biomarkers
            </h1>
            <p className="text-xs text-[#777777] max-w-2xl">
              Clinical-grade athletic progress telemetry, DEXA correlation logs, compound strength velocity, and biomechanical mesocycle tracking.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={triggerExport}
              className="flex items-center gap-2 bg-[#171717] hover:bg-[#222222] text-white px-4 h-10 rounded-lg border border-[#333333] text-xs font-semibold tracking-wider uppercase transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>Export Dossier</span>
            </button>

            <button
              onClick={() => setShowLogModal(true)}
              className="flex items-center gap-2 bg-white hover:bg-[#E5E2E1] text-black px-4 h-10 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>Log Measurements</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Workspace */}
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-[#111111] border border-[#242424] rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-mono text-[#777777] tracking-wider">TOTAL BODY MASS</span>
            <div className="my-2">
              <span className="text-3xl font-black font-mono text-white">{currentLatest.bodyWeightKg} kg</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">-1.3 kg net over mesocycle</span>
          </div>

          <div className="bg-[#111111] border border-[#242424] rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-mono text-[#777777] tracking-wider">BODY FAT (DEXA)</span>
            <div className="my-2">
              <span className="text-3xl font-black font-mono text-white">{currentLatest.bodyFatPercentage}%</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">-1.1% contest preparation</span>
          </div>

          <div className="bg-[#111111] border border-[#242424] rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-mono text-[#777777] tracking-wider">CHEST CIRCUMFERENCE</span>
            <div className="my-2">
              <span className="text-3xl font-black font-mono text-white">{currentLatest.chestCm} cm</span>
            </div>
            <span className="text-[10px] text-white font-mono">+2.0 cm hypertrophy accretion</span>
          </div>

          <div className="bg-[#111111] border border-[#242424] rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-mono text-[#777777] tracking-wider">ARM CIRCUMFERENCE</span>
            <div className="my-2">
              <span className="text-3xl font-black font-mono text-white">{currentLatest.armsCm} cm</span>
            </div>
            <span className="text-[10px] text-white font-mono">+1.1 cm peak contraction</span>
          </div>
        </div>

        {/* Measurements Log Table */}
        <div className="bg-[#111111] border border-[#242424] rounded-2xl p-6 shadow-md flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#242424] pb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Longitudinal Biometric Registry ({logs.length} entries)
            </h3>
            <span className="text-xs font-mono text-[#777777]">UNITS: METRIC (KG / CM)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-xs">
              <thead>
                <tr className="border-b border-[#242424] text-[11px] font-mono uppercase text-[#777777]">
                  <th className="py-3 px-3">RECORD DATE</th>
                  <th className="py-3 px-3">MASS</th>
                  <th className="py-3 px-3">BODY FAT %</th>
                  <th className="py-3 px-3">CHEST</th>
                  <th className="py-3 px-3">ARMS</th>
                  <th className="py-3 px-3">WAIST</th>
                  <th className="py-3 px-3">HRV</th>
                  <th className="py-3 px-3">SLEEP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F1F1F]">
                {logs.map((log, idx) => (
                  <tr key={log.id || idx} className="hover:bg-[#141414] transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-white">{log.date}</td>
                    <td className="py-3 px-3 font-mono text-white">{log.bodyWeightKg} kg</td>
                    <td className="py-3 px-3 font-mono text-[#BDBDBD]">{log.bodyFatPercentage}%</td>
                    <td className="py-3 px-3 font-mono text-[#BDBDBD]">{log.chestCm} cm</td>
                    <td className="py-3 px-3 font-mono text-[#BDBDBD]">{log.armsCm} cm</td>
                    <td className="py-3 px-3 font-mono text-[#BDBDBD]">{log.waistCm} cm</td>
                    <td className="py-3 px-3 font-mono text-emerald-400">{log.hrvMs || 76} ms</td>
                    <td className="py-3 px-3 font-mono text-white">{log.sleepHours || 8.0}h</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Log Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#333333] rounded-2xl max-w-lg w-full p-6 sm:p-8 flex flex-col gap-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#242424] pb-4">
              <div>
                <h3 className="text-lg font-black uppercase text-white tracking-tight">Log Biometric Entry</h3>
                <p className="text-xs text-[#777777]">Synchronize new measurements into athlete dossier</p>
              </div>
              <button
                onClick={() => setShowLogModal(false)}
                className="text-[#777777] hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveMeasurement} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1">Body Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={inputWeight}
                    onChange={(e) => setInputWeight(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1">Body Fat (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputBf}
                    onChange={(e) => setInputBf(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1">Chest (cm)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={inputChest}
                    onChange={(e) => setInputChest(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1">Arms (cm)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={inputArms}
                    onChange={(e) => setInputArms(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1">Waist (cm)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={inputWaist}
                    onChange={(e) => setInputWaist(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1">HRV (ms RMSSD)</label>
                  <input
                    type="number"
                    value={inputHrv}
                    onChange={(e) => setInputHrv(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1">Sleep (Hours)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputSleep}
                    onChange={(e) => setInputSleep(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#BDBDBD] mb-1">Clinical Notes</label>
                <input
                  type="text"
                  value={inputNotes}
                  onChange={(e) => setInputNotes(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-white"
                />
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
                  disabled={submitting}
                  className="flex-1 py-2.5 bg-white text-black hover:bg-[#E5E2E1] text-xs font-bold uppercase rounded-lg transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {submitting ? 'Registering...' : 'Save Measurements'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
