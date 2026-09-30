/* =================================================================
   JET MEDIA — script.js

   Логика сайта. Все цифры — цены, проценты, диапазоны ползунков,
   адрес приёма заявок — лежат в config.js: он подключается раньше
   этого файла, и значения из CONFIG расходятся по всей странице,
   и в расчёты, и в подписи. В разметке цифр нет.

   Разделы файла:
     2.  Диагностика
     3.  Словари переводов (RU / EN / TH)
     4.  Утилиты
     5.  Переключение языка
     6.  Калькулятор: прирост, расходы, чистый результат
     7.  Тарифы
     8.  Форма заявки и отправка через Google Apps Script
     9.  Интерфейс
   (раздел 1, CONFIG, — в config.js)
   ================================================================= */

/* =================================================================
   2. ДИАГНОСТИКА
   ================================================================= */
const DEBUG = CONFIG.debug || location.search.indexOf("debug=1") !== -1;
const log = (...args) => { if (DEBUG) console.log("%cJET MEDIA", "color:#46C7FF", ...args); };

/* =================================================================
   3. СЛОВАРИ ПЕРЕВОДОВ
   Чтобы добавить язык: скопируйте блок, переведите значения,
   добавьте кнопку в шапке и локаль в LOCALES.
   ================================================================= */
