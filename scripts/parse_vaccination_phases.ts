import fetch from 'node-fetch';

const parse = require('csv-parse/lib/sync');

const GOOGLE_SHEETS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQjhGx1L-_kWAwfOdeVbVEa9QSI5Uq9sL6xTqOk-vU0k2ncIDhRIJKBdURBlKebqrPcTey_iOw2224l/pub?gid=0&single=true&output=csv';

async function main() {
  const csv = await fetch(GOOGLE_SHEETS_CSV_URL);
  const content = await csv.text();
  console.log(parse(content, { columns: true }));
}

main().catch(e => {
  console.error(e);
  process.exit(-1);
});
