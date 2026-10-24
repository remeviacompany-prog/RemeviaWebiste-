'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export const I18N = {
  en: {
    'top.tagline': 'Plant-based feed & water additives for poultry and livestock. Made in Kerala, India.',
    'top.dist': 'Become a distributor',
    'nav.home': 'Home', 'nav.products': 'Products', 'nav.science': 'Science', 'nav.about': 'About', 'nav.contact': 'Contact',
    'cta.trial': 'Request a free trial', 'cta.explore': 'Explore products', 'cta.whatsapp': 'Chat on WhatsApp', 'cta.datasheet': 'Download datasheet',
    'hero.badge': 'Botanical alternatives to antibiotics',
    'hero.h1a': 'Healthier flocks.', 'hero.h1b': 'Without antibiotics.',
    'hero.sub': 'Plant-based supplements that protect gut health, breathing, egg quality and skin, with no antibiotic residues in meat or eggs.',
    'hero.c1': '100% plant-based actives', 'hero.c2': 'No antibiotic residues', 'hero.c3': 'Low resistance risk',
    'sec.range': 'One natural solution for every challenge on the farm',
    'sec.finder': 'What is holding your flock back?',
    'sec.process': 'From plant to poultry in four steps',
    'sec.ready': 'Ready to go antibiotic-free?',
    'f.products': 'Products', 'f.company': 'Company', 'f.reach': 'Reach us', 'f.news': 'Field results in your inbox',
    'form.submit': 'Send enquiry'
  },
  hi: {
    'top.tagline': 'मुर्गी पालन और पशुधन के लिए पौधों पर आधारित फ़ीड और पानी सप्लीमेंट। केरल, भारत में निर्मित।',
    'top.dist': 'वितरक बनें',
    'nav.home': 'होम', 'nav.products': 'उत्पाद', 'nav.science': 'विज्ञान', 'nav.about': 'हमारे बारे में', 'nav.contact': 'संपर्क',
    'cta.trial': 'मुफ़्त ट्रायल माँगें', 'cta.explore': 'उत्पाद देखें', 'cta.whatsapp': 'WhatsApp पर बात करें', 'cta.datasheet': 'डेटाशीट डाउनलोड करें',
    'hero.badge': 'एंटीबायोटिक के प्राकृतिक विकल्प',
    'hero.h1a': 'स्वस्थ झुंड।', 'hero.h1b': 'बिना एंटीबायोटिक।',
    'hero.sub': 'पौधों पर आधारित सप्लीमेंट जो आंतों, साँस, अंडे की गुणवत्ता और त्वचा की रक्षा करते हैं, मांस और अंडों में बिना किसी एंटीबायोटिक अवशेष के।',
    'hero.c1': '100% वनस्पति सक्रिय तत्व', 'hero.c2': 'कोई एंटीबायोटिक अवशेष नहीं', 'hero.c3': 'प्रतिरोध का कम जोखिम',
    'sec.range': 'फ़ार्म की हर चुनौती के लिए एक प्राकृतिक समाधान',
    'sec.finder': 'आपके झुंड को क्या रोक रहा है?',
    'sec.process': 'पौधे से पोल्ट्री तक, चार चरणों में',
    'sec.ready': 'एंटीबायोटिक-मुक्त होने के लिए तैयार?',
    'f.products': 'उत्पाद', 'f.company': 'कंपनी', 'f.reach': 'संपर्क करें', 'f.news': 'फ़ील्ड परिणाम आपके ईमेल में',
    'form.submit': 'पूछताछ भेजें'
  },
  ar: {
    'top.tagline': 'إضافات نباتية للعلف ومياه الشرب للدواجن والماشية. صُنعت في ولاية كيرالا، الهند.',
    'top.dist': 'كن موزعًا',
    'nav.home': 'الرئيسية', 'nav.products': 'المنتجات', 'nav.science': 'العلوم', 'nav.about': 'من نحن', 'nav.contact': 'اتصل بنا',
    'cta.trial': 'اطلب تجربة مجانية', 'cta.explore': 'استكشف المنتجات', 'cta.whatsapp': 'تواصل عبر واتساب', 'cta.datasheet': 'تنزيل النشرة الفنية',
    'hero.badge': 'بدائل نباتية للمضادات الحيوية',
    'hero.h1a': 'قطعان أكثر صحة.', 'hero.h1b': 'بدون مضادات حيوية.',
    'hero.sub': 'مكملات نباتية تحمي صحة الأمعاء والتنفس وجودة البيض والجلد، دون أي بقايا للمضادات الحيوية في اللحم أو البيض.',
    'hero.c1': 'مواد فعالة نباتية 100%', 'hero.c2': 'بدون بقايا مضادات حيوية', 'hero.c3': 'خطر مقاومة منخفض',
    'sec.range': 'حل طبيعي لكل تحدٍّ في المزرعة',
    'sec.finder': 'ما الذي يعيق أداء قطيعك؟',
    'sec.process': 'من النبات إلى الدواجن في أربع خطوات',
    'sec.ready': 'هل أنت مستعد للتخلي عن المضادات الحيوية؟',
    'f.products': 'المنتجات', 'f.company': 'الشركة', 'f.reach': 'تواصل معنا', 'f.news': 'نتائج ميدانية في بريدك',
    'form.submit': 'إرسال الاستفسار'
  },
  vi: {
    'top.tagline': 'Phụ gia thức ăn và nước uống từ thực vật cho gia cầm và gia súc. Sản xuất tại Kerala, Ấn Độ.',
    'top.dist': 'Trở thành nhà phân phối',
    'nav.home': 'Trang chủ', 'nav.products': 'Sản phẩm', 'nav.science': 'Khoa học', 'nav.about': 'Giới thiệu', 'nav.contact': 'Liên hệ',
    'cta.trial': 'Yêu cầu dùng thử miễn phí', 'cta.explore': 'Xem sản phẩm', 'cta.whatsapp': 'Nhắn tin WhatsApp', 'cta.datasheet': 'Tải bảng thông số',
    'hero.badge': 'Giải pháp thảo dược thay thế kháng sinh',
    'hero.h1a': 'Đàn gia cầm khỏe hơn.', 'hero.h1b': 'Không cần kháng sinh.',
    'hero.sub': 'Sản phẩm từ thực vật giúp bảo vệ đường ruột, hô hấp, chất lượng trứng và da, không tồn dư kháng sinh trong thịt và trứng.',
    'hero.c1': 'Hoạt chất 100% từ thực vật', 'hero.c2': 'Không tồn dư kháng sinh', 'hero.c3': 'Ít nguy cơ kháng thuốc',
    'sec.range': 'Một giải pháp tự nhiên cho mỗi thách thức trong trang trại',
    'sec.finder': 'Điều gì đang cản trở đàn của bạn?',
    'sec.process': 'Từ thực vật đến gia cầm qua bốn bước',
    'sec.ready': 'Sẵn sàng chăn nuôi không kháng sinh?',
    'f.products': 'Sản phẩm', 'f.company': 'Công ty', 'f.reach': 'Liên hệ', 'f.news': 'Kết quả thực địa gửi tới email của bạn',
    'form.submit': 'Gửi yêu cầu'
  },
  es: {
    'top.tagline': 'Aditivos vegetales para pienso y agua para avicultura y ganadería. Fabricado en Kerala, India.',
    'top.dist': 'Hazte distribuidor',
    'nav.home': 'Inicio', 'nav.products': 'Productos', 'nav.science': 'Ciencia', 'nav.about': 'Nosotros', 'nav.contact': 'Contacto',
    'cta.trial': 'Solicitar prueba gratuita', 'cta.explore': 'Ver productos', 'cta.whatsapp': 'Escríbenos por WhatsApp', 'cta.datasheet': 'Descargar ficha técnica',
    'hero.badge': 'Alternativas botánicas a los antibióticos',
    'hero.h1a': 'Aves más sanas.', 'hero.h1b': 'Sin antibióticos.',
    'hero.sub': 'Suplementos vegetales que protegen la salud intestinal, la respiración, la calidad del huevo y la piel, sin residuos de antibióticos en carne ni huevos.',
    'hero.c1': 'Activos 100% vegetales', 'hero.c2': 'Sin residuos de antibióticos', 'hero.c3': 'Bajo riesgo de resistencia',
    'sec.range': 'Una solución natural para cada reto de la granja',
    'sec.finder': '¿Qué está frenando a tus aves?',
    'sec.process': 'De la planta al ave en cuatro pasos',
    'sec.ready': '¿Listo para producir sin antibióticos?',
    'f.products': 'Productos', 'f.company': 'Empresa', 'f.reach': 'Contacto', 'f.news': 'Resultados de campo en tu correo',
    'form.submit': 'Enviar consulta'
  }
};

const LANG_KEY = 'remevia-lang';

const LanguageContext = createContext({
  lang: 'en',
  setLang: () => {},
  t: (key, fallback) => fallback || key,
  isRtl: false
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved && I18N[saved]) {
        setLangState(saved);
      }
    } catch (e) {
      // localStorage unavailable
    }
  }, []);

  const setLang = (newLang) => {
    setLangState(newLang);
    try {
      localStorage.setItem(LANG_KEY, newLang);
    } catch (e) {}
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  }, [lang]);

  const t = (key, fallback) => {
    const dict = I18N[lang] || I18N.en;
    return dict[key] || (I18N.en && I18N.en[key]) || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRtl: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
