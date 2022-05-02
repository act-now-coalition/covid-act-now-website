import React from 'react';
import { AnomalyModalWrapper, AnomalyButton } from './AnomalyCompare.style';
import { Modal, Typography } from '@material-ui/core';
import { ProjectionsPair } from 'common/models/ProjectionsPair';
import { Metric } from 'common/metricEnum';
import { getAnomaliesForMetric } from './utils';

export default function AnomalyModal({
  pair,
  metric,
}: {
  pair: ProjectionsPair;
  metric: Metric;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const leftAnomalies = getAnomaliesForMetric(pair.left, metric);
  const rightAnomalies = getAnomaliesForMetric(pair.right, metric);
  const newAnomalies = leftAnomalies?.length !== rightAnomalies?.length;
  const noAnomalies =
    rightAnomalies?.length === 0 || rightAnomalies?.length === undefined;

  return (
    <div>
      <AnomalyButton
        onClick={handleOpen}
        anyNewAnomalies={newAnomalies}
        disabled={noAnomalies}
      >
        {rightAnomalies?.length ?? 'No'}{' '}
        {rightAnomalies?.length === 1 ? 'Anomaly' : 'Anomalies'}
      </AnomalyButton>
      <Modal open={open} onClose={handleClose}>
        <AnomalyModalWrapper>
          <Typography variant="h6">
            Anomalies for {pair.locationName}
          </Typography>
          <ul>
            <li>
              <em>date, anomaly type, original value</em>
            </li>
            {rightAnomalies?.map(anomaly => (
              <li>
                {anomaly.date}, {anomaly.type}, {anomaly.original_observation}
              </li>
            ))}
          </ul>
        </AnomalyModalWrapper>
      </Modal>
    </div>
  );
}
