/* ==========================================================================
   AYED ACADEMY — Shared store engine (2026)
   Single source of truth for catalogue, cart, checkout & Telegram handoff.
   ========================================================================== */

const STORE = {
  /* --- Brand & campaign --- */
  brand: {
    name: 'أكاديمية عايد للتدريب',
    latin: 'AYED ACADEMY',
    slogan: 'عايد بتقربلك المسافات',
    telegramUser: 'Ayed_Academy_2026',
    telegramUrl: 'https://t.me/Ayed_Academy_2026',
    telegramLink: handle => `https://t.me/${handle}`
  },

  /* --- December / end-of-year campaign --- */
  campaign: {
    key: 'dec-2026',
    label: 'خصومات آخر العام',
    sub: 'عروض ديسمبر 2026',
    month: 'ديسمبر',
    year: 2026,
    headline: 'خصومات آخر العام — ديسمبر',
    short: 'خصم آخر العام',
    /* offer ends: 31 Dec 2026 23:59 KSA */
    endsAt: new Date('2026-12-31T23:59:59+03:00').getTime(),
    maxDiscount: 65
  },

  courses: [
    {
      id: 'premium',
      featured: true,
      badge: 'الأكثر طلباً',
      kicker: 'الباقة الشاملة',
      name: 'دورة STEP المميزة — النسخة الحديثة',
      shortName: 'الدورة المميزة',
      desc: 'هدفك +90؟ هنا البداية الصح — محتوى 2026 كامل بشرح مبسط ونماذج الأحدث.',
      img: 'course-premium.jpg',
      price: 249,
      old: 699,
      level: 'متقدم',
      duration: '90 يوم وصول',
      lessons: '48 درساً',
      tagline: 'الطريق الأسرع والأشمل لدرجة +90',
      summary:
        'باقة متكاملة تغطي كل ما تحتاجه في اختبار STEP من الصفر حتى الاحتراف: شرح مبسط لكل قسم، أحدث النماذج 50–51–52، تدريبات وكويزات ومحاكيات بنفس أجواء الاختبار الحقيقي، وخطة مذاكرة جاهزة تمشي عليها بدون حيرة.',
      highlights: [
        { icon: 'fa-solid fa-layer-group', title: 'تغطية كاملة', text: 'Grammar + Reading + Listening + Structure في مسار واحد منظم' },
        { icon: 'fa-solid fa-file-lines', title: 'أحدث النماذج', text: 'نماذج 50 – 51 – 52 لاختبار STEP 2026 مع حلول تفصيلية' },
        { icon: 'fa-solid fa-stopwatch', title: 'محاكيات الاختبار', text: 'تدريبات محسوبة بالوقت تحاكي الاختبار الحقيقي بالضبط' },
        { icon: 'fa-solid fa-calendar-check', title: 'خطة مذاكرة جاهزة', text: 'جدول واضح يوم بيوم — توفر عليك وقت التخطيط' }
      ],
      curriculum: [
        {
          title: 'الوحدة الأولى — Grammar من الصفر',
          lessons: [
            'أساسيات الأزمنة والتطابق بين الفاعل والفعل',
            'الأسماء والضمائر وحروف الجر في أسئلة STEP',
            'بنية الجملة والتراكيب المتكررة في الاختبار',
            'الحل المباشر لأسئلة القواعد المتكررة'
          ]
        },
        {
          title: 'الوحدة الثانية — Reading & Comprehension',
          lessons: [
            'استراتيجيات القراءة السريعة واستخراج الفكرة الرئيسية',
            'أنواع أسئلة الاستيعاب والاستنتاج',
            'أسئلة المفردات من السياق',
            'تدريب مكثف على قطع مشابهة للاختبار'
          ]
        },
        {
          title: 'الوحدة الثالثة — Listening & Structure',
          lessons: [
            'مهارات الاستماع وتقنيات تدوين الملاحظات',
            'أنواع الأسئلة الصوتية وأخطاء شائعة',
            'تراكيب الجمل المتقدمة',
            'مراجعة سريعة قبل الاختبار'
          ]
        },
        {
          title: 'الوحدة الرابعة — النماذج والمحاكيات 2026',
          lessons: [
            'نموذج 50 كامل بالحلول',
            'نموذج 51 كامل بالحلول',
            'نموذج 52 كامل بالحلول',
            'محاكي اختبار مؤقت + تحليل النتيجة'
          ]
        },
        {
          title: 'الوحدة الخامسة — خطة 30 يوم للدرجة العالية',
          lessons: [
            'توزيع المذاكرة على 30 / 10 / 5 أيام',
            'استراتيجية الأسبوع الأخير قبل الاختبار',
            'أخطاء تسبب خسارة الدرجات وكيف تتجنبها',
            'قائمة تحقق نهائية يوم الاختبار'
          ]
        }
      ],
      includes: [
        'وصول كامل 90 يوم لجميع الوحدات',
        'التحديثات والنماذج القادمة تصلك مجاناً',
        'ملفات PDF قابلة للتحميل',
        'دعم عبر تيليجرام طوال مدة الاشتراك',
        'شهادة إتمام بعد إنهاء المحتوى'
      ],
      audience: [
        'من يستهدف درجة +90 في محاولة واحدة',
        'من يريد خطة واضحة بدل من التشتت بين المصادر',
        'من تخرج من المدرسة ويحتاج تأسيس + تدريب معاً'
      ],
      outcomes: [
        'تتعامل مع كل أنواع أسئلة STEP بثقة',
        'تحل النماذج الحديثة 50–51–52 باستقلالية',
        'تعرف بالضبط ماذا تذاكر كل يوم حتى الاختبار'
      ],
      details: 'اشترك الآن وتوصلك كل التحديثات الجديدة والنماذج القادمة لمدة 90 يوماً كاملة — بدون دفعات إضافية.'
    },
    {
      id: 'intensive',
      featured: false,
      badge: 'خطة 10 أيام',
      kicker: 'النتيجة السريعة',
      name: 'دورة STEP المكثفة — خطة 10 أيام',
      shortName: 'الدورة المكثفة',
      desc: 'وقتك ضيق قبل الاختبار؟ خطة مكثفة تركّز على المتكرر وتوصلك للنتيجة بأسرع وقت.',
      img: 'course-intensive.jpg',
      price: 199,
      old: 549,
      level: 'مكثف',
      duration: '90 يوم وصول',
      lessons: '32 درساً',
      tagline: '10 أيام تفصلك عن درجتك',
      summary:
        'دورة مبنية على مبدأ واحد: أعلى نتيجة بأقل وقت. تستهدف الأسئلة المتكررة وتثبيت أهم القواعد وحل أكبر عدد من النماذج، مع جدول مركّز لعشرة أيام فقط.',
      highlights: [
        { icon: 'fa-solid fa-bolt', title: 'خطة 10 أيام', text: 'جدول مكثف واضح لليوم الأول وحتى يوم الاختبار' },
        { icon: 'fa-solid fa-bullseye', title: 'تركيز على المتكرر', text: 'أكثر الأسئلة تكراراً في الاختبارات السابقة' },
        { icon: 'fa-solid fa-pen-ruler', title: 'تثبيت القواعد', text: 'مراجعة سريعة لأهم القواعد بأمثلة مباشرة' },
        { icon: 'fa-solid fa-list-check', title: 'حل مكثف', text: 'أكبر عدد من الأسئلة النموذجية خلال المدة' }
      ],
      curriculum: [
        {
          title: 'اليوم 1–3 — الأساس السريع',
          lessons: ['أهم قواعد STEP في 3 أيام', 'الأخطاء الشائعة التي تسحب درجتك', 'تدريب مباشر مع التصحيح']
        },
        {
          title: 'اليوم 4–6 — الأسئلة المتكررة',
          lessons: ['تحليل 5 اختبارات سابقة', 'أنماط الأسئلة المكررة وحلولها', 'قائمة أسئلة احفظها بالطريقة الصحيحة']
        },
        {
          title: 'اليوم 7–8 — القراءة والاستماع',
          lessons: ['مسح سريع للقطع النصية', 'تقنيات الاستماع الفعّالة', 'تدريب مؤقت بنفس زمن الاختبار']
        },
        {
          title: 'اليوم 9–10 — المحاكي النهائي',
          lessons: ['محاكي اختبار كامل بالحلول', 'تحليل الأخطاء وبناء خطة الليلة الأخيرة', 'قائمة تحقق يوم الاختبار']
        }
      ],
      includes: [
        'وصول كامل 90 يوم للمحتوى المكثف',
        'محاكي اختبار كامل بالحلول',
        'ملفات مراجعة قابلة للتحميل',
        'التحديثات تصلك مجاناً خلال المدة',
        'دعم عبر تيليجرام'
      ],
      audience: [
        'من لديه اختبار قريب خلال أسبوعين',
        'من يحتاج مراجعة مركّزة لا شرحاً طويلاً',
        'من جرّب الدراسة العشوائية وما وصل لهدفه'
      ],
      outcomes: [
        'تعرف أهم الأسئلة المتكررة وتتقنها',
        'تدخل الاختبار وأنت مراجع كل شيء',
        'تحصل على نتيجة تناسب الجهد والوقت'
      ],
      details: 'مناسبة للمقبلين على الاختبار بفترة قصيرة — خطة مكثفة + تثبيت + حل أكبر عدد من الأسئلة، مع 90 يوم وصول كاملة.'
    },
    {
      id: 'basic',
      featured: false,
      badge: 'تأسيس قوي',
      kicker: 'البداية الصحيحة',
      name: 'دورة STEP الأساسية — تحديث 2026',
      shortName: 'الدورة الأساسية',
      desc: 'أساس متين خطوة بخطوة لكل من يبدأ من الصفر وينتظم في المراجعة.',
      img: 'course-basic.jpg',
      price: 149,
      old: 399,
      level: 'مبتدئ',
      duration: 'وصول 120 يوم',
      lessons: '40 درساً',
      tagline: 'ابنِ أساسك مرة واحدة صح',
      summary:
        'دورة تأخذك من الصفر بشرح مفصل لكل قسم من أقسام الاختبار، مع نماذج سابقة محلولة وخطط مذاكرة مرنة تناسب وقتك، وتحديثات مستمرة لمدة 120 يوماً.',
      highlights: [
        { icon: 'fa-solid fa-book-open', title: 'شرح مفصل', text: 'كل قسم من أقسام الاختبار بشرح من الصفر' },
        { icon: 'fa-solid fa-puzzle-piece', title: 'تغطية شاملة', text: 'Grammar – Reading – Listening – Structure' },
        { icon: 'fa-solid fa-clock-rotate-left', title: 'خطط مرنة', text: 'خطط مذاكرة 5 / 10 / 30 يوم حسب وقتك' },
        { icon: 'fa-solid fa-arrows-rotate', title: 'تحديثات 120 يوم', text: 'كل تحديث جديد يصلك خلال 120 يوماً بدون أي رسوم' }
      ],
      curriculum: [
        {
          title: 'المستوى الأول — التأسيس',
          lessons: ['مقدمة عن اختبار STEP وطبيعة الأسئلة', 'القواعد من الصفر', 'المفردات الأساسية المتكررة']
        },
        {
          title: 'المستوى الثاني — المهارات',
          lessons: ['القراءة والاستيعاب', 'الاستماع وخطوات التطبيق', 'التركيب اللغوي وصياغة الجمل']
        },
        {
          title: 'المستوى الثالث — النماذج',
          lessons: ['نماذج سابقة مع الحلول', 'تحليل الأخطاء', 'تدريب ختامي شامل']
        }
      ],
      includes: [
        'وصول 120 يوماً للمحتوى',
        'تحديثات مجانية لمدة 120 يوماً',
        'نماذج سابقة محلولة',
        'خطط مذاكرة مرنة (5 / 10 / 30 يوم)',
        'دعم عبر تيليجرام'
      ],
      audience: [
        'من يبدأ من الصفر تماماً',
        'من يحتاج تأسيساً قبل الاختبار',
        'من يفضّل التعلم بوتيرة مريحة'
      ],
      outcomes: [
        'تفهم طبيعة الاختبار وأقسامه',
        'تبني أساساً قوياً في اللغة',
        'تستعد للانتقال لباقة أعلى بثقة'
      ],
      details: 'شرح مفصل لكل أقسام الاختبار (Grammar – Reading – Listening – Structure)، نماذج سابقة، وخطط مذاكرة مرنة مع تحديثات مستمرة لمدة 120 يوماً.'
    }
  ],

  /* --- helpers --- */
  byId(id) { return this.courses.find(c => c.id === id); },
  discountOf(c) { return Math.round((1 - c.price / c.old) * 100); },
  savingOf(c) { return c.old - c.price; },
  money(n) { return new Intl.NumberFormat('en-US').format(n); },
  pad(n) { return String(n).padStart(2, '0'); }
};

