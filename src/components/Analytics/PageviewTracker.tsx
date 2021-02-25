import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';
import { defaultTracker, legacyTracker } from './utils';

/**
 * Initialize Google Analytics
 */
function initializeGA() {
  const options = { debug: false };
  ReactGA.initialize(defaultTracker.trackingId, options);
  ReactGA.addTrackers([
    {
      trackingId: legacyTracker.trackingId,
      gaOptions: { name: legacyTracker.name },
      ...options,
    },
  ]);
}

/**
 * This React hook sends a pageview event to Google Analytics when the
 * URL path changes. It must be placed in a component inside the top-level
 * router in the application. Note that it will only send a pageview when
 * the `pathname` changes, ignoring changes in the query string or other
 * URL parameters.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Location
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
 */
function usePageTracking() {
  const location = useLocation();
  const { pathname } = location;
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      initializeGA();
      setInitialized(true);
    }
  }, [initialized]);

  useEffect(() => {
    if (initialized) {
      // We only add the legacy tracker explicitly here, because by default, GA
      // will send always send hits to the default tracker. We add a delay to
      // give the app time to update the page title.
      setTimeout(() => {
        ReactGA.pageview(pathname, [legacyTracker.name], document.title);
      }, 10);
    }
  }, [initialized, pathname]);
}

const PageviewTracker: React.FC = () => {
  usePageTracking();
  return <React.Fragment></React.Fragment>;
};

export default PageviewTracker;
