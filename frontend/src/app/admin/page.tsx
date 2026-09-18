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
  },
  {
    id: 'u-2',
    name: 'Marcus Vance',
    email: 'vance.cscs@athletecare.pro',
    role: 'Coach',
    status: 'ACTIVE',
    telemetry: 'CSCS Verified',
    tier: 'Staff Admin',
  },
  {
    id: 'u-3',
    name: 'Sarah Jenkins',
    email: 'sarah.msc@athletecare.pro',
    role: 'Nutritionist',
    status: 'ACTIVE',
    telemetry: 'MSc Clinical',
    tier: 'Staff Admin',
  },
  {
    id: 'u-4',
    name: 'David Zhao',
    email: 'david.oly@athletecare.pro',
    role: 'Coach',
    status: 'ACTIVE',
    telemetry: 'Olympic Staff',
    tier: 'Staff Admin',
  },
  {
    id: 'u-5',
    name: 'Elena Rostova',
    email: 'elena@athletecare.pro',
    role: 'Client',
    status: 'ACTIVE',
    telemetry: 'Syncing (98.4%)',
    tier: 'Tier 2 Elite',
  },
];

const productsList = [
  {
    id: 'p-1',
    name: 'Hydrolyzed Whey Isolate 95%',
    category: 'Protein & Peptides',
    price: 68.0,
    stock: 142,
    batch: 'BATCH-2026-X4 (WADA TESTED)',
  },
  {
    id: 'p-2',
    name: 'Creapure Micronized Creatine',
    category: 'Creatine & ATP',
    price: 34.0,
    stock: 89,
    batch: 'BATCH-2026-C9 (99.9% HPLC)',
  },
  {
    id: 'p-3',
    name: 'Intra-Workout High-Electrolyte Matrix',
    category: 'Electrolytes & Hydration',
    price: 42.0,
    stock: 64,
    batch: 'BATCH-2026-E1 (ISO 17025)',
  },
  {
    id: 'p-4',
    name: 'Alpha-GPC + L-Tyrosine Neuro-Drive',
    category: 'Nootropics & Focus',
    price: 54.0,
    stock: 31,
    batch: 'BATCH-2026-N2 (CERTIFIED)',
  },
];

