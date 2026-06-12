import { PAYMENT_METHODS } from './payment/config';

const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '923011837160';

export const buildOrderMessage = (order) => {
  const payMethod = PAYMENT_METHODS.find(m => m.id === order.paymentMethod);

  const lines = [
    `🌾 *New Order — Vital Agro*`,
    `📋 Order #: ${order.orderNumber || 'Pending'}`,
    ``,
    `📦 *Product:* ${order.productName} (${order.packSize})`,
    `🔢 *Quantity:* ${order.quantity}`,
    ``,
    `💰 Subtotal: PKR ${order.subtotal?.toLocaleString()}`,
    `🚚 Delivery: ${order.deliveryCharge === 0 ? 'FREE 🎁' : `PKR ${order.deliveryCharge}`}`,
    `💳 *Grand Total: PKR ${order.grandTotal?.toLocaleString()}*`,
    ``,
    `💳 *Payment:* ${payMethod?.label || order.paymentMethod}`,
    order.paymentMethod !== 'cod'
      ? `📸 Please send payment screenshot to confirm order`
      : `✅ Cash on Delivery — Pay PKR ${order.deliveryCharge} extra at door`,
    ``,
    `👤 *Customer:*`,
    `Name: ${order.customerName}`,
    `Phone: ${order.customerPhone}`,
    `City: ${order.city}, ${order.province}`,
    `Address: ${order.address}`,
    order.instructions ? `📝 Note: ${order.instructions}` : null,
    ``,
    `_via vital-agro.vercel.app_`,
  ].filter(val => val !== null && val !== undefined && val !== '').join('\n');

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`;
};
