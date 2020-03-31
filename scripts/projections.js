const fs = require('fs');
/**
 * Goes through the public/data per-state json files
 * and returns an individual object with the following shape
 * per state:
 * {
 *  noReturnRangeStart: Date(ISOString),
 *  noReturnRangeEnd: Date(ISOString),
 *  noAction: {
 *    cumulativeAffected: string (representing percentage),
 *    overloadedHospitals: Date(ISOstring) | 'never',
 *    estimatedDeaths: number,
 *  },
 *  shelterInPlace: {
 *    cumulativeAffected: string (representing percentage),
 *    overloadedHospitals: Date(ISOstring) | 'never',
 *    estimatedDeaths: number,
 *  },
 *  socialDistancing: {
 *    cumulativeAffected: string (representing percentage),
 *    overloadedHospitals: Date(ISOstring) | 'never',
 *    estimatedDeaths: number,
 *  },
 *  lockdown: {
 *    cumulativeAffected: string (representing percentage),
 *    overloadedHiospitals: Date(ISOstring) | 'never',
 *    estimatedDeaths: number,
 *  }
 * }
 */

// TODO: Move these to constants (ideally accessible in browser or node)
const STATES = {
  AK: 'Alaska',
  AL: 'Alabama',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
};

const lowercaseStates = [
  'AK',
  'CA',
  'CO',
  'FL',
  'NY',
  'MO',
  'NM',
  'NV',
  'OR',
  'TX',
  'WA',
];

const COLUMNS = {
  hospitalizations: 8,
  beds: 11,
  cumulativeDeaths: 10,
  cumulativeInfected: 9,
  totalPopulation: 16,
  date: 0,
};

const DAYS = 1000 * 60 * 60 * 24;

// TODO: Move this to helper (ideally accessible in browser or node)
class Model {
  constructor(data, parameters) {
    this.intervention = parameters.intervention;
    this.r0 = parameters.r0;
    this.durationDays = parameters.durationDays || null /* permanent */;
    this.delayDays = parameters.delayDays || 0;

    let _parseInt = number => parseInt(number.replace(/,/g, '') || 0);

    this.dates = data.map(row => new Date(row[COLUMNS.date]));
    this.dayZero = this.dates[0];
    this.daysSinceDayZero = Math.floor(
      (new Date().getTime() - this.dayZero.getTime()) / DAYS,
    );

    this.hospitalizations = data.map(row =>
      _parseInt(row[COLUMNS.hospitalizations]),
    );
    this.beds = data.map(row => _parseInt(row[COLUMNS.beds]));
    this.cumulativeDeaths = data.map(row =>
      _parseInt(row[COLUMNS.cumulativeDeaths]),
    );
    this.cumulativeInfected = data.map(row =>
      _parseInt(row[COLUMNS.cumulativeInfected]),
    );

    this.maxInfected = this.cumulativeInfected[
      this.cumulativeInfected.length - 1
    ];
    this.cumulativeDead = this.cumulativeDeaths[
      this.cumulativeDeaths.length - 1
    ];

    // approximate the date when the hospitals will be overwhelmed
    // assume r0~=2 => 25% daily case growth
    let overwhelmedIdx = this.dates.findIndex(
      (num, idx) => this.hospitalizations[idx] > this.beds[idx],
    );
    if (overwhelmedIdx == -1) {
      this.dateOverwhelmed = null;
    } else {
      let overwhelmedBy =
        this.hospitalizations[overwhelmedIdx] - this.beds[overwhelmedIdx];
      let dayDelta = Math.floor(
        overwhelmedBy / (0.25 * this.hospitalizations[overwhelmedIdx]),
      );
      this.dateOverwhelmed = new Date(
        this.dates[overwhelmedIdx].getTime() - dayDelta * DAYS,
      );
    }

    this.totalPopulation = _parseInt(data[0][COLUMNS.totalPopulation]);
  }

  get durationLabelMonths() {
    if (this.durationDays) {
      let months = Math.round(this.durationDays / 30);
      return `${months} Month${months > 1 ? 's' : ''}`;
    } else {
      return ''; // permanent intervetion
    }
  }

