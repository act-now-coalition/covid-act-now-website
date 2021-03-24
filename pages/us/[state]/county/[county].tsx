import React from 'react';
import { County, State } from '../../../../src/common/regions/types';
import LocationHeader from '../../../../src/components/LocationPage/LocationHeader';

function CountyPage({ region, locationSummary }) {
  if (!locationSummary) {
    return <h1>no data for {region.fullName}</h1>;
  }

  const stateData = region.state;
  const state = new State(
    stateData.name,
    stateData.urlSegment,
    stateData.fipsCode,
    stateData.population,
    stateData.stateCode,
  );

  const county = new County(
    region.name,
    region.urlSegment,
    region.fipsCode,
    region.population,
    state,
    [],
  );

  const { metrics } = locationSummary;
  return (
    <div>
      <LocationHeader region={county} locationSummary={locationSummary} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { state, county } = params;
  const { default: regions } = await import('../../../../src/common/regions');

  const region = regions.findCountyByUrlParams(state, county);
  // get projections

  const locationSummaries = await import(
    '../../../../src/common/location_summaries'
  );

  const locationSummary = locationSummaries.getSummaryFromFips(region.fipsCode);

  // TODO: Implement region.toJSON(), the props here need to be serializable
  return {
    props: {
      region: {
        fullName: region.fullName,
        name: region.name,
        fipsCode: region.fipsCode,
        population: region.population,
        state: {
          name: region.state.name,
          fipsCode: region.state.fipsCode,
          stateCode: region.state.stateCode,
          urlSegment: region.state.urlSegment,
          population: region.state.population,
        },
        urlSegment: region.urlSegment,
      },
      locationSummary,
    },
  };
}

export async function getStaticPaths() {
  const { default: regions } = await import('../../../../src/common/regions');

  const paths = regions.counties.map(
    county => `/us/${county.state.urlSegment}/county/${county.urlSegment}/`,
  );
  return { paths, fallback: false };
}

export default CountyPage;
