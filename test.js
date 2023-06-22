const puppeteer = require("puppeteer");
const fs = require("fs");
const URL = "https://kakaku.com/pc/videocard/itemlist.aspx";
// ブラウザの設定を指定
(async () => {
  // ブラウザの設定
  const browser = await puppeteer.launch({
    // ブラウザの設定
    headless: true, //ウィンドウを表示させるかどうか
  });
  // 新しいタブを開く
  const page = await browser.newPage();

  // ページを価格.comに移動
  await page.goto(URL);
  // 表示されるまで待つ
  await page.waitForSelector(".ckitemLink", "pryen");
  // class全部選択
  const GPU_Titles = await page.$$(".ckitanker");
  const GPU_Values = await page.$$(".pryen");
  // リストを作成
  let dates = [];
  // ここでクラス分回す
  for (let i = 0; i < GPU_Titles.length; i++) {
    const GPU_title = await (
      await GPU_Titles[i].getProperty("textContent")
    ).jsonValue();
    const GPU_Value = await (
      await GPU_Values[i].getProperty("textContent")
    ).jsonValue();

    dates.push({
      GPU: GPU_title,
      Value: GPU_Value,
    });
    // console.log(GPU_title + ":" + GPU_Value);
  }
  // jsonに出力
  fs.appendFileSync("./export.json", JSON.stringify(dates, null, 2));
  // 最後にブラウザを閉じる
  await browser.close();
})();
