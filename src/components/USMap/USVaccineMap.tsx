import React, { useCallback } from 'react';
import USMap from './USMap';
import { vaccineColorFromLocationSummary } from 'common/colors';
import { useSummaries } from 'common/location_summaries';
import { ScreenshotReady } from 'components/Screenshot';
import { findStateByFipsCodeStrict } from 'common/regions';

interface MapProps {
  showCounties?: boolean;
}

function USVaccineMap({ showCounties = false }: MapProps) {
  const locationSummaries = useSummaries();

  const getFillColor = useCallback(
    (fips: string) => {
      return vaccineColorFromLocationSummary(locationSummaries?.[fips]);
    },
    [locationSummaries],
  );

  const renderTooltip = useCallback((stateFipsCode: string) => {
    const state = findStateByFipsCodeStrict(stateFipsCode);
    return state.fullName;
  }, []);

  return (
    <div className="Map">
      <div className="us-state-map">
        <USMap
          showCounties={showCounties}
          getFillColor={getFillColor}
          renderTooltip={renderTooltip}
        />
        {locationSummaries && <ScreenshotReady />}
      </div>
    </div>
  );
}

export default USVaccineMap;
