'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { createOrder } from '@/lib/firestore/orders';
import { buildOrderMessage } from '@/lib/whatsapp';
import { getDeliveryFee, PAYMENT_METHODS } from '@/lib/payment/config';
import { PaymentMethodGrid } from '@/components/checkout/PaymentMethodGrid';
import { useCart } from '@/lib/CartContext';
import { useLanguage } from '@/lib/LanguageContext';
import { PRODUCTS_DATA } from '@/data/productsData';
import { TruckPreloader } from '@/components/Preloader/TruckPreloader';
import toast from 'react-hot-toast';
import { ShoppingBag, User, MapPin, CreditCard, Gift, ShieldCheck, Truck } from 'lucide-react';

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

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { cart, cartSubtotal, cartCount, clearCart } = useCart();

  const productSlug = searchParams.get('product');
  const sizeParam = searchParams.get('size');
  const qtyParam = searchParams.get('qty');

  const rawProduct = useMemo(() => {
    if (!productSlug) return null;
    return PRODUCTS_DATA[productSlug] || Object.values(PRODUCTS_DATA).find(p => p.slug === productSlug);
  }, [productSlug]);

  const [selectedSize, setSize] = useState(sizeParam || '');
  const [quantity, setQty] = useState(qtyParam ? parseInt(qtyParam, 10) : 1);
  const [payment, setPayment] = useState('cod');
  const [orderId, setOrderId] = useState(null);
  const [isOrdering, setIsOrdering] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    city: '',
    province: 'Punjab',
    postal: '',
    address: '',
    instructions: '',
  });
  const [errors, setErrors] = useState({});

  // Initialize selected size if product is loaded
  useEffect(() => {
    if (rawProduct) {
      const sizesList = rawProduct.sizes
        ? rawProduct.sizes.map(s => typeof s === 'object' ? s.size : s)
        : [rawProduct.packaging || '100ML'];
      if (!selectedSize && sizesList.length > 0) {
        setSize(sizeParam || sizesList[0]);
      }
    }
  }, [rawProduct, selectedSize, sizeParam]);

  // Compute selected product details
  const product = useMemo(() => {
    if (!rawProduct) return null;
    const sizesList = rawProduct.sizes
      ? rawProduct.sizes.map(s => typeof s === 'object' ? s.size : s)
      : [rawProduct.packaging || '100ML'];

    let price = rawProduct.price || 999;
    if (rawProduct.sizes) {
      const sizeObj = rawProduct.sizes.find(s => (typeof s === 'object' ? s.size : s) === selectedSize);
      if (sizeObj && sizeObj.price) {
        price = sizeObj.price;
      } else if (sizeObj && sizeObj.rate && sizeObj.rate !== "Negotiable") {
        price = Number(sizeObj.rate);
      }
    }

    return {
      ...rawProduct,
      name: typeof rawProduct.name === 'object' ? (rawProduct.name[lang] || rawProduct.name.en) : rawProduct.name,
      image: `/products/${rawProduct.slug}.png`,
      formula: rawProduct.formula || rawProduct.activeIngredient || rawProduct.formulation || '',
      sizes: sizesList,
      price,
    };
  }, [rawProduct, selectedSize, lang]);

  // Calculate pricing breakdown
  const subtotal = product ? (product.price * quantity) : cartSubtotal;
  const delivery = getDeliveryFee(payment);
  const grandTotal = subtotal + delivery;

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: null }));
    }
  };

  const validateForm = () => {
    const e = {};
    if (!form.fullName.trim()) {
      e.fullName = lang === 'en' ? 'Full name is required' : 'مکمل نام درج کرنا ضروری ہے';
    }
    if (!form.phone.trim()) {
      e.phone = lang === 'en' ? 'Phone number is required' : 'فون نمبر درج کرنا ضروری ہے';
    } else if (!/^03\d{9}$/.test(form.phone.replace(/[\s-]/g, ''))) {
      e.phone = lang === 'en'
        ? 'Please enter a valid phone number (e.g. 03001234567)'
        : 'درست فون نمبر درج کریں (جیسے 03001234567)';
    }
    if (!form.city.trim()) {
      e.city = lang === 'en' ? 'City is required' : 'شہر کا نام درج کرنا ضروری ہے';
    }
    if (!form.address.trim()) {
      e.address = lang === 'en' ? 'Complete delivery address is required' : 'مکمل پتہ درج کرنا ضروری ہے';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleComplete = async () => {
    if (!validateForm()) {
      toast.error(lang === 'en' ? 'Please complete all required fields correctly.' : 'برائے مہربانی تمام فیلڈز درست طریقے سے پُر کریں۔');
      return;
    }

    setIsOrdering(true);
    setPreloaderDone(false);

    const productName = product
      ? product.name
      : cart.map(item => `${item.name[lang] || item.name} (${item.size.size})`).join(', ');

    const productImage = product
      ? (product.image || '')
      : (cart[0]?.pngUrl || cart[0]?.imageUrl || '');

    const packSize = product ? selectedSize : 'Multiple';
    const finalQty = product ? quantity : cartCount;
    const finalPricePerUnit = product ? product.price : 0;

    const orderData = {
      productName,
      productImage,
      category: product ? (product.category || 'Special Product') : 'Multiple Products',
      packSize,
      quantity: finalQty,
      pricePerUnit: finalPricePerUnit,
      subtotal,
      deliveryCharge: delivery,
      grandTotal,
      paymentMethod: payment,
      customerName: form.fullName,
      customerPhone: form.phone,
      city: form.city,
      province: form.province,
      postalCode: form.postal,
      address: form.address,
      instructions: form.instructions,
      whatsappSent: true,
      source: 'website_checkout',
      ...(!product && {
        items: cart.map(item => ({
          id: item.id,
          name: item.name[lang] || item.name,
          size: item.size.size,
          quantity: item.quantity,
          price: Number(item.size.price || item.size.rate || 0)
        }))
      })
    };

    try {
      const generatedId = await createOrder(orderData).catch(err => {
        console.error(err);
        return 'VA-' + Math.floor(100000 + Math.random() * 900000);
      });
      setOrderId(generatedId);
    } catch (err) {
      console.error(err);
      toast.error(lang === 'en' ? 'Order placement failed, trying fallback...' : 'آرڈر ڈیٹا بیس میں محفوظ نہیں ہوسکا، متبادل طریقہ آزمایا جا رہا ہے۔');
      setOrderId('VA-' + Math.floor(100000 + Math.random() * 900000));
    }
  };

  // Check if both order storage and preloader are completed to redirect
  useEffect(() => {
    if (isOrdering && orderId && preloaderDone) {
      const productName = product
        ? product.name
        : cart.map(item => `${item.name[lang] || item.name} (${item.size.size})`).join(', ');

      const packSize = product ? selectedSize : 'Multiple';
      const finalQty = product ? quantity : cartCount;

      const orderDataForWA = {
        orderNumber: orderId,
        productName,
        packSize,
        quantity: finalQty,
        subtotal,
        deliveryCharge: delivery,
        grandTotal,
        paymentMethod: payment,
        customerName: form.fullName,
        customerPhone: form.phone,
        city: form.city,
        province: form.province,
        address: form.address,
        instructions: form.instructions
      };

      const waUrl = buildOrderMessage(orderDataForWA);

      // Open WhatsApp prefilled message
      window.open(waUrl, '_blank');

      if (!product) {
        clearCart();
      }

      // Navigate to order success route
      navigate(`/order-success/${orderId}`);
    }
  }, [orderId, preloaderDone, isOrdering, product, selectedSize, quantity, cartCount, subtotal, delivery, grandTotal, payment, form, clearCart, navigate, lang]);

  const rewardMessage = useMemo(() => {
    if (payment === 'jazzcash' || payment === 'easypaisa' || payment === 'meezan') {
      return lang === 'en'
        ? '🎉 Online Payment Reward: FREE Delivery Applied!'
        : '🎉 آن لائن ادائیگی کا انعام: مفت ڈیلیوری لاگو ہو گئی!';
    }
    return '';
  }, [payment, lang]);

  // Handle empty state if no product slug and cart is empty
  if (!productSlug && cart.length === 0 && !isOrdering) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center bg-[#020d06] text-white px-4">
        <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/30 mx-auto">
            <ShoppingBag size={32} />
          </div>
          <h2 className="text-2xl font-black">
            {lang === 'en' ? 'Your Cart is Empty' : 'آپ کی کارٹ خالی ہے'}
          </h2>
          <p className="text-sm text-white/50 leading-relaxed">
            {lang === 'en'
              ? 'Please select products from our catalog before proceeding to checkout.'
              : 'براہ کرم چیک آؤٹ پر جانے سے پہلے ہماری کیٹلاگ سے پروڈکٹس منتخب کریں۔'}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center w-full px-6 py-4 bg-[#76C945] hover:bg-[#8AD65A] text-[#0A2E1F] rounded-2xl text-sm font-black transition-colors"
          >
            {lang === 'en' ? 'Explore Products' : 'پروڈکٹس دیکھیں'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#020d06] text-white relative select-none">
      {/* Preloader full-screen overlay during order completion */}
      <AnimatePresence>
        {isOrdering && (
          <TruckPreloader onComplete={() => setPreloaderDone(true)} />
        )}
      </AnimatePresence>

      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full blur-[150px] bg-[#76C945]/10" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full blur-[150px] bg-[#8AD65A]/5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
            {lang === 'en' ? 'Premium Checkout' : 'پریمیئم چیک آؤٹ'}
          </h1>
          <p className="text-white/40 text-xs sm:text-sm font-medium mt-1">
            {lang === 'en'
              ? 'Secure Cash on Delivery & Online Transfer Options'
              : 'محفوظ کیش آن ڈیلیوری اور آن لائن ٹرانسفر کے اختیارات'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Shipping & Payment Form */}
          <div className="lg:col-span-7 space-y-6 bg-white/[0.02] border border-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-3 pb-4 border-b border-white/5">
              <div className="w-8 h-8 rounded-lg bg-[#76C945]/10 flex items-center justify-center text-[#8AD65A]">
                <MapPin size={16} />
              </div>
              <h2 className="text-lg font-black tracking-tight uppercase">
                {lang === 'en' ? 'Shipping Details' : 'ڈیلیوری کی تفصیلات'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label={lang === 'en' ? 'Full Name' : 'مکمل نام'}
                required
                placeholder={lang === 'en' ? 'E.g., Muhammad Ali' : 'مثال: محمد علی'}
                value={form.fullName}
                onChange={e => updateField('fullName', e.target.value)}
                error={errors.fullName}
              />

              <FormField
                label={lang === 'en' ? 'Phone Number' : 'فون نمبر'}
                required
                type="tel"
                placeholder="03001234567"
                value={form.phone}
                onChange={e => updateField('phone', e.target.value)}
                error={errors.phone}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label={lang === 'en' ? 'City' : 'شہر'}
                required
                placeholder={lang === 'en' ? 'E.g., Haroonabad' : 'مثال: ہارون آباد'}
                value={form.city}
                onChange={e => updateField('city', e.target.value)}
                error={errors.city}
              />

              <div className="space-y-2">
                <label className="block text-white/50 text-[11px] font-black tracking-[0.12em] uppercase">
                  {lang === 'en' ? 'Province' : 'صوبہ'} <span className="text-[#8AD65A]">*</span>
                </label>
                <select
                  value={form.province}
                  onChange={e => updateField('province', e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl text-white text-sm bg-white/5 border border-white/10 outline-none focus:border-[#76C945] transition-all appearance-none cursor-pointer"
                >
                  {PROVINCES.map(p => (
                    <option key={p} value={p} style={{ background: '#020d06', color: 'white' }}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <FormField
              label={lang === 'en' ? 'Postal Code (Optional)' : 'پوسٹل کوڈ (اختیاری)'}
              placeholder="63100"
              type="tel"
              value={form.postal}
              onChange={e => updateField('postal', e.target.value)}
            />

            <div className="space-y-2">
              <label className="block text-white/50 text-[11px] font-black tracking-[0.12em] uppercase">
                {lang === 'en' ? 'Complete Delivery Address' : 'مکمل ڈیلیوری کا پتہ'} <span className="text-[#8AD65A]">*</span>
              </label>
              <textarea
                rows={3}
                placeholder={lang === 'en' ? 'House number, Gali/Street, Mohalla, Near landmark...' : 'گھر کا نمبر، گلی/روڈ، محلہ، قریبی مشہور جگہ...'}
                value={form.address}
                onChange={e => updateField('address', e.target.value)}
                className={`w-full px-5 py-4 rounded-2xl text-white text-sm bg-white/5 border outline-none resize-none placeholder:text-white/20 transition-all ${
                  errors.address ? 'border-red-500/40 focus:border-red-400' : 'border-white/10 focus:border-[#76C945]'
                }`}
              />
              {errors.address && <p className="text-red-400 text-[11px] font-bold">⚠ {errors.address}</p>}
            </div>

            <FormField
              label={lang === 'en' ? 'Delivery Instructions (Optional)' : 'خصوصی ہدایات (اختیاری)'}
              placeholder={lang === 'en' ? 'E.g., Call before arrival, deliver after 2 PM' : 'مثال: پہنچنے سے پہلے کال کریں، دوپہر کے بعد پہنچائیں'}
              value={form.instructions}
              onChange={e => updateField('instructions', e.target.value)}
            />

            <div className="pt-4">
              <PaymentMethodGrid
                selected={payment}
                onSelect={setPayment}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary & Placement */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/[0.02] border border-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                <div className="w-8 h-8 rounded-lg bg-[#76C945]/10 flex items-center justify-center text-[#8AD65A]">
                  <ShoppingBag size={16} />
                </div>
                <h2 className="text-lg font-black tracking-tight uppercase">
                  {lang === 'en' ? 'Order Summary' : 'آرڈر کا خلاصہ'}
                </h2>
              </div>

              {/* Items Display */}
              {product ? (
                /* Single Product Checkout */
                <div className="space-y-6">
                  <div className="flex gap-4 items-center p-4 rounded-2xl bg-white/5 border border-white/10">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
                      onError={e => {
                        e.target.src = '/logo.png';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-black text-[#8AD65A] tracking-wider uppercase block">
                        {product.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-extrabold truncate">{product.name}</h3>
                      <p className="text-white/40 text-[10px] sm:text-xs font-mono truncate">{product.formula}</p>
                      <p className="text-[#8AD65A] text-xs sm:text-sm font-black font-mono mt-1">
                        PKR {product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div className="space-y-2.5">
                    <span className="block text-white/50 text-[10px] font-black uppercase tracking-widest">
                      {lang === 'en' ? 'Select Package Size' : 'پیکنگ کا سائز منتخب کریں'}
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {product.sizes?.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSize(size)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-black border transition-all ${
                            selectedSize === size
                              ? 'bg-[#2d6a2d] border-[#76C945] text-white shadow-[0_0_10px_rgba(92,184,92,0.15)]'
                              : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-xs sm:text-sm font-bold text-white/70">
                      {lang === 'en' ? 'Quantity' : 'مقدار'}
                    </span>
                    <div className="flex items-center gap-3.5">
                      <button
                        onClick={() => setQty(q => Math.max(1, q - 1))}
                        className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center text-sm font-bold hover:bg-white/20 active:scale-90 transition-all"
                      >
                        −
                      </button>
                      <span className="text-white font-black text-sm sm:text-base w-6 text-center font-mono">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQty(q => q + 1)}
                        className="w-8 h-8 rounded-full bg-[#2d6a2d] text-white flex items-center justify-center text-sm font-bold hover:bg-[#3d8c3d] active:scale-90 transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Cart Checkout */
                <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2 scrollbar-hide">
                  {cart.map((item) => (
                    <div key={item.cartId} className="flex items-center gap-4 p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <img
                        src={item.pngUrl || item.imageUrl}
                        alt={item.name[lang] || item.name}
                        className="w-12 h-12 object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] shrink-0"
                        onError={e => {
                          e.target.src = '/logo.png';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-extrabold truncate">{item.name[lang] || item.name}</h4>
                        <p className="text-[9px] text-[#8AD65A] font-black uppercase tracking-wider">{item.size.size}</p>
                        <p className="text-white/40 text-[10px] mt-0.5">
                          Qty: {item.quantity} × PKR {Number(item.size.price || item.size.rate || 0).toLocaleString()}
                        </p>
                      </div>
                      <span className="text-xs sm:text-sm font-black font-mono shrink-0">
                        PKR {(Number(item.size.price || item.size.rate || 0) * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-3 p-4.5 rounded-2xl bg-white/3 border border-white/8 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/50">{lang === 'en' ? 'Subtotal' : 'سب ٹوٹل'}</span>
                  <span className="text-white font-mono">PKR {subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white/50">{lang === 'en' ? 'Delivery Fee' : 'ڈیلیوری چارجز'}</span>
                  {delivery === 0 ? (
                    <span className="text-[#5cb85c] font-black uppercase text-xs tracking-wider">
                      {lang === 'en' ? 'FREE Delivery' : 'مفت ڈیلیوری'}
                    </span>
                  ) : (
                    <span className="text-white font-mono">PKR {delivery}</span>
                  )}
                </div>

                {delivery > 0 && (
                  <p className="text-[#76C945] text-[10px] leading-relaxed">
                    💡 {lang === 'en' ? 'Select JazzCash, Easypaisa, or Bank Transfer to unlock FREE Delivery.' : 'مفت ڈیلیوری حاصل کرنے کے لیے ایزی پیسہ، جیز کیش یا بینک ٹرانسفر منتخب کریں۔'}
                  </p>
                )}

                <div className="h-px bg-white/10" />

                <div className="flex justify-between items-center pt-1">
                  <span className="text-[#5cb85c] font-extrabold">{lang === 'en' ? 'Grand Total' : 'ٹوٹل رقم'}</span>
                  <span className="text-[#5cb85c] font-black text-xl font-mono">
                    PKR {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {rewardMessage && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-[#5cb85c] font-bold text-xs text-center">
                  {rewardMessage}
                </div>
              )}

              {/* COMPLETE ORDER BUTTON */}
              <motion.button
                onClick={handleComplete}
                disabled={isOrdering}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4.5 rounded-2xl font-black text-sm text-[#0A2E1F] flex items-center justify-center gap-2 shadow-2xl transition-all cursor-pointer select-none"
                style={{
                  background: 'linear-gradient(135deg, #76C945, #5cb85c)',
                  boxShadow: '0 10px 30px rgba(92, 184, 92, 0.25)',
                }}
              >
                <Truck size={16} />
                <span>
                  {payment === 'cod'
                    ? (lang === 'en' ? 'Complete Order (COD)' : 'آرڈر کنفرم کریں (COD)')
                    : (lang === 'en' ? 'Complete Order & Pay' : 'آرڈر کنفرم کریں اور ادائیگی کریں')}
                </span>
              </motion.button>

              <div className="flex items-center gap-2.5 justify-center text-[10px] text-white/20 select-none">
                <ShieldCheck size={14} className="text-[#76C945]" />
                <span>Secure SSL Checkout & WhatsApp Verification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
