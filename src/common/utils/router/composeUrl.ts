import trim from 'lodash/trim';
import { Location } from './index';

export const composeUrl = ({ pathname, search, hash }: Location): string => {
  // FIXME: enforce consistency for '#' and '?' in location
  const hashString = hash ? '#' + trim(hash, '#') : '';
  const queryString = search ? '?' + trim(search, '?') : '';
  return pathname + queryString + hashString;
};
