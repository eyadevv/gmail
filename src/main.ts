import { PlaywrightLauncher } from "crawlee";
import { FingerprintInjector } from "fingerprint-injector";
import { firefox } from "playwright-extra";
import { Actor } from "apify";
import { BrowserFingerprintWithHeaders } from "fingerprint-generator";

await Actor.init();
// ...
const proxyConfiguration = await Actor.createProxyConfiguration({
  groups: ["RESIDENTIAL"],
  password: "apify_proxy_SX2YIVSaopqNNWEeu1q3OsFd7WLnSB0Pmttv",
});
async function main() {
  // ES module replacement for __dirname
  const fingerprintInjector = new FingerprintInjector();
  const fingerprint: BrowserFingerprintWithHeaders = {
    fingerprint: {
      screen: {
        availHeight: 1080,
        availWidth: 1920,
        pixelDepth: 24,
        height: 1080,
        width: 1920,
        availTop: 0,
        availLeft: 0,
        colorDepth: 24,
        innerHeight: 1050,
        outerHeight: 1050,
        outerWidth: 1920,
        innerWidth: 1900,
        screenX: 0,
        pageXOffset: 0,
        pageYOffset: 0,
        devicePixelRatio: 1.5,
        clientWidth: 1900,
        clientHeight: 1050,
        hasHDR: true,
      },
      navigator: {
        userAgent:
          "Mozilla/5.0 (X11; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0",
        userAgentData: null,
        language: "en-US",
        languages: ["en-US", "en", "es-ES"],
        platform: "Linux x86_64",
        deviceMemory: 8,
        hardwareConcurrency: 8,
        maxTouchPoints: 0,
        product: "Gecko",
        productSub: "20030107",
        vendor: "Google Inc.",
        vendorSub: null,
        doNotTrack: null,
        appCodeName: "Mozilla",
        appName: "Netscape",
        appVersion: "5.0 (X11; Ubuntu)",
        oscpu: "Linux x86_64",
        extraProperties: {
          vendorFlavors: [],
          isBluetoothSupported: true,
          globalPrivacyControl: true,
          pdfViewerEnabled: true,
          installedApps: [],
        },
        webdriver: false,
      },
      audioCodecs: {
        ogg: "probably",
        mp3: "maybe",
        wav: "probably",
        m4a: "maybe",
        aac: "maybe",
      },
      videoCodecs: {
        ogg: "probably",
        h264: "probably",
        webm: "probably",
      },
      pluginsData: {
        plugins: [
          {
            name: "Chrome PDF Viewer",
            description: "Portable Document Format",
            filename: "internal-pdf-viewer",
            mimeTypes: [
              {
                type: "application/pdf",
                suffixes: "pdf",
                description: "Portable Document Format",
                enabledPlugin: "Chrome PDF Viewer",
              },
            ],
          },
        ],
        mimeTypes: ["Portable Document Format~~application/pdf~~pdf"],
      },
      battery: null,
      videoCard: {
        vendor: "Intel",
        renderer: "Intel(R) UHD Graphics 620",
      },
      multimediaDevices: {
        speakers: [],
        micros: [],
        webcams: [],
      },
      fonts: ["Bitstream Vera Sans Mono", "MS UI Gothic", "PMingLiU"],
      mockWebRTC: true,
      slim: false,
    },
    headers: {
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0",
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "accept-language": "en-US,en;q=0.9,es-ES;q=0.7",
      "accept-encoding": "gzip, deflate, br",
      "upgrade-insecure-requests": "1",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-site",
      "sec-fetch-user": "?1",
      te: "trailers",
    },
  };
  const launcher = new PlaywrightLauncher({
    // useChrome: true,
    launcher: firefox,
    userDataDir: "../3",
    launchOptions: {
      userAgent: fingerprint?.fingerprint?.navigator?.userAgent,
      headless: false,
    },
  });
  const browser = await launcher.launch();
  const context = browser.contexts()[0];
  await fingerprintInjector.attachFingerprintToPlaywright(context, fingerprint);

  const page = context.pages()[0];
  await page.goto("https://accounts.google.com/");
  //   await page.goto("https://browserscan.net");
}

await main();
