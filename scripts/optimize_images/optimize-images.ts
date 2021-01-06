import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import staticImages from './static-images';

async function main() {
  for (const imageInfo of staticImages) {
    const { path: imagePath, ...sizeParams } = imageInfo;
    const inputPath = path.join(__dirname, '../../', imagePath);

    if (!fs.existsSync(inputPath)) {
      console.log(`Image ${inputPath} not found, skipping.`);
      continue;
    }

    // Rename the image `image.png` -> `backup-image.png` (sharp doesn't allow
    // the same input and output path).
    const { dir: imageDir, base: fileName } = path.parse(inputPath);
    const backupName = `backup-${fileName}`;
    const backupImagePath = path.join(imageDir, backupName);

    if (fs.existsSync(backupImagePath)) {
      console.log(`Backup image ${backupImagePath} found, skipping.`);
      continue;
    }

    fs.renameSync(inputPath, backupImagePath);

    // Resize the image preserving the aspect ratio
    console.log(`Resizing ${imagePath}`);
    await sharp(backupImagePath).resize(sizeParams).toFile(inputPath);

    // Remove the backup image
    if (fs.existsSync(backupImagePath)) {
      fs.unlinkSync(backupImagePath);
    }
  }

  console.log('Done.');
}

if (require.main === module) {
  main();
}
