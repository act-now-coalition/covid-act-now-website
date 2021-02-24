import { concat } from 'lodash';
import { SitemapItemLoose } from 'sitemap';
import urlJoin from 'url-join';
import regions from '../../src/common/regions';
import { getMapImageUrl } from '../../src/common/urls';
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
  const relativeUrlList: (SitemapItemLoose | string)[] = [
    {
      url: '/',
      img: [
        {
          url: getMapImageUrl(),
          title: 'Realtime U.S. COVID Risk Map',
          caption:
            'A map of the United States colored by the risk level of each county',
        },
      ],
    },
    '/donate',
    '/about',
    '/data-api',
    '/contact',
    '/terms',
    '/privacy',
  ];
  return relativeUrlList.map(createSitemapItem);
}

function createSitemapItem(entry: string | SitemapItemLoose): SitemapItemLoose {
  if (typeof entry === 'string') {
    return { url: entry };
  } else {
    return entry;
  }
}
