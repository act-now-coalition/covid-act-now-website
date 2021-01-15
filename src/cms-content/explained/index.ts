import {
  ArticleJSON,
  sortByDate,
  sanitizeArticle,
  createMapById,
} from '../articles/utils';

// Articles
import thirdSurge from '../articles/third-surge.json';
import asymptomaticSpread from '../articles/covid-explained-asymptomatic-spread-clarifying-the-who-statement.json';
import avoidInfection from '../articles/covid-explained-avoiding-infection-best-practices.json';
import vaccineProgress from '../articles/covid-explained-current-vaccine-progress.json';
import kidsAndCovid from '../articles/covid-explained-kids-and-covid-19.json';
import antigenTests from '../articles/covid-explained-rapid-antigen-tests-could-they-curb-the-pandemic.json';
import pathOfTheVirus from '../articles/covid-explained-the-path-of-the-virus.json';
import treatmentSevereIllness from '../articles/covid-explained-treatment-severe-illness.json';
import viralVariants from '../articles/covid-explained-viral-variants.json';

const orderedArticles = [
  vaccineProgress,
  thirdSurge,
  viralVariants,
  treatmentSevereIllness,
  avoidInfection,
  asymptomaticSpread,
  pathOfTheVirus,
  kidsAndCovid,
  antigenTests,
];

const articles: ArticleJSON[] = sortByDate(orderedArticles).map(
  sanitizeArticle,
);

export const articlesById = createMapById(articles);

export default articles;
