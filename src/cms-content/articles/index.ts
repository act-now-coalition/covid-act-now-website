import moment from 'moment';
import { Markdown, sanitizeID } from '../utils';
import indigenousPeoplesDay from './covid-impact-majority-native-american-counties.json';
import thirdSurge from './third-surge.json';
import { keyBy } from 'lodash';

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

const articleList: ArticleJSON[] = [indigenousPeoplesDay, thirdSurge];

const articles: Article[] = articleList.map(sanitizeArticle);

// Articles indexed by articleId for easier access on the
// individual article route
export const articlesById = keyBy(articles, 'articleID');

export default articles;
