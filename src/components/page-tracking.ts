import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

function initializeGA() {
  ReactGA.initialize('UA-160622988-1', {
    debug: true,
    titleCase: false,
  });

  ReactGA.addTrackers([
    {
      trackingId: 'G-HFCDC7K5G1',
      gaOptions: { name: 'tracker2' },
    },
  ]);
}

const usePageTracking = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initializeGA();
    setInitialized(true);
  }, []);

  const pathName = location.pathname;

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(pathName);
    }
  }, [initialized, pathName]);
};

export default usePageTracking;
