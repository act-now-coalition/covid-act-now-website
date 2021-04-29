import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from 'styled-components';
import { navSearchbar, navSearchbarLocPage } from 'assets/theme';
import { HomepageSearchAutocomplete, getFilterLimit } from 'components/Search';
import { Wrapper } from './Search.style';
import { useGeolocation, useCountyToZipMap } from 'common/hooks';
import { getFinalAutocompleteLocations } from 'common/regions';

const Search: React.FC<{ menuOpen: boolean }> = ({ menuOpen }) => {
  const theme = useContext(ThemeContext);

  const { pathname } = useLocation();
  const isLocationPage = pathname.includes('/us');
  const navTheme = isLocationPage ? navSearchbarLocPage : navSearchbar;

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
        searchbar: navTheme,
      }}
    >
      <Wrapper>
        <HomepageSearchAutocomplete
          locations={searchLocations}
          filterLimit={getFilterLimit()}
          menuOpen={menuOpen}
        />
      </Wrapper>
    </ThemeProvider>
  );
};

export default Search;
