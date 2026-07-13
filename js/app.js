/* =====================================================
   أكاديمية عايد للتدريب | STEP 2026
   Main App — Cart · Checkout · Telegram Deep Link Fix
   v3.0 — July 2026
   ===================================================== */

/* ══════════════════ DATA ══════════════════ */
const COURSES = {
  1: { id:1, name:'دورة STEP المميزة',  fullName:'دورة STEP المميزة (تحديث 2026)',  icon:'💎', price:249, original:749,  access:'90 يوم',      color:'gold'  },
  2: { id:2, name:'دورة STEP المكثفة',  fullName:'دورة STEP المكثفة (تحديث 2026)',  icon:'⚡', price:199, original:549,  access:'90 يوم',      color:'blue'  },
  3: { id:3, name:'دورة STEP الشاملة',  fullName:'دورة STEP الشاملة (تحديث 2026)',  icon:'📚', price:149, original:399,  access:'مدى الحياة', color:'green' }
};

/* ══ Telegram Config ══
   نستخدم https://t.me مع ?text= — هذا هو الـ Deep Link الصحيح
   الذي يفتح تطبيق تيليجرام مباشرةً على الجهاز ويعبئ النص تلقائياً.
   يعمل على: iOS / Android / Desktop / Web
   لا نستخدم sms: أو روابط الـ SMS أبداً
══ */
const TG_USERNAME = 'Ayed_Academy_2026';
const TG_BASE     = 'https://t.me/' + TG_USERNAME;
const TG_BASE_ALT = 'https://telegram.me/' + TG_USERNAME;

/* بناء رابط تيليجرام Deep Link الصحيح */
function buildTgDeepLink(message) {
  /* encodeURIComponent يحوّل كل الأحرف العربية وغيرها
     إلى صيغة %XX آمنة تعمل في كل المتصفحات */
  const encoded = encodeURIComponent(message);
  return TG_BASE + '?text=' + encoded;
}

/* ══════════════════ STATE ══════════════════ */
let cart         = [];
let customerData = {};
let cartOpen     = false;
let currentPage  = 'main';

/* ══════════════════ PAGE MANAGEMENT ══════════════════ */
const MAIN_SELECTORS = [
  '.urgency-bar','.announce-bar','#header','.hero','.trust-bar',
  '.scroll-progress','.courses-section','.features-section',
  '.testimonials-section','.about-section','.guarantee-section',
  '.faq-section','.cta-section','.footer',
  '.cart-overlay','#cartSidebar','#toast','#floatCart','#backToTop'
];

