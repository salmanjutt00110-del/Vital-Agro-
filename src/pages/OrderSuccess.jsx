import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, doc, onSnapshot } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { Check, Calendar, FileDown, ArrowRight, ShoppingBag, Truck } from 'lucide-react';
import { downloadInvoice } from '@/lib/pdf/InvoiceGenerator';
import { useLanguage } from '@/lib/LanguageContext';
import SEOHead from '@/lib/seo/SEOHead';

export default function OrderSuccess() {
  const { id } = useParams();
  const { lang } = useLanguage();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const docRef = doc(db, 'orders', id);
    const unsub = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setOrder({ id: docSnap.id, ...docSnap.data() });
      } else {
        setOrder(null);
      }
      setLoading(false);
    }, (err) => {
      console.error(err);
      setLoading(false);
    });
    return () => unsub();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#071910] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-[#76C945] border-t-transparent animate-spin" />
          <p className="text-xs text-white/50 tracking-wider">Finalizing Order Success State...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#071910] text-white px-4">
        <div className="max-w-md w-full text-center space-y-5 p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <h2 className="text-2xl font-black">Order Context Missing</h2>
          <p className="text-sm text-white/50 leading-relaxed">
            We were unable to locate this order registry. It may still be syncing to Firestore database nodes.
          </p>
          <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-[#76C945] hover:bg-[#8AD65A] text-[#0A2E1F] rounded-full text-sm font-black transition-colors">
            <ShoppingBag size={16} />
            <span>Catalog Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  // Get dynamic dates
  const orderDate = order.createdAt?.toDate ? order.createdAt.toDate() : new Date();
  const deliveryMin = new Date(orderDate);
  deliveryMin.setDate(deliveryMin.getDate() + 2);
  const deliveryMax = new Date(orderDate);
  deliveryMax.setDate(deliveryMax.getDate() + 4);

  const formatEstDate = (d) => {
    return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'ur-PK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#F4F7F5] dark:bg-[#071910] text-foreground dark:text-white transition-colors duration-300">
      <SEOHead
        title="Order Successful | Vital Agro"
        description="Thank you for shopping with Vital Agro Chemical Industries. Your agriculture order has been confirmed successfully."
      />

      <div className="max-w-2xl mx-auto px-4 text-center">
        
        {/* Animated Check Circle Banner */}
        <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
          {/* Radial animated pulse ring */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-emerald-500/10 dark:bg-[#5cb85c]/10 border-2 border-dashed border-[#5cb85c]/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div 
            className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#2d6a2d] to-[#5cb85c] flex items-center justify-center shadow-lg shadow-[#5cb85c]/30"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 15 }}
          >
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Check size={40} className="text-white stroke-[3.5]" />
            </motion.div>
          </motion.div>
        </div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl font-black tracking-tight"
        >
          {lang === 'en' ? 'Thank You for Your Order!' : 'آرڈر کرنے کا شکریہ!'}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-muted-foreground dark:text-white/50 max-w-md mx-auto mt-2 leading-relaxed"
        >
          {lang === 'en' 
            ? `Your order registry #${order.orderNumber} has been dispatched to our warehousing logisticians.` 
            : `آپ کا آرڈر نمبر #${order.orderNumber} ہمارے گودام کو بھیج دیا گیا ہے۔`}
        </motion.p>

        {/* Order Info Card Details Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-white/[0.02] border border-border dark:border-white/10 rounded-3xl p-6 shadow-sm mt-8 space-y-6 text-left"
        >
          <div className="flex justify-between items-center border-b border-border dark:border-white/5 pb-4">
            <div>
              <span className="text-[10px] text-muted-foreground dark:text-white/40 block font-bold uppercase">{lang === 'en' ? 'ORDER NUMBER' : 'آرڈر نمبر'}</span>
              <span className="font-mono text-base font-black text-primary dark:text-[#8AD65A]">{order.orderNumber}</span>
            </div>
            <button
              onClick={() => downloadInvoice(order)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-[#5cb85c]/10 dark:bg-[#5cb85c]/15 border border-[#5cb85c]/20 hover:bg-[#5cb85c]/25 text-[#2d6a2d] dark:text-[#8AD65A] rounded-xl text-xs font-black transition-colors"
            >
              <FileDown size={14} />
              <span>{lang === 'en' ? 'Download Receipt' : 'رسید ڈاؤن لوڈ کریں'}</span>
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex gap-3">
              <Calendar className="text-primary mt-0.5" size={18} />
              <div>
                <span className="text-[9px] text-muted-foreground dark:text-white/40 block font-bold uppercase">{lang === 'en' ? 'ESTIMATED DELIVERY' : 'توقعہ تاریخ وصولی'}</span>
                <span className="text-xs text-foreground dark:text-white/80 font-bold block mt-0.5">
                  {formatEstDate(deliveryMin)} – {formatEstDate(deliveryMax)}
                </span>
                <span className="text-[10px] text-muted-foreground dark:text-white/30 block mt-0.5 leading-snug">
                  Deliveries are managed within 2-4 business days.
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Truck className="text-primary mt-0.5" size={18} />
              <div>
                <span className="text-[9px] text-muted-foreground dark:text-white/40 block font-bold uppercase">{lang === 'en' ? 'SHIPPING ADDRESS' : 'ڈیلیوری ایڈریس'}</span>
                <span className="text-xs text-foreground dark:text-white/80 font-bold block mt-0.5">
                  {order.customer?.name} ({order.customer?.phone})
                </span>
                <span className="text-[10px] text-muted-foreground dark:text-white/30 block mt-0.5 leading-snug">
                  {order.customer?.address}, {order.customer?.city}, {order.customer?.province}
                </span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-border dark:border-white/5 text-xs">
            <div>
              <span className="text-[9px] text-muted-foreground dark:text-white/40 block font-bold uppercase">{lang === 'en' ? 'PAYMENT METHOD' : 'طریقہ ادائیگی'}</span>
              <span className="font-extrabold text-foreground dark:text-white/85 mt-1 block">
                {order.paymentMethod === 'COD' 
                  ? 'Cash On Delivery' 
                  : order.paymentMethod === 'Stripe' 
                    ? 'Credit/Debit Card (Stripe)'
                    : order.paymentMethod}
              </span>
            </div>
            <div>
              <span className="text-[9px] text-muted-foreground dark:text-white/40 block font-bold uppercase">{lang === 'en' ? 'TRANSACTION STATUS' : 'ٹرانزیکشن سٹیٹس'}</span>
              <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${
                order.paymentMethod === 'COD'
                  ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                  : order.paymentDetails?.status === 'approved'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {order.paymentMethod === 'COD' 
                  ? 'COD Pending' 
                  : order.paymentDetails?.status === 'approved' 
                    ? 'Verified ✓' 
                    : 'Awaiting Verification'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action Controls */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
        >
          <Link
            to={`/track/${order.id}`}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-[#76C945] hover:bg-[#8AD65A] text-[#0A2E1F] rounded-full font-black text-sm transition-colors shadow-lg shadow-[#76C945]/15"
          >
            <span>{lang === 'en' ? 'Track Your Order' : 'آرڈر ٹریک کریں'}</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            to="/products"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-white/5 border border-border dark:border-white/10 hover:bg-muted dark:hover:bg-white/10 text-foreground dark:text-white rounded-full font-bold text-sm transition-colors"
          >
            <ShoppingBag size={16} />
            <span>{lang === 'en' ? 'Continue Shopping' : 'خریداری جاری رکھیں'}</span>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
