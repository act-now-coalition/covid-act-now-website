import React from 'react';
import CoverageTable, { COVERAGE_SUMMARY } from 'components/DataCoverageTable';

export default {
  title: 'Components/Data Availability Table',
  component: CoverageTable,
};

export const CoverageSummary = () => {
  return <CoverageTable rows={COVERAGE_SUMMARY} />;
};
