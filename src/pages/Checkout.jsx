'use client';
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { createOrder } from '@/lib/firestore/orders';
import { buildOrderMessage } from '@/lib/whatsapp';
import OrderConfirmButton from '@/components/animations/OrderConfirmButton';
import toast from 'react-hot-toast';

// Pakistani provinces with delivery charges
const PROVINCES = {
  'Punjab':      260,
  'Sindh':       320,
  'KPK':         350,
  'Balochistan': 380,
  'Islamabad':   280,
  'AJK':         350,
  'Gilgit-Baltistan': 420,
};

// Form Field Component
const FormField = ({ label, required, error, ...props }) => (
  <div>
    <label className="block text-white/50 text-[11px] font-semibold
      tracking-[0.1em] uppercase mb-2">
      {label}{required && <span className="text-[#5cb85c] ml-1">*</span>}
    </label>
    <input
      {...props}
      className={`w-full px-4 py-3.5 rounded-2xl text-white text-sm
        bg-white/5 border outline-none placeholder:text-white/25
        transition-all duration-300
        ${error
          ? 'border-red-500/40 focus:border-red-400'
          : 'border-white/10 focus:border-[rgba(92,184,92,0.5)] focus:bg-white/7'
        }`}
    />
    {error && <p className="text-red-400 text-[11px] mt-1.5">⚠ {error}</p>}
  </div>
);

