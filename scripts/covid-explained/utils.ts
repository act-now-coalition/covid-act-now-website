import fs from 'fs-extra';

import path from 'path';

// Update the path to match the location of the covid-explained repository
const covidExplainedPath = path.join(__dirname, '../../../covid-explained');

interface MigrationInfo {
  originalPath: string;
  canArticleId: string;
}

export interface MigrationItem extends MigrationInfo {
  content: {
    body: string;
    title: string;
    date: string;
    subtitle: string;
    featured: boolean;
    rank: string;
  };
}

// This list contains the information we need to migrate articles from Covid
// Explained to CAN. The content of the original file will be transformed to
// match the structure of our articles, and saved under src/cms-content/articles
// using the canArticleId
const migrationItems: MigrationInfo[] = [
  {
    originalPath:
      'assets/content/other/asymptomatic-spread-clarifying-the-who-statement.json',
    canArticleId: 'asymptomatic-spread-clarifying-the-who-statement',
  },
  {
    originalPath: 'assets/content/basics/the-path-of-the-virus.json',
    canArticleId: 'the-path-of-the-virus',
  },
  {
    originalPath:
      'assets/content/other/antigen-tests-whats-the-hype-about.json',
    canArticleId: 'antigen-tests-whats-the-hype-about',
  },
  {
    originalPath: 'assets/content/kids/kids-and-covid-19.json',
    canArticleId: 'kids-and-covid-19',
  },
  {
    originalPath: 'assets/content/basics/treatment-severe-illness.json',
    canArticleId: 'treatment-severe-illness',
  },
  {
    originalPath:
      'assets/content/basics/avoiding-infection-best-practices.json',
    canArticleId: 'avoiding-infection-best-practices',
  },
  {
    originalPath: 'assets/content/basics/current-vaccine-progress.json',
    canArticleId: 'current-vaccine-progress',
  },
];

export async function getItemsToMigrate(): Promise<MigrationItem[]> {
  fs.ensureDirSync(covidExplainedPath);
  const items: MigrationItem[] = [];
  for (const item of migrationItems) {
    const { originalPath, canArticleId } = item;
    const filePath = path.join(covidExplainedPath, originalPath);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    items.push({
      originalPath,
      canArticleId,
      content: JSON.parse(fileContent),
    });
  }
  return items;
}
