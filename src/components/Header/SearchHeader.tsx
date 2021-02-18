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
import { Region, getFinalAutocompleteLocations } from 'common/regions';
import { getFilterLimit } from 'components/Search';
import { useCountyToZipMap, useGeolocation } from 'common/hooks';

const SearchHeader = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  setMapOption,
  region,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMapOption: React.Dispatch<React.SetStateAction<string>>;
  region: Region;
}) => {
  const isMobile = useMediaQuery('(max-width:1349px)');
  const isNarrowMobile = useMediaQuery('(max-width:500px)');

  const { geolocationData } = useGeolocation();
  const { countyToZipMap } = useCountyToZipMap();

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
                filterLimit={getFilterLimit(region)}
                setHideMapToggle={setHideMapToggle}
                locations={getFinalAutocompleteLocations(
                  geolocationData,
                  countyToZipMap,
                )}
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
