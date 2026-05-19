/* =====================================================
   أكاديمية عايد للتدريب | AI Chatbot Engine
   محاكي الذكاء الاصطناعي - نظام الإجابات الذكية
   ===================================================== */

'use strict';

/* ══════════════════ قاعدة المعرفة ══════════════════ */
const AI_KB = [

  /* ─── الأسعار ─── */
  {
    patterns: ['سعر','أسعار','كم ثمن','كم تكلف','بكم','تكلفة','كم سعر'],
    answer: `💰 **أسعار دوراتنا لعام 2026:**

• 💎 **دورة STEP المميزة** — ~~749 ر.س~~ → **249 ر.س** (خصم 67%)
• ⚡ **دورة STEP المكثفة** — ~~549 ر.س~~ → **199 ر.س** (خصم 64%)  
• 📚 **دورة STEP الشاملة** — ~~399 ر.س~~ → **149 ر.س** (خصم 63%)
• 🎁 **الحزمة الكاملة (الثلاث دورات)** — ~~1,697 ر.س~~ → **597 ر.س** (وفّر 1,100 ر.س!)

جميع الأسعار شاملة لكل التحديثات والنماذج الجديدة 🔥`,
    actions: ['ما الفرق بين الدورات؟', 'كيف أشتري الآن؟']
  },

  /* ─── الفرق بين الدورات ─── */
  {
    patterns: ['فرق','الفرق','افضل دورة','أفضل','اختار','اختر','أنسب','انسب','مناسبة','مناسب','أنصحني','نصيحة'],
    answer: `📊 **الفرق بين دوراتنا:**

**💎 دورة STEP المميزة (249 ر.س)**
✔ الأشمل والأكثر تفصيلاً
✔ أحدث النماذج 50-51-52
✔ محاكيات الاختبار الحقيقي
✔ خطة مذاكرة جاهزة
✔ مثالية لمن يستهدف +90
⏰ وصول 90 يوم

**⚡ دورة STEP المكثفة (199 ر.س)**  
✔ تركيز على أكثر الأسئلة تكراراً
✔ مثالية للوقت المحدود
✔ تحضير سريع وفعّال
⏰ وصول 90 يوم

**📚 دورة STEP الشاملة (149 ر.س)**
✔ بناء أساس قوي من الصفر
✔ خطط مرنة (5/10/30 يوم)
✔ **تحديثات مدى الحياة ♾️**
⏰ وصول مدى الحياة

> 💡 **نصيحتي:** إذا عندك وقت كافٍ → **المميزة** | وقت ضيق → **المكثفة** | مبتدئ → **الشاملة**`,
    actions: ['أريد المميزة', 'أريد المكثفة', 'أريد الشاملة']
  },

  /* ─── طريقة الدفع ─── */
  {
    patterns: ['كيف أدفع','طريقة الدفع','دفع','تحويل','iban','ايبان','بنك','bank','حساب','دفع'],
    answer: `💳 **طريقة الدفع والتسجيل:**

**الخطوات بسيطة جداً:**

1. 🛒 اضغط **"اشتري الآن"** واختر دورتك
2. 📝 أدخل بياناتك (الاسم، الجوال، البريد)
3. 📱 ستُفتح رسالة جاهزة على **تيليجرام** تحتوي على كل تفاصيل طلبك
4. ✉️ أرسل الرسالة لفريق الدعم
5. 🏦 سيرد عليك الفريق بتفاصيل التحويل البنكي مباشرة
6. ✅ بعد الدفع يتم **تفعيل دورتك فوراً**

> 🚀 اضغط "**اشتري الآن**" الآن وابدأ رحلتك!`,
    actions: ['كيف أتواصل معكم؟', 'ما هي مدة الوصول؟']
  },

  /* ─── ما بعد الشراء ─── */
  {
    patterns: ['بعد الشراء','كيف احصل','متى أحصل','وصول','تفعيل','كيف أصل','كم مدة التفعيل'],
    answer: `✅ **بعد إتمام الشراء:**

**الخطوات بعد التحويل:**
1. 📸 التقط صورة لإيصال التحويل
2. 📱 أرسلها عبر تيليجرام إلى **@Ayed_Academy_2026**
3. ⚡ سيتم مراجعة الإيصال وتفعيل دورتك خلال **ساعات قليلة** (عادة أقل من ساعتين)
4. 🎓 ستصلك رسالة تأكيد مع رابط الوصول الكامل

> 💡 يمكنك أيضاً استخدام نموذج الشراء في الموقع وهو سيُرسل بياناتك وإيصالك للفريق تلقائياً!`,
    actions: ['كيف أتواصل معكم؟', 'كم مدة الوصول؟']
  },

  /* ─── مدة الوصول ─── */
  {
    patterns: ['مدة الوصول','مدة','كم يوم','كم مدة','صلاحية','تنتهي','تنتهى','وقت'],
    answer: `⏰ **مدة الوصول حسب كل دورة:**

• **💎 المميزة** → 90 يوماً كاملة + جميع التحديثات الجديدة خلال هذه المدة
• **⚡ المكثفة** → 90 يوماً كاملة مع التحديثات
• **📚 الشاملة** → **مدى الحياة ♾️** + تحديثات دائمة مجانية

> 🔥 مهما صدرت نماذج جديدة خلال فترة اشتراكك — ستجدها في دورتك تلقائياً بدون أي رسوم إضافية!`,
    actions: ['ما الفرق بين الدورات؟', 'كيف أشتري؟']
  },

  /* ─── ما هو STEP ─── */
  {
    patterns: ['ما هو step','ما هو ستيب','اختبار step','شرح step','أقسام step','قسم','grammar','reading','listening'],
    answer: `📝 **اختبار STEP - معلومات شاملة:**

**STEP** = Standardized Test of English Proficiency
اختبار كفايات اللغة الإنجليزية المعتمد في المملكة العربية السعودية

**🎯 أقسام الاختبار:**
| القسم | الوصف |
|-------|--------|
| 📖 Grammar | قواعد اللغة الإنجليزية |
| 📚 Reading | فهم القراءة |
| 🎧 Listening | فهم الاستماع |
| 🔧 Structure | التركيب والبنية |

**📊 الدرجات:**
• الدرجة الكاملة: **100 درجة**
• درجة مقبول: 60+
• درجة جيد: 70+
• درجة جيد جداً: 80+
• درجة ممتاز: 90+

> 🏆 دوراتنا تضمن وصولك لدرجتك المستهدفة بخطوات مدروسة ومنظمة!`,
    actions: ['أي دورة تناسبني؟', 'كيف أشتري؟']
  },

  /* ─── الضمانات ─── */
  {
    patterns: ['ضمان','استرداد','استعادة','راضي','راضٍ','مضمون','ضمانات'],
    answer: `🛡️ **ضمانات أكاديمية عايد:**

✅ **محتوى موثوق ومحدّث** — دائماً حديث ومدروس
✅ **وصول فوري** — بعد تأكيد التحويل مباشرة
✅ **تحديثات مجانية** — بدون أي رسوم إضافية
✅ **دعم مستمر** — فريقنا متاح عبر تيليجرام
✅ **محتوى واقعي** — أكثر من 1000 طالب نجحوا معنا
✅ **نماذج حقيقية** — أحدث النماذج 50، 51، 52

> 💬 للمزيد من الاطمئنان، يمكنك التواصل معنا عبر تيليجرام ومشاهدة تجارب طلابنا السابقين 🎓`,
    actions: ['تواصل عبر تيليجرام', 'اشتري الآن']
  },

  /* ─── التواصل ─── */
  {
    patterns: ['تواصل','تيليجرام','telegram','رقم','واتساب','whatsapp','كيف أتواصل','ادعمني','مساعدة'],
    answer: `📱 **تواصل معنا:**

**تيليجرام (الأسرع والأفضل):**
👉 [@Ayed_Academy_2026](https://t.me/Ayed_Academy_2026)

**أوقات الدعم:**
🕒 متاحون 7 أيام في الأسبوع
⚡ عادةً نرد خلال ساعة أو أقل

**ماذا يمكنك إرساله:**
• استفسارات عن الدورات
• إيصال التحويل البنكي بعد الشراء
• أي سؤال أو مشكلة تواجهها

> 🤖 أنا هنا أيضاً للإجابة على أسئلتك فوراً!`,
    actions: ['فتح تيليجرام', 'كيف أشتري؟']
  },

  /* ─── اقتراح دورة بناءً على الوقت ─── */
  {
    patterns: ['أسبوع','أسبوعين','أيام','يوم فقط','وقت قليل','ضيق','عندي قليل','بسرعة','سريع','قريب'],
    answer: `⚡ **إذا كان وقتك محدوداً:**

**دورة STEP المكثفة** هي الأنسب لك! 🎯

**لماذا المكثفة؟**
• خطة مذاكرة مصممة للمواعيد القريبة
• تركيز على الأسئلة الأكثر تكراراً في الاختبار
• تثبيت المعلومات بطريقة سريعة وفعّالة
• حل أكبر عدد ممكن من الأسئلة في وقت أقل

**السعر:** ~~549 ر.س~~ → **199 ر.س** فقط 🔥

> 💡 إذا عندك أسبوعان فأكثر، الدورة المميزة ستعطيك نتائج أفضل!`,
    actions: ['أريد المكثفة الآن', 'معلومات عن المميزة']
  },

  /* ─── للمبتدئين ─── */
  {
    patterns: ['مبتدئ','أساس','من الصفر','لا أعرف','ما عندي','ضعيف في الانجليزي','أساسيات','مستوى مبتدئ'],
    answer: `📚 **للمبتدئين — دورة STEP الشاملة مثالية!**

**الشاملة ستبني معك أساسك من الصفر:**
✔ شرح مفصل لكل أقسام الاختبار
✔ Grammar من القواعد الأولى
✔ Reading بطريقة منظمة ومفهومة
✔ Listening مع تمارين تدريجية
✔ نماذج سابقة ومراجعة شاملة

**خطط مذاكرة مرنة:**
• خطة 5 أيام (مكثفة)
• خطة 10 أيام (متوسطة)
• خطة 30 يوم (مريحة)

**السعر:** ~~399 ر.س~~ → **149 ر.س** فقط 🎉
+ تحديثات مدى الحياة مجاناً ♾️`,
    actions: ['أريد الشاملة الآن', 'الفرق بين الدورات']
  },

  /* ─── الحزمة الكاملة ─── */
  {
    patterns: ['حزمة','bundle','الكل','ثلاث دورات','3 دورات','أخذ الكل','اشتري الكل'],
    answer: `🎁 **عرض الحزمة الكاملة — الأفضل قيمةً!**

**ما تحصل عليه:**
• 💎 دورة STEP المميزة
• ⚡ دورة STEP المكثفة  
• 📚 دورة STEP الشاملة

**السعر:**
~~1,697 ر.س~~ → **597 ر.س فقط** 🔥
**توفّر: 1,100 ريال سعودي!**

**لماذا الحزمة؟**
✔ تغطية شاملة لكل المستويات
✔ خطط متعددة (سريعة ومكثفة وشاملة)
✔ أفضل استثمار لمستقبلك الأكاديمي
✔ توفير ضخم لا يُقارن

> 🏆 اختار +85% من طلابنا المتميزين الحزمة الكاملة وحققوا أعلى الدرجات!`,
    actions: ['أريد الحزمة الكاملة', 'كيف أدفع؟']
  },

  /* ─── التحديثات ─── */
  {
    patterns: ['تحديث','تحديثات','نموذج جديد','أحدث','محدّث','update'],
    answer: `🔄 **سياسة التحديثات في أكاديمية عايد:**

**تحديث 2026 — أحدث النماذج:**
• النموذج 50 ✅ متاح
• النموذج 51 ✅ متاح  
• النموذج 52 ✅ متاح (أحدث)

**كيف تحصل على التحديثات؟**
• **المميزة والمكثفة:** تلقائياً خلال 90 يوم اشتراكك
• **الشاملة:** مدى الحياة بدون أي رسوم إضافية ♾️

> 🔥 كلما صدر نموذج جديد، ستجده في دورتك تلقائياً في نفس اليوم!`,
    actions: ['الفرق بين الدورات', 'اشتري الآن']
  },

  /* ─── ترحيب/تحية ─── */
  {
    patterns: ['مرحبا','هلا','السلام','أهلاً','كيف حالك','صباح','مساء','شكراً','شكرا'],
    answer: `👋 **أهلاً وسهلاً! أنا مساعد أكاديمية عايد الذكي 🤖**

يسعدني مساعدتك في أي استفسار عن دوراتنا لاختبار STEP 2026!

**كيف يمكنني مساعدتك؟**
• 💰 الأسعار والعروض
• 📚 الفرق بين الدورات
• 💳 طريقة الشراء والدفع
• ✅ ما بعد الشراء
• 🎯 أي سؤال آخر!

فقط اكتب سؤالك أو اختر من الأزرار السريعة أدناه 👇`,
    actions: ['ما الفرق بين الدورات؟', 'ما هي الأسعار؟']
  }
];

