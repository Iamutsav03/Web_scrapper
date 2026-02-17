const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const fs = require('fs').promises;

puppeteer.use(StealthPlugin());
puppeteer.use(
    RecaptchaPlugin({
        provider: { id: '2captcha', token: process.env.CAPTCHA_KEY },
        visualFeedback: true
    })
);

async function scrapeProfile(url) {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        const page = await browser.newPage();

        // Load cookies if available
        const cookiesString = await fs.readFile('./cookies.json').catch(() => null);
        if (cookiesString) {
            const cookies = JSON.parse(cookiesString);
            await page.setCookie(...cookies);
        }

        await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

        const name = await page.$eval("h1", el => el.innerText.trim())
            .catch(() => "N/A");

        await page.waitForSelector('body');

        // Extract visible text
        const bodyText = await page.evaluate(() => document.body.innerText);

        // Regex extraction
        const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
        const phoneRegex = /(\+?\d[\d\s\-()]{7,}\d)/g;

        const emailMatches = bodyText.match(emailRegex) || [];
        const phoneMatches = bodyText.match(phoneRegex) || [];

        // Extract from mailto links
        const emailsFromLinks = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('a[href^="mailto:"]'))
                .map(a => a.href.replace(/^mailto:/i, '').trim());
        });

        // Extract from tel links
        const phonesFromLinks = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('a[href^="tel:"]'))
                .map(a => a.href.replace(/^tel:/i, '').trim());
        });

        // Merge & deduplicate
        const emails = [...new Set([...emailMatches, ...emailsFromLinks])];
        const phones = [...new Set([...phoneMatches, ...phonesFromLinks])];

        return {
            name,
            emails,
            phones,
            sourceUrl: url,
            scrapedAt: new Date()
        };

    } catch (error) {
        console.error("Scraping process failed:", error.message);
        throw error;
    } finally {
        if (browser) await browser.close();
    }
}

module.exports = scrapeProfile;
