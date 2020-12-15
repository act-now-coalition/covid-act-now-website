import React from 'react';
import Newsletter from './Newsletter';
import regions from 'common/regions';

export default {
  title: 'Shared Components/Newsletter',
  component: Newsletter,
};

export const MetroPage = () => {
  const region = regions.findByFipsCode('35620');
  return <Newsletter region={region} />;
};

// <Autocomplete
//   multiple
//   id="alert-locations"
//   defaultValue={this.defaultValues}
//   getOptionSelected={(option, value) =>
//     option.full_fips_code === value.full_fips_code
//   }
//   onChange={(event, newValue) => {
//     this.handleSelectChange(newValue);
//   }}
//   options={this.autocompleteOptions}
//   getOptionLabel={option =>
//     option.county
//       ? `${option.county}, ${option.state_code}`
//       : option.state
//   }
//   renderTags={(tagValue, getTagProps) =>
//     tagValue.map((option, index) => (
//       <Chip
//         label={
//           option.county
//             ? `${option.county}, ${option.state_code}`
//             : option.state
//         }
//         {...getTagProps({ index })}
//       />
//     ))
//   }
//   renderInput={params => (
//     <TextField
//       variant="outlined"
//       {...params}
//       placeholder="+ Add alert locations"
//     />
//   )}
// />
