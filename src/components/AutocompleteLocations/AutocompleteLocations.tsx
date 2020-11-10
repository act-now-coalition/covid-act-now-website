import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/useAutocomplete';
import TextField from '@material-ui/core/TextField';
import { Location } from 'common/locations';
/**
 * `createFilterOptions` creates a configuration object that defines how the
 * user input will be matched against the options in the Autocomplete
 * component. See material-ui/lab/useAutocomplete.js for additional options.
 */

function getLocationLabel(location: Location) {
  return location.county
    ? `${location.county}, ${location.state_code}`
    : location.state;
}

const getFips = (location: Location) =>
  location.full_fips_code || location.state_fips_code;

const getOptionSelected = (option: Location, value: Location) =>
  getFips(option) === getFips(value);

// TODO(Pablo): Use this component for the Newsletter
const AutocompleteLocations: React.FC<{
  locations: Location[];
  selectedLocations: Location[];
  onChangeLocations: (
    event: React.ChangeEvent<{}>,
    newLocations: Location[],
  ) => void;
}> = ({ locations, onChangeLocations, selectedLocations }) => (
  <Autocomplete
    multiple
    options={locations}
    getOptionLabel={getLocationLabel}
    onChange={onChangeLocations}
    getOptionSelected={getOptionSelected}
    value={selectedLocations}
    filterOptions={createFilterOptions({ matchFrom: 'start', trim: true })}
    renderInput={params => (
      <TextField variant="outlined" {...params} placeholder="+ Add" />
    )}
  />
);

export default AutocompleteLocations;
