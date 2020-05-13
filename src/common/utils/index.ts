import moment from 'moment';
import _ from 'lodash';
import US_STATE_DATASET from '../../components/MapSelectors/datasets/us_states_dataset_01_02_2020.json';
import { STATES } from 'common';

export function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    fail(msg);
  }
}

export function fail(msg?: string): never {
  throw new Error('INTERNAL ASSERTION FAILED: ' + msg);
}

export function assertStateId(id: string): asserts id is keyof typeof STATES {
  assert((STATES as any)[id], `${id} is not a valid state ID`);
}

const COUNTY_REGEX = /^[0-9]{5}$/;
export function assertCountyId(id: string) {
  assert(COUNTY_REGEX.test(id), `${id} is not a valid county ID`);
}

export function formatDate(date: Date) {
  // Locale-specific, but for US: April 29, 2020
  return moment(date).format('LL');
}

export function getFormattedCountyName(stateId: string, countyUrlName: string) {
  const { county: countyName, state_code: stateCode } = _.find(
    // @ts-ignore: US_STATE_DATASET is .js, but this is valid
    US_STATE_DATASET.state_county_map_dataset[stateId].county_dataset,
    ['county_url_name', countyUrlName],
  );

  return `${countyName}, ${stateCode}`;
}
