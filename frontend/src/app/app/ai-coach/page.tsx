'use client';

import { useState } from 'react';

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
}

export default function AICoachPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      time: '08:14 AM',
      text: 'Good morning, Mikhail. Telemetry stream synced from last night’s sleep tracking (7h 45m, HRV 78ms RMSSD). Your CNS recovery score is optimal at 92%. Today is scheduled for Day 34: Chest & Triceps Hypertrophy.',
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
    {
      id: '2',
      sender: 'user',
      time: '08:22 AM',
      text: 'My shoulder mobility felt a little tight during yesterday’s active recovery session. Should I modify the warm-up protocol for today’s incline pressing?',
    },
    {
      id: '3',
      sender: 'ai',
      time: '08:23 AM',
      text: 'I have adjusted your warm-up protocol. Prior to the bar ramp sets, complete 10 minutes of dynamic thoracic extensions on a foam roller, followed by 2 sets of 15 banded shoulder dislocates and 2 light sets of scapular retractions on the incline bench.',
      cards: [
        {
          title: 'Modified Protocol Loaded',
          description: 'Thoracic Mobility (10m) + Banded Dislocates (2×15) + Incline Scapular Retractions (2×12).',
          actionLabel: 'View Warm-up Routine',
        },
      ],
    },
  ]);

  const [inputVal, setInputVal] = useState('');

  const handleSend = () => {
    if (!inputVal.trim()) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      time: 'Just now',
      text: inputVal,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    // Simulate intelligent telemetry response
    setTimeout(() => {
      const aiReply: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'ai',
        time: 'Just now',
        text: 'Analyzing bio-telemetry against your request... Recommendation logged to your mesocycle file. Ensure hydration reaches 3.2L before 16:00 PM.',
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 1000);
  };

  const promptSuggestions = [
    'Suggest post-workout recovery meal',
    'Adjust today’s warm-up protocol',
    'Analyze sleep & recovery correlation',
    'Review compound load progression',
  ];

  return (
    <div className="flex flex-col w-full bg-surface-base min-h-screen">
      {/* Context Banner */}
      <section className="w-full border-b border-border-subtle bg-surface-canvas px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-text-primary animate-pulse"></span>
              <h1 className="text-[12px] uppercase tracking-wider text-text-primary font-bold">
                AthleteCare AI Coach <span className="text-text-muted px-1">•</span> Performance Intelligence
              </h1>
            </div>
            <div className="flex items-center gap-1 text-text-muted text-[10px] uppercase font-mono tracking-wider">
              <span className="material-symbols-outlined text-sm">terminal</span>
              <span>Engine Model v4.8-BioTelemetry</span>
            </div>
          </div>

          {/* Context Pill Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-surface-elevated px-3 py-1 rounded-lg flex items-center gap-1.5 border border-border-subtle text-[11px]">
              <span className="uppercase text-text-muted font-mono">Client:</span>
              <span className="text-text-primary font-semibold">Mikhail R.</span>
            </div>
            <div className="bg-surface-elevated px-3 py-1 rounded-lg flex items-center gap-1.5 border border-border-subtle text-[11px]">
              <span className="uppercase text-text-muted font-mono">Goal:</span>
              <span className="text-text-primary font-semibold">Hypertrophy &amp; Strength</span>
            </div>
            <div className="bg-surface-elevated px-3 py-1 rounded-lg flex items-center gap-1.5 border border-border-subtle text-[11px]">
              <span className="material-symbols-outlined text-xs text-text-primary">sync</span>
              <span className="uppercase text-text-muted font-mono">Sync:</span>
              <span className="text-text-primary font-semibold">Health Data Live</span>
            </div>
            <div className="bg-surface-elevated px-3 py-1 rounded-lg flex items-center gap-1.5 border border-border-subtle text-[11px]">
              <span className="material-symbols-outlined text-xs text-text-primary">verified_user</span>
              <span className="uppercase text-text-muted font-mono">Safety:</span>
              <span className="text-text-primary font-semibold">Verified Wellness Advisor</span>
            </div>
          </div>

          {/* Diagnostic Bar */}
          <div className="bg-surface-card rounded-[10px] p-3.5 border border-border-subtle grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-medium block">
                Sleep Duration (Last Night)
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-lg font-bold text-text-primary font-mono">7h 45m</span>
                <span className="text-[11px] text-text-muted">(+45m vs 7d avg)</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-medium block">
                CNS Recovery Index
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-lg font-bold text-text-primary font-mono">92%</span>
                <span className="text-[11px] text-text-primary font-medium">Optimal Overload Readiness</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-medium block">
                Weekly Volume Velocity
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-lg font-bold text-text-primary font-mono">16,900 kg</span>
                <span className="text-[11px] text-text-primary font-medium">+8% Overload Pace</span>
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
                    ? 'bg-text-primary text-text-inverse shadow-sm'
                    : 'bg-surface-elevated text-text-primary border border-border-medium'
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
                    ? 'bg-surface-card border border-border-medium text-text-primary'
                    : 'bg-surface-canvas border border-border-subtle text-text-primary'
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-[10px] font-mono text-text-muted">
                  <span className="uppercase font-bold tracking-wider">
                    {msg.sender === 'ai' ? 'ATHLETECARE AI • TELEMETRY ENGINE' : 'MIKHAIL R.'}
                  </span>
                  <span>{msg.time}</span>
                </div>

                <p className="text-[13px] leading-relaxed m-0">{msg.text}</p>

                {/* Optional Tactical Cards inside message */}
                {msg.cards && msg.cards.length > 0 && (
                  <div className="flex flex-col gap-2 mt-1">
                    {msg.cards.map((card, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-3 rounded-lg bg-surface-card border border-border-subtle flex flex-col gap-1.5"
                      >
                        <span className="text-[11px] font-bold uppercase text-text-primary tracking-wide">
                          {card.title}
                        </span>
                        <p className="text-[12px] text-text-secondary leading-relaxed m-0">
                          {card.description}
                        </p>
                        {card.actionLabel && (
                          <button
                            className="self-start mt-1 px-2.5 py-1 rounded bg-surface-elevated hover:bg-surface-container border border-border-medium text-[10px] uppercase font-bold text-text-primary tracking-wider transition-colors"
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
        </div>

        {/* Input & Operational Quick Prompts Container */}
        <div className="flex flex-col gap-3 sticky bottom-4 bg-surface-base pt-2">
          {/* Quick Action Prompt Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {promptSuggestions.map((prompt) => (
              <button
                key={prompt}
                onClick={() => setInputVal(prompt)}
                className="px-3 py-1.5 rounded-full bg-surface-card hover:bg-surface-elevated border border-border-subtle hover:border-border-medium text-text-secondary hover:text-text-primary text-[11px] uppercase tracking-wider whitespace-nowrap transition-colors"
                type="button"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Composer Input Bar */}
          <div className="p-2 bg-surface-card border border-border-medium rounded-[14px] flex items-center gap-2 shadow-lg">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask AthleteCare AI regarding sets, biomechanics, recovery, or diet..."
              className="flex-1 bg-transparent border-0 px-3 py-2 text-[13px] text-text-primary placeholder:text-text-muted focus:outline-none"
            />

            <button
              onClick={handleSend}
              disabled={!inputVal.trim()}
              className="px-4 h-10 rounded-[10px] bg-text-primary hover:opacity-90 disabled:opacity-40 text-text-inverse text-[12px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
              type="button"
            >
              <span>Send</span>
              <span className="material-symbols-outlined text-sm">arrow_upward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
