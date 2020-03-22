import React, { useState } from 'react';
import Highcharts, { dateFormat } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import 'highcharts/css/highcharts.css';
import moment from 'moment';

import { Wrapper } from './Chart.style';

const Chart = ({ state, subtitle, data, dateOverwhelmed }) => {
  const noAction = {
    name: 'No Action',
    color: '#ef5350',
    type: 'area',
    data: data[0].data,
  };
  const socialDistancing = {
    name: "3 Months of Social distancing",
    color: '#FFA726',
    type: 'area',
    data: data[2].data,
  };
  const shelterInPlace = {
    name: "3 Months of Shelter-in-place",
    color: '#29B6F6',
    type: 'area',
    data: data[1].data,
  };
  const wuhanStyle = {
    name: '3 Months of Wuhan-style Lockdown',
    color: '#9CCC65',
    type: 'area',
    data: data[3].data,
  };
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
      text: state,
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
      formatter: function() {
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
        formatter: function() {
          return dateFormat('%b %e', this.value);
        },
      },
      plotLines: [
        {
          value: dateOverwhelmed,
          label: {
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
  });

  return (
    <Wrapper>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <span>Last Updated: March 19th</span>
    </Wrapper>
  );
};

export default Chart;
