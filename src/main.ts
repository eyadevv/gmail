import { PlaywrightLauncher } from "crawlee";
import { FingerprintInjector } from "fingerprint-injector";
import { readFile } from "fs/promises";
import { firefox } from "playwright-extra";
import { Actor } from "apify";

await Actor.init();
// ...
const proxyConfiguration = await Actor.createProxyConfiguration({
  groups: ["RESIDENTIAL"],
  countryCode: "FR",
});
async function main() {
  const fingerprintInjector = new FingerprintInjector();
  const file = await readFile(
    "/home/eyad/Projects/gmail/fingerprint.json",
    "utf-8"
  ).then((res) => JSON.parse(res));
  const launcher = new PlaywrightLauncher({
    // useChrome: true,
    launcher: firefox,
    userDataDir: "/home/eyad/Projects/gmail/3",
    launchOptions: {
      userAgent: file.fingerprint.userAgent,
      headless: false,
    },
  });
  const browser = await launcher.launch();
  const context = browser.contexts()[0];
  await fingerprintInjector.attachFingerprintToPlaywright(context, file);

  const page = context.pages()[0];
  await page.goto("https://accounts.google.com/");
  //   await page.goto("https://browserscan.net");
}

await main();
