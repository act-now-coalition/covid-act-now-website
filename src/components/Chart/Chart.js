import React, { useState } from 'react';
import Highcharts, { dateFormat } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import 'highcharts/css/highcharts.css';
import moment from 'moment';
import { INTERVENTIONS } from 'enums';
import { snakeCase } from 'lodash';

import { ChartContainer, Wrapper } from './Chart.style';

const formatIntervention = (intervention, optCase) =>
  `3 months of ${intervention}${optCase || ''}`;

const Chart = ({
  state,
  county,
  subtitle,
  interventions,
  currentIntervention,
}) => {
  const interventionToModel = {
    [INTERVENTIONS.LIMITED_ACTION]: interventions.baseline,
    [INTERVENTIONS.SOCIAL_DISTANCING]:
      interventions.distancingPoorEnforcement.now,
    [INTERVENTIONS.SHELTER_IN_PLACE]: interventions.distancing.now,
  };

  let model = interventionToModel[currentIntervention];

  if (currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE) {
    model = interventionToModel[INTERVENTIONS.SOCIAL_DISTANCING];
  }

  const hospitalsOverloadedPlotLineText = currentIntervention => {
    let plotLineText;
    switch (currentIntervention) {
      case INTERVENTIONS.SHELTER_IN_PLACE:
        plotLineText = '<span>Shelter in place<br />Worst case scenario</span>';
        break;
      case INTERVENTIONS.LIMITED_ACTION:
        plotLineText = 'Assuming limited action';
        break;
      case INTERVENTIONS.SOCIAL_DISTANCING:
        plotLineText = 'Assuming social distancing';
        break;
      default:
    }

    return plotLineText;
  };

  const scenarioComparisonOverTime = duration => [
    interventions.baseline.getDataset('hospitalizations', duration, 'red'),
    interventions.distancing.now.getDataset(
      'hospitalizations',
      duration,
      'blue',
    ),
    interventions.distancingPoorEnforcement.now.getDataset(
      'hospitalizations',
      duration,
      'orange',
    ),
    interventions.contain.now.getDataset('hospitalizations', duration, 'green'),
    interventions.baseline.getDataset(
      'beds',
      duration,
      'black',
      'Available Hospital Beds',
    ),
  ];
  const data = scenarioComparisonOverTime(100);

  const noAction = {
    name: INTERVENTIONS.LIMITED_ACTION,
    type: 'areaspline',
    data: data[0].data,
    marker: {
      symbol: 'circle',
    },
  };
  const socialDistancing = {
    name: currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE
        ? formatIntervention(INTERVENTIONS.SHELTER_IN_PLACE, ' (worst case)')
        : formatIntervention(INTERVENTIONS.SOCIAL_DISTANCING),
    type: 'areaspline',
    data: data[2].data,
    marker: {
      symbol: 'circle',
    },
  };
  const shelterInPlace = {
    name:
      currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE
        ? formatIntervention(INTERVENTIONS.SHELTER_IN_PLACE, ' (best case)')
        : formatIntervention(INTERVENTIONS.SHELTER_IN_PLACE),
    type: 'areaspline',
    data: data[1].data,
    marker: {
      symbol: 'circle',
    },
  };
  const wuhanStyle = {
    name: formatIntervention(INTERVENTIONS.LOCKDOWN),
    type: 'areaspline',
    data: data[3].data,
    marker: {
      symbol: 'circle',
    },
  };
  const availableBeds = {
    name: 'Available Hospital Beds',
    type: 'spline',
    data: data[4].data,
    marker: {
      symbol: 'circle',
    },
  };

  const [options] = useState({
    chart: {
      styledMode: true,
      height: '600',
      spacing: [8, 0, 32, 0],
    },
    title: {
      // text: county ? `${county.county}, ${state}` : state,
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
              )}">Hospitals Overloaded<br /><span>${hospitalsOverloadedPlotLineText(
                currentIntervention,
              )}</span></div>`;
            },
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
      maxPadding: 0.2,
    },
    tooltip: {
      formatter: function () {
        const date = moment(this.x).format('MMMM D');
        const beds = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if (this.series.userOptions.type === 'line') {
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
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
      area: {
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      noAction,
      socialDistancing,
      shelterInPlace,
      wuhanStyle,
      availableBeds,
    ],
  });

  return (
    <ChartContainer>
      <Wrapper
        inShelterInPlace={
          currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE
        }
      >
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Wrapper>
    </ChartContainer>
  );
};

export default Chart;
