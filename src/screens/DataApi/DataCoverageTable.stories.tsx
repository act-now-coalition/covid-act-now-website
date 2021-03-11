import React from 'react';
import CoverageTable, {
  COVERAGE_SUMMARY,
} from 'screens/DataApi/DataCoverageTable';

export default {
  title: 'Data API/Data Availability Table',
  component: CoverageTable,
};

export const CoverageSummary = () => {
  return <CoverageTable rows={COVERAGE_SUMMARY} />;
};
