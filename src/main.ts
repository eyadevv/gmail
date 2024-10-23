import { PlaywrightLauncher } from "crawlee";
import { FingerprintInjector } from "fingerprint-injector";
import { readFile } from "fs/promises";
import { firefox } from "playwright-extra";
import { Actor } from "apify";
import { dirname } from "path";
import { fileURLToPath } from "url";
fileURLToPath;
await Actor.init();
// ...
const proxyConfiguration = await Actor.createProxyConfiguration({
  groups: ["RESIDENTIAL"],
  password: "apify_proxy_SX2YIVSaopqNNWEeu1q3OsFd7WLnSB0Pmttv",
});
async function main() {
  const __filename = fileURLToPath(import.meta.url);

  // ES module replacement for __dirname
  const __dirname = dirname(__filename);
  const fingerprintInjector = new FingerprintInjector();
  const file = await readFile(`${__dirname}/fingerprint.json`, "utf-8").then(
    (res) => JSON.parse(res)
  );
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
