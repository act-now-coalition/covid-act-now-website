import React from 'react';

function CountyPage({ region }) {
  return (
    <div>
      <h1>{region.fullName}</h1>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { state, county } = params;
  const { default: regions } = await import('../../../../src/common/regions');

  const region = regions.findCountyByUrlParams(state, county);
  // get location summaries
  // get projections

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
