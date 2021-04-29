import React, { useContext } from 'react';
import { ThemeProvider, ThemeContext } from 'styled-components';
import { navSearchbar } from 'assets/theme';
import { HomepageSearchAutocomplete, getFilterLimit } from 'components/Search';
import { Wrapper } from './Search.style';
import { useFinalAutocompleteLocations } from 'common/hooks';

const Search: React.FC<{ menuOpen: boolean }> = ({ menuOpen }) => {
  const theme = useContext(ThemeContext);

  const searchLocations = useFinalAutocompleteLocations();

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
