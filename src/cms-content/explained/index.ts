import { ArticleJSON, sanitizeArticle, createMapById } from '../articles/utils';

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
import vaccineBasics from '../articles/covid-vaccine-basics.json';
import variantsAndVaccines from '../articles/covid-variants-vaccines.json';
import immunity from '../articles/covid-immunity.json';
import indigenousPeoplesDay from '../articles/covid-impact-majority-native-american-counties.json';
import metros from '../articles/metros.json';
import schoolGuidance from '../articles/school-guidance.json';

const orderedArticles = [
  variantsAndVaccines,
  vaccineProgress,
  vaccineBasics,
  immunity,
  thirdSurge,
  viralVariants,
  treatmentSevereIllness,
  avoidInfection,
  asymptomaticSpread,
  pathOfTheVirus,
  kidsAndCovid,
  antigenTests,
  indigenousPeoplesDay,
  metros,
  schoolGuidance,
];

const articles: ArticleJSON[] = orderedArticles.map(sanitizeArticle);

export const articlesById = createMapById(articles);

export default articles;
