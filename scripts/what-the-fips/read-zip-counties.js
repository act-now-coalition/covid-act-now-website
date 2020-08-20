const fs = require('fs');
const promisify = require('util').promisify;
const csvParse = promisify(require('csv-parse'));

main();

async function main() {
  const csv = fs.readFileSync('ZIP_COUNTY_032020.csv', 'utf8');
  const parsed = await csvParse(csv);
  // drop headers.
  parsed.shift();
  const counties = {};
  parsed.forEach(element => (counties[element[1]] = []));

  for (const row of parsed) {
    const [ZIP, COUNTY, RES_RATIO, BUS_RATIO, OTH_RATIO, TOT_RATIO] = row;
    counties[COUNTY].push(ZIP);
  }
  console.log(JSON.stringify(counties, null, 2));
  fs.writeFile(
    'county-zipcode.json',
    JSON.stringify(counties, null, 2),
    function (err) {
      if (err) return console.log(err);
      console.log('Hello World > helloworld.txt');
    },
  );
}
