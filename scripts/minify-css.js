const fs = require('fs');
const path = require('path');
const csso = require('csso');

const cssPath = path.join(__dirname, '..', 'style.css');
const minifiedPath = path.join(__dirname, '..', 'style.min.css');
const css = fs.readFileSync(cssPath, 'utf8');

const minified = csso.minify(css, {
  restructure: true,
  forceMediaMerge: true,
}).css;

fs.writeFileSync(minifiedPath, minified, 'utf8');
console.log('✓ CSS minified successfully → style.min.css');
