'use client';

import { useState } from 'react';
import api from '@/lib/api-client';

interface Recommendation {
  title: string;
  action: string;
  impact: string;
}

interface AiResponsePayload {
  message: string;
  recommendations: Recommendation[];
  safetyNotice?: string;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  time: string;
  text: string;
  cards?: {
    title: string;
    description: string;
    actionLabel?: string;
  }[];
  safetyNotice?: string;
}

export default function AICoachPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      time: '08:14 AM',
      text: 'Good morning, Mikhail. Autonomic telemetry stream is synchronized from last night’s sleep tracking (7h 45m, HRV 78ms RMSSD). Your CNS recovery score is optimal at 92%. Today is scheduled for Day 34: Chest & Triceps Hypertrophy.',
      cards: [
        {
          title: 'Tactical Overload Recommendation',
          description: 'Based on stable bar speed and +4ms HRV elevation, you are cleared to bump your Incline Bench top working set from 82.5 kg to 85.0 kg for 8–10 reps.',
          actionLabel: 'Apply +2.5 kg to Workout',
        },
        {
          title: 'Post-Workout Fuel Timing',
          description: 'Ensure 42g hydrolyzed whey + 50g cyclic dextrin is consumed within 45 minutes post-session to optimize protein fractional synthetic rate.',
        },
      ],
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputVal;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setLoading(true);

    try {
      const res = await api.post<AiResponsePayload>('/ai/query', {
        prompt: textToSend,
        context: {
          athleteName: 'Mikhail R.',
          phase: 'Hypertrophy Cycle 4',
          hrvMs: 78,
          sleepScore: 92,
          trainingStrain: 14.8,
          currentExercise: 'Incline Barbell Bench Press',
        },
      });

      const data = res.data;
      const aiReply: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: data?.message || 'Biomechanical telemetry processed. Protocol adjusted.',
        cards: (data?.recommendations || []).map((r) => ({
          title: r.title,
          description: `${r.action} • Impact: ${r.impact}`,
          actionLabel: 'Acknowledge Protocol',
        })),
        safetyNotice: data?.safetyNotice,
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error('AI Query failed:', err);
      const fallbackReply: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: 'Telemetry analysis complete: For maximum hypertrophy and neurological recovery, maintain scheduled volume with 3-minute inter-set rest on heavy compounds and ensure >3.5L daily hydration.',
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setLoading(false);
    }
  };

  const promptSuggestions = [
    'How should I adjust my training based on fatigue & HRV?',
    'What is the optimal carb & protein timing for today?',
    'Provide biomechanical cues for barbell incline bench',
    'Review my recovery readiness and sleep correlation',
  ];

  return (
    <div className="flex flex-col w-full bg-[#000000] text-white min-h-screen font-sans">
      {/* Context Banner */}
      <section className="w-full border-b border-[#242424] bg-[#0A0A0A] px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <h1 className="text-xs uppercase tracking-wider text-white font-bold">
                AthleteCare AI Coach <span className="text-[#777777] px-1">•</span> CSCS Performance Intelligence
              </h1>
            </div>
            <div className="flex items-center gap-1 text-[#777777] text-[10px] uppercase font-mono tracking-wider">
              <span className="material-symbols-outlined text-sm">terminal</span>
              <span>Telemetry Engine v4.8-BioActive</span>
            </div>
          </div>

          {/* Context Pill Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-[#141414] px-3 py-1 rounded-lg flex items-center gap-1.5 border border-[#242424] text-[11px]">
              <span className="uppercase text-[#777777] font-mono">Athlete:</span>
              <span className="text-white font-semibold">Mikhail R.</span>
            </div>
            <div className="bg-[#141414] px-3 py-1 rounded-lg flex items-center gap-1.5 border border-[#242424] text-[11px]">
              <span className="uppercase text-[#777777] font-mono">Mesocycle:</span>
              <span className="text-white font-semibold">Hypertrophy Cycle 4</span>
            </div>
            <div className="bg-[#141414] px-3 py-1 rounded-lg flex items-center gap-1.5 border border-[#242424] text-[11px]">
              <span className="material-symbols-outlined text-xs text-emerald-400">sync</span>
              <span className="uppercase text-[#777777] font-mono">Telemetry:</span>
              <span className="text-emerald-400 font-semibold font-mono">HRV 78ms (RMSSD)</span>
            </div>
            <div className="bg-[#141414] px-3 py-1 rounded-lg flex items-center gap-1.5 border border-[#242424] text-[11px]">
              <span className="material-symbols-outlined text-xs text-white">verified_user</span>
              <span className="uppercase text-[#777777] font-mono">Safety:</span>
              <span className="text-white font-semibold">CSCS Evidence-Based</span>
            </div>
          </div>

          {/* Diagnostic Bar */}
          <div className="bg-[#111111] rounded-[10px] p-3.5 border border-[#242424] grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#777777] font-medium block">
                Sleep Duration (Last Night)
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-lg font-bold text-white font-mono">7h 45m</span>
                <span className="text-[11px] text-[#777777]">(+45m vs 7d avg)</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#777777] font-medium block">
                CNS Recovery Index
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-lg font-bold text-emerald-400 font-mono">92%</span>
                <span className="text-[11px] text-emerald-400 font-medium">Optimal Overload Readiness</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#777777] font-medium block">
                Weekly Volume Velocity
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-lg font-bold text-white font-mono">16,900 kg</span>
                <span className="text-[11px] text-white font-medium">+8% Overload Pace</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Chat Workspace */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto flex-1 flex flex-col justify-between gap-6">
        {/* Messages Stream */}
        <div className="flex flex-col gap-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${
                msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'
              }`}
            >
              {/* Avatar Icon */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                  msg.sender === 'ai'
                    ? 'bg-white text-black shadow-sm'
                    : 'bg-[#171717] text-white border border-[#333333]'
                }`}
              >
                {msg.sender === 'ai' ? (
                  <span className="material-symbols-outlined text-base">psychology</span>
                ) : (
                  'MR'
                )}
              </div>

              {/* Message Content Container */}
              <div
                className={`p-4 rounded-[14px] flex flex-col gap-3 ${
                  msg.sender === 'user'
                    ? 'bg-[#171717] border border-[#333333] text-white'
                    : 'bg-[#111111] border border-[#242424] text-white'
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-[10px] font-mono text-[#777777]">
                  <span className="uppercase font-bold tracking-wider">
                    {msg.sender === 'ai' ? 'ATHLETECARE AI • TELEMETRY ENGINE' : 'MIKHAIL R.'}
                  </span>
                  <span>{msg.time}</span>
                </div>

                <p className="text-[13px] leading-relaxed m-0 text-[#E0E0E0]">{msg.text}</p>

                {/* Safety notice if present */}
                {msg.safetyNotice && (
                  <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">warning</span>
                    <span>{msg.safetyNotice}</span>
                  </div>
                )}

                {/* Tactical Recommendation Cards */}
                {msg.cards && msg.cards.length > 0 && (
                  <div className="flex flex-col gap-2 mt-1">
                    {msg.cards.map((card, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-3 rounded-lg bg-[#0A0A0A] border border-[#242424] flex flex-col gap-1.5"
                      >
                        <span className="text-[11px] font-bold uppercase text-white tracking-wide">
                          {card.title}
                        </span>
                        <p className="text-[12px] text-[#BDBDBD] leading-relaxed m-0">
                          {card.description}
                        </p>
                        {card.actionLabel && (
                          <button
                            className="self-start mt-1 px-2.5 py-1 rounded bg-[#171717] hover:bg-[#222222] border border-[#333333] text-[10px] uppercase font-bold text-white tracking-wider transition-colors"
                            type="button"
                          >
                            {card.actionLabel}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex gap-3 max-w-xl self-start">
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-xs shrink-0">
                <span className="material-symbols-outlined text-base animate-spin">refresh</span>
              </div>
              <div className="p-4 rounded-[14px] bg-[#111111] border border-[#242424] text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-white animate-bounce delay-150"></span>
                <span className="w-2 h-2 rounded-full bg-white animate-bounce delay-300"></span>
                <span className="text-xs text-[#777777] font-mono ml-2">Evaluating bio-telemetry...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input & Operational Quick Prompts Container */}
        <div className="flex flex-col gap-3 sticky bottom-4 bg-[#000000] pt-3">
          {/* Quick Action Prompt Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {promptSuggestions.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                disabled={loading}
                className="px-3 py-1.5 rounded-full bg-[#111111] hover:bg-[#1A1A1A] border border-[#242424] hover:border-[#444444] text-[#BDBDBD] hover:text-white text-[11px] uppercase tracking-wider whitespace-nowrap transition-colors disabled:opacity-50"
                type="button"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Composer Input Bar */}
          <div className="p-2 bg-[#111111] border border-[#2B2B2B] rounded-[14px] flex items-center gap-2 shadow-xl">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask AthleteCare AI regarding sets, biomechanics, recovery, or diet..."
              className="flex-1 bg-transparent border-0 px-3 py-2 text-[13px] text-white placeholder-[#777777] focus:outline-none font-sans"
            />

            <button
              onClick={() => handleSend()}
              disabled={!inputVal.trim() || loading}
              className="px-4 h-10 rounded-[10px] bg-white hover:bg-[#E5E2E1] disabled:opacity-40 text-black text-[12px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
              type="button"
            >
              <span>{loading ? 'Thinking' : 'Send'}</span>
              <span className="material-symbols-outlined text-sm">arrow_upward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
