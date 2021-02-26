import React from 'react';

function CountyPage({ region, locationSummary }) {
  console.log(JSON.stringify(locationSummary, null, 2));
  const { metrics } = locationSummary;
  return (
    <div>
      <h1>{region.fullName}</h1>
      <span>{`risk level: ${locationSummary.level}`}</span>

      <h2>Overall risk: {locationSummary.level}</h2>
      <ul>
        <li>{`level: ${metrics[0].level}, value: ${metrics[0].value}`}</li>
        <li>{`level: ${metrics[1].level}, value: ${metrics[1].value}`}</li>
        <li>{`level: ${metrics[2].level}, value: ${metrics[2].value}`}</li>
        <li>{`level: ${metrics[5].level}, value: ${metrics[5].value}`}</li>
        <li>{`level: ${metrics[6].level}, value: ${metrics[6].value}`}</li>
      </ul>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { state, county } = params;
  const { default: regions } = await import('../../../../src/common/regions');

  const region = regions.findCountyByUrlParams(state, county);
  // get location summaries
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
          fipsCode: region.state.fipsCode,
          stateCode: region.state.stateCode,
        },
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
