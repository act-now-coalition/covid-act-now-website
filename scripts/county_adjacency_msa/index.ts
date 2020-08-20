/**
 * This is a throwaway script to parse two lists:
 *  1. counties adjacency list from the Census website
 *  2. county/fips/MSA list from the Dept. of Labor
 *
 * It generates a JSON file with the following structure (no msa_code property
 * for fips that aren't part of an MSA):
 *
 *    {
 *      "counties": {
 *        "10001": {
 *          "adjacent_counties": [
 *            "10003",
 *            "10005",
 *            ...
 *          ],
 *          "msa_code": "2190"
 *        },
 *        ...
 *      }
 *    }
 *
 * The original counties adjacency file has a simple and consistent structure that allows us
 * to parse it to generate the adjacency list. Here are some lines:
 *
 *     "Autauga County, AL"	01001	"Autauga County, AL"	01001
 *     		"Chilton County, AL"	01021
 *     		"Dallas County, AL"	01047
 *     		"Elmore County, AL"	01051
 *     		"Lowndes County, AL"	01085
 *     		"Montgomery County, AL"	01101
 *     "Baldwin County, AL"	01003	"Baldwin County, AL"	01003
 *     		"Clarke County, AL"	01025
 *     		"Escambia County, AL"	01053
 *     ...
 *
 * The original `county_adjacency.txt` file can be downloaded from
 * https://www.census.gov/geographies/reference-files/2010/geo/county-adjacency.html
 *
 * The original 'fips_msa.txt' file can be found at:
 * https://www.dol.gov/owcp/regs/feeschedule/fee/Effective_May_16_2004_County_and_State_FIPS.htm
 */
import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';

const NEWLINE = '\n';
const TAB = '\t';

interface AdjacencyList {
  adjacent_counties: string[];
  msa_code?: string;
}

interface AdjacencyMap {
  [fips: string]: AdjacencyList;
}

interface CountyItem {
  countyName: string;
  countyFips: string;
  adjacentCountyName: string;
  adjacentCountyFips: string;
}

function parseFipsToMsa(): any {
  const msaFilePath = path.join(__dirname, 'fips_msa.txt');
  const countyGroups = readDelimitedFile(msaFilePath);
  const fipsToMsaMap = _.fromPairs(countyGroups.map(getFipsMsa));
  return fipsToMsaMap;
}

function getFipsMsa(row: string[]): [string, string] {
  return [row[0], row[1]];
}

function parseAdjacencyFile(filePath: string, delimiter = TAB): CountyItem[] {
  const data = readDelimitedFile(filePath);
  return data.map(row => ({
    countyName: row[0],
    countyFips: row[1],
    adjacentCountyName: row[2],
    adjacentCountyFips: row[3],
  }));
}

function readDelimitedFile(filePath: string, delimiter = TAB) {
  const text = fs.readFileSync(filePath, 'utf-8');
  return text.split(NEWLINE).map(line => line.split(delimiter));
}

function parseCountyData(data: CountyItem[]): AdjacencyMap {
  const adjacencyMap: AdjacencyMap = {};

  let currentCountyFips = '';
  for (const row of data) {
    currentCountyFips = row.countyFips ? row.countyFips : currentCountyFips;

    if (!(currentCountyFips in adjacencyMap)) {
      adjacencyMap[currentCountyFips] = {
        adjacent_counties: [],
      };
    }

    if (currentCountyFips !== row.adjacentCountyFips) {
      adjacencyMap[currentCountyFips].adjacent_counties.push(
        row.adjacentCountyFips,
      );
    }
  }

  const fipsToMsa = parseFipsToMsa();
  const fipsInMsaList = Object.keys(fipsToMsa);

  fipsInMsaList.forEach(fips => {
    if (adjacencyMap[fips]) {
      const hasMsaCode = fipsToMsa[fips] !== '0';
      if (hasMsaCode) {
        adjacencyMap[fips].msa_code = fipsToMsa[fips];
      }
    }
  });

  return adjacencyMap;
}

function main() {
  const filePath = path.join(__dirname, 'county_adjacency.txt');
  const data = parseAdjacencyFile(filePath);
  const adjacencyMap = parseCountyData(data);
  const outputPath = path.join(
    __dirname,
    '../../src/common/data',
    'county_adjacency_msa.json',
  );
  const outputData = JSON.stringify({ counties: adjacencyMap }, null, 2);
  fs.writeFileSync(outputPath, outputData);
}

if (require.main === module) {
  main();
}