function showPage(pg) {
  currentPage = pg;
  const mains      = MAIN_SELECTORS.map(s=>document.querySelector(s)).filter(Boolean);
  const pgCheckout = document.getElementById('pgCheckout');
  const pgTelegram = document.getElementById('pgTelegram');

  mains.forEach(el => {
    el.style.display = pg === 'main' ? '' : 'none';
  });
  if (pgCheckout) pgCheckout.style.display = pg === 'checkout' ? 'block' : 'none';
  if (pgTelegram) pgTelegram.style.display = pg === 'telegram' ? 'block' : 'none';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ══════════════════ CART ══════════════════ */
function addToCart(id) {
  if (cart.find(c => c.id === id)) {
    showToast('⚠️ هذه الدورة في سلتك بالفعل!', 'warning');
    return;
  }
  cart.push({ ...COURSES[id] });
  renderCart();
  markCard(id, true);
  showToast(`✅ تمت إضافة "${COURSES[id].name}" للسلة`, 'success');
  if (cart.length === 1) openCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  renderCart();
  markCard(id, false);
}

function addAllToCart() {
  let added = 0;
  [1,2,3].forEach(id => {
    if (!cart.find(c => c.id === id)) {
      cart.push({ ...COURSES[id] });
      markCard(id, true);
      added++;
    }
  });
  renderCart();
  if (added) {
    showToast(`✅ تمت إضافة ${added} دورة للسلة`, 'success');
    openCart();
  } else {
    showToast('⚠️ جميع الدورات في سلتك!', 'warning');
  }
}

function buyNow(id) {
  if (!cart.find(c => c.id === id)) addToCart(id);
  goToCheckout();
}

function markCard(id, inCart) {
  const btn  = document.getElementById('addBtn' + id);
  const card = document.getElementById('course-card-' + id);
  if (btn) {
    btn.innerHTML = inCart
      ? '<i class="fas fa-check-circle"></i> تمت الإضافة ✓'
      : '<i class="fas fa-cart-plus"></i> أضف إلى السلة';
    btn.classList.toggle('added', inCart);
  }
  if (card) card.classList.toggle('in-cart', inCart);
}

/* ══════════════════ RENDER CART ══════════════════ */
function renderCart() {
  const total    = cart.reduce((s, c) => s + c.price,    0);
  const original = cart.reduce((s, c) => s + c.original, 0);
  const discount = original - total;
  const count    = cart.length;

  const cc = document.getElementById('cartCount');
  if (cc) {
    cc.textContent  = count;
    cc.dataset.count = count;
    cc.classList.remove('bump');
    void cc.offsetWidth;
    cc.classList.add('bump');
  }

  const lbl = document.getElementById('cartTotalLabel');
  if (lbl) lbl.textContent = count > 0 ? `${total} ر.س` : 'السلة';

  const fc  = document.getElementById('floatCart');
  const fcc = document.getElementById('floatCount');
  if (fc)  fc.classList.toggle('visible', count > 0);
  if (fcc) fcc.textContent = count;

  const empty = document.getElementById('cartEmpty');
  const items = document.getElementById('cartItems');
  const foot  = document.getElementById('cartFoot');

  if (empty) empty.style.display = count === 0 ? '' : 'none';
  if (foot)  foot.style.display  = count > 0   ? '' : 'none';

  if (items) {
    items.innerHTML = '';
    cart.forEach(c => {
      const el = document.createElement('div');
      el.className = 'cart-item-card';
      el.innerHTML = `
        <div class="cart-item-emoji">${c.icon}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${c.name}</div>
          <div class="cart-item-price">${c.price} ر.س</div>
          <div class="cart-item-was">بدل ${c.original} ر.س</div>
        </div>
        <button class="cart-rm-btn" onclick="removeFromCart(${c.id})" title="إزالة">
          <i class="fas fa-trash-alt"></i>
        </button>`;
      items.appendChild(el);
    });
  }

  const co = document.getElementById('cOriginal');
  const cd = document.getElementById('cDiscount');
  const ct = document.getElementById('cTotal');
  if (co) co.textContent = `${original} ر.س`;
  if (cd) cd.textContent = `-${discount} ر.س`;
  if (ct) ct.textContent = `${total} ر.س`;
}

/* ══════════════════ CART TOGGLE ══════════════════ */
function openCart()   { cartOpen = true;  applyCartState(); }
function closeCart()  { cartOpen = false; applyCartState(); }
function toggleCart() { cartOpen = !cartOpen; applyCartState(); }

function applyCartState() {
  const sb = document.getElementById('cartSidebar');
  const ov = document.getElementById('cartOverlay');
  if (sb) sb.classList.toggle('open', cartOpen);
  if (ov) ov.classList.toggle('open', cartOpen);
  document.body.style.overflow = cartOpen ? 'hidden' : '';
}

/* ══════════════════ TOAST ══════════════════ */
let toastTimer;
function showToast(msg, type = 'info') {
  const t  = document.getElementById('toast');
  const tm = document.getElementById('toastMsg');
  if (!t) return;
  clearTimeout(toastTimer);
  const icons = { success: '✅', warning: '⚠️', info: 'ℹ️', error: '❌' };
  t.querySelector('.toast-icon').textContent = icons[type] || 'ℹ️';
  if (tm) tm.textContent = msg;
  t.className = `toast ${type} show`;
  toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
}

/* ══════════════════ CHECKOUT ══════════════════ */
function goToCheckout() {
  if (cart.length === 0) {
    showToast('🛒 السلة فارغة! اختر دورة أولاً', 'warning');
    return;
  }
  closeCart();
  buildCheckoutPage();
  showPage('checkout');
}

function goBackToMain() {
  showPage('main');
  setTimeout(() => {
    const el = document.getElementById('courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 200);
}

function goToTelegramPage() { buildTelegramPage(); showPage('telegram'); }
function goBackToCheckout() { showPage('checkout'); }

/* ══════════════════ BUILD CHECKOUT PAGE ══════════════════ */
function buildCheckoutPage() {
  let pg = document.getElementById('pgCheckout');
  if (!pg) {
    pg = document.createElement('div');
    pg.id = 'pgCheckout';
    pg.style.display = 'none';
    document.body.appendChild(pg);
  }

  const total    = cart.reduce((s, c) => s + c.price,    0);
  const original = cart.reduce((s, c) => s + c.original, 0);
  const discount = original - total;

  const coursesHTML = cart.map(c => `
    <div class="sum-course">
      <div class="sum-course-em">${c.icon}</div>
      <div class="sum-course-info">
        <div class="sum-course-name">${c.name}</div>
        <div class="sum-course-sub">وصول ${c.access}</div>
      </div>
      <div class="sum-course-p">${c.price} ر.س</div>
    </div>`).join('');

  pg.innerHTML = `
    <div class="pg-header">
      <div class="container">
        <div class="pg-header-inner">
          <button class="pg-back" onclick="goBackToMain()">
            <i class="fas fa-arrow-right"></i> العودة للمتجر
          </button>
          <img src="images/logo.png" class="pg-logo" alt="الأكاديمية">
          <div class="steps-wrap">
            <div class="step active"><span class="step-n">1</span><span>بياناتك</span></div>
            <span class="step-sep">›</span>
            <div class="step"><span class="step-n">2</span><span>إرسال الطلب</span></div>
            <span class="step-sep">›</span>
            <div class="step"><span class="step-n">3</span><span>التأكيد</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="pg-body">
      <div class="form-card">
        <h2><i class="fas fa-user-edit"></i> بياناتك الشخصية</h2>
        <p class="form-sub">أدخل بياناتك بدقة لإتمام عملية التسجيل وتفعيل الدورة</p>
        <form id="checkoutForm" onsubmit="submitForm(event)" novalidate>
          <div class="fgroup">
            <label class="flabel">الاسم الكامل <span class="req">*</span></label>
            <input type="text" id="fName" class="finput" placeholder="أدخل اسمك الكامل" required autocomplete="name">
            <div class="ferr" id="errName"><i class="fas fa-exclamation-circle"></i> يرجى إدخال الاسم الكامل</div>
          </div>
          <div class="fgroup">
            <label class="flabel">رقم الجوال (واتساب) <span class="req">*</span></label>
            <input type="tel" id="fPhone" class="finput" placeholder="05XXXXXXXX" required autocomplete="tel">
            <div class="ferr" id="errPhone"><i class="fas fa-exclamation-circle"></i> يرجى إدخال رقم جوال صحيح</div>
          </div>
          <div class="fgroup">
            <label class="flabel">البريد الإلكتروني <span class="req">*</span></label>
            <input type="email" id="fEmail" class="finput" placeholder="example@email.com" required autocomplete="email">
            <div class="ferr" id="errEmail"><i class="fas fa-exclamation-circle"></i> يرجى إدخال بريد إلكتروني صحيح</div>
          </div>
          <div class="fgroup">
            <label class="flabel">الدرجة المستهدفة في STEP <span class="req">*</span></label>
            <select id="fScore" class="finput" required>
              <option value="">— اختر درجتك المستهدفة —</option>
              <option value="60-69">60 – 69 (مقبول)</option>
              <option value="70-79">70 – 79 (جيد)</option>
              <option value="80-89">80 – 89 (جيد جداً)</option>
              <option value="+90">+90 (ممتاز)</option>
            </select>
            <div class="ferr" id="errScore"><i class="fas fa-exclamation-circle"></i> يرجى اختيار الدرجة المستهدفة</div>
          </div>
          <button type="submit" class="btn-submit">
            <i class="fab fa-telegram"></i> المتابعة لإرسال الطلب عبر تيليجرام
          </button>
        </form>
      </div>

      <div class="summary-panel">
        <div class="sum-card">
          <h3><i class="fas fa-receipt"></i> ملخص طلبك</h3>
          ${coursesHTML}
          <div class="sum-totals">
            <div class="sum-row"><span>المجموع الأصلي</span><span>${original} ر.س</span></div>
            <div class="sum-row"><span>الخصم</span><span class="sum-disc">-${discount} ر.س</span></div>
            <div class="sum-row big"><span>الإجمالي</span><span class="sum-val">${total} ر.س</span></div>
          </div>
        </div>
        <div class="trust-card">
          <h4><i class="fab fa-telegram"></i> كيف يتم الدفع؟</h4>
          <ul>
            <li><i class="fas fa-check-circle"></i> أدخل بياناتك واضغط متابعة</li>
            <li><i class="fas fa-check-circle"></i> سيفتح تيليجرام برسالة جاهزة</li>
            <li><i class="fas fa-check-circle"></i> الفريق يرسل تفاصيل الدفع</li>
            <li><i class="fas fa-check-circle"></i> بعد الدفع يُفعَّل وصولك فوراً</li>
          </ul>
        </div>
      </div>
    </div>`;
}

/* ══════════════════ FORM VALIDATION ══════════════════ */
function validateForm() {
  let ok = true;

  const name  = document.getElementById('fName').value.trim();
  const phone = document.getElementById('fPhone').value.trim();
  const email = document.getElementById('fEmail').value.trim();
  const score = document.getElementById('fScore').value;

  const setErr = (errId, inputId, show) => {
    document.getElementById(errId).classList.toggle('show', show);
    document.getElementById(inputId).classList.toggle('err', show);
  };

  if (!name  || name.length  < 3)                              { setErr('errName',  'fName',  true);  ok = false; } else setErr('errName',  'fName',  false);
  if (!phone || phone.length < 9)                              { setErr('errPhone', 'fPhone', true);  ok = false; } else setErr('errPhone', 'fPhone', false);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))    { setErr('errEmail', 'fEmail', true);  ok = false; } else setErr('errEmail', 'fEmail', false);
  if (!score)                                                  { setErr('errScore', 'fScore', true);  ok = false; } else setErr('errScore', 'fScore', false);

  return ok;
}

function submitForm(e) {
  e.preventDefault();
  if (!validateForm()) return;
  customerData = {
    name:  document.getElementById('fName').value.trim(),
    phone: document.getElementById('fPhone').value.trim(),
    email: document.getElementById('fEmail').value.trim(),
    score: document.getElementById('fScore').value
  };
  goToTelegramPage();
}

/* ══════════════════════════════════════════════════════
   BUILD TELEGRAM MESSAGE — بناء رسالة التيليجرام
══════════════════════════════════════════════════════ */
function buildTelegramMessage(coursesList, total) {
  return (
    '🎓 طلب اشتراك جديد — أكاديمية عايد للتدريب | ستيب 2026\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
    '👤 الاسم: ' + customerData.name + '\n' +
    '📱 الجوال: ' + customerData.phone + '\n' +
    '📧 البريد: ' + customerData.email + '\n' +
    '🎯 الدرجة المستهدفة: ' + customerData.score + '\n\n' +
    '🛒 الدورات المطلوبة:\n' +
    coursesList + '\n\n' +
    '💰 الإجمالي: ' + total + ' ريال سعودي\n\n' +
    '📌 أرجو إرسال تفاصيل الدفع وتأكيد الاشتراك.\n' +
    'شكراً لأكاديمية عايد للتدريب 🙏'
  );
}

/* ══════════════════════════════════════════════════════
   BUILD TELEGRAM PAGE — صفحة إتمام الطلب عبر تيليجرام
   الإصلاح الرئيسي: استخدام Deep Link الصحيح
   https://t.me/USERNAME?text=ENCODED_MESSAGE
   يعمل على كل الأجهزة والمتصفحات بدون حظر
══════════════════════════════════════════════════════ */
function buildTelegramPage() {
  let pg = document.getElementById('pgTelegram');
  if (!pg) {
    pg = document.createElement('div');
    pg.id = 'pgTelegram';
    pg.style.display = 'none';
    document.body.appendChild(pg);
  }

  const total      = cart.reduce((s, c) => s + c.price,    0);
  const original   = cart.reduce((s, c) => s + c.original, 0);
  const discount   = original - total;
  const courseNames= cart.map(c => c.name).join(' + ');
  const coursesList= cart.map(c => c.icon + ' ' + c.fullName + ' — ' + c.price + ' ر.س').join('\n');

  /* ══ بناء الرسالة والرابط — الإصلاح الجوهري ══ */
  const msgText    = buildTelegramMessage(coursesList, total);
  const deepLink   = buildTgDeepLink(msgText);          /* الرابط الصحيح */
  const msgPreview = msgText.replace(/\n/g, '<br>');

  pg.innerHTML = `
    <div class="pg-header">
      <div class="container">
        <div class="pg-header-inner">
          <button class="pg-back" onclick="goBackToCheckout()">
            <i class="fas fa-arrow-right"></i> العودة لبياناتك
          </button>
          <img src="images/logo.png" class="pg-logo" alt="الأكاديمية">
          <div class="steps-wrap">
            <div class="step done"><span class="step-n"><i class="fas fa-check" style="font-size:9px"></i></span><span>بياناتك</span></div>
            <span class="step-sep">›</span>
            <div class="step active"><span class="step-n">2</span><span>إرسال الطلب</span></div>
            <span class="step-sep">›</span>
            <div class="step"><span class="step-n">3</span><span>التأكيد</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="tg-page-body">

      <!-- ملخص الطلب السريع -->
      <div class="order-mini">
        <div class="order-mini-top">
          <i class="fas fa-shopping-bag"></i>
          <span class="order-mini-courses">${courseNames}</span>
          <span class="order-mini-total">${total} ر.س</span>
        </div>
        <div class="order-mini-info">
          <span><i class="fas fa-user"></i> ${customerData.name}</span>
          <span><i class="fas fa-phone"></i> ${customerData.phone}</span>
          <span><i class="fas fa-bullseye"></i> ${customerData.score}</span>
        </div>
      </div>

      <!-- البطاقة الرئيسية -->
      <div class="tg-main-card">

        <!-- Header البطاقة -->
        <div class="tg-card-header">
          <div class="tg-icon-wrap">
            <i class="fab fa-telegram"></i>
          </div>
          <h2>أرسل طلبك عبر تيليجرام</h2>
          <p>اضغط الزر أدناه — سيفتح تيليجرام مباشرةً مع رسالتك جاهزة للإرسال</p>
        </div>

        <!-- معاينة الرسالة -->
        <div class="tg-message-preview">
          <div class="tg-msg-label">
            <i class="fas fa-eye"></i>
            معاينة الرسالة التي ستُرسَل تلقائياً
          </div>
          <div class="tg-msg-content">${msgPreview}</div>
        </div>

        <!-- زر تيليجرام الرئيسي — Deep Link مُصحَّح -->
        <a href="${deepLink}"
           target="_blank"
           rel="noopener noreferrer"
           class="btn-tg-main"
           id="mainTgBtn"
           onclick="event.preventDefault(); handleTgClick(event, '${deepLink.replace(/'/g,"\\'")}')">
          <div class="tg-btn-inner">
            <i class="fab fa-telegram tg-btn-icon"></i>
            <div class="tg-btn-text">
              <span class="tg-btn-title">افتح تيليجرام وأرسل الطلب الآن</span>
              <span class="tg-btn-sub">الرسالة جاهزة — فقط اضغط إرسال في تيليجرام</span>
            </div>
            <i class="fas fa-arrow-left tg-btn-arrow"></i>
          </div>
        </a>

        <!-- تعليمات الخطوات -->
        <div class="tg-steps-guide">
          <h4><i class="fas fa-list-ol"></i> خطوات إتمام الطلب</h4>
          <div class="tg-steps-list">
            <div class="tg-step-item">
              <div class="tg-step-num">1</div>
              <div class="tg-step-info">
                <strong>اضغط الزر الأزرق أعلاه</strong>
                <span>سيفتح تيليجرام مع الرسالة مُعبَّأة تلقائياً</span>
              </div>
            </div>
            <div class="tg-step-item">
              <div class="tg-step-num">2</div>
              <div class="tg-step-info">
                <strong>اضغط "إرسال" في تيليجرام</strong>
                <span>أرسل الرسالة لفريق الدعم في @Ayed_Academy_2026</span>
              </div>
            </div>
            <div class="tg-step-item">
              <div class="tg-step-num">3</div>
              <div class="tg-step-info">
                <strong>استلم تفاصيل الدفع</strong>
                <span>يرد عليك الفريق بتفاصيل التحويل خلال ساعة</span>
              </div>
            </div>
            <div class="tg-step-item">
              <div class="tg-step-num">4</div>
              <div class="tg-step-info">
                <strong>تفعيل الدورة فوراً ✅</strong>
                <span>بعد تأكيد الدفع يُفعَّل وصولك للدورة مباشرةً</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ملاحظات -->
        <div class="tg-notes">
          <div class="tg-note-item">
            <i class="fas fa-clock"></i>
            <span>الرد خلال ساعة أو أقل</span>
          </div>
          <div class="tg-note-item">
            <i class="fas fa-lock"></i>
            <span>بياناتك محمية تماماً</span>
          </div>
          <div class="tg-note-item">
            <i class="fas fa-bolt"></i>
            <span>وصول فوري بعد الدفع</span>
          </div>
        </div>

        <div class="tg-divider">لم يفتح تيليجرام؟</div>

        <!-- زر بديل للنسخ اليدوي -->
        <button class="btn-copy-msg" id="copyMsgBtn" onclick="copyTgMessage()">
          <i class="fas fa-copy"></i>
          انسخ الرسالة وأرسلها يدوياً
        </button>

        <a href="${TG_BASE}" target="_blank" rel="noopener" class="btn-tg-direct">
          <i class="fab fa-telegram"></i>
          افتح @Ayed_Academy_2026 مباشرةً
        </a>

      </div>
    </div>`;

  /* حفظ الرسالة للنسخ اليدوي */
  pg._msgText  = msgText;
  pg._deepLink = deepLink;
}

/* ══════════════════════════════════════════════════════
   HANDLE TG CLICK — معالجة الضغط على زر تيليجرام
   المنطق: نفتح الرابط ونُظهر modal التأكيد
══════════════════════════════════════════════════════ */
function handleTgClick(e, link) {
  /* تحديث حالة الزر */
  const btn = document.getElementById('mainTgBtn');
  if (btn) {
    btn.classList.add('sent');
    const title = btn.querySelector('.tg-btn-title');
    const sub   = btn.querySelector('.tg-btn-sub');
    if (title) title.textContent = 'تم فتح تيليجرام ✅';
    if (sub)   sub.textContent   = 'أرسل الرسالة وانتظر رد الفريق';
  }

  /* محاولة فتح تيليجرام بطرق متعددة للتوافق مع جميع الأجهزة */
  try {
    /* الطريقة الأولى: نفتح الرابط في نافذة جديدة */
    const newWin = window.open(link, '_blank', 'noopener,noreferrer');
    if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
      /* الطريقة الثانية: نوجّه المتصفح مباشرة */
      window.location.href = link;
    }
  } catch(err) {
    window.location.href = link;
  }

  /* عرض Modal التأكيد */
  const total = cart.reduce((s, c) => s + c.price, 0);
  setTimeout(() => showSuccessModal(total, link), 800);
}

/* ══════════════════ COPY TG MESSAGE ══════════════════ */
function copyTgMessage() {
  const pg  = document.getElementById('pgTelegram');
  const msg = pg?._msgText || '';
  const btn = document.getElementById('copyMsgBtn');

  const doCopy = () => {
    if (btn) {
      btn.classList.add('copied');
      btn.innerHTML = '<i class="fas fa-check"></i> تم النسخ! افتح تيليجرام والصق الرسالة';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = '<i class="fas fa-copy"></i> انسخ الرسالة وأرسلها يدوياً';
      }, 3000);
    }
    showToast('✅ تم نسخ الرسالة — الصقها في تيليجرام', 'success');
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(msg).then(doCopy).catch(() => {
      fallbackCopy(msg);
      doCopy();
    });
  } else {
    fallbackCopy(msg);
    doCopy();
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { document.execCommand('copy'); } catch(_) {}
  document.body.removeChild(ta);
}