/* ══════════════════ حالة المحادثة ══════════════════ */
let aiChatOpen = false;
let aiMessages = [];
let aiTyping   = false;

/* ══════════════════ فتح/إغلاق ══════════════════ */
function toggleAIChat() {
  aiChatOpen = !aiChatOpen;
  const win     = document.getElementById('aiChatWindow');
  const trigger = document.getElementById('aiChatTrigger');
  const overlay = document.getElementById('aiChatOverlay');

  if (win)     win.classList.toggle('open', aiChatOpen);
  if (trigger) trigger.classList.toggle('open', aiChatOpen);
  if (overlay) overlay.classList.toggle('open', aiChatOpen);

  if (aiChatOpen) {
    if (aiMessages.length === 0) sendWelcomeMessage();
    setTimeout(() => {
      const input = document.getElementById('aiInput');
      if (input) input.focus();
      scrollAIChat();
    }, 350);
  }
}

/* ══════════════════ رسالة الترحيب ══════════════════ */
function sendWelcomeMessage() {
  const welcomeMsg = `👋 **أهلاً! أنا مساعد أكاديمية عايد الذكي**

يسعدني الإجابة على جميع استفساراتك عن دورات **STEP 2026** فوراً! 🤖

اكتب سؤالك أو اختر من الأسئلة الشائعة أدناه 👇`;

  addAIMessage('ai', welcomeMsg, true);
}