const I18N = {

  ru: {
    "meta.title": "JET MEDIA — цифровой официант для ресторанов. Дополнительная выручка без найма персонала",
    "meta.desc": "JET MEDIA ставит планшеты на столы ресторана: меню с фото на языке гостя, рекомендации шефа и акции, вызов официанта и зарядка для телефона. Заказ со стола, интеграция с кассой, аналитика и AI — дополнительные модули.",

    "nav.calc": "Калькулятор", "nav.ops": "Возможности",
    "nav.pricing": "Тарифы", "nav.faq": "Вопросы", "nav.cta": "Демонстрация",

    "hero.eyebrow": "Цифровой официант на каждом столе",
    "hero.title1": "Дополнительная выручка", "hero.title2": "без найма персонала",
    "hero.ctaDemo": "Заказать демонстрацию", "hero.ctaInstall": "Заказать установку",
    "hero.t1": "к выручке зала", "hero.t2": "нагрузки на персонал", "hero.t3": "дня на запуск",
    "hero.lead": "Планшет на столе показывает гостю меню с фото на его языке, предлагает блюда от шефа и акции, зовёт официанта, просит счёт и заряжает телефон.",
    "hero.tag1": "Акции и рекомендации", "hero.tag2": "Вызов официанта", "hero.tag3": "Меню с фото",
    "hero.tag4": "Запрос счёта", "hero.tag5": "Зарядка для телефона",
    "hero.alt": "Планшет JET MEDIA на столе ресторана: акция на экране, кнопки вызова официанта, меню и счёта, USB-зарядка в основании",

    "calc.title": "Калькулятор прибыли",
    "calc.eyebrow": "Расчёт для вашего зала",
    "calc.h2": "Сколько заработает ваш ресторан",
    "calc.sub": "Укажите число столиков, гостей и средний чек — расчёт по обоим тарифам обновится сразу.",
    "calc.how1": "прирост выручки: зависит от ресторана, а не от тарифа — двигайте ползунок",
    "calc.how2k": "1 столик = 1 устройство",
    "calc.how2": "платится аренда каждого устройства, плюс софт и поддержка за ресторан",
    "calc.how3k": "{low} + {high} мес.",
    "calc.how3": "год считается по сезонам: низкий — апрель\u2060–\u2060октябрь, высокий — ноябрь\u2060–\u2060март",
    "calc.month": "Месяц", "calc.year": "Год",
    "calc.tables": "Количество столиков", "calc.guests": "Посетителей в месяц", "calc.check": "Средний чек",
    "calc.uplift": "Прирост выручки",
    "calc.upliftNote": "Зависит от настройки меню и акций, слаженности работы персонала — не от тарифа. Диапазон {range}% — по статистике.",
    "calc.season": "Сезон",
    "calc.yearNote": "За год: {low} мес. низкого сезона и {high} мес. высокого",
    "calc.current": "Текущая выручка",
    "calc.standard": "Standard", "calc.premium": "Premium",
    "calc.stdSub": "с рекламой сети JET MEDIA", "calc.prmSub": "без сторонней рекламы",
    "calc.gain": "Прирост выручки",
    "calc.saas": "Софт и поддержка",
    "calc.devices": "Аренда устройств",
    "calc.totalMonth": "Расходы в месяц", "calc.totalYear": "Расходы за год",
    "calc.net": "Чистый результат",
    "calc.note": "Разово при подписании договора — подключение {setup}. Дополнительные модули в расчёт не входят. Цены с НДС {vat}%.",

    "ops.eyebrow": "Что получает ресторан",
    "ops.title": "Не только продажи — вся операционка стола",
    "ops.c1t": "Нагрузки на персонал",
    "ops.c1d": "Устройство знакомит гостя с меню на его языке, подсказывает блюда шефа и акции, зовёт официанта и просит счёт. Команда занимается качеством сервиса, а не рутиной.",
    "ops.c2t": "Кассу менять не нужно",
    "ops.c2d": "Базовый пакет работает без подключения к кассе, привычные процессы не меняются. Если нужно, чтобы заказы сразу уходили на кухню, а меню, цены и стоп-листы синхронизировались, подключим интеграцию — это дополнительный модуль.",
    "ops.c3t": "Встроенный Power Bank",
    "ops.c3d": "Гость заряжает телефон прямо за столом и остаётся в зале дольше. Внимание к деталям, которое замечают и о котором пишут в отзывах.",
    "ops.capsBase": "В базовом пакете",
    "ops.capsExtra": "Дополнительные модули — за отдельную плату",
    "ops.capsLink": "Цены модулей",

    "price.eyebrow": "Тарифы", "price.title": "Два тарифа",
    "price.sub": "Стоимость = софт и поддержка за ресторан + аренда каждого устройства. Тарифы отличаются только рекламой на экране. Цена зависит от сезона: высокий — ноябрь\u2060–\u2060март, низкий — апрель\u2060–\u2060октябрь.",
    "price.low": "Низкий сезон", "price.high": "Высокий сезон",
    "price.subStd": "С рекламой сети JET MEDIA — без рекламы конкурентов",
    "price.subPrm": "Без сторонней рекламы",
    "price.platformK": "Софт и поддержка",
    "price.per": "в месяц", "price.saasNote": "за ресторан — базовый пакет",
    "price.devicesK": "Аренда устройств",
    "price.perDevice": "за каждое устройство в месяц",
    "price.yourHall": "Для вашего зала:",
    "price.all": "Всё из Standard, плюс:", "price.badge": "Для премиальных заведений",
    "price.s1": "Устройство на каждый стол с зарядкой для телефона",
    "price.s2": "Интерактивное меню с фото и описанием блюд",
    "price.s3": "Меню на нескольких языках",
    "price.s4": "Рекомендации шеф-повара, акции и сезонные новинки",
    "price.s5": "Вызов официанта и запрос счёта",
    "price.s6": "Обновления и техническая поддержка",
    "price.p1": "Без рекламы сети JET MEDIA",
    "price.p2": "Экран полностью под ваши акции и рекомендации",
    "price.ctaStd": "Заказать установку", "price.ctaPrm": "Заказать демонстрацию",
    "price.noteSetup": "Подключение базового пакета — {setup} при подписании договора: установка устройств, загрузка меню, обучение персонала.",
    "price.noteTerms": "Договор — от {minMonths} мес., в первые {cancelMonths} мес. можно отказаться. Все цены с НДС {vat}%.",
    "price.open": "Посмотреть прайс", "price.openShort": "Прайс", "price.pdf": "Скачать PDF",
    "addons.title": "Дополнительные модули",
    "addons.sub": "Не входят в базовый пакет. Подключаются к любому тарифу — сразу или позже: настройка оплачивается разово, абонплата модуля прибавляется к ежемесячной оплате. Каждому модулю нужно дополнительное время на настройку и связь с вашими системами.",
    "addons.monthly": "+{price} в месяц", "addons.setup": "Настройка — {price}, разово",

    "faq.eyebrow": "Вопросы", "faq.title": "Что важно знать до установки",
    "faq.q1": "Что делать, если устройство сломалось?",
    "faq.a1": "При гарантийном случае меняем бесплатно. Если повреждение произошло по вине клиента, ремонт оплачивается отдельно.",
    "faq.q2": "Нужно ли менять кассовую систему?",
    "faq.a2": "Нет. Базовый пакет работает отдельно от кассы. Если нужно, чтобы заказы со стола сразу уходили на кухню, а меню, цены и стоп-листы синхронизировались, подключим интеграцию с вашей системой — это дополнительный модуль.",
    "faq.q3": "Можно ли отказаться?",
    "faq.a3": "Договор заключается минимум на {minMonths} мес. В первые {cancelMonths} мес. от него можно отказаться — в конце оплаченного периода мы просто заберём оборудование.",
    "faq.q4": "Сколько занимает установка?",
    "faq.a4": "Базовый пакет — обычно от одного до трёх дней, включая загрузку меню и обучение персонала. Дополнительные модули настраиваются отдельно и требуют больше времени: срок зависит от модуля и вашей кассы, согласуем его при подключении.",

    "form.title": "Оставьте заявку",
    "form.sub": "Свяжемся в течение рабочего дня, покажем систему вживую и посчитаем количество устройств для вашего зала.",
    "form.tDemo": "Демонстрация", "form.tInstall": "Установка",
    "form.name": "Имя", "form.namePh": "Как к вам обращаться",
    "form.phone": "Телефон", "form.phonePh": "+66 XX XXX XXXX",
    "form.rest": "Название ресторана", "form.restPh": "Например, Sunset Beach Cafe",
    "form.send": "Отправить заявку",
    "form.hint": "Нажимая кнопку, вы соглашаетесь на обработку контактных данных для связи по заявке.",
    "form.sending": "Отправляем…",
    "form.ok": "Заявка отправлена. Свяжемся с вами в течение рабочего дня.",
    "form.errFields": "Заполните имя, телефон и название ресторана.",
    "form.errPhone": "Проверьте номер телефона.",
    "form.errNet": "Не удалось отправить. Попробуйте ещё раз через минуту.",
    "form.errConfig": "Форма пока не подключена к приёму заявок. Напишите нам напрямую.",

    "foot.tag": "Цифровой официант, реклама и аналитика для ресторанов.",
    "foot.contract": "Договор"
  },

  en: {
    "meta.title": "JET MEDIA — a digital waiter for restaurants. More revenue without hiring",
    "meta.desc": "JET MEDIA puts tablets on restaurant tables: a photo menu in the guest's language, chef's picks and specials, a waiter call button and phone charging. Table ordering, POS integration, analytics and AI are optional add-ons.",

    "nav.calc": "Calculator", "nav.ops": "Features",
    "nav.pricing": "Pricing", "nav.faq": "FAQ", "nav.cta": "Book a demo",

    "hero.eyebrow": "A digital waiter on every table",
    "hero.title1": "More revenue", "hero.title2": "without hiring more staff",
    "hero.ctaDemo": "Book a demo", "hero.ctaInstall": "Request installation",
    "hero.t1": "added revenue", "hero.t2": "load on staff", "hero.t3": "days to launch",
    "hero.lead": "A tablet on every table shows guests a photo menu in their language, suggests chef's picks and specials, calls a waiter, asks for the bill and charges their phone.",
    "hero.tag1": "Specials & recommendations", "hero.tag2": "Call a waiter", "hero.tag3": "Photo menu",
    "hero.tag4": "Ask for the bill", "hero.tag5": "Phone charging",
    "hero.alt": "JET MEDIA table tablet: a special on screen, buttons to call a waiter, open the menu and ask for the bill, USB charging in the base",

    "calc.title": "Profit calculator",
    "calc.eyebrow": "Your restaurant, in numbers",
    "calc.h2": "How much your restaurant will earn",
    "calc.sub": "Enter your tables, guests and average check — both plans recalculate instantly.",
    "calc.how1": "revenue uplift: depends on the restaurant, not the plan — move the slider",
    "calc.how2k": "1 table = 1 device",
    "calc.how2": "every device is rented, plus software & support per restaurant",
    "calc.how3k": "{low} + {high} mo.",
    "calc.how3": "a year follows the seasons: low is April\u2060–\u2060October, high is November\u2060–\u2060March",
    "calc.month": "Month", "calc.year": "Year",
    "calc.tables": "Number of tables", "calc.guests": "Guests per month", "calc.check": "Average check",
    "calc.uplift": "Revenue uplift",
    "calc.upliftNote": "Depends on how the menu and promotions are set up and how well the staff work together — not on the plan. The {range}% range comes from statistics.",
    "calc.season": "Season",
    "calc.yearNote": "Per year: {low} low-season months + {high} high-season months",
    "calc.current": "Current revenue",
    "calc.standard": "Standard", "calc.premium": "Premium",
    "calc.stdSub": "with JET MEDIA network ads", "calc.prmSub": "no third-party ads",
    "calc.gain": "Revenue uplift",
    "calc.saas": "Software & support",
    "calc.devices": "Device rental",
    "calc.totalMonth": "Costs per month", "calc.totalYear": "Costs per year",
    "calc.net": "Net result",
    "calc.note": "One-time at contract signing: setup {setup}. Add-on modules are not included in this estimate. Prices include {vat}% VAT.",

    "ops.eyebrow": "What the restaurant gets",
    "ops.title": "Not just sales — the whole table operation",
    "ops.c1t": "Less load on your staff",
    "ops.c1d": "The device shows guests the menu in their language, suggests chef's picks and specials, calls a server and asks for the bill. Your team focuses on service quality instead of routine.",
    "ops.c2t": "No need to change your POS",
    "ops.c2d": "The base package works without a POS connection, so your processes stay the same. If you want orders to go straight to the kitchen and the menu, prices and stop-lists to sync, we add POS integration as an optional module.",
    "ops.c3t": "Built-in power bank",
    "ops.c3d": "Guests charge their phone right at the table and stay longer. The kind of detail people notice and mention in reviews.",
    "ops.capsBase": "In the base package",
    "ops.capsExtra": "Add-on modules — paid separately",
    "ops.capsLink": "Module prices",

    "price.eyebrow": "Pricing", "price.title": "Two plans",
    "price.sub": "Price = software & support per restaurant + rent for every device. The plans differ only in the ads on screen. Prices depend on the season: high is November\u2060–\u2060March, low is April\u2060–\u2060October.",
    "price.low": "Low season", "price.high": "High season",
    "price.subStd": "With JET MEDIA network ads — never competitors' ads",
    "price.subPrm": "No third-party ads",
    "price.platformK": "Software & support",
    "price.per": "per month", "price.saasNote": "per restaurant — base package",
    "price.devicesK": "Device rental",
    "price.perDevice": "per device per month",
    "price.yourHall": "For your floor:",
    "price.all": "Everything in Standard, plus:", "price.badge": "For upscale venues",
    "price.s1": "A device on every table with phone charging",
    "price.s2": "Interactive menu with photos and dish descriptions",
    "price.s3": "Menu in several languages",
    "price.s4": "Chef's picks, specials and seasonal dishes",
    "price.s5": "Call a waiter and ask for the bill",
    "price.s6": "Updates and technical support",
    "price.p1": "No JET MEDIA network ads",
    "price.p2": "The whole screen for your own specials and recommendations",
    "price.ctaStd": "Request installation", "price.ctaPrm": "Book a demo",
    "price.noteSetup": "Base package setup — {setup} at contract signing: device installation, menu upload, staff training.",
    "price.noteTerms": "Contract from {minMonths} months; you can cancel during the first {cancelMonths} months. All prices include {vat}% VAT.",
    "price.open": "View prices", "price.openShort": "Prices", "price.pdf": "Download PDF",
    "addons.title": "Add-on modules",
    "addons.sub": "Not part of the base package. Add them to either plan, now or later: setup is a one-time fee, and the module's monthly fee is added to your monthly bill. Each module needs extra time to set up and connect to your systems.",
    "addons.monthly": "+{price} per month", "addons.setup": "Setup — {price}, one-time",

    "faq.eyebrow": "FAQ", "faq.title": "What to know before installation",
    "faq.q1": "What if a device breaks?",
    "faq.a1": "Warranty cases are replaced free of charge. Damage caused by the client is repaired at extra cost.",
    "faq.q2": "Do I need to change my POS system?",
    "faq.a2": "No. The base package works separately from your POS. If you want table orders to go straight to the kitchen and the menu, prices and stop-lists to sync, we'll connect your system as an optional add-on module.",
    "faq.q3": "Can I cancel?",
    "faq.a3": "The contract runs for at least {minMonths} months. During the first {cancelMonths} months you can cancel — we simply collect the equipment at the end of the paid period.",
    "faq.q4": "How long does installation take?",
    "faq.a4": "The base package usually takes one to three days, including menu upload and staff training. Add-on modules are set up separately and take longer: the timing depends on the module and your POS, and we agree on it when you order.",

    "form.title": "Send a request",
    "form.sub": "We'll get back to you within one business day, show the system live and calculate how many devices your floor needs.",
    "form.tDemo": "Demo", "form.tInstall": "Installation",
    "form.name": "Name", "form.namePh": "How should we address you",
    "form.phone": "Phone", "form.phonePh": "+66 XX XXX XXXX",
    "form.rest": "Restaurant name", "form.restPh": "e.g. Sunset Beach Cafe",
    "form.send": "Send request",
    "form.hint": "By sending the form you agree that we may use your contact details to reply to this request.",
    "form.sending": "Sending…",
    "form.ok": "Request sent. We'll contact you within one business day.",
    "form.errFields": "Please fill in name, phone and restaurant name.",
    "form.errPhone": "Please check the phone number.",
    "form.errNet": "Sending failed. Please try again in a minute.",
    "form.errConfig": "The form is not connected yet. Please contact us directly.",

    "foot.tag": "Digital waiter, advertising and analytics for restaurants.",
    "foot.contract": "Contract"
  },

  th: {
    "meta.title": "JET MEDIA — พนักงานเสิร์ฟดิจิทัลสำหรับร้านอาหาร เพิ่มรายได้โดยไม่ต้องจ้างพนักงานเพิ่ม",
    "meta.desc": "JET MEDIA ติดตั้งแท็บเล็ตบนโต๊ะร้านอาหาร: เมนูพร้อมรูปภาพในภาษาของลูกค้า เมนูแนะนำจากเชฟและโปรโมชัน ปุ่มเรียกพนักงาน และที่ชาร์จโทรศัพท์ ส่วนการสั่งอาหารจากโต๊ะ การเชื่อมต่อ POS การวิเคราะห์ และ AI เป็นโมดูลเสริม",

    "nav.calc": "คำนวณกำไร", "nav.ops": "ความสามารถ",
    "nav.pricing": "แพ็กเกจ", "nav.faq": "คำถามที่พบบ่อย", "nav.cta": "ขอชมการสาธิต",

    "hero.eyebrow": "พนักงานเสิร์ฟดิจิทัลบนทุกโต๊ะ",
    "hero.title1": "รายได้เพิ่มขึ้น", "hero.title2": "โดยไม่ต้องจ้างพนักงานเพิ่ม",
    "hero.ctaDemo": "ขอชมการสาธิต", "hero.ctaInstall": "ขอติดตั้ง",
    "hero.t1": "รายได้ที่เพิ่มขึ้น", "hero.t2": "ภาระงานของพนักงาน", "hero.t3": "วันในการเริ่มใช้งาน",
    "hero.lead": "แท็บเล็ตบนโต๊ะแสดงเมนูพร้อมรูปภาพในภาษาของลูกค้า แนะนำเมนูจากเชฟและโปรโมชัน เรียกพนักงาน ขอเช็กบิล และชาร์จโทรศัพท์ให้ลูกค้า",
    "hero.tag1": "โปรโมชันและเมนูแนะนำ", "hero.tag2": "เรียกพนักงาน", "hero.tag3": "เมนูพร้อมรูปภาพ",
    "hero.tag4": "ขอเช็กบิล", "hero.tag5": "ชาร์จโทรศัพท์",
    "hero.alt": "แท็บเล็ต JET MEDIA บนโต๊ะร้านอาหาร: โปรโมชันบนหน้าจอ ปุ่มเรียกพนักงาน เมนู และเช็กบิล พร้อมช่อง USB สำหรับชาร์จ",

    "calc.title": "เครื่องคำนวณกำไร",
    "calc.eyebrow": "คำนวณสำหรับร้านของคุณ",
    "calc.h2": "ร้านของคุณจะได้รับเท่าไร",
    "calc.sub": "ใส่จำนวนโต๊ะ ลูกค้า และยอดบิลเฉลี่ย ระบบจะคำนวณทั้งสองแพ็กเกจให้ทันที",
    "calc.how1": "รายได้ที่เพิ่มขึ้น: ขึ้นกับร้าน ไม่ใช่แพ็กเกจ ลองเลื่อนแถบได้",
    "calc.how2k": "1 โต๊ะ = 1 เครื่อง",
    "calc.how2": "คิดค่าเช่าอุปกรณ์ทุกเครื่อง บวกค่าซอฟต์แวร์และการสนับสนุนต่อร้าน",
    "calc.how3k": "{low} + {high} เดือน",
    "calc.how3": "ทั้งปีคิดตามฤดูกาล: โลว์ซีซัน เมษายน\u2060–\u2060ตุลาคม ไฮซีซัน พฤศจิกายน\u2060–\u2060มีนาคม",
    "calc.month": "เดือน", "calc.year": "ปี",
    "calc.tables": "จำนวนโต๊ะ", "calc.guests": "ลูกค้าต่อเดือน", "calc.check": "ยอดบิลเฉลี่ย",
    "calc.uplift": "รายได้ที่เพิ่มขึ้น",
    "calc.upliftNote": "ขึ้นกับการตั้งค่าเมนูและโปรโมชัน และการทำงานร่วมกันของพนักงาน ไม่ได้ขึ้นกับแพ็กเกจ ช่วง {range}% มาจากสถิติ",
    "calc.season": "ฤดูกาล",
    "calc.yearNote": "ทั้งปี: โลว์ซีซัน {low} เดือน + ไฮซีซัน {high} เดือน",
    "calc.current": "รายได้ปัจจุบัน",
    "calc.standard": "Standard", "calc.premium": "Premium",
    "calc.stdSub": "มีโฆษณาเครือข่าย JET MEDIA", "calc.prmSub": "ไม่มีโฆษณาจากภายนอก",
    "calc.gain": "รายได้ที่เพิ่มขึ้น",
    "calc.saas": "ซอฟต์แวร์และการสนับสนุน",
    "calc.devices": "ค่าเช่าอุปกรณ์",
    "calc.totalMonth": "ค่าใช้จ่ายต่อเดือน", "calc.totalYear": "ค่าใช้จ่ายต่อปี",
    "calc.net": "ผลลัพธ์สุทธิ",
    "calc.note": "ครั้งเดียวเมื่อเซ็นสัญญา: ค่าติดตั้ง {setup} · ไม่รวมโมดูลเสริม · ราคารวม VAT {vat}%",

    "ops.eyebrow": "สิ่งที่ร้านได้รับ",
    "ops.title": "ไม่ใช่แค่ยอดขาย แต่คือการดำเนินงานทั้งโต๊ะ",
    "ops.c1t": "ภาระงานของพนักงาน",
    "ops.c1d": "อุปกรณ์แสดงเมนูในภาษาของลูกค้า แนะนำเมนูจากเชฟและโปรโมชัน เรียกพนักงาน และขอเช็กบิล ทีมงานจึงมีเวลาดูแลคุณภาพบริการแทนงานประจำ",
    "ops.c2t": "ไม่ต้องเปลี่ยนระบบ POS",
    "ops.c2d": "แพ็กเกจพื้นฐานใช้งานได้โดยไม่ต้องเชื่อมต่อ POS กระบวนการเดิมของร้านจึงไม่เปลี่ยน หากต้องการให้ออร์เดอร์ส่งเข้าครัวทันที และเมนู ราคา และเมนูที่หมดซิงก์กัน เราเชื่อมต่อ POS ให้ได้เป็นโมดูลเสริม",
    "ops.c3t": "พาวเวอร์แบงก์ในตัว",
    "ops.c3d": "ลูกค้าชาร์จโทรศัพท์ได้ที่โต๊ะและอยู่ในร้านนานขึ้น เป็นรายละเอียดที่ลูกค้าสังเกตเห็นและพูดถึงในรีวิว",
    "ops.capsBase": "ในแพ็กเกจพื้นฐาน",
    "ops.capsExtra": "โมดูลเสริม — มีค่าใช้จ่ายเพิ่ม",
    "ops.capsLink": "ราคาโมดูล",

    "price.eyebrow": "แพ็กเกจ", "price.title": "สองแพ็กเกจ",
    "price.sub": "ราคา = ซอฟต์แวร์และการสนับสนุนต่อร้าน + ค่าเช่าอุปกรณ์ทุกเครื่อง แพ็กเกจต่างกันแค่โฆษณาบนหน้าจอ ราคาขึ้นกับฤดูกาล: ไฮซีซัน พฤศจิกายน\u2060–\u2060มีนาคม โลว์ซีซัน เมษายน\u2060–\u2060ตุลาคม",
    "price.low": "โลว์ซีซัน", "price.high": "ไฮซีซัน",
    "price.subStd": "มีโฆษณาเครือข่าย JET MEDIA ไม่มีโฆษณาร้านคู่แข่ง",
    "price.subPrm": "ไม่มีโฆษณาจากภายนอก",
    "price.platformK": "ซอฟต์แวร์และการสนับสนุน",
    "price.per": "ต่อเดือน", "price.saasNote": "ต่อร้าน — แพ็กเกจพื้นฐาน",
    "price.devicesK": "ค่าเช่าอุปกรณ์",
    "price.perDevice": "ต่อเครื่องต่อเดือน",
    "price.yourHall": "สำหรับร้านของคุณ:",
    "price.all": "ทุกอย่างใน Standard และเพิ่ม:", "price.badge": "สำหรับร้านระดับพรีเมียม",
    "price.s1": "อุปกรณ์บนทุกโต๊ะ พร้อมที่ชาร์จโทรศัพท์",
    "price.s2": "เมนูอินเทอร์แอกทีฟพร้อมรูปภาพและคำอธิบายอาหาร",
    "price.s3": "เมนูหลายภาษา",
    "price.s4": "เมนูแนะนำจากเชฟ โปรโมชัน และเมนูตามฤดูกาล",
    "price.s5": "เรียกพนักงานและขอเช็กบิล",
    "price.s6": "อัปเดตและการสนับสนุนทางเทคนิค",
    "price.p1": "ไม่มีโฆษณาของเครือข่าย JET MEDIA",
    "price.p2": "หน้าจอทั้งหมดสำหรับโปรโมชันและเมนูแนะนำของร้านคุณ",
    "price.ctaStd": "ขอติดตั้ง", "price.ctaPrm": "ขอชมการสาธิต",
    "price.noteSetup": "ค่าติดตั้งแพ็กเกจพื้นฐาน {setup} ชำระเมื่อเซ็นสัญญา: ติดตั้งอุปกรณ์ อัปโหลดเมนู อบรมพนักงาน",
    "price.noteTerms": "สัญญาขั้นต่ำ {minMonths} เดือน ยกเลิกได้ภายใน {cancelMonths} เดือนแรก ราคาทั้งหมดรวม VAT {vat}%",
    "price.open": "ดูรายการราคา", "price.openShort": "ราคา", "price.pdf": "ดาวน์โหลด PDF",
    "addons.title": "โมดูลเสริม",
    "addons.sub": "ไม่รวมอยู่ในแพ็กเกจพื้นฐาน เพิ่มได้กับทุกแพ็กเกจ ทั้งตอนเริ่มใช้งานหรือภายหลัง: ค่าตั้งค่าชำระครั้งเดียว และค่าบริการรายเดือนของโมดูลบวกเพิ่มในค่าบริการรายเดือน แต่ละโมดูลต้องใช้เวลาเพิ่มในการตั้งค่าและเชื่อมต่อกับระบบของร้าน",
    "addons.monthly": "+{price} ต่อเดือน", "addons.setup": "ค่าตั้งค่า {price} ครั้งเดียว",

    "faq.eyebrow": "คำถามที่พบบ่อย", "faq.title": "สิ่งที่ควรรู้ก่อนติดตั้ง",
    "faq.q1": "ถ้าอุปกรณ์เสียต้องทำอย่างไร",
    "faq.a1": "หากอยู่ในการรับประกัน เราเปลี่ยนให้ฟรี หากเสียหายจากการใช้งานของลูกค้า คิดค่าซ่อมแยกต่างหาก",
    "faq.q2": "ต้องเปลี่ยนระบบ POS หรือไม่",
    "faq.a2": "ไม่ต้อง แพ็กเกจพื้นฐานทำงานแยกจากระบบ POS หากต้องการให้ออร์เดอร์จากโต๊ะส่งเข้าครัวทันที และเมนู ราคา และเมนูที่หมดซิงก์กัน เราเชื่อมต่อกับระบบของคุณได้เป็นโมดูลเสริม",
    "faq.q3": "ยกเลิกได้หรือไม่",
    "faq.a3": "สัญญามีระยะเวลาอย่างน้อย {minMonths} เดือน ในช่วง {cancelMonths} เดือนแรกสามารถยกเลิกได้ เราจะรับอุปกรณ์คืนเมื่อสิ้นสุดรอบที่ชำระแล้ว",
    "faq.q4": "ติดตั้งใช้เวลานานเท่าไร",
    "faq.a4": "แพ็กเกจพื้นฐานโดยทั่วไปใช้เวลา 1–3 วัน รวมการอัปโหลดเมนูและอบรมพนักงาน ส่วนโมดูลเสริมตั้งค่าแยกและใช้เวลามากกว่า ระยะเวลาขึ้นกับโมดูลและระบบ POS ของร้าน ซึ่งเราจะตกลงกันเมื่อสั่งโมดูล",

    "form.title": "ส่งคำขอ",
    "form.sub": "เราจะติดต่อกลับภายในหนึ่งวันทำการ สาธิตระบบให้ดูจริง และคำนวณจำนวนเครื่องที่ร้านของคุณต้องใช้",
    "form.tDemo": "ชมการสาธิต", "form.tInstall": "ติดตั้ง",
    "form.name": "ชื่อ", "form.namePh": "เราควรเรียกคุณว่าอะไร",
    "form.phone": "เบอร์โทร", "form.phonePh": "+66 XX XXX XXXX",
    "form.rest": "ชื่อร้านอาหาร", "form.restPh": "เช่น Sunset Beach Cafe",
    "form.send": "ส่งคำขอ",
    "form.hint": "เมื่อกดส่ง ถือว่าคุณยินยอมให้เราใช้ข้อมูลติดต่อเพื่อตอบกลับคำขอนี้",
    "form.sending": "กำลังส่ง…",
    "form.ok": "ส่งคำขอแล้ว เราจะติดต่อกลับภายในหนึ่งวันทำการ",
    "form.errFields": "กรุณากรอกชื่อ เบอร์โทร และชื่อร้าน",
    "form.errPhone": "กรุณาตรวจสอบเบอร์โทร",
    "form.errNet": "ส่งไม่สำเร็จ กรุณาลองใหม่อีกครั้งในอีกสักครู่",
    "form.errConfig": "แบบฟอร์มยังไม่ได้เชื่อมต่อ กรุณาติดต่อเราโดยตรง",

    "foot.tag": "พนักงานเสิร์ฟดิจิทัล โฆษณา และการวิเคราะห์สำหรับร้านอาหาร",
    "foot.contract": "สัญญา"
  }
};

