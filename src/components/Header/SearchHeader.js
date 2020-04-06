import React from 'react';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { GlobalSelector } from 'components/MapSelectors/MapSelectors';
import MapIcon from 'assets/images/mapIcon';
import { MAP_FILTERS } from 'screens/ModelPage/Enums/MapFilterEnums';

import {
  Wrapper,
  Content,
  SelectorWrapper,
  MapToggle,
  MenuBarWrapper,
} from './SearchHeader.style';

const SearchHeader = ({ mobileMenuOpen, setMobileMenuOpen, setMapOption }) => {
  const history = useHistory();
  const isMobile = useMediaQuery('(max-width:1349px)');
  const isNarrowMobile = useMediaQuery('(max-width:500px)');

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
              {!isNarrowMobile && <>Counties&nbsp;&nbsp;</>}
              <MapIcon />
            </MapToggle>
          )}
        </MenuBarWrapper>
      </Content>
    </Wrapper>
  );
};

export default SearchHeader;