/* ══════════════════ SUCCESS MODAL ══════════════════ */
function showSuccessModal(total, deepLink) {
  if (document.querySelector('.success-modal-wrap')) return;
  const link = deepLink || buildTgDeepLink('');
  const wrap = document.createElement('div');
  wrap.className = 'success-modal-wrap';
  wrap.innerHTML = `
    <div class="success-modal">
      <button class="modal-close-x" onclick="this.closest('.success-modal-wrap').remove()" aria-label="إغلاق">
        <i class="fas fa-times"></i>
      </button>
      <div class="success-em">🎉</div>
      <h2>طلبك في الطريق!</h2>
      <p>
        تم فتح تيليجرام مع رسالتك الجاهزة.<br>
        اضغط <strong>إرسال</strong> في تيليجرام وانتظر رد الفريق.<br>
        بعد تأكيد الدفع يتم تفعيل دورتك فوراً ✅
      </p>
      <div class="success-amount">
        <p>💰 إجمالي طلبك</p>
        <strong>${total} ريال سعودي</strong>
      </div>
      <a href="${link}" target="_blank" rel="noopener" class="btn-open-tg">
        <i class="fab fa-telegram"></i> أعِد فتح تيليجرام
      </a>
      <button class="btn-back-home" onclick="this.closest('.success-modal-wrap').remove(); showPage('main');">
        <i class="fas fa-home"></i> العودة للصفحة الرئيسية
      </button>
    </div>`;
  document.body.appendChild(wrap);
}

