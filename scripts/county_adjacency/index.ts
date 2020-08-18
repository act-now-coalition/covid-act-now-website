/**
 * This is a throwaway script to parse the counties adjacency list from the
 * Census website. It generates a JSON file with the following structure:
 *
 *    {
 *      "counties": {
 *        "10001": {
 *          "adjacent_counties": [
 *            "10003",
 *            "10005",
 *            ...
 *          ]
 *        },
 *        ...
 *      }
 *    }
 *
 * The original file has a simple and consistent structure that allows us
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
 */
import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';

// The main county line start with ", the adjacent counties start with tab (\t)
const REGEX_COUNTY_GROUP = /\n"/;

// County FIPS codes are a sequence of 5 digits
const REGEX_FIPS_CODE = /\d{5}/;

interface AdjacencyList {
  adjacent_counties: string[];
}

function main() {
  const filePath = path.join(__dirname, 'county_adjacency.txt');
  const text = fs.readFileSync(filePath, 'utf-8');

  const countyGroups = _.split(text, REGEX_COUNTY_GROUP);
  const adjacencyMap = _.fromPairs(countyGroups.map(parseCountyGroup));

  const outputPath = path.join(__dirname, 'county_adjacency.json');
  const outputData = JSON.stringify({ counties: adjacencyMap }, null, 2);
  fs.writeFileSync(outputPath, outputData);
}

/**
 * parseCountyGroup reads a "county group" in the adjacency file and
 * returns a Pair with the FIPS code of the main county as first element
 * and an object with the adjacent counties as second.
 *
 * Example: If we pass the first 6 lines of the file (see example above),
 * the function will return:
 *
 * ['01001', { adjacent_counties: ['01021', '01047', '01051', '01085', '01101'] }]
 */
function parseCountyGroup(countyGroupText: string): [string, AdjacencyList] {
  const [firstLine, ...remainingLines] = countyGroupText.split('\n');
  return [
    getFipsCode(firstLine),
    { adjacent_counties: remainingLines.map(getFipsCode) },
  ];
}

function getFipsCode(line: string): string {
  const match = line.match(REGEX_FIPS_CODE);
  if (!match) {
    throw Error('no fips code found');
  }
  return match[0];
}

if (require.main === module) {
  main();
}
