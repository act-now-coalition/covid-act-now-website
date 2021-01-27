/**
 * Autocomplete styles specific to homepage searchbar (removes gray hover from dropdown option items)
 */
import { makeStyles } from '@material-ui/core/styles';

export const getSearchAutocompleteStyles = makeStyles(() => ({
  option: {
    '&[data-focus="true"]': {
      backgroundColor: 'transparent',
    },
  },
}));