/* =================================================================
   4. УТИЛИТЫ
   ================================================================= */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const LOCALES = { ru: "ru-RU", en: "en-US", th: "th-TH" };
let lang = "ru";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let nf = new Intl.NumberFormat(LOCALES[lang], { maximumFractionDigits: 0 });
let pf = new Intl.NumberFormat(LOCALES[lang], { maximumFractionDigits: 1 });

// Неразрывный пробел перед ฿: символ валюты не отрывается от числа при переносе
const money  = n => nf.format(Math.round(Math.abs(n))) + "\u00a0" + CONFIG.currency;
const plus   = n => "+" + money(n);
const minus  = n => "−" + money(n);
const signed = n => (n < 0 ? "−" : "+") + money(n);   // «чистый результат» может уйти в минус
const plainN = n => nf.format(Math.round(n));
const pctNum = v => pf.format(Math.round(v * 10) / 10);   // 6 → «6», 12.5 → «12,5»

/* Строка перевода с подстановками: "подключение — {setup}" + { setup: "4 900 ฿" } */
const tpl = (str, vars) => String(str || "").replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));

/* «1 200 ฿ + 10 × 240 ฿ = 3 600 ฿» — стоимость видна вместе с формулой */
const formula = (platform, devices, price) =>
  money(platform) + " + " + plainN(devices) + " × " + money(price) + " = " + money(platform + devices * price);

