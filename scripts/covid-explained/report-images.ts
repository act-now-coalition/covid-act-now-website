/**
 * Parses the content of the Covid Explained articles to migrate and logs
 * internal links.
 *
 * yarn covid-explained-images
 */
import { getItemsToMigrate } from './utils';
import { logImages } from './markdown-utils';

async function main() {
  const migrationItems = await getItemsToMigrate();
  for (const item of migrationItems) {
    console.log(item.originalPath);
    logImages(item.content.body);
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
