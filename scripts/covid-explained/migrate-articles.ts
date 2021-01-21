/**
 * Parses the content of the Covid Explained articles, transforms them to match
 * the CAN CMS structure and saves them under `src/cms-content/articles/`
 *
 * yarn covid-explained-migrate
 */
import fs from 'fs';
import path from 'path';
import { getItemsToMigrate, MigrationItem } from './utils';
import { transformInternalLinks } from './markdown-utils';
import { ArticleJSON } from '../../src/cms-content/articles';

const cmsArticlesPath = path.join(__dirname, '../../src/cms-content/articles/');

async function main() {
  const migrationItems: MigrationItem[] = await getItemsToMigrate();
  for (const item of migrationItems) {
    const transformedContent = transformInternalLinks(item.content.body);
    const canArticle: ArticleJSON = {
      date: item.content.date,
      articleID: item.canArticleId,
      header: item.content.title,
      subtitle: item.content.subtitle,
      // TODO: Add a summary and author
      summary: '',
      author: '',
      body: transformedContent,
    };

    const canArticleName = `covid-explained-${item.canArticleId}.json`;
    const canArticlePath = path.join(cmsArticlesPath, canArticleName);
    const articleContent = JSON.stringify(canArticle, null, 2);
    fs.writeFileSync(canArticlePath, articleContent);
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
