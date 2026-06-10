import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Send, MessageCircle, Copy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/lib/LanguageContext';

// Import Assets
import vitalAgroLogo from '@/assets/vital agro logo.webp';
import tagLogo from '@/assets/tag logo.webp';

const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

const CONTACT_TRANS = {
  en: {
    badge: "Get In Touch",
    title: "Contact Us",
    sub: "Have questions or need a quote? We're here to help.",
    connectHeader: "Let's Connect",
    connectDesc: "Whether you're a dealer looking to partner with us or a farmer seeking the best solutions for your crops, we'd love to hear from you.",
    formHeader: "Send us a Message",
    labelName: "Name *",
    labelPhone: "Phone",
    labelType: "Inquiry Type",
    labelSubject: "Subject",
    labelMessage: "Message *",
    inquiryGeneral: "General Inquiry",
    inquiryDealer: "Become a Dealer",
    inquiryProduct: "Product Inquiry",
    placeholderName: "Your full name",
    placeholderPhone: "Your phone number",
    placeholderSubject: "What is this about?",
    placeholderMessage: "Tell us how we can help...",
    btnSend: "Send Message",
    sending: "Sending...",
    officeLabel: "Head Office",
    phoneLabel: "Phone",
    hoursLabel: "Business Hours",
    officeValue: "Plot No. 50 & 56, Vital Office,\nHaroonabad, Distt. Bahawalnagar, Pakistan",
    phoneValue: "063-2253137",
    hoursValue: "Monday - Saturday\n9:00 AM - 6:00 PM",
    chatWa: "Chat on WhatsApp",
    chatWaSub: "Quick response guaranteed",
    copyAddress: "Copy Address",
    addressCopied: "Address copied to clipboard!",
    getDirections: "Get Directions",
  },
  ur: {
    badge: "رابطہ کریں",
    title: "ہم سے رابطہ کریں",
    sub: "کوئی سوال ہے یا قیمت پوچھنا چاہتے ہیں؟ ہم مدد کے لیے موجود ہیں۔",
    connectHeader: "رابطہ بڑھائیں",
    connectDesc: "خواہ آپ ڈیلر بننا چاہیں یا اپنی فصلوں کے لیے بہترین مصنوعات تلاش کرنے والے کاشتکار ہوں، ہم سے بلا جھجھک رابطہ کریں۔",
    formHeader: "ہمیں پیغام بھیجیں",
    labelName: "نام *",
    labelPhone: "فون نمبر",
    labelType: "انکوائری کی قسم",
    labelSubject: "موضوع",
    labelMessage: "پیغام *",
    inquiryGeneral: "عام سوالات",
    inquiryDealer: "ڈیلر شپ حاصل کریں",
    inquiryProduct: "مصنوعات کی معلومات",
    placeholderName: "آپ کا مکمل نام",
    placeholderPhone: "آپ کا فون نمبر",
    placeholderSubject: "کس بارے میں معلومات چاہیے؟",
    placeholderMessage: "اپنا پیغام یہاں لکھیں...",
    btnSend: "پیغام جمع کروائیں",
    sending: "جمع کیا جا رہا ہے...",
    officeLabel: "ہیڈ آفس",
    phoneLabel: "فون نمبر",
    hoursLabel: "کام کے اوقات",
    officeValue: "پلاٹ نمبر 50 اور 56، وائٹل آفس،\nہارون آباد، ضلع بہاولنگر، پاکستان",
    phoneValue: "063-2253137",
    hoursValue: "پیر تا ہفتہ\nصبح 9:00 بجے سے شام 6:00 بجے تک",
    chatWa: "واٹس ایپ چیٹ",
    chatWaSub: "فوری جواب کے لیے",
    copyAddress: "پتہ کاپی کریں",
    addressCopied: "پتہ کاپی کر لیا گیا ہے!",
    getDirections: "نقشہ دیکھیں",
  }
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '', type: 'general' });
  const [sending, setSending] = useState(false);
  const { toast } = useToast();
  const { lang } = useLanguage();
  const isRTL = lang === 'ur';

  const cTrans = CONTACT_TRANS[lang] || CONTACT_TRANS.en;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await db.entities.ContactMessage.create(form);
      toast({ title: isRTL ? 'پیغام بھیج دیا گیا ہے!' : 'Message Sent!', description: isRTL ? 'ہم سے رابطہ کرنے کا شکریہ۔ ہم جلد آپ سے رابطہ کریں گے۔' : 'Thank you for contacting us. We will get back to you soon.' });
      setForm({ name: '', phone: '', subject: '', message: '', type: 'general' });
    } catch (err) {
      toast({ variant: 'destructive', title: isRTL ? 'جمع کروانے میں ناکامی' : 'Submission Failed', description: isRTL ? 'پیغام نہیں بھیجا جا سکا۔ دوبارہ کوشش کریں۔' : 'Could not send the message. Please try again.' });
    }
    setSending(false);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(cTrans.officeValue);
    toast({
      title: cTrans.copyAddress,
      description: cTrans.addressCopied,
    });
  };

  const openMapNavigation = (mode = 'directions') => {
    const address = "Plot No. 50 & 56, Vital Office, Haroonabad, Distt. Bahawalnagar, Pakistan";
    const encodedAddress = encodeURIComponent(address);
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    let url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    
    if (mode === 'directions' || mode === 'navigate') {
      url = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      url = (mode === 'directions' || mode === 'navigate')
        ? `maps://maps.apple.com/?daddr=${encodedAddress}`
        : `maps://maps.apple.com/?q=${encodedAddress}`;
    } else if (/Android/.test(userAgent)) {
      url = `geo:0,0?q=${encodedAddress}`;
    }
    
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen pt-20 bg-[#F4F7F5]" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <section className="bg-[#0A2E1F] py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-sm font-black tracking-widest uppercase text-[#76C945]">{cTrans.badge}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-4 mb-4">
              {cTrans.title}
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              {cTrans.sub}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            
            {/* Left side: Premium Glass Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Logo Banner */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={vitalAgroLogo}
                  alt="Vital Agro Logo"
                  className="h-10 w-auto object-contain"
                />
                <span className="h-6 w-px bg-border" />
                <img
                  src={tagLogo}
                  alt="Tag Logo"
                  className="h-8 w-auto object-contain"
                />
              </div>

              <div>
                <h2 className="text-3xl font-black text-[#0A2E1F] mb-4">{cTrans.connectHeader}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {cTrans.connectDesc}
                </p>
              </div>

              {/* Glass Details Cards */}
              <div className="grid gap-4">
                {[
                  { icon: MapPin, label: cTrans.officeLabel, value: cTrans.officeValue, isAddress: true },
                  { icon: Phone, label: cTrans.phoneLabel, value: cTrans.phoneValue, isPhone: true },
                  { icon: Clock, label: cTrans.hoursLabel, value: cTrans.hoursValue },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-5 bg-white rounded-2xl border border-border/80 shadow-sm relative overflow-hidden group hover:border-[#76C945]/30 hover:shadow-md transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#76C945]/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-[#76C945]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-extrabold text-foreground text-sm uppercase tracking-wider">{item.label}</p>
                        {item.isAddress && (
                          <button
                            onClick={handleCopyAddress}
                            className="inline-flex items-center gap-1 text-[10px] text-primary font-black hover:underline"
                          >
                            <Copy className="w-3 h-3" />
                            <span>{cTrans.copyAddress}</span>
                          </button>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm font-bold whitespace-pre-line mt-1.5">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Dynamic WhatsApp Support Button */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/923011837160"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-green-500/10 rounded-2xl border border-green-500/20 hover:bg-green-500/20 transition-all cursor-pointer min-h-[70px] shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 shadow-md">
                  <MessageCircle className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <p className="font-black text-green-800 text-base">{cTrans.chatWa}</p>
                  <p className="text-green-600 text-xs font-bold">{cTrans.chatWaSub}</p>
                </div>
              </motion.a>
            </div>

            {/* Right side: Glass Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl border border-border p-8 sm:p-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#76C945] to-[#C5A059]" />
                <h3 className="text-2xl font-black text-[#0A2E1F] mb-6">{cTrans.formHeader}</h3>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-xs font-black text-foreground mb-2 block uppercase tracking-wider">{cTrans.labelName}</label>
                      <Input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={cTrans.placeholderName}
                        required
                        className="rounded-xl py-5 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-xs font-black text-foreground mb-2 block uppercase tracking-wider">{cTrans.labelPhone}</label>
                      <Input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder={cTrans.placeholderPhone}
                        className="rounded-xl py-5 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-black text-foreground mb-2 block uppercase tracking-wider">{cTrans.labelType}</label>
                      <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                        <SelectTrigger className="rounded-xl py-5 focus-visible:ring-primary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="general">{cTrans.inquiryGeneral}</SelectItem>
                          <SelectItem value="dealer_inquiry">{cTrans.inquiryDealer}</SelectItem>
                          <SelectItem value="product_inquiry">{cTrans.inquiryProduct}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-black text-foreground mb-2 block uppercase tracking-wider">{cTrans.labelSubject}</label>
                    <Input
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder={cTrans.placeholderSubject}
                      className="rounded-xl py-5 focus-visible:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-black text-foreground mb-2 block uppercase tracking-wider">{cTrans.labelMessage}</label>
                    <Textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={cTrans.placeholderMessage}
                      className="min-h-[140px] rounded-xl focus-visible:ring-primary"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-[#0A2E1F] hover:bg-[#0E3E2A] text-white py-6 rounded-xl text-base font-extrabold transition-all shadow-md"
                  >
                    {sending ? cTrans.sending : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        <span>{cTrans.btnSend}</span>
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
          
          {/* Interactive Google Map Embedded Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-white rounded-3xl border border-border p-6 shadow-sm overflow-hidden group relative"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-6">
              <div className="flex-1">
                <span className="text-xs font-black text-primary uppercase tracking-widest block mb-2">
                  {lang === 'en' ? 'Interactive Directions & Navigation Control' : 'نقشہ اور نیویگیشن کنٹرول'}
                </span>
                <h3 className="text-xl font-black text-[#0A2E1F] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#76C945]" />
                  <span>{lang === 'en' ? 'Head Office Location Map' : 'ہیڈ آفس نقشہ مقام'}</span>
                </h3>
                <p className="text-xs text-muted-foreground mt-2 font-bold whitespace-pre-line">{cTrans.officeValue}</p>
              </div>
              
              {/* Sleek action grid of glass buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full lg:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => openMapNavigation('directions')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#0A2E1F] text-white hover:bg-[#0E3E2A] rounded-xl text-xs font-black transition-all shadow-sm group border border-white/5"
                >
                  <MapPin className="w-4 h-4 text-[#76C945] group-hover:scale-110 transition-transform" />
                  <span>{lang === 'en' ? 'Get Directions' : 'راستہ تلاش کریں'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => openMapNavigation('google')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-border hover:border-[#76C945]/40 hover:bg-[#76C945]/5 transition-all text-xs font-black text-[#0A2E1F] rounded-xl shadow-sm group"
                >
                  <MapPin className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                  <span>{lang === 'en' ? 'Open Google Maps' : 'گوگل میپ'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => openMapNavigation('navigate')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#76C945] text-[#0A2E1F] hover:bg-[#8AD65A] transition-all text-xs font-black rounded-xl shadow-sm group"
                >
                  <MessageCircle className="w-4 h-4 text-[#0A2E1F] group-hover:scale-110 transition-transform" />
                  <span>{lang === 'en' ? 'Navigate' : 'نیویگیشن'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-border hover:border-[#76C945]/40 hover:bg-[#76C945]/5 transition-all text-xs font-black text-[#0A2E1F] rounded-xl shadow-sm group"
                >
                  <Copy className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
                  <span>{cTrans.copyAddress}</span>
                </button>

                <a
                  href="tel:+920632253137"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-border hover:border-[#76C945]/40 hover:bg-[#76C945]/5 transition-all text-xs font-black text-[#0A2E1F] rounded-xl shadow-sm group"
                >
                  <Phone className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span>{lang === 'en' ? 'Call Office' : 'دفتر کال کریں'}</span>
                </a>

                <a
                  href="https://wa.me/923011837160"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-border hover:border-[#76C945]/40 hover:bg-[#76C945]/5 transition-all text-xs font-black text-[#0A2E1F] rounded-xl shadow-sm group"
                >
                  <MessageCircle className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
                  <span>{lang === 'en' ? 'WhatsApp Office' : 'واٹس ایپ دفتر'}</span>
                </a>
              </div>
            </div>
            
            <div className="relative w-full rounded-2xl overflow-hidden border border-border">
              <iframe
                src="https://maps.google.com/maps?q=Plot%20No.%2050%20%26%2056,%20Vital%20Office,%20Haroonabad,%20Bahawalnagar,%20Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[350px] sm:h-[450px] rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}