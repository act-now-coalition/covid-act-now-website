/**
 * Transforms content from Covid Explained to match the CMS structure of
 * Articles in COVID Act Now.
 *
 *
 *
 */

// import fs from 'fs';
// import path from 'path';
import { getContentToMigrate, MigrationArticle } from './utils';
// import { ArticleJSON } from '../../src/cms-content/articles/index';
import { logInternalLinks } from './markdown-utils';

async function main() {
  const items: MigrationArticle[] = await getContentToMigrate();
  for (const item of items) {
    console.log(item.originalPath);
    logInternalLinks(item.body);
  }
  return true;
}

async function reportInternalLinks() {
  const items: MigrationArticle[] = await getContentToMigrate();
  for (const item of items) {
    console.log(item.originalPath);
    logInternalLinks(item.body);
  }
  return true;
}

// function transformToCanArticle(item: MigrationArticle): ArticleJSON {
//   return {
//     date: item.date,
//     articleID: item.canArticleId,
//     header: item.title,
//     subtitle: item.subtitle,
//     summary: '',
//     body: transformArticleContent(item.body),
//   };
// }

// function getCanArticlePath(articleId: string) {
//   return path.join(
//     __dirname,
//     '../../src/cms-content/articles/',
//     `covid-explained-${articleId}.json`,
//   );
// }

if (require.main === module) {
  reportInternalLinks()
    .then(() => {
      console.log('Done');
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(-1);
    });
}
