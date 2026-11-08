const fs = require("fs");
const j = JSON.parse(
  fs.readFileSync(
    "C:\\Users\\Dell\\.cursor\\browser-logs\\cdp-response-Page.captureScreenshot-2026-11-08T10-45-59-092Z.json",
    "utf8"
  )
);
const d = j.data || j.result?.data;
if (!d) {
  console.log(Object.keys(j));
  process.exit(1);
}
const buf = Buffer.from(d, "base64");
fs.writeFileSync("H:\\Next-JS\\harinath-portfolio\\.hero-scene.png", buf);
console.log("bytes", buf.length);
