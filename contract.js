/* =================================================================
   JET MEDIA — contract.js
   Конструктор договора (contract.html): форма → договор на листах A4
   → PDF или печать.

   Откуда что берётся:
     • цены, модули, сроки и условия договора — CONFIG (config.js);
     • реквизиты JET MEDIA — CONFIG.company;
     • тексты формы и договора на трёх языках — словари ниже.

   Разделы файла:
     1. Словарь формы (RU / EN / TH)
     2. Текст договора (RU / EN / TH)
     3. Числа прописью и склонения
     4. Состояние формы и черновик
     5. Расчёт сумм
     6. Сборка договора и раскладка по листам
     7. Форма: подписи, итоги, пропуски
     8. PDF и печать
     9. Запуск
   ================================================================= */

const LOCALES = { ru: "ru-RU", en: "en-US", th: "th-TH" };
const DATE_LOCALES = { ru: "ru-RU", en: "en-GB", th: "th-TH" };   // в тайском — буддийский год
const STORE_KEY = "jm_contract_v1";

/* =================================================================
   1. СЛОВАРЬ ФОРМЫ
   ================================================================= */
const UI = {
  ru: {
    title: "JET MEDIA — договор",
    back: "← На сайт", print: "Печать", pdf: "Скачать PDF",
    heading: "Договор с рестораном",
    lead: "Заполните данные — договор обновляется сразу. Пустые поля останутся в договоре линиями, их можно заполнить от руки.",
    secContract: "Договор", fNumber: "Номер договора", fDate: "Дата договора",
    secTariff: "Тариф и оборудование", fTier: "Тариф", fTerm: "Срок договора",
    tierStd: "с рекламой сети JET MEDIA", tierPrm: "без сторонней рекламы",
    termUnit: "мес.", termCancel: "отказ — в первые {n} мес.",
    fDevices: "Устройств (столиков)", fStart: "Дата установки", fStartNote: "Можно оставить пустым",
    secAddons: "Дополнительные модули", addonPrice: "настройка {setup} · {monthly} в месяц",
    secClient: "Заказчик", tCompany: "Компания", tPerson: "Частное лицо / ИП",
    cName: "Название компании", cReg: "Регистрационный номер", cTax: "Налоговый номер",
    cTaxNote: "Если отличается от регистрационного", cAddr: "Юридический адрес",
    cRep: "Представитель (имя полностью)", cPos: "Должность", cBasis: "Действует на основании",
    pName: "Имя полностью", pId: "Паспорт или ID-карта, номер", pTax: "Налоговый номер", pTaxNote: "Если есть", pAddr: "Адрес",
    phone: "Телефон", email: "E-mail",
    secVenue: "Ресторан — где ставим устройства", vName: "Название ресторана", vAddr: "Адрес ресторана",
    secProvider: "Исполнитель", fSigner: "Подписывает от JET MEDIA",
    sumTitle: "Итого по договору", sumLow: "В месяц, низкий сезон", sumHigh: "В месяц, высокий сезон",
    sumOnce: "Разово при подключении", sumYear: "Ориентировочно за год",
    missing: "Не заполнено: {list}. В договоре на этих местах будут линии.",
    draftNote: "Черновик хранится только в этом браузере.", reset: "Очистить форму",
    resetConfirm: "Очистить все поля договора?",
    busy: "Готовлю PDF… лист {n} из {total}",
    pdfError: "Не получилось собрать PDF в этом браузере. Сейчас откроется печать — выберите в ней «Сохранить как PDF».",
    ph: { cName: "Sunset Beach Co., Ltd.", cReg: "0835560000000", cAddr: "12/3 Moo 4, Rawai, Mueang Phuket, Phuket 83130",
          cRep: "Somchai Jaidee", cPos: "директор", cBasis: "аффидевита компании (หนังสือรับรอง)",
          pName: "Ivan Petrov", pId: "AB1234567", pAddr: "…", vName: "Sunset Beach Cafe", vAddr: "…",
          phone: "+66 …", email: "name@example.com" }
  },
  en: {
    title: "JET MEDIA — agreement",
    back: "← Back to site", print: "Print", pdf: "Download PDF",
    heading: "Agreement with a restaurant",
    lead: "Fill in the details and the agreement updates at once. Empty fields stay as lines in the agreement, to be filled in by hand.",
    secContract: "Agreement", fNumber: "Agreement No.", fDate: "Agreement date",
    secTariff: "Plan and devices", fTier: "Plan", fTerm: "Term",
    tierStd: "with JET MEDIA network ads", tierPrm: "no third-party ads",
    termUnit: "mo.", termCancel: "cancel within first {n} mo.",
    fDevices: "Devices (tables)", fStart: "Installation date", fStartNote: "May be left empty",
    secAddons: "Add-on modules", addonPrice: "setup {setup} · {monthly} per month",
    secClient: "Client", tCompany: "Company", tPerson: "Individual",
    cName: "Company name", cReg: "Registration No.", cTax: "Tax ID",
    cTaxNote: "If different from the registration No.", cAddr: "Registered address",
    cRep: "Representative (full name)", cPos: "Position", cBasis: "Acting under",
    pName: "Full name", pId: "Passport or ID card No.", pTax: "Tax ID", pTaxNote: "If any", pAddr: "Address",
    phone: "Phone", email: "E-mail",
    secVenue: "Restaurant — where the devices go", vName: "Restaurant name", vAddr: "Restaurant address",
    secProvider: "Provider", fSigner: "Signs for JET MEDIA",
    sumTitle: "Agreement totals", sumLow: "Per month, low season", sumHigh: "Per month, high season",
    sumOnce: "One-time on connection", sumYear: "Estimated per year",
    missing: "Not filled in: {list}. These places will be blank lines in the agreement.",
    draftNote: "The draft is stored in this browser only.", reset: "Clear the form",
    resetConfirm: "Clear all agreement fields?",
    busy: "Preparing PDF… page {n} of {total}",
    pdfError: "This browser could not build the PDF. The print dialog will open — choose “Save as PDF” there.",
    ph: { cName: "Sunset Beach Co., Ltd.", cReg: "0835560000000", cAddr: "12/3 Moo 4, Rawai, Mueang Phuket, Phuket 83130",
          cRep: "Somchai Jaidee", cPos: "Director", cBasis: "the Company Affidavit",
          pName: "John Smith", pId: "AB1234567", pAddr: "…", vName: "Sunset Beach Cafe", vAddr: "…",
          phone: "+66 …", email: "name@example.com" }
  },
  th: {
    title: "JET MEDIA — สัญญา",
    back: "← กลับไปที่เว็บไซต์", print: "พิมพ์", pdf: "ดาวน์โหลด PDF",
    heading: "สัญญากับร้านอาหาร",
    lead: "กรอกข้อมูลแล้วสัญญาจะอัปเดตทันที ช่องที่ว่างจะเป็นเส้นในสัญญาให้เขียนด้วยมือ",
    secContract: "สัญญา", fNumber: "เลขที่สัญญา", fDate: "วันที่ทำสัญญา",
    secTariff: "แพ็กเกจและอุปกรณ์", fTier: "แพ็กเกจ", fTerm: "ระยะเวลาสัญญา",
    tierStd: "มีโฆษณาเครือข่าย JET MEDIA", tierPrm: "ไม่มีโฆษณาจากภายนอก",
    termUnit: "เดือน", termCancel: "ยกเลิกได้ใน {n} เดือนแรก",
    fDevices: "จำนวนอุปกรณ์ (โต๊ะ)", fStart: "วันที่ติดตั้ง", fStartNote: "เว้นว่างได้",
    secAddons: "โมดูลเสริม", addonPrice: "ค่าตั้งค่า {setup} · {monthly} ต่อเดือน",
    secClient: "ผู้รับบริการ", tCompany: "นิติบุคคล", tPerson: "บุคคลธรรมดา",
    cName: "ชื่อบริษัท", cReg: "ทะเบียนนิติบุคคลเลขที่", cTax: "เลขประจำตัวผู้เสียภาษี",
    cTaxNote: "หากต่างจากเลขทะเบียน", cAddr: "ที่ตั้งสำนักงาน",
    cRep: "ผู้แทน (ชื่อ-นามสกุล)", cPos: "ตำแหน่ง", cBasis: "มีอำนาจตาม",
    pName: "ชื่อ-นามสกุล", pId: "เลขบัตรประชาชนหรือหนังสือเดินทาง", pTax: "เลขประจำตัวผู้เสียภาษี", pTaxNote: "ถ้ามี", pAddr: "ที่อยู่",
    phone: "โทรศัพท์", email: "อีเมล",
    secVenue: "ร้านอาหาร — สถานที่ติดตั้ง", vName: "ชื่อร้านอาหาร", vAddr: "ที่อยู่ร้านอาหาร",
    secProvider: "ผู้ให้บริการ", fSigner: "ผู้ลงนามฝ่าย JET MEDIA",
    sumTitle: "สรุปค่าบริการ", sumLow: "ต่อเดือน โลว์ซีซัน", sumHigh: "ต่อเดือน ไฮซีซัน",
    sumOnce: "ครั้งเดียวเมื่อเริ่มใช้", sumYear: "ประมาณการต่อปี",
    missing: "ยังไม่ได้กรอก: {list} ในสัญญาจะเป็นเส้นว่าง",
    draftNote: "ร่างสัญญาเก็บไว้ในเบราว์เซอร์นี้เท่านั้น", reset: "ล้างแบบฟอร์ม",
    resetConfirm: "ล้างข้อมูลสัญญาทั้งหมดหรือไม่",
    busy: "กำลังสร้าง PDF… หน้า {n} จาก {total}",
    pdfError: "เบราว์เซอร์นี้สร้าง PDF ไม่ได้ ระบบจะเปิดหน้าต่างพิมพ์ ให้เลือก “บันทึกเป็น PDF”",
    ph: { cName: "บริษัท ซันเซ็ท บีช จำกัด", cReg: "0835560000000", cAddr: "12/3 หมู่ 4 ตำบลราไวย์ อำเภอเมืองภูเก็ต จังหวัดภูเก็ต 83130",
          cRep: "นายสมชาย ใจดี", cPos: "กรรมการผู้มีอำนาจลงนาม", cBasis: "หนังสือรับรองบริษัท",
          pName: "นายสมชาย ใจดี", pId: "1234567890123", pAddr: "…", vName: "Sunset Beach Cafe", vAddr: "…",
          phone: "+66 …", email: "name@example.com" }
  }
};

/* =================================================================
   2. ТЕКСТ ДОГОВОРА
   Пункты нумеруются автоматически: 1.1, 1.2… Порядок разделов и
   пунктов одинаковый во всех языках — ссылки «п. 2.2» не сбиваются.
   {…} — подстановки: реквизиты, цены и условия из CONFIG и формы.
   ================================================================= */
