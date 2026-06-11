import React, { useEffect, useState } from 'react';
import { subscribeToOrders } from '@/lib/firestore/orders';
import StatsCards from './StatsCards';
import OrdersTable from './OrdersTable';
import { auth, signOut } from '@/lib/firebase';
import vitalAgroLogo from '@/assets/vital agro logo.webp';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Attach real-time Firestore synchronization listener
    const unsubscribe = subscribeToOrders(setOrders);
    return () => unsubscribe();
  }, []);

  // Compute stats metrics dynamically
  const stats = {
    total:      orders.length,
    pending:    orders.filter(o => o.status === 'pending').length,
    confirmed:  orders.filter(o => o.status === 'confirmed').length,
    delivered:  orders.filter(o => o.status === 'delivered').length,
    revenue:    orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0),
    todayOrders: orders.filter(o => {
      const today = new Date();
      const orderDate = o.createdAt?.toDate?.();
      return orderDate?.toDateString() === today.toDateString();
    }).length,
  };

  // Filter & Search computations
  const filtered = orders
    .filter(o => filter === 'all' || o.status === filter)
    .filter(o => {
      if (!search) return true;
      const term = search.toLowerCase();
      return (
        o.customer.name.toLowerCase().includes(term) ||
        o.customer.phone.includes(term) ||
        o.orderNumber.toLowerCase().includes(term) ||
        o.item.productName.toLowerCase().includes(term)
      );
    });

  return (
    <div className="min-h-screen bg-[#080f08] text-white select-none">
      {/* Admin Navigation Header */}
      <nav className="sticky top-0 z-50 border-b border-white/8
        bg-[#080f08]/95 backdrop-blur-xl px-6 py-4
        flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/10 rounded-xl p-1 border border-white/10">
            <img src={vitalAgroLogo} alt="Vital Agro" className="h-7 w-auto object-contain" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">Admin Portal</p>
            <p className="text-white/40 text-xs mt-0.5">Vital Agro Chemical Industries</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Real-time pending indicator badge */}
          {stats.pending > 0 && (
            <span className="px-3 py-1 rounded-full bg-amber-500/20
              border border-amber-500/30 text-amber-400 text-xs font-black
              animate-pulse"
            >
              {stats.pending} Pending
            </span>
          )}
          <button
            onClick={() => signOut(auth)}
            className="px-4 py-2 rounded-xl border border-white/10
              text-white/60 hover:text-white text-xs font-bold transition-colors"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <StatsCards stats={stats} />

        {/* Orders Table Area */}
        <div className="mt-10">
          <div className="flex flex-col md:flex-row gap-4
            items-start md:items-center justify-between mb-6"
          >
            <h2 className="text-white font-black text-xl">
              All Orders
            </h2>

            {/* Keyword Search Box */}
            <input
              type="text"
              placeholder="Search by name, phone, order#..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-white/5
                border border-white/10 text-white text-sm
                placeholder:text-white/30 outline-none w-full md:w-72
                focus:border-[#76C945]/40 transition-all"
            />
          </div>

          {/* Filter Navigation Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
            {['all', 'pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`
                  px-4 py-2.5 rounded-xl text-xs font-bold capitalize
                  whitespace-nowrap border transition-all duration-200
                  ${filter === f
                    ? 'bg-[#2d6a2d] border-[#5cb85c] text-white'
                    : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
                  }
                `}
              >
                {f === 'all'
                  ? `All (${orders.length})`
                  : `${f} (${orders.filter(o => o.status === f).length})`
                }
              </button>
            ))}
          </div>

          <OrdersTable orders={filtered} />
        </div>
      </div>
    </div>
  );
}
