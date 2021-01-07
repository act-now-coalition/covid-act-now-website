import fs from 'fs';
import sharp from 'sharp';
import staticImages from './static-images';
import { absolutePath, doubleSize } from './utils';

async function main() {
  for (const imageInfo of staticImages) {
    const { inputPath, backupPath, ...sizeParams } = imageInfo;
    const inputAbsolutePath = absolutePath(inputPath);

    if (!fs.existsSync(inputAbsolutePath)) {
      console.log(`Image ${inputAbsolutePath} not found, skipping.`);
      continue;
    }
    const backupAbsolutePath = absolutePath(backupPath);

    // Do not overwrite the backup copy if it already exists
    if (!fs.existsSync(backupAbsolutePath)) {
      fs.renameSync(inputAbsolutePath, backupAbsolutePath);
    }

    // Resize the image preserving the aspect ratio
    console.log(`Resizing ${inputPath}`);
    await sharp(backupAbsolutePath)
      .resize(doubleSize(sizeParams))
      .toFile(inputAbsolutePath);
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