const TEXT = {

  /* ---------------- Русский ---------------- */
  ru: {
    title: "ДОГОВОР № {num}",
    subtitle: "на оказание услуг и аренду оборудования JET MEDIA",
    place: "г. {city}, Таиланд",
    preCompany: "{provName}, регистрационный номер {provReg}, адрес: {provAddr}, работающая под торговой маркой JET MEDIA, в лице уполномоченного директора {signer}, именуемая в дальнейшем «Исполнитель», с одной стороны, и {cName}, регистрационный номер {cReg}{cTaxPart}, адрес: {cAddr}, в лице представителя — {cPos} {cRep}, действующего на основании {cBasis}, именуемая в дальнейшем «Заказчик», с другой стороны, вместе именуемые «Стороны», заключили настоящий договор (далее — «Договор») о нижеследующем.",
    prePerson: "{provName}, регистрационный номер {provReg}, адрес: {provAddr}, работающая под торговой маркой JET MEDIA, в лице уполномоченного директора {signer}, именуемая в дальнейшем «Исполнитель», с одной стороны, и {pName}, паспорт или ID-карта № {pId}{pTaxPart}, адрес: {pAddr}, именуемый(ая) в дальнейшем «Заказчик», с другой стороны, вместе именуемые «Стороны», заключили настоящий договор (далее — «Договор») о нижеследующем.",
    taxPart: ", налоговый номер {tax}",
    sections: [
      ["Предмет договора", [
        "Исполнитель передаёт Заказчику во временное пользование планшеты для столов ресторана с зарядкой для телефона (далее — «Устройства») и оказывает услуги по предоставлению программного обеспечения JET MEDIA и его поддержке (далее — «Услуги»), а Заказчик принимает Устройства и Услуги и оплачивает их на условиях Договора.",
        "Место установки: {vName}, {vAddr} (далее — «Ресторан»). Количество Устройств — {devices}, по одному на столик. Количество можно изменить по соглашению Сторон, подписав новую Спецификацию.",
        "Базовый пакет Услуг включает: интерактивное меню с фото и описанием блюд; меню на нескольких языках; рекомендации шеф-повара, акции и сезонные новинки; вызов официанта и запрос счёта; обновления программного обеспечения и техническую поддержку.",
        "Дополнительные модули оплачиваются отдельно и подключаются по выбору Заказчика. Выбранные модули указаны в Спецификации (Приложение № 1). Подключить или отключить модуль можно в течение срока Договора по письменной заявке Заказчика; отключение действует с первого числа следующего месяца.",
        "Тариф — {tier}. {adsTier}"
      ]],
      ["Срок договора", [
        "Договор заключён на {termW}. Срок исчисляется с даты установки Устройств{startPart}.",
        "В течение первых {cancelMonths} месяцев с даты установки Заказчик вправе отказаться от Договора, письменно уведомив Исполнителя. В этом случае Заказчик оплачивает Услуги и аренду Устройств до даты их возврата; плата за подключение не возвращается; иные штрафы и компенсации не взимаются.",
        "Если ни одна из Сторон письменно не заявит о прекращении Договора не позднее чем за {noticeW} до окончания срока, Договор продлевается на {renewW} на тех же условиях. Количество продлений не ограничено.",
        "При отказе Заказчика от Договора после периода, указанного в п. 2.2, и до окончания срока Договора (кроме случаев нарушения Договора Исполнителем) Заказчик выплачивает Исполнителю компенсацию в размере {exitFee} средних ежемесячных платежей по Спецификации, но не более суммы платежей, оставшихся до окончания срока.",
        "Исполнитель вправе отказаться от Договора, письменно уведомив Заказчика, если Заказчик задерживает оплату более чем на {terminateW} или нарушает правила обращения с Устройствами (раздел 5)."
      ]],
      ["Стоимость и порядок расчётов", [
        "Цены Услуг, аренды Устройств и дополнительных модулей указаны в Спецификации (Приложение № 1) в тайских батах и включают НДС {vat}%.",
        "Ежемесячная плата состоит из платы за софт и поддержку, платы за аренду каждого Устройства и абонентской платы подключённых дополнительных модулей. Плата за софт и поддержку и за аренду Устройств зависит от сезона: высокий сезон — ноябрь–март, низкий сезон — апрель–октябрь.",
        "Плата за подключение базового пакета — {setupWords} — вносится при подписании Договора. Плата за настройку дополнительного модуля вносится при его подключении.",
        "Ежемесячная плата вносится авансом до {payDay}-го числа оплачиваемого месяца на основании счёта Исполнителя банковским переводом на счёт Исполнителя, указанный в реквизитах Договора или в счёте. За неполный первый месяц плата начисляется пропорционально числу дней с даты установки.",
        "Цены по Спецификации не меняются в течение срока, указанного в п. 2.1. При продлении Договора Исполнитель вправе изменить цены, письменно уведомив Заказчика не позднее чем за {noticeW} до окончания срока.",
        "При задержке оплаты более чем на {suspendW} Исполнитель вправе приостановить Услуги до погашения задолженности, предварительно уведомив Заказчика. Приостановка не освобождает Заказчика от внесения платы.",
        "Исполнитель выставляет налоговые счета-фактуры (tax invoice) в соответствии с законодательством Таиланда."
      ]],
      ["Установка и настройка", [
        "Исполнитель устанавливает Устройства, загружает меню и обучает персонал Заказчика в течение {launchDays} рабочих дней после подписания Договора, получения платы за подключение и материалов, указанных в п. 6.2.",
        "Дата установки фиксируется актом установки или письменным сообщением Сторон, в том числе по электронной почте или в мессенджере.",
        "Дополнительные модули настраиваются после запуска базового пакета. Сроки настройки зависят от модуля и систем Заказчика (например, кассовой) и согласуются Сторонами письменно."
      ]],
      ["Устройства", [
        "Устройства остаются собственностью Исполнителя и передаются Заказчику во временное пользование на срок Договора. Заказчик не вправе продавать Устройства, передавать их в залог или в пользование третьим лицам, вывозить из Ресторана, вскрывать и изменять их программное обеспечение.",
        "Заказчик обеспечивает сохранность Устройств, их зарядку, подключение к сети Wi-Fi Ресторана и бережное обращение с ними персонала и гостей.",
        "Неисправность, возникшая не по вине Заказчика, устраняется Исполнителем бесплатно: Устройство ремонтируется или заменяется не позднее чем через {repairW} после обращения Заказчика.",
        "При повреждении, утрате или хищении Устройства по вине Заказчика, его персонала или гостей Заказчик возмещает стоимость ремонта или стоимость Устройства {deviceValuePart}.",
        "Не позднее чем через {returnW} после прекращения Договора Заказчик обеспечивает Исполнителю доступ в Ресторан для демонтажа и возврата Устройств в исправном состоянии с учётом нормального износа."
      ]],
      ["Права и обязанности сторон", [
        { t: "Исполнитель обязуется:", sub: [
          "обеспечивать работу программного обеспечения и Устройств;",
          "бесплатно обновлять программное обеспечение;",
          "оказывать техническую поддержку и отвечать на обращения Заказчика в течение одного рабочего дня;",
          "по заявке Заказчика обновлять меню, акции и рекомендации на Устройствах в разумный срок."
        ]},
        { t: "Заказчик обязуется:", sub: [
          "своевременно вносить плату;",
          "предоставить меню, фотографии и описания блюд, цены и материалы акций и сообщать об их изменениях;",
          "обеспечить доступ в Ресторан для установки, обслуживания и демонтажа Устройств;",
          "сообщать о неисправностях Устройств в течение одного рабочего дня."
        ]},
        "Заказчик отвечает за достоверность цен и описаний блюд, информацию об аллергенах, а также за соответствие своих материалов законодательству Таиланда, в том числе ограничениям на рекламу алкогольных напитков.",
        "{adsDuty}"
      ]],
      ["Ответственность", [
        "Исполнитель не гарантирует конкретного роста выручки или среднего чека Заказчика: расчёты на сайте и в коммерческих предложениях являются оценкой.",
        "Совокупная ответственность Исполнителя по Договору ограничена суммой платежей Заказчика за последние {liabilityW}. Стороны не отвечают за упущенную выгоду и косвенные убытки.",
        "Исполнитель не отвечает за перебои, вызванные отсутствием интернета или электропитания в Ресторане, а также за работу кассовых и иных систем третьих лиц."
      ]],
      ["Конфиденциальность и персональные данные", [
        "Стороны не раскрывают третьим лицам условия Договора и коммерческую информацию друг друга, кроме случаев, предусмотренных законом.",
        "Персональные данные гостей Ресторана, которые обрабатываются при работе модулей (например, программы лояльности или сбора отзывов), обрабатываются в соответствии с Законом Таиланда о защите персональных данных B.E. 2562 (2019) (PDPA): Заказчик — контролёр данных, Исполнитель — обработчик, действующий по поручению Заказчика.",
        "Исполнитель вправе использовать обезличенную статистику работы Устройств для улучшения сервиса."
      ]],
      ["Форс-мажор", [
        "Стороны освобождаются от ответственности за неисполнение обязательств, вызванное обстоятельствами непреодолимой силы (стихийные бедствия, эпидемии, решения государственных органов, масштабные перебои в энергоснабжении и связи), на время действия этих обстоятельств. Сторона, для которой они наступили, уведомляет другую Сторону в разумный срок."
      ]],
      ["Уведомления, применимое право и споры", [
        "Уведомления об отказе от Договора, претензии и изменения Договора направляются письменно по адресам Сторон, указанным в Договоре, или по электронной почте. Рабочие вопросы Стороны решают по телефону, электронной почте и в мессенджерах.",
        "Договор регулируется законодательством Королевства Таиланд.",
        "Споры решаются путём переговоров, а если согласие не достигнуто в течение 30 дней, — в суде провинции Пхукет."
      ]],
      ["Заключительные положения", [
        "Договор вступает в силу с даты подписания Сторонами.",
        "Изменения и дополнения к Договору действительны, если они оформлены письменно и подписаны уполномоченными представителями Сторон.",
        "Договор составлен на русском языке в двух экземплярах, имеющих одинаковую юридическую силу, по одному для каждой Стороны.",
        "Приложение № 1 «Спецификация» является неотъемлемой частью Договора."
      ]]
    ],
    adsStd: "На экранах Устройств может показываться реклама партнёров сети JET MEDIA; реклама прямых конкурентов Заказчика (других ресторанов и кафе) не показывается.",
    adsPrm: "Сторонняя реклама на экранах Устройств не показывается: экраны используются только для меню, акций и рекомендаций Заказчика.",
    adsDutyStd: "Исполнитель вправе показывать на экранах Устройств рекламу партнёров сети JET MEDIA в объёме, не мешающем работе меню. Реклама прямых конкурентов Заказчика и реклама, запрещённая законодательством Таиланда, не показывается.",
    adsDutyPrm: "Исполнитель не показывает на экранах Устройств стороннюю рекламу.",
    startPart: ", ориентировочно — с {start}",
    deviceValueFixed: "— {value} за одно Устройство",
    deviceValueMarket: "по рыночной цене",
    letters: ["а", "б", "в", "г", "д", "е"],
    signH: "Реквизиты и подписи сторон",
    closing: "",
    sign: {
      prov: "Исполнитель", client: "Заказчик",
      reg: "Рег. и налоговый номер", regC: "Регистрационный номер", tax: "Налоговый номер", id: "Паспорт / ID",
      addr: "Адрес", bank: "Банк", account: "Счёт", accountName: "Получатель", phone: "Тел.", email: "E-mail",
      director: "Директор", signature: "Подпись", seal: "М. П."
    },
    witness: "",
    appTitle: "Приложение № 1<br>к Договору № {num} от {date}",
    specTitle: "СПЕЦИФИКАЦИЯ",
    spec: [
      "Ресторан: {vName}, {vAddr}. Количество Устройств: {devices}.",
      "Тариф: {tier} — {tierDesc}. Срок Договора: {termW} с даты установки Устройств{startPart}.",
      "Ежемесячная плата, THB, с НДС {vat}%:",
      "Разовые платежи, THB, с НДС {vat}%:",
      "Ориентировочная сумма ежемесячных платежей за год (7 месяцев низкого и 5 месяцев высокого сезона) — {yearMoney}, за весь срок Договора ({termW}) — {termMoney}. Разовые платежи в эти суммы не входят."
    ],
    tierDescStd: "с рекламой сети JET MEDIA, без рекламы конкурентов",
    tierDescPrm: "без сторонней рекламы",
    cols: { item: "Позиция", low: "Низкий сезон<br><small>апрель–октябрь</small>", high: "Высокий сезон<br><small>ноябрь–март</small>", sum: "Сумма", when: "Когда оплачивается" },
    rowSoftware: "Софт и поддержка (тариф {tier})",
    rowDevices: "Аренда Устройств: {n} × {low} / {n} × {high}",
    rowModule: "Модуль «{name}»",
    rowTotal: "Итого в месяц",
    monthWords: "Итого в месяц: в низкий сезон — {low}, в высокий сезон — {high}.",
    rowSetup: "Подключение базового пакета", rowSetupWhen: "при подписании Договора",
    rowModuleSetup: "Настройка модуля «{name}»", rowModuleWhen: "при подключении модуля",
    rowOnceTotal: "Итого разовые платежи",
    onceWords: "Итого разовые платежи: {sum}.",
    head1: "{provLatin} · рег. номер {provReg}<br>{site}",
    headN: "Договор № {num} от {date}",
    foot: "Стр. {n} из {total}", initials: ["Исполнитель", "Заказчик"],
    months: n => ruPlural(n, "месяц", "месяца", "месяцев"),
    days: n => ruPlural(n, "день", "дня", "дней"),
    workDays: n => ruPlural(n, "рабочий день", "рабочих дня", "рабочих дней"),
    money: (n, fmt) => fmt(n) + " (" + ruWords(n) + ") THB"
  },

  /* ---------------- English ---------------- */
  en: {
    title: "AGREEMENT No. {num}",
    subtitle: "for the provision of services and rental of JET MEDIA equipment",
    place: "{city}, Thailand",
    preCompany: "{provName}, registration No. {provReg}, address: {provAddr}, operating under the JET MEDIA brand, represented by its authorised director {signer} (the “Provider”), on the one part, and {cName}, registration No. {cReg}{cTaxPart}, address: {cAddr}, represented by {cRep}, {cPos}, acting under {cBasis} (the “Client”), on the other part (together, the “Parties”), have entered into this agreement (the “Agreement”) as follows.",
    prePerson: "{provName}, registration No. {provReg}, address: {provAddr}, operating under the JET MEDIA brand, represented by its authorised director {signer} (the “Provider”), on the one part, and {pName}, passport or ID card No. {pId}{pTaxPart}, address: {pAddr} (the “Client”), on the other part (together, the “Parties”), have entered into this agreement (the “Agreement”) as follows.",
    taxPart: ", tax ID {tax}",
    sections: [
      ["Subject", [
        "The Provider rents to the Client tablets for restaurant tables with phone charging (the “Devices”) and provides access to the JET MEDIA software and its support (the “Services”); the Client accepts the Devices and the Services and pays for them under this Agreement.",
        "Place of installation: {vName}, {vAddr} (the “Restaurant”). Number of Devices: {devices}, one per table. The number may be changed by agreement of the Parties by signing a new Specification.",
        "The base package of Services includes: an interactive menu with photos and dish descriptions; a menu in several languages; chef's recommendations, specials and seasonal dishes; waiter call and bill request; software updates and technical support.",
        "Add-on modules are paid for separately and connected at the Client's choice. The selected modules are listed in the Specification (Appendix 1). A module may be connected or disconnected during the term at the Client's written request; disconnection takes effect from the first day of the following month.",
        "Plan: {tier}. {adsTier}"
      ]],
      ["Term", [
        "This Agreement is concluded for {termW}. The term runs from the date the Devices are installed{startPart}.",
        "Within the first {cancelMonths} months after installation the Client may terminate this Agreement by written notice to the Provider. In that case the Client pays for the Services and the Device rental up to the date the Devices are returned; the setup fee is not refunded; no other penalties or compensation apply.",
        "Unless either Party gives written notice of termination at least {noticeW} before the end of the term, this Agreement is extended for {renewW} on the same terms. The number of extensions is not limited.",
        "If the Client terminates this Agreement after the period in clause 2.2 and before the end of the term (except where the Provider is in breach), the Client pays the Provider compensation equal to {exitFee} average monthly payments under the Specification, but not more than the payments remaining until the end of the term.",
        "The Provider may terminate this Agreement by written notice if the Client is more than {terminateW} late with payment or breaches the rules for handling the Devices (section 5)."
      ]],
      ["Fees and payment", [
        "The fees for the Services, the Device rental and add-on modules are set out in the Specification (Appendix 1) in Thai baht and include {vat}% VAT.",
        "The monthly fee consists of the software and support fee, the rental fee for each Device and the monthly fees of connected add-on modules. The software and support fee and the Device rental depend on the season: high season is November–March, low season is April–October.",
        "The base package setup fee of {setupWords} is paid on signing this Agreement. The setup fee of an add-on module is paid when the module is connected.",
        "The monthly fee is paid in advance by the {payDayTh} day of the month being paid for, against the Provider's invoice, by bank transfer to the Provider's account stated in this Agreement or in the invoice. For an incomplete first month the fee is charged pro rata to the days from installation.",
        "The prices in the Specification do not change during the term in clause 2.1. On extension, the Provider may change the prices by written notice at least {noticeW} before the end of the term.",
        "If payment is more than {suspendW} late, the Provider may suspend the Services until the debt is paid, after notifying the Client. Suspension does not release the Client from paying the fees.",
        "The Provider issues tax invoices in accordance with Thai law."
      ]],
      ["Installation and setup", [
        "The Provider installs the Devices, uploads the menu and trains the Client's staff within {launchDays} business days after this Agreement is signed and the setup fee and the materials under clause 6.2 are received.",
        "The installation date is recorded in an installation note or in written messages between the Parties, including e-mail or messengers.",
        "Add-on modules are set up after the base package is launched. Their setup time depends on the module and the Client's systems (for example, the POS) and is agreed by the Parties in writing."
      ]],
      ["Devices", [
        "The Devices remain the Provider's property and are provided to the Client for temporary use for the term of this Agreement. The Client may not sell, pledge or lend the Devices, remove them from the Restaurant, open them or modify their software.",
        "The Client keeps the Devices safe, charged and connected to the Restaurant's Wi-Fi, and ensures that staff and guests handle them with care.",
        "A fault not caused by the Client is fixed by the Provider free of charge: the Device is repaired or replaced within {repairW} of the Client's report.",
        "If a Device is damaged, lost or stolen through the fault of the Client, its staff or guests, the Client pays for the repair or the value of the Device {deviceValuePart}.",
        "Within {returnW} after this Agreement ends, the Client gives the Provider access to the Restaurant to dismantle and return the Devices in working order, allowing for normal wear and tear."
      ]],
      ["Obligations of the Parties", [
        { t: "The Provider shall:", sub: [
          "keep the software and the Devices working;",
          "update the software free of charge;",
          "provide technical support and respond to the Client's requests within one business day;",
          "update the menu, specials and recommendations on the Devices at the Client's request within a reasonable time."
        ]},
        { t: "The Client shall:", sub: [
          "pay the fees on time;",
          "provide the menu, dish photos and descriptions, prices and promotion materials, and report changes to them;",
          "give access to the Restaurant for installing, servicing and dismantling the Devices;",
          "report Device faults within one business day."
        ]},
        "The Client is responsible for the accuracy of prices and dish descriptions and for allergen information, and for the compliance of its materials with Thai law, including restrictions on the advertising of alcoholic beverages.",
        "{adsDuty}"
      ]],
      ["Liability", [
        "The Provider does not guarantee any specific increase in the Client's revenue or average check; estimates on the website and in offers are forecasts only.",
        "The Provider's total liability under this Agreement is limited to the amount paid by the Client for the last {liabilityW}. Neither Party is liable for lost profits or indirect losses.",
        "The Provider is not liable for interruptions caused by a lack of internet or power at the Restaurant, or for the operation of POS or other third-party systems."
      ]],
      ["Confidentiality and personal data", [
        "The Parties do not disclose the terms of this Agreement or each other's business information to third parties, except as required by law.",
        "Personal data of the Restaurant's guests processed by the modules (for example, loyalty or guest feedback) is processed in accordance with the Thai Personal Data Protection Act B.E. 2562 (2019) (PDPA): the Client is the data controller and the Provider is the data processor acting on the Client's instructions.",
        "The Provider may use anonymised Device usage statistics to improve the service."
      ]],
      ["Force majeure", [
        "The Parties are released from liability for failure to perform caused by force majeure (natural disasters, epidemics, government decisions, large-scale power or communication outages) for as long as such circumstances last. The affected Party notifies the other Party within a reasonable time."
      ]],
      ["Notices, governing law and disputes", [
        "Notices of termination, claims and amendments are sent in writing to the Parties' addresses stated in this Agreement or by e-mail. Day-to-day matters may be handled by phone, e-mail and messengers.",
        "This Agreement is governed by the laws of the Kingdom of Thailand.",
        "Disputes are settled by negotiation and, if no agreement is reached within 30 days, by the competent court in Phuket Province."
      ]],
      ["Final provisions", [
        "This Agreement enters into force on signing by the Parties.",
        "Amendments and additions are valid only if made in writing and signed by authorised representatives of the Parties.",
        "This Agreement is made in English in two copies of equal legal force, one for each Party.",
        "Appendix 1 “Specification” forms an integral part of this Agreement."
      ]]
    ],
    adsStd: "The Device screens may show advertising of JET MEDIA network partners; advertising of the Client's direct competitors (other restaurants and cafés) is not shown.",
    adsPrm: "No third-party advertising is shown on the Device screens: they are used only for the Client's menu, specials and recommendations.",
    adsDutyStd: "The Provider may show advertising of JET MEDIA network partners on the Device screens to an extent that does not interfere with the menu. Advertising of the Client's direct competitors and advertising prohibited by Thai law is not shown.",
    adsDutyPrm: "The Provider does not show third-party advertising on the Device screens.",
    startPart: ", expected on {start}",
    deviceValueFixed: "of {value} per Device",
    deviceValueMarket: "at market price",
    letters: ["a", "b", "c", "d", "e", "f"],
    signH: "Details and signatures of the Parties",
    closing: "",
    sign: {
      prov: "Provider", client: "Client",
      reg: "Registration / Tax ID", regC: "Registration No.", tax: "Tax ID", id: "Passport / ID",
      addr: "Address", bank: "Bank", account: "Account", accountName: "Account name", phone: "Phone", email: "E-mail",
      director: "Director", signature: "Signature", seal: "Company seal"
    },
    witness: "",
    appTitle: "Appendix 1<br>to Agreement No. {num} dated {date}",
    specTitle: "SPECIFICATION",
    spec: [
      "Restaurant: {vName}, {vAddr}. Number of Devices: {devices}.",
      "Plan: {tier} — {tierDesc}. Term: {termW} from the installation date{startPart}.",
      "Monthly fees, THB, incl. {vat}% VAT:",
      "One-time payments, THB, incl. {vat}% VAT:",
      "Estimated monthly payments per year (7 low-season and 5 high-season months): {yearMoney}; for the whole term ({termW}): {termMoney}. One-time payments are not included in these amounts."
    ],
    tierDescStd: "with JET MEDIA network ads, never competitors' ads",
    tierDescPrm: "no third-party ads",
    cols: { item: "Item", low: "Low season<br><small>April–October</small>", high: "High season<br><small>November–March</small>", sum: "Amount", when: "When payable" },
    rowSoftware: "Software and support ({tier} plan)",
    rowDevices: "Device rental: {n} × {low} / {n} × {high}",
    rowModule: "“{name}” module",
    rowTotal: "Total per month",
    monthWords: "Total per month: low season — {low}; high season — {high}.",
    rowSetup: "Base package setup", rowSetupWhen: "on signing the Agreement",
    rowModuleSetup: "“{name}” module setup", rowModuleWhen: "when the module is connected",
    rowOnceTotal: "Total one-time payments",
    onceWords: "Total one-time payments: {sum}.",
    head1: "{provLatin} · Reg. No. {provReg}<br>{site}",
    headN: "Agreement No. {num} dated {date}",
    foot: "Page {n} of {total}", initials: ["Provider", "Client"],
    months: n => n + (n === 1 ? " month" : " months"),
    days: n => n + (n === 1 ? " day" : " days"),
    workDays: n => n + (n === 1 ? " business day" : " business days"),
    money: (n, fmt) => fmt(n) + " (" + enWords(n) + ") THB"
  },

  /* ---------------- ภาษาไทย ---------------- */
  th: {
    title: "สัญญาให้บริการและเช่าอุปกรณ์ JET MEDIA",
    subtitle: "เลขที่ {num}",
    place: "ทำที่ จังหวัด{city}",
    preCompany: "สัญญาฉบับนี้ทำขึ้นระหว่าง {provName} ทะเบียนนิติบุคคลเลขที่ {provReg} สำนักงานใหญ่ตั้งอยู่ {provAddr} ดำเนินธุรกิจภายใต้เครื่องหมายการค้า JET MEDIA โดย {signer} กรรมการผู้มีอำนาจลงนาม ซึ่งต่อไปในสัญญานี้เรียกว่า “ผู้ให้บริการ” ฝ่ายหนึ่ง กับ {cName} ทะเบียนนิติบุคคลเลขที่ {cReg}{cTaxPart} สำนักงานตั้งอยู่ {cAddr} โดย {cRep} ตำแหน่ง {cPos} ผู้มีอำนาจกระทำการแทนตาม{cBasis} ซึ่งต่อไปในสัญญานี้เรียกว่า “ผู้รับบริการ” อีกฝ่ายหนึ่ง ทั้งสองฝ่ายตกลงทำสัญญากันดังมีข้อความต่อไปนี้",
    prePerson: "สัญญาฉบับนี้ทำขึ้นระหว่าง {provName} ทะเบียนนิติบุคคลเลขที่ {provReg} สำนักงานใหญ่ตั้งอยู่ {provAddr} ดำเนินธุรกิจภายใต้เครื่องหมายการค้า JET MEDIA โดย {signer} กรรมการผู้มีอำนาจลงนาม ซึ่งต่อไปในสัญญานี้เรียกว่า “ผู้ให้บริการ” ฝ่ายหนึ่ง กับ {pName} ผู้ถือบัตรประจำตัวหรือหนังสือเดินทางเลขที่ {pId}{pTaxPart} ที่อยู่ {pAddr} ซึ่งต่อไปในสัญญานี้เรียกว่า “ผู้รับบริการ” อีกฝ่ายหนึ่ง ทั้งสองฝ่ายตกลงทำสัญญากันดังมีข้อความต่อไปนี้",
    taxPart: " เลขประจำตัวผู้เสียภาษีอากร {tax}",
    sections: [
      ["วัตถุประสงค์ของสัญญา", [
        "ผู้ให้บริการตกลงให้ผู้รับบริการเช่าแท็บเล็ตสำหรับวางบนโต๊ะอาหารพร้อมที่ชาร์จโทรศัพท์ (ต่อไปเรียกว่า “อุปกรณ์”) และให้บริการซอฟต์แวร์ JET MEDIA พร้อมการสนับสนุน (ต่อไปเรียกว่า “บริการ”) และผู้รับบริการตกลงรับอุปกรณ์และบริการ และชำระค่าบริการตามเงื่อนไขของสัญญานี้",
        "สถานที่ติดตั้ง: {vName} {vAddr} (ต่อไปเรียกว่า “ร้านอาหาร”) จำนวนอุปกรณ์ {devices} เครื่อง โต๊ะละหนึ่งเครื่อง จำนวนอุปกรณ์เปลี่ยนแปลงได้ตามที่คู่สัญญาตกลงกัน โดยลงนามในรายละเอียดบริการฉบับใหม่",
        "แพ็กเกจพื้นฐานประกอบด้วย เมนูอินเทอร์แอกทีฟพร้อมรูปภาพและคำอธิบายอาหาร เมนูหลายภาษา เมนูแนะนำจากเชฟ โปรโมชัน และเมนูตามฤดูกาล การเรียกพนักงานและขอเช็กบิล การอัปเดตซอฟต์แวร์และการสนับสนุนทางเทคนิค",
        "โมดูลเสริมคิดค่าบริการแยกต่างหาก และเปิดใช้ตามที่ผู้รับบริการเลือก โมดูลที่เลือกระบุไว้ในรายละเอียดบริการ (ภาคผนวก 1) ผู้รับบริการขอเปิดหรือยกเลิกโมดูลได้ระหว่างอายุสัญญาโดยแจ้งเป็นลายลักษณ์อักษร การยกเลิกมีผลตั้งแต่วันที่ 1 ของเดือนถัดไป",
        "แพ็กเกจ {tier} {adsTier}"
      ]],
      ["ระยะเวลาของสัญญา", [
        "สัญญานี้มีกำหนดระยะเวลา {termW} นับแต่วันที่ติดตั้งอุปกรณ์{startPart}",
        "ภายใน {cancelMonths} เดือนแรกนับแต่วันที่ติดตั้ง ผู้รับบริการมีสิทธิบอกเลิกสัญญาโดยแจ้งเป็นลายลักษณ์อักษรแก่ผู้ให้บริการ ในกรณีนี้ผู้รับบริการชำระค่าบริการและค่าเช่าอุปกรณ์จนถึงวันที่ส่งคืนอุปกรณ์ ค่าติดตั้งไม่สามารถขอคืนได้ และไม่มีค่าปรับหรือค่าชดเชยอื่นใด",
        "หากไม่มีคู่สัญญาฝ่ายใดแจ้งยกเลิกสัญญาเป็นลายลักษณ์อักษรล่วงหน้าไม่น้อยกว่า {noticeW} ก่อนครบกำหนด ให้สัญญานี้ขยายออกไปอีก {renewW} ภายใต้เงื่อนไขเดิม โดยไม่จำกัดจำนวนครั้ง",
        "หากผู้รับบริการบอกเลิกสัญญาหลังพ้นระยะเวลาตามข้อ 2.2 และก่อนครบกำหนดสัญญา (เว้นแต่ผู้ให้บริการเป็นฝ่ายผิดสัญญา) ผู้รับบริการต้องชำระค่าชดเชยแก่ผู้ให้บริการเท่ากับค่าบริการรายเดือนเฉลี่ยตามรายละเอียดบริการจำนวน {exitFee} เดือน แต่ไม่เกินค่าบริการที่เหลือจนครบกำหนดสัญญา",
        "ผู้ให้บริการมีสิทธิบอกเลิกสัญญาโดยแจ้งเป็นลายลักษณ์อักษร หากผู้รับบริการชำระเงินล่าช้าเกินกว่า {terminateW} หรือฝ่าฝืนข้อกำหนดเกี่ยวกับการใช้อุปกรณ์ตามหมวด 5"
      ]],
      ["ค่าบริการและการชำระเงิน", [
        "อัตราค่าบริการ ค่าเช่าอุปกรณ์ และค่าโมดูลเสริม ระบุไว้ในรายละเอียดบริการ (ภาคผนวก 1) เป็นเงินบาท และรวมภาษีมูลค่าเพิ่ม {vat}% แล้ว",
        "ค่าบริการรายเดือนประกอบด้วยค่าซอฟต์แวร์และการสนับสนุน ค่าเช่าอุปกรณ์แต่ละเครื่อง และค่าบริการรายเดือนของโมดูลเสริมที่เปิดใช้ ค่าซอฟต์แวร์และการสนับสนุนและค่าเช่าอุปกรณ์ขึ้นอยู่กับฤดูกาล: ไฮซีซัน เดือนพฤศจิกายน–มีนาคม โลว์ซีซัน เดือนเมษายน–ตุลาคม",
        "ค่าติดตั้งแพ็กเกจพื้นฐานจำนวน {setupWords} ชำระในวันลงนามในสัญญา ค่าตั้งค่าโมดูลเสริมชำระเมื่อเปิดใช้โมดูลนั้น",
        "ผู้รับบริการชำระค่าบริการรายเดือนล่วงหน้าภายในวันที่ {payDay} ของเดือนที่ใช้บริการ ตามใบแจ้งหนี้ของผู้ให้บริการ โดยโอนเงินเข้าบัญชีของผู้ให้บริการที่ระบุในสัญญาหรือในใบแจ้งหนี้ สำหรับเดือนแรกที่ไม่เต็มเดือน ค่าบริการคิดตามสัดส่วนจำนวนวันนับแต่วันที่ติดตั้ง",
        "อัตราค่าบริการตามรายละเอียดบริการไม่เปลี่ยนแปลงตลอดระยะเวลาตามข้อ 2.1 ในกรณีขยายสัญญา ผู้ให้บริการอาจปรับอัตราค่าบริการได้โดยแจ้งเป็นลายลักษณ์อักษรล่วงหน้าไม่น้อยกว่า {noticeW} ก่อนครบกำหนด",
        "หากผู้รับบริการชำระเงินล่าช้าเกินกว่า {suspendW} ผู้ให้บริการมีสิทธิระงับการให้บริการจนกว่าจะได้รับชำระ โดยแจ้งให้ผู้รับบริการทราบล่วงหน้า การระงับบริการไม่ทำให้ผู้รับบริการพ้นจากหน้าที่ชำระค่าบริการ",
        "ผู้ให้บริการออกใบกำกับภาษีตามกฎหมายไทย"
      ]],
      ["การติดตั้งและการตั้งค่า", [
        "ผู้ให้บริการติดตั้งอุปกรณ์ อัปโหลดเมนู และอบรมพนักงานของผู้รับบริการภายใน {launchDays} วันทำการ นับแต่วันลงนามในสัญญาและได้รับค่าติดตั้งและข้อมูลตามข้อ 6.2 ครบถ้วน",
        "วันที่ติดตั้งให้บันทึกไว้ในบันทึกการติดตั้ง หรือในการติดต่อเป็นลายลักษณ์อักษรระหว่างคู่สัญญา รวมถึงทางอีเมลหรือแอปพลิเคชันส่งข้อความ",
        "โมดูลเสริมจะตั้งค่าหลังจากเริ่มใช้แพ็กเกจพื้นฐานแล้ว ระยะเวลาการตั้งค่าขึ้นอยู่กับโมดูลและระบบของผู้รับบริการ (เช่น ระบบ POS) และให้คู่สัญญาตกลงกันเป็นลายลักษณ์อักษร"
      ]],
      ["อุปกรณ์", [
        "อุปกรณ์เป็นกรรมสิทธิ์ของผู้ให้บริการ และส่งมอบให้ผู้รับบริการใช้ตลอดอายุสัญญา ผู้รับบริการไม่มีสิทธิขาย จำนำ หรือให้บุคคลอื่นใช้อุปกรณ์ นำอุปกรณ์ออกนอกร้านอาหาร เปิดตัวเครื่อง หรือแก้ไขซอฟต์แวร์",
        "ผู้รับบริการต้องดูแลรักษาอุปกรณ์ ชาร์จแบตเตอรี่ เชื่อมต่อกับ Wi-Fi ของร้านอาหาร และดูแลให้พนักงานและลูกค้าใช้งานอุปกรณ์อย่างระมัดระวัง",
        "ความชำรุดบกพร่องที่มิได้เกิดจากความผิดของผู้รับบริการ ผู้ให้บริการจะซ่อมแซมหรือเปลี่ยนอุปกรณ์ให้โดยไม่คิดค่าใช้จ่ายภายใน {repairW} นับแต่ได้รับแจ้ง",
        "หากอุปกรณ์เสียหาย สูญหาย หรือถูกขโมยเนื่องจากความผิดของผู้รับบริการ พนักงาน หรือลูกค้าของผู้รับบริการ ผู้รับบริการต้องชดใช้ค่าซ่อมหรือมูลค่าอุปกรณ์{deviceValuePart}",
        "ภายใน {returnW} นับแต่สัญญาสิ้นสุด ผู้รับบริการต้องอำนวยความสะดวกให้ผู้ให้บริการเข้าไปในร้านอาหารเพื่อถอดและรับคืนอุปกรณ์ในสภาพใช้งานได้ ทั้งนี้ไม่รวมการเสื่อมสภาพตามการใช้งานปกติ"
      ]],
      ["สิทธิและหน้าที่ของคู่สัญญา", [
        { t: "ผู้ให้บริการมีหน้าที่", sub: [
          "ดูแลให้ซอฟต์แวร์และอุปกรณ์ทำงานได้ตามปกติ",
          "อัปเดตซอฟต์แวร์โดยไม่คิดค่าใช้จ่าย",
          "ให้การสนับสนุนทางเทคนิคและตอบกลับคำขอของผู้รับบริการภายในหนึ่งวันทำการ",
          "ปรับปรุงเมนู โปรโมชัน และเมนูแนะนำบนอุปกรณ์ตามคำขอของผู้รับบริการภายในระยะเวลาอันสมควร"
        ]},
        { t: "ผู้รับบริการมีหน้าที่", sub: [
          "ชำระค่าบริการตรงตามกำหนด",
          "จัดส่งเมนู รูปภาพและคำอธิบายอาหาร ราคา และข้อมูลโปรโมชัน รวมทั้งแจ้งการเปลี่ยนแปลง",
          "อำนวยความสะดวกในการเข้าร้านอาหารเพื่อติดตั้ง บำรุงรักษา และถอดอุปกรณ์",
          "แจ้งความชำรุดของอุปกรณ์ภายในหนึ่งวันทำการ"
        ]},
        "ผู้รับบริการรับผิดชอบต่อความถูกต้องของราคาและคำอธิบายอาหาร ข้อมูลสารก่อภูมิแพ้ และความถูกต้องตามกฎหมายไทยของข้อมูลที่จัดส่ง รวมถึงข้อจำกัดการโฆษณาเครื่องดื่มแอลกอฮอล์",
        "{adsDuty}"
      ]],
      ["ความรับผิด", [
        "ผู้ให้บริการไม่รับประกันการเพิ่มขึ้นของรายได้หรือยอดบิลเฉลี่ยของผู้รับบริการในจำนวนใดโดยเฉพาะ การคำนวณบนเว็บไซต์และในข้อเสนอทางการค้าเป็นเพียงการประมาณการ",
        "ความรับผิดทั้งหมดของผู้ให้บริการตามสัญญานี้จำกัดไม่เกินจำนวนเงินที่ผู้รับบริการชำระในช่วง {liabilityW}ล่าสุด คู่สัญญาไม่ต้องรับผิดต่อการสูญเสียกำไรหรือความเสียหายทางอ้อม",
        "ผู้ให้บริการไม่ต้องรับผิดต่อการหยุดชะงักที่เกิดจากการไม่มีอินเทอร์เน็ตหรือไฟฟ้าในร้านอาหาร หรือการทำงานของระบบ POS หรือระบบอื่นของบุคคลภายนอก"
      ]],
      ["การรักษาความลับและข้อมูลส่วนบุคคล", [
        "คู่สัญญาจะไม่เปิดเผยเงื่อนไขของสัญญานี้และข้อมูลทางธุรกิจของอีกฝ่ายต่อบุคคลภายนอก เว้นแต่กฎหมายกำหนด",
        "ข้อมูลส่วนบุคคลของลูกค้าร้านอาหารที่ประมวลผลผ่านโมดูล (เช่น โปรแกรมสะสมคะแนนหรือการเก็บรีวิว) จะได้รับการประมวลผลตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 โดยผู้รับบริการเป็นผู้ควบคุมข้อมูลส่วนบุคคล และผู้ให้บริการเป็นผู้ประมวลผลข้อมูลส่วนบุคคลตามคำสั่งของผู้รับบริการ",
        "ผู้ให้บริการมีสิทธิใช้สถิติการใช้งานอุปกรณ์ที่ไม่สามารถระบุตัวบุคคลได้เพื่อปรับปรุงบริการ"
      ]],
      ["เหตุสุดวิสัย", [
        "คู่สัญญาไม่ต้องรับผิดในการไม่ปฏิบัติตามสัญญาอันเนื่องมาจากเหตุสุดวิสัย เช่น ภัยธรรมชาติ โรคระบาด คำสั่งของหน่วยงานรัฐ ไฟฟ้าหรือการสื่อสารขัดข้องเป็นวงกว้าง ตลอดระยะเวลาที่เหตุนั้นยังคงอยู่ โดยฝ่ายที่ได้รับผลกระทบต้องแจ้งให้อีกฝ่ายทราบภายในระยะเวลาอันสมควร"
      ]],
      ["การแจ้ง กฎหมายที่ใช้บังคับ และการระงับข้อพิพาท", [
        "การแจ้งบอกเลิกสัญญา ข้อเรียกร้อง และการแก้ไขสัญญา ให้ทำเป็นลายลักษณ์อักษรส่งไปยังที่อยู่ของคู่สัญญาตามที่ระบุในสัญญานี้หรือทางอีเมล เรื่องการดำเนินงานทั่วไปติดต่อทางโทรศัพท์ อีเมล หรือแอปพลิเคชันส่งข้อความได้",
        "สัญญานี้อยู่ภายใต้บังคับของกฎหมายแห่งราชอาณาจักรไทย",
        "ข้อพิพาทให้ยุติโดยการเจรจา หากตกลงกันไม่ได้ภายใน 30 วัน ให้เสนอต่อศาลที่มีเขตอำนาจในจังหวัดภูเก็ต"
      ]],
      ["บทเบ็ดเตล็ด", [
        "สัญญานี้มีผลใช้บังคับนับแต่วันที่คู่สัญญาลงนาม",
        "การแก้ไขเพิ่มเติมสัญญาต้องทำเป็นลายลักษณ์อักษรและลงนามโดยผู้มีอำนาจของคู่สัญญา",
        "สัญญานี้ทำขึ้นเป็นภาษาไทยสองฉบับมีข้อความถูกต้องตรงกัน คู่สัญญาถือไว้ฝ่ายละหนึ่งฉบับ",
        "ภาคผนวก 1 “รายละเอียดบริการ” ถือเป็นส่วนหนึ่งของสัญญานี้"
      ]]
    ],
    adsStd: "หน้าจออุปกรณ์อาจแสดงโฆษณาของพันธมิตรในเครือข่าย JET MEDIA ทั้งนี้จะไม่แสดงโฆษณาของคู่แข่งโดยตรงของผู้รับบริการ (ร้านอาหารและคาเฟ่อื่น)",
    adsPrm: "หน้าจออุปกรณ์จะไม่แสดงโฆษณาจากบุคคลภายนอก และใช้สำหรับเมนู โปรโมชัน และเมนูแนะนำของผู้รับบริการเท่านั้น",
    adsDutyStd: "ผู้ให้บริการมีสิทธิแสดงโฆษณาของพันธมิตรในเครือข่าย JET MEDIA บนหน้าจออุปกรณ์ในระดับที่ไม่รบกวนการใช้งานเมนู โดยจะไม่แสดงโฆษณาของคู่แข่งโดยตรงของผู้รับบริการ และโฆษณาที่ขัดต่อกฎหมายไทย",
    adsDutyPrm: "ผู้ให้บริการจะไม่แสดงโฆษณาจากบุคคลภายนอกบนหน้าจออุปกรณ์",
    startPart: " ซึ่งคาดว่าจะเป็นวันที่ {start}",
    deviceValueFixed: " ในอัตราเครื่องละ {value}",
    deviceValueMarket: "ตามราคาตลาด",
    letters: ["ก", "ข", "ค", "ง", "จ", "ฉ"],
    signH: "รายละเอียดและลายมือชื่อคู่สัญญา",
    closing: "คู่สัญญาได้อ่านและเข้าใจข้อความในสัญญานี้โดยตลอดแล้ว เห็นว่าถูกต้องตรงตามเจตนา จึงได้ลงลายมือชื่อและประทับตรา (ถ้ามี) ไว้เป็นสำคัญต่อหน้าพยาน",
    sign: {
      prov: "ผู้ให้บริการ", client: "ผู้รับบริการ",
      reg: "ทะเบียนนิติบุคคล / เลขผู้เสียภาษี", regC: "ทะเบียนนิติบุคคลเลขที่", tax: "เลขประจำตัวผู้เสียภาษี", id: "บัตรประจำตัว / หนังสือเดินทาง",
      addr: "ที่อยู่", bank: "ธนาคาร", account: "เลขที่บัญชี", accountName: "ชื่อบัญชี", phone: "โทร", email: "อีเมล",
      director: "กรรมการผู้มีอำนาจลงนาม", signature: "ลงชื่อ", seal: "ประทับตราบริษัท"
    },
    witness: "ลงชื่อ ______________________ พยาน",
    appTitle: "ภาคผนวก 1<br>แนบท้ายสัญญาเลขที่ {num} ลงวันที่ {date}",
    specTitle: "รายละเอียดบริการ",
    spec: [
      "ร้านอาหาร: {vName} {vAddr} จำนวนอุปกรณ์ {devices} เครื่อง",
      "แพ็กเกจ: {tier} — {tierDesc} ระยะเวลาสัญญา {termW} นับแต่วันที่ติดตั้งอุปกรณ์{startPart}",
      "ค่าบริการรายเดือน (บาท รวม VAT {vat}%)",
      "ค่าใช้จ่ายครั้งเดียว (บาท รวม VAT {vat}%)",
      "ประมาณการค่าบริการรายเดือนต่อปี (โลว์ซีซัน 7 เดือน ไฮซีซัน 5 เดือน) {yearMoney} ตลอดอายุสัญญา ({termW}) {termMoney} ไม่รวมค่าใช้จ่ายครั้งเดียว"
    ],
    tierDescStd: "มีโฆษณาเครือข่าย JET MEDIA ไม่มีโฆษณาร้านคู่แข่ง",
    tierDescPrm: "ไม่มีโฆษณาจากภายนอก",
    cols: { item: "รายการ", low: "โลว์ซีซัน<br><small>เมษายน–ตุลาคม</small>", high: "ไฮซีซัน<br><small>พฤศจิกายน–มีนาคม</small>", sum: "จำนวนเงิน", when: "กำหนดชำระ" },
    rowSoftware: "ค่าซอฟต์แวร์และการสนับสนุน (แพ็กเกจ {tier})",
    rowDevices: "ค่าเช่าอุปกรณ์: {n} × {low} / {n} × {high}",
    rowModule: "โมดูล “{name}”",
    rowTotal: "รวมต่อเดือน",
    monthWords: "รวมต่อเดือน: โลว์ซีซัน {low} ไฮซีซัน {high}",
    rowSetup: "ค่าติดตั้งแพ็กเกจพื้นฐาน", rowSetupWhen: "วันลงนามในสัญญา",
    rowModuleSetup: "ค่าตั้งค่าโมดูล “{name}”", rowModuleWhen: "เมื่อเปิดใช้โมดูล",
    rowOnceTotal: "รวมค่าใช้จ่ายครั้งเดียว",
    onceWords: "รวมค่าใช้จ่ายครั้งเดียว {sum}",
    head1: "{provTh} · ทะเบียนเลขที่ {provReg}<br>{site}",
    headN: "สัญญาเลขที่ {num} ลงวันที่ {date}",
    foot: "หน้า {n} จาก {total}", initials: ["ผู้ให้บริการ", "ผู้รับบริการ"],
    months: n => n + " เดือน",
    days: n => n + " วัน",
    workDays: n => n + " วันทำการ",
    money: (n, fmt) => fmt(n) + " บาท (" + thWords(n) + "บาทถ้วน)"
  }
};

