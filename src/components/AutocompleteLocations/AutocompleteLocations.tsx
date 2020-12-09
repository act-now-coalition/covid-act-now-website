import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/useAutocomplete';
import TextField from '@material-ui/core/TextField';
import { Region } from 'common/regions';
/**
 * `createFilterOptions` creates a configuration object that defines how the
 * user input will be matched against the options in the Autocomplete
 * component.
 *
 * The input of the user will be compared with the output of `getOptionLabel`
 * applied to each location. The option `matchFrom: 'start'` means that the
 * beginning of the option label needs to match with the user input. For
 * example, if the user types "king", "King County, TX" and "Kingfisher County, OR"
 * will be a match (among others), but not "Rockingham County, NC".
 *
 * See material-ui/lab/useAutocomplete.js for additional options.
 */

function getLocationLabel(region: Region) {
  return region.fullName;
}

const getFips = (region: Region) => region.fipsCode;

const getOptionSelected = (option: Region, value: Region) =>
  getFips(option) === getFips(value);

// TODO(Pablo): Use this component for the Newsletter
const AutocompleteLocations: React.FC<{
  regions: Region[];
  selectedRegions: Region[];
  onChangeRegions: (event: React.ChangeEvent<{}>, newRegions: Region[]) => void;
}> = ({ regions, onChangeRegions, selectedRegions }) => (
  <Autocomplete
    multiple
    options={regions}
    getOptionLabel={getLocationLabel}
    onChange={onChangeRegions}
    getOptionSelected={getOptionSelected}
    value={selectedRegions}
    filterOptions={createFilterOptions({ matchFrom: 'start' })}
    renderInput={params => (
      <TextField variant="outlined" {...params} placeholder="+ Add" />
    )}
  />
);

export default AutocompleteLocations;
