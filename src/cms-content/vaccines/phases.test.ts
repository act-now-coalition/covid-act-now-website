import sortBy from 'lodash/sortBy';
import values from 'lodash/values';

import { statesByFips } from 'common/regions';
import { getVaccineInfoByFips, verifyOneItemPerState } from './phases';

describe('vaccination info is complete for each state', async () => {
  const states = sortBy(values(statesByFips), state => state.fullName);

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
      test('emailAlertVersion is a number', () => {
        expect(Number.isFinite(vaccinationInfo?.emailAlertVersion)).toBe(true);
      });
    });
  }

  test('there are no repeated states in the CMS', () => {
    expect(() => verifyOneItemPerState()).not.toThrow();
  });
});
