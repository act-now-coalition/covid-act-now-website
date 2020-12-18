import { concat, chain } from 'lodash';
import { SitemapItemLoose } from 'sitemap';
import urlJoin from 'url-join';
import regions from '../../src/common/regions';
import { allCaseStudies } from '../../src/cms-content/learn';
import articles from '../../src/cms-content/articles';
import shareImagesData from '../../src/assets/data/share_images_url.json';

const shareImageBaseUrl = shareImagesData.share_image_url;

export function getLocationPageItems(): SitemapItemLoose[] {
  return chain(regions.all())
    .map(region => ({
      url: region.relativeUrl,
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
  }));
}

export function getHomeImageItems(): SitemapItemLoose[] {
  const homeMapUrl = urlJoin(shareImageBaseUrl, 'home.png');

  const items = [
    {
      url: '/',
      img: [
        {
          url: homeMapUrl,
          caption: 'Realtime US COVID Risk Map & Key Metrics',
          title: 'Realtime US COVID Risk Map & Key Metrics',
          geoLocation: 'United States',
          // license
        },
      ],
    },
  ];
  return items;
}
