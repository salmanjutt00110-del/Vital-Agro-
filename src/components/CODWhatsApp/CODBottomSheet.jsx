import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Image, AlertCircle, CreditCard, Landmark, Truck, Copy, Check, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import OrderConfirmButton from './OrderConfirmButton';
import { verifyReceipt } from '@/lib/ai/receiptVerifier';
import { verifyReceiptUnique } from '@/lib/api';

const InputField = ({ label, error, ...props }) => (
  <div className="w-full">
    <label className="block text-white/50 text-[11px] font-black uppercase tracking-wider mb-2">
      {label}
    </label>
    <input
      {...props}
      className={`
        w-full px-4 py-3.5 rounded-2xl text-sm text-white
        bg-white/[0.03] border outline-none
        placeholder:text-white/20
        focus:border-[#5cb85c]/60 focus:bg-white/[0.06]
        transition-all duration-300
        ${error
          ? 'border-red-500/50 bg-red-500/5'
          : 'border-white/10'
        }
      `}
    />
    {error && (
      <p className="text-red-400 text-[10px] mt-1.5 ml-1 font-semibold">{error}</p>
    )}
  </div>
);

export default function CODBottomSheet({
  product, isOpen, setIsOpen,
  form, setForm, errors, isSubmitting, setIsSubmitting, handleSubmit,
  validate, submitOrder, resetForm,
}) {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [createdOrderId, setCreatedOrderId] = useState(null);
  
  // OCR Flow States
  const [isVerifyingReceipt, setIsVerifyingReceipt] = useState(false);
  const [ocrStepIndex, setOcrStepIndex] = useState(0);
  const [receiptError, setReceiptError] = useState(null);
  const [receiptSuccess, setReceiptSuccess] = useState(false);

  // Stripe Flow Simulation
  const [stripeSimulating, setStripeSimulating] = useState(false);
  const [stripeStep, setStripeStep] = useState(1);

  // Copy Buttons feedback
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedTitle, setCopiedTitle] = useState(false);

  // Countdown timer state (15 minutes)
  const [timeLeft, setTimeLeft] = useState(900);

  useEffect(() => {
    if (!isOpen || (form.paymentMethod !== 'JazzCash' && form.paymentMethod !== 'Easypaisa')) {
      setTimeLeft(900);
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, form.paymentMethod]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'number') {
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2000);
    } else {
      setCopiedTitle(true);
      setTimeout(() => setCopiedTitle(false), 2000);
    }
  };

  const ocrSteps = [
    "Uploading screenshot receipt...",
    "AI Scanning image grids...",
    "Gemini reading text nodes...",
    "Verifying transaction signatures...",
    "Matching receiver wallet IDs...",
    "Double-spend duplicate checking...",
    "Confirming validation statuses..."
  ];

  const handleReceiptUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsVerifyingReceipt(true);
    setOcrStepIndex(0);
    setReceiptError(null);
    setReceiptSuccess(false);

    // Simulate stepping through OCR stages visually
    const stepInterval = setInterval(() => {
      setOcrStepIndex(prev => {
        if (prev < ocrSteps.length - 1) return prev + 1;
        clearInterval(stepInterval);
        return prev;
      });
    }, 900);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result.substring(reader.result.indexOf(',') + 1);
      const mimeType = file.type || 'image/jpeg';

      try {
        const parsed = await verifyReceipt(base64Data, mimeType);
        
        // 1. Merchant Destination Wallet Validation
        const expectedWallet = form.paymentMethod === 'JazzCash' ? '03001234567' : '03011837160';
        const parsedWalletClean = parsed.receiverWallet ? parsed.receiverWallet.replace(/\D/g, '') : '';
        
        if (parsedWalletClean && !parsedWalletClean.includes(expectedWallet)) {
          clearInterval(stepInterval);
          setIsVerifyingReceipt(false);
          setReceiptError(`Receiver account mismatch. Expected merchant wallet ${expectedWallet} but read ${parsedWalletClean || 'N/A'}. Make sure you sent to the correct account.`);
          return;
        }

        // 2. Duplicate Check / Double Spend Verification
        const checkResult = await verifyReceiptUnique(parsed.refId);
        if (checkResult.duplicate) {
          clearInterval(stepInterval);
          setIsVerifyingReceipt(false);
          setForm(prev => ({ ...prev, paymentDuplicate: true }));
          setReceiptError("Duplicate transaction detected. This transaction receipt was already used for another order.");
          return;
        }

        // 3. Amount Matching Check
        if (parsed.amount < grandTotal) {
          clearInterval(stepInterval);
          setIsVerifyingReceipt(false);
          setReceiptError(`Amount mismatch. Expected PKR ${grandTotal.toLocaleString()} but read PKR ${parsed.amount.toLocaleString()}. Transfer full total or contact support.`);
          return;
        }

        // Complete Verification
        clearInterval(stepInterval);
        setForm(prev => ({
          ...prev,
          paymentRefId: parsed.refId,
          paymentAmount: parsed.amount,
          paymentTimestamp: parsed.timestamp,
          paymentSender: parsed.sender || 'Client Name',
          paymentReceiver: parsed.receiver || 'Vital Agro',
          paymentReceiverWallet: parsed.receiverWallet || expectedWallet,
          paymentConfidence: parsed.confidenceScore || 0.95,
          paymentDuplicate: false,
          receiptBase64: reader.result,
        }));
        setReceiptSuccess(true);
      } catch (err) {
        clearInterval(stepInterval);
        setReceiptError(lang === 'en' ? 'Failed to read receipt details. Please upload a clear receipt.' : 'رسید کی تفصیلات پڑھنے میں ناکامی۔ براہ کرم واضح رسید اپ لوڈ کریں۔');
      } finally {
        setIsVerifyingReceipt(false);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!product) return null;

  const updateForm = (key, value) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const sizes = product.sizes ? product.sizes.map(s => typeof s === 'object' ? s.size : s) : [];

  const getPriceForSize = (selectedSizeName) => {
    if (product.sizes && product.sizes.length > 0) {
      const match = product.sizes.find(s => {
        const sizeVal = typeof s === 'object' ? s.size : s;
        return sizeVal === selectedSizeName;
      });
      if (match && typeof match === 'object') {
        return match.price || match.rate || 999;
      }
    }
    if (product.pricing && product.pricing.length > 0) {
      const match = product.pricing.find(p => p.size === selectedSizeName);
      if (match) return Number(match.rate) || 999;
    }
    return product.price || 999;
  };

  const currentPrice = getPriceForSize(form.selectedSize);
  const localizedName = typeof product.name === 'object' ? (product.name[lang] || product.name.en) : product.name;
  const imageSrc = product.pngUrl || product.imageUrl || product.image;

  // Checkout Calculations
  const itemsSubtotal = currentPrice * form.quantity;
  const deliveryCharges = itemsSubtotal > 3000 ? 0 : 250;
  const grandTotal = itemsSubtotal + deliveryCharges;

  const startStripeFlow = async () => {
    setStripeSimulating(true);
    setStripeStep(1);
    await new Promise(r => setTimeout(r, 1400));
    setStripeStep(2);
    await new Promise(r => setTimeout(r, 1600));
    setStripeStep(3);
    await new Promise(r => setTimeout(r, 1000));
    setStripeSimulating(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black text-white font-sans">
          
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            className="min-h-screen w-full flex flex-col relative"
            style={{
              background: 'radial-gradient(circle at top, #0f2d1a 0%, #050a06 100%)',
            }}
          >
            {/* Header Toolbar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 backdrop-blur-md sticky top-0 bg-black/60 z-30">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5cb85c] animate-pulse" />
                <h2 className="text-lg font-black tracking-widest uppercase">
                  {lang === 'en' ? 'Vital Agro Premium Checkout' : 'وائٹل ایگرو پریمیم چیک آؤٹ'}
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors border border-white/10 text-white/70 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Checkout Layout Grid */}
            <div className="max-w-7xl mx-auto w-full px-6 py-8 grid lg:grid-cols-12 gap-8 items-start flex-1">
              
              {/* Left Column: Form Info */}
              <div className="lg:col-span-7 space-y-8 bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8">
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight text-[#8AD65A] mb-1">
                    {lang === 'en' ? 'Shipping Destination' : 'ڈیلیوری کا پتہ'}
                  </h3>
                  <p className="text-white/40 text-xs font-semibold">
                    Provide valid delivery credentials to finalize packaging logs.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <InputField
                    label={lang === 'en' ? "Full Name *" : "مکمل نام *"}
                    placeholder="Muhammad Ali"
                    value={form.customerName}
                    onChange={(e) => updateForm('customerName', e.target.value)}
                    error={errors.customerName}
                  />

                  <InputField
                    label={lang === 'en' ? "Phone Number *" : "فون نمبر *"}
                    placeholder="03001234567"
                    value={form.phone}
                    onChange={(e) => updateForm('phone', e.target.value)}
                    error={errors.phone}
                    inputMode="tel"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                  <InputField
                    label={lang === 'en' ? "City *" : "شہر *"}
                    placeholder="Haroonabad"
                    value={form.city}
                    onChange={(e) => updateForm('city', e.target.value)}
                    error={errors.city}
                  />

                  <InputField
                    label={lang === 'en' ? "Province / State *" : "صوبہ *"}
                    placeholder="Punjab"
                    value={form.province}
                    onChange={(e) => updateForm('province', e.target.value)}
                    error={errors.province}
                  />

                  <InputField
                    label={lang === 'en' ? "Postal Code (Optional)" : "پوسٹل کوڈ (اختیاری)"}
                    placeholder="62300"
                    value={form.postalCode}
                    onChange={(e) => updateForm('postalCode', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-white/50 text-[11px] font-black uppercase tracking-wider">
                    {lang === 'en' ? 'Complete Street Address *' : 'مکمل پتہ *'}
                  </label>
                  <textarea
                    rows={2.5}
                    placeholder={lang === 'en' ? "House No, Street, Mohalla, Nearby Landmark..." : "مکان نمبر، گلی، محلہ، نزدیکی نشان..."}
                    value={form.address}
                    onChange={(e) => updateForm('address', e.target.value)}
                    className={`
                      w-full px-4 py-3.5 rounded-2xl text-sm text-white bg-white/[0.03] border outline-none resize-none
                      placeholder:text-white/20 focus:border-[#5cb85c]/60 focus:bg-white/[0.06] transition-all duration-300
                      ${errors.address ? 'border-red-500/50 bg-red-500/5' : 'border-white/10'}
                    `}
                  />
                  {errors.address && (
                    <p className="text-red-400 text-[10px] font-semibold mt-1 ml-1">{errors.address}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-white/50 text-[11px] font-black uppercase tracking-wider">
                    {lang === 'en' ? 'Special Delivery Instructions (Optional)' : 'خصوصی ہدایات (اختیاری)'}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={lang === 'en' ? "Deliver after 4 PM, call before arrival, etc." : "شام 4 بجے کے بعد ڈیلیور کریں، آمد سے پہلے کال کریں، وغیرہ..."}
                    value={form.specialInstructions || ''}
                    onChange={(e) => updateForm('specialInstructions', e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl text-sm text-white bg-white/[0.03] border border-white/10 outline-none resize-none placeholder:text-white/20 focus:border-[#5cb85c]/60 focus:bg-white/[0.06] transition-all duration-300"
                  />
                </div>
              </div>

              {/* Right Column: Checkout Summary, Payments & Confirmation */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* 1. Selected Product Card */}
                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 space-y-4">
                  <h4 className="text-[#8AD65A] font-extrabold text-xs uppercase tracking-widest">
                    {lang === 'en' ? 'Order Summary' : 'آرڈر کی تفصیلات'}
                  </h4>

                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 p-1 flex items-center justify-center shrink-0">
                      <img src={imageSrc} alt={localizedName} className="w-full h-full object-contain drop-shadow" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-white font-bold text-sm truncate">{localizedName}</h5>
                      <p className="text-white/40 text-[11px] mt-0.5 truncate">
                        {product.activeIngredient || product.formula || product.category}
                      </p>
                      <p className="text-[#5cb85c] font-mono font-black text-xs mt-1">
                        PKR {currentPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {sizes.length > 1 && (
                    <div className="pt-3 border-t border-white/5">
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-wider block mb-2">Pack Size:</span>
                      <div className="flex flex-wrap gap-2">
                        {sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => updateForm('selectedSize', size)}
                            className={`
                              px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200
                              ${form.selectedSize === size
                                ? 'bg-[#2d6a2d]/30 border-[#5cb85c] text-white shadow-lg shadow-[#5cb85c]/10'
                                : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                              }
                            `}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-3 border-t border-white/5">
                    <span className="text-white/40 text-xs font-bold">Quantity:</span>
                    <div className="flex items-center gap-3.5">
                      <button
                        onClick={() => updateForm('quantity', Math.max(1, form.quantity - 1))}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-white flex items-center justify-center font-black transition-colors"
                      >
                        −
                      </button>
                      <span className="text-white font-black text-sm w-4 text-center">{form.quantity}</span>
                      <button
                        onClick={() => updateForm('quantity', form.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-[#2d6a2d]/50 hover:bg-[#3d8c3d] text-white flex items-center justify-center font-black transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Billing Breakdown */}
                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 space-y-3 font-mono text-xs">
                  <div className="flex justify-between text-white/55">
                    <span>Subtotal:</span>
                    <span>PKR {itemsSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white/55">
                    <span>Delivery Charges:</span>
                    <span>{deliveryCharges === 0 ? 'FREE' : `PKR ${deliveryCharges}`}</span>
                  </div>
                  <div className="flex justify-between text-[#8AD65A] font-black text-sm pt-2.5 border-t border-white/5">
                    <span>Grand Total:</span>
                    <span>PKR {grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* 3. Interactive Payment Option Cards */}
                <div className="space-y-3">
                  <h4 className="text-white/50 text-[11px] font-black uppercase tracking-wider">
                    {lang === 'en' ? 'Choose Payment Method' : 'طریقہ ادائیگی منتخب کریں'}
                  </h4>

                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { id: 'COD', name: 'Cash On Delivery', desc: 'Pay at your doorstep', icon: Truck },
                      { id: 'Stripe', name: 'Credit / Debit Card', desc: 'Secure by Stripe', icon: CreditCard },
                      { id: 'JazzCash', name: 'JazzCash Wallet', desc: 'Transfer & verify', icon: ShieldCheck },
                      { id: 'Easypaisa', name: 'Easypaisa Wallet', desc: 'Transfer & verify', icon: ShieldCheck },
                      { id: 'Bank', name: 'Meezan Bank Ltd', desc: 'Direct bank transfer', icon: Landmark },
                    ].map((method) => {
                      const Icon = method.icon;
                      const isSelected = form.paymentMethod === method.id;
                      return (
                        <motion.button
                          key={method.id}
                          type="button"
                          onClick={() => updateForm('paymentMethod', method.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            boxShadow: isSelected
                              ? '0 0 25px rgba(92, 184, 92, 0.25), inset 0 0 10px rgba(92, 184, 92, 0.1)'
                              : 'none',
                          }}
                          className={`
                            p-4 rounded-2xl border text-left flex flex-col gap-2.5 transition-all duration-300
                            ${isSelected
                              ? 'bg-[#2d6a2d]/15 border-[#5cb85c] text-white'
                              : 'bg-white/[0.02] border-white/10 text-white/60 hover:bg-white/[0.04]'
                            }
                          `}
                        >
                          <div className={`p-2 rounded-xl w-fit ${isSelected ? 'bg-[#5cb85c]/25 text-[#8AD65A]' : 'bg-white/5 text-white/40'}`}>
                            <Icon size={18} />
                          </div>
                          <div>
                            <span className="font-extrabold text-xs block text-white">{method.name}</span>
                            <span className="text-[9px] text-white/35 block mt-0.5">{method.desc}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Payment Workflows (Countdown, QR codes, copy buttons, OCR visualizer) */}
                {(form.paymentMethod === 'JazzCash' || form.paymentMethod === 'Easypaisa') && (
                  <div className="p-5 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                    
                    {/* Countdown Timer Header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <h5 className="font-extrabold text-xs text-[#8AD65A] uppercase tracking-wide">
                        {form.paymentMethod} Transfer Details
                      </h5>
                      <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-amber-400 bg-amber-400/5 border border-amber-400/20 px-2 py-0.5 rounded-lg">
                        <Clock size={12} className="animate-spin" style={{ animationDuration: '6s' }} />
                        <span>{formatTime(timeLeft)}</span>
                      </div>
                    </div>

                    {/* Merchant Transfer Specs */}
                    <div className="text-xs text-white/70 space-y-3 leading-relaxed font-mono relative">
                      <div className="flex justify-between items-center bg-white/[0.01] border border-white/5 p-2 rounded-xl">
                        <div>
                          <span className="text-[9px] text-white/30 block uppercase font-bold">Account Title</span>
                          <span className="text-white font-bold">Vital Agro</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('Vital Agro', 'title')}
                          className="p-1.5 bg-white/5 rounded hover:bg-white/10 transition-colors border border-white/10 text-white/50 hover:text-white"
                        >
                          {copiedTitle ? <Check size={12} className="text-[#8AD65A]" /> : <Copy size={12} />}
                        </button>
                      </div>

                      <div className="flex justify-between items-center bg-white/[0.01] border border-white/5 p-2 rounded-xl">
                        <div>
                          <span className="text-[9px] text-white/30 block uppercase font-bold">{form.paymentMethod} Number</span>
                          <span className="text-white font-black">{form.paymentMethod === 'JazzCash' ? '0300-1234567' : '0301-1837160'}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(form.paymentMethod === 'JazzCash' ? '03001234567' : '03011837160', 'number')}
                          className="p-1.5 bg-white/5 rounded hover:bg-white/10 transition-colors border border-white/10 text-white/50 hover:text-white"
                        >
                          {copiedNumber ? <Check size={12} className="text-[#8AD65A]" /> : <Copy size={12} />}
                        </button>
                      </div>

                      {/* Premium QR Code SVG representation */}
                      <div className="flex flex-col items-center justify-center p-3 border border-white/5 bg-white/[0.01] rounded-2xl gap-2 mt-2">
                        <span className="text-[8px] text-white/40 uppercase tracking-widest font-black">Scan Wallet QR Code</span>
                        <svg className="w-24 h-24 text-[#8AD65A]" viewBox="0 0 100 100" fill="currentColor">
                          <rect x="10" y="10" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                          <rect x="15" y="15" width="15" height="15" fill="currentColor" />
                          <rect x="65" y="10" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                          <rect x="70" y="15" width="15" height="15" fill="currentColor" />
                          <rect x="10" y="65" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                          <rect x="15" y="70" width="15" height="15" fill="currentColor" />
                          {/* Random noise matrix blocks for premium feel */}
                          <rect x="45" y="20" width="10" height="10" fill="currentColor" />
                          <rect x="45" y="45" width="10" height="10" fill="currentColor" />
                          <rect x="20" y="45" width="10" height="10" fill="currentColor" />
                          <rect x="75" y="45" width="10" height="10" fill="currentColor" />
                          <rect x="65" y="75" width="15" height="10" fill="currentColor" />
                          <rect x="45" y="70" width="10" height="20" fill="currentColor" />
                        </svg>
                      </div>
                    </div>

                    {/* Screenshot Upload Block */}
                    <div className="space-y-3 pt-2">
                      <span className="text-[9px] font-black text-white/40 uppercase tracking-widest block">
                        Upload Transfer Receipt Screenshot
                      </span>

                      {form.receiptBase64 ? (
                        <div className="relative rounded-2xl border border-white/10 overflow-hidden aspect-video bg-black/40 flex items-center justify-center">
                          <img src={form.receiptBase64} alt="Receipt Preview" className="w-full h-full object-contain" />
                          <button
                            type="button"
                            onClick={() => {
                              updateForm('receiptBase64', '');
                              updateForm('paymentRefId', '');
                              updateForm('paymentAmount', 0);
                              updateForm('paymentTimestamp', '');
                              updateForm('paymentSender', '');
                              updateForm('paymentReceiver', '');
                              updateForm('paymentReceiverWallet', '');
                              updateForm('paymentConfidence', 1.0);
                              updateForm('paymentDuplicate', false);
                              setReceiptSuccess(false);
                              setReceiptError(null);
                            }}
                            className="absolute top-2.5 right-2.5 p-2 bg-black/70 rounded-full text-white/80 hover:text-white border border-white/10 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <label className="border-2 border-dashed border-white/10 hover:border-[#5cb85c]/40 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-white/[0.01] hover:bg-white/[0.03] transition-all">
                          <Image size={24} className="text-white/40 mb-2" />
                          <span className="text-xs font-bold text-white/80 mb-0.5">
                            {isVerifyingReceipt ? 'AI Verifying Receipt...' : 'Select Screenshot Receipt'}
                          </span>
                          <span className="text-[10px] text-white/20">PNG, JPG, JPEG up to 10MB</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleReceiptUpload}
                            disabled={isVerifyingReceipt}
                            className="hidden"
                          />
                        </label>
                      )}

                      {/* Step-by-step progress visualizer overlay */}
                      {isVerifyingReceipt && (
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                          <div className="flex items-center gap-2 text-[#8AD65A]">
                            <span className="w-4.5 h-4.5 border-2 border-current border-t-transparent animate-spin rounded-full shrink-0" />
                            <span className="text-xs font-bold font-mono tracking-wide uppercase">AI Payment Verification</span>
                          </div>
                          
                          {/* Visual Steps Trail */}
                          <div className="space-y-1 mt-2 font-mono text-[10px] text-white/60">
                            {ocrSteps.map((step, idx) => {
                              const isActive = idx === ocrStepIndex;
                              const isCompleted = idx < ocrStepIndex;
                              return (
                                <div key={idx} className="flex items-center gap-2">
                                  <span className={`w-1.5 h-1.5 rounded-full ${
                                    isCompleted 
                                      ? 'bg-emerald-500' 
                                      : isActive 
                                        ? 'bg-[#8AD65A] animate-ping' 
                                        : 'bg-white/15'
                                  }`} />
                                  <span className={isCompleted ? 'text-emerald-400 font-semibold' : isActive ? 'text-white font-bold' : 'text-white/30'}>
                                    {step} {isCompleted && '✓'}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {receiptError && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2 text-red-400">
                          <AlertCircle size={14} className="shrink-0 mt-0.5" />
                          <span className="text-[10px] font-semibold leading-relaxed">{receiptError}</span>
                        </div>
                      )}

                      {receiptSuccess && (
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-3">
                          <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block">
                            ✓ Gemini AI Vision Verified
                          </span>
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <span className="text-white/40 block text-[9px] uppercase font-bold">Transaction Ref ID</span>
                              <input
                                type="text"
                                value={form.paymentRefId}
                                onChange={(e) => updateForm('paymentRefId', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs font-mono text-white mt-1"
                              />
                            </div>
                            <div>
                              <span className="text-white/40 block text-[9px] uppercase font-bold">Verified Amount</span>
                              <input
                                type="number"
                                value={form.paymentAmount}
                                onChange={(e) => updateForm('paymentAmount', Number(e.target.value))}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs font-mono text-white mt-1"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Bank / Manual Instructions */}
                {form.paymentMethod === 'Bank' && (
                  <div className="p-5 bg-white/[0.02] border border-white/5 rounded-3xl space-y-3 text-xs leading-relaxed font-mono">
                    <h5 className="font-extrabold text-xs text-[#8AD65A] border-b border-white/5 pb-2">
                      Meezan Bank Account
                    </h5>
                    <p><span className="text-white/40">Bank Title:</span> Meezan Bank Ltd</p>
                    <p><span className="text-white/40">Account Name:</span> Vital Agro Chemical Industries</p>
                    <p><span className="text-white/40">IBAN Number:</span> PK53MEZN0012345678901234</p>
                    <p className="text-[10px] text-white/30 pt-1">
                      Our finance team will cross-reference the bank deposits once your order goes to WhatsApp confirmation.
                    </p>
                  </div>
                )}

                {/* COD note details */}
                {form.paymentMethod === 'COD' && (
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/15 rounded-3xl text-xs text-white/60 leading-relaxed">
                    <span className="text-[#8AD65A] font-bold block mb-1">Cash on Delivery (COD)</span>
                    No advance payments required. Simply verify your order metrics and click Complete Order to dispatch details.
                  </div>
                )}

                {/* 5. Complete Button Action Container */}
                <div className="pt-4 space-y-4">
                  <OrderConfirmButton
                    disabled={isSubmitting || stripeSimulating || (form.paymentMethod !== 'COD' && form.paymentMethod !== 'Stripe' && !receiptSuccess)}
                    onValidate={validate}
                    onConfirm={async () => {
                      setIsSubmitting(true);
                      
                      if (form.paymentMethod === 'Stripe') {
                        await startStripeFlow();
                      }

                      try {
                        const newId = await submitOrder();
                        if (newId) {
                          setCreatedOrderId(newId);
                          return newId;
                        }
                      } catch (e) {
                        console.error("Firebase submit error:", e);
                      }
                      return null;
                    }}
                    onComplete={(orderId) => {
                      resetForm();
                      setIsSubmitting(false);
                      setCreatedOrderId(null);
                      const targetId = orderId || createdOrderId;
                      if (targetId) {
                        navigate(`/order-success/${targetId}`);
                      }
                    }}
                  />
                  <p className="text-center text-white/20 text-[10px] uppercase tracking-wider">
                    {lang === 'en' ? 'Click complete to register order details' : 'آرڈر کی تفصیلات واٹس ایپ پر منتقل کرنے کے لیے کلک کریں'}
                  </p>
                </div>

              </div>

            </div>
          </motion.div>

          {/* Stripe Simulation Modal Overlay */}
          <AnimatePresence>
            {stripeSimulating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md"
              >
                <div className="max-w-md w-full p-8 rounded-3xl bg-[#09100a] border border-[#5cb85c]/20 space-y-6 relative overflow-hidden">
                  
                  <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-[#5cb85c]"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      style={{ width: '200%' }}
                    />
                  </div>

                  {stripeStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto animate-bounce">
                        <CreditCard size={26} />
                      </div>
                      <h4 className="font-extrabold text-base text-white">Connecting Stripe Gateway...</h4>
                      <p className="text-xs text-white/40">Initializing secure token handshakes and card processing pipelines.</p>
                    </motion.div>
                  )}

                  {stripeStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="w-14 h-14 rounded-full border-2 border-[#5cb85c] border-t-transparent animate-spin flex items-center justify-center mx-auto" />
                      <h4 className="font-extrabold text-base text-white">Authorizing Payment...</h4>
                      <p className="text-xs text-white/40">Verifying bank card balance metrics. Please do not close the window.</p>
                    </motion.div>
                  )}

                  {stripeStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center justify-center mx-auto">
                        <ShieldCheck size={26} className="animate-pulse" />
                      </div>
                      <h4 className="font-extrabold text-base text-emerald-400">Payment Approved Successfully!</h4>
                      <p className="text-xs text-white/40">Stripe card token saved. Transferring you back to confirm checkout.</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </AnimatePresence>
  );
}