/* Подстановка чисел из CONFIG в разметку.
   Все элементы с data-claim берут значение отсюда, поэтому цифра
   в тексте и цифра в расчётах не могут разойтись. */
function renderClaims(){
  // Диапазон прироста — это границы ползунка «Прирост выручки»
  const u = CONFIG.sliders.uplift;
  const claims = {
    "uplift-range": u.min === u.max
      ? "+" + pctNum(u.min) + "%"
      : "+" + pctNum(u.min) + "–" + pctNum(u.max) + "%",
    "relief":       "−" + pctNum(CONFIG.staffRelief) + "%",
    "launch-days":  CONFIG.launchDays
  };

  const targets = $$("[data-claim]");
  if (!targets.length){
    console.warn("JET MEDIA: в разметке нет элементов data-claim. " +
                 "Похоже, index.html остался от старой версии — обновите его вместе со script.js.");
  }
  targets.forEach(el => {
    const val = claims[el.dataset.claim];
    if (val) el.textContent = val;
  });
  log("подписи обновлены", claims);
}

/* Фразы с числами внутри (data-tpl): текст из перевода, числа из CONFIG. */
function renderTemplates(){
  const vars = {
    setup:        money(CONFIG.setupFee),
    vat:          pctNum(CONFIG.vat),
    low:          plainN(CONFIG.pricing.low.months),
    high:         plainN(CONFIG.pricing.high.months),
    minMonths:    plainN(CONFIG.contract.minMonths),
    cancelMonths: plainN(CONFIG.contract.cancelMonths),
    // «6–15%» не разрывается: вокруг тире — невидимые «склейки» (word joiner)
    range:        pctNum(CONFIG.sliders.uplift.min) + "\u2060–\u2060" + pctNum(CONFIG.sliders.uplift.max)
  };
  $$("[data-tpl]").forEach(el => { el.textContent = tpl(I18N[lang][el.dataset.tpl], vars); });
}

