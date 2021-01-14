import { concat } from 'lodash';
import { SitemapItemLoose } from 'sitemap';
import urlJoin from 'url-join';
import regions from '../../src/common/regions';
import { allCaseStudies } from '../../src/cms-content/learn';
import articles from '../../src/cms-content/articles';

export function getLocationPageItems(): SitemapItemLoose[] {
  return regions.all().map(region => createSitemapItem(region.relativeUrl));
}

export function getLearnPageItems(): SitemapItemLoose[] {
  const topLevelRelativeUrls = [
    '/learn',
    '/glossary',
    '/faq',
    '/case-studies',
    '/covid-explained',
    '/covid-risk-levels-metrics',
  ];

  const caseStudyUrls = allCaseStudies.map(caseStudy =>
    urlJoin('/case-studies', caseStudy.caseStudyId),
  );

  const covidExplainedUrls = articles.map(article =>
    urlJoin('/covid-explained', article.articleID),
  );

  const allLearnUrls = concat(
    topLevelRelativeUrls,
    caseStudyUrls,
    covidExplainedUrls,
  );

  return allLearnUrls.map(createSitemapItem);
}

export function getTopLevelPageItems(): SitemapItemLoose[] {
  const relativeUrlList = [
    '/',
    '/donate',
    '/about',
    '/tools',
    '/contact',
    '/terms',
    '/privacy',
  ];
  return relativeUrlList.map(createSitemapItem);
}

function createSitemapItem(url: string) {
  return { url };
}