/* =================================================================
   3. ЧИСЛА ПРОПИСЬЮ И СКЛОНЕНИЯ
   ================================================================= */
function ruPlural(n, one, few, many){
  const n10 = n % 10, n100 = n % 100;
  const w = n10 === 1 && n100 !== 11 ? one : (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14) ? few : many);
  return n + " " + w;
}

function ruWords(n){
  if (!n) return "ноль";
  const ones  = ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"];
  const onesF = ["", "одна", "две", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"];
  const teens = ["десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"];
  const tens  = ["", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"];
  const hund  = ["", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"];
  const form = (x, a, b, c) => { const x10 = x % 10, x100 = x % 100; return x10 === 1 && x100 !== 11 ? a : (x10 >= 2 && x10 <= 4 && (x100 < 12 || x100 > 14) ? b : c); };
  const triad = (t, fem) => {
    const w = [hund[Math.floor(t / 100)]], r = t % 100;
    if (r >= 10 && r < 20) w.push(teens[r - 10]);
    else { w.push(tens[Math.floor(r / 10)]); w.push((fem ? onesF : ones)[r % 10]); }
    return w.filter(Boolean).join(" ");
  };
  const mil = Math.floor(n / 1e6), th = Math.floor(n / 1000) % 1000, rest = n % 1000, out = [];
  if (mil)  out.push(triad(mil, false) + " " + form(mil, "миллион", "миллиона", "миллионов"));
  if (th)   out.push(triad(th, true) + " " + form(th, "тысяча", "тысячи", "тысяч"));
  if (rest) out.push(triad(rest, false));
  return out.join(" ");
}

function enWords(n){
  if (!n) return "zero";
  const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve",
                "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  const small = t => {
    const w = [];
    if (t >= 100){ w.push(ones[Math.floor(t / 100)] + " hundred"); t %= 100; }
    if (t >= 20) w.push(tens[Math.floor(t / 10)] + (t % 10 ? "-" + ones[t % 10] : ""));
    else if (t) w.push(ones[t]);
    return w.join(" ");
  };
  const mil = Math.floor(n / 1e6), th = Math.floor(n / 1000) % 1000, rest = n % 1000, out = [];
  if (mil)  out.push(small(mil) + " million");
  if (th)   out.push(small(th) + " thousand");
  if (rest) out.push(small(rest));
  return out.join(" ");
}

/* Тайская запись суммы, как BAHTTEXT: 21 — ยี่สิบเอ็ด, 11 — สิบเอ็ด */
function thWords(n){
  if (!n) return "ศูนย์";
  const d = ["", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า"];
  const u = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน"];
  const under1m = x => {
    const s = String(x);
    let out = "";
    for (let i = 0; i < s.length; i++){
      const digit = +s[i], pos = s.length - i - 1;
      if (!digit) continue;
      if (pos === 1 && digit === 1) out += "สิบ";
      else if (pos === 1 && digit === 2) out += "ยี่สิบ";
      else if (pos === 0 && digit === 1 && s.length > 1) out += "เอ็ด";
      else out += d[digit] + u[pos];
    }
    return out;
  };
  const m = Math.floor(n / 1e6), r = n % 1e6;
  return (m ? thWords(m) + "ล้าน" : "") + (r ? under1m(r) : "");
}

const enOrdinal = n => n + (n % 100 >= 11 && n % 100 <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" }[n % 10] || "th"));

/* =================================================================
   4. СОСТОЯНИЕ ФОРМЫ И ЧЕРНОВИК
   ================================================================= */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const tpl = (str, vars) => String(str || "").replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
const esc = s => String(s).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

const pad = n => String(n).padStart(2, "0");
const isoToday = () => { const d = new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); };

function defaults(){
  const d = new Date();
  return {
    number: "JM-" + String(d.getFullYear()).slice(2) + pad(d.getMonth() + 1) + pad(d.getDate()) + "-01",
    date: isoToday(),
    tier: "standard",
    term: CONFIG.contract.terms[0],
    devices: CONFIG.sliders.tables.value,
    start: "",
    addons: [],
    clientType: "company",
    cName: "", cReg: "", cTax: "", cAddr: "", cRep: "", cPos: "", cBasis: "",
    pName: "", pId: "", pTax: "", pAddr: "",
    phone: "", email: "",
    vName: "", vAddr: "",
    signer: 0
  };
}

let state = defaults();
let lang = "ru";

function loadDraft(){
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
    if (saved && typeof saved === "object") state = Object.assign(defaults(), saved);
  } catch (e) { /* приватный режим — начинаем с чистого листа */ }
  // Значения из черновика могли устареть: модули и сроки берём только существующие
  const ids = CONFIG.addons.map(a => a.id);
  state.addons = (state.addons || []).filter(id => ids.includes(id));
  if (!CONFIG.contract.terms.includes(+state.term)) state.term = CONFIG.contract.terms[0];
  if (!CONFIG.company.directors[state.signer]) state.signer = 0;
}

let saveTimer = 0;
function saveDraft(){
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* не страшно */ }
  }, 300);
}

