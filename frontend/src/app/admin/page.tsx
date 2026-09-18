'use client';

import Link from 'next/link';

export default function AdminOverviewPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#242424] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#777777]">
              OPERATIONS CONSOLE // CLUSTER TELEMETRY OVERVIEW
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            System Operations Matrix
          </h1>
          <p className="text-sm text-[#777777] mt-1">
            Real-time infrastructure performance, athlete enrollment velocity, and microservices health.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 bg-[#171717] border border-[#242424] rounded-lg text-xs font-mono text-[#BDBDBD] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-white">shield</span>
            SUPER ADMIN ACCESS ACTIVE
          </div>
        </div>
      </div>

      {/* Cluster KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111111] border border-[#242424] rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[11px] uppercase tracking-wider text-[#777777]">Active Registered Users</span>
          <span className="text-2xl font-bold text-white mt-2">1,482</span>
          <span className="text-[11px] text-[#BDBDBD] mt-1">+14% Growth This Cycle</span>
        </div>
        <div className="bg-[#111111] border border-[#242424] rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[11px] uppercase tracking-wider text-[#777777]">Monthly Telemetry ARR</span>
          <span className="text-2xl font-bold text-white mt-2">$218,400</span>
          <span className="text-[11px] text-white mt-1 font-semibold">96.2% Retention</span>
        </div>
        <div className="bg-[#111111] border border-[#242424] rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[11px] uppercase tracking-wider text-[#777777]">Cluster API Latency</span>
          <span className="text-2xl font-bold text-white mt-2">42ms</span>
          <span className="text-[11px] text-[#BDBDBD] mt-1">NestJS / TypeORM Redis</span>
        </div>
        <div className="bg-[#111111] border border-[#242424] rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[11px] uppercase tracking-wider text-[#777777]">Telemetry Uptime</span>
          <span className="text-2xl font-bold text-white mt-2">99.98%</span>
          <span className="text-[11px] text-white mt-1 font-semibold">Healthy High-Availability</span>
        </div>
      </div>

      {/* Main Sections: Modular Gateway Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/users"
          className="bg-[#111111] border border-[#242424] rounded-xl p-6 flex flex-col justify-between hover:border-[#4A4A4A] transition-all group"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#171717] border border-[#242424] flex items-center justify-center text-white mb-4 group-hover:border-white transition-colors">
              <span className="material-symbols-outlined text-xl">group</span>
            </div>
            <h2 className="text-base font-bold uppercase tracking-wide text-white">User Directory & Roles</h2>
            <p className="text-xs text-[#777777] mt-1.5 leading-relaxed">
              Manage client bio-profiles, calibrate coach assignments, and enforce granular RBAC permissions.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#242424] flex items-center justify-between text-xs font-mono text-[#BDBDBD] group-hover:text-white">
            <span>1,482 Athletes & Staff</span>
            <span>Launch Directory →</span>
          </div>
        </Link>

        <Link
          href="/admin/products"
          className="bg-[#111111] border border-[#242424] rounded-xl p-6 flex flex-col justify-between hover:border-[#4A4A4A] transition-all group"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#171717] border border-[#242424] flex items-center justify-center text-white mb-4 group-hover:border-white transition-colors">
              <span className="material-symbols-outlined text-xl">inventory_2</span>
            </div>
            <h2 className="text-base font-bold uppercase tracking-wide text-white">Dispensary Formulations</h2>
            <p className="text-xs text-[#777777] mt-1.5 leading-relaxed">
              Monitor supplement stock levels, publish new clinical formulations, and audit WADA batch testing.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#242424] flex items-center justify-between text-xs font-mono text-[#BDBDBD] group-hover:text-white">
            <span>28 Active SKUs</span>
            <span>Manage Inventory →</span>
          </div>
        </Link>

        <Link
          href="/admin/audit"
          className="bg-[#111111] border border-[#242424] rounded-xl p-6 flex flex-col justify-between hover:border-[#4A4A4A] transition-all group"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#171717] border border-[#242424] flex items-center justify-center text-white mb-4 group-hover:border-white transition-colors">
              <span className="material-symbols-outlined text-xl">security</span>
            </div>
            <h2 className="text-base font-bold uppercase tracking-wide text-white">Cryptographic Audit Logs</h2>
            <p className="text-xs text-[#777777] mt-1.5 leading-relaxed">
              Real-time immutable event log tracking auth tokens, intervention injections, and database migrations.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#242424] flex items-center justify-between text-xs font-mono text-[#BDBDBD] group-hover:text-white">
            <span>SHA-256 Verified</span>
            <span>Inspect Logs →</span>
          </div>
        </Link>
      </div>

      {/* Infrastructure Diagnostics Card */}
      <div className="bg-[#111111] border border-[#242424] rounded-xl p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#242424] pb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-base">dns</span>
            Production Cluster Health & Daemon Heartbeats
          </h3>
          <span className="text-[11px] font-mono text-white">ALL SYSTEMS OPTIMAL</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-3.5 bg-[#0A0A0A] border border-[#242424] rounded-lg">
            <span className="text-[10px] font-mono uppercase text-[#777777] block mb-1">Primary Database</span>
            <span className="text-xs font-bold text-white block">MySQL 8.0 (Port 3305)</span>
            <span className="text-[10px] font-mono text-[#BDBDBD] mt-1 block">Connection Pool: 12/50 Active</span>
          </div>

          <div className="p-3.5 bg-[#0A0A0A] border border-[#242424] rounded-lg">
            <span className="text-[10px] font-mono uppercase text-[#777777] block mb-1">In-Memory Cache</span>
            <span className="text-xs font-bold text-white block">Redis 7 (Port 6379)</span>
            <span className="text-[10px] font-mono text-[#BDBDBD] mt-1 block">Telemetry Cache Hit Rate: 98.4%</span>
          </div>

          <div className="p-3.5 bg-[#0A0A0A] border border-[#242424] rounded-lg">
            <span className="text-[10px] font-mono uppercase text-[#777777] block mb-1">WebSocket Gateway</span>
            <span className="text-xs font-bold text-white block">Socket.io Telemetry</span>
            <span className="text-[10px] font-mono text-[#BDBDBD] mt-1 block">184 Live Active Channels</span>
          </div>

          <div className="p-3.5 bg-[#0A0A0A] border border-[#242424] rounded-lg">
            <span className="text-[10px] font-mono uppercase text-[#777777] block mb-1">AI Copilot Engine</span>
            <span className="text-xs font-bold text-white block">Gen-3 Bio-Programming</span>
            <span className="text-[10px] font-mono text-[#BDBDBD] mt-1 block">Latency: 280ms P95</span>
          </div>
        </div>
      </div>
    </div>
  );
}
