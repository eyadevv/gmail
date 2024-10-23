import FingerprintGenerator from "fingerprint-generator";
import { writeFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
async function gen() {
  const data = new FingerprintGenerator.FingerprintGenerator({
    operatingSystems: ["linux"],
    browsers: ["firefox"],
    devices: ["desktop"],
  });
  const fingerprint = JSON.stringify(data.getFingerprint());
  const file = await writeFile(
    "/home/eyad/Projects/gmail/fingerprint.json",
    fingerprint,
    "utf-8"
  );
  // console.log(JSON.stringify(fingerprint));
}

await gen();
