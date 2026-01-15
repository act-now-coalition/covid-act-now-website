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
    '/case-studies',
  ];

  const caseStudyUrls = allCaseStudies.map(caseStudy =>
    urlJoin('/case-studies', caseStudy.caseStudyId),
  );

  const allLearnUrls = concat(
    topLevelRelativeUrls,
    caseStudyUrls,
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
    '/about',
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
