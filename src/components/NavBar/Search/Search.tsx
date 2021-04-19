import React, { useContext } from 'react';
import { ThemeProvider, ThemeContext } from 'styled-components';
import { navSearchbar } from 'assets/theme';
import { HomepageSearchAutocomplete, getFilterLimit } from 'components/Search';
import { Wrapper } from './Search.style';
import { useGeolocation, useCountyToZipMap } from 'common/hooks';
import { getFinalAutocompleteLocations } from 'common/regions';

const Search: React.FC<{ menuOpen: boolean }> = ({ menuOpen }) => {
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