/* Дополнительные модули — из CONFIG.addons (config.js): карточки с ценами
   под тарифами и названия в блоке «Что получает ресторан». Нет модулей —
   блоки с атрибутом data-addons-block прячутся. */
function renderAddons(){
  const dict = I18N[lang];
  const addons = CONFIG.addons || [];
  $$("[data-addons-block]").forEach(el => { el.hidden = !addons.length; });

  $$('[data-addons="names"]').forEach(list => {
    list.textContent = "";
    addons.forEach(a => {
      const li = document.createElement("li");
      li.textContent = addonText(a, "name", lang);
      list.appendChild(li);
    });
  });

  $$('[data-addons="cards"]').forEach(list => {
    list.textContent = "";
    addons.forEach(a => {
      const li = document.createElement("li");
      li.className = "addon";
      const parts = [
        ["h4", "addon-name",        addonText(a, "name", lang)],
        ["p",  "addon-desc",        addonText(a, "desc", lang)],
        ["p",  "addon-monthly num", tpl(dict["addons.monthly"], { price: money(a.monthly) })],
        ["p",  "addon-setup",       tpl(dict["addons.setup"],   { price: money(a.setup) })]
      ];
      parts.forEach(([tag, cls, text]) => {
        const el = document.createElement(tag);
        el.className = cls;
        el.textContent = text;
        li.appendChild(el);
      });
      list.appendChild(li);
    });
  });
}

/* Ссылки на прайс-лист и договор ведут на версию на текущем языке */
function renderPriceLinks(){
  $$("[data-price-page]").forEach(a => { a.href = "price.html?lang=" + lang; });
  $$("[data-contract-page]").forEach(a => { a.href = "contract.html?lang=" + lang; });
  $$("[data-price-pdf]").forEach(a => {
    a.href = "price-" + lang + ".pdf";
    a.setAttribute("download", "JET-MEDIA-price-" + lang.toUpperCase() + ".pdf");
  });
}

/* Плавный счётчик от текущего значения к целевому. */
function animateNumber(el, to, fmt, duration = 650){
  const from = Number(el.dataset.v || 0);
  el.dataset.v = to;
  if (reduceMotion || from === to || duration === 0){ el.textContent = fmt(to); return; }

  cancelAnimationFrame(Number(el.dataset.raf || 0));
  const start = performance.now();
  const step = now => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);              // easeOutCubic
    el.textContent = fmt(from + (to - from) * eased);
    if (t < 1) el.dataset.raf = requestAnimationFrame(step);
  };
  el.dataset.raf = requestAnimationFrame(step);
}

