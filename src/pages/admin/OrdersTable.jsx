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
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const handleStatusChange = async (newStatus, paymentDetails = null) => {
    setUpdating(true);
    try {
      await updateOrderStatus(order.id, newStatus, "", paymentDetails);
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
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-white/30 text-xs font-semibold">{order.paymentMethod || 'COD'}</span>
          {order.paymentDetails && (
            <button
              onClick={() => setShowReceiptModal(true)}
              className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase transition-all
                ${order.paymentDetails.status === 'approved'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/35 hover:bg-amber-500/30'
                }`}
            >
              {order.paymentDetails.status === 'approved' ? 'Verified ✓' : 'Verify AI'}
            </button>
          )}
        </div>
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

        {showReceiptModal && order.paymentDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
            <div className="bg-[#0c1611] border border-white/10 rounded-3xl p-6 max-w-lg w-full space-y-4 text-white shadow-2xl">
              <div className="flex justify-between items-center border-b border-white/8 pb-2">
                <h3 className="font-extrabold text-sm text-[#8AD65A] uppercase tracking-wider">
                  AI Receipt Verification
                </h3>
                <button 
                  onClick={() => setShowReceiptModal(false)}
                  className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex gap-5">
                <div className="w-1/2 aspect-[9/16] rounded-xl border border-white/10 overflow-hidden bg-black/40 flex items-center justify-center">
                  <img 
                    src={order.paymentDetails.receiptBase64} 
                    alt="Receipt Screenshot" 
                    className="w-full h-full object-contain cursor-zoom-in"
                    onClick={() => window.open(order.paymentDetails.receiptBase64, '_blank')}
                  />
                </div>
                <div className="w-1/2 space-y-3.5 text-xs text-left leading-relaxed">
                  <div>
                    <span className="text-white/40 block uppercase font-bold text-[8px] tracking-wider mb-0.5">Method</span>
                    <span className="font-bold text-white bg-white/5 px-2 py-1 rounded border border-white/8 text-[10px]">{order.paymentMethod}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block font-bold text-[8px] tracking-wider">Extracted Ref ID:</span>
                    <span className="font-mono text-white text-xs font-black block mt-0.5 break-all">{order.paymentDetails.refId}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block font-bold text-[8px] tracking-wider">Extracted Amount:</span>
                    <span className="font-mono text-white text-xs font-black block mt-0.5">PKR {order.paymentDetails.amountPaid?.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block font-bold text-[8px] tracking-wider">Timestamp:</span>
                    <span className="text-white font-semibold block mt-0.5">{order.paymentDetails.timestamp}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block font-bold text-[8px] tracking-wider">Verification Status:</span>
                    <span className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                      order.paymentDetails.status === 'approved' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse'
                    }`}>
                      {order.paymentDetails.status || 'pending_approval'}
                    </span>
                  </div>
                  
                  {order.paymentDetails.status !== 'approved' && (
                    <button
                      onClick={async () => {
                        const updatedDetails = {
                          ...order.paymentDetails,
                          status: 'approved'
                        };
                        await handleStatusChange('confirmed', updatedDetails);
                        setShowReceiptModal(false);
                      }}
                      className="w-full py-2.5 bg-[#76C945] hover:bg-[#8AD65A] text-[#0A2E1F] rounded-xl font-black text-xs transition-colors mt-4 shadow-md shadow-[#76C945]/10"
                    >
                      Approve Payment
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
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
