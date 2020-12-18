import { concat, chain } from 'lodash';
import { EnumChangefreq, SitemapItemLoose } from 'sitemap';
import urlJoin from 'url-join';
import regions from '../../src/common/regions';
import { allCaseStudies } from '../../src/cms-content/learn';
import articles from '../../src/cms-content/articles';

export function getLocationPageItems(): SitemapItemLoose[] {
  return chain(regions.all())
    .map(region => ({
      url: region.relativeUrl,
      changefreq: EnumChangefreq.DAILY,
    }))
    .value();
}

export function getLearnPageItems(): SitemapItemLoose[] {
  const topLevelRelativeUrls = [
    '/learn',
    '/glossary',
    '/faq',
    '/case-studies',
    '/deep-dives',
    '/covid-risk-levels-metrics',
  ];

  const caseStudyUrls = allCaseStudies.map(caseStudy =>
    urlJoin('/case-studies/', caseStudy.caseStudyId),
  );

  const deepDiveUrls = articles.map(article =>
    urlJoin('/deep-dives', article.articleID),
  );

  const allLearnUrls = concat(
    topLevelRelativeUrls,
    caseStudyUrls,
    deepDiveUrls,
  );

  return allLearnUrls.map(relativeUrl => ({
    url: relativeUrl,
    changefreq: EnumChangefreq.DAILY,
  }));
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
  return relativeUrlList.map(relativeUrl => ({
    url: relativeUrl,
    changefreq: EnumChangefreq.DAILY,
  }));
}
