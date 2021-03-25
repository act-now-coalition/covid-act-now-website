import keyBy from 'lodash/keyBy';
import sortBy from 'lodash/sortBy';
import { Markdown, sanitizeID } from '../utils';
import indigenousPeoplesDay from './covid-impact-majority-native-american-counties.json';
import thirdSurge from './third-surge.json';
import canCompare from './can-compare.json';
import metros from './metros.json';
import {
  DateFormat,
  parseDateString,
  formatDateTime,
} from 'common/utils/time-utils';

interface ArticleMain {
  articleID: string;
  header: string;
  subtitle?: string;
  summary: Markdown;
  author?: Markdown;
  body: Markdown;
}

export interface ArticleJSON extends ArticleMain {
  date: string;
}

export interface Article extends ArticleMain {
  date: string;
}

function sanitizeArticle(article: ArticleJSON): Article {
  return {
    ...article,
    articleID: sanitizeID(article.articleID),
    date: formatDateTime(parseDateString(article.date), DateFormat.MM_DD_YYYY),
  };
}

const articleList: ArticleJSON[] = [
  thirdSurge,
  indigenousPeoplesDay,
  canCompare,
  metros,
];

// Makes sure articles are sorted by date (most recent first)
const sortedArticleList = sortBy(
  articleList,
  article => article.date,
).reverse();

const articles: Article[] = sortedArticleList.map(sanitizeArticle);

// Articles indexed by articleId for easier access on the
// individual article route
export const articlesById = keyBy(articles, 'articleID');

export default articles;
