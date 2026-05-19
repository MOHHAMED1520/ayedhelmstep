/* =====================================================
   أكاديمية عايد للتدريب | STEP 2026
   Main App - Cart · Checkout · Telegram Direct
   ===================================================== */

/* ══════════════════ DATA ══════════════════ */
const COURSES = {
  1: { id:1, name:'دورة STEP المميزة',  fullName:'دورة STEP المميزة (تحديث 2026)',  icon:'💎', price:249, original:749,  access:'90 يوم',       color:'gold'  },
  2: { id:2, name:'دورة STEP المكثفة',  fullName:'دورة STEP المكثفة (تحديث 2026)',  icon:'⚡', price:199, original:549,  access:'90 يوم',       color:'blue'  },
  3: { id:3, name:'دورة STEP الشاملة',  fullName:'دورة STEP الشاملة (تحديث 2026)',  icon:'📚', price:149, original:399,  access:'مدى الحياة',  color:'green' }
};

const TG_LINK = 'https://t.me/Ayed_Academy_2026';

/* ══════════════════ STATE ══════════════════ */
let cart = [];
let customerData = {};
let cartOpen = false;
let currentPage = 'main';

/* ══════════════════ PAGE MANAGEMENT ══════════════════ */
const MAIN_SELECTORS = [
  '.announce-bar','#header','.hero','.trust-bar','.courses-section',
  '.features-section','.testimonials-section','.about-section',
  '.faq-section','.cta-section','.footer',
  '.cart-overlay','#cartSidebar','#toast','#floatCart'
];

function showPage(pg) {
  currentPage = pg;
  const mains = MAIN_SELECTORS.map(s=>document.querySelector(s)).filter(Boolean);
  const pgCheckout = document.getElementById('pgCheckout');
  const pgTelegram = document.getElementById('pgTelegram');

  mains.forEach(el => el.style.display = pg==='main' ? '' : 'none');
  if (pgCheckout) pgCheckout.style.display = pg==='checkout' ? 'block' : 'none';
  if (pgTelegram) pgTelegram.style.display = pg==='telegram' ? 'block' : 'none';

  window.scrollTo({ top:0, behavior:'smooth' });
}

/* ══════════════════ CART ══════════════════ */
function addToCart(id) {
  if (cart.find(c=>c.id===id)) { showToast('⚠️ هذه الدورة في سلتك بالفعل!','warning'); return; }
  cart.push({...COURSES[id]});
  renderCart();
  markCard(id, true);
  showToast(`✅ تمت إضافة "${COURSES[id].name}" للسلة`,'success');
  if (cart.length===1) openCart();
}

function removeFromCart(id) {
  cart = cart.filter(c=>c.id!==id);
  renderCart();
  markCard(id, false);
}

function addAllToCart() {
  let added=0;
  [1,2,3].forEach(id=>{
    if (!cart.find(c=>c.id===id)){ cart.push({...COURSES[id]}); markCard(id,true); added++; }
  });
  renderCart();
  if (added) { showToast(`✅ تمت إضافة ${added} دورة للسلة`,'success'); openCart(); }
  else showToast('⚠️ جميع الدورات في سلتك!','warning');
}

function buyNow(id) {
  if (!cart.find(c=>c.id===id)) addToCart(id);
  goToCheckout();
}

