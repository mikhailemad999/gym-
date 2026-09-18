'use client';

import { useState } from 'react';

const initialProducts = [
  {
    id: 'p-1',
    name: 'Hydrolyzed Whey Isolate 95%',
    category: 'Protein & Peptides',
    price: 68.0,
    stock: 142,
    batch: 'BATCH-2026-X4 (WADA TESTED)',
    status: 'IN_STOCK',
  },
  {
    id: 'p-2',
    name: 'Creapure Micronized Creatine',
    category: 'Creatine & ATP',
    price: 34.0,
    stock: 89,
    batch: 'BATCH-2026-C9 (99.9% HPLC)',
    status: 'IN_STOCK',
  },
  {
    id: 'p-3',
    name: 'Intra-Workout High-Electrolyte Matrix',
    category: 'Electrolytes & Hydration',
    price: 42.0,
    stock: 64,
    batch: 'BATCH-2026-E1 (ISO 17025)',
    status: 'IN_STOCK',
  },
  {
    id: 'p-4',
    name: 'Alpha-GPC + L-Tyrosine Neuro-Drive',
    category: 'Nootropics & Focus',
    price: 54.0,
    stock: 31,
    batch: 'BATCH-2026-N2 (CERTIFIED)',
    status: 'LOW_STOCK',
  },
  {
    id: 'p-5',
    name: 'Zinc Bisglycinate + Magnesium L-Threonate',
    category: 'Recovery & Sleep',
    price: 48.0,
    stock: 110,
    batch: 'BATCH-2026-Z8 (VERIFIED)',
    status: 'IN_STOCK',
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Protein & Peptides');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [batchId, setBatchId] = useState('BATCH-2026-N9 (WADA)');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const newProd = {
      id: `p-${Date.now()}`,
      name,
      category,
      price: parseFloat(price),
      stock: parseInt(stock) || 40,
      batch: batchId || 'BATCH-2026-NEW',
      status: 'IN_STOCK',
    };

    setProducts([newProd, ...products]);
    setShowModal(false);
    setName('');
    setPrice('');
    setStock('');
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#242424] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#777777]">
              ADMIN CONSOLE // DISPENSARY STOCK MANAGEMENT
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            Performance Formulations & Catalog
          </h1>
          <p className="text-sm text-[#777777] mt-1">
            Publish pharmaceutical-grade supplements, manage inventory thresholds, and verify WADA compliance certificates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#E5E2E1] transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            Add New Formulation
          </button>
        </div>
      </div>

      {/* Modal / Form overlay if open */}
      {showModal && (
        <div className="p-6 bg-[#111111] border border-white rounded-xl shadow-2xl flex flex-col gap-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-[#242424] pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-base">science</span>
              Register New Dispensary Formulation
            </h3>
            <button
              onClick={() => setShowModal(false)}
              className="text-[#777777] hover:text-white text-xs font-mono"
            >
              Cancel ✕
            </button>
          </div>

          <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] uppercase font-mono text-[#777777] mb-1">Formulation Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Micellar Casein Sustained-Release"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-mono text-[#777777] mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-white font-mono"
              >
                <option value="Protein & Peptides">Protein & Peptides</option>
                <option value="Creatine & ATP">Creatine & ATP</option>
                <option value="Electrolytes & Hydration">Electrolytes & Hydration</option>
                <option value="Nootropics & Focus">Nootropics & Focus</option>
                <option value="Recovery & Sleep">Recovery & Sleep</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-mono text-[#777777] mb-1">Unit Price ($ USD)</label>
              <input
                type="number"
                step="0.01"
                required
                placeholder="49.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-white font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-mono text-[#777777] mb-1">Stock Count</label>
              <input
                type="number"
                required
                placeholder="100"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-white font-mono"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-[11px] uppercase font-mono text-[#777777] mb-1">
                Batch Verification Certification
              </label>
              <input
                type="text"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#242424] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-white font-mono"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#E5E2E1] transition-all"
              >
                Save Formulation
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Catalog Table */}
      <div className="bg-[#111111] border border-[#242424] rounded-xl overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#242424] text-[10px] font-mono uppercase text-[#777777] bg-[#0E0E0E]">
                <th className="p-4">Formulation Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price ($ USD)</th>
                <th className="p-4">Inventory Available</th>
                <th className="p-4">Batch Testing</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171717] text-xs">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-[#171717] transition-colors">
                  <td className="p-4 font-bold text-white text-sm">{p.name}</td>
                  <td className="p-4 text-[#BDBDBD] font-mono text-[11px]">{p.category}</td>
                  <td className="p-4 text-white font-mono font-bold">${p.price.toFixed(2)}</td>
                  <td className="p-4 text-white font-mono">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        p.stock < 50
                          ? 'bg-[#171717] text-[#ffb4ab] border border-[#ffb4ab]/30'
                          : 'bg-[#0A0A0A] text-white border border-[#242424]'
                      }`}
                    >
                      {p.stock} Units
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[10px] text-white">
                    <span className="px-2 py-0.5 rounded bg-[#171717] border border-[#4A4A4A]">
                      {p.batch}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-[#777777] hover:text-[#ffb4ab] text-xs font-mono uppercase transition-colors"
                    >
                      Delist
                    </button>
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