/* ==========================================================================
   Cart (persisted)
   ========================================================================== */
const Cart = {
  KEY: 'ayed_cart_v2026',
  data: {},

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      const clean = {};
      Object.keys(parsed).forEach(k => {
        if (STORE.byId(k)) clean[k] = 1;
      });
      this.data = clean;
    } catch (e) { this.data = {}; }
    return this;
  },
  save() { try { localStorage.setItem(this.KEY, JSON.stringify(this.data)); } catch (e) {} },
  has(id) { return !!this.data[id]; },
  add(id) {
    if (!STORE.byId(id)) return false;
    if (this.data[id]) return false;
    this.data[id] = 1;
    this.save();
    return true;
  },
  remove(id) { delete this.data[id]; this.save(); },
  clear() { this.data = {}; this.save(); },
  items() { return Object.keys(this.data).map(id => STORE.byId(id)).filter(Boolean); },
  count() { return this.items().length; },
  total() { return this.items().reduce((s, c) => s + c.price, 0); },
  oldTotal() { return this.items().reduce((s, c) => s + c.old, 0); },
  saved() { return this.oldTotal() - this.total(); }
};

/* Load immediately so page-level inline scripts can read the cart right away */
Cart.load();

/* ==========================================================================
   UI utilities
   ========================================================================== */
