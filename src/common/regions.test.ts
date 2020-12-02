import regions, { RegionType } from './regions';

describe('regions', () => {
  test('states() returns all the states', () => {
    const states = regions.states();
    expect(states).toHaveLength(53);
  });

  test('counties() returns all the counties', () => {
    const counties = regions.counties();
    expect(counties).toHaveLength(3224);
  });

  test('findByFipsCode returns a state for a state FIPS', () => {
    const dc = regions.findByFipsCode('11');
    expect(dc).toBeTruthy();
    expect(dc?.regionType === RegionType.STATE);
  });

  test('findByFipsCode returns null if the FIPS doesn’t exist', () => {
    const notFound = regions.findByFipsCode('xx');
    expect(notFound).toBe(null);
  });
});

describe('State', () => {
  const state = regions.findByFipsCode('02');
  test('fullName', () => {
    expect(state?.fullName()).toBe('Alaska');
  });

  test('relativeUrl', () => {
    expect(state?.relativeUrl()).toBe('us/alaska-ak');
  });

  test('canonicalUrl', () => {
    expect(state?.canonicalUrl()).toBe('https://covidactnow.org/us/alaska-ak');
  });
});

describe('County', () => {
  const county = regions.findByFipsCode('53033');
  test('fullName', () => {
    expect(county?.fullName()).toBe('King County, WA');
  });

  test('relativeUrl', () => {
    expect(county?.canonicalUrl()).toBe(
      'https://covidactnow.org/us/washington-wa/county/king_county',
    );
  });

  test('canonicalUrl', () => {
    expect(county?.relativeUrl()).toBe('us/washington-wa/county/king_county');
  });
});
