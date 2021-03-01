import { sortBy } from 'lodash';
import regions from 'common/regions';
import { getVaccineInfoByFips } from './phases';

describe('vaccination info is complete for each state', () => {
  const states = sortBy(regions.states, state => state.fullName);

  for (const state of states) {
    const { fipsCode } = state;
    const vaccinationInfo = getVaccineInfoByFips(fipsCode);
    describe(state.fullName, () => {
      test('has vaccination info', () => {
        expect(vaccinationInfo).toBeDefined();
      });
      test('has a valid eligibility URL', () => {
        const url = vaccinationInfo?.eligibilityInfoUrl;
        expect(url).toBeTruthy();
      });
      test('has a valid signup URL', () => {
        const url = vaccinationInfo?.vaccinationSignupUrl;
        expect(url).toBeTruthy();
      });
      test('has at least one phase', () => {
        expect(vaccinationInfo?.phaseGroups.length).toBeGreaterThan(0);
      });
    });
  }
});
