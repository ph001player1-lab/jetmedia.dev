/* =================================================================
   Сборка PDF прайс-листа: price-ru.pdf, price-en.pdf, price-th.pdf
   из price.html. Запускать после каждого изменения цен в config.js.

     npm install -g playwright && npx playwright install chromium
     NODE_PATH="$(npm root -g)" node tools/price-pdf.js

   Шрифты грузятся с Google Fonts, поэтому нужен интернет. Если он
   идёт через прокси, адрес берётся из HTTPS_PROXY; дополнительные
   флаги Chromium можно передать в CHROMIUM_FLAGS через пробел.
   ================================================================= */
const path = require("path");
const { pathToFileURL } = require("url");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const LANGS = ["ru", "en", "th"];

(async () => {
  const launch = { args: (process.env.CHROMIUM_FLAGS || "").split(" ").filter(Boolean) };
  if (process.env.HTTPS_PROXY) launch.proxy = { server: process.env.HTTPS_PROXY, bypass: "127.0.0.1,localhost" };
  const browser = await chromium.launch(launch);
  const page = await browser.newPage();

  // Фирменные шрифты грузятся с Google Fonts. Если сеть моргнула, браузер
  // молча подставит системный шрифт — такой PDF не сохраняем, а пробуем ещё раз.
  const brandFontsLoaded = () => page.evaluate(async () => {
    await document.fonts.ready;
    const loaded = [...document.fonts].filter(f => f.status === "loaded").map(f => f.family.replace(/"/g, ""));
    return ["Manrope", "Inter"].every(name => loaded.includes(name));
  });

  for (const lang of LANGS){
    const url = pathToFileURL(path.join(ROOT, "price.html")).href + "?lang=" + lang;
    let fontsOk = false;
    for (let attempt = 1; attempt <= 4 && !fontsOk; attempt++){
      await page.goto(url, { waitUntil: "networkidle" });
      fontsOk = await brandFontsLoaded();
      if (!fontsOk) console.warn(`  ${lang}: шрифты не загрузились, попытка ${attempt}`);
    }
    if (!fontsOk) throw new Error(`${lang}: фирменные шрифты не загрузились — проверьте интернет и запустите ещё раз`);

    // Вёрстка для печати; лист должен уместиться на одну страницу A4
    await page.emulateMedia({ media: "print" });
    const fits = await page.evaluate(() => {
      const s = document.getElementById("sheet");
      return s.scrollHeight <= s.clientHeight + 1;
    });
    if (!fits) console.warn(`  ${lang}: содержимое не влезает в A4 — сократите тексты`);

    const out = path.join(ROOT, `price-${lang}.pdf`);
    await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
    console.log(`  ${lang}: ${path.relative(ROOT, out)}`);
  }
  await browser.close();
})();
