const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [12,13,14,15,16,17,18,19,20,21];
  let grandTotal = 0;

  for (let seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    // Wait for tables to load (important for dynamic content)
    await page.waitForSelector("table");

    const sum = await page.evaluate(() => {
      let total = 0;
      const cells = document.querySelectorAll("td");

      cells.forEach(cell => {
        const num = parseFloat(cell.innerText);
        if (!isNaN(num)) {
          total += num;
        }
      });

      return total;
    });

    console.log(`Seed ${seed} sum: ${sum}`);
    grandTotal += sum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();