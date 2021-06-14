import React, { useState } from 'react';
import { BetaTag } from './ChartsHolder.style';
import { Projections } from 'common/models/Projections';
import { getMetricNameExtended } from 'common/metric';
import { Metric } from 'common/metricEnum';
import MetricChart from 'components/Charts/MetricChart';
import { Region } from 'common/regions';
import { SectionHeader } from 'components/SharedComponents';
import MetricChartFooter from 'components/NewLocationPage/ChartFooter/MetricChartFooter';
import ChartTabs from 'components/NewLocationPage/ChartTabs/ChartTabs';
import { Tab, Tabs } from 'components/NewLocationPage/ChartTabs/ChartTab.style';
import { CHART_GROUPS } from 'components/Charts/Redesign/Groupings';

function TestChartBlock(props: {
  // chartRef: React.RefObject<HTMLDivElement>;
  isMobile: boolean;
  region: Region;
  stats: any;
  // metric: Metric;
  projections: Projections;
}) {
  const { projections, isMobile, region, stats } = props;

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const onChangeTab = (newTabIndex: number) => {
    setActiveTabIndex(newTabIndex);
  };

  // const showBetaTag = metric === Metric.VACCINATIONS;
  // const hasMetric = projections.hasMetric(metric);
  // const chartHeight = isMobile ? 280 : 400;

  return (
    <>
      {CHART_GROUPS.map((grouping: any) => (
        <>
          <SectionHeader>{grouping.groupHeader}</SectionHeader>
          <ChartTabs activeTabIndex={activeTabIndex} onChangeTab={onChangeTab}>
            {grouping.metricList.map((metric: any, i: number) => {
              if (!projections.hasMetric(metric.metric)) {
                return null;
              } else
                return (
                  <Tab
                    key={`tab-${i}`}
                    disableRipple
                    disableFocusRipple
                    label={metric.renderTabLabel()}
                    id={`tab-id-${i}`}
                    aria-controls={`tab-id-${i}`}
                  />
                );
            })}
          </ChartTabs>
          {grouping.metricList[activeTabIndex].renderChart(projections)}
        </>
      ))}
    </>
  );
}

export default TestChartBlock;
