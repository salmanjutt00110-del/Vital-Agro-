import React, { useState } from 'react';
import { updateOrderStatus } from '@/lib/firestore/orders';
import { format } from 'date-fns';

const STATUS_COLORS = {
  pending:    'text-amber-400  bg-amber-400/10  border-amber-400/20',
  confirmed:  'text-blue-400   bg-blue-400/10   border-blue-400/20',
  dispatched: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  delivered:  'text-green-400  bg-green-400/10  border-green-400/20',
  cancelled:  'text-red-400    bg-red-400/10    border-red-400/20',
};

function OrderRow({ order }) {
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      await updateOrderStatus(order.id, newStatus);
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdating(false);
    }
  };

  const openWhatsApp = () => {
    // Format Pakistani phone for WhatsApp URL (ensure 92 prefix instead of leading 0)
    let cleanPhone = order.customer.phone.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '92' + cleanPhone.slice(1);
    }

    const msg = encodeURIComponent(
      `Hello ${order.customer.name}! Your order #${order.orderNumber} ` +
      `for ${order.item.productName} has been confirmed. ` +
      `We will deliver within 2-3 working days. Thank you! — Vital Agro`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  return (
    <tr className="border-b border-white/5 hover:bg-white/2 transition-colors">
      {/* Order # */}
      <td className="px-4 py-4">
        <p className="text-white font-mono text-sm font-black">{order.orderNumber}</p>
        <p className="text-white/30 text-xs mt-0.5">
          {order.createdAt?.toDate
            ? format(order.createdAt.toDate(), 'dd MMM yyyy, hh:mm a')
            : 'Just now'
          }
        </p>
      </td>

      {/* Product */}
      <td className="px-4 py-4">
        <p className="text-white text-sm font-semibold">{order.item.productName}</p>
        <p className="text-white/40 text-xs">
          {order.item.packSize} × {order.item.quantity}
        </p>
      </td>

      {/* Customer */}
      <td className="px-4 py-4">
        <p className="text-white text-sm font-semibold">{order.customer.name}</p>
        <p className="text-[#5cb85c] text-xs font-mono">{order.customer.phone}</p>
        <p className="text-white/30 text-xs">{order.customer.city}</p>
        <p className="text-white/40 text-[10px] mt-0.5 max-w-xs truncate">{order.customer.address}</p>
      </td>

      {/* Amount */}
      <td className="px-4 py-4">
        <p className="text-white font-bold font-mono">PKR {order.totalAmount.toLocaleString()}</p>
        <p className="text-white/30 text-xs font-semibold">COD</p>
      </td>

      {/* Status */}
      <td className="px-4 py-4">
        <select
          value={order.status}
          onChange={e => handleStatusChange(e.target.value)}
          disabled={updating}
          className={`
            px-3 py-1.5 rounded-xl text-xs font-bold
            border outline-none cursor-pointer
            bg-transparent ${STATUS_COLORS[order.status]}
            disabled:opacity-50
          `}
        >
          <option value="pending" className="bg-[#080f08] text-amber-400">⏳ Pending</option>
          <option value="confirmed" className="bg-[#080f08] text-blue-400">✅ Confirmed</option>
          <option value="dispatched" className="bg-[#080f08] text-purple-400">🚚 Dispatched</option>
          <option value="delivered" className="bg-[#080f08] text-green-400">📦 Delivered</option>
          <option value="cancelled" className="bg-[#080f08] text-red-400">❌ Cancelled</option>
        </select>
      </td>

      {/* Actions */}
      <td className="px-4 py-4">
        <button
          onClick={openWhatsApp}
          className="px-3 py-1.5 rounded-xl bg-[#25d366]/15
            border border-[#25d366]/25 text-[#25d366]
            text-xs font-bold hover:bg-[#25d366]/25
            transition-colors"
        >
          WhatsApp
        </button>
      </td>
    </tr>
  );
}

export default function OrdersTable({ orders }) {
  return (
    <div className="rounded-2xl border border-white/8 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-white/3 border-b border-white/8">
              {['Order #', 'Product', 'Customer', 'Amount', 'Status', 'Action'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-white/40
                  text-xs font-bold tracking-wider uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center text-white/30 text-sm">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map(order => (
                <OrderRow key={order.id} order={order} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
