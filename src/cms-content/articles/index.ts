import moment from 'moment';
import { Markdown, sanitizeID } from '../utils';
import { keyBy } from 'lodash';
import indigenousPeoplesDay from './covid-impact-majority-native-american-counties.json';
import thirdSurge from './third-surge.json';
import animap from './animap.json';
import canCompare from './can-compare.json';

interface ArticleMain {
  articleID: string;
  header: string;
  subtitle?: string;
  summary?: Markdown;
  author?: Markdown;
  body: Markdown;
}

interface ArticleJSON extends ArticleMain {
  date: string;
}

export interface Article extends ArticleMain {
  date: string;
}

function sanitizeArticle(article: ArticleJSON): Article {
  return {
    ...article,
    articleID: sanitizeID(article.articleID),
    date: moment(article.date).format('MMM Do, YYYY'),
  };
}

const articleList: ArticleJSON[] = [
  thirdSurge,
  indigenousPeoplesDay,
  animap,
  canCompare,
];

const articles: Article[] = articleList.map(sanitizeArticle);

// Articles indexed by articleId for easier access on the
// individual article route
export const articlesById = keyBy(articles, 'articleID');

export default articles;
