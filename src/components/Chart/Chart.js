import React, { useState } from 'react';
import Highcharts, { dateFormat } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import 'highcharts/css/highcharts.css';
import moment from 'moment';
import { INTERVENTIONS } from 'enums';

import { Wrapper } from './Chart.style';

const formatIntervention = intervention => `3 months of ${intervention}`;

const Chart = ({ state, county, subtitle, interventions }) => {
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
  if (data[0].dateOverwhelmed !== null) {
    extraLines.push({
      value: data[0].dateOverwhelmed,
      className: 'highcharts-series-0-line',
      label: {
        text: 'Hospitals Overloaded',
        x: 10,
        y: 20,
      }
    })
  }
  const socialDistancing = {
    name: formatIntervention(INTERVENTIONS.SOCIAL_DISTANCING),
    type: 'area',
    data: data[2].data,
  };
  if (data[2].dateOverwhelmed !== null) {
    extraLines.push({
      value: data[2].dateOverwhelmed,
      className: 'highcharts-series-1-line',
      label: {
        text: 'Hospitals Overloaded',
        x: 10,
        y: 20,
      }
    })
  }
  const shelterInPlace = {
    name: formatIntervention(INTERVENTIONS.SHELTER_IN_PLACE),
    type: 'area',
    data: data[1].data,
  };
  if (data[1].dateOverwhelmed !== null) {
    extraLines.push({
      value: data[1].dateOverwhelmed,
      className: 'highcharts-series-2-line',
      label: {
        rotation: 0,
        text: 'Hospitals Overloaded <br/> (shelter in place)',
        x: 10,
        y: 20,
      }
    })
  }
  const wuhanStyle = {
    name: formatIntervention(INTERVENTIONS.LOCKDOWN),
    type: 'area',
    data: data[3].data,
  };
  if (data[3].dateOverwhelmed !== null) {
    extraLines.push({
      value: data[3].dateOverwhelmed,
      className: 'highcharts-series-3-line',
      label: {
        rotation: 0,
        text: 'Hospitals Overloaded <br/> (lockdown)',
        x: 10,
        y: 20,
      }
    })
  }
  const availableBeds = {
    name: 'Available Hospital Beds',
    color: 'black',
    type: 'line',
    data: data[4].data,
  };

  const [options] = useState({
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
        ...extraLines,
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
  });

  return (
    <Wrapper>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <span>Last Updated: March 23rd</span>
    </Wrapper>
  );
};

export default Chart;
