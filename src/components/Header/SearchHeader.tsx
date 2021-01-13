import React, { useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MapIcon from 'assets/images/mapIcon';
import {
  Wrapper,
  Content,
  SelectorWrapper,
  MapToggle,
  MenuBarWrapper,
  SearchHeaderWrapper,
} from './SearchHeader.style';
import SearchAutocomplete from 'components/Search';
import { Region, getAutocompleteRegions } from 'common/regions';
import { getFilterLimit } from 'components/Search';
import { GeolocationInfo } from 'common/hooks/useGeolocation';

const SearchHeader = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  setMapOption,
  region,
  geolocation,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMapOption: React.Dispatch<React.SetStateAction<string>>;
  region: Region;
  geolocation?: GeolocationInfo;
}) => {
  const isMobile = useMediaQuery('(max-width:1349px)');
  const isNarrowMobile = useMediaQuery('(max-width:500px)');

  const toggleMobileMenu = () => {
    setMobileMenuOpen((mobileMenuOpen = !mobileMenuOpen));
  };

  /* We hide the minimap toggle button when the searchbar is in focus on mobile */
  const [hideMapToggle, setHideMapToggle] = useState(false);

  // TODO (sgoldblatt): WHY are there so many wrappers?
  return (
    <SearchHeaderWrapper>
      <Wrapper>
        <Content>
          <MenuBarWrapper>
            <SelectorWrapper
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              isNarrowMobile={isNarrowMobile}
            >
              <SearchAutocomplete
                locations={getAutocompleteRegions(region)}
                filterLimit={getFilterLimit(region)}
                setHideMapToggle={setHideMapToggle}
                geolocation={geolocation}
              />
            </SelectorWrapper>
            {isMobile && (
              <MapToggle
                hideMapToggle={hideMapToggle}
                onClick={() => toggleMobileMenu()}
                isActive={mobileMenuOpen}
              >
                <>Counties&nbsp;&nbsp;</>
                <MapIcon />
              </MapToggle>
            )}
          </MenuBarWrapper>
        </Content>
      </Wrapper>
    </SearchHeaderWrapper>
  );
};

export default SearchHeader;
