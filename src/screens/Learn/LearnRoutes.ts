import Landing from './Landing/Landing';
import Faq from './Faq/Faq';
import Glossary from './Glossary/Glossary';
import ArticlesLanding from './Articles/ArticlesLanding';
import Article from './Articles/Article';
import MetricExplainer from './MetricExplainer/MetricExplainer';

const routes = [
  {
    path: '/learn',
    component: Landing,
  },
  {
    path: '/explained',
    redirectTo: '/learn',
  },
  {
    path: '/faq',
    component: Faq,
  },
  {
    path: '/glossary',
    component: Glossary,
  },
  {
    path: '/covid-risk-levels-metrics',
    component: MetricExplainer,
  },
  {
    path: '/deep-dives',
    component: ArticlesLanding,
    exact: true,
  },
  {
    path: '/deep-dives/:articleId',
    component: Article,
  },
];

export default routes;
