const puppeteer = require("puppeteer");
const fs = require("fs");
// ブラウザの設定を指定

// クラスを作成
class Scraping {
  constructor(url, parts) {
    // コンストラクタで変更する値を設定
    this.url = url;
    this.parts = parts;
  }
  async sc() {
    // ブラウザの設定
    const browser = await puppeteer.launch({
      // ブラウザの設定
      headless: false, //ウィンドウを表示させるかどうか
      args: ["--proxy-server='direct://'", "--proxy-bypass-list=*"],
    });
    // 新しいタブを開く
    const page = await browser.newPage();

    // ページを価格.comに移動
    await page.goto(this.url);
    // 表示されるまで待つ
    await page.waitForSelector(".ckitemLink", "pryen");
    // class全部選択
    const Parts_Titles = await page.$$(".ckitanker");
    const Parts_Value = await page.$$(".pryen");
    // リストを作成
    let dates = [];
    // ここでクラス分回す
    for (let i = 0; i < Parts_Titles.length; i++) {
      const Part_Titles = await (
        await Parts_Titles[i].getProperty("textContent")
      ).jsonValue();
      const Part_Values = await (
        await Parts_Value[i].getProperty("textContent")
      ).jsonValue();

      dates.push({
        GPU: Part_Titles,
        Value: Part_Values,
      });
      // console.log(Parts_Titles + ":" + Parts_Values);
    }
    // jsonに出力
    fs.writeFileSync(
      "./" + this.parts + "export.json",
      JSON.stringify(dates, null, 2)
    );
    console.log(dates);
    // 最後にブラウザを閉じる
    await browser.close();
  }
}

const URL_Lists = [
  { type: "GPU", url: "https://kakaku.com/pc/videocard/itemlist.aspx" },
  { type: "CPU", url: "https://kakaku.com/pc/cpu/itemlist.aspx" },
];

const func = () => {
  URL_Lists.forEach((item) => {
    const SC = new Scraping(item.url, item.type);
    SC.sc();
  });
};

func();
