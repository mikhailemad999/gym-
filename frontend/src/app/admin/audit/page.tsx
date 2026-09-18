'use client';

import { useState } from 'react';

const initialLogs = [
  {
    id: 'log-1',
    timestamp: '2026-10-24 11:42:01 EST',
    user: 'SuperAdmin // system_root',
    action: 'ROLE_UPDATE',
    details: 'Elevated Marcus Vance to Senior Coach & Telemetry Lead',
    ip: '192.168.115.1',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    severity: 'INFO',
  },
  {
    id: 'log-2',
    timestamp: '2026-10-24 10:15:33 EST',
    user: 'System / OrderService',
    action: 'ORDER_FULFILLMENT',
    details: 'Dispatched Order #884-MKR to courier fulfillment (Tracking: ACP-9921)',
    ip: '10.0.4.12',
    hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    severity: 'INFO',
  },
  {
    id: 'log-3',
    timestamp: '2026-10-24 08:30:12 EST',
    user: 'Security / AuthService',
    action: 'TOKEN_REFRESH',
    details: 'Rotated JWT refresh token for client ID: 884-MKR from 192.168.115.1',
    ip: '192.168.115.1',
    hash: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
    severity: 'INFO',
  },
  {
    id: 'log-4',
    timestamp: '2026-10-23 22:11:45 EST',
    user: 'CoachService / Vance',
    action: 'INTERVENTION_INJECT',
    details: 'Injected 48-hr recovery protocol for athlete Sarah Jenkins (HRV -14% suppression)',
    ip: '172.16.0.8',
    hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    severity: 'WARN',
  },
  {
    id: 'log-5',
    timestamp: '2026-10-23 18:04:19 EST',
    user: 'System / DatabaseService',
    action: 'MIGRATION_EXECUTE',
    details: 'Applied TypeORM schema synchronization for appointments and subscriptions tables',
    ip: 'localhost:3305',
    hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    severity: 'INFO',
  },
];

export default function AdminAuditPage() {
  const [filter, setFilter] = useState('ALL');

  const filteredLogs = initialLogs.filter((log) => {
    if (filter === 'ALL') return true;
    return log.severity === filter;
  });

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#242424] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#777777]">
              ADMIN CONSOLE // CRYPTOGRAPHIC AUDIT ARCHIVES
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            Immutable System Audit Trail
          </h1>
          <p className="text-sm text-[#777777] mt-1">
            Tamper-proof event logs recording authentication lifecycle, role modifications, and bio-interventions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'INFO', 'WARN'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilter(sev)}
              className={`px-3 py-1.5 rounded text-xs font-semibold font-mono uppercase transition-all ${
                filter === sev
                  ? 'bg-white text-black font-bold'
                  : 'bg-[#111111] border border-[#242424] text-[#777777] hover:text-white'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-[#111111] border border-[#242424] rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-[#242424] flex items-center justify-between bg-[#0A0A0A]">
          <span className="text-xs font-mono uppercase text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-base">verified</span>
            SHA-256 Verified Ledger ({filteredLogs.length} Events)
          </span>
          <span className="text-[11px] font-mono text-[#777777]">ZERO INTEGRITY VIOLATIONS DETECTED</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#242424] text-[10px] font-mono uppercase text-[#777777] bg-[#0E0E0E]">
                <th className="p-4">Timestamp</th>
                <th className="p-4">Origin / Actor</th>
                <th className="p-4">Event Type</th>
                <th className="p-4">Action Summary</th>
                <th className="p-4">Cryptographic Hash</th>
                <th className="p-4 text-right">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171717] text-xs font-mono">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#171717] transition-colors">
                  <td className="p-4 text-[#777777] text-[11px] whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-4 text-white font-bold whitespace-nowrap">
                    <div>{log.user}</div>
                    <div className="text-[10px] text-[#777777]">{log.ip}</div>
                  </td>
                  <td className="p-4 text-[#BDBDBD] whitespace-nowrap">{log.action}</td>
                  <td className="p-4 text-[#BDBDBD] font-sans max-w-sm">{log.details}</td>
                  <td className="p-4 text-[10px] text-[#777777] truncate max-w-[120px]" title={log.hash}>
                    {log.hash.substring(0, 16)}...
                  </td>
                  <td className="p-4 text-right">
                    <span
                      className={`text-[10px] px-2.5 py-1 rounded font-bold ${
                        log.severity === 'WARN'
                          ? 'bg-white text-black'
                          : 'bg-[#171717] border border-[#4A4A4A] text-[#BDBDBD]'
                      }`}
                    >
                      {log.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
