import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import { composeUrl, decomposeUrl } from 'common/utils/router';
import * as QueryString from 'query-string';

import PageWrapper from 'screens/utils/PageWrapper';

// this allows us to express redirects in their old format,
// without otherwise using react-router
import { generatePath, matchPath } from 'react-router';
const redirectRoutes = [
  // Homepage anchor redirects
  {
    exact: true,
    path: '/compare/:sharedComponentId?',
    to: '/?sharedComponentId=:sharedComponentId?#compare',
  },
  {
    exact: true,
    path: '/explore/:sharedComponentId?',
    to: '/?sharedComponentId=:sharedComponentId?#explore',
  },
  // /us/:stateId anchor redirects
  {
    exact: true,
    path: '/us/:stateId/chart/:chartId/',
    to: '/us/:stateId/#chart-:chartId',
  },
  {
    exact: true,
    path: '/us/:stateId/recommendations',
    to: '/us/:stateId/#recommendations',
  },
  {
    exact: true,
    path: '/us/:stateId/explore/:sharedComponentId?',
    to: '/us/:stateId/?sharedComponentId=:sharedComponentId?#explore',
  },
  {
    exact: true,
    path: '/us/:stateId/compare/:sharedComponentId?',
    to: '/us/:stateId/?sharedComponentId=:sharedComponentId?#compare',
  },
  // /us/:stateId/county/:countyId anchor redirects
  {
    exact: true,
    path: '/us/:stateId/county/:countyId/chart/:chartId',
    to: '/us/:stateId/county/:countyId/#chart-:chartId',
  },
  {
    exact: true,
    path: '/us/:stateId/county/:countyId/recommendations',
    to: '/us/:stateId/county/:countyId/#recommendations',
  },
  {
    exact: true,
    path: '/us/:stateId/county/:countyId/explore/:sharedComponentId?',
    to:
      '/us/:stateId/county/:countyId/?sharedComponentId=:sharedComponentId?#explore',
  },
  {
    exact: true,
    path: '/us/:stateId/county/:countyId/compare/:sharedComponentId?',
    to:
      '/us/:stateId/county/:countyId/?sharedComponentId=:sharedComponentId?#compare',
  },
  // /us/metro/:metroAreaUrlSegment anchor redirects
  {
    exact: true,
    path: '/us/metro/:metroAreaUrlSegment/chart/:chartId',
    to: '/us/metro/:metroAreaUrlSegment/#chart-:chartId',
  },
  {
    exact: true,
    path: '/us/metro/:metroAreaUrlSegment/recommendations',
    to: '/us/metro/:metroAreaUrlSegment/#recommendations',
  },
  {
    exact: true,
    path: '/us/metro/:metroAreaUrlSegment/explore/:sharedComponentId?',
    to:
      '/us/metro/:metroAreaUrlSegment/?sharedComponentId=:sharedComponentId?#explore',
  },
  {
    exact: true,
    path: '/us/metro/:metroAreaUrlSegment/compare/:sharedComponentId?',
    to:
      '/us/metro/:metroAreaUrlSegment/?sharedComponentId=:sharedComponentId?#compare',
  },
  // /deep-dives redirects
  {
    exact: true,
    path: '/deep-dives/:articleID',
    to: '/covid-explained/:articleID',
  },
  {
    exact: true,
    path: '/deep-dives',
    to: '/covid-explained',
  },
  // /state route redirects
  {
    exact: true,
    path: '/state/:stateId',
    to: '/us/:stateId',
  },
  {
    exact: true,
    path: '/state/:stateId/county/:countyId',
    to: '/us/:stateId/county/:countyId',
  },
];

const findRedirect = (location: string): string | null => {
  // extract original params and hash
  const { pathname, search, hash } = decomposeUrl(location);

  let redirectMatch = null;
  // use `some` to imitate `<Switch>` behavior of selecting only
  // the first to match
  redirectRoutes.some(routeConfig => {
    const match = matchPath(pathname, routeConfig);
    if (match) {
      // generate target
      const target = generatePath(routeConfig.to, match.params);

      const {
        pathname: newPathname,
        search: newSearch,
        hash: newHash,
      } = decomposeUrl(target);
      const combinedQuery = {
        ...Object.fromEntries(new URLSearchParams(search).entries()),
        ...Object.fromEntries(new URLSearchParams(newSearch).entries()),
      };
      // combine params and restore to URL
      redirectMatch = composeUrl({
        pathname: newPathname,
        search: QueryString.stringify(combinedQuery),
        hash: newHash || hash,
      });
    }
    return Boolean(match);
  });
  if (redirectMatch) {
    return redirectMatch;
  } else {
    return null;
  }
};

function Custom404() {
  const [content, setContent] = useState('Please check the URL and try again.');

  const router = useRouter();
  useEffect(() => {
    const redirect = findRedirect(router.asPath);
    if (redirect) {
      setContent(`Redirecting to: ${redirect}, please update your link.`);
      router.replace(redirect);
    }
  });

  return (
    <PageWrapper>
      <h1>Not Found</h1>
      <p>{content}</p>
    </PageWrapper>
  );
}

export default Custom404;
