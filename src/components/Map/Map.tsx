import React from 'react';
import '../../App.css'; /* optional for styling like the :hover pseudo-class */
import { Level } from 'common/level';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { Legend, LegendItem } from './Legend';
import USACountyMap from './USACountyMap';
import { MapInstructions, MobileLineBreak } from './Map.style';

interface MapProps {
  hideLegend?: boolean;
  hideInstructions?: boolean;
  hideLegendTitle?: boolean;
  onClick?: () => void;
  showCounties?: boolean;
}

function Map({
  hideLegend = false,
  hideInstructions = false,
  hideLegendTitle = false,
  onClick = () => {},
  showCounties = false,
}: MapProps) {
  // TODO(chris): The only user of `onClick` is the embed. When you click on a state
  // it eventually navigates you to the home page. If we want the action of clicking
  // on a state to take you to the home page, we should change the link in USACountyMap
  // rather than redirecting here.
  const handleClick = React.useCallback(
    stateName => {
      // externally provided click handler
      if (Boolean(onClick)) {
        onClick();
      }
    },
    [onClick],
  );

  return (
    <div className="Map">
      {!hideLegend && (
        <Legend hideLegendTitle={hideLegendTitle}>
          <LegendItem
            key={'legend-5'}
            title={LOCATION_SUMMARY_LEVELS[Level.SUPER_CRITICAL].summary || ''}
            color={LOCATION_SUMMARY_LEVELS[Level.SUPER_CRITICAL].color}
          />
          <LegendItem
            key={'legend-4'}
            title={LOCATION_SUMMARY_LEVELS[Level.CRITICAL].summary || ''}
            color={LOCATION_SUMMARY_LEVELS[Level.CRITICAL].color}
          />
          <LegendItem
            key={'legend-3'}
            title={LOCATION_SUMMARY_LEVELS[Level.HIGH].summary || ''}
            color={LOCATION_SUMMARY_LEVELS[Level.HIGH].color}
          />
          <LegendItem
            key={'legend-2'}
            title={LOCATION_SUMMARY_LEVELS[Level.MEDIUM].summary || ''}
            color={LOCATION_SUMMARY_LEVELS[Level.MEDIUM].color}
          />
          <LegendItem
            key={'legend-1'}
            title={LOCATION_SUMMARY_LEVELS[Level.LOW].summary || ''}
            color={LOCATION_SUMMARY_LEVELS[Level.LOW].color}
          />
        </Legend>
      )}
      <div className="us-state-map">
        <USACountyMap
          stateClickHandler={handleClick}
          showCounties={showCounties}
        />
      </div>
      {!hideInstructions && (
        <MapInstructions>
          <strong>Click a state</strong> to view risk details{' '}
          <MobileLineBreak /> and county info.
        </MapInstructions>
      )}
    </div>
  );
}

export default Map;
