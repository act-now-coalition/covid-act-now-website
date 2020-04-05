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
            key={'legend-1'}
            title={'Hospital overloaded not likely'}
            color={COLOR_MAP.GREEN}
            description={
              'Hospitals unlikely to be overloaded in the next 6 weeks assuming anti-COVID interventions are continued.'
            }
          />
          <LegendItem
            key={'legend-2'}
            title={'Hospital overload likely'}
            color={COLOR_MAP.ORANGE}
            description={
              'Hospitals projected to overload in the next 4-6 weeks. Act now to flatten the curve.'
            }
          />
          <LegendItem
            key={'legend-3'}
            title={'Hospital overload near certain'}
            color={COLOR_MAP.RED}
            description={
              'Hospitals projected to overload in immediate future. Take drastic measures.'
            }
          />
          <LegendItem
            key={'legend-4'}
            title={'Hospital overload unavailable'}
            color={COLOR_MAP.GREY}
            description={
              'No cases reported, or not enough data to make a prediction.'
            }
          />
        </Legend>
      )}
      <USACountyMap
        setTooltipContent={setContent}
        stateClickHandler={onClick}
      />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default Map;
