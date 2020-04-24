import { RegionSummaryWithTimeseries } from 'api';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/** Parameters that can be provided when constructing a Projection. */
export interface ProjectionParameters {
  intervention: string;
  isInferred: boolean;
}

/**
 * Represents a single projection for a given state or county.  Contains a
 * time-series of things like hospitalizations, hospital capacity, infections, etc.
 * The projection is either static or "inferred".  Inferred projections are based
 * on the actual data observed in a given location
 */
export class Projection {
  readonly isInferred: boolean;
  readonly totalPopulation: number;
  readonly cumulativeDead: number;
  readonly dateOverwhelmed: Date | null;
  readonly rt: number | null;

  private readonly intervention: string;
  private readonly dates: Date[];
  private readonly dayZero: Date;
  private readonly daysSinceDayZero: number;

  // NOTE: These can be used dynamically by getColumn()
  private readonly hospitalizations: number[];
  private readonly beds: number[];
  private readonly cumulativeDeaths: number[];
  // TODO: This should be private, but Outcomes.js has a probably erroneous reference.
  readonly cumulativeInfected: number[];

  constructor(
    summaryWithTimeseries: RegionSummaryWithTimeseries,
    parameters: ProjectionParameters,
  ) {
    const timeseries = summaryWithTimeseries.timeseries;
    this.intervention = parameters.intervention;
    this.isInferred = parameters.isInferred;
    this.totalPopulation = summaryWithTimeseries.actuals.population;
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
    this.cumulativeInfected = timeseries.map(row => row.cumulativeInfected);

    this.cumulativeDead = this.cumulativeDeaths[
      this.cumulativeDeaths.length - 1
    ];

    const shortageStart =
      summaryWithTimeseries.projections.totalHospitalBeds.shortageStartDate;
    this.dateOverwhelmed =
      shortageStart === null ? null : new Date(shortageStart);
  }

  get label() {
    return this.intervention;
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

  private getColumn(columnName: string, days: number) {
    return this.dates
      .slice(0, Math.ceil(days / 4) + 1) //fixme!!!
      .map((date, idx) => ({ x: date, y: (this as any)[columnName][idx] }));
  }

  getDataset(columnName: string, duration: number, customLabel: string) {
    return {
      label: customLabel ? customLabel : this.label,
      data: this.getColumn(columnName, duration + this.daysSinceDayZero),
    };
  }
}
