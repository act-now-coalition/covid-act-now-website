import moment from 'moment';
import { Markdown, sanitizeID } from '../utils';
import indigenousPeoplesDay from './indigenous-peoples-day.json';

interface ArticleMain {
  articleID: string;
  header: string;
  subtitle: string;
  summary: Markdown;
  author: Markdown;
  body: Markdown;
}

interface ArticleJSON extends ArticleMain {
  date: string;
}

export interface Article extends ArticleMain {
  date: Date;
}

function sanitizeArticle(article: ArticleJSON): Article {
  return {
    ...article,
    articleID: sanitizeID(article.articleID),
    date: moment(article.date).toDate(),
  };
}

const articleList: ArticleJSON[] = [indigenousPeoplesDay];

const articles: Article[] = articleList.map(sanitizeArticle);
export default articles;