/* ══════════════════ FAQ ══════════════════ */
function toggleFaq(qEl) {
  const item   = qEl.closest('.faq-item');
  const answer = item.querySelector('.faq-a');
  const isOpen = item.classList.contains('open');

  document.querySelectorAll('.faq-item').forEach(i => {
    i.classList.remove('open');
    const a = i.querySelector('.faq-a');
    if (a) a.classList.remove('open');
  });

  if (!isOpen) {
    item.classList.add('open');
    if (answer) answer.classList.add('open');
  }
}

/* ══════════════════ MOBILE MENU ══════════════════ */
function toggleMobileMenu() {
  const nav = document.getElementById('mobileNav');
  const btn = document.getElementById('mobileMenuBtn');
  if (!nav) return;
  nav.classList.toggle('open');
  const ic = btn?.querySelector('i');
  if (ic) ic.className = nav.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
}

function closeMobileMenu() {
  const nav = document.getElementById('mobileNav');
  const btn = document.getElementById('mobileMenuBtn');
  if (nav) nav.classList.remove('open');
  const ic = btn?.querySelector('i');
  if (ic) ic.className = 'fas fa-bars';
}

/* ══════════════════ SCROLL EFFECTS ══════════════════ */
window.addEventListener('scroll', () => {
  /* Header shadow */
  const h = document.getElementById('header');
  if (h) h.classList.toggle('scrolled', window.scrollY > 60);

  /* Scroll progress bar */
  const prog = document.getElementById('scrollProgress');
  if (prog) {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (docH > 0 ? (window.scrollY / docH) * 100 : 0) + '%';
  }

  /* Back-to-top */
  const btt = document.getElementById('backToTop');
  if (btt) btt.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

/* ══════════════════ SCROLL REVEAL ══════════════════ */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
}

/* ══════════════════ COUNTDOWN TIMER ══════════════════ */
function initCountdown() {
  const now      = new Date();
  const end      = new Date(now);
  end.setHours(23, 59, 59, 0);
  const endTime  = end.getTime();

  function tick() {
    const diff = endTime - Date.now();
    if (diff <= 0) return;
    const h   = Math.floor(diff / 3600000);
    const m   = Math.floor((diff % 3600000) / 60000);
    const s   = Math.floor((diff % 60000)   / 1000);
    const pad = n => String(n).padStart(2, '0');

    ['cdH','cdM','cdS'].forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) el.textContent = pad([h, m, s][i]);
    });
    ['ctaCdH','ctaCdM','ctaCdS'].forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) el.textContent = pad([h, m, s][i]);
    });
  }
  tick();
  setInterval(tick, 1000);
}

