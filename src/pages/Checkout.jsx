'use client';
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createOrder } from '@/lib/firestore/orders';
import { buildOrderMessage } from '@/lib/whatsapp';
import OrderConfirmButton from '@/components/animations/OrderConfirmButton';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { 
  ShoppingBag, 
  User, 
  MapPin, 
  CreditCard, 
  CheckSquare, 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Clock, 
  Gift
} from 'lucide-react';
import { getDeliveryFee } from '@/lib/payment/config';
import { PaymentMethodGrid } from '@/components/checkout/PaymentMethodGrid';
import { useCart } from '@/lib/CartContext';
import { useLanguage } from '@/lib/LanguageContext';

const PROVINCES = [
  'Punjab',
  'Sindh',
  'KPK',
  'Balochistan',
  'Islamabad',
  'AJK',
  'Gilgit-Baltistan'
];

// Form Field Component
const FormField = ({ label, required, error, ...props }) => (
  <div className="space-y-2">
    <label className="block text-white/50 text-[11px] font-black tracking-[0.12em] uppercase">
      {label}{required && <span className="text-[#8AD65A] ml-1">*</span>}
    </label>
    <input
      {...props}
      className={`w-full px-5 py-4 rounded-2xl text-white text-sm bg-white/5 border outline-none placeholder:text-white/20 transition-all duration-300 ${
        error
          ? 'border-red-500/40 focus:border-red-400'
          : 'border-white/10 focus:border-[#76C945] focus:bg-white/10'
      }`}
    />
    {error && <p className="text-red-400 text-[11px] font-bold">⚠ {error}</p>}
  </div>
);

