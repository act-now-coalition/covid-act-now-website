import React, { useState } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { GlobalSelector } from 'components/MapSelectors/MapSelectors';
import MapIcon from 'assets/images/mapIcon';
import { MAP_FILTERS } from 'screens/ModelPage/Enums/MapFilterEnums';
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020';
import { useModelDatas } from 'utils/model';
import CountyMap from 'components/CountyMap/CountyMap';
import {
  STATE_TO_INTERVENTION,
  INTERVENTION_COLOR_MAP,
} from 'enums';
import { useParams, } from 'react-router-dom';

import {
  Wrapper,
  Content,
  SelectorWrapper,
  MapToggle,
  MenuBarWrapper,
  CountyMiniMapWrapper,
} from './SearchHeader.style';

const SearchHeader = ({ mobileMenuOpen, setMobileMenuOpen, setMapOption }) => {
  const history = useHistory();
  const isMobile = useMediaQuery('(max-width:1349px)');
  const isNarrowMobile = useMediaQuery('(max-width:500px)');
  const { id: location, countyId } = useParams();
  const _location = location.toUpperCase();
  let countyOption = null;
  if (countyId) {
    countyOption = _.find(
      US_STATE_DATASET.state_county_map_dataset[_location].county_dataset,
      ['county_url_name', countyId],
    );
  }
  const intervention = STATE_TO_INTERVENTION[_location];
  const [selectedCounty, setSelectedCounty] = useState(countyOption);
  const [redirectTarget, setRedirectTarget] = useState();
  const modelDatasMap = useModelDatas(_location, selectedCounty);

  const handleSelectChange = option => {
    if (option.state_code === MAP_FILTERS.DC) {
      setMapOption(MAP_FILTERS.NATIONAL);
    }

    let route = `/us/${option.state_code.toLowerCase()}`;

    if (option.county_url_name) {
      route = `${route}/county/${option.county_url_name}`;
    }

    history.push(route);

    window.scrollTo(0, 0);

    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((mobileMenuOpen = !mobileMenuOpen));
  };

  return (
    <Wrapper>
      <Content>
        <MenuBarWrapper>
          <SelectorWrapper>
            <GlobalSelector
              extendRight={true}
              handleChange={handleSelectChange}
            />
          </SelectorWrapper>
          {isMobile && (
            <MapToggle
              onClick={() => toggleMobileMenu()}
              isActive={mobileMenuOpen}
            >
              {!isNarrowMobile && <React.Fragment>Find on map</React.Fragment>}
              <CountyMiniMapWrapper>
                {mobileMenuOpen ?
                  <MapIcon /> : (
                    <CountyMap
                      fill={INTERVENTION_COLOR_MAP[intervention]}
                      stateSummary={modelDatasMap.summary}
                      selectedCounty={selectedCounty}
                    />
                  )
                }
              </CountyMiniMapWrapper>
            </MapToggle>
          )}
        </MenuBarWrapper>
      </Content>
    </Wrapper>
  );
};

export default SearchHeader;
