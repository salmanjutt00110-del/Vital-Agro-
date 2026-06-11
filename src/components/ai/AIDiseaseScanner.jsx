import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, AlertCircle, Sparkles, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';
import { analyzeImageWithGemini } from '@/lib/gemini';
import { useLanguage } from '@/lib/LanguageContext';

export default function AIDiseaseScanner() {
  const { lang } = useLanguage();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

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

    // Extract base64 payload & mime type
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
    <div className="w-full max-w-4xl mx-auto p-6 sm:p-8 md:p-10 bg-white/95 dark:bg-[#04120a]/80 backdrop-blur-3xl rounded-[32px] border border-black/10 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.6)] text-gray-900 dark:text-white transition-all duration-300">
      {/* Title Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#76C945]/10 dark:bg-[#76C945]/15 border border-[#76C945]/30 text-[#2d6a2d] dark:text-[#8AD65A] text-[11px] font-black uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>{lang === 'en' ? 'AI Disease Scanner' : 'اے آئی بیماری سکینر'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3 text-gray-900 dark:text-white">
          {lang === 'en' ? 'Scan Crop Health Instantly' : 'اپنی فصل کی صحت فوری سکین کریں'}
        </h2>
        <p className="text-gray-500 dark:text-white/50 text-sm max-w-xl mx-auto leading-relaxed">
          {lang === 'en'
            ? 'Snap a photo of leaf or stem symptoms to receive instant diagnosis and chemical treatments recommendations.'
            : 'پتے یا تنے کی بیماری کی تصویر اپ لوڈ کریں اور فوری تشخیص اور کیمیکل علاج کی تفصیلات حاصل کریں۔'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-start">
        {/* Upload & Controls */}
        <div className="space-y-6">
          <div className="relative aspect-square w-full rounded-3xl border-2 border-dashed border-black/10 dark:border-white/10 hover:border-[#76C945] dark:hover:border-[#76C945]/50 overflow-hidden flex flex-col items-center justify-center bg-black/[0.01] dark:bg-white/[0.01] hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-all duration-300 group shadow-inner">
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Crop Upload" className="w-full h-full object-cover" />
                <button
                  onClick={handleReset}
                  className="absolute top-4 right-4 p-2.5 bg-black/70 hover:bg-black/90 text-white rounded-full transition-all border border-white/10 hover:scale-105 active:scale-95 shadow-lg"
                >
                  <RefreshCw size={16} />
                </button>
              </>
            ) : (
              <label className="cursor-pointer flex flex-col items-center justify-center p-8 text-center w-full h-full">
                <div className="w-16 h-16 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-white/60 mb-5 group-hover:scale-110 group-hover:bg-[#76C945]/10 group-hover:text-[#2d6a2d] dark:group-hover:text-[#8AD65A] transition-all duration-300 shadow-sm">
                  <Camera size={26} />
                </div>
                <span className="font-extrabold text-sm text-gray-800 dark:text-white/80 mb-2">
                  {lang === 'en' ? 'Take Photo or Upload Image' : 'تصویر کھینچیں یا اپ لوڈ کریں'}
                </span>
                <span className="text-[11px] text-gray-400 dark:text-white/40">
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
              className="w-full py-4.5 bg-gradient-to-r from-[#2d6a2d] to-[#3d8c3d] hover:shadow-[0_0_25px_rgba(92,184,92,0.3)] disabled:bg-black/5 dark:disabled:bg-white/5 text-white disabled:text-gray-400 dark:disabled:text-white/30 rounded-2xl font-black text-sm transition-all duration-300 hover:scale-102 flex items-center justify-center gap-2.5 shadow-lg"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                  <span>{lang === 'en' ? 'Analyzing Crop Health...' : 'تشخیص کی جا رہی ہے...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4.5 h-4.5" />
                  <span>{lang === 'en' ? 'Start AI Diagnosis' : 'اے آئی تشخیص شروع کریں'}</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Results Panel */}
        <div className="h-full min-h-[340px] rounded-3xl border border-black/10 dark:border-white/15 bg-white/40 dark:bg-black/30 p-6 sm:p-8 relative overflow-hidden flex flex-col shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-inner">
          <AnimatePresence mode="wait">
            {isAnalyzing && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white/90 dark:bg-black/60 backdrop-blur-md z-10"
              >
                <div className="relative w-16 h-16 flex items-center justify-center mb-5">
                  <div className="absolute inset-0 rounded-full border-4 border-[#76C945]/20 border-t-[#76C945] animate-spin" />
                  <Sparkles className="w-6 h-6 text-[#2d6a2d] dark:text-[#76C945]" />
                </div>
                <h4 className="font-extrabold text-base text-gray-900 dark:text-white mb-2 animate-pulse">
                  {lang === 'en' ? 'Diagnosing Plant Pathology...' : 'پودے کی بیماری کا جائزہ...'}
                </h4>
                <p className="text-xs text-gray-500 dark:text-white/40 max-w-[220px] leading-relaxed">
                  {lang === 'en' ? 'Gemini AI is examining leaves and cellular nodes.' : 'جیمنی اے آئی پودے کے خلیات کا معائنہ کر رہا ہے۔'}
                </p>
              </motion.div>
            )}

            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5 text-left overflow-y-auto max-h-[360px] pr-2 scrollbar-hide text-sm leading-relaxed flex-1"
              >
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-black/5 dark:border-white/8 text-[#2d6a2d] dark:text-[#8AD65A]">
                  <CheckCircle2 size={18} className="shrink-0" />
                  <span className="font-black text-[11px] uppercase tracking-widest">
                    {lang === 'en' ? 'DIAGNOSIS COMPLETE' : 'تشخیص مکمل ہو گئی'}
                  </span>
                </div>
                <div className="prose prose-neutral dark:prose-invert prose-xs text-gray-800 dark:text-white/95 max-w-none">
                  {result}
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center text-center p-6 h-full text-red-500 dark:text-red-400"
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
                className="flex flex-col items-center justify-center text-center p-6 h-full text-gray-400 dark:text-white/30 my-auto"
              >
                <FileText size={40} className="mb-4 opacity-50 dark:opacity-60" />
                <h5 className="font-extrabold text-xs uppercase tracking-widest mb-1.5">
                  {lang === 'en' ? 'Awaiting Scan' : 'سکین کا انتظار ہے'}
                </h5>
                <p className="text-[11px] leading-relaxed max-w-[200px] text-gray-400 dark:text-white/40">
                  {lang === 'en'
                    ? 'Upload an image on the left to review diagnostic reports here.'
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
