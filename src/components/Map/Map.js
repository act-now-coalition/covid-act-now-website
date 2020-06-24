import React, { useState } from 'react';
import '../../App.css'; /* optional for styling like the :hover pseudo-class */
import { useHistory } from 'react-router-dom';
import { REVERSED_STATES } from 'common';
import { Level } from 'common/level';
import { Legend, LegendItem } from './Legend';
import USACountyMap from './USACountyMap';
import { MAP_FILTERS } from '../../screens/LocationPage/Enums/MapFilterEnums';
import ReactTooltip from 'react-tooltip';
import { MapInstructions, MobileLineBreak } from './Map.style';
import { MAP_LEGEND } from 'common/metrics/location_summary';
import * as StyleLegend from 'components/Map/Legend.style';

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
          <StyleLegend.LegendItemContainer key="legend-4">
            <LegendItem
              title={MAP_LEGEND[Level.HIGH].legend}
              color={MAP_LEGEND[Level.HIGH].color}
            />
          </StyleLegend.LegendItemContainer>
          <StyleLegend.LegendItemContainer key="legend-3">
            <LegendItem
              title={MAP_LEGEND[Level.MEDIUM_HIGH].legend}
              color={MAP_LEGEND[Level.MEDIUM_HIGH].color}
            />
          </StyleLegend.LegendItemContainer>
          <StyleLegend.LegendItemContainer key="legend-2">
            <LegendItem
              title={MAP_LEGEND[Level.MEDIUM].legend}
              color={MAP_LEGEND[Level.MEDIUM].color}
            />
          </StyleLegend.LegendItemContainer>
          <StyleLegend.LegendItemContainer key="legend-1">
            <LegendItem
              title={MAP_LEGEND[Level.LOW].legend}
              color={MAP_LEGEND[Level.LOW].color}
            />
          </StyleLegend.LegendItemContainer>
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
