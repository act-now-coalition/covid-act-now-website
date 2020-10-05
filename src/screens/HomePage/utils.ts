import { STATES } from 'common/locations';
import { shuffle, random, take } from 'lodash';

/**
 * Returns between 1 and 3 random state fips codes.
 */
export function getRandomStateFipsList() {
  const numStates = random(1, 3);
  const stateList = take(shuffle(STATES), numStates);
  return stateList.map(state => state.state_fips_code);
}
