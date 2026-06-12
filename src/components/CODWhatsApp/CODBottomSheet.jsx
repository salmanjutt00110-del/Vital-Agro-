import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Image, AlertCircle, CreditCard, Landmark, Truck, Copy, Check, Clock, User, Phone, Mail, MapPin, ChevronRight, Edit, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { verifyReceipt } from '@/lib/ai/receiptVerifier';
import { verifyReceiptUnique } from '@/lib/api';
import confetti from 'canvas-confetti';
import { getDeliveryCharge } from './orderMessage';
import OrderConfirmButton from './OrderConfirmButton';

const PROVINCES = [
  'Punjab', 'Sindh', 'KPK', 'Balochistan',
  'Islamabad', 'AJK', 'GB',
];

const InputField = ({ label, error, required, icon: Icon, ...props }) => {
  return (
    <div className="w-full relative text-left">
      <label className="block text-white/55 text-[11px] font-semibold tracking-[0.12em] uppercase mb-2">
        {label}{required && <span className="text-[#5cb85c] ml-1">*</span>}
      </label>
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-4 text-white/30">
            <Icon size={16} />
          </div>
        )}
        <input
          {...props}
          className={`
            w-full py-3.5 rounded-2xl text-white text-sm outline-none transition-all duration-300 placeholder:text-white/25 bg-white/5 border
            ${Icon ? 'pl-11 pr-4' : 'px-4'}
            ${error
              ? 'bg-red-500/8 border-red-500/40 focus:border-red-400'
              : 'border-white/10 focus:border-[rgba(92,184,92,0.5)] focus:bg-white/7'
            }
          `}
        />
      </div>
      {error && (
        <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1 font-semibold">
          ⚠ {error}
        </p>
      )}
    </div>
  );
};

