/**
 * Log internal links from Covid Explained content. The script assumes that
 *
 *
 *
 */

import { getContentToMigrate, MigrationArticle } from './utils';
import { logInternalLinks } from './markdown-utils';

async function main() {
  const items: MigrationArticle[] = await getContentToMigrate();
  for (const item of items) {
    console.log(item.originalPath);
    logInternalLinks(item.body);
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
