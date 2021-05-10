import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from 'styled-components';
import { navSearchbar, navSearchbarLocPage } from 'assets/theme';
import SearchAutocomplete, { getFilterLimit } from 'components/Search';
import { Wrapper } from './Search.style';
import { useFinalAutocompleteLocations } from 'common/hooks';
import { Region } from 'common/regions';

const Search: React.FC<{
  menuOpen: boolean;
  WrappingDiv?: any /* Chelsi: fix this any */;
  region?: Region;
  placeholder?: string;
}> = ({ menuOpen, WrappingDiv = Wrapper, region, placeholder }) => {
  const theme = useContext(ThemeContext);

  const { pathname } = useLocation();
  const isLocationPage = pathname.includes('/us');
  const navTheme = isLocationPage ? navSearchbarLocPage : navSearchbar;

  const searchLocations = useFinalAutocompleteLocations();

  return (
    <ThemeProvider
      theme={{
        ...theme,
        searchbar: navTheme,
      }}
    >
      <WrappingDiv>
        <SearchAutocomplete
          locations={searchLocations}
          filterLimit={getFilterLimit()}
          menuOpen={menuOpen}
          region={region}
          placeholder={placeholder || 'City, county, state, or zip'}
        />
      </WrappingDiv>
    </ThemeProvider>
  );
};

export default Search;
