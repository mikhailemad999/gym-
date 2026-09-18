'use client';

import { useState } from 'react';

const usersList = [
  {
    id: 'u-1',
    name: 'Mikhail R.',
    email: 'mikhail@athletecare.pro',
    role: 'Client',
    status: 'ACTIVE',
    telemetry: 'Syncing (99.8%)',
    tier: 'Tier 1 Pro',
    mesocycle: 'Hypertrophy & Strength (W6)',
  },
  {
    id: 'u-2',
    name: 'Marcus Vance',
    email: 'vance.cscs@athletecare.pro',
    role: 'Coach',
    status: 'ACTIVE',
    telemetry: 'CSCS Verified',
    tier: 'Staff Admin',
    mesocycle: 'Head Biomechanics Spec.',
  },
  {
    id: 'u-3',
    name: 'Sarah Jenkins',
    email: 'sarah.msc@athletecare.pro',
    role: 'Nutritionist',
    status: 'ACTIVE',
    telemetry: 'MSc Clinical',
    tier: 'Staff Admin',
    mesocycle: 'Aerobic & Fueling Spec.',
  },
  {
    id: 'u-4',
    name: 'David Zhao',
    email: 'david.oly@athletecare.pro',
    role: 'Coach',
    status: 'ACTIVE',
    telemetry: 'Olympic Staff',
    tier: 'Staff Admin',
    mesocycle: 'Olympic Weightlifting',
  },
  {
    id: 'u-5',
    name: 'Elena Rostova',
    email: 'elena@athletecare.pro',
    role: 'Client',
    status: 'ACTIVE',
    telemetry: 'Syncing (98.4%)',
    tier: 'Tier 2 Elite',
    mesocycle: 'Mobility & Power (Phase 1)',
  },
  {
    id: 'u-6',
    name: 'Marcus Thorne',
    email: 'thorne.sprint@athletecare.pro',
    role: 'Client',
    status: 'ACTIVE',
    telemetry: 'Syncing (99.1%)',
    tier: 'Tier 1 Pro',
    mesocycle: 'Max Velocity Sprint Block',
  },
];

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [users, setUsers] = useState(usersList);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    setSuccessMsg(`Role updated to ${newRole} for user ${userId}. Permissions synced.`);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#242424] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#777777]">
              ADMIN CONSOLE // RBAC ROLE CALIBRATION
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            User Directory & Permissions
          </h1>
          <p className="text-sm text-[#777777] mt-1">
            Audit athlete accounts, assign coaching privileges, and manage security authorizations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 bg-[#111111] border border-[#242424] rounded-lg text-xs font-mono text-white">
            {filteredUsers.length} Users Listed
          </span>
        </div>
      </div>

      {successMsg && (
        <div className="p-3.5 bg-[#171717] border border-white rounded-lg flex items-center gap-2.5 text-xs text-white animate-fade-in font-mono">
          <span className="material-symbols-outlined text-base">verified</span>
          {successMsg}
        </div>
      )}

      {/* Directory Table Card */}
      <div className="bg-[#111111] border border-[#242424] rounded-xl overflow-hidden flex flex-col">
        {/* Filter Bar */}
        <div className="p-4 border-b border-[#242424] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0A0A0A]">
          <div className="flex items-center gap-2">
            {['ALL', 'Client', 'Coach', 'Nutritionist', 'Admin'].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                  roleFilter === role
                    ? 'bg-white text-black font-bold'
                    : 'bg-[#111111] border border-[#242424] text-[#777777] hover:text-white'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search by name, email, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#111111] border border-[#242424] rounded-lg px-3.5 py-2 text-xs text-white placeholder-[#777777] focus:outline-none focus:border-white w-full sm:w-72 font-mono"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#242424] text-[10px] font-mono uppercase text-[#777777] bg-[#0E0E0E]">
                <th className="p-4">Athlete / Staff Identity</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Protocol Tier</th>
                <th className="p-4">Active Mesocycle</th>
                <th className="p-4">Telemetry Status</th>
                <th className="p-4 text-right">RBAC Role Calibration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171717] text-xs">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-[#171717] transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{u.name}</div>
                    <div className="text-[11px] font-mono text-[#777777]">{u.email}</div>
                  </td>
                  <td className="p-4">
                    <span className="font-mono px-2 py-0.5 rounded text-[10px] bg-[#0A0A0A] border border-[#242424] text-white">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-[#BDBDBD] font-mono text-[11px]">{u.tier}</td>
                  <td className="p-4 text-[#777777] text-xs font-medium">{u.mesocycle}</td>
                  <td className="p-4 text-white font-mono text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      {u.telemetry}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="bg-[#0A0A0A] border border-[#4A4A4A] text-white text-xs rounded px-2.5 py-1.5 focus:outline-none focus:border-white font-mono"
                    >
                      <option value="Client">Client (Athlete)</option>
                      <option value="Coach">Coach (CSCS Staff)</option>
                      <option value="Nutritionist">Nutritionist</option>
                      <option value="Store Manager">Store Manager</option>
                      <option value="Admin">Super Admin</option>
                    </select>
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
