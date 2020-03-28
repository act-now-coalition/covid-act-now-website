import React, { useState, useEffect } from 'react';
import Highcharts, { dateFormat } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import 'highcharts/css/highcharts.css';
import moment from 'moment';
import { INTERVENTIONS } from 'enums';

import { Wrapper } from './Chart.style';

const formatIntervention = (intervention, optCase) =>
  `3 months of ${intervention}${optCase || ''}`;

const Chart = ({
  state,
  county,
  subtitle,
  interventions,
  dateOverwhelmed,
  currentIntervention,
}) => {
<<<<<<< daf01240aee65dbb85f00274b289a8969ba8d2a6
=======
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
        plotLineText = '(assuming shelter in place - worst case)';
        break;
      case INTERVENTIONS.LIMITED_ACTION:
        plotLineText = '(assuming limited action)';
        break;
      case INTERVENTIONS.SOCIAL_DISTANCING:
        plotLineText = '(assuming social distancing)';
        break;
      default:
    }

    return plotLineText;
  };

>>>>>>> Handle county permalinks
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
    type: 'area',
    data: data[0].data,
  };
  const socialDistancing = {
    name:
      currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE
        ? formatIntervention(INTERVENTIONS.SHELTER_IN_PLACE, ' (worst case)')
        : formatIntervention(INTERVENTIONS.SOCIAL_DISTANCING),
    type: 'area',
    data: data[2].data,
  };
  const shelterInPlace = {
    name:
      currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE
        ? formatIntervention(INTERVENTIONS.SHELTER_IN_PLACE, ' (best case)')
        : formatIntervention(INTERVENTIONS.SHELTER_IN_PLACE),
    type: 'area',
    data: data[1].data,
  };
  const wuhanStyle = {
    name: formatIntervention(INTERVENTIONS.LOCKDOWN),
    type: 'area',
    data: data[3].data,
  };
  const availableBeds = {
    name: 'Available Hospital Beds',
    color: 'black',
    type: 'line',
    data: data[4].data,
  };

  const chartOptions = {
    chart: {
      styledMode: true,
      height: '600',
    },
    title: {
      text: county ? `${county.county}, ${state}` : state,
    },
    subtitle: {
      text: subtitle,
    },
    yAxis: {
      title: {
        text: 'Hospitalizations',
      },
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
    },
    xAxis: {
      type: 'datetime',
      step: 7,
      labels: {
        rotation: -45,
        formatter: function () {
          return dateFormat('%b %e', this.value);
        },
      },
      plotLines: [
        {
<<<<<<< daf01240aee65dbb85f00274b289a8969ba8d2a6
          value: dateOverwhelmed,
          label: {
=======
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
              )}">Hospitals Overloaded<div>${hospitalsOverloadedPlotLineText(
                currentIntervention,
              )}</div></div>`;
            },
>>>>>>> Handle county permalinks
            rotation: 0,
            text: 'Hospitals Overloaded <br/> (assuming no action)',
            x: 10,
            y: 20,
          },
        },
        {
          value: Date.now(),
          className: 'today',
          label: {
            rotation: 0,
            text: 'Today',
            x: -40,
            y: 20,
          },
        },
      ],
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
  };
  const [options, setOptions] = useState(chartOptions);

  useEffect(() => {
    setOptions(chartOptions);
  }, [county]);

  return (
    <Wrapper
      inShelterInPlace={currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
      <span>Last Updated: March 23rd</span>
    </Wrapper>
  );
};

export default Chart;
