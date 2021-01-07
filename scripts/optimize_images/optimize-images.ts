import fs from 'fs';
import sharp from 'sharp';
import staticImages from './static-images';
import { absolutePath, doubleSize } from './utils';

async function main() {
  for (const imageInfo of staticImages) {
    const { inputPath, originalPath, ...sizeParams } = imageInfo;
    const inputAbsolutePath = absolutePath(inputPath);

    if (!fs.existsSync(inputAbsolutePath)) {
      console.log(`Image ${inputAbsolutePath} not found, skipping.`);
      continue;
    }
    const originalAbsolutePath = absolutePath(originalPath);

    // Do not overwrite the backup copy if it already exists
    if (!fs.existsSync(originalAbsolutePath)) {
      fs.renameSync(inputAbsolutePath, originalAbsolutePath);
    }

    const targetSize = doubleSize(sizeParams);
    const inputFileInfo = fs.statSync(inputAbsolutePath);
    const inputMetadata = await sharp(originalAbsolutePath).metadata();

    // Do not resize the image if resizing would result in a larger image
    const skipResize =
      (targetSize.width && targetSize.width > (inputMetadata.width || 0)) ||
      (targetSize.height && targetSize.height > (inputMetadata.height || 0));

    if (skipResize) {
      console.log(`File ${inputPath} is small enough, skipping.`);
      continue;
    }

    // Resize the image preserving the aspect ratio
    await sharp(originalAbsolutePath)
      .resize({ ...targetSize, withoutEnlargement: true })
      .toFile(inputAbsolutePath)
      .then(outputFileInfo => {
        console.log(
          `Resizing ${inputPath} (${inputFileInfo.size} → ${outputFileInfo.size})`,
        );
      });
  }

  return true;
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
