import React, { useState } from 'react';
import '../../App.css'; /* optional for styling like the :hover pseudo-class */
import { invert } from 'lodash';
import { useHistory } from 'react-router-dom';
import { STATES } from 'enums';
import { Legend, LegendItem, MiniLegendItem } from './Legend';
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
            title={'Hospital overload in 0-3 weeks'}
            color={COLOR_MAP.RED}
            description={
              'Hospitals could be overloaded in immediate future. Take drastic measures.'
            }
          />
          <LegendItem
            key={'legend-2'}
            title={'Hospital overload in 3-6 weeks'}
            color={COLOR_MAP.ORANGE}
            description={
              'Hospitals could be overloaded in the next 3-6 weeks. Act now to flatten the curve.'
            }
          />
          <LegendItem
            key={'legend-1'}
            title={'Hospital overload not likely'}
            color={COLOR_MAP.GREEN}
            description={
              'Hospitals unlikely to be overloaded in the next 6 weeks assuming anti-COVID interventions are continued.'
            }
          />
        </Legend>
      )}
      <USACountyMap
        setTooltipContent={setContent}
        stateClickHandler={onClick}
      />
      <Legend>
        <MiniLegendItem
          key={'legend-4'}
          title={'Data unavailable'}
          color={COLOR_MAP.GREY}
          description={
            'Insufficient data to make a prediction.'
          }
        />
      </Legend>

      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default Map;