/* =================================================================
   5. РАСЧЁТ СУММ
   Та же логика, что в калькуляторе и прайсе: софт + устройства по
   сезонам (formulas в config.js), модули — одинаково круглый год.
   ================================================================= */
function totals(){
  const n = Math.max(0, Math.round(+state.devices || 0));
  const tier = state.tier === "premium" ? "premium" : "standard";
  const mods = CONFIG.addons.filter(a => state.addons.includes(a.id));
  const modMonthly = mods.reduce((s, a) => s + a.monthly, 0);
  const modSetup = mods.reduce((s, a) => s + a.setup, 0);
  const t = {
    n, tier, mods, modMonthly, modSetup,
    swLow: softwareFee("low", tier), swHigh: softwareFee("high", tier),
    devLowUnit: devicePrice("low", tier), devHighUnit: devicePrice("high", tier)
  };
  t.devLow = n * t.devLowUnit;
  t.devHigh = n * t.devHighUnit;
  t.low = t.swLow + t.devLow + modMonthly;
  t.high = t.swHigh + t.devHigh + modMonthly;
  t.year = t.low * CONFIG.pricing.low.months + t.high * CONFIG.pricing.high.months;
  t.termTotal = Math.round(t.year * (+state.term) / 12);
  t.once = CONFIG.setupFee + modSetup;
  return t;
}

