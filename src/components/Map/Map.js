import React, { useState } from 'react';
import '../../App.css'; /* optional for styling like the :hover pseudo-class */
import { invert } from 'lodash';
import { useHistory } from 'react-router-dom';
import { STATES } from 'enums';
import { LEGEND_TEXT, Level } from 'enums/zones';
import { Legend, LegendItem } from './Legend';
import USACountyMap from './USACountyMap';
import { MAP_FILTERS } from '../../screens/ModelPage/Enums/MapFilterEnums';
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
    const reversedStateMap = invert(STATES);

    const stateCode = reversedStateMap[stateName];

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
          <strong>Click a state</strong> to view reopening risk details <MobileLineBreak/> and
          county projections.
        </MapInstructions>
      )}
      <div className="us-state-map">
        <USACountyMap
          setTooltipContent={setContent}
          stateClickHandler={onClick}
        />
      </div>
      {!hideLegend && (
        <Legend>
          <LegendItem
            key={'legend-3'}
            title={LEGEND_TEXT[Level.HIGH].name}
            color={LEGEND_TEXT[Level.HIGH].color}
            description={LEGEND_TEXT[Level.HIGH].detail}
          />
          <LegendItem
            key={'legend-2'}
            title={LEGEND_TEXT[Level.MEDIUM].name}
            color={LEGEND_TEXT[Level.MEDIUM].color}
            description={LEGEND_TEXT[Level.MEDIUM].detail}
          />
          <LegendItem
            key={'legend-1'}
            title={LEGEND_TEXT[Level.LOW].name}
            color={LEGEND_TEXT[Level.LOW].color}
            description={LEGEND_TEXT[Level.LOW].detail}
          />
        </Legend>
      )}
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default Map;
