import path from 'path';
import fs from 'fs';

const covidExplainedPath = path.join(__dirname, '../../../covid-explained');

const migrationItems = [
  {
    originalPath:
      'assets/content/basics/conversations-with-experts-immunity.json',
    canArticleId: 'conversations-with-experts-immunity',
  },
  {
    originalPath: 'assets/content/basics/the-path-of-the-virus.json',
    canArticleId: 'the-path-of-the-virus',
  },
  {
    originalPath: 'assets/content/basics/testing.json',
    canArticleId: 'testing',
  },
  {
    originalPath:
      'assets/content/other/antigen-tests-whats-the-hype-about.json',
    canArticleId: 'antigen-tests-whats-the-hype-about',
  },
  {
    originalPath: 'assets/content/basics/masks-what-is-the-deal.json',
    canArticleId: 'masks-what-is-the-deal',
  },
  {
    originalPath: 'assets/content/basics/when-to-seek-care.json',
    canArticleId: 'when-to-seek-care',
  },
  {
    originalPath: 'assets/content/basics/vaccines.json',
    canArticleId: 'vaccines',
  },
  {
    originalPath: 'assets/content/basics/when-to-seek-care.json',
    canArticleId: 'when-to-seek-care',
  },
];

interface CovidExplainedArticle {
  date: string;
  title: string;
  subtitle: string;
  body: string; // Markdown
}

async function readArticleBasics(
  relativePath: string,
): Promise<CovidExplainedArticle> {
  const filePath = path.join(covidExplainedPath, relativePath);
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
}

export const contentToMigrate = migrationItems.map(async ({ originalPath }) => {
  const article = await readArticleBasics(originalPath);
  return {
    originalPath: originalPath,
    ...article,
  };
});

export interface MigrationArticle extends CovidExplainedArticle {
  originalPath: string;
  canArticleId: string;
}

export async function getContentToMigrate(): Promise<MigrationArticle[]> {
  const items = [];
  for (const item of migrationItems) {
    const { originalPath, canArticleId } = item;
    const article = await readArticleBasics(originalPath);
    items.push({
      ...article,
      originalPath,
      canArticleId,
    });
  }
  return items;
}
