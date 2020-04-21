import React from 'react';
import { INTERVENTIONS } from 'enums';

import {
  OutcomesWrapper,
  OutcomesTable,
  OutcomesTableHeader,
  OutcomesTableRow,
} from './Outcomes.style';

const Outcomes = ({
  projections,
  asterisk,
  timeHorizon,
  title,
  colors,
  currentIntervention,
}) => {
  return (
    <OutcomesWrapper>
      <h2>{title}</h2>
      <OutcomesTable>
        <OutcomesTableHeader>
          <div>Scenario</div>
          <div>Population Cumulatively Infected in 3 Months</div>
          <div>Hospital Overload Date</div>
          <div>Deaths in 3 Months</div>
        </OutcomesTableHeader>
        {projections.map((projection, idx) => {
          let rowLabel = projection.label;
          if (currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE) {
            if (rowLabel === '3 Months of Social distancing') {
              rowLabel = '3 Months of Stay at home (lax)';
            } else if (rowLabel === '3 Months of Stay at home') {
              rowLabel = '3 Months of Stay at home (strict)';
            }
            if (
              currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE ||
              currentIntervention === INTERVENTIONS.SOCIAL_DISTANCING
            ) {
              if (rowLabel === 'Limited action') {
                rowLabel = 'If restrictions are lifted';
              }
            }
          }

          return (
            <OutcomesRow
              key={idx}
              projection={projection}
              label={`${rowLabel}${asterisk[idx]}`}
              color={colors[idx]}
              timeHorizon={timeHorizon}
            />
          );
        })}
      </OutcomesTable>
    </OutcomesWrapper>
  );
};

const OutcomesRow = ({ projection, label, timeHorizon, color }) => {
  return (
    <OutcomesTableRow>
      <div style={{ fontWeight: 'bold', color }}>{label}</div>
      <div>
        {formatBucketedNumber(
          timeHorizon
            ? projection.cumulativeInfectedAfter(timeHorizon)
            : projection.cumulativeInfected,
          projection.totalPopulation,
        )}
      </div>
      {timeHorizon ? (
        <div>
          {projection.dateOverwhelmed &&
          projection.dateOverwhelmed < projection.dateAfter(timeHorizon)
            ? projection.dateOverwhelmed.toDateString()
            : projection.dateOverwhelmed
            ? 'outside time bound'
            : 'Not in the next 3 months'}
        </div>
      ) : (
        <div>
          {projection.dateOverwhelmed
            ? projection.dateOverwhelmed.toDateString()
            : 'Not in the next 3 months'}
        </div>
      )}

      <div>
        {formatNumber(
          timeHorizon
            ? projection.cumulativeDeadAfter(timeHorizon)
            : projection.cumulativeDead,
        )}
      </div>
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