const UI = {
  toast(text, ms = 2600) {
    let el = document.getElementById('toast');
    if (!el) return;
    el.querySelector('#toastText').textContent = text;
    el.classList.add('on');
    clearTimeout(this._t);
    this._t = setTimeout(() => el.classList.remove('on'), ms);
  },

  cartBadge() {
    const n = Cart.count();
    document.querySelectorAll('[data-cart-badge]').forEach(b => {
      b.textContent = n;
      b.classList.toggle('hide', n === 0);
      b.classList.remove('bump');
      void b.offsetWidth;
      b.classList.add('bump');
    });
    document.querySelectorAll('[data-cart-count-text]').forEach(b => { b.textContent = n; });
  },

  reveal() {
    const els = document.querySelectorAll('.rv:not(.on),.rv-l:not(.on),.rv-r:not(.on),.rv-s:not(.on)');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('on')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('on'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(e => io.observe(e));
  },

  countdown(scope = document) {
    const roots = scope.querySelectorAll('[data-countdown]');
    if (!roots.length) return;
    const end = STORE.campaign.endsAt;
    const pairs = [];
    roots.forEach(root => {
      pairs.push([
        root.querySelector('[data-cd="d"]'),
        root.querySelector('[data-cd="h"]'),
        root.querySelector('[data-cd="m"]'),
        root.querySelector('[data-cd="s"]')
      ]);
    });
    const tick = () => {
      let diff = end - Date.now();
      if (diff < 0) diff = 0;
      const d = STORE.pad(Math.floor(diff / 864e5));
      const h = STORE.pad(Math.floor(diff / 36e5) % 24);
      const m = STORE.pad(Math.floor(diff / 6e4) % 60);
      const s = STORE.pad(Math.floor(diff / 1e3) % 60);
      pairs.forEach(([cd, ch, cm, cs]) => {
        if (cd) cd.textContent = d;
        if (ch) ch.textContent = h;
        if (cm) cm.textContent = m;
        if (cs) cs.textContent = s;
      });
    };
    tick();
    clearInterval(this._cd);
    this._cd = setInterval(tick, 1000);
  },

  header() {
    const head = document.querySelector('.site-head');
    const top = () => document.querySelector('[data-to-top]');
    const onScroll = () => {
      if (head) head.classList.toggle('stuck', window.scrollY > 8);
      const t = top();
      if (t) t.classList.toggle('on', window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  },

  drawer() {
    const scrim = document.getElementById('scrim');
    const drawer = document.getElementById('drawer');
    if (!scrim || !drawer) return;
    const close = () => {
      drawer.classList.remove('on');
      scrim.classList.remove('on');
      document.body.classList.remove('locked');
    };
    scrim.addEventListener('click', close);
    drawer.querySelectorAll('[data-drawer-close]').forEach(b => b.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    this._closeDrawer = close;
  },

  openDrawer() {
    const scrim = document.getElementById('scrim');
    const drawer = document.getElementById('drawer');
    if (!drawer) { location.href = 'checkout.html'; return; }
    CartDrawer.render();
    drawer.classList.add('on');
    scrim.classList.add('on');
    document.body.classList.add('locked');
  },

  closeDrawer() { if (this._closeDrawer) this._closeDrawer(); },

  mobileNav() {
    const scrim = document.getElementById('mnavScrim');
    const nav = document.getElementById('mnav');
    const burger = document.getElementById('burger');
    if (!nav) return;
    const toggle = state => {
      const open = typeof state === 'boolean' ? state : !nav.classList.contains('on');
      nav.classList.toggle('on', open);
      scrim.classList.toggle('on', open);
      document.body.classList.toggle('locked', open);
      if (burger) burger.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    };
    if (burger) burger.addEventListener('click', () => toggle());
    scrim.addEventListener('click', () => toggle(false));
    nav.querySelectorAll('a,button').forEach(el => el.addEventListener('click', () => toggle(false)));
  }
};

/* ==========================================================================
   Cart drawer rendering
   ========================================================================== */
const CartDrawer = {
  render() {
    const body = document.getElementById('drawerBody');
    const foot = document.getElementById('drawerFoot');
    if (!body || !foot) return;
    const items = Cart.items();
    UI.cartBadge();

    if (!items.length) {
      body.innerHTML = `
        <div class="drawer-empty">
          <div class="big">🛍️</div>
          <h4>سلتك فارغة الآن</h4>
          <p>اختر الدورة المناسبة وابدأ رحلتك نحو +90</p>
          <a href="index.html#courses" class="btn btn-gold btn-sm" data-drawer-close>تصفح الدورات</a>
        </div>`;
      foot.innerHTML = '';
      body.querySelectorAll('[data-drawer-close]').forEach(b => b.addEventListener('click', UI.closeDrawer));
      return;
    }

    body.innerHTML = items.map(c => `
      <div class="ci">
        <img class="ci-img" src="${c.img}" alt="${c.name}">
        <div class="ci-inf">
          <h4>${c.shortName}</h4>
          <div class="p">${STORE.money(c.price)} <small>ريال</small> <s>${STORE.money(c.old)}</s></div>
          <div class="meta-pill" style="margin-top:6px"><i class="fa-solid fa-bolt"></i> وفّر ${STORE.money(STORE.savingOf(c))} ريال · ${STORE.discountOf(c)}%</div>
        </div>
        <button class="ci-del" data-remove="${c.id}" aria-label="حذف"><i class="fa-solid fa-trash-can"></i></button>
      </div>`).join('');

    const saved = Cart.saved();
    foot.innerHTML = `
      <div class="sum-row"><span>إجمالي قبل الخصم</span><span>${STORE.money(Cart.oldTotal())} ريال</span></div>
      <div class="sum-row saved"><span>خصم آخر العام (${STORE.campaign.month})</span><span>− ${STORE.money(saved)} ريال</span></div>
      <div class="sum-total"><span>الإجمالي</span><b>${STORE.money(Cart.total())} ريال</b></div>
      <button class="btn btn-gold btn-block" style="margin-top:14px" id="drawerCheckout">
        <i class="fa-solid fa-arrow-left"></i> إتمام الطلب
      </button>
      <div class="note-mini">يتم تأكيد الطلب عبر تيليجرام · بيانات التحويل تصلك من الدعم</div>`;

    body.querySelectorAll('[data-remove]').forEach(b => {
      b.addEventListener('click', () => {
        Cart.remove(b.dataset.remove);
        CartDrawer.render();
        UI.toast('تم حذف الدورة من السلة');
      });
    });
    const co = document.getElementById('drawerCheckout');
    if (co) co.addEventListener('click', () => {
      if (!Cart.count()) { UI.toast('السلة فارغة'); return; }
      location.href = 'checkout.html';
    });
  }
};

/* ==========================================================================
   Telegram handoff — the ready-made order message
   ========================================================================== */
function buildOrderMessage(customer) {
  const items = Cart.items();
  const lines = [];
  lines.push('🛒 *طلب اشتراك جديد — أكاديمية عايد*');
  lines.push('_عروض خصومات آخر العام — ديسمبر 2026_');
  lines.push('━━━━━━━━━━━━━━━━━━');
  lines.push('👤 *الاسم:* ' + customer.name);
  lines.push('📱 *الجوال:* ' + customer.phone);
  if (customer.email) lines.push('📧 *البريد:* ' + customer.email);
  lines.push('🎯 *الدرجة المستهدفة:* ' + customer.target);
  if (customer.note) lines.push('📝 *ملاحظة:* ' + customer.note);
  lines.push('━━━━━━━━━━━━━━━━━━');
  lines.push('📚 *الدورات المطلوبة:*');
  items.forEach((c, i) => {
    lines.push(`${i + 1}) ${c.name}`);
    lines.push(`   • السعر بعد الخصم: ${STORE.money(c.price)} ريال (بدل ${STORE.money(c.old)})`);
    lines.push(`   • الخصم: ${STORE.discountOf(c)}% — توفير ${STORE.money(STORE.savingOf(c))} ريال`);
  });
  lines.push('━━━━━━━━━━━━━━━━━━');
  lines.push(`💰 *الإجمالي المستحق:* ${STORE.money(Cart.total())} ريال`);
  lines.push(`🔻 *إجمالي التوفير:* ${STORE.money(Cart.saved())} ريال`);
  lines.push(`🧾 *رقم الطلب:* ${customer.orderId}`);
  lines.push(`🕐 *تاريخ الطلب:* ${customer.date}`);
  lines.push('━━━━━━━━━━━━━━━━━━');
  lines.push('أرغب باستلام بيانات التحويل وتأكيد الاشتراك 🙏');
  return lines.join('\n');
}

function makeOrderId() {
  const d = new Date();
  return 'AYD-' +
    String(d.getFullYear()).slice(2) +
    STORE.pad(d.getMonth() + 1) +
    STORE.pad(d.getDate()) + '-' +
    Math.floor(1000 + Math.random() * 9000);
}

/* ==========================================================================
   Shared bootstrap
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  Cart.load();

  /* Year stamps */
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  /* Telegram links */
  document.querySelectorAll('[data-tg]').forEach(a => { a.href = STORE.brand.telegramUrl; });

  UI.header();
  UI.drawer();
  UI.mobileNav();
  UI.cartBadge();
  UI.reveal();
  UI.countdown();

  /* Drawer openers + add-to-cart via delegation (works for dynamic content) */
  document.addEventListener('click', e => {
    const openBtn = e.target.closest('[data-open-cart]');
    if (openBtn) {
      e.preventDefault();
      if (document.getElementById('drawer')) UI.openDrawer();
      else location.href = 'checkout.html';
      return;
    }

    const addBtn = e.target.closest('[data-add]');
    if (addBtn) {
      e.preventDefault();
      e.stopPropagation();
      const id = addBtn.dataset.add;
      const isNew = Cart.add(id);
      UI.cartBadge();
      UI.toast(isNew ? 'تمت إضافة الدورة إلى السلة ✓' : 'الدورة موجودة في سلتك بالفعل');
      if (document.getElementById('drawer')) {
        UI.openDrawer();
      }
    }
  });

  /* FAQ accordion */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const ans = item.querySelector('.faq-a');
      const open = item.classList.toggle('open');
      ans.style.maxHeight = open ? ans.scrollHeight + 'px' : 0;
    });
  });

  /* Nav active state by section */
  const secs = document.querySelectorAll('[data-nav-sec]');
  if (secs.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('active', a.dataset.navSec === en.target.dataset.navSec));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(s => io.observe(s));
  }
});
