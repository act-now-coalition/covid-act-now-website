import React, { useEffect, useState } from 'react';
import { DialogMain, MetricInfoDialogInner } from 'components/Dialogs';
import regions from 'common/regions';
import { getSourcesForMetric } from 'common/utils/provenance';
import { Projection } from 'common/models/Projection';
import { getProjectionForRegion } from 'components/NewLocationPage/SparkLineBlock/utils';
import { Metric } from 'common/metricEnum';
import { getMetricModalContent } from './utils';
import { useDialog } from 'common/hooks';
import { EventCategory } from 'components/Analytics';

export default {
  title: 'Location Page/Metric info modal',
  component: DialogMain,
};

export const Example = () => {
  const region = regions.findByFipsCodeStrict('25');

  const [projection, setProjection] = useState<Projection>();

  useEffect(() => {
    const fetchProjection = () => getProjectionForRegion(region);
    fetchProjection().then(setProjection);
  }, [region]);

  const [isOpen, openDialog, closeDialog] = useDialog(
    false,
    EventCategory.METRICS,
    'Footer modal: daily new cases',
  );

  if (!projection) {
    return null;
  }

  const exampleMetric = Metric.CASE_DENSITY;

  const provenance = getSourcesForMetric(projection.annotations, exampleMetric);

  const modalContent = getMetricModalContent(region, exampleMetric, provenance);

  return (
    <>
      <div onClick={openDialog}>Open dialog</div>
      <DialogMain
        open={isOpen}
        closeDialog={closeDialog}
        header="Daily new cases"
      >
        <MetricInfoDialogInner modalContent={modalContent} />
      </DialogMain>
    </>
  );
};
