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

function Map({
  hideLegend = false,
  setMobileMenuOpen,
  setMapOption,
}: {
  hideLegend?: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  setMapOption: (option: string) => void;
}) {
  const history = useHistory();
  const [content, setContent] = useState('');

  const goToStatePage = (page: string) => {
    window.scrollTo(0, 0);

    history.push(page);
  };

  const onClick = (stateName: string) => {
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
            title={'Hospital overload in 0-4 weeks'}
            color={COLOR_MAP.RED.BASE}
            description={
              'Hospitals could be overloaded in immediate future. Take drastic measures.'
            }
          />
          <LegendItem
            key={'legend-2'}
            title={'Hospital overload in 4-8 weeks'}
            color={COLOR_MAP.ORANGE.BASE}
            description={
              'Hospitals could be overloaded in the next 4-8 weeks. Act now to flatten the curve.'
            }
          />
          <LegendItem
            key={'legend-1'}
            title={'Hospital overload not likely'}
            color={COLOR_MAP.GREEN.BASE}
            description={
              'Hospitals unlikely to be overloaded in the next 8 weeks assuming anti-COVID interventions are continued.'
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
      {!hideLegend && (
        <Legend>
          <MiniLegendItem
            key={'legend-4'}
            title={'Data unavailable'}
            color={COLOR_MAP.GREY}
            description={'Predictions not available'}
          />
        </Legend>
      )}

      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default Map;
