import React, { useState } from 'react';
import '../../App.css'; /* optional for styling like the :hover pseudo-class */
import { useHistory } from 'react-router-dom';
import { REVERSED_STATES } from 'enums';
import { Level } from 'enums/levels';
import { LOCATION_SUMMARY_LEVELS } from 'metrics/location_summary';
import { Legend, LegendItem } from './Legend';
import USACountyMap from './USACountyMap';
import { MAP_FILTERS } from '../../screens/LocationPage/Enums/MapFilterEnums';
import ReactTooltip from 'react-tooltip';
import { MapInstructions, MobileLineBreak } from './Map.style';

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
        <MapInstructions>
          <strong>Click a state</strong> to view reopening risk details{' '}
          <MobileLineBreak /> and county projections.
        </MapInstructions>
      )}
      <div className="us-state-map">
        <USACountyMap
          condensed={hideLegend}
          setTooltipContent={setContent}
          stateClickHandler={onClick}
        />
      </div>
      {!hideLegend && (
        <Legend>
          <LegendItem
            key={'legend-3'}
            title={LOCATION_SUMMARY_LEVELS[Level.HIGH].name}
            color={LOCATION_SUMMARY_LEVELS[Level.HIGH].color}
            description={LOCATION_SUMMARY_LEVELS[Level.HIGH].detail}
          />
          <LegendItem
            key={'legend-2'}
            title={LOCATION_SUMMARY_LEVELS[Level.MEDIUM].name}
            color={LOCATION_SUMMARY_LEVELS[Level.MEDIUM].color}
            description={LOCATION_SUMMARY_LEVELS[Level.MEDIUM].detail}
          />
          <LegendItem
            key={'legend-1'}
            title={LOCATION_SUMMARY_LEVELS[Level.LOW].name}
            color={LOCATION_SUMMARY_LEVELS[Level.LOW].color}
            description={LOCATION_SUMMARY_LEVELS[Level.LOW].detail}
          />
        </Legend>
      )}
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default Map;
