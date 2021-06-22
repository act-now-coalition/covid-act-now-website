import React, { useCallback } from 'react';
import USMap from './USMap';
import { colorFromLocationSummary } from 'common/colors';
import { useSummaries } from 'common/location_summaries';
import { ScreenshotReady } from 'components/Screenshot';
import { findStateByFipsCodeStrict } from 'common/regions';
import { TooltipMode } from './USMapTooltip';
import { ActiveRegionStyle } from './utils';
import { RiskMapTooltip } from './USRiskMap.style';

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

  const renderTooltip = useCallback((stateFipsCode: string) => {
    const state = findStateByFipsCodeStrict(stateFipsCode);
    return <RiskMapTooltip>{state.fullName}</RiskMapTooltip>;
  }, []);

  return (
    <div className="Map">
      <div className="us-state-map">
        <USMap
          showCounties={showCounties}
          getFillColor={getFillColor}
          renderTooltip={renderTooltip}
          tooltipMode={TooltipMode.ACTIVATE_ON_HOVER}
          activeRegionStyle={ActiveRegionStyle.HIGHLIGHT}
        />
        {locationSummaries && <ScreenshotReady />}
      </div>
    </div>
  );
}

export default USRiskMap;