/* ══════════════════ LIVE VISITORS ══════════════════ */
function initLiveVisitors() {
  const el = document.getElementById('liveCount');
  if (!el) return;
  let base = 35 + Math.floor(Math.random() * 30);
  el.textContent = base;
  setInterval(() => {
    base = Math.max(18, Math.min(99, base + Math.floor(Math.random() * 5) - 2));
    el.textContent = base;
  }, 8000);
}

/* ══════════════════ SOCIAL PROOF ROTATOR ══════════════════ */
function initSocialProof() {
  const msgs = [
    'أحمد من الرياض اشترك للتو في دورة STEP المميزة 💎',
    'نورة من جدة أضافت دورة STEP المكثفة للسلة ⚡',
    'محمد من الدمام حقق درجة 88 بعد الدورة الشاملة 🎉',
    'سارة من مكة اشتركت في الحزمة الكاملة 🎁',
    'عبدالله من القصيم أنهى الدورة المميزة بدرجة 92 ⭐',
    'ريم من الطائف تُكمل الدورة المكثفة الآن 📚',
    'خالد من تبوك اشترى دورة STEP الشاملة 🏆',
    'فاطمة من المدينة حصلت على درجة 85 ✅',
  ];
  const el = document.getElementById('spText');
  if (!el) return;
  let i = 0;
  setInterval(() => {
    i = (i + 1) % msgs.length;
    el.style.opacity   = '0';
    el.style.transform = 'translateY(-8px)';
    setTimeout(() => {
      el.textContent     = msgs[i];
      el.style.transition = 'all .4s ease';
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    }, 350);
  }, 4500);
}

