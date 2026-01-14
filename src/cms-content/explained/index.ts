import { ArticleJSON, createMapById } from '../articles/utils';

const articles: ArticleJSON[] = [];

export const articlesById = createMapById(articles);

export default articles;