/* =================================================================
   6. СБОРКА ДОГОВОРА И РАСКЛАДКА ПО ЛИСТАМ
   Договор — последовательность блоков (заголовки, пункты, таблицы,
   подписи). Блоки раскладываются по листам A4 по очереди: не влез —
   переносится на следующий лист вместе со своим заголовком.
   ================================================================= */
const docHost = () => $("#doc");

function fmtNum(n){ return new Intl.NumberFormat(LOCALES[lang], { maximumFractionDigits: 0 }).format(n); }
function fmtDate(iso){
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return "";
  return new Intl.DateTimeFormat(DATE_LOCALES[lang], { day: "numeric", month: "long", year: "numeric" }).format(d);
}

/* Значение из формы: подсвечено на экране; пустое — линия для ручного заполнения */
const val = (s, cls) => (String(s || "").trim() ? '<span class="v">' + esc(String(s).trim()) + "</span>" : '<span class="blank' + (cls ? " " + cls : "") + '"></span>');
const nb = s => '<span class="nb">' + esc(s) + "</span>";
const plainName = s => String(s).replace(/^(Miss|Mrs|Ms|Mr)\.?\s+/, "");

function buildVars(T, t){
  const co = CONFIG.company, k = CONFIG.contract;
  const dir = co.directors[state.signer] || co.directors[0];
  const U = UI[lang];
  const provName = lang === "th"
    ? nb(co.name.th) + " (" + esc(co.name.latin) + ")"
    : esc(co.name.latin) + " (" + nb(co.name.th) + ")";
  const signer = lang === "th" ? nb(dir.th) : lang === "ru" ? esc(plainName(dir.latin)) : esc(dir.latin);
  const money = n => T.money(n, fmtNum);
  const cTax = String(state.cTax || "").trim(), pTax = String(state.pTax || "").trim();
  const start = fmtDate(state.start);
  const v = {
    num: val(state.number), date: val(fmtDate(state.date)), city: esc(co.city[lang]),
    provName, provLatin: esc(co.name.latin), provTh: nb(co.name.th), provReg: esc(co.regNo), provAddr: esc(co.address[lang]),
    site: esc(CONFIG.priceList.site), signer,
    cName: val(state.cName), cReg: val(state.cReg), cAddr: val(state.cAddr), cRep: val(state.cRep),
    cPos: val(state.cPos || U.ph.cPos), cBasis: val(state.cBasis || U.ph.cBasis),
    cTaxPart: cTax ? tpl(T.taxPart, { tax: val(cTax) }) : "",
    pName: val(state.pName), pId: val(state.pId), pAddr: val(state.pAddr),
    pTaxPart: pTax ? tpl(T.taxPart, { tax: val(pTax) }) : "",
    vName: val(state.vName), vAddr: val(state.vAddr), devices: val(t.n ? fmtNum(t.n) : "", "short"),
    tier: '<span class="v">' + (t.tier === "premium" ? "Premium" : "Standard") + "</span>",
    tierDesc: t.tier === "premium" ? T.tierDescPrm : T.tierDescStd,
    termW: '<span class="v">' + esc(T.months(+state.term)) + "</span>",
    cancelMonths: k.cancelMonths, exitFee: k.exitFeeMonths,
    noticeW: T.days(k.noticeDays), renewW: T.months(k.renewMonths), terminateW: T.days(k.terminateDays),
    suspendW: T.days(k.suspendDays), repairW: T.workDays(k.repairDays), returnW: T.days(k.returnDays),
    liabilityW: T.months(k.liabilityMonths), payDay: k.payDay, payDayTh: enOrdinal(k.payDay),
    launchDays: esc(CONFIG.launchDays), vat: CONFIG.vat,
    setupWords: money(CONFIG.setupFee),
    startPart: start ? tpl(T.startPart, { start: '<span class="v">' + esc(start) + "</span>" }) : "",
    deviceValuePart: k.deviceValue ? tpl(T.deviceValueFixed, { value: money(k.deviceValue) }) : T.deviceValueMarket,
    yearMoney: money(t.year), termMoney: money(t.termTotal)
  };
  v.adsTier = t.tier === "premium" ? T.adsPrm : T.adsStd;
  v.adsDuty = t.tier === "premium" ? T.adsDutyPrm : T.adsDutyStd;
  return v;
}

