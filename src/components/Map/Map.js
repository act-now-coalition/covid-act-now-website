import React, { useState } from 'react';
import '../../App.css'; /* optional for styling like the :hover pseudo-class */
import { useHistory } from 'react-router-dom';
import { REVERSED_STATES } from 'common';
import { Level } from 'common/level';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { Legend, LegendItem } from './Legend';
import USACountyMap from './USACountyMap';
import { MAP_FILTERS } from '../../screens/LocationPage/Enums/MapFilterEnums';
import ReactTooltip from 'react-tooltip';
import { MapInstructions, MobileLineBreak } from './Map.style';

// TODO(@pablo): We might want to move this to LOCATION_SUMMARY_LEVELS
const LEGEND_LOW = 'On track to contain COVID';
const LEGEND_MEDIUM = 'Controlled disease growth';
const LEGEND_MEDIUM_HIGH = 'At risk';
const LEGEND_HIGH = 'Active or imminent outbreak';

function Map({ hideLegend = false, setMobileMenuOpen, setMapOption }) {
  const history = useHistory();
  const [content, setContent] = useState('');

  const goToStatePage = page => {
    window.scrollTo(0, 0);
    history.push(page);
  };

  const onClick = stateName => {
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
        <Legend>
          <LegendItem
            key={'legend-4'}
            title={LEGEND_HIGH}
            color={LOCATION_SUMMARY_LEVELS[Level.CRITICAL].color}
          />
          <LegendItem
            key={'legend-3'}
            title={LEGEND_MEDIUM_HIGH}
            color={LOCATION_SUMMARY_LEVELS[Level.MEDIUM_HIGH].color}
          />
          <LegendItem
            key={'legend-2'}
            title={LEGEND_MEDIUM}
            color={LOCATION_SUMMARY_LEVELS[Level.MEDIUM].color}
          />
          <LegendItem
            key={'legend-1'}
            title={LEGEND_LOW}
            color={LOCATION_SUMMARY_LEVELS[Level.LOW].color}
          />
        </Legend>
      )}
      <div className="us-state-map">
        <USACountyMap
          condensed={hideLegend}
          setTooltipContent={setContent}
          stateClickHandler={onClick}
        />
      </div>
      {!hideLegend && (
        <MapInstructions>
          <strong>Click a state</strong> to view risk details{' '}
          <MobileLineBreak /> and county info.
        </MapInstructions>
      )}
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default Map;
