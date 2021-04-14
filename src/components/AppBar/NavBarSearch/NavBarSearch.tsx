import React from 'react';
import Fade from '@material-ui/core/Fade';
import { HomepageSearchAutocomplete } from 'components/Search';
import { Wrapper } from './NavBarSearch.style';
import { useGeolocation, useCountyToZipMap } from 'common/hooks';
import { getFinalAutocompleteLocations } from 'common/regions';
import { getFilterLimit } from 'components/Search';

const NavBarSearch: React.FC<{ showSearch?: boolean }> = ({
  showSearch = true,
}) => {
  const { geolocationData } = useGeolocation();
  const { result: countyToZipMap } = useCountyToZipMap();
  const searchLocations = getFinalAutocompleteLocations(
    geolocationData,
    countyToZipMap,
  );

  return (
    <Fade in={showSearch}>
      <Wrapper>
        <HomepageSearchAutocomplete
          locations={searchLocations}
          filterLimit={getFilterLimit()}
        />
      </Wrapper>
    </Fade>
  );
};

export default NavBarSearch;
