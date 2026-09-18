'use client';

import { useState } from 'react';

interface ChatMessage {
  id: string;
  sender: 'athlete' | 'coach' | 'ai';
  senderName: string;
  avatar?: string;
  content: string;
  timestamp: string;
  telemetryCard?: {
    metric: string;
    value: string;
    status: string;
    detail: string;
  };
}

export default function MessagesPage() {
  const [activeThread, setActiveThread] = useState('coach-marcus');
  const [inputMessage, setInputMessage] = useState('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'coach',
      senderName: 'Marcus Vance, CSCS',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      content:
        'Mikhail, I analyzed your telemetry logs from today’s chest & triceps session. Great execution on set 3 of the incline bench press.',
      timestamp: '09:15 AM',
    },
    {
      id: 'm-2',
      sender: 'coach',
      senderName: 'Marcus Vance, CSCS',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      content: 'Here is your bar velocity metric captured through your wearable live telemetry feed:',
      timestamp: '09:16 AM',
      telemetryCard: {
        metric: 'BARBELL INCLINE BENCH PRESS',
        value: '85.0 kg × 8 reps',
        status: 'PR VELOCITY: 0.68 m/s (RPE 8.5)',
        detail: 'Kinetic transfer optimal. No significant bar deceleration through sticking point.',
      },
    },
    {
      id: 'm-3',
      sender: 'athlete',
      senderName: 'Mikhail R.',
      content:
        'Felt smooth throughout. Rest interval was strictly 120s as programmed. Should we increase +2.5kg for next microcycle?',
      timestamp: '09:22 AM',
    },
    {
      id: 'm-4',
      sender: 'coach',
      senderName: 'Marcus Vance, CSCS',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      content:
        'Yes, bump top set to 87.5kg on Block 2C. Ensure your post-workout hydrolyzed whey + creatine Creapure is logged within the next 30 minutes.',
      timestamp: '09:25 AM',
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'athlete',
      senderName: 'Mikhail R.',
      content: inputMessage,
      timestamp: 'Just now',
    };

    setMessages([...messages, newMsg]);
    setInputMessage('');
  };

  const handleAttachTelemetry = () => {
    const telemetryMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'athlete',
      senderName: 'Mikhail R.',
      content: 'Attached current biometric recovery telemetry snapshot:',
      timestamp: 'Just now',
      telemetryCard: {
        metric: 'CNS RECOVERY INDEX',
        value: '92% (OPTIMAL)',
        status: 'HRV: 68ms • SLEEP: 7h 45m',
        detail: 'Systemic fatigue low. Cleared for heavy overload protocol tomorrow.',
      },
    };
    setMessages([...messages, telemetryMsg]);
  };

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#242424] pb-4 flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#777777]">
              ENCRYPTED ATHLETE-STAFF DISPATCH
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
            Direct Telemetry Messaging
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[#BDBDBD] hidden sm:block">STATUS: 256-BIT ENCRYPTION</span>
        </div>
      </div>

      {/* Chat Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 bg-[#111111] border border-[#242424] rounded-xl overflow-hidden">
        {/* Threads Rail (4 cols) */}
        <div className="lg:col-span-4 border-r border-[#242424] flex flex-col bg-[#0A0A0A]">
          <div className="p-3.5 border-b border-[#242424]">
            <input
              type="text"
              placeholder="Filter channels or staff..."
              className="w-full bg-[#111111] border border-[#242424] rounded-lg px-3 py-2 text-xs text-white placeholder-[#777777] focus:outline-none focus:border-white"
            />
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#171717]">
            {/* Thread 1: Marcus Vance */}
            <button
              onClick={() => setActiveThread('coach-marcus')}
              className={`w-full p-4 flex items-start gap-3 text-left transition-all ${
                activeThread === 'coach-marcus' ? 'bg-[#171717] border-l-2 border-white' : 'hover:bg-[#111111]'
              }`}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Marcus Vance"
                  className="w-10 h-10 rounded-full object-cover border border-[#4A4A4A]"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-white rounded-full ring-2 ring-[#0A0A0A]"></span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-bold text-white truncate">Marcus Vance, CSCS</span>
                  <span className="text-[10px] font-mono text-[#777777]">09:25 AM</span>
                </div>
                <div className="text-[10px] font-mono uppercase text-[#BDBDBD] mb-1">Lead Strength Coach</div>
                <p className="text-[11px] text-[#777777] truncate">
                  Yes, bump top set to 87.5kg on Block 2C...
                </p>
              </div>
            </button>

            {/* Thread 2: AI Copilot */}
            <button
              onClick={() => setActiveThread('ai-copilot')}
              className={`w-full p-4 flex items-start gap-3 text-left transition-all ${
                activeThread === 'ai-copilot' ? 'bg-[#171717] border-l-2 border-white' : 'hover:bg-[#111111]'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-black border border-[#4A4A4A] flex items-center justify-center text-white flex-shrink-0">
                <span className="material-symbols-outlined text-lg">psychology</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-bold text-white truncate">AthleteCare AI Copilot</span>
                  <span className="text-[10px] font-mono text-[#777777]">Yesterday</span>
                </div>
                <div className="text-[10px] font-mono uppercase text-[#BDBDBD] mb-1">Autonomous Agent</div>
                <p className="text-[11px] text-[#777777] truncate">
                  Microcycle 8 volume delta detected: +8.4% overload.
                </p>
              </div>
            </button>

            {/* Thread 3: Sarah Jenkins */}
            <button
              onClick={() => setActiveThread('sarah-jenkins')}
              className={`w-full p-4 flex items-start gap-3 text-left transition-all ${
                activeThread === 'sarah-jenkins' ? 'bg-[#171717] border-l-2 border-white' : 'hover:bg-[#111111]'
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
                alt="Sarah Jenkins"
                className="w-10 h-10 rounded-full object-cover border border-[#4A4A4A]"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-bold text-white truncate">Sarah Jenkins, MSc</span>
                  <span className="text-[10px] font-mono text-[#777777]">Oct 20</span>
                </div>
                <div className="text-[10px] font-mono uppercase text-[#BDBDBD] mb-1">Nutrition Specialist</div>
                <p className="text-[11px] text-[#777777] truncate">
                  Hydration electrolytes adjusted for zone 2 cardio...
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Conversation View (8 cols) */}
        <div className="lg:col-span-8 flex flex-col bg-[#111111] min-h-0">
          {/* Active Header */}
          <div className="p-4 border-b border-[#242424] flex items-center justify-between bg-[#171717]">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Marcus Vance"
                className="w-9 h-9 rounded-full object-cover border border-[#4A4A4A]"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white uppercase">Marcus Vance, CSCS</span>
                <span className="text-[10px] font-mono text-white flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  LIVE TELEMETRY SYNCED • ASSIGNED COACH
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/app/appointments"
                className="px-3 py-1.5 bg-[#0A0A0A] border border-[#4A4A4A] text-white text-[11px] font-bold uppercase tracking-wider rounded hover:bg-white hover:text-black transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">videocam</span>
                Schedule Video Sync
              </a>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === 'athlete' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {msg.avatar && (
                  <img
                    src={msg.avatar}
                    alt={msg.senderName}
                    className="w-7 h-7 rounded-full object-cover border border-[#4A4A4A] flex-shrink-0"
                  />
                )}

                <div className="flex flex-col gap-1">
                  <div
                    className={`flex items-center gap-2 text-[10px] font-mono text-[#777777] ${
                      msg.sender === 'athlete' ? 'justify-end' : ''
                    }`}
                  >
                    <span>{msg.senderName}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                      msg.sender === 'athlete'
                        ? 'bg-white text-black font-medium'
                        : 'bg-[#171717] border border-[#242424] text-white'
                    }`}
                  >
                    {msg.content}

                    {msg.telemetryCard && (
                      <div className="mt-3 p-3 bg-[#0A0A0A] border border-[#4A4A4A] rounded-lg text-white font-mono">
                        <div className="text-[10px] uppercase text-[#777777] tracking-wider">
                          {msg.telemetryCard.metric}
                        </div>
                        <div className="text-sm font-bold text-white my-1">{msg.telemetryCard.value}</div>
                        <div className="text-[10px] text-[#BDBDBD] font-semibold">
                          {msg.telemetryCard.status}
                        </div>
                        <div className="text-[10px] text-[#777777] mt-1 font-sans">
                          {msg.telemetryCard.detail}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Composer */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-[#242424] bg-[#0A0A0A] flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAttachTelemetry}
                className="px-2.5 py-1.5 bg-[#171717] border border-[#242424] text-[11px] font-mono text-[#BDBDBD] rounded hover:border-white transition-all flex items-center gap-1.5"
                title="Attach live telemetry snapshot"
              >
                <span className="material-symbols-outlined text-sm text-white">monitoring</span>
                Attach Telemetry Card
              </button>
              <span className="text-[10px] font-mono text-[#777777]">Press Enter to dispatch</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Message Coach Marcus Vance or attach telemetry..."
                className="flex-1 bg-[#111111] border border-[#242424] rounded-lg px-4 py-2.5 text-xs text-white placeholder-[#777777] focus:outline-none focus:border-white"
              />

              <button
                type="submit"
                className="px-5 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#E5E2E1] transition-all flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-base">send</span>
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
