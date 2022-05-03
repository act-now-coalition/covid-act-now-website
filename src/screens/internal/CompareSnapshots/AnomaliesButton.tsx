import React from 'react';
import { AnomalyModalWrapper, AnomalyButton } from './AnomalyCompare.style';
import { Modal, Typography } from '@material-ui/core';
import { ProjectionsPair } from 'common/models/ProjectionsPair';
import { Metric } from 'common/metricEnum';
import { getAnomaliesForMetric } from './utils';
import { isEqual } from 'lodash';

export default function AnomaliesButton({
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
  const anomaliesEqual = isEqual(leftAnomalies, rightAnomalies);
  const noAnomalies =
    rightAnomalies?.length === 0 || rightAnomalies?.length === undefined;

  return (
    <>
      <AnomalyButton
        onClick={handleOpen}
        anomaliesEqual={anomaliesEqual}
        disabled={noAnomalies}
      >
        {rightAnomalies?.length ?? '0'}{' '}
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
    </>
  );
}
