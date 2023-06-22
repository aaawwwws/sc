const puppeteer = require("puppeteer");
const URL = "https://kakaku.com/pc/videocard/itemlist.aspx";
// ブラウザの設定を指定
(async () => {
  // ブラウザの設定
  const browser = await puppeteer.launch({
    // ブラウザの設定
    headless: true, // 動作確認するためheadlessモードにしない
  });
  // 新しいタブを開く
  const page = await browser.newPage();

  // これ指定する必要があるのかわからない
  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  // ページを価格.comに移動
  await page.goto(URL);
  // 表示されるまで待つ
  await page.waitForSelector(".ckitemLink", "pryen");
  // class全部選択
  const GPU_Titles = await page.$$(".ckitanker");
  const GPU_Values = await page.$$(".pryen");
  // ここでクラス分回す
  for (let i = 0; i < GPU_Titles.length; i++) {
    const test = await (
      await GPU_Titles[i].getProperty("textContent")
    ).jsonValue();
    const test1 = await (
      await GPU_Values[i].getProperty("textContent")
    ).jsonValue();
    console.log(test + ":" + test1);
  }

  await browser.close();
})();
