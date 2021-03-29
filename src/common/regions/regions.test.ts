import regions from 'common/regions/region_db';
import { RegionType } from 'common/regions';

// Common regions to test against.
const alaska = regions.findByStateCodeStrict('AK');
const newYork = regions.findByStateCodeStrict('NY');
const newJersey = regions.findByStateCodeStrict('NJ');
const anchorageCountyAK = regions.findByFipsCodeStrict('02020');
const kingCountyWA = regions.findByFipsCodeStrict('53033');
const anchorageMetro = regions.findByFipsCodeStrict('11260');
const newYorkCityMetro = regions.findByFipsCodeStrict('35620');

describe('regions', () => {
  test('states returns all the states', () => {
    const states = regions.states;
    expect(states).toHaveLength(53);
  });

  test('counties returns all the counties', () => {
    const counties = regions.counties;
    expect(counties).toHaveLength(3224);
  });

  test('metroAreas returns all the metro areas', () => {
    const metros = regions.metroAreas;
    expect(metros).toHaveLength(392);
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

    test('returns a metro area when passing a valid MSA FIPS', () => {
      const county = regions.findByFipsCode('35620');
      expect(county).not.toBeNull();
      expect(county?.regionType).toBe(RegionType.MSA);
    });

    test('returns null if the FIPS doesn’t exist', () => {
      const notFound = regions.findByFipsCode('xx');
      expect(notFound).toBeNull();
    });
  });

  describe('findByStateCodeStrict', () => {
    test('returns a state when passing a valid uppercase state code', () => {
      const ca = regions.findByStateCodeStrict('CA');
      expect(ca.regionType).toBe(RegionType.STATE);
    });

    test('returns a state when passing a valid lowercase state code', () => {
      const ca = regions.findByStateCodeStrict('ca');
      expect(ca.regionType).toBe(RegionType.STATE);
    });

    test('throws when passing an invalid state code', () => {
      expect(() => regions.findByStateCodeStrict('cate')).toThrow();
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
  test('fullName', () => {
    expect(alaska.fullName).toBe('Alaska');
  });

  test('shortName', () => {
    expect(alaska.shortName).toBe('Alaska');
  });

  test('abbreviation', () => {
    expect(alaska.abbreviation).toBe('AK');
  });

  test('relativeUrl', () => {
    expect(alaska.relativeUrl).toBe('/us/alaska-ak/');
  });

  test('canonicalUrl', () => {
    expect(alaska.canonicalUrl).toBe('https://covidactnow.org/us/alaska-ak/');
  });

  test('contains', () => {
    expect(alaska.contains(anchorageCountyAK)).toBe(true);
    expect(alaska.contains(anchorageMetro)).toBe(true);

    expect(alaska.contains(alaska)).toBe(false);
    expect(alaska.contains(kingCountyWA)).toBe(false);
    expect(alaska.contains(newYorkCityMetro)).toBe(false);

    // multi-state metros.
    expect(newYork.contains(newYorkCityMetro)).toBe(true);
    expect(newJersey.contains(newYorkCityMetro)).toBe(true);
  });
});

describe('County', () => {
  test('fullName', () => {
    expect(kingCountyWA.fullName).toBe('King County, Washington');
  });

  test('shortName', () => {
    expect(kingCountyWA.shortName).toBe('King County, WA');
  });

  test('abbreviation', () => {
    expect(kingCountyWA.abbreviation).toBe('King Co.');
  });

  test('relativeUrl', () => {
    expect(kingCountyWA.relativeUrl).toBe(
      '/us/washington-wa/county/king_county/',
    );
  });

  test('canonicalUrl', () => {
    expect(kingCountyWA.canonicalUrl).toBe(
      'https://covidactnow.org/us/washington-wa/county/king_county/',
    );
  });

  test('contains', () => {
    expect(anchorageCountyAK.contains(anchorageCountyAK)).toBe(false);
    expect(anchorageCountyAK.contains(anchorageMetro)).toBe(false);
    expect(anchorageCountyAK.contains(alaska)).toBe(false);
  });
});

describe('Metro Area', () => {
  test('fullName', () => {
    expect(newYorkCityMetro.fullName).toBe('New York City metro area');
  });

  test('shortName', () => {
    expect(newYorkCityMetro.shortName).toBe('New York City metro');
  });

  test('abbreviation', () => {
    expect(newYorkCityMetro.abbreviation).toBe('New York City metro');
  });

  test('relativeUrl', () => {
    expect(newYorkCityMetro.relativeUrl).toBe(
      '/us/metro/new-york-city-newark-jersey-city_ny-nj-pa/',
    );
  });

  test('canonicalUrl', () => {
    expect(newYorkCityMetro.canonicalUrl).toBe(
      'https://covidactnow.org/us/metro/new-york-city-newark-jersey-city_ny-nj-pa/',
    );
  });

  test('DC Metro Area Name', () => {
    const metro = regions.findByFipsCodeStrict('47900');
    expect(metro.fullName).toBe('Washington DC metro area');
  });

  test('contains', () => {
    expect(anchorageMetro.contains(anchorageCountyAK)).toBe(true);
    expect(anchorageMetro.contains(anchorageMetro)).toBe(false);
    expect(anchorageMetro.contains(alaska)).toBe(false);
  });
});