/* =================================================================
   5. ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА
   ================================================================= */
function applyLang(code){
  lang = I18N[code] ? code : "ru";
  const dict = I18N[lang];

  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
  document.title = dict["meta.title"];
  const desc = $('meta[name="description"]');
  if (desc) desc.setAttribute("content", dict["meta.desc"]);

  $$("[data-i18n]").forEach(el => {
    const val = dict[el.dataset.i18n];
    if (val) el.textContent = val;
  });
  $$("[data-i18n-ph]").forEach(el => {
    const val = dict[el.dataset.i18nPh];
    if (val) el.placeholder = val;
  });
  $$("[data-i18n-alt]").forEach(el => {
    const val = dict[el.dataset.i18nAlt];
    if (val) el.alt = val;
  });

  nf = new Intl.NumberFormat(LOCALES[lang], { maximumFractionDigits: 0 });
  pf = new Intl.NumberFormat(LOCALES[lang], { maximumFractionDigits: 1 });
  $$(".lang-btn").forEach(b => b.classList.toggle("is-active", b.dataset.setLang === lang));

  renderClaims();
  renderTemplates();
  renderAddons();
  renderPriceLinks();
  recalc(true);
  renderPrices(true);

  try { localStorage.setItem("jm_lang", lang); } catch (e) { /* приватный режим — не страшно */ }
}

$$(".lang-btn").forEach(btn => btn.addEventListener("click", () => applyLang(btn.dataset.setLang)));

/* =================================================================
   6. КАЛЬКУЛЯТОР
   Прирост выручки один на оба тарифа: его задаёт ползунок, потому что
   он зависит от ресторана, а не от подписки. Тарифы отличаются только
   расходами, поэтому у каждого — своя стоимость и свой чистый результат.
   Месяц — по выбранному сезону. Год — по обоим сезонам сразу: сколько
   месяцев длится каждый, задано в CONFIG.pricing.
   ================================================================= */
const sTables = $("#sTables"), sGuests = $("#sGuests"), sCheck = $("#sCheck"), sUplift = $("#sUplift");
const oTables = $("#oTables"), oGuests = $("#oGuests"), oCheck = $("#oCheck"), oUplift = $("#oUplift");
const rNow = $("#rNow"), rGain = $("#rGain"), rGainPct = $("#rGainPct");
const costStd = $("#costStd"), netStd = $("#netStd");
const costPrm = $("#costPrm"), netPrm = $("#netPrm");
const saasStdEl = $("#saasStd"), devStdEl = $("#devStd"), devHintStd = $("#devHintStd");
const saasPrmEl = $("#saasPrm"), devPrmEl = $("#devPrm"), devHintPrm = $("#devHintPrm");
const seasonSeg = $("#calcSeasonSeg"), yearNote = $("#calcYearNote");

let period = CONFIG.defaultPeriod === "year" ? "year" : "month";
let season = CONFIG.defaultSeason === "high" ? "high" : "low";

/* Ползунки настраиваются из CONFIG, а не из разметки */
function setupSliders(){
  [["tables", sTables], ["guests", sGuests], ["check", sCheck], ["uplift", sUplift]].forEach(([key, input]) => {
    const c = CONFIG.sliders[key];
    input.min = c.min; input.max = c.max; input.step = c.step; input.value = c.value;
  });
}

/* Заливка дорожки ползунка через CSS-переменную */
function paintRange(input){
  const pct = ((input.value - input.min) / (input.max - input.min)) * 100;
  input.style.setProperty("--p", pct + "%");
}

/* Стоимость тарифа за выбранный период: софт, все устройства
   и цена одного устройства за тот же период (для подсказки «10 × 240 ฿»).
   Год — не «сезон × 12», а сумма по сезонам: 7 × низкий + 5 × высокий. */
function periodCost(tables, tier){
  if (period === "year"){
    const y = yearlyFee(tables, tier);
    return { software: y.software, devices: y.devices, unit: yearlyFee(1, tier).devices };
  }
  return {
    software: softwareFee(season, tier),
    devices:  deviceFee(tables, season, tier),
    unit:     devicePrice(season, tier)
  };
}

/* Главный пересчёт. instant = true — без анимации (смена языка, первый показ) */
function recalc(instant){
  const tables = +sTables.value;
  const guests = +sGuests.value;
  const check  = +sCheck.value;
  const uplift = +sUplift.value;

  // Ползунки описывают обычный месяц работы зала, год — это 12 таких месяцев
  const months  = period === "year" ? 12 : 1;
  const revenue = guests * check * months;

  // Прирост выручки — один на оба тарифа
  const gain = revenue * uplift / 100;

  // Расходы разложены на две части: софт и поддержка + аренда устройств.
  // Платное каждое устройство, по одному на столик.
  const std = periodCost(tables, "standard");
  const prm = periodCost(tables, "premium");
  const saasStd = std.software, devStd = std.devices, totStd = saasStd + devStd;
  const saasPrm = prm.software, devPrm = prm.devices, totPrm = saasPrm + devPrm;

  devHintStd.textContent = plainN(tables) + " × " + money(std.unit);
  devHintPrm.textContent = plainN(tables) + " × " + money(prm.unit);

  // В режиме «Год» сезон не выбирается: год считается по обоим сезонам
  seasonSeg.hidden = period === "year";
  yearNote.hidden  = period !== "year";

  renderPlanExamples(tables);

  oTables.textContent = plainN(tables);
  oGuests.textContent = plainN(guests);
  oCheck.textContent  = money(check);
  oUplift.textContent = "+" + pctNum(uplift) + "%";
  rGainPct.textContent = "+" + pctNum(uplift) + "%";
  [sTables, sGuests, sCheck, sUplift].forEach(paintRange);

  const dur = instant ? 0 : 650;
  animateNumber(rNow, revenue, money, dur);
  animateNumber(rGain, gain, plus, dur);

  animateNumber(saasStdEl, saasStd, minus, dur);
  animateNumber(devStdEl, devStd, minus, dur);
  animateNumber(costStd, totStd, minus, dur);
  animateNumber(netStd, gain - totStd, signed, dur);

  animateNumber(saasPrmEl, saasPrm, minus, dur);
  animateNumber(devPrmEl, devPrm, minus, dur);
  animateNumber(costPrm, totPrm, minus, dur);
  animateNumber(netPrm, gain - totPrm, signed, dur);

  // Отрицательный результат подсвечивается — так честнее, чем прятать
  netStd.classList.toggle("neg", gain - totStd < 0);
  netPrm.classList.toggle("neg", gain - totPrm < 0);

  // Подпись итога зависит от выбранного периода
  const totalLabel = I18N[lang][period === "year" ? "calc.totalYear" : "calc.totalMonth"];
  $$("[data-total-label]").forEach(el => { el.textContent = totalLabel; });
}

[sTables, sGuests, sCheck, sUplift].forEach(inp => inp.addEventListener("input", () => recalc(false)));

/* Период: месяц или год */
$$("[data-period]").forEach(btn => {
  btn.addEventListener("click", () => {
    period = btn.dataset.period;
    $$("[data-period]").forEach(b => b.classList.toggle("is-active", b.dataset.period === period));
    recalc(false);
  });
});