/* ══════════════════ إرسال رسالة سريعة ══════════════════ */
function sendQuickQ(question) {
  const qs = document.getElementById('aiQuickSuggestions');
  if (qs) qs.style.display = 'none';

  addAIMessage('user', question);
  processAIResponse(question);
}

/* ══════════════════ إرسال رسالة المستخدم ══════════════════ */
function sendAIMessage() {
  const input = document.getElementById('aiInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text || aiTyping) return;

  input.value = '';
  autoResizeAIInput(input);

  const qs = document.getElementById('aiQuickSuggestions');
  if (qs) qs.style.display = 'none';

  addAIMessage('user', text);
  processAIResponse(text);
}

/* ══════════════════ المعالج الرئيسي للردود ══════════════════ */
function processAIResponse(userText) {
  if (aiTyping) return;
  aiTyping = true;

  // إظهار مؤشر الكتابة
  showTypingIndicator();

  const lower = userText.toLowerCase().replace(/\s+/g,' ').trim();

  setTimeout(() => {
    removeTypingIndicator();
    const response = findBestResponse(lower);
    addAIMessage('ai', response.answer, false, response.actions);
    aiTyping = false;
  }, getTypingDelay(userText));
}

/* ══════════════════ البحث عن أفضل إجابة ══════════════════ */
function findBestResponse(text) {
  let bestMatch = null;
  let bestScore = 0;

  for (const item of AI_KB) {
    let score = 0;
    for (const pattern of item.patterns) {
      if (text.includes(pattern)) {
        score += pattern.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && bestScore > 0) return bestMatch;

  // إجابة افتراضية ذكية
  return {
    answer: `🤔 **سؤال رائع!** لم أفهمه بشكل كامل، لكن إليك ما يمكنني مساعدتك به:

**الأكثر شيوعاً:**
• 💰 **الأسعار** — دورات تبدأ من 149 ر.س
• 📚 **الدورات** — مميزة / مكثفة / شاملة
• 📱 **الدفع** — عبر تيليجرام بكل سهولة
• ✅ **بعد الشراء** — وصول فوري بعد تأكيد الدفع

أو تواصل معنا مباشرةً عبر تيليجرام للرد الفوري! 👇`,
    actions: ['تيليجرام @Ayed_Academy_2026', 'الأسعار', 'الفرق بين الدورات']
  };
}

/* ══════════════════ إضافة رسالة ══════════════════ */
function addAIMessage(role, text, instant = false, actions = []) {
  const body = document.getElementById('aiChatBody');
  if (!body) return;

  aiMessages.push({ role, text, time: new Date() });

  const msgEl = document.createElement('div');
  msgEl.className = `ai-msg ${role}`;

  const time = new Date().toLocaleTimeString('ar-SA', { hour:'2-digit', minute:'2-digit' });
  const avatarContent = role === 'ai'
    ? '<i class="fas fa-robot"></i>'
    : '<i class="fas fa-user"></i>';

  const actionsHTML = actions.length
    ? `<div class="ai-action-btns">${actions.map(a =>
        `<button class="ai-action-btn" onclick="sendQuickQ('${a}')">${a}</button>`
      ).join('')}</div>`
    : '';

  msgEl.innerHTML = `
    <div class="ai-msg-avatar">${avatarContent}</div>
    <div>
      <div class="ai-msg-bubble">${formatAIText(text)}${actionsHTML}</div>
      <span class="ai-msg-time">${time}</span>
    </div>`;

  body.appendChild(msgEl);
  if (!instant) {
    msgEl.style.animationDelay = '0s';
  }

  scrollAIChat();
}

/* ══════════════════ تنسيق النص ══════════════════ */
function formatAIText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/~~(.*?)~~/g, '<del>$1</del>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color:#7c3aed;font-weight:700;">$1</a>')
    .replace(/\n\n/g, '</p><p style="margin:8px 0 0">')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p style="margin:0">')
    .replace(/$/, '</p>');
}

/* ══════════════════ مؤشر الكتابة ══════════════════ */
function showTypingIndicator() {
  const body = document.getElementById('aiChatBody');
  if (!body) return;

  const el = document.createElement('div');
  el.id = 'aiTypingIndicator';
  el.className = 'ai-msg ai';
  el.innerHTML = `
    <div class="ai-msg-avatar"><i class="fas fa-robot"></i></div>
    <div class="ai-typing"><span></span><span></span><span></span></div>`;
  body.appendChild(el);
  scrollAIChat();
}

function removeTypingIndicator() {
  const el = document.getElementById('aiTypingIndicator');
  if (el) el.remove();
}

/* ══════════════════ تأخير الكتابة ══════════════════ */
function getTypingDelay(text) {
  const base  = 900;
  const extra = Math.min(text.length * 20, 800);
  return base + extra;
}

/* ══════════════════ تمرير المحادثة ══════════════════ */
function scrollAIChat() {
  const body = document.getElementById('aiChatBody');
  if (body) {
    setTimeout(() => {
      body.scrollTop = body.scrollHeight;
    }, 50);
  }
}

/* ══════════════════ مسح المحادثة ══════════════════ */
function clearAIChat() {
  const body = document.getElementById('aiChatBody');
  if (body) body.innerHTML = '';
  aiMessages = [];
  aiTyping   = false;

  const qs = document.getElementById('aiQuickSuggestions');
  if (qs) qs.style.display = '';

  sendWelcomeMessage();
}

/* ══════════════════ تعديل حجم textarea ══════════════════ */
function autoResizeAIInput(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

/* ══════════════════ مفاتيح الإدخال ══════════════════ */
function handleAIKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendAIMessage();
  }
}

