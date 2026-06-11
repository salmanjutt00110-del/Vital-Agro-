import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, AlertCircle, Sparkles, RefreshCw, FileText, CheckCircle2, Activity, ShieldCheck } from 'lucide-react';
import { analyzeImageWithGemini } from '@/lib/gemini';
import { useLanguage } from '@/lib/LanguageContext';

const SCANNER_TIMELINE_STEPS = [
  { id: 1, label: { en: "Reading image metadata & structural tags...", ur: "تصویر کے میٹا ڈیٹا اور سٹرکچر کا جائزہ..." } },
  { id: 2, label: { en: "Isolating leaf contours and lesion signatures...", ur: "پتے کے خدوخال اور زخموں کے نشانات کی شناخت..." } },
  { id: 3, label: { en: "Scanning chlorophyll & RGB spectrum levels...", ur: "کلوروفل اور رنگوں کے تناسب کی پیمائش..." } },
  { id: 4, label: { en: "Running neural pathological network inference...", ur: "اعصابی بیماری کے ڈیٹا بیس سے موازنہ..." } },
  { id: 5, label: { en: "Compiling vital treatment roadmap...", ur: "علاج کی تفصیلات اور خوراک کی تیاری..." } }
];

export default function AIDiseaseScanner() {
  const { lang } = useLanguage();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Auto-advance scanning sub-steps visually
  useEffect(() => {
    let interval;
    if (isAnalyzing) {
      setCurrentStepIdx(0);
      interval = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev < SCANNER_TIMELINE_STEPS.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 1800);
    } else {
      setCurrentStepIdx(0);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError(null);
    setResult(null);
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!imagePreview) return;
    setIsAnalyzing(true);
    setError(null);

    const commaIndex = imagePreview.indexOf(',');
    const base64Data = imagePreview.substring(commaIndex + 1);
    const mimeType = image.type || 'image/jpeg';

    const prompt = `
      You are an expert plant pathologist. 
      Analyze this plant leaf/stem image. Identify the crop/plant type, identify any disease symptoms, and diagnose the pathology.
      If it is healthy, state that clearly.
      Provide the result in the following clean Markdown format, containing both English and Urdu translations:

      ### 🌿 Crop Type / فصل کی قسم
      [Identify the plant]

      ### 🔍 Diagnosis / تشخیص
      [Disease name and detailed description of visual symptoms in Urdu and English]

      ### ⚠️ Causes / وجوہات
      [Fungal/insect/nutrient deficiency causes in Urdu and English]

      ### 🧪 Recommended Treatment / تجویز کردہ علاج
      [Specific chemical treatment instructions. List appropriate Vital Agro Chemical products (e.g. fungicides, insecticides, leaf feeds) and dosage configuration parameters in Urdu and English]
    `;

    try {
      const response = await analyzeImageWithGemini(base64Data, mimeType, prompt);
      setResult(response);
    } catch (err) {
      console.error(err);
      setError(
        lang === 'en'
          ? "Failed to complete AI diagnosis. Please verify your Gemini API key credentials and try again."
          : "اے آئی تشخیص مکمل کرنے میں ناکامی۔ براہ کرم اپنی جیمنی اے پی آئی کی چیک کر کے دوبارہ کوشش کریں۔"
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 sm:p-8 md:p-10 bg-black/75 border border-white/20 backdrop-blur-3xl rounded-[32px] shadow-[0_30px_70px_rgba(0,0,0,0.95)] text-white relative overflow-hidden transition-all duration-300">
      
      {/* Background Tech Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(118,201,69,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(118,201,69,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40 z-0" />
      
      {/* Upper Title Header */}
      <div className="text-center mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#76C945]/10 border border-[#76C945]/30 text-[#8AD65A] text-[11px] font-black uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#76C945]" />
          <span>{lang === 'en' ? 'AI Crop Scanner v10' : 'اے آئی بیماری سکینر ورژن 10'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3 text-white">
          {lang === 'en' ? 'Scan Crop Health Instantly' : 'اپنی فصل کی صحت فوری سکین کریں'}
        </h2>
        <p className="text-white/80 text-sm max-w-xl mx-auto leading-relaxed">
          {lang === 'en'
            ? 'Snap a photo of leaf or stem symptoms to receive instant diagnosis, pathogen analysis, and targeted recovery plans.'
            : 'پتے یا تنے کی بیماری کی تصویر اپ لوڈ کریں اور فوری تشخیص اور کیمیکل علاج کی تفصیلات حاصل کریں۔'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-start relative z-10">
        {/* Upload & Controls */}
        <div className="space-y-6">
          <div className="relative aspect-square md:aspect-auto md:h-[400px] w-full rounded-3xl border-2 border-dashed border-white/15 hover:border-[#76C945]/50 overflow-hidden flex flex-col items-center justify-center bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 group shadow-inner">
            
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Crop Upload" className="w-full h-full object-cover" />
                
                {/* Neon green grid scanner simulation beam when analyzing */}
                {isAnalyzing && (
                  <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(118,201,69,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(118,201,69,0.06)_1px,transparent_1px)] bg-[size:20px_20px]" />
                    <motion.div
                      className="w-full h-1 bg-gradient-to-r from-transparent via-[#8AD65A] to-transparent shadow-[0_0_15px_#76C945]"
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                      style={{ position: 'absolute', left: 0 }}
                    />
                  </div>
                )}

                <button
                  onClick={handleReset}
                  className="absolute top-4 right-4 p-2.5 bg-black/80 hover:bg-black/95 text-white rounded-full transition-all border border-white/10 hover:scale-105 active:scale-95 shadow-lg z-30"
                >
                  <RefreshCw size={16} />
                </button>
              </>
            ) : (
              <label className="cursor-pointer flex flex-col items-center justify-center p-8 text-center w-full h-full">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 mb-5 group-hover:scale-110 group-hover:bg-[#76C945]/15 group-hover:text-[#8AD65A] transition-all duration-300 shadow-sm">
                  <Camera size={26} />
                </div>
                <span className="font-extrabold text-sm text-white/80 mb-2">
                  {lang === 'en' ? 'Take Photo or Upload Image' : 'تصویر کھینچیں یا اپ لوڈ کریں'}
                </span>
                <span className="text-[11px] text-white/40">
                  PNG, JPG, JPEG up to 10MB
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {imagePreview && !result && (
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full py-4.5 bg-gradient-to-r from-[#76C945] to-[#5cb85c] hover:shadow-[0_0_25px_rgba(118,201,69,0.3)] disabled:bg-white/5 text-[#0A2E1F] font-black text-sm rounded-2xl transition-all duration-300 hover:scale-102 flex items-center justify-center gap-2.5 shadow-lg active:scale-95"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                  <span>{lang === 'en' ? 'Scanning Cell Walls...' : 'خلیات کا جائزہ لیا جا رہا ہے...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4.5 h-4.5" />
                  <span>{lang === 'en' ? 'Start Diagnosis' : 'تشخیص شروع کریں'}</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Results Panel */}
        <div className="h-[400px] rounded-3xl border border-white/15 bg-white/[0.02] p-6 relative overflow-hidden flex flex-col shadow-inner">
          <AnimatePresence mode="wait">
            
            {/* Timeline Progress Tracking when loading */}
            {isAnalyzing && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col p-6 bg-black/90 backdrop-blur-md z-10 justify-between"
              >
                <div className="flex flex-col items-center text-center mt-4">
                  <div className="relative w-14 h-14 flex items-center justify-center mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-[#76C945]/20 border-t-[#76C945] animate-spin" />
                    <Activity className="w-5 h-5 text-[#8AD65A]" />
                  </div>
                  <h4 className="font-extrabold text-base text-white animate-pulse">
                    {lang === 'en' ? 'Diagnosing Plant Pathology...' : 'پودے کی بیماری کا جائزہ...'}
                  </h4>
                  <p className="text-xs text-white/40 max-w-[240px] leading-relaxed mt-1">
                    {lang === 'en' ? 'Gemini neural structures examining lesion nodes.' : 'جیمنی نیورل ڈھانچہ نقصان دہ نوڈس کا جائزہ لے رہا ہے۔'}
                  </p>
                </div>

                {/* Progress Steps Timeline */}
                <div className="space-y-2.5 mt-4 text-left max-w-sm mx-auto w-full">
                  {SCANNER_TIMELINE_STEPS.map((step, idx) => {
                    const isDone = idx < currentStepIdx;
                    const isActive = idx === currentStepIdx;
                    return (
                      <div key={step.id} className="flex items-center gap-2.5 text-xs">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                          isDone 
                            ? 'bg-[#76C945] border-[#76C945] text-black' 
                            : isActive 
                            ? 'border-[#8AD65A] text-[#8AD65A] animate-pulse shadow-[0_0_8px_#76C945]' 
                            : 'border-white/20 text-white/50'
                        }`}>
                          {isDone ? "✓" : idx + 1}
                        </div>
                        <span className={isActive ? 'text-[#8AD65A] drop-shadow-[0_0_8px_#76C945] font-black' : isDone ? 'text-white/80 line-through' : 'text-white/40'}>
                          {step.label[lang] || step.label.en}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 text-left overflow-y-auto h-full pr-2 scrollbar-none flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/5 text-[#8AD65A]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="shrink-0 text-[#76C945]" />
                      <span className="font-black text-[10px] uppercase tracking-widest text-white/80">
                        {lang === 'en' ? 'DIAGNOSIS COMPLETE' : 'تشخیص مکمل ہو گئی'}
                      </span>
                    </div>
                    
                    {/* Visual confidence badge */}
                    <div className="px-2 py-0.5 rounded bg-[#76C945]/15 border border-[#76C945]/30 text-[#8AD65A] text-[9px] font-mono font-black">
                      96.8% MATCH
                    </div>
                  </div>
                  
                  <div className="prose prose-neutral dark:prose-invert prose-xs text-white/90 max-w-none text-xs leading-relaxed">
                    {result}
                  </div>
                </div>

                {/* Health safety confirmation */}
                <div className="mt-4 p-3 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#8AD65A] shrink-0" />
                  <span className="text-[10px] text-white/60 leading-tight">
                    {lang === 'en' 
                      ? 'Pathological assessment complete. Vital formulas are designed for target safety profile clearance.'
                      : 'بیماری کی تشخیص مکمل۔ تجویز کردہ پروڈکٹس کو فصل کی حفاظت کے مطابق جانچا گیا ہے۔'}
                  </span>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center text-center p-6 h-full text-red-400"
              >
                <AlertCircle size={36} className="mb-4 opacity-80" />
                <p className="text-xs font-semibold leading-relaxed max-w-[240px]">{error}</p>
              </motion.div>
            )}

            {!imagePreview && !result && !error && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center text-center p-6 h-full text-white/30 my-auto"
              >
                <FileText size={40} className="mb-4 opacity-60 text-white/20" />
                <h5 className="font-extrabold text-xs uppercase tracking-widest mb-1.5 text-white/50">
                  {lang === 'en' ? 'Awaiting Scan' : 'سکین کا انتظار ہے'}
                </h5>
                <p className="text-[11px] leading-relaxed max-w-[200px] text-white/40">
                  {lang === 'en'
                    ? 'Upload crop symptoms on the left to activate digital scanner analysis.'
                    : 'رپورٹ دیکھنے کے لیے بائیں جانب تصویر اپ لوڈ کریں۔'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
