import { STATES } from 'enums';
import moment from 'moment';

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