/* ══════════════════ Progress Bar & Back to Top ══════════════════ */
(function initExtras() {
  // Progress bar
  const bar = document.createElement('div');
  bar.className = 'reading-progress-bar';
  document.body.prepend(bar);

  // Back to top
  const btt = document.createElement('button');
  btt.className = 'back-to-top';
  btt.innerHTML = '<i class="fas fa-chevron-up"></i>';
  btt.setAttribute('aria-label', 'العودة للأعلى');
  btt.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  document.body.appendChild(btt);

  window.addEventListener('scroll', () => {
    const total  = document.documentElement.scrollHeight - window.innerHeight;
    const prog   = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = prog + '%';

    btt.classList.toggle('visible', window.scrollY > 400);
  });
})();

/* ══════════════════ Particles Generator ══════════════════ */
(function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'hero-particle';
    const colors = ['rgba(245,158,11,0.7)','rgba(26,86,219,0.5)','rgba(124,58,237,0.5)','rgba(255,255,255,0.4)'];
    p.style.cssText = `
      left: ${Math.random()*100}%;
      width: ${2 + Math.random()*5}px;
      height: ${2 + Math.random()*5}px;
      background: ${colors[Math.floor(Math.random()*colors.length)]};
      --dur: ${6 + Math.random()*8}s;
      --delay: ${Math.random()*6}s;
    `;
    container.appendChild(p);
  }
})();

