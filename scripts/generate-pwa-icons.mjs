import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const outputDir = './public/icons';

// FitnessGH brand colors
const primaryColor = '#32b0b0';
const backgroundColor = '#031a1b';

// Create a simple dumbbell icon SVG
const createIconSVG = (size) => {
  const padding = size * 0.15;
  const innerSize = size - padding * 2;

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="${backgroundColor}"/>
      <g transform="translate(${padding}, ${padding})">
        <!-- Dumbbell icon -->
        <g transform="translate(${innerSize * 0.5}, ${innerSize * 0.5})">
          <!-- Center bar -->
          <rect x="${-innerSize * 0.3}" y="${-innerSize * 0.06}" width="${innerSize * 0.6}" height="${innerSize * 0.12}" rx="${innerSize * 0.03}" fill="${primaryColor}"/>

          <!-- Left weight -->
          <rect x="${-innerSize * 0.4}" y="${-innerSize * 0.2}" width="${innerSize * 0.12}" height="${innerSize * 0.4}" rx="${innerSize * 0.03}" fill="${primaryColor}"/>
          <rect x="${-innerSize * 0.45}" y="${-innerSize * 0.15}" width="${innerSize * 0.08}" height="${innerSize * 0.3}" rx="${innerSize * 0.02}" fill="${primaryColor}"/>

          <!-- Right weight -->
          <rect x="${innerSize * 0.28}" y="${-innerSize * 0.2}" width="${innerSize * 0.12}" height="${innerSize * 0.4}" rx="${innerSize * 0.03}" fill="${primaryColor}"/>
          <rect x="${innerSize * 0.37}" y="${-innerSize * 0.15}" width="${innerSize * 0.08}" height="${innerSize * 0.3}" rx="${innerSize * 0.02}" fill="${primaryColor}"/>
        </g>

        <!-- FG text below -->
        <text x="${innerSize * 0.5}" y="${innerSize * 0.85}" font-family="Arial Black, sans-serif" font-size="${innerSize * 0.18}" font-weight="900" fill="${primaryColor}" text-anchor="middle">FG</text>
      </g>
    </svg>
  `;
};

// Create shortcut icons
const createShortcutSVG = (size, type) => {
  const icons = {
    gym: `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="${backgroundColor}"/>
        <g transform="translate(${size * 0.25}, ${size * 0.25})">
          <rect x="0" y="${size * 0.15}" width="${size * 0.5}" height="${size * 0.06}" rx="3" fill="${primaryColor}"/>
          <rect x="${size * 0.03}" y="${size * 0.08}" width="${size * 0.08}" height="${size * 0.2}" rx="3" fill="${primaryColor}"/>
          <rect x="${size * 0.39}" y="${size * 0.08}" width="${size * 0.08}" height="${size * 0.2}" rx="3" fill="${primaryColor}"/>
        </g>
      </svg>
    `,
    shop: `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="${backgroundColor}"/>
        <g transform="translate(${size * 0.25}, ${size * 0.2})">
          <rect x="${size * 0.05}" y="${size * 0.15}" width="${size * 0.4}" height="${size * 0.35}" rx="4" fill="none" stroke="${primaryColor}" stroke-width="4"/>
          <path d="M${size * 0.15} ${size * 0.15} L${size * 0.15} ${size * 0.05} Q${size * 0.25} ${-size * 0.05} ${size * 0.35} ${size * 0.05} L${size * 0.35} ${size * 0.15}" fill="none" stroke="${primaryColor}" stroke-width="4"/>
        </g>
      </svg>
    `,
    dashboard: `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="${backgroundColor}"/>
        <g transform="translate(${size * 0.2}, ${size * 0.2})">
          <rect x="0" y="0" width="${size * 0.25}" height="${size * 0.25}" rx="4" fill="${primaryColor}"/>
          <rect x="${size * 0.35}" y="0" width="${size * 0.25}" height="${size * 0.25}" rx="4" fill="${primaryColor}" opacity="0.6"/>
          <rect x="0" y="${size * 0.35}" width="${size * 0.25}" height="${size * 0.25}" rx="4" fill="${primaryColor}" opacity="0.6"/>
          <rect x="${size * 0.35}" y="${size * 0.35}" width="${size * 0.25}" height="${size * 0.25}" rx="4" fill="${primaryColor}"/>
        </g>
      </svg>
    `,
  };
  return icons[type] || icons.gym;
};

async function generateIcons() {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Generating PWA icons...');

  // Generate main app icons
  for (const size of sizes) {
    const svg = createIconSVG(size);
    const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);

    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);

    console.log(`Created: ${outputPath}`);
  }

  // Generate shortcut icons
  const shortcuts = ['gym', 'shop', 'dashboard'];
  for (const shortcut of shortcuts) {
    const svg = createShortcutSVG(96, shortcut);
    const outputPath = path.join(outputDir, `shortcut-${shortcut}.png`);

    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);

    console.log(`Created: ${outputPath}`);
  }

  // Generate Apple touch icon (180x180)
  const appleSvg = createIconSVG(180);
  await sharp(Buffer.from(appleSvg))
    .png()
    .toFile('./public/apple-icon.png');
  console.log('Created: ./public/apple-icon.png');

  // Generate favicon (32x32)
  const faviconSvg = createIconSVG(32);
  await sharp(Buffer.from(faviconSvg))
    .png()
    .toFile('./public/icon-dark-32x32.png');
  await sharp(Buffer.from(faviconSvg))
    .png()
    .toFile('./public/icon-light-32x32.png');
  console.log('Created: ./public/icon-dark-32x32.png');
  console.log('Created: ./public/icon-light-32x32.png');

  // Create SVG icon
  const svgIcon = createIconSVG(64);
  fs.writeFileSync('./public/icon.svg', svgIcon);
  console.log('Created: ./public/icon.svg');

  // Create placeholder screenshots
  const screenshotsDir = './public/screenshots';
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // Desktop screenshot placeholder
  const desktopSvg = `
    <svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
      <rect width="1280" height="720" fill="${backgroundColor}"/>
      <text x="640" y="340" font-family="Arial" font-size="48" fill="${primaryColor}" text-anchor="middle">FitnessGH</text>
      <text x="640" y="400" font-family="Arial" font-size="24" fill="#a1a1aa" text-anchor="middle">Desktop Dashboard Preview</text>
    </svg>
  `;
  await sharp(Buffer.from(desktopSvg))
    .png()
    .toFile(path.join(screenshotsDir, 'desktop.png'));
  console.log('Created: ./public/screenshots/desktop.png');

  // Mobile screenshot placeholder
  const mobileSvg = `
    <svg width="750" height="1334" xmlns="http://www.w3.org/2000/svg">
      <rect width="750" height="1334" fill="${backgroundColor}"/>
      <text x="375" y="640" font-family="Arial" font-size="48" fill="${primaryColor}" text-anchor="middle">FitnessGH</text>
      <text x="375" y="700" font-family="Arial" font-size="24" fill="#a1a1aa" text-anchor="middle">Mobile App Preview</text>
    </svg>
  `;
  await sharp(Buffer.from(mobileSvg))
    .png()
    .toFile(path.join(screenshotsDir, 'mobile.png'));
  console.log('Created: ./public/screenshots/mobile.png');

  console.log('\nAll PWA icons generated successfully!');
}

generateIcons().catch(console.error);
