const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
let fsx;
try { fsx = require('fs-extra'); } catch { fsx = fs; }

// 1. Read dist/output.css
const cssPath = path.join(__dirname, 'dist', 'output.css');
if (!fs.existsSync(cssPath)) {
  console.error('dist/output.css not found!');
  process.exit(1);
}
const cssContent = fs.readFileSync(cssPath);

// 2. Generate an 8-character hash (MD5)
const hash = crypto.createHash('md5').update(cssContent).digest('hex').slice(0, 8);
const newCssFile = `output.${hash}.css`;
const newCssPath = path.join(__dirname, 'dist', newCssFile);

// 3. Clean up old hashed CSS files in dist/
const distDir = path.join(__dirname, 'dist');
const files = fs.readdirSync(distDir);
for (const file of files) {
  if (/^output\.[a-f0-9]{8}\.css$/.test(file)) {
    fs.unlinkSync(path.join(distDir, file));
  }
}

// 4. Copy output.css to output.[HASH].css
fs.copyFileSync(cssPath, newCssPath);
console.log(`Copied to dist/${newCssFile}`);

// 5. Replace all references to output.css in all HTML files in the root directory
const htmlFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
for (const file of htmlFiles) {
  const filePath = path.join(__dirname, file);
  let html = fs.readFileSync(filePath, 'utf8');
  // Replace output.css or output.css?v=1, etc. with output.[HASH].css
  html = html.replace(/output\.css(\?[^"']*)?/g, newCssFile);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated ${file}`);
}

console.log(`✅ CSS versioning complete: ${newCssFile}`); 