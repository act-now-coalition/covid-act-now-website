import React from 'react';
import { formatUtcDate } from 'common/utils';
import {
  OutcomesWrapper,
  OutcomesTable,
  OutcomesTableHeader,
  OutcomesTableRow,
} from './Outcomes.style';

const Outcomes = ({ projections, title, colors }) => {
  return (
    <OutcomesWrapper>
      <h2>{title}</h2>
      <OutcomesTable>
        <OutcomesTableHeader>
          <div>Scenario</div>
          <div>Hospital Overload Date</div>
          <div>Population Infected (Cumulative)</div>
          <div>Additional Deaths</div>
        </OutcomesTableHeader>
        {projections.map((projection, idx) => {
          let rowLabel = projection.label;
          if (rowLabel === 'Limited action') {
            rowLabel = 'If all restrictions are lifted';
          }

          return (
            <OutcomesRow
              key={idx}
              projection={projection}
              label={rowLabel}
              color={colors[idx]}
            />
          );
        })}
      </OutcomesTable>
    </OutcomesWrapper>
  );
};

const OutcomesRow = ({ projection, label, color }) => {
  return (
    <OutcomesTableRow>
      <div style={{ fontWeight: 'bold', color }}>{label}</div>

      <div>
        {projection.dateOverwhelmed
          ? formatUtcDate(projection.dateOverwhelmed)
          : 'Not in the next 30 days'}
      </div>

      <div>
        {formatBucketedNumber(
          projection.finalCumulativeInfected,
          projection.totalPopulation,
        )}
      </div>

      <div>{formatNumber(projection.finalCumulativeDeaths)}</div>
    </OutcomesTableRow>
  );
};

const formatNumber = num => {
  if (num > 1000) {
    return (Math.round(num / 1000) * 1000).toLocaleString();
  } else if (num > 0) {
    return '<1000';
  } else {
    return 0;
  }
};

const formatBucketedNumber = (num, total) => {
  let percent = num / total;
  if (percent < 0.01) {
    return '<1%';
  } else if (percent < 0.7) {
    return Math.round(percent * 100) + '%';
  } else {
    return '>70%';
  }
};

export default Outcomes;
