import React, { useContext } from 'react';
import { ThemeProvider, ThemeContext } from 'styled-components';
import Fade from '@material-ui/core/Fade';
import { navSearchbar } from 'assets/theme';
import { HomepageSearchAutocomplete, getFilterLimit } from 'components/Search';
import { Wrapper } from './NavBarSearch.style';
import { useGeolocation, useCountyToZipMap } from 'common/hooks';
import { getFinalAutocompleteLocations } from 'common/regions';

const NavBarSearch: React.FC<{ showSearch?: boolean }> = ({
  showSearch = true,
}) => {
  const theme = useContext(ThemeContext);

  const { geolocationData } = useGeolocation();
  const { result: countyToZipMap } = useCountyToZipMap();
  const searchLocations = getFinalAutocompleteLocations(
    geolocationData,
    countyToZipMap,
  );

  return (
    <ThemeProvider
      theme={{
        ...theme,
        searchbar: navSearchbar,
      }}
    >
      <Fade in={showSearch}>
        <Wrapper>
          <HomepageSearchAutocomplete
            locations={searchLocations}
            filterLimit={getFilterLimit()}
          />
        </Wrapper>
      </Fade>
    </ThemeProvider>
  );
};

export default NavBarSearch;