/* Сезон: переключатели в калькуляторе и в тарифах связаны между собой */
$$("[data-season]").forEach(btn => {
  btn.addEventListener("click", () => {
    season = btn.dataset.season;
    $$("[data-season]").forEach(b => b.classList.toggle("is-active", b.dataset.season === season));
    renderPrices(false);
    recalc(false);
  });
});

/* =================================================================
   7. ТАРИФЫ
   ================================================================= */
function renderPrices(instant){
  const dur = instant || reduceMotion ? 0 : 400;

  // Софт и поддержка за ресторан
  animateNumber($("#priceStd"), softwareFee(season, "standard"), money, dur);
  animateNumber($("#pricePrm"), softwareFee(season, "premium"),  money, dur);

  // Одно устройство — платится каждое, с первого
  animateNumber($("#devPriceStd"), devicePrice(season, "standard"), money, dur);
  animateNumber($("#devPricePrm"), devicePrice(season, "premium"),  money, dur);

  renderPlanExamples(+sTables.value);
}

/* «Для вашего зала: 1 200 ฿ + 10 × 240 ฿ = 3 600 ฿» —
   число столиков берётся из калькулятора, сезон — из переключателя */
function renderPlanExamples(tables){
  $("#exampleStd").textContent = formula(softwareFee(season, "standard"), tables, devicePrice(season, "standard"));
  $("#examplePrm").textContent = formula(softwareFee(season, "premium"),  tables, devicePrice(season, "premium"));
}


/* =================================================================
   8. ФОРМА ЗАЯВКИ И ОТПРАВКА ЧЕРЕЗ GOOGLE APPS SCRIPT
   ================================================================= */
const form = $("#leadForm");
const statusEl = $("#formStatus");
const submitBtn = $("#submitBtn");
let requestType = "demo";     // demo | install

$$("[data-type]").forEach(btn => {
  btn.addEventListener("click", () => {
    requestType = btn.dataset.type;
    $$("[data-type]").forEach(b => b.classList.toggle("is-active", b === btn));
  });
});

/* Любая кнопка страницы может заранее выбрать тип заявки */
$$("[data-request-type]").forEach(link => {
  link.addEventListener("click", () => {
    const target = $(`[data-type="${link.dataset.requestType}"]`);
    if (target) target.click();
  });
});

/* Адрес нормализуем один раз: лишние пробелы и перевод строки
   при копировании из Apps Script — обычное дело */
CONFIG.appsScriptUrl = String(CONFIG.appsScriptUrl || "").trim();

const URL_RE = /^https:\/\/script\.google\.com\/(a\/macros\/[^/]+|macros)\/s\/[\w-]+\/(exec|dev)/;
const urlReady = () => URL_RE.test(CONFIG.appsScriptUrl);

/**
 * КАНАЛ 1 — JSONP (основной).
 *
 * Браузер загружает ответ Apps Script как обычный <script>, а не через
 * fetch. Тег <script> не подчиняется правилам CORS вообще: ни preflight,
 * ни заголовков Access-Control не требуется, редирект Apps Script на
 * script.googleusercontent.com отрабатывает штатно. Это единственный
 * способ, который одинаково работает и в обычном браузере, и в WebView
 * Telegram, и при этом возвращает подтверждение от сервера.
 *
 * Скрипт должен отвечать вызовом функции: за это отвечает параметр
 * callback в Code.gs. Если вы обновили Code.gs, не забудьте развернуть
 * НОВУЮ ВЕРСИЮ веб-приложения — иначе ответа не будет.
 *
 * @returns {Promise<boolean|null>} true/false — ответ получен,
 *          null — ответа нет, имеет смысл попробовать следующий канал
 */
function sendViaJsonp(payload, timeoutMs = 15000){
  return new Promise(resolve => {
    const cbName = "jm_cb_" + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);
    const params = new URLSearchParams(Object.assign({}, payload, { callback: cbName }));
    const script = document.createElement("script");
    let finished = false;

    const cleanup = () => {
      finished = true;
      clearTimeout(timer);
      try { delete window[cbName]; } catch (e) { window[cbName] = undefined; }
      if (script.parentNode) script.parentNode.removeChild(script);
    };

    window[cbName] = data => {
      if (finished) return;
      log("JSONP ответ:", data);
      cleanup();
      if (data && data.ok !== true) console.warn("JET MEDIA: Apps Script ответил ошибкой:", data);
      resolve(Boolean(data && data.ok === true));
    };

    const timer = setTimeout(() => {
      if (finished) return;
      console.warn("JET MEDIA: Apps Script не ответил за " + timeoutMs + " мс. " +
                   "Проверьте, что развёрнута новая версия скрипта с поддержкой callback.");
      cleanup();
      resolve(null);
    }, timeoutMs);

    script.onerror = () => {
      if (finished) return;
      console.warn("JET MEDIA: браузер не смог загрузить ответ Apps Script. " +
                   "Чаще всего это доступ к веб-приложению: должно быть «У всех».");
      cleanup();
      resolve(null);
    };

    script.src = CONFIG.appsScriptUrl + (CONFIG.appsScriptUrl.indexOf("?") === -1 ? "?" : "&") + params.toString();
    log("JSONP →", script.src);
    document.head.appendChild(script);
  });
}

/**
 * КАНАЛ 2 — обычный GET через fetch.
 * Работает, когда ответ Apps Script приходит с заголовками CORS.
 * @returns {Promise<boolean|null>} null — ответ прочитать не удалось
 */
async function sendViaFetch(payload){
  const url = CONFIG.appsScriptUrl + "?" + new URLSearchParams(payload).toString();
  try {
    const res  = await fetch(url, { method: "GET", redirect: "follow" });
    const text = await res.text();
    log("fetch ответ:", res.status, text.slice(0, 200));
    const data = JSON.parse(text);
    return data.ok === true;
  } catch (err) {
    log("fetch не прошёл:", err);
    return null;
  }
}

/**
 * КАНАЛ 3 — POST без чтения ответа.
 * Последняя попытка: подтверждения не будет, но заявка дойдёт.
 */
