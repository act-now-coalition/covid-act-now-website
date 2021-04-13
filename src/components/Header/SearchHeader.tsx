import React, { useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MapIcon from 'assets/images/mapIcon';
import { useFinalAutocompleteLocations } from 'common/regions';
import { useCountyToZipMap, useGeolocation } from 'common/hooks';
import SearchAutocomplete, { useFilterLimit } from 'components/Search';
import {
  SelectorWrapper,
  MapToggle,
  MenuBarWrapper,
  SearchHeaderWrapper,
} from './SearchHeader.style';

const SearchHeader = ({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const isMobile = useMediaQuery('(max-width:1349px)');
  const isNarrowMobile = useMediaQuery('(max-width:500px)');

  const { geolocationData } = useGeolocation();
  const { result: countyToZipMap } = useCountyToZipMap();

  const toggleMobileMenu = () => {
    setMobileMenuOpen((mobileMenuOpen = !mobileMenuOpen));
  };

  /* We hide the minimap toggle button when the searchbar is in focus on mobile */
  const [hideMapToggle, setHideMapToggle] = useState(false);

  const autocompleteLocations = useFinalAutocompleteLocations(
    geolocationData,
    countyToZipMap,
  );
  const autocompleteFilterLimit = useFilterLimit();

  return (
    <SearchHeaderWrapper>
      <MenuBarWrapper>
        <SelectorWrapper
          onClick={() => setMobileMenuOpen(false)}
          $isNarrowMobile={isNarrowMobile}
        >
          <SearchAutocomplete
            filterLimit={autocompleteFilterLimit}
            setHideMapToggle={setHideMapToggle}
            locations={autocompleteLocations}
          />
        </SelectorWrapper>
        {isMobile && (
          <MapToggle
            $hideMapToggle={hideMapToggle}
            onClick={() => toggleMobileMenu()}
            $isActive={mobileMenuOpen}
          >
            <>Counties&nbsp;&nbsp;</>
            <MapIcon />
          </MapToggle>
        )}
      </MenuBarWrapper>
    </SearchHeaderWrapper>
  );
};

export default SearchHeader;
