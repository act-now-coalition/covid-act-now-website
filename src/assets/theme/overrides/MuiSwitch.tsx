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
};
