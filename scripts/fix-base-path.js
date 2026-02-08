#!/usr/bin/env node

/**
 * Fixes asset paths in the built HTML for GitHub Pages deployment.
 * react-static hardcodes the CSS link to '/' instead of using publicPath,
 * so this script rewrites absolute asset paths to use the correct base path.
 */

const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
const BASE_PATH = '/mta-css';

fs.readdirSync(DIST)
  .filter(f => f.endsWith('.html'))
  .forEach(file => {
    const filePath = path.join(DIST, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // Fix CSS link: href="/styles.xxx.css" -> href="/mta-css/styles.xxx.css"
    // Fix JS src:  src="/app.xxx.js" -> src="/mta-css/app.xxx.js"
    // Only fix paths that start with "/" but not "/mta-css/" already
    html = html.replace(
      /(href|src)="\/(?!mta-css\/)([\w][\w.\-]*\.(css|js))"/g,
      `$1="${BASE_PATH}/$2"`
    );

    fs.writeFileSync(filePath, html);
    console.log(`Fixed paths in ${file}`);
  });
