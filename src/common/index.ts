import { invert } from 'lodash';
import STATES from './us_states';
import TEAM from './team';
import COLORS from './colors';

const REVERSED_STATES = invert(STATES);

export { COLORS, STATES, REVERSED_STATES, TEAM };
