const fs = require('fs');
const util = require('util');
const path = require('path');
const sharp = require('sharp');

// Resize images to constant width / height
// removing resized images: find public/images/endorsers -regex ".*resized.*" -delete
(async () => {
  const width = 100;
  const height = 100;
  const imageFolder = 'endorsers';

  try {
    const readdirAsync = util.promisify(fs.readdir);
    const directoryPath = path.join(
      __dirname,
      `../public/images/${imageFolder}`,
    );

    const files = await readdirAsync(directoryPath);

    for (const file of files) {
      const [fileName, exstension] = file.split('.');

      const inputFilePath = `${directoryPath}/${file}`;
      const outputFilePath = `${directoryPath}/${fileName}__resized-${width}-${height}.${exstension}`;

      console.log(`resizing ${inputFilePath}`);

      await sharp(inputFilePath)
        .resize({
          width,
          height,
        })
        .toFile(outputFilePath);

      console.log(`resized to  ${outputFilePath}`);
    }

    process.exit();
  } catch (err) {
    console.log(err);

    process.exit();
  }
})();
