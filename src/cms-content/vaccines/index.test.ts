import { sortBy } from 'lodash';
import regions from 'common/regions';
import { getVaccinationDataByRegion } from './index';

const states = sortBy(regions.states, state => state.stateCode);

describe('vaccination information', () => {
  describe('eligibility links', () => {
    for (const state of states) {
      test(`${state.stateCode} has eligibility url`, () => {
        const vaccinationData = getVaccinationDataByRegion(state);
        expect(vaccinationData?.eligibilityInfoUrl).not.toBeFalsy();
      });
    }
  });
});
