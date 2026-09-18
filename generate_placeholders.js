const fs = require('fs');
const path = require('path');

// Load the products
const products = require('./js/products.js');

function generateSVG(name, category) {
  let bgColor = '#F3ECDC'; // cream default
  let strokeColor = '#24201B'; // ink
  let textColor = '#24201B';
  let badgeColor = '#6E8A63'; // sage
  let iconMarkup = '';

  if (category === 'raw') {
    bgColor = '#FAF8F5';
    strokeColor = '#A6472A'; // rust
    badgeColor = '#A6472A';
    iconMarkup = `<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#A6472A" fill-opacity="0.15" stroke="#A6472A" stroke-width="1.5"/>`;
  } else if (category === 'treats') {
    bgColor = '#FAF9F5';
    strokeColor = '#C9902E'; // ochre
    badgeColor = '#C9902E';
    iconMarkup = `<circle cx="12" cy="12" r="8" fill="#C9902E" fill-opacity="0.15" stroke="#C9902E" stroke-width="1.5"/>`;
  } else if (category === 'small-animals') {
    bgColor = '#F7F8F5';
    strokeColor = '#6E8A63'; // sage
    badgeColor = '#6E8A63';
    iconMarkup = `<path d="M12 3a9 9 0 0 0-9 9c0 1.25.25 2.44.71 3.53l-1.42 4.25a1 1 0 0 0 1.25 1.25l4.25-1.42A8.93 8.93 0 0 0 12 21a9 9 0 0 0 9-9 9 9 0 0 0-9-9zm0 15a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" fill="#6E8A63" fill-opacity="0.15" stroke="#6E8A63" stroke-width="1.5"/>`;
  } else if (category === 'misc') {
    bgColor = '#F5F7F6';
    strokeColor = '#1F3A2E'; // pine
    badgeColor = '#1F3A2E';
    iconMarkup = `<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-5h2v2h-2v-2zm1-8.5a3.25 3.25 0 0 1 3.25 3.25c0 1.2-.66 2.05-1.5 2.7-.84.65-1.75 1.15-1.75 2.55h-2c0-2.2 1.3-3.05 2.1-3.65.8-.6 1.15-1.05 1.15-1.6A1.25 1.25 0 1 0 11 11.25H9A3.25 3.25 0 0 1 12 6.5z" fill="#1F3A2E" fill-opacity="0.15" stroke="#1F3A2E" stroke-width="0.5"/>`;
  }

  // Word wrap product name
  const words = name.split(' ');
  let lines = [];
  let currentLine = '';
  for (let word of words) {
    if ((currentLine + ' ' + word).length > 22) {
      lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += ' ' + word;
    }
  }
  if (currentLine) lines.push(currentLine.trim());

  let tspanMarkup = '';
  const startY = 160 - ((lines.length - 1) * 12);
  lines.forEach((line, index) => {
    tspanMarkup += `<tspan x="50%" dy="${index === 0 ? 0 : 26}">${line}</tspan>`;
  });

  return `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${bgColor}"/>
  <rect x="12" y="12" width="376" height="276" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-dasharray="6 4" rx="4"/>
  <g transform="translate(176, 45) scale(2)">
    ${iconMarkup}
  </g>
  <text x="50%" y="${startY}" font-family="'Work Sans', sans-serif" font-size="18" font-weight="600" fill="${textColor}" text-anchor="middle" letter-spacing="-0.02em">
    ${tspanMarkup}
  </text>
  <g transform="translate(140, 240)">
    <rect width="120" height="22" rx="11" fill="${badgeColor}" fill-opacity="0.1"/>
    <text x="60" y="14" font-family="'IBM Plex Mono', monospace" font-size="9" font-weight="600" fill="${badgeColor}" text-anchor="middle" letter-spacing="0.1em">
      ${category.toUpperCase().replace('-', ' ')}
    </text>
  </g>
</svg>`;
}

// Ensure the directory exists
const targetDir = path.join(__dirname, 'assets', 'products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log(`Starting generation of placeholder SVGs for ${products.length} products...`);

let count = 0;
products.forEach(p => {
  if (p.image && p.image.startsWith('assets/products/')) {
    const filename = path.basename(p.image);
    const filePath = path.join(targetDir, filename);
    
    // We only generate if it starts with assets/products/ and is SVG
    if (filename.endsWith('.svg')) {
      const svgContent = generateSVG(p.name, p.category);
      fs.writeFileSync(filePath, svgContent, 'utf8');
      count++;
    }
  }
});

console.log(`Successfully generated ${count} SVG placeholder files in assets/products/`);
