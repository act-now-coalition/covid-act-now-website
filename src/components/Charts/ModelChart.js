import React, { useMemo } from 'react';
import { dateFormat } from 'highcharts';
import moment from 'moment';
import { snakeCase } from 'lodash';
import { INTERVENTIONS } from 'enums';
import LightTooltip from 'components/LightTooltip/LightTooltip';
import ClaimStateBlock from 'components/ClaimStateBlock/ClaimStateBlock';
import Chart from './Chart';

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

function dateIsPastHalfway(dateToCompare, dateArray, itemKey) {
  if (dateArray.length === 0) return true;
  const midpoint = Math.floor(dateArray.length / 2);
  // Enforce date objects in case these are date strings
  return (
    new Date(dateToCompare) >
    new Date(itemKey ? dateArray[midpoint][itemKey] : dateArray[midpoint])
  );
}

function getDateUpdated() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const daysSinceUpdate = dayOfYear % 3;
  return new Date(now - oneDay * daysSinceUpdate).toLocaleDateString();
}

const formatIntervention = (intervention, optCase) =>
  `3 months of ${intervention.toLowerCase()}${optCase || ''}`;

const condensedFormatIntervention = (intervention, optCase) =>
  `${intervention}${optCase || ''}`;

const ModelChart = ({
  height,
  condensed,
  interventions,
  currentIntervention,
  lastUpdatedDate,
  forCompareModels, // true when used by CompareModels.js component.
  location,
  selectedCounty,
}) => {
  const interventionToModel = {
    [INTERVENTIONS.LIMITED_ACTION]: interventions.baseline,
    [INTERVENTIONS.SOCIAL_DISTANCING]:
      interventions.distancingPoorEnforcement.now,
    [INTERVENTIONS.PROJECTED]: interventions.projected,
    [INTERVENTIONS.SHELTER_IN_PLACE]: interventions.distancing.now,
  };
  const hasProjections = interventions.hasProjections;

  let model = interventionToModel[currentIntervention];
  if (hasProjections) {
    model = interventionToModel[INTERVENTIONS.PROJECTED];
  } else if (currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE) {
    model = interventionToModel[INTERVENTIONS.SOCIAL_DISTANCING];
  }

  const scenarioComparisonOverTime = duration => [
    interventions.baseline.getDataset('hospitalizations', duration),
    interventions.distancingPoorEnforcement.now.getDataset(
      'hospitalizations',
      duration,
    ),
    interventions.projected.getDataset('hospitalizations', duration),
    interventions.distancing.now.getDataset('hospitalizations', duration),
    interventions.baseline.getDataset(
      'beds',
      duration,
      'Available hospital beds',
    ),
  ];

  const data = scenarioComparisonOverTime(200);

  // We'll use this to determine whether to right-align
  // or left-align our plot line labels
  const dateOverwhelmedIsPastHalfway = dateIsPastHalfway(
    new Date(model.dateOverwhelmed),
    data[0].data,
    'x',
  );

  const noAction = {
    className: 'limited-action',
    name:
      currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE ||
      currentIntervention === INTERVENTIONS.SOCIAL_DISTANCING
        ? 'Restrictions lifted'
        : INTERVENTIONS.LIMITED_ACTION,
    type: hasProjections ? 'spline' : 'areaspline',
    data: data[0].data,
    marker: {
      symbol: 'circle',
    },
    visible: !forCompareModels,
    condensedLegend: {
      bgColor: interventions.getChartSeriesColorMap().limitedActionSeries,
    },
  };

  const socialDistancing = {
    className: 'social-distancing',
    name:
      currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE
        ? formatIntervention(INTERVENTIONS.SHELTER_IN_PLACE, ' (lax)')
        : formatIntervention(INTERVENTIONS.SOCIAL_DISTANCING),
    type: hasProjections ? 'spline' : 'areaspline',
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

      bgColor: interventions.getChartSeriesColorMap().socialDistancingSeries,
    },
  };

  const projected = {
    className: 'projected',
    name: 'Projected based on current trends',
    type: 'spline',
    data: data[2].data,
    marker: {
      symbol: 'circle',
    },
    condensedLegend: {
      bgColor: interventions.getChartSeriesColorMap().projectedSeries,
    },
  };

  const shelterInPlace = {
    className: 'stay-at-home',
    name:
      currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE
        ? formatIntervention(INTERVENTIONS.SHELTER_IN_PLACE, ' (strict)')
        : formatIntervention(INTERVENTIONS.SHELTER_IN_PLACE),
    type: hasProjections ? 'spline' : 'areaspline',
    visible:
      !hasProjections || currentIntervention !== INTERVENTIONS.SHELTER_IN_PLACE,

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
      bgColor: interventions.getChartSeriesColorMap().shelterInPlaceSeries,
    },
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
  };

  const options = useMemo(() => {
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
        // text: subtitle,
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
        plotLines: [
          {
            value: model.dateOverwhelmed,
            className: snakeCase(
              currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE
                ? INTERVENTIONS.SHELTER_IN_PLACE_WORST_CASE
                : currentIntervention,
            ),
            zIndex: 10,
            label: {
              formatter: function () {
                return `<div class="custom-plot-label custom-plot-label-${snakeCase(
                  currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE
                    ? INTERVENTIONS.SHELTER_IN_PLACE_WORST_CASE
                    : currentIntervention,
                )}${
                  dateOverwhelmedIsPastHalfway
                    ? ' custom-plot-label-reverse'
                    : ''
                }">Hospitals May Overload<br /><span>${interventions.getChartHospitalsOverloadedText()}</span></div>`;
              },
              align: dateOverwhelmedIsPastHalfway ? 'right' : 'left',
              rotation: 0,
              useHTML: true,
              x: 1,
              y: 12,
            },
          },
          {
            value: Date.now(),
            className: 'today',
            zIndex: 10,
            label: {
              formatter: function () {
                return `<div class="custom-plot-label">Today</div>`;
              },
              rotation: 0,
              useHTML: true,
              x: 1,
              y: 96,
            },
          },
        ],
      },
      yAxis: {
        title: {
          text: undefined,
        },
        labels: {
          useHTML: true,
          x: 48,
          formatter: function () {
            return this.value === 0
              ? ''
              : this.axis.defaultLabelFormatter.call(this);
          },
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
      series: hasProjections
        ? [noAction, projected, shelterInPlace, availableBeds]
        : [noAction, socialDistancing, shelterInPlace, availableBeds],
    };
  }, [
    height,
    model.dateOverwhelmed,
    currentIntervention,
    hasProjections,
    noAction,
    socialDistancing,
    projected,
    shelterInPlace,
    availableBeds,
    interventions,
    condensed,
    dateOverwhelmedIsPastHalfway,
  ]);

  if (condensed) {
    return (
      <ChartContainer>
        <Wrapper
          interventions={interventions}
          hasProjections={hasProjections}
          inShelterInPlace={
            currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE
          }
        >
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
      <Wrapper
        interventions={interventions}
        hasProjections={hasProjections}
        inShelterInPlace={
          currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE
        }
      >
        <Chart options={options} />
        <DisclaimerWrapper>
          <Disclaimer>
            <DisclaimerHeader>
              <LightTooltip
                title="Currently we aggregate data over 4 day intervals to smooth out inconsistencies in the source data. We’re working on improving this now."
                placement="bottom"
              >
                <span>Last updated {getDateUpdated()}</span>
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
                Learn more about our model and its limitations
              </a>
              .
            </DisclaimerBody>
          </Disclaimer>
          <Disclaimer>
            <ClaimStateBlock location={location} county={selectedCounty} />
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
