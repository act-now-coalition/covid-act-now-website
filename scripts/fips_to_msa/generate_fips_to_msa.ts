// /*

//   A one-time-use script to parse the following list of county fips and
//   their corresponding MSA numbers (or '0' if the county fips is not part of an MSA):

//   https://www.dol.gov/owcp/regs/feeschedule/fee/Effective_May_16_2004_County_and_State_FIPS.htm

//   It generates 'fips_to_msa.json' with the following format:

//        {
//          "counties" : {
//             "10003": "9160",
//             "10005": "0",
//             "11001": "8840",
//             ...
//          }
//       }

// */

// import fs from 'fs-extra';
// import path from 'path';
// import _ from 'lodash';

// const REGEX_FIPS_CODE = /(\d{5})\t(\d{1,4}).*/;

// const REGEX_COUNTY_GROUP = /\n/;

// function main() {
//   const filePath = path.join(__dirname, 'fips_to_msa.txt');
//   const text = fs.readFileSync(filePath, 'utf-8');

//   const countyGroups = _.split(text, REGEX_COUNTY_GROUP);
//   const fipsToMsaMap = _.fromPairs(countyGroups.map(getFipsCode));

//   const outputPath = path.join(__dirname, 'fips_to_msa.json');
//   const outputData = JSON.stringify({ counties: fipsToMsaMap }, null, 2);
//   fs.writeFileSync(outputPath, outputData);
// }

// function getFipsCode(line: string): any {
//   const match = line.match(REGEX_FIPS_CODE);
//   if (!match) {
//     throw Error('no match found');
//   }
//   return [match[1], match[2]];
// }

// main();