function signHtml(T, v){
  const co = CONFIG.company, S = T.sign, b = co.bank || {};
  const dir = co.directors[state.signer] || co.directors[0];
  const line = (label, value) => "<p><span class=\"lbl\">" + label + ":</span> " + value + "</p>";
  const prov = [
    "<h4>" + S.prov + "</h4>",
    "<p><b>" + esc(co.name.latin) + "</b><br>" + nb(co.name.th) + "</p>",
    line(S.reg, esc(co.regNo)),
    line(S.addr, esc(co.address[lang])),
    b.name ? line(S.bank, esc(b.name + (b.branch ? ", " + b.branch : ""))) : "",
    b.account ? line(S.account, esc(b.account)) : "",
    b.accountName ? line(S.accountName, esc(b.accountName)) : "",
    co.phone ? line(S.phone, esc(co.phone)) : "",
    co.email ? line(S.email, esc(co.email)) : "",
    co.line ? line("LINE", esc(co.line)) : "",
    '<p class="sig">' + S.director + ' <span class="sig-line"></span></p>',
    "<p>( " + (lang === "th" ? nb(dir.th) : esc(dir.latin)) + " )</p>",
    '<p class="seal">' + S.seal + "</p>"
  ];
  const person = state.clientType === "person";
  const cTax = person ? state.pTax : state.cTax;
  const client = [
    "<h4>" + S.client + "</h4>",
    "<p><b>" + (person ? val(state.pName) : val(state.cName)) + "</b></p>",
    person ? line(S.id, val(state.pId)) : line(S.regC, val(state.cReg)),
    String(cTax || "").trim() ? line(S.tax, val(cTax)) : "",
    line(S.addr, person ? val(state.pAddr) : val(state.cAddr)),
    line(S.phone, val(state.phone)),
    line(S.email, val(state.email)),
    '<p class="sig">' + (person ? S.signature : (String(state.cPos || "").trim() ? esc(state.cPos.trim()) : S.director)) + ' <span class="sig-line"></span></p>',
    "<p>( " + (person ? val(state.pName) : val(state.cRep)) + " )</p>",
    person ? "" : '<p class="seal">' + S.seal + "</p>"
  ];
  return '<div class="d-sign"><div>' + prov.join("") + "</div><div>" + client.join("") + "</div></div>";
}

