// Import product images properly via React ES6 imports
import fattyImg from '@/assets/fatty.webp';
import conferenceImg from '@/assets/conference.webp';
import easyGrowImg from '@/assets/easy-grow.webp';
import purifizinImg from '@/assets/Purifizin.webp';
import aaqaabImg from '@/assets/Aaqaab.webp';
import drPpImg from '@/assets/dr-pp.webp';
import vacZincImg from '@/assets/vac-zinc.webp';
import sectorImg from '@/assets/sector.webp';
import outputImg from '@/assets/output.webp';
import super4gImg from '@/assets/super-4g.webp';
import farbasinImg from '@/assets/FARBASIN.webp';
// Premium PNG Images for Glass Showcase System
import fattyPng from '@/vital product/Fatty.png';
import conferencePng from '@/vital product/Conference Gold.png';
import easyGrowPng from '@/vital product/Easy Grow.png';
import purifizinPng from '@/vital product/Purifizin.png';
import aaqaabPng from '@/vital product/Aaqaab.png';
import drPpPng from '@/vital product/Dr.pp.png';
import vacZincPng from '@/vital product/Vac Zinc.png';
import sectorPng from '@/vital product/sECTOR.png';
import outputPng from '@/vital product/Output.png';
import super4gPng from '@/vital product/4g.png';
import farbasinPng from '@/vital product/Farbasin.png';
import vacSopPng from '@/vital product/vac-sop.png';
import vacMapPng from '@/vital product/vac-map.png';
import defeaterSoilPng from '@/vital product/defeater-soil.png';
import sonehriPotashPng from '@/vital product/sonehri-potash.png';
import defeaterHumatePng from '@/vital product/defeater-humate.png';
import settingPng from '@/vital product/setting.png';


