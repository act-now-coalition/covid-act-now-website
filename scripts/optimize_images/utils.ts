import path from 'path';

const RASTER_EXTENSIONS = ['jpg', 'jpeg', 'png'];

export interface ImageSize {
  width?: number;
  height?: number;
}

export interface ImageInfo extends ImageSize {
  inputPath: string;
  originalPath: string;
}

export function isRasterImage(imagePath: string) {
  const { ext } = path.parse(path.join(__dirname, '../../', imagePath));
  const fileExtension = ext.slice(1);
  return RASTER_EXTENSIONS.includes(fileExtension);
}

export function joinPublicFolder(imagePath: string) {
  return path.join('public', imagePath);
}

export function absolutePath(relativePath: string) {
  return path.join(__dirname, '../../', relativePath);
}

export function cmsOriginalPath(inputRelativePath: string) {
  const { ext, name } = path.parse(inputRelativePath);
  const backupName = `${name}-original${ext}`;
  return path.join('src/assets/original_cms_images', backupName);
}

// Duplicate the input pixel size for better resolution on retina displays
export function doubleSize(sizeParams: ImageSize): ImageSize {
  if (sizeParams.width) {
    return { width: 2 * sizeParams.width };
  }
  if (sizeParams.height) {
    return { height: 2 * sizeParams.height };
  }
  return {};
}
