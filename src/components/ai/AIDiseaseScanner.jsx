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
    <div className="w-full max-w-3xl mx-auto p-6 bg-white/[0.03] backdrop-blur-xl rounded-[32px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-white">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#76C945]/15 border border-[#76C945]/30 text-[#8AD65A] text-xs font-black uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === 'en' ? 'AI Disease Scanner' : 'اے آئی بیماری سکینر'}</span>
        </div>
        <h2 className="text-3xl font-black tracking-tight mb-2">
          {lang === 'en' ? 'Scan Crop Health Instantly' : 'اپنی فصل کی صحت فوری سکین کریں'}
        </h2>
        <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed">
          {lang === 'en'
            ? 'Snap a photo of leaf or stem symptoms to receive instant diagnosis and chemical treatments recommendations.'
            : 'پتے یا تنے کی بیماری کی تصویر اپ لوڈ کریں اور فوری تشخیص اور کیمیکل علاج کی تفصیلات حاصل کریں۔'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Upload Container */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-2xl border-2 border-dashed border-white/10 hover:border-[#76C945]/40 overflow-hidden flex flex-col items-center justify-center bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 group">
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Crop Upload" className="w-full h-full object-cover" />
                <button
                  onClick={handleReset}
                  className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors border border-white/10"
                >
                  <RefreshCw size={16} />
                </button>
              </>
            ) : (
              <label className="cursor-pointer flex flex-col items-center justify-center p-6 text-center w-full h-full">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Camera size={28} />
                </div>
                <span className="font-bold text-sm text-white/80 mb-1">
                  {lang === 'en' ? 'Take Photo or Upload Image' : 'تصویر کھینچیں یا اپ لوڈ کریں'}
                </span>
                <span className="text-xs text-white/40">
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
              className="w-full py-4 bg-[#76C945] hover:bg-[#8AD65A] disabled:bg-white/10 text-[#0A2E1F] disabled:text-white/30 rounded-2xl font-black text-sm transition-all shadow-lg shadow-[#76C945]/20 hover:scale-102 flex items-center justify-center gap-2"
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

        {/* Diagnostic Results Panel */}
        <div className="h-full min-h-[300px] rounded-2xl border border-white/10 bg-white/[0.01] p-6 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isAnalyzing && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/40 backdrop-blur-md z-10"
              >
                <div className="relative w-16 h-16 flex items-center justify-center mb-4">
                  <div className="absolute inset-0 rounded-full border-4 border-[#76C945]/20 border-t-[#76C945] animate-spin" />
                  <Sparkles className="w-6 h-6 text-[#76C945]" />
                </div>
                <h4 className="font-bold text-base text-white mb-2 animate-pulse">
                  {lang === 'en' ? 'Diagnosing Plant Pathology...' : 'پودے کی بیماری کا جائزہ...'}
                </h4>
                <p className="text-xs text-white/40 max-w-[200px]">
                  {lang === 'en' ? 'Gemini AI is examining leaves and cellular nodes.' : 'جیمنی اے آئی پودے کے خلیات کا معائنہ کر رہا ہے۔'}
                </p>
              </motion.div>
            )}

            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 text-left overflow-y-auto max-h-[340px] pr-2 scrollbar-hide whitespace-pre-line text-sm leading-relaxed"
              >
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/8 text-[#8AD65A]">
                  <CheckCircle2 size={18} />
                  <span className="font-black text-xs uppercase tracking-widest">
                    {lang === 'en' ? 'DIAGNOSIS COMPLETE' : 'تشخیص مکمل ہو گئی'}
                  </span>
                </div>
                <div className="prose prose-invert prose-xs text-white/90">
                  {result}
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
                <AlertCircle size={32} className="mb-3 opacity-80" />
                <p className="text-xs font-semibold leading-relaxed">{error}</p>
              </motion.div>
            )}

            {!imagePreview && !result && !error && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center text-center p-6 h-full text-white/30"
              >
                <FileText size={36} className="mb-3 opacity-60" />
                <h5 className="font-bold text-xs uppercase tracking-widest mb-1">
                  {lang === 'en' ? 'Awaiting Scan' : 'سکین کا انتظار ہے'}
                </h5>
                <p className="text-[11px] leading-relaxed max-w-[200px]">
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
