import {
  ArticleJSON,
  sortByDate,
  sanitizeArticle,
  createMapById,
} from '../articles/utils';

// Articles
import thirdSurge from '../articles/third-surge.json';

const articles: ArticleJSON[] = sortByDate([thirdSurge]).map(sanitizeArticle);

export const articlesById = createMapById(articles);

export default articles;
