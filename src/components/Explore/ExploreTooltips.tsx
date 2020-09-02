import React from 'react';
import moment from 'moment';
import { isNumber } from 'lodash';
import { formatInteger, formatDecimal } from 'common/utils';
import { Column } from 'common/models/Projection';
import { Tooltip } from 'components/Charts';
import { Series } from './interfaces';
import { findPointByDate } from './utils';
import * as Styles from './Explore.style';

const SingleLocationTooltip: React.FC<{
  date: Date;
  series: Series[];
  left: (d: Column) => number;
  top: (d: Column) => number;
  subtext: string;
}> = ({ series, left, top, date, subtext }) => {
  if (series.length < 2) {
    return null;
  }
  const [seriesRaw, seriesSmooth] = series;
  const pointSmooth = findPointByDate(seriesSmooth.data, date);
  const pointRaw = findPointByDate(seriesRaw.data, date);

  return pointSmooth && pointRaw ? (
    <Tooltip
      width={'180px'}
      top={top(pointSmooth)}
      left={left(pointSmooth)}
      title={moment(date).format('MMM D, YYYY')}
    >
      <Styles.TooltipSubtitle>
        {`${seriesRaw.tooltipLabel}: ${
          isNumber(pointRaw.y) ? formatInteger(pointRaw.y) : '-'
        }`}
      </Styles.TooltipSubtitle>
      <Styles.TooltipMetric>
        {isNumber(pointSmooth.y) ? formatDecimal(pointSmooth.y, 1) : '-'}
      </Styles.TooltipMetric>
      <Styles.TooltipSubtitle>7-day avg.</Styles.TooltipSubtitle>
      <Styles.TooltipLocation>{subtext}</Styles.TooltipLocation>
    </Tooltip>
  ) : null;
};

export { SingleLocationTooltip };