/* Блоки договора на выбранном языке */
function buildBlocks(){
  const T = TEXT[lang], t = totals(), v = buildVars(T, t);
  const B = [];
  // «2026 г.» в конце фразы: точка после «г.» не удваивается
  const tidy = html => (lang === "ru" ? html.replace(/г\.<\/span>\./g, "г.</span>") : html);
  const add = (cls, html, opts) => B.push(Object.assign({ cls, html: tidy(html) }, opts || {}));
  const money = n => fmtNum(n);

  add("d-title", tpl(T.title, v));
  add("d-subtitle", tpl(T.subtitle, v));
  add("d-place", "<span>" + tpl(T.place, v) + "</span><span>" + v.date + "</span>", { tag: "div" });
  add("d-p", tpl(state.clientType === "person" ? T.prePerson : T.preCompany, v));

  T.sections.forEach(([heading, items], si) => {
    add("d-h", (si + 1) + ". " + heading, { keepNext: true });
    items.forEach((it, ii) => {
      const n = (si + 1) + "." + (ii + 1) + ".";
      if (typeof it === "string"){
        add("d-cl", '<span class="n">' + n + "</span>" + tpl(it, v));
      } else {
        const sub = it.sub.map((s, j) => '<li><span class="n">' + T.letters[j] + ")</span>" + tpl(s, v) + "</li>").join("");
        add("d-cl", '<span class="n">' + n + "</span>" + tpl(it.t, v) + '<ul class="d-sub">' + sub + "</ul>", { tag: "div" });
      }
    });
  });

  // Реквизиты и подписи — одним блоком, чтобы не разрывались
  add("d-h", (T.sections.length + 1) + ". " + T.signH, { keepNext: true });
  if (T.closing) add("d-p", T.closing, { keepNext: true });
  add("d-signs", signHtml(T, v), { tag: "div" });
  if (T.witness) add("d-witness", "<p>" + T.witness + "</p><p>" + T.witness + "</p>", { tag: "div" });

  // Приложение № 1 — с нового листа
  B.push({ pageBreak: true });
  add("d-app-title", tpl(T.appTitle, v));
  add("d-title", T.specTitle);
  add("d-cl", '<span class="n">1.</span>' + tpl(T.spec[0], v));
  add("d-cl", '<span class="n">2.</span>' + tpl(T.spec[1], v));

  const TH = T.cols;
  const rows = [
    [tpl(T.rowSoftware, v), money(t.swLow), money(t.swHigh)],
    [tpl(T.rowDevices, { n: v.devices, low: money(t.devLowUnit), high: money(t.devHighUnit) }), money(t.devLow), money(t.devHigh)]
  ].concat(t.mods.map(a => [tpl(T.rowModule, { name: '<span class="v">' + esc(addonText(a, "name", lang)) + "</span>" }), money(a.monthly), money(a.monthly)]));
  const tr = (cells, cls) => "<tr" + (cls ? ' class="' + cls + '"' : "") + ">" + cells.map((c, i) => i ? '<td class="r">' + c + "</td>" : "<td>" + c + "</td>").join("") + "</tr>";
  const monthly = '<table class="d-table"><thead><tr><th>' + TH.item + '</th><th class="r">' + TH.low + '</th><th class="r">' + TH.high + "</th></tr></thead><tbody>" +
    rows.map(r => tr(r)).join("") + tr([T.rowTotal, money(t.low), money(t.high)], "total") + "</tbody></table>";
  add("d-cl", '<span class="n">3.</span>' + tpl(T.spec[2], v) + monthly +
    '<p class="d-note">' + tpl(T.monthWords, { low: T.money(t.low, fmtNum), high: T.money(t.high, fmtNum) }) + "</p>", { tag: "div" });

  const once = [[T.rowSetup, T.rowSetupWhen, money(CONFIG.setupFee)]]
    .concat(t.mods.map(a => [tpl(T.rowModuleSetup, { name: '<span class="v">' + esc(addonText(a, "name", lang)) + "</span>" }), T.rowModuleWhen, money(a.setup)]));
  const tr3 = (cells, cls) => "<tr" + (cls ? ' class="' + cls + '"' : "") + "><td>" + cells[0] + "</td><td>" + cells[1] + '</td><td class="r">' + cells[2] + "</td></tr>";
  const onceTable = '<table class="d-table"><thead><tr><th>' + TH.item + "</th><th>" + TH.when + '</th><th class="r">' + TH.sum + "</th></tr></thead><tbody>" +
    once.map(r => tr3(r)).join("") + tr3([T.rowOnceTotal, "", money(t.once)], "total") + "</tbody></table>";
  add("d-cl", '<span class="n">4.</span>' + tpl(T.spec[3], v) + onceTable +
    '<p class="d-note">' + tpl(T.onceWords, { sum: T.money(t.once, fmtNum) }) + "</p>", { tag: "div" });
  add("d-cl", '<span class="n">5.</span>' + tpl(T.spec[4], v));
  add("d-signs", signHtml(T, v), { tag: "div" });
  return { blocks: B, vars: v };
}

