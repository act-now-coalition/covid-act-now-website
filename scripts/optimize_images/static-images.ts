import fs from 'fs';
import path from 'path';
import { chain, concat, difference } from 'lodash';
import { teams } from '../../src/cms-content/team';
import aboutContent from '../../src/cms-content/about';
import { allCaseStudies } from '../../src/cms-content/learn';
import {
  ImageInfo,
  isRasterImage,
  joinPublicFolder,
  cmsOriginalPath,
  absolutePath,
} from './utils';

const staticImages: ImageInfo[] = [
  {
    inputPath: 'src/assets/images/ghss.png',
    originalPath: 'src/assets/images/ghss-original.png',
    width: 216,
  },
  {
    inputPath: 'src/assets/images/cerc.png',
    originalPath: 'src/assets/images/cerc-original.png',
    width: 216,
  },
  {
    inputPath: 'src/assets/images/harvard.png',
    originalPath: 'src/assets/images/harvard-original.png',
    width: 216,
  },
  {
    inputPath: 'src/assets/images/instagram_icon.png',
    originalPath: 'src/assets/images/instagram_icon-original.png',
    width: 40,
  },
  {
    inputPath: 'src/assets/images/response-simulator-screenshot.png',
    originalPath:
      'src/assets/images/response-simulator-screenshot-original.png',
    width: 450,
  },
  {
    inputPath: 'src/assets/images/covid-act-now-logo-url-dark.png',
    originalPath: 'src/assets/images/covid-act-now-logo-url-dark-original.png',
    height: 32,
  },
];

/**
 * CMS Images
 *
 * Images from the CMS are resized according to their usage. When they are
 * rendered in more than one place, we keep the size of the largest instance.
 */
const profilePictures: ImageInfo[] = chain(teams)
  .flatMap(team => team.teamMembers)
  .map(userProfile => joinPublicFolder(userProfile.profileImgUrl))
  .filter(isRasterImage)
  .map((imagePath: string) => ({
    inputPath: imagePath,
    originalPath: cmsOriginalPath(imagePath),
    width: 64,
  }))
  .value();

const governmentLogos = chain(aboutContent.governmentLogos)
  .map(logoInfo => joinPublicFolder(logoInfo.image))
  .filter(isRasterImage)
  .map((imagePath: string) => ({
    inputPath: imagePath,
    originalPath: cmsOriginalPath(imagePath),
    width: 200,
  }))
  .value();

const partnersLogos = chain(aboutContent.partnersContent)
  .flatMap(partnerContent => partnerContent.logos)
  .map(logoInfo => joinPublicFolder(logoInfo.image))
  .filter(isRasterImage)
  .map((imagePath: string) => ({
    inputPath: imagePath,
    originalPath: cmsOriginalPath(imagePath),
    width: 200,
  }))
  .value();

const caseStudyLogos = chain(allCaseStudies)
  .map(caseStudy => joinPublicFolder(caseStudy.logoUrl))
  .filter(isRasterImage)
  .map((imagePath: string) => ({
    inputPath: imagePath,
    originalPath: cmsOriginalPath(imagePath),
    height: 64,
  }))
  .value();

const cmsStructuredImages = concat(
  profilePictures,
  governmentLogos,
  partnersLogos,
  caseStudyLogos,
);

const cmsStructuredImageFilenames = cmsStructuredImages.map(
  imageInfo => imageInfo.inputPath,
);

const allCmsImages = fs
  .readdirSync(absolutePath('public/images_cms'))
  .filter(isRasterImage)
  .map(imgFilename => path.join('public/images_cms', imgFilename));

const remainingCmsImages = difference(
  allCmsImages,
  cmsStructuredImageFilenames,
);

// If a CMS image is not found in the list of images to process from the CMS
// (images that we know how they will be used), resize them to be 600px
// (x2 for retina), which is a bit bigger than what we need (450px) to have
// a safety margin.
const cmsRemainingImages = remainingCmsImages.map((imagePath: string) => ({
  inputPath: imagePath,
  originalPath: cmsOriginalPath(imagePath),
  width: 600,
}));

export default concat(staticImages, cmsStructuredImages, cmsRemainingImages);