async function sendViaBeacon(payload){
  try {
    await fetch(CONFIG.appsScriptUrl, {
      method: "POST",
      mode: "no-cors",
      // text/plain не вызывает preflight; Apps Script разберёт тело как JSON
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    log("POST no-cors отправлен (ответ недоступен)");
    return true;
  } catch (err) {
    console.error("JET MEDIA: POST тоже не прошёл:", err);
    return false;
  }
}

/** Резервный путь: прямой вызов Bot API. Токен виден в исходниках сайта. */
async function sendDirectToTelegram(payload){
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const text =
    `<b>JET MEDIA — новая заявка</b>\n` +
    `Тип: <b>${payload.type === "install" ? "Установка" : "Демонстрация"}</b>\n` +
    `Имя: ${esc(payload.name)}\n` +
    `Телефон: ${esc(payload.phone)}\n` +
    `Ресторан: ${esc(payload.restaurant)}\n\n` +
    `Столиков: ${payload.tables}\n` +
    `Гостей в месяц: ${payload.guests}\n` +
    `Средний чек: ${payload.check} THB`;

  const res = await fetch(`https://api.telegram.org/bot${CONFIG.botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CONFIG.chatId, text, parse_mode: "HTML", disable_web_page_preview: true })
  });
  const data = await res.json().catch(() => ({}));
  if (!data.ok) console.error("Telegram API:", data);
  return Boolean(data.ok);
}

/* Порядок каналов: JSONP → fetch GET → POST no-cors → прямой Bot API.
   Возвращает "unset", если адрес приёма заявок вообще не задан —
   на странице покажется отдельное сообщение, а не «ошибка сети». */
async function sendLead(payload){
  if (!urlReady()){
    if (CONFIG.botToken && CONFIG.chatId) return sendDirectToTelegram(payload);
    console.error(
      "JET MEDIA: заявка никуда не ушла — CONFIG.appsScriptUrl задан неверно.\n" +
      "Сейчас там: " + (CONFIG.appsScriptUrl || "пусто") + "\n" +
      "Ожидается ссылка вида https://script.google.com/macros/s/AKfycb.../exec"
    );
    return "unset";
  }

  if (CONFIG.appsScriptUrl.indexOf("/dev") !== -1){
    console.warn("JET MEDIA: указан адрес /dev — он работает только у владельца скрипта. Нужен /exec.");
  }

  const viaJsonp = await sendViaJsonp(payload);
  if (viaJsonp !== null) return viaJsonp;

  const viaFetch = await sendViaFetch(payload);
  if (viaFetch !== null) return viaFetch;

  return sendViaBeacon(payload);
}

/* Снимок калькулятора уходит вместе с заявкой: менеджер видит
   ожидания клиента ещё до первого звонка */
function calcSnapshot(){
  const tables = +sTables.value, guests = +sGuests.value, check = +sCheck.value, uplift = +sUplift.value;
  const revenue = guests * check;
  const gain = Math.round(revenue * uplift / 100);
  return {
    tables, guests, check, uplift,
    revenue: Math.round(revenue),
    // прирост у тарифов теперь общий; оба поля оставлены для таблицы заявок
    addStd: gain,
    addPrm: gain,
    saasStd: Math.round(softwareFee(season, "standard")),
    saasPrm: Math.round(softwareFee(season, "premium")),
    devicesStd: Math.round(deviceFee(tables, season, "standard")),
    devicesPrm: Math.round(deviceFee(tables, season, "premium")),
    costStd: Math.round(monthlyFee(tables, season, "standard")),
    costPrm: Math.round(monthlyFee(tables, season, "premium")),
    season, period
  };
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  const dict = I18N[lang];

  const name  = $("#fName").value.trim();
  const phone = $("#fPhone").value.trim();
  const rest  = $("#fRest").value.trim();
  const trap  = $("#fTrap").value;           // honeypot: заполнен — это бот

  if (trap){ form.reset(); return; }

  [["#fName", name], ["#fPhone", phone], ["#fRest", rest]]
    .forEach(([sel, v]) => $(sel).classList.toggle("err", !v));

  if (!name || !phone || !rest){
    statusEl.textContent = dict["form.errFields"];
    statusEl.className = "form-status bad";
    return;
  }
  if (phone.replace(/\D/g, "").length < 8){
    $("#fPhone").classList.add("err");
    statusEl.textContent = dict["form.errPhone"];
    statusEl.className = "form-status bad";
    return;
  }

  const payload = Object.assign(
    { type: requestType, name, phone, restaurant: rest, lang, page: location.href },
    calcSnapshot()
  );

  submitBtn.disabled = true;
  statusEl.className = "form-status";
  statusEl.textContent = dict["form.sending"];

  try {
    const result = await sendLead(payload);
    const ok = result === true;

    // "unset" — адрес приёма заявок не задан. Владельцу сайта важно
    // видеть это отдельно от обычной ошибки сети.
    statusEl.textContent = result === "unset" ? dict["form.errConfig"]
                         : ok                 ? dict["form.ok"]
                                              : dict["form.errNet"];
    statusEl.className = "form-status " + (ok ? "ok" : "bad");

    if (ok){
      form.reset();
      $$(".inp").forEach(i => i.classList.remove("err"));
    }
  } catch (err){
    console.error(err);
    statusEl.textContent = dict["form.errNet"];
    statusEl.className = "form-status bad";
  } finally {
    submitBtn.disabled = false;
  }
});

/* =================================================================
   9. ИНТЕРФЕЙС
   ================================================================= */
const head = $("#siteHead");
const onScroll = () => head.classList.toggle("scrolled", window.scrollY > 12);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const burger = $("#burger"), nav = $("#nav");
burger.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(open));
});
nav.addEventListener("click", e => {
  if (e.target.tagName === "A"){
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }
});

if ("IntersectionObserver" in window && !reduceMotion){
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("in");
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  $$(".reveal").forEach(el => io.observe(el));
} else {
  $$(".reveal").forEach(el => el.classList.add("in"));
}

$("#year").textContent = new Date().getFullYear();

/* =================================================================
   СТАРТ
   ================================================================= */
(function init(){
  setupSliders();

  // Начальное состояние переключателей — из CONFIG
  $$("[data-period]").forEach(b => b.classList.toggle("is-active", b.dataset.period === period));
  $$("[data-season]").forEach(b => b.classList.toggle("is-active", b.dataset.season === season));

  let saved = null;
  try { saved = localStorage.getItem("jm_lang"); } catch (e) {}
  const browser = (navigator.language || "ru").slice(0, 2).toLowerCase();
  applyLang(saved || (I18N[browser] ? browser : "ru"));

  if (!urlReady() && !CONFIG.botToken){
    console.warn("JET MEDIA: форма заявки не настроена. Укажите CONFIG.appsScriptUrl — " +
                 "ссылку вида https://script.google.com/macros/s/AKfycb.../exec");
  }
  log("готово. Проверка отправки: JM.testLead()");
})();

/* Отладочный доступ из консоли браузера:
     JM.config       — текущие настройки
     JM.diagnose()   — проверить приём заявок по шагам
     JM.testLead()   — отправить тестовую заявку
     JM.recalc()     — пересчитать калькулятор                      */
window.JM = {
  config: CONFIG,
  recalc: () => recalc(false),

  /* Пошаговая проверка канала заявок. Печатает, что именно не так. */
  diagnose: async () => {
    const line = (label, value) => console.log("  " + label.padEnd(22) + value);
    console.log("%cJET MEDIA — проверка приёма заявок", "color:#46C7FF;font-weight:700");

    line("адрес:", CONFIG.appsScriptUrl || "не задан");
    if (!urlReady()){
      console.log("%c  формат адреса неверный", "color:#FF8F9B");
      console.log("  ожидается: https://script.google.com/macros/s/AKfycb.../exec");
      return false;
    }
    line("формат:", "ок");
    if (CONFIG.appsScriptUrl.indexOf("/dev") !== -1) line("внимание:", "адрес /dev вместо /exec");

    const payload = Object.assign({
      type: "demo", name: "Проверка связи", phone: "+66 00 000 0000",
      restaurant: "JM diagnose", lang, page: location.href
    }, calcSnapshot());

    const jsonp = await sendViaJsonp(payload, 15000);
    line("JSONP:", jsonp === null ? "ответа нет" : jsonp ? "ок, заявка принята" : "скрипт вернул ошибку");
    if (jsonp === true) return true;

    console.log("  Что проверить в Apps Script:");
    console.log("   1. Развернуть → Управление развёртываниями → Версия «Новая версия»");
    console.log("   2. Доступ к веб-приложению: «У всех», запуск от вашего имени");
    console.log("   3. Code.gs должен быть свежий — с поддержкой параметра callback");
    console.log("   4. Откройте в браузере: " + CONFIG.appsScriptUrl + "?name=Тест&phone=+66000000000&restaurant=Test");
    return false;
  },
  testLead: () => sendLead(Object.assign({
    type: "demo",
    name: "Тестовая заявка",
    phone: "+66 00 000 0000",
    restaurant: "Test",
    lang, page: location.href
  }, calcSnapshot())).then(ok => {
    console.log(ok ? "JET MEDIA: тестовая заявка отправлена" : "JET MEDIA: отправить не удалось");
    return ok;
  })
};
