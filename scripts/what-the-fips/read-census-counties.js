const fs = require('fs');
const promisify = require('util').promisify;
const csvParse = promisify(require('csv-parse'));

main();

async function main() {
  const csv = fs.readFileSync('2018-census-counties.csv', 'utf8');
  const parsed  = await csvParse(csv);
  // drop headers.
  parsed.shift();
  const states = { };
  const counties = { };
  for(const row of parsed) {
    const [summary_level, state_fips_code, county_fips_code, subdivision_fips_code, place_fips_code, city_fips_code, name] = row;
    if (subdivision_fips_code !== '00000' || place_fips_code !== '00000' || city_fips_code !== '00000') {
      continue;
    }

    if (summary_level === '040') {
      states[state_fips_code] = stateAbbreviation(name);
    } else if (summary_level === '050') {
      const state = states[state_fips_code];
      counties[state] = counties[state] || { };
      counties[state][state_fips_code + county_fips_code] = name;
    }
  }
  console.log(JSON.stringify(counties, null, 2));
}

const states = {
  'Alaska': 'AK',
  'Alabama': 'AL',
  'Arizona': 'AZ',
  'Arkansas': 'AR',
  'California': 'CA',
  'Colorado': 'CO',
  'Connecticut': 'CT',
  'Delaware': 'DE',
  'Florida': 'FL',
  'Georgia': 'GA',
  'Hawaii': 'HI',
  'Idaho': 'ID',
  'Illinois': 'IL',
  'Indiana': 'IN',
  'Iowa': 'IA',
  'Kansas': 'KS',
  'Kentucky': 'KY',
  'Louisiana': 'LA',
  'Maine': 'ME',
  'Maryland': 'MD',
  'Massachusetts': 'MA',
  'Michigan': 'MI',
  'Minnesota': 'MN',
  'Mississippi': 'MS',
  'Missouri': 'MO',
  'Montana': 'MT',
  'Nebraska': 'NE',
  'Nevada': 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  'Ohio': 'OH',
  'Oklahoma': 'OK',
  'Oregon': 'OR',
  'Pennsylvania': 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  'Tennessee': 'TN',
  'Texas': 'TX',
  'Utah': 'UT',
  'Vermont': 'VT',
  'Virginia': 'VA',
  'Washington': 'WA',
  'West Virginia': 'WV',
  'Wisconsin': 'WI',
  'Wyoming': 'WY',
  'District of Columbia': 'DC',
  'Puerto Rico': 'PR',
};

function stateAbbreviation(name) {
  const abbr = states[name];
  if (!abbr) {
    throw new Error('No abbreviation for: ' + name);
  }
  return abbr;
}
