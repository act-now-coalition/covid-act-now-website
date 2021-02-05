import React from 'react';
import Autocomplete, {
  AutocompleteGetTagProps,
} from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/useAutocomplete';
import TextField from '@material-ui/core/TextField';
import { Region, MetroArea } from 'common/regions';
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

function getOptionSelected(option: Region, selectedOption: Region) {
  return option.fipsCode === selectedOption.fipsCode;
}

// TODO(Pablo): Use this component for the Newsletter
const AutocompleteRegions: React.FC<{
  regions: Region[];
  selectedRegions: Region[];
  onChangeRegions: (event: React.ChangeEvent<{}>, newRegions: Region[]) => void;
  ariaLabelledBy?: string;
  placeholder?: string;
  renderTags?: (
    regionItems: Region[],
    getTagProps?: AutocompleteGetTagProps,
  ) => React.ReactNode;
}> = ({
  regions,
  onChangeRegions,
  selectedRegions,
  ariaLabelledBy,
  placeholder = '+ Add',
  renderTags,
}) => {
  const ariaLabelOptions = ariaLabelledBy
    ? { 'aria-labelledby': ariaLabelledBy }
    : { 'aria-label': 'Select locations' };

  const getLocationLabel = (region: Region) => {
    if (region instanceof MetroArea) {
      return `${region.shortName}, ${region.stateCodes}`;
    } else return region.shortName;
  };

  const renderTagsOption = { renderTags };

  return (
    <Autocomplete
      multiple
      options={regions}
      getOptionLabel={getLocationLabel}
      onChange={onChangeRegions}
      getOptionSelected={getOptionSelected}
      value={selectedRegions}
      filterOptions={createFilterOptions({ matchFrom: 'start' })}
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          placeholder={placeholder}
          inputProps={{
            ...params.inputProps,
            ...ariaLabelOptions,
          }}
        />
      )}
      {...renderTagsOption}
    />
  );
};

export default AutocompleteRegions;