function markCard(id, inCart) {
  const btn  = document.getElementById('addBtn'+id);
  const card = document.getElementById('course-card-'+id);
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
  const total    = cart.reduce((s,c)=>s+c.price,0);
  const original = cart.reduce((s,c)=>s+c.original,0);
  const discount = original - total;
  const count    = cart.length;

  const cc = document.getElementById('cartCount');
  if (cc) {
    cc.textContent=count;
    cc.dataset.count=count;
    cc.classList.remove('bump');
    void cc.offsetWidth;
    cc.classList.add('bump');
  }

  const lbl = document.getElementById('cartTotalLabel');
  if (lbl) lbl.textContent = count>0 ? `${total} ر.س` : 'السلة';

  const fc = document.getElementById('floatCart');
  const fcc= document.getElementById('floatCount');
  if (fc)  fc.classList.toggle('visible', count>0);
  if (fcc) fcc.textContent = count;

  const empty = document.getElementById('cartEmpty');
  const items = document.getElementById('cartItems');
  const foot  = document.getElementById('cartFoot');

  if (empty) empty.style.display = count===0 ? '' : 'none';
  if (foot)  foot.style.display  = count>0   ? '' : 'none';

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
function openCart()  { cartOpen=true;  applyCartState(); }
function closeCart() { cartOpen=false; applyCartState(); }
function toggleCart(){ cartOpen=!cartOpen; applyCartState(); }
function applyCartState() {
  const sb = document.getElementById('cartSidebar');
  const ov = document.getElementById('cartOverlay');
  if (sb) sb.classList.toggle('open', cartOpen);
  if (ov) ov.classList.toggle('open', cartOpen);
  document.body.style.overflow = cartOpen ? 'hidden' : '';
}

/* ══════════════════ TOAST ══════════════════ */
let toastTimer;
function showToast(msg, type='info') {
  const t  = document.getElementById('toast');
  const tm = document.getElementById('toastMsg');
  if (!t) return;
  clearTimeout(toastTimer);
  const icons = { success:'✅', warning:'⚠️', info:'ℹ️', error:'❌' };
  t.querySelector('.toast-icon').textContent = icons[type]||'ℹ️';
  if (tm) tm.textContent = msg;
  t.className = `toast ${type} show`;
  toastTimer = setTimeout(()=>t.classList.remove('show'), 3500);
}

/* ══════════════════ CHECKOUT ══════════════════ */
function goToCheckout() {
  if (cart.length===0){ showToast('🛒 السلة فارغة! اختر دورة أولاً','warning'); return; }
  closeCart();
  buildCheckoutPage();
  showPage('checkout');
}

function goBackToMain() {
  showPage('main');
  setTimeout(()=>{ const el=document.getElementById('courses'); if(el) el.scrollIntoView({behavior:'smooth'}); },200);
}
function goToTelegramPage()   { buildTelegramPage(); showPage('telegram'); }
function goBackToCheckout()   { showPage('checkout'); }

/* ══════════════════ BUILD CHECKOUT PAGE ══════════════════ */
function buildCheckoutPage() {
  let pg = document.getElementById('pgCheckout');
  if (!pg) { pg=document.createElement('div'); pg.id='pgCheckout'; pg.style.display='none'; document.body.appendChild(pg); }

  const total    = cart.reduce((s,c)=>s+c.price,0);
  const original = cart.reduce((s,c)=>s+c.original,0);
  const discount = original-total;

  const coursesHTML = cart.map(c=>`
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
      <!-- Form -->
      <div class="form-card">
        <h2><i class="fas fa-user-edit"></i> بياناتك الشخصية</h2>
        <p class="form-sub">أدخل بياناتك بدقة لإتمام عملية التسجيل وتفعيل الدورة</p>

        <form id="checkoutForm" onsubmit="submitForm(event)" novalidate>
          <div class="fgroup">
            <label class="flabel">الاسم الكامل <span class="req">*</span></label>
            <input type="text" id="fName" class="finput" placeholder="أدخل اسمك الكامل" required>
            <div class="ferr" id="errName"><i class="fas fa-exclamation-circle"></i> يرجى إدخال الاسم الكامل</div>
          </div>
          <div class="fgroup">
            <label class="flabel">رقم التواصل (واتساب / جوال) <span class="req">*</span></label>
            <input type="tel" id="fPhone" class="finput" placeholder="05XXXXXXXX" required>
            <div class="ferr" id="errPhone"><i class="fas fa-exclamation-circle"></i> يرجى إدخال رقم جوال صحيح</div>
          </div>
          <div class="fgroup">
            <label class="flabel">البريد الإلكتروني <span class="req">*</span></label>
            <input type="email" id="fEmail" class="finput" placeholder="example@email.com" required>
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
            <i class="fas fa-arrow-left"></i> المتابعة لإتمام الطلب
          </button>
        </form>
      </div>

      <!-- Summary -->
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
          <h4><i class="fas fa-shield-alt"></i> ضمانات الشراء</h4>
          <ul>
            <li><i class="fas fa-check-circle"></i> وصول فوري بعد التأكيد</li>
            <li><i class="fas fa-check-circle"></i> محتوى محدّث ومضمون</li>
            <li><i class="fas fa-check-circle"></i> دعم مستمر عبر تيليجرام</li>
            <li><i class="fas fa-check-circle"></i> تحديثات مجانية</li>
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

  const setErr = (id, inputId, show) => {
    document.getElementById(id).classList.toggle('show', show);
    document.getElementById(inputId).classList.toggle('err', show);
  };

  if (!name||name.length<3)                  { setErr('errName','fName',true);  ok=false; } else setErr('errName','fName',false);
  if (!phone||phone.length<9)                { setErr('errPhone','fPhone',true); ok=false; } else setErr('errPhone','fPhone',false);
  if (!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('errEmail','fEmail',true); ok=false; } else setErr('errEmail','fEmail',false);
  if (!score)                                { setErr('errScore','fScore',true); ok=false; } else setErr('errScore','fScore',false);

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

/* ══════════════════ BUILD TELEGRAM PAGE (بدلاً من صفحة البنك) ══════════════════ */
function buildTelegramPage() {
  let pg = document.getElementById('pgTelegram');
  if (!pg) { pg=document.createElement('div'); pg.id='pgTelegram'; pg.style.display='none'; document.body.appendChild(pg); }

  const total    = cart.reduce((s,c)=>s+c.price,0);
  const original = cart.reduce((s,c)=>s+c.original,0);
  const discount = original-total;
  const courseNames = cart.map(c=>c.name).join(' + ');

  // بناء نص الرسالة الجاهزة
  const coursesList = cart.map(c=>`${c.icon} ${c.fullName} — ${c.price} ر.س`).join('\n');
  const telegramMessage = buildTelegramMessage(coursesList, total);
  const encodedMessage  = encodeURIComponent(telegramMessage);
  const telegramURL     = `${TG_LINK}?text=${encodedMessage}`;

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

      <!-- ملخص الطلب -->
      <div class="order-mini">
        <div class="order-mini-top">
          <i class="fas fa-shopping-bag"></i>
          <span class="order-mini-courses">${courseNames}</span>
          <span class="order-mini-total">${total} ر.س</span>
        </div>
        <div class="order-mini-info">
          <span><i class="fas fa-user" style="color:var(--primary)"></i> ${customerData.name}</span>
          <span><i class="fas fa-phone" style="color:var(--primary)"></i> ${customerData.phone}</span>
          <span><i class="fas fa-bullseye" style="color:var(--primary)"></i> ${customerData.score}</span>
        </div>
      </div>

      <!-- بطاقة التلجرام الرئيسية -->
      <div class="tg-main-card">
        <div class="tg-card-header">
          <div class="tg-icon-wrap">
            <i class="fab fa-telegram"></i>
          </div>
          <h2>الخطوة التالية: أرسل طلبك عبر تيليجرام</h2>
          <p>اضغط الزر أدناه لفتح تيليجرام برسالة جاهزة تحتوي على جميع بياناتك وتفاصيل طلبك</p>
        </div>

        <!-- معاينة الرسالة الجاهزة -->
        <div class="tg-message-preview">
          <div class="tg-msg-label">
            <i class="fas fa-eye"></i> معاينة الرسالة التي ستُرسل تلقائياً
          </div>
          <div class="tg-msg-content" id="tgMsgContent">${telegramMessage.replace(/\n/g,'<br>')}</div>
        </div>

        <!-- زر التلجرام الرئيسي -->
        <a href="${telegramURL}" target="_blank" class="btn-tg-main" id="mainTgBtn"
           onclick="handleTgClick()">
          <div class="tg-btn-inner">
            <i class="fab fa-telegram tg-btn-icon"></i>
            <div class="tg-btn-text">
              <span class="tg-btn-title">أرسل طلبك الآن عبر تيليجرام</span>
              <span class="tg-btn-sub">سيُفتح تيليجرام مع الرسالة الجاهزة تلقائياً</span>
            </div>
            <i class="fas fa-arrow-left tg-btn-arrow"></i>
          </div>
        </a>

        <!-- ماذا يحدث بعد الإرسال -->
        <div class="tg-steps-guide">
          <h4><i class="fas fa-info-circle"></i> ماذا يحدث بعد إرسال الرسالة؟</h4>
          <div class="tg-steps-list">
            <div class="tg-step-item">
              <div class="tg-step-num">1</div>
              <div class="tg-step-info">
                <strong>ستصلك بيانات التحويل البنكي</strong>
                <span>يتواصل معك فريق الدعم مباشرة ويرسل تفاصيل الدفع</span>
              </div>
            </div>
            <div class="tg-step-item">
              <div class="tg-step-num">2</div>
              <div class="tg-step-info">
                <strong>قم بإتمام عملية التحويل</strong>
                <span>حوّل المبلغ وأرسل صورة الإيصال للفريق</span>
              </div>
            </div>
            <div class="tg-step-item">
              <div class="tg-step-num">3</div>
              <div class="tg-step-info">
                <strong>تفعيل الدورة فوراً ✅</strong>
                <span>يتم تأكيد اشتراكك وتفعيل وصولك للدورة خلال ساعات قليلة</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ملاحظات إضافية -->
        <div class="tg-notes">
          <div class="tg-note-item">
            <i class="fas fa-clock"></i>
            <span>الفريق يرد عادةً خلال ساعة أو أقل</span>
          </div>
          <div class="tg-note-item">
            <i class="fas fa-lock"></i>
            <span>بياناتك محمية وآمنة تماماً</span>
          </div>
          <div class="tg-note-item">
            <i class="fas fa-bolt"></i>
            <span>وصول فوري للدورة بعد تأكيد الدفع</span>
          </div>
        </div>

        <div class="tg-divider">أو تواصل معنا مباشرة</div>

        <a href="${TG_LINK}" target="_blank" class="btn-tg-direct">
          <i class="fab fa-telegram"></i>
          @Ayed_Academy_2026
        </a>

      </div>
    </div>`;
}

/* ══════════════════ HANDLE TG CLICK ══════════════════ */
function handleTgClick() {
  const btn = document.getElementById('mainTgBtn');
  if (btn) {
    btn.classList.add('sent');
    const title = btn.querySelector('.tg-btn-title');
    const sub   = btn.querySelector('.tg-btn-sub');
    if (title) title.textContent = 'تم فتح تيليجرام ✅';
    if (sub)   sub.textContent   = 'أرسل الرسالة وانتظر رد الفريق';
  }
  setTimeout(()=> showSuccessModal(cart.reduce((s,c)=>s+c.price,0)), 800);
}

/* ══════════════════ TELEGRAM MESSAGE ══════════════════ */
function buildTelegramMessage(coursesList, total) {
  return `🎓 طلب اشتراك جديد - أكاديمية عايد للتدريب | ستيب 2026

👤 الاسم: ${customerData.name}
📱 رقم التواصل: ${customerData.phone}
📧 البريد: ${customerData.email}
🎯 الدرجة المستهدفة: ${customerData.score}

🛒 الدورات المطلوبة:
${coursesList}
💰 المجموع: ${total} ريال سعودي

📌 أرجو إرسال بيانات التحويل وتأكيد الاشتراك.
شكراً لاختياركم أكاديمية عايد للتدريب | ستيب 2026 🙏`;
}

/* ══════════════════ SUCCESS MODAL ══════════════════ */
function showSuccessModal(total) {
  if (document.querySelector('.success-modal-wrap')) return;
  const wrap = document.createElement('div');
  wrap.className = 'success-modal-wrap';
  wrap.innerHTML = `
    <div class="success-modal">
      <div class="success-em">🎉</div>
      <h2>تم إرسال طلبك بنجاح!</h2>
      <p>
        تم فتح تيليجرام برسالة جاهزة تحتوي على جميع بياناتك.<br>
        انتظر رد فريق الدعم الذي سيرسل لك بيانات التحويل.<br>
        بعد إتمام الدفع سيتم تفعيل دورتك فوراً ✅
      </p>
      <div class="success-amount">
        <p>💰 إجمالي الطلب</p>
        <strong>${total} ريال سعودي</strong>
      </div>
      <a href="${TG_LINK}" target="_blank" class="btn-open-tg">
        <i class="fab fa-telegram"></i> فتح تيليجرام مجدداً
      </a>
      <button class="btn-back-home" onclick="this.closest('.success-modal-wrap').remove(); showPage('main');">
        العودة للصفحة الرئيسية
      </button>
    </div>`;
  document.body.appendChild(wrap);
}

/* ══════════════════ COPY ══════════════════ */
function copyVal(text, btn) {
  navigator.clipboard.writeText(text).catch(()=>{
    const ta=document.createElement('textarea');
    ta.value=text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
  });
  const orig = btn.innerHTML;
  btn.classList.add('copied');
  btn.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
  setTimeout(()=>{ btn.classList.remove('copied'); btn.innerHTML=orig; }, 2200);
  showToast('✅ تم نسخ النص بنجاح!','success');
}

/* ══════════════════ FAQ ══════════════════ */
function toggleFaq(qEl) {
  const item   = qEl.closest('.faq-item');
  const answer = item.querySelector('.faq-a');
  const isOpen = item.classList.contains('open');

  document.querySelectorAll('.faq-item').forEach(i=>{
    i.classList.remove('open');
    const a=i.querySelector('.faq-a'); if(a) a.classList.remove('open');
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
  const ic = btn?.querySelector('i'); if(ic) ic.className='fas fa-bars';
}

/* ══════════════════ SCROLL EFFECTS ══════════════════ */
window.addEventListener('scroll', ()=>{
  const h = document.getElementById('header');
  if (h) h.classList.toggle('scrolled', window.scrollY>60);
});

/* ══════════════════ SCROLL REVEAL ══════════════════ */
function initReveal() {
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold:0.1, rootMargin:'0px 0px -40px 0px' });

  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>obs.observe(el));
}

/* ══════════════════ KEYBOARD ══════════════════ */
document.addEventListener('keydown', e=>{
  if (e.key==='Escape' && cartOpen) closeCart();
});

/* ══════════════════ INIT ══════════════════ */
document.addEventListener('DOMContentLoaded', ()=>{
  renderCart();
  initReveal();

  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  });
});
