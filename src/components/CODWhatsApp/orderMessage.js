export const WHATSAPP_NUMBER = '923011837160';

/**
 * Formats order details into a clean WhatsApp text layout.
 * 
 * @param {object} order - Order details containing customer and product variables.
 * @returns {string} Encoded WhatsApp message URI content.
 */
export const formatWhatsAppMessage = (order) => {
  const total = order.pricePerUnit * order.quantity;

  const message = `🌾 *New Order — Vital Agro*

📦 *Product:* ${order.productName} (${order.packSize})
🔢 *Quantity:* ${order.quantity}
💰 *Price/Unit:* PKR ${order.pricePerUnit.toLocaleString()}
💳 *Total Amount:* PKR ${total.toLocaleString()}

👤 *Customer Details:*
Name: ${order.customerName}
Phone: ${order.phone}
City: ${order.city}
Address: ${order.address}

✅ *Payment:* Cash on Delivery (COD)
🚚 Please deliver to the above address.

_Order placed via Vital Agro website_`;

  return encodeURIComponent(message);
};

/**
 * Generates the redirect URL pointing to the business WhatsApp.
 * 
 * @param {object} order 
 * @returns {string} WhatsApp Redirect URL string.
 */
export const buildWhatsAppURL = (order) => {
  const message = formatWhatsAppMessage(order);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
};
