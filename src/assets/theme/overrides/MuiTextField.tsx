import { COLOR_MAP } from 'common/colors';

// These styles need to be a bit repetative to override MUI's
export default {
  root: {
    border: 'none',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: `${COLOR_MAP.GRAY.LIGHT}`,
        border: `1px solid ${COLOR_MAP.GRAY.LIGHT}`,
        borderRadius: '0',
      },
      '&:hover fieldset': {
        borderColor: `${COLOR_MAP.GRAY.LIGHT}`,
      },
      '&.Mui-focused fieldset': {
        borderColor: `${COLOR_MAP.GRAY.LIGHT}`,
        border: `1px solid ${COLOR_MAP.GRAY.LIGHT}`,
        borderRadius: '0',
      },
    },
  },
};