function makePage(first, T, v){
  const page = document.createElement("section");
  page.className = "page" + (first ? " page-first" : "");
  const head = document.createElement("header");
  head.className = "page-head";
  head.innerHTML = '<img src="logo-ink.png" alt="JET MEDIA" width="600" height="118">' +
    '<div class="ph-right">' + (first ? tpl(T.head1, v) : tpl(T.headN, v)) + "</div>";
  const body = document.createElement("div");
  body.className = "page-body";
  const foot = document.createElement("footer");
  foot.className = "page-foot";
  foot.innerHTML = '<div class="initials"><span>' + T.initials[0] + "</span><span>" + T.initials[1] + '</span></div><div class="pn"></div>';
  page.append(head, body, foot);
  return page;
}

function render(){
  const host = docHost();
  const T = TEXT[lang];
  const { blocks, vars } = buildBlocks();
  host.setAttribute("lang", lang);
  host.dataset.docLang = lang;
  host.innerHTML = "";

  let page = makePage(true, T, vars), body = page.querySelector(".page-body");
  host.appendChild(page);
  const overflows = () => body.scrollHeight > body.clientHeight + 1;
  const newPage = () => { page = makePage(false, T, vars); body = page.querySelector(".page-body"); host.appendChild(page); };

  blocks.forEach(b => {
    if (b.pageBreak){ if (body.children.length) newPage(); return; }
    const el = document.createElement(b.tag || "p");
    el.className = b.cls;
    if (b.keepNext) el.dataset.keepNext = "1";
    el.innerHTML = b.html;
    body.appendChild(el);
    if (overflows() && body.children.length > 1){
      // Не влез: переносим вместе с заголовком, который должен стоять рядом
      const moving = [body.removeChild(el)];
      while (body.lastElementChild && body.lastElementChild.dataset.keepNext && body.children.length > 1){
        moving.unshift(body.removeChild(body.lastElementChild));
      }
      newPage();
      moving.forEach(m => body.appendChild(m));
    }
  });

  const pages = $$(".page", host);
  pages.forEach((p, i) => { $(".pn", p).textContent = tpl(T.foot, { n: i + 1, total: pages.length }); });
  fitPreview();
}

/* На узком экране листы уменьшаются, чтобы помещались по ширине */
function fitPreview(){
  const host = docHost();
  const avail = host.parentElement.clientWidth;
  const pageW = 210 / 25.4 * 96;
  host.style.setProperty("--zoom", Math.min(1, avail / pageW).toFixed(3));
}

let renderTimer = 0;
function scheduleRender(){ clearTimeout(renderTimer); renderTimer = setTimeout(render, 120); }

/* =================================================================
   7. ФОРМА: ПОДПИСИ, ИТОГИ, ПРОПУСКИ
   ================================================================= */
const form = () => $("#form");

function applyUi(){
  const U = UI[lang];
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
  document.title = U.title;
  $$("[data-ui]").forEach(el => { const s = U[el.dataset.ui]; if (typeof s === "string") el.textContent = s; });
  Object.entries(U.ph).forEach(([name, ph]) => { const el = form().elements[name]; if (el) el.placeholder = ph; });
  $$(".lang-btn").forEach(b => b.classList.toggle("is-active", b.dataset.setLang === lang));
  $(".bar-back").href = "index.html";

  // Сроки договора — из CONFIG.contract.terms
  const tc = $("#termChoice");
  tc.innerHTML = CONFIG.contract.terms.map(m =>
    '<label><input type="radio" name="term" value="' + m + '"><span><b>' + m + " " + esc(U.termUnit) + "</b>" +
    '<small>' + esc(tpl(U.termCancel, { n: CONFIG.contract.cancelMonths })) + "</small></span></label>").join("");

  // Модули — из CONFIG.addons
  const money = n => fmtNum(n) + " " + CONFIG.currency;
  $("#addonList").innerHTML = CONFIG.addons.map(a =>
    '<label class="addon-opt"><input type="checkbox" name="addon" value="' + esc(a.id) + '">' +
    "<b>" + esc(addonText(a, "name", lang)) + "</b>" +
    "<small>" + esc(tpl(U.addonPrice, { setup: money(a.setup), monthly: money(a.monthly) })) + "</small></label>").join("");

  // Кто подписывает от JET MEDIA
  $("#signerSel").innerHTML = CONFIG.company.directors.map((d, i) =>
    '<option value="' + i + '">' + esc(lang === "th" ? d.th : d.latin) + "</option>").join("");

  fillForm();
}

function fillForm(){
  const f = form();
  ["number", "date", "devices", "start", "cName", "cReg", "cTax", "cAddr", "cRep", "cPos", "cBasis",
   "pName", "pId", "pTax", "pAddr", "phone", "email", "vName", "vAddr"].forEach(name => {
    if (f.elements[name]) f.elements[name].value = state[name] == null ? "" : state[name];
  });
  $$('input[name="tier"]', f).forEach(r => { r.checked = r.value === state.tier; });
  $$('input[name="term"]', f).forEach(r => { r.checked = +r.value === +state.term; });
  $$('input[name="clientType"]', f).forEach(r => { r.checked = r.value === state.clientType; });
  $$('input[name="addon"]', f).forEach(c => { c.checked = state.addons.includes(c.value); });
  f.elements.signer.value = String(state.signer);
  showClientFields();
  renderSummary();
}

function showClientFields(){
  $$("[data-client]").forEach(box => { box.hidden = box.dataset.client !== state.clientType; });
}

function renderSummary(){
  const U = UI[lang], t = totals();
  const money = n => fmtNum(n) + " " + CONFIG.currency;
  $("#sum").innerHTML = "<h2>" + esc(U.sumTitle) + "</h2>" +
    "<p><span>" + esc(U.sumLow) + "</span><b>" + money(t.low) + "</b></p>" +
    "<p><span>" + esc(U.sumHigh) + "</span><b>" + money(t.high) + "</b></p>" +
    "<p><span>" + esc(U.sumOnce) + "</span><b>" + money(t.once) + "</b></p>" +
    "<p><span>" + esc(U.sumYear) + "</span><b>" + money(t.year) + "</b></p>";

  // Что не заполнено — в договоре на этих местах останутся линии
  const need = state.clientType === "person"
    ? ["number", "date", "pName", "pId", "pAddr", "vName", "vAddr"]
    : ["number", "date", "cName", "cReg", "cAddr", "cRep", "vName", "vAddr"];
  const miss = need.filter(k => !String(state[k] || "").trim()).map(k => {
    const map = { number: "fNumber", date: "fDate" };
    return U[map[k] || k];
  });
  if (!(+state.devices > 0)) miss.push(U.fDevices);
  const box = $("#missing");
  box.hidden = !miss.length;
  box.textContent = miss.length ? tpl(U.missing, { list: miss.join(", ") }) : "";
}

function onInput(e){
  const el = e.target;
  if (!el.name) return;
  if (el.name === "addon"){
    state.addons = $$('input[name="addon"]:checked', form()).map(c => c.value);
  } else if (el.name === "devices"){
    state.devices = el.value === "" ? "" : Math.max(0, Math.min(500, Math.round(+el.value || 0)));
  } else if (el.name === "signer" || el.name === "term"){
    state[el.name] = +el.value;
  } else {
    state[el.name] = el.value;
  }
  if (el.name === "clientType") showClientFields();
  renderSummary();
  saveDraft();
  scheduleRender();
}

/* =================================================================
   8. PDF И ПЕЧАТЬ
   PDF собирается в браузере: каждый лист фотографируется в высоком
   разрешении (html-to-image) и складывается в файл A4 (jsPDF).
   Библиотеки лежат в vendor/ и грузятся только по нажатию.
   ================================================================= */
function loadScript(src){
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[data-src="' + src + '"]')) return resolve();
    const s = document.createElement("script");
    s.src = src; s.dataset.src = src;
    s.onload = resolve; s.onerror = () => reject(new Error("load " + src));
    document.head.appendChild(s);
  });
}

function fileName(){
  const num = String(state.number || "draft").trim().replace(/[^\w.-]+/g, "_") || "draft";
  return "JET-MEDIA-contract-" + num + ".pdf";
}

async function downloadPdf(){
  const U = UI[lang];
  clearTimeout(renderTimer);
  render();
  const busy = $("#busy"), busyText = $("#busyText");
  busy.hidden = false;
  document.documentElement.classList.add("capturing");
  try {
    await Promise.all([loadScript("vendor/html-to-image.js"), loadScript("vendor/jspdf.umd.min.js")]);
    await document.fonts.ready;
    fitPreview();
    const pages = $$(".page", docHost());
    const fontEmbedCSS = await htmlToImage.getFontEmbedCSS(docHost());
    const pdf = new window.jspdf.jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });
    for (let i = 0; i < pages.length; i++){
      busyText.textContent = tpl(U.busy, { n: i + 1, total: pages.length });
      const img = await htmlToImage.toJpeg(pages[i], {
        pixelRatio: 2, quality: 0.85, backgroundColor: "#ffffff", fontEmbedCSS,
        style: { margin: "0", boxShadow: "none" }
      });
      if (i) pdf.addPage("a4", "portrait");
      pdf.addImage(img, "JPEG", 0, 0, 210, 297, undefined, "FAST");
    }
    pdf.setProperties({ title: "JET MEDIA — " + String(state.number || ""), author: "JET MEDIA", creator: CONFIG.priceList.site });
    pdf.save(fileName());
  } catch (err){
    console.error("JET MEDIA: PDF", err);
    alert(U.pdfError);
    window.print();
  } finally {
    document.documentElement.classList.remove("capturing");
    busy.hidden = true;
    fitPreview();
  }
}

function printDoc(){
  clearTimeout(renderTimer);
  render();
  window.print();
}

/* =================================================================
   9. ЗАПУСК
   ================================================================= */
function detectLang(){
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (UI[fromUrl]) return fromUrl;
  let saved = null;
  try { saved = localStorage.getItem("jm_lang"); } catch (e) {}
  if (UI[saved]) return saved;
  const browser = (navigator.language || "ru").slice(0, 2).toLowerCase();
  return UI[browser] ? browser : "ru";
}

function setLang(code){
  lang = UI[code] ? code : "ru";
  try { localStorage.setItem("jm_lang", lang); } catch (e) {}
  const url = new URL(location.href);
  url.searchParams.set("lang", lang);
  history.replaceState(null, "", url);
  applyUi();
  render();
}

function init(){
  loadDraft();
  lang = detectLang();
  applyUi();
  const f = form();
  f.addEventListener("input", onInput);
  f.addEventListener("change", onInput);
  f.addEventListener("submit", e => e.preventDefault());
  $$(".lang-btn").forEach(b => b.addEventListener("click", () => setLang(b.dataset.setLang)));
  $$('[data-act="pdf"]').forEach(b => b.addEventListener("click", downloadPdf));
  $$('[data-act="print"]').forEach(b => b.addEventListener("click", printDoc));
  $('[data-act="reset"]').addEventListener("click", () => {
    if (!confirm(UI[lang].resetConfirm)) return;
    state = defaults();
    try { localStorage.removeItem(STORE_KEY); } catch (e) {}
    fillForm();
    render();
  });
  window.addEventListener("resize", fitPreview);
  // Листы раскладываются по реальной высоте текста — ждём шрифты
  render();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(render);
}

init();
