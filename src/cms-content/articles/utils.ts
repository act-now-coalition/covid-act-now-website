import moment from 'moment';
import { Markdown, sanitizeID } from '../utils';
import { keyBy, sortBy } from 'lodash';

export interface ArticleMain {
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

export function sanitizeArticle(article: ArticleJSON): Article {
  return {
    ...article,
    articleID: sanitizeID(article.articleID),
    date: moment(article.date).format('MMM Do, YYYY'),
  };
}

export function sortByDate(articles: ArticleJSON[]) {
  return sortBy(articles, article => article.date).reverse();
}

export function createMapById(articles: ArticleJSON[]) {
  return keyBy(articles, 'articleID');
}
