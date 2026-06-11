import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2, Image, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import OrderConfirmButton from './OrderConfirmButton';
import { verifyReceipt } from '@/lib/ai/receiptVerifier';

const InputField = ({ label, error, ...props }) => (
  <div className="w-full">
    <label className="block text-white/60 text-xs mb-1.5 tracking-wide">
      {label}
    </label>
    <input
      {...props}
      className={`
        w-full px-4 py-3.5 rounded-2xl text-sm text-white
        bg-white/5 border outline-none
        placeholder:text-white/25
        focus:border-[rgba(92,184,92,0.5)] focus:bg-white/8
        transition-all duration-300
        ${error
          ? 'border-red-500/50 bg-red-500/5'
          : 'border-white/10'
        }
      `}
    />
    {error && (
      <p className="text-red-400 text-[11px] mt-1.5 ml-1">{error}</p>
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
  const [createdOrderId, setCreatedOrderId] = React.useState(null);
  const [isVerifyingReceipt, setIsVerifyingReceipt] = React.useState(false);
  const [receiptError, setReceiptError] = React.useState(null);
  const [receiptSuccess, setReceiptSuccess] = React.useState(false);

  const handleReceiptUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsVerifyingReceipt(true);
    setReceiptError(null);
    setReceiptSuccess(false);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result.substring(reader.result.indexOf(',') + 1);
      const mimeType = file.type || 'image/jpeg';

      try {
        const parsed = await verifyReceipt(base64Data, mimeType);
        setForm(prev => ({
          ...prev,
          paymentRefId: parsed.refId,
          paymentAmount: parsed.amount,
          paymentTimestamp: parsed.timestamp,
          receiptBase64: reader.result,
        }));
        setReceiptSuccess(true);
      } catch (err) {
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

  // Helper to extract size labels as strings
  const sizes = product.sizes ? product.sizes.map(s => typeof s === 'object' ? s.size : s) : [];

  // Helper to extract the price for a size option
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
      if (match) {
        return Number(match.rate) || 999;
      }
    }

    return product.price || 999;
  };

  const currentPrice = getPriceForSize(form.selectedSize);
  const localizedName = typeof product.name === 'object' ? (product.name[lang] || product.name.en) : product.name;
  const imageSrc = product.pngUrl || product.imageUrl || product.image;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Bottom Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50
              rounded-t-[32px] overflow-hidden
              max-h-[92vh] overflow-y-auto"
            style={{
              background: 'rgba(10,26,10,0.97)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderBottom: 'none',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-5 pt-2
              border-b border-white/8"
            >
              <div>
                <h3 className="text-white font-bold text-lg">
                  {lang === 'en' ? 'Place Your Order' : 'اپنا آرڈر درج کریں'}
                </h3>
                <p className="text-white/40 text-xs mt-0.5 font-medium">
                  {lang === 'en' ? 'Cash on Delivery — Order via WhatsApp' : 'کیش آن ڈیلیوری — واٹس ایپ کے ذریعے آرڈر'}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full bg-white/8 flex items-center
                  justify-center text-white/60 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Product Summary */}
            <div className="mx-6 mt-5 p-4 rounded-2xl
              bg-white/4 border border-white/8"
            >
              <div className="flex items-center gap-3">
                <img
                  src={imageSrc}
                  alt={localizedName}
                  className="w-14 h-14 object-contain drop-shadow-md"
                />
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">
                    {localizedName}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">
                    {product.activeIngredient || product.formula || product.category}
                  </p>
                  <p className="text-[#5cb85c] font-black mt-1 text-sm font-mono">
                    PKR {currentPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Pack size selector */}
              {sizes.length > 1 && (
                <div className="mt-3 pt-3 border-t border-white/8">
                  <p className="text-white/40 text-[11px] mb-2 font-black tracking-wider uppercase">
                    {lang === 'en' ? 'SELECT SIZE:' : 'سائز منتخب کریں:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => updateForm('selectedSize', size)}
                        className={`
                          px-3.5 py-1.5 rounded-xl text-xs font-semibold
                          border transition-all duration-200
                          ${form.selectedSize === size
                            ? 'bg-[#2d6a2d] border-[#5cb85c] text-white'
                            : 'bg-white/5 border-white/10 text-white/50'
                          }
                        `}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/8">
                <span className="text-white/40 text-xs font-semibold">{lang === 'en' ? 'QUANTITY:' : 'تعداد:'}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateForm('quantity', Math.max(1, form.quantity - 1))}
                    className="w-8 h-8 rounded-full bg-white/8 text-white
                      flex items-center justify-center text-lg font-bold
                      hover:bg-white/15 transition-colors"
                  >
                    −
                  </button>
                  <span className="text-white font-bold w-6 text-center">
                    {form.quantity}
                  </span>
                  <button
                    onClick={() => updateForm('quantity', form.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-[#2d6a2d] text-white
                      flex items-center justify-center text-lg font-bold
                      hover:bg-[#3d8c3d] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/8">
                <span className="text-white/40 text-xs font-semibold">{lang === 'en' ? 'TOTAL AMOUNT:' : 'کل قیمت:'}</span>
                <span className="text-[#5cb85c] font-black text-lg font-mono">
                  PKR {(currentPrice * form.quantity).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Customer Form */}
            <div className="px-6 mt-5 space-y-4">
              <p className="text-white/50 text-xs tracking-[0.12em] uppercase font-semibold">
                {lang === 'en' ? 'Your Details' : 'آپ کی تفصیلات'}
              </p>

              <InputField
                label={lang === 'en' ? "Full Name *" : "مکمل نام *"}
                type="text"
                placeholder={lang === 'en' ? "Muhammad Ali" : "محمد علی"}
                value={form.customerName}
                onChange={(e) => updateForm('customerName', e.target.value)}
                error={errors.customerName}
              />

              <InputField
                label={lang === 'en' ? "Phone Number *" : "فون نمبر *"}
                type="tel"
                placeholder="03001234567"
                value={form.phone}
                onChange={(e) => updateForm('phone', e.target.value)}
                error={errors.phone}
                inputMode="tel"
              />

              <InputField
                label={lang === 'en' ? "City *" : "شہر *"}
                type="text"
                placeholder={lang === 'en' ? "Haroonabad, Bahawalpur..." : "ہارون آباد، بہاولپور..."}
                value={form.city}
                onChange={(e) => updateForm('city', e.target.value)}
                error={errors.city}
              />

              <div className="w-full">
                <label className="block text-white/60 text-xs mb-1.5 tracking-wide">
                  {lang === 'en' ? 'Full Address *' : 'مکمل پتہ *'}
                </label>
                <textarea
                  rows={3}
                  placeholder={lang === 'en' ? "Street, Mohalla, Landmark..." : "گلی، محلہ، نزدیکی جگہ..."}
                  value={form.address}
                  onChange={(e) => updateForm('address', e.target.value)}
                  className={`
                    w-full px-4 py-3 rounded-2xl text-sm text-white
                    bg-white/5 border outline-none resize-none
                    placeholder:text-white/25
                    focus:border-[rgba(92,184,92,0.5)]
                    transition-all duration-300
                    ${errors.address ? 'border-red-500/50 bg-red-500/5' : 'border-white/10'}
                  `}
                />
                {errors.address && (
                  <p className="text-red-400 text-[11px] mt-1.5 ml-1">
                    {errors.address}
                  </p>
                )}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="px-6 mt-5 space-y-3">
              <p className="text-white/50 text-xs tracking-[0.12em] uppercase font-semibold">
                {lang === 'en' ? 'Payment Method' : 'طریقہ ادائیگی'}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'COD', name: lang === 'en' ? 'COD' : 'کیش آن ڈیلیوری' },
                  { id: 'Easypaisa', name: lang === 'en' ? 'Easypaisa' : 'ایزی پیسہ' },
                  { id: 'JazzCash', name: lang === 'en' ? 'JazzCash' : 'جاز کیش' },
                  { id: 'Bank', name: lang === 'en' ? 'Bank Transfer' : 'بینک ٹرانسفر' },
                ].map(method => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => updateForm('paymentMethod', method.id)}
                    className={`
                      px-3 py-2.5 rounded-xl text-xs font-bold border transition-all duration-300
                      ${form.paymentMethod === method.id
                        ? 'bg-[#2d6a2d]/20 border-[#5cb85c] text-[#8AD65A] scale-102'
                        : 'bg-white/5 border-white/10 text-white/55 hover:bg-white/10 hover:text-white'
                      }
                    `}
                  >
                    {method.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Conditional Mobile Payments OCR Verification Area */}
            {form.paymentMethod !== 'COD' && (
              <div className="mx-6 mt-5 p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4">
                <h4 className="text-white font-extrabold text-sm border-b border-white/8 pb-2">
                  {lang === 'en' ? 'Payment Instructions' : 'ادائیگی کی ہدایات'}
                </h4>
                <div className="text-xs text-white/70 space-y-1">
                  <p>
                    <span className="font-bold text-[#8AD65A]">{lang === 'en' ? 'Account Name: ' : 'اکاؤنٹ کا نام: '}</span>
                    Vital Agro Chemical Industries
                  </p>
                  {form.paymentMethod === 'Easypaisa' && (
                    <p>
                      <span className="font-bold text-[#8AD65A]">{lang === 'en' ? 'Easypaisa Number: ' : 'ایزی پیسہ نمبر: '}</span>
                      0301-1837160
                    </p>
                  )}
                  {form.paymentMethod === 'JazzCash' && (
                    <p>
                      <span className="font-bold text-[#8AD65A]">{lang === 'en' ? 'JazzCash Number: ' : 'جاز کیش نمبر: '}</span>
                      0300-1234567
                    </p>
                  )}
                  {form.paymentMethod === 'Bank' && (
                    <>
                      <p>
                        <span className="font-bold text-[#8AD65A]">{lang === 'en' ? 'Bank: ' : 'بینک: '}</span>
                        Meezan Bank Ltd
                      </p>
                      <p>
                        <span className="font-bold text-[#8AD65A]">{lang === 'en' ? 'Account No: ' : 'اکاؤنٹ نمبر: '}</span>
                        1234-5678-9012-3456
                      </p>
                    </>
                  )}
                  <p className="text-[10px] text-white/40 pt-1">
                    {lang === 'en'
                      ? 'Please transfer the exact total amount and upload the screenshot below for AI verification.'
                      : 'براہ کرم کل رقم منتقل کریں اور اے آئی تصدیق کے لیے نیچے سکرین شاٹ اپ لوڈ کریں۔'}
                  </p>
                </div>

                {/* Screenshot Uploader */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-wider block">
                    {lang === 'en' ? 'UPLOAD TRANSACTION RECEIPT *' : 'ٹرانزیکشن رسید کا سکرین شاٹ *'}
                  </span>
                  
                  {form.receiptBase64 ? (
                    <div className="relative rounded-xl border border-white/10 overflow-hidden aspect-[16/9] bg-black/40 flex items-center justify-center">
                      <img src={form.receiptBase64} alt="Receipt Preview" className="w-full h-full object-contain" />
                      <button
                        type="button"
                        onClick={() => {
                          updateForm('receiptBase64', '');
                          updateForm('paymentRefId', '');
                          updateForm('paymentAmount', 0);
                          updateForm('paymentTimestamp', '');
                          setReceiptSuccess(false);
                          setReceiptError(null);
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white/80 hover:text-white border border-white/10 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className="border border-dashed border-white/10 hover:border-[#5cb85c]/40 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-white/[0.01] hover:bg-white/[0.03] transition-all">
                      <Image size={24} className="text-white/40 mb-1.5" />
                      <span className="text-xs font-bold text-white/80 mb-0.5">
                        {isVerifyingReceipt ? 'AI Reading Receipt...' : (lang === 'en' ? 'Select Screenshot' : 'سکرین شاٹ منتخب کریں')}
                      </span>
                      <span className="text-[10px] text-white/30">
                        {lang === 'en' ? 'Ref details parsed automatically' : 'رسید کی تفصیلات خودکار طور پر پڑھی جائیں گی'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleReceiptUpload}
                        disabled={isVerifyingReceipt}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* OCR Parsed details card */}
                {isVerifyingReceipt && (
                  <div className="p-3 bg-white/5 border border-white/8 rounded-xl flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 text-[#8AD65A] animate-spin" />
                    <span className="text-xs text-white/70 font-semibold">
                      {lang === 'en' ? 'AI Vision reading transaction details...' : 'اے آئی وژن تفصیلات پڑھ رہا ہے...'}
                    </span>
                  </div>
                )}

                {receiptError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400">
                    <AlertTriangle size={14} className="shrink-0" />
                    <span className="text-[11px] font-semibold leading-relaxed">{receiptError}</span>
                  </div>
                )}

                {receiptSuccess && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 border-b border-emerald-500/10 pb-1.5">
                      <CheckCircle2 size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {lang === 'en' ? 'Extracted via Gemini AI Vision' : 'جیمنی اے آئی وژن سے حاصل کردہ'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-white/40 block font-bold uppercase">{lang === 'en' ? 'REF TRANSACTION ID' : 'ٹرانزیکشن آئی ڈی'}</label>
                        <input
                          type="text"
                          value={form.paymentRefId}
                          onChange={(e) => updateForm('paymentRefId', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-1.5 text-xs text-white outline-none focus:border-[#5cb85c]/40 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-white/40 block font-bold uppercase">{lang === 'en' ? 'VERIFIED AMOUNT' : 'تصدیق شدہ رقم'}</label>
                        <input
                          type="number"
                          value={form.paymentAmount}
                          onChange={(e) => updateForm('paymentAmount', Number(e.target.value))}
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-1.5 text-xs text-white outline-none focus:border-[#5cb85c]/40 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* COD Note */}
            {form.paymentMethod === 'COD' && (
              <div className="mx-6 mt-5 p-4 rounded-2xl
                bg-[rgba(45,106,45,0.12)] border border-[rgba(92,184,92,0.2)]"
              >
                <p className="text-[#5cb85c] text-xs font-semibold mb-1">
                  {lang === 'en' ? '✅ Cash on Delivery (COD)' : '✅ کیش آن ڈیلیوری (COD)'}
                </p>
                <p className="text-white/40 text-[11px] leading-relaxed font-medium">
                  {lang === 'en'
                    ? "Pay when your order arrives. No advance payment required. Our team will confirm your order via WhatsApp."
                    : "آرڈر پہنچنے پر رقم ادا کریں۔ کوئی پیشگی ادائیگی درکار نہیں۔ ہماری ٹیم واٹس ایپ کے ذریعے آپ کے آرڈر کی تصدیق کرے گی۔"}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="px-6 pb-10 mt-5">
              <OrderConfirmButton
                disabled={isSubmitting}
                onValidate={validate}
                onConfirm={async () => {
                  setIsSubmitting(true);
                  try {
                    const newId = await submitOrder();
                    if (newId) {
                      setCreatedOrderId(newId);
                    }
                  } catch (e) {
                    console.error("Order submission failed:", e);
                  }
                }}
                onComplete={() => {
                  const targetId = createdOrderId;
                  resetForm();
                  setIsSubmitting(false);
                  setCreatedOrderId(null);
                  if (targetId) {
                    navigate(`/track/${targetId}`);
                  }
                }}
              />

              <p className="text-center text-white/25 text-[11px] mt-4">
                {lang === 'en' ? "Your order details will be sent to WhatsApp" : 'آرڈر کی تفصیلات واٹس ایپ پر بھیجی جائیں گی'}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
