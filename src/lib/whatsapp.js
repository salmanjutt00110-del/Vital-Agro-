const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '923011837160';

export const buildOrderMessage = (order) => {
  const lines = [
    `🌾 *New Order — Vital Agro*`,
    ``,
    `📦 *Product:* ${order.productName} (${order.packSize})`,
    `🔢 *Quantity:* ${order.quantity}`,
    `💰 *Subtotal:* PKR ${order.subtotal?.toLocaleString()}`,
    `🚚 *Delivery:* PKR ${order.deliveryCharge}`,
    `💳 *Grand Total:* PKR ${order.grandTotal?.toLocaleString()}`,
    ``,
    `👤 *Customer Details:*`,
    `Name:     ${order.customerName}`,
    `Phone:    ${order.customerPhone}`,
    `City:     ${order.city}, ${order.province}`,
    `Address:  ${order.address}`,
    order.instructions ? `📝 Note: ${order.instructions}` : '',
    ``,
    `✅ *Payment:* Cash on Delivery (COD)`,
    `📋 *Order #:* ${order.orderNumber || 'Pending'}`,
    ``,
    `_Order via vital-agro.vercel.app_`,
  ].filter(Boolean).join('\n');

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`;
};
