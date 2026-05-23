const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const tasks = [
  {
    src: "G:\\내 드라이브\\portfolio\\2024.04-06 BENSON (NEW)\\벤슨 포트폴리오 최종 모음\\final 4 long.png",
    dest: "public/projects/benson/poster.png",
    maxWidth: 2400,
    quality: 90,
    format: 'png',
  },
  {
    src: "G:\\내 드라이브\\portfolio\\2024.04-06 BENSON (NEW)\\벤슨 포트폴리오 최종 모음\\facade.png",
    dest: "public/projects/benson/space-desktop.png",
    maxWidth: 2400,
    quality: 90,
    format: 'png',
  },
  {
    src: "G:\\내 드라이브\\portfolio\\2025.04 TOFUG (NEW)\\image\\Untitled-1.png",
    dest: "public/projects/tofug/poster.png",
    maxWidth: 2400,
    quality: 90,
    format: 'png',
  },
  {
    src: "G:\\내 드라이브\\portfolio\\2025.04 TOFUG (NEW)\\image\\DSC09571-28.jpg",
    dest: "public/projects/tofug/space-desktop.jpg",
    maxWidth: 2400,
    quality: 92,
    format: 'jpg',
  },
];

function getMB(filePath) {
  try { return (fs.statSync(filePath).size / 1024 / 1024).toFixed(2); } catch { return 'N/A'; }
}

async function run() {
  for (const task of tasks) {
    const destAbs = path.join(process.cwd(), task.dest);
    fs.mkdirSync(path.dirname(destAbs), { recursive: true });

    const srcMB = getMB(task.src);
    process.stdout.write(`\n▶ ${path.basename(task.src)} (${srcMB} MB) → ${task.dest}\n`);

    const img = sharp(task.src).resize({ width: task.maxWidth, withoutEnlargement: true });

    if (task.format === 'png') {
      await img.png({ quality: task.quality, compressionLevel: 6 }).toFile(destAbs);
    } else {
      await img.jpeg({ quality: task.quality, mozjpeg: true }).toFile(destAbs);
    }

    const destMB = getMB(destAbs);
    console.log(`  ✓ ${srcMB} MB → ${destMB} MB  (saved to ${task.dest})`);
  }
  console.log('\n✅ 완료');
}

run().catch(err => { console.error('Error:', err.message); process.exit(1); });
