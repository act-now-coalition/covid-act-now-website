import React from 'react';
import SummaryStat from './SummaryStat';
import { Metric } from 'common/metricEnum';

export default {
  title: 'Location Page/Summary stats',
  component: SummaryStat,
};

export const CaseDensity = () => {
  return <SummaryStat metric={Metric.CASE_DENSITY} value={46} />;
};

export const PercentVaccinated = () => {
  return <SummaryStat metric={Metric.VACCINATIONS} value={0.46} />;
};
