import React, { useState } from 'react';
import Highcharts, { dateFormat } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import 'highcharts/css/highcharts.css';
import moment from 'moment';

import { Wrapper } from './Chart.style';

const Chart = ({ state, subtitle, data }) => {
  const noAction = {
    name: 'No Action',
    color: '#ef5350',
    type: 'area',
    data: data[0].data,
  };
  const txStyle = {
    name: 'Social Distancing',
    color: '#FFA726',
    type: 'area',
    data: data[2].data,
  };
  const caStyle = {
    name: 'Shelter in Place',
    color: '#29B6F6',
    type: 'area',
    data: data[1].data,
  };
  const wuhanStyle = {
    name: 'Full Lockdown',
    color: '#9CCC65',
    type: 'area',
    data: data[3].data,
  };
  const beds = {
    name: 'Hospital Bed Availability',
    color: 'black',
    type: 'line',
    data: data[4].data,
  };

  const [options, setOptions] = useState({
    chart: {
      styledMode: true,
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
        return `<b>${beds}</b> hospitilizations <br/> expected by <b>${date}</b>`;
      },
    },
    xAxis: {
      type: 'datetime',
      step: 7,
      crosshair: true,
      labels: {
        rotation: -45,
        formatter: function() {
          return dateFormat('%b %e', this.value);
        },
      },
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
    series: [noAction, txStyle, caStyle, wuhanStyle, beds],
  });

  return (
    <Wrapper>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Wrapper>
  );
};

export default Chart;