  get delayLabelWeeks() {
    if (this.delayDays) {
      let weeks = Math.round(this.delayDays / 7);
      return `Starting In ${weeks} Month${weeks > 1 ? 's' : ''}`;
    } else {
      return 'Starting Today';
    }
  }

  get label() {
    let parts = [];
    if (this.durationDays) {
      parts.push(`${this.durationLabelMonths} of `);
    }
    parts.push(this.intervention);
    if (this.delayDays) {
      parts.push(`, ${this.delayLabelWeeks}`);
    }

    return parts.join('');
  }

  get labelWithR0() {
    return `${this.label}`;
  }

  get interventionEnd() {
    return new Date(
      this.dayZero.getTime() +
        (this.daysSinceDayZero + this.durationDays) * DAYS,
    );
  }

  idxForDay(day) {
    return Math.ceil(day / 4);
  }

  estimatedCumulativeInfectedAfter(days = 100) {
    const infectedAfter = this.cumulativeInfectedAfter(days);
    const popTotal = this.totalPopulation;

    const percent = infectedAfter / popTotal;
    if (percent < 0.01) {
      return '<1%';
    } else if (percent < 0.7) {
      return Math.round(percent * 100) + '%';
    } else {
      return '>70%';
    }
  }

  estimatedDateHospitalsOverloadedAfter(timeHorizon = 100) {
    // Do we want parity with FE formatting?
    return this.dateOverwhelmed &&
      this.dateOverwhelmed < this.dateAfter(timeHorizon)
      ? this.dateOverwhelmed
      : this.dateOverwhelmed
      ? 'outside time bound'
      : 'never';
  }

  cumulativeInfectedAfter(days) {
    return this.cumulativeInfected[this.idxForDay(days)];
  }
  cumulativeDeadAfter(days = 100) {
    const num = this.cumulativeDeaths[this.idxForDay(days)];
    if (num > 1000) {
      return (Math.round(num / 1000) * 1000).toLocaleString();
    } else if (num > 0) {
      return '<1000';
    } else {
      return '0';
    }
  }
  dateAfter(days) {
    return this.dates[this.idxForDay(days)];
  }
  getColumn(columnName, days) {
    return this.dates
      .slice(0, Math.ceil(days / 4) + 1) //fixme!!!
      .map((date, idx) => ({ x: date, y: this[columnName][idx] }));
  }

  getColumnAt(columnName, days) {
    return this[columnName][this.idxForDay(days)];
  }

  lastDatesToAct() {
    return [
      new Date(this.dateOverwhelmed.getTime() - 14 * DAYS),
      new Date(this.dateOverwhelmed.getTime() - 9 * DAYS),
    ];
  }

  getDataset(columnName, duration, color, customLabel) {
    return {
      label: customLabel ? customLabel : this.labelWithR0,
      fill: false,
      borderColor: color,
      data: this.getColumn(columnName, duration + this.daysSinceDayZero),
    };
  }
}

let ws = fs.createWriteStream('projections.txt');
ws.write('16-day_Hopitalization_Prediction,32-day_Hospitalization_Prediction,16-day_Beds_Shortfall,32-day_Beds_Shortwall\n');

// Go through each state and write the data
Object.keys(STATES).forEach(state => {
  const stateKey =
    lowercaseStates.indexOf(state) > -1 ? state.toLowerCase() : state;
  const files = Array.from(
    { length: 8 }, // 8 different models
    (_, i) => `public/data/${stateKey}.${i}.json`,
  );
  const modelDatas = files.map(file => JSON.parse(fs.readFileSync(file)));

  // Initialize models
  const baseline = new Model(modelDatas[0], {
    intervention: 'No Action, Current Trends Continue',
    r0: 2.4,
  });

  const now = new Date();
  const firstDatePastNowIdx = baseline.dates.findIndex(
    date => date.getTime() > now.getTime(),
  );
  hosp1 = baseline.hospitalizations[firstDatePastNowIdx+3]
  hosp2 = baseline.hospitalizations[firstDatePastNowIdx+7]
 
  ws.write(
    `${state},${hosp1},${hosp2}}\n`,
  );
});
