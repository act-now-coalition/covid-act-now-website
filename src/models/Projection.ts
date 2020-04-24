import { RegionSummaryWithTimeseries } from 'api';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/** Parameters that can be provided when constructing a Projection. */
export interface ProjectionParameters {
  intervention: string;
  isInferred: boolean;
  durationDays?: number;
  delayDays?: number;
}

/**
 * Represents a single projection for a given state or county.  Contains a
 * time-series of things like hospitalizations, hospital capacity, infections, etc.
 * The projection is either static or "inferred".  Inferred projections are based
 * on the actual data observed in a given location
 */
export class Projection {
  intervention: string;
  isInferred: boolean;
  durationDays: number | null;
  delayDays: number;
  rt: number | null;
  dates: Date[];
  dayZero: Date;
  daysSinceDayZero: number;
  hospitalizations: number[];
  beds: number[];
  cumulativeDeaths: number[];
  totalPopulation: number;
  cumulativeInfected: number[];
  cumulativeDead: number;
  dateOverwhelmed: Date | null;

  constructor(
    summaryWithTimeseries: RegionSummaryWithTimeseries,
    parameters: ProjectionParameters,
  ) {
    const timeseries = summaryWithTimeseries.timeseries;
    this.intervention = parameters.intervention;
    this.isInferred = parameters.isInferred;
    this.durationDays = parameters.durationDays || null /* permanent */;
    this.delayDays = parameters.delayDays || 0;
    this.rt = null;
    if (this.isInferred) {
      this.rt = summaryWithTimeseries.projections.Rt;
    }

    this.dates = timeseries.map(row => new Date(row.date));
    this.dayZero = this.dates[0];
    this.daysSinceDayZero = Math.floor(
      (new Date().getTime() - this.dayZero.getTime()) / MS_PER_DAY,
    );

    this.hospitalizations = timeseries.map(row => row.hospitalBedsRequired);
    this.beds = timeseries.map(row => row.hospitalBedCapacity);
    this.cumulativeDeaths = timeseries.map(row => row.cumulativeDeaths);
    this.totalPopulation = summaryWithTimeseries.actuals.population;
    this.cumulativeInfected = timeseries.map(row => row.cumulativeInfected);

    this.cumulativeDead = this.cumulativeDeaths[
      this.cumulativeDeaths.length - 1
    ];

    const shortageStart =
      summaryWithTimeseries.projections.totalHospitalBeds.shortageStartDate;
    this.dateOverwhelmed =
      shortageStart === null ? null : new Date(shortageStart);
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
        (this.daysSinceDayZero + this.durationDays!) * MS_PER_DAY,
    );
  }

  cumulativeInfectedAfter(days: number) {
    return this.cumulativeInfected[this.cumulativeInfected.length - 1];
  }
  cumulativeDeadAfter(days: number) {
    return this.cumulativeDeaths[this.cumulativeDeaths.length - 1];
  }
  dateAfter(days: number) {
    return this.dates[this.dates.length - 1];
  }
  getColumn(columnName: string, days: number) {
    return this.dates
      .slice(0, Math.ceil(days / 4) + 1) //fixme!!!
      .map((date, idx) => ({ x: date, y: (this as any)[columnName][idx] }));
  }

  getColumnAt(columnName: string, days: number) {
    const idxForDay = (day: number) => Math.ceil(day / 4);
    return (this as any)[columnName][idxForDay(days)];
  }

  getDataset(columnName: string, duration: number, customLabel: string) {
    return {
      label: customLabel ? customLabel : this.labelWithR0,
      data: this.getColumn(columnName, duration + this.daysSinceDayZero),
    };
  }
}
