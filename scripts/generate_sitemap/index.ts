import path from 'path';
import { concat } from 'lodash';
import { simpleSitemapAndIndex } from 'sitemap';
import {
  getLearnPageItems,
  getTopLevelPageItems,
  getLocationPageItems,
} from './utils';

const destinationDir = path.join(__dirname, '../../build');

function main() {
  console.log('Generating the sitemap');
  const topLevelPageItems = getTopLevelPageItems();
  const locationPageItems = getLocationPageItems();
  const learnPageItems = getLearnPageItems();

  const urlList = concat(topLevelPageItems, locationPageItems, learnPageItems);
  console.log(`Total URLs: ${urlList.length}`);

  return simpleSitemapAndIndex({
    hostname: 'https://covidactnow.org',
    destinationDir,
    sourceData: urlList,
  });
}

if (require.main === module) {
  main()
    .catch(err => {
      console.error(err);
      process.exit(-1);
    })
    .then(() => {
      console.log('Done.');
    });
}
