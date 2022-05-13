/**
 * Content for info modals in metric chart footers
 * Rendered as children of DialogMain
 */
import React from 'react';
import { MetricDialogSectionHeader } from './Dialog.style';
import { MarkdownBody } from 'components/Markdown';
import { MetricModalContent } from './utils';

const MetricInfoDialogInner: React.FC<{ modalContent: MetricModalContent }> = ({
  modalContent,
}) => {
  const {
    metricDefinition,
    dataSource,
    howItsCalculated,
    howItsGraded,
  } = modalContent;

  return (
    <>
      <MarkdownBody source={metricDefinition} />
      {dataSource && (
        <>
          <MetricDialogSectionHeader>Data source</MetricDialogSectionHeader>
          {dataSource}
        </>
      )}
      <>
        <MetricDialogSectionHeader>
          How it's calculated
        </MetricDialogSectionHeader>
        <MarkdownBody source={howItsCalculated} />
      </>
      {howItsGraded && (
        <>
          <MetricDialogSectionHeader>How it's graded</MetricDialogSectionHeader>
          <MarkdownBody source={howItsGraded} />
        </>
      )}
    </>
  );
};

export default MetricInfoDialogInner;
