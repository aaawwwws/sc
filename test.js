const puppeteer = require("puppeteer");
const URL = "https://kakaku.com/pc/videocard/itemlist.aspx";
// ブラウザの設定を指定
(async () => {
  // ブラウザの設定
  const browser = await puppeteer.launch({
    // ブラウザの設定
    headless: false, // 動作確認するためheadlessモードにしない
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
  await page.waitForSelector(".ckitemLink");
  // class全部選択
  const GPU_Titles = await page.$$(".ckitanker");
  // ここでクラス分回す
  for (const GPU_Title of GPU_Titles) {
    // クラスをテキスト化
    const test = await (await GPU_Title.getProperty("textContent")).jsonValue();
    // 最終的に出力
    await console.log(test);
  }

  await browser.close();
})();
