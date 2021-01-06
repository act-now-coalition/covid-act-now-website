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

    // Rename the image `image.png` -> `image-original.png` (sharp doesn't allow
    // the same input and output path).
    const { dir: imageDir, name: fileName, ext } = path.parse(inputPath);
    const backupName = `${fileName}-original${ext}`;
    const backupImagePath = path.join(imageDir, backupName);

    // Do not create a copy if the original copy already exists
    if (!fs.existsSync(backupImagePath)) {
      fs.renameSync(inputPath, backupImagePath);
    }

    // Resize the image preserving the aspect ratio
    console.log(`Resizing ${imagePath}`);
    await sharp(backupImagePath)
      .resize(doubleSize(sizeParams))
      .toFile(inputPath);
  }

  return true;
}

interface ImageSize {
  width?: number;
  height?: number;
}

// Duplicate the input pixel size for better resolution on retina displays
function doubleSize(sizeParams: ImageSize): ImageSize {
  if (sizeParams.width) {
    return { width: 2 * sizeParams.width };
  }
  if (sizeParams.height) {
    return { height: 2 * sizeParams.height };
  }
  return {};
}

if (require.main === module) {
  main()
    .then(() => {
      console.log('Done');
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(-1);
    });
}