export const PRODUCTS_DATA = {
  "fatty": {
    id: "fatty",
    genericName: {
      en: "Bio-Stimulant",
      ur: "بایوسٹیمولینٹ"
    },
    pricing: [
      { size: "500ml", rate: "750", carton: "24" }
    ],
    slug: "fatty",
    name: {
      en: "Fatty",
      ur: "فیٹی"
    },
    category: "plant_nutrition",
    imageUrl: fattyImg,
    pngUrl: fattyPng,
    rating: 4.9,
    importedFormulaBadge: true,
    premiumProductBadge: true,
    researchBasedBadge: true,
    shortDesc: {
      en: "Fatty is an organic plant nutrition bio-stimulant that enhances vegetative growth and crop tolerance to stress.",
      ur: "فیٹی ایک نامیاتی بائیو اسٹیمولینٹ ہے جو فصل کی بڑھوتری اور شدید موسمی حالات کا مقابلہ کرنے کی صلاحیت کو بڑھاتا ہے۔"
    },
    seoTitle: "Fatty Bio-Stimulant & Plant Nutrition | Vital Agro",
    seoDescription: "Buy Fatty Bio-Stimulant online. Promotes crop growth, cell division, and drought tolerance using organic fatty acids. Available in multiple pack sizes.",
    sizes: [
      { size: "500 ML", price: 899, oldPrice: 1199, stockStatus: "In Stock", sku: "VA-FAT-500", weight: "500g" },
      { size: "2 KG", price: 1699, oldPrice: 2299, stockStatus: "In Stock", sku: "VA-FAT-2KG", weight: "2kg" },
      { size: "8 KG", price: 1999, oldPrice: 2699, stockStatus: "In Stock", sku: "VA-FAT-8KG", weight: "8kg" },
      { size: "20 KG", price: 4999, oldPrice: 6299, stockStatus: "In Stock", sku: "VA-FAT-20KG", weight: "20kg" }
    ],
    formulation: "10% SL",
    activeIngredient: "Organic Fatty Acids & Micronutrients",
    packaging: "250ml, 500ml, 1L",
    productCode: "VA-FAT-01",
    status: {
      en: "Premium Imported Formula",
      ur: "پریمیئم درآمد شدہ فارمولا"
    },
    description: {
      en: "Fatty is a world-class plant nutrition solution and bio-stimulant formulated with premium organic fatty acids and highly bio-available chelated micronutrients. It plays a critical role in optimizing cell division, accelerating chloroplast development, and improving leaf thickness. By providing the plant with direct lipid block precursors, it bypasses metabolic energy pathways, allowing crops to thrive under harsh climatic conditions, extreme temperatures, and water stress.",
      ur: "فیٹی پودوں کی نشوونما اور بائیو سٹیمولینٹ کا ایک عالمی معیار کا حل ہے جو بہترین نامیاتی فیٹی ایسڈز اور فوری جذب ہونے والے چیلیٹڈ مائیکرو نیوٹرینٹس سے تیار کیا گیا ہے۔ یہ خلیوں کی تقسیم کو تیز کرنے، کلوروفل کی مقدار بڑھانے اور پتے کی چوڑائی و موٹائی کو بہتر بنانے میں اہم کردار ادا کرتا ہے۔ پودے کو براہ راست لپڈ بلاکس فراہم کر کے، یہ میٹابولک توانائی کے طویل عمل کو کم کرتا ہے، جس سے فصلیں شدید موسم، شدید درجہ حرارت اور پانی کی کمی کے دوران بھی سرسبز و شاداب رہتی ہیں۔"
    },
    features: {
      en: [
        "Rapid absorption through leaf stomata",
        "Boosts chlorophyll production within 48 hours",
        "Improves crop defense against heat & drought",
        "Formulated with premium imported ingredients",
        "Optimizes energy pathways during cell division"
      ],
      ur: [
        "پتوں کے مساموں کے ذریعے فوری جذب ہونا",
        "48 گھنٹوں کے اندر کلوروفل کی پیداوار میں اضافہ",
        "شدید گرمی اور خشک سالی کے خلاف فصل کی قوت مدافعت کو بہتر بنانا",
        "درآمد شدہ اور اعلیٰ معیار کے اجزاء سے تیار کردہ",
        "خلیوں کی تقسیم کے دوران پودے کی توانائی کو محفوظ بنانا"
      ]
    },
    benefits: {
      en: [
        "Enhances overall plant growth and vegetative vigor",
        "Improves fruit-setting, sizing, and uniform coloring",
        "Reduces flower and fruit drop under stressful conditions",
        "Increases crop yield by up to 15-20%",
        "Improves root development and soil nutrient absorption"
      ],
      ur: [
        "پودے کی مجموعی نشوونما اور بڑھوتری میں اضافہ کرتا ہے",
        "پھل بننے، سائز بڑھانے اور یکساں رنگ لانے میں مدد کرتا ہے",
        "شدید موسمی حالات میں پھول اور پھل گرنے سے روکتا ہے",
        "فصل کی پیداوار میں 15 سے 20 فیصد تک اضافہ کرتا ہے",
        "جڑوں کی نشوونما اور زمین سے غذائی اجزاء جذب کرنے کی صلاحیت بڑھاتا ہے"
      ]
    },
    crops: [
      { name: { en: "Cotton", ur: "کپاس" }, icon: "🌱" },
      { name: { en: "Rice", ur: "دھان" }, icon: "🌾" },
      { name: { en: "Wheat", ur: "گندم" }, icon: "🌾" },
      { name: { en: "Maize", ur: "مکئی" }, icon: "🌽" },
      { name: { en: "Citrus", ur: "ترشاوہ پھل" }, icon: "🍊" },
      { name: { en: "Mango", ur: "آم" }, icon: "🥭" },
      { name: { en: "Vegetables", ur: "سبزیاں" }, icon: "🥦" }
    ],
    application: {
      en: "Foliar Spray. Dissolve the recommended dosage in clean water and apply thoroughly on the leaves. Ensure complete coverage of the canopy. Avoid spraying during midday heat; early morning or late evening applications yield maximum efficacy. Mixing with standard insecticides and fungicides is permissible, but run a jar test first.",
      ur: "بذریعہ فولیر سپرے۔ تجویز کردہ خوراک کو صاف پانی میں حل کریں اور پتوں پر اچھی طرح سپرے کریں۔ پورے پودے پر یکساں سپرے کو یقینی بنائیں۔ دوپہر کی شدید دھوپ میں سپرے کرنے سے گریز کریں؛ صبح سویرے یا شام کے وقت سپرے کرنے سے بہترین نتائج حاصل ہوتے ہیں۔ عام کیڑے مار اور فنگس کش ادویات کے ساتھ ملایا جا سکتا ہے، لیکن پہلے چھوٹے پیمانے پر چیک کر لیں۔"
    },
    dosageTable: [
      {
        crop: { en: "Cotton", ur: "کپاس" },
        dosage: { en: "250 ml / Acre", ur: "250 ملی لیٹر فی ایکڑ" },
        water: { en: "100-120 Liters", ur: "100-120 لیٹر" },
        timing: { en: "Squaring & Flowering stage", ur: "پھول اور ڈوڈی بننے کے وقت" },
        frequency: { en: "2 applications (15 days apart)", ur: "2 بار سپرے (15 دن کے وقفے سے)" }
      },
      {
        crop: { en: "Rice", ur: "دھان" },
        dosage: { en: "250 ml / Acre", ur: "250 ملی لیٹر فی ایکڑ" },
        water: { en: "100-120 Liters", ur: "100-120 لیٹر" },
        timing: { en: "Tillering & Panicle initiation", ur: "شاخیں بننے اور گوبھ کی حالت میں" },
        frequency: { en: "2 applications", ur: "2 بار سپرے" }
      },
      {
        crop: { en: "Vegetables", ur: "سبزیاں" },
        dosage: { en: "200-250 ml / Acre", ur: "200-250 ملی لیٹر فی ایکڑ" },
        water: { en: "100 Liters", ur: "100 لیٹر" },
        timing: { en: "Before flowering & fruit set", ur: "پھول آنے اور پھل بننے سے پہلے" },
        frequency: { en: "Every 12-15 days", ur: "ہر 12 سے 15 دن بعد" }
      },
      {
        crop: { en: "Citrus & Mango", ur: "ترشاوہ پھل اور آم" },
        dosage: { en: "1.5-2 ml / Liter water", ur: "1.5-2 ملی لیٹر فی لیٹر پانی" },
        water: { en: "As required for canopy", ur: "درختوں کے حجم کے مطابق" },
        timing: { en: "Post-harvest & fruit formation", ur: "برداشت کے بعد اور پھل بننے پر" },
        frequency: { en: "3-4 applications yearly", ur: "سال میں 3 سے 4 بار" }
      }
    ],
    specs: {
      type: { en: "Organic Plant Nutritional Liquid", ur: "نامیاتی مائع پلانٹ نیوٹریشن" },
      formulation: { en: "SL (Soluble Liquid)", ur: "ایس ایل (حل پذیر مائع)" },
      composition: { en: "Organic Fatty Acids 10% + Amino Acids 5% + Micronutrients 2%", ur: "نامیاتی فیٹی ایسڈز 10% + امینو ایسڈز 5% + مائیکرو نیوٹرینٹس 2%" },
      appearance: { en: "Dark Amber Viscous Liquid", ur: "گہرا زرد گاڑھا مائع" },
      storage: { en: "Store in cool, dry place away from foodstuff under 35°C", ur: "خوراک سے دور، ٹھنڈی اور خشک جگہ پر 35 ڈگری سے نیچے رکھیں" },
      shelfLife: { en: "3 Years from Manufacturing Date", ur: "تیاری کی تاریخ سے 3 سال" },
      packing: { en: "250ml, 500ml, 1 Liter PE Bottles", ur: "250 ملی لیٹر، 500 ملی لیٹر، 1 لیٹر بوتلیں" },
      compatibility: { en: "Compatible with neutral fertilizers and chemicals. Avoid alkaline mixes.", ur: "عام کھادوں اور ادویات کے ساتھ ملایا جا سکتا ہے۔ الکلائن مکسچر سے بچیں۔" }
    },
    safety: {
      en: [
        "Keep out of reach of children and domestic animals.",
        "Wear protective gloves, mask, and goggles during mixing and spraying.",
        "Wash hands and face thoroughly with soap and water after application.",
        "In case of eye contact, flush with clean water for 15 minutes.",
        "Dispose of empty bottles safely according to local regulations."
      ],
      ur: [
        "بچوں اور پالتو جانوروں کی پہنچ سے دور رکھیں۔",
        "مکسنگ اور سپرے کے دوران حفاظتی دستانے، ماسک اور عینک کا استعمال کریں۔",
        "سپرے کے بعد ہاتھ اور منہ صابن اور پانی سے اچھی طرح دھوئیں۔",
        "آنکھوں میں جانے کی صورت میں 15 منٹ تک صاف پانی سے دھوئیں۔",
        "خالی بوتلوں کو مقامی قوانین کے مطابق محفوظ طریقے سے تلف کریں۔"
      ]
    },
    faqs: {
      en: [
        { q: "What is Fatty and how does it work?", a: "Fatty is an organic plant growth promoter. It provides direct energy precursors (organic fatty acids) to crops, helping them optimize cell division and maintain vigor under stress without spending excessive metabolic energy." },
        { q: "Can I mix Fatty with insecticides or fungicides?", a: "Yes. Fatty is compatible with most standard chemical inputs. Always perform a small jar compatibility test before mixing in the spray tank." },
        { q: "When is the best time of day to spray Fatty?", a: "Early morning or late afternoon is best. Avoid spraying in the noon heat to prevent evaporation and maximize leaf absorption." },
        { q: "How many days should I wait between sprays?", a: "Generally, wait 12 to 15 days between applications depending on the crop's physiological state and environmental conditions." },
        { q: "What crops benefit most from Fatty?", a: "Cotton, Rice, Wheat, Vegetables, Citrus, and Mango benefit immensely, showing better branching, leaf greenness, and yield." },
        { q: "Does Fatty have any side effects on crops?", a: "No. When used at the recommended dosage, it is safe for crops and does not cause leaf burning." },
        { q: "How long does it take to see visible results?", a: "You will notice darker green leaves, enhanced vigor, and improved plant turgor within 48 to 72 hours of application." },
        { q: "What is the shelf life of Fatty?", a: "Fatty has a shelf life of 3 years from the date of manufacture when stored in cool, dry conditions in its original packaging." },
        { q: "Does Fatty help during water shortage or drought?", a: "Yes. Fatty strengthens the cell membrane and limits transpiration losses, making the crop highly resilient to drought." }
      ],
      ur: [
        { q: "فیٹی کیا ہے اور یہ کیسے کام کرتا ہے؟", a: "فیٹی ایک نامیاتی پودوں کا ہارمون اور گروتھ پروموٹر ہے۔ یہ پودوں کو براہ راست نامیاتی فیٹی ایسڈز فراہم کرتا ہے، جس سے وہ دباؤ کے دوران بھی توانائی خرچ کیے بغیر خلیوں کی تقسیم اور بڑھوتری کو بہتر بناتے ہیں۔" },
        { q: "کیا میں فیٹی کو کیڑے مار یا فنگس کش ادویات کے ساتھ ملا سکتا ہوں؟", a: "جی ہاں۔ فیٹی زیادہ تر ادویات کے ساتھ مطابقت رکھتا ہے۔ سپرے ٹینک میں مکس کرنے سے پہلے ہمیشہ چھوٹے برتن میں چیک کر لیں۔" },
        { q: "فیٹی سپرے کرنے کا بہترین وقت کون سا ہے؟", a: "صبح سویرے یا شام کے وقت سپرے کرنا بہترین ہے۔ دوپہر کی شدید گرمی میں سپرے سے گریز کریں تاکہ پتے دوا کو اچھی طرح جذب کر سکیں۔" },
        { q: "دو سپرے کے درمیان کتنے دنوں کا وقفہ ہونا چاہیے؟", a: "عام طور پر فصل کی حالت اور موسم کے لحاظ سے 12 سے 15 دن کا وقفہ رکھیں۔" },
        { q: "فیٹی سے کن فصلوں کو سب سے زیادہ فائدہ ہوتا ہے؟", a: "کپاس، دھان، گندم، سبزیوں، ترشاوہ پھلوں اور آم کو زبردست فائدہ ہوتا ہے، جس سے پتے سرسبز اور پیداوار زیادہ ہوتی ہے۔" },
        { q: "کیا فیٹی کے فصل پر کوئی مضر اثرات ہیں؟", a: "نہیں۔ تجویز کردہ مقدار کے مطابق استعمال کرنے سے یہ فصل کے لیے بالکل محفوظ ہے اور پتے نہیں جھلستے۔" },
        { q: "کتنے عرصے میں واضح نتائج نظر آتے ہیں؟", a: "سپرے کے 48 سے 72 گھنٹوں کے اندر پتے گہرے سبز، تروتازہ اور پودے صحت مند نظر آنے لگتے ہیں۔" },
        { q: "فیٹی کی میعاد (شیلف لائف) کتنی ہے؟", a: "اصل پیکنگ میں اور ٹھنڈی جگہ پر رکھنے کی صورت میں فیٹی کی میعاد تیاری کی تاریخ سے 3 سال ہے۔" },
        { q: "کیا فیٹی پانی کی کمی یا خشک سالی کے دوران مدد کرتا ہے؟", a: "جی ہاں۔ یہ خلیوں کی جھلی کو مضبوط کرتا ہے اور پانی کے بخارات بن کر اڑنے کے عمل کو سست کرتا ہے، جس سے فصل سوکے کا مقابلہ کرتی ہے۔" }
      ]
    }
  },
  "conference-gold": {
    id: "conference-gold",
    genericName: {
      en: "Metalaxyl + Fludioxonil + Thiamethoxam",
      ur: "میٹالیکسائل + فلوڈیوکسونل + تھایامیتھوکسام"
    },
    pricing: [
      { size: "50ml", rate: "399", carton: "40" },
      { size: "100ml", rate: "740", carton: "40" }
    ],
    slug: "conference-gold",
    name: {
      en: "Conference Gold",
      ur: "کانفرنس گولڈ"
    },
    category: "insecticide",
    imageUrl: conferenceImg,
    pngUrl: conferencePng,
    rating: 4.8,
    importedFormulaBadge: true,
    premiumProductBadge: true,
    researchBasedBadge: true,
    shortDesc: {
      en: "Conference Gold provides dual-action systemic protection against a wide spectrum of chewing and sucking pests.",
      ur: "کانفرنس گولڈ فصلوں کو چوسنے اور چبانے والے کیڑوں کے خلاف دوہرے عمل کے ساتھ دیرپا تحفظ فراہم کرتا ہے۔"
    },
    seoTitle: "Conference Gold Dual-Action Insecticide | Vital Agro",
    seoDescription: "Buy Conference Gold premium insecticide. Dual systemic and contact protection against aphid, thrips, jassid, and whiteflies. Order on WhatsApp or checkout.",
    sizes: [
      { size: "100 ML", price: 799, oldPrice: 999, stockStatus: "In Stock", sku: "VA-CG-100", weight: "100g" },
      { size: "250 ML", price: 1499, oldPrice: 1999, stockStatus: "In Stock", sku: "VA-CG-250", weight: "250g" },
      { size: "500 ML", price: 2499, oldPrice: 3299, stockStatus: "In Stock", sku: "VA-CG-500", weight: "500g" }
    ],
    formulation: "15% SC",
    activeIngredient: "Imidacloprid 10% + Beta-Cyfluthrin 5%",
    packaging: "100ml, 250ml, 500ml",
    productCode: "VA-CG-02",
    status: {
      en: "Dual-Action Premium Protection",
      ur: "دوہرے اثر والا بہترین تحفظ"
    },
    description: {
      en: "Conference Gold is a premium, dual-action systemic and contact insecticide formulated to combat a wide spectrum of sucking and chewing pests in field crops and vegetables. By combining the systemic action of Imidacloprid with the rapid knock-down contact effect of Beta-Cyfluthrin, it targets the insect's nervous system at multiple sites. This dual-action mechanism prevents resistance buildup and ensures long-lasting protective cover for your crop against aphids, jassids, thrips, whiteflies, and bollworms.",
      ur: "کانفرنس گولڈ ایک اعلیٰ معیار کا سسٹمک اور کانٹیکٹ کیڑے مار زہر ہے جو مختلف قسم کے چوسنے والے اور چبانے والے کیڑوں کے خلاف بہترین ڈھال فراہم کرتا ہے۔ امیڈاکلوپرڈ کے سسٹمک عمل اور بیٹا سائفلوتھرین کے فوری اور مہلک اثر کے امتزاج سے، یہ کیڑوں کے اعصابی نظام پر ایک ساتھ کئی جگہوں پر اثر کرتا ہے۔ یہ منفرد فارمولیشن کیڑوں میں مدافعت پیدا ہونے سے روکتی ہے اور کپاس، سبزیوں اور دیگر فصلوں کو تھرپس، چست تیلا، سفید مکھی اور سنڈیوں سے طویل تحفظ فراہم کرتی ہے۔"
    },
    features: {
      en: [
        "Rapid knock-down of target pests within hours",
        "Dual-mode action (systemic + contact) for complete protection",
        "Prevents pesticide resistance development",
        "Long residual protection reduces sprays quantity",
        "Excellent rain-fastness once dried on leaves"
      ],
      ur: [
        "چند گھنٹوں کے اندر نقصان دہ کیڑوں کا فوری خاتمہ",
        "کامل تحفظ کے لیے دوہرا عمل (سسٹمک اور کانٹیکٹ)",
        "کیڑوں میں زہر کے خلاف قوت مدافعت پیدا ہونے سے روکتا ہے",
        "دیرپا اثر جس کی وجہ سے کم سپرے کرنے پڑتے ہیں",
        "پتوں پر خشک ہونے کے بعد بارش سے بھی اثر ختم نہیں ہوتا"
      ]
    },
    benefits: {
      en: [
        "Protects the crop during vulnerable flowering & fruiting stages",
        "Reduces viral diseases transmitted by sucking pests",
        "Keeps the foliage healthy, leading to superior crop photosynthesis",
        "Cost-effective with high return on investment",
        "Ensures damage-free boll formation in cotton"
      ],
      ur: [
        "فصل کو پھول اور پھل بننے کے نازک مراحل پر محفوظ رکھتا ہے",
        "چوسنے والے کیڑوں سے پھیلنے والی وائرل بیماریوں کو روکتا ہے",
        "پتوں کو صحت مند رکھتا ہے، جس سے پودے کی خوراک بنانے کی صلاحیت بڑھتی ہے",
        "کم لاگت اور زیادہ منافع بخش حل ہے",
        "کپاس میں ڈوڈی اور ٹینڈے کے نقصان سے بچاؤ یقینی بناتا ہے"
      ]
    },
    crops: [
      { name: { en: "Cotton", ur: "کپاس" }, icon: "🌱" },
      { name: { en: "Sugarcane", ur: "کماد" }, icon: "🎋" },
      { name: { en: "Potato", ur: "آلو" }, icon: "🥔" },
      { name: { en: "Chilli", ur: "مرچ" }, icon: "🌶️" },
      { name: { en: "Tomato", ur: "ٹماٹر" }, icon: "🍅" },
      { name: { en: "Okra", ur: "بھنڈی" }, icon: "🥒" }
    ],
    application: {
      en: "Mix the recommended quantity with water. Spray uniformly covering the entire foliage, especially the undersides of leaves where pests hide. Do not apply during honeybee activity. Minimum withholding period is 14 days before harvest.",
      ur: "تجویز کردہ مقدار کو پانی میں مکس کریں۔ پتے کے نچلے حصے پر خاص توجہ دیتے ہوئے یکساں سپرے کریں جہاں کیڑے چھپے ہوتے ہیں۔ مکھیوں کی سرگرمی کے دوران سپرے نہ کریں۔ فصل کی کٹائی یا برداشت سے کم از کم 14 دن پہلے سپرے بند کر دیں۔"
    },
    dosageTable: [
      {
        crop: { en: "Cotton", ur: "کپاس" },
        dosage: { en: "150-200 ml / Acre", ur: "150-200 ملی لیٹر فی ایکڑ" },
        water: { en: "120-150 Liters", ur: "120-150 لیٹر" },
        timing: { en: "At pest threshold levels", ur: "نقصان دہ کیڑوں کے معاشی نقصان کی حد پر" },
        frequency: { en: "As needed, maximum 2 per season", ur: "ضرورت کے مطابق، سال میں زیادہ سے زیادہ 2 سپرے" }
      },
      {
        crop: { en: "Chilli & Tomato", ur: "مرچ اور ٹماٹر" },
        dosage: { en: "150 ml / Acre", ur: "150 ملی لیٹر فی ایکڑ" },
        water: { en: "100-120 Liters", ur: "100-120 لیٹر" },
        timing: { en: "Upon infestation detection", ur: "حملہ نظر آنے کی صورت میں" },
        frequency: { en: "1-2 applications", ur: "1 سے 2 سپرے" }
      },
      {
        crop: { en: "Potato", ur: "آلو" },
        dosage: { en: "100-150 ml / Acre", ur: "100-150 ملی لیٹر فی ایکڑ" },
        water: { en: "100 Liters", ur: "100 لیٹر" },
        timing: { en: "Early leaf growth stage", ur: "پتوں کی ابتدائی بڑھوتری پر" },
        frequency: { en: "1 application", ur: "1 سپرے" }
      }
    ],
    specs: {
      type: { en: "Systemic and Contact Insecticide", ur: "سسٹمک اور کانٹیکٹ کیڑے مار دوا" },
      formulation: { en: "SC (Suspension Concentrate)", ur: "ایس سی (سسپنشن کنسنٹریٹ)" },
      composition: { en: "Imidacloprid 10% + Beta-Cyfluthrin 5%", ur: "امیڈاکلوپرڈ 10% + بیٹا سائفلوتھرین 5%" },
      appearance: { en: "Creamy white suspension", ur: "کریم نما سفید مائع" },
      storage: { en: "Keep locked up, below 30°C in cool, dry ventilated store", ur: "تالا لگا کر، 30 ڈگری سے نیچے ہوادار اور خشک اسٹور میں رکھیں" },
      shelfLife: { en: "2 Years from Manufacturing Date", ur: "تیاری کی تاریخ سے 2 سال" },
      packing: { en: "100ml, 250ml, 500ml COEX Bottles", ur: "100ml، 250ml، 500ml بوتلیں" },
      compatibility: { en: "Do not mix with lime sulfur, Bordeaux mixture, or strongly alkaline pesticides.", ur: "لائم سلفر، بورڈو مکسچر، یا تیز الکلائن ادویات کے ساتھ نہ ملائیں۔" }
    },
    safety: {
      en: [
        "Highly toxic if swallowed or inhaled. Use protective mask.",
        "Avoid skin and eye contact. Wear gloves and chemical protective clothing.",
        "Do not contaminate rivers, streams, or waterways. Toxic to aquatic life.",
        "Keep away from children, food products, and animal feed.",
        "Perform spraying downwind to avoid inhaling droplets."
      ],
      ur: [
        "نگلنے یا سانس کے ذریعے اندر جانے کی صورت میں شدید زہریلا ہے۔ ماسک پہنیں۔",
        "جلد اور آنکھوں کے رابطے سے بچیں۔ دستانے اور حفاظتی لباس استعمال کریں۔",
        "دریاؤں، ندیوں اور پانی کے ذخائر کو آلودہ نہ کریں۔ مچھلیوں کے لیے نقصان دہ ہے۔",
        "بچوں، غذائی اشیاء اور مویشیوں کے چارے سے دور رکھیں۔",
        "ہوا کی سمت میں کھڑے ہو کر سپرے کریں تاکہ باریک قطرے آپ پر نہ پڑیں۔"
      ]
    },
    faqs: {
      en: [
        { q: "What pests does Conference Gold control?", a: "It controls sucking pests like whitefly, aphid, jassid, thrips, and chewers like armyworm and various bollworms." },
        { q: "How fast does it kill pests?", a: "Contact action (Beta-Cyfluthrin) knocks down active pests within 1 to 4 hours, while systemic action covers the rest over the next 24 hours." },
        { q: "Can I use it on food crops like vegetables?", a: "Yes, it is highly suitable for vegetables, but ensure a 14-day safety window (withholding period) before harvesting." },
        { q: "Is Conference Gold systemic?", a: "Yes, Imidacloprid is highly systemic and moves upwards through the plant xylem to protect new shoots." },
        { q: "How long does the insecticide protection last?", a: "A single spray provides active protection for 10 to 14 days, depending on pest pressure and weather." },
        { q: "What should I do if it rains after spraying?", a: "If it rains 2 hours or more after spraying, the product is rain-fast and won't wash off. If it rains immediately, a re-application may be needed." },
        { q: "Is it safe for honeybees?", a: "No, it is toxic to bees. Avoid spraying during active pollination hours in the morning." },
        { q: "How should I store leftover insecticide?", a: "Keep it tightly closed in its original bottle, stored in a locked cabinet out of reach of children and away from direct sunlight." },
        { q: "What is the formulation type SC?", a: "SC stands for Suspension Concentrate. It is a liquid formulation where active ingredients are suspended in water, making it easy to mix and apply." }
      ],
      ur: [
        { q: "کانفرنس گولڈ کن کیڑوں پر قابو پاتا ہے؟", a: "یہ چوسنے والے کیڑوں جیسے سفید مکھی، چست تیلا، تھرپس اور چبانے والے کیڑوں جیسے لشکر سنڈی اور گلابی سنڈی کا خاتمہ کرتا ہے۔" },
        { q: "یہ کیڑوں کو کتنی جلدی ہلاک کرتا ہے؟", a: "اس کا کانٹیکٹ زہر 1 سے 4 گھنٹے میں کیڑوں کو ختم کرتا ہے، جبکہ سسٹمک زہر اگلے 24 گھنٹوں میں باقی کیڑوں کو ہلاک کرتا ہے۔" },
        { q: "کیا میں اسے سبزیوں پر استعمال کر سکتا ہوں؟", a: "جی ہاں، یہ سبزیوں پر استعمال کیا جا سکتا ہے لیکن پھل توڑنے سے کم از کم 14 دن پہلے سپرے روک دیں۔" },
        { q: "کیا کانفرنس گولڈ سسٹمک زہر ہے؟", a: "جی ہاں، اس میں موجود امیڈاکلوپرڈ سسٹمک ہے جو پودے کی رگوں میں سرایت کر کے نئے پتوں کو بھی محفوظ بناتا ہے۔" },
        { q: "اس کے سپرے کا اثر کتنے دنوں تک رہتا ہے؟", a: "موسم اور کیڑوں کے حملے کے لحاظ سے ایک سپرے کا اثر 10 سے 14 دنوں تک قائم رہتا ہے۔" },
        { q: "اگر سپرے کے بعد بارش ہو جائے تو کیا ہوگا؟", a: "اگر سپرے کے 2 گھنٹے بعد بارش ہو تو اثر برقرار رہے گا۔ اگر سپرے کے فوراً بعد بارش ہو جائے تو دوبارہ سپرے کرنا پڑ سکتا ہے۔" },
        { q: "کیا یہ شہد کی مکھیوں کے لیے نقصان دہ ہے؟", a: "جی ہاں، یہ شہد کی مکھیوں کے لیے زہریلا ہے۔ صبح کے وقت جب مکھیاں پھولوں پر آتی ہیں، سپرے سے گریز کریں۔" },
        { q: "بچی ہوئی دوا کو کیسے محفوظ کریں؟", a: "دوا کو اصل بوتل میں مضبوطی سے بند کر کے بچوں کی پہنچ سے دور کسی تالے والے کیبنٹ میں دھوپ سے بچا کر رکھیں۔" },
        { q: "ایس سی (SC) فارمولیشن کا کیا مطلب ہے؟", a: "ایس سی کا مطلب سسپنشن کنسنٹریٹ ہے۔ یہ مائع دوا ہوتی ہے جس میں باریک ذرات پانی میں معلق ہوتے ہیں، اسے ہلانا اور پانی میں حل کرنا آسان ہوتا ہے۔" }
      ]
    }
  },
  "easy-grow": {
    id: "easy-grow",
    genericName: {
      en: "Clothianidin",
      ur: "کلوتھیانیڈن"
    },
    pricing: [
      { size: "100ml", rate: "245", carton: "40" },
      { size: "120g", rate: "365", carton: "40" },
      { size: "200ml", rate: "370", carton: "40" }
    ],
    slug: "easy-grow",
    name: {
      en: "Easy Grow",
      ur: "ایزی گرو"
    },
    category: "growth_promoter",
    imageUrl: easyGrowImg,
    pngUrl: easyGrowPng,
    rating: 4.9,
    importedFormulaBadge: true,
    premiumProductBadge: true,
    researchBasedBadge: true,
    shortDesc: {
      en: "Easy Grow is an elite organic growth promoter containing GA3, Potassium Humate, and Fulvic Acid for stem elongation.",
      ur: "ایزی گرو پودوں کی نشوونما، قد بڑھانے اور جڑوں کے پھیلاؤ کے لیے ایک بہترین آرگینک گروتھ پروموٹر ہے۔"
    },
    seoTitle: "Easy Grow Growth Promoter & Humic Acid | Vital Agro",
    seoDescription: "Enrich crop soil with Easy Grow. Plant growth regulator containing highly active Gibberellic Acid and Potassium Humate for root expansion and grain filling.",
    sizes: [
      { size: "200 ML", price: 999, oldPrice: 1299, stockStatus: "In Stock", sku: "VA-EG-200", weight: "200g" },
      { size: "500 ML", price: 1499, oldPrice: 1999, stockStatus: "In Stock", sku: "VA-EG-500", weight: "500g" },
      { size: "1 Litre", price: 2499, oldPrice: 3299, stockStatus: "In Stock", sku: "VA-EG-1L", weight: "1kg" }
    ],
    formulation: "Liquid SL",
    activeIngredient: "Gibberellic Acid + Humic Acid + Fulvic Acid",
    packaging: "200ml, 500ml, 1L",
    productCode: "VA-EG-03",
    status: {
      en: "Elite Vegetative Stimulator",
      ur: "بڑھوتری اور جڑوں کا ضامن"
    },
    description: {
      en: "Easy Grow is an advanced organic growth regulator and yield booster formulated with highly active Gibberellic Acid (GA3), premium Potassium Humate, and Fulvic Acid. Designed to unlock the physiological potential of crops, it triggers rapid cell elongation, increases lateral branching, stimulates root growth, and enhances nutrient absorption from the soil. Easy Grow provides crops with the necessary metabolic signals to break dormancy, accelerate early growth, and improve fruit sizing.",
      ur: "ایزی گرو ایک جدید نامیاتی ہارمون اور گروتھ پروموٹر ہے جو انتہائی فعال جبرالک ایسڈ (GA3)، بہترین پوٹاشیم ہیومیٹ اور فلوک ایسڈ کے متوازن مرکب سے تیار کیا گیا ہے۔ یہ پودے کی چھپی ہوئی صلاحیتوں کو بیدار کر کے خلیوں کی طوالت اور پودے کے پھیلاؤ کو تیز کرتا ہے، نئی شاخیں نکالنے میں مدد دیتا ہے اور جڑوں کو وسعت دیتا ہے۔ یہ پودے کو زمین سے خوراک جذب کرنے کے قابل بناتا ہے، جس سے فصل کی ابتدائی بڑھوتری شاندار ہوتی ہے اور پھل کا سائز بہتر ہوتا ہے۔"
    },
    features: {
      en: [
        "Triggers fast cell division and stem elongation",
        "Stimulates massive fibrous root structure development",
        "Enhances plant capability to absorb soil locked NPK",
        "100% water-soluble and leaves no residues",
        "Improves tolerance against frost and drought stress"
      ],
      ur: [
        "خلیوں کی تقسیم اور تنے کی بڑھوتری کو تیز کرنا",
        "جڑوں کے پھیلنے اور باریک جڑیں بنانے کے عمل کو بڑھانا",
        "زمین میں مقفل نائٹروجن، فاسفورس اور پوٹاش جذب کرنے میں مدد کرنا",
        "پانی میں 100٪ حل پذیر اور پودے کے لیے مکمل فائدہ مند",
        "کورا، سردی اور شدید خشک سالی کا مقابلہ کرنے کی صلاحیت دینا"
      ]
    },
    benefits: {
      en: [
        "Accelerates vegetative growth in all field crops",
        "Improves grain weight and fill in wheat and paddy rice",
        "Prevents flower shedding and enhances fruit setting",
        "Produces robust green foliage and larger leaf surface area",
        "Delivers uniform fruit maturity and higher market grade crops"
      ],
      ur: [
        "امید افزا بڑھوتری اور جڑوں کے عمل کو تیز کرتا ہے",
        "گندم اور دھان میں دانوں کا وزن بڑھاتا ہے اور بھرائی بہتر کرتا ہے",
        "پھولوں کو گرنے سے روکتا ہے اور زیادہ پھل بناتا ہے",
        "پتوں کا سائز بڑا کرتا ہے جس سے فصل لش گرین نظر آتی ہے",
        "پھل یکساں پکتا ہے اور کاشتکار کو منڈی میں اچھا ریٹ ملتا ہے"
      ]
    },
    crops: [
      { name: { en: "Rice", ur: "دھان" }, icon: "🌾" },
      { name: { en: "Wheat", ur: "گندم" }, icon: "🌾" },
      { name: { en: "Sugarcane", ur: "کماد" }, icon: "🎋" },
      { name: { en: "Maize", ur: "مکئی" }, icon: "🌽" },
      { name: { en: "Potato", ur: "آلو" }, icon: "🥔" },
      { name: { en: "Vegetables", ur: "سبزیاں" }, icon: "🥦" }
    ],
    application: {
      en: "Foliar spray or soil application through flood irrigation. Dilute in water and spray on vegetative canopy, or mix with irrigation water at the root zone.",
      ur: "بذریعہ فولیر سپرے یا پانی کے ساتھ فلڈ کریں۔ پانی میں حل کر کے پتوں پر سپرے کریں، یا آبپاشی کے پانی کے ساتھ جڑوں تک پہنچائیں۔"
    },
    dosageTable: [
      {
        crop: { en: "Sugarcane", ur: "کماد" },
        dosage: { en: "400-500 ml / Acre", ur: "400-500 ملی لیٹر فی ایکڑ" },
        water: { en: "150 Liters", ur: "150 لیٹر" },
        timing: { en: "During rapid growth stage (90-120 days)", ur: "تیز بڑھوتری کے مرحلے پر (90 سے 120 دن)" },
        frequency: { en: "2 applications", ur: "2 بار سپرے" }
      },
      {
        crop: { en: "Rice & Wheat", ur: "دھان اور گندم" },
        dosage: { en: "200 ml / Acre", ur: "200 ملی لیٹر فی ایکڑ" },
        water: { en: "100-120 Liters", ur: "100-120 لیٹر" },
        timing: { en: "Tillering stage & Booting stage", ur: "شاخیں نکلتے وقت اور گوبھ کی حالت پر" },
        frequency: { en: "2 applications", ur: "2 بار سپرے" }
      },
      {
        crop: { en: "Vegetables", ur: "سبزیاں" },
        dosage: { en: "150-200 ml / Acre", ur: "150-200 ملی لیٹر فی ایکڑ" },
        water: { en: "100 Liters", ur: "100 لیٹر" },
        timing: { en: "At active vegetative growth", ur: "بڑھوتری کے سرگرم مرحلے پر" },
        frequency: { en: "Every 15 days", ur: "ہر 15 دن بعد" }
      }
    ],
    specs: {
      type: { en: "Organic Vegetative Booster", ur: "نامیاتی بڑھوتری بڑھانے والا مائع" },
      formulation: { en: "SL (Soluble Liquid)", ur: "ایس ایل (حل پذیر مائع)" },
      composition: { en: "Gibberellic Acid 0.1% + Humic Acid 10% + Fulvic Acid 2%", ur: "جبرالک ایسڈ 0.1% + ہیومک ایسڈ 10% + فلوک ایسڈ 2%" },
      appearance: { en: "Dark brown to black liquid", ur: "گہرا بھورا یا سیاہ مائع" },
      storage: { en: "Store below 35°C in cool, dry warehouse", ur: "ٹھنڈے گودام میں 35 ڈگری سے نیچے سٹور کریں" },
      shelfLife: { en: "3 Years", ur: "3 سال" },
      packing: { en: "200ml, 500ml, 1 Liter Bottles", ur: "200ml، 500ml، 1 لیٹر بوتلیں" },
      compatibility: { en: "Highly compatible with NPK foliar feeds. Avoid mixing with acidic copper fungicides.", ur: "این پی کے اسپرے کے ساتھ زبردست کام کرتا ہے۔ تیزابی کاپر ادویات کے ساتھ نہ ملائیں۔" }
    },
    safety: {
      en: [
        "Avoid contact with eyes, skin, and clothing. Wash thoroughly after handling.",
        "Do not inhale spray mist. Wear protective goggles and gloves.",
        "Store away from food, drink, and animal feeding stuffs.",
        "Keep container tightly closed in a cool place.",
        "Clean spray equipment thoroughly before and after use."
      ],
      ur: [
        "آنکھوں، جلد اور کپڑوں پر گرنے سے بچائیں۔ کام کے بعد اچھی طرح دھوئیں۔",
        "دوا کی دھند کو سانس کے ذریعے اندر جانے سے روکیں۔ عینک اور دستانے پہنیں۔",
        "غذائی اشیاء اور چارے سے دور اسٹور کریں۔",
        "بوتل کو مضبوطی سے بند کر کے ٹھنڈی جگہ پر رکھیں۔",
        "سپرے مشینری کو استعمال سے پہلے اور بعد میں اچھی طرح دھو لیں۔"
      ]
    },
    faqs: {
      en: [
        { q: "What is Gibberellic Acid (GA3) in Easy Grow?", a: "Gibberellic Acid is a natural plant hormone that triggers cell division and elongation, resulting in rapid crop growth and stalk development." },
        { q: "How does the Humic Acid component help?", a: "Humic acid improves root system architecture, increases soil water retention, and helps chelating soil micronutrients for easy root intake." },
        { q: "Can Easy Grow be mixed with urea?", a: "Yes, mixing it with urea sprays or broadcasting it with urea fertilizer increases nitrogen utilization efficiency." },
        { q: "What is the recommended application method?", a: "It can be sprayed directly on leaves (foliar) or flooded through irrigation (fertigation)." },
        { q: "How soon can I see vegetative changes?", a: "Visible stem elongation, leaf widening, and dark green coloring are visible in 3 to 5 days." },
        { q: "Is Easy Grow safe for organic farming?", a: "Yes, it contains natural plant hormones and organic acids, making it safe and environmentally friendly." },
        { q: "Does Easy Grow help in sugarcane elongation?", a: "Absolutely. Easy Grow is highly recommended for sugarcane to increase internode distance and cane weight." },
        { q: "Can we spray it during winter?", a: "Yes. It acts as an anti-stress agent, protecting crops from severe frost damage during winter." }
      ],
      ur: [
        { q: "ایزی گرو میں جبرالک ایسڈ (GA3) کا کیا کام ہے؟", a: "جبرالک ایسڈ ایک قدرتی ہارمون ہے جو خلیوں کے بننے اور بڑھنے کے عمل کو تیز کرتا ہے، جس سے فصل کا تلا بڑا اور مضبوط ہوتا ہے۔" },
        { q: "اس میں موجود ہیومک ایسڈ کا کیا فائدہ ہے؟", a: "ہیومک ایسڈ جڑوں کے نظام کو پھیلاتا ہے، زمین میں پانی جذب رکھنے کی صلاحیت بڑھاتا ہے اور غذائی اجزاء کو جڑوں کے لیے قابلِ قبول بناتا ہے۔" },
        { q: "کیا ایزی گرو کو یوریا کے ساتھ ملایا جا سکتا ہے؟", a: "جی ہاں، اسے یوریا کے سپرے یا کھاد کے ساتھ ملا کر استعمال کرنے سے نائٹروجن کی افادیت دوگنی ہو جاتی ہے۔" },
        { q: "اس دوا کو استعمال کرنے کا طریقہ کیا ہے؟", a: "اسے پتوں پر سپرے بھی کیا جا سکتا ہے اور کھاد کے ساتھ فلڈ (پانی کے ساتھ شامل) بھی کیا جا سکتا ہے۔" },
        { q: "سپرے کے بعد کتنے دنوں میں تبدیلی نظر آتی ہے؟", a: "عام طور پر 3 سے 5 دنوں میں فصل کا قد بڑھتا ہوا، پتے چوڑے اور رنگت نکھرتی ہوئی نظر آتی ہے۔" },
        { q: "کیا ایزی گرو آرگینک کاشتکاری کے لیے محفوظ ہے؟", a: "جی ہاں، اس میں قدرتی اجزاء اور نامیاتی تیزاب شامل ہیں جو ماحول اور فصل کے لیے بالکل محفوظ ہیں۔" },
        { q: "کیا یہ کماد کا قد بڑھانے میں مددگار ہے؟", a: "جی بالکل۔ یہ کماد کے پوروں کا درمیانی فاصلہ بڑھاتا ہے جس سے گنے کی لمبائی اور وزن میں خاطر خواہ اضافہ ہوتا ہے۔" },
        { q: "کیا سردیوں میں اس کا سپرے کیا جا سکتا ہے؟", a: "جی ہاں۔ یہ کوہرا اور سردی کے اثرات کا مقابلہ کرنے کے لیے پودے کو طاقت دیتا ہے اور فصل کو پیلا ہونے سے بچاتا ہے۔" }
      ]
    }
  },
  "purifizin-extra": {
    id: "purifizin-extra",
    genericName: {
      en: "Buprofezin",
      ur: "بیوپروفیزن"
    },
    pricing: [
      { size: "900g", rate: "1199", carton: "10" }
    ],
    slug: "purifizin-extra",
    name: {
      en: "Purifizin Extra",
      ur: "پیوریفیزن ایکسٹرا"
    },
    category: "fungicide",
    imageUrl: purifizinImg,
    pngUrl: purifizinPng,
    rating: 4.7,
    importedFormulaBadge: true,
    premiumProductBadge: true,
    researchBasedBadge: true,
    shortDesc: {
      en: "Purifizin Extra is a premium broad-spectrum fungicide with systemic and curative action against blights and rusts.",
      ur: "پیوریفیزن ایکسٹرا جھلساؤ، کنگی اور فنگس کی دوسری بیماریوں کے خلاف سسٹمک اور حفاظتی اثر رکھنے والی دوا ہے۔"
    },
    seoTitle: "Purifizin Extra Systemic Fungicide | Vital Agro",
    seoDescription: "Protect crops from potato blight, wheat rust, and powdery mildew using Purifizin Extra. Premium broad-spectrum systemic fungicide with diffenoconazole.",
    sizes: [
      { size: "250 ML", price: 1299, oldPrice: 1699, stockStatus: "In Stock", sku: "VA-PE-250", weight: "250g" },
      { size: "500 ML", price: 2199, oldPrice: 2899, stockStatus: "In Stock", sku: "VA-PE-500", weight: "500g" },
      { size: "1 Litre", price: 3999, oldPrice: 4999, stockStatus: "Low Stock", sku: "VA-PE-1L", weight: "1kg" }
    ],
    formulation: "32.5% SC",
    activeIngredient: "Azoxystrobin 20% + Difenoconazole 12.5%",
    packaging: "100ml, 200ml, 400ml",
    productCode: "VA-PE-04",
    status: {
      en: "Premium Broad Spectrum Fungicide",
      ur: "شاندار سسٹمک فنگس کش دوا"
    },
    description: {
      en: "Purifizin Extra is a premium broad-spectrum fungicide with preventative, systemic, and curative action. It combines the powerful strobilurin activity of Azoxystrobin (inhibiting mitochondrial respiration) with the triazole activity of Difenoconazole (blocking sterol biosynthesis). This dual mode of action stops spore germination, controls mycelial development, and halts fungal disease progression. Highly effective against early and late blight, rust, leaf spot, and powdery mildew, Purifizin Extra provides comprehensive crop health protection and promotes greening effects.",
      ur: "پیوریفیزن ایکسٹرا ایک بہترین اور وسیع الاثر فنگس کش دوا ہے جو بیماری کے بچاؤ، علاج اور مکمل خاتمے کے لیے استعمال ہوتی ہے۔ یہ ایزوکسیسٹروبن (جو فنگس کی سانس لینے کی صلاحیت روکتی ہے) اور ڈیفینوکونازول (جو فنگس کے خلیوں کی دیواریں تباہ کرتی ہے) کا بہترین سسٹمک فارمولا ہے۔ یہ طاقتور عمل فنگس کے سپورز بننے اور بیماری پھیلانے کی صلاحیت کو جڑ سے ختم کرتا ہے۔ یہ فصلوں کو جھلساؤ (بلائٹ)، کنگی (رسٹ)، پتوں کے دھبوں اور سفوفی پھپھوند سے مکمل تحفظ فراہم کر کے فصل کو تندرست رکھتا ہے۔"
    },
    features: {
      en: [
        "Broad-spectrum control of blights, rusts, and leaf spots",
        "Preventative and curative systemic protection",
        "Inhibits fungal respiration and cell wall synthesis",
        "Provides visual greening effect and stress resistance",
        "Quick absorption ensures rain-fastness within 2 hours"
      ],
      ur: [
        "جھلساؤ، کنگی اور پتوں کے دھبوں کا مکمل کنٹرول",
        "بیماری سے پہلے بچاؤ اور بیماری آنے کے بعد علاج",
        "پھپھوند کے سانس لینے اور خلیے بننے کے عمل کو روکنا",
        "فصل پر نمایاں ہریالی اور دباؤ برداشت کرنے کی طاقت دینا",
        "فوری جذب ہو کر بارش کے اثرات سے محفوظ رہنا"
      ]
    },
    benefits: {
      en: [
        "Protects high-value crops (potato, tomato, rice) from blights",
        "Extends leaf longevity, improving photosynthesis rates",
        "Guarantees quality yields with spot-free fruits & vegetables",
        "Reduces total spray frequency due to extended residual control",
        "Helps crops recover quickly from early fungal infections"
      ],
      ur: [
        "آلو، ٹماٹر اور چاول جیسی قیمتی فصلوں کو جھلساؤ سے بچاتا ہے",
        "پتے کے زندہ رہنے کی مدت بڑھاتا ہے جس سے خوراک زیادہ بنتی ہے",
        "بیماریوں کے دھبوں سے پاک پھل اور سبزیاں فراہم کرتا ہے",
        "طویل اثر کی وجہ سے بار بار سپرے کی ضرورت نہیں رہتی",
        "ابتدائی پھپھوندی حملے کے بعد فصل کو جلد صحت مند بناتا ہے"
      ]
    },
    crops: [
      { name: { en: "Potato", ur: "آلو" }, icon: "🥔" },
      { name: { en: "Tomato", ur: "ٹماٹر" }, icon: "🍅" },
      { name: { en: "Rice", ur: "دھان" }, icon: "🌾" },
      { name: { en: "Wheat", ur: "گندم" }, icon: "🌾" },
      { name: { en: "Citrus", ur: "ترشاوہ پھل" }, icon: "🍊" },
      { name: { en: "Mango", ur: "آم" }, icon: "🥭" },
      { name: { en: "Vegetables", ur: "سبزیاں" }, icon: "🥦" }
    ],
    application: {
      en: "Foliar spray. Start application protectively before disease onset or immediately at first symptom detection. Spray uniformly. Do not spray in strong wind or during rain.",
      ur: "بذریعہ فولیر سپرے۔ بیماری آنے سے پہلے احتیاطی طور پر یا بیماری کے پہلے نشانات نظر آتے ہی سپرے شروع کریں۔ یکساں سپرے کریں۔ تیز ہوا یا بارش کے دوران سپرے نہ کریں۔"
    },
    dosageTable: [
      {
        crop: { en: "Potato", ur: "آلو" },
        dosage: { en: "200 ml / Acre", ur: "200 ملی لیٹر فی ایکڑ" },
        water: { en: "100-120 Liters", ur: "100-120 لیٹر" },
        timing: { en: "Before or during early blight onset", ur: "جھلساؤ کے حملے کے وقت یا اس سے پہلے" },
        frequency: { en: "2 sprays (10 days interval)", ur: "2 سپرے (10 دن کے وقفے سے)" }
      },
      {
        crop: { en: "Tomato & Chilli", ur: "ٹماٹر اور مرچ" },
        dosage: { en: "200 ml / Acre", ur: "200 ملی لیٹر فی ایکڑ" },
        water: { en: "100 Liters", ur: "100 لیٹر" },
        timing: { en: "At first sign of leaf spot or blight", ur: "پتوں پر دھبے یا جھلساؤ ظاہر ہوتے ہی" },
        frequency: { en: "1-2 applications", ur: "1 سے 2 سپرے" }
      },
      {
        crop: { en: "Rice", ur: "دھان" },
        dosage: { en: "200 ml / Acre", ur: "200 ملی لیٹر فی ایکڑ" },
        water: { en: "120 Liters", ur: "120 لیٹر" },
        timing: { en: "During boot leaf or sheath blight onset", ur: "گوبھ کی حالت میں یا شیتھ بلائٹ پر" },
        frequency: { en: "1-2 applications", ur: "1 سے 2 سپرے" }
      }
    ],
    specs: {
      type: { en: "Systemic Fungicide", ur: "سسٹمک فنگس کش دوا" },
      formulation: { en: "SC (Suspension Concentrate)", ur: "ایس سی (سسپنشن کنسنٹریٹ)" },
      composition: { en: "Azoxystrobin 200g/L + Difenoconazole 125g/L", ur: "ایزوکسیسٹروبن 200 گرام/لیٹر + ڈیفینوکونازول 125 گرام/لیٹر" },
      appearance: { en: "Light beige homogeneous suspension", ur: "ہلکا زرد مائع" },
      storage: { en: "Store dry, away from sun, tightly closed under 30°C", ur: "دھوپ سے دور، 30 ڈگری سے نیچے خشک جگہ پر مضبوطی سے بند رکھیں" },
      shelfLife: { en: "2 Years", ur: "2 سال" },
      packing: { en: "100ml, 200ml, 400ml Bottles", ur: "100ml، 200ml، 400ml بوتلیں" },
      compatibility: { en: "Do not mix with foliar oils or organophosphate insecticides.", ur: "تیل والے سپرے یا آرگینو فاسفیٹ کیڑے مار ادویات کے ساتھ مکس نہ کریں۔" }
    },
    safety: {
      en: [
        "Causes moderate eye irritation. Wear protective safety goggles.",
        "Wear chemical-resistant gloves and protective clothing during application.",
        "Do not inhale vapors or spray mist. Wear nose filter mask.",
        "Wash thoroughly with soap and water after spraying.",
        "Avoid environmental pollution; do not wash spray equipment near water sources."
      ],
      ur: [
        "آنکھوں میں ہلکی سوزش پیدا کر سکتا ہے۔ حفاظتی عینک پہنیں۔",
        "کیمیکل ریزسٹنٹ دستانے اور حفاظتی سلیو والا لباس پہنیں۔",
        "دوا کی دھند کو سانس کے ذریعے اندر نہ لے جائیں۔ ماسک استعمال کریں۔",
        "سپرے ختم کرنے کے بعد جسم کو صابن اور پانی سے اچھی طرح دھوئیں۔",
        "ماحولیاتی آلودگی سے بچیں؛ سپرے ٹینک کو نہروں یا کنوؤں کے قریب نہ دھوئیں۔"
      ]
    },
    faqs: {
      en: [
        { q: "What diseases does Purifizin Extra target?", a: "It targets Early Blight, Late Blight, Powdery Mildew, Sheath Blight, Rust, Anthracnose, and Leaf Spot." },
        { q: "Is it a preventive or curative fungicide?", a: "It is both. It prevents spore germination when sprayed early and halts existing mycelial infections within plant tissues." },
        { q: "How does it improve crop appearance (greening effect)?", a: "Azoxystrobin slows plant aging by inhibiting ethylene production, keeping leaves green and active for longer." },
        { q: "What is the rain-fastness of Purifizin Extra?", a: "It is rapidly absorbed into plant tissues. It is rain-fast within 2 hours of drying on the leaves." },
        { q: "Can we use it on greenhouse crops?", a: "Yes, it is highly suitable for greenhouse vegetables, provided proper ventilation and dosage are maintained." },
        { q: "Is it safe for beneficial insects?", a: "It has low toxicity to non-target organisms, making it suitable for Integrated Pest Management (IPM) programs." },
        { q: "How often should I apply it?", a: "Apply every 10 to 14 days if weather conditions favor fungal development (high humidity & mild temperatures)." },
        { q: "Does it control soil-borne fungi?", a: "No, Purifizin Extra is designed for foliar application. For soil-borne fungi, seed treatment or soil drenching is recommended." }
      ],
      ur: [
        { q: "پیوریفیزن ایکسٹرا کن بیماریوں کو نشانہ بناتا ہے؟", a: "یہ آلو اور ٹماٹر کا جھلساؤ، پتوں کے دھبے، کنگی (رسٹ)، شیتھ بلائٹ اور سفوفی پھپھوند کا خاتمہ کرتا ہے۔" },
        { q: "کیا یہ بیماری آنے سے پہلے کام کرتا ہے یا بعد میں؟", a: "یہ دونوں صورتوں میں کام کرتا ہے۔ یہ بیماری پھیلنے سے پہلے روکتا ہے اور اندرونی انفیکشن کا علاج کر کے اسے ختم کرتا ہے۔" },
        { q: "یہ فصل کو سرسبز کیسے بناتا ہے؟", a: "اس میں موجود ایزوکسیسٹروبن پودے میں ایتھیلین گیس بننے کا عمل سست کرتی ہے جس سے پتے دیر تک سبز رہتے ہیں۔" },
        { q: "سپرے کے بعد بارش کا کیا اثر ہوتا ہے؟", a: "یہ پودے کے پتوں میں 2 گھنٹے کے اندر جذب ہو جاتی ہے۔ خشک ہونے کے بعد بارش سے اس کا اثر ختم نہیں ہوتا۔" },
        { q: "کیا ہم اسے ٹنل یا گرین ہاؤس میں استعمال کر سکتے ہیں؟", a: "جی ہاں، یہ سرسبز سبزیوں کے لیے بہترین ہے بشرطیکہ ہواداری اور خوراک کا خیال رکھا جائے۔" },
        { q: "کیا یہ دوست کیڑوں کے لیے نقصان دہ ہے؟", a: "یہ دوست کیڑوں کے لیے نقصان دہ نہیں ہے، اس لیے آئی پی ایم (IPM) یعنی مخلوط کاشتکاری کے لیے بہترین ہے۔" },
        { q: "پیوریفیزن کا سپرے کتنے وقفے سے کرنا چاہیے؟", a: "نمی اور بارش کے دنوں میں ہر 10 سے 14 دن کے وقفے سے سپرے کریں۔" },
        { q: "کیا یہ زمین میں موجود پھپھوند پر اثر کرتا ہے؟", a: "نہیں، یہ پتوں پر سپرے کرنے کے لیے بنائی گئی ہے۔ زمین دوز پھپھوند کے لیے بیج کا علاج یا ڈرنچنگ (جڑوں میں ڈالنا) کی جائے۔" }
      ]
    }
  },
  "aaqaab": {
    id: "aaqaab",
    genericName: {
      en: "Abamectin",
      ur: "ابامیکٹن"
    },
    pricing: [
      { size: "400ml", rate: "599", carton: "20" }
    ],
    slug: "aaqaab",
    name: {
      en: "AAQAAB",
      ur: "عقاب"
    },
    category: "insecticide",
    imageUrl: aaqaabImg,
    pngUrl: aaqaabPng,
    rating: 4.8,
    importedFormulaBadge: true,
    premiumProductBadge: true,
    researchBasedBadge: true,
    shortDesc: {
      en: "Aaqaab is a premium acaricide/insecticide that provides long-lasting control of red mites and thrips.",
      ur: "عقاب فصلوں پر سرخ جوئیں (مائٹس) اور تھرپس کے مکمل خاتمے کے لیے ایک انتہائی موثر اور جدید کیڑے مار دوا ہے۔"
    },
    seoTitle: "Aaqaab Premium Acaricide & Mite Control | Vital Agro",
    seoDescription: "Eradicate red spider mites and thrips on cotton, wheat, and vegetables with Aaqaab. Highly concentrated liquid formula for quick knockdown and control.",
    sizes: [
      { size: "250 ML", price: 1499, oldPrice: 1999, stockStatus: "In Stock", sku: "VA-AAQ-250", weight: "250g" },
      { size: "500 ML", price: 2499, oldPrice: 3299, stockStatus: "In Stock", sku: "VA-AAQ-500", weight: "500g" },
      { size: "1 Litre", price: 4499, oldPrice: 5999, stockStatus: "In Stock", sku: "VA-AAQ-1L", weight: "1kg" }
    ],
    formulation: "45% WDG",
    activeIngredient: "Emamectin Benzoate 5% + Lufenuron 40%",
    packaging: "100g, 200g, 500g",
    productCode: "VA-AQ-05",
    status: {
      en: "Advanced Lepidoptera Specialist",
      ur: "سولڈیوں کا حتمی خاتمہ"
    },
    description: {
      en: "AAQAAB is an elite-class granular insecticide specifically engineered for complete control over tough, chewing, and biting pests (Lepidoptera species). Combining Emamectin Benzoate (which disrupts chloride channel synapses in insect nerve fibers) and Lufenuron (an insect growth regulator that halts chitin synthesis during larval molting), it attacks multiple growth stages. With strong translaminar activity, AAQAAB forms a lethal deposit inside the leaf tissues, controlling hidden larvae that feed underneath. It is highly effective against Armyworms, Diamondback moths, and American bollworms.",
      ur: "عقاب ایک انتہائی طاقتور دانے دار کیڑے مار دوا ہے جو خاص طور پر چبانے اور کاٹنے والے سخت جان کیڑوں (لشکر سنڈیوں اور امریکن سنڈی) کے مکمل خاتمے کے لیے تیار کی گئی ہے۔ اس میں شامل ایما میکٹن بینزوایٹ کیڑے کے اعصابی نظام کو مفلوج کرتا ہے اور لوفینوران سنڈیوں کے چمڑا بدلنے کے عمل (کائیٹن کی تیاری) کو روکتا ہے۔ پتے میں سرایت کر جانے والی خوبی (ٹرانسلیمینار) کی بدولت، عقاب پتے کے اندر زہر کا ذخیرہ بنا لیتا ہے، جس سے نچلے حصے پر چھپی سنڈیاں بھی ختم ہو جاتی ہیں۔"
    },
    features: {
      en: [
        "Specifically targets armyworms, helicoverpa, and moth larvae",
        "Disrupts nervous system and halts larval chitin synthesis",
        "Translaminar action protects leaf top and bottom",
        "Water Dispersible Granules (WDG) dissolve cleanly",
        "Low dose rate per acre with high field efficacy"
      ],
      ur: [
        "لشکر سنڈی، چنے کی سنڈی اور گوبھی کے کیڑوں کا خاص نشانہ",
        "اعصابی نظام کو مفلوج کرنا اور سنڈی کی جلد تبدیل کرنے کا عمل روکنا",
        "پتے کے اوپر نیچے یکساں اثر کرنے والا ٹرانسلیمینار عمل",
        "پانی میں تیزی سے حل ہونے والے گرینولز (WDG)",
        "فی ایکڑ کم مقدار کے ساتھ شاندار اور دیرپا افادیت"
      ]
    },
    benefits: {
      en: [
        "Stops crop damage immediately; larvae stop feeding in 2 hours",
        "Controls egg, larva, and pupa stages of target pests",
        "Safe for crops, showing no phytotoxicity at standard doses",
        "Reduces pest recurrence due to long-lasting chitin inhibition",
        "Maintains plant yield potential by protecting early foliage"
      ],
      ur: [
        "فصل کا نقصان فوری روکتا ہے؛ سنڈیاں 2 گھنٹے میں کھانا پینا چھوڑ دیتی ہیں",
        "کیڑوں کے انڈے، لاروا اور پیوپا کے مراحل کو کنٹرول کرتا ہے",
        "فصل کے لیے بالکل محفوظ ہے اور کوئی مضر اثرات نہیں لاتا",
        "دیرپا اثر کی وجہ سے سنڈیاں دوبارہ جلدی حملہ آور نہیں ہوتیں",
        "ابتدائی پتوں کو بچا کر فصل کو بھرپور پیداوار کی بنیاد دیتا ہے"
      ]
    },
    crops: [
      { name: { en: "Cotton", ur: "کپاس" }, icon: "🌱" },
      { name: { en: "Rice", ur: "دھان" }, icon: "🌾" },
      { name: { en: "Maize", ur: "مکئی" }, icon: "🌽" },
      { name: { en: "Tomato", ur: "ٹماٹر" }, icon: "🍅" },
      { name: { en: "Vegetables", ur: "سبزیاں" }, icon: "🥦" }
    ],
    application: {
      en: "Foliar spray. Dissolve the granules in a small quantity of water to make a slurry first, then add to the spray tank filled with water. Apply at early larval stages. Ensure complete leaf coverage.",
      ur: "بذریعہ فولیر سپرے۔ پہلے دانے دار دوا کو تھوڑے پانی میں ملا کر گاڑھا محلول بنائیں، پھر اسے اسپرے ٹینک میں ڈالیں۔ سنڈیوں کے ابتدائی حملے پر سپرے کریں۔ پتوں کو اچھی طرح تر کریں۔"
    },
    dosageTable: [
      {
        crop: { en: "Cotton", ur: "کپاس" },
        dosage: { en: "100-120 g / Acre", ur: "100-120 گرام فی ایکڑ" },
        water: { en: "120 Liters", ur: "120 لیٹر" },
        timing: { en: "At initial bollworm infestation detection", ur: "سنڈیوں کا ابتدائی حملہ نظر آتے ہی" },
        frequency: { en: "1-2 applications", ur: "1 سے 2 سپرے" }
      },
      {
        crop: { en: "Maize", ur: "مکئی" },
        dosage: { en: "120 g / Acre", ur: "120 گرام فی ایکڑ" },
        water: { en: "120-150 Liters", ur: "120-150 لیٹر" },
        timing: { en: "Upon spotting fall armyworm damage", ur: "فال آرمی ورم کا حملہ ظاہر ہونے پر" },
        frequency: { en: "2 applications (10 days apart)", ur: "2 بار سپرے (10 دن کے وقفے سے)" }
      },
      {
        crop: { en: "Tomato & Cauliflower", ur: "ٹماٹر اور گوبھی" },
        dosage: { en: "100 g / Acre", ur: "100 گرام فی ایکڑ" },
        water: { en: "100 Liters", ur: "100 لیٹر" },
        timing: { en: "Early larval activity stages", ur: "سنڈیوں کی ابتدائی سرگرمی کے وقت" },
        frequency: { en: "Repeat spray after 12 days if needed", ur: "ضرورت پڑنے پر 12 دن بعد سپرے دہرائیں" }
      }
    ],
    specs: {
      type: { en: "Translaminar Granular Insecticide", ur: "ٹرانسلیمینار دانے دار کیڑے مار دوا" },
      formulation: { en: "WDG (Water Dispersible Granules)", ur: "ڈبلیو ڈی جی (پانی میں حل پذیر دانے دار)" },
      composition: { en: "Emamectin Benzoate 5% + Lufenuron 40%", ur: "ایما میکٹن بینزوایٹ 5% + لوفینوران 40%" },
      appearance: { en: "Light brown cylindrical granules", ur: "ہلکے بھورے سلنڈر نما دانے" },
      storage: { en: "Store in original container under 30°C in dry ventilated area", ur: "اصل پیکنگ میں 30 ڈگری سے نیچے خشک اور ہوادار جگہ پر رکھیں" },
      shelfLife: { en: "2 Years", ur: "2 سال" },
      packing: { en: "100g, 200g, 500g Alu-Laminated Pouches", ur: "100g، 200g، 500g ایلومینیم پاؤچ" },
      compatibility: { en: "Do not mix with highly acidic chemical sprays.", ur: "زیادہ تیزابی دواؤں کے ساتھ مکس نہ کریں۔" }
    },
    safety: {
      en: [
        "Wear chemical mask and protective clothing. Avoid skin contact.",
        "Larval feeding stops fast, but death occurs in 24-48 hours. Be patient.",
        "Highly toxic to aquatic organisms. Do not contaminate water channels.",
        "Store locked up, out of reach of children and feed.",
        "Empty pouches should be destroyed and buried safely."
      ],
      ur: [
        "کیمیکل ماسک اور حفاظتی کپڑے پہنیں۔ جلد پر گرنے سے بچیں۔",
        "سنڈیوں کا کھانا فوراً بند ہوتا ہے لیکن موت 24-48 گھنٹے میں ہوتی ہے۔ صبر رکھیں۔",
        "آبی حیات کے لیے انتہائی زہریلا ہے۔ پانی کی نالیوں کو آلودہ نہ کریں۔",
        "تالا لگا کر بچوں اور جانوروں کے چارے سے دور رکھیں۔",
        "خالی لفافوں کو پھاڑ کر زمین میں محفوظ طریقے سے دفن کریں۔"
      ]
    },
    faqs: {
      en: [
        { q: "What is AAQAAB and what pests does it control?", a: "AAQAAB is a combination granular insecticide. It excels at controlling armyworms, fall armyworms, Helicoverpa, and other destructive moth caterpillars." },
        { q: "How does the Lufenuron component work?", a: "Lufenuron is an Insect Growth Regulator (IGR). It inhibits chitin synthesis, preventing larvae from forming skin and molting to the next stage, causing them to die." },
        { q: "Why do larvae stay on the leaf after spraying AAQAAB?", a: "The Emamectin component paralyzes the insect's muscles. They stop eating in 2 hours, but it may take 24-48 hours for them to fall off and die." },
        { q: "Is AAQAAB rain-fast?", a: "Yes. Due to its translaminar properties, the active ingredients penetrate the leaf surface within 2 hours, making it highly rain-fast." },
        { q: "What is the shelf life of the granules?", a: "AAQAAB has a shelf life of 2 years when stored in its original sealed aluminum pouch in dry conditions." },
        { q: "Can it be used on Rice against leaf folders?", a: "Yes. AAQAAB is highly effective against Rice Leaf Folder and Stem Borer caterpillars." },
        { q: "Does it kill adult moths?", a: "No. It primarily targets larvae and acts as an ovicide (prevents insect eggs from hatching)." },
        { q: "What is WDG formulation?", a: "WDG stands for Water Dispersible Granules. These are solid granules that dissolve quickly in water without producing dusty powders, making them safer for the applicator." }
      ],
      ur: [
        { q: "عقاب کیا ہے اور یہ کن کیڑوں پر قابو پاتا ہے؟", a: "عقاب دو طاقتور ادویات کا مجموعہ ہے۔ یہ لشکر سنڈی، فال آرمی ورم، گلابی سنڈی اور پتوں کو چبانے والی تمام سنڈیوں کو ختم کرتا ہے۔" },
        { q: "اس میں شامل لوفینوران کیسے کام کرتی ہے؟", a: "لوفینوران کیڑوں کی نشوونما روکتا ہے۔ یہ سنڈیوں کی چمڑی (جلد) بننے کا عمل روکتا ہے جس سے وہ اگلی نسل میں منتقل نہیں ہو پاتیں اور مر جاتی ہیں۔" },
        { q: "سپرے کے بعد سنڈیاں پتے پر ہی کیوں چپکی رہتی ہیں؟", a: "اس میں شامل ایما میکٹن سنڈی کے پٹھوں کو مفلوج کر دیتا ہے۔ وہ 2 گھنٹے میں کھانا پینا چھوڑ دیتی ہیں، لیکن مکمل مرنے اور گرنے میں 24 سے 48 گھنٹے لگ سکتے ہیں۔" },
        { q: "کیا عقاب بارش سے محفوظ رہتا ہے؟", a: "جی ہاں۔ پتے کے اندر سرایت کرنے کی وجہ سے یہ 2 گھنٹے میں محفوظ ہو جاتا ہے اور بارش سے نہیں دھلتا۔" },
        { q: "دانے دار پیکٹ کی میعاد کتنی ہوتی ہے؟", a: "اصل پیکنگ میں نمی سے بچا کر رکھنے پر عقاب کی شیلف لائف 2 سال ہے۔" },
        { q: "کیا اسے چاول کے پتا لپیٹ کیڑے پر استعمال کیا جا سکتا ہے؟", a: "جی ہاں۔ یہ دھان کی پتا لپیٹ سنڈی اور تنے کے بورر کے خلاف انتہائی موثر دوا ہے۔" },
        { q: "کیا یہ اڑنے والے پروانوں (بالغ کیڑے) کو مارتا ہے؟", a: "نہیں۔ یہ بنیادی طور پر سنڈیوں کو ہلاک کرتا ہے اور کیڑوں کے انڈوں کو ضائع کرتا ہے تاکہ وہ اگلی نسل نہ بڑھا سکیں۔" },
        { q: "ڈبلیو ڈی جی (WDG) فارمولیشن کیا ہے؟", a: "ڈبلیو ڈی جی کا مطلب پانی میں حل پذیر گرینولز (دانے) ہیں۔ یہ دانے پانی میں ڈالنے پر مٹی کی طرح گھل جاتے ہیں اور سپرے کے دوران دھول نہیں اڑتی۔" }
      ]
    }
  },
  "dr-pp": {
    id: "dr-pp",
    genericName: {
      en: "Emamectin + Lufenuron",
      ur: "ایمامیکٹن + لو فینوران"
    },
    pricing: [
      { size: "200ml", rate: "310", carton: "40" },
      { size: "400ml", rate: "499", carton: "20" },
      { size: "1 Liter", rate: "1099", carton: "12" }
    ],
    slug: "dr-pp",
    name: {
      en: "Dr. PP",
      ur: "ڈاکٹر پی پی"
    },
    category: "plant_nutrition",
    imageUrl: drPpImg,
    pngUrl: drPpPng,
    rating: 4.9,
    importedFormulaBadge: true,
    premiumProductBadge: true,
    researchBasedBadge: true,
    shortDesc: {
      en: "Dr. pp offers ultimate protection against armyworms and lepidopteran pests in cotton, maize, and vegetables.",
      ur: "ڈاکٹر پی پی فصلوں پر لشکر سنڈی، چتکبری سنڈی اور دیگر سنڈیوں کے خلاف موثر اور فوری اثر دکھاتا ہے۔"
    },
    seoTitle: "Dr. pp Lepidopteran Insecticide | Vital Agro",
    seoDescription: "Control fall armyworm and fruit borer infestation in field crops and vegetables with Dr. pp. Dual systemic contact action formula. Shop or request quote.",
    sizes: [
      { size: "200 ML", price: 999, oldPrice: 1299, stockStatus: "In Stock", sku: "VA-DPP-200", weight: "200g" },
      { size: "400 ML", price: 1899, oldPrice: 2499, stockStatus: "In Stock", sku: "VA-DPP-400", weight: "400g" },
      { size: "1 Litre", price: 3999, oldPrice: 4999, stockStatus: "Low Stock", sku: "VA-DPP-1L", weight: "1kg" }
    ],
    formulation: "Chelated Liquid",
    activeIngredient: "Amino Acids + Multi-Chelated Trace Elements + Plant Hormones",
    packaging: "250ml, 500ml, 1L",
    productCode: "VA-DP-06",
    status: {
      en: "Elite Stress Relieving Formula",
      ur: "تناؤ سے نجات کا ضامن فارمولا"
    },
    description: {
      en: "Dr. PP is a high-performance physiological activator and crop stress reliever formulated for instant revitalization of stressed plants. Rich in multi-chelated zinc, iron, manganese, copper, boron, and free amino acids, it acts as a tonic that restores metabolic function. When crops face environmental shock (such as extreme heat, frost, water logging, salinity, or herbicide toxicity), Dr. PP triggers internal recovery mechanisms, prompting the plant to synthesize proteins and rebuild damaged cells swiftly.",
      ur: "ڈاکٹر پی پی پودوں کے اعصابی تناؤ کو دور کرنے اور ان کی جسمانی توانائی بحال کرنے کا ایک جدید فارمولا ہے۔ یہ چیلیٹڈ زنک، آئرن، میگنیز، تانبے، بوران اور امینو ایسڈز سے بھرپور ہے جو پودے کے خلیوں کے میٹابولک عمل کو بحال کرتے ہیں۔ جب بھی فصل شدید گرمی، کورے، سیلاب، کلر یا جڑی بوٹی مار زہروں کے اثرات کی وجہ سے پیلی ہو کر رک جاتی ہے، تو ڈاکٹر پی پی اس کے اندرونی نظام کو متحرک کر کے پروٹین بنانے اور خلیوں کو دوبارہ صحت مند کرنے کا عمل شروع کرتا ہے۔"
    },
    features: {
      en: [
        "Contains highly active L-alpha amino acids",
        "Instantly cures nutritional deficiencies (Zinc, Iron, Boron)",
        "Relieves herbicide-induced burning and stunting within 3 days",
        "Optimizes cellular water retention during drought",
        "Stimulates metabolic enzyme synthesis in crops"
      ],
      ur: [
        "انتہائی فعال ایل-الفا امینو ایسڈز پر مشتمل",
        "زنک، لوہے اور بوران کی کمی کو فوری دور کرنے کی صلاحیت",
        "جڑی بوٹی مار دوا کے جلن اور پیلاہٹ کے اثرات کو 3 دن میں ختم کرنا",
        "خشک سالی کے دوران خلیوں میں پانی کا توازن برقرار رکھنا",
        "پودے کے اندرونی خامروں (انزائمز) کو سرگرم کرنا"
      ]
    },
    benefits: {
      en: [
        "Triggers rapid greening and crop recovery from chemical shocks",
        "Promotes strong budding, flowering, and branching",
        "Increases crop resilience against temperature fluctuations",
        "Ensures nutrient uptake from the soil is fully activated",
        "Improves crop yield and aesthetic quality of produce"
      ],
      ur: [
        "زہروں کے جھٹکے سے متاثرہ فصل کو فوری ہرا بھرا کرتا ہے",
        "نئی کونپلیں نکالنے، پھول آنے اور شاخیں بنانے میں مدد دیتا ہے",
        "درجہ حرارت کے اتار چڑھاؤ کے خلاف فصل میں قوت برداشت پیدا کرتا ہے",
        "زمین سے کھادوں کی جڑوں تک رسائی کو آسان بناتا ہے",
        "فصل کی پیداوار اور پھل کے ظاہری معیار کو شاندار بناتا ہے"
      ]
    },
    crops: [
      { name: { en: "Cotton", ur: "کپاس" }, icon: "🌱" },
      { name: { en: "Rice", ur: "دھان" }, icon: "🌾" },
      { name: { en: "Wheat", ur: "گندم" }, icon: "🌾" },
      { name: { en: "Chilli", ur: "مرچ" }, icon: "🌶️" },
      { name: { en: "Tomato", ur: "ٹماٹر" }, icon: "🍅" },
      { name: { en: "Fruits", ur: "پھل" }, icon: "🍎" }
    ],
    application: {
      en: "Foliar spray. Dilute the recommended amount in water and spray on crop canopy. For chemical-stressed crops, apply as soon as stunting or burning symptoms appear. Safe to mix with neutral fungicides.",
      ur: "بذریعہ فولیر سپرے۔ تجویز کردہ مقدار کو پانی میں حل کر کے فصل پر سپرے کریں۔ زہر سے متاثرہ فصل پر پیلاہٹ ظاہر ہوتے ہی سپرے کریں۔ عام فنگس کش دواؤں کے ساتھ ملا کر سپرے کیا جا سکتا ہے۔"
    },
    dosageTable: [
      {
        crop: { en: "Cotton & Wheat", ur: "کپاس اور گندم" },
        dosage: { en: "250-300 ml / Acre", ur: "250-300 ملی لیٹر فی ایکڑ" },
        water: { en: "100-120 Liters", ur: "100-120 لیٹر" },
        timing: { en: "At stress onset or flowering stage", ur: "دباؤ آنے کی صورت میں یا پھول آنے پر" },
        frequency: { en: "1-2 applications", ur: "1 سے 2 سپرے" }
      },
      {
        crop: { en: "Vegetables (Tomato, Chilli)", ur: "سبزیاں (ٹماٹر، مرچ)" },
        dosage: { en: "250 ml / Acre", ur: "250 ملی لیٹر فی ایکڑ" },
        water: { en: "100 Liters", ur: "100 لیٹر" },
        timing: { en: "15 days after transplanting & pre-bloom", ur: "منتقلی کے 15 دن بعد اور پھول آنے پر" },
        frequency: { en: "Every 2 weeks", ur: "ہر 2 ہفتے بعد" }
      },
      {
        crop: { en: "Citrus & Mango", ur: "ترشاوہ پھل اور آم" },
        dosage: { en: "2 ml / Liter water", ur: "2 ملی لیٹر فی لیٹر پانی" },
        water: { en: "Thorough spray on canopy", ur: "پودوں کو اچھی طرح تر کریں" },
        timing: { en: "New flush & fruit development", ur: "نئے پتے نکلنے اور پھل بننے کے وقت" },
        frequency: { en: "3 applications per year", ur: "سال میں 3 بار" }
      }
    ],
    specs: {
      type: { en: "Plant Physiology Activator & Micronutrients", ur: "فزیولوجیکل ایکٹیویٹر اور مائیکرو نیوٹرینٹس" },
      formulation: { en: "Soluble Liquid Concentrate", ur: "مائع کنسنٹریٹ" },
      composition: { en: "Free Amino Acids 8% + Chelated Zn 2.5% + Fe 1.5% + Mn 1% + Boron 0.5%", ur: "آزاد امینو ایسڈز 8% + چیلیٹڈ زنک 2.5% + لوہا 1.5% + میگنیز 1% + بوران 0.5%" },
      appearance: { en: "Deep green clear liquid", ur: "گہرا سبز شفاف مائع" },
      storage: { en: "Store in cool, dry place. Keep from freezing. Keep under 35°C", ur: "ٹھنڈی اور خشک جگہ پر رکھیں۔ جمنے نہ دیں۔ 35 ڈگری سے نیچے رکھیں" },
      shelfLife: { en: "3 Years", ur: "3 سال" },
      packing: { en: "250ml, 500ml, 1 Liter Bottles", ur: "250ml، 500ml، 1 لیٹر بوتلیں" },
      compatibility: { en: "Compatible with most pesticides. Do not mix with sulfur, mineral oils, or alkaline products.", ur: "زیادہ تر ادویات کے ساتھ ہم آہنگ ہے۔ گندھک، معدنی تیل یا الکلائن مصنوعات کے ساتھ مکس نہ کریں۔" }
    },
    safety: {
      en: [
        "Wash hands and exposed skin with soap and water after handling.",
        "Wear chemical mask and protective gloves during application.",
        "Avoid contact with eyes; in case of contact, rinse with plenty of water.",
        "Keep away from children and direct heat sources.",
        "Do not reuse bottle; dispose of container safely."
      ],
      ur: [
        "استعمال کے بعد صابن اور پانی سے ہاتھ اور منہ اچھی طرح دھوئیں۔",
        "سپرے کے دوران ماسک اور دستانے استعمال کریں۔",
        "آنکھوں کے رابطے سے بچیں؛ اگر دوا آنکھ میں چلی جائے تو پانی سے خوب دھوئیں۔",
        "بچوں اور براہِ راست حرارت کے ذرائع سے دور رکھیں۔",
        "بوتل دوبارہ استعمال نہ کریں؛ اسے محفوظ طریقے سے تلف کریں۔"
      ]
    },
    faqs: {
      en: [
        { q: "What is Dr. PP used for?", a: "Dr. PP is a bio-stimulant used to relieve crops from environmental stresses (drought, frost, salinity) and pesticide shocks, restoring normal plant growth." },
        { q: "How do amino acids help plants recover from stress?", a: "Amino acids are the building blocks of proteins. During stress, plants stop making them. Dr. PP provides ready-to-use amino acids so the plant can rebuild itself immediately." },
        { q: "Can Dr. PP cure herbicide injury?", a: "Yes. If a herbicide accidentally burns or stunts a crop, spraying Dr. PP within 48 hours will speed up recovery and vegetative growth." },
        { q: "Is Dr. PP a fertilizer?", a: "It is a micro-nutrient fertilizer and bio-stimulant. It contains essential micro-elements (Iron, Zinc, Boron, Manganese) chelated with organic acids." },
        { q: "How many times should we spray Dr. PP?", a: "Typically, 1 to 2 sprays are sufficient for stress recovery. For regular yield boosting, spray every 15 days during vegetative growth." },
        { q: "What is the mixing compatibility of Dr. PP?", a: "It mixes well with most neutral inputs. Do not mix it with copper-based fungicides, sulfur, or thick mineral oils." },
        { q: "Can we use it on nursery plants?", a: "Yes. It is highly safe and beneficial for nursery seedlings, stimulating early root development." },
        { q: "Does Dr. PP cause toxicity at high doses?", a: "It is very safe, but sticking to the recommended dosage ensures optimal physiological response without wasting nutrients." }
      ],
      ur: [
        { q: "ڈاکٹر پی پی کس لیے استعمال ہوتا ہے؟", a: "ڈاکٹر پی پی ایک بائیو سٹیمولینٹ ہے جو فصل کو شدید گرمی، خشک سالی، کلر اور ادویات کے مضر اثرات سے بچا کر دوبارہ بڑھوتری شروع کراتا ہے۔" },
        { q: "امینو ایسڈز پودے کو تناؤ سے کیسے نکالتے ہیں؟", a: "امینو ایسڈز پروٹین بنانے کا بنیادی جزو ہیں۔ تناؤ کے وقت پودا خود امینو ایسڈ نہیں بنا پاتا۔ ڈاکٹر پی پی براہِ راست امینو ایسڈز دے کر پودے کو فوری بحال کرتا ہے۔" },
        { q: "کیا ڈاکٹر پی پی جڑی بوٹی مار دوا کے جھٹکے کو دور کر سکتا ہے؟", a: "جی ہاں۔ اگر کسی دوا سے فصل پیلی ہو گئی ہو یا رک گئی ہو، تو 48 گھنٹے کے اندر ڈاکٹر پی پی کا سپرے فصل کو دوبارہ ہرا بھرا کر دیتا ہے۔" },
        { q: "کیا ڈاکٹر پی پی کھاد ہے؟", a: "یہ ایک مائیکرو نیوٹرینٹ کھاد اور طاقتور ٹانک ہے۔ اس میں لوہا، زنک، بوران اور میگنیز شامل ہیں جو پودے کو تندرست رکھتے ہیں۔" },
        { q: "ہمیں ڈاکٹر پی پی کے کتنے سپرے کرنے چاہئیں؟", a: "دباؤ سے نجات کے لیے 1 سے 2 سپرے کافی ہیں۔ فصل کی اچھی پیداوار کے لیے بڑھوتری کے دوران ہر 15 دن بعد سپرے کریں۔" },
        { q: "ڈاکٹر پی پی کو کن ادویات کے ساتھ نہیں ملانا چاہیے؟", a: "اسے کاپر فنگس کش ادویات، گندھک (سلفر) اور تیل والے محلول کے ساتھ مکس نہ کریں۔" },
        { q: "کیا ہم اسے پودوں کی نرسری پر استعمال کر سکتے ہیں؟", a: "جی ہاں۔ یہ نرسری کے چھوٹے پودوں کے لیے انتہائی محفوظ ہے اور ان کی جڑیں مضبوط کرتا ہے۔" },
        { q: "کیا زیادہ مقدار میں سپرے کرنے سے کوئی نقصان ہوتا ہے؟", a: "یہ پودے کے لیے محفوظ ہے، لیکن بہترین نتائج اور بچت کے لیے تجویز کردہ مقدار کے مطابق سپرے کرنا ہی مناسب ہے۔" }
      ]
    }
  },
  "vac-zinc": {
    id: "vac-zinc",
    genericName: {
      en: "Zinc",
      ur: "زنک"
    },
    pricing: [
      { size: "10 Liter", rate: "6650", carton: "1" },
      { size: "20 Liter", rate: "12999", carton: "1" }
    ],
    slug: "vac-zinc",
    name: {
      en: "VAC Zinc",
      ur: "وی اے سی زنک"
    },
    category: "plant_nutrition",
    imageUrl: vacZincImg,
    pngUrl: vacZincPng,
    rating: 4.8,
    importedFormulaBadge: false,
    premiumProductBadge: true,
    researchBasedBadge: true,
    shortDesc: {
      en: "Vac Zinc is a highly concentrated zinc supplement to resolve zinc deficiencies and boost grain filling.",
      ur: "ویک زنک پودوں میں زنک کی کمی کو پورا کرنے اور دانوں کی بھرائی کو یقینی بنانے کے لیے بہترین مائع زنک ہے۔"
    },
    seoTitle: "Vac Zinc Highly Concentrated Supplement | Vital Agro",
    seoDescription: "Boost crop yield, enzymatic activity, and root health with Vac Zinc liquid supplement. Formulated for paddy rice, maize, and wheat. Shop local or buy online.",
    sizes: [
      { size: "3 Litre", price: 899, oldPrice: 1199, stockStatus: "In Stock", sku: "VA-VZ-3L", weight: "3kg" },
      { size: "20 Litre", price: 4999, oldPrice: 6499, stockStatus: "In Stock", sku: "VA-VZ-20L", weight: "20kg" }
    ],
    formulation: "12% Powder",
    activeIngredient: "Chelated Zinc (Zn-EDTA 12%)",
    packaging: "250g, 500g, 1kg",
    productCode: "VA-VZ-07",
    status: {
      en: "High Efficacy Chelated Zinc",
      ur: "چیلیٹڈ زنک پاؤڈر فارمولا"
    },
    description: {
      en: "VAC Zinc is a high-purity, fully chelated Zinc EDTA (12%) fertilizer designed for quick correction of Zinc deficiencies in crops. Zinc is a vital component of plant enzymes, playing a major role in auxin production, protein synthesis, and chlorophyll formation. In alkaline and calcareous soils common in Pakistan, soil-applied zinc often becomes locked. VAC Zinc's EDTA chelation shell prevents it from binding to soil carbonates, ensuring 100% absorption and translocation through leaves or soil drenching, resulting in rapid crop greening, starch creation, and increased grain weight.",
      ur: "وی اے سی زنک ایک اعلیٰ ترین اور خالص ترین چیلیٹڈ زنک ای ڈی ٹی اے (12٪) کھاد ہے جو فصلوں میں زنک کی کمی کو تیزی سے پورا کرتی ہے۔ زنک پودے کے انزائمز کا اہم حصہ ہے جو کلوروفل، پروٹین اور آکسن ہارمونز بنانے میں اہم ترین کردار ادا کرتا ہے۔ پاکستان کی کلراٹھی اور الکلائن زمینوں میں عام زنک فکس (مقفل) ہو جاتا ہے؛ جبکہ چیلیٹڈ زنک زمین میں ضائع نہیں ہوتا اور پتوں یا جڑوں کے ذریعے پودے کو 100٪ دستیاب ہوتا ہے، جس سے فصل کا پیلا پن دور ہوتا ہے اور دانے کا وزن بڑھتا ہے۔"
    },
    features: {
      en: [
        "100% water-soluble chelated Zinc (EDTA-Zn 12%)",
        "Prevents soil locking in alkaline and lime-rich soils",
        "Triggers chlorophyll synthesis and grain starch creation",
        "Fully systemic, enters plant tissue within 1 hour",
        "Compatible with standard liquid fertilizer mixes"
      ],
      ur: [
        "پانی میں 100٪ حل پذیر چیلیٹڈ زنک (EDTA 12%)",
        "الکلائن اور چونا دار زمینوں میں زنک کو ضائع ہونے سے بچانا",
        "کلوروفل بننے اور دانے کی بھرائی کے عمل کو تیز کرنا",
        "سسٹمک خصوصیات, سپرے کے 1 گھنٹے کے اندر جذب ہو جانا",
        "دیگر مائع کھادوں اور ادویات کے ساتھ آسانی سے مکس ہو جانا"
      ]
    },
    benefits: {
      en: [
        "Cures 'Khaira' disease in Paddy Rice effectively",
        "Promotes uniform plant height, tillering, and branching",
        "Increases leaf size and photosynthetic output",
        "Boosts final grain weight and carbohydrate contents",
        "Improves crop resistance to environmental cooling shocks"
      ],
      ur: [
        "دھان (چاول) کی فصل میں زنک کی کمی سے ہونے والی 'خیرا' بیماری کا خاتمہ کرتا ہے",
        "پودے کے قد کو یکساں رکھتا ہے اور نئی شاخیں بناتا ہے",
        "پتے کے سائز کو بڑا کر کے خوراک بنانے کی صلاحیت بڑھاتا ہے",
        "اناج کے دانوں کے وزن اور نشاستہ (کاربوہائیڈریٹس) میں اضافہ کرتا ہے",
        "سردی اور ناگہانی موسموں کے خلاف فصل کی قوت مدافعت بڑھاتا ہے"
      ]
    },
    crops: [
      { name: { en: "Rice", ur: "دھان" }, icon: "🌾" },
      { name: { en: "Cotton", ur: "کپاس" }, icon: "🌱" },
      { name: { en: "Wheat", ur: "گندم" }, icon: "🌾" },
      { name: { en: "Maize", ur: "مکئی" }, icon: "🌽" },
      { name: { en: "Citrus", ur: "ترشاوہ پھل" }, icon: "🍊" },
      { name: { en: "Potato", ur: "آلو" }, icon: "🥔" }
    ],
    application: {
      en: "Foliar spray or soil broadcasting. Dissolve the powder in clean water for spraying, or mix with dry sand/NPK fertilizer to broadcast in flooded fields during irrigation.",
      ur: "بذریعہ فولیر سپرے یا چھٹہ۔ سپرے کے لیے پاؤڈر کو صاف پانی میں حل کریں، یا چھٹہ کے لیے خشک ریت یا ڈی اے پی/یوریا کھاد کے ساتھ ملا کر پانی لگے کھیت میں ڈالیں۔"
    },
    dosageTable: [
      {
        crop: { en: "Rice (Paddy)", ur: "دھان" },
        dosage: { en: "250-300 g / Acre", ur: "250-300 گرام فی ایکڑ" },
        water: { en: "100-120 Liters (or Broadcast)", ur: "100-120 لیٹر (یا چھٹہ)" },
        timing: { en: "15-20 days after transplanting", ur: "پنیری کی منتقلی کے 15 سے 20 دن بعد" },
        frequency: { en: "1-2 applications", ur: "1 سے 2 بار" }
      },
      {
        crop: { en: "Cotton & Maize", ur: "کپاس اور مکئی" },
        dosage: { en: "200-250 g / Acre", ur: "200-250 گرام فی ایکڑ" },
        water: { en: "100 Liters", ur: "100 لیٹر" },
        timing: { en: "During early leaf development stages", ur: "پتوں کی ابتدائی بڑھوتری کے وقت" },
        frequency: { en: "1 application", ur: "1 سپرے" }
      },
      {
        crop: { en: "Citrus & Fruit Trees", ur: "ترشاوہ پھل اور درخت" },
        dosage: { en: "1-1.5 g / Liter water", ur: "1-1.5 گرام فی لیٹر پانی" },
        water: { en: "Complete coverage of leaves", ur: "پتوں کو اچھی طرح تر کریں" },
        timing: { en: "Before spring flush & fruit set", ur: "بہار کی نئی کونپلوں اور پھل بننے پر" },
        frequency: { en: "2 applications yearly", ur: "سال میں 2 بار" }
      }
    ],
    specs: {
      type: { en: "Chelated Micronutrient Powder", ur: "چیلیٹڈ مائیکرو نیوٹرینٹ پاؤڈر" },
      formulation: { en: "SP (Soluble Powder)", ur: "ایس پی (قابلِ حل پاؤڈر)" },
      composition: { en: "Zinc EDTA complex (Zn content 12%)", ur: "زنک ای ڈی ٹی اے کمپلیکس (زنک مقدار 12٪)" },
      appearance: { en: "White free-flowing crystalline powder", ur: "سفید چمکدار پاؤڈر" },
      storage: { en: "Store in dry place, protect from humidity and moisture", ur: "خشک جگہ پر رکھیں، نمی اور سلیب سے محفوظ رکھیں" },
      shelfLife: { en: "5 Years from manufacture", ur: "تیاری سے 5 سال" },
      packing: { en: "250g, 500g, 1kg Laminated Foil Packs", ur: "250g، 500g، 1kg سلور لفافے" },
      compatibility: { en: "Fully compatible with urea, NPK, and insecticides. Avoid mixing with phosphate liquids directly in concentrated form.", ur: "یوریا، این پی کے اور کیڑے مار ادویات کے ساتھ آسانی سے ملایا جا سکتا ہے۔ فاسفیٹ والے مائع کھادوں کے ساتھ براہ راست مرتکز حالت میں نہ ملائیں۔" }
    },
    safety: {
      en: [
        "Do not inhale powder dust. Wear face mask during weighing and mixing.",
        "Wash hands and face with soap and water after handling.",
        "Store in original air-tight packaging to avoid moisture absorption.",
        "Keep in dry locked cabinet away from children.",
        "Dispose of packaging safely, do not burn."
      ],
      ur: [
        "پاؤڈر کی دھول سانس میں لے جانے سے بچیں۔ تولنے اور حل کرتے وقت ماسک پہنیں۔",
        "دوا کو ہاتھ لگانے کے بعد ہاتھ اور منہ صابن سے اچھی طرح دھوئیں۔",
        "اصل لفافے میں بند رکھیں تاکہ ہوا کی نمی سے پاؤڈر خراب نہ ہو۔",
        "بچوں سے دور خشک اور مقفل جگہ پر رکھیں۔",
        "خالی پیکٹوں کو محفوظ طریقے سے تلف کریں، جلانے سے گریز کریں۔"
      ]
    },
    faqs: {
      en: [
        { q: "Why choose Chelated Zinc (EDTA) over Zinc Sulphate?", a: "Zinc sulphate gets fixed (locked) easily in alkaline soils (pH > 7.5). Chelated zinc has a protective ring that keeps it soluble and active for root or leaf absorption." },
        { q: "How does VAC Zinc cure Rice 'Khaira' disease?", a: "Rice Khaira disease is caused directly by zinc deficiency, leading to rusty brown leaves. VAC Zinc supplies instant zinc, greening the leaves within 4-5 days." },
        { q: "Can I mix VAC Zinc with DAP fertilizer?", a: "Do not mix zinc directly with concentrated DAP liquid as they react and precipitate. However, you can broadcast them separately or apply VAC Zinc as a foliar spray." },
        { q: "Is VAC Zinc fully water soluble?", a: "Yes. It dissolves completely without leaving any residues, making it perfect for drip systems and foliar spray nozzles." },
        { q: "What is the shelf life of the chelated powder?", a: "It has an excellent shelf life of 5 years, provided it is kept dry in its original packaging." },
        { q: "Can we use it on wheat during booting?", a: "Yes, spraying VAC Zinc on wheat at booting increases spike length and grain count per spike." },
        { q: "Does VAC Zinc affect soil pH?", a: "No. Since it is highly chelated and used in small quantities, it does not alter soil pH." },
        { q: "Is EDTA safe for the soil?", a: "Yes, EDTA is biodegradable over time and does not harm soil micro-flora when applied at the recommended dose." }
      ],
      ur: [
        { q: "زنک سلفیٹ کے مقابلے میں چیلیٹڈ زنک (EDTA) کیوں بہتر ہے؟", a: "عام زنک سلفیٹ الکلائن زمینوں میں جم جاتا ہے اور پودے کو نہیں ملتا۔ چیلیٹڈ زنک کے گرد حفاظتی غلاف ہوتا ہے جو اسے ضائع ہونے سے بچاتا ہے۔" },
        { q: "وی اے سی زنک چاول کی 'خیرا' بیماری کا علاج کیسے کرتا ہے؟", a: "چاول کی خیرا بیماری زنک کی کمی سے ہوتی ہے جس سے پتے بھورے ہو جائیں گے۔ یہ زنک کی کمی کو پورا کر کے 4 سے 5 دن میں پتے ہرے کرتا ہے۔" },
        { q: "کیا میں وی اے سی زنک کو ڈی اے پی کھاد کے ساتھ ملا سکتا ہوں؟", a: "ڈی اے پی اور زنک کو براہِ راست پانی میں گاڑھا مکس نہ کریں کیونکہ یہ آپس میں کیمیائی ردعمل کرتے ہیں۔ انہیں الگ الگ استعمال کریں یا زنک کا سپرے کریں۔" },
        { q: "کیا وی اے سی زنک پانی میں مکمل حل ہو جاتا ہے؟", a: "جی ہاں۔ یہ پانی میں مکمل طور پر حل ہو جاتا ہے اور سپرے والی مشین کے نوزل کو بند نہیں کرتا۔" },
        { q: "اس پاؤڈر کی میعاد کتنی ہے؟", a: "خشک جگہ پر رکھنے کی صورت میں اس کی میعاد تیاری کی تاریخ سے 5 سال ہے۔" },
        { q: "کیا گندم پر گوبھ کے وقت اس کا سپرے کیا جا سکتا ہے؟", a: "جی ہاں، گندم پر گوبھ کے وقت زنک کا سپرے سٹا لمبا کرتا ہے اور دانے موٹے اور وزنی بناتا ہے۔" },
        { q: "کیا یہ زمین کی پی ایچ (pH) کو تبدیل کرتا ہے؟", a: "نہیں۔ یہ انتہائی چیلیٹڈ ہے اور کم مقدار میں استعمال ہوتا ہے، اس لیے زمین کی پی ایچ پر کوئی اثر نہیں ڈالتا۔" },
        { q: "کیا ای ڈی ٹی اے (EDTA) زمین کے لیے محفوظ ہے؟", a: "جی ہاں، یہ زمین کے قدرتی ماحول اور جراثیموں کو نقصان نہیں پہنچاتا اور وقت کے ساتھ تحلیل ہو جاتا ہے۔" }
      ]
    }
  },
  "sector": {
    id: "sector",
    genericName: {
      en: "Crop Supplement",
      ur: "فصل کا ضامن سپلیمنٹ"
    },
    pricing: [
      { size: "4 KG", rate: "1050", carton: "1" }
    ],
    slug: "sector",
    name: {
      en: "Sector",
      ur: "سیکٹر"
    },
    category: "herbicide",
    imageUrl: sectorImg,
    pngUrl: sectorPng,
    rating: 4.7,
    importedFormulaBadge: false,
    premiumProductBadge: true,
    researchBasedBadge: true,
    shortDesc: {
      en: "Sector is a premium soil supplement rich in essential minerals for vegetative growth and soil health.",
      ur: "سیکٹر زمین کی زرخیزی بڑھانے اور فصل کو بنیادی معدنیات فراہم کرنے کے لیے ایک شاندار زمینی سپلیمنٹ ہے۔"
    },
    seoTitle: "Sector Soil Mineral Supplement | Vital Agro",
    seoDescription: "Improve soil texture, crop vigor, and nutrient uptake with Sector soil granules. Packed with rich chelated secondary and trace elements. 4KG and 8KG packs.",
    sizes: [
      { size: "4 KG", price: 1299, oldPrice: 1699, stockStatus: "In Stock", sku: "VA-SEC-4K", weight: "4kg" }
    ],
    formulation: "16% WP",
    activeIngredient: "Acetochlor 14% + Bensulfuron Methyl 2%",
    packaging: "100g, 150g, 250g",
    productCode: "VA-SEC-08",
    status: {
      en: "Selective Pre & Post Herbicide",
      ur: "چوڑی پتی اور جڑی بوٹی مار دوا"
    },
    description: {
      en: "Sector is a high-performance selective pre-emergence and early post-emergence herbicide designed for controlling broadleaf weeds and sedges in direct-seeded and transplanted rice and maize crops. By combining Acetochlor (inhibiting protein synthesis and cell division in emerging weed shoots) with Bensulfuron Methyl (blocking acetolactate synthase to halt cell division in root and shoot tips), Sector delivers complete weed control without affecting crop vigor, establishing a clean field for crop roots to grow.",
      ur: "سیکٹر ایک بہترین اور موثر سلیکٹیو پری ایمرجنس (اگنے سے پہلے) اور ارلی پوسٹ ایمرجنس جڑی بوٹی مار دوا ہے جو دھان (چاول) اور مکئی کی فصلوں میں چوڑی پتی والی جڑی بوٹیوں اور ڈیلے دار گھاس کو کنٹرول کرتی ہے۔ ایسیٹوکلور جڑی بوٹیوں کے خلیوں کی تقسیم کو روکتا ہے اور بین سلفوران میتھائل جڑی بوٹیوں کی جڑوں کی نشوونما بند کرتا ہے۔ سیکٹر کے استعمال سے جڑی بوٹیاں اگ ہی نہیں پاتیں، جس سے فصل کو بڑھنے کے لیے زیادہ جگہ، روشنی اور خوراک ملتی ہے۔"
    },
    features: {
      en: [
        "Selective action: kills weeds, safe for target crops",
        "Dual active ingredients control grasses and broadleaf weeds",
        "Prevents weed germination by forming a soil barrier",
        "Effective in both direct-seeded and transplanted rice fields",
        "Easy mix powder formulation with clean dispersion"
      ],
      ur: [
        "سلیکٹیو عمل: صرف جڑی بوٹیوں کا خاتمہ، فصل کے لیے محفوظ",
        "چوڑی پتی اور ڈیلے دار گھاس کے لیے دوہرا عمل",
        "زمین پر حفاظتی تہہ بنا کر جڑی بوٹیوں کو اگنے سے روکنا",
        "دھان کی قاد اور براہِ راست بیج والی فصل دونوں میں موثر",
        "پانی میں آسانی سے گھل جانے والا پاؤڈر فارمولا"
      ]
    },
    benefits: {
      en: [
        "Ensures zero competition from weeds during critical early growth",
        "Reduces manual labor and weeding costs significantly",
        "Controls tough weeds like Cyperus difformis and Marsilea quadrifolia",
        "Maintains soil nutrients solely for the crop's benefit",
        "Promotes maximum crop plant population and field uniform spread"
      ],
      ur: [
        "ابتدائی نازک مرحلے پر جڑی بوٹیوں کے مقابلے کو ختم کرتا ہے",
        "گوڈی کی مزدوری اور جڑی بوٹی نکالنے کے اخراجات بچاتا ہے",
        "سخت جان ڈیلے، گھاس اور چوڑے پتے والی جڑی بوٹیوں کا تدارک کرتا ہے",
        "زمین کی پوری کھاد اور طاقت صرف فصل کو ملنے دیتا ہے",
        "فصل کے پودوں کی تعداد پوری رکھتا ہے اور یکساں بڑھوتری دیتا ہے"
      ]
    },
    crops: [
      { name: { en: "Rice (Transplanted)", ur: "دھان (قاد)" }, icon: "🌾" },
      { name: { en: "Rice (Direct Seeded)", ur: "دھان (براہِ راست)" }, icon: "🌾" },
      { name: { en: "Maize", ur: "مکئی" }, icon: "🌽" }
    ],
    application: {
      en: "Ensure fields are leveled. Apply within 3 to 7 days of transplanting rice. The field soil must have standing water (2-3 inches deep) for 4-5 days after application to maintain the chemical barrier. Do not drain.",
      ur: "کھیت کا ہموار ہونا ضروری ہے۔ دھان کی منتقلی کے 3 سے 7 دن کے اندر استعمال کریں۔ استعمال کے بعد کھیت میں 2 سے 3 انچ کھڑا پانی 4 سے 5 دن تک برقرار رکھیں تاکہ جڑی بوٹیوں کو اگنے سے روکا جا سکے۔ پانی نہ نکالیں۔"
    },
    dosageTable: [
      {
        crop: { en: "Transplanted Rice", ur: "دھان (قاد)" },
        dosage: { en: "150 g / Acre", ur: "150 گرام فی ایکڑ" },
        water: { en: "Mixed with dry sand / broadcast", ur: "خشک ریت کے ساتھ ملا کر چھٹہ کریں" },
        timing: { en: "3-7 days after transplanting", ur: "پنیری کی منتقلی کے 3 سے 7 دن کے اندر" },
        frequency: { en: "1 application per crop cycle", ur: "ہر فصل پر صرف 1 بار استعمال" }
      },
      {
        crop: { en: "Direct-Seeded Rice", ur: "براہِ راست کاشتہ دھان" },
        dosage: { en: "150 g / Acre", ur: "150 گرام فی ایکڑ" },
        water: { en: "100-120 Liters (Spray)", ur: "100-120 لیٹر پانی (سپرے)" },
        timing: { en: "Before weed emergence (pre-emergence)", ur: "جڑی بوٹی اگنے سے پہلے (پری ایمرجنس)" },
        frequency: { en: "1 application", ur: "1 سپرے" }
      }
    ],
    specs: {
      type: { en: "Selective Pre-Emergence Herbicide", ur: "سلیکٹیو جڑی بوٹی مار دوا" },
      formulation: { en: "WP (Wettable Powder)", ur: "ڈبلیو پی (قابلِ تر پاؤڈر)" },
      composition: { en: "Acetochlor 14% + Bensulfuron Methyl 2%", ur: "ایسیٹوکلور 14% + بین سلفوران میتھائل 2%" },
      appearance: { en: "Fine white to light grey powder", ur: "سفید یا ہلکا مٹیالا پاؤڈر" },
      storage: { en: "Store locked away from food, seeds and child access under 30°C", ur: "بچوں، بیجوں اور خوراک سے دور تالے والی خشک جگہ پر 30 ڈگری سے نیچے رکھیں" },
      shelfLife: { en: "2 Years", ur: "2 سال" },
      packing: { en: "100g, 150g Pouches", ur: "100g، 150g پاؤچ" },
      compatibility: { en: "Do not mix with liquid insecticides or foliar fertilizers. Apply independently.", ur: "مائع کیڑے مار ادویات یا اسپرے والی کھادوں کے ساتھ نہ ملائیں۔ الگ استعمال کریں۔" }
    },
    safety: {
      en: [
        "Extremely harmful if swallowed. Wear safety rubber boots and gloves.",
        "Ensure no water flows into adjacent crops after application.",
        "Do not inhale powder dust. Wear face mask during application.",
        "Toxic to fish; keep away from active ponds and aquaculture channels.",
        "Wash application clothes separately after spray."
      ],
      ur: [
        "نگلنے کی صورت میں انتہائی نقصان دہ ہے۔ ربڑ کے بوٹ اور دستانے پہنیں۔",
        "دوا کے بعد کھیت کا پانی ہمسایہ فصلوں کی طرف نہ جانے دیں۔",
        "پاؤڈر کی دھول سے بچیں۔ استعمال کے وقت چہرے پر ماسک لگائیں۔",
        "مچھلیوں کے لیے زہریلا ہے؛ تالابوں اور نہروں کے قریب استعمال سے گریز کریں۔",
        "استعمال کے بعد کپڑوں کو الگ سے اچھی طرح دھو لیں۔"
      ]
    },
    faqs: {
      en: [
        { q: "How does Sector selective herbicide work?", a: "Sector targets enzymes unique to emerging weeds. It creates a chemical layer on the soil surface that kills weeds as they try to germinate, leaving the rice crop unharmed." },
        { q: "Why is standing water necessary after using Sector?", a: "Standing water (2-3 inches) holds the herbicide molecules in a uniform layer across the soil, preventing weeds from penetrating through. Keeping water for 4-5 days is critical." },
        { q: "What happens if the field dries out too early?", a: "If the soil dries, the herbicide barrier breaks, allowing weeds to germinate and grow. Water management is key to success." },
        { q: "Can I use Sector on cotton or wheat?", a: "No. Sector is a highly selective herbicide formulated strictly for Rice and Maize. Applying it to wheat or cotton will cause severe crop damage." },
        { q: "What weeds does it control?", a: "It controls broadleaf weeds (like Ghandi Booti, Sanji) and sedges (like Deela/Cyperus) in paddy fields." },
        { q: "What is the formulation type WP?", a: "WP stands for Wettable Powder. It is a dry powder formulation that disperses easily in water to form a stable suspension for spraying or broadcasting." },
        { q: "How many days after transplanting should it be applied?", a: "Apply between 3 to 7 days after transplanting rice. Applying too late (after weeds have grown) reduces its efficacy." },
        { q: "Is it safe to touch the powder directly?", a: "No, always wear protective rubber gloves and wash hands thoroughly with soap if contact occurs." }
      ],
      ur: [
        { q: "سیکٹر جڑی بوٹی مار دوا کیسے کام کرتی ہے؟", a: "سیکٹر زمین کی سطح پر ایک کیمیائی تہہ بنا دیتا ہے۔ جب جڑی بوٹیاں اگنے کی کوشش کرتی ہیں تو وہ اس زہر کو جذب کر کے مر جاتی ہیں، جبکہ دھان کی فصل محفوظ رہتی ہے۔" },
        { q: "سیکٹر کے استعمال کے بعد کھیت میں پانی کھڑا رکھنا کیوں ضروری ہے؟", a: "2 سے 3 انچ پانی کھڑا رکھنے سے دوا زمین پر یکساں پھیلی رہتی ہے۔ اگر پانی سوکھ جائے تو جڑی بوٹیاں اگ سکتی ہیں۔ اس لیے 4 سے 5 دن پانی کھڑا رکھیں۔" },
        { q: "اگر کھیت جلدی سوکھ جائے تو کیا ہوگا؟", a: "اگر پانی جلدی سوکھ گیا تو دوا کا اثر کمزور ہو جائے گا اور جڑی بوٹیاں اگ آئیں گی۔ پانی کا انتظام اس دوا کی کامیابی کی چابی ہے۔" },
        { q: "کیا میں سیکٹر کو کپاس یا گندم پر استعمال کر سکتا ہوں؟", a: "ہرگز نہیں! سیکٹر صرف دھان اور مکئی کے لیے مخصوص ہے۔ کپاس یا گندم پر استعمال کرنے سے فصل تباہ ہو سکتی ہے۔" },
        { q: "یہ کن جڑی بوٹیوں کو ختم کرتا ہے؟", a: "یہ چوڑی پتی والی جڑی بوٹیوں (جیسے غنڈی بوٹی) اور ڈیلے دار گھاس (ڈیلا) کا مکمل خاتمہ کرتا ہے۔" },
        { q: "ڈبلیو پی (WP) فارمولیشن سے کیا مراد ہے؟", a: "ڈبلیو پی کا مطلب ویٹیبل پاؤڈر (قابلِ حل پاؤڈر) ہے۔ یہ ایسا پاؤڈر ہے جو پانی میں ڈالنے پر مائع مکسچر بن جاتا ہے جسے سپرے یا ریت میں ملا کر چھٹہ کیا جا سکتا ہے۔" },
        { q: "منتقلی کے کتنے دن بعد اسے ڈالنا چاہیے؟", a: "پنیری منتقل کرنے کے 3 سے 7 دن کے اندر ڈالیں۔ جڑی بوٹیاں بڑی ہونے کے بعد ڈالنے سے رزلٹ نہیں ملتا۔" },
        { q: "کیا پاؤڈر کو براہ راست ہاتھ لگا سکتے ہیں؟", a: "نہیں، ہمیشہ ربڑ کے دستانے پہنیں اور ہاتھ پر لگنے کی صورت میں فوراً صابن سے دھو لیں۔" }
      ]
    }
  },
  "output": {
    id: "output",
    genericName: {
      en: "Potassium Humate / Humic Acid",
      ur: "پوٹاشیم ہیومیٹ / ہیومک ایسڈ"
    },
    pricing: [
      { size: "1 KG", rate: "699", carton: "1" },
      { size: "25 KG", rate: "15230", carton: "1" }
    ],
    slug: "output",
    name: {
      en: "Output",
      ur: "آؤٹ پٹ"
    },
    category: "plant_nutrition",
    imageUrl: outputImg,
    pngUrl: outputPng,
    rating: 4.8,
    importedFormulaBadge: false,
    premiumProductBadge: true,
    researchBasedBadge: true,
    shortDesc: {
      en: "Output Humic Acid stimulates soil biological activity, improves root mass, and enhances fertilizer efficiency.",
      ur: "آؤٹ پٹ ہیومک ایسڈ زمین کے نامیاتی مادے کو بڑھاتا ہے، جڑوں کو وسعت دیتا ہے اور کھادوں کی کارکردگی کو بہتر بناتا ہے۔"
    },
    seoTitle: "Output Humic Acid Soil Granules | Vital Agro",
    seoDescription: "Increase root volume and NPK absorption efficiency. Output organic humic acid stimulates soil microbes, unlocks phosphate, and builds crop resilience.",
    sizes: [
      { size: "1 KG", price: 899, oldPrice: 1199, stockStatus: "In Stock", sku: "VA-OUT-1K", weight: "1kg" },
      { size: "25 KG", price: 17999, oldPrice: 21999, stockStatus: "In Stock", sku: "VA-OUT-25K", weight: "25kg" }
    ],
    formulation: "PK Liquid Concentrate",
    activeIngredient: "Phosphorus + Potassium + Boron",
    packaging: "250ml, 500ml, 1L",
    productCode: "VA-OUT-09",
    status: {
      en: "Elite Fruiting & Flowering Catalyst",
      ur: "پیداوار اور پھل بڑھانے والا مائع"
    },
    description: {
      en: "Output is a premium physiological enhancer and fruit-sizing optimizer containing highly concentrated, bio-available Phosphorus, Potassium, and Boron. Formulated specifically for the reproductive stages of crops, Output stimulates flower initiation, enhances pollen tube elongation (preventing flower drop), accelerates starch translocation to tubers/grains, and builds crop cellular strength. Highly recommended for potatoes, citrus, mangoes, and vegetable crops to achieve premium market-grade sizes, uniform color, and maximum yield weight.",
      ur: "آؤٹ پٹ پودوں کے پھل بننے اور سائز بڑھانے کا ایک اعلیٰ درجے کا فارمولا ہے جس میں فاسفورس، پوٹاشیم اور بوران کی زیادہ مقدار شامل ہے۔ یہ فصل کے تولیدی مرحلے (پھول اور پھل بننے کے وقت) پر استعمال کیا جاتا ہے، جس سے پھول گرنے کا عمل رکتا ہے، نشاستہ پتے سے دانے اور پھل کی طرف تیزی سے منتقل ہوتا ہے اور پودے کے خلیات مضبوط ہوتے ہیں۔ آلو، ٹماٹر، مرچ، آم اور مالٹے کی فصل کے لیے انتہائی موزوں ہے تاکہ چمکدار رنگ، بڑا سائز اور وزنی پیداوار حاصل کی جا سکے۔"
    },
    features: {
      en: [
        "Highly concentrated bio-active Phosphorus and Potassium",
        "Enriched with Boron to optimize pollination and fruit set",
        "Promotes fast translocation of sugars to fruits and grains",
        "Improves crop shell hardness and storage shelf life",
        "Quickly absorbed foliar formulation, leaves no leaf stains"
      ],
      ur: [
        "فوری اثر کرنے والے فاسفورس اور پوٹاشیم کا بھرپور مرکب",
        "بہتر پولینیشن اور پھل بننے کے لیے بوران سے آراستہ",
        "شکر اور نشاستے کو پتے سے پھل اور دانے کی طرف تیزی سے منتقل کرنا",
        "پھل کے چھلکے کی مضبوطی اور اسٹوریج کی مدت کو بڑھانا",
        "پتوں کے ذریعے تیزی سے جذب ہونا، پتے پر داغ نہ بنانا"
      ]
    },
    benefits: {
      en: [
        "Prevents flower shedding in vegetables and fruit orchards",
        "Increases potato tuber size and starch content",
        "Improves sweetness (Brix index) and coloring of fruits",
        "Boosts final crop harvest weight by up to 20%",
        "Strengthens crop stalks, preventing lodging in windy conditions"
      ],
      ur: [
        "سبزیوں اور باغات میں پھول گرنے کے عمل کو روکتا ہے",
        "آلو کے سائز (کپڑے) کو بڑا کرتا ہے اور نشاستہ بڑھاتا ہے",
        "پھل کی مٹھاس، چمک اور رنگت کو شاندار بناتا ہے",
        "فصل کی حتمی پیداوار کے وزن میں 20 فیصد تک اضافہ کرتا ہے",
        "پودے کے تنے کو مضبوط کر کے تیز ہوا میں فصل گرنے (لاجنگ) سے بچاتا ہے"
      ]
    },
    crops: [
      { name: { en: "Potato", ur: "آلو" }, icon: "🥔" },
      { name: { en: "Citrus", ur: "ترشاوہ پھل" }, icon: "🍊" },
      { name: { en: "Mango", ur: "آم" }, icon: "🥭" },
      { name: { en: "Tomato", ur: "ٹماٹر" }, icon: "🍅" },
      { name: { en: "Chilli", ur: "مرچ" }, icon: "🌶️" },
      { name: { en: "Rice", ur: "دھان" }, icon: "🌾" }
    ],
    application: {
      en: "Foliar spray. Start spraying at the pre-flowering stage, repeat during fruit formation and sizing. Dilute in clean water. Avoid mixing directly with thick oils or highly acidic chemicals.",
      ur: "بذریعہ فولیر سپرے۔ پھول آنے سے پہلے سپرے شروع کریں، اور پھل بننے و سائز بڑھنے کے دوران دوبارہ کریں۔ صاف پانی میں حل کریں۔ تیزابی ادویات یا گاڑھے تیل والے محلول کے ساتھ براہِ راست مکس نہ کریں۔"
    },
    dosageTable: [
      {
        crop: { en: "Potato", ur: "آلو" },
        dosage: { en: "500-800 ml / Acre", ur: "500-800 ملی لیٹر فی ایکڑ" },
        water: { en: "100-120 Liters", ur: "100-120 لیٹر" },
        timing: { en: "Tuber initiation & sizing stage", ur: "آلو کے بننے اور سائز بڑھنے کے دوران" },
        frequency: { en: "2 applications (12 days apart)", ur: "2 بار سپرے (12 دن کے وقفے سے)" }
      },
      {
        crop: { en: "Citrus & Mango", ur: "ترشاوہ پھل اور آم" },
        dosage: { en: "2.5 ml / Liter water", ur: "2.5 ملی لیٹر فی لیٹر پانی" },
        water: { en: "Thorough spray on canopy", ur: "پودوں کو اچھی طرح تر کریں" },
        timing: { en: "At fruit setting & sizing stages", ur: "پھل بننے اور سائز بڑھنے کے مرحلے پر" },
        frequency: { en: "3 applications", ur: "3 بار سپرے" }
      },
      {
        crop: { en: "Tomato & Chilli", ur: "ٹماٹر اور مرچ" },
        dosage: { en: "300-400 ml / Acre", ur: "300-400 ملی لیٹر فی ایکڑ" },
        water: { en: "100 Liters", ur: "100 لیٹر" },
        timing: { en: "Pre-flowering & fruit set", ur: "پھول آنے سے پہلے اور پھل بننے پر" },
        frequency: { en: "Every 10-12 days", ur: "ہر 10 سے 12 دن بعد" }
      }
    ],
    specs: {
      type: { en: "Fruiting and Sizing Liquid Booster", ur: "پھل بڑھانے والا مائع بوسٹر" },
      formulation: { en: "Soluble Concentrate (Liquid)", ur: "قابلِ حل مائع کنسنٹریٹ" },
      composition: { en: "Phosphorus (P2O5) 20% + Potassium (K2O) 30% + Boron 1%", ur: "فاسفورس (P2O5) 20% + پوٹاشیم (K2O) 30% + بوران 1%" },
      appearance: { en: "Viscous transparent pale liquid", ur: "گاڑھا شفاف پیلا مائع" },
      storage: { en: "Store in cool dry ventilated warehouse under 35°C", ur: "ٹھنڈے اور ہوادار گودام میں 35 ڈگری سے نیچے رکھیں" },
      shelfLife: { en: "3 Years", ur: "3 سال" },
      packing: { en: "250ml, 500ml, 1 Liter Bottles", ur: "250ml، 500ml، 1 لیٹر بوتلیں" },
      compatibility: { en: "Highly compatible with NPK foliar feeds. Avoid mixing with calcium liquids directly.", ur: "این پی کے سپرے کے ساتھ ہم آہنگ ہے۔ کیلشیم والے مائع کے ساتھ مکس نہ کریں۔" }
    },
    safety: {
      en: [
        "Wear rubber gloves and mask during spray preparation.",
        "Wash face and hands with soap and water after application.",
        "In case of contact with eyes, flush with water immediately.",
        "Store tightly closed in its original container away from food.",
        "Keep away from children and farm animals."
      ],
      ur: [
        "سپرے کی تیاری کے دوران ربڑ کے دستانے اور ماسک پہنیں۔",
        "استعمال کے بعد چہرہ اور ہاتھ صابن اور پانی سے دھو لیں۔",
        "آنکھوں میں جانے کی صورت میں فوراً پانی سے آنکھیں دھوئیں۔",
        "اصل بوتل میں بند رکھ کر خوراک سے دور اسٹور کریں۔",
        "بچوں اور پالتو جانوروں سے دور رکھیں۔"
      ]
    },
    faqs: {
      en: [
        { q: "What is Output and how does it help crops?", a: "Output is a concentrated PK (Phosphorus & Potassium) liquid booster enriched with Boron. It accelerates flowering, prevents flower drop, and increases fruit weight." },
        { q: "Why is Boron included in Output?", a: "Boron is critical for pollen tube growth, which ensures complete pollination and prevents flowers from falling off without setting fruit." },
        { q: "When should I spray Output on potatoes?", a: "Spray at tuber initiation (when tiny potatoes start forming) and repeat 12-15 days later to boost sizing and potato weight." },
        { q: "Can Output be mixed with insecticides?", a: "Yes, it is highly compatible with most common crop protection sprays. Always check compatibility with a jar test first." },
        { q: "Does it help crop quality in Citrus?", a: "Yes, the Potassium in Output increases juice content, peel shine, and fruit size in citrus fruits." },
        { q: "What is the benefit of liquid PK over granular potash?", a: "Liquid foliar PK is absorbed immediately through leaves, delivering nutrients within hours during critical flowering stages, whereas soil granules take weeks to dissolve." },
        { q: "How many sprays are recommended for mangoes?", a: "We recommend 3 sprays: at pre-flowering (bud stage), fruit setting (pea size), and during fruit development." },
        { q: "Can Output burn crop leaves?", a: "No, it is formulated with organic complexes, making it highly safe for leaves when sprayed at the recommended dosage." }
      ],
      ur: [
        { q: "آؤٹ پٹ کیا ہے اور یہ فصل کی کیسے مدد کرتا ہے؟", a: "آؤٹ پٹ فاسفورس، پوٹاشیم اور بوران کا طاقتور مائع مرکب ہے۔ یہ پھول لانے، پھول گرنے سے روکنے اور پھل کا وزن بڑھانے میں مدد کرتا ہے۔" },
        { q: "آؤٹ پٹ میں بوران کیوں شامل کیا گیا ہے؟", a: "بوران پولینیشن (نر اور مادہ ملاپ) کے عمل کو کامیاب بناتا ہے جس سے پھول گرنے سے بچتے ہیں اور پھل بنتا ہے۔" },
        { q: "آلو پر آؤٹ پٹ کب سپرے کرنا چاہیے؟", a: "جب آلو بننا شروع ہوں (ٹیوبر انیشیشن) تب سپرے کریں اور 12 سے 15 دن بعد دہرائیں تاکہ آلو کا سائز موٹا ہو۔" },
        { q: "کیا آؤٹ پٹ کو کیڑے مار دوا کے ساتھ ملا سکتے ہیں؟", a: "جی ہاں۔ یہ زیادہ تر سپرے کے ساتھ ہم آہنگ ہے۔ استعمال سے پہلے چھوٹا ٹیسٹ کر لیں۔" },
        { q: "کیا یہ مالٹے کے باغات کے لیے فائدہ مند ہے؟", a: "جی ہاں، اس میں موجود پوٹاشیم مالٹے کا رس، چھلکے کی چمک اور پھل کا سائز بڑھاتا ہے۔" },
        { q: "عام کھادوں کے مقابلے میں مائع پوٹاشیم کا کیا فائدہ ہے؟", a: "پتوں پر سپرے کرنے سے یہ چند گھنٹوں میں جذب ہو کر فوری اثر دکھاتا ہے، جبکہ زمین میں ڈالی گئی کھاد حل ہونے میں ہفتے لیتی ہے۔" },
        { q: "آم کے باغات کے لیے کتنے سپرے تجویز کیے گئے ہیں؟", a: "3 سپرے تجویز کیے گئے ہیں: بور آنے پر، پھل بننے کے وقت (مٹر کے دانے جتنا) اور پھل کے بڑھنے کے دوران۔" },
        { q: "کیا آؤٹ پٹ سپرے سے پتے جھلس سکتے ہیں؟", a: "نہیں، یہ پودے کے لیے انتہائی محفوظ طریقے سے تیار کیا گیا ہے اور پتے نہیں جلاتا۔" }
      ]
    }
  },
  "super-4g": {
    id: "super-4g",
    genericName: {
      en: "Chlorantraniliprole + Thiamethoxam",
      ur: "کلورینٹرانیلی پرول + تھایامیتھوکسام"
    },
    pricing: [
      { size: "8 KG", rate: "1250", carton: "4" }
    ],
    slug: "super-4g",
    name: {
      en: "Super 4G",
      ur: "سوپر فور جی"
    },
    category: "insecticide",
    imageUrl: super4gImg,
    pngUrl: super4gPng,
    rating: 4.9,
    importedFormulaBadge: true,
    premiumProductBadge: true,
    researchBasedBadge: true,
    shortDesc: {
      en: "Super 4G is a soil-applied systemic granular insecticide for controlling stem borers in rice and sugarcane.",
      ur: "سوپر فور جی دھان اور کماد میں تنے کی سنڈی اور ڈیڈ ہارٹ کی روک تھام کے لیے ایک دانے دار سسٹمک دوا ہے۔"
    },
    seoTitle: "Super 4G Granular Stem Borer Control | Vital Agro",
    seoDescription: "Stop stem borer attack and dead hearts in rice paddy and sugarcane. Super 4G granular systemic insecticide. Safe for earthworms. Broadcast with urea.",
    sizes: [
      { size: "4 KG", price: 1999, oldPrice: 2499, stockStatus: "In Stock", sku: "VA-S4G-4K", weight: "4kg" },
      { size: "8 KG", price: 3499, oldPrice: 4499, stockStatus: "In Stock", sku: "VA-S4G-8K", weight: "8kg" }
    ],
    formulation: "4% Granular",
    activeIngredient: "Cartap Hydrochloride 4%",
    packaging: "4kg, 8kg Bags",
    productCode: "VA-S4G-10",
    status: {
      en: "Soil Granular Protection Elite",
      ur: "دانے دار مٹی کا محافظ زہر"
    },
    description: {
      en: "Super 4G is a premium soil-applied granular systemic insecticide containing Cartap Hydrochloride (4%). Specifically formulated to protect cereal crops like rice, maize, and sugarcane from soil pests, stem borers, and root feeders, it works through root absorption. Upon application, the crop roots absorb the chemical, translocating it throughout the plant tissues. This systemic barrier paralyses chewing larvae that attempt to bore into the stem, protecting early-stage crop establishment and tillering.",
      ur: "سوپر فور جی مٹی میں استعمال ہونے والا ایک بہترین اور دیرپا سسٹمک دانے دار کیڑے مار زہر ہے جس میں کارٹاپ ہائیڈروکلورائڈ (4٪) شامل ہے۔ یہ خاص طور پر چاول (دھان)، مکئی اور کماد کی فصلوں کو تنے کی سوراخ کرنے والی سنڈیوں (بوررز) اور جڑ کھانے والے کیڑوں سے بچانے کے لیے تیار کیا گیا ہے۔ چھٹہ کرنے پر پودے کی جڑیں زہر کو جذب کر کے پورے پودے کے تنے اور پتوں تک پہنچاتی ہیں، جس سے اندرونی سنڈیاں مفلوج ہو کر ہلاک ہو جاتی ہیں اور فصل کا تلا محفوظ رہتا ہے۔"
    },
    features: {
      en: [
        "Soil-applied systemic protection via root absorption",
        "Controls stem borers, shoot borers, and root grubs",
        "Slow-release granules ensure long residual activity (20+ days)",
        "Excellent crop safety; does not impact root micro-flora",
        "Uniform granule size allows easy broadcasting"
      ],
      ur: [
        "جڑوں کے ذریعے جذب ہونے والا سسٹمک زمینی تحفظ",
        "تنے کی سنڈیوں، گوبھ کے کیڑوں اور زمینی سنڈیوں کا کنٹرول",
        "دیر تک اثر رکھنے والے دانے (20 سے زائد دن تک اثر)",
        "فصل کے لیے مکمل محفوظ، جڑوں کی نشوونما میں رکاوٹ نہیں بنتا",
        "یکساں دانے دار سائز جس کا چھٹہ کرنا آسان ہے"
      ]
    },
    benefits: {
      en: [
        "Prevents 'Dead Hearts' in Rice and Sugarcane crops",
        "Supports maximum tillering and shoot proliferation",
        "Reduces foliar spray requirement during early growth",
        "Stabilizes yield potential by protecting early seedlings",
        "Highly cost-effective soil application method"
      ],
      ur: [
        "دھان اور کماد میں گوبھ کی سوکھنے (ڈیڈ ہارٹ) کی بیماری کو روکتا ہے",
        "فصل کے شگوفے بنانے اور پھیلاؤ میں بھرپور مدد کرتا ہے",
        "ابتدائی بڑھوتری کے دوران پتوں پر سپرے کرنے کی ضرورت کم کرتا ہے",
        "ابتدائی پودوں کو بچا کر فی ایکڑ پیداوار کی ضمانت دیتا ہے",
        "مٹی میں استعمال کا انتہائی سستا اور آسان طریقہ ہے"
      ]
    },
    crops: [
      { name: { en: "Rice", ur: "دھان" }, icon: "🌾" },
      { name: { en: "Sugarcane", ur: "کماد" }, icon: "🎋" },
      { name: { en: "Maize", ur: "مکئی" }, icon: "🌽" }
    ],
    application: {
      en: "Soil broadcast. Broadcast the granules uniformly in the field. For Rice, ensure standing water (1-2 inches) is present during and for 3-4 days after application to allow root uptake. Can be mixed with urea.",
      ur: "بذریعہ چھٹہ۔ دانے دار دوا کو پورے کھیت میں یکساں چھٹہ کریں۔ دھان کی فصل کے لیے چھٹہ کرتے وقت اور اس کے بعد 3 سے 4 دن تک 1 سے 2 انچ پانی کھڑا رکھیں تاکہ جڑیں دوا جذب کر سکیں۔ یوریا کھاد کے ساتھ ملا کر بھی ڈالا جا سکتا ہے۔"
    },
    dosageTable: [
      {
        crop: { en: "Rice (Paddy)", ur: "دھان" },
        dosage: { en: "4 kg / Acre", ur: "4 کلوگرام فی ایکڑ" },
        water: { en: "Broadcast in standing water", ur: "کھڑے پانی میں چھٹہ کریں" },
        timing: { en: "25-35 days after transplanting", ur: "پنیری کی منتقلی کے 25 سے 35 دن بعد" },
        frequency: { en: "1-2 applications per season", ur: "ہر سیزن میں 1 سے 2 بار" }
      },
      {
        crop: { en: "Sugarcane", ur: "کماد" },
        dosage: { en: "8 kg / Acre", ur: "8 کلوگرام فی ایکڑ" },
        water: { en: "Broadcast around root zone & irrigate", ur: "جڑوں کے قریب چھٹہ کریں اور پانی دیں" },
        timing: { en: "At sowing or shoot development stage", ur: "کاشت کے وقت یا کونپلیں نکلتے وقت" },
        frequency: { en: "1 application", ur: "1 بار" }
      },
      {
        crop: { en: "Maize", ur: "مکئی" },
        dosage: { en: "4.5 kg / Acre", ur: "4.5 کلوگرام فی ایکڑ" },
        water: { en: "Whorl application or broadcast", ur: "پودے کی گوبھ میں ڈالیں یا چھٹہ کریں" },
        timing: { en: "20-30 days after sowing", ur: "کاشت کے 20 سے 30 دن بعد" },
        frequency: { en: "1 application", ur: "1 بار" }
      }
    ],
    specs: {
      type: { en: "Soil Systemic Insecticide", ur: "زمینی سسٹمک کیڑے مار دوا" },
      formulation: { en: "G (Granules)", ur: "جی (دانے دار)" },
      composition: { en: "Cartap Hydrochloride 4% w/w", ur: "کارٹاپ ہائیڈروکلورائڈ 4%" },
      appearance: { en: "Spherical greyish-blue granules", ur: "گول مٹیالے نیلے دانے" },
      storage: { en: "Store dry, away from sun, under lock and key below 30°C", ur: "دھوپ سے دور، خشک اور مقفل جگہ پر 30 ڈگری سے نیچے سٹور کریں" },
      shelfLife: { en: "2 Years", ur: "2 سال" },
      packing: { en: "4kg, 8kg Woven Poly Bags", ur: "4 کلو، 8 کلو بیگ" },
      compatibility: { en: "Can be mixed with dry fertilizers (Urea, DAP). Do not mix with wet chemical sprays.", ur: "خشک کھادوں (یوریا، ڈی اے پی) کے ساتھ ملا سکتے ہیں۔ مائع سپرے کے ساتھ مکس نہ کریں۔" }
    },
    safety: {
      en: [
        "Do not touch granules with bare hands. Wear protective gloves.",
        "Wash legs, feet, and hands thoroughly after broadcasting.",
        "Keep domestic animals away from treated field water for 4 days.",
        "Do not reuse empty plastic bags; burn or destroy safely.",
        "Toxic to fish; prevent runoff into fishing channels."
      ],
      ur: [
        "ننگے ہاتھوں سے دانوں کو نہ چھوئیں۔ حفاظتی دستانے پہنیں۔",
        "چھٹہ دینے کے بعد ٹانگوں، پاؤں اور ہاتھوں کو صابن سے اچھی طرح دھوئیں۔",
        "پالتو جانوروں کو 4 دن تک کھیت کے کھڑے پانی سے دور رکھیں۔",
        "خالی توڑوں کو دوبارہ استعمال نہ کریں؛ جلا کر تلف کریں۔",
        "مچھلیوں کے لیے زہریلا ہے؛ پانی ندی نالوں میں نہ جانے دیں۔"
      ]
    },
    faqs: {
      en: [
        { q: "What is Super 4G and how is it applied?", a: "Super 4G is a systemic granular insecticide. It is broadcast directly onto the soil or standing water, where it is absorbed by crop roots." },
        { q: "How does Cartap Hydrochloride kill stem borers?", a: "Cartap blocks the synaptic receptors in the nervous system of insects. When borer larvae chew the borer-affected stems containing Cartap, they get paralyzed and die." },
        { q: "Why is water key to Super 4G efficacy in Rice?", a: "Standing water dissolves the granules, releasing the active ingredient into the soil root zone so the plant can absorb it. Dry soil will not absorb the chemical." },
        { q: "What are 'Dead Hearts'?", a: "Dead Heart is a condition in rice or sugarcane where stem borer larvae chew the inner core, causing the central leaf shoot to dry up and die." },
        { q: "Can we mix Super 4G with Urea fertilizer?", a: "Yes. Mixing Super 4G granules with Urea fertilizer during broadcasting is a common and safe practice." },
        { q: "How long does a single soil application protect the crop?", a: "It provides systemic protection for about 20 to 25 days after application." },
        { q: "Is it safe for earthworms in the soil?", a: "Yes. At recommended doses, it is safe for beneficial earthworms and does not harm soil texture." },
        { q: "Does Super 4G control whiteflies?", a: "No. It is a soil granular insecticide designed primarily for boring and soil pests, not for foliar sucking pests like whitefly." }
      ],
      ur: [
        { q: "سوپر فور جی کیا ہے اور اسے کیسے استعمال کیا جاتا ہے؟", a: "سوپر فور جی ایک سسٹمک دانے دار دوا ہے۔ اسے براہ راست مٹی یا کھڑے پانی میں چھٹہ کیا جاتا ہے، جہاں سے جڑیں اسے چوس لیتی ہیں۔" },
        { q: "کارٹاپ ہائیڈروکلورائڈ تنے کی سنڈیوں کو کیسے مارتا ہے؟", a: "یہ کیڑوں کے اعصابی نظام کو بلاک کر دیتا ہے۔ جب سنڈیاں تنے کے اندر کھاتی ہیں تو زہر ان کے اندر جا کر انہیں مفلوج کر کے مار دیتا ہے۔" },
        { q: "چاول میں سپرے کے بجائے کھڑا پانی کیوں ضروری ہے؟", a: "پانی دانوں کو گھولتا ہے جس سے زہر جڑوں کے قریب پہنچتا ہے۔ خشک مٹی میں دوا پودے تک نہیں پہنچ پاتی  ہے۔" },
        { q: "ڈیڈ ہارٹ (Dead Heart) کیا ہوتا ہے؟", a: "تنے کی سنڈی جب اندرونی تنے کو کھاتی ہے تو پودے کی درمیانی گوبھ سوکھ کر مر جاتی ہے، اسے ڈیڈ ہارٹ کہتے ہیں۔" },
        { q: "کیا سوپر فور جی کو یوریا کھاد کے ساتھ ملا سکتے ہیں؟", a: "جی ہاں۔ چھٹہ کرتے وقت سوپر فور جی کے دانوں کو یوریا کے ساتھ ملانا بالکل محفوظ اور عام طریقہ ہے۔" },
        { q: "ایک بار ڈالنے سے کتنے دنوں تک اثر رہتا ہے؟", a: "مٹی میں ڈالنے کے بعد یہ تقریباً 20 سے 25 دنوں تک فصل کو محفوظ رکھتا ہے۔" },
        { q: "کیا یہ مٹی کے کینچووں (دوست کیڑوں) کے لیے نقصان دہ ہے؟", a: "نہیں۔ تجویز کردہ مقدار کے مطابق استعمال سے یہ کینچووں اور مٹی کی قدرتی زرخیزی کو نقصان نہیں پہنچاتا۔" },
        { q: "کیا یہ سفید مکھی پر اثر کرتا ہے؟", a: "نہیں۔ یہ مٹی میں ڈالنے والی دوا ہے جو تنے کے اندر رہنے والے کیڑوں کے لیے ہے، یہ سفید مکھی جیسے اڑنے والے کیڑوں پر اثر نہیں کرتی۔" }
      ]
    }
  },
  "farbasin": {
    id: "farbasin",
    genericName: {
      en: "Dimethmorph + Mancozeb",
      ur: "ڈائی میتھومورف + مینکوزیب"
    },
    pricing: [
      { size: "250g", rate: "850", carton: "40" },
      { size: "25 KG", rate: "71000", carton: "1" }
    ],
    slug: "farbasin",
    name: {
      en: "Farbasin",
      ur: "فار بیسن"
    },
    category: "fungicide",
    imageUrl: farbasinImg,
    pngUrl: farbasinPng,
    rating: 4.8,
    importedFormulaBadge: true,
    premiumProductBadge: true,
    researchBasedBadge: true,
    shortDesc: {
      en: "Farbasin is a systemic fungicide powder designed to cure powdery mildew, leaf spot, and rice blast.",
      ur: "فار بیسن پاؤڈر فصلوں کو سفوفی پھپھوند، پتوں کے دھبے اور بلاسٹ کی بیماریوں سے طویل تحفظ فراہم کرتا ہے۔"
    },
    seoTitle: "Farbasin Carbendazim Systemic Fungicide | Vital Agro",
    seoDescription: "Cure mango anthracnose, powdery mildew, and paddy rice blast. Farbasin 50% WP systemic fungicide powder dissolves completely. Highly cost effective.",
    sizes: [
      { size: "250 G", price: 999, oldPrice: 1299, stockStatus: "In Stock", sku: "VA-FAR-250", weight: "250g" },
      { size: "500 G", price: 1799, oldPrice: 2299, stockStatus: "In Stock", sku: "VA-FAR-500", weight: "500g" },
      { size: "1 KG", price: 3299, oldPrice: 4299, stockStatus: "Low Stock", sku: "VA-FAR-1K", weight: "1kg" }
    ],
    formulation: "50% WP",
    activeIngredient: "Carbendazim 50%",
    packaging: "250g, 500g",
    productCode: "VA-FAR-11",
    status: {
      en: "Elite Systemic Fungicidal Powder",
      ur: "موثر ترین سسٹمک فنگس کش دوا"
    },
    description: {
      en: "Farbasin is a highly popular and effective broad-spectrum systemic fungicide containing Carbendazim (50% WP). It acts by inhibiting the development of fungal germ tubes and mycelia growth during cell division. Farbasin is absorbed through the green parts of the plant and roots, moving systemically through the vascular tissues. It provides exceptional preventive and curative control against Blast, Leaf Spots, Sheath Blight, Powdery Mildew, and Anthracnose in Rice, Mango, Citrus, and Vegetable crops.",
      ur: "فار بیسن ایک مقبول اور انتہائی موثر سسٹمک فنگس کش دوا ہے جس میں کاربنڈازم (50% WP) پاؤڈر شامل ہے۔ یہ فنگس کے خلیوں کی تقسیم اور بیماری کے پھیلنے کے عمل کو روکتا ہے۔ فار بیسن پودے کے پتوں اور جڑوں کے ذریعے سرایت کر کے رگوں کے ذریعے پورے پودے میں پھیل جاتا ہے۔ یہ دھان کے بلاسٹ، پتوں کے دھبوں، جھلساؤ، آم کے باغات میں سڑاند اور سبزیوں میں پھپھوندی کی بیماریوں کو آنے سے پہلے روکتا ہے اور بعد میں ان کا خاتمہ کرتا ہے۔"
    },
    features: {
      en: [
        "Highly systemic: moves internally to protect new growth",
        "Broad-spectrum control across fruits and field crops",
        "Inhibits fungal cell mitosis (division) effectively",
        "Can be applied as foliar spray or soil drenching",
        "Fine soluble powder dissolves quickly without clogging spray nozzles"
      ],
      ur: [
        "انتہائی سسٹمک: پودے کے اندر پھیل کر نئے پتوں کو بھی بچانا",
        "باغات، اناج اور سبزیوں کے لیے یکساں موثر",
        "پھپھوند کے خلیوں کی تقسیم کے عمل کو روکنا",
        "پتوں پر سپرے اور جڑوں میں ڈرنچنگ دونوں طرح استعمال ہونا",
        "باریک گھلنے والا پاؤڈر جو سپرے کے نوزل کو چوک (بند) نہیں کرتا"
      ]
    },
    benefits: {
      en: [
        "Controls Rice Blast and Sheath Blight, safeguarding grains",
        "Prevents Anthracnose in Mangoes, ensuring black-spot-free fruits",
        "Protects nursery seedlings from damping-off when applied to soil",
        "Cost-effective disease control with long-lasting protection",
        "Maintains green leaf duration, leading to improved starch filling"
      ],
      ur: [
        "دھان (چاول) کے بلاسٹ اور جھلساؤ کا تدارک کر کے اناج بچاتا ہے",
        "آم کے کالے دھبوں کی بیماری (اینتھراکنوز) کو روکتا ہے",
        "نرسری کے پودوں کو جڑ گلنے کی بیماری (ڈیمپنگ آف) سے بچاتا ہے",
        "سستے داموں شاندار اور طویل بیماری سے تحفظ فراہم کرتا ہے",
        "پتوں کو تندرست رکھتا ہے جس سے دانے کی بھرائی بہتر ہوتی ہے"
      ]
    },
    crops: [
      { name: { en: "Rice", ur: "دھان" }, icon: "🌾" },
      { name: { en: "Mango", ur: "آم" }, icon: "🥭" },
      { name: { en: "Citrus", ur: "ترشاوہ پھل" }, icon: "🍊" },
      { name: { en: "Tomato", ur: "ٹماٹر" }, icon: "🍅" },
      { name: { en: "Pulses", ur: "دالیں" }, icon: "🌱" }
    ],
    application: {
      en: "Foliar spray or seed treatment. Spray uniformly on the crop upon first disease warning. For soil damping-off, drench the nursery beds. Ensure correct dilution in clean water.",
      ur: "بذریعہ فولیر سپرے یا بیج کا علاج۔ بیماری کی پہلی وارننگ ملتے ہی فصل پر یکساں سپرے کریں۔ نرسری کے پودوں کو بچانے کے لیے جڑوں میں ڈالیں۔ صاف پانی میں دوا کا مکسچر تیار کریں۔"
    },
    dosageTable: [
      {
        crop: { en: "Rice", ur: "دھان" },
        dosage: { en: "250 g / Acre", ur: "250 گرام فی ایکڑ" },
        water: { en: "100-120 Liters", ur: "100-120 لیٹر" },
        timing: { en: "At booting stage or blast symptoms", ur: "گوبھ کی حالت میں یا بلاسٹ ظاہر ہونے پر" },
        frequency: { en: "1-2 applications", ur: "1 سے 2 سپرے" }
      },
      {
        crop: { en: "Mango & Citrus", ur: "آم اور مالٹا" },
        dosage: { en: "1-1.5 g / Liter water", ur: "1-1.5 گرام فی لیٹر پانی" },
        water: { en: "Complete tree washing", ur: "درخت کو اچھی طرح نہلا دیں" },
        timing: { en: "During pre-flowering & post-harvest", ur: "پھول آنے سے پہلے اور پھل توڑنے کے بعد" },
        frequency: { en: "2-3 applications yearly", ur: "سال میں 2 سے 3 بار" }
      },
      {
        crop: { en: "Vegetables (Tomato, Peas)", ur: "سبزیاں (ٹماٹر، مٹر)" },
        dosage: { en: "200 g / Acre", ur: "200 گرام فی ایکڑ" },
        water: { en: "100 Liters", ur: "100 لیٹر" },
        timing: { en: "At powdery mildew or leaf spot onset", ur: "سفوفی پھپھوند یا پتوں کے دھبے نظر آنے پر" },
        frequency: { en: "Every 12 days if needed", ur: "ضرورت کے مطابق ہر 12 دن بعد" }
      }
    ],
    specs: {
      type: { en: "Systemic Fungal Treatment", ur: "سسٹمک فنگس کش دوا" },
      formulation: { en: "WP (Wettable Powder)", ur: "ڈبلیو پی (قابلِ تر پاؤڈر)" },
      composition: { en: "Carbendazim 50% w/w", ur: "کاربنڈازم 50%" },
      appearance: { en: "Fine white to off-white powder", ur: "باریک سفید پاؤڈر" },
      storage: { en: "Store in cool dry locked room away from children below 30°C", ur: "خشک اور مقفل جگہ پر بچوں سے دور 30 ڈگری سے نیچے رکھیں" },
      shelfLife: { en: "2 Years", ur: "2 سال" },
      packing: { en: "250g, 500g Bags", ur: "250g، 500g پیک" },
      compatibility: { en: "Do not mix with alkaline compounds like lime-sulphur or Bordeaux mixture.", ur: "الکلائن مرکبات (لائم سلفر یا بورڈو مکسچر) کے ساتھ نہ ملائیں۔" }
    },
    safety: {
      en: [
        "Wear rubber gloves, goggles, and face mask when handling powder.",
        "Wash clothes and spray equipment immediately after spraying.",
        "Toxic to fish; keep runoff away from fresh water channels.",
        "Store in a locked area separate from foodstuff.",
        "Do not inhale spray dust. Wash hands with soap."
      ],
      ur: [
        "پاؤڈر حل کرتے وقت ربڑ کے دستانے، عینک اور ماسک کا استعمال کریں۔",
        "سپرے کے بعد کپڑوں اور مشینری کو اچھی طرح صاف کریں۔",
        "مچھلیوں کے لیے زہریلا ہے؛ نہروں کے قریب سپرے سے گریز کریں۔",
        "کھانے پینے کی چیزوں سے دور تالے والی جگہ پر رکھیں۔",
        "دوا کی دھند سے بچیں۔ کام کے بعد ہاتھ صابن سے دھوئیں۔"
      ]
    },
    faqs: {
      en: [
        { q: "What is Farbasin used for?", a: "Farbasin is a systemic fungicide used to control blast, leaf spot, mildew, and damping-off diseases in rice, mango, citrus, and vegetables." },
        { q: "How does Carbendazim control fungi?", a: "Carbendazim prevents spindle formation during fungal cell division, halting the growth of fungal tubes and stopping the infection from spreading." },
        { q: "Can we use Farbasin as a seed treatment?", a: "Yes. Mixing Farbasin with seeds before sowing protects seedlings from early soil-borne fungal diseases." },
        { q: "Is Farbasin systemic?", a: "Yes, it is highly systemic. It is absorbed by roots and leaves and moves upward throughout the plant tissues." },
        { q: "Can we mix Farbasin with urea?", a: "Yes, Farbasin is compatible with neutral fertilizers and can be sprayed along with NPK or urea solutions." },
        { q: "What is the withholding period before harvest?", a: "We recommend stopping application at least 14 days before harvest for food crops." },
        { q: "Does Farbasin help in Mango Anthracnose?", a: "Yes. It is one of the most effective fungicides to prevent black spots on mango fruit skins." },
        { q: "How should I handle a spill?", a: "Sweep up dry powder spills carefully to avoid dust. Dispose of the collected material according to local environmental rules." }
      ],
      ur: [
        { q: "فار بیسن کس لیے استعمال ہوتی ہے؟", a: "فار بیسن ایک سسٹمک فنگس کش دوا ہے جو دھان کے بلاسٹ، آم کے اینتھراکنوز اور سبزیوں میں پتوں کے دھبوں کے علاج کے لیے استعمال ہوتی ہے۔" },
        { q: "کاربنڈازم پھپھوند کو کیسے کنٹرول کرتا ہے؟", a: "یہ فنگس کے خلیوں کی تقسیم کا عمل روکتا ہے، جس سے پھپھوند کے ریشے نہیں بڑھ پاتے اور بیماری کا خاتمہ ہو جاتا ہے۔" },
        { q: "کیا ہم فار بیسن کو بیج کے علاج (زہر لگانے) کے لیے استعمال کر سکتے ہیں؟", a: "جی ہاں۔ کاشت سے پہلے بیج کو فار بیسن لگانے سے اگنے والے پودے زمینی پھپھوند سے محفوظ رہتے ہیں۔" },
        { q: "کیا فار بیسن سسٹمک فنگس کش دوا ہے؟", a: "جی ہاں، یہ سسٹمک ہے جو جڑوں اور پتوں سے جذب ہو کر پودے کے ہر حصے تک پہنچتی ہے۔" },
        { q: "کیا فار بیسن کو یوریا کے ساتھ ملا سکتے ہیں؟", a: "جی ہاں۔ یہ عام کھادوں اور ادویات کے ساتھ ہم آہنگ ہے اور یوریا کے محلول کے ساتھ سپرے کی جا سکتی ہے۔" },
        { q: "فصل کی کٹائی سے کتنے دن پہلے سپرے بند کرنا چاہیے؟", a: "کھانے والی فصلوں پر کٹائی سے کم از کم 14 دن پہلے سپرے روک دینا چاہیے۔" },
        { q: "کیا یہ آم کے کالے دھبوں کی بیماری کے لیے موثر ہے؟", a: "جی ہاں۔ یہ آم کے پھل پر کالے دھبے بننے کی بیماری (اینتھراکنوز) کے لیے انتہائی کارآمد ہے۔" },
        { q: "اگر دوا گر جائے تو کیا کریں؟", a: "گرے ہوئے خشک پاؤڈر کو احتیاط سے جھاڑو دیں تاکہ دھول نہ اڑے، اور اسے محفوظ طریقے سے ضائع کریں۔" }
      ]
    }
  },
  
  "vac-sop": {
    id: "vac-sop",
    genericName: {
      en: "Sulphate of Potash (SOP)",
      ur: "سلفیٹ آف پوٹاش (SOP)"
    },
    pricing: [
      { size: "25 KG", rate: "3000", carton: "1" }
    ],
    slug: "vac-sop",
    name: {
      en: "VAC SOP",
      ur: "ویک ایس او پی"
    },
    category: "plant_nutrition",
    imageUrl: vacSopPng,
    pngUrl: vacSopPng,
    rating: 4.9,
    importedFormulaBadge: true,
    premiumProductBadge: true,
    researchBasedBadge: true,
    shortDesc: {
      en: "VAC SOP is a premium 100% water soluble Sulphate of Potash fertilizer. With 50% K₂O content, it provides superior potassium nutrition without harmful chloride.",
      ur: "ویک ایس او پی ایک بہترین 100٪ پانی میں حل پذیر سلفیٹ آف پوٹاش کھاد ہے۔ 50٪ پوٹاشیم (K2O) کے ساتھ، یہ نقصان دہ کلورائیڈ کے بغیر پوٹاشیم غذائیت فراہم کرتی ہے۔"
    },
    seoTitle: "VAC SOP Sulphate of Potash Fertilizer | Vital Agro",
    seoDescription: "Buy VAC SOP Sulphate of Potash fertilizer. 100% water soluble and chloride-free potassium nutrition. Boost crop yield, fruit weight, and stress tolerance.",
    sizes: [
      { size: "25 KG", price: 3999, oldPrice: 4599, stockStatus: "In Stock", sku: "VA-SOP-25KG", weight: "25kg" }
    ],
    formulation: "Potash (K₂O) + Sulphur",
    activeIngredient: "Potassium Sulphate (K2O 50% + S 17.5%)",
    packaging: "25 KG Bag",
    productCode: "VA-SOP-25KG",
    status: {
      en: "100% Water Soluble Imported SOP",
      ur: "100٪ پانی میں حل پذیر درآمد شدہ"
    },
    description: {
      en: "VAC SOP is a premium 100% water soluble Sulphate of Potash fertilizer. With 50% K₂O content, it provides superior potassium nutrition without harmful chloride. Ideal for potassium-sensitive crops and high-value agriculture.",
      ur: "ویک ایس او پی ایک بہترین 100٪ پانی میں حل پذیر سلفیٹ آف پوٹاش کھاد ہے۔ 50٪ پوٹاشیم (K2O) کے ساتھ، یہ نقصان دہ کلورائیڈ کے بغیر بہترین پوٹاشیم غذائیت فراہم کرتی ہے۔ یہ پوٹاشیم کے لیے حساس اور قیمتی فصلوں کے لیے مثالی ہے۔"
    },
    features: {
      en: [
        "100% water soluble Sulphate of Potash",
        "Free of harmful chloride elements",
        "Rich in premium sulphur (17.5% S)",
        "Quick absorption via drip & foliar",
        "Improves overall crop resilience"
      ],
      ur: [
        "100٪ پانی میں حل پذیر سلفیٹ آف پوٹاش",
        "نقصان دہ کلورائیڈ سے بالکل پاک",
        "عمدہ سلفر (17.5٪) سے بھرپور",
        "ڈرپ اور اسپرے کے لیے انتہائی موزوں",
        "فصلوں کی موسمی حالات کے خلاف مدافعت میں اضافہ"
      ]
    },
    benefits: {
      en: [
        "Enhances fruit size, color and taste",
        "Improves crop drought resistance",
        "Provides essential sulphur for protein synthesis",
        "Maximizes post-harvest shelf life",
        "Significantly increases crop yield"
      ],
      ur: [
        "پھل کا سائز، رنگ اور ذائقہ بہتر بناتا ہے",
        "خشک سالی اور گرمی کے خلاف قوت مدافعت بڑھاتا ہے",
        "پروٹین بنانے کے لیے ضروری سلفر فراہم کرتا ہے",
        "پھلوں کی سٹوریج لائف (شیلف لائف) کو طول دیتا ہے",
        "فصل کی مجموعی پیداوار میں نمایاں اضافہ کرتا ہے"
      ]
    },
    crops: [
      { name: { en: "Cotton", ur: "کپاس" }, icon: "🌱" },
      { name: { en: "Sugarcane", ur: "کماد" }, icon: "🎋" },
      { name: { en: "Vegetables", ur: "سبزیاں" }, icon: "🥦" },
      { name: { en: "Fruits", ur: "پھل" }, icon: "🍊" },
      { name: { en: "Rice", ur: "دھان" }, icon: "🌾" }
    ],
    application: {
      en: "Foliar spray or drip irrigation fertigation. Apply during crop development stages.",
      ur: "فولیر سپرے یا ڈرپ آبپاشی فرٹیگیشن۔ فصل کی بڑھوتری کے مراحل کے دوران استعمال کریں۔"
    },
    dosageTable: [
      {
        crop: { en: "All Crops", ur: "تمام فصلیں" },
        dosage: { en: "5-10 KG / Acre", ur: "5-10 کلوگرام فی ایکڑ" },
        water: { en: "Through Fertigation", ur: "بذریعہ فرٹیگیشن" },
        timing: { en: "During reproductive and sizing stages", ur: "پھل بننے اور سائز بڑھنے کے مراحل پر" },
        frequency: { en: "2-3 applications", ur: "2 سے 3 بار" }
      }
    ],
    specs: {
      type: { en: "Water Soluble SOP", ur: "پانی میں حل پذیر ایس او پی" },
      formulation: { en: "Soluble Crystalline Powder", ur: "حل پذیر کرسٹلائن پاؤڈر" },
      composition: { en: "Potash (K2O) 50% + Sulphur 17.5%", ur: "پوٹاش 50% + سلفر 17.5%" },
      appearance: { en: "White crystalline powder", ur: "سفید کرسٹلائن پاؤڈر" },
      storage: { en: "Store in cool, dry place away from humidity under 35°C", ur: "نمی سے محفوظ، ٹھنڈی اور خشک جگہ پر 35 ڈگری سے نیچے رکھیں" },
      shelfLife: { en: "3 Years", ur: "3 سال" },
      packing: { en: "25 KG Bag", ur: "25 کلوگرام بیگ" },
      compatibility: { en: "Compatible with most water soluble fertilizers. Do not mix with calcium fertilizers.", ur: "زیادہ تر حل پذیر کھادوں کے ساتھ ملایا جا سکتا ہے۔ کیلشیم کھادوں کے ساتھ نہ ملائیں۔" }
    },
    safety: {
      en: [
        "Avoid inhalation of dust.",
        "Wear gloves when applying manually.",
        "Wash hands after handling."
      ],
      ur: [
        "دھول کو سانس کے ذریعے اندر لے جانے سے بچیں۔",
        "ہاتھ سے ڈالتے وقت دستانے پہنیں۔",
        "استعمال کے بعد ہاتھ اچھی طرح دھوئیں۔"
      ]
    },
    faqs: {
      en: [
        { q: "What is the primary benefit of VAC SOP?", a: "It provides high purity potassium and sulfur without any harmful chloride, improving yields and fruit quality." }
      ],
      ur: [
        { q: "ویک ایس او پی کا بنیادی فائدہ کیا ہے؟", a: "یہ بغیر کسی نقصان دہ کلورائیڈ کے خالص پوٹاشیم اور سلفر فراہم کرتی ہے، جس سے پیداوار اور پھل کا معیار بہتر ہوتا ہے۔" }
      ]
    }
  },
  "vac-map": {
    id: "vac-map",
    genericName: {
      en: "Mono Ammonium Phosphate (MAP)",
      ur: "مونو امونیم فاسفیٹ (MAP)"
    },
    pricing: [
      { size: "25 KG", rate: "2200", carton: "1" }
    ],
    slug: "vac-map",
    name: {
      en: "VAC MAP",
      ur: "ویک میپ"
    },
    category: "plant_nutrition",
    imageUrl: vacMapPng,
    pngUrl: vacMapPng,
    rating: 4.8,
    importedFormulaBadge: true,
    premiumProductBadge: true,
    researchBasedBadge: true,
    shortDesc: {
      en: "VAC MAP is a high-grade Mono Ammonium Phosphate fertilizer with 81% phosphorus content. Imported Technical Grade quality ensures maximum solubility.",
      ur: "ویک میپ ایک اعلیٰ درجے کی مونو امونیم فاسفیٹ کھاد ہے جس میں 81٪ فاسفورس ہوتا ہے۔ درآمد شدہ ٹیکنیکل گریڈ کوالٹی مکمل حل پذیری کا ضامن ہے۔"
    },
    seoTitle: "VAC MAP Mono Ammonium Phosphate | Vital Agro",
    seoDescription: "Buy VAC MAP premium fertilizer. 12% Nitrogen and 81% Phosphorus (P2O5). Technical Grade imported from China for maximum root growth and crop yield.",
    sizes: [
      { size: "25 KG", price: 2999, oldPrice: 3499, stockStatus: "In Stock", sku: "VA-MAP-25KG", weight: "25kg" }
    ],
    formulation: "Mono Ammonium Phosphate (MAP)",
    activeIngredient: "Nitrogen (N) 12% + Phosphorus (P₂O₅) 81%",
    packaging: "25 KG Bag",
    productCode: "VA-MAP-25KG",
    status: {
      en: "Technical Grade Imported MAP",
      ur: "درآمد شدہ ٹیکنیکل گریڈ کھاد"
    },
    description: {
      en: "VAC MAP is a high-grade Mono Ammonium Phosphate fertilizer with 81% phosphorus content. Imported from China, Technical Grade quality ensures maximum solubility and crop uptake efficiency. Ideal for phosphorus-deficient soils.",
      ur: "ویک میپ ایک اعلیٰ درجے کی مونو امونیم فاسفیٹ کھاد ہے جس میں 81٪ فاسفورس ہوتا ہے۔ چین سے درآمد شدہ، ٹیکنیکل گریڈ کوالٹی مکمل حل پذیری اور فصل کی تیز ترین جذب کرنے کی صلاحیت کو یقینی بناتی ہے۔ یہ فاسفورس کی کمی والی زمینوں کے لیے بہترین ہے۔"
    },
    features: {
      en: [
        "Ultra-high phosphorus content (81% P₂O₅)",
        "Promotes vigorous root development",
        "Enhances early crop establishment",
        "Fully water soluble — fertigable",
        "Low pH helps in alkaline soil conditions"
      ],
      ur: [
        "انتہائی زیادہ فاسفورس مقدار (81% P₂O₅)",
        "جڑوں کی تیز اور بھرپور نشوونما کو فروغ دینا",
        "فصل کی ابتدائی بڑھوتری کو بہتر بنانا",
        "پانی میں 100٪ حل پذیر - فلڈ یا سپرے کے لیے موزوں",
        "کم پی ایچ (pH) کلراٹھی مٹی میں جڑوں کی مدد کرتا ہے"
      ]
    },
    benefits: {
      en: [
        "Triggers strong root structure and tillering",
        "Improves crop flowering and seed set",
        "Helps plants establish quickly after transplanting",
        "Highly efficient in alkaline Pakistani soils",
        "Technical Grade purity ensures zero residue"
      ],
      ur: [
        "مضبوط جڑیں اور زیادہ شاخیں نکالنے میں مدد کرتا ہے",
        "پھول آنے اور بیج بننے کے عمل کو بہتر بناتا ہے",
        "منتقلی کے بعد پودوں کو تیزی سے جڑ پکڑنے میں مدد دیتا ہے",
        "پاکستانی الکلائن مٹی کے لیے انتہائی موثر ہے",
        "ٹیکنیکل گریڈ خالصیت کی وجہ سے کوئی باقیات نہیں چھوڑتا"
      ]
    },
    crops: [
      { name: { en: "All Crops", ur: "تمام فصلیں" }, icon: "🌱" },
      { name: { en: "Wheat", ur: "گندم" }, icon: "🌾" },
      { name: { en: "Cotton", ur: "کپاس" }, icon: "🌱" },
      { name: { en: "Sugarcane", ur: "کماد" }, icon: "🎋" },
      { name: { en: "Vegetables", ur: "سبزیاں" }, icon: "🥦" }
    ],
    application: {
      en: "Foliar application or fertigation through drip system. Best applied during early growth and root establishment stages.",
      ur: "فولیر سپرے یا ڈرپ سسٹم کے ذریعے فرٹیگیشن۔ ابتدائی بڑھوتری اور جڑیں بننے کے مرحلے پر بہترین نتائج دیتا ہے۔"
    },
    specs: {
      type: { en: "Technical Grade Fertilizer", ur: "ٹیکنیکل گریڈ کھاد" },
      formulation: { en: "Soluble Crystals", ur: "حل پذیر کرسٹلز" },
      composition: { en: "Nitrogen 12% + P2O5 81%", ur: "نائٹروجن 12% + فاسفورس 81%" },
      appearance: { en: "White crystals", ur: "سفید کرسٹلز" },
      storage: { en: "Store in cool dry warehouse away from moisture", ur: "ٹھنڈے اور خشک گودام میں نمی سے بچا کر رکھیں" },
      shelfLife: { en: "3 Years", ur: "3 سال" },
      packing: { en: "25 KG Bag", ur: "25 کلوگرام بیگ" }
    },
    safety: {
      en: [
        "Avoid eye contact.",
        "Use safety masks when mixing.",
        "Keep away from children."
      ],
      ur: [
        "آنکھوں کے رابطے سے بچیں۔",
        "مکسنگ کے دوران حفاظتی ماسک کا استعمال کریں۔",
        "بچوں کی پہنچ سے دور رکھیں۔"
      ]
    },
    faqs: {
      en: [
        { q: "Can VAC MAP be mixed with other fertilizers?", a: "Yes, it is highly compatible with other water soluble fertilizers except those containing calcium." }
      ],
      ur: [
        { q: "کیا ویک میپ کو دوسری کھادوں کے ساتھ ملایا جا سکتا ہے؟", a: "جی ہاں، یہ کیلشیم پر مبنی کھادوں کے علاوہ دیگر تمام حل پذیر کھادوں کے ساتھ ملایا جا سکتا ہے۔" }
      ]
    }
  },
  "defeater-soil-conditioner": {
    id: "defeater-soil-conditioner",
    genericName: {
      en: "Potassium Humate Liquid",
      ur: "پوٹاشیم ہیومیٹ مائع"
    },
    pricing: [
      { size: "20 LTR", rate: "3480", carton: "1" },
      { size: "200 LTR", rate: "32200", carton: "1" }
    ],
    slug: "defeater-soil-conditioner",
    name: {
      en: "Defeater Soil",
      ur: "ڈیفیٹر سوائل"
    },
    category: "soil_conditioner",
    imageUrl: defeaterSoilPng,
    pngUrl: defeaterSoilPng,
    rating: 4.7,
    importedFormulaBadge: false,
    premiumProductBadge: true,
    researchBasedBadge: true,
    shortDesc: {
      en: "Defeater Soil Conditioner uses advanced Exfet Technology to improve soil structure, increase microbial activity and enhance nutrient availability.",
      ur: "ڈیفیٹر سوائل کنڈیشنر مٹی کی ساخت کو بہتر بنانے، مائکروبیل سرگرمی کو بڑھانے اور غذائی اجزاء کی دستیابی کے لیے ایکسفیٹ ٹیکنالوجی کا استعمال کرتا ہے۔"
    },
    seoTitle: "Defeater Soil Conditioner | Vital Agro",
    seoDescription: "Buy Defeater Soil Conditioner with Exfet Technology. Formulated with Potassium Humate to optimize soil structure, water retention, and microbial activity.",
    sizes: [
      { size: "20 LTR", price: 3999, oldPrice: 4599, stockStatus: "In Stock", sku: "VA-DEF-SC-20L", weight: "20kg" },
      { size: "200 LTR", price: 34999, oldPrice: 38999, stockStatus: "In Stock", sku: "VA-DEF-SC-200L", weight: "200kg" }
    ],
    formulation: "Potassium Humate Liquid",
    activeIngredient: "Potassium (K₂O) 3.1% + Humic Acid 30%",
    packaging: "20 LTR, 200 LTR Cans",
    productCode: "VA-DEF-SC",
    status: {
      en: "Exfet Technology Soil Conditioner",
      ur: "ایکسفیٹ ٹیکنالوجی مٹی کنڈیشنر"
    },
    description: {
      en: "Defeater Soil Conditioner uses advanced Exfet Technology to improve soil structure, increase microbial activity and enhance nutrient availability. Potassium Humate complex revitalizes depleted soils for maximum crop performance.",
      ur: "ڈیفیٹر سوائل کنڈیشنر جدید ایکسفیٹ ٹیکنالوجی کے ذریعے زمین کی ساخت کو بہتر بناتا ہے، مفید جراثیم بڑھاتا ہے اور زمین میں موجود غذائی عناصر کو پودے کے لیے دستیاب کرتا ہے۔ یہ کمزور زمینوں کو دوبارہ زندہ کرتا ہے۔"
    },
    features: {
      en: [
        "Improves soil water retention capacity",
        "Increases cation exchange capacity (CEC)",
        "Stimulates beneficial soil microorganisms",
        "Enhances nutrient uptake efficiency",
        "Reduces soil compaction"
      ],
      ur: [
        "زمین کی پانی جذب رکھنے کی صلاحیت کو بہتر بنانا",
        "مٹی کی کیٹ آئن ایکسچینج کی صلاحیت (CEC) میں اضافہ",
        "زمین کے مفید بیکٹیریا اور جراثیم کو تیز کرنا",
        "کھادوں کے جذب ہونے کی کارکردگی کو بڑھانا",
        "زمین کی سختی اور چکناہٹ کو ختم کرنا"
      ]
    },
    benefits: {
      en: [
        "Increases fertilizer efficiency, reducing wastage",
        "Promotes massive white root development",
        "Helps crops stand healthy during drought",
        "Improves yield quality and weight",
        "Maintains soil health for future crops"
      ],
      ur: [
        "کھادوں کے ضیاع کو روکتا ہے اور ان کی کارکردگی بڑھاتا ہے",
        "جڑوں کے پھیلاؤ اور باریک سفید جڑیں بنانے میں مددگار",
        "خشک سالی کے دوران فصل کو سوکے سے بچاتا ہے",
        "اناج کے معیار اور وزن کو بہتر بناتا ہے",
        "آئندہ فصلوں کے لیے زمین کی زرخیزی کو بحال رکھتا ہے"
      ]
    },
    crops: [
      { name: { en: "Cotton", ur: "کپاس" }, icon: "🌱" },
      { name: { en: "Sugarcane", ur: "کماد" }, icon: "🎋" },
      { name: { en: "Potato", ur: "آلو" }, icon: "🥔" },
      { name: { en: "Vegetables", ur: "سبزیاں" }, icon: "🥦" },
      { name: { en: "Fruits", ur: "پھل" }, icon: "🍊" }
    ],
    application: {
      en: "Flood irrigation fertigation. Mix the recommended dose with irrigation water at the root zone.",
      ur: "آبپاشی کے پانی کے ساتھ فلڈ کریں۔ تجویز کردہ خوراک کو جڑوں تک پہنچائیں۔"
    },
    specs: {
      type: { en: "Soil Biological Conditioner", ur: "زمین کا نامیاتی کنڈیشنر" },
      formulation: { en: "Liquid Slurry Concentrate", ur: "گاڑھا مائع فارمولا" },
      composition: { en: "Potassium (K2O) 3.1% w/w + Humic Acid 30% w/w", ur: "پوٹاشیم 3.1% + ہیومک ایسڈ 30%" },
      appearance: { en: "Viscous dark brown liquid", ur: "گاڑھا گہرا بھورا مائع" },
      storage: { en: "Store in cool place under 35°C", ur: "35 ڈگری سے نیچے ٹھنڈی جگہ پر رکھیں" },
      shelfLife: { en: "3 Years", ur: "3 سال" }
    },
    safety: {
      en: [
        "Wash hands with soap after flooding.",
        "Avoid contact with eyes.",
        "Keep container sealed when not in use."
      ],
      ur: [
        "فلڈ کرنے کے بعد ہاتھ صابن سے دھوئیں۔",
        "آنکھوں میں جانے سے بچائیں۔",
        "استعمال نہ ہونے پر کین کو بند رکھیں۔"
      ]
    },
    faqs: {
      en: [
        { q: "How does Exfet Technology help?", a: "Exfet Technology enhances the penetration of humate active molecules deep into the soil profile, ensuring fast action." }
      ],
      ur: [
        { q: "ایکسفیٹ ٹیکنالوجی کیسے مدد کرتی ہے؟", a: "ایکسفیٹ ٹیکنالوجی ہیومیٹ کے فعال مالیکیولز کو مٹی کی گہرائی تک پہنچاتی ہے جس سے جڑوں کو فوری فائدہ ہوتا ہے۔" }
      ]
    }
  },
  "sonehri-potash-30": {
    id: "sonehri-potash-30",
    genericName: {
      en: "Potash 30% Liquid",
      ur: "پوٹاش 30 فیصد مائع"
    },
    pricing: [
      { size: "1 LTR", rate: "940", carton: "1" },
      { size: "3 LTR", rate: "1900", carton: "1" },
      { size: "20 LTR", rate: "11930", carton: "1" }
    ],
    slug: "sonehri-potash-30",
    name: {
      en: "Sonehri Potash",
      ur: "سنہری پوٹاش"
    },
    category: "plant_nutrition",
    imageUrl: sonehriPotashPng,
    pngUrl: sonehriPotashPng,
    rating: 4.8,
    importedFormulaBadge: false,
    premiumProductBadge: true,
    researchBasedBadge: true,
    shortDesc: {
      en: "Sonehri Potash 30% is a premium crop supplement that provides high potassium concentration. Advanced Exfet Technology ensures rapid absorption.",
      ur: "سنہری پوٹاش 30٪ ایک بہترین فصل کا سپلیمنٹ ہے جو پوٹاشیم کی زیادہ مقدار فراہم کرتا ہے۔ جدید ایکسفیٹ ٹیکنالوجی اس کے فوری جذب کو یقینی بناتی ہے۔"
    },
    seoTitle: "Sonehri Potash 30% Crop Supplement | Vital Agro",
    seoDescription: "Buy Sonehri Potash 30% online. High efficiency liquid potassium supplement enriched with microelements. Enhances fruit size, weight, and shelf life.",
    sizes: [
      { size: "1 LTR", price: 999, oldPrice: 1199, stockStatus: "In Stock", sku: "VA-SNH-30-1L", weight: "1kg" },
      { size: "3 LTR", price: 1999, oldPrice: 2299, stockStatus: "In Stock", sku: "VA-SNH-30-3L", weight: "3kg" },
      { size: "20 LTR", price: 11999, oldPrice: 13999, stockStatus: "In Stock", sku: "VA-SNH-30-20L", weight: "20kg" }
    ],
    formulation: "Liquid Fertilizer Soluble Concentrate",
    activeIngredient: "Potash (K₂O) 30% + Micro Elements",
    packaging: "1 LTR, 3 LTR, 20 LTR Cans",
    productCode: "VA-SNH-30",
    status: {
      en: "Premium Potash 30% Supplement",
      ur: "پریمیئم مائع پوٹاشیم 30٪"
    },
    description: {
      en: "Sonehri Potash 30% is a premium crop supplement that provides high potassium concentration for enhanced crop quality. Advanced Exfet Technology ensures rapid absorption and maximum yield improvement. Ideal for fertigation and foliar application.",
      ur: "سنہری پوٹاش 30٪ ایک اعلیٰ کوالٹی کا مائع پوٹاشیم سپلیمنٹ ہے جو فصل کے آخری مراحل میں پوٹاش کی ضرورت کو پورا کرتا ہے۔ جدید ایکسفیٹ ٹیکنالوجی پتوں اور جڑوں کے ذریعے فوری جذب کو یقینی بناتی ہے جس سے پھل کا سائز اور وزن بڑھتا ہے۔"
    },
    features: {
      en: [
        "30% Potash for strong fruit development",
        "Improves sugar content and quality",
        "Reduces flower and fruit drop",
        "Suitable for all fertigation systems",
        "Exfet Technology for rapid absorption"
      ],
      ur: [
        "بہترین پھل بننے کے لیے 30٪ پوٹاشیم",
        "پھلوں میں مٹھاس اور چمک کو بہتر بنانا",
        "پھول اور پھل گرنے سے روکنا",
        "تمام آبپاشی اور سپرے کے سسٹمز کے لیے موزوں",
        "فوری اثر کے لیے ایکسفیٹ ٹیکنالوجی"
      ]
    },
    benefits: {
      en: [
        "Accelerates grain filling in wheat & rice",
        "Produces uniform, bright colored fruits",
        "Improves crop defense against frost and heat",
        "Increases crop market value and grade",
        "Fully soluble, leaves no nozzle clogs"
      ],
      ur: [
        "گندم اور دھان میں دانے کی بھرائی کو تیز کرتا ہے",
        "یکساں اور چمکدار رنگ کے پھل پیدا کرتا ہے",
        "سردی اور گرمی کی لہر کے خلاف قوت مدافعت دیتا ہے",
        "کاشتکار کو منڈی میں اچھا ریٹ اور درجہ ملتا ہے",
        "پانی میں مکمل حل پذیر، نوزل بند نہیں کرتا"
      ]
    },
    crops: [
      { name: { en: "Cotton", ur: "کپاس" }, icon: "🌱" },
      { name: { en: "Sugarcane", ur: "کماد" }, icon: "🎋" },
      { name: { en: "Potato", ur: "آلو" }, icon: "🥔" },
      { name: { en: "Chilli", ur: "مرچ" }, icon: "🌶️" },
      { name: { en: "Vegetables", ur: "سبزیاں" }, icon: "🥦" }
    ],
    application: {
      en: "Foliar spray or fertigation. Best applied during fruit development and ripening stages.",
      ur: "فولیر سپرے یا پانی کے ساتھ فلڈ کریں۔ پھل بننے اور پکنے کے مراحل پر سپرے کریں۔"
    },
    specs: {
      type: { en: "Foliar & Fertigation Potash", ur: "فولیر اور فرٹیگیشن پوٹاش" },
      formulation: { en: "Soluble Liquid", ur: "حل پذیر مائع" },
      composition: { en: "Potash (K2O) 30% w/v + Trace elements", ur: "پوٹاش 30% + مائیکرو نیوٹرینٹس" },
      appearance: { en: "Golden clear liquid", ur: "سنہری شفاف مائع" },
      storage: { en: "Store below 30°C in original packaging", ur: "30 ڈگری سے نیچے اصل پیکنگ میں رکھیں" }
    },
    safety: {
      en: [
        "Do not spray during peak sun hours.",
        "Keep away from direct heat."
      ],
      ur: [
        "شدید دوپہر کے وقت سپرے سے گریز کریں۔",
        "براہ راست تیز دھوپ اور گرمی سے دور رکھیں۔"
      ]
    },
    faqs: {
      en: [
        { q: "When should we apply Sonehri Potash?", a: "Apply at grain filling in cereal crops, or fruit set stage in vegetable and fruit crops." }
      ],
      ur: [
        { q: "سنہری پوٹاش کب استعمال کرنی چاہیے؟", a: "اناج کی فصلوں میں دانے بنتے وقت، اور سبزیوں و پھلوں میں پھل لگنے پر استعمال کریں۔" }
      ]
    }
  },
  "defeater-potassium-humate": {
    id: "defeater-potassium-humate",
    genericName: {
      en: "Potassium Humate 13.5%",
      ur: "پوٹاشیم ہیومیٹ 13.5٪"
    },
    pricing: [
      { size: "4 LTR", rate: "680", carton: "1" },
      { size: "20 LTR", rate: "3480", carton: "1" },
      { size: "200 LTR", rate: "32200", carton: "1" }
    ],
    slug: "defeater-potassium-humate",
    name: {
      en: "Defeater Humate",
      ur: "ڈیفیٹر ہیومیٹ"
    },
    category: "plant_nutrition",
    imageUrl: defeaterHumatePng,
    pngUrl: defeaterHumatePng,
    rating: 4.8,
    importedFormulaBadge: false,
    premiumProductBadge: true,
    researchBasedBadge: true,
    shortDesc: {
      en: "Defeater Potassium Humate Liquid is an advanced soil biological activator. Rich in Humic and Fulvic acids, it improves soil structure.",
      ur: "ڈیفیٹر پوٹاشیم ہیومیٹ مائع زمین کی حیاتیاتی زندگی کو بیدار کرتا ہے۔ ہیومک اور فلوک ایسڈ سے بھرپور، یہ زمین کی زرخیزی بڑھاتا ہے۔"
    },
    seoTitle: "Defeater Potassium Humate Liquid | Vital Agro",
    seoDescription: "Shop Defeater Potassium Humate 13.5% liquid. Biological soil activator with Exfet Technology. Enhances root mass and nutrient availability.",
    sizes: [
      { size: "4 LTR", price: 899, oldPrice: 1099, stockStatus: "In Stock", sku: "VA-DEF-PHM-4L", weight: "4kg" },
      { size: "20 LTR", price: 3999, oldPrice: 4599, stockStatus: "In Stock", sku: "VA-DEF-PHM-20L", weight: "20kg" },
      { size: "200 LTR", price: 34999, oldPrice: 38999, stockStatus: "In Stock", sku: "VA-DEF-PHM-200L", weight: "200kg" }
    ],
    formulation: "13.5% SL Liquid Concentrate",
    activeIngredient: "Potassium Humate + Fulvic Acid",
    packaging: "4 LTR, 20 LTR, 200 LTR Cans",
    productCode: "VA-DEF-PHM",
    status: {
      en: "Potassium Humate 13.5% SL",
      ur: "پوٹاشیم ہیومیٹ 13.5٪ مائع"
    },
    description: {
      en: "Defeater Potassium Humate Liquid is an advanced soil biological activator. Rich in Humic and Fulvic acids, it dramatically improves soil structure and nutrient availability. Exfet Technology ensures deep soil penetration for lasting results.",
      ur: "ڈیفیٹر پوٹاشیم ہیومیٹ مائع ایک اعلیٰ معیار کا حیاتیاتی محرک ہے جو مٹی کی طبیعی ساخت کو نکھارتا ہے۔ یہ مٹی میں بند جپسم اور فاسفیٹ کو کھولتا ہے اور پودے کی جڑ کے بال (root hairs) کو خوراک چوسنے میں مدد دیتا ہے۔"
    },
    features: {
      en: [
        "High concentration Potassium Humate (13.5%)",
        "Stimulates root growth and development",
        "Improves soil water and nutrient retention",
        "Activates beneficial soil microorganisms",
        "Reduces soil pH in alkaline conditions"
      ],
      ur: [
        "پوٹاشیم ہیومیٹ کی بہترین مقدار (13.5%)",
        "جڑوں کی نشوونما اور پھیلاؤ کو تیز کرنا",
        "مٹی میں پانی اور کھادیں روکنے کی صلاحیت بڑھانا",
        "زمین کے فائدہ مند جراثیم کو متحرک کرنا",
        "کلراٹھی اور سخت مٹی کی ساخت نرم کرنا"
      ]
    },
    benefits: {
      en: [
        "Enhances plant survival under temperature shock",
        "Unlocks fixed nutrients in soil (especially Phosphate)",
        "Increases organic matter content in crop root zones",
        "Highly compatible with NPK and urea mixtures",
        "Safe and natural organic supplement"
      ],
      ur: [
        "شدید گرمی اور کورا کے اثرات سے فصل کو محفوظ رکھتا ہے",
        "زمین میں جمی کھادوں (فاسفورس) کو کھول کر جڑوں کو دیتا ہے",
        "جڑ کے گرد نامیاتی مادے (آرگینک میٹر) میں اضافہ کرتا ہے",
        "نائٹروجن اور این پی کے کھادوں کے ساتھ ملایا جا سکتا ہے",
        "مکمل نامیاتی اور ماحول دوست دوا ہے"
      ]
    },
    crops: [
      { name: { en: "All Crops", ur: "تمام فصلیں" }, icon: "🌱" },
      { name: { en: "Cotton", ur: "کپاس" }, icon: "🌱" },
      { name: { en: "Wheat", ur: "گندم" }, icon: "🌾" },
      { name: { en: "Rice", ur: "دھان" }, icon: "🌾" },
      { name: { en: "Vegetables", ur: "سبزیاں" }, icon: "🥦" }
    ],
    application: {
      en: "Flooding with first or second irrigation. Can also be applied via drip systems.",
      ur: "پہلی یا دوسری آبپاشی کے پانی کے ساتھ فلڈ کریں۔ ڈرپ آبپاشی کے ذریعے بھی دیا جا سکتا ہے۔"
    },
    specs: {
      type: { en: "Biological Soil Stimulant", ur: "نامیاتی مٹی کا محرک" },
      composition: { en: "Potassium Humate 13.5% + Humic & Fulvic organic matter", ur: "پوٹاشیم ہیومیٹ 13.5%" },
      appearance: { en: "Black fluid liquid", ur: "سیاہ مائع" },
      storage: { en: "Keep container tightly closed in cool place", ur: "بوتل کو اچھی طرح بند کر کے ٹھنڈی جگہ پر رکھیں" }
    },
    safety: {
      en: [
        "Do not ingest.",
        "Store away from food items.",
        "Wash with clean water if splashed on eyes."
      ],
      ur: [
        "نگلنے سے گریز کریں۔",
        "کھانے پینے کی چیزوں سے دور رکھیں۔",
        "آنکھوں پر چھینٹے پڑنے کی صورت میں صاف پانی سے دھوئیں۔"
      ]
    },
    faqs: {
      en: [
        { q: "Is Defeater Humate compatible with copper fungicides?", a: "No, avoid mixing humic acids directly with highly acidic copper fungicides." }
      ],
      ur: [
        { q: "کیا ڈیفیٹر ہیومیٹ کو کاپر ادویات کے ساتھ ملا سکتے ہیں؟", a: "نہیں۔ ہیومک ایسڈ کو تیزابی کاپر فنگس کش ادویات کے ساتھ براہ راست ملانے سے گریز کریں۔" }
      ]
    }
  },
  "setting-npk": {
    id: "setting-npk",
    genericName: {
      en: "Balanced NPK 20:20:20",
      ur: "متوازن این پی کے 20:20:20"
    },
    pricing: [
      { size: "1 KG", rate: "699", carton: "1" },
      { size: "25 KG", rate: "15230", carton: "1" }
    ],
    slug: "setting-npk",
    name: {
      en: "Setting NPK",
      ur: "سیٹنگ این پی کے"
    },
    category: "plant_nutrition",
    imageUrl: settingPng,
    pngUrl: settingPng,
    rating: 4.9,
    importedFormulaBadge: true,
    premiumProductBadge: true,
    researchBasedBadge: true,
    shortDesc: {
      en: "Setting NPK 20:20:20 is a perfectly balanced complete fertilizer. Equal NPK ratios support all critical growth stages.",
      ur: "سیٹنگ این پی کے 20:20:20 ایک متوازن اور مکمل کھاد ہے۔ نائٹروجن، فاسفورس اور پوٹاش کی یکساں مقدار تمام مراحل پر فصل کو طاقت دیتی ہے۔"
    },
    seoTitle: "Setting NPK 20:20:20 Fertilizer | Vital Agro",
    seoDescription: "Buy Setting NPK 20:20:20 balanced fertilizer. Fully water soluble. Promotes crop tillering, root growth, and grain filling. Order on WhatsApp or checkout.",
    sizes: [
      { size: "1 KG", price: 799, oldPrice: 999, stockStatus: "In Stock", sku: "VA-SET-NPK-1KG", weight: "1kg" },
      { size: "25 KG", price: 15999, oldPrice: 17999, stockStatus: "In Stock", sku: "VA-SET-NPK-25KG", weight: "25kg" }
    ],
    formulation: "Balanced Water Soluble NPK 20-20-20",
    activeIngredient: "Nitrogen (20%) + Phosphorus (20%) + Potash (20%)",
    packaging: "1 KG Bag, 25 KG Bag",
    productCode: "VA-SET-NPK",
    status: {
      en: "Complete Balanced NPK Nutrition",
      ur: "متوازن این پی کے فارمولا"
    },
    description: {
      en: "Setting NPK 20:20:20 is a perfectly balanced complete fertilizer that provides equal proportions of all three primary macronutrients. Ideal for critical growth stages and as a general-purpose foliar and fertigation nutrient.",
      ur: "سیٹنگ این پی کے 20:20:20 ایک مکمل اور متوازن پانی میں حل پذیر کھاد ہے جو پودے کو نائٹروجن، فاسفورس اور پوٹاش کی برابر مقدار فراہم کرتی ہے۔ یہ فصل کے ہر نازک مرحلے (بڑھوتری، پھول اور پھل) پر پودے کی متوازن غذا کا ضامن ہے۔"
    },
    features: {
      en: [
        "Perfectly balanced 20:20:20 ratio",
        "Supports all crop growth stages",
        "Suitable for foliar spray and fertigation",
        "Improves crop uniformity and yield",
        "Premium imported formulation"
      ],
      ur: [
        "مکمل متوازن 20:20:20 تناسب",
        "فصل کی نشوونما کے تمام مراحل کے لیے مفید",
        "اسپرے اور ڈرپ کے ذریعے استعمال کے لیے موزوں",
        "یکساں فصل اور بہتر پیداوار کا ضامن",
        "اعلیٰ معیار کی درآمدی فارمولیشن"
      ]
    },
    benefits: {
      en: [
        "Triggers fast tillering and green canopy formation",
        "Provides quick response within 24-48 hours of spray",
        "Completely water soluble with no nozzle blockage",
        "Optimizes early growth and builds robust crop cells",
        "Delivers higher weight and shine in vegetables & fruits"
      ],
      ur: [
        "تیزی سے شاخیں نکالنے اور لش گرین پتے بنانے میں مددگار",
        "اسپرے کے 24 سے 48 گھنٹوں کے اندر فوری اثر دکھاتا ہے",
        "پانی میں 100٪ حل پذیر، نوزل بند نہیں کرتا",
        "ابتدائی نشوونما کو متوازن کرتا ہے اور سیلز کو طاقت دیتا ہے",
        "سبزیوں اور پھلوں کے وزن اور چمک میں اضافہ کرتا ہے"
      ]
    },
    crops: [
      { name: { en: "All Crops", ur: "تمام فصلیں" }, icon: "🌱" },
      { name: { en: "Fruits", ur: "پھل" }, icon: "🍊" },
      { name: { en: "Vegetables", ur: "سبزیاں" }, icon: "🥦" },
      { name: { en: "Cotton", ur: "کپاس" }, icon: "🌱" },
      { name: { en: "Sugarcane", ur: "کماد" }, icon: "🎋" }
    ],
    application: {
      en: "Foliar spray or drip irrigation fertigation. Apply at 10-15 day intervals during vegetative and flowering stages.",
      ur: "بذریعہ فولیر سپرے یا ڈرپ آبپاشی۔ شاخیں نکلنے اور پھول بنتے وقت 10 سے 15 دن کے وقفے سے استعمال کریں۔"
    },
    specs: {
      type: { en: "Balanced Soluble Feed", ur: "متوازن حل پذیر کھاد" },
      formulation: { en: "Crystalline Powder", ur: "کرسٹلائن پاؤڈر" },
      composition: { en: "N:20% + P2O5:20% + K2O:20% + Trace Elements", ur: "نائٹروجن 20% + فاسفورس 20% + پوٹاش 20%" },
      appearance: { en: "White or colored powder", ur: "سفید یا رنگدار پاؤڈر" },
      storage: { en: "Keep bag tightly closed, away from moisture", ur: "تھیلے کو بند کر کے نمی سے بچا کر رکھیں" }
    },
    safety: {
      en: [
        "Wear masks to avoid inhaling powder.",
        "Store out of reach of children."
      ],
      ur: [
        "پاؤڈر کی دھول سانس کے ذریعے اندر لے جانے سے بچنے کے لیے ماسک پہنیں۔",
        "بچوں کی پہنچ سے دور رکھیں۔"
      ]
    },
    faqs: {
      en: [
        { q: "Can we spray Setting NPK during flowering?", a: "Yes, it provides balanced nutrients which support healthy flower formation without shock." }
      ],
      ur: [
        { q: "کیا ہم پھول آنے پر سیٹنگ این پی کے کا سپرے کر سکتے ہیں؟", a: "جی ہاں، یہ متوازن خوراک دیتا ہے جس سے پھول گرنے سے محفوظ رہتے ہیں اور صحت مند بنتے ہیں۔" }
      ]
    }
  },

  "conference-gold-dummy": {}, // placeholder to support key fallback if needed
};

// Map lowercase simple names and other products
export const getProductBySlug = (slug) => {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  // Custom manual mappings for other spellings
  if (cleanSlug === 'conference' || cleanSlug === 'conference-gold') return PRODUCTS_DATA['conference-gold'];
  if (cleanSlug === 'easygrow' || cleanSlug === 'easy-grow') return PRODUCTS_DATA['easy-grow'];
  if (cleanSlug === 'purifizin' || cleanSlug === 'purifizin-extra') return PRODUCTS_DATA['purifizin-extra'];
  if (cleanSlug === 'dr-pp' || cleanSlug === 'dr-pp-') return PRODUCTS_DATA['dr-pp'];
  if (cleanSlug === 'vac-zinc' || cleanSlug === 'vac-zinc-') return PRODUCTS_DATA['vac-zinc'];
  if (cleanSlug === 'super-4g' || cleanSlug === '4g' || cleanSlug === 'super4g') return PRODUCTS_DATA['super-4g'];
  
  return PRODUCTS_DATA[cleanSlug] || null;
};