/* ══════════════════ Counter Animation ══════════════════ */
(function initCounters() {
  const targets = document.querySelectorAll('.stat-num[data-target]');
  if (!targets.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el  = e.target;
        const end = parseInt(el.dataset.target, 10);
        let   cur = 0;
        const step = Math.ceil(end / 60);
        const timer = setInterval(() => {
          cur = Math.min(cur + step, end);
          el.textContent = (cur >= 1000 ? '+' + cur.toLocaleString('ar') : '+' + cur);
          if (cur >= end) clearInterval(timer);
        }, 25);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  targets.forEach(el => obs.observe(el));
})();

/* ══════════════════ Smooth Page Load ══════════════════ */
document.documentElement.style.opacity = '0';
window.addEventListener('load', () => {
  document.documentElement.style.transition = 'opacity .4s ease';
  document.documentElement.style.opacity    = '1';
});

/* ══════════════════ تهيئة نظام الإشعارات ══════════════════ */
(function initNotificationBadge() {
  // إظهار نقطة إشعار على المساعد بعد 5 ثواني من تحميل الصفحة
  setTimeout(() => {
    const trigger = document.getElementById('aiChatTrigger');
    if (trigger && !aiChatOpen) {
      const notif = document.createElement('div');
      notif.className = 'ai-notif-bubble';
      notif.textContent = 'مرحباً! كيف يمكنني مساعدتك؟ 👋';
      notif.style.cssText = `
        position:fixed;
        bottom:102px;
        right:105px;
        background:linear-gradient(135deg,#7c3aed,#5b21b6);
        color:white;
        padding:10px 16px;
        border-radius:20px 20px 4px 20px;
        font-size:13px;
        font-weight:700;
        font-family:'Cairo',sans-serif;
        box-shadow:0 8px 24px rgba(124,58,237,.4);
        z-index:9499;
        cursor:pointer;
        animation:aiSlideUp .4s ease both;
        white-space:nowrap;
      `;
      notif.onclick = () => { notif.remove(); toggleAIChat(); };
      document.body.appendChild(notif);

      // إزالة الإشعار بعد 8 ثواني
      setTimeout(() => {
        if (notif.parentNode) {
          notif.style.transition = 'opacity .4s ease, transform .4s ease';
          notif.style.opacity = '0';
          notif.style.transform = 'translateY(10px)';
          setTimeout(() => notif.remove(), 400);
        }
      }, 8000);
    }
  }, 5000);
})();
