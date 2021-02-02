/**
 * Autocomplete styles specific to homepage searchbar (removes gray hover from dropdown option items)
 */
import { makeStyles } from '@material-ui/core/styles';
import COLORS, { COLOR_MAP } from 'common/colors';

export const getSearchAutocompleteStyles = makeStyles(theme => ({
  option: {
    '&[data-focus="true"]': {
      backgroundColor: COLORS.LIGHTGRAY,
    },
  },
  noOptions: {
    margin: '0 1rem .5rem',
    color: COLOR_MAP.GRAY_BODY_COPY,
    fontSize: '1rem',
    [theme.breakpoints.down('xs')]: {
      margin: '0 .25rem .5rem',
      fontSize: '.875rem',
    },
  },
  popperDisablePortal: {
    marginTop: '40px',
    left: 0,
    [theme.breakpoints.down('xs')]: {
      marginTop: '35px',
      minWidth: '100%',
    },
  },
}));
