import React from 'react';
import { INTERVENTIONS } from 'enums';

import {
  OutcomesWrapper,
  OutcomesTable,
  OutcomesTableHeader,
  OutcomesTableRow,
} from './Outcomes.style';

const Outcomes = ({
  models,
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
        {models.map((model, idx) => {
          let rowLabel = model.label;
          if (currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE) {
            if (rowLabel === '3 Months of Social distancing') {
              rowLabel = '3 Months of Stay at home (lax)';
            } else if (rowLabel === '3 Months of Stay at home') {
              rowLabel = '3 Months of Stay at home (strict)';
            }
          }
          if (
            currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE ||
            currentIntervention === INTERVENTIONS.SOCIAL_DISTANCING
          ) {
            if (rowLabel === 'Limited action') {
              rowLabel = 'Restrictions lifted';
            }
          }

          return (
            <OutcomesRow
              key={idx}
              model={model}
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

const OutcomesRow = ({ model, label, timeHorizon, color }) => {
  return (
    <OutcomesTableRow>
      <div style={{ fontWeight: 'bold', color }}>{label}</div>
      <div>
        {formatBucketedNumber(
          timeHorizon
            ? model.cumulativeInfectedAfter(timeHorizon)
            : model.cumulativeInfected,
          model.totalPopulation,
        )}
      </div>
      {timeHorizon ? (
        <div>
          {model.dateOverwhelmed &&
          model.dateOverwhelmed < model.dateAfter(timeHorizon)
            ? model.dateOverwhelmed.toDateString()
            : model.dateOverwhelmed
            ? 'outside time bound'
            : 'Not in the next 3 months'}
        </div>
      ) : (
        <div>
          {model.dateOverwhelmed
            ? model.dateOverwhelmed.toDateString()
            : 'Not in the next 3 months'}
        </div>
      )}

      <div>
        {formatNumber(
          timeHorizon
            ? model.cumulativeDeadAfter(timeHorizon)
            : model.cumulativeDead,
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
