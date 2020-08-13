import moment from 'moment';
import { max as _max, range as _range } from 'lodash';
import { Column } from 'common/models/Projection';
import { Series } from './interfaces';

export function getMaxBy<T>(
  series: Series[],
  getValue: (d: Column) => T,
  defaultValue: T,
): T {
  const maxValue = _max(series.map(serie => _max(serie.data.map(getValue))));
  return maxValue || defaultValue;
}

export function getTimeAxisTicks(from: Date, to: Date) {
  const dateFrom = moment(from).startOf('month').toDate();
  const numMonths = moment(to).diff(dateFrom, 'months');
  return _range(1, numMonths + 1).map(i =>
    moment(dateFrom).add(i, 'month').toDate(),
  );
}
