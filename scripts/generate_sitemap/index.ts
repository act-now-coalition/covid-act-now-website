import path from 'path';
import { concat } from 'lodash';
import { simpleSitemapAndIndex } from 'sitemap';
import {
  getLearnPageItems,
  getTopLevelPageItems,
  getLocationPageItems,
  getHomeImageItems,
} from './utils';

const destinationDir = path.join(__dirname, '../../public');

function main() {
  console.log('Generating the sitemap');
  const topLevelPageItems = getTopLevelPageItems();
  const locationPageItems = getLocationPageItems();
  const learnPageItems = getLearnPageItems();
  const homeImageItems = getHomeImageItems();

  const urlList = concat(
    topLevelPageItems,
    locationPageItems,
    learnPageItems,
    homeImageItems,
  );
  console.log(`Total URLs: ${urlList.length}`);

  simpleSitemapAndIndex({
    hostname: 'https://covidactnow.org',
    destinationDir,
    sourceData: urlList,
  });
  console.log('Done.');
}

if (require.main === module) {
  main();
}
