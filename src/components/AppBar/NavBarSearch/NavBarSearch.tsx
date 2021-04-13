import React from 'react';
import HomepageSearchAutocomplete from 'components/Search/Homepage/HomepageSearchAutocomplete';
import { getFilterLimit } from 'components/Search';
import { getFinalAutocompleteLocations } from 'common/regions';
import Fade from '@material-ui/core/Fade';
import { Wrapper } from './NavBarSearch.style';

const NavBarSearch = () => {
  const geolocation = {
    zipCode: '06903',
    stateCode: 'CT',
    country: 'United States',
  };
  const locations = getFinalAutocompleteLocations(geolocation);

  return (
    <Fade in={true}>
      <Wrapper>
        <HomepageSearchAutocomplete
          locations={locations}
          filterLimit={getFilterLimit()}
        />
      </Wrapper>
    </Fade>
  );
};

export default NavBarSearch;
