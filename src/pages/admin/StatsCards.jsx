import React from 'react';

export default function StatsCards({ stats }) {
  const cards = [
    {
      label: 'Total Orders',
      value: stats.total,
      icon:  '📦',
      color: '#5cb85c',
    },
    {
      label: 'Pending Approval',
      value: stats.pending,
      icon:  '⏳',
      color: '#f59e0b',
      pulse: stats.pending > 0,
    },
    {
      label: 'Delivered',
      value: stats.delivered,
      icon:  '✅',
      color: '#10b981',
    },
    {
      label: "Today's Orders",
      value: stats.todayOrders,
      icon:  '📅',
      color: '#6366f1',
    },
    {
      label: 'Total Revenue (COD)',
      value: `PKR ${stats.revenue.toLocaleString()}`,
      icon:  '💰',
      color: '#5cb85c',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`
            p-5 rounded-2xl border transition-all duration-300
            bg-white/3 border-white/8 hover:border-white/15
            ${card.pulse ? 'animate-pulse border-amber-500/30' : ''}
          `}
        >
          <p className="text-2xl mb-2">{card.icon}</p>
          <p
            className="font-black text-xl tracking-tight"
            style={{ color: card.color }}
          >
            {card.value}
          </p>
          <p className="text-white/40 text-xs font-semibold mt-1.5">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
