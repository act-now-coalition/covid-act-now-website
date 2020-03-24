import { useState, useEffect } from 'react';

async function fetchAll(urls) {
  try {
    var data = await Promise.all(
      urls.map(url => fetch(url).then(response => response.json())),
    );

    return data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export const ModelIds = {
  baseline: 0,
  strictDistancingNow: 1,
  weakDistancingNow: 7,
  containNow: 2,
};

export function useModelDatas(location) {
  const [modelDatas, setModelDatas] = useState(null);
  useEffect(() => {
    async function fetchData() {
      let urls = [
        ModelIds.baseline,
        ModelIds.strictDistancingNow,
        ModelIds.weakDistancingNow,
        ModelIds.containNow,
      ].map(i => `/data/${location}.${i}.json`);
      let loadedModelDatas = await fetchAll(urls);
      setModelDatas({
        baseline: loadedModelDatas[0],
        strictDistancingNow: loadedModelDatas[1],
        weakDistancingNow: loadedModelDatas[2],
        containNow: loadedModelDatas[3],
      });
    }
    fetchData();
  }, [location]);
  return modelDatas;
}

const COLUMNS = {
  hospitalizations: 8,
  beds: 11,
  cumulativeDeaths: 10,
  cumulativeInfected: 9,
  totalPopulation: 16,
  date: 0,
};

const DAYS = 1000 * 60 * 60 * 24;

export class Model {
  constructor(data, parameters) {
    this.intervention = parameters.intervention;
    this.r0 = parameters.r0;
    this.durationDays = parameters.durationDays || null /* permanent */;
    this.delayDays = parameters.delayDays || 0;

    let _parseInt = number => {
      // remove , in strings
      if (typeof number == 'string') {
        number = number.replace(/,/g, '');
      }
      return number ? parseInt(number) : 0;
    };

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
    if (overwhelmedIdx === -1) {
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

  idxForDay = day => Math.ceil(day / 4);

  cumulativeInfectedAfter(days) {
    return this.cumulativeInfected[this.idxForDay(days)];
  }
  cumulativeDeadAfter(days) {
    return this.cumulativeDeaths[this.idxForDay(days)];
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

  getDataset(columnName, duration, color, customLabel) {
    return {
      label: customLabel ? customLabel : this.labelWithR0,
      fill: false,
      borderColor: color,
      data: this.getColumn(columnName, duration + this.daysSinceDayZero),
    };
  }
}