/* ══════════════════ ANIMATED STAT COUNTERS ══════════════════ */
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target);
      const dur    = 1800;
      const step   = 16;
      const inc    = target / (dur / step);
      let cur      = 0;
      const t = setInterval(() => {
        cur += inc;
        if (cur >= target) {
          el.textContent = '+' + target.toLocaleString('ar-SA');
          clearInterval(t);
        } else {
          el.textContent = '+' + Math.floor(cur).toLocaleString('ar-SA');
        }
      }, step);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => obs.observe(el));
}

/* ══════════════════ BACK TO TOP ══════════════════ */
function initBackToTop() {
  if (!document.getElementById('backToTop')) {
    const btn = document.createElement('button');
    btn.id        = 'backToTop';
    btn.className = 'back-to-top';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.setAttribute('aria-label', 'العودة للأعلى');
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(btn);
  }
}

/* ══════════════════ STOCK BARS ══════════════════ */
function injectStockBars() {
  const data = {
    1: { pct: 73, label: '٧٣٪ من المقاعد ممتلئة' },
    2: { pct: 58, label: '٥٨٪ من المقاعد ممتلئة' },
    3: { pct: 45, label: '٤٥٪ من المقاعد ممتلئة' },
  };
  Object.entries(data).forEach(([id, { pct, label }]) => {
    const card = document.getElementById('course-card-' + id);
    if (!card) return;
    const priceBlock = card.querySelector('.price-block');
    if (!priceBlock) return;
    const bar = document.createElement('div');
    bar.className = 'stock-bar';
    bar.innerHTML = `
      <div class="stock-label">
        <span>الإقبال الحالي</span>
        <span class="stock-hot">🔥 ${label}</span>
      </div>
      <div class="stock-track">
        <div class="stock-fill" style="width:${pct}%"></div>
      </div>`;
    priceBlock.after(bar);
  });
}

/* ══════════════════ KEYBOARD ══════════════════ */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && cartOpen) closeCart();
});

/* ══════════════════ INIT ══════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  initReveal();
  initCountdown();
  initLiveVisitors();
  initSocialProof();
  initStatCounters();
  initBackToTop();
  injectStockBars();

  /* Smooth scroll for anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMobileMenu();
      }
    });
  });
});
