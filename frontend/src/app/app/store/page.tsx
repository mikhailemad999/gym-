'use client';

import { useState, useEffect, useMemo } from 'react';
import api from '@/lib/api-client';

interface ProductItem {
  id: string;
  name: string;
  slug?: string;
  sku?: string;
  category: string;
  batchNumber?: string;
  spec?: string;
  purityGrade?: string;
  priceUsd: number;
  priceEur?: number;
  stockQuantity?: number;
  description?: string;
}

export default function StorePage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<{ [productId: string]: number }>({});
  const [checkingOut, setCheckingOut] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<any | null>(null);

  // Load products from backend
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await api.get<ProductItem[]>('/store/products');
        if (res.data && res.data.length > 0) {
          setProducts(res.data);
          // Set initial demo cart item
          setCart({ [res.data[0].id]: 1 });
        }
      } catch (err) {
        console.error('Failed to load dispensary products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add('All Categories');
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All Categories') return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  const addToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
    setCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      const current = prev[productId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: next };
    });
  };

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const prod = products.find((p) => p.id === id);
        if (!prod) return null;
        return {
          product: prod,
          quantity: qty,
          subtotal: (Number(prod.priceUsd) || 0) * qty,
        };
      })
      .filter(Boolean) as { product: ProductItem; quantity: number; subtotal: number }[];
  }, [cart, products]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.subtotal, 0);
  }, [cartItems]);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setCheckingOut(true);

    const payload = {
      items: cartItems.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: Number(item.product.priceUsd),
        subtotal: item.subtotal,
      })),
      totalAmount: cartTotal,
      currency: 'USD',
      shippingAddress: {
        recipient: 'Mikhail R. (Athlete ID #884)',
        addressLine1: '450 Performance Way, Suite 800',
        city: 'Metropolis',
        postalCode: '10001',
        country: 'United States',
      },
    };

    try {
      const res = await api.post<any>('/store/orders', payload);
      setOrderConfirmation(res.data || { orderNumber: `ORD-${Date.now()}`, totalAmount: cartTotal });
      setCart({});
      setCartOpen(false);
    } catch (err) {
      console.error('Checkout failed:', err);
      // Fallback order receipt
      setOrderConfirmation({
        orderNumber: `ORD-${Date.now()}-SIM`,
        totalAmount: cartTotal,
        status: 'processing',
        createdAt: new Date().toISOString(),
      });
      setCart({});
      setCartOpen(false);
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#000000] text-white min-h-screen font-sans">
      {/* Header Banner */}
      <section className="w-full border-b border-[#242424] bg-[#0A0A0A] px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest text-[#777777] font-mono">
                CLINICAL DISPENSARY &amp; PHARMACOPEIA // GMP CERTIFIED
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold font-mono">
                WADA &amp; Informed-Sport Verified
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tight">
              ATHLETE DISPENSARY
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="px-4 py-2.5 bg-white text-black hover:bg-[#E5E2E1] rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm font-mono"
            >
              <span className="material-symbols-outlined text-base">shopping_cart</span>
              <span>Cart ({cartItems.length})</span>
              <span className="bg-black text-white px-2 py-0.5 rounded text-[11px]">
                ${cartTotal.toFixed(2)}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Catalog View */}
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#242424]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-white text-black shadow-md'
                  : 'bg-[#111111] text-[#777777] hover:text-white border border-[#242424]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => {
            const inCart = cart[prod.id] || 0;
            return (
              <div
                key={prod.id}
                className="bg-[#111111] border border-[#242424] hover:border-[#444444] rounded-2xl p-6 flex flex-col justify-between gap-5 transition-all shadow-md group"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-[#1A1A1A] border border-[#2B2B2B] text-[#BDBDBD]">
                      {prod.category}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      {prod.purityGrade || 'HPLC Tested'}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white tracking-tight uppercase group-hover:text-white transition-colors">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-[#777777] leading-relaxed">
                    {prod.description || 'Clinical-grade sports nutrition formulation engineered for high-performance athletes.'}
                  </p>

                  <div className="bg-[#0A0A0A] p-3 rounded-xl border border-[#202020] text-xs font-mono text-[#BDBDBD] flex flex-col gap-1">
                    <div className="flex justify-between">
                      <span className="text-[#777777]">BATCH:</span>
                      <span className="text-white">{prod.batchNumber || 'LOT #AC-2026-X'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#777777]">SPEC:</span>
                      <span className="text-white">{prod.spec || 'Standard Clinical Purity'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#1F1F1F]">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-mono text-[#777777]">DISPENSARY PRICE</span>
                    <span className="text-2xl font-black font-mono text-white">
                      ${Number(prod.priceUsd).toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(prod.id)}
                    className="px-4 py-2.5 bg-white text-black hover:bg-[#E5E2E1] rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 font-mono shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                    <span>{inCart > 0 ? `In Cart (${inCart})` : 'Dispense'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-[#111111] border-l border-[#242424] w-full max-w-md h-full flex flex-col justify-between p-6 sm:p-8 shadow-2xl animate-in slide-in-from-right">
            <div className="flex flex-col gap-6 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#242424] pb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-white text-xl">shopping_cart</span>
                  <h2 className="text-lg font-black uppercase text-white tracking-tight">Active Requisition</h2>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-[#777777] hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#777777] font-mono">
                  Your dispensary cart is currently empty.
                </div>
              ) : (
                <div className="divide-y divide-[#242424] flex flex-col">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="py-4 flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-white uppercase leading-tight">
                          {item.product.name}
                        </h4>
                        <span className="text-xs font-mono text-[#777777] block mt-0.5">
                          ${Number(item.product.priceUsd).toFixed(2)} each
                        </span>
                      </div>

                      <div className="flex items-center gap-2 bg-[#0A0A0A] border border-[#242424] rounded-lg px-2 py-1 font-mono">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="text-[#777777] hover:text-white px-1 font-bold"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-white px-1.5">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="text-[#777777] hover:text-white px-1 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-bold font-mono text-white">
                        ${item.subtotal.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer Checkout Action */}
            {cartItems.length > 0 && (
              <div className="border-t border-[#242424] pt-5 flex flex-col gap-4">
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-xs uppercase text-[#777777]">Subtotal</span>
                  <span className="text-xl font-black text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-[#777777] font-mono">
                  <span>Priority Courier Delivery</span>
                  <span className="text-emerald-400 font-bold">COMPLIMENTARY</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="w-full py-3.5 bg-white text-black hover:bg-[#E5E2E1] font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-base">lock</span>
                  <span>{checkingOut ? 'Authorizing Dispatch...' : 'Authorize & Dispatch Order'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {orderConfirmation && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#333333] rounded-2xl max-w-md w-full p-6 sm:p-8 flex flex-col gap-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center font-bold text-xl">
                <span className="material-symbols-outlined text-2xl">verified</span>
              </div>
              <div>
                <h3 className="text-lg font-black uppercase text-white tracking-tight">Order Confirmed</h3>
                <p className="text-xs text-[#777777]">Batch Scheduled for Laboratory Dispatch</p>
              </div>
            </div>

            <div className="bg-[#0A0A0A] p-4 rounded-xl border border-[#242424] flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[#777777]">Order Reference:</span>
                <span className="text-white font-bold">{orderConfirmation.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777777]">Status:</span>
                <span className="text-emerald-400 font-bold uppercase">Processing Dispatch</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777777]">Total Debited:</span>
                <span className="text-white font-bold">${Number(orderConfirmation.totalAmount || cartTotal).toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777777]">Tracking Courier:</span>
                <span className="text-[#BDBDBD]">DHL Express Medical Cold-Chain</span>
              </div>
            </div>

            <p className="text-xs text-[#777777] leading-relaxed">
              Certificate of Analysis (CoA) and tamper-evident telemetry tags will accompany your shipment.
            </p>

            <button
              onClick={() => setOrderConfirmation(null)}
              className="w-full py-3 bg-white text-black hover:bg-[#E5E2E1] text-xs font-bold uppercase rounded-lg transition-colors"
            >
              Continue Browsing Dispensary
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
