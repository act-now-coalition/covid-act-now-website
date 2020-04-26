import React, { useState } from 'react';
import '../../App.css'; /* optional for styling like the :hover pseudo-class */
import { invert } from 'lodash';
import { useHistory } from 'react-router-dom';
import { STATES } from 'enums';
import { Legend, LegendItem } from './Legend';
import USACountyMap from './USACountyMap';
import { MAP_FILTERS } from '../../screens/ModelPage/Enums/MapFilterEnums';
import { COLOR_MAP } from 'enums/interventions';
import ReactTooltip from 'react-tooltip';

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
        <Legend>
          <LegendItem
            key={'legend-3'}
            title={'Cases are increasing'}
            color={COLOR_MAP.RED.BASE}
            description={
              'Hospitals at elevated risk to be overloaded in the next 3 weeks. Act now to flatten the curve.'
            }
          />
          <LegendItem
            key={'legend-2'}
            title={'Cases are stable'}
            color={COLOR_MAP.ORANGE.BASE}
            description={
              'Hospitals at moderate risk to be overloaded in the next 3-6 weeks.'
            }
          />
          <LegendItem
            key={'legend-1'}
            title={'Cases are decreasing'}
            color={COLOR_MAP.GREEN.BASE}
            description={
              'Hospitals not projected to overload assuming anti-COVID interventions remain in place.'
            }
          />
        </Legend>
      )}
      <div className="us-state-map">
        <USACountyMap
          setTooltipContent={setContent}
          stateClickHandler={onClick}
        />
      </div>

      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default Map;