const auditLogs = [
  {
    id: 'log-1',
    timestamp: '2026-10-24 11:42:01 EST',
    user: 'SuperAdmin // system_root',
    action: 'ROLE_UPDATE',
    details: 'Elevated Marcus Vance to Senior Coach & Telemetry Lead',
    severity: 'INFO',
  },
  {
    id: 'log-2',
    timestamp: '2026-10-24 10:15:33 EST',
    user: 'System / OrderService',
    action: 'ORDER_FULFILLMENT',
    details: 'Dispatched Order #884-MKR to courier fulfillment (Tracking: ACP-9921)',
    severity: 'INFO',
  },
  {
    id: 'log-3',
    timestamp: '2026-10-24 08:30:12 EST',
    user: 'Security / AuthService',
    action: 'TOKEN_REFRESH',
    details: 'Rotated JWT refresh token for client ID: 884-MKR from 192.168.115.1',
    severity: 'INFO',
  },
  {
    id: 'log-4',
    timestamp: '2026-10-23 22:11:45 EST',
    user: 'CoachService / Vance',
    action: 'INTERVENTION_INJECT',
    details: 'Injected 48-hr recovery protocol for athlete Sarah Jenkins (HRV -14% suppression)',
    severity: 'WARN',
  },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'store' | 'audit'>('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(usersList);
  const [products, setProducts] = useState(productsList);

  // New product form
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Protein & Peptides');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductStock, setNewProductStock] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice) return;

    const newProd = {
      id: `p-${Date.now()}`,
      name: newProductName,
      category: newProductCategory,
      price: parseFloat(newProductPrice),
      stock: parseInt(newProductStock) || 50,
      batch: 'BATCH-2026-NEW (VERIFIED)',
    };

    setProducts([newProd, ...products]);
    setShowAddProduct(false);
    setNewProductName('');
    setNewProductPrice('');
    setNewProductStock('');
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#242424] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#777777]">
              OPERATIONS CONSOLE // ROOT SECURITY MATRIX
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            System Administration
          </h1>
          <p className="text-sm text-[#777777] mt-1">
            Enterprise management for user permissions, e-commerce dispensary inventory, and security audit telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 bg-[#171717] border border-[#242424] rounded-lg text-xs font-mono text-[#BDBDBD] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-white">shield</span>
            SUPER ADMIN AUTHORIZATION
          </div>
        </div>
      </div>

      {/* System KPI Strip */}
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

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#242424] pb-2">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-lg ${
            activeTab === 'users' ? 'bg-white text-black' : 'text-[#777777] hover:text-white'
          }`}
        >
          User Directory & Roles
        </button>
        <button
          onClick={() => setActiveTab('store')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-lg ${
            activeTab === 'store' ? 'bg-white text-black' : 'text-[#777777] hover:text-white'
          }`}
        >
          Dispensary Catalog & Stock
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-lg ${
            activeTab === 'audit' ? 'bg-white text-black' : 'text-[#777777] hover:text-white'
          }`}
        >
          System Audit Logs
        </button>
      </div>

      {/* Tab 1: Users */}
      {activeTab === 'users' && (
        <div className="bg-[#111111] border border-[#242424] rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-[#242424] flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Athletic Roster & Staff Directory ({users.length})
            </span>
            <input
              type="text"
              placeholder="Search athlete by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#0A0A0A] border border-[#242424] rounded-lg px-3 py-1.5 text-xs text-white placeholder-[#777777] focus:outline-none focus:border-white w-64"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#242424] text-[10px] font-mono uppercase text-[#777777]">
                  <th className="p-4">User</th>
                  <th className="p-4">Assigned Role</th>
                  <th className="p-4">Tier Status</th>
                  <th className="p-4">Live Telemetry</th>
                  <th className="p-4 text-right">Role Calibration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171717] text-xs">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-[#171717] transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white">{u.name}</div>
                      <div className="text-[11px] font-mono text-[#777777]">{u.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="font-mono px-2 py-0.5 rounded text-[10px] bg-[#0A0A0A] border border-[#242424] text-white">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 text-[#BDBDBD] font-mono text-[11px]">{u.tier}</td>
                    <td className="p-4 text-white font-mono text-[11px]">{u.telemetry}</td>
                    <td className="p-4 text-right">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="bg-[#0A0A0A] border border-[#242424] text-white text-xs rounded px-2 py-1 focus:outline-none focus:border-white font-mono"
                      >
                        <option value="Client">Client</option>
                        <option value="Coach">Coach</option>
                        <option value="Nutritionist">Nutritionist</option>
                        <option value="Store Manager">Store Manager</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Store */}
      {activeTab === 'store' && (
        <div className="bg-[#111111] border border-[#242424] rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-[#242424] flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Performance Dispensary Formulations ({products.length})
            </span>
            <button
              onClick={() => setShowAddProduct(!showAddProduct)}
              className="px-3 py-1.5 bg-white text-black text-xs font-bold uppercase tracking-wider rounded hover:bg-[#E5E2E1] transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              {showAddProduct ? 'Close Form' : 'Add New Formulation'}
            </button>
          </div>

          {showAddProduct && (
            <form onSubmit={handleAddProduct} className="p-5 bg-[#0A0A0A] border-b border-[#242424] grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-mono text-[#777777] mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zinc Bisglycinate 30mg"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full bg-[#111111] border border-[#242424] rounded p-2 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-mono text-[#777777] mb-1">Category</label>
                <select
                  value={newProductCategory}
                  onChange={(e) => setNewProductCategory(e.target.value)}
                  className="w-full bg-[#111111] border border-[#242424] rounded p-2 text-xs text-white focus:outline-none focus:border-white"
                >
                  <option value="Protein & Peptides">Protein & Peptides</option>
                  <option value="Creatine & ATP">Creatine & ATP</option>
                  <option value="Electrolytes & Hydration">Electrolytes & Hydration</option>
                  <option value="Nootropics & Focus">Nootropics & Focus</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-mono text-[#777777] mb-1">Unit Price ($ USD)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="39.00"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className="w-full bg-[#111111] border border-[#242424] rounded p-2 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded hover:bg-[#E5E2E1] transition-all"
                >
                  Save to Catalog
                </button>
              </div>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#242424] text-[10px] font-mono uppercase text-[#777777]">
                  <th className="p-4">Formulation Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Inventory Available</th>
                  <th className="p-4 text-right">Batch Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171717] text-xs">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#171717] transition-colors">
                    <td className="p-4 font-bold text-white">{p.name}</td>
                    <td className="p-4 text-[#BDBDBD] font-mono text-[11px]">{p.category}</td>
                    <td className="p-4 text-white font-mono font-bold">${p.price.toFixed(2)}</td>
                    <td className="p-4 text-white font-mono">{p.stock} Units</td>
                    <td className="p-4 text-right font-mono text-[10px] text-white">
                      <span className="px-2 py-0.5 rounded bg-[#171717] border border-[#4A4A4A]">
                        {p.batch}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Audit Logs */}
      {activeTab === 'audit' && (
        <div className="bg-[#111111] border border-[#242424] rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-[#242424] flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Immutable System Audit Logs ({auditLogs.length})
            </span>
            <span className="text-[11px] font-mono text-[#777777]">CRYPTOGRAPHIC INTEGRITY: SHA-256</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#242424] text-[10px] font-mono uppercase text-[#777777]">
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Actor</th>
                  <th className="p-4">Event Type</th>
                  <th className="p-4">Action Summary</th>
                  <th className="p-4 text-right">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171717] text-xs font-mono">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#171717] transition-colors">
                    <td className="p-4 text-[#777777] text-[11px]">{log.timestamp}</td>
                    <td className="p-4 text-white font-bold">{log.user}</td>
                    <td className="p-4 text-[#BDBDBD]">{log.action}</td>
                    <td className="p-4 text-[#777777] font-sans">{log.details}</td>
                    <td className="p-4 text-right">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded ${
                          log.severity === 'WARN'
                            ? 'bg-white text-black font-bold'
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
      )}
    </div>
  );
}
