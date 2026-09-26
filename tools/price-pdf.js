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

  for (const lang of LANGS){
    const url = pathToFileURL(path.join(ROOT, "price.html")).href + "?lang=" + lang;
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);

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