// Payment Method Selection Grid
const PaymentMethodGrid = ({ selected, onSelect }) => {
  const methods = [
    { id: 'COD', label: 'Cash on Delivery (COD)', description: 'Pay at your doorstep', icon: '💵' },
    { id: 'card', label: 'Credit/Debit Card', description: 'Visa / MasterCard', icon: '💳' },
    { id: 'jazzcash', label: 'JazzCash Wallet', description: 'Instant Mobile Transfer', icon: '📱' },
    { id: 'easypaisa', label: 'Easypaisa Wallet', description: 'Easy Mobile Payment', icon: '⚡' },
    { id: 'meezan', label: 'Meezan Bank', description: 'Direct Account Deposit', icon: '🏦' }
  ];

  return (
    <div className="mt-6">
      <label className="block text-white/50 text-[11px] font-semibold tracking-[0.1em] uppercase mb-3">
        💳 Select Payment Method
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {methods.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m.id)}
            className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all duration-300
              ${selected === m.id
                ? 'bg-[rgba(92,184,92,0.08)] border-[#5cb85c] shadow-[0_0_15px_rgba(92,184,92,0.15)]'
                : 'bg-white/5 border-white/10 hover:bg-white/7'
              }`}
          >
            <span className="text-2xl mt-0.5">{m.icon}</span>
            <div>
              <p className="text-white font-bold text-xs">{m.label}</p>
              <p className="text-white/45 text-[10px] mt-0.5">{m.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const CheckoutPage = ({ product: rawProduct, defaultSize, defaultQuantity, onClose }) => {
  const [selectedSize, setSize] = useState(defaultSize || (rawProduct?.sizes?.[0]?.size || rawProduct?.sizes?.[0] || '100ML'));
  const [quantity, setQty]      = useState(defaultQuantity || 1);
  const [payment, setPayment]   = useState('COD');

  const [form, setForm] = useState({
    fullName: '', phone: '', city: '',
    province: 'Punjab', postal: '', address: '', instructions: '',
  });
  const [errors, setErrors] = useState({});

  const product = React.useMemo(() => {
    if (!rawProduct) return null;
    
    // Normalize sizes list to array of strings
    const sizesList = rawProduct.sizes 
      ? rawProduct.sizes.map(s => typeof s === 'object' ? s.size : s) 
      : [rawProduct.packaging || '100ML'];
      
    // Find the price for the currently selected size
    let price = rawProduct.price || 999;
    if (rawProduct.sizes) {
      const sizeObj = rawProduct.sizes.find(s => (typeof s === 'object' ? s.size : s) === selectedSize);
      if (sizeObj && sizeObj.price) {
        price = sizeObj.price;
      }
    }

    return {
      ...rawProduct,
      name: typeof rawProduct.name === 'object' ? (rawProduct.name.en || rawProduct.name.ur) : rawProduct.name,
      image: rawProduct.image || rawProduct.pngUrl || rawProduct.imageUrl || '',
      formula: rawProduct.formula || rawProduct.activeIngredient || rawProduct.formulation || '',
      sizes: sizesList,
      price,
    };
  }, [rawProduct, selectedSize]);

  const delivery    = PROVINCES[form.province] || 280;
  const subtotal    = (product?.price || 0) * quantity;
  const grandTotal  = subtotal + delivery;

  const update = (k, v) =>
    setForm(p => ({ ...p, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim())  e.fullName = 'Full name required';
    if (!form.phone.trim())     e.phone = 'Phone required';
    if (!/^03\d{9}$/.test(form.phone.replace(/[\s-]/g, '')))
      e.phone = 'Valid Pakistani number (03XXXXXXXXX)';
    if (!form.city.trim())      e.city = 'City required';
    if (!form.address.trim())   e.address = 'Address required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleComplete = useCallback(async () => {
    if (!validate()) {
      toast.error('Please fill all required fields');
      throw new Error('Validation failed');
    }

    const orderData = {
      productName:   product.name,
      productImage:  product.image || '',
      category:      product.category || 'Special Product',
      packSize:      selectedSize,
      quantity,
      pricePerUnit:  product.price || 0,
      subtotal,
      deliveryCharge: delivery,
      grandTotal,
      paymentMethod: payment,
      customerName:  form.fullName,
      customerPhone: form.phone,
      city:          form.city,
      province:      form.province,
      postalCode:    form.postal,
      address:       form.address,
      instructions:  form.instructions,
      whatsappSent:  true,
      source:        'website_checkout',
    };

    // Save to Firebase (runs in background)
    const orderId = await createOrder(orderData).catch(err => {
      console.error(err);
      return 'VA-TEMP';
    });

    // Build and open WhatsApp pre-filled dispatch order url
    const waUrl = buildOrderMessage({ ...orderData, orderNumber: orderId === 'VA-TEMP' ? 'VA-NEW' : orderId });
    window.open(waUrl, '_blank');
  }, [form, product, selectedSize, quantity, subtotal, delivery, grandTotal, payment]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end md:items-center
        justify-center bg-black/80 backdrop-blur-md p-0 md:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* MODAL CONTAINER */}
      <motion.div
        className="relative w-full md:max-w-5xl md:h-auto h-[96vh]
          rounded-t-[32px] md:rounded-[32px] overflow-hidden
          flex flex-col md:flex-row"
        style={{
          background: 'rgba(6, 20, 6, 0.97)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 -40px 100px rgba(0,0,0,0.8)',
        }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4
          border-b border-white/8 md:hidden"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#5cb85c] animate-pulse" />
            <span className="text-white font-bold text-sm tracking-wide">
              VITAL AGRO CHECKOUT
            </span>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/8
              text-white/60 flex items-center justify-center">
            ✕
          </button>
        </div>

        {/* LEFT — FORM */}
        <div className="flex-1 overflow-y-auto px-6 py-5 md:px-8 md:py-8">

          {/* Desktop header */}
          <div className="hidden md:flex items-center justify-between mb-8">
            <div>
              <p className="text-white font-bold text-xl">Premium Checkout</p>
              <p className="text-white/45 text-sm">Vital Agro Chemical Industries</p>
            </div>
            <button onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/8
                text-white/60 hover:text-white transition-colors">
              ✕
            </button>
          </div>

          {/* SHIPPING FORM */}
          <div className="mb-6">
            <p className="text-[#5cb85c] font-bold text-xs tracking-[0.15em]
              uppercase mb-4">
              📍 Shipping Destination
            </p>
            <p className="text-white/35 text-xs mb-5">
              Provide valid delivery credentials to finalize order.
            </p>

            <div className="space-y-4">
              {/* Full Name + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Full Name" required
                  placeholder="Muhammad Ali"
                  value={form.fullName}
                  onChange={e => update('fullName', e.target.value)}
                  error={errors.fullName}
                />
                <FormField
                  label="Phone Number" required type="tel"
                  placeholder="03001234567"
                  inputMode="tel"
                  value={form.phone}
                  onChange={e => update('phone', e.target.value)}
                  error={errors.phone}
                />
              </div>

              {/* City + Province + Postal */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <FormField
                  label="City" required
                  placeholder="Haroonabad"
                  value={form.city}
                  onChange={e => update('city', e.target.value)}
                  error={errors.city}
                />

                {/* Province Dropdown */}
                <div>
                  <label className="block text-white/50 text-[11px] font-semibold
                    tracking-[0.1em] uppercase mb-2">
                    Province <span className="text-[#5cb85c]">*</span>
                  </label>
                  <select
                    value={form.province}
                    onChange={e => update('province', e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl text-white text-sm
                      bg-white/5 border border-white/10 outline-none
                      focus:border-[rgba(92,184,92,0.5)]
                      transition-all duration-300 appearance-none"
                  >
                    {Object.keys(PROVINCES).map(p => (
                      <option key={p} value={p}
                        style={{ background: '#0a1f0a', color: 'white' }}>
                        {p} — PKR {PROVINCES[p]}
                      </option>
                    ))}
                  </select>
                </div>

                <FormField
                  label="Postal Code"
                  placeholder="63100"
                  value={form.postal}
                  onChange={e => update('postal', e.target.value)}
                  type="tel" inputMode="numeric"
                />
              </div>

              {/* Full Address */}
              <div>
                <label className="block text-white/50 text-[11px] font-semibold
                  tracking-[0.1em] uppercase mb-2">
                  Complete Address <span className="text-[#5cb85c]">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Street name, Mohalla, Gali, Near landmark..."
                  value={form.address}
                  onChange={e => update('address', e.target.value)}
                  className={`w-full px-4 py-3 rounded-2xl text-white text-sm
                    bg-white/5 border outline-none resize-none
                    placeholder:text-white/25 transition-all duration-300
                    ${errors.address
                      ? 'border-red-500/40'
                      : 'border-white/10 focus:border-[rgba(92,184,92,0.5)]'
                    }`}
                />
                {errors.address && (
                  <p className="text-red-400 text-[11px] mt-1">⚠ {errors.address}</p>
                )}
              </div>

              {/* Instructions */}
              <FormField
                label="Special Instructions (Optional)"
                placeholder="Deliver after 5PM, call before arrival..."
                value={form.instructions}
                onChange={e => update('instructions', e.target.value)}
                type="text"
              />
            </div>
          </div>

          {/* PAYMENT METHOD */}
          <PaymentMethodGrid selected={payment} onSelect={setPayment} />
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div className="md:w-[380px] border-t md:border-t-0 md:border-l
          border-white/8 flex flex-col"
        >
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <p className="text-white/50 text-[11px] font-bold tracking-[0.15em]
              uppercase mb-5">
              Order Summary
            </p>

            {/* Product card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl
              bg-white/4 border border-white/8 mb-5"
            >
              <img src={product?.image} alt={product?.name}
                className="w-16 h-16 object-contain"
                style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))' }}
              />
              <div className="flex-1">
                <p className="text-white font-bold text-sm">{product?.name}</p>
                <p className="text-white/40 text-xs">{product?.formula}</p>
                <p className="text-[#5cb85c] text-xs font-bold mt-1">
                  PKR {product?.price?.toLocaleString()} / unit
                </p>
              </div>
            </div>

            {/* Pack Size */}
            <div className="mb-4">
              <p className="text-white/40 text-[11px] uppercase tracking-wider mb-2">
                Pack Size
              </p>
              <div className="flex gap-2 flex-wrap">
                {product?.sizes?.map((s) => (
                  <button key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border
                      transition-all duration-200
                      ${selectedSize === s
                        ? 'bg-[#2d6a2d] border-[#5cb85c] text-white shadow-[0_0_12px_rgba(92,184,92,0.2)]'
                        : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between mb-5 p-3
              rounded-2xl bg-white/4 border border-white/8"
            >
              <p className="text-white/50 text-sm">Quantity</p>
              <div className="flex items-center gap-4">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-full bg-white/10 text-white
                    flex items-center justify-center text-lg font-bold
                    hover:bg-white/20 transition-colors active:scale-95">
                  −
                </button>
                <span className="text-white font-bold text-lg w-6 text-center">
                  {quantity}
                </span>
                <button onClick={() => setQty(q => q + 1)}
                  className="w-9 h-9 rounded-full bg-[#2d6a2d] text-white
                    flex items-center justify-center text-lg font-bold
                    hover:bg-[#3d8c3d] transition-colors active:scale-95">
                  +
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2.5 p-4 rounded-2xl bg-white/3
              border border-white/8"
            >
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Subtotal ({quantity} items)</span>
                <span className="text-white">PKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Delivery ({form.province})</span>
                <span className="text-white">PKR {delivery}</span>
              </div>
              <div className="h-px bg-white/10 my-1" />
              <div className="flex justify-between">
                <span className="text-[#5cb85c] font-bold text-base">
                  Grand Total
                </span>
                <span className="text-[#5cb85c] font-bold text-xl">
                  PKR {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* COD Note */}
            <div className="mt-4 p-3.5 rounded-2xl
              bg-[rgba(45,106,45,0.12)] border border-[rgba(92,184,92,0.2)]"
            >
              <p className="text-[#5cb85c] text-xs font-bold mb-1">
                ✅ Cash on Delivery (COD)
              </p>
              <p className="text-white/35 text-[11px] leading-relaxed">
                No advance payment. Pay when order arrives.
                Team confirms via WhatsApp within 2 hours.
              </p>
            </div>
          </div>

          {/* COMPLETE ORDER BUTTON — 3D ANIMATED */}
          <div className="px-6 pb-8 pt-4 border-t border-white/8">
            <OrderConfirmButton
              onConfirm={handleComplete}
            />
            <p className="text-center text-white/25 text-[10px] mt-3">
              Firebase logged · WhatsApp confirmed · COD guaranteed
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CheckoutPage;
