import { COLOR_MAP } from 'common/colors';

export default {
  thumb: {
    color: `${COLOR_MAP.BLUE}`,
  },
  track: {
    backgroundColor: `${COLOR_MAP.BLUE}`,
    '$checked$colorSecondary + &': {
      backgroundColor: `${COLOR_MAP.BLUE}`,
      opacity: 0.38,
    },
  },
  switchBase: {
    '&$focusVisible $thumb': {
      outline: 'rgb(0, 95, 204) 1px auto',
      'outline-offset': '2px',
    },
  },
  focusVisible: {},
};
