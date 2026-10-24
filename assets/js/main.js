/* Remevia website — interactions
   - Language switcher (EN / HI / AR / VI / ES) with RTL for Arabic, remembered per visitor
   - Sticky header, mobile menu, product dropdown
   - Product filters, challenge finder, dose calculator
   - Enquiry type selector and form validation
*/
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. Translations
     Every element with data-i18n="key" gets its text from this table.
     Add more keys here as page copy is translated by a professional.
  ------------------------------------------------------------------ */
  var I18N = {
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
  var LANG_KEY = 'remevia-lang';

  function applyLang(lang) {
    var dict = I18N[lang] || I18N.en;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
      else if (I18N.en[key]) el.textContent = I18N.en[key];
    });
    document.querySelectorAll('.lang select').forEach(function (s) { s.value = lang; });
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* storage blocked: language still applies for this page */ }
  }

  var saved = 'en';
  try { saved = localStorage.getItem(LANG_KEY) || 'en'; } catch (e) { saved = 'en'; }
  if (saved !== 'en') applyLang(saved);
  document.querySelectorAll('.lang select').forEach(function (s) {
    s.value = saved;
    s.addEventListener('change', function () { applyLang(s.value); });
  });

  /* ------------------------------------------------------------------
     2. Header: shadow on scroll, mobile menu, product dropdown
  ------------------------------------------------------------------ */
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  var burger = document.querySelector('.burger');
  var nav = document.getElementById('site-nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });
  }

  document.querySelectorAll('.has-menu').forEach(function (item) {
    var btn = item.querySelector('.nav__drop');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    item.addEventListener('focusout', function (e) {
      if (!item.contains(e.relatedTarget)) { item.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }
    });
  });

  /* ------------------------------------------------------------------
     3. Product filters (products.html)
  ------------------------------------------------------------------ */
  var filterBtns = document.querySelectorAll('[data-filter]');
  if (filterBtns.length) {
    var rows = document.querySelectorAll('[data-tags]');
    var countEl = document.getElementById('product-count');
    var emptyEl = document.querySelector('.empty');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = btn.getAttribute('data-filter');
        filterBtns.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
        var shown = 0;
        rows.forEach(function (r) {
          var match = f === 'all' || r.getAttribute('data-tags').split(' ').indexOf(f) !== -1;
          r.hidden = !match;
          if (match) shown++;
        });
        if (countEl) countEl.textContent = shown;
        if (emptyEl) emptyEl.classList.toggle('is-on', shown === 0);
      });
    });
  }

  /* ------------------------------------------------------------------
     4. Challenge finder (index.html)
  ------------------------------------------------------------------ */
  var FINDER = {
    growth: { cls: 't-treat', cat: 'Natural AGP replacer', name: 'TLTREAT', img: 'assets/img/tltreat.webp', href: 'tltreat.html',
      text: 'Spice extracts of ginger, turmeric and nutmeg stimulate immunity and replace antibiotic growth promoters. Use 1–2 kg per tonne of broiler feed from day 1 to 40.' },
    breath: { cls: 't-curtect', cat: 'Respiratory support', name: 'CURTECT-CRD', img: 'assets/img/curtect-crd.webp', href: 'curtect-crd.html',
      text: 'Menthol, eucalyptus and rosemary oils open airways, loosen mucus and ease gasping. Visible relief within 24–48 hours at 200 ml per 1,000 L of water.' },
    yolk: { cls: 't-egg', cat: 'Egg yolk colour enhancer', name: 'TLEGG', img: 'assets/img/tlegg.webp', href: 'tlegg.html',
      text: 'Marigold carotenoids give yolks a rich orange-yellow colour, even on diets with less maize. Add 1 kg per tonne of layer feed.' },
    mites: { cls: 't-repeal', cat: 'Avian red mite control', name: 'TLREPEAL', img: 'assets/img/tlrepeal.webp', href: 'tlrepeal.html',
      text: 'Basil, camphor, eucalyptus and D-limonene repel and kill red mites. Rotate drinking-water use and nest spraying on alternate weeks.' },
    wounds: { cls: 't-healer', cat: 'Wounds & tick bites', name: 'TL HEALER', img: 'assets/img/tl-healer.webp', href: 'tl-healer.html',
      text: 'Cedarwood, neem, curcumin and terpineol help heal septic and non-septic wounds and keep flies away. Spray directly on the affected area.' }
  };
  var finderOpts = document.querySelectorAll('.finder__opt');
  var finderOut = document.querySelector('.finder__result');
  if (finderOpts.length && finderOut) {
    finderOpts.forEach(function (opt) {
      opt.addEventListener('click', function () {
        var d = FINDER[opt.getAttribute('data-need')];
        if (!d) return;
        finderOpts.forEach(function (o) { o.setAttribute('aria-selected', o === opt ? 'true' : 'false'); });
        finderOut.className = 'finder__result ' + d.cls + ' is-swapping';
        finderOut.querySelector('[data-f="cat"]').textContent = d.cat;
        finderOut.querySelector('[data-f="name"]').textContent = d.name;
        finderOut.querySelector('[data-f="text"]').textContent = d.text;
        var img = finderOut.querySelector('img'); img.src = d.img; img.alt = d.name + ' for poultry';
        finderOut.querySelector('[data-f="link"]').href = d.href;
        setTimeout(function () { finderOut.classList.remove('is-swapping'); }, 400);
      });
    });
  }

  /* ------------------------------------------------------------------
     5. Dose calculator (product pages)
     data-rates on the form: JSON { "Label": [amountPerUnit, "unit", "basis"] }
  ------------------------------------------------------------------ */
  document.querySelectorAll('.calc').forEach(function (calc) {
    var rates = JSON.parse(calc.getAttribute('data-rates'));
    var use = calc.querySelector('[name="use"]');
    var qty = calc.querySelector('[name="qty"]');
    var basis = calc.querySelector('[data-basis]');
    var out = calc.querySelector('.calc__out b');
    var note = calc.querySelector('.calc__out small');
    function fmt(n) { return (Math.round(n * 100) / 100).toLocaleString('en-IN'); }
    function run() {
      var r = rates[use.value];
      basis.textContent = r[2];
      var q = parseFloat(qty.value);
      if (!(q > 0)) { out.textContent = '—'; note.textContent = 'Enter a quantity to see the amount needed.'; return; }
      var amount = q * r[0];
      if (r[1] === 'ml' && amount >= 1000) out.textContent = fmt(amount / 1000) + ' L';
      else if (r[1] === 'kg' && amount < 1) out.textContent = fmt(amount * 1000) + ' g';
      else out.textContent = fmt(amount) + ' ' + r[1];
      note.textContent = r[3] || '';
    }
    use.addEventListener('change', run);
    qty.addEventListener('input', run);
    run();
  });

  /* ------------------------------------------------------------------
     6. Sticky sub-navigation highlight (product pages)
  ------------------------------------------------------------------ */
  var subLinks = document.querySelectorAll('.subnav a[href^="#"]');
  if (subLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    subLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          subLinks.forEach(function (a) { a.classList.remove('is-active'); });
          if (map[en.target.id]) map[en.target.id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ------------------------------------------------------------------
     7. Enquiry type selector (contact.html)
  ------------------------------------------------------------------ */
  var ETYPE = {
    trial: { title: 'Tell us about your flock', btn: 'Request my free trial' },
    quote: { title: 'Request a quotation', btn: 'Send quote request' },
    distributor: { title: 'Distributor application', btn: 'Apply as a distributor' }
  };
  var etypes = document.querySelectorAll('.etype');
  function setEtype(key) {
    var d = ETYPE[key]; if (!d) return;
    etypes.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-type') === key ? 'true' : 'false'); });
    var t = document.getElementById('form-title'); if (t) t.textContent = d.title;
    var s = document.getElementById('form-submit'); if (s) s.textContent = d.btn;
    var h = document.getElementById('enquiry-type'); if (h) h.value = key;
  }
  etypes.forEach(function (b) {
    b.addEventListener('click', function () {
      setEtype(b.getAttribute('data-type'));
      var f = document.getElementById('enquiry'); if (f) f.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  var qType = new URLSearchParams(location.search).get('type');
  if (qType && ETYPE[qType]) setEtype(qType);
  var qProduct = new URLSearchParams(location.search).get('product');
  if (qProduct) {
    var box = document.querySelector('.checks input[value="' + qProduct + '"]');
    if (box) box.checked = true;
  }

  /* ------------------------------------------------------------------
     8. Form validation (front-end only — connect to your mail/CRM backend)
  ------------------------------------------------------------------ */
  document.querySelectorAll('form[data-validate]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (input) {
        var field = input.closest('.field') || input.closest('.consent');
        var valid = input.type === 'checkbox' ? input.checked : input.value.trim() !== '' && (input.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value));
        if (field) field.classList.toggle('has-error', !valid);
        if (!valid && ok) { input.focus(); ok = false; }
      });
      if (!ok) return;
      form.classList.add('is-sent');
      var msg = form.querySelector('.form__ok');
      if (msg) { msg.setAttribute('tabindex', '-1'); msg.focus(); }
      form.reset();
    });
  });

  /* Newsletter */
  document.querySelectorAll('.footer__news').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var i = f.querySelector('input');
      if (i && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.value)) { i.value = ''; i.placeholder = 'Subscribed. Thank you.'; }
      else if (i) { i.focus(); i.placeholder = 'Enter a valid email'; }
    });
  });

  /* Footer year */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
