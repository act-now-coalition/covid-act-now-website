import React, { useState, Fragment } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { createFilterOptions } from '@material-ui/lab/useAutocomplete';
import TextField from '@material-ui/core/TextField';
import { getFilterLimit } from './utils';
import { RegionType, Region } from 'common/regions';
import CountyMenuItem from './CountyMenuItem';
import StateMenuItem from './StateMenuItem';

function getOptionSelected(option: any, selectedOption: any) {
  return option.fipsCode === selectedOption.fipsCode;
}

// (todo chelsi- maybe combine these menu items into 1)
const renderMenuItem = (item: any) => {
  switch (item.regionType) {
    case RegionType.STATE:
      return <StateMenuItem region={item} />;
    case RegionType.COUNTY:
      return <CountyMenuItem region={item} />;
  }
};

const SearchAutocomplete = (props: {
  locations: Region[];
  region?: Region;
}) => {
  const { locations, region } = props;

  // const [input, setInput] = useState('');
  // const [isZip, setIsZip] = useState(false);
  // console.log('input', input);
  // console.log('isZip', isZip);
  // const onInputChange = (e: any, value: string) => {
  //   setInput(value);
  // };

  function getOptionLabel(location: any) {
    // if (location.zip_codes) {
    //   location.zip_codes?.forEach((zip: string) => {
    //     return zip;
    //   });
    // }
    return location.name;
  }

  // todo: theres prob a better/built-in way to grab the county url:
  const onSelect = (e: any, value: any) => {
    if (value.regionType === RegionType.STATE) {
      const stateUrl = value.canonicalUrl;
      window.location.href = stateUrl;
    } else if (value.regionType === RegionType.COUNTY) {
      const countyUrl = `${value.state.canonicalUrl}/county/${value.urlSegment}`;
      window.location.href = countyUrl;
    }
  };

  return (
    <Autocomplete
      noOptionsText="No location found"
      options={locations}
      getOptionLabel={getOptionLabel}
      // onInputChange={onInputChange}
      disableListWrap
      disableClearable
      onChange={onSelect}
      getOptionSelected={getOptionSelected}
      filterOptions={createFilterOptions({
        matchFrom: 'start',
        limit: getFilterLimit(region),
      })}
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Search for your state, county, or zip"
        />
      )}
      renderOption={option => {
        return <Fragment>{renderMenuItem(option)}</Fragment>;
      }}
    />
  );
};

export default SearchAutocomplete;
