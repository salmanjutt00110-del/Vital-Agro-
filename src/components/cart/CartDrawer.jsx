import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, CreditCard, Lock, ShieldCheck, MessageCircle, Truck } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { useLanguage } from '@/lib/LanguageContext';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartSubtotal, clearCart } = useCart();
  const { lang } = useLanguage();
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvc: '', name: '' });
  const [loading, setLoading] = useState(false);

  const formatPrice = (val) => {
    return `PKR ${Math.round(val)}`;
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!cardData.number || !cardData.expiry || !cardData.cvc || !cardData.name) {
      alert(lang === 'en' ? 'Please fill in all card details.' : 'براہ کرم کارڈ کی تمام تفصیلات درج کریں۔');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCheckoutStep('success');
      setTimeout(() => {
        clearCart();
        setIsCartOpen(false);
        setCheckoutStep('cart');
        setCardData({ number: '', expiry: '', cvc: '', name: '' });
      }, 3000);
    }, 1500);
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] overflow-hidden font-body select-none">
        {/* Dark blurred backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setIsCartOpen(false);
            setCheckoutStep('cart');
          }}
          className="absolute inset-0 bg-black/45 backdrop-blur-sm"
        />

        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-screen max-w-md"
          >
            {/* Frosted Glass Drawer Container */}
            <div className="h-full flex flex-col bg-[#0A2E1F]/90 backdrop-blur-2xl border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.6)] text-white relative">
              
              {/* Aurora background glow */}
              <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#76C945]/10 blur-[100px] pointer-events-none z-0" />
              <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#C5A059]/5 blur-[100px] pointer-events-none z-0" />

              {/* Header */}
              <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between z-10 relative">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#76C945]" />
                  <h2 className="text-lg font-black uppercase tracking-wider">
                    {checkoutStep === 'checkout'
                      ? (lang === 'en' ? 'Stripe Checkout' : 'اسٹرائپ ادائیگی')
                      : (lang === 'en' ? 'Your Shopping Cart' : 'آپ کی شاپنگ کارٹ')}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCheckoutStep('cart');
                  }}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 overflow-y-auto px-6 py-4 z-10 relative">
                {checkoutStep === 'cart' && (
                  <>
                    {cart.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center py-20 gap-4">
                        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                          <ShoppingBag className="w-10 h-10" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-white/90">
                            {lang === 'en' ? 'Your cart is empty' : 'آپ کی کارٹ خالی ہے'}
                          </p>
                          <p className="text-xs text-white/50 mt-1 max-w-xs font-medium leading-relaxed">
                            {lang === 'en'
                              ? 'Browse our premium agricultural products and add items to your cart.'
                              : 'ہماری بہترین زرعی مصنوعات دیکھیں اور انہیں کارٹ میں شامل کریں۔'}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setIsCartOpen(false);
                          }}
                          className="mt-4 px-6 h-[42px] bg-[#76C945] hover:bg-[#8AD65A] text-[#0A2E1F] text-xs font-black uppercase tracking-wider rounded-full transition-all active:scale-95 cursor-pointer shadow-lg shadow-[#76C945]/20 flex items-center justify-center"
                        >
                          {lang === 'en' ? 'Shop Our Products' : 'مصنوعات خریدیں'}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <motion.div
                            key={item.cartId}
                            layout
                            className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex-row items-center justify-between"
                          >
                            <div className="w-16 h-16 rounded-xl bg-white/5 p-2 flex items-center justify-center border border-white/5">
                              <img
                                src={item.pngUrl || item.imageUrl}
                                alt={item.name[lang] || item.name}
                                className="max-h-full max-w-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
                              />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="font-extrabold text-sm text-white truncate">
                                {item.name[lang] || item.name}
                              </h3>
                              <p className="text-[10px] text-[#76C945] font-black uppercase mt-0.5 tracking-wider">
                                {item.size.size}
                              </p>
                              
                              {/* Quantity adjustments */}
                              <div className="flex items-center gap-2.5 mt-2">
                                <button
                                  onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                  className="w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold text-xs"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-sm font-black w-6 text-center font-mono">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                  className="w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold text-xs"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                            <div className="text-right flex flex-col items-end justify-between h-full py-1">
                              <span className="text-sm font-black text-white font-mono">
                                {formatPrice(Number(item.size.price || item.size.rate || 0) * item.quantity)}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.cartId)}
                                className="text-white/40 hover:text-red-400 p-1.5 mt-3 rounded-lg hover:bg-white/5 transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                        {/* Trust Badges — Fills empty space when cart has items */}
                        <div className="trust-badges mt-8 pt-6 border-t border-white/10 space-y-3">
                          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/5 select-none">
                            <Lock className="w-4 h-4 text-[#76C945]" />
                            <span className="text-xs font-semibold text-white/70">
                              {lang === 'en' ? 'Secure Checkout via Stripe' : 'اسٹرائپ کے ذریعے محفوظ ادائیگی'}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/5 select-none">
                            <MessageCircle className="w-4 h-4 text-green-400" />
                            <span className="text-xs font-semibold text-white/70">
                              {lang === 'en' ? '24/7 WhatsApp Ordering & Support' : '24/7 واٹس ایپ سپورٹ'}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/5 select-none">
                            <Truck className="w-4 h-4 text-[#C5A059]" />
                            <span className="text-xs font-semibold text-white/70">
                              {lang === 'en' ? 'Fast Delivery Across Pakistan' : 'پورے پاکستان میں تیز ڈیلیوری'}
                            </span>
                          </div>
                        </div>

                        {/* Continue Shopping button */}
                        <button
                          onClick={() => setIsCartOpen(false)}
                          className="mt-6 text-sm text-white/50 hover:text-white/80 underline w-full text-center block cursor-pointer transition-colors"
                        >
                          {lang === 'en' ? '← Continue Shopping' : '← خریداری جاری رکھیں'}
                        </button>
                      </div>
                    )}
                  </>
                )}

                {checkoutStep === 'checkout' && (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-[#76C945]" />
                      <div>
                        <span className="text-xs text-white/50 block font-bold uppercase tracking-wider">
                          {lang === 'en' ? 'Stripe Checkout Simulation' : 'اسٹرائپ ورچوئل پیمنٹ'}
                        </span>
                        <span className="text-[10px] text-green-400 font-bold block">
                          {lang === 'en' ? 'Checkout Simulated / Sandbox Ready' : 'سینڈ باکس ٹیسٹنگ کے لیے تیار'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Name on Card */}
                      <div>
                        <label className="text-xs text-white/60 font-bold block mb-1.5 uppercase">
                          {lang === 'en' ? 'Cardholder Name' : 'کارڈ ہولڈر کا نام'}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={cardData.name}
                          onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#76C945] focus:outline-none"
                        />
                      </div>

                      {/* Card Number */}
                      <div>
                        <label className="text-xs text-white/60 font-bold block mb-1.5 uppercase">
                          {lang === 'en' ? 'Card Number' : 'کارڈ نمبر'}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="4242 4242 4242 4242"
                            maxLength="19"
                            value={cardData.number}
                            onChange={(e) => setCardData(prev => ({ ...prev, number: e.target.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim() }))}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-sm text-white placeholder-white/30 focus:border-[#76C945] focus:outline-none font-mono"
                          />
                          <Lock className="w-4 h-4 text-white/40 absolute right-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      {/* Expiry + CVC */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-white/60 font-bold block mb-1.5 uppercase">
                            {lang === 'en' ? 'Expiration Date' : 'میعاد ختم ہونے کی تاریخ'}
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="MM / YY"
                            maxLength="5"
                            value={cardData.expiry}
                            onChange={(e) => setCardData(prev => ({ ...prev, expiry: e.target.value }))}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#76C945] focus:outline-none font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-white/60 font-bold block mb-1.5 uppercase">
                            CVC / CVV
                          </label>
                          <input
                            type="password"
                            required
                            placeholder="•••"
                            maxLength="3"
                            value={cardData.cvc}
                            onChange={(e) => setCardData(prev => ({ ...prev, cvc: e.target.value }))}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#76C945] focus:outline-none font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 items-center bg-[#76C945]/10 border border-[#76C945]/30 rounded-xl p-3.5 mt-6">
                      <ShieldCheck className="w-5 h-5 text-[#8AD65A]" />
                      <p className="text-[10px] text-white/80 leading-relaxed font-semibold">
                        {lang === 'en'
                          ? 'Protected by Stripe security. Live transactions are not processed. Mock sandbox payment.'
                          : 'اسٹرائپ سیکیورٹی کے ذریعے محفوظ۔ لائیو ادائیگیاں فعال نہیں ہیں۔ ورچوئل ادائیگی۔'}
                      </p>
                    </div>

                    <div className="flex gap-2.5 mt-8">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep('cart')}
                        className="flex-1 py-3.5 border border-white/10 rounded-full text-sm font-extrabold hover:bg-white/5 transition-all text-center"
                      >
                        {lang === 'en' ? 'Back' : 'واپس'}
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-3.5 btn-premium-primary rounded-full text-sm font-extrabold shadow-xl flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-[#0A2E1F] border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <CreditCard className="w-4 h-4" />
                            <span>{lang === 'en' ? 'Pay Now' : 'ادائیگی کریں'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {checkoutStep === 'success' && (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20 gap-4">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', damping: 15 }}
                      className="w-20 h-20 rounded-full bg-[#76C945]/20 border border-[#76C945]/50 flex items-center justify-center text-[#76C945]"
                    >
                      <ShieldCheck className="w-10 h-10" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-black text-white">
                        {lang === 'en' ? 'Payment Successful!' : 'ادائیگی کامیاب ہو گئی!'}
                      </h3>
                      <p className="text-xs text-green-400 font-bold uppercase mt-1">
                        {lang === 'en' ? 'Stripe Simulated Code' : 'اسٹرائپ مینیوفیکچرڈ پیمنٹ'}
                      </p>
                      <p className="text-xs text-white/50 mt-4 max-w-xs mx-auto leading-relaxed">
                        {lang === 'en'
                          ? 'Thank you for your simulated order! Your cart has been cleared. Stripe Checkout sandbox success.'
                          : 'آپ کی ورچوئل ادائیگی موصول ہو گئی ہے۔ کارٹ خالی کر دی گئی ہے۔ شکریہ!'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Summary (Only in Cart step when cart is not empty) */}
              {checkoutStep === 'cart' && cart.length > 0 && (
                <div className="px-6 py-6 border-t border-white/10 bg-white/[0.02] backdrop-blur-md z-10 relative">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-white/50 font-bold uppercase">Subtotal</span>
                    <span className="text-lg font-black text-[#76C945] font-mono">
                      {formatPrice(cartSubtotal)}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/40 mb-5 leading-normal">
                    {lang === 'en'
                      ? 'Shipping and taxes are calculated at checkout. WhatsApp support available 24/7.'
                      : 'ڈیلیوری چارجز کی تفصیلات اور کارٹ کے نرخ فائنل چیک آؤٹ پر کنفرم کیے جائیں گے۔'}
                  </p>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setCheckoutStep('checkout')}
                      className="flex-1 py-3.5 btn-premium-primary rounded-full text-sm font-extrabold shadow-xl text-center flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>{lang === 'en' ? 'Stripe Checkout' : 'کارڈ سے ادائیگی'}</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
