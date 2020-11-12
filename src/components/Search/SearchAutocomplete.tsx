import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Autocomplete } from '@material-ui/lab';
import { createFilterOptions } from '@material-ui/lab/useAutocomplete';
import TextField from '@material-ui/core/TextField';
import { Location, getCanonicalUrl, State } from 'common/locations';
import { StateItem, CountyItem } from 'components/MapSelectors/GlobalSelector';
import { getAllCountiesOfState, getAllStates } from 'common/utils/compare';

// Used to match:
function getLocationLabel(location: Location) {
  return location.county
    ? `${location.county}, ${location.state_code}`
    : location.state;
}

const getFips = (location: Location) =>
  location.full_fips_code || location.state_fips_code;

const getOptionSelected = (option: Location, value: Location) => {
  return getFips(option) === getFips(value);
};

const renderItem = (item: any) => {
  if (item.county) {
    return <CountyItem dataset={item} />;
  }
  return <StateItem dataset={item} />;
};

const SearchAutocomplete = (props: {
  locations: Location[];
  state?: State;
}) => {
  const { locations, state } = props;

  const [input, setInput] = useState('');

  /* 
    Determines amount of locations that show in dropdown menu when clicking into searchbar.
    If on homepage, should only show states.
    If on location page, should only show counties within state.
  */
  const numCountiesInState =
    state && getAllCountiesOfState(state.state_code).length;
  const numStates = getAllStates().length;
  const filterLimit = numCountiesInState || numStates;

  const history = useHistory();

  const onSelect = (e: any, value: Location | null) => {
    const locationUrl = value?.full_fips_code
      ? `/${getCanonicalUrl(value.full_fips_code)}`
      : '/';
    history.push(locationUrl);
  };

  const onInputChange = (e: any, value: string) => {
    setInput(value);
  };

  return (
    <Autocomplete
      noOptionsText="No location found"
      options={locations}
      getOptionLabel={getLocationLabel}
      onInputChange={onInputChange} // grab input + check if zip?
      disableListWrap
      disableClearable
      onChange={onSelect}
      getOptionSelected={getOptionSelected}
      filterOptions={createFilterOptions({
        matchFrom: 'start',
        limit: filterLimit,
      })}
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Search for your state, county, or zip"
        />
      )}
      renderOption={option => {
        return <React.Fragment>{renderItem(option)}</React.Fragment>;
      }}
    />
  );
};

export default SearchAutocomplete;
