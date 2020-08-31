/*

A throwaway script to generate file with 2 lists (before filling in missing data):
1. Fips included in county_adjacency_msa.json but not in 2018-census-fips-codes.json
2. Fips included in 2018-census-fips-codes.json but not in county_adjacency_msa.json

(Fips in list #1 are those of U.S. territories not included in CAN)

Used for compare tables -- to find which 
fips' adjacency data needs to be man manually
entered into county_adjacency_msa.json

*/

import path from 'path';
import fs from 'fs-extra';
import ADJACENCY_FILE from '../../src/common/data/county_adjacency_msa.json';
import CENSUS_FIPS from '../what-the-fips/2018-census-fips-codes.json';

function getCensusFipsArr(): string[] {
  let censusListFips: string[] = [];
  const states = Object.values(CENSUS_FIPS);
  states.forEach(state => {
    const allFipsInState = Object.keys(state);
    censusListFips = [...censusListFips, ...allFipsInState];
  });
  return censusListFips;
}

function getAdjacencyFipsArr(): string[] {
  const counties = ADJACENCY_FILE.counties;
  const adjacencyListFips = Object.keys(counties);
  return adjacencyListFips;
}

function filterForDiff(listA: string[], listB: string[]): string[] {
  return listA.filter(listA => !listB.includes(listA));
}

function main() {
  const adjacencyListFips = getAdjacencyFipsArr();
  const censusListFips = getCensusFipsArr();
  const adjacencyNotInCensusFips = filterForDiff(
    adjacencyListFips,
    censusListFips,
  );
  const censusNotInAdjacencyFips = filterForDiff(
    censusListFips,
    adjacencyListFips,
  );
  const outputPath = path.join(__dirname, 'fips_diff.json');
  const outputData = JSON.stringify(
    {
      adjacencyNotInCensusFips,
      censusNotInAdjacencyFips,
    },
    null,
    2,
  );
  fs.writeFileSync(outputPath, outputData);
}

main();
