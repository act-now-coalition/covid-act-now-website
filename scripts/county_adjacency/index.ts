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

const NEWLINE = '\n';
const TAB = '\t';

interface AdjacencyList {
  adjacent_counties: string[];
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

function parseAdjacencyFile(filePath: string, delimiter = TAB): CountyItem[] {
  const text = fs.readFileSync(filePath, 'utf-8');
  const data = text.split(NEWLINE).map(line => line.split(delimiter));
  return data.map(row => ({
    countyName: row[0],
    countyFips: row[1],
    adjacentCountyName: row[2],
    adjacentCountyFips: row[3],
  }));
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
  return adjacencyMap;
}

function main() {
  const filePath = path.join(__dirname, 'county_adjacency.txt');
  const data = parseAdjacencyFile(filePath);
  const adjacencyMap = parseCountyData(data);

  const outputPath = path.join(__dirname, 'county_adjacency.json');
  const outputData = JSON.stringify({ counties: adjacencyMap }, null, 2);
  fs.writeFileSync(outputPath, outputData);
}

if (require.main === module) {
  main();
}
