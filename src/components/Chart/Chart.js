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
  const socialDistancing = {
    name: formatIntervention(INTERVENTIONS.SOCIAL_DISTANCING),
    type: 'area',
    data: data[2].data,
  };
  const shelterInPlace = {
    name: formatIntervention(INTERVENTIONS.SHELTER_IN_PLACE),
    type: 'area',
    data: data[1].data,
  };
  const wuhanStyle = {
    name: formatIntervention(INTERVENTIONS.LOCKDOWN),
    type: 'area',
    data: data[3].data,
  };
  const nowLine = {
    value: Date.now(),
    className: 'today',
    label: {
      rotation: 0,
      text: 'Today',
      x: -40,
      y: 20,
    },
  };
  const seriesList = [noAction, socialDistancing, shelterInPlace, wuhanStyle];
  const overwhelmedDates = {
    [INTERVENTIONS.LIMITED_ACTION]: data[0].dateOverwhelmed,
    [formatIntervention(INTERVENTIONS.SOCIAL_DISTANCING)]: data[2]
      .dateOverwhelmed,
    [formatIntervention(INTERVENTIONS.SHELTER_IN_PLACE)]: data[1]
      .dateOverwhelmed,
    [formatIntervention(INTERVENTIONS.LOCKDOWN)]: data[3].dateOverwhelmed,
  };
  const chartRef = React.createRef();

  const seriesLine = (name, index) => {
    return {
      value: overwhelmedDates[name],
      id: name,
      className: `highcharts-series-${index}-line`,
      label: {
        text: 'Hospitals Overloaded',
        x: 10,
        y: 20,
      },
    };
  };

  const seriesLines = seriesList
    .map((series, i) => {
      const date = overwhelmedDates[series.name];
      if (date !== null) {
        return seriesLine(series.name, i);
      } else {
        return null;
      }
    })
    .filter(v => v !== null);

  const onHide = e => {
    const targetName = e.target.userOptions.name;
    const chart = chartRef.current.chart;
    const xAxis = chart.axes[0];
    xAxis.removePlotLine(targetName);
  };
  const onShow = e => {
    const targetName = e.target.userOptions.name;
    const chart = chartRef.current.chart;
    const xAxis = chart.axes[0];
    const i = seriesList.findIndex(s => s.name === targetName);
    xAxis.addPlotLine(seriesLine(targetName, i));
  };

  const plotLines = [...seriesLines, nowLine];
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
      plotLines,
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
        events: {
          hide: onHide,
          show: onShow,
        },
      },
      area: {
        marker: {
          enabled: false,
        },
      },
    },
    series: [...seriesList, availableBeds],
  });

  return (
    <Wrapper>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
      <span>Last Updated: March 23rd</span>
    </Wrapper>
  );
};

export default Chart;
