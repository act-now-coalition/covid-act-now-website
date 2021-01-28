/**
 * TextField styles specific to homepage searchbar
 * These styles need to be a bit repetative to override MUI's
 */
import { makeStyles } from '@material-ui/core/styles';
import { COLOR_MAP } from 'common/colors';

export const getSearchTextFieldStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'transparent',
    background: 'transparent',
    borderRadius: '99px',
    border: 'none',
    '& .MuiOutlinedInput-root': {
      height: '72px',
      '& fieldset': {
        borderColor: COLOR_MAP.GRAY.LIGHT,
        border: `1.5px solid ${COLOR_MAP.GRAY.LIGHT}`,
        borderRadius: '99px',
      },
      '&:hover fieldset': {
        borderColor: COLOR_MAP.GRAY.LIGHT,
      },
      '&.Mui-focused fieldset': {
        borderColor: COLOR_MAP.BLUE,
        border: `1.5px solid ${COLOR_MAP.BLUE}`,
        borderRadius: '99px',
      },
      '& input::placeholder': {
        color: COLOR_MAP.GRAY_BODY_COPY,
        opacity: 1,
      },
    },
  },
}));
