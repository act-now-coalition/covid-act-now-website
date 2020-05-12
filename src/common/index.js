import { invert } from 'lodash';
import STATES from './us_states';
import TEAM from './team';
import COLORS from './colors';
import {
  INTERVENTIONS,
  STATE_TO_INTERVENTION,
  INTERVENTION_DESCRIPTIONS,
  INTERVENTION_EFFICACY_ORDER_ASC,
} from './interventions';
import { INTERVENTION_COLOR_MAP } from './colors';

const REVERSED_STATES = invert(STATES);

export {
  COLORS,
  STATES,
  REVERSED_STATES,
  TEAM,
  INTERVENTIONS,
  STATE_TO_INTERVENTION,
  INTERVENTION_COLOR_MAP,
  INTERVENTION_DESCRIPTIONS,
  INTERVENTION_EFFICACY_ORDER_ASC,
};
