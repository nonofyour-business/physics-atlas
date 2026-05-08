const fs = require("fs");
const path = require("path");

const root = __dirname;
const out = path.join(root, ".vercel", "output");
const staticOut = path.join(out, "static");

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(staticOut, { recursive: true });

for (const file of ["index.html", "styles.css", "app.js"]) {
  fs.copyFileSync(path.join(root, file), path.join(staticOut, file));
}

fs.writeFileSync(
  path.join(out, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        { handle: "filesystem" },
        { src: "/(.*)", dest: "/index.html" }
      ]
    },
    null,
    2
  )
);
