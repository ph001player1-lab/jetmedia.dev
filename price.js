/* =================================================================
   JET MEDIA — price.js
   Прайс-лист (price.html). Цены, даты и контакты берутся из CONFIG
   (config.js), тексты — из словаря ниже. Эта же страница — исходник
   для PDF-файлов price-ru.pdf / price-en.pdf / price-th.pdf.

   Язык: ?lang=ru|en|th в адресе, иначе язык, выбранный на сайте,
   иначе язык браузера. Ссылка «Скачать PDF» ведёт на PDF того же языка.
   ================================================================= */

const PRICE_I18N = {

  ru: {
    title: "JET MEDIA — прайс-лист",
    back: "← На сайт", print: "Печать", pdf: "Скачать PDF",
    kicker: "Прайс-лист",
    date: "Цены действуют с {date}",
    h1: "Цифровой официант для ресторанов",
    lead: "Планшет на каждом столе: меню на нескольких языках, заказ и оплата со стола, вызов официанта, AI-рекомендации блюд и напитков. Помогает поднять средний чек и разгрузить персонал.",

    monthlyH: "Ежемесячная оплата", monthlyUnit: "฿ в месяц",
    stdSub: "с рекламой JET MEDIA, без рекламы конкурентов",
    prmSub: "без сторонней рекламы",
    low: "Низкий сезон", high: "Высокий сезон",
    lowMonths: "апрель–октябрь", highMonths: "ноябрь–март",
    platform: "Платформа", platformNote: "за ресторан",
    device: "Устройство", deviceNote: "за каждое, 1 на столик",
    formula: "Стоимость в месяц = платформа + устройство × число столиков",

    examplesH: "Примеры расчёта", examplesUnit: "฿ в месяц по сезонам и за год",
    tables: "Столиков",
    perLow: "Низкий сезон", perHigh: "Высокий сезон", perYear: "За год",
    yearNote: "За год = {low} мес. низкого сезона + {high} мес. высокого",

    includedH: "Что входит в ежемесячную оплату",
    included: [
      "Устройство на каждый стол с зарядкой для телефона",
      "Интерактивное меню с фото и описанием блюд",
      "Меню на нескольких языках",
      "Заказ и дозаказ со стола",
      "AI-рекомендации блюд, напитков и десертов",
      "Рекомендации шеф-повара, акции и сезонные новинки",
      "Вызов официанта и запрос счёта",
      "Оплата со стола картой и QR",
      "Сбор отзывов и программа лояльности",
      "Любимые блюда гостя и приглашения на акции",
      "Аналитика заказов и предпочтений гостей",
      "Обновления и техническая поддержка"
    ],

    servicesH: "Разово и дополнительно",
    setup: "Подключение и настройка", setupUnit: "разово",
    setupNote: "Установка устройств, загрузка меню, обучение персонала.",
    payment: "Онлайн-оплата через JET MEDIA", paymentUnit: "от суммы платежа",
    paymentNote: "Комиссия банка или платёжного провайдера — отдельно, по его тарифу.",

    termsH: "Условия",
    terms: [
      "Сезоны: высокий — ноябрь–март ({high} мес.), низкий — апрель–октябрь ({low} мес.).",
      "Устройства — в аренде, по одному на столик. Гарантийная замена — за счёт JET MEDIA.",
      "Оплата ежемесячно. Отказаться можно в любой момент — заберём оборудование в конце оплаченного периода.",
      "Цены в тайских батах."
    ],

    qr: "Калькулятор для вашего ресторана — на сайте",
    contacts: { phone: "Тел.", line: "LINE", whatsapp: "WhatsApp", telegram: "Telegram", email: "E-mail" }
  },

  en: {
    title: "JET MEDIA — price list",
    back: "← Back to site", print: "Print", pdf: "Download PDF",
    kicker: "Price list",
    date: "Prices valid from {date}",
    h1: "A digital waiter for restaurants",
    lead: "A tablet on every table: a menu in several languages, ordering and payment from the table, a waiter call button, AI recommendations for dishes and drinks. Helps raise the average check and take load off the staff.",

    monthlyH: "Monthly fees", monthlyUnit: "฿ per month",
    stdSub: "with JET MEDIA ads, never competitors' ads",
    prmSub: "no third-party ads",
    low: "Low season", high: "High season",
    lowMonths: "April–October", highMonths: "November–March",
    platform: "Platform", platformNote: "per restaurant",
    device: "Device", deviceNote: "each one, 1 per table",
    formula: "Monthly price = platform + device × number of tables",

    examplesH: "Examples", examplesUnit: "฿ per month by season, and per year",
    tables: "Tables",
    perLow: "Low season", perHigh: "High season", perYear: "Per year",
    yearNote: "A year = {low} low-season months + {high} high-season months",

    includedH: "Included in the monthly fee",
    included: [
      "A device on every table with phone charging",
      "Interactive menu with photos and dish descriptions",
      "Menu in several languages",
      "Ordering and re-ordering from the table",
      "AI recommendations for dishes, drinks and desserts",
      "Chef's picks, specials and seasonal dishes",
      "Call a waiter and request the bill",
      "Pay at the table by card or QR",
      "Guest reviews and loyalty programme",
      "Guests' favourite dishes and promo invitations",
      "Analytics of orders and guest preferences",
      "Updates and technical support"
    ],

    servicesH: "One-time and optional",
    setup: "Setup", setupUnit: "one-time",
    setupNote: "Device installation, menu upload, staff training.",
    payment: "Online payments via JET MEDIA", paymentUnit: "of the payment amount",
    paymentNote: "The bank's or payment provider's fee is charged separately at its own rate.",

    termsH: "Terms",
    terms: [
      "Seasons: high is November–March ({high} months), low is April–October ({low} months).",
      "Devices are rented, one per table. Warranty replacement is at JET MEDIA's expense.",
      "Monthly billing. Cancel any time — we collect the equipment at the end of the paid period.",
      "Prices are in Thai baht."
    ],

    qr: "A calculator for your restaurant is on our website",
    contacts: { phone: "Tel.", line: "LINE", whatsapp: "WhatsApp", telegram: "Telegram", email: "E-mail" }
  },

  th: {
    title: "JET MEDIA — รายการราคา",
    back: "← กลับไปที่เว็บไซต์", print: "พิมพ์", pdf: "ดาวน์โหลด PDF",
    kicker: "รายการราคา",
    date: "ราคามีผลตั้งแต่ {date}",
    h1: "พนักงานเสิร์ฟดิจิทัลสำหรับร้านอาหาร",
    lead: "แท็บเล็ตบนทุกโต๊ะ: เมนูหลายภาษา สั่งอาหารและชำระเงินจากโต๊ะ ปุ่มเรียกพนักงาน และ AI แนะนำอาหารและเครื่องดื่ม ช่วยเพิ่มยอดบิลเฉลี่ยและลดภาระงานของพนักงาน",

    monthlyH: "ค่าบริการรายเดือน", monthlyUnit: "฿ ต่อเดือน",
    stdSub: "มีโฆษณา JET MEDIA ไม่มีโฆษณาร้านคู่แข่ง",
    prmSub: "ไม่มีโฆษณาจากภายนอก",
    low: "โลว์ซีซัน", high: "ไฮซีซัน",
    lowMonths: "เมษายน–ตุลาคม", highMonths: "พฤศจิกายน–มีนาคม",
    platform: "แพลตฟอร์ม", platformNote: "ต่อร้าน",
    device: "อุปกรณ์", deviceNote: "ต่อเครื่อง 1 เครื่องต่อโต๊ะ",
    formula: "ค่าบริการต่อเดือน = แพลตฟอร์ม + อุปกรณ์ × จำนวนโต๊ะ",

    examplesH: "ตัวอย่างการคำนวณ", examplesUnit: "฿ ต่อเดือนตามฤดูกาล และต่อปี",
    tables: "จำนวนโต๊ะ",
    perLow: "โลว์ซีซัน", perHigh: "ไฮซีซัน", perYear: "ต่อปี",
    yearNote: "หนึ่งปี = โลว์ซีซัน {low} เดือน + ไฮซีซัน {high} เดือน",

    includedH: "สิ่งที่รวมอยู่ในค่าบริการรายเดือน",
    included: [
      "อุปกรณ์บนทุกโต๊ะ พร้อมที่ชาร์จโทรศัพท์",
      "เมนูอินเทอร์แอกทีฟพร้อมรูปภาพและคำอธิบายอาหาร",
      "เมนูหลายภาษา",
      "สั่งอาหารและสั่งเพิ่มจากโต๊ะ",
      "AI แนะนำอาหาร เครื่องดื่ม และของหวาน",
      "เมนูแนะนำจากเชฟ โปรโมชัน และเมนูตามฤดูกาล",
      "เรียกพนักงานและขอใบเสร็จ",
      "ชำระเงินที่โต๊ะด้วยบัตรหรือ QR",
      "รีวิวจากลูกค้าและโปรแกรมสะสมคะแนน",
      "เมนูโปรดของลูกค้าและคำเชิญร่วมโปรโมชัน",
      "วิเคราะห์ออร์เดอร์และความชอบของลูกค้า",
      "อัปเดตและการสนับสนุนทางเทคนิค"
    ],

    servicesH: "ค่าบริการครั้งเดียวและบริการเสริม",
    setup: "ติดตั้งและตั้งค่า", setupUnit: "ครั้งเดียว",
    setupNote: "ติดตั้งอุปกรณ์ อัปโหลดเมนู อบรมพนักงาน",
    payment: "ชำระเงินออนไลน์ผ่าน JET MEDIA", paymentUnit: "ของยอดชำระ",
    paymentNote: "ค่าธรรมเนียมของธนาคารหรือผู้ให้บริการชำระเงินคิดแยกตามอัตราของผู้ให้บริการ",

    termsH: "เงื่อนไข",
    terms: [
      "ฤดูกาล: ไฮซีซัน พฤศจิกายน–มีนาคม ({high} เดือน) โลว์ซีซัน เมษายน–ตุลาคม ({low} เดือน)",
      "อุปกรณ์เป็นแบบเช่า หนึ่งเครื่องต่อโต๊ะ การเปลี่ยนในระยะรับประกัน JET MEDIA รับผิดชอบค่าใช้จ่าย",
      "ชำระรายเดือน ยกเลิกได้ทุกเมื่อ เราจะรับอุปกรณ์คืนเมื่อสิ้นสุดรอบที่ชำระแล้ว",
      "ราคาเป็นเงินบาท"
    ],

    qr: "เครื่องคำนวณสำหรับร้านของคุณอยู่บนเว็บไซต์",
    contacts: { phone: "โทร", line: "LINE", whatsapp: "WhatsApp", telegram: "Telegram", email: "E-mail" }
  }
};

