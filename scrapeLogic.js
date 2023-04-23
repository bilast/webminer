const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
  const page = await browser.newPage();

  await page.goto('https://moneroocean.stream/');

  await page.waitForSelector('#AddrField');
  await page.type('#AddrField', '45yVHJaCLpUeBg383G97PEPiMLQwo9FVN58kLp92SyQNdCKqfQdMs23LZekLfWQ51Whe6BgM5LfuzLB3HRtpz9651baZBVm');

  await page.waitForTimeout(10000);

  await page.waitForSelector('#DashPayBtn');
  await page.click('#DashPayBtn');

  await page.waitForTimeout(20000);

  await page.waitForSelector('#WebMinerBtn');
  await page.click('#WebMinerBtn');
    
    const logStatement = `Web Mining Started!`;
    console.log(logStatement);
    res.send(logStatement);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  }
};

module.exports = { scrapeLogic };
