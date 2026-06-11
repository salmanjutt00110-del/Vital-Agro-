import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import OrderConfirmButton from './OrderConfirmButton';

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

            {/* COD Note */}
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

            {/* Submit Button */}
            <div className="px-6 pb-10 mt-5">
              <OrderConfirmButton
                disabled={isSubmitting}
                onValidate={validate}
                onConfirm={async () => {
                  setIsSubmitting(true);
                  try {
                    await submitOrder();
                  } catch (e) {
                    console.error("Order submission failed:", e);
                  }
                }}
                onComplete={() => {
                  resetForm();
                  setIsSubmitting(false);
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