/* ---------------- Утилиты ---------------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const LOCALES = { ru: "ru-RU", en: "en-US", th: "th-TH" };
const tpl = (str, vars) => String(str || "").replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));

let lang = "ru";
let nf = new Intl.NumberFormat(LOCALES.ru, { maximumFractionDigits: 0 });
const num   = n => nf.format(Math.round(n));
const money = n => num(n) + " " + CONFIG.currency;

/* Язык: ?lang= в адресе → выбор на сайте → язык браузера → русский */
function detectLang(){
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (PRICE_I18N[fromUrl]) return fromUrl;
  let saved = null;
  try { saved = localStorage.getItem("jm_lang"); } catch (e) {}
  if (PRICE_I18N[saved]) return saved;
  const browser = (navigator.language || "ru").slice(0, 2).toLowerCase();
  return PRICE_I18N[browser] ? browser : "ru";
}

/* ---------------- Отрисовка ---------------- */
function render(){
  const d = PRICE_I18N[lang];
  const months = { low: num(CONFIG.pricing.low.months), high: num(CONFIG.pricing.high.months) };
  nf = new Intl.NumberFormat(LOCALES[lang], { maximumFractionDigits: 0 });

  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
  document.title = d.title;

  $$("[data-t]").forEach(el => {
    const val = d[el.dataset.t];
    if (typeof val === "string") el.textContent = val;
  });

  // Дата — месяцем и годом на языке прайса (в тайском — буддийский год)
  const date = new Date(CONFIG.priceList.date + "T00:00:00");
  $("#priceDate").textContent = tpl(d.date, {
    date: new Intl.DateTimeFormat(LOCALES[lang], { day: "numeric", month: "long", year: "numeric" }).format(date)
  });

  // Основная таблица: платформа и устройство по сезонам и тарифам
  $$("[data-price]").forEach(td => {
    const { price, season, tier } = td.dataset;
    const val = price === "platform" ? platformFee(season, tier) : devicePrice(season, tier);
    td.textContent = num(val);
  });

  // Примеры для типичных залов
  $("#examplesBody").innerHTML = "";
  CONFIG.priceList.examples.forEach(tables => {
    const tr = document.createElement("tr");
    const cells = [num(tables)];
    ["standard", "premium"].forEach(tier => {
      cells.push(num(monthlyFee(tables, "low", tier)), num(monthlyFee(tables, "high", tier)), num(yearlyFee(tables, tier).total));
    });
    cells.forEach((text, i) => {
      const cell = document.createElement(i === 0 ? "th" : "td");
      if (i === 0) cell.scope = "row";
      if (i === 3 || i === 6) cell.className = "t-year";
      cell.textContent = text;
      tr.appendChild(cell);
    });
    $("#examplesBody").appendChild(tr);
  });
  $("#yearNote").textContent = tpl(d.yearNote, months);

  // Списки
  const fill = (sel, items) => {
    $(sel).innerHTML = "";
    items.forEach(text => {
      const li = document.createElement("li");
      li.textContent = tpl(text, months);
      $(sel).appendChild(li);
    });
  };
  fill("#included", d.included);
  fill("#terms", d.terms);

  $("#setupFee").textContent = money(CONFIG.setupFee);
  $("#paymentFee").textContent = new Intl.NumberFormat(LOCALES[lang], { maximumFractionDigits: 1 }).format(CONFIG.paymentFee) + "%";

  // Подвал: сайт и контакты, пустые контакты не выводятся
  $("#footSite").textContent = CONFIG.priceList.site;
  const c = CONFIG.priceList.contacts || {};
  $("#footContacts").textContent = Object.keys(d.contacts)
    .filter(k => c[k])
    .map(k => d.contacts[k] + " " + c[k])
    .join("  ·  ");

  // Панель: язык и PDF того же языка
  $$(".lang-btn").forEach(b => b.classList.toggle("is-active", b.dataset.setLang === lang));
  const pdf = $("#pdfBtn");
  pdf.href = "price-" + lang + ".pdf";
  pdf.setAttribute("download", "JET-MEDIA-price-" + lang.toUpperCase() + ".pdf");
  $(".bar-back").href = "index.html#pricing";
}

function setLang(code){
  lang = PRICE_I18N[code] ? code : "ru";
  try { localStorage.setItem("jm_lang", lang); } catch (e) {}
  // Язык в адресе: ссылку на прайс можно отправить, и откроется нужный язык
  const url = new URL(location.href);
  url.searchParams.set("lang", lang);
  history.replaceState(null, "", url);
  render();
}

$$(".lang-btn").forEach(btn => btn.addEventListener("click", () => setLang(btn.dataset.setLang)));
$("#printBtn").addEventListener("click", () => window.print());

lang = detectLang();
render();
