import React from 'react';
import '../../App.css'; /* optional for styling like the :hover pseudo-class */
import { useHistory } from 'react-router-dom';
import { REVERSED_STATES } from 'common';
import { Level } from 'common/level';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { Legend, LegendItem } from './Legend';
import USACountyMap from './USACountyMap';
import { MAP_FILTERS } from '../../screens/LocationPage/Enums/MapFilterEnums';
import { MapInstructions, MobileLineBreak } from './Map.style';

// TODO(@pablo): We might want to move this to LOCATION_SUMMARY_LEVELS

function Map({
  hideLegend = false,
  hideInstructions = false,
  hideLegendTitle = false,
  setMobileMenuOpen,
  setMapOption,
  onClick = null,
  isMiniMap = false,
}) {
  const history = useHistory();

  const goToStatePage = page => {
    window.scrollTo(0, 0);
    history.push(page);
  };

  const handleClick = stateName => {
    // externally provided click handler
    if (onClick) {
      return onClick(stateName);
    }

    const stateCode = REVERSED_STATES[stateName];

    goToStatePage(`/us/${stateCode.toLowerCase()}`);

    if (setMapOption) {
      setMapOption(MAP_FILTERS.STATE);
    }

    if (setMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="Map">
      {!hideLegend && (
        <Legend hideLegendTitle={hideLegendTitle}>
          <LegendItem
            key={'legend-4'}
            title={LOCATION_SUMMARY_LEVELS[Level.CRITICAL].summary}
            color={LOCATION_SUMMARY_LEVELS[Level.CRITICAL].color}
          />
          <LegendItem
            key={'legend-3'}
            title={LOCATION_SUMMARY_LEVELS[Level.HIGH].summary}
            color={LOCATION_SUMMARY_LEVELS[Level.HIGH].color}
          />
          <LegendItem
            key={'legend-2'}
            title={LOCATION_SUMMARY_LEVELS[Level.MEDIUM].summary}
            color={LOCATION_SUMMARY_LEVELS[Level.MEDIUM].color}
          />
          <LegendItem
            key={'legend-1'}
            title={LOCATION_SUMMARY_LEVELS[Level.LOW].summary}
            color={LOCATION_SUMMARY_LEVELS[Level.LOW].color}
          />
        </Legend>
      )}
      <div className="us-state-map">
        <USACountyMap condensed={hideLegend} stateClickHandler={handleClick} />
      </div>
      {!hideInstructions && (
        <MapInstructions $isMiniMap={isMiniMap}>
          <strong>Click a state</strong> to view risk details{' '}
          <MobileLineBreak /> and county info.
        </MapInstructions>
      )}
    </div>
  );
}

export default Map;