const GlassCreditCard = ({ paymentMethod, customerName, phone, amount }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const getCardTheme = () => {
    switch (paymentMethod) {
      case 'Stripe':
        return {
          bg: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(168, 85, 247, 0.25) 100%)',
          border: 'border-indigo-500/30',
          logo: 'STRIPE SECURE CARD',
          glow: 'rgba(129, 140, 248, 0.35)',
          glowClass: 'bg-indigo-500/20'
        };
      case 'JazzCash':
        return {
          bg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(245, 158, 11, 0.25) 100%)',
          border: 'border-red-500/30',
          logo: 'JAZZCASH MOBILE WALLET',
          glow: 'rgba(239, 68, 68, 0.35)',
          glowClass: 'bg-red-500/20'
        };
      case 'Easypaisa':
        return {
          bg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(59, 130, 246, 0.25) 100%)',
          border: 'border-emerald-500/30',
          logo: 'EASYPAISA MOBILE WALLET',
          glow: 'rgba(16, 185, 129, 0.35)',
          glowClass: 'bg-emerald-500/20'
        };
      default:
        return null;
    }
  };

  const theme = getCardTheme();
  if (!theme) return null;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-40 rounded-3xl p-5 border ${theme.border} backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden cursor-pointer select-none transition-all duration-300`}
      style={{
        background: theme.bg,
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${mousePos.y * -15}deg) rotateY(${mousePos.x * 15}deg)`,
        boxShadow: `0 15px 30px rgba(0,0,0,0.5), 0 0 25px ${theme.glow}`
      }}
    >
      <div className={`absolute -right-10 -top-10 w-28 h-28 rounded-full blur-[40px] pointer-events-none ${theme.glowClass}`} />
      
      <div className="h-full flex flex-col justify-between relative z-10 font-mono text-left">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[8px] text-white/40 block font-black">VITAL AGRO HYBRID GATEWAY</span>
            <span className="text-[10px] font-black tracking-wider text-white">{theme.logo}</span>
          </div>
          <div className="w-8 h-6 rounded-md bg-white/10 flex items-center justify-center font-bold text-white/50 text-[9px]">
            NFC
          </div>
        </div>

        <div className="text-sm font-black tracking-widest text-white/90 my-1">
          {paymentMethod === 'Stripe' ? '••••  ••••  ••••  4242' : `ID: ${phone || '••••  ••••  ••'}`}
        </div>

        <div className="flex justify-between items-end">
          <div>
            <span className="text-[8px] text-white/30 block">CLIENT REF</span>
            <span className="text-xs font-bold uppercase truncate max-w-[150px] block text-white/80">
              {customerName || 'Muhammad Ali'}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[8px] text-white/30 block">PAY VALUE</span>
            <span className="text-xs font-black text-[#8AD65A]">
              PKR {amount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PAYMENT_METHODS = [
  {
    id: 'COD',
    label: 'Cash On Delivery',
    sublabel: 'Pay at your doorstep',
    icon: () => (
      <div className="w-8 h-8 rounded-full bg-[#5cb85c]/20
        flex items-center justify-center text-lg">💵</div>
    ),
    available: true,
    recommended: true,
  },
  {
    id: 'Stripe',
    label: 'Credit / Debit Card',
    sublabel: 'Secured by Stripe',
    icon: () => (
      <div className="w-8 h-8 rounded-lg bg-blue-500/20
        flex items-center justify-center">
        <CreditCard size={16} className="text-blue-400" />
      </div>
    ),
    available: true,
  },
  {
    id: 'JazzCash',
    label: 'JazzCash Wallet',
    sublabel: 'Transfer & verify',
    icon: () => (
      <div className="w-8 h-8 rounded-lg overflow-hidden
        bg-[#ED1C24] flex items-center justify-center
        text-white text-[10px] font-black leading-none text-center">
        JC
      </div>
    ),
    available: false,
    comingSoon: true,
  },
  {
    id: 'Easypaisa',
    label: 'Easypaisa',
    sublabel: 'Transfer & verify',
    icon: () => (
      <div className="w-8 h-8 rounded-lg overflow-hidden
        bg-[#1DB954] flex items-center justify-center
        text-white text-[9px] font-black">EP</div>
    ),
    available: false,
    comingSoon: true,
  },
  {
    id: 'Bank',
    label: 'Meezan Bank Ltd',
    sublabel: 'Direct bank transfer',
    icon: () => (
      <div className="w-8 h-8 rounded-lg
        bg-[#006633] flex items-center justify-center
        text-white text-[9px] font-black">MB</div>
    ),
    available: false,
    comingSoon: true,
  },
];

const PaymentCard = ({ method, selected, onSelect }) => (
  <motion.button
    onClick={() => method.available && onSelect(method.id)}
    whileTap={method.available ? { scale: 0.98 } : {}}
    className={`
      relative p-4 rounded-2xl border text-left w-full
      transition-all duration-300
      ${selected
        ? 'bg-[rgba(45,106,45,0.25)] border-[#5cb85c] shadow-[0_0_20px_rgba(92,184,92,0.15)]'
        : 'bg-white/3 border-white/10 hover:border-white/20'
      }
      ${!method.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `}
  >
    <div className="flex items-center gap-3">
      <method.icon />
      <div className="flex-1">
        <p className="text-white text-sm font-semibold">{method.label}</p>
        <p className="text-white/40 text-xs">{method.sublabel}</p>
      </div>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-5 h-5 rounded-full bg-[#5cb85c]
            flex items-center justify-center"
        >
          <Check size={12} className="text-white" />
        </motion.div>
      )}
      {method.comingSoon && (
        <span className="text-[9px] text-white/30 border border-white/10
          px-1.5 py-0.5 rounded">SOON</span>
      )}
    </div>
  </motion.button>
);

export default function CODBottomSheet({
  product, isOpen, setIsOpen,
  form, setForm, errors: externalErrors, isSubmitting, setIsSubmitting, handleSubmit,
  validate, submitOrder, resetForm,
}) {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [createdOrderId, setCreatedOrderId] = useState(null);

  // Multi-step wizard pagination states
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [localErrors, setLocalErrors] = useState({});

  // Success Experience Timeline states
  const [successPhase, setSuccessPhase] = useState('idle'); // 'idle' | 'packing' | 'falling' | 'driving' | 'delivered' | 'confirmed'
  const [successProgress, setSuccessProgress] = useState(0);

  // OCR & Stripe Flow States
  const [isVerifyingReceipt, setIsVerifyingReceipt] = useState(false);
  const [ocrStepIndex, setOcrStepIndex] = useState(0);
  const [receiptError, setReceiptError] = useState(null);
  const [receiptSuccess, setReceiptSuccess] = useState(false);
  const [stripeSimulating, setStripeSimulating] = useState(false);
  const [stripeStep, setStripeStep] = useState(1);

  // Clipboard copy feedback states
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedTitle, setCopiedTitle] = useState(false);

  // countdown timer for mobile wallets
  const [timeLeft, setTimeLeft] = useState(900);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      setSuccessPhase('idle');
      setLocalErrors({});
      setReceiptSuccess(false);
      setReceiptError(null);
      return;
    }
  }, [isOpen]);

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

    const stepInterval = setInterval(() => {
      setOcrStepIndex(prev => {
        if (prev < ocrSteps.length - 1) return prev + 1;
        clearInterval(stepInterval);
        return prev;
      });
    }, 800);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result.substring(reader.result.indexOf(',') + 1);
      const mimeType = file.type || 'image/jpeg';

      try {
        const parsed = await verifyReceipt(base64Data, mimeType);
        const expectedWallet = form.paymentMethod === 'JazzCash' ? '03001234567' : '03011837160';
        const parsedWalletClean = parsed.receiverWallet ? parsed.receiverWallet.replace(/\D/g, '') : '';
        
        if (parsedWalletClean && !parsedWalletClean.includes(expectedWallet)) {
          clearInterval(stepInterval);
          setIsVerifyingReceipt(false);
          setReceiptError(`Receiver account mismatch. Expected merchant wallet ${expectedWallet} but read ${parsedWalletClean || 'N/A'}.`);
          return;
        }

        const checkResult = await verifyReceiptUnique(parsed.refId);
        if (checkResult.duplicate) {
          clearInterval(stepInterval);
          setIsVerifyingReceipt(false);
          setForm(prev => ({ ...prev, paymentDuplicate: true }));
          setReceiptError("Duplicate transaction receipt already registered.");
          return;
        }

        if (parsed.amount < grandTotal) {
          clearInterval(stepInterval);
          setIsVerifyingReceipt(false);
          setReceiptError(`Amount mismatch. Expected PKR ${grandTotal.toLocaleString()} but read PKR ${parsed.amount.toLocaleString()}.`);
          return;
        }

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
        setReceiptError(lang === 'en' ? 'Failed to read receipt details. Please upload a clear screenshot.' : 'رسید کی تفصیلات پڑھنے میں ناکامی۔ براہ کرم واضح سکرین شاٹ اپ لوڈ کریں۔');
      } finally {
        setIsVerifyingReceipt(false);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!product) return null;

  const updateForm = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (localErrors[key]) {
      setLocalErrors(prev => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    }
  };

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

  // Billing math
  const itemsSubtotal = currentPrice * form.quantity;
  const deliveryCharges = getDeliveryCharge(form.province);
  const grandTotal = itemsSubtotal + deliveryCharges;

  // Delivery limits dates
  const today = new Date();
  const deliveryMinDate = new Date(today);
  deliveryMinDate.setDate(deliveryMinDate.getDate() + 2);
  const deliveryMaxDate = new Date(today);
  deliveryMaxDate.setDate(deliveryMaxDate.getDate() + 4);

  const formatDateString = (d) => {
    return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'ur-PK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const startStripeFlow = async () => {
    setStripeSimulating(true);
    setStripeStep(1);
    await new Promise(r => setTimeout(r, 1200));
    setStripeStep(2);
    await new Promise(r => setTimeout(r, 1400));
    setStripeStep(3);
    await new Promise(r => setTimeout(r, 900));
    setStripeSimulating(false);
    setReceiptSuccess(true);
  };

  // Step Validator logic
  const validateStep2 = () => {
    const e = {};
    if (!form.customerName || !form.customerName.trim()) {
      e.customerName = lang === 'en' ? 'Full Name is required' : 'مکمل نام درج کرنا ضروری ہے';
    }
    if (!form.phone || !form.phone.trim()) {
      e.phone = lang === 'en' ? 'Phone Number is required' : 'فون نمبر درج کرنا ضروری ہے';
    } else if (!/^0\d{10}$/.test(form.phone.replace(/[-\s]/g, ''))) {
      e.phone = lang === 'en' ? 'Enter valid Pakistani number (03XXXXXXXXX)' : 'درست پاکستانی نمبر درج کریں (03XXXXXXXXX)';
    }
    if (form.email && form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = lang === 'en' ? 'Enter a valid email address' : 'درست ای میل ایڈریس درج کریں';
    }
    setLocalErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e = {};
    if (!form.province || !form.province.trim()) {
      e.province = lang === 'en' ? 'Province is required' : 'صوبہ کا نام ضروری ہے';
    }
    if (!form.city || !form.city.trim()) {
      e.city = lang === 'en' ? 'City is required' : 'شہر کا نام ضروری ہے';
    }
    if (!form.address || !form.address.trim()) {
      e.address = lang === 'en' ? 'Street Address is required' : 'مکمل پتہ درج کرنا ضروری ہے';
    }
    setLocalErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;
    if (currentStep === 4) {
      if (form.paymentMethod !== 'COD' && !receiptSuccess) {
        setLocalErrors({ payment: lang === 'en' ? 'Please complete your payment process first' : 'براہ کرم پہلے ادائیگی مکمل کریں' });
        return;
      }
    }
    setDirection(1);
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setDirection(-1);
    setCurrentStep(prev => prev - 1);
  };

  // Cinematic timeline triggers
  const handlePlaceOrderTimeline = async () => {
    // 1. Box packing & flaps closing state
    setSuccessPhase('packing');
    
    // Submit order payload to firestore database asynchronously
    const orderSavePromise = submitOrder();

    // Box closing animation duration
    await new Promise(r => setTimeout(r, 1600));
    
    // 2. Box falling down into the truck bed
    setSuccessPhase('falling');
    await new Promise(r => setTimeout(r, 1600));

    // 3. Truck accelerating and driving off
    setSuccessPhase('driving');
    setSuccessProgress(0);

    const duration = 2500;
    const intervalTime = 40;
    const steps = duration / intervalTime;
    let currentStepTick = 0;

    const timer = setInterval(() => {
      currentStepTick++;
      const currentVal = Math.min((currentStepTick / steps) * 100, 100);
      setSuccessProgress(currentVal);
      if (currentStepTick >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    await new Promise(r => setTimeout(r, duration));

    // Await database write resolution
    let finalOrderId = null;
    try {
      finalOrderId = await orderSavePromise;
      if (finalOrderId) {
        setCreatedOrderId(finalOrderId);
      }
    } catch (e) {
      console.error("Firebase submit error:", e);
    }

    // 4. Destination reached / Delivered
    setSuccessPhase('delivered');
    await new Promise(r => setTimeout(r, 1600));

    // 5. Final order confirmation dashboard
    setSuccessPhase('confirmed');

    // Trigger premium green decoration confetti celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#76C945', '#8AD65A', '#2d6a2d', '#ffffff']
    });
  };

  // Sliding Framer Motion Step Transitions
  const stepVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '50%' : '-50%',
      opacity: 0,
      filter: 'blur(3px)'
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 260, damping: 26 }
    },
    exit: (dir) => ({
      x: dir < 0 ? '50%' : '-50%',
      opacity: 0,
      filter: 'blur(3px)',
      transition: { duration: 0.2 }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black text-white font-sans selection:bg-[#76C945] selection:text-[#0A2E1F]">
          
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 200, damping: 26 }}
            className="min-h-screen w-full flex flex-col relative"
            style={{
              background: 'radial-gradient(circle at top, #0f2d1a 0%, #050a06 100%)',
            }}
          >
            {/* Header Toolbar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 backdrop-blur-md sticky top-0 bg-black/60 z-30">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#76C945] animate-pulse" />
                <h2 className="text-xs font-black tracking-widest uppercase font-mono text-white/70">
                  {lang === 'en' ? 'Vital Agro Premium Checkout' : 'وائٹل ایگرو پریمیم چیک آؤٹ'}
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/10 text-white/70 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Top Wizard Steps Timeline */}
            {successPhase === 'idle' && (
              <div className="w-full px-6 py-4 bg-white/[0.01] border-b border-white/5 sticky top-[80px] z-20 backdrop-blur-md">
                <div className="max-w-3xl mx-auto flex items-center justify-between relative">
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-white/10 -z-10" />
                  <motion.div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-[#76C945] to-[#8AD65A] -z-10"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((currentStep - 1) / 5) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {Array.from({ length: 6 }).map((_, idx) => {
                    const stepNum = idx + 1;
                    const isActive = currentStep === stepNum;
                    const isCompleted = currentStep > stepNum;
                    
                    return (
                      <div key={idx} className="flex flex-col items-center gap-1.5 relative">
                        <button
                          type="button"
                          onClick={() => {
                            if (stepNum < currentStep) {
                              setDirection(stepNum > currentStep ? 1 : -1);
                              setCurrentStep(stepNum);
                            }
                          }}
                          disabled={stepNum >= currentStep}
                          className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-xs font-black font-mono transition-all duration-300 border select-none
                            ${isActive 
                              ? 'bg-[#76C945] text-[#0A2E1F] border-[#76C945] shadow-[0_0_15px_rgba(118,201,69,0.5)] scale-110' 
                              : isCompleted 
                                ? 'bg-[#2d6a2d] text-white border-[#5cb85c]' 
                                : 'bg-black border-white/10 text-white/30 cursor-not-allowed'
                            }
                          `}
                        >
                          {isCompleted ? '✓' : stepNum}
                        </button>
                        <span className={`text-[8px] uppercase font-black tracking-widest hidden sm:block ${isActive ? 'text-[#8AD65A]' : isCompleted ? 'text-white/50' : 'text-white/20'}`}>
                          {stepNum === 1 ? 'Cart' : stepNum === 2 ? 'Info' : stepNum === 3 ? 'Address' : stepNum === 4 ? 'Payment' : stepNum === 5 ? 'Review' : 'Place'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Scrollable Form Container */}
            <div className="flex-1 overflow-y-auto px-4 xs:px-6 py-8 max-w-4xl mx-auto w-full flex flex-col justify-start relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full flex-1 flex flex-col justify-start"
                >
                  
                  {/* STEP 1: PRODUCT SUMMARY */}
                  {currentStep === 1 && (
                    <div className="space-y-6 w-full text-left">
                      <div className="border-b border-white/5 pb-3">
                        <h3 className="text-base font-black tracking-tight text-[#8AD65A] uppercase">{lang === 'en' ? 'Product Summary' : 'آرڈر کا خلاصہ'}</h3>
                        <p className="text-white/40 text-[11px] font-semibold mt-0.5">{lang === 'en' ? 'Inspect pack size specifications and adjust quantities.' : 'پیک سائز کی تفصیلات دیکھیں اور مقدار کو تبدیل کریں۔'}</p>
                      </div>

                      {/* Summary Showcase Card */}
                      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 flex flex-col sm:flex-row gap-5 items-center relative overflow-hidden backdrop-blur-md">
                        <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 p-2 flex items-center justify-center shrink-0">
                          <img src={imageSrc} alt={localizedName} className="w-full h-full object-contain drop-shadow" />
                        </div>
                        <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
                          <h4 className="text-white font-extrabold text-base truncate">{localizedName}</h4>
                          <p className="text-white/40 text-xs truncate">
                            {product.activeIngredient || product.formula || product.category}
                          </p>
                          <p className="text-[#8AD65A] font-mono font-black text-sm">
                            PKR {currentPrice.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Variant Size pills */}
                      {sizes.length > 1 && (
                        <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-5 space-y-3">
                          <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block">{lang === 'en' ? 'Selected Pack Variant:' : 'پیک سائز منتخب کریں:'}</span>
                          <div className="flex flex-wrap gap-2.5">
                            {sizes.map(size => (
                              <button
                                key={size}
                                type="button"
                                onClick={() => updateForm('selectedSize', size)}
                                className={`
                                  px-4 py-2.5 rounded-2xl text-xs font-extrabold border transition-all duration-300 select-none
                                  ${form.selectedSize === size
                                    ? 'bg-[#2d6a2d]/30 border-[#76C945] text-white shadow-lg shadow-[#76C945]/10 scale-105'
                                    : 'bg-white/[0.02] border-white/10 text-white/40 hover:bg-white/5 hover:text-white'
                                  }
                                `}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quantities & Calculations */}
                      <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="text-center sm:text-left">
                          <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block">{lang === 'en' ? 'Item Quantity' : 'تعداد'}</span>
                          <span className="text-xs text-white/80 font-bold">{lang === 'en' ? 'Configure total order metric units' : 'آرڈر یونٹس کی کل تعداد ترتیب دیں'}</span>
                        </div>
                        <div className="flex items-center gap-4.5 bg-black/40 border border-white/10 rounded-2xl p-1.5">
                          <button
                            type="button"
                            onClick={() => updateForm('quantity', Math.max(1, form.quantity - 1))}
                            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center font-black transition-colors text-sm"
                          >
                            −
                          </button>
                          <span className="text-white font-black text-base w-8 text-center font-mono">{form.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateForm('quantity', form.quantity + 1)}
                            className="w-10 h-10 rounded-xl bg-[#2d6a2d]/40 hover:bg-[#3d8c3d] text-white flex items-center justify-center font-black transition-colors text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Delivery Estimates Alert */}
                      <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] flex items-start gap-3">
                        <Clock size={16} className="text-[#8AD65A] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-black text-[#8AD65A] uppercase tracking-widest block">{lang === 'en' ? 'Estimated Delivery' : 'توقعہ تاریخ وصولی'}</span>
                          <span className="text-xs text-white/70 block mt-0.5">
                            {formatDateString(deliveryMinDate)} – {formatDateString(deliveryMaxDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: CUSTOMER DETAILS */}
                  {currentStep === 2 && (
                    <div className="space-y-6 w-full text-left">
                      <div className="border-b border-white/5 pb-3">
                        <h3 className="text-base font-black tracking-tight text-[#8AD65A] uppercase">{lang === 'en' ? 'Customer Profile' : 'ذاتی معلومات'}</h3>
                        <p className="text-white/40 text-[11px] font-semibold mt-0.5">{lang === 'en' ? 'Provide contact registry details to link database node.' : 'ڈیٹا بیس سے منسلک کرنے کے لیے رابطے کی معلومات درج کریں۔'}</p>
                      </div>

                      <div className="grid gap-5">
                        <InputField
                          label={lang === 'en' ? "Full Name *" : "مکمل نام *"}
                          placeholder="Muhammad Ali"
                          value={form.customerName}
                          onChange={(e) => updateForm('customerName', e.target.value)}
                          error={localErrors.customerName || externalErrors.customerName}
                          icon={User}
                        />

                        <InputField
                          label={lang === 'en' ? "Phone Number *" : "فون نمبر *"}
                          placeholder="03001234567"
                          value={form.phone}
                          onChange={(e) => updateForm('phone', e.target.value)}
                          error={localErrors.phone || externalErrors.phone}
                          inputMode="tel"
                          icon={Phone}
                        />

                        <InputField
                          label={lang === 'en' ? "Email Address (Optional)" : "ای میل ایڈریس (اختیاری)"}
                          placeholder="name@domain.com"
                          value={form.email}
                          onChange={(e) => updateForm('email', e.target.value)}
                          error={localErrors.email}
                          inputMode="email"
                          icon={Mail}
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 3: SHIPPING ADDRESS */}
                  {currentStep === 3 && (
                    <div className="space-y-6 w-full text-left">
                      <div className="border-b border-white/5 pb-3">
                        <h3 className="text-base font-black tracking-tight text-[#8AD65A] uppercase">{lang === 'en' ? 'Shipping Destination' : 'ڈیلیوری کا پتہ'}</h3>
                        <p className="text-white/40 text-[11px] font-semibold mt-0.5">{lang === 'en' ? 'Specify geographic delivery details.' : 'ڈیلیوری کے لیے جغرافیائی تفصیلات درج کریں۔'}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <InputField
                          label={lang === 'en' ? "City *" : "شہر *"}
                          placeholder="Haroonabad"
                          value={form.city}
                          onChange={(e) => updateForm('city', e.target.value)}
                          error={localErrors.city || externalErrors.city}
                          icon={MapPin}
                        />

                        <div className="w-full text-left">
                          <label className="block text-white/55 text-[11px] font-semibold tracking-[0.12em] uppercase mb-2">
                            {lang === 'en' ? "Province *" : "صوبہ *"}
                          </label>
                          <div className="relative flex items-center">
                            <div className="absolute left-4 text-white/30">
                              <MapPin size={16} />
                            </div>
                            <select
                              value={form.province}
                              onChange={(e) => updateForm('province', e.target.value)}
                              className={`
                                w-full py-3.5 pl-11 pr-10 rounded-2xl text-white text-sm outline-none transition-all duration-300 bg-white/5 border appearance-none
                                ${(localErrors.province || externalErrors.province)
                                  ? 'bg-red-500/8 border-red-500/40 focus:border-red-400'
                                  : 'border-white/10 focus:border-[rgba(92,184,92,0.5)] focus:bg-[#0a1f0a]'
                                }
                              `}
                              style={{ colorScheme: 'dark' }}
                            >
                              <option value="" className="bg-[#0a1f0a] text-white/40">
                                {lang === 'en' ? 'Select Province' : 'صوبہ منتخب کریں'}
                              </option>
                              {PROVINCES.map((prov) => (
                                <option key={prov} value={prov} className="bg-[#0a1f0a] text-white">
                                  {prov}
                                </option>
                              ))}
                            </select>
                            <div className="absolute right-4 pointer-events-none text-white/40">
                              ▼
                            </div>
                          </div>
                          {(localErrors.province || externalErrors.province) && (
                            <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1 font-semibold">
                              ⚠ {localErrors.province || externalErrors.province}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-5">
                        <InputField
                          label={lang === 'en' ? "Postal Code (Optional)" : "پوسٹل کوڈ (اختیاری)"}
                          placeholder="62300"
                          value={form.postalCode}
                          onChange={(e) => updateForm('postalCode', e.target.value)}
                        />

                        {/* Complete address text area */}
                        <div className="space-y-2">
                          <label className="block text-white/50 text-[10px] font-black uppercase tracking-widest">
                            {lang === 'en' ? 'Complete Street Address *' : 'مکمل پتہ *'}
                          </label>
                          <textarea
                            rows={3}
                            placeholder={lang === 'en' ? "House No, Street, Mohalla, Nearby Landmark..." : "مکان نمبر، گلی، محلہ، نزدیکی نشان..."}
                            value={form.address}
                            onChange={(e) => updateForm('address', e.target.value)}
                            className={`
                              w-full px-4 py-3.5 rounded-2xl text-sm text-white bg-white/[0.02] border outline-none resize-none
                              placeholder:text-white/20 focus:bg-white/[0.04] transition-all duration-300
                              ${(localErrors.address || externalErrors.address) ? 'border-red-500/50 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/10 focus:border-[#76C945] focus:shadow-[0_0_15px_rgba(118,201,69,0.15)]'}
                            `}
                          />
                          {(localErrors.address || externalErrors.address) && (
                            <p className="text-red-400 text-[10px] font-semibold mt-1 ml-1">{localErrors.address || externalErrors.address}</p>
                          )}
                        </div>

                        {/* Special Location Notes */}
                        <div className="space-y-2">
                          <label className="block text-white/50 text-[10px] font-black uppercase tracking-widest">
                            {lang === 'en' ? 'Special Instructions / Location Notes (Optional)' : 'خصوصی ہدایات (اختیاری)'}
                          </label>
                          <textarea
                            rows={2}
                            placeholder={lang === 'en' ? "Deliver after 4 PM, call before arrival, etc." : "شام 4 بجے کے بعد ڈیلیور کریں، آمد سے پہلے کال کریں، وغیرہ..."}
                            value={form.specialInstructions || ''}
                            onChange={(e) => updateForm('specialInstructions', e.target.value)}
                            className="w-full px-4 py-3.5 rounded-2xl text-sm text-white bg-white/[0.02] border border-white/10 outline-none resize-none placeholder:text-white/20 focus:border-[#76C945] focus:bg-white/[0.04] transition-all duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: DELIVERY & PAYMENT GATEWAY */}
                  {currentStep === 4 && (
                    <div className="space-y-6 w-full text-left">
                      <div className="border-b border-white/5 pb-3">
                        <h3 className="text-base font-black tracking-tight text-[#8AD65A] uppercase">{lang === 'en' ? 'Delivery & Payment' : 'ڈیلیوری اور ادائیگی'}</h3>
                        <p className="text-white/40 text-[11px] font-semibold mt-0.5">{lang === 'en' ? 'Select payment node and finalize shipping logistics charges.' : 'ادائیگی کا طریقہ منتخب کریں اور ڈیلیوری چارجز کی تصدیق کریں۔'}</p>
                      </div>

                      {/* Billing breakdown panel */}
                      <div className="space-y-2 border-t border-white/8 pt-3 mt-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/50">{lang === 'en' ? 'Subtotal:' : 'مصنوعات کی قیمت:'}</span>
                          <span className="text-white">PKR {itemsSubtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/50">{lang === 'en' ? `Delivery (${form.province || 'Pakistan'}):` : `ڈیلیوری چارجز (${form.province || 'پاکستان'}):`}</span>
                          <span className="text-white">PKR {deliveryCharges.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-base font-bold border-t border-white/8 pt-2 mt-2">
                          <span className="text-[#5cb85c]">{lang === 'en' ? 'Grand Total:' : 'کل قیمت:'}</span>
                          <span className="text-[#5cb85c] text-lg font-black">
                            PKR {grandTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Payment Method selectors */}
                      <div className="space-y-3">
                        <h4 className="text-white/50 text-[10px] font-black uppercase tracking-widest">
                          {lang === 'en' ? 'Select Payment Mode' : 'ادائیگی کا طریقہ منتخب کریں'}
                        </h4>

                        <div className="flex flex-col gap-3">
                          {PAYMENT_METHODS.map((method) => {
                            const isSelected = form.paymentMethod === method.id;
                            return (
                              <PaymentCard
                                key={method.id}
                                method={method}
                                selected={isSelected}
                                onSelect={(id) => {
                                  updateForm('paymentMethod', id);
                                  setReceiptSuccess(false);
                                  setReceiptError(null);
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>

                      {/* Step validation alerts */}
                      {localErrors.payment && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2 text-red-400">
                          <AlertCircle size={14} className="shrink-0 mt-0.5" />
                          <span className="text-[10px] font-semibold">{localErrors.payment}</span>
                        </div>
                      )}

                      {/* NFC Credit card visualization */}
                      {(form.paymentMethod === 'Stripe' || form.paymentMethod === 'JazzCash' || form.paymentMethod === 'Easypaisa') && (
                        <GlassCreditCard
                          paymentMethod={form.paymentMethod}
                          customerName={form.customerName}
                          phone={form.phone}
                          amount={grandTotal}
                        />
                      )}

                      {/* Stripe trigger payment buttons */}
                      {form.paymentMethod === 'Stripe' && !receiptSuccess && (
                        <button
                          type="button"
                          onClick={startStripeFlow}
                          disabled={stripeSimulating}
                          className="w-full py-4.5 rounded-2xl bg-[#5cb85c] hover:bg-[#8AD65A] text-[#0A2E1F] font-black text-xs uppercase tracking-widest border border-white/10 shadow-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <CreditCard size={14} />
                          <span>{stripeSimulating ? 'Processing Stripe Gateway...' : 'Initialize Secure Card Payment'}</span>
                        </button>
                      )}

                      {/* JazzCash / Easypaisa Workflow details */}
                      {(form.paymentMethod === 'JazzCash' || form.paymentMethod === 'Easypaisa') && (
                        <div className="p-5 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4 font-mono text-xs">
                          <div className="flex items-center justify-between border-b border-white/5 pb-3">
                            <h5 className="font-extrabold text-[10px] text-[#8AD65A] uppercase tracking-wider">
                              {form.paymentMethod} Account Specs
                            </h5>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-400/5 border border-amber-400/20 px-2 py-0.5 rounded-lg">
                              <Clock size={10} className="animate-spin" style={{ animationDuration: '6s' }} />
                              <span>{formatTime(timeLeft)}</span>
                            </div>
                          </div>

                          <div className="space-y-2.5">
                            <div className="flex justify-between items-center bg-white/[0.01] border border-white/5 p-2.5 rounded-xl">
                              <div>
                                <span className="text-[8px] text-white/30 block uppercase font-bold">Account Title</span>
                                <span className="text-white font-bold">Vital Agro</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => copyToClipboard('Vital Agro', 'title')}
                                className="p-1.5 bg-white/5 rounded-lg border border-white/10 text-white/50 hover:text-white"
                              >
                                {copiedTitle ? <Check size={12} className="text-[#8AD65A]" /> : <Copy size={12} />}
                              </button>
                            </div>

                            <div className="flex justify-between items-center bg-white/[0.01] border border-white/5 p-2.5 rounded-xl">
                              <div>
                                <span className="text-[8px] text-white/30 block uppercase font-bold">Wallet Number</span>
                                <span className="text-white font-black">{form.paymentMethod === 'JazzCash' ? '0300-1234567' : '0301-1837160'}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(form.paymentMethod === 'JazzCash' ? '03001234567' : '03011837160', 'number')}
                                className="p-1.5 bg-white/5 rounded-lg border border-white/10 text-white/50 hover:text-white"
                              >
                                {copiedNumber ? <Check size={12} className="text-[#8AD65A]" /> : <Copy size={12} />}
                              </button>
                            </div>

                            {/* SCAN WALLET QR CODE */}
                            <div className="flex flex-col items-center justify-center p-3 border border-white/5 bg-white/[0.01] rounded-2xl gap-2 mt-2">
                              <span className="text-[8px] text-white/40 uppercase tracking-widest font-black">Scan Wallet QR Code</span>
                              <svg className="w-24 h-24 text-[#8AD65A]" viewBox="0 0 100 100" fill="currentColor">
                                <rect x="10" y="10" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                                <rect x="15" y="15" width="15" height="15" fill="currentColor" />
                                <rect x="65" y="10" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                                <rect x="70" y="15" width="15" height="15" fill="currentColor" />
                                <rect x="10" y="65" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                                <rect x="15" y="70" width="15" height="15" fill="currentColor" />
                                <rect x="45" y="20" width="10" height="10" fill="currentColor" />
                                <rect x="45" y="45" width="10" height="10" fill="currentColor" />
                                <rect x="20" y="45" width="10" height="10" fill="currentColor" />
                                <rect x="75" y="45" width="10" height="10" fill="currentColor" />
                                <rect x="65" y="75" width="15" height="10" fill="currentColor" />
                                <rect x="45" y="70" width="10" height="20" fill="currentColor" />
                              </svg>
                            </div>

                            {/* UPLOAD RECEIPT */}
                            <div className="space-y-3 pt-2 text-left">
                              <span className="text-[9px] font-black text-white/40 uppercase tracking-widest block">
                                Upload Receipt Screenshot
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
                                      setReceiptSuccess(false);
                                      setReceiptError(null);
                                    }}
                                    className="absolute top-2.5 right-2.5 p-2 bg-black/70 rounded-full text-white/85 hover:text-white border border-white/10"
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                              ) : (
                                <label className="border-2 border-dashed border-white/10 hover:border-[#76C945]/40 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-white/[0.01] hover:bg-white/[0.03] transition-all">
                                  <Image size={24} className="text-white/40 mb-2" />
                                  <span className="text-xs font-bold text-white/80 mb-0.5">
                                    {isVerifyingReceipt ? 'AI Verifying Receipt...' : 'Select Screenshot Receipt'}
                                  </span>
                                  <span className="text-[10px] text-white/20">PNG, JPG up to 10MB</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleReceiptUpload}
                                    disabled={isVerifyingReceipt}
                                    className="hidden"
                                  />
                                </label>
                              )}

                              {isVerifyingReceipt && (
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2 text-left">
                                  <div className="flex items-center gap-2 text-[#8AD65A]">
                                    <span className="w-4 h-4 border-2 border-current border-t-transparent animate-spin rounded-full shrink-0" />
                                    <span className="text-xs font-bold tracking-wide uppercase">AI Verification Running</span>
                                  </div>
                                  
                                  <div className="space-y-1 mt-2 font-mono text-[9px] text-white/50">
                                    {ocrSteps.map((step, idx) => {
                                      const isActive = idx === ocrStepIndex;
                                      const isCompleted = idx < ocrStepIndex;
                                      return (
                                        <div key={idx} className="flex items-center gap-2">
                                          <span className={`w-1 h-1 rounded-full ${isCompleted ? 'bg-emerald-500' : isActive ? 'bg-[#8AD65A] animate-ping' : 'bg-white/10'}`} />
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
                                  <span className="text-[10px] font-semibold">{receiptError}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Bank Details */}
                      {form.paymentMethod === 'Bank' && (
                        <div className="p-5 bg-white/[0.02] border border-white/5 rounded-3xl space-y-3 text-xs leading-relaxed font-mono backdrop-blur-md">
                          <h5 className="font-extrabold text-[10px] text-[#8AD65A] border-b border-white/5 pb-2 uppercase">
                            Meezan Bank Details
                          </h5>
                          <p><span className="text-white/40">Bank Title:</span> Meezan Bank Ltd</p>
                          <p><span className="text-white/40">Account Name:</span> Vital Agro Chemical Industries</p>
                          <p><span className="text-white/40">IBAN Number:</span> PK53MEZN0012345678901234</p>
                        </div>
                      )}

                      {/* COD details */}
                      {form.paymentMethod === 'COD' && (
                        <div className="p-4.5 bg-emerald-500/5 border border-emerald-500/15 rounded-3xl text-xs text-white/70 leading-relaxed flex items-start gap-2.5">
                          <Truck size={18} className="text-[#8AD65A] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[#8AD65A] font-extrabold block mb-0.5">{lang === 'en' ? 'Cash on Delivery Verified' : 'کیش آن ڈیلیوری کی تصدیق'}</span>
                            <p className="text-white/55">{lang === 'en' ? 'No advance fees required. Simply click Continue and complete the order steps.' : 'کوئی ایڈوانس فیس درکار نہیں ہے۔ بس کنٹینیو پر کلک کریں اور آرڈر کے مراحل مکمل کریں۔'}</p>
                          </div>
                        </div>
                      )}

                      {/* Success scan badge details */}
                      {receiptSuccess && (
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-2.5 text-emerald-400">
                          <ShieldCheck size={18} className="shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-black uppercase block">{lang === 'en' ? 'Payment Approved' : 'ادائیگی کی تصدیق ہو گئی'}</span>
                            <p className="text-[10px] text-white/50 font-mono mt-0.5">{lang === 'en' ? 'Gateway tokens registered successfully.' : 'گیٹ وے ٹوکن رجسٹر ہو گیا ہے۔'}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 5: REVIEW ORDER */}
                  {currentStep === 5 && (
                    <div className="space-y-6 w-full text-left">
                      <div className="border-b border-white/5 pb-3">
                        <h3 className="text-base font-black tracking-tight text-[#8AD65A] uppercase">{lang === 'en' ? 'Review Ledger' : 'آرڈر چیک کریں'}</h3>
                        <p className="text-white/40 text-[11px] font-semibold mt-0.5">{lang === 'en' ? 'Double check all metrics before dispatch registration.' : 'آرڈر روانہ کرنے سے پہلے تمام معلومات کی تصدیق کریں۔'}</p>
                      </div>

                      <div className="grid gap-5">
                        {/* 1. Item Details Card */}
                        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-[#8AD65A] uppercase tracking-widest">{lang === 'en' ? 'Selected Products' : 'مصنوعات'}</span>
                            <button
                              type="button"
                              onClick={() => { setDirection(-1); setCurrentStep(1); }}
                              className="text-[#8AD65A] hover:text-[#76C945] text-[10px] uppercase font-black tracking-wider flex items-center gap-1 transition-colors select-none"
                            >
                              <Edit size={10} />
                              <span>{lang === 'en' ? 'Edit' : 'تبدیل کریں'}</span>
                            </button>
                          </div>
                          
                          <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 p-1 flex items-center justify-center shrink-0">
                              <img src={imageSrc} alt={localizedName} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="text-white font-extrabold text-sm truncate">{localizedName}</h5>
                              <p className="text-white/40 text-[10px] font-mono mt-0.5">
                                {form.selectedSize} × {form.quantity} units
                              </p>
                            </div>
                            <div className="text-right shrink-0 font-mono text-xs font-black text-[#8AD65A]">
                              PKR {itemsSubtotal.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        {/* 2. Customer Profile Details */}
                        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 space-y-3">
                          <div className="flex justify-between items-center border-b border-white/5 pb-2">
                            <span className="text-[10px] font-black text-[#8AD65A] uppercase tracking-widest">{lang === 'en' ? 'Customer Profile' : 'ذاتی معلومات'}</span>
                            <button
                              type="button"
                              onClick={() => { setDirection(-1); setCurrentStep(2); }}
                              className="text-[#8AD65A] hover:text-[#76C945] text-[10px] uppercase font-black tracking-wider flex items-center gap-1 transition-colors select-none"
                            >
                              <Edit size={10} />
                              <span>{lang === 'en' ? 'Edit' : 'تبدیل کریں'}</span>
                            </button>
                          </div>
                          <div className="text-xs space-y-1.5">
                            <p className="text-white/60"><span className="text-white/30 mr-2 font-mono">NAME:</span> {form.customerName}</p>
                            <p className="text-white/60"><span className="text-white/30 mr-2 font-mono">PHONE:</span> {form.phone}</p>
                            {form.email && <p className="text-white/60"><span className="text-white/30 mr-2 font-mono">EMAIL:</span> {form.email}</p>}
                          </div>
                        </div>

                        {/* 3. Address Destinations */}
                        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 space-y-3">
                          <div className="flex justify-between items-center border-b border-white/5 pb-2">
                            <span className="text-[10px] font-black text-[#8AD65A] uppercase tracking-widest">{lang === 'en' ? 'Shipping Destination' : 'ڈیلیوری ایڈریس'}</span>
                            <button
                              type="button"
                              onClick={() => { setDirection(-1); setCurrentStep(3); }}
                              className="text-[#8AD65A] hover:text-[#76C945] text-[10px] uppercase font-black tracking-wider flex items-center gap-1 transition-colors select-none"
                            >
                              <Edit size={10} />
                              <span>{lang === 'en' ? 'Edit' : 'تبدیل کریں'}</span>
                            </button>
                          </div>
                          <div className="text-xs space-y-1.5">
                            <p className="text-white/60"><span className="text-white/30 mr-2 font-mono">LOCATION:</span> {form.address}, {form.city}, {form.province} {form.postalCode ? `(${form.postalCode})` : ''}</p>
                            {form.specialInstructions && <p className="text-white/60"><span className="text-white/30 mr-2 font-mono">NOTES:</span> {form.specialInstructions}</p>}
                          </div>
                        </div>

                        {/* 4. Payment Modes Review */}
                        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 space-y-3">
                          <div className="flex justify-between items-center border-b border-white/5 pb-2">
                            <span className="text-[10px] font-black text-[#8AD65A] uppercase tracking-widest">{lang === 'en' ? 'Payment Details' : 'ادائیگی کی تفصیلات'}</span>
                            <button
                              type="button"
                              onClick={() => { setDirection(-1); setCurrentStep(4); }}
                              className="text-[#8AD65A] hover:text-[#76C945] text-[10px] uppercase font-black tracking-wider flex items-center gap-1 transition-colors select-none"
                            >
                              <Edit size={10} />
                              <span>{lang === 'en' ? 'Edit' : 'تبدیل کریں'}</span>
                            </button>
                          </div>
                          <div className="text-xs flex justify-between items-center">
                            <span className="text-white/60 font-black uppercase font-mono">{form.paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : form.paymentMethod}</span>
                            <span className="text-[#8AD65A] font-black font-mono">PKR {grandTotal.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 6: CONFIRM & PLACE */}
                  {currentStep === 6 && (
                    <div className="space-y-6 w-full flex-1 flex flex-col justify-center text-center">
                      <div className="relative w-20 h-20 mx-auto bg-[#76C945]/10 rounded-full flex items-center justify-center border border-[#76C945]/30">
                        <motion.div
                          className="absolute inset-0 rounded-full border border-dashed border-[#76C945]/40"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                        />
                        <Package size={32} className="text-[#8AD65A]" />
                      </div>

                      <div className="space-y-2 max-w-sm mx-auto">
                        <h3 className="text-lg font-black tracking-tight text-white uppercase">{lang === 'en' ? 'Final Confirmation' : 'روانگی کی تصدیق'}</h3>
                        <p className="text-white/50 text-xs leading-relaxed">
                          {lang === 'en' 
                            ? 'Ready to register order details to the database and generate receipt ledger?' 
                            : 'کیا آپ ڈیٹا بیس میں آرڈر کی معلومات درج کرنے کے لیے تیار ہیں؟'}
                        </p>
                      </div>

                      {/* Summary prices info block */}
                      <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-5 max-w-sm mx-auto w-full font-mono space-y-2 text-xs text-left">
                        <div className="flex justify-between text-white/50">
                          <span>{lang === 'en' ? 'Grand Total:' : 'کل لاگت:'}</span>
                          <span className="text-[#8AD65A] font-black text-sm">PKR {grandTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-white/40">
                          <span>{lang === 'en' ? 'Payment Method:' : 'ادائیگی کا طریقہ:'}</span>
                          <span className="font-bold uppercase">{form.paymentMethod}</span>
                        </div>
                      </div>

                      <p className="text-center text-white/25 text-[11px] mt-3">
                        Order details sent to WhatsApp · Firebase logged · COD confirmed
                      </p>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Navigation controls */}
            {successPhase === 'idle' && (
              <div 
                className="border-t border-white/5 bg-black/40 backdrop-blur-md px-6 py-4.5 flex items-center justify-between gap-4 sticky bottom-0 z-20"
                style={{ paddingBottom: 'calc(1.125rem + env(safe-area-inset-bottom, 0px))' }}
              >
                <button
                  type="button"
                  onClick={currentStep === 1 ? () => setIsOpen(false) : handlePrevStep}
                  className="px-5 py-3 rounded-xl border border-white/10 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition-all font-bold text-xs uppercase tracking-wider select-none shrink-0"
                >
                  {currentStep === 1 ? (lang === 'en' ? 'Cancel' : 'کینسل') : (lang === 'en' ? 'Back' : 'واپس')}
                </button>
                
                {currentStep === 6 ? (
                  <div className="flex-1 max-w-xs">
                    <OrderConfirmButton
                      onConfirm={submitOrder}
                      onValidate={() => true}
                      onComplete={(orderId) => {
                        setCreatedOrderId(orderId);
                        setSuccessPhase('confirmed');
                      }}
                      disabled={isSubmitting}
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2d6a2d] to-[#3d8c3d] text-white font-extrabold text-xs uppercase tracking-widest border border-[rgba(92,184,92,0.4)] shadow-[0_0_20px_rgba(92,184,92,0.2)] hover:shadow-[0_0_35px_rgba(92,184,92,0.4)] transition-all flex items-center gap-1.5 select-none"
                  >
                    <span>{lang === 'en' ? 'Continue' : 'جاری رکھیں'}</span>
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>
            )}

            {/* Cinematic Success Portal Animation Overlay */}
            {successPhase !== 'idle' && (
              <motion.div 
                className="absolute inset-0 bg-[#050a06]/98 z-50 flex flex-col items-center justify-center p-6 text-center select-none overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="max-w-md w-full space-y-8 py-10 px-4">
                  {/* Animation stage canvas */}
                  {successPhase !== 'confirmed' ? (
                    <div className="relative w-full h-72 border border-white/5 bg-white/[0.01] rounded-3xl flex items-center justify-center overflow-hidden backdrop-blur-sm shadow-[inset_0_0_30px_rgba(255,255,255,0.02)]">
                      
                      {/* Moving speed sceneries in background during driving */}
                      {successPhase === 'driving' && (
                        <div className="absolute top-12 left-0 right-0 flex justify-around opacity-[0.08] pointer-events-none">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <motion.svg
                              key={i}
                              className="w-10 h-10 text-[#8AD65A]"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              animate={{ x: [100, -300] }}
                              transition={{ duration: 1.0 + i * 0.3, repeat: Infinity, ease: 'linear' }}
                            >
                              <path d="M12 2 L4 18 L20 18 Z" />
                            </motion.svg>
                          ))}
                        </div>
                      )}

                      {/* Moving Road Lines during Driving */}
                      {successPhase === 'driving' && (
                        <div className="absolute bottom-6 left-0 right-0 h-1 overflow-hidden opacity-30 flex justify-between px-4 pointer-events-none">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-4 h-full bg-[#8AD65A] rounded"
                              animate={{ x: [0, -60] }}
                              transition={{ duration: 0.4, repeat: Infinity, ease: 'linear' }}
                            />
                          ))}
                        </div>
                      )}

                      {/* A. Package Box representation */}
                      <motion.div
                        className="absolute z-20"
                        initial={{ y: -80, opacity: 1, scale: 1 }}
                        animate={
                          successPhase === 'packing'
                            ? { y: -30, opacity: 1, scale: 1 }
                            : successPhase === 'falling'
                            ? { y: 18, opacity: 1, scale: 0.6 } // Drops directly inside truck bed!
                            : successPhase === 'driving'
                            ? { y: 18, x: successProgress * 3.5, opacity: 0.8, scale: 0.6 } // Drives with the truck
                            : { opacity: 0 }
                        }
                        transition={{
                          y: successPhase === 'falling' 
                            ? { type: 'spring', stiffness: 180, damping: 12 } 
                            : { duration: 0.4 },
                          x: { ease: 'linear', duration: 2.5 }
                        }}
                      >
                        <svg className="w-16 h-16 text-[#8AD65A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="9" width="18" height="12" rx="2" strokeWidth="2.5" />
                          <motion.path 
                            d="M3 9 L12 15 L21 9" 
                            initial={{ pathLength: 0 }}
                            animate={successPhase !== 'packing' ? { pathLength: 1 } : { pathLength: 0 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                          />
                          <motion.path 
                            d="M12 9 L12 21" 
                            initial={{ scaleY: 0 }}
                            animate={successPhase !== 'packing' ? { scaleY: 1 } : { scaleY: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                          />
                        </svg>
                      </motion.div>

                      {/* B. Delivery Truck SVG */}
                      <motion.div
                        className="absolute z-10"
                        initial={{ x: -300 }}
                        animate={
                          successPhase === 'packing'
                            ? { x: -300 }
                            : successPhase === 'falling'
                            ? { x: 0 }
                            : successPhase === 'driving'
                            ? { x: successProgress * 3.5, y: [0, -1, 0, 1, 0] } // Vibrates & Accelerates away!
                            : { x: 400, opacity: 0 }
                        }
                        transition={
                          successPhase === 'falling'
                            ? { type: 'spring', stiffness: 120, damping: 15 }
                            : successPhase === 'driving'
                            ? { 
                                x: { ease: 'linear', duration: 2.5 },
                                y: { repeat: Infinity, duration: 0.15 } // shake engine
                              }
                            : { duration: 0.5 }
                        }
                      >
                        <div className="relative">
                          <svg className="w-24 h-16 text-[#76C945]" viewBox="0 0 100 60" fill="currentColor">
                            <rect x="10" y="15" width="55" height="30" rx="2" fill="#2d6a2d" stroke="#8AD65A" strokeWidth="2" />
                            <path d="M65 20 L80 20 L88 35 L88 45 L65 45 Z" fill="#3d8c3d" stroke="#8AD65A" strokeWidth="2" />
                            <path d="M78 22 L85 32 L68 32 L68 22 Z" fill="#a5f3fc" opacity="0.6" />
                            <circle cx="85" cy="40" r="3" fill="#fffae6" />
                            <rect x="5" y="40" width="6" height="3" fill="#9ca3af" />
                            
                            {/* Wheel Rotations */}
                            <motion.circle 
                              cx="25" cy="48" r="8" 
                              fill="#111827" 
                              stroke="#d1d5db" 
                              strokeWidth="2.5" 
                              animate={successPhase === 'driving' ? { rotate: 720 } : {}}
                              transition={{ duration: 2.5, ease: 'linear' }}
                            />
                            <motion.circle 
                              cx="70" cy="48" r="8" 
                              fill="#111827" 
                              stroke="#d1d5db" 
                              strokeWidth="2.5" 
                              animate={successPhase === 'driving' ? { rotate: 720 } : {}}
                              transition={{ duration: 2.5, ease: 'linear' }}
                            />
                          </svg>

                          {/* Exhaust smoke particles */}
                          {successPhase === 'driving' && (
                            <div className="absolute -left-4 top-8 flex flex-col gap-1 pointer-events-none">
                              {Array.from({ length: 3 }).map((_, i) => (
                                <motion.span
                                  key={i}
                                  className="w-2 h-2 rounded-full bg-white/20 blur-[1px] block"
                                  initial={{ scale: 0.2, x: 0, opacity: 0.8 }}
                                  animate={{ scale: 1.8, x: -25, y: -8, opacity: 0 }}
                                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15, ease: 'easeOut' }}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>

                      {/* C. Destination Arrived Pin (delivered phase only) */}
                      {successPhase === 'delivered' && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                          className="absolute z-30"
                        >
                          <MapPin size={48} className="text-[#8AD65A] stroke-[2.5]" />
                        </motion.div>
                      )}

                      {/* Header label details inside canvas overlay */}
                      <div className="absolute top-4 left-6 right-6 flex items-center justify-between text-white/50 text-[9px] font-mono tracking-widest uppercase">
                        <span>{lang === 'en' ? 'Vital Agro Grid' : 'لوجسٹکس گرڈ'}</span>
                        <span>
                          {successPhase === 'packing' 
                            ? 'Packing' 
                            : successPhase === 'falling' 
                              ? 'Loading Cargo' 
                              : successPhase === 'driving' 
                                ? 'In Transit' 
                                : 'Arrived'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Final step success details display */
                    <motion.div
                      key="confirmed"
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-full flex flex-col items-center gap-6 text-center"
                    >
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <div 
                          className="absolute inset-0 rounded-full blur-xl opacity-60"
                          style={{ background: 'rgba(92,184,92,0.45)' }}
                        />
                        <motion.div 
                          className="relative w-20 h-20 rounded-full bg-black border-2 border-[#5cb85c] flex items-center justify-center shadow-[0_0_30px_rgba(92,184,92,0.6)]"
                          initial={{ rotate: -90 }}
                          animate={{ rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                        >
                          <Check size={36} className="text-[#8AD65A] stroke-[3.5]" />
                        </motion.div>
                      </div>

                      <div className="space-y-2">
                        <h2 className="text-2xl font-black text-white uppercase tracking-wider drop-shadow-md">
                          {lang === 'en' ? 'Order Successfully Placed!' : 'آرڈر کامیابی سے درج ہو گیا!'}
                        </h2>
                        <p className="text-white/50 text-xs font-semibold leading-relaxed max-w-sm mx-auto">
                          {lang === 'en' 
                            ? 'Your order has been logged in our databases and is pending confirmation.' 
                            : 'آپ کا آرڈر کامیابی سے محفوظ کر لیا گیا ہے۔'}
                        </p>
                      </div>

                      <motion.div 
                        className="w-full p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md space-y-3 text-left font-mono"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-white/30 text-[9px] uppercase font-bold tracking-widest">{lang === 'en' ? 'Order Registry ID' : 'آرڈر نمبر'}</span>
                          <span className="text-[#8AD65A] font-black text-xs tracking-wider">
                            {createdOrderId ? `VA-O-${createdOrderId.slice(0, 6).toUpperCase()}` : 'VA-O-PENDING'}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs pt-1">
                          <span className="text-white/40">{lang === 'en' ? 'Customer' : 'خریدار'}</span>
                          <span className="text-white font-bold">{form.customerName}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-white/40">{lang === 'en' ? 'Contact Phone' : 'رابطہ نمبر'}</span>
                          <span className="text-white font-bold">{form.phone}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-white/40">{lang === 'en' ? 'Grand Total' : 'کل قیمت'}</span>
                          <span className="text-[#8AD65A] font-black">PKR {grandTotal.toLocaleString()}</span>
                        </div>
                      </motion.div>

                      <motion.button
                        onClick={() => {
                          resetForm();
                          setIsOpen(false);
                          setSuccessPhase('idle');
                          setCurrentStep(1);
                          navigate('/');
                        }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-4.5 rounded-full bg-gradient-to-r from-[#2d6a2d] to-[#3d8c3d] text-white font-black text-sm uppercase tracking-widest border border-white/10 shadow-[0_0_20px_rgba(92,184,92,0.3)] hover:shadow-[0_0_30px_rgba(92,184,92,0.5)] transition-all"
                      >
                        {lang === 'en' ? 'Return to Homepage' : 'ہوم پیج پر واپس جائیں'}
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

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
