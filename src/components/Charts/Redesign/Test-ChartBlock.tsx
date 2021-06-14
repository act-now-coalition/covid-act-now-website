import React, { useState } from 'react';
import { Projections } from 'common/models/Projections';
import { Region } from 'common/regions';
import { SectionHeader } from 'components/SharedComponents';
import ChartTabs from 'components/NewLocationPage/ChartTabs/ChartTabs';
import { Tab } from 'components/NewLocationPage/ChartTabs/ChartTab.style';
import { CHART_GROUPS } from 'components/Charts/Redesign/Groupings';

function TestChartBlock(props: {
  isMobile: boolean;
  region: Region;
  stats: any;
  projections: Projections;
}) {
  // const { projections, isMobile, region, stats } = props;
  const { projections } = props;

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
