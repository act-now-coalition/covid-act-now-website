import {
  ArticleJSON,
  sortByDate,
  sanitizeArticle,
  createMapById,
} from '../articles/utils';

// Articles
import indigenousPeoplesDay from '../articles/covid-impact-majority-native-american-counties.json';
import canCompare from '../articles/can-compare.json';
import metros from '../articles/metros.json';

const articles: ArticleJSON[] = sortByDate([
  indigenousPeoplesDay,
  canCompare,
  metros,
]).map(sanitizeArticle);

export const articlesById = createMapById(articles);

export default articles;
