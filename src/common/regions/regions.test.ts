import regions, { RegionType } from 'common/regions';

describe('regions', () => {
  test('states() returns all the states', () => {
    const states = regions.states;
    expect(states).toHaveLength(53);
  });

  test('counties() returns all the counties', () => {
    const counties = regions.counties;
    expect(counties).toHaveLength(3224);
  });

  describe('findByFipsCode', () => {
    test('returns a state when passing a valid state FIPS', () => {
      const dc = regions.findByFipsCode('11');
      expect(dc).not.toBeNull();
      expect(dc?.regionType).toBe(RegionType.STATE);
    });

    test('returns a county when passing a valid county FIPS', () => {
      const county = regions.findByFipsCode('53033');
      expect(county).not.toBeNull();
      expect(county?.regionType).toBe(RegionType.COUNTY);
    });

    test('returns null if the FIPS doesn’t exist', () => {
      const notFound = regions.findByFipsCode('xx');
      expect(notFound).toBeNull();
    });
  });

  describe('findStateByUrlParams', () => {
    test('returns the correct state when passing a state code', () => {
      const state = regions.findStateByUrlParams('OR');
      expect(state).not.toBeNull();
      expect(state?.fipsCode).toBe('41');
    });

    test('returns the correct state when passing a valid URL segment', () => {
      const state = regions.findStateByUrlParams('oregon-or');
      expect(state).not.toBeNull();
      expect(state?.fipsCode).toBe('41');
    });

    test('returns null for invalid params "xxx"', () => {
      const state = regions.findStateByUrlParams('xxx');
      expect(state).toBeNull();
    });
  });

  describe('findCountyByUrlParams', () => {
    test('returns the correct county for valid state and county IDs', () => {
      const county = regions.findCountyByUrlParams(
        'washington-wa',
        'king_county',
      );
      expect(county).not.toBeNull();
      expect(county?.fipsCode).toBe('53033');
    });

    test('returns the correct county when using state code as stateId', () => {
      const county = regions.findCountyByUrlParams('wa', 'king_county');
      expect(county).not.toBeNull();
      expect(county?.fipsCode).toBe('53033');
    });

    test('returns null for invalid stateId and valid countyID', () => {
      const county = regions.findCountyByUrlParams('xxx', 'king_county');
      expect(county).toBe(null);
    });

    test('returns null for invalid stateId and countyID', () => {
      const county = regions.findCountyByUrlParams('xxx', 'xxx');
      expect(county).toBeNull();
    });
  });
});

describe('State', () => {
  const state = regions.findByFipsCode('02');
  test('fullName', () => {
    expect(state?.fullName).toBe('Alaska');
  });

  test('relativeUrl', () => {
    expect(state?.relativeUrl).toBe('us/alaska-ak');
  });

  test('canonicalUrl', () => {
    expect(state?.canonicalUrl).toBe('https://covidactnow.org/us/alaska-ak');
  });
});

describe('County', () => {
  const county = regions.findByFipsCode('53033');
  test('fullName', () => {
    expect(county?.fullName).toBe('King County, Washington');
  });

  test('relativeUrl', () => {
    expect(county?.canonicalUrl).toBe(
      'https://covidactnow.org/us/washington-wa/county/king_county',
    );
  });

  test('canonicalUrl', () => {
    expect(county?.relativeUrl).toBe('us/washington-wa/county/king_county');
  });
});
