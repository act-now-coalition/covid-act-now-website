import React, { useMemo } from 'react';
import _ from 'lodash';
import { dateFormat, numberFormat } from 'highcharts';
import moment from 'moment';
import { INTERVENTIONS } from 'enums/interventions';
import LightTooltip from 'components/LightTooltip/LightTooltip';
import ClaimStateBlock from 'components/ClaimStateBlock/ClaimStateBlock';
import Chart from './Chart';
import { useModelLastUpdatedDate } from 'utils/model';
import {
  ChartContainer,
  Wrapper,
  DisclaimerWrapper,
  Disclaimer,
  DisclaimerHeader,
  DisclaimerBody,
  CondensedLegendStyled,
  CondensedLegendItemStyled,
} from './ModelChart.style';
import Outcomes from '../Outcomes/Outcomes';

const formatIntervention = (intervention, optCase) =>
  `3 months of ${intervention.toLowerCase()}${optCase || ''}`;

const condensedFormatIntervention = (intervention, optCase) =>
  `${intervention}${optCase || ''}`;

const isFuture = d => d.x > new Date().valueOf();

const ModelChart = ({
  height,
  condensed,
  projections,
  forCompareModels, // true when used by CompareInterventions.js component.
  stateId,
  selectedCounty,
}) => {
  // We use the inferred projection if supported, otherwise the worst case for the currently active intervention
  let projection = projections.primary;
  const currentIntervention = projections.stateIntervention;
  const lastUpdatedDate = useModelLastUpdatedDate();

  const data = [
    projections.baseline.getDataset('hospitalizations'),
    projections.distancingPoorEnforcement.now.getDataset('hospitalizations'),
    projections.primary.getDataset('hospitalizations'),
    projections.distancing.now.getDataset('hospitalizations'),
    projections.baseline.getDataset('beds', 'Available hospital beds'),
  ];

  const noAction = {
    className: 'limited-action',
    name: 'If restrictions are lifted',
    type: 'spline',
    data: data[0].data.filter(isFuture),
    marker: {
      symbol: 'circle',
    },
    visible: !forCompareModels,
    condensedLegend: {
      bgColor: projections.getChartSeriesColorMap().limitedActionSeries,
    },
    legendIndex: 1,
  };

  const socialDistancing = {
    className: 'social-distancing',
    name:
      currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE
        ? formatIntervention(INTERVENTIONS.SHELTER_IN_PLACE, ' (lax)')
        : formatIntervention(INTERVENTIONS.SOCIAL_DISTANCING),
    type: projection.isInferred ? 'spline' : 'areaspline',
    data: data[1].data,
    marker: {
      symbol: 'circle',
    },
    condensedLegend: {
      condensedName:
        currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE
          ? condensedFormatIntervention(
              INTERVENTIONS.SHELTER_IN_PLACE,
              ' (lax)',
            )
          : condensedFormatIntervention(INTERVENTIONS.SOCIAL_DISTANCING),

      bgColor: projections.getChartSeriesColorMap().socialDistancingSeries,
    },
  };

  const projected = {
    className: 'projected',
    name: 'Projected based on current trends',
    type: 'spline',
    data: data[2].data.filter(isFuture),
    marker: {
      symbol: 'circle',
    },
    condensedLegend: {
      bgColor: projections.getChartSeriesColorMap().projectedSeries,
    },
    legendIndex: 2,
  };

  const previousEstimates = {
    className: 'hospitalizations',
    name: 'Hospitalizations',
    type: 'spline',
    data: data[2].data.filter(d => !isFuture(d)),
    color: 'black',
    marker: {
      symbol: 'circle',
    },
    condensedLegend: {
      bgColor: projections.getChartSeriesColorMap().projectedSeries,
    },
    legendIndex: 1,
  };

  const shelterInPlace = {
    className: 'stay-at-home',
    name:
      currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE
        ? formatIntervention(INTERVENTIONS.SHELTER_IN_PLACE, ' (strict)')
        : formatIntervention(INTERVENTIONS.SHELTER_IN_PLACE),
    type: 'spline',
    visible:
      !projection.isInferred ||
      currentIntervention !== INTERVENTIONS.SHELTER_IN_PLACE,

    data: data[3].data,
    marker: {
      symbol: 'circle',
    },
    condensedLegend: {
      // TODO: A better way to set text color to be darker
      // on lighter colored backgrounds
      darkLegendText: true,
      condensedName:
        currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE
          ? condensedFormatIntervention(
              INTERVENTIONS.SHELTER_IN_PLACE,
              ' (strict)',
            )
          : condensedFormatIntervention(INTERVENTIONS.SHELTER_IN_PLACE),
      bgColor: projections.getChartSeriesColorMap().shelterInPlaceSeries,
    },
    legendIndex: 2,
  };

  const availableBeds = {
    className: 'beds',
    name: 'Available hospital beds',
    type: 'spline',
    data: data[4].data,
    marker: {
      symbol: 'circle',
    },
    condensedLegend: {
      outline: '2px dashed black',
    },
    showInLegend: false,
  };

  const options = useMemo(() => {
    const maxAvailableBeds = _.max(availableBeds.data.map(d => d.y));
    const minDate = _.min(availableBeds.data.map(d => d.x));
    const lastPreviousEstimate = _.last(
      previousEstimates.data.filter(d => !isFuture(d)),
    );
    return {
      chart: {
        animation: false,
        styledMode: true,
        height: height || '600',
        spacing: [8, 0, condensed ? 12 : 32, 0],
      },
      title: {
        text: undefined,
      },
      subtitle: {
        text: undefined,
      },
      xAxis: {
        type: 'datetime',
        step: 7,
        labels: {
          useHTML: true,
          rotation: 0,
          formatter: function () {
            return dateFormat('%b %e', this.value);
          },
        },
      },
      yAxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        formatter: function () {
          const date = moment(this.x).format('MMMM D');
          const beds = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          if (this.series.userOptions.name === availableBeds.name) {
            return `<b>${beds}</b> expected beds <br/> available on <b>${date}</b>`;
          }
          return `<b>${beds}</b> hospitalizations <br/> expected by <b>${date}</b>`;
        },
        backgroundColor: null,
        borderWidth: 0,
        shadow: false,
        useHTML: true,
        style: {
          padding: 0,
        },
      },
      legend: {
        useHTML: true,
        margin: 32,
        symbolPadding: 8,
        itemMarginBottom: 8,
        ...(condensed ? { enabled: false } : {}),
      },
      plotOptions: {
        series: {
          animation: false,
          marker: {
            enabled: false,
          },
        },
        area: {
          animation: false,
          marker: {
            enabled: false,
          },
        },
      },
      series: [
        noAction,
        projection.isInferred ? projected : shelterInPlace,
        availableBeds,
        previousEstimates,
      ],
      annotations: [
        {
          draggable: '',
          labelOptions: {
            backgroundColor: '#fff',
          },
          labels: [
            {
              align: 'right',
              className: 'Annotation Annotation--BedsAvailable',
              shape: 'rect',
              y: 2,
              point: {
                xAxis: 0,
                yAxis: 0,
                x: minDate,
                y: maxAvailableBeds,
              },
              style: {
                fontWeight: 'bold',
              },
              formatter: function () {
                return `${numberFormat(this.y, 0, '.', ',')} beds`;
              },
            },
          ],
          shapes: [
            {
              draggable: '',
              type: 'circle',
              x: 2,
              point: {
                xAxis: 0,
                yAxis: 0,
                ...lastPreviousEstimate,
              },
              r: 6,
            },
          ],
        },
      ],
    };
  }, [
    height,
    noAction,
    projected,
    projection.isInferred,
    availableBeds,
    condensed,
    previousEstimates,
    shelterInPlace,
  ]);

  if (condensed) {
    return (
      <ChartContainer>
        <Wrapper projections={projections} isInferred={projection.isInferred}>
          <Chart options={options} />
          <CondensedLegend>
            {[noAction, socialDistancing, shelterInPlace, availableBeds]
              .filter(intervention => intervention.visible !== false)
              .map(CondensedLegendItem)}
          </CondensedLegend>
        </Wrapper>
      </ChartContainer>
    );
  }
  return (
    <ChartContainer>
      <Wrapper projections={projections} isInferred={projection.isInferred}>
        <Chart options={options} />
        <Outcomes
          title="Predicted Outcomes"
          projections={[projections.baseline, projections.primary]}
          colors={[
            projections.getSeriesColorForLimitedAction(),
            projections.getSeriesColorForPrimary(),
          ]}
          asterisk={['', '*', '*', '**']}
          timeHorizon={120}
          currentIntervention={projections.stateIntervention}
        />
        <DisclaimerWrapper>
          <Disclaimer>
            <DisclaimerHeader>
              <LightTooltip
                title="Currently we aggregate data over 4 day intervals to smooth out inconsistencies in the source data. We’re working on improving this now."
                placement="bottom"
              >
                <span>
                  Last updated{' '}
                  {lastUpdatedDate && lastUpdatedDate.toLocaleDateString()}
                </span>
              </LightTooltip>
            </DisclaimerHeader>
            <DisclaimerBody>
              This model updates every 3 days and is intended to help make fast
              decisions, not predict the future.{' '}
              <a
                href="https://data.covidactnow.org/Covid_Act_Now_Model_References_and_Assumptions.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more about our projection and its limitations
              </a>
              .
            </DisclaimerBody>
          </Disclaimer>
          <Disclaimer>
            <ClaimStateBlock stateId={stateId} county={selectedCounty} />
          </Disclaimer>
        </DisclaimerWrapper>
      </Wrapper>
    </ChartContainer>
  );
};

function CondensedLegend({ children }) {
  return <CondensedLegendStyled>{children}</CondensedLegendStyled>;
}

function CondensedLegendItem({
  name,
  condensedLegend: { condensedName, bgColor, outline, darkLegendText },
}) {
  return (
    <CondensedLegendItemStyled
      bgColor={bgColor}
      outline={outline}
      darkLegendText={darkLegendText}
    >
      {condensedName || name}
    </CondensedLegendItemStyled>
  );
}

export default ModelChart;
