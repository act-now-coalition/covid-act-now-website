import { min as _min, max as _max } from 'lodash';
import { Column } from 'common/models/Projection';
import { Series } from './interfaces';

export function getMinBy<T>(
  series: Series[],
  getValue: (d: Column) => T,
  defaultValue: T,
): T {
  const minValue = _min(series.map(serie => _min(serie.data.map(getValue))));
  return minValue || defaultValue;
}

export function getMaxBy<T>(
  series: Series[],
  getValue: (d: Column) => T,
  defaultValue: T,
): T {
  const maxValue = _max(series.map(serie => _max(serie.data.map(getValue))));
  return maxValue || defaultValue;
}
