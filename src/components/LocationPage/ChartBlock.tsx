import React, { Fragment } from 'react';
import {
  ChartHeader,
  ChartDescription,
  ChartLocationName,
  BetaTag,
  ChartHeaderWrapper,
} from './ChartsHolder.style';
import { Projections } from 'common/models/Projections';
import { Projection } from 'common/models/Projection';
import Disclaimer from 'components/Disclaimer/Disclaimer';
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
import { generateChartDescription } from 'common/metrics/future_projection';
import { DatasetId } from 'common/models/Projection';

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

function ChartBlock(props: {
  chartRef: React.RefObject<HTMLDivElement>;
  isMobile: Boolean;
  data?: any;
  shareButtonProps: { [key: string]: any };
  projection: Projection;
  metric: number;
  datasetName: DatasetId;
  statusText?: string;
  futureProjectionsDisabled?: Boolean;
  noInterventionProjection: Projection;
  projections: Projections;
  outcomesProjections?: { [key: string]: any };
  outcomesColors?: { [key: string]: string };
}) {
  const showBetaTag =
    props.metric === Metric.HOSPITAL_USAGE ||
    props.metric === Metric.CONTACT_TRACING;

  return (
    <Fragment>
      {props.metric !== Metric.FUTURE_PROJECTIONS && (
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
                getDatasetData={props.projection.getDataset(props.datasetName)}
              />
              <Disclaimer metricName={props.metric} />
            </>
          )}
        </Fragment>
      )}
      {props.metric === Metric.FUTURE_PROJECTIONS && (
        <Fragment>
          <ChartHeaderWrapper>
            <ChartHeader ref={props.chartRef}>
              Future Hospitalization (both ICU and non-ICU) Projections
            </ChartHeader>
            {!props.isMobile && !props.futureProjectionsDisabled && (
              <ShareButtons
                chartIdentifier={props.metric}
                {...props.shareButtonProps}
              />
            )}
          </ChartHeaderWrapper>
          <ChartLocationName>{props.projection.locationName}</ChartLocationName>
          {props.futureProjectionsDisabled ? (
            'Future hospitalization projections are not currently available. Check back soon.'
          ) : (
            <Fragment>
              <ChartDescription>
                {generateChartDescription(
                  props.projection,
                  props.noInterventionProjection,
                )}
              </ChartDescription>
              {props.isMobile && (
                <ShareButtons
                  chartIdentifier={props.metric}
                  {...props.shareButtonProps}
                />
              )}
              <ChartFutureHospitalization projections={props.projections} />
              <Outcomes
                title={`Predicted outcomes by ${formatUtcDate(
                  props.projections.projected.finalDate,
                )} (30 days from now)`}
                projections={props.outcomesProjections}
                colors={props.outcomesColors}
              />
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default ChartBlock;
