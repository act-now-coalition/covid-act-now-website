/**
 * Autocomplete styles specific to homepage searchbar (removes gray hover from dropdown option items)
 */
import { makeStyles } from '@material-ui/core/styles';
import { COLOR_MAP } from 'common/colors';

export const getSearchAutocompleteStyles = makeStyles(() => ({
  option: {
    '&[data-focus="true"]': {
      backgroundColor: 'transparent',
      color: `${COLOR_MAP.BLUE}`,
    },
  },
  noOptions: {
    margin: '0 1.5rem .5rem',
    color: 'black',
    fontSize: '.9rem',
  },
}));
