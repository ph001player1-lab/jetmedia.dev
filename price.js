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
    lead: "Планшет на каждом столе: меню с фото на языке гостя, рекомендации шефа и акции, вызов официанта.",

    monthlyH: "Ежемесячная оплата", monthlyUnit: "฿ в месяц",
    stdSub: "с рекламой JET MEDIA, без рекламы конкурентов",
    prmSub: "без сторонней рекламы",
    low: "Низкий сезон", high: "Высокий сезон",
    lowMonths: "апрель–октябрь", highMonths: "ноябрь–март",
    platform: "Софт и поддержка", platformNote: "за ресторан",
    device: "Аренда устройства", deviceNote: "за каждое, 1 на столик",
    formula: "Стоимость в месяц = софт и поддержка + аренда устройства × число столиков",

    examplesH: "Примеры расчёта", examplesUnit: "฿ в месяц по сезонам и за год: {low} мес. низкого сезона + {high} мес. высокого",
    tables: "Столиков",
    perLow: "Низкий сезон", perHigh: "Высокий сезон", perYear: "За год",

    includedH: "Базовый пакет — входит в ежемесячную оплату",
    included: [
      "Устройство на каждый стол с зарядкой для телефона",
      "Интерактивное меню с фото и описанием блюд",
      "Меню на нескольких языках",
      "Рекомендации шеф-повара, акции и сезонные новинки",
      "Вызов официанта и запрос счёта",
      "Обновления и техническая поддержка"
    ],

    addonsH: "Дополнительные модули", addonsUnit: "к любому тарифу, ฿",
    addonsCol: "Модуль", addonsSetup: "Настройка", addonsMonthly: "В месяц",
    addonsNote: "Настройка — разово, при подключении модуля: сразу или позже. Абонплата модуля прибавляется к ежемесячной оплате и не зависит от сезона и тарифа. Модулям нужно дополнительное время на настройку — срок зависит от модуля и вашей кассы.",

    setupTerm: "Подключение базового пакета — {setup} разово при подписании договора: установка, меню, обучение.",

    termsH: "Подключение и условия",
    terms: [
      "Сезоны: высокий — ноябрь–март ({high} мес.), низкий — апрель–октябрь ({low} мес.).",
      "Устройства — в аренде, по одному на столик. Гарантийная замена — за счёт JET MEDIA.",
      "Договор — от {minMonths} мес., в первые {cancelMonths} мес. можно отказаться. Оплата ежемесячно, цены в тайских батах."
    ],

    qr: "Расчёт для вашего ресторана и заявка — на сайте",
    contacts: { phone: "Тел.", line: "LINE", whatsapp: "WhatsApp", telegram: "Telegram", email: "E-mail" }
  },

  en: {
    title: "JET MEDIA — price list",
    back: "← Back to site", print: "Print", pdf: "Download PDF",
    kicker: "Price list",
    date: "Prices valid from {date}",
    h1: "A digital waiter for restaurants",
    lead: "A tablet on every table: a photo menu in the guest's language, chef's picks and specials, a waiter call button.",

    monthlyH: "Monthly fees", monthlyUnit: "฿ per month",
    stdSub: "with JET MEDIA ads, never competitors' ads",
    prmSub: "no third-party ads",
    low: "Low season", high: "High season",
    lowMonths: "April–October", highMonths: "November–March",
    platform: "Software & support", platformNote: "per restaurant",
    device: "Device rental", deviceNote: "each one, 1 per table",
    formula: "Monthly price = software & support + device rental × number of tables",

    examplesH: "Examples", examplesUnit: "฿ per month by season, and per year: {low} low-season + {high} high-season months",
    tables: "Tables",
    perLow: "Low season", perHigh: "High season", perYear: "Per year",

    includedH: "Base package — included in the monthly fee",
    included: [
      "A device on every table with phone charging",
      "Interactive menu with photos and dish descriptions",
      "Menu in several languages",
      "Chef's picks, specials and seasonal dishes",
      "Call a waiter and ask for the bill",
      "Updates and technical support"
    ],

    addonsH: "Add-on modules", addonsUnit: "for either plan, ฿",
    addonsCol: "Module", addonsSetup: "Setup", addonsMonthly: "Per month",
    addonsNote: "Setup is one-time, when you add a module — at the start or later. A module's monthly fee is added to the monthly bill and does not depend on the season or plan. Modules take extra time to set up, depending on the module and your POS.",

    setupTerm: "Base package setup — {setup} one-time, at contract signing: installation, menu upload, staff training.",

    termsH: "Setup and terms",
    terms: [
      "Seasons: high is November–March ({high} months), low is April–October ({low} months).",
      "Devices are rented, one per table. Warranty replacement is at JET MEDIA's expense.",
      "Contract from {minMonths} months; you can cancel within the first {cancelMonths} months. Monthly billing; prices in Thai baht."
    ],

    qr: "Calculate your restaurant and send a request on our website",
    contacts: { phone: "Tel.", line: "LINE", whatsapp: "WhatsApp", telegram: "Telegram", email: "E-mail" }
  },

  th: {
    title: "JET MEDIA — รายการราคา",
    back: "← กลับไปที่เว็บไซต์", print: "พิมพ์", pdf: "ดาวน์โหลด PDF",
    kicker: "รายการราคา",
    date: "ราคามีผลตั้งแต่ {date}",
    h1: "พนักงานเสิร์ฟดิจิทัลสำหรับร้านอาหาร",
    lead: "แท็บเล็ตบนทุกโต๊ะ: เมนูพร้อมรูปภาพในภาษาของลูกค้า เมนูแนะนำจากเชฟและโปรโมชัน ปุ่มเรียกพนักงาน",

    monthlyH: "ค่าบริการรายเดือน", monthlyUnit: "฿ ต่อเดือน",
    stdSub: "มีโฆษณา JET MEDIA ไม่มีโฆษณาร้านคู่แข่ง",
    prmSub: "ไม่มีโฆษณาจากภายนอก",
    low: "โลว์ซีซัน", high: "ไฮซีซัน",
    lowMonths: "เมษายน–ตุลาคม", highMonths: "พฤศจิกายน–มีนาคม",
    platform: "ซอฟต์แวร์และการสนับสนุน", platformNote: "ต่อร้าน",
    device: "ค่าเช่าอุปกรณ์", deviceNote: "ต่อเครื่อง 1 เครื่องต่อโต๊ะ",
    formula: "ค่าบริการต่อเดือน = ซอฟต์แวร์และการสนับสนุน + ค่าเช่าอุปกรณ์ × จำนวนโต๊ะ",

    examplesH: "ตัวอย่างการคำนวณ", examplesUnit: "฿ ต่อเดือนตามฤดูกาล และต่อปี: โลว์ซีซัน {low} เดือน + ไฮซีซัน {high} เดือน",
    tables: "จำนวนโต๊ะ",
    perLow: "โลว์ซีซัน", perHigh: "ไฮซีซัน", perYear: "ต่อปี",

    includedH: "แพ็กเกจพื้นฐาน — รวมอยู่ในค่าบริการรายเดือน",
    included: [
      "อุปกรณ์บนทุกโต๊ะ พร้อมที่ชาร์จโทรศัพท์",
      "เมนูอินเทอร์แอกทีฟพร้อมรูปภาพและคำอธิบายอาหาร",
      "เมนูหลายภาษา",
      "เมนูแนะนำจากเชฟ โปรโมชัน และเมนูตามฤดูกาล",
      "เรียกพนักงานและขอเช็กบิล",
      "อัปเดตและการสนับสนุนทางเทคนิค"
    ],

    addonsH: "โมดูลเสริม", addonsUnit: "เพิ่มได้กับทุกแพ็กเกจ ฿",
    addonsCol: "โมดูล", addonsSetup: "ค่าตั้งค่า", addonsMonthly: "ต่อเดือน",
    addonsNote: "ค่าตั้งค่าชำระครั้งเดียวเมื่อเพิ่มโมดูล จะเพิ่มตั้งแต่เริ่มหรือภายหลังก็ได้ ค่าบริการรายเดือนของโมดูลบวกเพิ่มในค่าบริการรายเดือน และไม่ขึ้นกับฤดูกาลหรือแพ็กเกจ การตั้งค่าโมดูลต้องใช้เวลาเพิ่ม ขึ้นกับโมดูลและระบบ POS ของร้าน",

    setupTerm: "ติดตั้งแพ็กเกจพื้นฐาน {setup} ครั้งเดียว ชำระเมื่อเซ็นสัญญา: ติดตั้ง อัปโหลดเมนู อบรมพนักงาน",

    termsH: "การติดตั้งและเงื่อนไข",
    terms: [
      "ฤดูกาล: ไฮซีซัน พฤศจิกายน–มีนาคม ({high} เดือน) โลว์ซีซัน เมษายน–ตุลาคม ({low} เดือน)",
      "อุปกรณ์เป็นแบบเช่า หนึ่งเครื่องต่อโต๊ะ การเปลี่ยนในระยะรับประกัน JET MEDIA รับผิดชอบค่าใช้จ่าย",
      "สัญญาขั้นต่ำ {minMonths} เดือน ยกเลิกได้ภายใน {cancelMonths} เดือนแรก ชำระรายเดือน ราคาเป็นเงินบาท"
    ],

    qr: "คำนวณสำหรับร้านของคุณและส่งคำขอได้บนเว็บไซต์",
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
const money = n => num(n) + "\u00a0" + CONFIG.currency;   // ฿ не отрывается от числа

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
  nf = new Intl.NumberFormat(LOCALES[lang], { maximumFractionDigits: 0 });
  const vars = {
    low: num(CONFIG.pricing.low.months), high: num(CONFIG.pricing.high.months),
    minMonths: num(CONFIG.contract.minMonths), cancelMonths: num(CONFIG.contract.cancelMonths)
  };

  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
  document.title = d.title;

  $$("[data-t]").forEach(el => {
    const val = d[el.dataset.t];
    if (typeof val === "string") el.textContent = tpl(val, vars);
  });

  // Дата — месяцем и годом на языке прайса (в тайском — буддийский год)
  const date = new Date(CONFIG.priceList.date + "T00:00:00");
  $("#priceDate").textContent = tpl(d.date, {
    date: new Intl.DateTimeFormat(LOCALES[lang], { day: "numeric", month: "long", year: "numeric" }).format(date)
  });

  // Основная таблица: софт и поддержка + аренда устройства, по сезонам и тарифам
  $$("[data-price]").forEach(td => {
    const { price, season, tier } = td.dataset;
    const val = price === "software" ? softwareFee(season, tier) : devicePrice(season, tier);
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

  // Списки
  const fill = (sel, items) => {
    $(sel).innerHTML = "";
    items.forEach(text => {
      const li = document.createElement("li");
      li.textContent = tpl(text, vars);
      $(sel).appendChild(li);
    });
  };
  fill("#included", d.included);
  fill("#terms", d.terms);

  // Первая строка условий — подключение, сумма выделена
  const setupLi = document.createElement("li");
  setupLi.className = "terms-setup";
  const [before, after] = tpl(d.setupTerm, vars).split("{setup}");
  const fee = document.createElement("b");
  fee.className = "num";
  fee.textContent = money(CONFIG.setupFee);
  setupLi.append(before, fee, after || "");
  $("#terms").prepend(setupLi);

  // Дополнительные модули: название и описание, настройка разово, абонплата в месяц
  const addons = CONFIG.addons || [];
  $("#addonsBlock").hidden = !addons.length;
  $("#addonsBody").innerHTML = "";
  addons.forEach(a => {
    const tr = document.createElement("tr");
    const name = document.createElement("th");
    name.scope = "row";
    name.textContent = addonText(a, "name", lang);
    const desc = document.createElement("small");
    desc.textContent = addonText(a, "desc", lang);
    name.appendChild(desc);
    const setup = document.createElement("td");
    setup.textContent = num(a.setup);
    const monthly = document.createElement("td");
    monthly.textContent = "+" + num(a.monthly);
    tr.append(name, setup, monthly);
    $("#addonsBody").appendChild(tr);
  });


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
