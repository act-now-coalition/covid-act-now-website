import React, { Fragment } from 'react';
import {
  ChartHeader,
  ChartDescription,
  ChartLocationName,
  BetaTag,
  ChartHeaderWrapper,
} from './ChartsHolder.style';
import NoCountyDetail from './NoCountyDetail';
import { Projections } from 'common/models/Projections';
import { Projection } from 'common/models/Projection';
import Disclaimer from 'components/Disclaimer/Disclaimer';
import ClaimStateBlock from 'components/ClaimStateBlock/ClaimStateBlock';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import NewLocationPageHeader from 'components/LocationPage/NewLocationPageHeader';
import Outcomes from 'components/Outcomes/Outcomes';
import ShareButtons from 'components/LocationPage/ShareButtons';
import {
  ChartRt,
  ChartPositiveTestRate,
  ChartICUHeadroom,
  ChartContactTracing,
  ChartFutureHospitalization,
} from 'components/Charts';
import { Metric, getMetricName } from 'common/metric';
import { formatUtcDate } from 'common/utils';

// TODO: double check with pablo re: why ChartRt pulls data differently
function Chart(props: { getDatasetData: any; metric: number; data: any }) {
  return (
    <Fragment>
      {props.data && props.metric === Metric.CASE_GROWTH_RATE && (
        <ChartRt columnData={props.getDatasetData} />
      )}
      {props.data && props.metric === Metric.POSITIVE_TESTS && (
        <ChartPositiveTestRate columnData={props.data} />
      )}
      {props.data && props.metric === Metric.HOSPITAL_USAGE && (
        <ChartICUHeadroom columnData={props.data} />
      )}
      {props.data && props.metric === Metric.CONTACT_TRACING && (
        <ChartContactTracing columnData={props.data} />
      )}
    </Fragment>
  );
}

function ChartContent(props: {
  chartRef: any;
  isMobile: Boolean;
  data: any;
  shareButtonProps: any;
  projection: any;
  metric: number;
  dataSet: string;
  statusText: string;
  futureProjectionsDisabled?: Boolean;
  noInterventionProjection?: any;
}) {
  const showBetaTag =
    props.metric === (Metric.HOSPITAL_USAGE || Metric.CONTACT_TRACING);
  return (
    <Fragment>
      <ChartHeaderWrapper>
        <ChartHeader ref={props.chartRef}>
          {getMetricName(props.metric)}
          {showBetaTag && <BetaTag>Beta</BetaTag>}
        </ChartHeader>
        {!props.isMobile && props.data && (
          <ShareButtons
            chartIdentifier={props.metric}
            {...props.shareButtonProps}
          />
        )}
      </ChartHeaderWrapper>
      <ChartLocationName>{props.projection.locationName}</ChartLocationName>
      <ChartDescription>{props.statusText}</ChartDescription>
      {props.isMobile && props.data && (
        <ShareButtons
          chartIdentifier={props.metric}
          {...props.shareButtonProps}
        />
      )}
      {props.data && (
        <>
          <Chart
            data={props.data}
            metric={props.metric}
            getDatasetData={props.projection.getDataset(props.dataSet)}
          />
          <Disclaimer metricName={props.metric} />
        </>
      )}
    </Fragment>
  );
}

export default ChartContent;