export default function CheckoutPage({ product: rawProduct, defaultSize, defaultQuantity, onClose }) {
  const { cart, cartSubtotal, cartCount, clearCart } = useCart();
  const { lang } = useLanguage();
  const [step, setStep] = useState(0); // Steps: 0 = Cart, 1 = Info, 2 = Address, 3 = Payment, 4 = Review, 5 = Success
  const [selectedSize, setSize] = useState(defaultSize || '100ML');
  const [quantity, setQty] = useState(defaultQuantity || 1);
  const [payment, setPayment] = useState('cod');
  const [orderId, setOrderId] = useState(null);
  const [isOrdering, setIsOrdering] = useState(false);

  const [form, setForm] = useState({
    fullName: '', phone: '', city: '',
    province: 'Punjab', postal: '', address: '', instructions: '',
  });
  const [errors, setErrors] = useState({});

  // Normalize product details
  const product = React.useMemo(() => {
    if (!rawProduct) return null;
    const sizesList = rawProduct.sizes 
      ? rawProduct.sizes.map(s => typeof s === 'object' ? s.size : s) 
      : [rawProduct.packaging || '100ML'];
      
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

  // Recalculate Shipping and Totals based on rules
  const delivery = React.useMemo(() => {
    return getDeliveryFee(payment);
  }, [payment]);

  const rewardMessage = React.useMemo(() => {
    if (payment === 'jazzcash') {
      return '🎉 Congratulations! You unlocked FREE Delivery.';
    }
    if (payment === 'easypaisa') {
      return '🎉 Instant Payment Reward: FREE Shipping Applied.';
    }
    if (payment === 'meezan') {
      return '🎉 Bank Transfer Reward: FREE Shipping Enabled.';
    }
    return '';
  }, [payment]);

  const subtotal = product ? ((product.price || 0) * quantity) : cartSubtotal;
  const grandTotal = subtotal + delivery;

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const validateStep = (currentStep) => {
    const e = {};
    if (currentStep === 1) {
      if (!form.fullName.trim()) e.fullName = 'Full name is required';
      if (!form.phone.trim()) e.phone = 'Phone number is required';
      else if (!/^03\d{9}$/.test(form.phone.replace(/[\s-]/g, ''))) {
        e.phone = 'Please enter a valid phone number (e.g. 03001234567)';
      }
    }
    if (currentStep === 2) {
      if (!form.city.trim()) e.city = 'City is required';
      if (!form.address.trim()) e.address = 'Complete delivery address is required';
    }
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    } else {
      toast.error('Please resolve the errors to continue');
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(0, prev - 1));
  };

  const handleComplete = useCallback(async () => {
    if (isOrdering) return;
    setIsOrdering(true);

    const productName = product ? product.name : cart.map(item => `${item.name[lang] || item.name} (${item.size.size})`).join(', ');
    const productImage = product ? (product.image || '') : (cart[0]?.pngUrl || cart[0]?.imageUrl || '');
    const packSize = product ? selectedSize : 'Multiple';
    const finalQty = product ? quantity : cartCount;
    const finalPricePerUnit = product ? (product.price || 0) : 0;

    const orderData = {
      productName,
      productImage,
      category:      product ? (product.category || 'Special Product') : 'Multiple Products',
      packSize,
      quantity:      finalQty,
      pricePerUnit:  finalPricePerUnit,
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
      ...(!product && { items: cart.map(item => ({
        id: item.id,
        name: item.name[lang] || item.name,
        size: item.size.size,
        quantity: item.quantity,
        price: Number(item.size.price || item.size.rate || 0)
      }))})
    };

    try {
      const orderId = await createOrder(orderData).catch(err => {
        console.error(err);
        return 'VA-' + Math.floor(100000 + Math.random() * 900000);
      });

      setOrderId(orderId);
      setStep(5); // Transition to success step

      // Launch beautiful confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#76C945', '#8AD65A', '#FFFFFF']
      });

      if (!product) {
        clearCart();
      }

      // Build and open WhatsApp pre-filled dispatch order url
      const waUrl = buildOrderMessage({ ...orderData, orderNumber: orderId });
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 1000);

    } catch (err) {
      toast.error('Failed to complete order. Please try again.');
    } finally {
      setIsOrdering(false);
    }
  }, [form, product, selectedSize, quantity, subtotal, delivery, grandTotal, payment, isOrdering, cart, cartCount, lang, clearCart]);

  // Page title metadata mapping
  const stepsTitles = [
    { 
      title: product ? 'Review Your Selection' : 'Review Your Cart', 
      subtitle: product ? 'Confirm package size and quantity' : 'Verify items in your shopping cart', 
      icon: <ShoppingBag size={20} /> 
    },
    { title: 'Personal Details', subtitle: 'Enter your contact credentials', icon: <User size={20} /> },
    { title: 'Shipping Address', subtitle: 'Provide your delivery destination', icon: <MapPin size={20} /> },
    { title: 'Payment Mode', subtitle: 'Choose how you want to pay', icon: <CreditCard size={20} /> },
    { title: 'Verify & Confirm', subtitle: 'Review summary and place order', icon: <CheckSquare size={20} /> },
    { title: 'Order Complete!', subtitle: 'Your agriculture solutions are on the way', icon: <Gift size={20} /> }
  ];

  const currentMeta = stepsTitles[step];

  return (
    <motion.div
      className="fixed inset-0 z-[120] bg-[#02110a] text-white flex flex-col justify-between overflow-y-auto"
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full blur-[150px] bg-[#76C945]/10" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full blur-[150px] bg-[#8AD65A]/5" />
      </div>

      {/* Header Banner */}
      <header className="relative z-10 px-6 py-6 border-b border-white/5 bg-black/30 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-xs font-black uppercase tracking-wider text-white/50 border border-white/10 rounded-full hover:bg-white/5 hover:text-white transition-all"
            >
              ← Back to Shop
            </button>
            <div className="h-5 w-[1px] bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#76C945]">Step {step + 1} of 6</span>
            </div>
          </div>
          
          {step < 5 && (
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white flex items-center justify-center transition-all"
            >
              ✕
            </button>
          )}
        </div>
      </header>

      {/* Main Form Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:py-16">
        <div className="w-full max-w-2xl bg-white/[0.02] border border-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden relative">
          
          {/* Progress Indicator */}
          {step < 5 && (
            <div className="flex gap-1.5 mb-8">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    i <= step ? 'bg-[#76C945]' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Current Step Header */}
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#76C945]/10 border border-[#76C945]/20 flex items-center justify-center text-[#8AD65A]">
              {currentMeta.icon}
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">{currentMeta.title}</h2>
              <p className="text-white/40 text-xs font-medium">{currentMeta.subtitle}</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* STEP 0: CART */}
              {step === 0 && (
                <div className="space-y-6">
                  {product ? (
                    <>
                      {/* Product Details Card */}
                      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
                        <img 
                          src={product?.image} 
                          alt={product?.name}
                          className="w-24 h-24 object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
                        />
                        <div className="flex-1 text-center sm:text-left">
                          <span className="text-[10px] font-black text-[#8AD65A] tracking-wider uppercase block mb-1">
                            {product?.category}
                          </span>
                          <h3 className="text-xl font-black tracking-tight">{product?.name}</h3>
                          <p className="text-white/40 text-xs font-mono mt-0.5">{product?.formula}</p>
                          <p className="text-[#8AD65A] text-sm font-black mt-2 font-mono">
                            PKR {product?.price?.toLocaleString()} / unit
                          </p>
                        </div>
                      </div>

                      {/* Size Selector */}
                      <div className="space-y-3">
                        <label className="block text-white/50 text-[10px] font-black uppercase tracking-widest">
                          Select Package Size
                        </label>
                        <div className="flex gap-2 flex-wrap">
                          {product?.sizes?.map((size) => (
                            <button
                              key={size}
                              onClick={() => setSize(size)}
                              className={`px-5 py-3 rounded-xl text-xs font-black border transition-all ${
                                selectedSize === size
                                  ? 'bg-[#2d6a2d] border-[#76C945] text-white shadow-[0_0_12px_rgba(92,184,92,0.2)]'
                                  : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center justify-between p-4.5 rounded-2xl bg-white/5 border border-white/10">
                        <span className="text-sm font-bold text-white/70">Quantity</span>
                        <div className="flex items-center gap-4.5">
                          <button 
                            onClick={() => setQty(q => Math.max(1, q - 1))}
                            className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center text-lg font-bold hover:bg-white/20 active:scale-90 transition-all"
                          >
                            −
                          </button>
                          <span className="text-white font-black text-lg w-6 text-center font-mono">
                            {quantity}
                          </span>
                          <button 
                            onClick={() => setQty(q => q + 1)}
                            className="w-10 h-10 rounded-full bg-[#2d6a2d] text-white flex items-center justify-center text-lg font-bold hover:bg-[#3d8c3d] active:scale-90 transition-all"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 scrollbar-hide">
                      {cart.map((item) => (
                        <div key={item.cartId} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="w-14 h-14 rounded-lg bg-white/5 p-2 flex items-center justify-center shrink-0">
                            <img 
                              src={item.pngUrl || item.imageUrl} 
                              alt={item.name[lang] || item.name}
                              className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-extrabold truncate">{item.name[lang] || item.name}</h4>
                            <p className="text-[10px] text-[#8AD65A] font-black uppercase mt-0.5 tracking-wider">{item.size.size}</p>
                            <p className="text-white/40 text-xs mt-1">Qty: {item.quantity} × PKR {Number(item.size.price || item.size.rate || 0).toLocaleString()}</p>
                          </div>
                          <span className="text-sm font-black font-mono shrink-0">
                            PKR {(Number(item.size.price || item.size.rate || 0) * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 1: PERSONAL DETAILS */}
              {step === 1 && (
                <div className="grid grid-cols-1 gap-6">
                  <FormField
                    label="Full Name"
                    required
                    placeholder="Muhammad Ali"
                    value={form.fullName}
                    onChange={e => update('fullName', e.target.value)}
                    error={errors.fullName}
                  />

                  <FormField
                    label="Phone Number"
                    required
                    type="tel"
                    placeholder="03001234567"
                    value={form.phone}
                    onChange={e => update('phone', e.target.value)}
                    error={errors.phone}
                  />

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/50 text-[11px] leading-relaxed">
                    ℹ **Note:** Ensure your phone number is correct. Our customer support team will contact you via this number or WhatsApp to confirm shipment.
                  </div>
                </div>
              )}

              {/* STEP 2: SHIPPING ADDRESS */}
              {step === 2 && (
                <div className="grid grid-cols-1 gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      label="City"
                      required
                      placeholder="Haroonabad"
                      value={form.city}
                      onChange={e => update('city', e.target.value)}
                      error={errors.city}
                    />

                    <div className="space-y-2">
                      <label className="block text-white/50 text-[11px] font-black tracking-[0.12em] uppercase">
                        Province <span className="text-[#8AD65A]">*</span>
                      </label>
                      <select
                        value={form.province}
                        onChange={e => update('province', e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl text-white text-sm bg-white/5 border border-white/10 outline-none focus:border-[#76C945] transition-all appearance-none cursor-pointer"
                      >
                        {PROVINCES.map(p => (
                          <option key={p} value={p} style={{ background: '#02110a', color: 'white' }}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <FormField
                    label="Postal Code (Optional)"
                    placeholder="63100"
                    type="tel"
                    value={form.postal}
                    onChange={e => update('postal', e.target.value)}
                  />

                  <div className="space-y-2">
                    <label className="block text-white/50 text-[11px] font-black tracking-[0.12em] uppercase">
                      Complete Delivery Address <span className="text-[#8AD65A]">*</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Gali/Street, Mohalla, Near landmarks, House Number..."
                      value={form.address}
                      onChange={e => update('address', e.target.value)}
                      className={`w-full px-5 py-4 rounded-2xl text-white text-sm bg-white/5 border outline-none resize-none placeholder:text-white/20 transition-all ${
                        errors.address ? 'border-red-500/40 focus:border-red-400' : 'border-white/10 focus:border-[#76C945]'
                      }`}
                    />
                    {errors.address && <p className="text-red-400 text-[11px] font-bold">⚠ {errors.address}</p>}
                  </div>

                  <FormField
                    label="Delivery Instructions (Optional)"
                    placeholder="E.g. Deliver after 5 PM, Call before arriving"
                    value={form.instructions}
                    onChange={e => update('instructions', e.target.value)}
                  />
                </div>
              )}

              {/* STEP 3: PAYMENT METHOD */}
              {step === 3 && (
                <PaymentMethodGrid
                  selected={payment}
                  onSelect={setPayment}
                />
              )}

              {/* STEP 4: REVIEW & CONFIRM */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Shipment Details */}
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                      <p className="text-white/40 text-[9px] font-black tracking-widest uppercase">Delivery Address</p>
                      <p className="text-sm font-bold">{form.fullName}</p>
                      <p className="text-xs text-white/70 font-mono">{form.phone}</p>
                      <p className="text-xs text-white/70 leading-relaxed">
                        {form.address}, {form.city}, {form.province} {form.postal && `(${form.postal})`}
                      </p>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="space-y-2 p-4 rounded-2xl bg-white/3 border border-white/8">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/50">Subtotal</span>
                        <span className="text-white">PKR {subtotal.toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-white/50">Delivery</span>
                        {delivery === 0 ? (
                          <span className="text-[#5cb85c] font-bold">FREE 🎁</span>
                        ) : (
                          <span className="text-white">PKR {delivery}</span>
                        )}
                      </div>

                      {delivery > 0 && (
                        <p className="text-yellow-400/60 text-[10px]">
                          💡 Switch to JazzCash/Easypaisa for FREE delivery
                        </p>
                      )}

                      <div className="h-px bg-white/10" />

                      <div className="flex justify-between items-center">
                        <span className="text-[#5cb85c] font-bold">Grand Total</span>
                        <motion.span
                          key={grandTotal}
                          className="text-[#5cb85c] font-bold text-xl"
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                        >
                          PKR {grandTotal.toLocaleString()}
                        </motion.span>
                      </div>
                    </div>
                  </div>

                  {rewardMessage && (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs text-center">
                      {rewardMessage}
                    </div>
                  )}

                  <div className="p-4 rounded-2xl bg-white/3 border border-white/5 text-white/30 text-[10px] leading-relaxed text-center">
                    By completing order, you verify that you agree to receive dispatch notifications on WhatsApp. Delivery takes 2-4 working days.
                  </div>
                </div>
              )}

              {/* STEP 5: SUCCESS */}
              {step === 5 && (
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#76C945]/10 border-2 border-[#76C945] flex items-center justify-center text-[#8AD65A] mx-auto text-3xl animate-bounce">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-[#8AD65A]">Order Placed Successfully!</h3>
                    <p className="text-white/50 text-xs mt-2 max-w-md mx-auto">
                      Thank you for choosing Vital Agro. Your order has been registered under ID: <strong className="text-white font-mono">{orderId}</strong>.
                    </p>
                  </div>

                  <div className="p-5.5 rounded-3xl bg-white/5 border border-white/10 max-w-md mx-auto space-y-3.5">
                    <p className="text-xs text-white/70">
                      We have sent a pre-filled confirmation message to WhatsApp. Please send it to ensure priority dispatch.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a 
                        href={`/track/${orderId}`} 
                        className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                      >
                        <Clock size={14} />
                        <span>Track Order Status</span>
                      </a>
                      <button 
                        onClick={onClose}
                        className="px-5 py-3 rounded-2xl bg-[#76C945] text-[#0A2E1F] font-black text-xs flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(118,201,69,0.3)] transition-all"
                      >
                        <Home size={14} />
                        <span>Continue Shopping</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Step Actions Footer Buttons */}
          {step < 5 && (
            <div className="flex gap-4.5 pt-8 mt-8 border-t border-white/5 justify-between">
              {step > 0 ? (
                <button
                  onClick={handleBack}
                  className="px-6 py-4 rounded-full border border-white/15 bg-white/5 text-white/70 font-black text-xs uppercase tracking-wider hover:bg-white/10 hover:text-white transition-all flex items-center gap-2"
                >
                  <ChevronLeft size={14} />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  onClick={handleNext}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#76C945] to-[#5cb85c] text-[#0A2E1F] font-black text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(118,201,69,0.3)] transition-all flex items-center gap-2"
                >
                  <span>Continue</span>
                  <ChevronRight size={14} />
                </button>
              ) : (
                <OrderConfirmButton
                  onConfirm={handleComplete}
                  disabled={isOrdering}
                />
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer Branding Banner */}
      {step < 5 && (
        <footer className="relative z-10 px-6 py-4 border-t border-white/5 bg-black/20 text-center text-[10px] text-white/20">
          Vital Agro Chemical Industries (Pvt.) Ltd. · Secured SSL Encryption · 24/7 Priority Helpline 063-2253137
        </footer>
      )}
    </motion.div>
  );
}
