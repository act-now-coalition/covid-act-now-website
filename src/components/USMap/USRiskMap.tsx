import React, { useCallback } from 'react';
import USMap from './USMap';
import { colorFromLocationSummary } from 'common/colors';
import { useSummaries } from 'common/location_summaries';
import { ScreenshotReady } from 'components/Screenshot';

interface MapProps {
  showCounties?: boolean;
}

function USRiskMap({ showCounties = false }: MapProps) {
  const locationSummaries = useSummaries();

  const getFillColor = useCallback(
    (fips: string) => {
      const summary = (locationSummaries && locationSummaries[fips]) || null;
      return colorFromLocationSummary(summary);
    },
    [locationSummaries],
  );

  return (
    <div className="Map">
      <div className="us-state-map">
        <USMap showCounties={showCounties} getFillColor={getFillColor} />
        {locationSummaries && <ScreenshotReady />}
      </div>
    </div>
  );
}

export default USRiskMap;
