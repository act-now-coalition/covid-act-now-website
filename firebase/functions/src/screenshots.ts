import * as path from 'path';
import * as os from 'os';
import * as puppeteer from 'puppeteer';

const BROWSER_WIDTH = 2800;
const BROWSER_HEIGHT = 1575;
const TIMEOUT = 15 * 1000;

/**
 * We cache the browser instance to ensure "warm" function runs are as fast as
 * possible.
 */
let browserPromise: Promise<puppeteer.Browser> | null = null;
async function getBrowser(): Promise<puppeteer.Browser> {
  if (!browserPromise) {
    console.log('Launching browser...');
    browserPromise = puppeteer
      .launch({
        defaultViewport: {
          width: BROWSER_WIDTH,
          height: BROWSER_HEIGHT,
        },
        headless: true,
      })
      .then(browser => {
        console.log('Browser started.');
        return browser;
      });
  }
  return browserPromise;
}

export async function takeScreenshot(url: string): Promise<string> {
  const browser = await getBrowser();

  console.log('Opening tab.');
  const tab = await browser.newPage();

  console.log('Going to URL.');
  await tab.goto(url);

  console.log('Waiting for "screenshot" div.');
  const element = await tab.waitForSelector('.screenshot', {
    timeout: TIMEOUT,
  });

  console.log('Waiting for "screenshot-ready" div.');
  await tab.waitForSelector('.screenshot-ready', {
    timeout: TIMEOUT,
  });

  console.log('Capturing screenshot.');
  const file = path.join(os.tmpdir(), 'temp.png');
  await element.screenshot({
    path: file,
  });
  console.log('Screenshot done.');

  await tab.close();
  return file;
}
