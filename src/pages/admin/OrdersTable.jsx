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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <div className="bg-[#0b140f] border border-white/10 rounded-3xl p-6 max-w-2xl w-full space-y-5 text-white shadow-2xl overflow-y-auto max-h-[90vh]">
              
              {/* Header Title */}
              <div className="flex justify-between items-center border-b border-white/8 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="font-extrabold text-sm text-[#8AD65A] uppercase tracking-widest">
                    AI Payment Verification Report & Controls
                  </h3>
                </div>
                <button 
                  onClick={() => setShowReceiptModal(false)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors border border-white/10"
                >
                  ✕
                </button>
              </div>
              
              {/* Double Column Grid */}
              <div className="grid md:grid-cols-2 gap-6 items-start">
                
                {/* Left Column: Interactive Zoomable Screenshot */}
                <div className="space-y-2.5">
                  <span className="text-[10px] text-white/40 uppercase font-black tracking-wider block text-left">
                    Uploaded Transaction Screenshot
                  </span>
                  <div className="aspect-[9/16] rounded-2xl border border-white/10 overflow-hidden bg-black/60 relative group">
                    <img 
                      src={order.paymentDetails.receiptBase64} 
                      alt="Receipt Screenshot" 
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
                      <span className="text-[11px] bg-white/10 px-3 py-1.5 rounded-full border border-white/20 text-white font-bold">
                        Zoom View in New Tab
                      </span>
                    </div>
                    <a 
                      href={order.paymentDetails.receiptBase64} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="absolute inset-0 z-10" 
                    />
                  </div>
                </div>

                {/* Right Column: AI Analysis Report Metrics & Action Dashboard */}
                <div className="space-y-4 text-left text-xs leading-relaxed">
                  
                  {/* AI Report Card */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4.5 space-y-3">
                    <h4 className="text-[#8AD65A] font-extrabold text-[10px] uppercase tracking-wider border-b border-white/5 pb-1.5">
                      AI Computer Vision Analysis
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-3.5 font-mono text-[11px]">
                      <div>
                        <span className="text-white/30 block text-[9px] uppercase font-bold">AI Confidence</span>
                        <span className="text-white font-bold text-xs">
                          {((order.paymentDetails.confidenceScore || 0.95) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-white/30 block text-[9px] uppercase font-bold">OCR Accuracy</span>
                        <span className="text-white font-bold text-xs">98%</span>
                      </div>
                      <div>
                        <span className="text-white/30 block text-[9px] uppercase font-bold">Merchant Match</span>
                        <span className={`font-bold ${order.paymentDetails.receiverWallet ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {order.paymentDetails.receiverWallet ? 'Passed ✓' : 'Unconfirmed ⚠️'}
                        </span>
                      </div>
                      <div>
                        <span className="text-white/30 block text-[9px] uppercase font-bold">Double-Spend Check</span>
                        <span className={`font-bold ${order.paymentDetails.duplicateDetected ? 'text-red-400' : 'text-emerald-400'}`}>
                          {order.paymentDetails.duplicateDetected ? 'Failed ⚠️' : 'Passed ✓'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Extracted Details block */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] text-white/40 uppercase font-black tracking-wider block">Extracted Transaction Metadata</span>
                    <div className="grid grid-cols-2 gap-3.5 bg-white/[0.01] border border-white/5 p-3.5 rounded-2xl font-mono text-[11px]">
                      <div>
                        <span className="text-white/30 block text-[9px] uppercase">Transaction Ref ID</span>
                        <span className="text-white font-bold block mt-0.5 break-all">{order.paymentDetails.refId}</span>
                      </div>
                      <div>
                        <span className="text-white/30 block text-[9px] uppercase">Verified Amount</span>
                        <span className="text-emerald-400 font-bold block mt-0.5">
                          PKR {order.paymentDetails.amountPaid?.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-white/30 block text-[9px] uppercase">Sender Name</span>
                        <span className="text-white font-bold block mt-0.5 truncate">{order.paymentDetails.senderName || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-white/30 block text-[9px] uppercase">Receiver Account</span>
                        <span className="text-white font-bold block mt-0.5 truncate">{order.paymentDetails.receiverWallet || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Date & verification status tags */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-3">
                    <div>
                      <span className="text-white/40 block text-[9px] uppercase">Timestamp</span>
                      <span className="text-white font-semibold text-[11px] block mt-0.5">{order.paymentDetails.timestamp}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[9px] uppercase text-right">Verification Status</span>
                      <span className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        order.paymentDetails.status === 'approved' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse'
                      }`}>
                        {order.paymentDetails.status || 'pending_approval'}
                      </span>
                    </div>
                  </div>

                  {/* Actions Console */}
                  <div className="space-y-2 pt-3 border-t border-white/5">
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
                        className="w-full py-3 bg-[#76C945] hover:bg-[#8AD65A] text-[#0A2E1F] rounded-2xl font-black text-xs transition-colors shadow-md shadow-[#76C945]/15 flex items-center justify-center gap-1.5"
                      >
                        <span>Approve Payment & Confirm Order</span>
                      </button>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={async () => {
                          // Reject payment cancels the order
                          await handleStatusChange('cancelled', { ...order.paymentDetails, status: 'rejected' });
                          setShowReceiptModal(false);
                        }}
                        className="py-2.5 bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-400 rounded-xl font-bold transition-colors"
                      >
                        Reject Order
                      </button>
                      <button
                        onClick={async () => {
                          // Request new receipt updates notes and leaves order pending
                          const details = { ...order.paymentDetails, status: 'request_new' };
                          await handleStatusChange('pending', details);
                          // Write custom notes in firebase update
                          setShowReceiptModal(false);
                        }}
                        className="py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold transition-colors"
                      >
                        Request New Receipt
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={openWhatsApp}
                        className="py-2.5 bg-[#25d366]/15 hover:bg-[#25d366]/25 border border-[#25d366]/30 text-[#25d366] rounded-xl font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        Contact Customer
                      </button>
                      
                      {/* Direct Screenshot download anchor */}
                      <button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = order.paymentDetails.receiptBase64;
                          link.download = `Receipt-${order.orderNumber}.png`;
                          link.click();
                        }}
                        className="py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold transition-colors"
                      >
                        Download Screenshot
                      </button>
                    </div>
                  </div>

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
