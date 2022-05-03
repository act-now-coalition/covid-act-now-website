import React, { useCallback } from 'react';
import USMap from './USMap';
import { vaccineColorFromLocationSummary } from 'common/colors';
import { useSummaries } from 'common/location_summaries';
import { ScreenshotReady } from 'components/Screenshot';
import { findStateByFipsCodeStrict } from 'common/regions';
import { TooltipMode } from './USMapTooltip';
import { ActiveRegionStyle } from './utils';
import { Metric } from 'common/metricEnum';
import VaccineTooltip from './VaccineTooltip/VaccineTooltip';

interface MapProps {
  showCounties?: boolean;
  tooltipMode?: TooltipMode;
}

function USVaccineMap({
  showCounties = false,
  tooltipMode = TooltipMode.ACTIVATE_ON_HOVER,
}: MapProps) {
  const locationSummaries = useSummaries();

  const getFillColor = useCallback(
    (fips: string) => {
      return vaccineColorFromLocationSummary(locationSummaries?.[fips]);
    },
    [locationSummaries],
  );

  const renderTooltip = useCallback(
    (stateFipsCode: string, tooltipMode: TooltipMode) => {
      const state = findStateByFipsCodeStrict(stateFipsCode);
      const summary = locationSummaries?.[stateFipsCode];
      const vaccinationsInitiated = summary?.vc || 0;
      const vaccinationsCompleted = summary?.vb || 0;
      const addMoreDataLink = tooltipMode === TooltipMode.ACTIVATE_ON_CLICK;
      return (
        <VaccineTooltip
          state={state}
          vaccinationsInitiated={vaccinationsInitiated}
          vaccinationsCompleted={vaccinationsCompleted}
          addMoreDataLink={addMoreDataLink}
        />
      );
    },
    [locationSummaries],
  );

  return (
    <div className="Map">
      <div className="us-state-map">
        <USMap
          showCounties={showCounties}
          getFillColor={getFillColor}
          renderTooltip={renderTooltip}
          tooltipMode={tooltipMode}
          activeRegionStyle={ActiveRegionStyle.OUTLINE}
        />
        {locationSummaries && <ScreenshotReady />}
      </div>
    </div>
  );
}

export default USVaccineMap;
