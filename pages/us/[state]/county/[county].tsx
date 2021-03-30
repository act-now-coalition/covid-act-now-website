import React from 'react';
import { County, State } from '../../../../src/common/regions/types';
import LocationHeader from '../../../../src/components/LocationPage/LocationHeader';
import { Block } from '../../../../src/components/LocationPage/LocationHeader.style';
import AsyncBlock from '../../../../src/components/LocationPage/AsyncBlock';

function CountyPage({ region, locationSummary, shareKey }) {
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
      <Block>
        <h2>Chart</h2>
      </Block>
      <Block>
        <h2>Chart</h2>
      </Block>
      <Block>
        <h2>Chart</h2>
      </Block>
      <Block>
        <h2>Chart</h2>
      </Block>
      <Block id="async-block">
        <h2>Async Block</h2>
        <AsyncBlock />
      </Block>
      <Block id="recommend">
        <h2>Recommendations</h2>
      </Block>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { state, county, shareKey } = params;
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
      shareKey: shareKey ? shareKey : null,
    },
  };
}

export async function getStaticPaths() {
  const { default: regions } = await import('../../../../src/common/regions');

  const paths = regions.counties.map(county => ({
    params: {
      state: county.state.urlSegment,
      county: county.urlSegment,
      slug: [],
    },
  }));
  return { paths, fallback: false };
}

export default CountyPage;
