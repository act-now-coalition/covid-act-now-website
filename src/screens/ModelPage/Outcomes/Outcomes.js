import React from 'react';
import { INTERVENTIONS } from 'enums';
const Outcomes = ({
  models,
  asterisk,
  timeHorizon,
  title,
  colors,
  currentIntervention,
}) => {
  return (
    <div style={{ overflow: 'scroll' }}>
      <h3>{title}</h3>
      <table
        style={{
          minWidth: 500,
          width: '100%',
          margin: 'auto',
          border: '1px solid #ccc',
          padding: 20,
          textAlign: 'left',
          tableLayout: 'fixed',
        }}
      >
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Estimated Cumulative Infected</th>
            <th>Estimated Date Hospitals Overloaded</th>
            <th>Estimated Deaths</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model, idx) => {
            let rowLabel = model.label;
            if (currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE) {
              if (rowLabel === '3 Months of Social Distancing') {
                rowLabel = '3 Months of Stay at Home (worst case)';
              } else if (rowLabel === '3 Months of Stay at Home') {
                rowLabel = '3 Months of Stay at Home (best case)';
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
        </tbody>
      </table>
    </div>
  );
};

const OutcomesRow = ({ model, label, timeHorizon, color }) => {
  return (
    <tr>
      <td style={{ fontWeight: 'bold', color }}>{label}</td>
      <td>
        {formatBucketedNumber(
          timeHorizon
            ? model.cumulativeInfectedAfter(timeHorizon)
            : model.cumulativeInfected,
          model.totalPopulation,
        )}
      </td>
      {timeHorizon ? (
        <td>
          {model.dateOverwhelmed &&
          model.dateOverwhelmed < model.dateAfter(timeHorizon)
            ? model.dateOverwhelmed.toDateString()
            : model.dateOverwhelmed
            ? 'outside time bound'
            : 'never'}
        </td>
      ) : (
        <td>
          {model.dateOverwhelmed
            ? model.dateOverwhelmed.toDateString()
            : 'never'}
        </td>
      )}

      <td>
        {formatNumber(
          timeHorizon
            ? model.cumulativeDeadAfter(timeHorizon)
            : model.cumulativeDead,
        )}
      </td>
    </tr>
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
