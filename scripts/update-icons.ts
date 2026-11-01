import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function updateIcons() {
  const sourceImage = path.resolve(process.cwd(), 'public/assets/aistudio/file_000000009ea48211bb85fe658360d7b4_af857fa7.png');
  
  if (!fs.existsSync(sourceImage)) {
    console.error('Source icon image not found at:', sourceImage);
    process.exit(1);
  }

  const targets = [
    { dir: 'android/app/src/main/res/mipmap-mdpi', size: 48 },
    { dir: 'android/app/src/main/res/mipmap-hdpi', size: 72 },
    { dir: 'android/app/src/main/res/mipmap-xhdpi', size: 96 },
    { dir: 'android/app/src/main/res/mipmap-xxhdpi', size: 144 },
    { dir: 'android/app/src/main/res/mipmap-xxxhdpi', size: 192 },
    { dir: 'android/app/src/main/res/mipmap-anydpi-v26', size: 432, name: 'ic_launcher_foreground.png' },
  ];

  for (const target of targets) {
    const fullDir = path.resolve(process.cwd(), target.dir);
    if (!fs.existsSync(fullDir)) {
      fs.mkdirSync(fullDir, { recursive: true });
    }

    if (target.name) {
      const outPath = path.join(fullDir, target.name);
      await sharp(sourceImage)
        .resize(target.size, target.size)
        .png()
        .toFile(outPath);
      console.log(`Generated: ${outPath}`);
    } else {
      const iconPath = path.join(fullDir, 'ic_launcher.png');
      const roundPath = path.join(fullDir, 'ic_launcher_round.png');
      
      await sharp(sourceImage)
        .resize(target.size, target.size)
        .png()
        .toFile(iconPath);
      
      await sharp(sourceImage)
        .resize(target.size, target.size)
        .png()
        .toFile(roundPath);

      console.log(`Generated icons in ${target.dir}`);
    }
  }

  console.log('All APK launcher icons updated successfully from uploaded image!');
}

updateIcons().catch(err => {
  console.error('Error updating icons:', err);
  process.exit(1);
});
